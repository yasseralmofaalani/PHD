import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "../../ui/RevealItem";
import { alpha } from "../../design/tokens";
import { assetUrl } from "../../../lib/assets";
import { C, CountUp, EASE } from "../contributions/kit";

export { C, EASE, Show, ShowG, useBeats, CountUp, Draw, ArrowDefs, T, Pulse, hexPts } from "../contributions/kit";

/* ───────────────────────── Identity ───────────────────────── */

export const BRONZE = "#9a6b12";

export const CONTRIB = {
  1: { color: C.teal, soft: alpha(C.teal, 0.1), ordinal: "المساهمة الأولى", short: "تحسين تخطيط ترقية الشبكة" },
  2: { color: C.maroon, soft: alpha(C.maroon, 0.09), ordinal: "المساهمة الثانية", short: "إدخال العدالة المكانية في القرار" },
  3: { color: BRONZE, soft: alpha(C.gold, 0.12), ordinal: "المساهمة الثالثة", short: "التحكم والعزل المكاني الذكي" },
} as const;

export type ContribKey = keyof typeof CONTRIB;

export const PHASES = ["المساهمات", "المنهجية", "التجارب", "النتائج", "المقارنة", "الأثر", "الإنتاج البحثي"] as const;

const NUM = "Inter, sans-serif";

/* ───────────────────────── Stage ───────────────────────── */

interface ResStageProps {
  phase: number;
  question: string;
  title: string;
  contrib?: ContribKey;
  beats?: string[];
  step?: number;
  goNext?: () => boolean;
  goToStep?: (s: number) => void;
  source?: string;
  children: React.ReactNode;
}

export const ResStage: React.FC<ResStageProps> = ({ phase, question, title, contrib, beats, step = 1, goNext, goToStep, source, children }) => {
  const tone = contrib ? CONTRIB[contrib].color : C.teal;
  const beat = beats ? beats[Math.max(0, Math.min(step, beats.length) - 1)] : undefined;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext?.();
  };

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleClick}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(10px, 1.4vh, 16px) clamp(16px, 2vw, 28px)",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        color: C.ink,
        background: "transparent",
        cursor: goNext ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <header style={{ position: "relative", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div style={{ width: 6, height: 36, borderRadius: 4, background: `linear-gradient(180deg, ${tone}, ${C.gold})`, flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(31.2px, 3.29vw, 42.5px)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.4px",
              }}
            >
              {title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, fontSize: 19.3, fontWeight: 800, color: C.inkSoft }}>
              {contrib && (
                <span style={{ color: "#fff", background: tone, borderRadius: 6, padding: "1px 9px", fontSize: 19 }}>{CONTRIB[contrib].ordinal}</span>
              )}
              <span>{question}</span>
            </div>
          </div>
        </div>

        <div data-no-advance="true" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <PhaseTrack phase={phase} tone={tone} />
          {beats && beats.length > 1 && (
            <>
              <AnimatePresence mode="wait">
                <motion.span
                  key={beat}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  style={{
                    fontSize: 19.3,
                    fontWeight: 800,
                    color: tone,
                    background: alpha(tone, 0.1),
                    borderRadius: 999,
                    padding: "5px 12px",
                    whiteSpace: "nowrap",
                    fontFamily: "Cairo, sans-serif",
                  }}
                >
                  {beat}
                </motion.span>
              </AnimatePresence>
              <StepIndicator totalSteps={beats.length} currentStep={step} onStepClick={goToStep} />
            </>
          )}
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 4, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", marginTop: 10, marginBottom: source ? 14 : 0 }}>
        {children}
      </main>

      {source && (
        <div style={{ position: "absolute", bottom: 6, left: "clamp(24px, 2.8vw, 44px)", zIndex: 6, fontSize: 18, fontWeight: 700, color: C.inkMuted }}>
          المصدر: {source}
        </div>
      )}
    </div>
  );
};

/** Seven-stop journey indicator — where this slide sits between contribution and publication. */
export const PhaseTrack: React.FC<{ phase: number; tone?: string; dark?: boolean }> = ({ phase, tone = C.teal, dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
    {PHASES.map((p, i) => {
      const on = i === phase;
      const past = i < phase;
      return (
        <React.Fragment key={p}>
          <span
            title={p}
            style={{
              fontSize: on ? 12 : 0,
              fontWeight: 900,
              color: dark ? "#fff" : tone,
              background: on ? alpha(dark ? "#ffffff" : tone, dark ? 0.12 : 0.1) : "transparent",
              borderRadius: 999,
              padding: on ? "1px 9px" : 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: on ? 7 : 6,
                height: on ? 7 : 6,
                borderRadius: 99,
                background: on || past ? (dark ? C.gold : tone) : dark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.16)",
                display: "inline-block",
              }}
            />
            {on ? p : null}
          </span>
          {i < PHASES.length - 1 && <span style={{ width: 8, height: 1, background: dark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.14)" }} />}
        </React.Fragment>
      );
    })}
  </div>
);

/* ───────────────────────── Pieces ───────────────────────── */

/** A hero numeral that counts up once revealed. */
export const HeroNumber: React.FC<{
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  size?: string;
  active?: boolean;
}> = ({ value, decimals = 0, prefix, suffix, color = C.teal, size = "clamp(54px, 6.4vw, 96px)", active = true }) => (
  <span style={{ fontFamily: NUM, fontWeight: 900, fontSize: size, lineHeight: 1, color, letterSpacing: "-1.5px" }}>
    <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} active={active} />
  </span>
);

/** Small, quiet statistical annotation — never competes with the main number. */
export const StatTag: React.FC<{ children: React.ReactNode; color?: string; dark?: boolean }> = ({ children, color = C.inkSoft, dark }) => (
  <span
    dir="ltr"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontFamily: NUM,
      fontSize: 19,
      fontWeight: 700,
      color: dark ? "rgba(238,243,241,0.75)" : color,
      border: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.14)"}`,
      borderRadius: 999,
      padding: "1px 8px",
      whiteSpace: "nowrap",
      background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
    }}
  >
    {children}
  </span>
);

/** Latin/number run inside Arabic text. */
export const N: React.FC<{ children: React.ReactNode; color?: string; weight?: number; size?: number | string }> = ({ children, color, weight = 900, size }) => (
  <span dir="ltr" style={{ fontFamily: NUM, fontWeight: weight, color, fontSize: size, unicodeBidi: "isolate" }}>
    {children}
  </span>
);

/**
 * A thesis figure drawn inside an SVG so overlays can be placed in the
 * figure's own pixel coordinates.
 */
export const FigureSvg: React.FC<{
  src: string;
  w: number;
  h: number;
  dim?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ src, w, h, dim = 0, children, style }) => (
  <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block", ...style }}>
    <rect x={0} y={0} width={w} height={h} rx={14} fill="#fff" />
    <image href={assetUrl(src)} x={0} y={0} width={w} height={h} preserveAspectRatio="xMidYMid meet" />
    {dim > 0 && <rect x={0} y={0} width={w} height={h} fill="#f4f2ea" opacity={dim} />}
    {children}
  </svg>
);

/** White card used throughout the section. */
export const Card: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties; top?: boolean }> = ({ children, color = C.teal, style, top }) => (
  <div
    style={{
      background: "#fff",
      border: `1px solid ${C.hair}`,
      borderTop: top ? `3px solid ${color}` : `1px solid ${C.hair}`,
      borderRadius: 16,
      boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
      padding: "12px 16px",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Arrow-chevron connector for HTML flows (points toward reading direction, i.e. left in RTL). */
export const Chevron: React.FC<{ color?: string; size?: number; down?: boolean }> = ({ color = C.inkMuted, size = 22, down }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, transform: down ? "rotate(-90deg)" : undefined }}>
    <path d="M15 5 L8 12 L15 19" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
