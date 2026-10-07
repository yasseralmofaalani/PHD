import React from "react";
import { motion } from "framer-motion";
import {
  LucideIcon,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from "lucide-react";

export interface RingMetric {
  id: string | number;
  value: string;
  percentage?: number; // 0 to 100 for SVG stroke dash
  title: string;
  subtitleEn?: string;
  description: string;
  gainBadge?: string;
  gainDirection?: "up" | "down" | "neutral";
  icon: LucideIcon;
  color?: string;
  pVal?: string;
}

interface ProgressRingDashboardProps {
  metrics: RingMetric[];
  columns?: 3 | 4 | 2;
  themeColor?: string;
}

export const ProgressRingDashboard: React.FC<ProgressRingDashboardProps> = ({
  metrics,
  columns = 3,
  themeColor = "#428177",
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "16px",
        alignItems: "stretch",
        padding: "6px 0",
      }}
    >
      {metrics.map((metric, idx) => {
        const ringColor = metric.color || themeColor;
        const Icon = metric.icon;
        const pct =
          metric.percentage !== undefined
            ? Math.min(100, Math.max(0, metric.percentage))
            : 85;
        const radius = 38;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (pct / 100) * circumference;

        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            style={{
              background: "#ffffff",
              border: `1.5px solid ${ringColor}35`,
              borderRadius: "16px",
              padding: "14px 16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "right",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top row: Ring + Icon & Gain */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              {/* Circular SVG Ring */}
              <div
                style={{
                  position: "relative",
                  width: "86px",
                  height: "86px",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  {/* Background Track */}
                  <circle
                    cx="43"
                    cy="43"
                    r={radius}
                    stroke={`${ringColor}18`}
                    strokeWidth="6.5"
                    fill="transparent"
                  />
                  {/* Progress Fill */}
                  <motion.circle
                    cx="43"
                    cy="43"
                    r={radius}
                    stroke={ringColor}
                    strokeWidth="6.5"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + idx * 0.1,
                      ease: "easeOut",
                    }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Center Value */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: metric.value.length > 5 ? "17px" : "21px",
                      fontWeight: 900,
                      color: ringColor,
                      fontFamily: "Inter, sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {metric.value}
                  </span>
                </div>
              </div>

              {/* Title & Badges */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: `${ringColor}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} color={ringColor} />
                  </div>

                  {metric.pVal && (
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 900,
                        color: ringColor,
                        background: `${ringColor}12`,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {metric.pVal}
                    </span>
                  )}
                </div>

                <h4
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "16.5px",
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.3,
                  }}
                >
                  {metric.title}
                </h4>

                {metric.subtitleEn && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "rgba(0,0,0,0.55)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {metric.subtitleEn}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom row: Description & Gain badge */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.85)",
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                {metric.description}
              </p>

              {metric.gainBadge && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12.5px",
                    fontWeight: 900,
                    color: ringColor,
                    background: `${ringColor}12`,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    alignSelf: "flex-start",
                  }}
                >
                  {metric.gainDirection === "up" && <ArrowUpRight size={14} />}
                  {metric.gainDirection === "down" && (
                    <ArrowDownRight size={14} />
                  )}
                  <span>{metric.gainBadge}</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
