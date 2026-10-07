// S4_10 — Publication 02 (planning / AGA+BPSO) — ACCEPTED
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  StatusPill,
  StoryNode,
  StoryArrow,
  ThesisFigure,
  MetricMeaning,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { publications, scenarioS2 } from "../../../data/thesisData";

const pub = publications[1];

export const SlideS4_10_Publication02: React.FC = () => {
  const reduce = useReducedMotion();
  const s = scenarioS2;

  return (
    <SlideStage variant="default" chapter="الإنتاج العلمي · 02" sectionTag="PUB 2 · PLANNING">
      <SlideTitleBlock
        eyebrow="المساهمة الأولى · التخطيط والتحسين"
        titleAr={pub.titleAr}
        accent="primary"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto 1fr",
          gap: space.md,
          marginTop: space.sm,
        }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: space.sm,
          }}
        >
          <StatusPill label={`${pub.statusLabelEn} / ${pub.statusLabelAr}`} tone="accepted" />
          <span dir="ltr" style={{ fontFamily: typeTokens.numeral, fontWeight: 800, color: palette.inkSoft }}>
            {pub.year}
          </span>
          <span style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft }}>
            (لا يُعرض اسم مجلة — غير متوفر في السجل)
          </span>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: space.md, minHeight: 0 }}
        >
          <p
            dir="ltr"
            style={{
              margin: 0,
              fontSize: typeTokens.small,
              fontWeight: 800,
              lineHeight: 1.45,
              color: palette.ink,
              fontFamily: "Inter, Cairo, sans-serif",
            }}
          >
            {pub.title}
          </p>
          <MetricMeaning label="Contribution · PLANNING" meaning={pub.contributionLine} color={palette.primary} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: space.xs,
              padding: space.md,
              borderRadius: 14,
              background: alpha(palette.primary, 0.06),
              border: `1.5px solid ${alpha(palette.primary, 0.22)}`,
            }}
          >
            <StoryNode code="C1" title="المساهمة" sub="AGA + BPSO" color={palette.primary} />
            <StoryArrow color={palette.primary} />
            <StoryNode
              code="R"
              title="النتيجة"
              sub={`Coverage ${s.coverage.bpso}% · ${s.runtime.bpso}s`}
              color={palette.success}
            />
            <StoryArrow color={palette.accent} />
            <StoryNode code="P2" title="المنشور" sub={pub.statusLabelEn} color={palette.accent} active />
          </div>
        </motion.div>

        <ThesisFigure
          src="thesis_figures/fig15_pareto_coverage_cost.png"
          fig="شكل 15"
          caption="Pareto التغطية–التكلفة — S2 · AGA vs BPSO"
          style={{ minHeight: 0, height: "100%" }}
        />
      </div>

      <SlideFootnote color={palette.primary} badge="ACCEPTED">
        حالة الورقة: {pub.statusLabelAr} ({pub.statusLabelEn}) — بدون اختلاق اسم مجلة؛ المحتوى مرتبط بسيناريو S2 والفصل 4.
      </SlideFootnote>
    </SlideStage>
  );
};
