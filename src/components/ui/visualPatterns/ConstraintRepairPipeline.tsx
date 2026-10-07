import React from "react";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";

type Node = {
  k: string;
  ar: string;
  en: string;
  color: string;
  note?: string;
};

const CORE: Node[] = [
  { k: "01", ar: "حل مرشح", en: "Candidate", color: palette.primary },
  { k: "02", ar: "فحص القيود", en: "Constraint Check", color: palette.primaryDeep },
  { k: "03", ar: "ميزانية؟", en: "Budget", color: palette.error, note: "تجاوز الميزانية → إزالة المواقع ذات المساهمة الأقل" },
  { k: "04", ar: "تغطية؟", en: "Coverage", color: palette.warning, note: "نقص التغطية → إضافة المواقع ذات أفضل Coverage/Cost" },
];

const SPATIAL: Node = {
  k: "05",
  ar: "عدالة مكانية؟",
  en: "Spatial",
  color: palette.accent,
  note: "إعادة توزيع الاختيارات وفق القيد المكاني",
};

const TAIL: Node[] = [
  { k: "R", ar: "إصلاح", en: "Repair", color: palette.gold },
  { k: "F", ar: "حل مجدٍ", en: "Feasible", color: palette.success },
];

/** Deterministic repair operator as a visible optimization stage — not a footnote. */
export const ConstraintRepairPipeline: React.FC<{
  includeSpatial?: boolean;
}> = ({ includeSpatial = false }) => {
  const nodes = includeSpatial ? [...CORE, SPATIAL, ...TAIL] : [...CORE, ...TAIL];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: space.sm, minHeight: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
          gap: 6,
          alignItems: "stretch",
        }}
      >
        {nodes.map((n, i) => (
          <div key={n.k} style={{ display: "flex", alignItems: "stretch", gap: 4 }}>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                borderRadius: 10,
                padding: "8px 6px",
                background: alpha(n.color, 0.12),
                border: `1.5px solid ${alpha(n.color, 0.4)}`,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <div
                style={{
                  fontFamily: typeTokens.numeral,
                  fontWeight: 900,
                  fontSize: 10,
                  color: n.color,
                  letterSpacing: "0.6px",
                }}
              >
                {n.en}
              </div>
              <div style={{ fontWeight: 900, fontSize: typeTokens.small, color: palette.ink, lineHeight: 1.25 }}>
                {n.ar}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div
                style={{
                  alignSelf: "center",
                  fontFamily: typeTokens.numeral,
                  fontWeight: 900,
                  color: alpha(palette.ink, 0.28),
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: includeSpatial ? "1fr 1fr 1fr" : "1fr 1fr",
          gap: 8,
        }}
      >
        {nodes
          .filter((n) => n.note)
          .map((n) => (
            <div
              key={n.k}
              style={{
                padding: "7px 10px",
                borderRadius: 8,
                background: alpha(n.color, 0.08),
                borderRight: `3px solid ${n.color}`,
                fontSize: typeTokens.micro,
                fontWeight: 700,
                color: palette.ink,
                lineHeight: 1.4,
              }}
            >
              {n.note}
            </div>
          ))}
      </div>
    </div>
  );
};
