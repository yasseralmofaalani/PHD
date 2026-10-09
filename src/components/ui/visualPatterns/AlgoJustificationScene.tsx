// ============================================================
//  AlgoJustificationScene — expressive visual metaphors for the
//  algorithmic trade-off slide (AGA / BPSO / MILP).
//
//  Three live SVG vignettes that make the thesis justification
//  readable from a projector without dense text:
//   • AGA  — DNA helix (biological evolution / exploration)
//   • BPSO — converging particle swarm (collective memory)
//   • MILP — combinatorial explosion crossed out (infeasible)
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, alpha, space, type as typeTokens, radius } from "../../design/tokens";

/* ─── DNA helix (AGA) ─────────────────────────────────────── */

export const DnaHelixViz: React.FC<{ active?: boolean; color?: string }> = ({
  active = true,
  color = palette.accent,
}) => {
  const reduce = useReducedMotion();
  const pairs = [
    { y: 14, x1: 28, x2: 72 },
    { y: 28, x1: 22, x2: 78 },
    { y: 42, x1: 20, x2: 80 },
    { y: 56, x1: 22, x2: 78 },
    { y: 70, x1: 28, x2: 72 },
    { y: 84, x1: 36, x2: 64 },
  ];

  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
      <motion.path
        d="M 28 8 C 10 30, 90 50, 28 92"
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={
          active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0.2, opacity: 0.25 }
        }
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M 72 8 C 90 30, 10 50, 72 92"
        fill="none"
        stroke={alpha(color, 0.55)}
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={
          active
            ? { pathLength: 1, opacity: 0.9 }
            : { pathLength: 0.2, opacity: 0.2 }
        }
        transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      {pairs.map((p, i) => (
        <motion.g key={i}>
          <motion.line
            x1={p.x1}
            y1={p.y}
            x2={p.x2}
            y2={p.y}
            stroke={alpha(color, 0.35)}
            strokeWidth="2"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.15 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
          />
          <motion.circle
            cx={p.x1}
            cy={p.y}
            r="3.2"
            fill={color}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: active ? 1 : 0.4 }}
            transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 280 }}
          />
          <motion.circle
            cx={p.x2}
            cy={p.y}
            r="3.2"
            fill={alpha(color, 0.7)}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: active ? 1 : 0.4 }}
            transition={{ delay: 0.34 + i * 0.08, type: "spring", stiffness: 280 }}
          />
        </motion.g>
      ))}
    </svg>
  );
};

/* ─── Particle swarm (BPSO) ───────────────────────────────── */

export const SwarmViz: React.FC<{ active?: boolean; color?: string }> = ({
  active = true,
  color = palette.primary,
}) => {
  const reduce = useReducedMotion();
  const particles = [
    { x: 18, y: 22, r: 4 },
    { x: 28, y: 58, r: 3.5 },
    { x: 42, y: 18, r: 3.2 },
    { x: 55, y: 72, r: 4.2 },
    { x: 68, y: 28, r: 3.6 },
    { x: 78, y: 62, r: 3.4 },
    { x: 22, y: 78, r: 3 },
    { x: 85, y: 42, r: 3.8 },
  ];
  const gBest = { x: 52, y: 48 };

  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
      <motion.circle
        cx={gBest.x}
        cy={gBest.y}
        r="22"
        fill={alpha(color, 0.08)}
        stroke={alpha(color, 0.2)}
        strokeWidth="1"
        animate={
          reduce || !active
            ? { scale: 1, opacity: 0.5 }
            : { scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={gBest.x}
        cy={gBest.y}
        r="7"
        fill={color}
        stroke="#fff"
        strokeWidth="2"
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 0.85 }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      {particles.map((p, i) => {
        const midX = (p.x + gBest.x) / 2;
        const midY = (p.y + gBest.y) / 2;
        return (
          <motion.g key={i}>
            <motion.line
              x1={p.x}
              y1={p.y}
              x2={gBest.x}
              y2={gBest.y}
              stroke={alpha(color, 0.25)}
              strokeWidth="1.4"
              strokeDasharray="3 3"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: active ? 1 : 0.1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={alpha(color, 0.85)}
              initial={reduce ? false : { cx: p.x, cy: p.y }}
              animate={
                active
                  ? {
                      cx: [p.x, midX, gBest.x + (p.x - gBest.x) * 0.28],
                      cy: [p.y, midY, gBest.y + (p.y - gBest.y) * 0.28],
                    }
                  : { cx: p.x, cy: p.y }
              }
              transition={{
                duration: 2.4,
                delay: i * 0.08,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.g>
        );
      })}
      <text
        x={gBest.x}
        y={gBest.y + 3.5}
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="800"
        fill="#fff"
        fontFamily="Inter, Cairo, sans-serif"
      >
        gBest
      </text>
    </svg>
  );
};

/* ─── Combinatorial explosion (MILP) ──────────────────────── */

export const ExplosionViz: React.FC<{ active?: boolean }> = ({
  active = true,
}) => {
  const reduce = useReducedMotion();
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return {
      x2: 50 + Math.cos(a) * 38,
      y2: 50 + Math.sin(a) * 38,
    };
  });

  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
      {rays.map((r, i) => (
        <motion.line
          key={i}
          x1="50"
          y1="50"
          x2={r.x2}
          y2={r.y2}
          stroke={alpha(palette.error, 0.45)}
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: active ? 1 : 0.15, opacity: active ? 1 : 0.2 }}
          transition={{ delay: 0.05 * i, duration: 0.55 }}
        />
      ))}
      <motion.circle
        cx="50"
        cy="50"
        r="18"
        fill={alpha(palette.error, 0.14)}
        stroke={palette.error}
        strokeWidth="2.5"
        animate={
          reduce || !active
            ? { scale: 1 }
            : { scale: [1, 1.08, 1] }
        }
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <text
        x="50"
        y="48"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill={palette.error}
        fontFamily="Inter, Cairo, sans-serif"
      >
        2ᴺ
      </text>
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill={alpha(palette.error, 0.9)}
        fontFamily="Cairo, sans-serif"
      >
        انفجار تركيبي
      </text>
      <motion.line
        x1="18"
        y1="82"
        x2="82"
        y2="18"
        stroke={palette.error}
        strokeWidth="4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.85 : 0 }}
        transition={{ delay: 0.55, duration: 0.45 }}
      />
    </svg>
  );
};

/* ─── Card shell used by the slide ────────────────────────── */

export type AlgoSceneKind = "aga" | "bpso" | "milp";

interface AlgoSceneCardProps {
  kind: AlgoSceneKind;
  active: boolean;
  /** Current speaking focus — enlarges border and dims siblings via parent. */
  focused?: boolean;
  titleAr: string;
  titleEn: string;
  /** One short metaphorical line — replaces the long origin paragraph. */
  tagline: string;
  strength: string;
  limit: string;
  /** Short oral cue shown when focused (speaker support). */
  speakCue?: string;
  onDetail?: () => void;
  detailLabel?: string;
}

const kindMeta: Record<
  AlgoSceneKind,
  { color: string; badge: string; soft: string }
> = {
  aga: {
    color: palette.accent,
    badge: "AGA",
    soft: alpha(palette.accent, 0.08),
  },
  bpso: {
    color: palette.primary,
    badge: "BPSO",
    soft: alpha(palette.primary, 0.08),
  },
  milp: {
    color: palette.error,
    badge: "MILP",
    soft: alpha(palette.error, 0.07),
  },
};

const Viz: React.FC<{ kind: AlgoSceneKind; active: boolean; color: string }> = ({
  kind,
  active,
  color,
}) => {
  if (kind === "aga") return <DnaHelixViz active={active} color={color} />;
  if (kind === "bpso") return <SwarmViz active={active} color={color} />;
  return <ExplosionViz active={active} />;
};

export const AlgoSceneCard: React.FC<AlgoSceneCardProps> = ({
  kind,
  active,
  focused = false,
  titleAr,
  titleEn,
  tagline,
  strength,
  limit,
  speakCue,
  onDetail,
  detailLabel,
}) => {
  const meta = kindMeta[kind];
  const rejected = kind === "milp";

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0.14,
        y: active ? 0 : 14,
        scale: focused ? 1.02 : active ? 1 : 0.97,
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: radius.xl,
        overflow: "hidden",
        background: "#fff",
        border: `${focused ? 2.5 : 1.5}px solid ${
          active ? alpha(meta.color, focused ? 0.7 : 0.4) : alpha(palette.ink, 0.06)
        }`,
        boxShadow: focused
          ? `0 16px 40px ${alpha(meta.color, 0.28)}`
          : active
            ? `0 12px 32px ${alpha(meta.color, 0.14)}`
            : "none",
        position: "relative",
        zIndex: focused ? 2 : 1,
      }}
    >
      {/* Visual vignette — the hero of each card */}
      <div
        style={{
          height: "clamp(110px, 16vh, 150px)",
          background: `linear-gradient(165deg, ${meta.soft} 0%, ${alpha(meta.color, 0.02)} 100%)`,
          borderBottom: `1px solid ${alpha(meta.color, 0.12)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div style={{ width: "42%", maxWidth: 140, aspectRatio: "1", opacity: active ? 1 : 0.35 }}>
          <Viz kind={kind} active={active} color={meta.color} />
        </div>

        <div
          style={{
            position: "absolute",
            top: 10,
            insetInlineStart: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 11px",
            borderRadius: radius.round,
            background: alpha(meta.color, 0.14),
            color: meta.color,
            fontFamily: typeTokens.numeral,
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: "0.7px",
          }}
        >
          {meta.badge}
          {rejected && (
            <span style={{ fontSize: 10, fontWeight: 800, opacity: 0.9 }}>مستبعد</span>
          )}
        </div>

        {onDetail && (
          <button
            type="button"
            data-no-advance
            onClick={(e) => {
              e.stopPropagation();
              onDetail();
            }}
            style={{
              position: "absolute",
              top: 10,
              insetInlineEnd: 12,
              background: alpha("#fff", 0.85),
              border: `1px solid ${alpha(meta.color, 0.35)}`,
              borderRadius: radius.sm,
              padding: "3px 8px",
              fontSize: 11,
              fontWeight: 800,
              color: meta.color,
              cursor: "pointer",
              fontFamily: typeTokens.arabic,
            }}
          >
            {detailLabel ?? "تفاصيل ↗"}
          </button>
        )}
      </div>

      {/* Compact text body */}
      <div
        style={{
          padding: `${space.md}px ${space.lg}px ${space.lg}px`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontSize: typeTokens.h3,
              fontWeight: 900,
              color: palette.ink,
              lineHeight: 1.25,
            }}
          >
            {titleAr}
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: typeTokens.numeral,
              color: palette.inkMuted,
              fontWeight: 700,
              letterSpacing: "0.35px",
              marginTop: 2,
            }}
          >
            {titleEn}
          </div>
        </div>

        <div
          style={{
            fontSize: typeTokens.small,
            color: palette.inkSoft,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingTop: 4,
          }}
        >
          <div
            style={{
              background: alpha(palette.success, 0.09),
              color: palette.success,
              borderRadius: radius.md,
              padding: "8px 11px",
              fontSize: 16.5,
              fontWeight: 800,
              lineHeight: 1.35,
              display: "flex",
              gap: 7,
              alignItems: "flex-start",
            }}
          >
            <span style={{ flexShrink: 0, opacity: 0.85 }}>✓</span>
            <span>{strength}</span>
          </div>
          <div
            style={{
              background: alpha(rejected ? palette.error : palette.warning, 0.09),
              color: rejected ? palette.error : palette.accent,
              borderRadius: radius.md,
              padding: "8px 11px",
              fontSize: 16.5,
              fontWeight: 800,
              lineHeight: 1.35,
              display: "flex",
              gap: 7,
              alignItems: "flex-start",
            }}
          >
            <span style={{ flexShrink: 0, opacity: 0.85 }}>{rejected ? "✗" : "⚠"}</span>
            <span>{limit}</span>
          </div>
          {speakCue && focused && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 2,
                fontSize: 14,
                fontWeight: 800,
                lineHeight: 1.4,
                color: meta.color,
                background: alpha(meta.color, 0.08),
                borderRadius: radius.md,
                padding: "7px 10px",
                border: `1px dashed ${alpha(meta.color, 0.35)}`,
              }}
            >
              {speakCue}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
