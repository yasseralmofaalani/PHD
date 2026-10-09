// Every value shown in the results section, with its location in the thesis.
// Do not add a value here unless it is printed in the thesis (or, for the
// publication portfolio, in the candidate's publications record المقالات.docx).

export {
  DATASET,
  CH5_FINAL,
  FAIRNESS_EFFECT,
  ISOLATION_BY_ENV,
  VENDORS,
  RESTORATION,
  BPSO_PARAMS,
  AGA_PARAMS,
} from "../contributions/facts";

/** Ch.5 Table 25 — overall comparison with the spatial-fairness formulation. */
export const METHODS = [
  { id: "random", name: "Random", ar: "اختيار عشوائي", coverage: 88.35, cost: 150.3, energy: 91.5, sfi: 0.41 },
  { id: "stdga", name: "Std GA", ar: "GA تقليدية بلا إصلاح", coverage: 94.75, cost: 143.8, energy: 84.1, sfi: 0.48 },
  { id: "nofair", name: "No-Fairness", ar: "النموذج دون قيد العدالة", coverage: 94.9, cost: 139.6, energy: 80.9, sfi: 0.49 },
  { id: "aga", name: "AGA", ar: "AGA المقترحة", coverage: 94.91, cost: 141.2, energy: 82.7, sfi: 0.52 },
  { id: "bpso", name: "BPSO", ar: "BPSO المقترحة", coverage: 95.12, cost: 132.8, energy: 78.3, sfi: 0.71 },
] as const;

/** Ch.5 Tables 23 & 24 — mean and standard deviation over repeated runs. */
export const STABILITY = [
  { metric: "التغطية", unit: "%", aga: { mean: 94.91, sd: 0.38 }, bpso: { mean: 95.12, sd: 0.45 } },
  { metric: "الكلفة", unit: "M$", aga: { mean: 141.2, sd: 2.7 }, bpso: { mean: 132.8, sd: 3.1 } },
  { metric: "الطاقة", unit: "MWh", aga: { mean: 82.7, sd: 1.9 }, bpso: { mean: 78.3, sd: 2.2 } },
  { metric: "SFI", unit: "", aga: { mean: 0.52, sd: 0.04 }, bpso: { mean: 0.71, sd: 0.06 } },
] as const;

/** Ch.5 §6.5.5 — independent-samples t-test over 30 runs per algorithm. */
export const TTEST = {
  runs: 30,
  coverage: "",
  cost: "",
  energy: "",
  sfi: "",
} as const;

/** Ch.5 §6.5.5 — repeated runs with different random seeds for the stability tables. */
export const SEED_RUNS = 15;

/** Ch.5 Table 28 — mean runtime (s). */
export const RUNTIME = { bpso: 118, aga: 142, stdga: 118, random: 25, faster: "16%" } as const;

/** Ch.7 §1.7 — headline deltas of BPSO against AGA. */
export const HEADLINE = {
  coverage: "95.12%",
  coverageDelta: "+0.21%",
  costSaving: "6.0%",
  energySaving: "5.3%",
  sfiGain: "36.5%",
  urbanConcentration: "82%",
} as const;

/** Ch.5 §6.5.2 — convergence analysis. */
export const CONVERGENCE = { fastWindow: 80, stableAfter: 200, iterations: 300 } as const;

/** Ch.6 §4.3.6 — experiment design of the control track. */
export const CH6_DESIGN = {
  governorates: 7,
  urbanScenarios: 10,
  ruralScenarios: 15,
  durationMin: "15–30",
} as const;

/** Ch.6 §5.3.6 — the six evaluation metrics of the control track. */
export const CONTROL_METRICS = [
  "دقة العزل",
  "نسبة الانتشار غير المقصود",
  "تأخير الاستعادة",
  "كفاءة كبح تسليم المكالمات",
  "معدل نجاح التنسيق",
  "نسبة التأثير الجانبي",
] as const;

/** Ch.6 §5.2.6 — the KPIs monitored during isolation and restoration. */
export const MONITORED_KPIS = [
  "توفر الخدمة",
  "نجاح المكالمات الصوتية",
  "نجاح جلسات البيانات",
  "نجاح تسليم المكالمات",
  "إمكانية الوصول إلى الخلايا",
  "حمل تبادل الإشارات",
  "نجاح إعادة الاتصال",
  "الانتشار غير المقصود",
  "زمن اكتمال الاستعادة",
] as const;

/**
 * Publications — thesis front matter «المقالات»; journal tier from the
 * candidate's publications record (المقالات.docx). Contribution links follow
 * the subject of each manuscript.
 */
export const PAPERS = [
  {
    id: "syr",
    contribution: 1 as const,
    title: "Optimizing 5G Deployment in Resource-Constrained Environments: A Real-World Multi-Criteria Optimization Study Using GA and PSO",
    venue: "Syrian Journal for Science and Innovation",
    citation: "Syr J Sci Innov. 2026;4(2):14–26",
    status: "منشور",
    published: true,
    idea: "تقييم أداء خوارزميتي GA وPSO باستخدام بيانات حقيقية لشبكة خلوية لتخطيط ترقية 5G متعددة المعايير",
  },
  {
    id: "review",
    contribution: 2 as const,
    title: "A Hybrid Optimization Framework for Phased 5G Upgrade Planning in Multi-Generation Cellular Networks: A Case Study of Syria",
    venue: "",
    citation: "Submitted / Under Review (Round 1), 2026",
    status: "قيد المراجعة · الجولة الأولى",
    published: false,
    idea: "إطار استمثال هجين رباعي الأهداف يُدمج معيار العدالة المكانية (SFI) في التخطيط المرحلي للترقية",
  },
  {
    id: "comnet",
    contribution: 3 as const,
    title: "GIS-assisted multi-vendor cellular service isolation for emergency and security scenarios",
    venue: "Computer Networks · Q1",
    citation: "Vol. 288, 2026, 112653 · doi:10.1016/j.comnet.2026.112653",
    status: "منشور",
    published: true,
    idea: "عزل الخدمة الخلوية جغرافياً من جانب الشبكة عبر طبقة تنسيق متعددة الموردين كبديل آمن عن التشويش الراديوي",
  },
] as const;

/** Ch.7 §1.2.7 and Ch.6 §5.6 — limits of generalisation. */
export const LIMITS = [
  {
    title: "خصوصية بيئة الدراسة",
    body: "يرتبط تطبيق النموذج ببيئة شبكية وطنية محددة؛ ويتطلب تعميمه معايرة المعاملات التضاريسية والديموغرافية المحلية",
    source: "الفصل 7 · §1.2.7",
  },
  {
    title: "طبيعة البيانات التشغيلية",
    body: "تستند البيانات إلى الحالة التشغيلية القائمة (Snapshot)؛ ويعد تتبع التغيرات الديناميكية الزمنية للطلب امتداداً مستقبلياً",
    source: "الفصل 7 · §1.2.7",
  },
  {
    title: "تنوع المصنّعين المعتمدين",
    body: "تم التحقق التجريبي مع شركتي Huawei وEricsson؛ ويتطلب دمج موردين إضافيين (كـ Nokia وZTE) تطوير وحدات مواءمة برمجية مخصصة",
    source: "الفصل 7 · §1.2.7",
  },
  {
    title: "الأفق الزمني للحساب",
    body: "يتراوح زمن الحساب بين 118 و142 ثانية، وهو ملائم للتخطيط الاستراتيجي والمرحلي، وليس للتحكم اللحظي الآني (Real-Time)",
    source: "الفصل 7 · §1.2.7",
  },
  {
    title: "بيئة المحاكاة والاختبار",
    body: "جرت عمليات التقييم في بيئة محاكاة برمجية لمستوى التحكم (Control Plane) لضمان عدم التأثير المباشر على الشبكات الإنتاجية الفعلية",
    source: "الفصل 6 · §5.6",
  },
] as const;

/** Ch.7 §2.2.7 — practical recommendations derived from the results. */
export const IMPACT = [
  {
    contribution: 1 as const,
    title: "الترقية المرحلية الرشيدة",
    body: "توظيف خوارزمية BPSO لتوجيه اختيار المحطات الراديوية ذات الأولوية للترقية في المراحل الأولى، بهدف تحقيق أكبر تحسن ممكن في التغطية مقابل التكلفة، مع خفض النفقات الرأسمالية (CAPEX).",
    evidence: "وفر استثماري بنسبة 6.0%",
  },
  {
    contribution: 2 as const,
    title: "إلزامية معيار العدالة المكانية",
    body: "اعتماد مؤشر Jain المكاني كقيد تخطيطي ملزم لتقليص الفجوة الرقمية بين المراكز الحضرية والمناطق الريفية",
    evidence: "SFI يصل إلى 0.71 وفاقد تغطية ≤ 0.1%",
  },
  {
    contribution: 3 as const,
    title: "الحوكمة المكانية في الطوارئ",
    body: "اعتماد طبقة تنسيق راديوية مبنية بنظم GIS للتحكم الدقيق بالخدمة كبديل هندسي آمن للتشويش الترددي",
    evidence: "دقة عزل 97.5% في المناطق الحضرية",
  },
] as const;

/** Abstract, closing paragraph — quoted from the Arabic الملخص. */
export const CLOSING_QUOTE =
  "قدمت هذه الأطروحة نموذجاً علمياً وتطبيقياً متفرداً يردم الهوة بين تخطيط السعة الراديوية والتحكم الأمني والتشغيلي للشبكات";
