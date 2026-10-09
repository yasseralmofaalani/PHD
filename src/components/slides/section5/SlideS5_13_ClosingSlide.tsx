import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SYRIA_OUTLINE } from "../contributions/kit";

const INK = "#07110f";
const CREAM = "#f4f2ea";
const GOLD = "#e2c56a";
const TEAL = "#7dcec4";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Governorate anchors on the same 1000×520 canvas as the country outline. */
const NODES = [
  { id: "damascus", x: 286, y: 395, hub: true },
  { id: "daraa", x: 272, y: 475, hub: false },
  { id: "suwayda", x: 306, y: 467, hub: false },
  { id: "quneitra", x: 250, y: 429, hub: false },
  { id: "homs", x: 318, y: 283, hub: true },
  { id: "hama", x: 321, y: 247, hub: false },
  { id: "idlib", x: 312, y: 173, hub: false },
  { id: "aleppo", x: 351, y: 147, hub: true },
  { id: "latakia", x: 252, y: 210, hub: true },
  { id: "tartus", x: 259, y: 268, hub: false },
  { id: "raqqa", x: 491, y: 170, hub: false },
  { id: "deir", x: 576, y: 228, hub: true },
  { id: "hasakah", x: 622, y: 119, hub: true },
] as const;

const LINKS: Array<[string, string]> = [
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

/** Extra sites around the main hubs so the map reads as a cellular network. */
const SITES: Array<{ x: number; y: number; hub: boolean }> = [
  ...NODES,
  { x: 270, y: 384, hub: false },
  { x: 302, y: 408, hub: false },
  { x: 304, y: 270, hub: false },
  { x: 336, y: 296, hub: false },
  { x: 334, y: 136, hub: false },
  { x: 368, y: 162, hub: false },
  { x: 508, y: 186, hub: false },
  { x: 594, y: 214, hub: false },
  { x: 604, y: 132, hub: false },
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

const Tower: React.FC<{ x: number; y: number; hub: boolean; i: number; reduce: boolean }> = ({ x, y, hub, i, reduce }) => {
  const h = hub ? 44 : 28;
  const base = hub ? 8.5 : 5.4;
  const neck = hub ? 2.2 : 1.5;
  const color = hub ? GOLD : TEAL;
  const steel = "rgba(236,239,236,0.94)";
  const top = y - h;
  const half = (yy: number) => base + ((neck - base) * (y - yy)) / h;
  const levels = hub ? 4 : 3;
  const braces: number[] = [];
  for (let k = 1; k <= levels; k += 1) braces.push(y - (h * k) / (levels + 0.15));
  const head = top - (hub ? 8 : 5.2);
  const panelW = hub ? 2.1 : 1.5;
  const panelH = hub ? 7.2 : 4.8;

  return (
    <g>
      <circle cx={x} cy={y} r={hub ? 22 : 12} fill={color} opacity={0.08} />
      {hub && !reduce && (
        <motion.circle
          cx={x}
          cy={y}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          initial={{ r: 8, opacity: 0.35 }}
          animate={{ r: [8, 30], opacity: [0.32, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: i * 0.28, ease: "easeOut" }}
        />
      )}

      {/* Lattice mast */}
      <line x1={x - base} y1={y} x2={x - neck} y2={top} stroke={steel} strokeWidth={hub ? 1.15 : 0.9} strokeLinecap="round" />
      <line x1={x + base} y1={y} x2={x + neck} y2={top} stroke={steel} strokeWidth={hub ? 1.15 : 0.9} strokeLinecap="round" />
      {braces.map((yy, k) => {
        const w = half(yy);
        const prev = k === 0 ? y : braces[k - 1];
        const pw = half(prev);
        return (
          <g key={yy}>
            <line x1={x - w} y1={yy} x2={x + w} y2={yy} stroke={steel} strokeWidth="0.7" opacity="0.85" />
            <line x1={x - pw} y1={prev} x2={x + w} y2={yy} stroke={steel} strokeWidth="0.55" opacity="0.55" />
            <line x1={x + pw} y1={prev} x2={x - w} y2={yy} stroke={steel} strokeWidth="0.55" opacity="0.55" />
          </g>
        );
      })}

      {/* Equipment pad */}
      <rect x={x - base - 1.2} y={y - 0.4} width={(base + 1.2) * 2} height={hub ? 2.2 : 1.6} rx="0.4" fill="rgba(214,219,214,0.55)" />

      {/* Sector antennas */}
      <line x1={x} y1={top} x2={x} y2={head} stroke={steel} strokeWidth={hub ? 1.2 : 0.9} />
      <rect x={x - (hub ? 7.2 : 4.8)} y={head + 1.2} width={panelW} height={panelH} rx="0.45" fill={steel} />
      <rect x={x + (hub ? 5.1 : 3.3)} y={head + 1.2} width={panelW} height={panelH} rx="0.45" fill={steel} />
      <rect x={x - panelW / 2} y={head - 0.6} width={panelW} height={panelH + 1.4} rx="0.45" fill={color} />

      <motion.circle
        cx={x}
        cy={head - 1.6}
        r={hub ? 2.1 : 1.45}
        fill={color}
        filter="url(#close-glow)"
        animate={reduce ? { opacity: 0.95 } : { opacity: [0.45, 1, 0.45] }}
        transition={reduce ? undefined : { duration: 2.2 + (i % 4) * 0.35, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
      />
    </g>
  );
};

export const SlideS5_13_ClosingSlide: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div
      className="slide"
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        background: `radial-gradient(ellipse 80% 70% at 50% 42%, #16302b 0%, ${INK} 68%)`,
        color: CREAM,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 1000 520"
        style={{
          position: "absolute",
          width: "min(96%, 1040px)",
          height: "auto",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="close-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={SYRIA_OUTLINE} fill="rgba(125,206,196,0.08)" stroke="rgba(226,197,106,0.45)" strokeWidth="1.6" />
        {LINKS.map(([a, b]) => {
          const from = byId[a];
          const to = byId[b];
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(226,197,106,0.28)"
              strokeWidth="0.9"
            />
          );
        })}
        {SITES.map((s, i) => (
          <Tower key={`${s.x}-${s.y}`} x={s.x} y={s.y} hub={s.hub} i={i} reduce={!!reduce} />
        ))}
      </svg>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 16,
          border: "1px solid rgba(226,197,106,0.28)",
          borderRadius: 18,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "22px 40px",
          background: "radial-gradient(ellipse 80% 85% at 50% 46%, rgba(7,17,15,0.72) 0%, rgba(7,17,15,0) 70%)",
        }}
      >
        <motion.div
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            width: 56,
            height: 3,
            borderRadius: 99,
            background: GOLD,
            marginBottom: 18,
            transformOrigin: "center",
          }}
        />

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          style={{
            margin: 0,
            fontSize: "clamp(44px, 5.6vw, 76px)",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.4px",
            color: CREAM,
          }}
        >
          شكراً لحسن استماعكم
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: 22, fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 700, color: "rgba(244,242,234,0.62)", letterSpacing: "0.04em" }}
        >
          دمشق · 2026
        </motion.div>
      </div>
    </div>
  );
};

export default SlideS5_13_ClosingSlide;
