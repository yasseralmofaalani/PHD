// Spatial Repair: urban-clustered bits → greedy reallocation → rural equity.
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, alpha, type as typeTokens } from "../../design/tokens";

type Phase = "before" | "repair" | "after";

interface SpatialRepairMorphProps {
  autoPlay?: boolean;
  dwellMs?: number;
}

const URBAN = [
  { x: 78, y: 42 }, { x: 86, y: 38 }, { x: 92, y: 48 }, { x: 70, y: 50 },
  { x: 82, y: 56 }, { x: 94, y: 36 }, { x: 66, y: 38 }, { x: 88, y: 62 },
];
const RURAL = [
  { x: 18, y: 28 }, { x: 28, y: 72 }, { x: 14, y: 58 }, { x: 36, y: 22 },
  { x: 22, y: 80 }, { x: 40, y: 68 },
];

export const SpatialRepairMorph: React.FC<SpatialRepairMorphProps> = ({
  autoPlay = true,
  dwellMs = 2400,
}) => {
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(shouldReduce ? "after" : "repair");

  useEffect(() => {
    if (shouldReduce || !autoPlay) return;
    const order: Phase[] = ["before", "repair", "after"];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % order.length;
      setPhase(order[i]);
    }, dwellMs);
    return () => window.clearInterval(id);
  }, [autoPlay, dwellMs, shouldReduce]);

  const moving = URBAN.slice(0, 4).map((u, i) => ({
    from: u,
    to: RURAL[i % RURAL.length],
  }));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox="0 0 110 100" style={{ width: "100%", flex: 1, minHeight: 0 }}>
        <rect x="4" y="8" width="50" height="84" rx="6" fill={alpha(palette.success, 0.08)} stroke={alpha(palette.success, 0.25)} />
        <rect x="56" y="8" width="50" height="84" rx="6" fill={alpha(palette.accent, 0.07)} stroke={alpha(palette.accent, 0.25)} />
        <text x="29" y="18" textAnchor="middle" fontSize="5.5" fontWeight="800" fill={palette.success} fontFamily="Cairo, sans-serif">أرياف</text>
        <text x="81" y="18" textAnchor="middle" fontSize="5.5" fontWeight="800" fill={palette.accent} fontFamily="Cairo, sans-serif">مدن</text>

        {URBAN.map((p, i) => {
          const leaving = phase !== "before" && i < 4;
          return (
            <circle
              key={`u-${i}`}
              cx={p.x}
              cy={p.y}
              r={leaving && phase === "after" ? 0 : 2.4}
              fill={leaving && phase === "repair" ? palette.gold : palette.accent}
              opacity={leaving && phase === "after" ? 0 : 0.9}
            />
          );
        })}
        {RURAL.map((p, i) => (
          <circle key={`r-${i}`} cx={p.x} cy={p.y} r="1.6" fill={palette.primary} opacity={0.35} />
        ))}
        {moving.map((m, i) => {
          const dest = phase === "before" ? m.from : m.to;
          return (
            <motion.circle
              key={`m-${i}`}
              animate={{ cx: dest.x, cy: dest.y, opacity: phase === "before" ? 0 : 1 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              r="2.6"
              fill={palette.success}
            />
          );
        })}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          fontFamily: typeTokens.numeral,
          fontSize: typeTokens.micro,
          fontWeight: 900,
          letterSpacing: "1px",
        }}
      >
        {(["before", "repair", "after"] as Phase[]).map((p) => (
          <span
            key={p}
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              background: phase === p ? palette.accent : alpha(palette.ink, 0.06),
              color: phase === p ? "#fff" : palette.inkMuted,
            }}
          >
            {p === "before" ? "قبل" : p === "repair" ? "Spatial Repair" : "بعد"}
          </span>
        ))}
      </div>
    </div>
  );
};
