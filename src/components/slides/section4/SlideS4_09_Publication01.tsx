// S4_09 — Publication 01 (control / GIS isolation) — PUBLISHED
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  StatusPill,
  MediaPlane,
  MetricMeaning,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { publications, isolationAccuracy } from "../../../data/thesisData";

const pub = publications[0];

export const SlideS4_09_Publication01: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <SlideStage variant="default" chapter="الإنتاج العلمي · 01" sectionTag="PUB 1 · CONTROL">
      <SlideTitleBlock
        eyebrow="المساهمة الثالثة · العزل والتحكم"
        titleAr={pub.titleAr}
        accent="accent"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: space.lg,
          marginTop: space.sm,
        }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", gap: space.md, minHeight: 0 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: space.sm }}>
            <StatusPill label={`${pub.statusLabelEn} / ${pub.statusLabelAr}`} tone="published" />
            <span
              dir="ltr"
              style={{
                fontFamily: typeTokens.numeral,
                fontSize: typeTokens.micro,
                fontWeight: 800,
                color: palette.inkSoft,
              }}
            >
              {pub.year}
            </span>
          </div>

          <p
            dir="ltr"
            style={{
              margin: 0,
              fontSize: typeTokens.small,
              fontWeight: 800,
              color: palette.ink,
              lineHeight: 1.45,
              fontFamily: "Inter, Cairo, sans-serif",
            }}
          >
            {pub.title}
          </p>

          <MetricMeaning
            label="Contribution · CONTROL"
            meaning={pub.contributionLine}
            color={palette.accent}
          />

          <div
            style={{
              padding: space.md,
              borderRadius: 12,
              background: alpha(palette.accent, 0.08),
              border: `1.5px solid ${alpha(palette.accent, 0.28)}`,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span style={{ fontWeight: 900, color: palette.accent, fontSize: typeTokens.small }}>
              {pub.journal} ({pub.publisher})
            </span>
            <span dir="ltr" style={{ fontFamily: typeTokens.numeral, fontSize: typeTokens.micro, fontWeight: 800 }}>
              Vol. {pub.volume}, {pub.year} · Article {pub.articleNumber}
            </span>
            <span
              dir="ltr"
              style={{
                fontFamily: typeTokens.numeral,
                fontSize: typeTokens.body,
                fontWeight: 900,
                color: palette.primaryDeep,
                letterSpacing: "0.3px",
              }}
            >
              DOI {pub.doi}
            </span>
          </div>

          <MetricMeaning
            label="Orchestration (thesis Ch.6)"
            meaning={`نجاح تنسيق متعدد الموردين ≈ ${isolationAccuracy.multiVendorOverall}% — مرتبط بمعمارية GIS في الورقة.`}
            color={palette.primary}
          />
        </motion.div>

        <MediaPlane
          src="thesis_figures/fig29_multivendor_gis_architecture.png"
          fig="Fig. 29"
          caption="معمارية GIS متعددة الموردين — أساس ورقة العزل المنشورة"
          tint={palette.accent}
          style={{ minHeight: 280 }}
        />
      </div>

      <SlideFootnote color={palette.accent} badge="PUBLISHED">
        من نتائج الفصل السادس إلى{" "}
        <span dir="ltr" style={{ fontFamily: typeTokens.numeral }}>
          Computer Networks (Elsevier)
        </span>{" "}
        — حالة النشر: {pub.statusLabelAr}.
      </SlideFootnote>
    </SlideStage>
  );
};
