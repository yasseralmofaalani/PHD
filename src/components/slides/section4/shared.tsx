// Section 4 shared primitives — visual storytelling helpers (not card grids).
import React from "react";
import { alpha, palette, space, type as typeTokens, shadow } from "../../design/tokens";

export { SlideStage, SlideTitleBlock } from "../../design/SlideStage";
export { ThesisImage } from "../../ui/ThesisImage";
export { NumberReveal } from "../../design/NumberReveal";
export { MediaPlane, ProcessRiver, DuelMetric } from "../section3/VisualStage";
export { ThesisFigure } from "../section3/ThesisFigure";

/** Compact meaning annotation next to a metric (why the number matters). */
export const MetricMeaning: React.FC<{
  label: string;
  meaning: string;
  color?: string;
}> = ({ label, meaning, color = palette.primary }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <span style={{ fontSize: typeTokens.micro, fontWeight: 900, color, letterSpacing: "0.4px" }}>
      {label}
    </span>
    <span style={{ fontSize: typeTokens.small, fontWeight: 700, color: palette.inkSoft, lineHeight: 1.35 }}>
      {meaning}
    </span>
  </div>
);

/** Large status pill for publication state — always visible, no click-to-reveal. */
export const StatusPill: React.FC<{
  label: string;
  tone?: "published" | "accepted" | "pending" | "neutral";
}> = ({ label, tone = "neutral" }) => {
  const bg =
    tone === "published"
      ? palette.accent
      : tone === "accepted"
        ? palette.success
        : tone === "pending"
          ? palette.warning
          : palette.primary;
  return (
    <span
      dir="ltr"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: bg,
        color: "#fff",
        padding: "5px 12px",
        borderRadius: 8,
        fontFamily: typeTokens.numeral,
        fontSize: typeTokens.micro,
        fontWeight: 900,
        letterSpacing: "0.8px",
        boxShadow: shadow.soft,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
};

/** Vertical / horizontal story spine step. */
export const StoryNode: React.FC<{
  code?: string;
  title: string;
  sub?: string;
  color?: string;
  active?: boolean;
  style?: React.CSSProperties;
}> = ({ code, title, sub, color = palette.primary, active, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 4,
      padding: `${space.sm}px ${space.md}px`,
      borderRadius: 12,
      background: active ? alpha(color, 0.14) : alpha(color, 0.06),
      border: `1.5px solid ${alpha(color, active ? 0.45 : 0.22)}`,
      minWidth: 0,
      ...style,
    }}
  >
    {code && (
      <span
        dir="ltr"
        style={{
          fontFamily: typeTokens.numeral,
          fontSize: typeTokens.micro,
          fontWeight: 900,
          color,
          letterSpacing: "1px",
        }}
      >
        {code}
      </span>
    )}
    <span style={{ fontSize: typeTokens.small, fontWeight: 900, color: palette.ink, lineHeight: 1.3 }}>
      {title}
    </span>
    {sub && (
      <span style={{ fontSize: typeTokens.micro, fontWeight: 700, color: palette.inkSoft, lineHeight: 1.3 }}>
        {sub}
      </span>
    )}
  </div>
);

/** Directional arrow between story nodes (RTL-aware visually as ←). */
export const StoryArrow: React.FC<{ color?: string }> = ({ color = palette.primary }) => (
  <span
    aria-hidden
    style={{
      color,
      fontWeight: 900,
      fontFamily: typeTokens.numeral,
      fontSize: typeTokens.h3,
      flexShrink: 0,
      opacity: 0.85,
    }}
  >
    ←
  </span>
);

/** Improvement callout with before→after values visible. */
export const DeltaCallout: React.FC<{
  delta: string;
  label: string;
  from: string;
  to: string;
  color?: string;
}> = ({ delta, label, from, to, color = palette.success }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 6,
      padding: `${space.md}px ${space.lg}px`,
      borderRadius: 14,
      background: alpha(color, 0.1),
      border: `1.5px solid ${alpha(color, 0.35)}`,
      textAlign: "center",
    }}
  >
    <div
      dir="ltr"
      style={{
        fontFamily: typeTokens.numeral,
        fontSize: typeTokens.h2,
        fontWeight: 900,
        color,
        lineHeight: 1,
      }}
    >
      {delta}
    </div>
    <div style={{ fontSize: typeTokens.small, fontWeight: 900, color: palette.ink }}>{label}</div>
    <div
      dir="ltr"
      style={{
        fontFamily: typeTokens.numeral,
        fontSize: typeTokens.micro,
        fontWeight: 800,
        color: palette.inkSoft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <span>{from}</span>
      <span style={{ color }}>→</span>
      <span style={{ color, fontWeight: 900 }}>{to}</span>
    </div>
  </div>
);

/** Footer strip — always visible scientific note. */
export const SlideFootnote: React.FC<{
  children: React.ReactNode;
  color?: string;
  badge?: string;
}> = ({ children, color = palette.primary, badge }) => (
  <div
    style={{
      marginTop: space.sm,
      background: alpha(color, 0.1),
      border: `1.5px solid ${alpha(color, 0.35)}`,
      borderInlineStart: `4px solid ${color}`,
      borderRadius: 10,
      padding: `${space.sm}px ${space.lg}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: space.md,
      fontSize: typeTokens.small,
      fontWeight: 700,
      color: palette.ink,
      lineHeight: 1.45,
    }}
  >
    <span>{children}</span>
    {badge && (
      <span
        dir="ltr"
        style={{
          flexShrink: 0,
          background: color,
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 6,
          fontFamily: typeTokens.numeral,
          fontSize: typeTokens.micro,
          fontWeight: 900,
        }}
      >
        {badge}
      </span>
    )}
  </div>
);
