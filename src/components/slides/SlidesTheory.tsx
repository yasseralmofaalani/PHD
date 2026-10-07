import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideBreadcrumb from "../ui/SlideBreadcrumb";
import RevealItem, { StepIndicator } from "../ui/RevealItem";
import { useStepReveal } from "../../hooks/useStepReveal";
import {
  Radio,
  Layers,
  Compass,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  GitMerge,
  Server,
  Activity,
  Maximize2,
  BarChart3,
  Search,
  ShieldCheck,
  Binary,
  Scale,
  Sparkles,
  Check,
  X,
  Sliders,
  Database,
  ArrowRight,
  TrendingUp,
  MapPin,
  RefreshCw,
  Gauge,
  Target,
  Shield,
  Award,
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
  userSelect: "none",
  cursor: "pointer",
};

const techGridStyle: React.CSSProperties = {
  display: "none",
};

// ─────────────────────────────────────────────────────────────
// Slide 12 (Slide10Concepts): المفاهيم الراديوية والمكانية الأساسية
// ─────────────────────────────────────────────────────────────
export const Slide10Concepts: React.FC = () => {
  // Total 8 steps: Step 1: Title, Steps 2-7: Concepts 1 to 6 one by one, Step 8: Synergy Banner
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 8,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const concepts = [
    {
      term: "BTS",
      full: "Base Transceiver Station",
      ar: "محطة الإرسال والاستقبال القاعدية",
      role: "طبقة النفاذ الراديوي الميداني",
      desc: "المحطة الراديوية الميدانية المسؤولة عن الإرسال والاستقبال اللاسلكي وتأمين التغطية الخلوية عبر قطاعات ثلاثية (120°) وهوائيات MIMO متقدمة.",
      color: "var(--primary, #428177)",
      svg: (
        <svg
          viewBox="0 0 250 110"
          style={{ width: "100%", height: "120px", direction: "ltr" }}
        >
          {/* Mast Structure */}
          <line
            x1="125"
            y1="18"
            x2="125"
            y2="95"
            stroke="#428177"
            strokeWidth="3.5"
          />
          <line
            x1="105"
            y1="95"
            x2="145"
            y2="95"
            stroke="#428177"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="110"
            y1="75"
            x2="140"
            y2="75"
            stroke="#428177"
            strokeWidth="2.2"
          />
          <line
            x1="115"
            y1="55"
            x2="135"
            y2="55"
            stroke="#428177"
            strokeWidth="2.2"
          />
          <line
            x1="118"
            y1="36"
            x2="132"
            y2="36"
            stroke="#428177"
            strokeWidth="2.2"
          />
          <line
            x1="105"
            y1="95"
            x2="125"
            y2="18"
            stroke="#428177"
            strokeWidth="1.6"
            strokeDasharray="3 2"
          />
          <line
            x1="145"
            y1="95"
            x2="125"
            y2="18"
            stroke="#428177"
            strokeWidth="1.6"
            strokeDasharray="3 2"
          />
          {/* Sector Antennas AAU */}
          <rect
            x="117"
            y="10"
            width="16"
            height="16"
            rx="3"
            fill="#6b1f2a"
            stroke="#fff"
            strokeWidth="1.5"
          />
          {/* 3 Sector Radiation Lobes */}
          <path
            d="M 125 18 Q 70 -12, 45 40 Q 85 45, 125 18"
            fill="rgba(66, 129, 119, 0.28)"
            stroke="#428177"
            strokeWidth="1.8"
          />
          <path
            d="M 125 18 Q 180 -12, 205 40 Q 165 45, 125 18"
            fill="rgba(66, 129, 119, 0.28)"
            stroke="#428177"
            strokeWidth="1.8"
          />
          <rect
            x="16"
            y="48"
            width="86"
            height="22"
            rx="4"
            fill="#f0fdfa"
            stroke="#428177"
            strokeWidth="1.2"
          />
          <text
            x="59"
            y="63"
            fontSize="15.6"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            Sec α (120°)
          </text>
          <rect
            x="150"
            y="48"
            width="84"
            height="22"
            rx="4"
            fill="#f0fdfa"
            stroke="#428177"
            strokeWidth="1.2"
          />
          <text
            x="192"
            y="63"
            fontSize="15.6"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            Sec β (120°)
          </text>
          <rect
            x="75"
            y="88"
            width="100"
            height="20"
            rx="4"
            fill="#fff"
            stroke="#6b1f2a"
            strokeWidth="1.2"
          />
          <text
            x="125"
            y="102"
            fontSize="15.6"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            RF Tower Mast
          </text>
        </svg>
      ),
    },
    {
      term: "RAN",
      full: "Radio Access Network",
      ar: "شبكة النفاذ الراديوي (RAN)",
      role: "معمارية النفاذ والربط الأمامي",
      desc: "المعمارية الشبكية التي تفصل وحدات الراديو الترددية (RRH/AAU) عن مجمع معالجة النطاق الأساسي (BBU Pool) عبر شبكة الربط الأمامي (Fronthaul).",
      color: "var(--accent, #6b1f2a)",
      svg: (
        <svg
          viewBox="0 0 250 110"
          style={{ width: "100%", height: "120px", direction: "ltr" }}
        >
          {/* BBU Pool */}
          <rect
            x="12"
            y="24"
            width="68"
            height="62"
            rx="8"
            fill="rgba(107,31,42,0.12)"
            stroke="#6b1f2a"
            strokeWidth="2.2"
          />
          <text
            x="46"
            y="52"
            fontSize="19.3"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            BBU
          </text>
          <text
            x="46"
            y="70"
            fontSize="17"
            fontWeight="bold"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            Pool
          </text>
          {/* Fronthaul Fiber Links */}
          <path
            d="M 80 50 L 155 28 M 80 60 L 155 82"
            stroke="#428177"
            strokeWidth="3"
            strokeDasharray="5 3"
          />
          <rect
            x="90"
            y="44"
            width="60"
            height="20"
            rx="4"
            fill="#fff"
            stroke="#428177"
            strokeWidth="1.2"
          />
          <text
            x="120"
            y="58"
            fontSize="15"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            eCPRI Fiber
          </text>
          {/* Distributed RRHs */}
          <rect
            x="155"
            y="14"
            width="85"
            height="34"
            rx="6"
            fill="rgba(66,129,119,0.15)"
            stroke="#428177"
            strokeWidth="1.8"
          />
          <text
            x="197"
            y="35"
            fontSize="16.3"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            RRH 1 (Urban)
          </text>
          <rect
            x="155"
            y="66"
            width="85"
            height="34"
            rx="6"
            fill="rgba(66,129,119,0.15)"
            stroke="#428177"
            strokeWidth="1.8"
          />
          <text
            x="197"
            y="87"
            fontSize="16.3"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            RRH 2 (Rural)
          </text>
        </svg>
      ),
    },
    {
      term: "GIS",
      full: "Geographic Information System",
      ar: "نظم المعلومات الجغرافية (GIS)",
      role: "النمذجة المكانية والطوبولوجية",
      desc: "البيئة المكانية الحاضنة لنمذجة الانتشار الراديوي؛ تدمج طبقات الارتفاع الرقمي (DEM) واستخدامات الأراضي (Clutter) لحساب التوهين والمسار بدقة جغرافية عالية.",
      color: "var(--primary, #428177)",
      svg: (
        <svg
          viewBox="0 0 250 110"
          style={{ width: "100%", height: "120px", direction: "ltr" }}
        >
          {/* Layer 1: DEM Elevation */}
          <polygon
            points="25,92 125,106 215,92 115,78"
            fill="rgba(66,129,119,0.4)"
            stroke="#428177"
            strokeWidth="1.8"
          />
          <text
            x="120"
            y="96"
            fontSize="15.6"
            fontWeight="900"
            fill="#047857"
            textAnchor="middle"
          >
            Layer 1: DEM Elevation (30m)
          </text>
          {/* Layer 2: Clutter */}
          <polygon
            points="25,64 125,78 215,64 115,50"
            fill="rgba(107,31,42,0.3)"
            stroke="#6b1f2a"
            strokeWidth="1.8"
          />
          <text
            x="120"
            y="68"
            fontSize="15.6"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            Layer 2: Urban Clutter
          </text>
          {/* Layer 3: Sites */}
          <polygon
            points="25,36 125,50 215,36 115,22"
            fill="rgba(66,129,119,0.2)"
            stroke="#428177"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <circle cx="75" cy="38" r="4.5" fill="#6b1f2a" />
          <circle cx="115" cy="36" r="4.5" fill="#428177" />
          <circle cx="165" cy="38" r="4.5" fill="#6b1f2a" />
          <text
            x="120"
            y="32"
            fontSize="16.3"
            fontWeight="900"
            fill="#0f172a"
            textAnchor="middle"
          >
            Layer 3: 79,268 Sites
          </text>
        </svg>
      ),
    },
    {
      term: "RSRP",
      full: "Reference Signal Received Power",
      ar: "استطاعة الإشارة المرجعية المستلمة (RSRP)",
      role: "مؤشر قدرة التغطية الراديوية",
      desc: "مقياس الاستطاعة المستلمة لكل عنصر إشارة مرجعية بالديسيبل ميلي واط (dBm)؛ يمثل المحدد الهندسي لمدى التغطية وحدود الخلايا الخادمة.",
      color: "var(--accent, #6b1f2a)",
      svg: (
        <svg
          viewBox="0 0 250 110"
          style={{ width: "100%", height: "120px", direction: "ltr" }}
        >
          {/* Axes */}
          <line
            x1="30"
            y1="90"
            x2="235"
            y2="90"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <line
            x1="30"
            y1="12"
            x2="30"
            y2="90"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {/* Decaying Signal Curve */}
          <path
            d="M 30 18 Q 75 26, 120 54 T 230 86"
            fill="none"
            stroke="#6b1f2a"
            strokeWidth="3.5"
          />
          {/* Threshold Lines */}
          <line
            x1="30"
            y1="36"
            x2="235"
            y2="36"
            stroke="#047857"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <rect
            x="145"
            y="24"
            width="85"
            height="20"
            rx="4"
            fill="#f0fdf4"
            stroke="#047857"
            strokeWidth="1"
          />
          <text
            x="187"
            y="38"
            fontSize="14.9"
            fontWeight="900"
            fill="#047857"
            textAnchor="middle"
          >
            &gt; -80 dBm (Good)
          </text>
          <line
            x1="30"
            y1="72"
            x2="235"
            y2="72"
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <rect
            x="145"
            y="60"
            width="85"
            height="20"
            rx="4"
            fill="#fef2f2"
            stroke="#dc2626"
            strokeWidth="1"
          />
          <text
            x="187"
            y="74"
            fontSize="14.9"
            fontWeight="900"
            fill="#dc2626"
            textAnchor="middle"
          >
            &lt; -110 dBm (Poor)
          </text>
          <text
            x="130"
            y="104"
            fontSize="14.9"
            fontWeight="bold"
            fill="#475569"
            textAnchor="middle"
          >
            Distance from Tower (d)
          </text>
        </svg>
      ),
    },
    {
      term: "SINR",
      full: "Signal-to-Interference-plus-Noise Ratio",
      ar: "نسبة الإشارة إلى التداخل والضجيج (SINR)",
      role: "مؤشر جودة القناة والسعة الشانونية",
      desc: "المعيار الحاكم لكفاءة التعديل الراديوي ومعدل الإنتاجية (Throughput) وفق قانون شانون، ويفصل الإشارة المرغوبة عن التداخل البيني والضجيج.",
      color: "var(--primary, #428177)",
      svg: (
        <svg
          viewBox="0 0 250 110"
          style={{ width: "100%", height: "120px", direction: "ltr" }}
        >
          {/* Desired Signal Peak */}
          <path
            d="M 35 90 Q 105 8, 175 90"
            fill="rgba(66, 129, 119, 0.28)"
            stroke="#428177"
            strokeWidth="3.2"
          />
          {/* Interference & Noise Floor */}
          <rect
            x="25"
            y="72"
            width="205"
            height="18"
            rx="4"
            fill="rgba(239, 68, 68, 0.18)"
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          {/* Delta SINR Arrow */}
          <line
            x1="105"
            y1="26"
            x2="105"
            y2="70"
            stroke="#6b1f2a"
            strokeWidth="2.5"
          />
          <polygon points="105,20 100,28 110,28" fill="#6b1f2a" />
          <polygon points="105,74 100,66 110,66" fill="#6b1f2a" />
          <rect
            x="115"
            y="38"
            width="105"
            height="24"
            rx="5"
            fill="#fff"
            stroke="#6b1f2a"
            strokeWidth="1.5"
          />
          <text
            x="167"
            y="54"
            fontSize="15.6"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            Δ SINR ≥ 12 dB
          </text>
          <text
            x="105"
            y="20"
            fontSize="15.6"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            Desired Signal (S)
          </text>
          <text
            x="127"
            y="85"
            fontSize="14.9"
            fontWeight="bold"
            fill="#dc2626"
            textAnchor="middle"
          >
            Noise + Interf (I+N₀)
          </text>
        </svg>
      ),
    },
    {
      term: "Co-siting",
      full: "Co-located Site Deployment",
      ar: "المشاركة المكانية للمواقع الراديوية (Co-siting)",
      role: "استراتيجية ترشيد الإنفاق الرأسمالي (CapEx)",
      desc: "استراتيجية نشر معدات 5G Massive MIMO على أبراج الشبكات السابقة (3G/4G)؛ لتحقيق وفر نوعي في تكاليف الإنشاء والبنية التحتية بنسبة تتجاوز 50%.",
      color: "var(--accent, #6b1f2a)",
      svg: (
        <svg
          viewBox="0 0 250 110"
          style={{ width: "100%", height: "120px", direction: "ltr" }}
        >
          {/* Existing Tower */}
          <rect
            x="20"
            y="30"
            width="56"
            height="60"
            rx="6"
            fill="rgba(66,129,119,0.15)"
            stroke="#428177"
            strokeWidth="2.2"
          />
          <text
            x="48"
            y="54"
            fontSize="16.3"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            Existing
          </text>
          <text
            x="48"
            y="72"
            fontSize="14.9"
            fontWeight="bold"
            fill="#428177"
            textAnchor="middle"
          >
            3G/4G Site
          </text>
          {/* Plus sign */}
          <text
            x="96"
            y="66"
            fontSize="28.8"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            +
          </text>
          {/* New 5G AAU */}
          <rect
            x="112"
            y="22"
            width="56"
            height="68"
            rx="6"
            fill="rgba(107,31,42,0.18)"
            stroke="#6b1f2a"
            strokeWidth="2.2"
          />
          <text
            x="140"
            y="50"
            fontSize="16.3"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            5G AAU
          </text>
          <text
            x="140"
            y="68"
            fontSize="14.9"
            fontWeight="bold"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            MIMO
          </text>
          {/* CapEx Savings Badge */}
          <rect x="178" y="34" width="60" height="42" rx="7" fill="#047857" />
          <text
            x="208"
            y="52"
            fontSize="15.6"
            fontWeight="bold"
            fill="#fff"
            textAnchor="middle"
          >
            CapEx
          </text>
          <text
            x="208"
            y="68"
            fontSize="16.3"
            fontWeight="900"
            fill="#fff"
            textAnchor="middle"
          >
            Save &gt;52%
          </text>
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
      style={darkSlideStyle}
      title=""
    >
      <div style={techGridStyle} />

      {/* Header: Single Expressive Title */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "var(--accent, #6b1f2a)",
                boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(28.8px, 3.17vw, 40.1px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              المفاهيم الراديوية والمكانية المؤسسة للأطروحة
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
      </div>

      {/* 6 Concepts revealed ONE BY ONE in a 2x3 responsive grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "14px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "6px 0",
        }}
      >
        {concepts.map((c, idx) => {
          const itemStep = idx + 2; // Step 2 to 7
          const isVisible = step >= itemStep;
          return (
            <div
              key={c.term}
              style={{
                opacity: isVisible ? 1 : 0.08,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(12px) scale(0.98)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "#fff",
                borderRadius: "16px",
                padding: "12px 18px",
                border: `2px solid ${isVisible ? (c.color === "var(--primary, #428177)" ? "rgba(66, 129, 119, 0.4)" : "rgba(107, 31, 42, 0.4)") : "rgba(0,0,0,0.06)"}`,
                boxShadow: isVisible ? "0 8px 24px rgba(0,0,0,0.07)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "28.8px",
                        fontWeight: 900,
                        color: c.color,
                        fontFamily: "Inter",
                      }}
                    >
                      {c.term}
                    </span>
                    <span
                      style={{
                        fontSize: "18.6px",
                        color: "#64748b",
                        fontFamily: "Inter",
                        fontWeight: 700,
                      }}
                    >
                      {c.full}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: 800,
                      background:
                        c.color === "var(--primary, #428177)"
                          ? "rgba(66,129,119,0.12)"
                          : "rgba(107,31,42,0.12)",
                      color: c.color,
                      padding: "3px 10px",
                      borderRadius: "10px",
                    }}
                  >
                    {c.role}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "21.1px",
                    fontWeight: 900,
                    color: "#0f172a",
                    margin: "2px 0",
                  }}
                >
                  {c.ar}
                </div>
              </div>

              {/* High-Fidelity Engineering Visual Diagram */}
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "10px",
                  padding: "4px 6px",
                  border: "1px solid #e2e8f0",
                  margin: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {c.svg}
              </div>

              {/* Technical Description with Large Font */}
              <div>
                <div
                  style={{
                    fontSize: "18.6px",
                    color: "#334155",
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  {c.desc}
                </div>
                <div
                  style={{
                    height: "3.5px",
                    background: `linear-gradient(90deg, ${c.color}, transparent)`,
                    borderRadius: "2px",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 8: Unified Synergy Banner */}
      <div
        style={{
          opacity: step >= 8 ? 1 : 0.15,
          transform: step >= 8 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s ease",
          background: "var(--primary, #428177)",
          borderRadius: "14px",
          padding: "10px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
          color: "#fff",
          boxShadow: "0 6px 20px rgba(66,129,119,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Compass size={24} color="#edebe0" />
          <span style={{ fontSize: "19.8px", fontWeight: 800, color: "#fff" }}>
            التكامل الراديوي المكاني: تآزر طبقات نظم المعلومات الجغرافية (GIS) مع المؤشرات الراديوية الدقيقة لتوجيه التحسين الرياضي نحو نشر متوازن بين أقصى تغطية وأدنى تكلفة رأسمالية
          </span>
        </div>
        <span
          style={{
            fontSize: "19.3px",
            background: "rgba(255,255,255,0.2)",
            padding: "4px 14px",
            borderRadius: "12px",
            fontWeight: 900,
            fontFamily: "Inter",
            flexShrink: 0,
          }}
        >
          GIS-Radio Synergy
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 13 (Slide11RadioIndicators): المؤشرات الراديوية وعتبات جودة الخدمة
// ─────────────────────────────────────────────────────────────
export const Slide11RadioIndicators: React.FC<{
  onOpenModal?: (id: string) => void;
}> = () => {
  // Total 5 steps: Step 1: Title, Step 2: RSRP, Step 3: RSRQ, Step 4: SINR, Step 5: Hard Constraint Banner
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const indicators = [
    {
      term: "RSRP",
      full: "Reference Signal Received Power",
      ar: "استطاعة الإشارة المرجعية المستلمة (RSRP)",
      unit: "dBm",
      formula: "RSRP = RSSI / (12 × N_PRB)",
      desc: "المقياس الخطي للاستطاعة المستلمة لكل عنصر إشارة مرجعية (Resource Element)؛ يحدد هندسياً اتساع التغطية الراديوية وحدود الخلايا الخادمة.",
      good: "> −80 dBm",
      fair: "−80 ~ −100",
      poor: "< −110 dBm",
      pct: 88,
      color: "var(--primary, #428177)",
      svg: (
        <svg viewBox="0 0 240 100" style={{ width: "100%", height: "135px" }}>
          {/* Signal Gradient Meter */}
          <rect x="20" y="65" width="22" height="20" rx="3" fill="#428177" />
          <rect x="50" y="50" width="22" height="35" rx="3" fill="#428177" />
          <rect x="80" y="35" width="22" height="50" rx="3" fill="#428177" />
          <rect x="110" y="20" width="22" height="65" rx="3" fill="#428177" />
          <rect x="140" y="10" width="22" height="75" rx="3" fill="#428177" />
          {/* Faded bar */}
          <rect
            x="170"
            y="5"
            width="22"
            height="80"
            rx="3"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeDasharray="3 2"
          />
          <text x="210" y="45" fontSize="17.9" fontWeight="900" fill="#428177">
            dBm
          </text>
          <text x="210" y="62" fontSize="13.5" fontWeight="bold" fill="#64748b">
            Power
          </text>
          {/* dBm Labels */}
          <text
            x="31"
            y="94"
            fontSize="12"
            fontWeight="bold"
            fill="#64748b"
            textAnchor="middle"
          >
            -110
          </text>
          <text
            x="91"
            y="94"
            fontSize="12"
            fontWeight="bold"
            fill="#64748b"
            textAnchor="middle"
          >
            -90
          </text>
          <text
            x="151"
            y="94"
            fontSize="12"
            fontWeight="bold"
            fill="#047857"
            textAnchor="middle"
          >
            -70
          </text>
        </svg>
      ),
    },
    {
      term: "RSRQ",
      full: "Reference Signal Received Quality",
      ar: "جودة الإشارة المرجعية المستلمة (RSRQ)",
      unit: "dB",
      formula: "RSRQ = N × (RSRP / RSSI)",
      desc: "مؤشر تركيبي يعكس جودة الإشارة نسبةً إلى إجمالي طاقة القناة المستلمة (RSSI) وحمل الحركة؛ يكشف حجم الازدحام والتداخل الترددي بين الخلايا المجاورة.",
      good: "> −9 dB",
      fair: "−10 ~ −14",
      poor: "< −15 dB",
      pct: 78,
      color: "var(--accent, #6b1f2a)",
      svg: (
        <svg viewBox="0 0 240 100" style={{ width: "100%", height: "135px" }}>
          {/* Gauge Arc */}
          <path
            d="M 35 75 A 75 75 0 0 1 205 75"
            stroke="#e2e8f0"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 35 75 A 75 75 0 0 1 175 30"
            stroke="#6b1f2a"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          {/* Needle Pointer */}
          <circle cx="120" cy="75" r="8" fill="#6b1f2a" />
          <line
            x1="120"
            y1="75"
            x2="165"
            y2="35"
            stroke="#6b1f2a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text
            x="120"
            y="65"
            fontSize="15.6"
            fontWeight="900"
            fill="#6b1f2a"
            textAnchor="middle"
          >
            Spectral Quality
          </text>
          {/* Scale markers */}
          <text x="40" y="92" fontSize="13.5" fontWeight="bold" fill="#dc2626">
            -20 dB
          </text>
          <text x="190" y="92" fontSize="13.5" fontWeight="bold" fill="#047857">
            -3 dB
          </text>
        </svg>
      ),
    },
    {
      term: "SINR",
      full: "Signal-to-Interference-plus-Noise Ratio",
      ar: "نسبة الإشارة إلى التداخل والضجيج (SINR)",
      unit: "dB",
      formula: "SINR = S / (I + N₀)",
      desc: "المعيار الحاكم لكفاءة التعديل الراديوي ومعدل نقل البيانات الفعلي (Throughput) بموجب مبرهنة شانون؛ يمثل قيد الجودة الحرج في نموذج التحسين بالأطروحة.",
      good: "> 20 dB",
      fair: "10 ~ 20 dB",
      poor: "< 0 dB (تداخل)",
      pct: 95,
      color: "var(--primary, #428177)",
      svg: (
        <svg viewBox="0 0 240 100" style={{ width: "100%", height: "135px" }}>
          {/* Signal Peak Curve */}
          <path
            d="M 20 80 Q 120 5, 220 80"
            stroke="#428177"
            strokeWidth="3.5"
            fill="rgba(66, 129, 119, 0.2)"
          />
          {/* Noise Floor */}
          <line
            x1="20"
            y1="68"
            x2="220"
            y2="68"
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text
            x="120"
            y="38"
            fontSize="17"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
            Signal Lobe (S)
          </text>
          <text x="195" y="63" fontSize="13.5" fontWeight="bold" fill="#dc2626">
            Noise Floor
          </text>
          <text
            x="120"
            y="94"
            fontSize="15"
            fontWeight="900"
            fill="#0f172a"
            textAnchor="middle"
          >
            Shannon: C = B · log₂(1 + SINR)
          </text>
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
      style={darkSlideStyle}
      title=""
    >
      <div style={techGridStyle} />

      {/* Header: Single Expressive Title */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "var(--accent, #6b1f2a)",
                boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(28.8px, 3.17vw, 40.1px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              المؤشرات الراديوية وعتبات جودة الخدمة (QoS) في شبكات الجيل الخامس
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
      </div>

      {/* 3 Indicators Cards revealed ONE BY ONE */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "8px 0",
        }}
      >
        {indicators.map((ind, i) => {
          const itemStep = i + 2; // Steps 2, 3, 4
          const isVisible = step >= itemStep;
          return (
            <div
              key={ind.term}
              style={{
                opacity: isVisible ? 1 : 0.08,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(16px) scale(0.98)",
                transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "#fff",
                borderRadius: "18px",
                padding: "18px 22px",
                border: `2.5px solid ${isVisible ? (ind.color === "var(--primary, #428177)" ? "rgba(66, 129, 119, 0.45)" : "rgba(107, 31, 42, 0.45)") : "rgba(0,0,0,0.06)"}`,
                boxShadow: isVisible ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <div>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "37.8px",
                      fontWeight: 900,
                      color: ind.color,
                      fontFamily: "Inter",
                      lineHeight: 1,
                    }}
                  >
                    {ind.term}
                  </span>
                  <span
                    style={{
                      fontSize: "19.3px",
                      background: "rgba(66,129,119,0.12)",
                      color: ind.color,
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontWeight: 900,
                      fontFamily: "Inter",
                    }}
                  >
                    {ind.unit}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: 900,
                    color: "#0f172a",
                  }}
                >
                  {ind.ar}
                </div>
                <div
                  style={{
                    fontSize: "18.6px",
                    color: "#64748b",
                    fontFamily: "Inter",
                    fontWeight: 700,
                  }}
                >
                  {ind.full}
                </div>

                {/* Formula Box */}
                <div
                  style={{
                    background: "rgba(66,129,119,0.07)",
                    borderRadius: "10px",
                    padding: "8px 14px",
                    margin: "10px 0",
                    fontFamily: "Inter",
                    fontSize: "19.3px",
                    fontWeight: 900,
                    color: "#0f172a",
                    direction: "ltr",
                    textAlign: "center",
                    border: "1.5px solid rgba(66,129,119,0.25)",
                  }}
                >
                  {ind.formula}
                </div>

                {/* Technical Description */}
                <div
                  style={{
                    fontSize: "19.1px",
                    color: "#334155",
                    fontWeight: 700,
                    lineHeight: 1.45,
                    margin: "6px 0",
                  }}
                >
                  {ind.desc}
                </div>
              </div>

              {/* Graphical Visual Diagram */}
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  padding: "8px",
                  border: "1px solid #e2e8f0",
                  margin: "6px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {ind.svg}
              </div>

              {/* Thresholds Table */}
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "6px",
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(66,129,119,0.12)",
                      borderRadius: "8px",
                      padding: "6px 4px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "19px",
                        color: "var(--primary, #428177)",
                        fontWeight: 800,
                      }}
                    >
                      ممتاز (Good)
                    </div>
                    <div
                      style={{
                        fontSize: "19.3px",
                        fontWeight: 900,
                        color: "var(--primary, #428177)",
                        fontFamily: "Inter",
                      }}
                    >
                      {ind.good}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(234, 179, 8, 0.12)",
                      borderRadius: "8px",
                      padding: "6px 4px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "19px",
                        color: "#b45309",
                        fontWeight: 800,
                      }}
                    >
                      مقبول (Fair)
                    </div>
                    <div
                      style={{
                        fontSize: "19.3px",
                        fontWeight: 900,
                        color: "#b45309",
                        fontFamily: "Inter",
                      }}
                    >
                      {ind.fair}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(107,31,42,0.12)",
                      borderRadius: "8px",
                      padding: "6px 4px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "19px",
                        color: "var(--accent, #6b1f2a)",
                        fontWeight: 800,
                      }}
                    >
                      ضعيف (Poor)
                    </div>
                    <div
                      style={{
                        fontSize: "19.3px",
                        fontWeight: 900,
                        color: "var(--accent, #6b1f2a)",
                        fontFamily: "Inter",
                      }}
                    >
                      {ind.poor}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    height: "7px",
                    background: "rgba(66,129,119,0.12)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${ind.pct}%`,
                      height: "100%",
                      background: ind.color,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 5: Constraint Banner */}
      <div
        style={{
          opacity: step >= 5 ? 1 : 0.15,
          transform: step >= 5 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s ease",
          background: "#fff",
          border: "2.5px solid var(--accent, #6b1f2a)",
          borderRadius: "14px",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 6px 20px rgba(107,31,42,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Activity size={26} color="var(--accent, #6b1f2a)" />
          <span
            style={{ fontSize: "20.5px", fontWeight: 800, color: "#0f172a" }}
          >
            القيد الهندسي الحاكم للأطروحة: إلزامية عتبة{" "}
            <strong
              style={{ color: "var(--primary, #428177)", fontSize: "21.8px" }}
            >
              SINR ≥ 12 dB
            </strong>{" "}
            كقيد صارم (Hard Constraint) لضمان رتب التعديل العالية (High Modulation) وحظر التداخل البيني في الترقية
          </span>
        </div>
        <span
          style={{
            background: "var(--accent, #6b1f2a)",
            color: "#fff",
            padding: "5px 16px",
            borderRadius: "12px",
            fontSize: "18.6px",
            fontWeight: 900,
            fontFamily: "Inter",
            flexShrink: 0,
          }}
        >
          SINR ≥ 12 dB Hard Constraint
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 14 (Slide12RelatedWork): المسارات البحثية وتصنيف الأدبيات العالمية
// ─────────────────────────────────────────────────────────────
export const Slide12RelatedWork: React.FC = () => {
  // Total 5 steps: Step 1: Title, Step 2: Stream 1, Step 3: Stream 2, Step 4: Stream 3, Step 5: Tri-Fold Gap Banner
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const streams = [
    {
      num: "01",
      title: "التخطيط الراديوي وخوارزميات التحسين الذكية",
      focus: "Radio Planning & Metaheuristics",
      points: [
        "ركزت الدراسات السابقة بشكل أساسي على تحقيق التوازن بين تكلفة الاستثمار (CapEx) والتغطية.",
        "اعتمدت غالباً على شبكات محدودة الحجم، دون تمثيل كافٍ للعوامل الجغرافية والمكانية بدقة.",
        "واجهت صعوبة في التعامل مع الشبكات الكبيرة واسعة النطاق.",
      ],
      color: "var(--primary, #428177)",
      icon: <Binary size={28} color="var(--primary, #428177)" />,
    },
    {
      num: "02",
      title: "العدالة المكانية وتكافؤ السعات الخدمية",
      focus: "Spatial Fairness & Equity",
      points: [
        "ركزت الدراسات السابقة على تحقيق العدالة في توزيع الموارد بين المستخدمين داخل نطاقات محلية محدودة.",
        "لم تقدم مؤشراً مكانياً شاملاً لقياس عدالة توزيع التغطية بين المناطق الحضرية والريفية.",
      ],
      color: "var(--accent, #6b1f2a)",
      icon: <Layers size={28} color="var(--accent, #6b1f2a)" />,
    },
    {
      num: "03",
      title: "التحكم التشغيلي وعزل النطاقات في الطوارئ",
      focus: "Operational Control & Geofencing",
      points: [
        "اعتمدت بعض الدراسات على التشويش الراديوي كوسيلة لعزل الاتصالات.",
        "قد يؤثر التشويش أيضاً في الاتصالات الأخرى غير المستهدفة.",
        "ركزت بعض الحلول على بيئة تعتمد على مورد واحد (Single-Vendor).",
        "يحد ذلك من قدرتها على التعامل مع الشبكات متعددة الموردين والتقنيات.",
      ],
      color: "var(--primary, #428177)",
      icon: <ShieldCheck size={28} color="var(--primary, #428177)" />,
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
      style={darkSlideStyle}
      title=""
    >
      <div style={techGridStyle} />

      {/* Header: Single Expressive Title */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "var(--accent, #6b1f2a)",
                boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(28.8px, 3.17vw, 40.1px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              الأبحاث ذات الصلة
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
      </div>

      {/* 3 Streams Cards revealed ONE BY ONE */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "8px 0",
        }}
      >
        {streams.map((s, i) => {
          const itemStep = i + 2; // Steps 2, 3, 4
          const isVisible = step >= itemStep;
          return (
            <div
              key={s.num}
              style={{
                opacity: isVisible ? 1 : 0.08,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(16px) scale(0.98)",
                transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "#fff",
                borderRadius: "18px",
                padding: "18px 22px",
                border: `2.5px solid ${isVisible ? (s.color === "var(--primary, #428177)" ? "rgba(66, 129, 119, 0.45)" : "rgba(107, 31, 42, 0.45)") : "rgba(0,0,0,0.06)"}`,
                boxShadow: isVisible ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: "rgba(66,129,119,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "19.3px",
                      fontWeight: 900,
                      color: "#fff",
                      background: s.color,
                      padding: "4px 14px",
                      borderRadius: "14px",
                      fontFamily: "Inter",
                    }}
                  >
                    المسار {s.num}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.35,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: "19.3px",
                    color: s.color,
                    fontFamily: "Inter",
                    fontWeight: 800,
                    marginTop: "2px",
                    marginBottom: "12px",
                  }}
                >
                  {s.focus}
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: "0 18px 0 0",
                    listStyle: "disc",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {s.points.map((point) => (
                    <li
                      key={point}
                      style={{
                        fontSize: "19.5px",
                        color: "#1e293b",
                        fontWeight: 700,
                        lineHeight: 1.55,
                      }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 5: Tri-Fold Integration Gap Banner */}
      <div
        style={{
          opacity: step >= 5 ? 1 : 0.15,
          transform: step >= 5 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s ease",
          background: "var(--primary, #428177)",
          borderRadius: "14px",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
          color: "#fff",
          boxShadow: "0 6px 20px rgba(66,129,119,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GitMerge size={26} color="#edebe0" />
          <span style={{ fontSize: "20.5px", fontWeight: 800, color: "#fff" }}>
            الفجوة المنهجية المركزية: انعدام وجود إطار منهجي متكامل يوفق بين التحسين الاقتصادي متعدد الأهداف، والعدالة المكانية، والتحكم التشغيلي اللحظي في بيئة هجينة حقيقية
          </span>
        </div>
        <span
          style={{
            fontSize: "19.3px",
            background: "rgba(255,255,255,0.2)",
            padding: "5px 14px",
            borderRadius: "12px",
            fontWeight: 900,
            fontFamily: "Inter",
            flexShrink: 0,
          }}
        >
      
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 15 (Slide13Algorithms): redesigned — see ./Slide13Algorithms.tsx
// ─────────────────────────────────────────────────────────────
export { Slide13Algorithms } from "./Slide13Algorithms";

// ─────────────────────────────────────────────────────────────
// Slide 16 (Slide14ResearchGap): الفجوة البحثية ومنهجية المعالجة الهندسية المقترحة
// ─────────────────────────────────────────────────────────────
export const Slide14ResearchGap: React.FC = () => {
  // Total 5 steps:
  // Step 1: Title
  // Step 2: Bridge 1
  // Step 3: Bridge 2
  // Step 4: Bridge 3
  // Step 5: Breakthrough Summary Banner
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const gaps = [
    {
      num: "01",
      gap: "غياب نموذج تحسين رياضي موحد متعدد الأهداف يدمج العدالة المكانية (SFI) مع معايير جودة الخدمة",
      solution:
        "تطوير دالة هدف رياضية تجمع بين التكلفة الرأسمالية والتشغيلية وجودة الإشارة وكفاءة البنية التحتية، مع آلية لمعالجة القيود الراديوية",
      icon: <Layers size={26} />,
      color: "var(--primary, #428177)",
      svgSol: (
        <svg viewBox="0 0 70 35" style={{ width: "85px", height: "42px" }}>
          <rect
            x="5"
            y="5"
            width="60"
            height="25"
            rx="5"
            fill="rgba(255,255,255,0.25)"
            stroke="#fff"
            strokeWidth="2"
          />
          <circle cx="35" cy="17" r="6" fill="#fff" />
          <text
            x="35"
            y="21"
            fontSize="13.5"
            fontWeight="900"
            fill="#428177"
            textAnchor="middle"
          >
          
          </text>
        </svg>
      ),
    },
    {
      num: "02",
      gap: "اقتصار الدراسات السابقة على سيناريوهات نظرية مصغرة (<100 موقع) وانعدام التحقق على شبكات وطنية واقعية",
      solution:
        "التحقق التجريبي الشامل على قاعدة بيانات وطنية حقيقية تضم 79,268 موقعاً راديوياً موزعة على 14 محافظة سورية",
      icon: <Radio size={26} />,
      color: "var(--primary, #428177)",
      svgSol: (
        <svg viewBox="0 0 70 35" style={{ width: "85px", height: "42px" }}>
          <rect
            x="5"
            y="5"
            width="60"
            height="25"
            rx="5"
            fill="rgba(255,255,255,0.25)"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x="35"
            y="21"
            fontSize="14.3"
            fontWeight="900"
            fill="#fff"
            textAnchor="middle"
          >
           
          </text>
        </svg>
      ),
    },
    {
      num: "03",
      gap: "افتقار الشبكات الهجينة (Multi-Vendor) لمنظومة أتمتة مكانية تشغيلية والاعتماد على التشويش العشوائي في الطوارئ",
      solution:
        "محرك تحكم جغرافي موحد (GIS-Driven) للأتمتة والتحكم المكاني اللحظي الآمن بدون تشويش لشبكات Huawei و Ericsson",
      icon: <ShieldCheck size={26} />,
      color: "var(--primary, #428177)",
      svgSol: (
        <svg viewBox="0 0 70 35" style={{ width: "85px", height: "42px" }}>
          <rect
            x="5"
            y="5"
            width="60"
            height="25"
            rx="5"
            fill="rgba(255,255,255,0.25)"
            stroke="#fff"
            strokeWidth="2"
          />
          <path d="M 20 17 L 50 17" stroke="#fff" strokeWidth="2.5" />
          <circle cx="35" cy="17" r="4" fill="#fff" />
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
      style={darkSlideStyle}
      title=""
    >
      <div style={techGridStyle} />

      {/* Header: Single Expressive Title */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "var(--accent, #6b1f2a)",
                boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(28.8px, 3.17vw, 40.1px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              تحديد أوجه القصور البحثية وتطوير منهجية علمية لمعالجتها
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
      </div>

      {/* 3 Bridges revealed ONE BY ONE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          position: "relative",
          zIndex: 10,
          justifyContent: "space-between",
          minHeight: 0,
          margin: "8px 0",
        }}
      >
        {gaps.map((g, i) => {
          const itemStep = i + 2; // Steps 2, 3, 4
          const isVisible = step >= itemStep;
          return (
            <div
              key={g.num}
              style={{
                opacity: isVisible ? 1 : 0.08,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "grid",
                gridTemplateColumns: "1.2fr 50px 1.4fr",
                alignItems: "center",
                background: "#fff",
                borderRadius: "18px",
                padding: "14px 22px",
                border: `2px solid ${isVisible ? "rgba(66,129,119,0.35)" : "rgba(0,0,0,0.06)"}`,
                boxShadow: isVisible ? "0 6px 20px rgba(0,0,0,0.07)" : "none",
                flex: 1,
                boxSizing: "border-box",
              }}
            >
              {/* Gap (Red theme) */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(239,68,68,0.12)",
                    color: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AlertTriangle size={26} />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "3px",
                    }}
                  >
                    <span
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "3px 10px",
                        fontSize: "18.6px",
                        fontFamily: "Inter",
                        fontWeight: 900,
                      }}
                    >
                      فجوة {g.num}
                    </span>
                    <span
                      style={{
                        fontSize: "19.3px",
                        color: "#dc2626",
                        fontWeight: 800,
                      }}
                    >
                      القصور في الأدبيات السابقة
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "19.8px",
                      fontWeight: 800,
                      color: "#991b1b",
                      lineHeight: 1.4,
                    }}
                  >
                    {g.gap}
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "var(--primary, #428177)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(66,129,119,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowLeft size={24} strokeWidth={3} />
                </div>
              </div>

              {/* Solution (Green/Primary theme) */}
              <div
                style={{
                  background: g.color,
                  borderRadius: "14px",
                  padding: "12px 20px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 16px rgba(66,129,119,0.25)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {g.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "19.3px",
                        color: "#edebe0",
                        fontWeight: 800,
                        marginBottom: "2px",
                      }}
                    >
                      مساهمة الأطروحة والحل المقترح:
                    </div>
                    <div
                      style={{
                        fontSize: "19.8px",
                        fontWeight: 900,
                        color: "#fff",
                        lineHeight: 1.4,
                      }}
                    >
                      {g.solution}
                    </div>
                  </div>
                </div>
                {g.svgSol}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 5: Breakthrough Summary Banner */}
      <div
        style={{
          opacity: step >= 5 ? 1 : 0.15,
          transform: step >= 5 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s ease",
          background: "var(--primary, #428177)",
          borderRadius: "14px",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
          color: "#fff",
          boxShadow: "0 6px 20px rgba(66,129,119,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Sparkles size={26} color="#edebe0" />
          <span style={{ fontSize: "19.8px", fontWeight: 800, color: "#fff" }}>
            الأثر الهندسي المنهجي: نقل التخطيط الراديوي من النطاق النظري التجريدي إلى منظومة وطنية شاملة تدمج الكفاءة الاقتصادية، والعدالة المكانية، والتحكم التشغيلي الآمن
          </span>
        </div>
        <span
          style={{
            fontSize: "19.3px",
            background: "rgba(255,255,255,0.2)",
            padding: "5px 14px",
            borderRadius: "12px",
            fontWeight: 900,
            fontFamily: "Inter",
            flexShrink: 0,
          }}
        >
           
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 17 (Slide15GapToSolution): معمارية الانتقال من الفجوة إلى منظومة الحل المقترح
// ─────────────────────────────────────────────────────────────
export const Slide15GapToSolution: React.FC = () => {
  // Total 6 steps:
  // Step 1: Title
  // Step 2: Stage 1 (Diagnostics)
  // Step 3: Stage 2 (GIS & Math)
  // Step 4: Stage 3 (Optimization)
  // Step 5: Stage 4 (Operational Control)
  // Step 6: Unified GIS Substrate Foundation Banner
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 6,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const stages = [
    {
      num: "01",
      label: "التشخيص الهندسي للفجوة",
      tag: "",
      color: "var(--accent, #6b1f2a)",
      items: [
        "غياب معمارية موحدة لترقية 5G متعددة الأهداف",
        "انعدام التحقق الميداني على شبكات وطنية واسعة",
        "تبعات التشويش الكهرومغناطيسي العشوائي في الطوارئ",
      ],
    },
    {
      num: "02",
      label: "الصياغة الرياضية والبيئة المكانية",
      tag: "",
      color: "var(--primary, #428177)",
      items: [
        "بيئة GIS الرقمية كركيزة مكانية حاضنة",
        "صياغة دالة الهدف الرياضية الرباعية الهجينة",
        "ابتكار مؤشر العدالة المكانية (SFI)",
      ],
    },
    {
      num: "03",
      label: "محرك التحسين الراديوي متعدد الأهداف",
      tag: "Multi-Objective Engine",
      color: "var(--primary, #428177)",
      items: [
        "ضمان جودة الخدمة مع الحفاظ على قيمة SINR لا تقل عن 12 dB.",
        " خفض النفقات الرأسمالية والتشغيلية وتحسين كفاءتها.   ",
        "التحقق من متانة النتائج من خلال 30 تجربة تشغيل مستقلة.",
      ],
    },
    {
      num: "04",
      label: "التحكم التشغيلي المكاني الآمن",
      tag: "Multi-Vendor Control",
      color: "var(--accent, #6b1f2a)",
      items: [
        "تأطير مكاني عالي الدقة بمضلعات جغرافية (Geofence)",
        "توافق تشغيلي موحد مع بوابات Huawei و Ericsson",
        "عزل انتقائي دقيق دون تشويش واستعادة فورية للخدمة",
      ],
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
      style={darkSlideStyle}
      title=""
    >
      <div style={techGridStyle} />

      {/* Header: Single Expressive Title */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "var(--accent, #6b1f2a)",
                boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(28.8px, 3.17vw, 40.1px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              منهجية متكاملة لتحويل الفجوة البحثية إلى منظومة حل عملية
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
      </div>

      {/* 4 Pipeline Stages revealed ONE BY ONE */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "8px 0",
        }}
      >
        {stages.map((s, i) => {
          const itemStep = i + 2; // Steps 2, 3, 4, 5
          const isVisible = step >= itemStep;
          return (
            <div
              key={s.label}
              style={{
                opacity: isVisible ? 1 : 0.08,
                transform: isVisible ? "scale(1)" : "scale(0.95)",
                transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "#fff",
                borderRadius: "18px",
                padding: "22px 22px",
                border: `2.5px solid ${isVisible ? (s.color === "var(--primary, #428177)" ? "rgba(66, 129, 119, 0.45)" : "rgba(107, 31, 42, 0.45)") : "rgba(0,0,0,0.06)"}`,
                boxShadow: isVisible ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20.5px",
                      background:
                        s.color === "var(--accent, #6b1f2a)"
                          ? "rgba(107,31,42,0.12)"
                          : "rgba(66,129,119,0.12)",
                      color: s.color,
                      padding: "5px 14px",
                      borderRadius: "12px",
                      fontWeight: 900,
                      fontFamily: "Inter",
                    }}
                  >
                    المرحلة {s.num}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "24.5px",
                    fontWeight: 900,
                    color: s.color,
                    marginBottom: s.tag ? "4px" : "16px",
                    lineHeight: 1.35,
                  }}
                >
                  {s.label}
                </div>
                {s.tag ? (
                  <div
                    style={{
                      fontSize: "20.5px",
                      color: "#64748b",
                      fontWeight: 800,
                      fontFamily: "Inter",
                      marginBottom: "16px",
                    }}
                  >
                    {s.tag}
                  </div>
                ) : null}

                {/* Bullets */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  {s.items.map((it, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: s.color,
                          marginTop: "10px",
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          fontSize: "21.5px",
                          color: "#1e293b",
                          fontWeight: 700,
                          lineHeight: 1.5,
                        }}
                      >
                        {it}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  height: "4.5px",
                  marginTop: "18px",
                  background: `linear-gradient(90deg, ${s.color}, transparent)`,
                  borderRadius: "3px",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Step 6: Unified GIS Substrate Foundation Banner */}
      <div
        style={{
          opacity: step >= 6 ? 1 : 0.15,
          transform: step >= 6 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s ease",
          background: "var(--primary, #428177)",
          borderRadius: "14px",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
          color: "#fff",
          boxShadow: "0 6px 20px rgba(66,129,119,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Layers size={26} color="#edebe0" />
          <span style={{ fontSize: "21.5px", fontWeight: 800, color: "#fff" }}>
            منظومة GIS الحاضنة: الركيزة الهندسية الموحدة التي تكفل الانتقال السلس من النمذجة الرياضية النظرية إلى التطبيق الميداني والتحكم التشغيلي الفعلي عبر الجغرافيا الوطنية
          </span>
        </div>
        <span
          style={{
            fontSize: "19.3px",
            background: "rgba(255,255,255,0.2)",
            padding: "5px 14px",
            borderRadius: "12px",
            fontWeight: 900,
            fontFamily: "Inter",
            flexShrink: 0,
          }}
        >
        </span>
      </div>
    </div>
  );
};
