import React from "react";
import { motion } from "framer-motion";
import { C, EASE } from "./stage";

const PRIMARY = C.teal;
const ACCENT = C.maroon;

export function DataMark() {
  const nodes = [
    [22, 48],
    [48, 22],
    [78, 40],
    [64, 68],
    [34, 72],
  ] as const;
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      <path d="M22 48 L48 22 L78 40 L64 68 L34 72 Z" fill="none" stroke={PRIMARY} strokeWidth="1.5" />
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={i === 1 ? 5 : 3.4}
          fill={i === 1 ? PRIMARY : "#fff"}
          stroke={PRIMARY}
          strokeWidth="1.6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 0.08 * i, ease: EASE }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  );
}

export function GisMark() {
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={18 + i * 6}
          y={18 + i * 10}
          width={64}
          height={38}
          rx="6"
          fill={i === 2 ? PRIMARY : "#fff"}
          stroke={PRIMARY}
          strokeWidth="1.6"
          opacity={i === 2 ? 1 : 0.55 + i * 0.15}
          initial={{ y: 18 + i * 10 + 10, opacity: 0 }}
          animate={{ y: 18 + i * 10, opacity: i === 2 ? 1 : 0.55 + i * 0.15 }}
          transition={{ duration: 0.45, delay: 0.1 * i, ease: EASE }}
        />
      ))}
      <path d="M36 48 L48 36 L62 42 L70 34" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AlgoMark() {
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      <circle cx="50" cy="44" r="16" fill="none" stroke={PRIMARY} strokeWidth="1.6" strokeDasharray="3 3" />
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <motion.circle
            key={deg}
            cx={50 + Math.cos(a) * 26}
            cy={44 + Math.sin(a) * 22}
            r="4"
            fill={i % 2 ? ACCENT : PRIMARY}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.35, ease: EASE }}
          />
        );
      })}
      <circle cx="50" cy="44" r="6" fill={PRIMARY} />
    </svg>
  );
}

export function ExperimentMark() {
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      <path d="M38 16 H62 M42 16 V30 L28 68 H72 L58 30 V16" fill="none" stroke={PRIMARY} strokeWidth="1.7" strokeLinejoin="round" />
      <motion.path
        d="M34 58 H66 L58 38 H42 Z"
        fill={PRIMARY}
        opacity="0.22"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 0.6 }}
      />
      <circle cx="48" cy="50" r="2.2" fill={PRIMARY} />
      <circle cx="58" cy="56" r="1.8" fill={ACCENT} />
    </svg>
  );
}

export function StatsMark() {
  const hs = [18, 32, 24, 40];
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      <path d="M18 70 H82" stroke={PRIMARY} strokeWidth="1.5" />
      {hs.map((h, i) => (
        <motion.rect
          key={h}
          x={24 + i * 16}
          y={70 - h}
          width="10"
          height={h}
          rx="2"
          fill={i === 3 ? PRIMARY : i === 2 ? ACCENT : "#fff"}
          stroke={PRIMARY}
          strokeWidth="1.3"
          initial={{ height: 0, y: 70 }}
          animate={{ height: h, y: 70 - h }}
          transition={{ duration: 0.45, delay: 0.1 * i, ease: EASE }}
        />
      ))}
    </svg>
  );
}

export function ResultsMark() {
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      {[
        [28, PRIMARY],
        [50, ACCENT],
        [72, C.gold],
      ].map(([x, color], i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="44"
          r="14"
          fill="#fff"
          stroke={color as string}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.12 * i, duration: 0.4, ease: EASE }}
        />
      ))}
    </svg>
  );
}

export function PapersMark() {
  return (
    <svg width="96" height="72" viewBox="0 0 100 86" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.g key={i} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 * i, duration: 0.4 }}>
          <rect x={28 + i * 8} y={16 + i * 6} width="40" height="52" rx="4" fill="#fff" stroke={i === 2 ? C.gold : PRIMARY} strokeWidth="1.6" />
          {[0, 1, 2].map((l) => (
            <rect key={l} x={34 + i * 8} y={26 + i * 6 + l * 10} width={l === 2 ? 16 : 28} height="4" rx="2" fill={i === 2 ? C.gold : PRIMARY} opacity="0.35" />
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

export const METHOD_MARKS = [DataMark, GisMark, AlgoMark, ExperimentMark, StatsMark, ResultsMark, PapersMark] as const;

export function Plate({
  active,
  children,
  tone = PRIMARY,
  gold,
}: {
  active: boolean;
  children: React.ReactNode;
  tone?: string;
  gold?: boolean;
}) {
  return (
    <div
      style={{
        background: gold ? "rgba(200,149,26,0.12)" : "rgba(255,255,255,0.94)",
        border: active ? `1.5px solid ${tone}` : "1px solid rgba(66, 129, 119, 0.22)",
        borderRadius: 18,
        padding: "10px 14px 12px",
        boxShadow: active ? `0 10px 28px ${gold ? "rgba(200,149,26,0.18)" : "rgba(66, 129, 119, 0.12)"}` : "0 6px 18px rgba(0,0,0,0.045)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        minWidth: 148,
      }}
    >
      {children}
    </div>
  );
}

export function IndexMark({ n, color }: { n: string; color: string }) {
  return (
    <span
      style={{
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: "0.12em",
        color,
        fontFamily: "Inter, Cairo, sans-serif",
      }}
    >
      {n}
    </span>
  );
}

export function StationTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 21.8,
        fontWeight: 900,
        color: "#111111",
        fontFamily: "Cairo, sans-serif",
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}
