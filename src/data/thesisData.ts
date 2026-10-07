// ===================================================
// THESIS DATA — All scientific data from the thesis
// "Intelligent Planning and Control of Cellular Networks
//  in a Geographic Information Systems Environment"
// Eng. Yasser Almofaalani, 2026
// ===================================================

// ----- DATASET STATISTICS -----
export const datasetStats = {
  totalSites: 79268,
  sites2G: 21356,
  sites3G: 27902,
  sites4G: 30010,
  urbanPercent: 62,
  ruralPercent: 38,
  operators: ['MTN', 'Syriatel'],
  country: 'Syria',
};

// ----- CHAPTER 4 / Scenario S2 — three-objective upgrade (no SFI) -----
// Source: Tables 9–11, 13 (thesis Ch.4)
export const scenarioS2 = {
  scenario: 'Scenario S2 — Baseline multi-objective upgrade',
  chapter: 4,
  coverage: {
    bpso: 95.14,
    aga: 94.9,
  },
  cost: {
    bpso: 130.5, // M$
    aga: 139.6,
  },
  energy: {
    bpso: 76.4, // MWh
    aga: 80.9,
  },
  stdDev: {
    coverage: { bpso: 0.42, aga: 0.36 },
    cost: { bpso: 2.9, aga: 2.5 },
    energy: { bpso: 2.1, aga: 1.8 },
  },
  runtime: {
    bpso: 118, // seconds — Table 13
    aga: 142,
  },
  vsAga: {
    coverageGainPp: 0.24,
    costReductionPct: 6.5,
    energyImprovementPct: 5.5,
    runtimeFasterPct: 16,
  },
};

// ----- CHAPTER 5 — Spatial Fairness Scenario (SFI integrated) -----
// Source: Tables 23–26, 28–29 and thesis abstract (Ch.5)
export const thesisMetrics = {
  scenario: 'Spatial Fairness Scenario',
  chapter: 5,
  sites: 79268,
  coverage: {
    bpso: 95.12,
    aga: 94.91,
  },
  cost: {
    bpso: 132.8, // M$
    aga: 141.2, // M$
  },
  energy: {
    bpso: 78.3, // MWh
    aga: 82.7, // MWh
  },
  fairness: {
    bpso: 0.71, // SFI
    aga: 0.52, // SFI
  },
  runtime: {
    bpso: 118, // seconds
    aga: 142, // seconds
  },
  fairnessGainPct: 36, // ≈ (0.71−0.52)/0.52
};

// ----- IMPROVEMENT GAINS (BPSO vs AGA, Spatial Fairness Scenario) -----
export const improvementGains = {
  coverage: '+0.21 percentage points',
  coveragePercent: 0.22,
  cost: '≈ 6% lower',
  costPercent: 5.95,
  energy: '≈ 5.3% better',
  energyPercent: 5.32,
  fairness: '≈ 36% improvement',
  fairnessPercent: 36.5,
  runtime: 'BPSO 118s vs AGA 142s',
};

// ----- STATISTICAL SIGNIFICANCE -----
export const pValues = {
  coverage: 0.016,
  cost: '<0.001',
  energy: '<0.001',
  fairness: '<0.001',
  runs: 30,
};

// ----- MULTI-VENDOR PERFORMANCE -----
export const multiVendor = {
  huawei: {
    orchestrationSuccess: { mean: 98.1, std: 1.1 },
    handoverSuppression: { mean: 93.2, std: 2.0 },
    restorationConsistency: { mean: 96.8, std: 1.5 },
  },
  ericsson: {
    orchestrationSuccess: { mean: 97.4, std: 1.4 },
    handoverSuppression: { mean: 92.0, std: 2.3 },
    restorationConsistency: { mean: 95.9, std: 1.7 },
  },
};

// ----- ISOLATION ACCURACY (Chapter 6, Table 32) -----
// Scope carefully: 97.5% is Dense Urban isolation accuracy only.
export const isolationAccuracy = {
  urban: 97.5, // Dense Urban ± 1.3%
  suburban: 94.2,
  rural: 89.6,
  spillover: {
    urban: 8.4,
    suburban: 21.7,
    rural: 46.8, // ± 7.9 — rural only; do NOT attribute >46% to suburban
  },
  sideEffect: {
    urban: 4.1,
    suburban: 11.5,
    rural: 24.3,
  },
  /** @deprecated use spillover.rural — kept briefly for older imports */
  ruralSuburban: { spillover: 46.8 },
  multiVendorOverall: 97.4, // Ericsson lower bound; Huawei 98.1%
};

// ----- RESTORATION TIME -----
export const restorationTime = {
  '2G': { max: 5, unit: 'min', label: '2G Networks' },
  '3G': { max: 7, unit: 'min', label: '3G Networks' },
  '4G': { max: 10, unit: 'min', label: '4G Networks' },
};

// ----- SPATIAL FAIRNESS INDEX -----
export const spatialFairnessIndex = {
  range: { min: 0, max: 1 },
  description: 'SFI measures geographic equity of network coverage distribution',
  bpsoWithFairness: 0.71,
  agaWithFairness: 0.52,
  bpsoWithoutFairness: 0.42,
  agaWithoutFairness: 0.33,
  /** Traditional planning bias cited in thesis synthesis (urban investment share). */
  traditionalUrbanInvestmentSharePct: 82,
};

// ----- PUBLISHED PAPERS -----
// Statuses reflect the defense-day scientific record:
//   Pub1 — Published (Elsevier Computer Networks)
//   Pub2 — Accepted
//   Pub3 — Mirror Revision completed → Response submitted → Under Final Decision
export type PublicationStatus =
  | 'published'
  | 'accepted'
  | 'final_decision';

export const publications = [
  {
    id: 'pub1',
    authors: 'Almofaalani, Y., Dakkak, M., Aljoumaa, K.',
    title:
      'GIS-assisted multi-vendor cellular service isolation for emergency and security scenarios',
    titleAr: 'عزل الخدمة الخلوية بمساعدة GIS في البيئات متعددة الموردين',
    contributionLine:
      'معمارية عزل وتشغيل متعدد الموردين بمساعدة GIS لسيناريوهات الطوارئ والأمن',
    contribution: 'control' as const,
    journal: 'Computer Networks',
    publisher: 'Elsevier',
    volume: 288,
    year: 2026,
    articleNumber: '112653',
    doi: '10.1016/j.comnet.2026.112653',
    status: 'published' as PublicationStatus,
    statusLabelAr: 'منشور',
    statusLabelEn: 'PUBLISHED',
  },
  {
    id: 'pub2',
    authors: 'Almofaalani, Y., Dakkak, M., Aljoumaa, K.',
    title:
      'Optimizing 5G Deployment in Resource-Constrained Environments: A Real-World Multi-Criteria Optimization Study Using GA and PSO',
    titleAr: 'تحسين نشر 5G في البيئات مقيدة الموارد — دراسة AGA و BPSO',
    contributionLine:
      'إطار تحسين متعدد الأهداف لترقية الشبكة مع مقارنة معيارية بين AGA و BPSO',
    contribution: 'planning' as const,
    journal: null as string | null,
    year: 2026,
    status: 'accepted' as PublicationStatus,
    statusLabelAr: 'مقبول',
    statusLabelEn: 'ACCEPTED',
  },
  {
    id: 'pub3',
    authors: 'Almofaalani, Y., Dakkak, M., Aljoumaa, K.',
    title:
      'A Hybrid Optimization Framework for Phased 5G Upgrade Planning in Multi-Generation Cellular Networks: A Case Study of Syria',
    titleAr: 'إطار هجين للترقية المرحلية والعدالة المكانية — دراسة حالة سوريا',
    contributionLine:
      'دمج مؤشر العدالة المكانية SFI في نموذج الترقية المرحلية على طوبولوجيا سورية',
    contribution: 'fairness' as const,
    journal: null as string | null,
    year: 2026,
    status: 'final_decision' as PublicationStatus,
    statusLabelAr: 'قيد القرار النهائي',
    statusLabelEn: 'UNDER FINAL DECISION',
    reviewPipeline: [
      'Submission',
      'Review',
      'Mirror Revision',
      'Response / Revised Manuscript',
      'Final Decision Pending',
    ] as const,
  },
];

// ----- CHART DATA HELPERS -----
export const comparisonChartData = [
  { metric: 'Coverage (%)', bpso: 95.12, aga: 94.91, fullMark: 100 },
];

export const costEnergyData = [
  { name: 'BPSO', cost: 132.8, energy: 78.3, fairness: 0.71, runtime: 118 },
  { name: 'AGA', cost: 141.2, energy: 82.7, fairness: 0.52, runtime: 142 },
];

export const multiVendorChartData = [
  {
    metric: 'Orchestration\nSuccess (%)',
    metricShort: 'Orchestration',
    huawei: 98.1,
    ericsson: 97.4,
  },
  {
    metric: 'Handover\nSuppression (%)',
    metricShort: 'Handover Supp.',
    huawei: 93.2,
    ericsson: 92.0,
  },
  {
    metric: 'Restoration\nConsistency (%)',
    metricShort: 'Restoration',
    huawei: 96.8,
    ericsson: 95.9,
  },
];

export const restorationChartData = [
  { gen: '2G', time: 5, label: '< 5 دقائق' },
  { gen: '3G', time: 7, label: '< 7 دقائق' },
  { gen: '4G', time: 10, label: '< 10 دقائق' },
];

export const datasetDistributionData = [
  { name: '2G Sites', value: 21356, percent: 26.9 },
  { name: '3G Sites', value: 27902, percent: 35.2 },
  { name: '4G Candidates', value: 30010, percent: 37.9 },
];

export const urbanRuralData = [
  { name: 'حضري — Urban', value: 62 },
  { name: 'ريفي — Rural', value: 38 },
];
