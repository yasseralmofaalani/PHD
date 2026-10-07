import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const TEAL = "#428177";
const TEAL_DEEP = "#2f5f58";
const MAROON = "#6b1f2a";
const INK = "#0f172a";
const PAPER = "#f4f6f5";

export const SlideS5_13_ClosingSlide: React.FC = () => {
  const reduce = useReducedMotion();

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
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        background: `linear-gradient(160deg, ${PAPER} 0%, #e8efec 42%, #e4ebe8 100%)`,
      }}
    >
      {/* Atmospheric washes */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: `
            radial-gradient(ellipse 55% 50% at 18% 22%, ${TEAL}22 0%, transparent 58%),
            radial-gradient(ellipse 50% 45% at 86% 78%, ${MAROON}18 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 50% 50%, ${TEAL}10 0%, transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Soft diagonal light band */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          width: "140%",
          height: 180,
          top: "38%",
          left: "-20%",
          transform: "rotate(-8deg)",
          background: `linear-gradient(90deg, transparent, ${TEAL}12, ${MAROON}10, transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Decorative corner arcs */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          top: -40,
          insetInlineStart: -40,
          width: 280,
          height: 280,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <circle cx="100" cy="100" r="86" fill="none" stroke={TEAL} strokeWidth="1.2" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="64" fill="none" stroke={MAROON} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          bottom: -50,
          insetInlineEnd: -50,
          width: 300,
          height: 300,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke={MAROON} strokeWidth="1.2" strokeDasharray="3 10" />
        <circle cx="100" cy="100" r="68" fill="none" stroke={TEAL} strokeWidth="1" opacity="0.55" />
      </svg>

      {/* Main composition */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 clamp(24px, 5vw, 64px)",
          maxWidth: 980,
          width: "100%",
        }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 72,
            height: 4,
            borderRadius: 99,
            background: `linear-gradient(90deg, ${MAROON}, ${TEAL})`,
            marginBottom: 28,
            transformOrigin: "center",
          }}
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            margin: 0,
            fontSize: "clamp(16px, 1.35vw, 19px)",
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: TEAL_DEEP,
          }}
        >
          ختام المناقشة
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: "14px 0 0",
            fontSize: "clamp(48px, 6.4vw, 92px)",
            fontWeight: 900,
            color: INK,
            lineHeight: 1.2,
            letterSpacing: "-0.8px",
          }}
        >
          شكراً لحسن استماعكم
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          style={{
            margin: "18px 0 0",
            maxWidth: 720,
            fontSize: "clamp(20px, 1.85vw, 26px)",
            fontWeight: 800,
            color: MAROON,
            lineHeight: 1.55,
          }}
        >
          أتقدم بجزيل الشكر والامتنان لأعضاء لجنة الحكم الموقّرة والأساتذة المشرفين والحضور الكريم
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, scaleX: 0.35 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 120,
            height: 3,
            borderRadius: 99,
            background: `linear-gradient(90deg, ${TEAL}, ${MAROON})`,
            marginTop: 28,
            transformOrigin: "center",
          }}
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: "clamp(22px, 2vw, 28px)",
              fontWeight: 900,
              color: TEAL_DEEP,
            }}
          >
            ياسر المفعلاني
          </div>
          <div
            style={{
              fontSize: "clamp(16px, 1.35vw, 19px)",
              fontWeight: 700,
              color: "rgba(15,23,42,0.62)",
              lineHeight: 1.45,
            }}
          >
            المعهد العالي للعلوم التطبيقية والتكنولوجيا — دمشق 2026
          </div>
        </motion.div>

        {/* Soft pulse ring behind title area */}
        {!reduce && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "46%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.16, 0.28, 0.16] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "min(68vw, 480px)",
                height: "min(68vw, 480px)",
                borderRadius: "50%",
                border: `1.5px solid ${TEAL}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideS5_13_ClosingSlide;
