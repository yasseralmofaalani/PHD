// ============================================================
//  SlideMarker03 — cinematic opener for Section 03.
//
//  Redesign brief: one hero composition, not four pillar cards.
//   • Full-bleed dark stage that breaks visually from Section 02.
//   • A subtle network mesh (Syrian governorate skeleton, faded)
//     drifts behind — establishes the spatial identity we return to.
//   • A giant numeric "03" carved into the composition, so the
//     defense committee immediately feels the transition.
//   • ONE Arabic hero line, ONE English underline, ONE supporting
//     sentence. No card grid.
//   • Three thin code chips (PLAN · FAIR · CONTROL) at the base
//     seed the story that Slide S3.01 will unfold.
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Radio, Scale, ShieldCheck } from "lucide-react";
import { SlideStage } from "../../design/SlideStage";
import { HeroHeadline } from "../../design/HeroHeadline";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { fadeUp, t } from "../../design/motion";
import { SyriaSpatialCanvas } from "../../ui/visualPatterns/SyriaSpatialCanvas";

const PILLARS = [
  {
    code: "PLAN",
    codeAr: "التخطيط الأمثل",
    icon: Radio,
    color: palette.primary,
  },
  {
    code: "FAIR",
    codeAr: "العدالة المكانية",
    icon: Scale,
    color: palette.accent,
  },
  {
    code: "CONTROL",
    codeAr: "التحكم والعزل",
    icon: ShieldCheck,
    color: palette.success,
  },
];

export const SlideMarker03: React.FC = () => {
  const shouldReduce = useReducedMotion();

  return (
    <SlideStage
      variant="dark"
      padding="wide"
      sectionTag="03 · RESEARCH CONTRIBUTIONS"
    >
      {/* Backdrop: faded Syria network drifting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.38,
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 55%, #000 40%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 55%, #000 40%, transparent 78%)",
          zIndex: 0,
        }}
      >
        <SyriaSpatialCanvas
          height="100%"
          showLabels={false}
          showHexMesh={false}
          faded
        />
      </div>

      {/* Vignette + gold rays */}
      <motion.div
        aria-hidden
        initial={shouldReduce ? undefined : { opacity: 0.92 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 45%, ${alpha(palette.gold, 0.10)} 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, ${alpha(palette.primary, 0.25)} 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, ${alpha(palette.accent, 0.20)} 0%, transparent 45%)
          `,
          zIndex: 0,
        }}
      />

      {/* Center hero */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeroHeadline
          eyebrow="القسم الثالث · المحور المركزي للأطروحة"
          numeral="03"
          numeralSubtitle="Research Contributions"
          titleAr="المساهمات البحثية"
          titleEn="Plan · Fair · Control"
          supporting="النمذجة الرياضية للترقية، خوارزميات الاستمثال الاستدلالية الفوقية، مؤشر العدالة المكانية، ومنظومة العزل الجغرافي متعددة الموردين."
          theme="dark"
          accent="accent"
        />
      </div>

      {/* Base — three semantic seeds (NOT cards, NOT content) */}
      <motion.div
        variants={fadeUp}
        initial={shouldReduce ? undefined : "hidden"}
        animate="visible"
        transition={{ ...t.slow, delay: 0.12 }}
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: space.xl,
          padding: `${space.md}px 0 ${space.sm}px`,
          borderTop: `1px solid ${alpha(palette.darkInk, 0.08)}`,
        }}
      >
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <React.Fragment key={p.code}>
              <motion.div
                initial={{ opacity: 0.92, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.15, duration: 0.5 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: space.sm,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: alpha(p.color, 0.15),
                  border: `1px solid ${alpha(p.color, 0.55)}`,
                }}
              >
                <Icon size={16} color={p.color} />
                <span
                  style={{
                    fontFamily: typeTokens.numeral,
                    fontSize: typeTokens.small,
                    fontWeight: 900,
                    color: palette.darkInk,
                    letterSpacing: "1.4px",
                  }}
                >
                  {p.code}
                </span>
                <span
                  style={{
                    fontSize: typeTokens.small,
                    fontWeight: 700,
                    color: alpha(palette.darkInk, 0.75),
                  }}
                >
                  · {p.codeAr}
                </span>
              </motion.div>
              {i < PILLARS.length - 1 && (
                <motion.span
                  initial={{ opacity: 0.92 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.15 }}
                  style={{
                    color: alpha(palette.darkInk, 0.4),
                    fontFamily: typeTokens.numeral,
                    fontSize: typeTokens.h3,
                    fontWeight: 900,
                  }}
                >
                  →
                </motion.span>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </SlideStage>
  );
};
