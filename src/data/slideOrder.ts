import type { SectionId } from "../types";

/**
 * Ordered list of every slide in the deck. The position in this array is the
 * slide index used by navigation, speaker notes and section ranges.
 * Components are resolved by id in `slideRegistry.tsx`.
 */
export const SLIDE_ORDER: ReadonlyArray<{ id: string; section: SectionId }> = [
  // 00 — Cover & agenda
  { id: "cover", section: "cover" },
  { id: "agenda", section: "cover" },

  // 01 — Introduction
  { id: "intro-marker", section: "intro" },
  { id: "intro-why-now", section: "intro" },
  { id: "intro-syrian-problem", section: "intro" },
  { id: "intro-research-problem", section: "intro" },
  { id: "intro-objectives", section: "intro" },
  { id: "intro-questions", section: "intro" },

  // 02 — Theory
  { id: "theory-marker", section: "theory" },
  { id: "theory-related", section: "theory" },
  { id: "theory-algorithms", section: "theory" },
  { id: "theory-gap", section: "theory" },

  // 03 — Research contributions
  { id: "c-marker", section: "contributions" },
  { id: "c-opening", section: "contributions" },
  { id: "c1-pipeline", section: "contributions" },
  { id: "c1-dataset", section: "contributions" },
  { id: "c1-why-hard", section: "contributions" },
  { id: "c1-model", section: "contributions" },
  { id: "c1-two-algorithms", section: "contributions" },
  { id: "c1-repair-engine", section: "contributions" },
  { id: "c1-experiments", section: "contributions" },
  { id: "c1-hero-results", section: "contributions" },
  { id: "c1-stability", section: "contributions" },
  { id: "c1-convergence", section: "contributions" },
  { id: "c1-budget", section: "contributions" },
  { id: "c1-decision", section: "contributions" },
  { id: "c2-problem", section: "contributions" },
  { id: "c2-model-extension", section: "contributions" },
  { id: "c2-math", section: "contributions" },
  { id: "c2-map-transformation", section: "contributions" },
  { id: "c2-fair-search", section: "contributions" },
  { id: "c2-fairness-effect", section: "contributions" },
  { id: "c3-problem", section: "contributions" },
  { id: "c3-architecture", section: "contributions" },
  { id: "c3-isolation", section: "contributions" },
  { id: "c3-operational-results", section: "contributions" },
  { id: "c-three-contributions", section: "contributions" },

  // 04 — Results & publications (condensed: marker + 4 slides)
  { id: "res-marker", section: "results" },
  { id: "res-planning", section: "results" },
  { id: "res-fairness", section: "results" },
  { id: "res-control", section: "results" },
  { id: "res-portfolio", section: "results" },

  // 05 — Conclusion & future outlook (condensed: marker + 4 slides)
  { id: "conclusion-marker", section: "conclusion" },
  { id: "s5-conclusions", section: "conclusion" },
  { id: "s5-recommendations", section: "conclusion" },
  { id: "s5-future", section: "conclusion" },
  { id: "s5-closing", section: "conclusion" },
];

export const slideIndexOf = (id: string): number =>
  SLIDE_ORDER.findIndex((s) => s.id === id);
