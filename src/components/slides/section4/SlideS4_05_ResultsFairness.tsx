// S4_05 — Spatial fairness scenario (WITH SFI) — thesisMetrics
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  NumberReveal,
  MediaPlane,
  DuelMetric,
  DeltaCallout,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { thesisMetrics, spatialFairnessIndex, improvementGains } from "../../../data/thesisData";

export const SlideS4_05_ResultsFairness: React.FC = () => {
  const reduce = useReducedMotion();
  const m = thesisMetrics;
  const sf = spatialFairnessIndex;
  const tie = "tie" as const;

  return (
    <SlideStage variant="default" chapter="النتائج · 05 · SFI" sectionTag="FAIRNESS + PERFORMANCE">
      <SlideTitleBlock
        eyebrow={m.scenario}
        titleAr="إدراج SFI يعيد توازن التوزيع الجغرافي مع الحفاظ على كفاءة الشبكة"
        accent="accent"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr 1fr",
          gap: space.md,
          marginTop: space.sm,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: space.sm, minHeight: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: space.sm }}>
            <motion.div
              initial={reduce ? undefined : { opacity: 0.94 }}
              animate={{ opacity: 1 }}
              style={{
                borderRadius: 16,
                padding: space.md,
                background: alpha(palette.warning, 0.1),
                border: `1.5px solid ${alpha(palette.warning, 0.35)}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: typeTokens.micro, fontWeight: 900, color: palette.warning }}>A · بدون عدالة</div>
              <div style={{ fontSize: typeTokens.small, fontWeight: 800, color: palette.inkSoft, margin: "4px 0" }}>
                BPSO SFI
              </div>
              <NumberReveal value={sf.bpsoWithoutFairness} fractionDigits={2} size={typeTokens.h1} color={palette.warning} />
              <div style={{ fontSize: typeTokens.micro, fontWeight: 700, color: palette.inkSoft }}>
                AGA {sf.agaWithoutFairness.toFixed(2)}
              </div>
            </motion.div>
            <motion.div
              initial={reduce ? undefined : { opacity: 0.94 }}
              animate={{ opacity: 1 }}
              style={{
                borderRadius: 16,
                padding: space.md,
                background: alpha(palette.accent, 0.14),
                border: `2px solid ${alpha(palette.accent, 0.45)}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: typeTokens.micro, fontWeight: 900, color: palette.accent }}>B · مع SFI</div>
              <div style={{ fontSize: typeTokens.small, fontWeight: 800, color: palette.inkSoft, margin: "4px 0" }}>
                BPSO SFI
              </div>
              <NumberReveal value={m.fairness.bpso} fractionDigits={2} size={typeTokens.h1} color={palette.accent} />
              <div style={{ fontSize: typeTokens.micro, fontWeight: 700, color: palette.inkSoft }}>
                AGA {m.fairness.aga.toFixed(2)} · +{m.fairnessGainPct}%
              </div>
            </motion.div>
          </div>

          <div
            style={{
              padding: space.sm,
              borderRadius: 12,
              background: alpha(palette.primary, 0.06),
              border: `1px solid ${alpha(palette.primary, 0.22)}`,
              fontSize: typeTokens.micro,
              fontWeight: 700,
              color: palette.inkSoft,
              lineHeight: 1.4,
            }}
          >
            {sf.description} (Jain · {sf.range.min}–{sf.range.max})
          </div>

          <MediaPlane
            src="thesis_figures/fig24_syria_bpso_geographic_distribution.png"
            fig="شكل 24"
            caption="توزيع العدالة المكانية بعد إدراج SFI"
            tint={palette.accent}
            style={{ flex: 1, minHeight: 120 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: space.sm, alignContent: "start" }}>
          <DuelMetric label="تغطية %" bpso={`${m.coverage.bpso}`} aga={`${m.coverage.aga}`} winner={tie} color={palette.primary} />
          <DuelMetric label="تكلفة M$" bpso={`${m.cost.bpso}`} aga={`${m.cost.aga}`} winner={tie} color={palette.accent} />
          <DuelMetric label="طاقة MWh" bpso={`${m.energy.bpso}`} aga={`${m.energy.aga}`} winner={tie} color={palette.success} />
          <DuelMetric label="SFI" bpso={`${m.fairness.bpso}`} aga={`${m.fairness.aga}`} winner={tie} color={palette.accent} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: space.sm }}>
          <DeltaCallout
            delta={improvementGains.cost}
            label="تكلفة BPSO vs AGA"
            from={`${m.cost.aga} M$`}
            to={`${m.cost.bpso} M$`}
            color={palette.accent}
          />
          <DeltaCallout
            delta={improvementGains.energy}
            label="طاقة BPSO vs AGA"
            from={`${m.energy.aga} MWh`}
            to={`${m.energy.bpso} MWh`}
            color={palette.success}
          />
          <DeltaCallout
            delta={improvementGains.fairness}
            label="SFI BPSO vs AGA"
            from={m.fairness.aga.toFixed(2)}
            to={m.fairness.bpso.toFixed(2)}
            color={palette.accent}
          />
          <DeltaCallout
            delta={improvementGains.coverage}
            label="تغطية BPSO vs AGA"
            from={`${m.coverage.aga}%`}
            to={`${m.coverage.bpso}%`}
            color={palette.primary}
          />
        </div>
      </div>

      <SlideFootnote badge="Ch.5" color={palette.accent}>
        النماذج التقليدية: تمركز ≈{sf.traditionalUrbanInvestmentSharePct}% من الاستثمارات في المراكز الحضرية
        (SFI≈{sf.bpsoWithoutFairness} بدون قيد) — إدراج SFI يرفع BPSO إلى {m.fairness.bpso}.
      </SlideFootnote>
    </SlideStage>
  );
};
