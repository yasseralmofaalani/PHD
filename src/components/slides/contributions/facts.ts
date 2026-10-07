// Every number shown in the contributions section, with its source in the thesis.
// Do not add values here that are not printed in the thesis.

export const DATASET = {
  totalSites: "79,268", // Ch.4 Table 3
  g2: "21,356", // Ch.4 Table 3
  g3: "27,902", // Ch.4 Table 3
  g4Candidates: "30,010", // Ch.4 Table 3 — 4G sites candidate for upgrade (N)
  operators: 2, // Ch.4 Table 3
  mtn: "29,512", // Ch.6 Table 31
  syriatel: "49,464", // Ch.6 Table 31
  urbanPct: "62%", // Ch.4 Table 3
  ruralPct: "38%", // Ch.4 Table 3
  projection: "WGS 1984 UTM Zone 37N", // Ch.4 §GIS processing
} as const;

export const BPSO_PARAMS = {
  swarm: 150, // Ch.4 Table 5
  iterations: 300,
  c1: "2.0",
  c2: "2.0",
  vmax: "6.0",
  inertia: "0.9 → 0.4",
} as const;

export const AGA_PARAMS = {
  population: 150, // Ch.4 Table 4
  generations: 300,
  tournamentK: 3,
  crossover: "Two-Point",
  crossoverRate: "0.85",
  mutationStart: "0.08", // t < T/3
  mutationEnd: "0.02", // t ≥ 2T/3
} as const;

/** Ch.4 Table 11 (scenario S2) + Table 13 runtime — before spatial fairness. */
export const CH4_RESULTS = {
  bpso: { coverage: 95.14, cost: 130.5, energy: 76.4, runtime: 118 },
  aga: { coverage: 94.9, cost: 139.6, energy: 80.9, runtime: 142 },
  stdGa: { coverage: 94.75, cost: 143.8, energy: 84.1, runtime: 118 },
  random: { coverage: 88.35, cost: 150.3, energy: 91.5, runtime: 25 },
  deltaCoverage: "+0.24%",
  deltaCost: "~6.5%",
  deltaEnergy: "~5.5%",
  runtimeGain: "~16%",
  runs: 15,
  population: 150,
  iterations: 300,
} as const;

/** Ch.4 Tables 9–10 — mean ± std over 15 independent runs. */
export const CH4_STABILITY = {
  aga: { coverage: 94.9, coverageStd: 0.36, cost: 139.6, costStd: 2.5, energy: 80.9, energyStd: 1.8 },
  bpso: { coverage: 95.14, coverageStd: 0.42, cost: 130.5, costStd: 2.9, energy: 76.4, energyStd: 2.1 },
} as const;

/** Ch.4 Table 12 — budget (M$) vs coverage (%). */
export const CH4_BUDGET = [
  { budget: 80, aga: 88.7, bpso: 89.4 },
  { budget: 100, aga: 91.9, bpso: 92.8 },
  { budget: 120, aga: 93.8, bpso: 94.5 },
  { budget: 140, aga: 94.8, bpso: 95.1 },
] as const;

/** Ch.4 Table 6 — planning scenarios used in this chapter (no fairness). */
export const CH4_PLAN_SCENARIOS = [
  { id: "S1", sites: "5,000", sitesN: 5000, budget: "منخفضة" },
  { id: "S2", sites: "10,000", sitesN: 10000, budget: "متوسطة" },
  { id: "S3", sites: "15,000", sitesN: 15000, budget: "مرتفعة" },
] as const;

/** Ch.5 Table 20. */
export const SCENARIOS = [
  { id: "S1", budget: "منخفضة", fairness: "غير مفعّل", sites: "5,000", level: 0 },
  { id: "S2", budget: "متوسطة", fairness: "غير مفعّل", sites: "10,000", level: 0 },
  { id: "S3", budget: "مرتفعة", fairness: "غير مفعّل", sites: "15,000", level: 0 },
  { id: "S4", budget: "متوسطة", fairness: "مفعّل جزئياً", sites: "10,000", level: 1 },
  { id: "S5", budget: "متوسطة", fairness: "مفعّل بالكامل", sites: "10,000", level: 2 },
] as const;

/** Ch.5 Table 26 — effect of the fairness constraint. */
export const FAIRNESS_EFFECT = [
  { scenario: "S2", label: "بدون عدالة", covAga: 94.9, covBpso: 95.14, fiAga: 0.49, fiBpso: 0.53 },
  { scenario: "S4", label: "عدالة جزئية", covAga: 94.86, covBpso: 95.09, fiAga: 0.65, fiBpso: 0.68 },
  { scenario: "S5", label: "عدالة كاملة", covAga: 94.82, covBpso: 95.12, fiAga: 0.52, fiBpso: 0.71 },
] as const;

/** Ch.5 Table 29 / abstract — final comparison with the fairness constraint. */
export const CH5_FINAL = {
  bpso: { coverage: 95.12, cost: 132.8, energy: 78.3, sfi: 0.71, runtime: 118 },
  aga: { coverage: 94.91, cost: 141.2, energy: 82.7, sfi: 0.52, runtime: 142 },
  fairnessGain: "~36%",
  coverageLoss: "≤ 0.1%", // Ch.5 analysis after Table 26
  runs: 30,
} as const;

/** Ch.6 Table 32. */
export const ISOLATION_BY_ENV = [
  { env: "حضري كثيف", accuracy: 97.5, accuracyCi: "± 1.3%", spillover: 8.4, spilloverCi: "± 2.1%", collateral: 4.1 },
  { env: "شبه حضري", accuracy: 94.2, accuracyCi: "± 2.4%", spillover: 21.7, spilloverCi: "± 4.5%", collateral: 11.5 },
  { env: "ريفي", accuracy: 89.6, accuracyCi: "± 3.1%", spillover: 46.8, spilloverCi: "± 7.9%", collateral: 24.3 },
] as const;

/** Ch.6 Table 33. */
export const VENDORS = {
  huawei: { orchestration: 98.1, orchestrationCi: "± 1.1%", handover: 93.2, handoverCi: "± 2.0%", restoration: 96.8, restorationCi: "± 1.5%" },
  ericsson: { orchestration: 97.4, orchestrationCi: "± 1.4%", handover: 92.0, handoverCi: "± 2.3%", restoration: 95.9, restorationCi: "± 1.7%" },
} as const;

/** Ch.6 Table 34. */
export const RESTORATION = [
  { rat: "2G", minutes: 5, label: "< 5 min", detail: "BSC / MSC" },
  { rat: "3G", minutes: 7, label: "< 7 min", detail: "RNC" },
  { rat: "4G", minutes: 10, label: "< 10 min", detail: "EPC Synchronization · ACL Rollback" },
] as const;

/** Ch.6 §experiment design. */
export const CH6_EXPERIMENT = {
  governorates: 7,
} as const;

/** Ch.6 — the six functional layers (Figure 29). */
export const ARCH_LAYERS = [
  "الطبقة المكانية لنظم المعلومات الجغرافية",
  "محرك التنبؤ بالتغطية واستخراج الخلايا",
  "طبقة التجريد متعددة الموردين",
  "محرك التنسيق",
  "طبقة إعادة تهيئة شبكة النفاذ الراديوي / الشبكة الجوهرية",
  "وحدة مراقبة مؤشرات الأداء الرئيسية والاستعادة",
] as const;
