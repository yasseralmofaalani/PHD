import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "../../ui/RevealItem";
import { alpha } from "../../design/tokens";
import { C, ContribStage, Pulse, Show, THEME, hexPts, useBeats } from "./kit";

/* ═════════════ The three contributions ═════════════ */

const PILLARS = [
  {
    n: "01",
    q: "أين نوجّه استثمار الترقية؟",
    title: "التخطيط والتحسين الذكي",
    tools: ["BPSO", "AGA", "إصلاح القيود"],
    color: C.teal,
    hint: "اختيار المواقع الصحيحة",
  },
  {
    n: "02",
    q: "كيف نضمن الإنصاف الجغرافي؟",
    title: "العدالة المكانية SFI",
    tools: ["مؤشر SFI", "قيد العدالة", "موازنة الأقاليم"],
    color: C.maroon,
    hint: "الحضر والريف بنفس الوزن",
  },
  {
    n: "03",
    q: "كيف نتحكم مكانياً بالخدمة؟",
    title: "التحكم التشغيلي متعدد الموردين",
    tools: ["GIS", "تنسيق الموردين", "عزل منطقي"],
    color: "#1f6f78",
    hint: "عزل دقيق دون إطفاء التغطية",
  },
] as const;

const FLOW = ["بيانات حقيقية", "قرار ترقية", "عدالة مكانية", "تحكم تشغيلي"] as const;

const hexAt = (cx: number, cy: number, r: number, angle: number, dist: number) => {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: cx + dist * Math.cos(a), y: cy + dist * Math.sin(a), r };
};

const EmblemPlan: React.FC<{ color: string; lit: boolean }> = ({ color, lit }) => {
  const c = { x: 100, y: 102 };
  const r = 27;
  const ring = Array.from({ length: 6 }, (_, i) => hexAt(c.x, c.y, r, i * 60, r * 1.72));
  const chosen = new Set([0, 2, 3]);
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="planGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity={lit ? 0.28 : 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={100} cy={100} r={92} fill="url(#planGlow)" />
      {ring.map((h, i) => (
        <polygon
          key={i}
          points={hexPts(h.x, h.y, h.r)}
          fill={chosen.has(i) ? `${color}33` : "rgba(15,23,42,0.03)"}
          stroke={chosen.has(i) ? color : "rgba(15,23,42,0.18)"}
          strokeWidth={chosen.has(i) ? 2.4 : 1.2}
        />
      ))}
      <polygon points={hexPts(c.x, c.y, r + 2)} fill={color} stroke={C.gold} strokeWidth={2.6} />
      <g transform={`translate(${c.x} ${c.y + 2})`} fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
        <rect x={-2.2} y={-11} width={4.4} height={16} rx={1} fill="#fff" stroke="none" />
        <path d="M-7 -2 H7" />
        <path d="M-5 3 H5" />
        <circle cx={0} cy={-13} r={2.6} fill={C.gold} stroke="none" />
      </g>
      {lit && (
        <motion.circle
          cx={c.x}
          cy={c.y}
          r={r + 10}
          fill="none"
          stroke={C.gold}
          strokeWidth={1.6}
          strokeDasharray="5 6"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${c.x}px ${c.y}px` }}
        />
      )}
    </svg>
  );
};

const EmblemFair: React.FC<{ color: string; lit: boolean }> = ({ color, lit }) => (
  <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="fairGlow" cx="50%" cy="42%" r="58%">
        <stop offset="0%" stopColor={color} stopOpacity={lit ? 0.26 : 0.1} />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx={100} cy={100} r={92} fill="url(#fairGlow)" />
    <path d="M30 124 C50 68, 78 54, 100 66 C122 54, 150 68, 170 124 Z" fill={`${color}18`} stroke={color} strokeWidth={2.4} />
    <circle cx={58} cy={104} r={8} fill={C.teal} />
    <circle cx={72} cy={94} r={6} fill={C.teal} />
    <circle cx={50} cy={90} r={4.5} fill={C.teal} />
    <circle cx={136} cy={102} r={11} fill={C.gold} />
    <circle cx={152} cy={92} r={8} fill={C.gold} />
    <line x1={32} y1={128} x2={168} y2={128} stroke={color} strokeWidth={8} strokeLinecap="round" />
    <circle cx={100} cy={128} r={8} fill={C.gold} stroke="#fff" strokeWidth={2} />
    <path d="M100 46 L90 72 H110 Z" fill={color} />
    <text x={58} y={78} textAnchor="middle" fill={C.teal} fontSize="11" fontWeight="800" fontFamily="Cairo, sans-serif">حضر</text>
    <text x={142} y={78} textAnchor="middle" fill={C.gold} fontSize="11" fontWeight="800" fontFamily="Cairo, sans-serif">ريف</text>
    {lit && <circle cx={100} cy={100} r={78} fill="none" stroke={color} strokeOpacity={0.4} strokeWidth={2.2} strokeDasharray="6 8" />}
  </svg>
);

const EmblemControl: React.FC<{ color: string; lit: boolean }> = ({ color, lit }) => {
  const sectors = [
    { a: -90, fill: "#60a5fa" },
    { a: 30, fill: "#fb7185" },
    { a: 150, fill: "#4ade80" },
  ];
  const rhombus = (angle: number, size: number) => {
    const rad = (angle * Math.PI) / 180;
    const tip = size;
    const side = size * 0.62;
    const pts: Array<[number, number]> = [
      [100, 100],
      [100 + side * Math.cos(rad - Math.PI / 6), 100 + side * Math.sin(rad - Math.PI / 6)],
      [100 + tip * Math.cos(rad), 100 + tip * Math.sin(rad)],
      [100 + side * Math.cos(rad + Math.PI / 6), 100 + side * Math.sin(rad + Math.PI / 6)],
    ];
    return pts.map((p) => p.join(",")).join(" ");
  };
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="ctrlGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity={lit ? 0.26 : 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={100} cy={100} r={92} fill="url(#ctrlGlow)" />
      <circle cx={100} cy={100} r={78} fill="none" stroke={C.gold} strokeWidth={2.2} strokeDasharray="7 6" opacity={0.85} />
      <circle cx={100} cy={100} r={58} fill="rgba(31,111,120,0.06)" stroke={color} strokeWidth={1.6} />
      {sectors.map((s) => (
        <polygon key={s.a} points={rhombus(s.a, 46)} fill={`${s.fill}55`} stroke={s.fill} strokeWidth={1.8} />
      ))}
      <g transform="translate(100 102)">
        <rect x={-2} y={-12} width={4} height={18} rx={1} fill={C.ink} />
        <circle cx={0} cy={-14} r={3.2} fill={C.gold} />
      </g>
      {lit && (
        <motion.circle
          cx={100}
          cy={100}
          r={78}
          fill="none"
          stroke={C.gold}
          strokeWidth={2}
          initial={{ r: 70, opacity: 0.7 }}
          animate={{ r: 88, opacity: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </svg>
  );
};

const EMBLEMS = [EmblemPlan, EmblemFair, EmblemControl] as const;

const BEATS = [
  "المساهمة الأولى: التخطيط والتحسين",
  "المساهمة الثانية: العدالة المكانية",
  "المساهمة الثالثة: التحكم التشغيلي",
  "الترابط المنهجي بين المساهمات",
] as const;

export const ContribThreeContributions: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const theme = THEME[0];
  const beat = BEATS[Math.max(0, Math.min(step, BEATS.length) - 1)];
  const linked = step >= 4;

  return (
    <ContribStage contribution={0} title="تكامل المساهمات البحثية الثلاث" beats={[...BEATS]} step={step} goNext={goNext} goToStep={goToStep} hideHeader>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <header style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(36px, 3.8vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: C.ink,
              whiteSpace: "nowrap",
            }}
          >
            تكامل المساهمات البحثية الثلاث
          </h1>
          <div data-no-advance="true" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={beat}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: theme.main,
                  background: alpha(theme.main, 0.1),
                  borderRadius: 999,
                  padding: "5px 14px",
                  whiteSpace: "nowrap",
                }}
              >
                {beat}
              </motion.span>
            </AnimatePresence>
            <StepIndicator totalSteps={BEATS.length} currentStep={step} onStepClick={goToStep} />
          </div>
        </header>

        <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <svg viewBox="0 0 1400 220" preserveAspectRatio="none" style={{ position: "absolute", inset: "8% 6% 46% 6%", width: "auto", height: "auto", pointerEvents: "none", overflow: "visible" }}>
            <path
              d="M180 120 C 380 20, 520 200, 700 110 S 1020 20, 1220 120"
              fill="none"
              stroke={linked ? C.gold : "rgba(15,23,42,0.10)"}
              strokeWidth={linked ? 6 : 3}
              strokeLinecap="round"
            />
            {linked && <Pulse d="M180 120 C 380 20, 520 200, 700 110 S 1020 20, 1220 120" color={C.gold} r={7} dur={4} />}
          </svg>

          <div style={{ position: "relative", height: "100%", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(10px, 1.4vw, 24px)", alignItems: "stretch" }}>
            {PILLARS.map((p, i) => {
              const Emblem = EMBLEMS[i];
              const on = step >= i + 1;
              return (
                <motion.div
                  key={p.n}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0.4, scale: step === i + 1 || linked ? 1 : 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: "100%",
                    minHeight: 0,
                    display: "grid",
                    gridTemplateRows: "minmax(110px, 38%) auto",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 0, display: "grid", placeItems: "center" }}>
                    <div
                      style={{
                        position: "absolute",
                        width: "78%",
                        height: "78%",
                        borderRadius: i === 0 ? "46% 54% 50% 50%" : i === 1 ? "50% 42% 58% 48%" : "52% 48% 44% 56%",
                        background: `radial-gradient(circle at 50% 42%, ${p.color}30, ${p.color}0a 58%, transparent 72%)`,
                      }}
                    />
                    <div style={{ width: "auto", height: "100%", maxWidth: "100%", aspectRatio: "1" }}>
                      <Emblem color={p.color} lit={on && (linked || step === i + 1)} />
                    </div>
                  </div>
                  <div style={{ width: "100%", padding: "6px 4px 0", alignSelf: "start" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(34px, 3.5vw, 50px)", fontWeight: 900, color: p.color, lineHeight: 0.9 }}>
                        {p.n}
                      </span>
                      <span style={{ fontSize: "clamp(22px, 2.2vw, 32px)", fontWeight: 900, color: C.ink, lineHeight: 1.2 }}>{p.title}</span>
                    </div>
                    <div style={{ marginTop: 8, fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 900, color: p.color, lineHeight: 1.3 }}>
                      {p.q}
                    </div>
                    <div style={{ marginTop: 8, fontSize: "clamp(18px, 1.5vw, 22px)", fontWeight: 800, color: p.color }}>
                      {p.tools.join("  ·  ")}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div style={{ flexShrink: 0, minHeight: 72, display: "flex", alignItems: "center", position: "relative", zIndex: 8, background: "#edebe0" }}>
          <Show step={step} at={4} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(10px, 1.4vw, 22px)",
                background: C.ink,
                color: "#fff",
                borderRadius: 18,
                padding: "12px 20px",
                fontSize: "clamp(22px, 2.2vw, 32px)",
                fontWeight: 900,
                width: "100%",
              }}
            >
              {FLOW.map((label, i) => (
                <React.Fragment key={label}>
                  <span>{label}</span>
                  {i < FLOW.length - 1 && <span style={{ color: C.gold, fontSize: "1.15em" }}>←</span>}
                </React.Fragment>
              ))}
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};
