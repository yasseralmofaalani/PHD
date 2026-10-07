import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  BookOpen,
  Cpu,
  BarChart3,
  Sparkles,
  Radio,
  ArrowUpRight,
  Eye,
  RotateCcw,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { slideIndexOf } from "../../data/slideOrder";

interface Slide01AgendaProps {
  onGoTo?: (slideIndex: number) => void;
}

interface AgendaTerm {
  abbr: string;
  en: string;
}

interface AgendaItem {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  terms?: AgendaTerm[];
  icon: LucideIcon;
  slideIndex: number;
  pos: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
  };
  accentColor: string;
  glowColor: string;
}

// Slide 01: Presentation Outline & Research Roadmap (High-End GIS & Cellular Defense Aesthetic)
const Slide01Agenda: React.FC<Slide01AgendaProps> = ({ onGoTo }) => {
  // Revealed items count (0 = center only, 1..5 = sequential reveal)
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Symmetrical 5-point radial distribution along orbital plane
  const agendaItems: AgendaItem[] = [
    {
      id: 1,
      num: "01",
      title: "المقدمة وسياق البحث",
      subtitle: "الإشكالية البحثية والدوافع والأهداف",
      icon: Compass,
      slideIndex: 2,
      pos: { x: 50, y: 15 },
      accentColor: "#428177",
      glowColor: "rgba(66, 129, 119, 0.35)",
    },
    {
      id: 2,
      num: "02",
      title: "الدراسات المرجعية والأدبيات",
      subtitle: "تأطير الفجوة البحثية في التخطيط الخلوي",
      icon: BookOpen,
      slideIndex: 10,
      pos: { x: 86, y: 39 },
      accentColor: "#6b1f2a",
      glowColor: "rgba(107, 31, 42, 0.35)",
    },
    {
      id: 3,
      num: "03",
      title: "المساهمات المنهجية والنماذج",
      subtitle: "خوارزميتا سرب الجسيمات الثنائي والجينية التكيفية ومؤشر العدالة المكانية",
      terms: [
        { abbr: "BPSO", en: "Binary Particle Swarm Optimization" },
        { abbr: "AGA", en: "Adaptive Genetic Algorithm" },
        { abbr: "SFI", en: "Spatial Fairness Index" },
      ],
      icon: Cpu,
      slideIndex: slideIndexOf("c-marker"),
      pos: { x: 74, y: 83 },
      accentColor: "#428177",
      glowColor: "rgba(66, 129, 119, 0.35)",
    },
    {
      id: 4,
      num: "04",
      title: "النتائج التجريبية والتقييم",
      subtitle: "التحقق الميداني والإنتاج العلمي المنشور",
      icon: BarChart3,
      slideIndex: slideIndexOf("lab-section-marker"),
      pos: { x: 26, y: 83 },
      accentColor: "#6b1f2a",
      glowColor: "rgba(107, 31, 42, 0.35)",
    },
    {
      id: 5,
      num: "05",
      title: "الخاتمة والآفاق المستقبلية",
      subtitle: "الاستنتاجات البحثية والتوصيات المستقبلية",
      icon: Sparkles,
      slideIndex: slideIndexOf("conclusion-marker"),
      pos: { x: 14, y: 39 },
      accentColor: "#428177",
      glowColor: "rgba(66, 129, 119, 0.35)",
    },
  ];

  const handleStepForward = useCallback(() => {
    if (revealedCount < 5) {
      setRevealedCount((prev) => prev + 1);
    } else if (onGoTo) {
      onGoTo(2); // Next slide
    }
  }, [revealedCount, onGoTo]);

  const handleShowAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedCount(5);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedCount(0);
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
        if (revealedCount < 5) {
          e.preventDefault();
          e.stopPropagation();
          setRevealedCount((prev) => prev + 1);
        }
      } else if (
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp" ||
        e.key === "Backspace"
      ) {
        if (revealedCount > 0) {
          e.preventDefault();
          e.stopPropagation();
          setRevealedCount((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [revealedCount]);

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleStepForward}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        padding: "clamp(12px, 1.8vh, 22px) clamp(20px, 3vw, 44px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        color: "var(--text-dark)",
        fontFamily: "Cairo, sans-serif",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "none" }} />

      {/* Ambient Depth Glows */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(66, 129, 119, 0.09) 0%, rgba(107, 31, 42, 0.04) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* HEADER: Modern Academic Badge & Title */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--card-border)",
          paddingBottom: "clamp(6px, 1vh, 12px)",
          marginBottom: "2px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <div
            style={{
              width: "6px",
              height: "26px",
              background:
                "linear-gradient(to bottom, var(--accent), var(--primary))",
              borderRadius: "3px",
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1
                style={{
                  fontSize: "clamp(24.8px, 2.68vw, 35.4px)",
                  fontWeight: 900,
                  color: "var(--title-color)",
                  margin: 0,
                  letterSpacing: "-0.3px",
                }}
              >
                مخطط العرض وهيكلية الأطروحة
              </h1>
              <span
                style={{
                  fontSize: "clamp(18px, 1.04vw, 22px)",
                  background: "rgba(66, 129, 119, 0.12)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: "12px",
                  border: "1px solid rgba(66, 129, 119, 0.25)",
                }}
              >
                خارطة طريق الأطروحة
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Presenter Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: "20px",
            border: "1px solid var(--card-border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "var(--primary)",
              padding: "2px 6px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CheckCircle2 size={13} color="var(--primary)" />
            <span>{revealedCount} / 5</span>
          </div>

          <button
            onClick={handleShowAll}
            title="إظهار جميع الأقسام"
            style={{
              background:
                revealedCount === 5
                  ? "var(--primary)"
                  : "rgba(66, 129, 119, 0.1)",
              color: revealedCount === 5 ? "#ffffff" : "var(--primary)",
              border: "none",
              borderRadius: "12px",
              padding: "3px 8px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s",
            }}
          >
            <Eye size={12} />
            <span>عرض الكل</span>
          </button>

          {revealedCount > 0 && (
            <button
              onClick={handleReset}
              title="إعادة ضبط العرض"
              style={{
                background: "transparent",
                color: "var(--accent)",
                border: "none",
                borderRadius: "12px",
                padding: "3px 6px",
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <RotateCcw size={11} />
            </button>
          )}
        </div>
      </div>

      {/* MAIN RADIAL STAGE CONTAINER */}
      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      >
        {/* SVG Connecting Tech Beams, Pulses & Orbital Coordinates */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <defs>
            {/* Radial Hub Glow Filter */}
            <filter id="hub-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Linear Gradients for Connectors */}
            <linearGradient
              id="beam-primary"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#428177" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#428177" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="beam-accent"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6b1f2a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6b1f2a" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Primary Elliptical Orbit Track */}
          <ellipse
            cx="50%"
            cy="50%"
            rx="38%"
            ry="35%"
            fill="none"
            stroke="rgba(66, 129, 119, 0.22)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* Outer Fine Telemetry Orbit */}
          <ellipse
            cx="50%"
            cy="50%"
            rx="42.5%"
            ry="39.5%"
            fill="none"
            stroke="rgba(107, 31, 42, 0.14)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />

          {/* Dynamic Connecting Beams to Revealed Nodes */}
          {agendaItems.map((item) => {
            const isRevealed = item.id <= revealedCount;
            if (!isRevealed) return null;
            const isHovered = hoveredId === item.id;

            return (
              <g key={`connector-${item.id}`}>
                {/* Outer Beam Glow */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${item.pos.x}%`}
                  y2={`${item.pos.y}%`}
                  stroke={item.accentColor}
                  strokeWidth={isHovered ? "4" : "1.5"}
                  strokeOpacity={isHovered ? "0.75" : "0.4"}
                  strokeDasharray={isHovered ? "none" : "5 4"}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Central Signal Pulse Marker along beam */}
                <circle
                  cx={`${(50 + item.pos.x) / 2}%`}
                  cy={`${(50 + item.pos.y) / 2}%`}
                  r={isHovered ? "3.5" : "2.5"}
                  fill={item.accentColor}
                  opacity={0.8}
                />

                {/* End Node Anchor */}
                <circle
                  cx={`${item.pos.x}%`}
                  cy={`${item.pos.y}%`}
                  r={isHovered ? "6" : "4.5"}
                  fill="#ffffff"
                  stroke={item.accentColor}
                  strokeWidth="2.5"
                />
              </g>
            );
          })}
        </svg>

        {/* CENTER HUB: GIS Cellular Network Core */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {/* Animated GIS Pulsing Radar Waves */}
          <motion.div
            animate={{
              scale: [1, 1.45, 1.9],
              opacity: [0.6, 0.25, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(230px, 22vw, 300px)",
              height: "clamp(230px, 22vw, 300px)",
              borderRadius: "50%",
              border: "2px solid rgba(66, 129, 119, 0.45)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.25, 1.55],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: 1.1,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(230px, 22vw, 300px)",
              height: "clamp(230px, 22vw, 300px)",
              borderRadius: "50%",
              border: "2px dashed rgba(107, 31, 42, 0.35)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Central Glassmorphic Master Disc */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              width: "clamp(240px, 22.5vw, 310px)",
              height: "clamp(240px, 22.5vw, 310px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 30%, #4d9388 0%, #366d64 50%, #204741 100%)",
              border: "4px solid #ffffff",
              boxShadow:
                "0 16px 40px rgba(32, 71, 65, 0.38), 0 0 0 1px rgba(66, 129, 119, 0.3), inset 0 2px 6px rgba(255, 255, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "clamp(14px, 1.8vw, 24px)",
              boxSizing: "border-box",
              position: "relative",
              color: "#ffffff",
              zIndex: 5,
            }}
          >
            {/* Top GIS Signal Beacon */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              }}
            >
              <Radio size={17} color="#ffd700" />
            </div>

            {/* Thesis Badge */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.18)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.45)",
                padding: "2px 12px",
                borderRadius: "12px",
                fontSize: "clamp(18px, 1.1vw, 22px)",
                fontWeight: 800,
                letterSpacing: "0.4px",
                marginBottom: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              أطروحة الدكتوراه
            </div>

            {/* Thesis Core Title */}
            <h2
              style={{
                fontSize: "clamp(18px, 1.59vw, 22px)",
                fontWeight: 900,
                lineHeight: 1.4,
                color: "#ffffff",
                margin: 0,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              التخطيط والتحكم الذكي 
              <br />
              بالشبكة الخليوية
              <br />
              <span
                style={{
                  color: "#ffd700",
                  fontWeight: 900,
                  display: "inline-block",
                  marginTop: "2px",
                }}
              >
                في بيئة نظم المعلومات الجغرافية (GIS)
              </span>
            </h2>
          </motion.div>
        </div>

        {/* 5 RADIAL AGENDA NODES */}
        {agendaItems.map((item) => {
          const isRevealed = item.id <= revealedCount;
          const isHovered = hoveredId === item.id;
          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: `${item.pos.y}%`,
                left: `${item.pos.x}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isRevealed ? 20 : 0,
                pointerEvents: isRevealed ? "auto" : "none",
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (item.id > revealedCount) {
                  setRevealedCount(item.id);
                } else if (onGoTo) {
                  onGoTo(item.slideIndex);
                }
              }}
            >
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 15 }}
                    animate={{ scale: isHovered ? 1.05 : 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                    style={{
                      width: item.terms
                        ? "clamp(300px, 26vw, 390px)"
                        : "clamp(280px, 23.5vw, 360px)",
                      background: isHovered
                        ? "#ffffff"
                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 243, 0.95) 100%)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "18px",
                      padding:
                        "clamp(12px, 1.4vh, 16px) clamp(14px, 1.4vw, 20px)",
                      border: `2px solid ${isHovered ? item.accentColor : "rgba(66, 129, 119, 0.22)"}`,
                      boxShadow: isHovered
                        ? `0 16px 36px ${item.glowColor}, 0 4px 14px rgba(0,0,0,0.08)`
                        : `0 8px 24px rgba(0,0,0,0.06)`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: item.terms ? "flex-start" : "center",
                      gap: "14px",
                      position: "relative",
                      overflow: "hidden",
                      transition:
                        "border 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                    }}
                  >
                    {/* Top Accent Strip */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        height: "3.5px",
                        background: item.accentColor,
                        opacity: isHovered ? 1 : 0.75,
                      }}
                    />

                    {/* Item Icon Box */}
                    <div
                      style={{
                        width: "clamp(44px, 3.6vw, 52px)",
                        height: "clamp(44px, 3.6vw, 52px)",
                        borderRadius: "14px",
                        background: isHovered
                          ? item.accentColor
                          : `linear-gradient(135deg, ${item.accentColor} 0%, rgba(0,0,0,0.85) 100%)`,
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 4px 12px ${item.glowColor}`,
                        transition:
                          "transform 0.25s ease, background 0.25s ease",
                        transform: isHovered ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      <IconComponent size={24} color="#ffffff" />
                    </div>

                    {/* Content: Number, Title & Subtitle */}
                    <div style={{ flex: 1, textAlign: "right", minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "3px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "clamp(18px, 1.04vw, 22px)",
                            color: item.accentColor,
                            fontWeight: 900,
                            letterSpacing: "0.6px",
                          }}
                        >
                          المحور {item.num}
                        </span>
                        {isHovered && (
                          <ArrowUpRight
                            size={16}
                            color={item.accentColor}
                            style={{ opacity: 0.9 }}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: "clamp(19.3px, 1.4vw, 22px)",
                          color: "var(--text-dark)",
                          fontWeight: 800,
                          lineHeight: 1.35,
                          marginBottom: "4px",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          fontSize: "clamp(18px, 1.1vw, 22px)",
                          color: "rgba(40, 45, 45, 0.85)",
                          fontWeight: 600,
                          lineHeight: 1.4,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.subtitle}
                      </div>

                      {item.terms && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "3px",
                            marginTop: "7px",
                            direction: "ltr",
                            textAlign: "left",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {item.terms.map((term) => (
                            <div
                              key={term.abbr}
                              style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: "7px",
                                lineHeight: 1.25,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 800,
                                  color: "#ffffff",
                                  background: item.accentColor,
                                  borderRadius: "5px",
                                  padding: "1px 6px",
                                  flexShrink: 0,
                                  letterSpacing: "0.3px",
                                }}
                              >
                                {term.abbr}
                              </span>
                              <span
                                style={{
                                  fontSize: "11.5px",
                                  fontWeight: 600,
                                  color: "rgba(40, 45, 45, 0.72)",
                                }}
                              >
                                {term.en}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide01Agenda;
