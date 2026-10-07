// ============================================================
//  DataFlowPipeline — cinematic 4-stage data pipeline.
//
//  Unlike a series of cards, this is one composition: a single
//  horizontal current with staged "gates" that filter volume from
//  N_in → N_out. Each gate shows a live counter of records passing
//  through, its transform, and its scientific role.
//
//  Beat sequence:
//   • the current draws itself in from origin to end
//   • particles flow along the current
//   • at each gate the volume badge counts down (or up)
//   • the final gate is emphasized
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { fadeUp, pathDraw, t } from "../../design/motion";
import { NumberReveal } from "../../design/NumberReveal";

export interface PipelineStage {
  code: string;         // "STEP 01" / "RAW"
  titleAr: string;
  titleEn?: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  /** Volume passing through this stage. */
  volume?: { value: number; suffix?: string; label?: string };
  /** Marks the final / highlighted stage. */
  emphasized?: boolean;
}

interface DataFlowPipelineProps {
  stages: PipelineStage[];
  /** Optional label on the source (RTL: right). */
  sourceLabel?: string;
  /** Optional label on the sink (RTL: left). */
  sinkLabel?: string;
  /** Height in px (defaults to filling parent). */
  height?: number | string;
}

export const DataFlowPipeline: React.FC<DataFlowPipelineProps> = ({
  stages,
  sourceLabel,
  sinkLabel,
  height = "100%",
}) => {
  const shouldReduce = useReducedMotion();
  const n = stages.length;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Endpoint labels */}
      {sourceLabel && (
        <div
          style={{
            position: "absolute",
            insetInlineEnd: 8,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: typeTokens.micro,
            fontWeight: 900,
            color: palette.inkSoft,
            letterSpacing: "1.2px",
            writingMode: "vertical-rl",
          }}
        >
          {sourceLabel}
        </div>
      )}
      {sinkLabel && (
        <div
          style={{
            position: "absolute",
            insetInlineStart: 8,
            top: "50%",
            transform: "translateY(-50%) rotate(180deg)",
            fontSize: typeTokens.micro,
            fontWeight: 900,
            color: palette.accent,
            letterSpacing: "1.2px",
            writingMode: "vertical-rl",
          }}
        >
          {sinkLabel}
        </div>
      )}

      {/* SVG current + particles */}
      <svg
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 44,
          right: 44,
          width: "calc(100% - 88px)",
          top: "50%",
          height: 80,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="dfp-current" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={alpha(palette.primary, 0.15)} />
            <stop offset="45%" stopColor={palette.primary} />
            <stop offset="100%" stopColor={palette.accent} />
          </linearGradient>
          <filter id="dfp-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost current */}
        <path
          d="M 1000 40 L 0 40"
          stroke={alpha(palette.primary, 0.18)}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        {/* Drawn current */}
        <motion.path
          variants={pathDraw}
          initial={shouldReduce ? undefined : "hidden"}
          animate="visible"
          transition={t.epic}
          d="M 1000 40 L 0 40"
          stroke="url(#dfp-current)"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Particles flowing (RTL: right → left) */}
        {!shouldReduce &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={`p-${i}`}
              r="3"
              fill={palette.gold}
              filter="url(#dfp-glow)"
              animate={{ cx: [1000, 0], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                delay: (i * 3.6) / 6,
                ease: "linear",
              }}
              cy={40}
            />
          ))}
      </svg>

      {/* Stage gates */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          gap: space.md,
          padding: `0 44px`,
          alignItems: "stretch",
        }}
      >
        {stages.map((s, i) => (
          <StageGate stage={s} key={s.code} index={i} isLast={i === n - 1} />
        ))}
      </div>
    </div>
  );
};

const StageGate: React.FC<{
  stage: PipelineStage;
  index: number;
  isLast: boolean;
}> = ({ stage, index, isLast }) => {
  const Icon = stage.icon;
  const color = stage.color ?? palette.primary;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ ...t.slow, delay: 0.3 + index * 0.12 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: space.sm,
        position: "relative",
      }}
    >
      {/* Vertical drop-line to the current */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          bottom: 0,
          width: 2,
          background: alpha(color, 0.4),
        }}
      />
      {/* Stage node (sits on the current) */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: stage.emphasized ? 68 : 58,
          height: stage.emphasized ? 68 : 58,
          borderRadius: 999,
          background: stage.emphasized
            ? `linear-gradient(135deg, ${color}, ${palette.accent})`
            : "#ffffff",
          border: `2.5px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: stage.emphasized
            ? `0 0 30px ${alpha(color, 0.55)}, 0 10px 22px rgba(15, 23, 42, 0.16)`
            : `0 6px 18px rgba(15, 23, 42, 0.08)`,
          marginBottom: 4,
        }}
      >
        <Icon size={stage.emphasized ? 26 : 22} color={stage.emphasized ? "#ffffff" : color} />
        <span
          style={{
            position: "absolute",
            top: -8,
            insetInlineEnd: -8,
            background: color,
            color: "#ffffff",
            fontFamily: typeTokens.numeral,
            fontSize: 11,
            fontWeight: 900,
            width: 22,
            height: 22,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          {index + 1}
        </span>
      </div>

      {/* Below the current: content */}
      <div
        style={{
          background: "#ffffff",
          border: `1px solid ${alpha(color, stage.emphasized ? 0.6 : 0.28)}`,
          borderTop: `3px solid ${color}`,
          borderRadius: 12,
          padding: `${space.sm}px ${space.md}px`,
          width: "100%",
          textAlign: "right",
          boxShadow: `0 6px 18px rgba(15, 23, 42, 0.05)`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: typeTokens.numeral,
              fontSize: typeTokens.micro,
              fontWeight: 900,
              color,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            {stage.code}
          </span>
          {isLast && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: "#ffffff",
                background: palette.accent,
                padding: "2px 8px",
                borderRadius: 4,
                letterSpacing: "0.5px",
              }}
            >
              مخرج الترقية
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: typeTokens.h3,
            fontWeight: 900,
            color: palette.ink,
            lineHeight: 1.25,
          }}
        >
          {stage.titleAr}
        </div>
        {stage.titleEn && (
          <div
            dir="ltr"
            style={{
              fontFamily: typeTokens.numeral,
              fontSize: typeTokens.micro,
              fontWeight: 700,
              color: alpha(palette.ink, 0.5),
              letterSpacing: "1.2px",
              textAlign: "right",
            }}
          >
            {stage.titleEn}
          </div>
        )}
        <p
          style={{
            margin: 0,
            fontSize: typeTokens.small,
            lineHeight: 1.5,
            color: palette.inkSoft,
            fontWeight: 600,
          }}
        >
          {stage.description}
        </p>
        {stage.volume && (
          <div
            style={{
              marginTop: space.xs,
              paddingTop: space.sm,
              borderTop: `1px dashed ${alpha(color, 0.25)}`,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <NumberReveal
              value={stage.volume.value}
              suffix={stage.volume.suffix}
              label={stage.volume.label}
              size={typeTokens.h1}
              color={color}
              labelColor={color}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
