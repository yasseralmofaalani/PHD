// ============================================================
//  SlideStage — the slide chassis.
//
//  All redesigned slides mount inside <SlideStage>. It provides:
//   • correct sizing, padding, rtl, safe overflow
//   • layered atmospheric background (variant-dependent)
//   • an optional corner section indicator ("03 / المساهمات البحثية 04")
//   • a slot for a compact chapter tag (top-leading)
//   • a slot for a compact hero-eyebrow (top-trailing)
//   • prefers-reduced-motion respected via CSS
//
//  Variants:
//   • default : parchment background, subtle grid (content-heavy)
//   • hero    : parchment + radial glow, wider whitespace, no grid
//   • dark    : dark cinematic stage (section markers, opening beats)
//   • map     : slightly darker parchment, no grid (map is the hero)
// ============================================================

import React from "react";
import { palette, space, type, z, alpha } from "./tokens";

type Variant = "default" | "hero" | "dark" | "map";

interface SlideStageProps {
  variant?: Variant;
  /** Compact chapter tag rendered at top-leading (e.g. "الفصل الرابع"). */
  chapter?: string;
  /** Compact section indicator rendered at top-trailing (e.g. "03 · المساهمات البحثية"). */
  sectionTag?: string;
  /** If true the stage will show the fine coordinate grid (default true for `default`). */
  grid?: boolean;
  /** Wide vs. tight side padding. Default: comfortable. */
  padding?: "tight" | "comfortable" | "wide";
  children: React.ReactNode;
  /** Extra style overrides (rare — prefer building patterns inside the stage). */
  style?: React.CSSProperties;
}

const paddingMap: Record<NonNullable<SlideStageProps["padding"]>, string> = {
  tight:        `clamp(8px, 1.2vh, 14px) clamp(14px, 1.8vw, 24px)`,
  comfortable:  `clamp(10px, 1.5vh, 16px) clamp(18px, 2.2vw, 32px)`,
  wide:         `clamp(14px, 2vh, 22px) clamp(28px, 3vw, 48px)`,
};

const backgroundFor = (_v: Variant): string => "transparent";

/** Fine coordinate grid backdrop (GIS motif). */
const gridBackground = (dark: boolean): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  backgroundImage: `
    radial-gradient(ellipse 80% 60% at 12% 8%, ${alpha(palette.primary, dark ? 0.20 : 0.09)} 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 92% 88%, ${alpha(palette.accent, dark ? 0.16 : 0.07)} 0%, transparent 50%),
    radial-gradient(${alpha(palette.primary, dark ? 0.30 : 0.13)} 1px, transparent 1px)
  `,
  backgroundSize: "100% 100%, 100% 100%, 28px 28px",
  pointerEvents: "none",
  zIndex: z.bg,
});

export const SlideStage: React.FC<SlideStageProps> = ({
  variant = "default",
  chapter,
  sectionTag,
  grid,
  padding = "comfortable",
  children,
  style,
}) => {
  const dark = variant === "dark";
  const showGrid = grid ?? false;

  return (
    <div
      className={`slide slide-stage stage-${variant}`}
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: paddingMap[padding],
        boxSizing: "border-box",
        fontFamily: type.arabic,
        color: dark ? palette.darkInk : palette.ink,
        background: backgroundFor(variant),
        ...style,
      }}
    >
      {/* Background layers */}
      {showGrid && <div style={gridBackground(dark)} />}

      {/* Optional corner meta */}
      {(chapter || sectionTag) && (
        <div
          style={{
            position: "absolute",
            top: space.md,
            insetInlineStart: space.xl,
            insetInlineEnd: space.xl,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: z.chrome,
            fontSize: type.micro,
            fontWeight: 800,
            letterSpacing: "0.4px",
            color: dark ? palette.darkInkSoft : palette.inkSoft,
          }}
        >
          {chapter ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: palette.accent,
                  boxShadow: `0 0 8px ${alpha(palette.accent, 0.6)}`,
                }}
              />
              {chapter}
            </span>
          ) : (
            <span />
          )}
          {sectionTag && (
            <span
              style={{
                fontFamily: type.numeral,
                letterSpacing: "1.2px",
                opacity: 0.85,
              }}
            >
              {sectionTag}
            </span>
          )}
        </div>
      )}

      {/* Actual content lives above the grid */}
      <div
        style={{
          position: "relative",
          zIndex: z.content,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          // Reserve space for absolute chapter / section chrome so titles never collide.
          paddingTop: chapter || sectionTag ? space.lg + 4 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * SlideTitleBlock — a lightweight, replaces the old SlideHeader for slides
 * that still want a visible title (but with restraint — no big badge card).
 * For truly cinematic hero slides, DO NOT use this; use HeroHeadline instead.
 */
export const SlideTitleBlock: React.FC<{
  eyebrow?: string;
  titleAr: string;
  titleEn?: string;
  lede?: string;
  accent?: "primary" | "accent";
  align?: "start" | "center";
  compact?: boolean;
}> = ({
  eyebrow,
  titleAr,
  titleEn,
  lede,
  accent = "primary",
  align = "start",
  compact = false,
}) => {
  const color = accent === "accent" ? palette.accent : palette.primary;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: compact ? 4 : 6,
        marginBottom: compact ? space.xs : space.sm,
        textAlign: align === "center" ? "center" : "right",
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: type.micro,
            fontWeight: 900,
            letterSpacing: "0.6px",
            color,
          }}
        >
          <span
            style={{
              width: 22,
              height: 2,
              borderRadius: 2,
              background: color,
            }}
          />
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          margin: 0,
          fontSize: compact ? type.h2 : type.h1,
          fontWeight: 900,
          lineHeight: 1.22,
          letterSpacing: "-0.3px",
          color: palette.ink,
        }}
      >
        {titleAr}
      </h1>
      {titleEn && (
        <div
          dir="ltr"
          style={{
            fontFamily: type.numeral,
            fontSize: type.small,
            fontWeight: 700,
            letterSpacing: "1.2px",
            color: palette.inkMuted,
          }}
        >
          {titleEn}
        </div>
      )}
      {lede && (
        <p
          style={{
            margin: "6px 0 0",
            fontSize: type.body,
            fontWeight: 600,
            lineHeight: 1.55,
            color: palette.inkSoft,
            maxWidth: "72ch",
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
};
