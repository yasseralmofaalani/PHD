// S4_03 — Three-objective tension (Ch.4 / S2)
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SlideStage, SlideTitleBlock, MetricMeaning, SlideFootnote } from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { scenarioS2 } from "../../../data/thesisData";

export const SlideS4_03_ResultsAcrossContributions: React.FC = () => {
  const reduce = useReducedMotion();
  const s = scenarioS2;

  const vertices = [
    { id: "cov", label: "التغطية", en: "Coverage", x: 50, y: 8, color: palette.primary },
    { id: "cost", label: "التكلفة", en: "CAPEX", x: 8, y: 88, color: palette.accent },
    { id: "en", label: "الطاقة", en: "Energy", x: 92, y: 88, color: palette.success },
  ];

  return (
    <SlideStage variant="default" chapter="النتائج · 03 · الفصل 4" sectionTag="OBJECTIVE CONFLICT">
      <SlideTitleBlock
        eyebrow={s.scenario}
        titleAr="ثلاثة أهداف متعارضة — الخوارزمية تبحث عن توازن على جبهة باريتو"
        accent="primary"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: space.lg,
          marginTop: space.sm,
        }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0.95, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: "relative",
            borderRadius: 20,
            background: `radial-gradient(circle at 50% 40%, ${alpha(palette.primary, 0.12)} 0%, ${palette.slideBgDeep} 70%)`,
            border: `1.5px solid ${alpha(palette.primary, 0.3)}`,
            padding: space.lg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="0 0 100 100" style={{ width: "min(100%, 420px)", height: "auto", overflow: "visible" }}>
            <defs>
              <linearGradient id="triFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={alpha(palette.primary, 0.2)} />
                <stop offset="50%" stopColor={alpha(palette.accent, 0.12)} />
                <stop offset="100%" stopColor={alpha(palette.success, 0.18)} />
              </linearGradient>
            </defs>
            <polygon
              points="50,12 14,86 86,86"
              fill="url(#triFill)"
              stroke={alpha(palette.ink, 0.35)}
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {[
              [50, 12, 14, 86],
              [14, 86, 86, 86],
              [86, 86, 50, 12],
            ].map((line, i) => (
              <line
                key={i}
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke={alpha(palette.ink, 0.2)}
                strokeWidth="0.8"
              />
            ))}
            <text x="50" y="48" textAnchor="middle" fontSize="5" fontWeight="800" fill={palette.inkSoft}>
              Pareto
            </text>
            <text x="50" y="54" textAnchor="middle" fontSize="4" fontWeight="700" fill={palette.inkSoft}>
              trade-offs
            </text>
            {vertices.map((v) => (
              <g key={v.id}>
                <circle cx={v.x} cy={v.y === 8 ? 12 : 86} r="4.5" fill={v.color} opacity={0.95} />
                <text
                  x={v.x}
                  y={v.y === 8 ? 6 : v.x < 50 ? 94 : 94}
                  textAnchor="middle"
                  fontSize="4.2"
                  fontWeight="900"
                  fill={v.color}
                >
                  {v.label}
                </text>
                <text
                  x={v.x}
                  y={v.y === 8 ? 22 : 98}
                  textAnchor="middle"
                  fontSize="3.2"
                  fontWeight="700"
                  fill={palette.inkSoft}
                >
                  {v.en}
                </text>
              </g>
            ))}
            <path
              d="M 50 28 Q 38 55 28 72"
              fill="none"
              stroke={palette.primaryDeep}
              strokeWidth="1"
              markerEnd="url(#arrow)"
              opacity={0.7}
            />
            <path
              d="M 50 28 Q 62 55 72 72"
              fill="none"
              stroke={palette.success}
              strokeWidth="1"
              opacity={0.7}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              bottom: space.md,
              left: space.md,
              right: space.md,
              display: "flex",
              justifyContent: "space-between",
              gap: space.sm,
              fontSize: typeTokens.micro,
              fontWeight: 800,
              color: palette.inkSoft,
            }}
          >
            <span>↑ تغطية ⇄ ↑ تكلفة</span>
            <span>↑ تغطية ⇄ ↑ طاقة</span>
            <span>↓ تكلفة ⇄ ↓ طاقة (نادراً معاً)</span>
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: space.md, justifyContent: "center" }}>
          <MetricMeaning
            label="سياق S2 · BPSO (مرجع)"
            meaning={`${s.coverage.bpso}% تغطية · ${s.cost.bpso} M$ · ${s.energy.bpso} MWh — نقطة على الجبهة وليست حلّاً لمحور واحد.`}
            color={palette.primary}
          />
          <MetricMeaning
            label="AGA · نفس السيناريو"
            meaning={`${s.coverage.aga}% · ${s.cost.aga} M$ · ${s.energy.aga} MWh — مقارنة خوارزمية تحت نفس القيود.`}
            color={palette.accent}
          />
          <MetricMeaning
            label="دور الاستمثال"
            meaning="AGA و BPSO يستكشفان حلولاً غير مُهيمنة؛ اختيار الخطة يعتمد على أولويات المشغّل لا على محور واحد."
            color={palette.success}
          />
          <div
            style={{
              padding: space.md,
              borderRadius: 14,
              background: alpha(palette.warning, 0.1),
              border: `1.5px solid ${alpha(palette.warning, 0.35)}`,
              fontSize: typeTokens.small,
              fontWeight: 800,
              color: palette.ink,
              lineHeight: 1.45,
            }}
          >
            لا «فوز» على محور واحد — بل{" "}
            <span style={{ color: palette.primary }}>موقع على سطح التعارض</span> بين التغطية والاستثمار والطاقة.
          </div>
        </div>
      </div>

      <SlideFootnote badge="Ch.4" color={palette.primary}>
        الأرقام المعروضة من scenarioS2 (بدون SFI) — تمهيد لشريحة S2 التالية وليس سيناريو العدالة.
      </SlideFootnote>
    </SlideStage>
  );
};
