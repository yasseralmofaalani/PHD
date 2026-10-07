import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "../../ui/RevealItem";
import { useStepReveal } from "../../../hooks/useStepReveal";
import { alpha } from "../../design/tokens";

/* ───────────────────────── Visual language ───────────────────────── */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const C = {
  teal: "#428177",
  tealDeep: "#2c5952",
  maroon: "#6b1f2a",
  green: "#2e7d5b",
  gold: "#c8951a",
  red: "#b03a2e",
  ink: "#0f172a",
  inkSoft: "rgba(15, 23, 42, 0.68)",
  inkMuted: "rgba(15, 23, 42, 0.45)",
  paper: "#f4f2ea",
  card: "#ffffff",
  hair: "rgba(15, 23, 42, 0.10)",
  night: "#0c1618",
  nightSoft: "#14262a",
  cyan: "#4fb8ab",
  nightInk: "#0f172a",
  nightInkSoft: "rgba(15, 23, 42, 0.68)",
  huawei: "#c0392b",
  ericsson: "#1f5fa8",
  g2: "#7e57c2",
  g3: "#43a047",
  g4: "#1e88e5",
} as const;

/** Fixed algorithm colors — never swap these across slides. */
export const ALG = {
  bpso: { color: C.teal, name: "BPSO", ar: "سرب الجسيمات الثنائي" },
  aga: { color: C.maroon, name: "AGA", ar: "الخوارزمية الجينية التكيفية" },
  stdGa: { color: "#8a9298", name: "Standard GA", ar: "جينية تقليدية" },
  random: { color: "#b8bec3", name: "Random", ar: "اختيار عشوائي" },
} as const;

export type ContribId = 0 | 1 | 2 | 3;

export const THEME: Record<ContribId, { main: string; second: string; label: string; code: string; dark: boolean }> = {
  0: { main: C.teal, second: C.maroon, label: "المساهمات البحثية", code: "03", dark: false },
  1: { main: C.teal, second: C.gold, label: "محرك التحسين الذكي", code: "01", dark: false },
  2: { main: C.maroon, second: C.green, label: "العدالة المكانية", code: "02", dark: false },
  3: { main: C.cyan, second: C.gold, label: "التحكم التشغيلي متعدد الموردين", code: "03", dark: false },
};

/* ───────────────────────── Beats ───────────────────────── */

export const useBeats = (total: number) => useStepReveal({ totalSteps: total, initialStep: 1 });

/** Renders children once `step >= at`. */
export const Show: React.FC<{
  step: number;
  at: number;
  until?: number;
  from?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ step, at, until, from = "up", delay = 0, style, children }) => {
  const visible = step >= at && (until === undefined || step < until);
  const offset =
    from === "up" ? { y: 16 } : from === "down" ? { y: -16 } : from === "left" ? { x: -22 } : from === "right" ? { x: 22 } : from === "scale" ? { scale: 0.9 } : {};
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, ...offset }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
          transition={{ duration: 0.5, delay, ease: EASE }}
          style={style}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** SVG variant of Show. */
export const ShowG: React.FC<{ step: number; at: number; until?: number; delay?: number; children: React.ReactNode }> = ({
  step,
  at,
  until,
  delay = 0,
  children,
}) => {
  const visible = step >= at && (until === undefined || step < until);
  return (
    <AnimatePresence>
      {visible && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }} transition={{ duration: 0.5, delay, ease: EASE }}>
          {children}
        </motion.g>
      )}
    </AnimatePresence>
  );
};

/* ───────────────────────── Stage ───────────────────────── */

interface ContribStageProps {
  contribution: ContribId;
  title: string;
  beats?: string[];
  step?: number;
  goNext?: () => boolean;
  goToStep?: (s: number) => void;
  source?: string;
  hideHeader?: boolean;
  children: React.ReactNode;
}

export const ContribStage: React.FC<ContribStageProps> = ({
  contribution,
  title,
  beats,
  step = 1,
  goNext,
  goToStep,
  source,
  hideHeader,
  children,
}) => {
  const theme = THEME[contribution];
  const dark = theme.dark;
  const beat = beats ? beats[Math.max(0, Math.min(step, beats.length) - 1)] : undefined;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext?.();
  };

  const background = "transparent";

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleClick}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(10px, 1.4vh, 16px) clamp(16px, 2vw, 28px)",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        color: dark ? C.nightInk : C.ink,
        background,
        cursor: goNext ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {!hideHeader && (
        <header style={{ position: "relative", zIndex: 5, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: 12, minWidth: 0 }}>
            <div style={{ width: 5, borderRadius: 4, background: `linear-gradient(180deg, ${theme.main}, ${theme.second})` }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 19, fontWeight: 800, color: dark ? C.nightInkSoft : C.inkSoft }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    color: dark ? C.night : "#fff",
                    background: theme.main,
                    borderRadius: 6,
                    padding: "1px 8px",
                  }}
                >
                  {contribution === 0 ? "C" : `0${contribution}`}
                </span>
                <span>{contribution === 0 ? theme.label : `المساهمة ${contribution === 1 ? "الأولى" : contribution === 2 ? "الثانية" : "الثالثة"} · ${theme.label}`}</span>
              </div>
              <h1
                style={{
                  margin: "2px 0 0",
                  fontSize: "clamp(28.8px, 3.05vw, 40.1px)",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: dark ? C.nightInk : C.ink,
                }}
              >
                {title}
              </h1>
            </div>
          </div>

          {beats && beats.length > 1 && (
            <div data-no-advance="true" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, paddingTop: 6 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={beat}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  style={{
                    fontSize: 18.6,
                    fontWeight: 800,
                    color: theme.main,
                    background: alpha(theme.main === C.cyan ? "#4fb8ab" : theme.main, dark ? 0.16 : 0.1),
                    borderRadius: 999,
                    padding: "4px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {beat}
                </motion.span>
              </AnimatePresence>
              <StepIndicator totalSteps={beats.length} currentStep={step} onStepClick={goToStep} />
            </div>
          )}
        </header>
      )}

      <main style={{ position: "relative", zIndex: 4, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", marginTop: hideHeader ? 0 : 10, marginBottom: source ? 16 : 0 }}>
        {children}
      </main>

      {source && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "clamp(24px, 2.8vw, 44px)",
            zIndex: 6,
            fontSize: 18,
            fontWeight: 700,
            color: dark ? C.nightInkSoft : C.inkMuted,
          }}
        >
         {source}
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── Numbers ───────────────────────── */

export const useCountUp = (target: number, active: boolean, decimals = 0, duration = 1100): string => {
  const [value, setValue] = useState(active ? 0 : target);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

export const CountUp: React.FC<{ value: number; decimals?: number; active?: boolean; prefix?: string; suffix?: string }> = ({
  value,
  decimals = 0,
  active = true,
  prefix = "",
  suffix = "",
}) => {
  const v = useCountUp(value, active, decimals);
  return (
    <span dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
};

export const KpiTile: React.FC<{
  label: string;
  value: React.ReactNode;
  unit?: string;
  color?: string;
  note?: string;
  dark?: boolean;
  big?: boolean;
  style?: React.CSSProperties;
}> = ({ label, value, unit, color = C.teal, note, dark, big, style }) => (
  <div
    style={{
      background: dark ? "rgba(255,255,255,0.05)" : C.card,
      border: `1px solid ${dark ? "rgba(255,255,255,0.10)" : C.hair}`,
      borderTop: `3px solid ${color}`,
      borderRadius: 14,
      padding: big ? "14px 18px" : "10px 14px",
      boxShadow: dark ? "none" : "0 8px 24px rgba(15,23,42,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      ...style,
    }}
  >
    <div style={{ fontSize: 19, fontWeight: 800, color: dark ? C.nightInkSoft : C.inkSoft }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 6, direction: "ltr", justifyContent: "flex-end" }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: big ? "clamp(34px, 3.4vw, 50px)" : "clamp(24px, 2.2vw, 32px)", color, lineHeight: 1.05 }}>
        {value}
      </span>
      {unit && <span style={{ fontSize: 19.3, fontWeight: 800, color: dark ? C.nightInkSoft : C.inkSoft }}>{unit}</span>}
    </div>
    {note && <div style={{ fontSize: 19, fontWeight: 700, color: dark ? C.nightInkSoft : C.inkMuted }}>{note}</div>}
  </div>
);

/** A short centered statement used as a slide's single message. */
export const Message: React.FC<{ children: React.ReactNode; color?: string; dark?: boolean; size?: string }> = ({ children, color, dark, size }) => (
  <div
    style={{
      textAlign: "center",
      fontSize: size ?? "clamp(18px, 1.7vw, 24px)",
      fontWeight: 900,
      color: color ?? (dark ? C.nightInk : C.ink),
      lineHeight: 1.4,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{ children: React.ReactNode; color?: string; solid?: boolean; dark?: boolean; style?: React.CSSProperties }> = ({
  children,
  color = C.teal,
  solid,
  dark,
  style,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 12px",
      borderRadius: 999,
      fontSize: 19,
      fontWeight: 800,
      color: solid ? "#fff" : color,
      background: solid ? color : dark ? "rgba(255,255,255,0.06)" : alpha(color.startsWith("#") ? color : "#428177", 0.1),
      border: `1px solid ${solid ? color : alpha(color.startsWith("#") ? color : "#428177", 0.3)}`,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

/** Inline formula block — LTR, monospace-free, readable from the back of the room. */
export const Formula: React.FC<{ children: React.ReactNode; color?: string; dark?: boolean; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = C.ink,
  dark,
  size = 22,
  style,
}) => (
  <div
    dir="ltr"
    style={{
      fontFamily: "'Cambria Math', 'Times New Roman', serif",
      fontSize: size,
      fontWeight: 600,
      color: dark ? C.nightInk : color,
      background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)",
      border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : C.hair}`,
      borderRadius: 12,
      padding: "10px 18px",
      textAlign: "center",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ───────────────────────── SVG helpers ───────────────────────── */

export const T: React.FC<{
  x: number;
  y: number;
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  latin?: boolean;
  opacity?: number;
  children: React.ReactNode;
}> = ({ x, y, size = 14, weight = 800, fill = C.ink, anchor = "middle", latin, opacity, children }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    dominantBaseline="middle"
    fontSize={size}
    fontWeight={weight}
    fill={fill}
    opacity={opacity}
    fontFamily={latin ? "Inter, sans-serif" : "Cairo, sans-serif"}
    direction={latin ? "ltr" : "rtl"}
  >
    {children}
  </text>
);

export const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: React.ReactNode;
  sub?: React.ReactNode;
  color?: string;
  solid?: boolean;
  dark?: boolean;
  size?: number;
  dashed?: boolean;
  glow?: boolean;
  opacity?: number;
}> = ({ x, y, w, h, label, sub, color = C.teal, solid, dark, size = 15, dashed, glow, opacity = 1 }) => {
  const ink = solid ? "#fff" : dark ? C.nightInk : C.ink;
  const soft = solid ? "rgba(255,255,255,0.88)" : dark ? C.nightInkSoft : C.inkSoft;
  return (
    <g opacity={opacity}>
      {glow && (
        <rect
          x={x - w / 2 - 5}
          y={y - h / 2 - 5}
          width={w + 10}
          height={h + 10}
          rx={16}
          fill="none"
          stroke={color}
          strokeOpacity={0.35}
          strokeWidth={6}
        />
      )}
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={11}
        fill={solid ? color : dark ? "rgba(255,255,255,0.05)" : "#ffffff"}
        stroke={color}
        strokeWidth={1.6}
        strokeDasharray={dashed ? "6 4" : undefined}
      />
      <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h} style={{ overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: sub ? 2 : 0,
            padding: "4px 10px",
            boxSizing: "border-box",
            textAlign: "center",
            direction: "rtl",
            fontFamily: "Cairo, sans-serif",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: size,
              fontWeight: 900,
              lineHeight: 1.25,
              color: ink,
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {label}
          </div>
          {sub ? (
            <div
              style={{
                fontSize: Math.max(11, size - 3),
                fontWeight: 700,
                lineHeight: 1.3,
                color: soft,
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              {sub}
            </div>
          ) : null}
        </div>
      </foreignObject>
    </g>
  );
};

/** Path that draws itself in. */
export const Draw: React.FC<{
  d: string;
  color?: string;
  width?: number;
  dashed?: boolean;
  delay?: number;
  duration?: number;
  arrow?: string;
  opacity?: number;
}> = ({ d, color = C.teal, width = 2, dashed, delay = 0, duration = 0.7, arrow, opacity = 1 }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray={dashed ? "6 5" : undefined}
    markerEnd={arrow ? `url(#${arrow})` : undefined}
    opacity={opacity}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration, delay, ease: EASE }}
  />
);

export const ArrowDefs: React.FC<{ colors: Record<string, string> }> = ({ colors }) => (
  <defs>
    {Object.entries(colors).map(([id, color]) => (
      <marker key={id} id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={color} />
      </marker>
    ))}
  </defs>
);

/** A dot travelling along a path, forever. */
export const Pulse: React.FC<{ d: string; color?: string; r?: number; dur?: number; begin?: number }> = ({ d, color = C.gold, r = 5, dur = 2.2, begin = 0 }) => (
  <circle r={r} fill={color} opacity={0.95}>
    <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} begin={`${begin}s`} />
  </circle>
);

/* ───────────────────────── Syria geometry ───────────────────────── */

/** Simplified national outline in the shared 1000×520 GIS canvas. */
export const SYRIA_OUTLINE =
  "M 733.5 46 L 732.8 45.5 L 734.1 42.3 L 732.9 42.1 L 731 45.5 L 726.9 48.6 L 724.4 52.1 L 714.5 57.1 L 698.2 61.1 L 690.3 61.6 L 683 64.2 L 662.5 64.6 L 657.4 66.2 L 653.7 63.5 L 637.1 60.4 L 632.3 60.5 L 629.6 62.1 L 627.5 60.9 L 624.5 60.8 L 606.7 69.7 L 598.5 71.4 L 581.2 82.8 L 572 85.4 L 569.4 87.7 L 553.5 95.3 L 544.6 96.4 L 540.2 98.1 L 527.6 100.4 L 516.4 101.4 L 507.2 103.8 L 491.6 100.2 L 478.4 100.8 L 469.8 99.8 L 457.1 87.4 L 445.4 82.1 L 433.7 80.4 L 429 81.1 L 419.9 85.6 L 417.7 88.4 L 412.8 89.4 L 398.8 95.9 L 394.5 95.8 L 388.6 97.5 L 374.9 106.3 L 359.5 103.8 L 353.1 104.9 L 350.2 103.9 L 348.4 104.3 L 347 107.4 L 346 107.7 L 341.3 104.2 L 343.4 98.2 L 340.6 97 L 338.5 94.8 L 335 92.8 L 331.8 93.2 L 324.4 91.2 L 314.5 86.9 L 314.9 90 L 311 95.1 L 311.8 100 L 308.1 106.5 L 309 113.5 L 307.8 117.1 L 305.4 119.6 L 308.2 128.9 L 310.8 129.8 L 311.1 133 L 309.6 135.2 L 314 135.2 L 314.3 137.8 L 316.5 138.8 L 315.9 140.2 L 317 142.2 L 316.6 143.2 L 310.7 145.8 L 304.6 143.8 L 301.1 144.2 L 299.3 147.2 L 293.7 145.2 L 294 148 L 292.1 150.2 L 293.3 152.8 L 292.5 155.2 L 293.7 158.2 L 292.3 166 L 289.7 166.8 L 287.6 165.7 L 286.1 167.1 L 286.5 170 L 281.9 169.5 L 279.6 170.8 L 277.4 175.2 L 277.8 179 L 276.5 183.3 L 272.5 178.6 L 265.2 177.2 L 265.4 173.1 L 264.4 171.6 L 258.9 173.6 L 257.8 172.5 L 254.7 178.3 L 252.1 179.9 L 249.2 179.5 L 250.2 180.1 L 252.6 189.5 L 249.1 195.3 L 247 196.5 L 247.6 202 L 246.6 202 L 245.5 204.1 L 243.1 204.7 L 244.8 204.6 L 244.4 206.5 L 247.2 208.8 L 246.6 211.9 L 249.8 212.1 L 258 219.6 L 258.3 233.3 L 260.2 233.4 L 261.6 234.9 L 260.4 233.7 L 258.9 234.3 L 260.9 240.2 L 258.6 242.6 L 258.5 244.5 L 256 248.8 L 255.5 253.3 L 256.5 257.7 L 255.2 259.5 L 254.7 267 L 262.2 291.4 L 263 290.8 L 266.2 292.9 L 268.3 292.2 L 270.7 292.8 L 273 291.6 L 276.6 292.9 L 278 292 L 280.6 293.1 L 282.1 292.2 L 284.7 292.9 L 286.1 292.3 L 286.5 289.2 L 288.3 287.7 L 289.7 288.2 L 292.2 292.3 L 295.9 294.1 L 298.7 292.2 L 298.1 296.3 L 296.5 296.3 L 295.9 295.1 L 294.4 294.8 L 294.1 297.1 L 295.1 299.2 L 288.8 302.5 L 288.7 304 L 291.5 304.8 L 295.1 303.6 L 297.5 304 L 297.4 306 L 298.7 308 L 305.4 311.8 L 305.3 314.5 L 303.7 316.4 L 306.2 321.5 L 309.1 322.5 L 307.1 325.3 L 308.1 329.7 L 310.9 331.9 L 308.5 333.5 L 306.5 336.4 L 306.8 337.6 L 302.4 341.7 L 301.8 345.2 L 302.8 346.2 L 301.5 345.8 L 301.1 347.8 L 300.6 345.8 L 299.8 346.7 L 295.8 345.3 L 295.1 346.5 L 294 346.5 L 294.4 347.8 L 293.2 347.6 L 292.7 349.4 L 288.3 353.2 L 285.4 357.8 L 285.1 359.1 L 287.2 359.9 L 288 361.5 L 291.4 361.9 L 293.1 363.9 L 293.1 365.6 L 291.4 366.8 L 282.2 363.6 L 281.6 365.2 L 278.9 365.9 L 276.9 365.5 L 275.3 363.6 L 271.9 366.5 L 270.3 367.1 L 269 366.5 L 267.2 370.2 L 266 371.7 L 264.8 371.3 L 263.2 375.4 L 261.6 376.7 L 261.3 379.6 L 258.5 382.2 L 259.4 383.4 L 262 383.2 L 263.5 385 L 265.4 385.3 L 268.2 387.8 L 268.3 389.2 L 266 391.9 L 262.1 392.3 L 259.3 393.9 L 259.9 398.1 L 256 401.7 L 250.6 404.9 L 249.7 408.6 L 244.5 411.5 L 242.4 411.3 L 241.8 413.2 L 238.1 416 L 236.8 415.5 L 235.1 416.3 L 235.3 418.9 L 237.4 418.2 L 239.9 418.9 L 238.6 420.4 L 238.9 427 L 237.6 429.6 L 235.9 438.5 L 235.6 448.7 L 234.6 449.7 L 236.9 452.9 L 236.9 457.8 L 237.7 458 L 238.3 460.8 L 236.1 468.9 L 236.9 469.7 L 238.4 469.4 L 241.7 465.7 L 248.7 462.3 L 249.1 464.1 L 250.8 465 L 254.5 464.5 L 258.9 465.5 L 260.1 467.4 L 262.4 468.5 L 261.7 470.3 L 266.5 471.8 L 266.3 476 L 269 478.8 L 270.6 484 L 277.2 484 L 279.2 483.1 L 294.6 496.1 L 299.9 496.9 L 301.6 498.1 L 315.9 500 L 316.8 501.1 L 318.2 500.5 L 326.7 502 L 329.3 499.5 L 474.4 407 L 641.9 312 L 651.4 289.6 L 658.9 278.5 L 657.4 246.5 L 658.1 238.4 L 661.7 223.2 L 662.2 213.8 L 670.7 200.5 L 669.7 181.4 L 660.4 161 L 662.7 143.8 L 663.1 132.8 L 671.9 117.1 L 703.4 110.5 L 711.7 103.3 L 726.8 85.2 L 745.4 65.9 L 745.2 64.6 L 743.1 63 L 743.3 59.4 L 741.8 55.7 L 742 53.3 L 743.4 51.6 L 742.8 49.8 L 739.5 47.5 L 738.6 45.6 L 737.2 46.6 L 733.5 46 Z";

const OUTLINE_PTS: Array<[number, number]> = SYRIA_OUTLINE.replace(/[MLZ]/g, " ")
  .trim()
  .split(/\s+/)
  .reduce<Array<[number, number]>>((acc, v, i, arr) => {
    if (i % 2 === 0) acc.push([parseFloat(v), parseFloat(arr[i + 1])]);
    return acc;
  }, []);

export const insideSyria = (x: number, y: number): boolean => {
  let inside = false;
  for (let i = 0, j = OUTLINE_PTS.length - 1; i < OUTLINE_PTS.length; j = i++) {
    const [xi, yi] = OUTLINE_PTS[i];
    const [xj, yj] = OUTLINE_PTS[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

export const CITIES = [
  { id: "damascus", name: "دمشق", x: 286, y: 395, w: 1 },
  { id: "aleppo", name: "حلب", x: 351, y: 147, w: 0.9 },
  { id: "homs", name: "حمص", x: 318, y: 283, w: 0.6 },
  { id: "hama", name: "حماة", x: 321, y: 247, w: 0.45 },
  { id: "latakia", name: "اللاذقية", x: 252, y: 210, w: 0.5 },
  { id: "tartus", name: "طرطوس", x: 259, y: 268, w: 0.35 },
  { id: "idlib", name: "إدلب", x: 312, y: 173, w: 0.35 },
  { id: "daraa", name: "درعا", x: 272, y: 475, w: 0.3 },
  { id: "suwayda", name: "السويداء", x: 306, y: 467, w: 0.25 },
  { id: "raqqa", name: "الرقة", x: 491, y: 170, w: 0.3 },
  { id: "deir", name: "دير الزور", x: 576, y: 228, w: 0.35 },
  { id: "hasakah", name: "الحسكة", x: 622, y: 119, w: 0.35 },
] as const;

const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export type MapSite = { x: number; y: number; urban: boolean; region: number };

/** Deterministic illustrative site cloud: dense around cities, sparse elsewhere. */
export const makeSites = (count: number, seed = 7, urbanShare = 0.62): MapSite[] => {
  const r = rng(seed);
  const out: MapSite[] = [];
  let guard = 0;
  while (out.length < count && guard < count * 40) {
    guard++;
    const urban = r() < urbanShare;
    let x: number;
    let y: number;
    let region: number;
    if (urban) {
      const pick = r() * CITIES.reduce((a, c) => a + c.w, 0);
      let acc = 0;
      let ci = 0;
      for (let k = 0; k < CITIES.length; k++) {
        acc += CITIES[k].w;
        if (pick <= acc) {
          ci = k;
          break;
        }
      }
      const c = CITIES[ci];
      const rad = 6 + r() * 20;
      const a = r() * Math.PI * 2;
      x = c.x + Math.cos(a) * rad;
      y = c.y + Math.sin(a) * rad * 0.8;
      region = ci;
    } else {
      x = 236 + r() * 508;
      y = 44 + r() * 456;
      let best = 0;
      let bd = Infinity;
      CITIES.forEach((c, k) => {
        const d = (c.x - x) ** 2 + (c.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = k;
        }
      });
      region = best;
    }
    if (insideSyria(x, y)) out.push({ x, y, urban, region });
  }
  return out;
};

export const useSites = (count: number, seed?: number, urbanShare?: number) => useMemo(() => makeSites(count, seed, urbanShare), [count, seed, urbanShare]);

/** Syria outline layer with optional hex texture. Render inside an <svg viewBox="0 0 1000 520">. */
export const SyriaBase: React.FC<{ dark?: boolean; color?: string; labels?: boolean; idSuffix?: string; fillOpacity?: number }> = ({
  dark,
  color = C.teal,
  labels,
  idSuffix = "a",
  fillOpacity,
}) => (
  <g>
    <defs>
      <pattern id={`hex-${idSuffix}`} width="22" height="38.1" patternUnits="userSpaceOnUse">
        <path
          d="M11 0 L22 6.35 L22 19.05 L11 25.4 L0 19.05 L0 6.35 Z"
          fill="none"
          stroke={dark ? "rgba(79,184,171,0.14)" : alpha(color, 0.12)}
          strokeWidth="0.8"
        />
      </pattern>
    </defs>
    <path d={SYRIA_OUTLINE} fill={dark ? "rgba(79,184,171,0.06)" : alpha(color, fillOpacity ?? 0.06)} stroke={dark ? "rgba(79,184,171,0.55)" : alpha(color, 0.55)} strokeWidth={2} strokeLinejoin="round" />
    <path d={SYRIA_OUTLINE} fill={`url(#hex-${idSuffix})`} />
    {labels &&
      CITIES.map((c) => (
        <T key={c.id} x={c.x} y={c.y - 16} size={11} weight={800} fill={dark ? "rgba(238,243,241,0.78)" : C.inkSoft}>
          {c.name}
        </T>
      ))}
  </g>
);

/** Hexagon polygon points. */
export const hexPts = (cx: number, cy: number, r: number): string =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
