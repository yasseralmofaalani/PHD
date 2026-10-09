import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Scale,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useStepReveal } from "../../hooks/useStepReveal";

interface Slide06Props {
  onOpenModal?: (id: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const PRIMARY = "#428177";
const ACCENT = "#6b1f2a";
const GREEN = "#2e7d5b";

const OBJECTIVES = [
  { title: "التغطية", hint: "تعظيمها", color: PRIMARY, soft: "rgba(66,129,119,0.12)" },
  { title: "التكلفة", hint: "استثمار أقل", color: ACCENT, soft: "rgba(107,31,42,0.10)" },
  { title: "الطاقة", hint: "استهلاك أقل", color: "#9a6b12", soft: "rgba(154,107,18,0.14)" },
];

/** ثلاثة أهداف متعارضة بخط واضح: تغطية · تكلفة · طاقة */
const ConflictTriangle: React.FC = () => (
  <div
    style={{
      height: "100%",
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 4,
      padding: "2px 0",
    }}
  >
    <div style={{ display: "flex", alignItems: "stretch", gap: 6, minHeight: 0 }}>
      {OBJECTIVES.map((o, i) => (
        <React.Fragment key={o.title}>
          {i > 0 && (
            <div style={{ alignSelf: "center", color: ACCENT, fontWeight: 900, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>⇄</div>
          )}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              background: o.soft,
              border: `2px solid ${o.color}`,
              borderRadius: 12,
              padding: "6px 3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900, color: o.color, lineHeight: 1.15 }}>{o.title}</div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(15,23,42,0.72)", lineHeight: 1.2 }}>{o.hint}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
    <div style={{ textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "rgba(15,23,42,0.55)", lineHeight: 1.2 }}>
      ثلاثة أهداف متعارضة لا تتحقق معاً
    </div>
  </div>
);

/** شكل مفاهيمي: ميزان حضر / ريف */
const FairnessBalance: React.FC = () => (
  <svg viewBox="0 0 280 200" style={{ width: "100%", height: "100%" }} aria-hidden>
    <line x1="140" y1="28" x2="140" y2="155" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
    <polygon points="140,155 165,190 115,190" fill={ACCENT} />
    {/* Beam tilted toward city — the problem */}
    <g transform="rotate(-14 140 55)">
      <line x1="40" y1="55" x2="240" y2="55" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
      <line x1="55" y1="55" x2="55" y2="95" stroke={PRIMARY} strokeWidth="2.5" />
      <line x1="225" y1="55" x2="225" y2="95" stroke={ACCENT} strokeWidth="2.5" />
      <rect x="25" y="95" width="60" height="36" rx="8" fill="rgba(66,129,119,0.15)" stroke={PRIMARY} strokeWidth="2" />
      <rect x="195" y="95" width="60" height="36" rx="8" fill="rgba(107,31,42,0.18)" stroke={ACCENT} strokeWidth="2" />
      <text x="55" y="118" textAnchor="middle" fontSize="13" fontWeight="900" fill={PRIMARY} fontFamily="Cairo, sans-serif">
        ريف
      </text>
      <text x="225" y="118" textAnchor="middle" fontSize="13" fontWeight="900" fill={ACCENT} fontFamily="Cairo, sans-serif">
        حضر
      </text>
    </g>
    <text x="140" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill="rgba(15,23,42,0.5)" fontFamily="Cairo, sans-serif">
      انحياز التخطيط نحو المدن
    </text>
  </svg>
);

/** شكل مفاهيمي: تشويش عشوائي × عزل مكاني برمجي */
const IsolationContrast: React.FC = () => (
  <svg viewBox="0 0 280 200" style={{ width: "100%", height: "100%" }} aria-hidden>
    {/* Left: chaotic jamming */}
    <rect x="12" y="28" width="110" height="140" rx="14" fill="rgba(176,58,46,0.08)" stroke="#b03a2e" strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((i) => {
      const a = (i / 5) * Math.PI * 2;
      return (
        <line
          key={i}
          x1={67}
          y1={98}
          x2={67 + Math.cos(a) * 38}
          y2={98 + Math.sin(a) * 38}
          stroke="#b03a2e"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity={0.55}
        />
      );
    })}
    <circle cx="67" cy="98" r="10" fill="#b03a2e" />
    <text x="67" y="158" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b03a2e" fontFamily="Cairo, sans-serif">
      تشويش عشوائي
    </text>
    {/* VS */}
    <text x="140" y="105" textAnchor="middle" fontSize="16" fontWeight="900" fill="rgba(15,23,42,0.4)" fontFamily="Inter, sans-serif">
      ×
    </text>
    {/* Right: clean geofence */}
    <rect x="158" y="28" width="110" height="140" rx="14" fill="rgba(46,125,91,0.08)" stroke={GREEN} strokeWidth="2" />
    <circle cx="213" cy="98" r="42" fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="6 4" />
    <circle cx="213" cy="98" r="14" fill={GREEN} opacity="0.85" />
    <circle cx="198" cy="82" r="5" fill={PRIMARY} />
    <circle cx="228" cy="88" r="5" fill={PRIMARY} />
    <circle cx="220" cy="118" r="5" fill={PRIMARY} />
    <text x="213" y="158" textAnchor="middle" fontSize="13" fontWeight="900" fill={GREEN} fontFamily="Cairo, sans-serif">
      عزل مكاني برمجي
    </text>
  </svg>
);

const ISSUES = [
  {
    id: 1,
    icon: Radio,
    color: PRIMARY,
    badge: "المحور 01",
    title: "الترقية والموازنة متعددة الأهداف",
    problem:
      "كيف نختار مواقع الترقية من بنية قائمة دون بناء شبكة جديدة، مع موازنة تغطية أعلى وتكلفة أقل واستهلاك طاقة أقل في آنٍ واحد؟",
    Visual: ConflictTriangle,
  },
  {
    id: 2,
    icon: Scale,
    color: ACCENT,
    badge: "المحور 02",
    title: "العدالة المكانية في التوزيع",
    problem:
      "لماذا تنحاز قرارات التخطيط نحو الكثافة الحضرية؟ وكيف نُدخل شرطاً مكانياً يمنع تهميش الأرياف في خطط الترقية؟",
    Visual: FairnessBalance,
  },
  {
    id: 3,
    icon: ShieldCheck,
    color: GREEN,
    badge: "المحور 03",
    title: "التحكم التشغيلي دون تشويش",
    problem:
      "كيف نعزل نطاقاً جغرافياً بدقة من الشبكة نفسها — في بيئة متعددة الموردين — دون تشويش عشوائي يضر بالطيف وقنوات الطوارئ؟",
    Visual: IsolationContrast,
  },
] as const;

export const Slide06ResearchProblem: React.FC<Slide06Props> = () => {
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 5,
    initialStep: 1,
    anyKeyAdvance: true,
  });

  const stepsLabels = [
    { num: 1, label: "مدخل الإشكالية" },
    { num: 2, label: "1. الترقية" },
    { num: 3, label: "2. العدالة" },
    { num: 4, label: "3. العزل" },
    { num: 5, label: "الإطار الموحد" },
  ];

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
        gap: 6,
        padding: "clamp(8px, 1.2vh, 14px) clamp(16px, 2vw, 28px)",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        background: "transparent",
        color: "#0f172a",
        userSelect: "none",
        cursor: "pointer",
      }}
      title=""
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2.5px solid rgba(66, 129, 119, 0.25)",
          paddingBottom: 6,
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: ACCENT,
              boxShadow: "0 0 14px rgba(107, 31, 42, 0.55)",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(26px, 2.8vw, 36px)",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.3px",
              lineHeight: 1.5,
            }}
          >
            إشكالية البحث المركزية
          </h1>
        </div>

        <div
          data-no-advance="true"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#fff",
            padding: "4px 10px",
            borderRadius: 24,
            border: "1.5px solid rgba(66, 129, 119, 0.3)",
          }}
        >
          {stepsLabels.map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToStep(s.num);
              }}
              style={{
                padding: "5px 12px",
                borderRadius: 16,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 900,
                fontFamily: "Cairo, sans-serif",
                whiteSpace: "nowrap",
                background:
                  step === s.num
                    ? `linear-gradient(135deg, ${PRIMARY} 0%, #2c5952 100%)`
                    : step > s.num
                      ? "rgba(66, 129, 119, 0.15)"
                      : "transparent",
                color: step === s.num ? "#fff" : step > s.num ? PRIMARY : "#64748b",
              }}
            >
              {step > s.num ? `✓ ${s.label}` : s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Framing — problem only, no results */}
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: 16,
          border: "2px solid rgba(66, 129, 119, 0.35)",
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        <span
          style={{
            background: ACCENT,
            color: "#fff",
            padding: "6px 14px",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          صياغة الإشكالية
        </span>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(16px, 1.35vw, 19px)",
            fontWeight: 800,
            lineHeight: 1.55,
            color: "#0f172a",
          }}
        >
          تطوير منهجية لترقية الشبكات الخلوية القائمة نحو الجيل الخامس تحقق توازناً بين
          تعظيم التغطية، وتقليل تكلفة الاستثمار، وترشيد استهلاك الطاقة، وتحسين العدالة المكانية،
          وضمان التحكم الآمن بالخدمات دون تشويش على الطيف الراديوي.
        </p>
      </div>

      {/* Three conceptual issue columns */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {ISSUES.map((issue, i) => {
          const visible = step >= i + 2;
          const Icon = issue.icon;
          const Visual = issue.Visual;
          return (
            <div key={issue.id} style={{ minHeight: 0, display: "flex" }}>
              <AnimatePresence>
                {visible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{
                      flex: 1,
                      background: "#fff",
                      borderRadius: 18,
                      border: `2.5px solid ${issue.color}`,
                      boxShadow: `0 8px 22px ${issue.color}22`,
                      padding: "8px 10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      minHeight: 0,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          background: `${issue.color}18`,
                          color: issue.color,
                          padding: "4px 10px",
                          borderRadius: 10,
                          fontSize: 14,
                          fontWeight: 900,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Icon size={15} />
                        {issue.badge}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 22,
                          fontWeight: 900,
                          color: issue.color,
                        }}
                      >
                        {String(issue.id).padStart(2, "0")}
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "clamp(17px, 1.45vw, 21px)",
                        fontWeight: 900,
                        lineHeight: 1.35,
                        color: "#0f172a",
                      }}
                    >
                      {issue.title}
                    </h3>

                    <div
                      style={{
                        flex: "1 1 auto",
                        minHeight: 68,
                        overflow: "hidden",
                        borderRadius: 14,
                        background: `${issue.color}08`,
                        border: `1px solid ${issue.color}28`,
                        padding: 6,
                      }}
                    >
                      <Visual />
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "clamp(13.5px, 1.15vw, 15.5px)",
                        fontWeight: 800,
                        lineHeight: 1.35,
                        color: "rgba(15,23,42,0.72)",
                      }}
                    >
                      {issue.problem}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Synthesis — framing only */}
      <div style={{ minHeight: step >= 5 ? 52 : 0, flexShrink: 0, display: "flex", alignItems: "center" }}>
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                width: "100%",
                background: `linear-gradient(90deg, #1e293b 0%, #0f172a 100%)`,
                borderRadius: 14,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "2px solid rgba(251, 191, 36, 0.4)",
                boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
              }}
            >
              <CheckCircle2 size={22} color="#fbbf24" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "clamp(15px, 1.25vw, 18px)", fontWeight: 900, color: "#fff", lineHeight: 1.45 }}>
                <strong style={{ color: "#fbbf24" }}>خلاصة التأطير:</strong>{" "}
                ثلاث إشكاليات مترابطة — تخطيط الترقية، العدالة المكانية، والتحكم التشغيلي —
                تُعالَج ضمن إطار علمي وهندسي موحّد.
              </span>
              <Sparkles size={18} color="#fbbf24" style={{ flexShrink: 0, marginInlineStart: "auto" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide06ResearchProblem;
