import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Lightbulb, Milestone, Sunrise } from "lucide-react";
import { SlideStage } from "../../design/SlideStage";
import { HeroHeadline } from "../../design/HeroHeadline";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { fadeUp, t } from "../../design/motion";
import { SyriaSpatialCanvas } from "../../ui/visualPatterns/SyriaSpatialCanvas";

const SEEDS = [
  { code: "SYNTHESIS", codeAr: "خلاصة", icon: Compass, color: "#7dcec8" },
  { code: "LESSON", codeAr: "درس", icon: Lightbulb, color: "#e7c56a" },
  { code: "BOUNDARY", codeAr: "حدود", icon: Milestone, color: "#d7b4bc" },
  { code: "OUTLOOK", codeAr: "آفاق", icon: Sunrise, color: "#9ddec4" },
];

export const ConclusionSectionMarker: React.FC = () => {
  const shouldReduce = useReducedMotion();

  return (
    <SlideStage variant="dark" padding="wide" sectionTag="05 · CONCLUSION & OUTLOOK">
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.38,
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 55%, #000 40%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 55%, #000 40%, transparent 78%)",
          zIndex: 0,
        }}
      >
        <SyriaSpatialCanvas height="100%" showLabels={false} showHexMesh={false} faded />
      </div>

      <motion.div
        aria-hidden
        initial={shouldReduce ? undefined : { opacity: 0.92 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 42%, ${alpha(palette.gold, 0.12)} 0%, transparent 42%),
            radial-gradient(circle at 16% 78%, ${alpha(palette.primary, 0.28)} 0%, transparent 46%),
            radial-gradient(circle at 84% 18%, ${alpha(palette.accent, 0.22)} 0%, transparent 46%)
          `,
          zIndex: 0,
        }}
      />

      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HeroHeadline
          eyebrow="القسم الخامس · الخاتمة والآفاق"
          numeral="05"
          numeralSubtitle="Conclusion & Outlook"
          titleAr="الخاتمة والآفاق المستقبلية"
          titleEn="Synthesis · Lesson · Outlook"
          supporting="من استخلاص النتائج المقاسة إلى ترسيخ الدروس العلمية، وتحديد الأطر الهندسية بدقة، واستشراف آفاق ما بعد الأطروحة."
          theme="dark"
          accent="accent"
        />
      </div>

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
          gap: space.lg,
          padding: `${space.md}px 0 ${space.sm}px`,
          borderTop: `1px solid ${alpha(palette.darkInk, 0.08)}`,
          direction: "ltr",
        }}
      >
        {SEEDS.map((seed, i) => {
          const Icon = seed.icon;
          return (
            <React.Fragment key={seed.code}>
              <motion.div
                initial={{ opacity: 0.92, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12, duration: 0.5 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: space.sm,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: alpha(seed.color, 0.15),
                  border: `1px solid ${alpha(seed.color, 0.55)}`,
                }}
              >
                <Icon size={16} color={seed.color} />
                <span style={{ fontFamily: typeTokens.numeral, fontSize: typeTokens.small, fontWeight: 900, color: palette.darkInk, letterSpacing: "1.2px" }}>
                  {seed.code}
                </span>
                <span style={{ fontSize: typeTokens.small, fontWeight: 700, color: alpha(palette.darkInk, 0.75) }}>· {seed.codeAr}</span>
              </motion.div>
              {i < SEEDS.length - 1 && (
                <span style={{ color: alpha(palette.darkInk, 0.4), fontFamily: typeTokens.numeral, fontSize: typeTokens.h3, fontWeight: 900 }}>→</span>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </SlideStage>
  );
};
