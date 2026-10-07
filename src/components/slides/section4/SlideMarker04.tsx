// ============================================================
//  SlideMarker04 — cinematic opener for Section 04.
//  Matches the Section 03 marker language: dark stage, giant
//  numeral, one idea — then seeds RESULTS → PUBLICATIONS.
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, BookOpen, Award } from "lucide-react";
import { SlideStage } from "../../design/SlideStage";
import { HeroHeadline } from "../../design/HeroHeadline";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { fadeUp, t } from "../../design/motion";

const SEEDS = [
  {
    code: "EVIDENCE",
    codeAr: "الأدلة التجريبية",
    icon: BarChart3,
    color: palette.primary,
  },
  {
    code: "PUBLICATIONS",
    codeAr: "الأوراق المحكمة",
    icon: BookOpen,
    color: palette.accent,
  },
  {
    code: "IMPACT",
    codeAr: "الأثر العلمي",
    icon: Award,
    color: palette.gold,
  },
];

export const SlideMarker04: React.FC = () => {
  const shouldReduce = useReducedMotion();

  return (
    <SlideStage
      variant="dark"
      padding="wide"
      sectionTag="04 · RESULTS & PUBLICATIONS"
    >
      <motion.div
        aria-hidden
        initial={shouldReduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 45%, ${alpha(palette.gold, 0.10)} 0%, transparent 40%),
            radial-gradient(circle at 18% 78%, ${alpha(palette.primary, 0.28)} 0%, transparent 45%),
            radial-gradient(circle at 82% 22%, ${alpha(palette.accent, 0.22)} 0%, transparent 45%)
          `,
          zIndex: 0,
        }}
      />

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
          eyebrow="القسم الرابع · من الأدلة إلى العالمية"
          numeral="04"
          numeralSubtitle="Results & Publications"
          titleAr="النتائج والمقالات العلمية المنشورة"
          titleEn="Empirical Evidence · Peer-Reviewed Dissemination"
          supporting="من براهين الشبكة السورية الميدانية إلى أوعية النشر المحكمة — منشور، مقبول، وقيد القرار النهائي."
          theme="dark"
          accent="accent"
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial={shouldReduce ? undefined : "hidden"}
        animate="visible"
        transition={{ ...t.slow, delay: 0.85 }}
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
        {SEEDS.map((s, i) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.code}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12, duration: 0.45 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: space.sm,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: alpha(s.color, 0.15),
                  border: `1px solid ${alpha(s.color, 0.55)}`,
                }}
              >
                <Icon size={16} color={s.color} />
                <span
                  style={{
                    fontFamily: typeTokens.numeral,
                    fontSize: typeTokens.small,
                    fontWeight: 900,
                    color: palette.darkInk,
                    letterSpacing: "1.2px",
                  }}
                >
                  {s.code}
                </span>
                <span
                  style={{
                    fontSize: typeTokens.small,
                    fontWeight: 700,
                    color: alpha(palette.darkInk, 0.75),
                  }}
                >
                  · {s.codeAr}
                </span>
              </motion.div>
              {i < SEEDS.length - 1 && (
                <span
                  style={{
                    color: alpha(palette.darkInk, 0.4),
                    fontFamily: typeTokens.numeral,
                    fontSize: typeTokens.h3,
                    fontWeight: 900,
                  }}
                >
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </SlideStage>
  );
};
