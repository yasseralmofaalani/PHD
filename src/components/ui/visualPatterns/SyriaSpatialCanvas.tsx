// ============================================================
//  SyriaSpatialCanvas — the reusable GIS visualization.
//
//  Not a decorative map: it is the presentation's spatial identity.
//  Same coordinate system as Slide00Cover (viewBox 1000×520) so
//  motion.layoutId="syria-map" hand-offs work across slides.
//
//  Pluggable overlays:
//   • sites          — animated candidate/upgrade points
//   • coverage       — cell coverage bloom rings
//   • choropleth     — governorate-level heat (SFI, density, %)
//   • labels         — governorate labels with subtle pills
//   • pulses         — data pulses along backbone
//   • highlightIds   — spotlight subset of governorates
//   • aoi            — area-of-interest polygon overlay (isolation cell)
// ============================================================

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, alpha, type } from "../../design/tokens";
import { pathDraw } from "../../design/motion";
import { SYRIA_OUTLINE } from "../../slides/contributions/kit";

// --- Governorate anchor coordinates (matches accurate syria.geojson projection) ------
// x/y are normalized to a 1000×520 viewBox.
export const SYRIA_GOVS = [
  { id: "damascus", name: "دمشق",     x: 286, y: 395, tier: "capital" },
  { id: "daraa",    name: "درعا",     x: 272, y: 475, tier: "regional" },
  { id: "suwayda",  name: "السويداء", x: 306, y: 467, tier: "regional" },
  { id: "quneitra", name: "القنيطرة", x: 250, y: 429, tier: "edge" },
  { id: "homs",     name: "حمص",      x: 318, y: 283, tier: "hub" },
  { id: "hama",     name: "حماة",     x: 321, y: 247, tier: "regional" },
  { id: "idlib",    name: "إدلب",     x: 312, y: 173, tier: "regional" },
  { id: "aleppo",   name: "حلب",      x: 351, y: 147, tier: "hub" },
  { id: "latakia",  name: "اللاذقية", x: 252, y: 210, tier: "hub" },
  { id: "tartus",   name: "طرطوس",    x: 259, y: 268, tier: "regional" },
  { id: "raqqa",    name: "الرقة",    x: 491, y: 170, tier: "regional" },
  { id: "deir",     name: "دير الزور", x: 576, y: 228, tier: "hub" },
  { id: "hasakah",  name: "الحسكة",   x: 622, y: 119, tier: "hub" },
] as const;
export type GovId = (typeof SYRIA_GOVS)[number]["id"];

const BACKBONE: Array<[GovId, GovId]> = [
  ["damascus", "daraa"],
  ["damascus", "suwayda"],
  ["damascus", "quneitra"],
  ["damascus", "homs"],
  ["homs", "tartus"],
  ["tartus", "latakia"],
  ["latakia", "idlib"],
  ["idlib", "aleppo"],
  ["homs", "hama"],
  ["hama", "aleppo"],
  ["aleppo", "raqqa"],
  ["homs", "deir"],
  ["raqqa", "deir"],
  ["raqqa", "hasakah"],
  ["deir", "hasakah"],
];

// ------- Public overlay types --------------------------------------
export type SpatialSite = {
  x: number;
  y: number;
  intensity?: number;      // 0..1, drives opacity/radius
  variant?: "candidate" | "selected" | "upgraded";
};

export type Choropleth = Partial<Record<GovId, {
  /** 0..1 value → mapped to color scale */
  value: number;
  /** Optional label rendered on the pill (e.g. "0.71") */
  label?: string;
}>>;

export type Pulse = {
  from: GovId;
  to: GovId;
  duration?: number;
  delay?: number;
  color?: string;
};

interface SyriaSpatialCanvasProps {
  height?: number | string;
  /** Give the map instance a shared layoutId so it can morph across slides. */
  sharedId?: string;
  showBackbone?: boolean;
  showHexMesh?: boolean;
  showLabels?: boolean | GovId[];
  sites?: SpatialSite[];
  coverage?: Array<{ x: number; y: number; radius?: number; color?: string }>;
  choropleth?: Choropleth;
  choroplethScale?: [string, string];  // [low, high]
  pulses?: Pulse[];
  aoi?: { cx: number; cy: number; r: number; label?: string };
  highlightIds?: GovId[];
  /** 0..1 progress of a draw-in animation for backbone (0 = hidden, 1 = fully drawn). */
  drawProgress?: number;
  /** Faded gray background variant (used when the map is the ambient layer). */
  faded?: boolean;
}

const CELLULAR_HEXAGONS = [
  { cx: 275, cy: 380, r: 24 },
  { cx: 300, cy: 400, r: 24 },
  { cx: 275, cy: 415, r: 24 },
  { cx: 335, cy: 135, r: 22 },
  { cx: 365, cy: 155, r: 22 },
  { cx: 305, cy: 270, r: 20 },
  { cx: 330, cy: 290, r: 20 },
];

// simple lerp between two hex colors returning rgba(a=alpha)
const lerpColor = (a: string, b: string, t: number, alpha01 = 1): string => {
  const parse = (h: string) => {
    const s = h.replace("#", "");
    return [
      parseInt(s.substring(0, 2), 16),
      parseInt(s.substring(2, 4), 16),
      parseInt(s.substring(4, 6), 16),
    ];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgba(${r}, ${g}, ${bl}, ${alpha01})`;
};

export const SyriaSpatialCanvas: React.FC<SyriaSpatialCanvasProps> = ({
  height = "100%",
  sharedId,
  showBackbone = true,
  showHexMesh = true,
  showLabels = true,
  sites,
  coverage,
  choropleth,
  choroplethScale = [palette.primarySoft, palette.primary],
  pulses,
  aoi,
  highlightIds,
  drawProgress: _drawProgress = 1,
  faded = false,
}) => {
  const shouldReduce = useReducedMotion();

  const govLookup = useMemo(() => {
    const m: Record<string, (typeof SYRIA_GOVS)[number]> = {};
    for (const g of SYRIA_GOVS) m[g.id] = g;
    return m;
  }, []);

  const labelIds = useMemo<Set<string>>(() => {
    if (showLabels === true) return new Set(SYRIA_GOVS.map((g) => g.id));
    if (showLabels === false) return new Set();
    return new Set(showLabels);
  }, [showLabels]);

  const highlightSet = useMemo(
    () => new Set(highlightIds ?? []),
    [highlightIds],
  );

  return (
    <motion.svg
      layoutId={sharedId}
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height,
        display: "block",
        filter: faded ? "grayscale(35%) opacity(0.6)" : undefined,
      }}
    >
      <defs>
        <filter id="ssc-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern
          id="ssc-hex"
          width="36"
          height="62.35"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M18 0 L36 10.39 L36 31.18 L18 41.57 L0 31.18 L0 10.39 Z M18 62.35 L36 51.96 L36 31.18 L18 41.57 L0 31.18 L0 51.96 Z"
            fill="none"
            stroke={alpha(palette.primary, 0.09)}
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="ssc-aoi" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={alpha(palette.accent, 0.30)} />
          <stop offset="70%" stopColor={alpha(palette.accent, 0.10)} />
          <stop offset="100%" stopColor={alpha(palette.accent, 0)} />
        </radialGradient>
      </defs>

      {/* Syria National Border Outline */}
      <path
        d={SYRIA_OUTLINE}
        fill={alpha(palette.primary, faded ? 0.03 : 0.06)}
        stroke={alpha(palette.primary, faded ? 0.22 : 0.45)}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Hex mesh ambient inside Syria */}
      {showHexMesh && (
        <>
          <path
            d={SYRIA_OUTLINE}
            fill="url(#ssc-hex)"
            opacity={0.65}
          />
          {!shouldReduce &&
            CELLULAR_HEXAGONS.map((hex, i) => (
              <motion.polygon
                key={`hex-${i}`}
                points={`${hex.cx},${hex.cy - hex.r} ${hex.cx + hex.r * 0.866},${hex.cy - hex.r * 0.5} ${hex.cx + hex.r * 0.866},${hex.cy + hex.r * 0.5} ${hex.cx},${hex.cy + hex.r} ${hex.cx - hex.r * 0.866},${hex.cy + hex.r * 0.5} ${hex.cx - hex.r * 0.866},${hex.cy - hex.r * 0.5}`}
                fill={alpha(palette.primary, 0.04)}
                stroke={alpha(palette.primary, 0.28)}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
              />
            ))}
        </>
      )}

      {/* Choropleth blobs (one soft disc per governorate) */}
      {choropleth &&
        SYRIA_GOVS.map((g) => {
          const entry = choropleth[g.id];
          if (!entry) return null;
          const [low, high] = choroplethScale;
          const fill = lerpColor(low, high, entry.value, 0.55);
          return (
            <g key={`ch-${g.id}`}>
              <motion.circle
                initial={false}
                animate={{ opacity: 1, r: 38 }}
                cx={g.x}
                cy={g.y}
                fill={fill}
              />
              {entry.label && (
                <text
                  x={g.x}
                  y={g.y + 3}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize="10"
                  fontWeight="900"
                  fill={palette.ink}
                >
                  {entry.label}
                </text>
              )}
            </g>
          );
        })}

      {/* Coverage bloom (used by control / coverage slides) */}
      {coverage?.map((c, i) => (
        <motion.circle
          key={`cov-${i}`}
          initial={false}
          animate={{ r: c.radius ?? 60, opacity: 0.28 }}
          cx={c.x}
          cy={c.y}
          fill={alpha(c.color ?? palette.primary, 0.18)}
          stroke={alpha(c.color ?? palette.primary, 0.65)}
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
      ))}

      {/* Backbone (edges between governorates) */}
      {showBackbone &&
        BACKBONE.map(([from, to], idx) => {
          const a = govLookup[from];
          const b = govLookup[to];
          if (!a || !b) return null;
          return (
            <motion.line
              key={`ln-${idx}`}
              variants={pathDraw}
              initial={shouldReduce ? undefined : "hidden"}
              animate="visible"
              custom={idx}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={idx % 2 === 0 ? palette.primary : palette.accent}
              strokeWidth="1.4"
              strokeOpacity={faded ? 0.35 : 0.75}
              strokeDasharray={idx % 3 === 0 ? "5 3" : undefined}
            />
          );
        })}

      {/* Data pulses along backbone */}
      {!shouldReduce &&
        pulses?.map((p, i) => {
          const a = govLookup[p.from];
          const b = govLookup[p.to];
          if (!a || !b) return null;
          return (
            <motion.circle
              key={`pl-${i}`}
              r="4"
              fill={p.color ?? palette.gold}
              filter="url(#ssc-glow)"
              animate={{
                cx: [a.x, b.x],
                cy: [a.y, b.y],
                opacity: [0, 1, 1, 0],
                scale: [0.7, 1.2, 0.7],
              }}
              transition={{
                duration: p.duration ?? 3,
                repeat: Infinity,
                delay: p.delay ?? i * 0.4,
                ease: "easeInOut",
              }}
            />
          );
        })}

      {/* Candidate/upgraded sites */}
      {sites?.map((s, i) => {
        const isUpgraded = s.variant === "upgraded";
        const isSelected = s.variant === "selected";
        const base = s.intensity ?? 1;
        return (
          <motion.circle
            key={`site-${i}`}
            cx={s.x}
            cy={s.y}
            initial={false}
            animate={{ opacity: 0.85 * base, scale: 1 }}
            r={isUpgraded ? 2.5 : 1.6}
            fill={
              isUpgraded
                ? palette.accent
                : isSelected
                  ? palette.gold
                  : palette.primary
            }
          />
        );
      })}

      {/* Area-of-interest overlay (isolation cell / spotlight zone) */}
      {aoi && (
        <g>
          <motion.circle
            initial={false}
            animate={{ opacity: 1, r: aoi.r }}
            transition={{ duration: 0.6 }}
            cx={aoi.cx}
            cy={aoi.cy}
            fill="url(#ssc-aoi)"
          />
          <motion.circle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            cx={aoi.cx}
            cy={aoi.cy}
            r={aoi.r}
            fill="none"
            stroke={palette.accent}
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          {aoi.label && (
            <text
              x={aoi.cx}
              y={aoi.cy - aoi.r - 6}
              textAnchor="middle"
              fontFamily="Cairo, sans-serif"
              fontSize="11"
              fontWeight="900"
              fill={palette.accent}
            >
              {aoi.label}
            </text>
          )}
        </g>
      )}

      {/* Governorate nodes */}
      {SYRIA_GOVS.map((g, idx) => {
        const isHighlight = highlightSet.has(g.id);
        const isCapital = g.tier === "capital";
        const isHub = g.tier === "hub";
        const isRegional = g.tier === "regional";
        const nodeR = isCapital ? 6 : isHub ? 5 : isRegional ? 4 : 3;
        return (
          <g key={g.id}>
            {!shouldReduce && (isCapital || isHub || isHighlight) && (
              <circle
                cx={g.x}
                cy={g.y}
                r={isCapital ? 14 : 10}
                fill="none"
                stroke={isCapital ? palette.accent : palette.primary}
                strokeWidth="1.2"
                className={`network-signal-ring ${idx % 2 === 0 ? "network-signal-ring-delay-1" : "network-signal-ring-delay-2"}`}
                opacity="0.55"
              />
            )}
            <circle
              cx={g.x}
              cy={g.y}
              r={nodeR + (isHighlight ? 1.2 : 0)}
              fill={
                isCapital
                  ? palette.accent
                  : isHighlight
                    ? palette.gold
                    : isHub
                      ? palette.primary
                      : "#ffffff"
              }
              stroke={
                isCapital
                  ? palette.gold
                  : isHighlight
                    ? palette.accent
                    : isHub
                      ? "#ffffff"
                      : palette.primary
              }
              strokeWidth={isCapital ? 2 : 1.4}
              filter="drop-shadow(0 2px 5px rgba(0,0,0,0.15))"
            />
            {isCapital && <circle cx={g.x} cy={g.y} r="2" fill="#ffffff" />}
          </g>
        );
      })}

      {/* Governorate labels */}
      {SYRIA_GOVS.map((g) => {
        if (!labelIds.has(g.id)) return null;
        const isCapital = g.tier === "capital";
        const yOff = ["aleppo", "hasakah", "idlib"].includes(g.id) ? -14 : 17;
        return (
          <g key={`lb-${g.id}`} transform={`translate(${g.x}, ${g.y + yOff})`}>
            <rect
              x={-27}
              y={-9}
              width={54}
              height={17}
              rx={4}
              fill="rgba(255, 255, 255, 0.96)"
              stroke={alpha(palette.primary, 0.30)}
              strokeWidth="0.8"
            />
            <text
              x={0}
              y={3.5}
              textAnchor="middle"
              fill={isCapital ? palette.accent : palette.ink}
              fontFamily={type.arabic}
              fontSize="10"
              fontWeight={isCapital ? "900" : "800"}
            >
              {g.name}
            </text>
          </g>
        );
      })}
    </motion.svg>
  );
};

/** Utility: get anchor coords for a governorate (for external overlays). */
export const govAnchor = (id: GovId): { x: number; y: number } | null => {
  const g = SYRIA_GOVS.find((x) => x.id === id);
  return g ? { x: g.x, y: g.y } : null;
};
