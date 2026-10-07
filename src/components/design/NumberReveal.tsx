// ============================================================
//  NumberReveal — an animated, respectful counter.
//
//  - Runs once on first appear (or when `play` toggles true→).
//  - Respects prefers-reduced-motion (falls back to end value).
//  - Preserves exact numeric formatting (thousands separator,
//    decimals, negative sign, currency/percent suffix).
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { palette, type, alpha } from "./tokens";

interface NumberRevealProps {
  /** The final value (parsed numerically). Non-numeric parts kept as suffix/prefix. */
  value: number;
  /** Locale for formatting. Default "en-US" — keeps western digits for scientific readability. */
  locale?: string;
  /** Fraction digits — inferred from value if omitted. */
  fractionDigits?: number;
  /** Prefix (e.g. "$", "≈"). */
  prefix?: string;
  /** Suffix (e.g. "%", " M$", " MWh"). */
  suffix?: string;
  /** Semantic hint for the delta arrow. */
  trend?: "up" | "down" | "neutral";
  /** Time to count to final value. */
  duration?: number;
  /** Force play on mount (skip in-view detection). */
  playImmediately?: boolean;
  /** Font size override — defaults to hero-numeric. */
  size?: string | number;
  /** Text color. */
  color?: string;
  /** Optional label rendered below. */
  label?: string;
  /** Optional English caption below label. */
  captionEn?: string;
  /** Optional emphasis: highlight the sub-caption. */
  labelColor?: string;
}

const inferDecimals = (v: number): number => {
  const s = v.toString();
  if (!s.includes(".")) return 0;
  return Math.min(s.split(".")[1].length, 3);
};

export const NumberReveal: React.FC<NumberRevealProps> = ({
  value,
  locale = "en-US",
  fractionDigits,
  prefix,
  suffix,
  trend = "neutral",
  duration = 1.4,
  playImmediately = true,
  size,
  color,
  label,
  captionEn,
  labelColor,
}) => {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState<number>(value);
  const decimals = fractionDigits ?? inferDecimals(value);
  const fmt = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(value);
      return;
    }
    if (!playImmediately && !inView) return;
    let start: number | null = null;
    const from = value;
    const to = value;
    const ms = duration * 1000;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / ms);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, playImmediately, shouldReduce, value, duration]);

  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "";
  const trendColor =
    trend === "up"
      ? palette.success
      : trend === "down"
        ? palette.accent
        : palette.inkMuted;

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <motion.div
        initial={shouldReduce ? undefined : { opacity: 0.96, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 6,
          fontFamily: type.numeral,
          fontSize: size ?? type.hero,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-1.5px",
          color: color ?? palette.ink,
        }}
      >
        {trend !== "neutral" && (
          <span
            aria-hidden
            style={{
              fontSize: "0.35em",
              color: trendColor,
              marginInlineEnd: 4,
              transform: trend === "down" ? "translateY(-2px)" : undefined,
            }}
          >
            {arrow}
          </span>
        )}
        {prefix && <span style={{ fontSize: "0.55em", opacity: 0.8 }}>{prefix}</span>}
        <span dir="ltr">{fmt.format(display)}</span>
        {suffix && (
          <span style={{ fontSize: "0.45em", fontWeight: 800, opacity: 0.9 }}>{suffix}</span>
        )}
      </motion.div>
      {label && (
        <div
          style={{
            marginTop: 6,
            fontSize: type.small,
            fontWeight: 800,
            color: labelColor ?? palette.ink,
            textAlign: "center",
          }}
        >
          {label}
        </div>
      )}
      {captionEn && (
        <div
          style={{
            marginTop: 2,
            fontFamily: type.numeral,
            fontSize: type.micro,
            fontWeight: 700,
            letterSpacing: "1.2px",
            color: alpha(palette.ink, 0.5),
            textTransform: "uppercase",
          }}
        >
          {captionEn}
        </div>
      )}
    </div>
  );
};
