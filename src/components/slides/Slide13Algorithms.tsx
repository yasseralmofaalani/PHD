// ============================================================
//  Slide 15 (display) / index 10 — المفاضلة الخوارزمية
//  ومسوغات اختيار الذكاء السربي والجيني
//
//  Visual redesign: three expressive vignettes (DNA / Swarm /
//  Explosion) + four compact justifications, closing with the
//  dual-algorithm decision + constraint repair.
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Binary,
  Compass,
  Network,
  Zap,
  GitMerge,
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

/** Four short methodological justifications — projector-readable. */
const reasons: { ar: string; hint: string; icon: LucideIcon }[] = [
  {
    icon: Network,
    ar: "فضاء حلول هائل",
    hint: "نمو أُسّي مع عدد المواقع",
  },
  {
    icon: Binary,
    ar: "مسألة NP-Hard",
    hint: "الطرق الدقيقة غير عملية",
  },
  {
    icon: Compass,
    ar: "أهداف متعارضة",
    hint: "تغطية · تكلفة · طاقة · عدالة",
  },
  {
    icon: Zap,
    ar: "توازن السرعة والاستقرار",
    hint: "تجنب الحلول المحلية الرديئة",
  },
];

export const Slide13Algorithms: React.FC<Props> = ({ onOpenModal }) => {
  // Steps: 1 title → 2 AGA → 3 BPSO → 4 MILP → 5 reasons → 6 decision
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

  return (
    <div
      onClick={handleClick}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      title=""
    >
      <SlideStage
        variant="default"
        chapter=""
        sectionTag=""
        padding="tight"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: space.md,
            marginBottom: space.sm,
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

        {/* Three visual algorithm cards */}
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
            kind="aga"
            active={step >= 2}
            titleAr="الخوارزمية الجينية التكيفية"
            titleEn="Adaptive Genetic Algorithm"
            tagline="نمذجة تطورية: انتخاب · عبور · طفرات تكيفية"
            strength="استكشاف واسع وتجنب الحلول المحلية"
            limit="تقارب أبطأ مع تضخم فضاء البحث"
            onDetail={onOpenModal ? () => onOpenModal("aga") : undefined}
            detailLabel="تفاصيل ↗"
          />
          <AlgoSceneCard
            kind="bpso"
            active={step >= 3}
            titleAr="تحسين سرب الجسيمات الثنائية"
            titleEn="Binary Particle Swarm Optimization"
            tagline="سلوك أسراب: خبرة فردية وجماعية (gBest)"
            strength="سرعة تقارب وذاكرة جمعية كفؤة"
            limit="حساسية للحلول المحلية دون إصلاح القيود"
            onDetail={onOpenModal ? () => onOpenModal("bpso") : undefined}
            detailLabel="تفاصيل ↗"
          />
          <AlgoSceneCard
            kind="milp"
            active={step >= 4}
            titleAr="البرمجة الخطية الصحيحة المختلطة"
            titleEn="Mixed-Integer Linear Programming"
            tagline="أمثلية قطعية نظرياً — غير عملية على الشبكة"
            strength="حل أمثل مطلق للنماذج محدودة الحجم"
            limit="مستحيل حاسوبياً على 79,268 موقعاً"
          />
        </div>

        {/* Justifications + decision */}
        <div
          style={{
            marginTop: space.md,
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: space.md,
            flexShrink: 0,
          }}
        >
          {/* 4 compact reasons */}
          <motion.div
            initial={false}
            animate={{
              opacity: step >= 5 ? 1 : 0.12,
              y: step >= 5 ? 0 : 10,
            }}
            transition={t.cinema}
            style={{
              background: "#fff",
              borderRadius: radius.lg,
              border: `1.5px solid ${alpha(palette.primary, 0.22)}`,
              padding: `${space.md}px ${space.lg}px`,
              boxShadow: shadow.soft,
            }}
          >
            <div
              style={{
                fontSize: typeTokens.micro,
                fontWeight: 900,
                color: palette.primary,
                marginBottom: space.sm,
                letterSpacing: "-0.15px",
              }}
            >
              لماذا الاستدلال الفوقي؟
            </div>
            <motion.div
              variants={staggerParent(0.05, 0)}
              initial={shouldReduce || step < 5 ? undefined : "hidden"}
              animate={step >= 5 ? "visible" : undefined}
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
                      <span
                        style={{
                          fontSize: 17,
                          fontWeight: 900,
                          color: palette.ink,
                          lineHeight: 1.25,
                        }}
                      >
                        {r.ar}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: palette.inkMuted,
                          lineHeight: 1.3,
                        }}
                      >
                        {r.hint}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Thesis decision */}
          <motion.div
            initial={false}
            animate={{
              opacity: step >= 6 ? 1 : 0.1,
              scale: step >= 6 ? 1 : 0.96,
            }}
            transition={t.cinema}
            style={{
              background: `linear-gradient(145deg, ${palette.accentDeep} 0%, ${palette.accent} 55%, ${palette.primaryDeep} 100%)`,
              borderRadius: radius.lg,
              padding: `${space.lg}px ${space.lg}px`,
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
                opacity: 0.88,
              }}
            >
              <GitMerge size={15} />
              قرار الأطروحة
            </div>
            <div
              style={{
                fontSize: typeTokens.body,
                fontWeight: 900,
                lineHeight: 1.45,
              }}
            >
              مقارنة متوازية لـ{" "}
              <span style={{ color: "#f5e6a8" }}>BPSO</span>
              {" و "}
              <span style={{ color: "#f5e6a8" }}>AGA</span>
              {" مع آلية إصلاح القيود على بيانات شبكة واسعة النطاق."}
            </div>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                opacity: 0.8,
                lineHeight: 1.4,
                borderTop: `1px solid ${alpha("#fff", 0.18)}`,
                paddingTop: 8,
              }}
            >
              معيار المفاضلة: سرعة التقارب · استقرار النتائج · تفادي الحلول المحلية
            </div>
          </motion.div>
        </div>
      </SlideStage>
    </div>
  );
};

export default Slide13Algorithms;
