import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "../ui/RevealItem";
import { useStepReveal } from "../../hooks/useStepReveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const PRIMARY = "#428177";
const ACCENT = "#6b1f2a";

const BEATS = [
  "متطلبات 5G-Advanced",
  "الواقع التشغيلي",
  "اتساع الفجوة التشغيلية",
  "الفجوة البحثية",
  "إطار ذكي متكامل",
];

const REQUIREMENTS = [
  "توفير سرعات نقل بيانات عالية مع زمن استجابة منخفض.",
  "تحقيق تغطية جغرافية واسعة وشاملة.",
  "الاستخدام الفعّال للطيف الترددي والطاقة.",
  "توفير إدارة وتحكم مرن في الشبكة باستخدام البرمجيات.",
];

const REALITY = [
  "محدودية الميزانية المخصصة للاستثمار في الشبكة",
  "نقص الطاقة الكهربائية وعدم استقرارها.",
  "وجود بنية تحتية قديمة ومتنوعة تشمل شبكات 2G/3G/4G.",
  "تشغيل الشبكة باستخدام معدات وتقنيات من موردين مختلفين.",
];

/** Flat-top hex in a regular 100 × 86.6 box */
const HEX = "M25 0 L75 0 L100 43.3 L75 86.6 L25 86.6 L0 43.3 Z";

function HexCell({
  label,
  tone,
  index,
  delay,
}: {
  label: string;
  tone: string;
  index: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.84, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        position: "relative",
        height: "100%",
        flex: "1 1 0",
        maxWidth: "52%",
        aspectRatio: "100 / 86.6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: `drop-shadow(0 14px 22px ${tone}33)`,
      }}
    >
      <svg
        viewBox="0 0 100 86.6"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`hex-fill-${tone}-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone} stopOpacity="1" />
            <stop offset="100%" stopColor={tone} stopOpacity="0.82" />
          </linearGradient>
        </defs>
        <path d={HEX} fill={`url(#hex-fill-${tone}-${index})`} />
        <path d={HEX} fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="1.6" />
        <path
          d="M25 0 L75 0 L92 28"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "8% 16%",
          textAlign: "center",
          color: "#ffffff",
          fontFamily: "Cairo, sans-serif",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "Inter, Cairo, sans-serif",
            fontSize: "clamp(26px, 2.4vw, 34px)",
            fontWeight: 900,
            letterSpacing: "0.12em",
            opacity: 0.92,
            marginBottom: 6,
            lineHeight: 1.1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          style={{
            fontSize: "clamp(16px, 1.35vw, 21px)",
            fontWeight: 900,
            lineHeight: 1.45,
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function Honeycomb({
  items,
  tone,
  from,
}: {
  items: string[];
  tone: string;
  from: "right" | "left";
}) {
  const inward = from === "left" ? 1 : -1;

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingInline: "3%",
      }}
    >
      {[0, 1].map((row) => (
        <div
          key={row}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "48%",
            gap: "1.4%",
            marginTop: row === 1 ? "-7%" : 0,
            transform:
              row === 1
                ? `translateX(${inward * 13}%)`
                : `translateX(${inward * -2}%)`,
          }}
        >
          {items.slice(row * 2, row * 2 + 2).map((item, col) => (
            <HexCell
              key={item}
              label={item}
              tone={tone}
              index={row * 2 + col}
              delay={0.08 + (row * 2 + col) * 0.07}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Shore({
  kicker,
  items,
  tone,
  show,
  from,
  opened,
}: {
  kicker: React.ReactNode;
  items: string[];
  tone: string;
  show: boolean;
  from: "right" | "left";
  opened: boolean;
}) {
  const enterX = from === "right" ? 30 : -30;
  const restX = opened ? (from === "right" ? 12 : -12) : 0;

  return (
    <div style={{ minWidth: 0, height: "100%", display: "flex" }}>
      <AnimatePresence>
        {show && (
          <motion.section
            dir="rtl"
            initial={{ opacity: 0, x: enterX }}
            animate={{ opacity: 1, x: restX }}
            exit={{ opacity: 0, x: enterX * 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: "clamp(22px, 2.1vw, 28px)",
                fontWeight: 900,
                color: tone,
                fontFamily: "Cairo, sans-serif",
                lineHeight: 1.45,
                textAlign: "center",
                flexShrink: 0,
                paddingBlock: 2,
              }}
            >
              {kicker}
            </div>
            <Honeycomb items={items} tone={tone} from={from} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Rift({ open, named }: { open: boolean; named: boolean }) {
  return (
    <div style={{ position: "relative", height: "100%", minWidth: 0 }}>
      <svg
        viewBox="0 0 140 400"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <motion.path
          d="M52 6 C44 58, 78 96, 40 152 C18 198, 86 236, 34 292 C10 336, 70 364, 42 396 L98 396 C78 360, 118 328, 86 286 C54 232, 122 196, 88 148 C62 98, 96 54, 86 6 Z"
          fill="rgba(107,31,42,0.12)"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        />
        <motion.path
          d="M54 8 C46 64, 76 108, 42 164 C22 214, 80 258, 38 330 C24 360, 62 380, 48 396"
          fill="none"
          stroke={ACCENT}
          strokeWidth="4.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: open ? 1 : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        />
        <motion.path
          d="M84 8 C92 70, 58 118, 90 176 C108 228, 64 286, 96 348 C108 372, 80 384, 92 396"
          fill="none"
          stroke={PRIMARY}
          strokeWidth="4.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: open ? 1 : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
        />
      </svg>

      <AnimatePresence>
        {named && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                background: ACCENT,
                color: "#ffffff",
                borderRadius: 999,
                padding: "11px 20px",
                fontSize: "clamp(18px, 1.7vw, 22px)",
                fontWeight: 900,
                fontFamily: "Cairo, sans-serif",
                lineHeight: 1.35,
                whiteSpace: "nowrap",
                boxShadow: "0 12px 28px rgba(107,31,42,0.32)",
              }}
            >
              الفجوة البحثية
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Slide05SyrianProblem: React.FC = () => {
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
  });

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
      {/* Background kept clean — parchment only */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(107,31,42,0.08) 0%, transparent 42%, transparent 58%, rgba(66,129,119,0.10) 100%)",
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
          flexShrink: 0,
          minHeight: 58,
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
              fontSize: "clamp(31.2px, 3.17vw, 42.5px)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.65,
              paddingBlock: 4,
              color: "var(--title-color)",
              fontFamily: "Cairo, sans-serif",
              letterSpacing: "-0.4px",
            }}
          >
            الفجوة بين المتطلب والواقع
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
                lineHeight: 1.4,
              }}
            >
              {beat}
            </motion.span>
          </AnimatePresence>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: 8,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(132px, 168px) minmax(0, 1fr)",
          alignItems: "stretch",
          direction: "ltr",
        }}
      >
        <Shore
          kicker="الواقع التشغيلي"
          items={REALITY}
          tone={ACCENT}
          show={step >= 2}
          from="left"
          opened={step >= 3}
        />
        <Rift open={step >= 3} named={step >= 4} />
        <Shore
          kicker={
            <>
              متطلبات <bdi dir="ltr">5G-Advanced</bdi>
            </>
          }
          items={REQUIREMENTS}
          tone={PRIMARY}
          show={step >= 1}
          from="right"
          opened={step >= 3}
        />
      </div>

      <div
        style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span
                style={{
                  width: 56,
                  height: 3,
                  borderRadius: 99,
                  background: `linear-gradient(90deg, transparent, ${PRIMARY})`,
                }}
              />
              <span
                style={{
                  fontSize: "clamp(24.8px, 2.56vw, 33.6px)",
                  fontWeight: 900,
                  color: PRIMARY,
                  fontFamily: "Cairo, sans-serif",
                  lineHeight: 1.4,
                }}
              >
                الحاجة إلى إطار ذكي متكامل
              </span>
              <span
                style={{
                  width: 56,
                  height: 3,
                  borderRadius: 99,
                  background: `linear-gradient(90deg, ${PRIMARY}, transparent)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide05SyrianProblem;
