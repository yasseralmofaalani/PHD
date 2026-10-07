import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Zap,
  DollarSign,
  Scale,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  X,
  Check,
  CheckCircle2,
} from "lucide-react";
import SlideBreadcrumb from "../ui/SlideBreadcrumb";
import { useStepReveal } from "../../hooks/useStepReveal";

interface Slide06Props {
  onOpenModal?: (id: string) => void;
}

export const Slide06ResearchProblem: React.FC<Slide06Props> = ({
  onOpenModal,
}) => {
  // Step 1: Central Problem Statement & High-Level Framing (No issues shown yet)
  // Step 2: Issue 1 (الفقرة الأولى): Tower Upgrade & Multi-Objective Balancing
  // Step 3: Issue 2 (الفقرة الثانية): Spatial Fairness Breakthrough (SFI)
  // Step 4: Issue 3 (الفقرة الثالثة): Operational Geofence Isolation (No-Jamming)
  // Step 5: Synthesis (خلاصة التكامل والتتويج): Unified Optimization Framework
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const handleSlideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext();
  };

  const stepsLabels = [
    { num: 1, label: "مدخل الإشكالية" },
    { num: 2, label: "1. الترقية والموازنة" },
    { num: 3, label: "2. العدالة المكانية SFI" },
    { num: 4, label: "3. العزل دون تشويش" },
    { num: 5, label: "خلاصة الإطار الموحد" },
  ];

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleSlideClick}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 8,
        padding: "clamp(10px, 1.4vh, 16px) clamp(18px, 2.2vw, 32px)",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        background: "transparent",
        color: "#000000",
        userSelect: "none",
        cursor: "pointer",
      }}
      title=""
    >
      {/* Background kept clean — parchment only */}

      {/* Top Header Bar: Clean Large Title + Step Indicator Pills */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
            paddingBottom: "6px",
            gap: 10,
          }}
        >
          {/* Right: Slide Title + Integrated Breadcrumb */}
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
                background: "var(--accent)",
                boxShadow: "0 0 14px rgba(107, 31, 42, 0.6)",
              }}
            />
            <h1
              style={{
                fontSize: "clamp(26px, 2.8vw, 36px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
                lineHeight: 1.65,
                paddingBlock: 2,
              }}
            >
              إشكالية البحث المركزية
            </h1>
           
          </div>

          {/* Left: Step Indicator Pills */}
          <div
            data-no-advance="true"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#ffffff",
              padding: "4px 10px",
              borderRadius: "24px",
              border: "1.5px solid rgba(66, 129, 119, 0.3)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            {stepsLabels.map((s) => (
              <button
                key={s.num}
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(s.num);
                }}
                style={{
                  padding: "5px 13px",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 900,
                  fontFamily: "Cairo, sans-serif",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  background:
                    step === s.num
                      ? "linear-gradient(135deg, var(--primary) 0%, #2c5952 100%)"
                      : step > s.num
                        ? "rgba(66, 129, 119, 0.15)"
                        : "transparent",
                  color:
                    step === s.num
                      ? "#ffffff"
                      : step > s.num
                        ? "var(--primary)"
                        : "#64748b",
                  boxShadow:
                    step === s.num
                      ? "0 2px 8px rgba(66, 129, 119, 0.4)"
                      : "none",
                }}
              >
                {step > s.num ? `✓ ${s.label}` : s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overarching Central Problem Framing Banner (Always visible with LARGE 18px font) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "16px",
          border: "2px solid rgba(66, 129, 119, 0.35)",
          padding: "8px 16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flex: 1,
          }}
        >
          <span
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              padding: "6px 16px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 900,
              flexShrink: 0,
              lineHeight: 1.35,
            }}
          >
            إشكالية التخطيط والانتقال الوطني
          </span>
          <p
            style={{
              fontSize: "clamp(16px, 1.35vw, 19px)",
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
           تتمثل إشكالية البحث في تطوير منهجية فعّالة لترقية الشبكات الخلوية القائمة نحو الجيل الخامس، بحيث تحقق
            توازنًا بين تعظيم التغطية، وتقليل تكاليف الاستثمار، وتحسين العدالة المكانية في توزيع الخدمة، وضمان 
            التحكم الآمن بالخدمات الخلوية دون التأثير على الطيف الراديوي بالتشويش.
          </p>
        </div>

        {/* Step Guide Prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background:
              step < 5 ? "rgba(107, 31, 42, 0.1)" : "rgba(4, 120, 87, 0.12)",
            color: step < 5 ? "var(--accent)" : "#047857",
            padding: "6px 14px",
            borderRadius: "12px",
            fontSize: "18.6px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          <Sparkles size={16} />
         
        </div>
      </div>

      {/* Main Slide Body: The 3 Core Issue Columns (Revealed One After Another upon pressing ANY key) */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
        }}
      >
        {/* ========================================================
            COLUMN 1 (الفقرة الأولى): ISSUE 1 - TOWER UPGRADE & BALANCING
            Appears at step >= 2
           ======================================================== */}
        <div
          style={{
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {step >= 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                flex: 1,
                background: "#ffffff",
                borderRadius: "18px",
                border: "2.5px solid var(--primary)",
                boxShadow: "0 8px 24px rgba(66, 129, 119, 0.18)",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 8,
                boxSizing: "border-box",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(66, 129, 119, 0.12)",
                      color: "var(--primary)",
                      padding: "4px 10px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      lineHeight: 1.35,
                      minWidth: 0,
                    }}
                  >
                    <Radio size={15} />
                    المحور 01: الترقية والتوازن متعدد الأهداف
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {onOpenModal && (
                      <button
                        data-no-advance
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenModal("gis");
                        }}
                        style={{
                          background: "rgba(66, 129, 119, 0.15)",
                          border: "1px solid var(--primary)",
                          borderRadius: "8px",
                          padding: "3px 8px",
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "var(--primary)",
                          cursor: "pointer",
                        }}
                      >
                        تفاصيل GIS ↗
                      </button>
                    )}
                    <span
                      style={{
                        fontSize: "23px",
                        fontWeight: 900,
                        color: "var(--primary)",
                        fontFamily: "Inter",
                      }}
                    >
                      01
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(17px, 1.4vw, 21px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    margin: "0",
                    lineHeight: 1.4,
                  }}
                >
                  ترقية الأبراج القائمة والموازنة متعددة الأهداف
                </h3>

               
              </div>

              {/* 3 Metric Badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "rgba(4, 120, 87, 0.1)",
                    padding: "8px 4px",
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "1.2px solid #059669",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 19px)",
                      fontWeight: 900,
                      color: "#047857",
                      lineHeight: 1.3,
                    }}
                  >
                    94.2%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 800,
                      color: "#065f46",
                      lineHeight: 1.35,
                    }}
                  >
                    تغطية قصوى
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(107, 31, 42, 0.1)",
                    padding: "8px 4px",
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "1.2px solid var(--accent)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 19px)",
                      fontWeight: 900,
                      color: "var(--accent)",
                      lineHeight: 1.3,
                    }}
                  >
                    وفر 62.4%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 800,
                      color: "var(--accent)",
                      lineHeight: 1.35,
                    }}
                  >
                    خفض تكاليف الاستثمار
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(37, 99, 235, 0.1)",
                    padding: "8px 4px",
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "1.2px solid #2563eb",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 19px)",
                      fontWeight: 900,
                      color: "#2563eb",
                      lineHeight: 1.3,
                    }}
                  >
                    ترشيد 38.5%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 800,
                      color: "#1e40af",
                      lineHeight: 1.35,
                    }}
                  >
                    ترشيد الطاقة
                  </div>
                </div>
              </div>

              {/* Technical SVG Diagram: Co-siting Upgrade with LARGE LABELS */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(66,129,119,0.06) 0%, #f8fafc 100%)",
                  borderRadius: "14px",
                  padding: "8px",
                  border: "1.5px solid rgba(66, 129, 119, 0.25)",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(13px, 1.1vw, 16px)",
                    fontWeight: 900,
                    color: "var(--primary)",
                    textAlign: "center",
                    marginBottom: "4px",
                    lineHeight: 1.35,
                    flexShrink: 0,
                  }}
                >
                  المخطط الهندسي: ترقية الأبراج القائمة 
                </div>

                <svg
                  viewBox="0 0 360 200"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ width: "100%", flex: 1, minHeight: 0, display: "block", overflow: "hidden" }}
                >
                  <defs>
                    <linearGradient
                      id="tealGrad06Col"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#428177" />
                      <stop offset="100%" stopColor="#1e3a35" />
                    </linearGradient>
                    <clipPath id="upgradeClip">
                      <rect x="0" y="0" width="360" height="200" rx="8" />
                    </clipPath>
                  </defs>

                  <g clipPath="url(#upgradeClip)">
                    {/* Left card: Legacy Tower */}
                    <rect x="8" y="10" width="100" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="18" y1="148" x2="98" y2="148" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />
                    <path d="M 38 140 L 58 28 L 78 140 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                    <line x1="42" y1="108" x2="74" y2="108" stroke="#64748b" strokeWidth="2" />
                    <line x1="46" y1="72" x2="70" y2="72" stroke="#64748b" strokeWidth="2" />
                    <circle cx="58" cy="28" r="5" fill="#64748b" />
                    <rect x="16" y="156" width="84" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
                    <text x="58" y="168" textAnchor="middle" fontSize="14" fontWeight="900" fill="#475569" fontFamily="Cairo, sans-serif">برج قائم</text>
                    <text x="58" y="178" textAnchor="middle" fontSize="13" fontWeight="800" fill="#64748b" fontFamily="Inter, sans-serif">3G / 4G</text>

                    {/* Center: Upgrade arrow + label inside pill */}
                    <circle cx="140" cy="78" r="18" fill="#ffffff" stroke="var(--primary)" strokeWidth="2.5" />
                    <path d="M 131 78 L 149 78 M 142 71 L 149 78 L 142 85" fill="none" stroke="var(--primary)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="112" y="104" width="56" height="36" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.4" />
                    <text x="140" y="118" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--primary)" fontFamily="Cairo, sans-serif">ترقية</text>
                    <text x="140" y="132" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--primary)" fontFamily="Cairo, sans-serif">تشاركية</text>

                    {/* Right card: Upgraded 5G */}
                    <rect x="180" y="10" width="100" height="180" rx="10" fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="1.5" />
                    <line x1="190" y1="148" x2="270" y2="148" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="4 3" />
                    <path d="M 210 140 L 230 24 L 250 140 Z" fill="none" stroke="url(#tealGrad06Col)" strokeWidth="3.5" />
                    <line x1="214" y1="108" x2="246" y2="108" stroke="#428177" strokeWidth="2.2" />
                    <line x1="218" y1="70" x2="242" y2="70" stroke="#428177" strokeWidth="2.2" />
                    <rect x="214" y="22" width="12" height="22" rx="2" fill="#6b1f2a" />
                    <rect x="234" y="22" width="12" height="22" rx="2" fill="#6b1f2a" />
                    <circle cx="230" cy="20" r="5" fill="#6b1f2a" />
                    <polygon points="192,100 208,90 210,102 194,110" fill="#047857" stroke="#fbbf24" strokeWidth="1.4" />
                    <circle cx="190" cy="90" r="4" fill="#fbbf24" />
                    <path d="M 248 18 A 16 16 0 0 1 262 34" fill="none" stroke="#428177" strokeWidth="2.4" strokeLinecap="round" />
                    <rect x="188" y="156" width="84" height="26" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                    <text x="230" y="168" textAnchor="middle" fontSize="14" fontWeight="900" fill="#047857" fontFamily="Cairo, sans-serif">5G AAU</text>
                    <text x="230" y="178" textAnchor="middle" fontSize="13" fontWeight="800" fill="#065f46" fontFamily="Cairo, sans-serif">+ طاقة شمسية</text>

                    {/* Metric cards — text fully inside */}
                    <rect x="292" y="28" width="60" height="50" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
                    <text x="322" y="48" textAnchor="middle" fontSize="16" fontWeight="900" fill="#047857" fontFamily="Inter, sans-serif">62.4%</text>
                    <text x="322" y="64" textAnchor="middle" fontSize="12" fontWeight="800" fill="#065f46" fontFamily="Cairo, sans-serif">خفض CapEx</text>

                    <rect x="292" y="92" width="60" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                    <text x="322" y="112" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1e40af" fontFamily="Inter, sans-serif">38%</text>
                    <text x="322" y="128" textAnchor="middle" fontSize="12" fontWeight="800" fill="#2563eb" fontFamily="Cairo, sans-serif">ترشيد طاقة</text>
                  </g>
                </svg>
              </div>
            </motion.div>
          ) : (
            /* Dotted Placeholder before Step 2 */
            <div
              style={{
                flex: 1,
                borderRadius: "18px",
                border: "2.5px dashed rgba(66, 129, 119, 0.35)",
                background: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  background: "rgba(66, 129, 119, 0.12)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Radio size={30} />
              </div>
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: 900,
                  color: "var(--primary)",
                }}
              >
                المحور 01: الترقية والموازنة متعددة الأهداف
              </div>
              <div
                style={{
                  fontSize: "19.3px",
                  fontWeight: 800,
                  color: "#64748b",
                  textAlign: "center",
                }}
              >
               
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            COLUMN 2 (الفقرة الثانية): ISSUE 2 - SPATIAL FAIRNESS BREAKTHROUGH (SFI)
            Appears at step >= 3
           ======================================================== */}
        <div
          style={{
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {step >= 3 ? (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                flex: 1,
                background: "#ffffff",
                borderRadius: "18px",
                border: "2.5px solid var(--accent)",
                boxShadow: "0 8px 24px rgba(107, 31, 42, 0.2)",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 8,
                boxSizing: "border-box",
                position: "relative",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              {/* Crown Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "-1px",
                  left: "-1px",
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, #831843 100%)",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 900,
                  padding: "3px 12px",
                  borderRadius: "16px 0 14px 0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  lineHeight: 1.35,
                  zIndex: 2,
                }}
              >
                المساهمة المعيارية للأطروحة ⭐
              </div>

              {/* Header */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: "6px",
                    marginTop: "18px",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(107, 31, 42, 0.15)",
                      color: "var(--accent)",
                      padding: "4px 10px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      lineHeight: 1.35,
                      minWidth: 0,
                    }}
                  >
                    <Scale size={15} />
                    المحور 02: العدالة المكانية (SFI)
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {onOpenModal && (
                      <button
                        data-no-advance
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenModal("spatial-fairness");
                        }}
                        style={{
                          background: "rgba(107, 31, 42, 0.15)",
                          border: "1px solid var(--accent)",
                          borderRadius: "8px",
                          padding: "3px 8px",
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "var(--accent)",
                          cursor: "pointer",
                        }}
                      >
                        صياغة SFI ↗
                      </button>
                    )}
                    <span
                      style={{
                        fontSize: "23px",
                        fontWeight: 900,
                        color: "var(--accent)",
                        fontFamily: "Inter",
                      }}
                    >
                      02
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(17px, 1.4vw, 21px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    margin: "0",
                    lineHeight: 1.4,
                  }}
                >
                  العدالة المكانية (SFI) ومعالجة التفاوت الجغرافي
                </h3>

               
              </div>

              {/* 2 Comparison Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "rgba(107, 31, 42, 0.08)",
                    borderRadius: "10px",
                    padding: "7px 8px",
                    border: "1.2px solid rgba(107, 31, 42, 0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 900,
                      color: "var(--accent)",
                      lineHeight: 1.4,
                    }}
                  >
                    التخطيط التجاري التقليدي ❌
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      color: "#475569",
                      fontWeight: 800,
                      marginTop: "2px",
                      lineHeight: 1.4,
                    }}
                  >
                    تركيز السعة بالمدن وتدني تغطية الريف (SFI = 0.52)
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 120, 87, 0.1)",
                    borderRadius: "10px",
                    padding: "7px 8px",
                    border: "1.5px solid #059669",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 900,
                      color: "#047857",
                      lineHeight: 1.4,
                    }}
                  >
                    التخطيط بالعدالة المكانية (SFI) ✔
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      color: "#0f172a",
                      fontWeight: 900,
                      marginTop: "2px",
                      lineHeight: 1.4,
                    }}
                  >
                    توزيع متوازن يحقق 85% تغطية ريفية (SFI = 0.71)
                  </div>
                </div>
              </div>

              {/* Technical SVG Diagram: SFI Balance Scale with LARGE LABELS */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(107,31,42,0.06) 0%, #f8fafc 100%)",
                  borderRadius: "14px",
                  padding: "8px",
                  border: "1.5px solid rgba(107, 31, 42, 0.25)",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(13px, 1.1vw, 16px)",
                    fontWeight: 900,
                    color: "var(--accent)",
                    textAlign: "center",
                    marginBottom: "4px",
                    lineHeight: 1.35,
                    flexShrink: 0,
                  }}
                >
                  ميزان العدالة المكانية (SFI): الإنصاف الرقمي بين الريف
                  والمدينة
                </div>

                <svg
                  viewBox="0 0 360 200"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ width: "100%", flex: 1, minHeight: 0, display: "block", overflow: "hidden" }}
                >
                  <defs>
                    <clipPath id="sfiClip">
                      <rect x="0" y="0" width="360" height="200" rx="8" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#sfiClip)">
                    {/* Rural card (left) */}
                    <rect x="10" y="52" width="120" height="138" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
                    <path d="M 22 120 Q 50 78 78 120" fill="#d1fae5" stroke="#a7f3d0" strokeWidth="1.4" />
                    <path d="M 62 120 Q 90 82 118 120" fill="#bbf7d0" stroke="#6ee7b7" strokeWidth="1.2" />
                    <path d="M 34 108 L 42 88 L 50 108 Z" fill="#047857" />
                    <path d="M 56 104 L 66 82 L 76 104 Z" fill="#059669" />
                    <rect x="78" y="100" width="22" height="18" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                    <path d="M 50 72 A 22 22 0 0 1 90 72" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="70" cy="70" r="3.5" fill="var(--accent)" />
                    <rect x="20" y="148" width="100" height="32" rx="7" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.3" />
                    <text x="70" y="162" textAnchor="middle" fontSize="15" fontWeight="900" fill="#047857" fontFamily="Cairo, sans-serif">الأرياف</text>
                    <text x="70" y="174" textAnchor="middle" fontSize="14" fontWeight="800" fill="#065f46" fontFamily="Cairo, sans-serif">والقرى</text>

                    {/* Urban card (right) */}
                    <rect x="230" y="52" width="120" height="138" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                    <rect x="248" y="78" width="16" height="48" rx="2" fill="#475569" />
                    <rect x="270" y="64" width="22" height="62" rx="2" fill="var(--primary)" />
                    <rect x="298" y="84" width="14" height="42" rx="2" fill="#64748b" />
                    <line x1="281" y1="64" x2="281" y2="52" stroke="var(--primary)" strokeWidth="2.5" />
                    <circle cx="281" cy="50" r="4" fill="var(--accent)" />
                    <rect x="240" y="148" width="100" height="32" rx="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.3" />
                    <text x="290" y="162" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a" fontFamily="Cairo, sans-serif">المدن</text>
                    <text x="290" y="174" textAnchor="middle" fontSize="14" fontWeight="800" fill="#334155" fontFamily="Cairo, sans-serif">والمراكز</text>

                    {/* Balance beam */}
                    <line x1="130" y1="110" x2="230" y2="110" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="180,110 168,148 192,148" fill="#334155" />
                    <circle cx="180" cy="110" r="6" fill="var(--accent)" />

                    {/* SFI badge — fully inside */}
                    <rect x="118" y="8" width="124" height="40" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                    <text x="180" y="24" textAnchor="middle" fontSize="14" fontWeight="900" fill="#047857" fontFamily="Cairo, sans-serif">قفزة نوعية +36.5%</text>
                    <text x="180" y="38" textAnchor="middle" fontSize="16" fontWeight="900" fill="#047857" fontFamily="Inter, sans-serif">SFI: 0.71</text>
                  </g>
                </svg>
              </div>
            </motion.div>
          ) : (
            /* Dotted Placeholder before Step 3 */
            <div
              style={{
                flex: 1,
                borderRadius: "18px",
                border: "2.5px dashed rgba(107, 31, 42, 0.35)",
                background: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  background: "rgba(107, 31, 42, 0.12)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Scale size={30} />
              </div>
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: 900,
                  color: "var(--accent)",
                }}
              >
                المحور 02: العدالة المكانية (SFI)
              </div>
              <div
                style={{
                  fontSize: "19.3px",
                  fontWeight: 800,
                  color: "#64748b",
                  textAlign: "center",
                }}
              >
               
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            COLUMN 3 (الفقرة الثالثة): ISSUE 3 - OPERATIONAL CONTROL & NO-JAMMING
            Appears at step >= 4
           ======================================================== */}
        <div
          style={{
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {step >= 4 ? (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                flex: 1,
                background: "#ffffff",
                borderRadius: "18px",
                border: "2.5px solid #047857",
                boxShadow: "0 8px 24px rgba(4, 120, 87, 0.18)",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 8,
                boxSizing: "border-box",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(4, 120, 87, 0.12)",
                      color: "#047857",
                      padding: "4px 10px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      lineHeight: 1.35,
                      minWidth: 0,
                    }}
                  >
                    <ShieldCheck size={15} />
                    المحور 03: التحكم والعزل الطيفي البرمجي
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {onOpenModal && (
                      <button
                        data-no-advance
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenModal("orchestration");
                        }}
                        style={{
                          background: "rgba(4, 120, 87, 0.15)",
                          border: "1px solid #047857",
                          borderRadius: "8px",
                          padding: "3px 8px",
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "#047857",
                          cursor: "pointer",
                        }}
                      >
                        تفاصيل العزل ↗
                      </button>
                    )}
                    <span
                      style={{
                        fontSize: "23px",
                        fontWeight: 900,
                        color: "#047857",
                        fontFamily: "Inter",
                      }}
                    >
                      03
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(17px, 1.4vw, 21px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    margin: "0",
                    lineHeight: 1.4,
                  }}
                >
                  التحكم الخلوي والعزل البرمجي دون تشويش (No-Jamming)
                </h3>

               
              </div>

              {/* 2 Comparison Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    borderRadius: "10px",
                    padding: "7px 8px",
                    border: "1.2px solid rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 900,
                      color: "#b91c1c",
                      lineHeight: 1.4,
                    }}
                  >
                    التشويش الراديوي التقليدي ❌
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      color: "#475569",
                      fontWeight: 800,
                      marginTop: "2px",
                      lineHeight: 1.4,
                    }}
                  >
                    إشعاع عشوائي، انقطاع الطوارئ، هدر طاقي
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(4, 120, 87, 0.1)",
                    borderRadius: "10px",
                    padding: "7px 8px",
                    border: "1.5px solid #059669",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      fontWeight: 900,
                      color: "#047857",
                      lineHeight: 1.4,
                    }}
                  >
                    العزل البرمجي الديناميكي ✔
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.05vw, 15px)",
                      color: "#0f172a",
                      fontWeight: 900,
                      marginTop: "2px",
                      lineHeight: 1.4,
                    }}
                  >
                    دقة مكانية 97.5%، صون اتصالات الطوارئ، استعادة &lt;30 ثانية
                  </div>
                </div>
              </div>

              {/* Technical SVG Diagram: Jammer vs Software Geofence with LARGE LABELS */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(4,120,87,0.06) 0%, #f8fafc 100%)",
                  borderRadius: "14px",
                  padding: "8px",
                  border: "1.5px solid rgba(4, 120, 87, 0.25)",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(13px, 1.1vw, 16px)",
                    fontWeight: 900,
                    color: "#047857",
                    textAlign: "center",
                    marginBottom: "4px",
                    lineHeight: 1.35,
                    flexShrink: 0,
                  }}
                >
                  المقارنة الهندسية: التشويش العشوائي مقابل العزل البرمجي
                </div>

                <svg
                  viewBox="0 0 360 200"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ width: "100%", flex: 1, minHeight: 0, display: "block", overflow: "hidden" }}
                >
                  <defs>
                    <clipPath id="isoClip">
                      <rect x="0" y="0" width="360" height="200" rx="8" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#isoClip)">
                    {/* Left: Jammer — label INSIDE the red frame */}
                    <rect x="12" y="12" width="148" height="176" rx="12" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.8" />
                    <rect x="36" y="48" width="28" height="44" rx="4" fill="#475569" />
                    <line x1="50" y1="48" x2="50" y2="28" stroke="#1e293b" strokeWidth="3.2" />
                    <path d="M 62 36 Q 84 20 106 36 T 144 36" fill="none" stroke="#ef4444" strokeWidth="2.4" strokeDasharray="4 2" />
                    <path d="M 62 54 Q 86 36 110 54 T 148 54" fill="none" stroke="#ef4444" strokeWidth="2.2" />
                    <line x1="28" y1="28" x2="144" y2="120" stroke="#dc2626" strokeWidth="3.5" />
                    <line x1="28" y1="120" x2="144" y2="28" stroke="#dc2626" strokeWidth="3.5" />
                    <rect x="24" y="140" width="124" height="36" rx="8" fill="#ffffff" stroke="#fecaca" strokeWidth="1.3" />
                    <text x="86" y="155" textAnchor="middle" fontSize="15" fontWeight="900" fill="#991b1b" fontFamily="Cairo, sans-serif">تشويش أعمى</text>
                    <text x="86" y="169" textAnchor="middle" fontSize="14" fontWeight="800" fill="#b91c1c" fontFamily="Cairo, sans-serif">وضار ✕</text>

                    {/* Arrow */}
                    <circle cx="180" cy="100" r="16" fill="#ffffff" stroke="var(--primary)" strokeWidth="2.4" />
                    <path d="M 186 100 L 174 100 M 180 94 L 174 100 L 180 106" fill="none" stroke="var(--primary)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Right: Software isolation — label INSIDE the green frame */}
                    <rect x="200" y="12" width="148" height="176" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.8" />
                    <polygon points="230,118 242,52 254,118" fill="none" stroke="var(--primary)" strokeWidth="2.4" />
                    <path d="M 248 36 Q 274 22 300 36 Q 304 84 274 108 Q 248 84 248 36 Z" fill="rgba(66,129,119,0.22)" stroke="var(--primary)" strokeWidth="2" />
                    <circle cx="274" cy="64" r="12" fill="#047857" />
                    <line x1="268" y1="64" x2="280" y2="64" stroke="#ffffff" strokeWidth="2.8" />
                    <line x1="274" y1="58" x2="274" y2="70" stroke="#ffffff" strokeWidth="2.8" />
                    <circle cx="318" cy="36" r="10" fill="#059669" />
                    <polyline points="313,36 317,40 324,32" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="212" y="140" width="124" height="36" rx="8" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.3" />
                    <text x="274" y="155" textAnchor="middle" fontSize="15" fontWeight="900" fill="#065f46" fontFamily="Cairo, sans-serif">عزل برمجي آمن</text>
                    <text x="274" y="169" textAnchor="middle" fontSize="14" fontWeight="800" fill="#047857" fontFamily="Inter, sans-serif">No-Jamming ✓</text>
                  </g>
                </svg>
              </div>
            </motion.div>
          ) : (
            /* Dotted Placeholder before Step 4 */
            <div
              style={{
                flex: 1,
                borderRadius: "18px",
                border: "2.5px dashed rgba(4, 120, 87, 0.35)",
                background: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  background: "rgba(4, 120, 87, 0.12)",
                  color: "#047857",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldCheck size={30} />
              </div>
              <div
                style={{ fontSize: "23px", fontWeight: 900, color: "#047857" }}
              >
                المحور 03: العزل البرمجي الآمن
              </div>
              <div
                style={{
                  fontSize: "19.3px",
                  fontWeight: 800,
                  color: "#64748b",
                  textAlign: "center",
                }}
              >
            
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Synthesis Banner (Step 5: Appears to unite all 3 issues with LARGE 17px font) */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "relative",
              zIndex: 10,
              background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
              borderRadius: "14px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#ffffff",
              boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
              border: "2px solid rgba(251, 191, 36, 0.4)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <CheckCircle2 size={22} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
              <span
                style={{
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.45,
                }}
              >
                <strong>خلاصة التأطير العلمي:</strong> توحيد الترقية التشاركية
                (وفر 62.4% في CapEx وترشيد 38.5% في الطاقة) مع شرط العدالة
                المكانية (SFI=0.71) وتقنية العزل البرمجي No-Jamming (دقة 97.5% /
                زمن &lt;30 ثانية) ضمن إطار رياضي وهندسي موحد.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Slide06ResearchProblem;
