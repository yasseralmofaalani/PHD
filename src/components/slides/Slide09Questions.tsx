import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "../ui/RevealItem";
import { useStepReveal } from "../../hooks/useStepReveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const PRIMARY = "#428177";
const ACCENT = "#6b1f2a";

const BEATS = [
  "مدخل الأسئلة",
  "السؤال البحثي ",
  "Q1 الموازنة الرياضية",
  "Q2 الكفاءة الخوارزمية",
  "Q3 الربط المكاني",
  "Q4 العزل البرمجي",
];

type Question = {
  code: string;
  title: string;
  q: string;
  method: string;
  tone: string;
  svg: React.ReactNode;
};

function QMark({
  tone,
  active,
  code,
  size = 68,
}: {
  tone: string;
  active: boolean;
  code?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: active ? 1 : 0.88,
          background: active ? tone : "rgba(255,255,255,0.72)",
          color: active ? "#ffffff" : tone,
          boxShadow: active ? `0 10px 22px ${tone}40` : "none",
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `3px solid ${tone}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.56,
          fontWeight: 900,
          fontFamily: "Cairo, sans-serif",
          lineHeight: 1,
        }}
      >
        ؟
      </motion.div>
      {code && (
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: -7,
            transform: "translateX(-50%)",
            background: tone,
            color: "#ffffff",
            fontSize: 12,
            fontFamily: "Inter, Cairo, sans-serif",
            fontWeight: 800,
            letterSpacing: "0.04em",
            padding: "1px 7px",
            borderRadius: 999,
            lineHeight: 1.3,
          }}
        >
          {code}
        </span>
      )}
    </div>
  );
}

function SvgQ1() {
  return (
    <svg viewBox="0 0 280 150" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
      <rect x="4" y="4" width="272" height="142" rx="12" fill="#f8fafc" stroke={PRIMARY} strokeWidth="1.5" />
      <rect x="14" y="14" width="252" height="36" rx="8" fill="rgba(107,31,42,0.1)" stroke={ACCENT} strokeWidth="1.3" />
      <text x="140" y="30" fontSize="15" fontWeight="900" fill={ACCENT} textAnchor="middle" fontFamily="Inter, sans-serif">min CapEx · OPEX</text>
      <text x="140" y="44" fontSize="13" fontWeight="800" fill="#7f1d1d" textAnchor="middle" fontFamily="Cairo, sans-serif">خفض الكلفة والطاقة</text>
      <rect x="14" y="58" width="252" height="36" rx="8" fill="rgba(4,120,87,0.1)" stroke="#059669" strokeWidth="1.3" />
      <text x="140" y="74" fontSize="15" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">max SINR · SFI</text>
      <text x="140" y="88" fontSize="13" fontWeight="800" fill="#065f46" textAnchor="middle" fontFamily="Cairo, sans-serif">تعظيم التغطية والعدالة</text>
      <rect x="36" y="106" width="208" height="30" rx="8" fill="#ffffff" stroke={PRIMARY} strokeWidth="1.4" />
      <text x="140" y="126" fontSize="15" fontWeight="900" fill={PRIMARY} textAnchor="middle" fontFamily="Inter, sans-serif">4D Pareto Trade-off</text>
    </svg>
  );
}

function SvgQ2() {
  return (
    <svg viewBox="0 0 280 150" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
      <rect x="4" y="4" width="272" height="142" rx="12" fill="#f8fafc" stroke={PRIMARY} strokeWidth="1.5" />
      <rect x="90" y="12" width="100" height="28" rx="7" fill="#ecfdf5" stroke="#059669" strokeWidth="1.3" />
      <text x="140" y="31" fontSize="15" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">p &lt; 0.01 ✓</text>
      <line x1="20" y1="88" x2="260" y2="88" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="70" y1="42" x2="70" y2="88" stroke={PRIMARY} strokeWidth="2" />
      <rect x="48" y="50" width="44" height="38" rx="5" fill="rgba(66,129,119,0.2)" stroke={PRIMARY} strokeWidth="1.8" />
      <line x1="210" y1="42" x2="210" y2="88" stroke={ACCENT} strokeWidth="2" />
      <rect x="188" y="52" width="44" height="36" rx="5" fill="rgba(107,31,42,0.18)" stroke={ACCENT} strokeWidth="1.8" />
      <rect x="16" y="102" width="116" height="34" rx="8" fill="#f0fdf4" stroke={PRIMARY} strokeWidth="1.2" />
      <text x="74" y="117" fontSize="15" fontWeight="900" fill={PRIMARY} textAnchor="middle" fontFamily="Inter, sans-serif">BPSO</text>
      <text x="74" y="130" fontSize="12" fontWeight="800" fill="#065f46" textAnchor="middle" fontFamily="Cairo, sans-serif">أسرع 4.2×</text>
      <rect x="148" y="102" width="116" height="34" rx="8" fill="#fff1f2" stroke={ACCENT} strokeWidth="1.2" />
      <text x="206" y="117" fontSize="15" fontWeight="900" fill={ACCENT} textAnchor="middle" fontFamily="Inter, sans-serif">AGA</text>
      <text x="206" y="130" fontSize="12" fontWeight="800" fill="#7f1d1d" textAnchor="middle" fontFamily="Cairo, sans-serif">استقرار أعلى</text>
    </svg>
  );
}

function SvgQ3() {
  return (
    <svg viewBox="0 0 280 150" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
      <rect x="4" y="4" width="272" height="142" rx="12" fill="#f8fafc" stroke={PRIMARY} strokeWidth="1.5" />
      <rect x="12" y="12" width="118" height="88" rx="10" fill="rgba(66,129,119,0.08)" stroke={PRIMARY} strokeWidth="1.3" />
      <polygon points="30,48 70,60 110,48 70,36" fill="rgba(66,129,119,0.35)" stroke={PRIMARY} strokeWidth="1.4" />
      <polygon points="30,72 70,84 110,72 70,60" fill="rgba(107,31,42,0.25)" stroke={ACCENT} strokeWidth="1.4" />
      <text x="71" y="92" fontSize="12" fontWeight="900" fill={PRIMARY} textAnchor="middle" fontFamily="Inter, sans-serif">DEM + Clutter</text>
      <rect x="142" y="12" width="126" height="88" rx="10" fill="rgba(66,129,119,0.1)" stroke={PRIMARY} strokeWidth="1.4" />
      <text x="205" y="38" fontSize="15" fontWeight="900" fill={PRIMARY} textAnchor="middle" fontFamily="Inter, sans-serif">RAN Matrix</text>
      <text x="205" y="56" fontSize="12" fontWeight="800" fill="#334155" textAnchor="middle" fontFamily="Inter, sans-serif">Tilt · Azimuth</text>
      <rect x="156" y="68" width="98" height="22" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
      <text x="205" y="83" fontSize="12" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Inter, sans-serif">Zero Interf. ✓</text>
      <rect x="12" y="110" width="256" height="28" rx="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x="140" y="128" fontSize="13" fontWeight="900" fill="#0f172a" textAnchor="middle" fontFamily="Cairo, sans-serif">Ray-Tracing → RAN · GIS 3D</text>
    </svg>
  );
}

function SvgQ4() {
  return (
    <svg viewBox="0 0 280 150" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
      <rect x="4" y="4" width="272" height="142" rx="12" fill="#f8fafc" stroke={ACCENT} strokeWidth="1.5" />
      <circle cx="58" cy="58" r="38" fill="rgba(107,31,42,0.08)" stroke={ACCENT} strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="58" cy="58" r="24" fill="none" stroke={PRIMARY} strokeWidth="1.6" />
      <circle cx="58" cy="58" r="12" fill={ACCENT} />
      <text x="58" y="62" fontSize="12" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Inter, sans-serif">Cell</text>
      <rect x="110" y="22" width="150" height="32" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.3" />
      <text x="185" y="43" fontSize="14" fontWeight="900" fill="#047857" textAnchor="middle" fontFamily="Cairo, Inter, sans-serif">دقة عزل 97.5%</text>
      <rect x="110" y="62" width="150" height="32" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.3" />
      <text x="185" y="83" fontSize="14" fontWeight="900" fill="#1e40af" textAnchor="middle" fontFamily="Cairo, Inter, sans-serif">استعادة &lt; 30s</text>
      <rect x="14" y="110" width="252" height="28" rx="7" fill="#ffffff" stroke={ACCENT} strokeWidth="1.3" />
      <text x="140" y="128" fontSize="13" fontWeight="900" fill={ACCENT} textAnchor="middle" fontFamily="Inter, Cairo, sans-serif">No-Jamming · صون الطوارئ</text>
    </svg>
  );
}

const QUESTIONS: Question[] = [
  {
    code: "Q1",
    title: "الموازنة الرياضية للأهداف المتعارضة",
    q: "كيف يمكن صياغة دالة هدف رياضية موحدة توازن بدقة بين تعظيم التغطية وخفض التكلفة وترشيد الطاقة والإنصاف المكاني؟",
    method: "",
    tone: PRIMARY,
    svg: <SvgQ1 />,
  },
  {
    code: "Q2",
    title: "الكفاءة الخوارزمية وسلوك التقارب والاستقرار",
    q: "أي الخوارزميتين (BPSO أم AGA) تحقق تفوقاً حاسماً في سرعة الحل والدقة وثبات النتائج الإحصائية مع آلية الإصلاح؟",
    method: "",
    tone: ACCENT,
    svg: <SvgQ2 />,
  },
  {
    code: "Q3",
    title: "الربط المكاني بين طبقات GIS ومعلمات RAN",
    q: "كيف تُترجم الطبقات الطبوغرافية الرقمية (DEM و Clutter) إلى معلمات تشغيلية مباشرة تحد من التداخل الراديوي؟",
    method: "",
    tone: PRIMARY,
    svg: <SvgQ3 />,
  },
  {
    code: "Q4",
    title: "المحددات الهندسية للعزل البرمجي وزمن الاستعادة",
    q: "ما هي الحدود الهندسية لدقة عزل الخلايا بدون تشويش، وما هو الزمن اللازم للاستعادة الفورية في بيئة متعددة الموردين؟",
    method: "",
    tone: ACCENT,
    svg: <SvgQ4 />,
  },
];

function QuestionRow({
  item,
  show,
}: {
  item: Question;
  show: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.article
          dir="rtl"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "64px minmax(0, 1fr)",
            gap: 12,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QMark tone={item.tone} active code={item.code} size={56} />
          </div>

          <div
            style={{
              minWidth: 0,
              minHeight: 0,
              background: "#ffffff",
              borderRadius: 16,
              border: `1.5px solid ${item.tone}40`,
              boxShadow: `0 6px 16px ${item.tone}12`,
              padding: "10px 12px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.55fr) minmax(200px, 240px)",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "clamp(16px, 1.35vw, 20px)",
                  fontWeight: 900,
                  color: item.tone,
                  lineHeight: 1.35,
                  marginBottom: 4,
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                {item.title}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(15px, 1.25vw, 18px)",
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1.5,
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                {item.q}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: 118,
                maxHeight: 140,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {item.svg}
            </div>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}

export const Slide09Questions: React.FC = () => {
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 6,
    initialStep: 1,
    anyKeyAdvance: true,
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
        gap: 10,
        padding: "clamp(10px, 1.4vh, 16px) clamp(18px, 2.2vw, 32px)",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        background: "transparent",
        color: "var(--text-dark, #000000)",
        cursor: "pointer",
        userSelect: "none",
      }}
      title=""
    >
      {/* Background kept clean — parchment only */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 12% 18%, rgba(107,31,42,0.08), transparent 28%), radial-gradient(circle at 88% 80%, rgba(66,129,119,0.10), transparent 32%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div
            style={{
              width: 6,
              height: 36,
              borderRadius: 4,
              background: `linear-gradient(180deg, ${ACCENT} 0%, ${PRIMARY} 100%)`,
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: ACCENT,
                lineHeight: 1.35,
                marginBottom: 2,
              }}
            >
              الأسئلة البحثية الرئيسية للأطروحة
              </div>
            <h1
              style={{
                fontSize: "clamp(26px, 2.9vw, 38px)",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                lineHeight: 1.45,
              }}
            >
            </h1>
          </div>
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
              transition={{ duration: 0.25, ease: EASE }}
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: step >= 2 ? PRIMARY : ACCENT,
                background: step >= 2 ? "rgba(66,129,119,0.1)" : "rgba(107,31,42,0.08)",
                borderRadius: 999,
                padding: "5px 12px",
                lineHeight: 1.35,
                whiteSpace: "nowrap",
              }}
            >
              {beat}
            </motion.span>
          </AnimatePresence>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              position: "relative",
              zIndex: 10,
              flexShrink: 0,
              background: `linear-gradient(135deg, ${ACCENT} 0%, #831843 58%, ${PRIMARY} 160%)`,
              borderRadius: 18,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#ffffff",
              boxShadow: "0 10px 28px rgba(107,31,42,0.22)",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: -8,
                top: -18,
                fontSize: 120,
                fontWeight: 900,
                opacity: 0.12,
                fontFamily: "Cairo, sans-serif",
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              ؟
            </div>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "#ffffff",
                color: ACCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 900,
                fontFamily: "Cairo, sans-serif",
                lineHeight: 1,
                flexShrink: 0,
                boxShadow: "0 8px 18px rgba(0,0,0,0.16)",
              }}
            >
              ؟
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.16)",
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 14,
                  fontWeight: 900,
                  marginBottom: 6,
                  lineHeight: 1.35,
                }}
              >
                السؤال البحثي العمومي
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(17px, 1.55vw, 22px)",
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                كيف نبني إطاراً تحسينياً متكاملاً يجمع بين الذكاء الحسابي والتحكم
                المكاني في شبكة وطنية حقيقية متعددة الأجيال والموردين؟
              </p>
            </div>
            <span
              style={{
                flexShrink: 0,
                background: "rgba(255,255,255,0.16)",
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 14,
                fontWeight: 900,
                lineHeight: 1.35,
                whiteSpace: "nowrap",
              }}
            >
              تكامل 4 أسئلة 
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {QUESTIONS.map((item, index) => (
          <QuestionRow
            key={item.code}
            item={item}
            show={step >= index + 3}
          />
        ))}
      </div>
    </div>
  );
};

export default Slide09Questions;
