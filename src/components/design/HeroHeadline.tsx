// ============================================================
//  HeroHeadline — the single-idea cinematic composition.
//
//  Use for: section markers, "Research Problem", "Conclusion",
//  "Closing", any slide where ONE message should dominate.
//
//  Anatomy:
//   [ eyebrow ]
//   [ giant numeral or short word ]  (optional)
//   [ Arabic hero line ]
//   [ English underline ]            (optional)
//   [ single supporting sentence ]   (optional)
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, space, type, alpha } from "./tokens";
import { fadeUp, fadeDown, heroEnter, staggerParent, t } from "./motion";

interface HeroHeadlineProps {
  eyebrow?: string;
  numeral?: string;         // e.g. "03", "79,268"
  numeralSubtitle?: string; // e.g. "المساهمات البحثية"
  titleAr: string;
  titleEn?: string;
  supporting?: string;
  align?: "start" | "center";
  theme?: "light" | "dark";
  accent?: "primary" | "accent";
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  eyebrow,
  numeral,
  numeralSubtitle,
  titleAr,
  titleEn,
  supporting,
  align = "center",
  theme = "light",
  accent = "primary",
}) => {
  const shouldReduce = useReducedMotion();
  const isDark = theme === "dark";
  const accentColor = accent === "accent" ? palette.accent : palette.primary;
  const textPrimary = isDark ? palette.darkInk : palette.ink;
  const textSoft = isDark ? palette.darkInkSoft : palette.inkSoft;

  return (
    <motion.div
      variants={staggerParent(0.12, 0.05)}
      initial={shouldReduce ? undefined : "hidden"}
      animate="visible"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "right",
        gap: space.md,
        width: "100%",
        maxWidth: "1180px",
        margin: "0 auto",
      }}
    >
      {eyebrow && (
        <motion.div
          variants={fadeDown}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: space.sm,
            padding: "6px 18px",
            borderRadius: 999,
            background: isDark
              ? alpha(palette.darkInk, 0.06)
              : alpha(accentColor, 0.10),
            border: `1px solid ${alpha(accentColor, isDark ? 0.45 : 0.30)}`,
            color: isDark ? palette.darkInk : accentColor,
            fontSize: type.micro,
            fontWeight: 900,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: accentColor,
              boxShadow: `0 0 12px ${alpha(accentColor, 0.7)}`,
            }}
          />
          {eyebrow}
        </motion.div>
      )}

      {numeral && (
        <motion.div
          variants={heroEnter}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: align === "center" ? "center" : "flex-start",
            lineHeight: 0.9,
          }}
        >
          <span
            style={{
              fontFamily: type.numeral,
              fontSize: type.hero,
              fontWeight: 900,
              letterSpacing: "-2.5px",
              background: `linear-gradient(180deg, ${textPrimary} 0%, ${alpha(accentColor, isDark ? 0.9 : 0.85)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {numeral}
          </span>
          {numeralSubtitle && (
            <span
              style={{
                marginTop: 6,
                fontSize: type.small,
                fontWeight: 800,
                letterSpacing: "1.4px",
                color: isDark ? palette.darkInkSoft : palette.inkSoft,
                textTransform: "uppercase",
              }}
            >
              {numeralSubtitle}
            </span>
          )}
        </motion.div>
      )}

      <motion.h1
        variants={fadeUp}
        style={{
          margin: 0,
          fontFamily: type.arabic,
          fontSize: numeral ? type.h1 : type.hero,
          fontWeight: 900,
          lineHeight: 1.2,
          color: textPrimary,
          letterSpacing: "-0.4px",
          maxWidth: "22ch",
        }}
      >
        {titleAr}
      </motion.h1>

      {titleEn && (
        <motion.div
          variants={fadeUp}
          dir="ltr"
          style={{
            fontFamily: type.numeral,
            fontSize: type.small,
            fontWeight: 700,
            letterSpacing: "2px",
            color: textSoft,
            textTransform: "uppercase",
          }}
        >
          {titleEn}
        </motion.div>
      )}

      <motion.div
        variants={fadeUp}
        style={{
          height: 3,
          width: 96,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${accentColor}, ${alpha(accentColor, 0)})`,
        }}
      />

      {supporting && (
        <motion.p
          variants={fadeUp}
          style={{
            margin: 0,
            maxWidth: "62ch",
            fontSize: type.body,
            fontWeight: 600,
            lineHeight: 1.65,
            color: textSoft,
          }}
        >
          {supporting}
        </motion.p>
      )}
    </motion.div>
  );
};

/** Small helper to also expose the animation curves without importing tokens. */
export const heroTransition = t;
