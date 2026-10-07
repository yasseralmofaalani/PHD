import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, User, GraduationCap } from "lucide-react";
import { assetUrl } from "../../lib/assets";
import { SYRIA_OUTLINE } from "./contributions/kit";

// Mathematically & geographically accurate Syrian Governorates in 1000x520 canvas
// Strictly official Governorates of Syria (محافظات الجمهورية العربية السورية)
const SYRIA_NODES = [
  { id: "damascus", name: "دمشق", type: "core", x: 286, y: 395 },
  { id: "daraa", name: "درعا", type: "relay", x: 272, y: 475 },
  { id: "suwayda", name: "السويداء", type: "relay", x: 306, y: 467 },
  { id: "quneitra", name: "القنيطرة", type: "edge", x: 250, y: 429 },
  { id: "homs", name: "حمص", type: "hub", x: 318, y: 283 },
  { id: "hama", name: "حماة", type: "relay", x: 321, y: 247 },
  { id: "idlib", name: "إدلب", type: "relay", x: 312, y: 173 },
  { id: "aleppo", name: "حلب", type: "hub", x: 351, y: 147 },
  { id: "latakia", name: "اللاذقية", type: "hub", x: 252, y: 210 },
  { id: "tartus", name: "طرطوس", type: "relay", x: 259, y: 268 },
  { id: "raqqa", name: "الرقة", type: "relay", x: 491, y: 170 },
  { id: "deir", name: "دير الزور", type: "hub", x: 576, y: 228 },
  { id: "hasakah", name: "الحسكة", type: "hub", x: 622, y: 119 },
];

// Topological cellular & transmission backbone links between Syrian governorates
const SYRIA_LINKS = [
  { from: "damascus", to: "daraa" },
  { from: "damascus", to: "suwayda" },
  { from: "damascus", to: "quneitra" },
  { from: "damascus", to: "homs" },
  { from: "homs", to: "tartus" },
  { from: "tartus", to: "latakia" },
  { from: "latakia", to: "idlib" },
  { from: "idlib", to: "aleppo" },
  { from: "homs", to: "hama" },
  { from: "hama", to: "aleppo" },
  { from: "aleppo", to: "raqqa" },
  { from: "homs", to: "deir" },
  { from: "raqqa", to: "deir" },
  { from: "raqqa", to: "hasakah" },
  { from: "deir", to: "hasakah" },
];

// Animated data pulses traveling between regional hubs
const DATA_PULSES = [
  { from: "damascus", to: "homs", duration: 3.2, delay: 0 },
  { from: "homs", to: "aleppo", duration: 3.5, delay: 1.0 },
  { from: "homs", to: "deir", duration: 4.2, delay: 0.5 },
  { from: "deir", to: "hasakah", duration: 3.4, delay: 1.5 },
  { from: "damascus", to: "daraa", duration: 2.8, delay: 1.2 },
  { from: "homs", to: "latakia", duration: 3.0, delay: 0.8 },
  { from: "aleppo", to: "raqqa", duration: 3.6, delay: 1.6 },
  { from: "raqqa", to: "hasakah", duration: 3.8, delay: 2.2 },
  { from: "tartus", to: "latakia", duration: 2.5, delay: 1.8 },
  { from: "damascus", to: "quneitra", duration: 2.6, delay: 2.0 },
];

// Hexagonal cellular cluster centers for decorative background animation
const CELLULAR_HEXAGONS = [
  { cx: 275, cy: 380, r: 24 },
  { cx: 300, cy: 400, r: 24 },
  { cx: 275, cy: 415, r: 24 },
  { cx: 335, cy: 135, r: 22 },
  { cx: 365, cy: 155, r: 22 },
  { cx: 305, cy: 270, r: 20 },
  { cx: 330, cy: 290, r: 20 },
];

const glassCard: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.94)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: "16px",
  border: "1.5px solid rgba(255, 255, 255, 0.95)",
  boxShadow:
    "0 10px 28px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(66, 129, 119, 0.16)",
  boxSizing: "border-box",
};

const Slide00Cover: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="slide cover-slide-root"
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "clamp(8px, 1.1vh, 12px) clamp(10px, 1.3vw, 16px)",
        boxSizing: "border-box",
        color: "#0f172a",
        fontFamily: "Cairo, sans-serif",
        background: "transparent",
      }}
    >
      <div style={{ display: "none" }} />

      {/* ============================================================
          1. TOP INSTITUTIONAL HEADER BAR
          ============================================================ */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexShrink: 0,
          background: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "14px",
          padding: "7px 16px",
          border: "1.5px solid rgba(66, 129, 119, 0.22)",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Right side: Country & Institute Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <div
            style={{
              fontSize: "clamp(13px, 1.15vw, 16px)",
              color: "#428177",
              fontWeight: 800,
              letterSpacing: "0.4px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: "#6b1f2a", fontSize: "11px" }}>●</span>
            <span>الجمهورية العربية السورية</span>
          </div>
          <div
            style={{
              fontSize: "clamp(16px, 1.55vw, 21px)",
              color: "#0f172a",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>المعهد العالي للعلوم التطبيقية والتكنولوجيا</span>
            <span style={{ color: "#428177", fontSize: "13px" }}>◆</span>
            <span
              style={{
                fontSize: "clamp(15px, 1.35vw, 18px)",
                color: "#6b1f2a",
                fontWeight: 800,
              }}
            >
              قسم المعلوماتية
            </span>
          </div>
        </div>

        {/* Left side: Degree Badge & HIAST Logo Emblem */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              background: "linear-gradient(135deg, #6b1f2a 0%, #8c2634 100%)",
              color: "#ffffff",
              padding: "6px 16px",
              borderRadius: "30px",
              fontSize: "clamp(14px, 1.2vw, 17px)",
              fontWeight: 800,
              letterSpacing: "0.3px",
              border: "1px solid rgba(255, 215, 0, 0.45)",
              boxShadow: "0 4px 14px rgba(107, 31, 42, 0.22)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "16px" }}>🎓</span>
            <span>أطروحة دكتوراه في الهندسة المعلوماتية</span>
          </motion.div>

          <div
            style={{
              background: "#ffffff",
              padding: "4px 10px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              border: "1.5px solid rgba(66, 129, 119, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={assetUrl("hiast-logo.png")}
              alt="HIAST"
              style={{
                height: "clamp(34px, 3.2vw, 42px)",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      </motion.header>

      {/* ============================================================
          2. UNIFIED MAIN CANVAS — height-filling grid
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.25fr)",
          gap: "10px",
          padding: "10px",
          borderRadius: "18px",
          background: "#ffffff",
          border: "1.5px solid rgba(66, 129, 119, 0.22)",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* RIGHT (RTL start): Title on top, academic dossier at the bottom */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: 0,
            minHeight: 0,
            height: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
            style={{
              ...glassCard,
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(12px, 1.6vh, 18px) clamp(12px, 1.3vw, 18px)",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(30px, 3.2vw, 46px)",
                fontWeight: 900,
                lineHeight: 1.38,
                overflow: "visible",
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              التخطيط والتحكم الذكي بالشبكة الخليوية
            </h1>
            <div
              style={{
                fontSize: "clamp(22px, 2.4vw, 34px)",
                color: "#428177",
                fontWeight: 900,
                marginTop: "4px",
                lineHeight: 1.38,
                overflow: "visible",
              }}
            >
              في بيئة نظم المعلومات الجغرافية
            </div>
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 22px)",
                color: "#64748b",
                fontFamily: "Inter, sans-serif",
                fontStyle: "italic",
                fontWeight: 600,
                margin: "8px 0 0 0",
                direction: "ltr",
                lineHeight: 1.3,
              }}
            >
              Intelligent Planning and Control of Cellular Networks in a GIS
              Environment
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            style={{
              ...glassCard,
              flex: "1 1 0",
              minWidth: 0,
              minHeight: 0,
              marginTop: "auto",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                background: "rgba(66, 129, 119, 0.09)",
                border: "1.5px solid rgba(66, 129, 119, 0.28)",
                borderRadius: "14px",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(16px, 1.5vw, 21px)",
                  color: "#428177",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <User size={20} />
                <span>إعداد</span>
              </div>
              <div
                style={{
                  fontSize: "clamp(24px, 2.3vw, 34px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  letterSpacing: "-0.2px",
                  lineHeight: 1.25,
                  whiteSpace: "nowrap",
                }}
              >
                ياسر المفعلاني
              </div>
            </div>

            <div
              style={{
                flex: 1.15,
                minHeight: 0,
                background: "rgba(107, 31, 42, 0.06)",
                border: "1.5px solid rgba(107, 31, 42, 0.24)",
                borderRadius: "14px",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(16px, 1.5vw, 21px)",
                  color: "#6b1f2a",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <GraduationCap size={20} />
                <span>إشراف</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "1.2px solid rgba(107, 31, 42, 0.2)",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    fontSize: "clamp(18px, 1.8vw, 26px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  د. مصطفى دقاق
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "1.2px solid rgba(107, 31, 42, 0.2)",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    fontSize: "clamp(18px, 1.8vw, 26px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  د. كادان الجمعة
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                background: "rgba(255, 255, 255, 0.8)",
                border: "1.5px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "14px",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(16px, 1.5vw, 21px)",
                  color: "#64748b",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MapPin size={20} />
                <span>المكان والتاريخ</span>
              </div>
              <div
                style={{
                  fontSize: "clamp(18px, 1.8vw, 26px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  lineHeight: 1.2,
                }}
              >
                دمشق — 2026 م
              </div>
            </div>
          </motion.div>
        </div>

        {/* LEFT: Syria network fills the remaining side */}
        <div
          style={{
            position: "relative",
            minWidth: 0,
            minHeight: 0,
            height: "100%",
          }}
        >
          <svg
            viewBox="200 12 575 500"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            <defs>
              <filter id="hubGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <pattern
                id="cellHexPattern"
                width="36"
                height="62.35"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M18 0 L36 10.39 L36 31.18 L18 41.57 L0 31.18 L0 10.39 Z M18 62.35 L36 51.96 L36 31.18 L18 41.57 L0 31.18 L0 51.96 Z"
                  fill="none"
                  stroke="rgba(66, 129, 119, 0.09)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <path
              d={SYRIA_OUTLINE}
              fill="rgba(66, 129, 119, 0.03)"
              stroke="rgba(66, 129, 119, 0.22)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d={SYRIA_OUTLINE}
              fill="url(#cellHexPattern)"
              opacity={0.6}
            />

            {!shouldReduceMotion &&
              CELLULAR_HEXAGONS.map((hex, i) => (
                <motion.polygon
                  key={`hex-${i}`}
                  points={`${hex.cx},${hex.cy - hex.r} ${hex.cx + hex.r * 0.866},${hex.cy - hex.r * 0.5} ${hex.cx + hex.r * 0.866},${hex.cy + hex.r * 0.5} ${hex.cx},${hex.cy + hex.r} ${hex.cx - hex.r * 0.866},${hex.cy + hex.r * 0.5} ${hex.cx - hex.r * 0.866},${hex.cy - hex.r * 0.5}`}
                  fill="rgba(66, 129, 119, 0.04)"
                  stroke="rgba(66, 129, 119, 0.28)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.96, 1.04, 0.96],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transformOrigin: `${hex.cx}px ${hex.cy}px`,
                  }}
                />
              ))}

            {SYRIA_LINKS.map((link, idx) => {
              const fromNode = SYRIA_NODES.find((n) => n.id === link.from);
              const toNode = SYRIA_NODES.find((n) => n.id === link.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={`link-${idx}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="rgba(66, 129, 119, 0.2)"
                    strokeWidth="3.5"
                  />
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={idx % 2 === 0 ? "#428177" : "#6b1f2a"}
                    strokeWidth="1.6"
                    strokeDasharray={idx % 3 === 0 ? "5 3" : "none"}
                    opacity="0.75"
                  />
                </g>
              );
            })}

            {!shouldReduceMotion &&
              DATA_PULSES.map((pulse, idx) => {
                const fromNode = SYRIA_NODES.find((n) => n.id === pulse.from);
                const toNode = SYRIA_NODES.find((n) => n.id === pulse.to);
                if (!fromNode || !toNode) return null;

                return (
                  <motion.circle
                    key={`pulse-${idx}`}
                    r="4.2"
                    fill={
                      idx % 3 === 0
                        ? "#ffd700"
                        : idx % 2 === 0
                          ? "#428177"
                          : "#6b1f2a"
                    }
                    filter="url(#hubGlow)"
                    animate={{
                      cx: [fromNode.x, toNode.x],
                      cy: [fromNode.y, toNode.y],
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: pulse.duration,
                      repeat: Infinity,
                      delay: pulse.delay,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}

            {SYRIA_NODES.map((node, idx) => {
              const isCore = node.type === "core";
              const isHub = node.type === "hub";

              return (
                <g key={node.id}>
                  {!shouldReduceMotion && (isCore || isHub) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCore ? "15" : "11"}
                      fill="none"
                      stroke={isCore ? "#6b1f2a" : "#428177"}
                      strokeWidth="1.2"
                      className={`network-signal-ring ${
                        idx % 2 === 0
                          ? "network-signal-ring-delay-1"
                          : "network-signal-ring-delay-2"
                      }`}
                      opacity="0.6"
                    />
                  )}

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCore ? "8" : isHub ? "6" : "4.5"}
                    fill={isCore ? "#6b1f2a" : isHub ? "#428177" : "#ffffff"}
                    stroke={isCore ? "#ffd700" : isHub ? "#ffffff" : "#428177"}
                    strokeWidth={isCore ? "2.2" : "1.6"}
                    filter="drop-shadow(0 2px 5px rgba(0,0,0,0.15))"
                  />

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCore ? "2.5" : "1.5"}
                    fill="#ffffff"
                  />

                  <g
                    transform={`translate(${node.x}, ${
                      node.y +
                      (node.id === "aleppo" ||
                      node.id === "hasakah" ||
                      node.id === "idlib"
                        ? -20
                        : 22)
                    })`}
                  >
                    <rect
                      x="-42"
                      y="-11"
                      width="84"
                      height="22"
                      rx="6"
                      fill="rgba(255, 255, 255, 0.95)"
                      stroke="rgba(66, 129, 119, 0.3)"
                      strokeWidth="0.8"
                    />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fill={isCore ? "#6b1f2a" : "#0f172a"}
                      fontSize="13.5"
                      fontWeight={isCore ? "900" : "800"}
                      fontFamily="Cairo, sans-serif"
                    >
                      {node.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </motion.div>
    </div>
  );
};


export default Slide00Cover;
