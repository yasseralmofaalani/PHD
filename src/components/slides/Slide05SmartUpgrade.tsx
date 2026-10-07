import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Zap,
  DollarSign,
  Scale,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sliders,
  Layers,
  Activity,
  Award,
  Globe2,
  ArrowLeftRight,
  ShieldCheck,
  Building2,
  Trees,
} from "lucide-react";
import SlideBreadcrumb from "../ui/SlideBreadcrumb";

interface Pillar {
  id: "coverage" | "cost" | "energy" | "fairness";
  titleAr: string;
  titleEn: string;
  shortDesc: string;
  detail: string;
  metric: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  gain: string;
}

export const Slide05SmartUpgrade: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState<
    "selective" | "greenfield"
  >("selective");
  const [selectedPillar, setSelectedPillar] = useState<
    "coverage" | "cost" | "energy" | "fairness"
  >("fairness");
  const [activeTab, setActiveTab] = useState<"visual" | "comparison">("visual");

  const pillars: Pillar[] = [
    {
      id: "coverage",
      titleAr: "التغطية وجودة الخدمة",
      titleEn: "Coverage & QoS",
      shortDesc: "تعظيم جودة الإشارة وسرعة النطاق العريض",
      detail:
        "استهداف النقاط الحيوية والمناطق ذات الكثافة لضمان تغطية متصلة خالية من الثغرات أو التداخل الراديوي.",
      metric: "94.8%",
      badge: "SINR > 12 dB",
      gain: "+42% تحسين التغطية",
      icon: <Radio className="w-5 h-5" />,
      color: "#00f0ff",
      bgColor: "rgba(0, 240, 255, 0.08)",
      borderColor: "rgba(0, 240, 255, 0.35)",
    },
    {
      id: "cost",
      titleAr: "ترشيد التكاليف الاستثمارية",
      titleEn: "CapEx & OpEx Savings",
      shortDesc: "استثمار الأبراج القائمة وخفض نفقات النشر",
      detail:
        "إعادة استخدام البنية التحتية للأبراج القائمة (Co-siting) وتجنب تكاليف حيازة المواقع وبناء أبراج جديدة باهظة الثمن.",
      metric: "-62.4%",
      badge: "CapEx Reduction",
      gain: "توفير ملايين الدولارات",
      icon: <DollarSign className="w-5 h-5" />,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.08)",
      borderColor: "rgba(16, 185, 129, 0.35)",
    },
    {
      id: "energy",
      titleAr: "كفاءة الطاقة والاستدامة",
      titleEn: "Energy & Green Network",
      shortDesc: "تقليل استهلاك الطاقة التشغيلي لكل بت",
      detail:
        "إدارة تشغيل الخلايا الراديوية المؤتمتة وتوجيه الطاقة للمواقع النشطة فقط مع تقليل الانبعاثات الكربونية.",
      metric: "-38.5%",
      badge: "Power Optimization",
      gain: "تشغيل أخضر مستدام",
      icon: <Zap className="w-5 h-5" />,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.08)",
      borderColor: "rgba(245, 158, 11, 0.35)",
    },
    {
      id: "fairness",
      titleAr: "العدالة المكانية والشمول",
      titleEn: "Spatial Fairness (SFI)",
      shortDesc: "ردم الفجوة الرقمية بين الريف والمدينة",
      detail:
        "تطبيق مؤشر العدالة المكانية لضمان عدم تركز خدمات 5G في المراكز التجارية الحضرية وإهمال المناطق الريفية والطرفية.",
      metric: "0.89 SFI",
      badge: "Gini < 0.18",
      gain: "شمول ريفي وعمراني متكافئ",
      icon: <Scale className="w-5 h-5" />,
      color: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.08)",
      borderColor: "rgba(236, 72, 153, 0.35)",
    },
  ];

  const currentPillarData =
    pillars.find((p) => p.id === selectedPillar) || pillars[3];

  return (
    <div
      className="slide"
      dir="rtl"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 10%, #0d2220 0%, #061514 60%, #030a09 100%)",
        padding: "30px 45px 25px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Background Decorative Tech Grid & Glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "15%",
          width: "500px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(66, 129, 119, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "10%",
          width: "450px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header & Breadcrumb */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        <div>
          <SlideBreadcrumb
            part="01"
            partLabel="المقدمة وتحديد الإشكالية"
            chapter="الفصل الثاني — استراتيجية الانتقال في البيئات محدودة الموارد"
            variant="light"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              style={{
                fontSize: "clamp(24.8px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "Cairo",
                margin: "4px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                letterSpacing: "-0.5px",
              }}
            >
              <span>استراتيجية الانتقال إلى الجيل الخامس:</span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #00f0ff 0%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                الترقية التشاركية للأبراج في البيئات محدودة الموارد
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Strategy Mode Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.06)",
            padding: "4px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(8px)",
            gap: "4px",
          }}
        >
          <button
            onClick={() => setActiveStrategy("selective")}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "Cairo",
              fontSize: "19px",
              fontWeight: 700,
              transition: "all 0.25s ease",
              background:
                activeStrategy === "selective"
                  ? "linear-gradient(135deg, #428177 0%, #10b981 100%)"
                  : "transparent",
              color:
                activeStrategy === "selective"
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.6)",
              boxShadow:
                activeStrategy === "selective"
                  ? "0 4px 15px rgba(16, 185, 129, 0.35)"
                  : "none",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>الترقية الانتقائية التشاركية (الحل المقترح)</span>
          </button>

          <button
            onClick={() => setActiveStrategy("greenfield")}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "Cairo",
              fontSize: "19px",
              fontWeight: 700,
              transition: "all 0.25s ease",
              background:
                activeStrategy === "greenfield"
                  ? "linear-gradient(135deg, #6b1f2a 0%, #ef4444 100%)"
                  : "transparent",
              color:
                activeStrategy === "greenfield"
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.6)",
              boxShadow:
                activeStrategy === "greenfield"
                  ? "0 4px 15px rgba(239, 68, 68, 0.35)"
                  : "none",
            }}
          >
            <XCircle className="w-3.5 h-3.5 text-rose-300" />
            <span>الإحلال الكلي (Greenfield)</span>
          </button>
        </motion.div>
      </div>

      {/* Main Grid: Left Visual Diagram & Simulation, Right 4 Balanced Pillars */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "18px",
          zIndex: 2,
          minHeight: 0,
        }}
      >
        {/* Left Column: Visual Tower Upgrade & Dynamic Map/Network Simulation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(10px)",
            position: "relative",
          }}
        >
          {/* Comparison Header Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background:
                    activeStrategy === "selective"
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(239, 68, 68, 0.2)",
                  border: `1px solid ${activeStrategy === "selective" ? "#10b981" : "#ef4444"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {activeStrategy === "selective" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 800,
                    fontFamily: "Cairo",
                    color: "#fff",
                  }}
                >
                  {activeStrategy === "selective"
                    ? "منهجية الترقية الانتقائية والمرحلية (Smart Site Selection)"
                    : "الاستبدال الكامل للشبكة (Full 4G-to-5G Overhaul)"}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontFamily: "Inter",
                  }}
                >
                  {activeStrategy === "selective"
                    ? "Targeted Co-siting & Non-Standalone NSA Architecture"
                    : "High CapEx, slow ROI, unrealistic for resource-constrained contexts"}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: "18px",
                fontFamily: "Cairo",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "20px",
                background:
                  activeStrategy === "selective"
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                color: activeStrategy === "selective" ? "#34d399" : "#f87171",
                border: `1px solid ${activeStrategy === "selective" ? "rgba(52, 211, 153, 0.3)" : "rgba(248, 113, 113, 0.3)"}`,
              }}
            >
              {activeStrategy === "selective"
                ? "✓ الجدوى المثبتة"
                : "⚠️ عبء استثماري معطل"}
            </span>
          </div>

          {/* Visual Tower Transition Graphic (Rich SVG & Animated Beamforming) */}
          <div
            style={{
              position: "relative",
              height: "165px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              background:
                "radial-gradient(circle at center, rgba(66,129,119,0.12) 0%, transparent 70%)",
              borderRadius: "12px",
              margin: "8px 0",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {/* SVG Visual Scheme */}
            <svg
              viewBox="0 0 520 160"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient
                  id="beamGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="dangerGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6b1f2a" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glowEffect">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting Flow Line */}
              <path
                d="M 120 80 Q 260 20 400 80"
                fill="none"
                stroke={
                  activeStrategy === "selective"
                    ? "url(#beamGrad)"
                    : "url(#dangerGrad)"
                }
                strokeWidth="2.5"
                strokeDasharray="6 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="40;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Tower 1: 4G Legacy Tower */}
              <g transform="translate(60, 25)">
                {/* 4G Tower Base & Trusses */}
                <path
                  d="M 40 120 L 50 40 L 60 120 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <line
                  x1="44"
                  y1="90"
                  x2="56"
                  y2="90"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <line
                  x1="47"
                  y1="65"
                  x2="53"
                  y2="65"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <line
                  x1="50"
                  y1="40"
                  x2="50"
                  y2="20"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />
                {/* Antennas */}
                <rect
                  x="42"
                  y="22"
                  width="16"
                  height="5"
                  rx="1.5"
                  fill="#f59e0b"
                  opacity="0.8"
                />
                <circle cx="50" cy="18" r="3" fill="#f59e0b" />
                {/* Waves */}
                <circle
                  cx="50"
                  cy="18"
                  r="12"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  opacity="0.4"
                  strokeDasharray="3 3"
                />
                <text
                  x="50"
                  y="136"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="15.6"
                  fontFamily="Cairo"
                  fontWeight="700"
                >
                  أبراج 4G القائمة
                </text>
                <text
                  x="50"
                  y="148"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.4)"
                  fontSize="13.5"
                  fontFamily="Inter"
                >
                  Legacy Infrastructure
                </text>
              </g>

              {/* Center Transformation Node */}
              <g transform="translate(225, 45)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="70"
                  rx="14"
                  fill={
                    activeStrategy === "selective"
                      ? "rgba(66,129,119,0.35)"
                      : "rgba(107,31,42,0.35)"
                  }
                  stroke={
                    activeStrategy === "selective" ? "#00f0ff" : "#ef4444"
                  }
                  strokeWidth="1.5"
                  filter="url(#glowEffect)"
                />
                <circle
                  cx="35"
                  cy="35"
                  r="24"
                  fill="none"
                  stroke={
                    activeStrategy === "selective" ? "#10b981" : "#f87171"
                  }
                  strokeWidth="1"
                  strokeDasharray="4 2"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 35 35"
                    to="360 35 35"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>
                {activeStrategy === "selective" ? (
                  <>
                    <text
                      x="35"
                      y="32"
                      textAnchor="middle"
                      fill="#00f0ff"
                      fontSize="15.6"
                      fontFamily="Cairo"
                      fontWeight="900"
                    >
                      خوارزمية
                    </text>
                    <text
                      x="35"
                      y="47"
                      textAnchor="middle"
                      fill="#10b981"
                      fontSize="15"
                      fontFamily="Inter"
                      fontWeight="800"
                    >
                      BPSO-AGA
                    </text>
                  </>
                ) : (
                  <>
                    <text
                      x="35"
                      y="32"
                      textAnchor="middle"
                      fill="#fca5a5"
                      fontSize="15.6"
                      fontFamily="Cairo"
                      fontWeight="900"
                    >
                      استبدال
                    </text>
                    <text
                      x="35"
                      y="47"
                      textAnchor="middle"
                      fill="#ef4444"
                      fontSize="15"
                      fontFamily="Cairo"
                      fontWeight="800"
                    >
                      عشوائي/كامل
                    </text>
                  </>
                )}
                <text
                  x="35"
                  y="86"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="15"
                  fontFamily="Cairo"
                  fontWeight="700"
                >
                  {activeStrategy === "selective"
                    ? "انتخاب الأبراج المثلى"
                    : "هدر رأسمالي"}
                </text>
              </g>

              {/* Tower 2: 5G Smart Upgraded Site */}
              <g transform="translate(390, 20)">
                {/* 5G High-Tech Tower */}
                <path
                  d="M 40 125 L 50 35 L 60 125 Z"
                  fill="none"
                  stroke={
                    activeStrategy === "selective"
                      ? "#00f0ff"
                      : "rgba(255,255,255,0.2)"
                  }
                  strokeWidth="2.5"
                />
                <line
                  x1="44"
                  y1="95"
                  x2="56"
                  y2="95"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                />
                <line
                  x1="47"
                  y1="65"
                  x2="53"
                  y2="65"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                />
                <line
                  x1="50"
                  y1="35"
                  x2="50"
                  y2="10"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                />
                {/* Massive MIMO Active Antennas */}
                <rect
                  x="38"
                  y="14"
                  width="24"
                  height="8"
                  rx="2"
                  fill="#10b981"
                  filter="url(#glowEffect)"
                />
                <circle
                  cx="50"
                  cy="8"
                  r="4"
                  fill="#00f0ff"
                  filter="url(#glowEffect)"
                />
                {/* Glowing Beam Waves */}
                <circle
                  cx="50"
                  cy="8"
                  r="16"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="r"
                    values="12;28;12"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.1;0.8"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="50"
                  cy="8"
                  r="26"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values="20;38;20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="50"
                  y="141"
                  textAnchor="middle"
                  fill="#00f0ff"
                  fontSize="17"
                  fontFamily="Cairo"
                  fontWeight="900"
                >
                  {activeStrategy === "selective"
                    ? "ترقية ذكية 5G Co-sited"
                    : "بناء أبراج 5G جديدة"}
                </text>
                <text
                  x="50"
                  y="153"
                  textAnchor="middle"
                  fill="rgba(0, 240, 255, 0.7)"
                  fontSize="13.5"
                  fontFamily="Inter"
                  fontWeight="600"
                >
                  {activeStrategy === "selective"
                    ? "Massive MIMO + NSA Core"
                    : "Standalone mmWave Site"}
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Live Metrics Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              paddingTop: "8px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "Cairo",
                }}
              >
                الكلفة الاستثمارية
              </div>
              <div
                style={{
                  fontSize: "19.8px",
                  fontWeight: 900,
                  fontFamily: "Inter",
                  color: activeStrategy === "selective" ? "#10b981" : "#f87171",
                  marginTop: "2px",
                }}
              >
                {activeStrategy === "selective"
                  ? "منخفضة (استثمار 4G)"
                  : "باهظة جداً ($$$)"}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "Cairo",
                }}
              >
                سرعة النشر والجاهزية
              </div>
              <div
                style={{
                  fontSize: "19.8px",
                  fontWeight: 900,
                  fontFamily: "Cairo",
                  color: activeStrategy === "selective" ? "#00f0ff" : "#f59e0b",
                  marginTop: "2px",
                }}
              >
                {activeStrategy === "selective"
                  ? "نشر مرحلي سريع"
                  : "سنوات طويلة"}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "Cairo",
                }}
              >
                الملاءمة لمحدودي الموارد
              </div>
              <div
                style={{
                  fontSize: "19.8px",
                  fontWeight: 900,
                  fontFamily: "Cairo",
                  color: activeStrategy === "selective" ? "#34d399" : "#ef4444",
                  marginTop: "2px",
                }}
              >
                {activeStrategy === "selective" ? "مثالية 100%" : "شبه مستحيلة"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: The 4 Strategic Balance Pillars (Coverage, Cost, Energy, Spatial Fairness) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Scale className="w-4 h-4 text-cyan-400" />
              <span
                style={{
                  fontSize: "19.3px",
                  fontWeight: 900,
                  fontFamily: "Cairo",
                  color: "#fff",
                }}
              >
                الموازنة الرباعية الحتمية لترقية الأبراج
              </span>
            </div>
            <span
              style={{
                fontSize: "18px",
                fontFamily: "Inter",
                color: "rgba(255, 255, 255, 0.5)",
                background: "rgba(255, 255, 255, 0.06)",
                padding: "2px 8px",
                borderRadius: "6px",
              }}
            >
              4-Objective Trade-Off
            </span>
          </div>

          {/* 4 Interactive Clickable Cards */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {pillars.map((pillar, idx) => {
              const isSelected = selectedPillar === pillar.id;
              return (
                <motion.div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar.id)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08 }}
                  style={{
                    background: isSelected
                      ? pillar.bgColor
                      : "rgba(255, 255, 255, 0.03)",
                    border: `1.5px solid ${isSelected ? pillar.color : "rgba(255, 255, 255, 0.08)"}`,
                    borderRadius: "12px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    transition: "all 0.25s ease",
                    boxShadow: isSelected
                      ? `0 8px 25px ${pillar.bgColor}`
                      : "none",
                  }}
                >
                  {/* Card Top */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: isSelected
                          ? pillar.color
                          : "rgba(255, 255, 255, 0.08)",
                        color: isSelected ? "#000" : pillar.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {pillar.icon}
                    </div>

                    <span
                      style={{
                        fontSize: "18px",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: isSelected
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.05)",
                        color: isSelected ? "#fff" : "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div style={{ margin: "6px 0" }}>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 900,
                        fontFamily: "Cairo",
                        color: "#fff",
                        lineHeight: 1.2,
                      }}
                    >
                      {pillar.titleAr}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        color: pillar.color,
                        fontFamily: "Inter",
                        fontWeight: 600,
                        marginTop: "2px",
                      }}
                    >
                      {pillar.titleEn}
                    </div>
                  </div>

                  {/* Mini Gain / Metric Indicator */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "6px",
                      borderTop: `1px solid ${isSelected ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontFamily: "Cairo",
                        fontWeight: 600,
                      }}
                    >
                      {pillar.gain}
                    </span>
                    <span
                      style={{
                        fontSize: "19px",
                        fontWeight: 900,
                        fontFamily: "Inter",
                        color: pillar.color,
                      }}
                    >
                      {pillar.metric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Pillar Expanded Strategic Detail Bar */}
          <motion.div
            key={currentPillarData.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(66, 129, 119, 0.2) 0%, rgba(237, 235, 224, 0.05) 100%)",
              border: `1px solid ${currentPillarData.borderColor}`,
              borderRadius: "12px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: currentPillarData.bgColor,
                border: `1px solid ${currentPillarData.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentPillarData.color,
                flexShrink: 0,
              }}
            >
              {currentPillarData.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "19px",
                    fontWeight: 900,
                    fontFamily: "Cairo",
                    color: currentPillarData.color,
                  }}
                >
                  الهدف الاستراتيجي ({currentPillarData.titleAr}):
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontFamily: "Inter",
                  }}
                >
                  {currentPillarData.titleEn}
                </span>
              </div>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontFamily: "Cairo",
                  margin: "3px 0 0",
                  lineHeight: 1.45,
                }}
              >
                {currentPillarData.detail}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Punchline Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background:
            "linear-gradient(90deg, rgba(66, 129, 119, 0.3) 0%, rgba(107, 31, 42, 0.3) 100%)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              background: "#00f0ff",
              color: "#000",
              fontFamily: "Cairo",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            خلاصة الأطروحة
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "19px",
              fontFamily: "Cairo",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            الترقية التشاركية للأبراج القائمة هي{" "}
            <strong style={{ color: "#00f0ff" }}>
              الخيار العلمي والواقعي الوحيد
            </strong>{" "}
            لتمكين الجيل الخامس في بيئات الموارد المحدودة مع ضمان التكافؤ
            الجغرافي.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "Inter",
            }}
          >
            Mathematical Optimization
          </span>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Slide05SmartUpgrade;
