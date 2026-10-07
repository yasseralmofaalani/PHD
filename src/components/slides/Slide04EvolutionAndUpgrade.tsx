import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scale } from "lucide-react";
import { StepIndicator } from "../ui/RevealItem";
import { useStepReveal } from "../../hooks/useStepReveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const PRIMARY = "#428177";
const ACCENT = "#6b1f2a";

/** Cubic segments in a 0–100 space. The path climbs from the right toward the left. */
const SEGS: ReadonlyArray<readonly [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]]> = [
  [[90, 82], [82, 78], [76, 70], [70, 58]],
  [[70, 58], [60, 48], [54, 40], [46, 32]],
  [[46, 32], [34, 24], [24, 18], [14, 12]],
];

const ANCHORS = [SEGS[0][0], SEGS[1][0], SEGS[2][0], SEGS[2][3]] as const;

function pixelPath(w: number, h: number) {
  const X = (v: number) => (v / 100) * w;
  const Y = (v: number) => (v / 100) * h;
  return SEGS.map((seg, i) => {
    const [p0, c1, c2, p] = seg;
    const head = i === 0 ? `M ${X(p0[0])} ${Y(p0[1])} ` : "";
    return `${head}C ${X(c1[0])} ${Y(c1[1])}, ${X(c2[0])} ${Y(c2[1])}, ${X(p[0])} ${Y(p[1])}`;
  }).join(" ");
}

const BEATS = [
  "تزايد الطلب",
  "تعقيد الترقية المرحلية",
  "تعدد أهداف التخطيط",
  "إطار ذكي متكامل",
  "إطار ذكي متكامل",
];

function cubic(a: number, b: number, c: number, d: number, t: number) {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}

function pointAt(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  if (clamped >= 1) {
    const end = SEGS[2][3];
    return { x: end[0], y: end[1] };
  }
  const scaled = clamped * SEGS.length;
  const i = Math.min(SEGS.length - 1, Math.floor(scaled));
  const lt = scaled - i;
  const [p0, p1, p2, p3] = SEGS[i];
  return {
    x: cubic(p0[0], p1[0], p2[0], p3[0], lt),
    y: cubic(p0[1], p1[1], p2[1], p3[1], lt),
  };
}

const SYRIA = "M120 60 L180 50 L240 55 L280 45 L320 55 L360 48 L400 60 L420 80 L410 110 L430 140 L420 170 L400 185 L380 200 L360 210 L330 220 L300 230 L260 240 L220 250 L190 245 L160 235 L140 220 L110 210 L90 195 L75 175 L80 150 L70 130 L80 105 L100 85 Z";

const goals: Array<{ label: string; abbr: string; angle: number; color: string }> = [
  { label: "التغطية", abbr: "Coverage", angle: -90, color: PRIMARY },
  { label: "التكلفة", abbr: "CapEx", angle: 0, color: ACCENT },
  { label: "الطاقة", abbr: "Energy", angle: 90, color: PRIMARY },
  { label: "العدالة المكانية", abbr: "SFI", angle: 180, color: ACCENT },
];

function DemandMark() {
  const nodes = [
    [24, 58],
    [58, 36],
    [96, 54],
    [78, 18],
  ] as const;

  return (
    <svg width="210" height="114" viewBox="0 0 132 76" aria-hidden="true">
      <path
        d="M24 58 L58 36 L96 54 M58 36 L78 18"
        stroke={PRIMARY}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {[18, 30, 42].map((r, i) => (
        <path
          key={r}
          d={`M ${58 - r * 0.15} ${36 - r * 0.92} A ${r} ${r} 0 0 1 ${58 + r * 0.92} ${36 - r * 0.2}`}
          stroke={PRIMARY}
          strokeWidth="1.35"
          fill="none"
          strokeLinecap="round"
          opacity={0.85 - i * 0.22}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={i === 1 ? 4.5 : 3.2}
          fill={i === 1 ? PRIMARY : "#ffffff"}
          stroke={PRIMARY}
          strokeWidth="1.6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 0.12 * i, ease: EASE }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  );
}

function UpgradeMark() {
  const tower = (x: number, color: string, rebuilt: boolean) => (
    <g
      transform={`translate(${x} 0)`}
      stroke={color}
      fill="none"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 58 L32 16 H44 L58 58" strokeDasharray={rebuilt ? "3.4 2.3" : undefined} />
      <path d="M24 44 H52 M29 30 H47" strokeDasharray={rebuilt ? "3.4 2.3" : undefined} />
      <path
        d="M24 44 L47 30 M29 30 L52 44"
        opacity="0.75"
        strokeDasharray={rebuilt ? "3.4 2.3" : undefined}
      />
      <path d="M8 58 H68" strokeDasharray={rebuilt ? "3.4 2.3" : undefined} />
      {rebuilt ? (
        <g fill={color} stroke="none" opacity="0.22">
          <rect x="16" y="63" width="44" height="4.5" rx="1" />
          <rect x="22" y="69.5" width="32" height="4.5" rx="1" />
        </g>
      ) : (
        <g stroke={color} fill="none">
          <path d="M26 11 A12 12 0 0 1 50 11" />
          <path d="M20 5.5 A18 18 0 0 1 56 5.5" opacity="0.55" />
          <circle cx="38" cy="13" r="2.2" fill={color} stroke="none" />
        </g>
      )}
    </g>
  );

  return (
    <svg width="320" height="110" viewBox="0 0 214 80" aria-hidden="true">
      {tower(124, ACCENT, true)}
      <path d="M118 40 H96" stroke={PRIMARY} strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M104 33 L92 40 L104 47"
        stroke={PRIMARY}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {tower(8, PRIMARY, false)}
    </svg>
  );
}

function ObjectiveOrbit() {
  const ringR = 88;
  const labelR = 138;
  const hub = { x: 190, y: 150 };
  const boxW = 380;
  const boxH = 340;

  return (
    <div style={{ position: "relative", width: boxW, height: boxH }}>
      <svg
        width={boxW}
        height={boxH}
        viewBox={`0 0 ${boxW} ${boxH}`}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <circle
          cx={hub.x}
          cy={hub.y}
          r={ringR}
          fill="none"
          stroke="rgba(66,129,119,0.28)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />
        {goals.map((goal) => {
          const rad = (goal.angle * Math.PI) / 180;
          return (
            <line
              key={goal.label}
              x1={hub.x}
              y1={hub.y}
              x2={hub.x + Math.cos(rad) * ringR}
              y2={hub.y + Math.sin(rad) * ringR}
              stroke={goal.color}
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.4"
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          left: hub.x,
          top: hub.y,
          width: 0,
          height: 0,
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            x: "-50%",
            y: "-50%",
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#ffffff",
            border: `2.5px solid ${PRIMARY}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(66,129,119,0.12)",
          }}
        >
          <Scale size={30} color={PRIMARY} strokeWidth={2.1} />
        </motion.div>
      </div>

      {goals.map((goal, index) => {
        const rad = (goal.angle * Math.PI) / 180;
        const left = hub.x + Math.cos(rad) * labelR;
        const top = hub.y + Math.sin(rad) * labelR;
        return (
          <div
            key={goal.label}
            style={{
              position: "absolute",
              left,
              top,
              width: 0,
              height: 0,
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: EASE }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                x: "-50%",
                y: "-50%",
                padding: "5px 12px 6px",
                borderRadius: 14,
                background: "#ffffff",
                border: `1.5px solid ${goal.color}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                whiteSpace: "nowrap",
                width: "max-content",
              }}
            >
              <span
                style={{
                  color: goal.color,
                  fontSize: 17,
                  fontWeight: 900,
                  fontFamily: "Cairo, sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {goal.label}
              </span>
              <span
                style={{
                  color: goal.color,
                  fontSize: 12,
                  fontWeight: 800,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.03em",
                  opacity: 0.85,
                  lineHeight: 1.1,
                }}
              >
                {goal.abbr}
              </span>
            </motion.div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 2,
          transform: "translateX(-50%)",
          textAlign: "center",
          fontSize: 20,
          fontWeight: 900,
          color: "#111111",
          fontFamily: "Cairo, sans-serif",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
          zIndex: 2,
        }}
      >
        تعدد أهداف التخطيط
      </div>
    </div>
  );
}

function FrameworkMark({ gather }: { gather: boolean }) {
  const rim = [
    { angle: -60, color: PRIMARY },
    { angle: 30, color: ACCENT },
    { angle: 120, color: PRIMARY },
    { angle: 210, color: ACCENT },
  ];

  return (
    <div style={{ position: "relative", width: 210, height: 210 }}>
      <svg width="210" height="210" viewBox="0 0 176 176" aria-hidden="true">
        <circle cx="88" cy="88" r="62" fill="#ffffff" />
        <motion.circle
          cx="88"
          cy="88"
          r="74"
          fill="none"
          stroke={PRIMARY}
          strokeWidth="1.5"
          strokeDasharray="4 3.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: gather ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: "88px 88px" }}
        />
        <g transform="translate(88 90) scale(0.145) translate(-250 -145)" opacity="0.16">
          <path d={SYRIA} fill={PRIMARY} />
        </g>
        {rim.map((dot, index) => {
          const rad = (dot.angle * Math.PI) / 180;
          const x = 88 + Math.cos(rad) * 74;
          const y = 88 + Math.sin(rad) * 74;
          return (
            <motion.circle
              key={dot.angle}
              r="3.4"
              fill={dot.color}
              initial={{ cx: x, cy: y, opacity: 0 }}
              animate={{
                cx: gather ? 88 : x,
                cy: gather ? 88 : y,
                opacity: gather ? 0 : 1,
              }}
              transition={{ duration: 0.75, delay: gather ? index * 0.06 : 0.15 + index * 0.05, ease: EASE }}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pointerEvents: "none",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: PRIMARY,
            fontFamily: "Inter, sans-serif",
          }}
        >
          GIS
        </span>
        <span
          style={{
            marginTop: 2,
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: "rgba(66,129,119,0.85)",
            fontFamily: "Inter, sans-serif",
            maxWidth: 120,
            lineHeight: 1.15,
          }}
        >
          Geographic Information System
        </span>
        <span
          style={{
            marginTop: 4,
            fontSize: 21,
            fontWeight: 900,
            lineHeight: 1.2,
            color: "#111111",
          }}
        >
          إطار ذكي
          <br />
          متكامل
        </span>
      </div>
    </div>
  );
}

function Station({
  show,
  x,
  y,
  delay,
  emphasis,
  dimmed,
  children,
}: {
  show: boolean;
  x: number;
  y: number;
  delay: number;
  emphasis?: boolean;
  dimmed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <div
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: emphasis ? 6 : dimmed ? 2 : 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{
              opacity: dimmed ? 0.42 : 1,
              scale: emphasis ? 1.05 : dimmed ? 0.92 : 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.55, delay, ease: EASE }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Plate({
  active,
  children,
  tone = PRIMARY,
}: {
  active: boolean;
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.94)",
        border: active ? `1.5px solid ${tone}` : "1px solid rgba(66, 129, 119, 0.22)",
        borderRadius: 18,
        padding: "16px 22px 18px",
        minWidth: 260,
        boxShadow: active
          ? "0 10px 28px rgba(66, 129, 119, 0.12)"
          : "0 6px 18px rgba(0,0,0,0.045)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
    </div>
  );
}

function IndexMark({ n, color }: { n: string; color: string }) {
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

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 23,
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

export const Slide04EvolutionAndUpgrade: React.FC = () => {
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
  });

  const progress = step <= 1 ? 0 : step === 2 ? 1 / 3 : step === 3 ? 2 / 3 : 1;
  const dot = pointAt(progress);
  const canvasRef = useRef<HTMLDivElement>(null);
  const riseRef = useRef<SVGPathElement>(null);
  const [canvas, setCanvas] = useState({ w: 0, h: 0 });
  const [pathLen, setPathLen] = useState(1);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setCanvas({ w: rect.width, h: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const riseD = canvas.w > 0 ? pixelPath(canvas.w, canvas.h) : "";

  useEffect(() => {
    if (riseRef.current) setPathLen(riseRef.current.getTotalLength() || 1);
  }, [riseD]);
  const beat = BEATS[Math.min(step, BEATS.length) - 1];

  const handleSlideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext();
  };

  return (
    <div
      className="slide"
      dir="rtl"
      onClick={handleSlideClick}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(10px, 1.4vh, 16px) clamp(16px, 2vw, 28px)",
        boxSizing: "border-box",
        background: "transparent",
        color: "var(--text-dark)",
        fontFamily: "Cairo, sans-serif",
        cursor: "pointer",
        userSelect: "none",
      }}
      title="انقر للمتابعة"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "none",
          backgroundSize: "32px 32px",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div
            style={{
              width: 6,
              height: 36,
              borderRadius: 4,
              background: "linear-gradient(180deg, var(--accent) 0%, var(--primary) 100%)",
              flexShrink: 0,
            }}
          />
          <h1
            style={{
              fontSize: "clamp(33.6px, 3.42vw, 42.6px)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.15,
              color: "var(--title-color)",
              fontFamily: "Cairo, sans-serif",
              letterSpacing: "-0.4px",
            }}
          >
            تراكم التحدي البحثي
          </h1>
        </div>

        <div
          data-no-advance="true"
          style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={beat}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{
                fontSize: 19.3,
                fontWeight: 800,
                color: step >= 4 ? PRIMARY : ACCENT,
                background: step >= 4 ? "rgba(66,129,119,0.1)" : "rgba(107,31,42,0.08)",
                borderRadius: 999,
                padding: "5px 12px",
                fontFamily: "Cairo, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {beat}
            </motion.span>
          </AnimatePresence>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </div>

      <div
        ref={canvasRef}
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          marginTop: 8,
        }}
      >
        <svg
          viewBox="0 0 1000 620"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <defs>
            <pattern id="s5-hex" width="36" height="62" patternUnits="userSpaceOnUse">
              <path
                d="M18 0 L36 10.4 L36 31.2 L18 41.6 L0 31.2 L0 10.4 Z"
                fill="none"
                stroke="rgba(66,129,119,0.16)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1000" height="620" fill="url(#s5-hex)" />
          <path
            d={SYRIA}
            transform="translate(90 40) scale(1.55)"
            fill="rgba(66,129,119,0.07)"
            stroke="rgba(66,129,119,0.22)"
            strokeWidth="2"
          />
          {[70, 120, 170].map((r, i) => (
            <circle
              key={r}
              cx="720"
              cy="430"
              r={r}
              fill="none"
              stroke={i === 0 ? ACCENT : PRIMARY}
              strokeWidth="1.6"
              strokeDasharray="7 6"
              opacity={0.22 - i * 0.04}
            />
          ))}
          <path
            d="M760 470 L700 390 L780 350 L640 280 L720 210"
            fill="none"
            stroke={PRIMARY}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.2"
          />
        </svg>
        <svg
          viewBox={`0 0 ${Math.max(canvas.w, 1)} ${Math.max(canvas.h, 1)}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="s5-rise"
              x1={(86 / 100) * canvas.w}
              y1={(72 / 100) * canvas.h}
              x2={(16 / 100) * canvas.w}
              y2={(20 / 100) * canvas.h}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={ACCENT} />
              <stop offset="55%" stopColor={PRIMARY} />
              <stop offset="100%" stopColor={PRIMARY} />
            </linearGradient>
            <linearGradient id="s5-rise-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.28" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {riseD && (
            <path ref={riseRef} d={riseD} fill="none" stroke="none" />
          )}
          {riseD && pathLen > 20 && (
            <>
              <path
                d={`${riseD} L ${(14 / 100) * canvas.w} ${canvas.h} L ${(86 / 100) * canvas.w} ${canvas.h} Z`}
                fill="url(#s5-rise-fill)"
                opacity="0.22"
              />
              <path
                d={riseD}
                fill="none"
                stroke="rgba(66,129,119,0.16)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray={pathLen}
                strokeDashoffset={pathLen * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              <path
                d={riseD}
                fill="none"
                stroke="url(#s5-rise)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeDasharray={pathLen}
                strokeDashoffset={pathLen * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </>
          )}
        </svg>

        <motion.div
          initial={false}
          animate={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            opacity: step >= 2 && step < 5 ? 1 : 0,
            scale: step >= 2 && step < 5 ? 1 : 0.6,
          }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            position: "absolute",
            width: 22,
            height: 22,
            marginLeft: -11,
            marginTop: -11,
            borderRadius: "50%",
            background: "#ffffff",
            border: `3px solid ${PRIMARY}`,
            boxShadow: "0 0 0 8px rgba(66,129,119,0.16)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />

        <Station show={step >= 1} x={ANCHORS[0][0]} y={ANCHORS[0][1]} delay={0.05} dimmed={step > 1}>
          <Plate active={step === 1} tone={PRIMARY}>
            <IndexMark n="01" color={PRIMARY} />
            <DemandMark />
            <Title>تزايد الطلب</Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4, width: "100%" }}>
              {[
                { abbr: "5G", en: "Fifth Generation" },
                { abbr: "IoT", en: "Internet of Things" },
              ].map((term) => (
                <div
                  key={term.abbr}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    direction: "ltr",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#ffffff",
                      background: PRIMARY,
                      borderRadius: 6,
                      padding: "1px 7px",
                      fontFamily: "Inter, sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {term.abbr}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "rgba(40,45,45,0.78)",
                      fontFamily: "Inter, sans-serif",
                      textAlign: "left",
                    }}
                  >
                    {term.en}
                  </span>
                </div>
              ))}
            </div>
          </Plate>
        </Station>

        <Station show={step >= 2} x={ANCHORS[1][0]} y={ANCHORS[1][1]} delay={0.42} dimmed={step > 2}>
          <Plate active={step === 2} tone={ACCENT}>
            <IndexMark n="02" color={ACCENT} />
            <UpgradeMark />
            <div
              style={{
                width: 300,
                display: "grid",
                gridTemplateColumns: "1fr 28px 1fr",
                direction: "ltr",
                alignItems: "start",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: PRIMARY, fontFamily: "Cairo, sans-serif" }}>
                  ترقية مرحلية
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: PRIMARY, fontFamily: "Inter, sans-serif", opacity: 0.85, marginTop: 2 }}>
                  Brownfield
                </div>
              </div>
              <span />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: ACCENT, fontFamily: "Cairo, sans-serif" }}>
                  بناء جديد
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: ACCENT, fontFamily: "Inter, sans-serif", opacity: 0.85, marginTop: 2 }}>
                  Greenfield
                </div>
              </div>
            </div>
            <Title>تعقيد مسار الترقية</Title>
          </Plate>
        </Station>

        <Station show={step >= 3} x={ANCHORS[2][0]} y={ANCHORS[2][1]} delay={0.4} dimmed={step > 3}>
          <ObjectiveOrbit />
        </Station>

        <Station
          show={step >= 4}
          x={ANCHORS[3][0]}
          y={ANCHORS[3][1]}
          delay={0.42}
          emphasis={step >= 5}
        >
          <div
            style={{
              borderRadius: "50%",
              boxShadow:
                step >= 5
                  ? "0 0 0 10px rgba(66,129,119,0.1), 0 14px 34px rgba(66,129,119,0.18)"
                  : "0 8px 22px rgba(0,0,0,0.06)",
            }}
          >
            <FrameworkMark gather={step >= 5} />
          </div>
        </Station>
      </div>
    </div>
  );
};

export default Slide04EvolutionAndUpgrade;
