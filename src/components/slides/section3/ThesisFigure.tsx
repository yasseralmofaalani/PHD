// Compact thesis-figure panel — original figures only, no invented captions.
import React from "react";
import { alpha, palette, space, type as typeTokens } from "../../design/tokens";
import { ThesisImage } from "../../ui/ThesisImage";

export const ThesisFigure: React.FC<{
  src: string;
  fig: string;
  caption: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}> = ({ src, fig, caption, style, imgStyle }) => (
  <figure
    style={{
      margin: 0,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      background: "#ffffff",
      border: `1px solid ${alpha(palette.primary, 0.22)}`,
      borderRadius: 12,
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: space.sm,
        background: alpha(palette.primary, 0.03),
      }}
    >
      <ThesisImage
        src={src}
        alt={caption}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          ...imgStyle,
        }}
      />
    </div>
    <figcaption
      style={{
        display: "flex",
        alignItems: "center",
        gap: space.sm,
        padding: `${space.sm}px ${space.md}px`,
        borderTop: `1px solid ${alpha(palette.primary, 0.16)}`,
        fontSize: typeTokens.small,
        fontWeight: 700,
        color: palette.ink,
        lineHeight: 1.35,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          fontFamily: typeTokens.numeral,
          fontWeight: 900,
          fontSize: typeTokens.micro,
          letterSpacing: "0.6px",
          color: "#fff",
          background: palette.primary,
          padding: "2px 8px",
          borderRadius: 6,
        }}
      >
        {fig}
      </span>
      <span>{caption}</span>
    </figcaption>
  </figure>
);

export const AlgoStepRail: React.FC<{
  steps: string[];
  color?: string;
}> = ({ steps, color = palette.primary }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 6,
      justifyContent: "center",
    }}
  >
    {steps.map((s, i) => (
      <React.Fragment key={`${s}-${i}`}>
        <span
          style={{
            fontSize: typeTokens.small,
            fontWeight: 800,
            color: palette.ink,
            background: alpha(color, 0.1),
            border: `1px solid ${alpha(color, 0.28)}`,
            borderRadius: 8,
            padding: "5px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {s}
        </span>
        {i < steps.length - 1 && (
          <span
            style={{
              color,
              fontWeight: 900,
              fontFamily: typeTokens.numeral,
              fontSize: typeTokens.body,
            }}
          >
            ←
          </span>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const BinaryLegend: React.FC<{ items: Array<{ bit: string; label: string; color: string }> }> = ({
  items,
}) => (
  <div style={{ display: "flex", gap: space.md, flexWrap: "wrap", justifyContent: "center" }}>
    {items.map((it) => (
      <div
        key={it.bit}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: typeTokens.small,
          fontWeight: 800,
          color: palette.ink,
        }}
      >
        <span
          style={{
            fontFamily: typeTokens.numeral,
            fontWeight: 900,
            color: "#fff",
            background: it.color,
            width: 28,
            height: 28,
            borderRadius: 8,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {it.bit}
        </span>
        {it.label}
      </div>
    ))}
  </div>
);
