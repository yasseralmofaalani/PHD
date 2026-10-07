// S4_13 — Close the scientific story: data → methods → results → publications
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  ProcessRiver,
  NumberReveal,
  StatusPill,
  MetricMeaning,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import {
  publications,
  thesisMetrics,
  datasetStats,
  improvementGains,
  isolationAccuracy,
} from "../../../data/thesisData";

const FLOW = [
  { label: "بيانات سورية حقيقية", sub: "Real Syrian Data" },
  { label: "GIS", sub: "Spatial layer" },
  { label: "التحسين", sub: "Optimization" },
  { label: "AGA + BPSO", sub: "Algorithms" },
  { label: "عدالة مكانية", sub: "Spatial Fairness" },
  { label: "نتائج كمية", sub: "Quantitative Results" },
  { label: "منشورات", sub: "Publications" },
];

export const SlideS4_13_ResearchOutputSummary: React.FC = () => {
  const reduce = useReducedMotion();
  const d = datasetStats;
  const m = thesisMetrics;

  return (
    <SlideStage variant="hero" chapter="الإنتاج العلمي · ختام" sectionTag="OUTPUT SUMMARY">
      <SlideTitleBlock
        eyebrow="تلخيص مسار البحث"
        titleAr="من البيانات الوطنية إلى الإنتاج العلمي المحكم"
        accent="accent"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: space.md,
          marginTop: space.sm,
        }}
      >
        <ProcessRiver steps={FLOW} color={palette.accent} />

        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: space.sm,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: space.md,
              borderRadius: 14,
              background: alpha(palette.primary, 0.1),
              border: `1.5px solid ${alpha(palette.primary, 0.3)}`,
            }}
          >
            <NumberReveal value={d.totalSites} fractionDigits={0} size={typeTokens.h2} color={palette.primary} />
            <MetricMeaning label="مواقع" meaning={`${d.urbanPercent}% حضري · ${d.ruralPercent}% ريفي`} />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: space.md,
              borderRadius: 14,
              background: alpha(palette.success, 0.1),
              border: `1.5px solid ${alpha(palette.success, 0.3)}`,
            }}
          >
            <div dir="ltr" style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h2, color: palette.success }}>
              {m.coverage.bpso}%
            </div>
            <MetricMeaning label="Coverage · BPSO" meaning={improvementGains.coverage} color={palette.success} />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: space.md,
              borderRadius: 14,
              background: alpha(palette.accent, 0.1),
              border: `1.5px solid ${alpha(palette.accent, 0.3)}`,
            }}
          >
            <div dir="ltr" style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h2, color: palette.accent }}>
              {m.fairness.bpso}
            </div>
            <MetricMeaning label="SFI · BPSO" meaning={improvementGains.fairness} color={palette.accent} />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: space.md,
              borderRadius: 14,
              background: alpha(palette.primaryDeep, 0.1),
              border: `1.5px solid ${alpha(palette.primaryDeep, 0.3)}`,
            }}
          >
            <div dir="ltr" style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h2, color: palette.primaryDeep }}>
              {isolationAccuracy.urban}%
            </div>
            <MetricMeaning label="Urban isolation" meaning="Dense Urban · Ch.6" color={palette.primaryDeep} />
          </div>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: space.md,
            padding: space.md,
            borderRadius: 16,
            background: alpha(palette.ink, 0.04),
            border: `1.5px solid ${alpha(palette.primary, 0.2)}`,
          }}
        >
          {publications.map((p) => {
            const tone =
              p.status === "published" ? "published" : p.status === "accepted" ? "accepted" : "pending";
            return (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  flex: "1 1 200px",
                  maxWidth: 320,
                }}
              >
                <span dir="ltr" style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.micro, color: palette.inkSoft }}>
                  {p.id.toUpperCase()}
                </span>
                <StatusPill label={`${p.statusLabelEn} / ${p.statusLabelAr}`} tone={tone} />
                {p.journal ? (
                  <span dir="ltr" style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.ink, textAlign: "center" }}>
                    {p.journal}
                    {p.publisher ? ` (${p.publisher})` : ""}
                  </span>
                ) : (
                  <span style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft, textAlign: "center" }}>
                    {p.statusLabelEn} · {p.year}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <SlideFootnote color={palette.accent} badge="3 papers">
        Published · Accepted · Under Final Decision — بيانات الحالة من thesisData فقط.
      </SlideFootnote>
    </SlideStage>
  );
};
