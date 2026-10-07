import React from "react";
import { motion } from "framer-motion";
import SlideBreadcrumb from "../ui/SlideBreadcrumb";
import SyriaGISMap from "../diagrams/SyriaGISMap";
import RevealItem, { StepIndicator } from "../ui/RevealItem";
import { useStepReveal } from "../../hooks/useStepReveal";
import {
  Radio,
  Zap,
  DollarSign,
  Scale,
  ShieldCheck,
  Layers,
  Compass,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Cpu,
  Binary,
  Network,
  ArrowLeft,
  Sliders,
  Check,
  X,
  Gauge,
  Sparkles,
} from "lucide-react";

const darkSlideStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(14px, 2vh, 22px) clamp(24px, 3vw, 44px)",
  boxSizing: "border-box",
  fontFamily: "Cairo, sans-serif",
  background: "transparent",
  color: "#000000",
};

const techGridStyle: React.CSSProperties = {
  display: "none",
};

// ─────────────────────────────────────────────────────────────
// Slide 04: 4G → 5G Network Evolution Timeline & Strategy
// ─────────────────────────────────────────────────────────────
export const Slide04Evolution: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  const gens = [
    {
      label: "2G",
      year: "1991",
      speed: "64 kbps",
      latency: "600 ms",
      feat: "صوت ورسائل SMS",
      freq: "900/1800 MHz",
      color: "#428177",
    },
    {
      label: "3G",
      year: "2001",
      speed: "2 Mbps",
      latency: "150 ms",
      feat: "بيانات ووسائط",
      freq: "2100 MHz",
      color: "#428177",
    },
    {
      label: "4G",
      year: "2009",
      speed: "150 Mbps",
      latency: "30 ms",
      feat: "نطاق عريض LTE-A",
      freq: "1800/2600 MHz",
      color: "#6b1f2a",
    },
    {
      label: "5G",
      year: "2019",
      speed: "10 Gbps",
      latency: "1 ms",
      feat: "eMBB + URLLC + mMTC",
      freq: "3.5 GHz",
      color: "#428177",
    },
    {
      label: "5G-Adv",
      year: "2025+",
      speed: "20 Gbps",
      latency: "< 0.5 ms",
      feat: "ذكاء اصطناعي مدمج Rel-18",
      freq: "mmWave",
      color: "#6b1f2a",
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "2px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "19px",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                التحول المعياري الدولي
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(27.3px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
              مسار تطور أجيال الاتصالات → 5G-Advanced
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <StepIndicator
              totalSteps={totalSteps}
              currentStep={step}
              onStepClick={goToStep}
            />
            <div
              style={{
                background: "var(--primary)",
                color: "#ffffff",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "19px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Activity size={14} />
              <span>3GPP Rel-15 → Rel-18</span>
            </div>
          </div>
        </div>
      </RevealItem>

      {/* Step 2: Timeline Cards */}
      <RevealItem
        visibleAtStep={2}
        currentStep={step}
        animation="fadeUp"
        style={{ position: "relative", zIndex: 10, margin: "8px 0" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
          }}
        >
          {gens.map((gen, i) => (
            <div
              key={gen.label}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "14px 12px",
                border: gen.label.includes("5G")
                  ? "2px solid var(--accent)"
                  : "1px solid rgba(66, 129, 119, 0.25)",
                boxShadow: gen.label.includes("5G")
                  ? "0 6px 20px rgba(107, 31, 42, 0.12)"
                  : "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "space-between" as const,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "19px",
                      fontFamily: "Inter",
                      color: "#2c3531",
                      fontWeight: 700,
                    }}
                  >
                    {gen.year}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      background: "rgba(66, 129, 119, 0.12)",
                      color: "var(--primary)",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      fontWeight: 800,
                      fontFamily: "Inter",
                    }}
                  >
                    {gen.freq}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "clamp(27.3px, 2.81vw, 35.4px)",
                    fontWeight: 900,
                    fontFamily: "Inter",
                    color: gen.color,
                    margin: "2px 0",
                  }}
                >
                  {gen.label}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#000000",
                    fontWeight: 800,
                    lineHeight: 1.35,
                  }}
                >
                  {gen.feat}
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  paddingTop: "8px",
                  borderTop: "1px dashed rgba(66, 129, 119, 0.2)",
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "3px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    color: "#2c3531",
                  }}
                >
                  <span>السرعة:</span>
                  <strong style={{ fontFamily: "Inter", color: gen.color }}>
                    {gen.speed}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    color: "#2c3531",
                  }}
                >
                  <span>الكمون:</span>
                  <strong style={{ fontFamily: "Inter", color: "#2c3531" }}>
                    {gen.latency}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealItem>

      {/* Step 3: Strategy Comparison */}
      <RevealItem
        visibleAtStep={3}
        currentStep={step}
        animation="fadeUp"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "14px",
          }}
        >
          {/* Greenfield Box */}
          <div
            style={{
              background: "#ffffff",
              border: "1.5px solid var(--accent)",
              borderRadius: "14px",
              padding: "14px 18px",
              boxShadow: "0 4px 14px rgba(107, 31, 42, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <X size={18} color="var(--accent)" />
              <div
                style={{
                  fontSize: "19.3px",
                  fontWeight: 900,
                  color: "var(--accent)",
                }}
              >
                البناء من الصفر (Greenfield)
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              <span
                style={{
                  fontSize: "18px",
                  background: "rgba(107, 31, 42, 0.1)",
                  color: "var(--accent)",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontWeight: 800,
                }}
              >
                كلفة 100%
              </span>
              <span
                style={{
                  fontSize: "18px",
                  background: "rgba(107, 31, 42, 0.1)",
                  color: "var(--accent)",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontWeight: 800,
                }}
              >
                SFI 0.41
              </span>
            </div>
          </div>

          {/* Co-siting Box */}
          <div
            style={{
              background: "var(--primary)",
              borderRadius: "14px",
              padding: "14px 18px",
              color: "#ffffff",
              boxShadow: "0 4px 16px rgba(66, 129, 119, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <Check size={18} color="#ffffff" />
              <div
                style={{ fontSize: "19.3px", fontWeight: 900, color: "#ffffff" }}
              >
                الترقية الانتقائية التشاركية (Co-siting) ← جوهر الأطروحة
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              <span
                style={{
                  fontSize: "18px",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontWeight: 800,
                }}
              >
                وفر 62.4%
              </span>
              <span
                style={{
                  fontSize: "18px",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontWeight: 800,
                }}
              >
                SFI 0.71
              </span>
              <span
                style={{
                  fontSize: "18px",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontWeight: 800,
                }}
              >
                3.5x أسرع
              </span>
            </div>
          </div>
        </div>
      </RevealItem>

      {/* Step 4: Key Takeaway */}
      <RevealItem visibleAtStep={4} currentStep={step} animation="fadeUp">
        <div
          style={{
            background: "var(--accent)",
            borderRadius: "10px",
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ffffff",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Sparkles size={18} color="#ffffff" />
          <span style={{ fontSize: "19px", fontWeight: 700, color: "#ffffff" }}>
            يقدم البحث إطاراً هندسياً يترجم المعايير الدولية إلى مسار ترقية عملي
            ملائم لواقع الشبكة السورية
          </span>
        </div>
      </RevealItem>
    </div>
  );
};

export { Slide05SyrianProblem } from "./Slide05SyrianProblem";

export { Slide06ResearchProblem } from "./Slide06ResearchProblem";

// ─────────────────────────────────────────────────────────────
// Slide 07: Problem Dimensions — 4 Technical Challenges (Slide 08 / 49 in UI)
// ─────────────────────────────────────────────────────────────
export const Slide07ProblemDimensions: React.FC = () => {
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const dims = [
    {
      num: "01",
      title: "التعقيد الرياضي والتوافقي  (NP-Hard)",
      badge: "فضاء بحث: 2^79,268",
      desc: "العدد الكبير جدًا من المواقع يجعل البحث عن الحل الأمثل مباشرةً أمرًا غير عملي، عدد الحلول المحتملة ينمو بشكل أُسّي مع زيادة عدد المواقع.، لذلك تم الاعتماد على خوارزميات التحسين فوق-الحدسية (Metaheuristics) للوصول إلى حلول جيدة خلال وقت حسابي مناسب.",
      color: "var(--primary)",
      bg: "rgba(66, 129, 119, 0.08)",
      borderColor: "rgba(66, 129, 119, 0.35)",
      svg: (
        <svg
          viewBox="0 0 320 170"
          style={{ width: "100%", height: "165px", display: "block", direction: "ltr", overflow: "hidden" }}
        >
          <defs>
            <clipPath id="dim1Clip"><rect width="320" height="170" rx="6" /></clipPath>
          </defs>
          <g clipPath="url(#dim1Clip)">
            <circle cx="160" cy="22" r="15" fill="var(--primary)" />
            <text x="160" y="27" fontSize="16" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Inter, sans-serif">N</text>
            <line x1="160" y1="37" x2="90" y2="58" stroke="var(--primary)" strokeWidth="3" />
            <line x1="160" y1="37" x2="230" y2="58" stroke="var(--primary)" strokeWidth="3" />
            <circle cx="90" cy="62" r="13" fill="var(--primary)" />
            <text x="90" y="67" fontSize="15" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Inter, sans-serif">0</text>
            <circle cx="230" cy="62" r="13" fill="var(--primary)" />
            <text x="230" y="67" fontSize="15" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Inter, sans-serif">1</text>
            <line x1="90" y1="75" x2="55" y2="96" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="90" y1="75" x2="125" y2="96" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="230" y1="75" x2="195" y2="96" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="230" y1="75" x2="265" y2="96" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="55" cy="100" r="8" fill="#6b1f2a" />
            <circle cx="125" cy="100" r="8" fill="#6b1f2a" />
            <circle cx="195" cy="100" r="8" fill="#6b1f2a" />
            <circle cx="265" cy="100" r="8" fill="#6b1f2a" />

            <rect x="8" y="116" width="148" height="46" rx="9" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="82" y="136" fontSize="15" fontWeight="900" fill="#991b1b" textAnchor="middle" fontFamily="Inter, sans-serif">Brute Force</text>
            <text x="82" y="154" fontSize="15" fontWeight="800" fill="#b91c1c" textAnchor="middle" fontFamily="Inter, sans-serif">O(2^N) ✕</text>

            <rect x="164" y="116" width="148" height="46" rx="9" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
            <text x="238" y="136" fontSize="15" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">Metaheuristics</text>
            <text x="238" y="154" fontSize="15" fontWeight="800" fill="#065f46" textAnchor="middle" fontFamily="Inter, sans-serif">O(K·P·N) ✓</text>
          </g>
        </svg>
      ),
    },
    {
      num: "02",
      title: "المفاضلة الخوارزمية ومحرك إصلاح القيود",
      badge: "BPSO vs AGA + Repair",
      desc: "المفاضلة الدقيقة بين الذكاء السربي (BPSO) والجيني (AGA)، مع ابتكار آلية (Constraint Repair) لإعادة الحلول غير المجدية للنطاق الممكن وتأمين التقارب السريع.",
      color: "var(--accent)",
      bg: "rgba(107, 31, 42, 0.08)",
      borderColor: "rgba(107, 31, 42, 0.35)",
      svg: (
        <svg
          viewBox="0 0 320 170"
          style={{ width: "100%", height: "165px", display: "block", direction: "ltr", overflow: "hidden" }}
        >
          <defs>
            <clipPath id="dim2Clip"><rect width="320" height="170" rx="6" /></clipPath>
          </defs>
          <g clipPath="url(#dim2Clip)">
            <line x1="40" y1="126" x2="300" y2="126" stroke="#94a3b8" strokeWidth="2.2" />
            <line x1="40" y1="14" x2="40" y2="126" stroke="#94a3b8" strokeWidth="2.2" />
            <text x="300" y="150" fontSize="14" fontWeight="800" fill="#475569" textAnchor="end" fontFamily="Inter, Cairo, sans-serif">Iterations · التكرارات</text>
            <text x="10" y="22" fontSize="15" fontWeight="900" fill="#475569" fontFamily="Inter, sans-serif">F(x)</text>

            <rect x="48" y="10" width="250" height="40" rx="8" fill="rgba(239, 68, 68, 0.12)" stroke="#fecaca" strokeWidth="1.4" strokeDasharray="5 3" />
            <text x="173" y="28" fontSize="14" fontWeight="900" fill="#dc2626" textAnchor="middle" fontFamily="Inter, sans-serif">Infeasible Region</text>
            <text x="173" y="44" fontSize="14" fontWeight="800" fill="#b91c1c" textAnchor="middle" fontFamily="Cairo, sans-serif">منطقة قيود مرفوضة</text>

            <rect x="82" y="56" width="156" height="32" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="160" y="70" fontSize="14" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">Constraint Repair</text>
            <text x="160" y="84" fontSize="13" fontWeight="800" fill="#065f46" textAnchor="middle" fontFamily="Inter, sans-serif">R(x)</text>

            <path d="M 48 114 Q 110 86, 270 82" stroke="var(--primary)" strokeWidth="3.5" fill="none" />
            <path d="M 48 108 Q 150 94, 270 88" stroke="var(--accent)" strokeWidth="2.8" strokeDasharray="5 3" fill="none" />
            <circle cx="270" cy="82" r="5" fill="#047857" />

            <rect x="48" y="92" width="100" height="22" rx="6" fill="#f0fdf4" stroke="var(--primary)" strokeWidth="1" />
            <text x="98" y="108" fontSize="14" fontWeight="900" fill="var(--primary)" textAnchor="middle" fontFamily="Inter, Cairo, sans-serif">BPSO · أسرع</text>
            <rect x="154" y="92" width="100" height="22" rx="6" fill="#fff1f2" stroke="var(--accent)" strokeWidth="1" />
            <text x="204" y="108" fontSize="14" fontWeight="900" fill="var(--accent)" textAnchor="middle" fontFamily="Inter, Cairo, sans-serif">AGA · ثبات</text>
          </g>
        </svg>
      ),
    },
    {
      num: "03",
      title: "الدقة المكانية والنمذجة الطبوغرافية 3D",
      badge: "DEM (30m) + 3D Clutter Layers",
      desc: "استخدام بيانات التضاريس واستخدامات الأراضي لحساب ضعف الإشارة وانحرافها حول العوائق بدقة.",
      color: "var(--primary)",
      bg: "rgba(66, 129, 119, 0.08)",
      borderColor: "rgba(66, 129, 119, 0.35)",
      svg: (
        <svg
          viewBox="0 0 320 170"
          style={{ width: "100%", height: "165px", display: "block", direction: "ltr", overflow: "hidden" }}
        >
          <defs>
            <clipPath id="dim3Clip"><rect width="320" height="170" rx="6" /></clipPath>
          </defs>
          <g clipPath="url(#dim3Clip)">
            <g transform="translate(8, 16)">
              <polygon points="12,28 70,42 128,28 70,14" fill="rgba(66, 129, 119, 0.4)" stroke="var(--primary)" strokeWidth="1.8" />
              <polygon points="12,28 70,42 70,48 12,34" fill="rgba(66, 129, 119, 0.6)" stroke="var(--primary)" strokeWidth="1" />
              <polygon points="70,42 128,28 128,34 70,48" fill="rgba(66, 129, 119, 0.7)" stroke="var(--primary)" strokeWidth="1" />
              <polygon points="12,64 70,78 128,64 70,50" fill="rgba(107, 31, 42, 0.3)" stroke="var(--accent)" strokeWidth="1.8" />
              <polygon points="12,64 70,78 70,84 12,70" fill="rgba(107, 31, 42, 0.5)" stroke="var(--accent)" strokeWidth="1" />
              <polygon points="70,78 128,64 128,70 70,84" fill="rgba(107, 31, 42, 0.6)" stroke="var(--accent)" strokeWidth="1" />
              <polygon points="12,100 70,114 128,100 70,86" fill="rgba(66, 129, 119, 0.5)" stroke="var(--primary)" strokeWidth="1.8" />
              <polygon points="12,100 70,114 70,120 12,106" fill="rgba(66, 129, 119, 0.7)" stroke="var(--primary)" strokeWidth="1" />
              <polygon points="70,114 128,100 128,106 70,120" fill="rgba(66, 129, 119, 0.85)" stroke="var(--primary)" strokeWidth="1" />
            </g>

            <rect x="156" y="10" width="154" height="46" rx="9" fill="#f0fdfa" stroke="var(--primary)" strokeWidth="1.4" />
            <text x="233" y="30" fontSize="15" fontWeight="900" fill="var(--primary)" textAnchor="middle" fontFamily="Inter, sans-serif">1. Clutter</text>
            <text x="233" y="48" fontSize="14" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="Cairo, sans-serif">مباني + غطاء نباتي</text>

            <rect x="156" y="62" width="154" height="46" rx="9" fill="#fff1f2" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="233" y="82" fontSize="15" fontWeight="900" fill="var(--accent)" textAnchor="middle" fontFamily="Inter, sans-serif">2. DEM 30m</text>
            <text x="233" y="100" fontSize="14" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="Cairo, sans-serif">تضاريس رقمية</text>

            <rect x="156" y="114" width="154" height="46" rx="9" fill="#f8fafc" stroke="#64748b" strokeWidth="1.4" />
            <text x="233" y="134" fontSize="15" fontWeight="900" fill="#0f172a" textAnchor="middle" fontFamily="Inter, sans-serif">3. Ray-Tracing</text>
            <text x="233" y="152" fontSize="14" fontWeight="800" fill="#475569" textAnchor="middle" fontFamily="Inter, sans-serif">3GPP 38.901</text>
          </g>
        </svg>
      ),
    },
    {
      num: "04",
      title: "البيئة غير المتجانسة وتعدد الموردين",
      badge: "Huawei + Ericsson + Multi-RAT",
      desc: "التعامل مع شبكة وطنية واقعية تضم تقنيات متعددة الموردين وأجيالاً مختلطة (2G/3G/4G/5G)، وتطوير طبقة وسيطة موحدة للتحكم البرمجي دون قيود مورد واحد.",
      color: "var(--accent)",
      bg: "rgba(107, 31, 42, 0.08)",
      borderColor: "rgba(107, 31, 42, 0.35)",
      svg: (
        <svg
          viewBox="0 0 320 170"
          style={{ width: "100%", height: "165px", display: "block", direction: "ltr", overflow: "hidden" }}
        >
          <defs>
            <clipPath id="dim4Clip"><rect width="320" height="170" rx="6" /></clipPath>
          </defs>
          <g clipPath="url(#dim4Clip)">
            <circle cx="160" cy="48" r="34" fill="var(--primary)" />
            <circle cx="160" cy="48" r="40" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeDasharray="4 2" />
            <text x="160" y="44" fontSize="14" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Inter, sans-serif">Unified</text>
            <text x="160" y="60" fontSize="13" fontWeight="800" fill="#ffffff" textAnchor="middle" fontFamily="Inter, sans-serif">Orchestrator</text>

            <rect x="8" y="24" width="96" height="52" rx="9" fill="rgba(107,31,42,0.12)" stroke="var(--accent)" strokeWidth="1.8" />
            <text x="56" y="46" fontSize="15" fontWeight="900" fill="var(--accent)" textAnchor="middle" fontFamily="Inter, sans-serif">Huawei</text>
            <text x="56" y="64" fontSize="13" fontWeight="800" fill="#64748b" textAnchor="middle" fontFamily="Inter, sans-serif">gNodeB</text>
            <line x1="104" y1="50" x2="120" y2="50" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 2" />

            <rect x="216" y="24" width="96" height="52" rx="9" fill="rgba(66,129,119,0.12)" stroke="var(--primary)" strokeWidth="1.8" />
            <text x="264" y="46" fontSize="15" fontWeight="900" fill="var(--primary)" textAnchor="middle" fontFamily="Inter, sans-serif">Ericsson</text>
            <text x="264" y="64" fontSize="13" fontWeight="800" fill="#64748b" textAnchor="middle" fontFamily="Inter, sans-serif">RBS</text>
            <line x1="200" y1="50" x2="216" y2="50" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 2" />

            <rect x="8" y="108" width="304" height="52" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="160" y="130" fontSize="15" fontWeight="900" fill="#0f172a" textAnchor="middle" fontFamily="Inter, sans-serif">Multi-RAT Interoperability</text>
            <text x="160" y="150" fontSize="15" fontWeight="800" fill="#334155" textAnchor="middle" fontFamily="Inter, sans-serif">2G · 3G · 4G · 5G-NR</text>
          </g>
        </svg>
      ),
    },
  ];

  const handleSlideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext();
  };

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleSlideClick}
      style={{
        ...darkSlideStyle,
        cursor: "pointer",
        userSelect: "none",
      }} 
      title=""
    >
      <div style={techGridStyle} />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "21.1px",
                  fontWeight: 900,
                  color: "var(--accent)",
                }}
              >
              الأبعاد الهندسية والتقنية لإشكالية البحث
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(31.2px, 3.66vw, 42.5px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
            </h1>
          </div>
          <div data-no-advance="true">
            <StepIndicator
              totalSteps={totalSteps}
              currentStep={step}
              onStepClick={goToStep}
            />
          </div>
        </div>
      </RevealItem>

      {/* Steps 2-5: 4 Dimension Cards (Revealed One After Another with LARGE 18px FONTS) */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "16px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "10px 0",
        }}
      >
        {dims.map((d, i) => (
          <RevealItem
            key={d.num}
            visibleAtStep={i + 2}
            currentStep={step}
            animation="scale"
            style={{ height: "100%" }}
          >
            <div
              style={{
                borderRadius: "18px",
                padding: "16px 22px",
                background: "#ffffff",
                border: `2.5px solid ${d.borderColor}`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: d.color,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "23px",
                      fontWeight: 900,
                      fontFamily: "Inter",
                    }}
                  >
                    {d.num}
                  </span>
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {d.title}
                  </div>
                </div>
                <span
                  style={{
                    background: d.bg,
                    color: d.color,
                    border: `1.5px solid ${d.borderColor}`,
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "19.1px",
                    fontFamily: "Inter",
                    fontWeight: 900,
                  }}
                >
                  {d.badge}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.45fr",
                  gap: "16px",
                  alignItems: "center",
                  margin: "4px 0",
                }}
              >
                <div
                  style={{
                    fontSize: "21.8px",
                    color: "#1e293b",
                    fontWeight: 700,
                    lineHeight: 1.6,
                  }}
                >
                  {d.desc}
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "14px",
                    padding: "8px",
                    border: "1.5px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "170px",
                  }}
                >
                  {d.svg}
                </div>
              </div>

              <div
                style={{
                  height: "5px",
                  background: `linear-gradient(90deg, ${d.color}, transparent)`,
                  borderRadius: "3px",
                }}
              />
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 08: Research Objectives — Strategic Roadmap (Slide 09 / 49 in UI)
// ─────────────────────────────────────────────────────────────
export const Slide08Objectives: React.FC = () => {
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 6,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const objectives = [
    {
      num: "01",
      title:
        "صياغة نموذج التحسين الرياضي متعدد الأهداف (Multi-Objective Optimization)",
      desc: "بناء دالة هدف مركبة توفق وتزن بين 4 معايير متناقضة: تعظيم التغطية وجودة الإشارة (SINR)، خفض CapEx، تقليص OPEX، وتعظيم العدالة المكانية SFI.",
      kpi: "دالة هدف 4 في 1",
      icon: <Radio size={30} color="var(--primary)" />,
      color: "var(--primary)",
      bg: "rgba(66, 129, 119, 0.08)",
      svg: (
        <svg viewBox="0 0 260 78" style={{ width: "260px", height: "78px", overflow: "hidden" }}>
          <rect x="4" y="4" width="252" height="70" rx="10" fill="rgba(66, 129, 119, 0.12)" stroke="var(--primary)" strokeWidth="2" />
          <text x="130" y="28" fontSize="16" fontWeight="900" fill="var(--primary)" textAnchor="middle" fontFamily="Inter, sans-serif">min F(x) = ∑ wi fi(x)</text>
          <text x="130" y="48" fontSize="14" fontWeight="800" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">Coverage · CapEx</text>
          <text x="130" y="66" fontSize="14" fontWeight="800" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">OPEX · SFI</text>
        </svg>
      ),
    },
    {
      num: "02",
      title:
        "تطوير ومقارنة خوارزميات BPSO و AGA مع آلية الإصلاح (Constraint Repair)",
      desc: "تطبيق خوارزميات الذكاء السربي والجيني وابتكار آلية (Constraint Repair) لتوجيه الحلول نحو النطاق الممكن وتجنب الحلول المرفوضة وتسريع التقارب.",
      kpi: "100% Feasible",
      icon: <Zap size={30} color="var(--accent)" />,
      color: "var(--accent)",
      bg: "rgba(107, 31, 42, 0.08)",
      svg: (
        <svg viewBox="0 0 260 78" style={{ width: "260px", height: "78px", overflow: "hidden" }}>
          <rect x="4" y="4" width="252" height="70" rx="10" fill="rgba(107, 31, 42, 0.08)" stroke="var(--accent)" strokeWidth="2" />
          <path d="M 28 34 L 80 18 L 150 26 L 220 14" stroke="var(--accent)" strokeWidth="3.2" fill="none" />
          <circle cx="80" cy="18" r="5" fill="var(--accent)" />
          <circle cx="150" cy="26" r="5" fill="var(--accent)" />
          <circle cx="220" cy="14" r="6" fill="#047857" />
          <text x="130" y="52" fontSize="15" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">Constraint Repair</text>
          <text x="130" y="68" fontSize="14" fontWeight="800" fill="#065f46" textAnchor="middle" fontFamily="Inter, sans-serif">→ Global Opt ✓</text>
        </svg>
      ),
    },
    {
      num: "03",
      title: "ابتكار مؤشر العدالة المكانية (Spatial Fairness Index - SFI)",
      desc: "تطوير مؤشر رياضي قياسي لحساب عدالة توزيع التغطية والسعات راديوياً وجغرافياً لردم الفجوة الرقمية بين المراكز الحضرية الكبرى والمناطق الريفية والنائية.",
      kpi: "SFI: 0.52 ➔ 0.71",
      icon: <Scale size={30} color="var(--primary)" />,
      color: "var(--primary)",
      bg: "rgba(66, 129, 119, 0.08)",
      svg: (
        <svg viewBox="0 0 260 78" style={{ width: "260px", height: "78px", overflow: "hidden" }}>
          <rect x="4" y="4" width="252" height="70" rx="10" fill="rgba(66, 129, 119, 0.1)" stroke="var(--primary)" strokeWidth="2" />
          <line x1="36" y1="24" x2="224" y2="24" stroke="var(--primary)" strokeWidth="3.5" />
          <circle cx="70" cy="24" r="11" fill="rgba(66, 129, 119, 0.25)" stroke="var(--primary)" strokeWidth="2" />
          <circle cx="190" cy="24" r="11" fill="rgba(66, 129, 119, 0.25)" stroke="var(--primary)" strokeWidth="2" />
          <text x="130" y="50" fontSize="16" fontWeight="900" fill="var(--primary)" textAnchor="middle" fontFamily="Inter, sans-serif">SFI = 0.71</text>
          <text x="130" y="68" fontSize="14" fontWeight="800" fill="#334155" textAnchor="middle" fontFamily="Cairo, sans-serif">إنصاف الريف والمدينة</text>
        </svg>
      ),
    },
    {
      num: "04",
      title:
        "بناء معمارية العزل الجغرافي الآمن بدون تشويش (No-Jamming Geofence)",
      desc: "تطوير إطار تحكم تشغيلي لعزل النطاقات الجغرافية المحددة بدقة مكانية 97.5% وزمن استجابة أقل من 30 ثانية في بيئة متعددة الموردين مع صون قنوات الطوارئ.",
      kpi: "دقة 97.5% / <30s",
      icon: <ShieldCheck size={30} color="var(--accent)" />,
      color: "var(--accent)",
      bg: "rgba(107, 31, 42, 0.08)",
      svg: (
        <svg viewBox="0 0 260 78" style={{ width: "260px", height: "78px", overflow: "hidden" }}>
          <rect x="4" y="4" width="252" height="70" rx="10" fill="rgba(107, 31, 42, 0.08)" stroke="var(--accent)" strokeWidth="2" />
          <rect x="48" y="10" width="164" height="24" rx="6" fill="rgba(107,31,42,0.15)" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="4 2" />
          <circle cx="130" cy="22" r="7" fill="var(--accent)" />
          <text x="130" y="52" fontSize="15" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">Zero-Jamming</text>
          <text x="130" y="68" fontSize="14" fontWeight="800" fill="#065f46" textAnchor="middle" fontFamily="Inter, sans-serif">Rapid Restore</text>
        </svg>
      ),
    },
  ];

  const handleSlideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext();
  };

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleSlideClick}
      style={{
        ...darkSlideStyle,
        cursor: "pointer",
        userSelect: "none",
      }}
      title=""
    >
      <div style={techGridStyle} />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "21.1px",
                  fontWeight: 900,
                  color: "var(--accent)",
                }}
              >
            أهداف البحث ومحاور الإنجاز الرئيسية
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(31.2px, 3.66vw, 42.5px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
             
            </h1>
          </div>
          <div data-no-advance="true">
            <StepIndicator
              totalSteps={totalSteps}
              currentStep={step}
              onStepClick={goToStep}
            />
          </div>
        </div>
      </RevealItem>

      {/* Steps 2-5: 4 Strategic Objectives in full-height vertical cards (Revealed One After Another with LARGE 18px FONTS) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "relative",
          zIndex: 10,
          justifyContent: "space-between",
          minHeight: 0,
          margin: "10px 0",
        }}
      >
        {objectives.map((obj, i) => (
          <RevealItem
            key={obj.num}
            visibleAtStep={i + 2}
            currentStep={step}
            animation="fadeRight"
            style={{ flex: 1 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                background: "#ffffff",
                borderRadius: "16px",
                padding: "14px 24px",
                border: `2px solid ${obj.color === "var(--primary)" ? "rgba(66, 129, 119, 0.35)" : "rgba(107, 31, 42, 0.35)"}`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: obj.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {obj.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      background: obj.color,
                      color: "#ffffff",
                      borderRadius: "8px",
                      padding: "4px 14px",
                      fontSize: "19.3px",
                      fontFamily: "Inter",
                      fontWeight: 900,
                    }}
                  >
                    الهدف {obj.num}
                  </span>
                  <span
                    style={{
                      fontSize: "26px",
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {obj.title}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "21.8px",
                    color: "#1e293b",
                    fontWeight: 700,
                    lineHeight: 1.6,
                  }}
                >
                  {obj.desc}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexShrink: 0,
                }}
              >
                {obj.svg}
                <div
                  style={{
                    background: obj.bg,
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: `2px solid ${obj.color}`,
                    textAlign: "center",
                    minWidth: "120px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "21.1px",
                      color: obj.color,
                      fontWeight: 900,
                      fontFamily: "Inter",
                    }}
                  >
                    {obj.kpi}
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>

      {/* Step 6: Verification footer banner with LARGE 17px font */}
      <RevealItem visibleAtStep={6} currentStep={step} animation="fadeUp">
        <div
          style={{
            background: "var(--primary)",
            borderRadius: "14px",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
            position: "relative",
            zIndex: 10,
            boxShadow: "0 4px 18px rgba(66, 129, 119, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <CheckCircle2 size={26} color="#ffffff" />
            <span
              style={{ fontSize: "21.8px", fontWeight: 900, color: "#ffffff" }}
            >
              منهجية التحقق: اختبار تجريبي وميداني شامل على كامل قاعدة بيانات
              شبكة الخلوي السورية (79,268 موقعاً) عبر 14 محافظة
            </span>
          </div>
          <span
            style={{
              background: "rgba(255,255,255,0.25)",
              padding: "4px 16px",
              borderRadius: "14px",
              fontSize: "19.3px",
              fontWeight: 900,
              fontFamily: "Inter",
            }}
          >
           
          </span>
        </div>
      </RevealItem>
    </div>
  );
};


export { default as Slide09Questions } from "./Slide09Questions";

