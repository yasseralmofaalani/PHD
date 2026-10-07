import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MotivationNode {
  id: number;
  stepNum: string;
  angle: number; // Angle in degrees around the circle (0 = top, 72, 144, 216, 288)
  title: string;
  subtitle: string;
  accentColor: string;
  glowColor: string;
  icon: string;
  badge: string;
  points: string[];
  impact: string;
}

const Slide03WhyNow: React.FC = () => {
  // Active step revealed (1 to 5)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const motivationNodes: MotivationNode[] = [
    {
      id: 1,
      stepNum: "01",
      angle: -90, // Top
      title: "التحول المعياري نحو الجيل الخامس المتقدم 5G-Advanced",
      subtitle: "مواصفات 3GPP Rel-18",
      accentColor: "#428177",
      glowColor: "rgba(66, 129, 119, 0.35)",
      icon: "🌐",
      badge: "معيار Rel-18",
      points: [
        "تقليل زمن الاستجابة مع الحفاظ على موثوقية الاتصال",
        "دعم أعداد كبيرة من أجهزة إنترنت الأشياء",
        "تحسين استخدام الطيف والطاقة في ظروف الشبكة المعقدة",
      ],
      impact:
        "مواءمة النموذج المقترح مع أحدث المعايير الدولية لشبكات الجيل الخامس المتقدم.",
    },
    {
      id: 2,
      stepNum: "02",
      angle: -18, // Top-Right
      title: "التعقيد الحسابي والنمذجة الرياضية الهجينة",
      subtitle: "التحسين متعدد الأهداف",
      accentColor: "#6b1f2a",
      glowColor: "rgba(107, 31, 42, 0.35)",
      icon: "🧠",
      badge: "مسائل NP-Hard",
      points: [
        "بناء نموذج رياضي غير خطي يراعي عدة قيود ومعايير",
        "تطوير خوارزمية هجينة تجمع بين BPSO وAGA للتعامل مع قيود المشكلة",
        "تطوير آلية لإصلاح الحلول غير المستوفية للقيود وضمان صلاحيتها",
      ],
      impact:
        "تقليل زمن الوصول إلى الحل وتحسين قدرة النموذج على إنتاج حلول مجدية رياضيًا.",
    },
    {
      id: 3,
      stepNum: "03",
      angle: 54, // Bottom-Right
      title: "طوبولوجيا الشبكة الخلوية في البيئة السورية",
      subtitle: "دراسة تطبيقية واسعة النطاق",
      accentColor: "#428177",
      glowColor: "rgba(66, 129, 119, 0.35)",
      icon: "🗺️",
      badge: "النمذجة المكانية GIS",
      points: [
        "بناء نموذج طبوغرافي ومكاني دقيق بالاعتماد على نظم المعلومات الجغرافية",
        "صياغة مؤشر العدالة المكانية (SFI) لضمان التوزيع المتوازن للتغطية",
        "ردم الفجوة الرقمية بين الكثافات الحضرية والمناطق الريفية",
      ],
      impact:
        "معايرة مخرجات التخطيط بالاعتماد على بيانات حقيقية تضم 79,268 موقعاً.",
    },
    {
      id: 4,
      stepNum: "04",
      angle: 126, // Bottom-Left
      title: "الجدوى الاقتصادية والترقية الخليوية",
      subtitle: "استثمار البنية التحتية القائمة ",
      accentColor: "#6b1f2a",
      glowColor: "rgba(107, 31, 42, 0.35)",
      icon: "⚡",
      badge: "معمارية 5G NSA",
      points: [
        "الترقية المرحلية لمواقع (2G/3G/4G) الحالية وتجنب البناء من الصفر",
        "خفض تكاليف الاستثمار والنفقات التشغيلية",
        "اعتماد استراتيجية انتقال تدريجي إلى تقنيات أحدث بأقل تكلفة ممكنة.",
      ],
      impact:
        "خفض تكاليف الاستثمار  مع تعظيم المساحة المغطاة.",
    },
    {
      id: 5,
      stepNum: "05",
      angle: 198, // Top-Left
      title: "الإدارة الطيفية الديناميكية والعزل البرمجي",
      subtitle: "التحكم الآمن في النطاقات الترددية",
      accentColor: "#428177",
      glowColor: "rgba(66, 129, 119, 0.35)",
      icon: "🛡️",
      badge: "بديل التشويش (No-Jamming)",
      points: [
        "عزل برمجي مؤتمت للنطاقات الترددية المستهدفة في الطوارئ",
        "صون اتصالات السلامة العامة وقنوات الطوارئ الحيوية",
        "استبدال التشويش العشوائي بنظام تحكم برمجي مركزي",
      ],
      impact:
        "تحقيق دقة عزل مكاني 97.5% مع استعادة الخدمة في زمن قياسي يقل عن 30 ثانية.",
    },
  ];

  const handleNext = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev < 5 ? prev + 1 : 5;
      setSelectedNodeId(next);
      return next;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveStep((prev) => {
      const p = prev > 1 ? prev - 1 : 1;
      setSelectedNodeId(p);
      return p;
    });
  }, []);

  const handleSelectNode = (id: number) => {
    setSelectedNodeId(id);
    if (id > activeStep) {
      setActiveStep(id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.querySelector(".modal-overlay")) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (
        e.key === " " ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === "Enter" ||
        e.key === "PageDown"
      ) {
        if (activeStep < 5) {
          e.preventDefault();
          e.stopPropagation();
          handleNext();
        }
      } else if (
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp" ||
        e.key === "Backspace"
      ) {
        if (activeStep > 1) {
          e.preventDefault();
          e.stopPropagation();
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [activeStep, handleNext, handlePrev]);

  // Autoplay handler
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 5) {
          setIsAutoPlaying(false);
          return 5;
        }
        const next = prev + 1;
        setSelectedNodeId(next);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const activeNode =
    motivationNodes.find((n) => n.id === selectedNodeId) || motivationNodes[0];

  return (
    <div
      className="slide"
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(16px, 2.2vh, 24px) clamp(28px, 3.2vw, 48px)",
        boxSizing: "border-box",
        background: "transparent",
        color: "var(--text-dark)",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      <div style={{ display: "none" }} />

      {/* Slide Header: Clean, Elegant, High-Impact */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          marginTop: "2px",
          marginBottom: "6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "6px",
              height: "32px",
              borderRadius: "4px",
              background:
                "linear-gradient(180deg, var(--accent) 0%, var(--primary) 100%)",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(35.4px, 3.9vw, 47px)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.15,
              color: "var(--title-color)",
              fontFamily: "Cairo, sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            دوافع البحث
          </h1>
        </div>

        {/* Minimal Progress Indicator & Step Indicators */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "var(--card-bg)",
            padding: "6px 16px",
            borderRadius: "30px",
            border: "1px solid var(--card-border)",
          }}
        >
          {/* Circular Step Bullets */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {motivationNodes.map((node) => {
              const isPassed = node.id <= activeStep;
              const isCurrent = node.id === selectedNodeId;

              return (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(node.id)}
                  title={`المحور ${node.stepNum}: ${node.subtitle}`}
                  style={{
                    width: isCurrent ? "26px" : "10px",
                    height: "10px",
                    borderRadius: "5px",
                    background: isCurrent
                      ? "var(--primary)"
                      : isPassed
                        ? "rgba(56, 115, 102, 0.4)"
                        : "rgba(0, 0, 0, 0.12)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    padding: 0,
                  }}
                />
              );
            })}
          </div>

          <span
            style={{
              fontSize: "19px",
              fontWeight: 800,
              color: "var(--text-dark)",
              borderRight: "1px solid rgba(0,0,0,0.15)",
              paddingRight: "10px",
              marginRight: "4px",
            }}
          >
            {activeStep} / 5
          </span>
        </div>
      </div>

      {/* Main Interactive Radial Presentation Arena */}
      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(320px, 44%) minmax(360px, 56%)",
          gap: "clamp(16px, 2.5vw, 36px)",
          alignItems: "center",
          margin: "6px 0",
          zIndex: 5,
        }}
      >
        {/* RIGHT COLUMN: The Circular Hub & Orbit System */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "460px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Radial Geometry SVG (Connecting lines, Orbits, Glows) */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            viewBox="0 0 500 500"
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.15"
                />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central Glow Field */}
            <circle cx="250" cy="250" r="175" fill="url(#hubGlow)" />

            {/* Outer Orbit Track */}
            <circle
              cx="250"
              cy="250"
              r="195"
              fill="none"
              stroke="rgba(56, 115, 102, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Inner Rotating-like Orbit Ring */}
            <circle
              cx="250"
              cy="250"
              r="138"
              fill="none"
              stroke="rgba(107, 31, 42, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />

            {/* Dynamic Laser Lines from Hub to Nodes */}
            {motivationNodes.map((node) => {
              const isRevealed = node.id <= activeStep;
              const isSelected = node.id === selectedNodeId;
              const rad = (node.angle * Math.PI) / 180;
              const radius = 195;
              const nx = 250 + radius * Math.cos(rad);
              const ny = 250 + radius * Math.sin(rad);

              if (!isRevealed) return null;

              return (
                <g key={node.id}>
                  <line
                    x1="250"
                    y1="250"
                    x2={nx}
                    y2={ny}
                    stroke={node.accentColor}
                    strokeWidth={isSelected ? 3 : 1.5}
                    strokeDasharray={isSelected ? "none" : "4 4"}
                    opacity={isSelected ? 0.9 : 0.4}
                  />
                  {/* Energy Dot */}
                  <circle
                    cx={(250 + nx) / 2}
                    cy={(250 + ny) / 2}
                    r={isSelected ? 4.5 : 2.8}
                    fill={node.accentColor}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Nucleus Hub */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={handleNext}
            style={{
              position: "relative",
              zIndex: 10,
              width: "clamp(196px, 20.5vw, 250px)",
              height: "clamp(196px, 20.5vw, 250px)",
              borderRadius: "50%",
              background: "var(--primary)",
              border: "4px solid #ffffff",
              boxShadow: "0 10px 30px rgba(56, 115, 102, 0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: "pointer",
              padding: "16px",
              boxSizing: "border-box",
              userSelect: "none",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                fontSize: "clamp(33.6px, 3.29vw, 42.5px)",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              🔬
            </div>
            <div
              style={{
                fontSize: "clamp(21.1px, 1.89vw, 26px)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.2px",
              }}
            >
              دوافع الأطروحة
            </div>
            <div
              style={{
                fontSize: "clamp(18px, 1.28vw, 22px)",
                fontWeight: 800,
                color: "rgba(255, 255, 255, 0.92)",
                marginTop: "4px",
              }}
            >
              5 محاور تكاملية
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "19px",
                fontWeight: 900,
                background: "rgba(255, 255, 255, 0.25)",
                color: "#ffffff",
                padding: "3px 12px",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {activeStep < 5 ? "التالي ➔" : "مكتمل ✓"}
            </div>
          </motion.div>

          {/* 5 Circular Orbit Nodes */}
          {motivationNodes.map((node) => {
            const isRevealed = node.id <= activeStep;
            const isSelected = node.id === selectedNodeId;

            const rad = (node.angle * Math.PI) / 180;
              const radiusPercent = 40;
            const leftPercent = 50 + radiusPercent * Math.cos(rad);
            const topPercent = 50 + radiusPercent * Math.sin(rad);

            return (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isSelected ? 20 : isRevealed ? 12 : 3,
                }}
              >
                <AnimatePresence>
                  {isRevealed ? (
                    <motion.button
                      initial={{ scale: 0, opacity: 0, rotate: -30 }}
                      animate={{
                        scale: isSelected ? 1.15 : 1,
                        opacity: 1,
                        rotate: 0,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                      onClick={() => handleSelectNode(node.id)}
                      style={{
                        width: "clamp(140px, 14vw, 178px)",
                        height: "clamp(140px, 14vw, 178px)",
                        borderRadius: "50%",
                        background: isSelected ? "#ffffff" : "var(--card-bg)",
                        border: `3.5px solid ${node.accentColor}`,
                        boxShadow: isSelected
                          ? `0 10px 28px rgba(56, 115, 102, 0.35)`
                          : `0 4px 14px rgba(0,0,0,0.08)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: "10px 12px",
                        color: "var(--text-dark)",
                        position: "relative",
                      }}
                    >
                      {/* Step Pill */}
                      <span
                        style={{
                          position: "absolute",
                          top: "-6px",
                          background: node.accentColor,
                          color: "#ffffff",
                          fontSize: "19px",
                          fontWeight: 900,
                          padding: "2px 9px",
                          borderRadius: "12px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                        }}
                      >
                        {node.stepNum}
                      </span>

                      <span
                        style={{
                          fontSize: "clamp(24.8px, 2.44vw, 31.2px)",
                          lineHeight: 1,
                          marginTop: "2px",
                        }}
                      >
                        {node.icon}
                      </span>

                      <span
                        style={{
                          fontSize: "clamp(18px, 1.16vw, 22px)",
                          fontWeight: 900,
                          color: "var(--text-dark)",
                          textAlign: "center",
                          lineHeight: 1.25,
                          marginTop: "3px",
                          maxWidth: "92%",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          fontFamily: "Cairo, sans-serif",
                        }}
                      >
                        {node.subtitle}
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.4 }}
                      style={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        background: "var(--card-bg)",
                        border: "2px dashed rgba(0,0,0,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "19.3px",
                        fontWeight: 900,
                        color: "var(--text-muted)",
                      }}
                    >
                      {node.stepNum}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* LEFT COLUMN: Detail Card for Active/Selected Node */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: -25, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 25, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                background: "var(--card-bg)",
                borderRadius: "20px",
                padding: "clamp(18px, 2.2vh, 26px) clamp(20px, 2.2vw, 28px)",
                border: `2px solid ${activeNode.accentColor}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Header with Step Badge & Category */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    style={{
                      background: activeNode.accentColor,
                      color: "#ffffff",
                      fontWeight: 900,
                      fontSize: "19px",
                      padding: "3px 12px",
                      borderRadius: "16px",
                    }}
                  >
                    المحور {activeNode.stepNum}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.22vw, 22px)",
                      fontWeight: 800,
                      color: activeNode.accentColor,
                    }}
                  >
                    {activeNode.badge}
                  </span>
                </div>

                <span style={{ fontSize: "33.6px" }}>{activeNode.icon}</span>
              </div>

              {/* Title */}
              <div>
                <h2
                  style={{
                    fontSize: "clamp(24.8px, 2.2vw, 31.2px)",
                    fontWeight: 900,
                    margin: "0 0 4px 0",
                    lineHeight: 1.25,
                    color: "var(--title-color)",
                  }}
                >
                  {activeNode.title}
                </h2>
                <div
                  style={{
                    fontSize: "clamp(18px, 1.28vw, 22px)",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                  }}
                >
                  {activeNode.subtitle}
                </div>
              </div>

              {/* Key Scientific Points */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  background: "#ffffff",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  border: "1px solid var(--card-border)",
                }}
              >
                {activeNode.points.map((pt, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: activeNode.accentColor,
                        fontWeight: 900,
                        fontSize: "21.1px",
                        lineHeight: 1.2,
                      }}
                    >
                      ◆
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(18px, 1.28vw, 22px)",
                        fontWeight: 700,
                        color: "var(--text-dark)",
                        lineHeight: 1.35,
                      }}
                    >
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* Academic Impact Highlight */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: `1px solid ${activeNode.accentColor}55`,
                  borderRadius: "14px",
                  padding: "10px 16px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    background: activeNode.accentColor,
                    color: "#ffffff",
                    padding: "2px 8px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  الأثر العلمي
                </span>
                <span
                  style={{
                    fontSize: "clamp(18px, 1.16vw, 22px)",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                    lineHeight: 1.3,
                  }}
                >
                  {activeNode.impact}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Punchy Synthesis Summary Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          background: "var(--card-bg)",
          borderRadius: "12px",
          padding: "8px 20px",
          border: "1px solid var(--card-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "18px",
              padding: "2px 10px",
              borderRadius: "10px",
            }}
          >
            الخلاصة المنهجية
          </span>
          <span
            style={{
              fontSize: "clamp(18px, 1.22vw, 22px)",
              fontWeight: 800,
              color: "var(--text-dark)",
            }}
          >
            تكامل الصياغة الرياضية متعددة الأهداف مع النمذجة الجغرافية لتوجيه مسار الترقية الخليوية
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => setActiveStep(5)}
            style={{
              background:
                activeStep === 5 ? "var(--primary)" : "rgba(0, 0, 0, 0.05)",
              color: activeStep === 5 ? "#ffffff" : "var(--text-muted)",
              border: "1px solid var(--card-border)",
              borderRadius: "8px",
              padding: "3px 12px",
              fontSize: "18px",
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "Cairo",
            }}
          >
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide03WhyNow;
