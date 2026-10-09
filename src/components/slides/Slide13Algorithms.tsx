// ============================================================
//  مقارنة الخوارزميات واختيار الأسلوب المناسب
//  مسار سردي للتقديم: لماذا؟ → استبعاد MILP → AGA → BPSO → القرار
// ============================================================

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Binary,
  Compass,
  Network,
  Zap,
  GitMerge,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { SlideStage, SlideTitleBlock } from "../design/SlideStage";
import { palette, alpha, space, type as typeTokens, radius, shadow } from "../design/tokens";
import { fadeUp, staggerParent, t } from "../design/motion";
import { useStepReveal } from "../../hooks/useStepReveal";
import { StepIndicator } from "../ui/RevealItem";
import { AlgoSceneCard } from "../ui/visualPatterns/AlgoJustificationScene";

interface Props {
  onOpenModal?: (id: string) => void;
}

/** شريط إرشاد المتحدث — يتغيّر مع كل نقرة */
const CUES = [
  "ابدأ بالسؤال: لماذا لا نحلّ المسألة بالطرق الدقيقة؟",
  "أظهر المسوّغات الأربع — فضاء هائل · NP-Hard · أهداف متعارضة · توازن السرعة/الاستقرار",
  "MILP: أمثلية نظرية… لكن مستحيل على شبكة بهذا الحجم — نستبعده",
  "AGA: استكشاف واسع عبر التطور — مناسب لتجنّب الحلول المحلية",
  "BPSO: تقارب سريع بذاكرة السرب — مناسب للقرارات الثنائية",
  "القرار: نقارن AGA و BPSO معاً بنفس القيود ونفس إصلاح القيود",
] as const;

const reasons: { ar: string; hint: string; icon: LucideIcon }[] = [
  { icon: Network, ar: "فضاء حلول هائل", hint: "نمو أُسّي مع عدد المواقع" },
  { icon: Binary, ar: "مسألة NP-Hard", hint: "الطرق الدقيقة غير عملية" },
  { icon: Compass, ar: "أهداف متعارضة", hint: "تغطية · تكلفة · طاقة · عدالة" },
  { icon: Zap, ar: "توازن السرعة والاستقرار", hint: "تفادي الحلول المحلية الرديئة" },
];

export const Slide13Algorithms: React.FC<Props> = ({ onOpenModal }) => {
  // 1 عنوان → 2 مسوّغات → 3 MILP → 4 AGA → 5 BPSO → 6 قرار
  const { step, totalSteps, goToStep, goNext } = useStepReveal({
    totalSteps: 6,
    initialStep: 1,
    anyKeyAdvance: true,
  });
  const shouldReduce = useReducedMotion();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-advance]")) return;
    goNext();
  };

  const showReasons = step >= 2;
  const showMilp = step >= 3;
  const showAga = step >= 4;
  const showBpso = step >= 5;
  const showDecision = step >= 6;

  return (
    <div
      onClick={handleClick}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      title=""
    >
      <SlideStage variant="default" chapter="" sectionTag="" padding="tight">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: space.md,
            marginBottom: 6,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <SlideTitleBlock
              titleAr="مقارنة الخوارزميات واختيار الأسلوب المناسب"
              accent="primary"
              compact
            />
          </div>
          <div data-no-advance="true" style={{ paddingTop: 4, flexShrink: 0 }}>
            <StepIndicator
              totalSteps={totalSteps}
              currentStep={step}
              onStepClick={goToStep}
            />
          </div>
        </div>

        {/* Speaker cue — always visible, updates with step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.28 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: alpha(palette.primary, 0.08),
              border: `1.5px solid ${alpha(palette.primary, 0.22)}`,
              borderRadius: radius.lg,
              padding: "8px 14px",
              marginBottom: space.sm,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: alpha(palette.primary, 0.15),
                color: palette.primary,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={15} />
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: palette.primary,
                  marginBottom: 1,
                }}
              >
                ماذا أقول الآن · الخطوة {step}/{totalSteps}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: palette.ink,
                  lineHeight: 1.35,
                }}
              >
                {CUES[step - 1]}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Three algorithm cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: space.md,
            flex: "1 1 auto",
            minHeight: 0,
          }}
        >
          <AlgoSceneCard
            kind="milp"
            active={showMilp}
            focused={step === 3}
            titleAr="البرمجة الخطية الصحيحة المختلطة"
            titleEn="Mixed-Integer Linear Programming"
            tagline="أمثلية قطعية نظرياً — غير عملية هنا"
            strength="حل أمثل مطلق للنماذج محدودة الحجم"
            limit="مستحيل حاسوبياً على شبكة وطنية واسعة"
            speakCue="قل: نستبعد MILP عملياً رغم كمالها النظري."
          />
          <AlgoSceneCard
            kind="aga"
            active={showAga}
            focused={step === 4}
            titleAr="الخوارزمية الجينية التكيفية"
            titleEn="Adaptive Genetic Algorithm"
            tagline="تطوّر: انتخاب · عبور · طفرات تكيفية"
            strength="استكشاف واسع وتجنب الحلول المحلية"
            limit="تقارب أبطأ مع تضخم فضاء البحث"
            speakCue="قل: AGA تستكشف — مناسبة عندما نخشى القمم المحلية."
            onDetail={onOpenModal ? () => onOpenModal("aga") : undefined}
            detailLabel="تفاصيل ↗"
          />
          <AlgoSceneCard
            kind="bpso"
            active={showBpso}
            focused={step === 5}
            titleAr="تحسين سرب الجسيمات الثنائية"
            titleEn="Binary Particle Swarm Optimization"
            tagline="سرب: pBest · gBest · سرعة · Sigmoid"
            strength="سرعة تقارب وذاكرة جمعية كفؤة"
            limit="حساسية محلية دون إصلاح القيود"
            speakCue="قل: BPSO تتقارب بسرعة — مناسبة للاختيار الثنائي 0/1."
            onDetail={onOpenModal ? () => onOpenModal("bpso") : undefined}
            detailLabel="تفاصيل ↗"
          />
        </div>

        {/* Bottom: reasons + decision */}
        <div
          style={{
            marginTop: space.md,
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: space.md,
            flexShrink: 0,
          }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: showReasons ? 1 : 0.12,
              y: showReasons ? 0 : 10,
            }}
            transition={t.cinema}
            style={{
              background: "#fff",
              borderRadius: radius.lg,
              border: `1.5px solid ${alpha(palette.primary, step === 2 ? 0.45 : 0.22)}`,
              boxShadow: step === 2 ? `0 10px 28px ${alpha(palette.primary, 0.16)}` : shadow.soft,
              padding: `${space.md}px ${space.lg}px`,
            }}
          >
            <div
              style={{
                fontSize: typeTokens.micro,
                fontWeight: 900,
                color: palette.primary,
                marginBottom: space.sm,
              }}
            >
              لماذا الخوارزميات التجريبية؟
            </div>
            <motion.div
              variants={staggerParent(0.05, 0)}
              initial={shouldReduce || step < 2 ? undefined : "hidden"}
              animate={showReasons ? "visible" : undefined}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: alpha(palette.primary, 0.05),
                      borderRadius: radius.md,
                      padding: "10px 12px",
                      border: `1px solid ${alpha(palette.primary, 0.1)}`,
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: alpha(palette.primary, 0.12),
                        color: palette.primary,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} />
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 17, fontWeight: 900, color: palette.ink, lineHeight: 1.25 }}>
                        {r.ar}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: palette.inkMuted, lineHeight: 1.3 }}>
                        {r.hint}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: showDecision ? 1 : 0.1,
              scale: showDecision ? 1 : 0.96,
            }}
            transition={t.cinema}
            style={{
              background: `linear-gradient(145deg, ${palette.accentDeep} 0%, ${palette.accent} 55%, ${palette.primaryDeep} 100%)`,
              borderRadius: radius.lg,
              padding: `${space.lg}px`,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 10,
              boxShadow: `0 12px 28px ${alpha(palette.accent, 0.32)}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                insetInlineEnd: -20,
                bottom: -24,
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: alpha("#fff", 0.06),
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 800,
                opacity: 0.9,
              }}
            >
              <GitMerge size={15} />
              قرار الأطروحة
            </div>
            <div style={{ fontSize: typeTokens.body, fontWeight: 900, lineHeight: 1.45 }}>
              مقارنة متوازية لـ{" "}
              <span style={{ color: "#f5e6a8" }}>AGA</span>
              {" و "}
              <span style={{ color: "#f5e6a8" }}>BPSO</span>
              {" — نفس البيانات · نفس القيود · نفس إصلاح القيود."}
            </div>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                opacity: 0.82,
                lineHeight: 1.4,
                borderTop: `1px solid ${alpha("#fff", 0.18)}`,
                paddingTop: 8,
              }}
            >
              معيار المفاضلة لاحقاً: سرعة التقارب · الاستقرار · جودة الحل
            </div>
          </motion.div>
        </div>
      </SlideStage>
    </div>
  );
};

export default Slide13Algorithms;
