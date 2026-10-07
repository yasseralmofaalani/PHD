// S4_11 — Publication 03 (fairness / SFI) — UNDER FINAL DECISION
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  StatusPill,
  StoryNode,
  StoryArrow,
  MediaPlane,
  MetricMeaning,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { publications, thesisMetrics } from "../../../data/thesisData";

const pub = publications[2];
const pipeline = pub.reviewPipeline ?? [];

export const SlideS4_11_Publication03: React.FC = () => {
  const reduce = useReducedMotion();
  const pendingIdx = pipeline.length - 1;

  return (
    <SlideStage variant="default" chapter="الإنتاج العلمي · 03" sectionTag="PUB 3 · FAIRNESS">
      <SlideTitleBlock
        eyebrow="المساهمة الثانية · العدالة المكانية SFI"
        titleAr={pub.titleAr}
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
        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: space.sm }}
        >
          <StatusPill label={`${pub.statusLabelEn} / ${pub.statusLabelAr}`} tone="pending" />
          <span dir="ltr" style={{ fontFamily: typeTokens.numeral, fontWeight: 800, color: palette.inkSoft }}>
            {pub.year}
          </span>
        </motion.div>

        <p
          dir="ltr"
          style={{
            margin: 0,
            fontSize: typeTokens.small,
            fontWeight: 800,
            lineHeight: 1.4,
            color: palette.ink,
            fontFamily: "Inter, Cairo, sans-serif",
          }}
        >
          {pub.title}
        </p>
        <MetricMeaning label="Contribution · FAIRNESS" meaning={pub.contributionLine} color={palette.warning} />

        <motion.div
          initial={reduce ? undefined : { opacity: 0.98 }}
          animate={{ opacity: 1 }}
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: space.xs,
            padding: space.md,
            borderRadius: 16,
            background: alpha(palette.warning, 0.08),
            border: `2px solid ${alpha(palette.warning, 0.35)}`,
          }}
        >
          {pipeline.map((step, i) => {
            const isPending = i === pendingIdx;
            const isMirrorDone = step === "Mirror Revision";
            const isResponse = step.includes("Response");
            const sub =
              isMirrorDone
                ? "Completed"
                : isResponse
                  ? "Submitted"
                  : isPending
                    ? "Pending"
                    : undefined;
            return (
              <React.Fragment key={step}>
                {i > 0 && <StoryArrow color={isPending ? palette.warning : palette.primary} />}
                <StoryNode
                  code={`${i + 1}`}
                  title={step}
                  sub={sub}
                  color={isPending ? palette.warning : palette.primary}
                  active={isPending}
                  style={{ flex: "1 1 120px", maxWidth: 160 }}
                />
              </React.Fragment>
            );
          })}
        </motion.div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr 0.9fr",
            gap: space.md,
          }}
        >
          <MediaPlane
            src="thesis_figures/fig24_syria_bpso_geographic_distribution.png"
            fig="Fig. 24"
            caption="توزيع BPSO الجغرافي — عدالة مكانية على طوبولوجيا سوريا"
            tint={palette.warning}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: space.sm,
              padding: space.lg,
              borderRadius: 14,
              background: alpha(palette.primary, 0.06),
              border: `1.5px solid ${alpha(palette.primary, 0.22)}`,
            }}
          >
            <MetricMeaning
              label="SFI · BPSO vs AGA"
              meaning={`${thesisMetrics.fairness.bpso} vs ${thesisMetrics.fairness.aga} — ≈ +${thesisMetrics.fairnessGainPct}% عدالة`}
              color={palette.primary}
            />
            <span style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft, lineHeight: 1.45 }}>
              Mirror Revision Completed → Response Submitted →{" "}
              <strong style={{ color: palette.warning }}>Final Decision Pending</strong>
            </span>
          </div>
        </div>
      </div>

      <SlideFootnote color={palette.warning} badge="REVIEW">
        لا تُستخدم صيغ «Accepted» أو «Published» لهذه الورقة — الحالة الرسمية: {pub.statusLabelAr}.
      </SlideFootnote>
    </SlideStage>
  );
};
