import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const slideContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(10px, 1.4vh, 16px) clamp(16px, 2vw, 28px)",
  boxSizing: "border-box",
  fontFamily: "Cairo, sans-serif",
  background: "transparent",
  color: "#000000",
};

export const darkSlideStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(10px, 1.4vh, 16px) clamp(16px, 2vw, 28px)",
  boxSizing: "border-box",
  fontFamily: "Cairo, sans-serif",
  background: "transparent",
  color: "#000000",
};

export const techGridStyle: React.CSSProperties = {
  display: "none",
};

export const techGridDarkStyle: React.CSSProperties = {
  display: "none",
};

export const SectionBadge: React.FC<{
  text?: string;
  variant?: "primary" | "accent" | "neutral" | "success";
}> = ({ text = "الخاتمة والآفاق المستقبلية", variant = "primary" }) => {
  const getColors = () => {
    switch (variant) {
      case "accent":
        return { bg: "#6b1f2a", shadow: "rgba(107, 31, 42, 0.35)" };
      case "success":
        return { bg: "#2e7d5b", shadow: "rgba(46, 125, 91, 0.35)" };
      case "neutral":
        return { bg: "#2c3531", shadow: "rgba(44, 53, 49, 0.35)" };
      case "primary":
      default:
        return { bg: "#428177", shadow: "rgba(66, 129, 119, 0.35)" };
    }
  };

  const { bg, shadow } = getColors();

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0.92 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: bg,
        color: "#ffffff",
        padding: "5px 16px",
        borderRadius: "20px",
        fontSize: "18.6px",
        fontWeight: 800,
        boxShadow: `0 2px 10px ${shadow}`,
        letterSpacing: "0.2px",
      }}
    >
      <Sparkles size={15} />
      <span>{text}</span>
    </motion.div>
  );
};

export interface SlideHeaderProps {
  partNum?: string;
  partTitle?: string;
  chapter?: string;
  titleAr: string;
  titleEn?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  theme?: "light" | "dark";
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  titleAr,
  badge,
  theme = "light",
}) => {
  const isDark = theme === "dark";

  return (
    <div style={{ position: "relative", zIndex: 10, marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
          paddingBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "var(--accent, #6b1f2a)",
              boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              flexShrink: 0,
            }}
          />
          <h1
            style={{
              fontSize: "clamp(28.8px, 3.17vw, 40.1px)",
              fontWeight: 900,
              color: isDark ? "#ffffff" : "#0f172a",
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            {titleAr}
          </h1>
        </div>
        {badge && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export interface SlideFooterProps {
  slideLabel: string;
}

/** Consistent section-5 footer line (RTL). */
export const SlideFooter: React.FC<SlideFooterProps> = ({ slideLabel }) => (
  <div
    style={{
      position: "relative",
      zIndex: 5,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "19px",
      color: "rgba(0,0,0,0.7)",
      fontWeight: 700,
      borderTop: "1px solid rgba(66, 129, 119, 0.2)",
      paddingTop: "6px",
      flexShrink: 0,
    }}
  >
    <span></span>
    <span style={{ fontFamily: "Inter" }}>{slideLabel}</span>
  </div>
);
