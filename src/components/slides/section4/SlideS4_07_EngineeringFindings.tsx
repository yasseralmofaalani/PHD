// S4_07 — Key engineering findings (thesisData only)
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SlideStage, SlideTitleBlock, NumberReveal, DeltaCallout, SlideFootnote } from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import {
  datasetStats,
  scenarioS2,
  thesisMetrics,
  spatialFairnessIndex,
  isolationAccuracy,
  pValues,
} from "../../../data/thesisData";

export const SlideS4_07_EngineeringFindings: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <SlideStage variant="hero" chapter="النتائج · 07" sectionTag="KEY FINDINGS">
      <SlideTitleBlock
        eyebrow="خلاصة هندسية"
        titleAr="أرقام محورية — من حجم البيانات إلى العدالة والتحكم المكاني"
        accent="primary"
        compact
      />

      <motion.div
        initial={reduce ? undefined : { opacity: 0.96 }}
        animate={{ opacity: 1 }}
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "0.55fr 1.45fr",
          gap: space.lg,
          marginTop: space.sm,
        }}
      >
        <div
          style={{
            borderRadius: 20,
            padding: space.lg,
            background: `radial-gradient(circle at 40% 20%, ${alpha(palette.primary, 0.25)} 0%, ${alpha(palette.primary, 0.05)} 70%)`,
            border: `2px solid ${alpha(palette.primary, 0.35)}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: space.sm,
          }}
        >
          <div style={{ fontWeight: 900, color: palette.primary, fontSize: typeTokens.small }}>حجم التجربة</div>
          <NumberReveal value={datasetStats.totalSites} fractionDigits={0} size={typeTokens.hero} color={palette.primary} />
          <div style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft, textAlign: "center" }}>
            S2: {scenarioS2.coverage.bpso}% تغطية BPSO · Ch.5: {thesisMetrics.coverage.bpso}% مع SFI
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: space.sm,
            alignContent: "center",
          }}
        >
          <DeltaCallout
            delta={`${thesisMetrics.coverage.bpso}%`}
            label="تغطية · سيناريو SFI"
            from={`S2 ${scenarioS2.coverage.bpso}%`}
            to={`Ch.5 ${thesisMetrics.coverage.bpso}%`}
            color={palette.primary}
          />
          <DeltaCallout
            delta={`${thesisMetrics.cost.bpso} M$`}
            label="تكلفة BPSO · مع SFI"
            from={`S2 ${scenarioS2.cost.bpso} M$`}
            to={`${thesisMetrics.cost.bpso} M$`}
            color={palette.accent}
          />
          <DeltaCallout
            delta={`${thesisMetrics.energy.bpso} MWh`}
            label="طاقة BPSO · مع SFI"
            from={`S2 ${scenarioS2.energy.bpso} MWh`}
            to={`${thesisMetrics.energy.bpso} MWh`}
            color={palette.success}
          />
          <DeltaCallout
            delta={`+${thesisMetrics.fairnessGainPct}%`}
            label="تحسّن SFI · BPSO vs AGA"
            from={thesisMetrics.fairness.aga.toFixed(2)}
            to={thesisMetrics.fairness.bpso.toFixed(2)}
            color={palette.accent}
          />
          <DeltaCallout
            delta={`${spatialFairnessIndex.bpsoWithoutFairness} → ${spatialFairnessIndex.bpsoWithFairness}`}
            label="SFI BPSO · بدون → مع قيد"
            from="بدون عدالة"
            to="مع SFI"
            color={palette.warning}
          />
          <DeltaCallout
            delta={`${isolationAccuracy.urban}%`}
            label="دقة عزل · حضري كثيف"
            from="Ch.6 Table 32"
            to="Dense Urban"
            color={palette.primaryDeep}
          />
        </div>
      </motion.div>

      <SlideFootnote badge={`n=${pValues.runs}`} color={palette.primary}>
        فروق التخطيط (Ch.5) مؤكدة إحصائياً — p تغطية {pValues.coverage} · تكلفة/طاقة/عدالة {pValues.cost}.
      </SlideFootnote>
    </SlideStage>
  );
};
