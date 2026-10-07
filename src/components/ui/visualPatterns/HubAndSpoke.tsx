import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface SpokeNode {
  id: string | number;
  title: string;
  subtitle?: string;
  description: string;
  metric?: string;
  icon: LucideIcon;
  color?: string;
  badge?: string;
}

interface HubAndSpokeProps {
  hub: {
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    badge?: string;
    description?: string;
  };
  spokes: SpokeNode[];
  hubColor?: string;
}

export const HubAndSpoke: React.FC<HubAndSpokeProps> = ({
  hub,
  spokes,
  hubColor = "#428177",
}) => {
  const HubIcon = hub.icon;
  const leftSpokes = spokes.slice(0, Math.ceil(spokes.length / 2));
  const rightSpokes = spokes.slice(Math.ceil(spokes.length / 2));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr 1fr",
        alignItems: "center",
        gap: "20px",
        padding: "10px 0",
      }}
    >
      {/* Right Column Spokes (in RTL this appears first/right) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          zIndex: 3,
        }}
      >
        {rightSpokes.map((spoke, idx) => {
          const spokeColor = spoke.color || hubColor;
          const SpokeIcon = spoke.icon;
          return (
            <motion.div
              key={spoke.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              style={{
                background: "#ffffff",
                border: `1.5px solid ${spokeColor}40`,
                borderRight: `4px solid ${spokeColor}`,
                borderRadius: "12px",
                padding: "12px 14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                textAlign: "right",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: `${spokeColor}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SpokeIcon size={18} color={spokeColor} />
                  </div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {spoke.title}
                  </h4>
                </div>
                {spoke.metric && (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 900,
                      color: spokeColor,
                      fontFamily: "Inter, sans-serif",
                      background: `${spokeColor}12`,
                      padding: "3px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {spoke.metric}
                  </span>
                )}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.85)",
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                {spoke.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Central Hub Node */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 4,
        }}
      >
        {/* Pulsing Aura */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: "-12px",
            borderRadius: "24px",
            background: `radial-gradient(circle, ${hubColor}35 0%, transparent 70%)`,
            zIndex: -1,
          }}
        />

        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f7f9f8 100%)",
            border: `2.5px solid ${hubColor}`,
            borderRadius: "20px",
            padding: "24px 20px",
            textAlign: "center",
            boxShadow: `0 12px 32px rgba(66, 129, 119, 0.22), 0 2px 8px rgba(0,0,0,0.08)`,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${hubColor}, #6b1f2a)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 6px 18px ${hubColor}60`,
            }}
          >
            <HubIcon size={34} color="#ffffff" />
          </div>

          {hub.badge && (
            <span
              style={{
                fontSize: "12.5px",
                fontWeight: 900,
                color: hubColor,
                background: `${hubColor}18`,
                padding: "4px 14px",
                borderRadius: "14px",
                letterSpacing: "0.3px",
              }}
            >
              {hub.badge}
            </span>
          )}

          <h3
            style={{
              margin: 0,
              fontSize: "19px",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.3,
            }}
          >
            {hub.title}
          </h3>

          {hub.subtitle && (
            <span
              style={{
                fontSize: "13.5px",
                fontWeight: 800,
                color: hubColor,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {hub.subtitle}
            </span>
          )}

          {hub.description && (
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "rgba(0,0,0,0.85)",
                lineHeight: 1.5,
                fontWeight: 700,
              }}
            >
              {hub.description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Left Column Spokes (in RTL this appears second/left) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          zIndex: 3,
        }}
      >
        {leftSpokes.map((spoke, idx) => {
          const spokeColor = spoke.color || "#6b1f2a";
          const SpokeIcon = spoke.icon;
          return (
            <motion.div
              key={spoke.id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              style={{
                background: "#ffffff",
                border: `1.5px solid ${spokeColor}40`,
                borderRight: `4px solid ${spokeColor}`,
                borderRadius: "12px",
                padding: "12px 14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                textAlign: "right",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: `${spokeColor}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SpokeIcon size={18} color={spokeColor} />
                  </div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {spoke.title}
                  </h4>
                </div>
                {spoke.metric && (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 900,
                      color: spokeColor,
                      fontFamily: "Inter, sans-serif",
                      background: `${spokeColor}12`,
                      padding: "3px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {spoke.metric}
                  </span>
                )}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.85)",
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                {spoke.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
