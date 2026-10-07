/** Resolve static files against Vite BASE_URL (dev, GitHub Pages, and `./` production). */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "./";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const clean = path.replace(/^\.\//, "").replace(/^\//, "");
  return `${normalizedBase}${clean}`;
}

/** Thesis figures used on contribution slides — preloaded so slides never open empty. */
export const THESIS_FIGURES = [
  "thesis_figures/fig09_dataset_distribution.png",
  "thesis_figures/fig10_bpso_concept.png",
  "thesis_figures/fig11_aga_flowchart.png",
  "thesis_figures/fig12_bpso_flowchart.png",
  "thesis_figures/fig14_convergence_300_iters.png",
  "thesis_figures/fig15_pareto_coverage_cost.png",
  "thesis_figures/fig16_budget_coverage_curve.png",
  "thesis_figures/fig17_dataset_distribution_sfi.png",
  "thesis_figures/fig18_syria_candidate_sites_map.png",
  "thesis_figures/fig20_bpso_with_sfi_flowchart.jpg",
  "thesis_figures/fig21_aga_with_sfi_flowchart.png",
  "thesis_figures/fig22_performance_comparison_sfi.png",
  "thesis_figures/fig23_convergence_with_sfi.png",
  "thesis_figures/fig24_syria_bpso_geographic_distribution.png",
  "thesis_figures/fig25_pareto_coverage_cost_sfi.png",
  "thesis_figures/fig26_energy_vs_sfi.png",
  "thesis_figures/fig28_radar_chart_comparison.png",
  "thesis_figures/fig29_multivendor_gis_architecture.png",
  "thesis_figures/fig31_gis_spatial_intersection_cells.png",
  "thesis_figures/fig32_restoration_kpi_workflow.png",
  "thesis_figures/gis_lte_coverage_polygons.jpg",
  "thesis_figures/gis_lte_sectors_cells.jpg",
  "thesis_figures/gis_cite4g_sites_table.jpg",
] as const;

let preloaded = false;

export function preloadThesisFigures(): void {
  if (preloaded || typeof window === "undefined") return;
  preloaded = true;
  THESIS_FIGURES.forEach((path) => {
    const img = new Image();
    img.decoding = "async";
    img.src = assetUrl(path);
  });
}
