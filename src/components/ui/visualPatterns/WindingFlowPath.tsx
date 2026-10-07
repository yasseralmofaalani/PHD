import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface FlowNode {
  id: string | number;
  stepNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  accentColor?: string;
  highlight?: boolean;
}

interface WindingFlowPathProps {
  nodes: FlowNode[];
  themeColor?: string;
}

export const WindingFlowPath: React.FC<WindingFlowPathProps> = ({
  nodes,
  themeColor = "#428177",
}) => {
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
      {/* Container Grid of Stations */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
          gap: "16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {nodes.map((node, idx) => {
          const isEven = idx % 2 === 0;
          const nodeColor = node.accentColor || themeColor;
          const Icon = node.icon;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: isEven ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Connector line behind */}
              {idx < nodes.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "32px",
                    left: "-50%",
                    right: "50%",
                    height: "4px",
                    background: `linear-gradient(to left, ${nodeColor}, ${nodes[idx + 1].accentColor || themeColor})`,
                    zIndex: 0,
                    borderRadius: "2px",
                    opacity: 0.6,
                  }}
                >
                  <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "linear",
                    }}
                    style={{
                      width: "28px",
                      height: "100%",
                      background: "#ffffff",
                      boxShadow: `0 0 10px ${nodeColor}`,
                      borderRadius: "2px",
                    }}
                  />
                </div>
              )}

              {/* Station Node Circle */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: node.highlight
                    ? `linear-gradient(135deg, ${nodeColor}, #6b1f2a)`
                    : "#ffffff",
                  border: `3px solid ${nodeColor}`,
                  boxShadow: node.highlight
                    ? `0 0 20px ${nodeColor}80, 0 6px 16px rgba(0,0,0,0.15)`
                    : `0 4px 14px rgba(0,0,0,0.08)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                  marginBottom: "14px",
                }}
              >
                <Icon
                  size={26}
                  color={node.highlight ? "#ffffff" : nodeColor}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: nodeColor,
                    color: "#ffffff",
                    fontSize: "12.5px",
                    fontWeight: 900,
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {node.stepNumber}
                </span>
              </div>

              {/* Station Content Card */}
              <div
                style={{
                  background: "#ffffff",
                  border: `1.5px solid ${node.highlight ? nodeColor : "rgba(66, 129, 119, 0.25)"}`,
                  borderRadius: "12px",
                  padding: "12px 14px",
                  width: "100%",
                  textAlign: "right",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {node.badge && (
                  <span
                    style={{
                      alignSelf: "flex-start",
                      fontSize: "12px",
                      fontWeight: 900,
                      color: nodeColor,
                      background: `${nodeColor}14`,
                      padding: "3px 10px",
                      borderRadius: "10px",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {node.badge}
                  </span>
                )}
                <h4
                  style={{
                    margin: 0,
                    fontSize: "16.5px",
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.3,
                  }}
                >
                  {node.title}
                </h4>
                {node.subtitle && (
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 800,
                      color: nodeColor,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {node.subtitle}
                  </span>
                )}
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "rgba(0,0,0,0.85)",
                    lineHeight: 1.5,
                    fontWeight: 700,
                  }}
                >
                  {node.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
