import React from "react";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";

export type SpineStep = {
  label: string;
  sub?: string;
  accent?: boolean;
};

/** Horizontal scientific spine — Standard → Adaptation → Algorithm → Repair → Data. */
export const AlgoAdaptationSpine: React.FC<{
  steps: SpineStep[];
  color?: string;
}> = ({ steps, color = palette.primary }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      gap: 0,
      position: "relative",
      padding: `${space.sm}px 0 ${space.xs}px`,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "5%",
        right: "5%",
        height: 3,
        borderRadius: 99,
        background: `linear-gradient(90deg, ${alpha(color, 0.2)}, ${color}, ${alpha(palette.accent, 0.7)})`,
        zIndex: 0,
      }}
    />
    {steps.map((s, i) => {
      const hot = !!s.accent;
      const c = hot ? palette.accent : color;
      return (
        <div
          key={`${s.label}-${i}`}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            textAlign: "center",
            padding: "0 4px",
          }}
        >
          <div
            style={{
              width: hot ? 30 : 24,
              height: hot ? 30 : 24,
              borderRadius: "50%",
              background: c,
              color: "#fff",
              fontFamily: typeTokens.numeral,
              fontWeight: 900,
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: hot
                ? `0 0 0 4px ${alpha(c, 0.22)}, 0 6px 14px ${alpha(c, 0.35)}`
                : `0 0 0 3px ${alpha(c, 0.16)}`,
            }}
          >
            {i + 1}
          </div>
          <div
            style={{
              fontSize: typeTokens.micro,
              fontWeight: 900,
              color: palette.ink,
              lineHeight: 1.25,
            }}
          >
            {s.label}
          </div>
          {s.sub && (
            <div
              dir="ltr"
              style={{
                fontFamily: typeTokens.numeral,
                fontSize: 10,
                fontWeight: 800,
                color: alpha(c, 0.95),
                letterSpacing: "0.2px",
              }}
            >
              {s.sub}
            </div>
          )}
        </div>
      );
    })}
  </div>
);
