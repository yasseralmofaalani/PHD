import React from "react";
import { palette, alpha, type as typeTokens } from "../../design/tokens";

const PHASES = [
  { t: "استكشاف", en: "Exploration", pm: "Pm ≈ 0.08", x: 18, c: palette.accent },
  { t: "توازن", en: "Balance", pm: "تقليل تدريجي", x: 50, c: palette.warning },
  { t: "استغلال", en: "Exploitation", pm: "Pm ≈ 0.02", x: 82, c: palette.success },
] as const;

/** Always-visible Adaptive Mutation curve: high Pm → low Pm across generations. */
export const AdaptiveMutationScene: React.FC = () => (
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
    <svg viewBox="0 0 100 58" style={{ width: "100%", flex: 1, minHeight: 0 }} aria-hidden>
      <defs>
        <linearGradient id="pm-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={alpha(palette.accent, 0.28)} />
          <stop offset="55%" stopColor={alpha(palette.warning, 0.18)} />
          <stop offset="100%" stopColor={alpha(palette.success, 0.22)} />
        </linearGradient>
      </defs>
      <text x="4" y="8" fontSize="3.4" fontWeight="800" fill={palette.inkMuted} fontFamily="Inter, sans-serif">
        Pm
      </text>
      <path d="M 8 12 L 8 48 L 96 48" fill="none" stroke={alpha(palette.ink, 0.2)} strokeWidth="0.5" />
      <path
        d="M 8 16 C 28 17, 42 22, 50 30 S 72 46, 96 46"
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M 8 16 C 28 17, 42 22, 50 30 S 72 46, 96 46 L 96 48 L 8 48 Z" fill="url(#pm-fill)" />
      {PHASES.map((p) => (
        <g key={p.en}>
          <circle cx={p.x} cy={p.en === "Exploration" ? 17 : p.en === "Balance" ? 30 : 45} r="1.6" fill={p.c} />
          <text
            x={p.x}
            y="54"
            textAnchor="middle"
            fontSize="3.2"
            fontWeight="800"
            fill={p.c}
            fontFamily="Cairo, sans-serif"
          >
            {p.t}
          </text>
        </g>
      ))}
    </svg>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 6,
        flexShrink: 0,
      }}
    >
      {PHASES.map((p) => (
        <div
          key={p.en}
          style={{
            textAlign: "center",
            padding: "6px 4px",
            borderRadius: 8,
            background: alpha(p.c, 0.12),
            border: `1px solid ${alpha(p.c, 0.35)}`,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: typeTokens.micro, color: p.c }}>{p.t}</div>
          <div
            dir="ltr"
            style={{
              fontFamily: typeTokens.numeral,
              fontSize: 10,
              fontWeight: 800,
              color: palette.inkSoft,
            }}
          >
            {p.pm}
          </div>
        </div>
      ))}
    </div>
  </div>
);
