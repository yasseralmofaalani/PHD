import React from "react";
import { motion } from "framer-motion";
import {
  LucideIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

export interface MatrixQuadrant {
  id: string;
  quadrantPosition: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  title: string;
  subtitle?: string;
  metric?: string;
  metricLabel?: string;
  points: string[];
  icon: LucideIcon;
  variant: "primary" | "accent" | "neutral" | "alert";
}

interface Matrix2x2Props {
  quadrants: MatrixQuadrant[];
  xAxisLabelTop?: string;
  xAxisLabelBottom?: string;
  yAxisLabelRight?: string;
  yAxisLabelLeft?: string;
}

export const Matrix2x2: React.FC<Matrix2x2Props> = ({
  quadrants,
  xAxisLabelTop,
  xAxisLabelBottom,
  yAxisLabelRight,
  yAxisLabelLeft,
}) => {
  const getVariantStyles = (variant: MatrixQuadrant["variant"]) => {
    switch (variant) {
      case "primary":
        return {
          border: "1.5px solid rgba(66, 129, 119, 0.45)",
          topBorder: "4px solid #428177",
          color: "#428177",
          bg: "#ffffff",
          iconBg: "rgba(66, 129, 119, 0.12)",
        };
      case "accent":
        return {
          border: "1.5px solid rgba(107, 31, 42, 0.45)",
          topBorder: "4px solid #6b1f2a",
          color: "#6b1f2a",
          bg: "#ffffff",
          iconBg: "rgba(107, 31, 42, 0.12)",
        };
      case "alert":
        return {
          border: "1.5px solid rgba(220, 38, 38, 0.35)",
          topBorder: "4px solid #dc2626",
          color: "#dc2626",
          bg: "#fff9f9",
          iconBg: "rgba(220, 38, 38, 0.12)",
        };
      case "neutral":
      default:
        return {
          border: "1.5px solid rgba(15, 23, 42, 0.2)",
          topBorder: "4px solid #0f172a",
          color: "#0f172a",
          bg: "#ffffff",
          iconBg: "rgba(15, 23, 42, 0.08)",
        };
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Axis Labels Header */}
      {(xAxisLabelTop || xAxisLabelBottom) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 14px 6px 14px",
            fontSize: "13px",
            fontWeight: 800,
            color: "rgba(0,0,0,0.65)",
            letterSpacing: "0.3px",
          }}
        >
          <span>{yAxisLabelRight || ""}</span>
          <span>{xAxisLabelTop || ""}</span>
        </div>
      )}

      {/* 2x2 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "14px",
          height: "100%",
          position: "relative",
        }}
      >
        {quadrants.map((quad, idx) => {
          const styles = getVariantStyles(quad.variant);
          const Icon = quad.icon;

          return (
            <motion.div
              key={quad.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              style={{
                background: styles.bg,
                border: styles.border,
                borderTop: styles.topBorder,
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "right",
              }}
            >
              {/* Header */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: styles.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color={styles.color} />
                    </div>
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "17px",
                          fontWeight: 900,
                          color: "#0f172a",
                          lineHeight: 1.25,
                        }}
                      >
                        {quad.title}
                      </h4>
                      {quad.subtitle && (
                        <span
                          style={{
                            fontSize: "12.5px",
                            fontWeight: 800,
                            color: styles.color,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {quad.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {quad.metric && (
                    <div
                      style={{
                        background: `${styles.color}15`,
                        padding: "4px 12px",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: 900,
                          color: styles.color,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {quad.metric}
                      </div>
                      {quad.metricLabel && (
                        <span
                          style={{
                            fontSize: "11.5px",
                            color: "rgba(0,0,0,0.65)",
                            fontWeight: 800,
                          }}
                        >
                          {quad.metricLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Points List */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    marginTop: "6px",
                  }}
                >
                  {quad.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "14.5px",
                        lineHeight: 1.5,
                        color: "#0f172a",
                        fontWeight: 700,
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: styles.color,
                          marginTop: "8px",
                          flexShrink: 0,
                        }}
                      />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
