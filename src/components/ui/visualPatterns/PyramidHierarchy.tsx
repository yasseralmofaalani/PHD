import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ArrowUp } from "lucide-react";

export interface PyramidTier {
  level: string; // e.g., 'L0', 'L1', 'L2', 'L3', 'L4', 'L5'
  titleAr: string;
  titleEn?: string;
  description: string;
  keyTechOrMetric?: string;
  icon: LucideIcon;
  color?: string;
  highlight?: boolean;
}

interface PyramidHierarchyProps {
  tiers: PyramidTier[]; // Ordered from Top (apex) to Bottom (foundation), or Bottom to Top
  apexDirection?: "top-to-bottom" | "bottom-to-top";
  sideNoteLabel?: string;
}

export const PyramidHierarchy: React.FC<PyramidHierarchyProps> = ({
  tiers,
  apexDirection = "top-to-bottom",
  sideNoteLabel = "التكامل الهرمي: من البنية التحتية إلى التحكم السيادي",
}) => {
  // If top-to-bottom, index 0 is top (narrowest), last index is bottom (widest)
  const total = tiers.length;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        padding: "6px 0",
      }}
    >
      {/* Optional Side / Header Label */}
      {sideNoteLabel && (
        <div
          style={{
            fontSize: "11.5px",
            fontWeight: 800,
            color: "rgba(0,0,0,0.5)",
            letterSpacing: "0.4px",
            marginBottom: "4px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ArrowUp size={14} color="#428177" />
          <span>{sideNoteLabel}</span>
        </div>
      )}

      {/* Stack of Trapezoidal / Stepped Levels */}
      {tiers.map((tier, idx) => {
        // Calculate progressive width: top is narrower (e.g. 52%), bottom is 100%
        const widthPct =
          apexDirection === "top-to-bottom"
            ? 52 + (idx / (total - 1 || 1)) * 48
            : 100 - (idx / (total - 1 || 1)) * 48;

        const tierColor =
          tier.color || (tier.highlight ? "#6b1f2a" : "#428177");
        const Icon = tier.icon;

        return (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            style={{
              width: `${widthPct}%`,
              background: tier.highlight
                ? `linear-gradient(90deg, #ffffff, #fff7f7 50%, #ffffff)`
                : `linear-gradient(90deg, #ffffff, #f7faf9 50%, #ffffff)`,
              border: `1.5px solid ${tierColor}50`,
              borderRight: `6px solid ${tierColor}`,
              borderRadius: "10px",
              padding: "8px 16px",
              boxShadow: tier.highlight
                ? `0 4px 18px ${tierColor}25`
                : "0 2px 10px rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              position: "relative",
              textAlign: "right",
            }}
          >
            {/* Right Side: Level Badge + Icon + Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  background: tierColor,
                  color: "#ffffff",
                  fontSize: "12.5px",
                  fontWeight: 900,
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                {tier.level}
              </span>

              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  background: `${tierColor}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} color={tierColor} />
              </div>

              <div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "16.5px",
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.25,
                  }}
                >
                  {tier.titleAr}
                </h4>
                {tier.titleEn && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "rgba(0,0,0,0.55)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {tier.titleEn}
                  </span>
                )}
              </div>
            </div>

            {/* Middle: Short Description */}
            <div style={{ flex: 1, padding: "0 12px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.85)",
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                {tier.description}
              </p>
            </div>

            {/* Left Side: Key Tech or Metric Badge */}
            {tier.keyTechOrMetric && (
              <div
                style={{
                  background: `${tierColor}12`,
                  border: `1.5px solid ${tierColor}40`,
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 900,
                  color: tierColor,
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {tier.keyTechOrMetric}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
