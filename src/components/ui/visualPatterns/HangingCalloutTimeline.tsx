import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface TimelineCallout {
  id: string | number;
  timeOrPhase: string;
  phaseLabelEn?: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  icon: LucideIcon;
  badge?: string;
  color?: string;
  hangingPosition?: "bottom" | "top";
}

interface HangingCalloutTimelineProps {
  items: TimelineCallout[];
  lineColor?: string;
}

export const HangingCalloutTimeline: React.FC<HangingCalloutTimelineProps> = ({
  items,
  lineColor = "#428177",
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
        padding: "10px 0",
      }}
    >
      {/* Horizontal Timeline Bar */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "6px",
          background: `linear-gradient(90deg, ${lineColor}22, ${lineColor}, ${lineColor}22)`,
          borderRadius: "3px",
          margin: "20px 0",
        }}
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-2px",
            width: "60px",
            height: "10px",
            background: "#ffffff",
            boxShadow: `0 0 12px ${lineColor}`,
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Grid of Hanging Callouts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: "16px",
          position: "relative",
          zIndex: 5,
        }}
      >
        {items.map((item, idx) => {
          const itemColor = item.color || lineColor;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Pin at the Timeline Bar */}
              <div
                style={{
                  position: "absolute",
                  top: "-32px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  border: `4px solid ${itemColor}`,
                  boxShadow: `0 0 10px ${itemColor}80`,
                  zIndex: 6,
                }}
              />

              {/* Hanging Cable */}
              <div
                style={{
                  width: "2px",
                  height: "22px",
                  background: itemColor,
                  opacity: 0.7,
                  marginBottom: "2px",
                }}
              />

              {/* Card Container */}
              <div
                style={{
                  background: "#ffffff",
                  border: `1.5px solid ${itemColor}50`,
                  borderTop: `4px solid ${itemColor}`,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  width: "100%",
                  textAlign: "right",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {/* Header Row: Time badge + Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      background: `${itemColor}18`,
                      color: itemColor,
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: 900,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.timeOrPhase}
                  </span>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: `${itemColor}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color={itemColor} />
                  </div>
                </div>

                <h4
                  style={{
                    margin: 0,
                    fontSize: "16.5px",
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h4>

                {item.phaseLabelEn && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "rgba(0,0,0,0.55)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.phaseLabelEn}
                  </span>
                )}

                {item.metric && (
                  <div
                    style={{
                      background: `${itemColor}0c`,
                      border: `1.5px dashed ${itemColor}60`,
                      borderRadius: "8px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "3px 0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12.5px",
                        color: "#1e293b",
                        fontWeight: 800,
                      }}
                    >
                      {item.metricLabel || "المؤشر"}
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: 900,
                        color: itemColor,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {item.metric}
                    </span>
                  </div>
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
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
