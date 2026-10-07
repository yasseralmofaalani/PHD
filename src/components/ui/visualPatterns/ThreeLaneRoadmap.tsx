// ============================================================
//  ThreeLaneRoadmap — three parallel scientific lanes.
//
//  Used for Section 3 Slide 01: PLAN → FAIR → CONTROL as three
//  parallel research trajectories that share a starting point
//  (the thesis question) and converge at a shared outcome.
//
//  Each lane draws its own path, plants its own milestones, and
//  emits its own signature color. The lanes are NOT cards.
// ============================================================

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { palette, type as typeTokens, alpha, space } from "../../design/tokens";
import { fadeUp, pathDraw, t } from "../../design/motion";

export interface Milestone {
  label: string;
  detail?: string;
}

export interface Lane {
  key: string;
  code: string;              // "PLAN" | "FAIR" | "CONTROL"
  codeAr: string;            // e.g. "التخطيط الأمثل"
  chapter: string;           // e.g. "الفصل الرابع"
  question: string;          // e.g. "أين يجب ترقية الشبكة..."
  color: string;             // lane signature
  icon: LucideIcon;
  milestones: Milestone[];   // 2-4 milestones along the lane
  outcome: string;           // key result (short)
}

interface ThreeLaneRoadmapProps {
  lanes: Lane[];
  originLabel?: string;      // shared starting label (RTL: right)
  destinationLabel?: string; // shared ending label (RTL: left)
}

export const ThreeLaneRoadmap: React.FC<ThreeLaneRoadmapProps> = ({
  lanes,
  originLabel = "إشكالية البحث الجامعة",
  destinationLabel = "إطار PLAN · FAIR · CONTROL المتكامل",
}) => {
  const shouldReduce = useReducedMotion();

  const height = 100;                          // %
  const laneRegions = useMemo(
    () =>
      lanes.map((_, i) => {
        // divide vertical space into equal bands
        const bandSize = height / lanes.length;
        const yMid = i * bandSize + bandSize / 2;
        return yMid;
      }),
    [lanes],
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Origin & destination pillars (RTL: origin on the right) */}
      <div
        style={{
          position: "absolute",
          insetInlineEnd: 0,
          top: 0,
          bottom: 0,
          width: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <PillarTag label={originLabel} align="rtl" />
      </div>
      <div
        style={{
          position: "absolute",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          width: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <PillarTag label={destinationLabel} align="ltr" />
      </div>

      {/* SVG lane paths */}
      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          insetInlineStart: 44,
          insetInlineEnd: 44,
          top: 0,
          bottom: 0,
          width: "calc(100% - 88px)",
          height: "100%",
          zIndex: 1,
        }}
      >
        <defs>
          {lanes.map((lane) => (
            <linearGradient
              key={`grad-${lane.key}`}
              id={`lane-grad-${lane.key}`}
              // RTL: gradient runs right→left because origin is on the right
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor={alpha(lane.color, 0.15)} />
              <stop offset="40%" stopColor={lane.color} />
              <stop offset="100%" stopColor={alpha(lane.color, 0.85)} />
            </linearGradient>
          ))}
        </defs>

        {lanes.map((lane, li) => {
          const yMid = (laneRegions[li] / 100) * 300;
          // Path travels origin (x=1000, right) → destination (x=0, left)
          // With a subtle vertical bend towards center at midpoint.
          const centerY = 150;
          const bendY = yMid + (centerY - yMid) * 0.28;
          const d = `M 1000 ${yMid} C 700 ${yMid}, 500 ${bendY}, 0 ${centerY}`;
          return (
            <g key={`lane-${lane.key}`}>
              {/* Ghost lane */}
              <path
                d={d}
                stroke={alpha(lane.color, 0.15)}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              {/* Drawn lane */}
              <motion.path
                variants={pathDraw}
                initial={shouldReduce ? undefined : "hidden"}
                animate="visible"
                transition={{ ...t.epic, delay: 0.15 + li * 0.15 }}
                d={d}
                stroke={`url(#lane-grad-${lane.key})`}
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Convergence dot at destination */}
              <motion.circle
                initial={false}
                animate={{ opacity: 1, r: 6 }}
                cx={0}
                cy={centerY}
                fill={lane.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          );
        })}

        {/* Central convergence nucleus (rendered after lanes so it sits on top) */}
        <motion.circle
          initial={false}
          animate={{ opacity: 1, r: 12 }}
          cx={0}
          cy={150}
          fill="url(#lane-grad-nucleus)"
        />
        <defs>
          <radialGradient id="lane-grad-nucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.gold} />
            <stop offset="100%" stopColor={palette.accent} />
          </radialGradient>
        </defs>
      </svg>

      {/* Lane content overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateRows: `repeat(${lanes.length}, 1fr)`,
          margin: "0 44px",
        }}
      >
        {lanes.map((lane, li) => (
          <LaneRow key={lane.key} lane={lane} laneIndex={li} />
        ))}
      </div>
    </div>
  );
};

const PillarTag: React.FC<{ label: string; align: "rtl" | "ltr" }> = ({
  label,
  align,
}) => (
  <div
    style={{
      writingMode: "vertical-rl",
      transform: align === "rtl" ? "rotate(180deg)" : undefined,
      fontFamily: typeTokens.arabic,
      fontSize: typeTokens.micro,
      fontWeight: 900,
      letterSpacing: "1.4px",
      color: palette.inkSoft,
      background: alpha(palette.primary, 0.06),
      border: `1px solid ${alpha(palette.primary, 0.24)}`,
      borderRadius: 8,
      padding: "16px 6px",
      textAlign: "center",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);

const LaneRow: React.FC<{ lane: Lane; laneIndex: number }> = ({
  lane,
  laneIndex,
}) => {
  const Icon = lane.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ ...t.quick, delay: laneIndex * 0.03 }}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: space.md,
        padding: `${space.sm}px 0`,
      }}
    >
      {/* Lane head (RTL: on the right, origin side) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: space.sm,
          paddingInlineEnd: space.md,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: lane.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 18px ${alpha(lane.color, 0.35)}`,
          }}
        >
          <Icon size={22} color="#ffffff" />
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: typeTokens.numeral,
              fontSize: typeTokens.small,
              fontWeight: 900,
              color: lane.color,
              letterSpacing: "1.4px",
            }}
          >
            {lane.code}
          </div>
          <div
            style={{
              fontSize: typeTokens.small,
              fontWeight: 800,
              color: palette.ink,
              lineHeight: 1.2,
            }}
          >
            {lane.codeAr}
          </div>
          <div
            style={{
              fontSize: typeTokens.micro,
              fontWeight: 700,
              color: palette.inkMuted,
              marginTop: 2,
            }}
          >
            {lane.chapter}
          </div>
        </div>
      </div>

      {/* Milestones + research question along the lane */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: `0 ${space.md}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: space.sm,
          }}
        >
          <span
            style={{
              fontSize: typeTokens.small,
              fontWeight: 900,
              color: lane.color,
            }}
          >
            سؤال:
          </span>
          <span
            style={{
              fontSize: typeTokens.small,
              fontWeight: 700,
              color: palette.ink,
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            {lane.question}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: space.sm,
            flexWrap: "wrap",
            paddingTop: 2,
          }}
        >
          {lane.milestones.map((m, i) => (
            <MilestoneChip key={i} milestone={m} color={lane.color} index={i} />
          ))}
        </div>
      </div>

      {/* Outcome badge (RTL: on the left, destination side) */}
      <motion.div
        initial={{ opacity: 0.96 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `linear-gradient(135deg, ${lane.color} 0%, ${alpha(lane.color, 0.75)} 100%)`,
          color: "#ffffff",
          padding: `${space.sm}px ${space.md}px`,
          borderRadius: 10,
          fontSize: typeTokens.small,
          fontWeight: 900,
          textAlign: "center",
          minWidth: 160,
          boxShadow: `0 6px 16px ${alpha(lane.color, 0.32)}`,
        }}
      >
        {lane.outcome}
      </motion.div>
    </motion.div>
  );
};

const MilestoneChip: React.FC<{
  milestone: Milestone;
  color: string;
  index: number;
}> = ({ milestone, color, index }) => (
  <motion.span
    initial={{ opacity: 0.96, y: 2 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12.5,
      fontWeight: 700,
      color: palette.ink,
      background: "rgba(255, 255, 255, 0.85)",
      border: `1px solid ${alpha(color, 0.35)}`,
      borderRadius: 8,
      padding: "3px 10px",
      lineHeight: 1.3,
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: 999,
        background: color,
      }}
    />
    {milestone.label}
  </motion.span>
);
