// Restoration clocks: 2G <5, 3G <7, 4G <10 — rings fill to meaning.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, type as typeTokens, alpha } from "../../design/tokens";

interface ClockItem {
  gen: string;
  maxMin: number;
  mean: string;
  label: string;
  color: string;
}

const ITEMS: ClockItem[] = [
  { gen: "2G", maxMin: 5, mean: "4.2 min", label: "صوت ورسائل", color: palette.success },
  { gen: "3G", maxMin: 7, mean: "6.1 min", label: "بيانات UMTS", color: palette.primary },
  { gen: "4G", maxMin: 10, mean: "8.7 min", label: "LTE كامل", color: palette.accent },
];

export const RestorationClock: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const r = 36;
  const c = 2 * Math.PI * r;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        alignItems: "center",
        height: "100%",
      }}
    >
      {ITEMS.map((it, i) => {
        const frac = it.maxMin / 10;
        return (
          <div key={it.gen} style={{ textAlign: "center" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", maxWidth: 140 }}>
              <circle cx="50" cy="50" r={r} fill="none" stroke={alpha(it.color, 0.15)} strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={it.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={c}
                initial={{ strokeDashoffset: shouldReduce ? c * (1 - frac) : c }}
                animate={{ strokeDashoffset: c * (1 - frac) }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill={it.color} fontFamily="Inter, sans-serif">
                {it.gen}
              </text>
              <text x="50" y="62" textAnchor="middle" fontSize="9" fontWeight="800" fill={palette.ink} fontFamily="Inter, sans-serif">
                &lt; {it.maxMin} min
              </text>
            </svg>
            <div style={{ fontFamily: typeTokens.numeral, fontSize: typeTokens.small, fontWeight: 900, color: it.color }}>
              {it.mean}
            </div>
            <div style={{ fontSize: typeTokens.micro, fontWeight: 700, color: palette.inkSoft }}>
              {it.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
