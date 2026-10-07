// ============================================================
//  Motion Primitives — canonical framer-motion variants.
//  Every visual pattern in the presentation should compose these
//  rather than hand-crafting animate props. Guarantees consistency
//  and respects prefers-reduced-motion at the CSS level.
// ============================================================

import type { Variants, Transition } from "framer-motion";
import { easing, duration } from "./tokens";

/** Shared base transitions. */
export const t = {
  cinema: { duration: duration.base, ease: easing.cinema } as Transition,
  quick:  { duration: duration.quick, ease: easing.quick } as Transition,
  slow:   { duration: duration.slow,  ease: easing.cinema } as Transition,
  epic:   { duration: duration.epic,  ease: easing.cinema } as Transition,
  spring: { type: "spring", stiffness: 320, damping: 24 } as Transition,
} as const;

/**
 * Fade + rise from below (default for content reveal).
 * IMPORTANT for defense mode: keep opacity near-visible in `hidden`
 * so a slide never looks empty/broken before the first keypress.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0.92, y: 10 },
  visible: { opacity: 1, y: 0, transition: t.quick },
};

/** Strict hide (use sparingly — never for primary contribution content). */
export const fadeUpStrict: Variants = {
  hidden: { opacity: 0.92, y: 8 },
  visible: { opacity: 1, y: 0, transition: t.cinema },
};

/** Fade + drop from above (headers / callouts). */
export const fadeDown: Variants = {
  hidden: { opacity: 0.92, y: -6 },
  visible: { opacity: 1, y: 0, transition: t.cinema },
};

/** Slide from the leading (RTL: right) edge. */
export const fadeLeadingIn: Variants = {
  hidden: { opacity: 0.92, x: 8 },
  visible: { opacity: 1, x: 0, transition: t.cinema },
};

/** Slide from the trailing edge. */
export const fadeTrailingIn: Variants = {
  hidden: { opacity: 0.92, x: -8 },
  visible: { opacity: 1, x: 0, transition: t.cinema },
};

/** Subtle scale-in (numbers, badges, focal elements). */
export const scaleIn: Variants = {
  hidden: { opacity: 0.92, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: t.cinema },
};

/** Hero enter: bigger scale delta + longer curve. */
export const heroEnter: Variants = {
  hidden: { opacity: 0.92, scale: 0.98, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: t.slow },
};

/** Stagger container — apply to a parent then map children with fadeUp/etc.
 *  Default startDelay is 0 so the first beat is immediately readable. */
export const staggerParent = (childDelay = 0.05, startDelay = 0): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: childDelay,
      delayChildren: startDelay,
    },
  },
});

/** SVG path draw-in (stroke-dashoffset animation). Starts readable. */
export const pathDraw: Variants = {
  hidden: { pathLength: 0.88, opacity: 0.88 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: t.slow, opacity: t.quick },
  },
};

/** Layer lift — used by stacked/3D metaphors. Never starts invisible. */
export const layerLift = (index = 0): Variants => ({
  hidden: { opacity: 0.94, y: 6, rotateX: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { ...t.quick, delay: index * 0.04 },
  },
});

/** Reveal a masked block by wiping. Starts fully visible. */
export const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 0 0% 0)", opacity: 0.94 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: t.quick,
  },
};

/** Soft continuous breathing — for background ambience only. */
export const breathe = {
  animate: {
    opacity: [0.85, 1, 0.85],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

/** A pulse ring — for hubs / focal points. */
export const pulseRing = {
  animate: {
    scale: [1, 1.5, 1.9],
    opacity: [0.5, 0.15, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeOut" },
  },
};
