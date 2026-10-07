import React from "react";
import { motion } from "framer-motion";
import { ArrowDefs, Box, C, Draw, Pulse, ShowG, T } from "./kit";

export type RepairBranch = "budget" | "coverage" | "fairness";

interface RepairEngineProps {
  /** 1 evaluate · 2 decision · 3 budget · 4 coverage · 5 fairness · 6 re-evaluate/feasible · 7 fitness/sink */
  stage: number;
  fairness: "locked" | "active";
  showFairness?: boolean;
  focus?: RepairBranch | "all" | null;
  sink?: string;
  style?: React.CSSProperties;
}

function branchSpec(showFairness: boolean) {
  const bx = showFairness
    ? { budget: 790, coverage: 500, fairness: 210 }
    : { budget: 700, coverage: 300, fairness: 210 };
  return {
    bx,
    budget: {
      color: C.red,
      head: "تجاوز قيد الميزانية",
      action: "استبعاد المواقع الأقل جدوى",
      sub: "أدنى نسبة (تغطية / تكلفة) حتى استيفاء الميزانية",
      feed: `M500 314 V 336 H ${bx.budget} V 362`,
      merge: `M${bx.budget} 503 V 520 H 500 V 532`,
    },
    coverage: {
      color: C.gold,
      head: "عدم استيفاء حد التغطية",
      action: "تفعيل المواقع الأعلى كفاءة",
      sub: "أعلى نسبة (تغطية / تكلفة) حتى بلوغ العتبة الدنيا",
      feed: showFairness ? `M500 314 V 362` : `M500 314 V 336 H ${bx.coverage} V 362`,
      merge: showFairness ? `M500 503 V 532` : `M${bx.coverage} 503 V 520 H 500 V 532`,
    },
    fairness: {
      color: C.green,
      head: "انتهاك شرط العدالة المكانية",
      action: "إعادة التوازن الجغرافي للمواقع",
      sub: "بين النطاقات الجغرافية لاستيفاء عتبات αj",
      feed: `M500 314 V 336 H ${bx.fairness} V 362`,
      merge: `M${bx.fairness} 503 V 520 H 500 V 532`,
    },
  } as const;
}

const BranchGroup: React.FC<{
  id: RepairBranch;
  locked?: boolean;
  focused: boolean;
  dimmed: boolean;
  spec: ReturnType<typeof branchSpec>;
}> = ({ id, locked, focused, dimmed, spec }) => {
  const b = spec[id];
  const x = spec.bx[id];
  const color = locked ? "#9aa3a8" : b.color;
  return (
    <g opacity={dimmed ? 0.35 : 1}>
      <Draw d={b.feed} color={color} width={2.2} dashed={locked} arrow={locked ? undefined : `re-${id}`} />
      <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45 }}>
        <Box x={x} y={388} w={250} h={52} label={b.head} color={color} solid={!locked} size={18} glow={focused && !locked} dashed={locked} />
        {!locked && (
          <>
            <Draw d={`M${x} 414 V 434`} color={color} width={2} delay={0.5} />
            <Box x={x} y={468} w={280} h={70} label={b.action} sub={b.sub} color={color} size={17} />
          </>
        )}
      </motion.g>
      {focused && !locked && <Pulse d={`${b.feed} V 434 M${x} 503`} color={b.color} r={6} dur={1.8} />}
    </g>
  );
};

export const RepairEngine: React.FC<RepairEngineProps> = ({
  stage,
  fairness,
  showFairness = true,
  focus = null,
  sink = "pBest / gBest",
  style,
}) => {
  const spec = branchSpec(showFairness);
  const dim = (id: RepairBranch) => focus !== null && focus !== "all" && focus !== id;
  return (
    <svg viewBox="0 0 1000 655" style={{ width: "100%", height: "100%", overflow: "hidden", ...style }}>
      <ArrowDefs colors={{ "re-main": C.teal, "re-budget": C.red, "re-coverage": C.gold, "re-fairness": C.green, "re-ok": C.green }} />

      {/* Stage 1 — new solution enters the engine */}
      <ShowG step={stage} at={1}>
        <Box x={500} y={36} w={260} h={52} label="متجه حل مرشح" sub="عقب كل دورة تحديث" color={C.teal} size={18} />
        <Draw d="M500 62 V 82" color={C.teal} arrow="re-main" />
        <Box x={500} y={108} w={240} h={48} label="فحص استيفاء القيود" color={C.teal} solid size={18} />
        <Draw d="M500 132 V 148" color={C.teal} arrow="re-main" delay={0.3} />
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} style={{ transformOrigin: "500px 190px" }}>
          <path d="M500 150 L620 190 L500 230 L380 190 Z" fill="#fff" stroke={C.ink} strokeWidth={1.8} />
          <foreignObject x={400} y={168} width={200} height={44} style={{ overflow: "hidden" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                direction: "rtl",
                fontFamily: "Cairo, sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: C.ink,
                lineHeight: 1.2,
              }}
            >
              هل الحل مقبول ؟
            </div>
          </foreignObject>
        </motion.g>
      </ShowG>

      {/* Stage 2 — yes / no */}
      <ShowG step={stage} at={2}>
        <Draw d="M620 190 H 760" color={C.green} arrow="re-ok" />
        <T x={688} y={176} size={16} weight={900} fill={C.green}>
          نعم
        </T>
        <Box x={850} y={190} w={168} h={50} label="حل مقبول مباشرة" color={C.green} size={17} />
        <Draw d="M500 230 V 268" color={C.red} arrow="re-budget" delay={0.2} />
        <T x={524} y={250} size={16} weight={900} fill={C.red}>
          لا
        </T>
        <Box x={500} y={296} w={250} h={50} label="تصنيف القيود الغير مقبولة" color={C.red} size={18} />
      </ShowG>

      {/* Stages 3–5 — one repair path per violated constraint */}
      <ShowG step={stage} at={3}>
        <BranchGroup id="budget" spec={spec} focused={focus === "budget" || focus === "all"} dimmed={dim("budget")} />
      </ShowG>
      <ShowG step={stage} at={4}>
        <BranchGroup id="coverage" spec={spec} focused={focus === "coverage" || focus === "all"} dimmed={dim("coverage")} />
      </ShowG>
      {showFairness && (
        <ShowG step={stage} at={5}>
          <BranchGroup id="fairness" spec={spec} locked={fairness === "locked"} focused={focus === "fairness" || focus === "all"} dimmed={dim("fairness")} />
        </ShowG>
      )}

      {/* Stage 6 — the paths converge */}
      <ShowG step={stage} at={6}>
        <Draw d={spec.budget.merge} color={C.teal} width={2.2} />
        <Draw d={spec.coverage.merge} color={C.teal} width={2.2} />
        {showFairness && fairness === "active" && <Draw d={spec.fairness.merge} color={C.teal} width={2.2} />}
        <Box x={500} y={552} w={230} h={44} label="التحقق بعد الإصلاح" color={C.teal} size={17} />
        <Draw d="M500 574 V 588" color={C.green} arrow="re-ok" delay={0.3} />
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45, type: "spring", stiffness: 180, damping: 14 }} style={{ transformOrigin: "500px 612px" }}>
          <Box x={500} y={612} w={250} h={48} label="حل مقبول · Feasible" color={C.green} solid size={18} glow />
        </motion.g>
        <Draw d="M850 215 V 612 H 625" color={C.green} width={2} dashed arrow="re-ok" delay={0.2} />
      </ShowG>

      {/* Stage 7 — back to the optimizer */}
      <ShowG step={stage} at={7}>
        <Draw d="M375 612 H 348" color={C.teal} arrow="re-main" />
        <Box x={270} y={612} w={150} h={48} label="الجدارة Fitness" color={C.teal} size={16} />
        <Draw d="M195 612 H 168" color={C.teal} arrow="re-main" delay={0.25} />
        <Box x={92} y={612} w={148} h={48} label={sink} color={C.maroon} solid size={15} />
        <Pulse d="M500 62 V 612 H 92" color={C.gold} r={5} dur={3.2} />
      </ShowG>
    </svg>
  );
};
