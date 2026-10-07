// ============================================================
//  Slide 36 — Results section opens, after the section marker.
//
//  Evidence strip only:
//  79,268 sites (thesis database)
//  4 objectives: Coverage, Cost, Energy, Spatial Fairness
//  15 independent runs (Chapter 4)
//  3 environments: Dense Urban, Suburban, Rural (Chapter 6)
//  Publication cards are unnamed. No new result figures.
// ============================================================

import React from "react";
import { SlideStage } from "../../design/SlideStage";

const NAVY = "#10243F";
const DEEP = "#1A3F73";
const CYAN = "#0E8A86";
const PURPLE = "#5346A0";
const PAPER = "#F7F8FA";
const MUTED = "rgba(16, 36, 63, 0.55)";
const LINE = "rgba(16, 36, 63, 0.12)";

const Ar: React.FC<{
  x: number;
  y: number;
  size?: number;
  weight?: number;
  fill?: string;
  children: React.ReactNode;
}> = ({ x, y, size = 12, weight = 700, fill = NAVY, children }) => (
  <text x={x} y={y} textAnchor="middle" fill={fill} fontSize={size} fontWeight={weight} fontFamily="'Cairo', sans-serif" direction="rtl">
    {children}
  </text>
);

function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

const PATHS = [
  {
    d: "M 188 68 C 300 16, 560 16, 612 74",
    color: CYAN,
    kicker: "PLAN / OPTIMIZE",
    line: "AGA + BPSO + Constraint Repair",
    foot: "Coverage / Cost / Energy",
    lx: 400,
    ly: 46,
  },
  {
    d: "M 210 124 C 290 92, 560 92, 608 114",
    color: PURPLE,
    kicker: "BALANCE",
    line: "Spatial Fairness",
    foot: "Coverage / Cost / Energy / SFI",
    lx: 400,
    ly: 122,
  },
  {
    d: "M 196 168 C 290 168, 560 168, 612 146",
    color: DEEP,
    kicker: "CONTROL",
    line: "GIS + Multi-Vendor Orchestration",
    foot: "Isolation / Coordination / Recovery",
    lx: 400,
    ly: 196,
  },
];

const RAIL = ["Data", "Experiments", "Graphs", "Results", "Publications"];

const GLANCE = [
  { value: "79,268", label: "موقعًا خلويًا" },
  { value: "4", label: "أبعاد تقييم رئيسية" },
  { value: "15×", label: "تشغيلًا تجريبيًا للخوارزميات" },
  { value: "3", label: "بيئات تشغيلية" },
];

export const SlideS4_00_EvidenceGateway: React.FC = () => (
  <SlideStage variant="hero" grid={false} padding="tight" style={{ background: `linear-gradient(180deg, #F8F9FB 0%, ${PAPER} 100%)` }}>
    <header style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
      <h1 style={{ margin: 0, fontSize: "clamp(24.8px, 2.32vw, 33.6px)", fontWeight: 900, lineHeight: 1.15, color: NAVY }}>
        النتائج العلمية والإنتاج البحثي
      </h1>
      <p style={{ margin: "3px 0 0", fontFamily: "Inter, sans-serif", fontSize: "clamp(18px, 1.22vw, 22px)", fontWeight: 700, color: "rgba(16,36,63,0.68)" }}>
        من النموذج النظري إلى الدليل التجريبي ثم إلى النشر العلمي
      </p>
    </header>

    <div style={{ position: "relative", zIndex: 2, flex: 1, minHeight: 0 }}>
      <svg viewBox="0 0 1440 408" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="من النموذج النظري إلى الدليل التجريبي والنشر العلمي" style={{ display: "block", direction: "ltr" }}>
        <MapField />
        <LightPaths />
        <EvidenceCore />
        <OutputRail />
        <Publications />
        <Glance />
      </svg>
    </div>

    <div style={{ position: "relative", zIndex: 2, flexShrink: 0, marginTop: 2, paddingTop: 6, borderTop: "1px solid rgba(16,36,63,0.08)", textAlign: "center" }}>
      <p style={{ margin: 0, fontSize: "clamp(19.3px, 1.4vw, 22px)", fontWeight: 800, color: NAVY, lineHeight: 1.45 }}>
        لم تتوقف المساهمة عند بناء النموذج؛ بل انتقلت إلى اختبار تجريبي متعدد الأبعاد وإنتاج علمي قابل للنشر.
      </p>
    </div>
  </SlideStage>
);

function MapField() {
  const cells: Array<[number, number, boolean]> = [
    [0, 0, false],
    [1, 0, true],
    [2, 0, true],
    [3, 0, false],
    [0, 1, true],
    [1, 1, true],
    [2, 1, true],
    [3, 1, false],
    [0, 2, false],
    [1, 2, true],
    [2, 2, false],
    [3, 2, false],
  ];
  return (
    <g>
      <text x={132} y={22} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={800} fill={CYAN}>
        RESEARCH MODEL
      </text>
      <Ar x={132} y={46} size={13} weight={800}>
        النموذج البحثي
      </Ar>
      <path d="M 48 92 L 168 70 L 236 108 L 210 176 L 96 188 L 36 140 Z" fill="rgba(14,138,134,0.06)" stroke={CYAN} strokeWidth={1.15} strokeDasharray="4 3" />
      {cells.map(([q, r, on]) => {
        const x = 62 + q * 34;
        const y = 96 + r * 30;
        return (
          <polygon
            key={`${q}-${r}`}
            points={hexPoints(x, y, 13)}
            fill={on ? "rgba(14,138,134,0.2)" : "#fff"}
            stroke={on ? CYAN : "#D3DAE2"}
            strokeWidth={1}
          />
        );
      })}
    </g>
  );
}

function LightPaths() {
  return (
    <g fill="none" strokeLinecap="round">
      {PATHS.map((p) => (
        <g key={p.kicker}>
          <path d={p.d} stroke={p.color} strokeWidth={7} opacity={0.12} />
          <path d={p.d} stroke={p.color} strokeWidth={1.7} />
          <text x={p.lx} y={p.ly} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={800} fill={p.color}>
            {p.kicker}
          </text>
          <text x={p.lx} y={p.ly + 16} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={700} fill={NAVY}>
            {p.line}
          </text>
          <text x={p.lx} y={p.ly + 32} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={650} fill={MUTED}>
            {p.foot}
          </text>
        </g>
      ))}
    </g>
  );
}

function EvidenceCore() {
  return (
    <g>
      <circle cx={668} cy={118} r={78} fill="rgba(14,138,134,0.08)" />
      <circle cx={668} cy={118} r={62} fill={NAVY} />
      <text x={668} y={112} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={700} fill="rgba(247,251,252,0.72)">
        EXPERIMENTAL
      </text>
      <text x={668} y={132} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={19.8} fontWeight={800} fill="#F7FBFC">
        EVIDENCE
      </text>
      <text x={820} y={214} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={650} fill={MUTED}>
        Real Network Dataset  •  Comparative Evaluation  •  Statistical Validation
      </text>
    </g>
  );
}

function OutputRail() {
  return (
    <g>
      <path d="M 734 118 H 1128" stroke={CYAN} strokeWidth={1.5} strokeLinecap="round" />
      {RAIL.map((label, i) => {
        const x = 778 + i * 86;
        return (
          <g key={label}>
            <circle cx={x} cy={118} r={4.5} fill="#fff" stroke={CYAN} strokeWidth={1.6} />
            <text x={x} y={140} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={700} fill={DEEP}>
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Publications() {
  const sheets = [
    { x: 1168, y: 96, rot: -16 },
    { x: 1224, y: 78, rot: 11 },
    { x: 1196, y: 64, rot: -2 },
  ];
  return (
    <g>
      <text x={1288} y={28} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={800} fill={PURPLE}>
        SCIENTIFIC PUBLICATIONS
      </text>
      <Ar x={1288} y={46} size={12} weight={800} fill={NAVY}>
        النشر العلمي
      </Ar>
      {sheets.map((s, i) => (
        <g key={i} transform={`rotate(${s.rot} ${s.x + 70} ${s.y + 48})`}>
          <rect x={s.x} y={s.y} width={140} height={96} rx={6} fill={i === 2 ? "#fff" : "#F4F7FA"} stroke={i === 2 ? PURPLE : LINE} strokeWidth={i === 2 ? 1.4 : 1} />
          <rect x={s.x + 16} y={s.y + 18} width={72} height={5} rx={2} fill={i === 2 ? PURPLE : "#C5CDD6"} opacity={0.85} />
          <rect x={s.x + 16} y={s.y + 32} width={104} height={3} rx={1.5} fill="#D5DCE3" />
          <rect x={s.x + 16} y={s.y + 42} width={92} height={3} rx={1.5} fill="#D5DCE3" />
          <rect x={s.x + 16} y={s.y + 52} width={80} height={3} rx={1.5} fill="#D5DCE3" />
        </g>
      ))}
    </g>
  );
}

function Glance() {
  return (
    <g>
      <path d="M 28 258 H 1412" stroke={LINE} strokeWidth={1} />
      <text x={720} y={282} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={18} fontWeight={800} fill={CYAN}>
        Evidence at a Glance
      </text>
      {GLANCE.map((item, i) => {
        const x = 180 + i * 360;
        return (
          <g key={item.label}>
            <text x={x} y={318} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={24.8} fontWeight={800} fill={NAVY}>
              {item.value}
            </text>
            <Ar x={x} y={342} size={13} weight={700} fill={MUTED}>
              {item.label}
            </Ar>
          </g>
        );
      })}
    </g>
  );
}
