// ============================================================
//  LayeredStackDiagram — 3D-looking stacked layers.
//
//  A single composition (not three cards). Each layer is a
//  perspective slab that lifts into place, connected by a
//  vertical "loop" ribbon on the trailing edge showing the
//  MONITOR / OPTIMIZE / CONTROL closed feedback loop.
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { layerLift, t } from "../../design/motion";

export interface StackLayer {
  code: string;              // "T1" / "T2" / "T3"
  titleAr: string;
  titleEn?: string;
  description: string;
  keyTech?: string;
  icon: LucideIcon;
  color?: string;
  emphasized?: boolean;
}

interface LayeredStackDiagramProps {
  /** Layers ordered from foundation (bottom) → apex (top). */
  layers: StackLayer[];
  /** Optional loop labels (rendered on the trailing edge as a ribbon). */
  loop?: string[];
  /** Overall title of the loop (small caption). */
  loopTitle?: string;
}

export const LayeredStackDiagram: React.FC<LayeredStackDiagramProps> = ({
  layers,
  loop,
  loopTitle,
}) => {
  const shouldReduce = useReducedMotion();
  // Render from apex (top) downwards for reading order, but keep the semantic
  // "foundation → apex" ordering in the array to match how the thesis is described.
  const rendered = [...layers].reverse();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: space.md,
        perspective: 1400,
      }}
    >
      {/* The stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: space.md,
          justifyContent: "center",
          transformStyle: "preserve-3d",
        }}
      >
        {rendered.map((layer, i) => (
          <motion.div
            key={layer.code}
            variants={layerLift(i)}
            initial={shouldReduce ? undefined : "hidden"}
            animate="visible"
            style={{
              // The perspective tilt is what gives the 3D stacking feel.
              transform: `rotateX(6deg) translateZ(${(rendered.length - i) * 6}px)`,
              transformOrigin: "50% 50%",
              width: `${Math.max(64, 100 - i * 5)}%`,
              marginInline: "auto",
              background: layer.emphasized
                ? `linear-gradient(135deg, ${alpha(palette.accent, 0.10)} 0%, #ffffff 50%, ${alpha(palette.accent, 0.10)} 100%)`
                : `linear-gradient(135deg, ${alpha(layer.color ?? palette.primary, 0.08)} 0%, #ffffff 50%, ${alpha(layer.color ?? palette.primary, 0.08)} 100%)`,
              border: `1.5px solid ${alpha(layer.color ?? palette.primary, 0.45)}`,
              borderRadius: 14,
              padding: `${space.md}px ${space.lg}px`,
              boxShadow: `0 ${8 + i * 4}px ${18 + i * 6}px rgba(15, 23, 42, 0.10)`,
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: space.md,
            }}
          >
            <LayerHead layer={layer} />
            <LayerBody layer={layer} />
            {layer.keyTech && <LayerTech layer={layer} />}
          </motion.div>
        ))}
      </div>

      {/* Closed loop ribbon (trailing edge) */}
      {loop && loop.length > 0 && (
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0.94, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={t.quick}
          style={{
            width: 68,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: `${space.md}px 6px`,
            background: `linear-gradient(180deg, ${alpha(palette.primary, 0.05)} 0%, ${alpha(palette.accent, 0.05)} 100%)`,
            borderRadius: 12,
            border: `1px solid ${alpha(palette.primary, 0.22)}`,
          }}
        >
          {loopTitle && (
            <div
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: typeTokens.micro,
                fontWeight: 900,
                letterSpacing: "1.4px",
                color: palette.inkSoft,
                textTransform: "uppercase",
              }}
            >
              {loopTitle}
            </div>
          )}
          {loop.map((label, i) => (
            <React.Fragment key={label}>
              <div
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: 12,
                  fontWeight: 900,
                  color:
                    i === 0
                      ? palette.primary
                      : i === loop.length - 1
                        ? palette.accent
                        : palette.ink,
                  padding: "6px 2px",
                  background: "#ffffff",
                  borderRadius: 6,
                  border: `1px solid ${alpha(palette.primary, 0.25)}`,
                  letterSpacing: "1.2px",
                }}
              >
                {label}
              </div>
              {i < loop.length - 1 && (
                <span
                  style={{
                    fontSize: 12,
                    color: palette.inkMuted,
                    fontWeight: 900,
                  }}
                >
                  ↻
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const LayerHead: React.FC<{ layer: StackLayer }> = ({ layer }) => {
  const Icon = layer.icon;
  const color = layer.color ?? palette.primary;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: space.sm }}>
      <span
        style={{
          background: color,
          color: "#ffffff",
          fontFamily: typeTokens.numeral,
          fontSize: 12,
          fontWeight: 900,
          padding: "3px 10px",
          borderRadius: 6,
          letterSpacing: "0.6px",
        }}
      >
        {layer.code}
      </span>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: alpha(color, 0.14),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={18} color={color} />
      </div>
    </div>
  );
};

const LayerBody: React.FC<{ layer: StackLayer }> = ({ layer }) => (
  <div style={{ textAlign: "right", minWidth: 0 }}>
    <div
      style={{
        fontSize: typeTokens.h3,
        fontWeight: 900,
        color: palette.ink,
        lineHeight: 1.25,
      }}
    >
      {layer.titleAr}
    </div>
    {layer.titleEn && (
      <div
        dir="ltr"
        style={{
          fontFamily: typeTokens.numeral,
          fontSize: typeTokens.micro,
          fontWeight: 700,
          color: alpha(palette.ink, 0.5),
          letterSpacing: "1.2px",
          textAlign: "right",
          marginBottom: 2,
        }}
      >
        {layer.titleEn}
      </div>
    )}
    <p
      style={{
        margin: 0,
        fontSize: typeTokens.small,
        fontWeight: 600,
        color: palette.inkSoft,
        lineHeight: 1.55,
      }}
    >
      {layer.description}
    </p>
  </div>
);

const LayerTech: React.FC<{ layer: StackLayer }> = ({ layer }) => {
  const color = layer.color ?? palette.primary;
  return (
    <div
      style={{
        background: alpha(color, 0.10),
        border: `1.5px solid ${alpha(color, 0.4)}`,
        borderRadius: 8,
        padding: `${space.xs}px ${space.md}px`,
        fontFamily: typeTokens.numeral,
        fontSize: 12.5,
        fontWeight: 900,
        color,
        whiteSpace: "nowrap",
      }}
    >
      {layer.keyTech}
    </div>
  );
};
