// S4_08 — Transition: empirical results → peer-reviewed dissemination
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  ProcessRiver,
  StoryNode,
  StoryArrow,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { publications } from "../../../data/thesisData";

const PATH = [
  { code: "01", title: "إشكالية البحث", sub: "Research Problem" },
  { code: "02", title: "المنهجية", sub: "Methodology" },
  { code: "03", title: "التحسين", sub: "Optimization" },
  { code: "04", title: "النتائج التجريبية", sub: "Experimental Results" },
  { code: "05", title: "المساهمات العلمية", sub: "Scientific Contributions" },
  { code: "06", title: "المنشورات", sub: "Publications", active: true },
];

export const SlideS4_08_PublicationsOverview: React.FC = () => {
  const reduce = useReducedMotion();
  const pubCounts = {
    published: publications.filter((p) => p.status === "published").length,
    accepted: publications.filter((p) => p.status === "accepted").length,
    pending: publications.filter((p) => p.status === "final_decision").length,
  };

  return (
    <SlideStage variant="hero" chapter="الإنتاج العلمي · انتقال" sectionTag="RESULTS → PUBLICATIONS">
      <SlideTitleBlock
        eyebrow="من الأدلة الميدانية إلى التوثيق المحكم"
        titleAr="من النتائج إلى المنشورات العلمية"
        lede="ثلاث مساهمات أطروحة — تخطيط، عدالة مكانية، وعزل تشغيلي — تنتقل الآن إلى مسار النشر الدولي."
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
        <ProcessRiver
          color={palette.primary}
          steps={PATH.map((s) => ({
            label: s.title,
            sub: s.sub,
          }))}
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: space.lg,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: space.sm,
              padding: space.lg,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${alpha(palette.primary, 0.12)} 0%, ${alpha(palette.primary, 0.03)} 100%)`,
              border: `2px solid ${alpha(palette.primary, 0.3)}`,
            }}
          >
            <span style={{ fontWeight: 900, color: palette.primary, fontSize: typeTokens.small }}>
              ما أنجزناه في القسم
            </span>
            <span style={{ fontWeight: 800, color: palette.ink, fontSize: typeTokens.body, lineHeight: 1.5 }}>
              أرقام S2/S3/S4/S6 مثبتة على{" "}
              <span dir="ltr" style={{ fontFamily: typeTokens.numeral }}>
                79,268
              </span>{" "}
              موقعاً — جاهزة للتوثيق في الأوراق المحكمة.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: space.xs,
            }}
          >
            <StoryArrow color={palette.accent} />
            <div
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontWeight: 900,
                fontSize: typeTokens.micro,
                color: palette.accent,
                letterSpacing: "1px",
              }}
            >
              BRIDGE
            </div>
            <StoryArrow color={palette.accent} />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "center",
              gap: space.sm,
              padding: space.md,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${alpha(palette.accent, 0.14)} 0%, ${alpha(palette.gold, 0.06)} 100%)`,
              border: `2px dashed ${alpha(palette.accent, 0.45)}`,
            }}
          >
            {PATH.slice(3).map((node) => (
              <StoryNode
                key={node.code}
                code={node.code}
                title={node.title}
                sub={node.sub}
                color={node.active ? palette.accent : palette.primary}
                active={node.active}
                style={{ flex: "1 1 28%", maxWidth: 140 }}
              />
            ))}
          </div>
        </motion.div>

        <SlideFootnote color={palette.accent} badge={`${publications.length} papers`}>
          مسار الإنتاج: {pubCounts.published} منشور · {pubCounts.accepted} مقبول · {pubCounts.pending} قيد القرار
          النهائي — التفاصيل في الشرائح التالية.
        </SlideFootnote>
      </div>
    </SlideStage>
  );
};
