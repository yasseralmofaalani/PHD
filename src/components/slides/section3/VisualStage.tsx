// ============================================================
//  Visual stage primitives — fill the slide, no empty white cards.
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import { alpha, palette, space, type as typeTokens, shadow } from "../../design/tokens";
import { ThesisImage } from "../../ui/ThesisImage";

/** Full-bleed media plane (image or live scene) — no white padding box. */
export const MediaPlane: React.FC<{
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  caption?: string;
  fig?: string;
  tint?: string;
  style?: React.CSSProperties;
}> = ({ children, src, alt, caption, fig, tint = palette.primary, style }) => (
  <div
    style={{
      position: "relative",
      flex: 1,
      alignSelf: "stretch",
      width: "100%",
      height: "100%",
      minHeight: 0,
      borderRadius: 18,
      overflow: "hidden",
      background: `linear-gradient(160deg, ${alpha(tint, 0.14)} 0%, ${palette.slideBgDeep} 55%, ${alpha(tint, 0.08)} 100%)`,
      border: `1px solid ${alpha(tint, 0.28)}`,
      boxShadow: shadow.hero,
      ...style,
    }}
  >
    {src && (
      <ThesisImage
        src={src}
        alt={alt || caption || ""}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          padding: 10,
          background: alpha("#0f172a", 0.03),
        }}
      />
    )}
    {children && (
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", minHeight: 0 }}>
        {children}
      </div>
    )}
    {(fig || caption) && (
      <div
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 10,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          borderRadius: 10,
          background: "rgba(15, 23, 42, 0.72)",
          backdropFilter: "blur(8px)",
          color: "#f8fafc",
          fontSize: typeTokens.micro,
          fontWeight: 700,
        }}
      >
        {fig && (
          <span
            style={{
              fontFamily: typeTokens.numeral,
              fontWeight: 900,
              background: tint,
              padding: "2px 8px",
              borderRadius: 6,
              letterSpacing: "0.4px",
            }}
          >
            {fig}
          </span>
        )}
        <span style={{ lineHeight: 1.35 }}>{caption}</span>
      </div>
    )}
  </div>
);

/** Animated process river — horizontal story, not chips in a white bar. */
export const ProcessRiver: React.FC<{
  steps: Array<{ label: string; sub?: string }>;
  color?: string;
}> = ({ steps, color = palette.primary }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      gap: 0,
      position: "relative",
      padding: `${space.sm}px 0`,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 22,
        left: "6%",
        right: "6%",
        height: 3,
        borderRadius: 99,
        background: `linear-gradient(90deg, ${alpha(color, 0.15)}, ${color}, ${alpha(color, 0.15)})`,
        zIndex: 0,
      }}
    />
    {steps.map((s, i) => (
      <motion.div
        key={`${s.label}-${i}`}
        initial={{ opacity: 0.95, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 * i, duration: 0.2 }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          textAlign: "center",
          padding: `0 ${4}px`,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: color,
            color: "#fff",
            fontFamily: typeTokens.numeral,
            fontWeight: 900,
            fontSize: 19,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 4px ${alpha(color, 0.18)}, 0 6px 16px ${alpha(color, 0.35)}`,
          }}
        >
          {i + 1}
        </div>
        <div style={{ fontSize: typeTokens.micro, fontWeight: 900, color: palette.ink, lineHeight: 1.25 }}>
          {s.label}
        </div>
        {s.sub && (
          <div
            dir="ltr"
            style={{
              fontFamily: typeTokens.numeral,
              fontSize: 18,
              fontWeight: 700,
              color: alpha(color, 0.9),
              letterSpacing: "0.3px",
            }}
          >
            {s.sub}
          </div>
        )}
      </motion.div>
    ))}
  </div>
);

/** Giant metric duel cell */
export const DuelMetric: React.FC<{
  label: string;
  bpso: string;
  aga: string;
  winner?: "bpso" | "aga" | "tie";
  color?: string;
}> = ({ label, bpso, aga, winner = "bpso", color = palette.primary }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: `${space.md}px ${space.sm}px`,
      borderRadius: 14,
      background: `linear-gradient(180deg, ${alpha(color, 0.16)} 0%, ${alpha(color, 0.04)} 100%)`,
      border: `1px solid ${alpha(color, 0.28)}`,
      minHeight: 0,
    }}
  >
    <div style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft, textAlign: "center" }}>
      {label}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 1 }}>
      <div
        style={{
          textAlign: "center",
          padding: 8,
          borderRadius: 10,
          background: winner === "bpso" ? color : alpha(palette.ink, 0.06),
          color: winner === "bpso" ? "#fff" : palette.ink,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.85 }}>BPSO</div>
        <div style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h3 }}>{bpso}</div>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: 8,
          borderRadius: 10,
          background: winner === "aga" ? palette.accent : alpha(palette.ink, 0.06),
          color: winner === "aga" ? "#fff" : palette.ink,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.85 }}>AGA</div>
        <div style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h3 }}>{aga}</div>
      </div>
    </div>
  </div>
);

/** Floating glass callout over a scene */
export const GlassChip: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = palette.primary, style }) => (
  <div
    style={{
      padding: "8px 12px",
      borderRadius: 10,
      background: "rgba(255,255,255,0.88)",
      border: `1px solid ${alpha(color, 0.35)}`,
      boxShadow: shadow.soft,
      fontSize: typeTokens.small,
      fontWeight: 800,
      color: palette.ink,
      backdropFilter: "blur(6px)",
      ...style,
    }}
  >
    {children}
  </div>
);
