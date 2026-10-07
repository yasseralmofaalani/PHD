// ============================================================
//  Design Tokens — PhD Defense Presentation
//  Single source of truth for colors / spacing / motion / typography.
//  Extends (never contradicts) the palette already in index.css.
// ============================================================

/** Core academic palette — MUST match index.css :root */
export const palette = {
  primary: "#428177",      // teal (planning / GIS / infra)
  primaryDeep: "#2c5952",
  primarySoft: "rgba(66, 129, 119, 0.12)",
  primaryLine: "rgba(66, 129, 119, 0.32)",

  accent: "#6b1f2a",       // maroon (contribution / decision)
  accentDeep: "#4d151e",
  accentSoft: "rgba(107, 31, 42, 0.12)",
  accentLine: "rgba(107, 31, 42, 0.32)",

  success: "#2e7d5b",      // fairness / positive delta
  successSoft: "rgba(46, 125, 91, 0.14)",

  warning: "#c8951a",      // repair / caution
  warningSoft: "rgba(200, 149, 26, 0.14)",

  error: "#b03a2e",        // infeasible / violation
  errorSoft: "rgba(176, 58, 46, 0.12)",

  gold: "#c8951a",         // highlight / awarded (used sparingly)
  goldSoft: "rgba(200, 149, 26, 0.14)",

  slideBg: "#edebe0",      // parchment
  slideBgSoft: "#f4f2ea",
  slideBgDeep: "#e8e5d8",
  ink: "#0f172a",          // primary text
  inkSoft: "rgba(15, 23, 42, 0.72)",
  inkMuted: "rgba(15, 23, 42, 0.5)",
  hairline: "rgba(15, 23, 42, 0.10)",

  darkStage: "#111c1a",
  darkStageDeep: "#0a1211",
  darkInk: "#f5f4ee",
  darkInkSoft: "rgba(245, 244, 238, 0.75)",
} as const;

/** Spatial identity — Syrian governorates. */
export const geo = {
  /** viewBox: 1000 x 520 canvas (matches Slide00Cover) */
  syriaViewBox: "0 0 1000 520",
} as const;

/** Spacing scale (multiples of 4px). Use inside style objects. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  hero: 48,
} as const;

/** Radii — kept minimal to feel academic. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  round: 999,
} as const;

/** Elevation — soft, low-contrast shadows. */
export const shadow = {
  soft: "0 4px 14px rgba(15, 23, 42, 0.06)",
  card: "0 8px 24px rgba(15, 23, 42, 0.08)",
  hero: "0 20px 60px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(66, 129, 119, 0.10)",
  glow: (rgba: string) => `0 0 22px ${rgba}, 0 8px 20px rgba(15, 23, 42, 0.10)`,
} as const;

/** Type ramp — expressed as clamp() for projector responsiveness. */
export const type = {
  hero: "clamp(56px, 6.5vw, 96px)",       // giant numerals / opener titles
  h1:   "clamp(32px, 3.2vw, 46px)",
  h2:   "clamp(24px, 2.5vw, 34px)",
  h3:   "clamp(20px, 2.0vw, 26px)",
  body: "clamp(18px, 1.7vw, 22px)",
  small:"clamp(16px, 1.4vw, 19px)",
  micro:"clamp(14px, 1.15vw, 16px)",
  numeral: "'Inter', 'Cairo', sans-serif",
  arabic:  "'Cairo', 'Inter', sans-serif",
} as const;

/** Motion — the house curves. Keep the set small and consistent. */
export const easing = {
  /** Cinematic ease — the default. */
  cinema: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Physical spring-like ease. */
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Quick fade-in. */
  quick:  [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Deceleration only. */
  out:    [0, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const duration = {
  quick: 0.24,
  base: 0.45,
  slow: 0.7,
  epic: 1.1,
} as const;

/** Z-index scale — keep chrome above content but below modals. */
export const z = {
  bg: 0,
  content: 5,
  chrome: 10,
  overlay: 40,
  modal: 1000,
} as const;

/** Utility: build an rgba string from a hex + alpha. */
export const alpha = (hex: string, a: number): string => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
