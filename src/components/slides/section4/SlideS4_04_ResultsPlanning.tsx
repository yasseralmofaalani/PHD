// S4_04 — S2 dashboard: BPSO vs AGA (no SFI) — scenarioS2 only
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  DuelMetric,
  MetricMeaning,
  DeltaCallout,
  MediaPlane,
  ThesisFigure,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { scenarioS2 } from "../../../data/thesisData";

export const SlideS4_04_ResultsPlanning: React.FC = () => {
  const reduce = useReducedMotion();
  const s = scenarioS2;
  const tie = "tie" as const;

  return (
    <SlideStage variant="default" chapter="النتائج · 04 · S2" sectionTag="S2 · AGA vs BPSO">
      <SlideTitleBlock
        eyebrow={s.scenario}
        titleAr="أداء الاستمثال ثلاثي الأهداف — مقارنة موازية BPSO و AGA"
        accent="primary"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 0.85fr 0.85fr",
          gridTemplateRows: "auto 1fr",
          gap: space.md,
          marginTop: space.sm,
        }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: space.sm,
          }}
        >
          <DuelMetric
            label="تغطية %"
            bpso={`${s.coverage.bpso}`}
            aga={`${s.coverage.aga}`}
            winner={tie}
            color={palette.primary}
          />
          <DuelMetric label="تكلفة M$" bpso={`${s.cost.bpso}`} aga={`${s.cost.aga}`} winner={tie} color={palette.accent} />
          <DuelMetric label="طاقة MWh" bpso={`${s.energy.bpso}`} aga={`${s.energy.aga}`} winner={tie} color={palette.success} />
          <DuelMetric
            label="زمن تشغيل ث"
            bpso={`${s.runtime.bpso}`}
            aga={`${s.runtime.aga}`}
            winner={tie}
            color={palette.primaryDeep}
          />
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: space.sm, minHeight: 0 }}>
          <MetricMeaning
            label="σ التغطية · BPSO / AGA"
            meaning={`${s.stdDev.coverage.bpso} / ${s.stdDev.coverage.aga} — AGA انحراف معياري أقل (استقرار أعلى عبر التشغيلات).`}
            color={palette.accent}
          />
          <MetricMeaning
            label="σ التكلفة · BPSO / AGA"
            meaning={`${s.stdDev.cost.bpso} / ${s.stdDev.cost.aga} M$`}
            color={palette.accent}
          />
          <MetricMeaning
            label="σ الطاقة · BPSO / AGA"
            meaning={`${s.stdDev.energy.bpso} / ${s.stdDev.energy.aga} MWh`}
            color={palette.accent}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: space.sm, flex: 1 }}>
            <DeltaCallout
              delta={`+${s.vsAga.coverageGainPp} pp`}
              label="فرق تغطية BPSO عن AGA"
              from={`AGA ${s.coverage.aga}%`}
              to={`BPSO ${s.coverage.bpso}%`}
              color={palette.primary}
            />
            <DeltaCallout
              delta={`−${s.vsAga.costReductionPct}%`}
              label="تكلفة BPSO عن AGA"
              from={`${s.cost.aga} M$`}
              to={`${s.cost.bpso} M$`}
              color={palette.accent}
            />
            <DeltaCallout
              delta={`−${s.vsAga.energyImprovementPct}%`}
              label="طاقة BPSO عن AGA"
              from={`${s.energy.aga} MWh`}
              to={`${s.energy.bpso} MWh`}
              color={palette.success}
            />
            <DeltaCallout
              delta={`−${s.vsAga.runtimeFasterPct}%`}
              label="زمن BPSO عن AGA"
              from={`${s.runtime.aga} ث`}
              to={`${s.runtime.bpso} ث`}
              color={palette.primaryDeep}
            />
          </div>
        </div>

        <ThesisFigure
          src="thesis_figures/fig14_convergence_300_iters.png"
          fig="شكل 14"
          caption="تقارب AGA و BPSO"
          style={{ minHeight: 0 }}
        />
        <MediaPlane
          src="thesis_figures/fig15_pareto_coverage_cost.png"
          fig="شكل 15"
          caption="جبهة باريتو — S2"
          tint={palette.success}
        />
      </div>

      <SlideFootnote badge="S2" color={palette.primary}>
        المتوسطات من الجداول 9–11 و13 (الفصل 4). BPSO أعلى كمياً على المتوسط؛ AGA تظهر σ أصغر على التغطية والتكلفة والطاقة.
      </SlideFootnote>
    </SlideStage>
  );
};
