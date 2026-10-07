// ============================================================
//  ConstraintRepairMorph
//
//  Visualizes the originality of the thesis: the constraint
//  handling scheme replaces classical penalty functions with
//  a *deterministic repair operator*.
//
//  Story (three states):
//   1. INFEASIBLE   → binary vector x violates budget (Σci·xi > B)
//   2. REPAIR       → sort candidates by cost/coverage ratio;
//                     flip the least-efficient 1s to 0 until Σci·xi ≤ B
//   3. FEASIBLE     → vector guaranteed inside feasible region
//
//  Rendered as a row of 30 cells (representative of 30,010).
//  Autoplays through states with a shared reduced-motion path.
// ============================================================

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertTriangle, Wrench, CheckCircle2 } from "lucide-react";
import { palette, alpha, type as typeTokens, space, radius } from "../../design/tokens";

interface Cell {
  id: number;
  cost: number;      // $M per site
  coverage: number;  // fraction of population served
  selected: boolean; // xi in {0, 1}
  flippedByRepair?: boolean;
}

type Phase = "infeasible" | "repair" | "feasible";

const N_CELLS = 30;
const BUDGET_M = 132;

// Deterministic seed data.
const initialCells: Cell[] = (() => {
  const out: Cell[] = [];
  let s = 271828;
  const rng = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < N_CELLS; i++) {
    out.push({
      id: i,
      cost: 3 + rng() * 4.5,          // 3M–7.5M
      coverage: 0.3 + rng() * 0.7,    // 0.3–1.0
      selected: rng() < 0.72,         // ~22 of 30 → sum ≈ 108M–142M
    });
  }
  return out;
})();

const efficiency = (c: Cell) => c.coverage / c.cost; // higher = better

// Precompute the *deterministic* repair order (worst efficiency first).
const repairOrder = initialCells
  .filter((c) => c.selected)
  .sort((a, b) => efficiency(a) - efficiency(b));

interface Props {
  autoPlay?: boolean;
  /** Milliseconds between phase transitions when autoplaying. */
  dwellMs?: number;
}

export const ConstraintRepairMorph: React.FC<Props> = ({
  autoPlay = true,
  dwellMs = 3200,
}) => {
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(shouldReduce ? "feasible" : "repair");
  const [repairStep, setRepairStep] = useState(shouldReduce ? 99 : 2);

  // Compute repair flips needed to reach feasibility.
  const flipCount = useMemo(() => {
    let sum = initialCells.filter((c) => c.selected).reduce((acc, c) => acc + c.cost, 0);
    let flips = 0;
    for (const c of repairOrder) {
      if (sum <= BUDGET_M) break;
      sum -= c.cost;
      flips++;
    }
    return flips;
  }, []);

  // Autoplay loop.
  useEffect(() => {
    if (!autoPlay || shouldReduce) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "infeasible") {
      t = setTimeout(() => setPhase("repair"), dwellMs);
    } else if (phase === "repair") {
      // Progress through flips
      if (repairStep < flipCount) {
        t = setTimeout(
          () => setRepairStep((s) => s + 1),
          Math.max(160, (dwellMs * 0.9) / Math.max(1, flipCount)),
        );
      } else {
        t = setTimeout(() => setPhase("feasible"), dwellMs);
      }
    } else {
      t = setTimeout(() => {
        setPhase("infeasible");
        setRepairStep(0);
      }, dwellMs * 1.5);
    }
    return () => clearTimeout(t);
  }, [phase, repairStep, autoPlay, shouldReduce, dwellMs, flipCount]);

  // Derive current selection state given phase + repairStep.
  const cells: Cell[] = useMemo(() => {
    if (phase === "infeasible") {
      return initialCells.map((c) => ({ ...c, flippedByRepair: false }));
    }
    const flipped = new Set<number>();
    const stepCount = phase === "feasible" ? flipCount : repairStep;
    for (let i = 0; i < stepCount; i++) flipped.add(repairOrder[i].id);
    return initialCells.map((c) => ({
      ...c,
      selected: c.selected && !flipped.has(c.id),
      flippedByRepair: flipped.has(c.id),
    }));
  }, [phase, repairStep, flipCount]);

  const currentCost = cells.filter((c) => c.selected).reduce((acc, c) => acc + c.cost, 0);
  const budgetRatio = currentCost / BUDGET_M;
  const isFeasible = currentCost <= BUDGET_M;

  const phaseMeta = {
    infeasible: {
      Icon: AlertTriangle,
      titleAr: "حل غير قابل",
      titleEn: "Infeasible Solution",
      color: palette.error,
      caption: "Σ cᵢ · xᵢ  >  B  (تجاوز الميزانية)",
    },
    repair: {
      Icon: Wrench,
      titleAr: "مُشغّل الإصلاح",
      titleEn: "Repair Operator",
      color: palette.warning,
      caption: "اقلب الأقل كفاءة (coverage / cost)",
    },
    feasible: {
      Icon: CheckCircle2,
      titleAr: "حل قابل",
      titleEn: "Feasible Solution",
      color: palette.success,
      caption: "Σ cᵢ · xᵢ  ≤  B  ✓",
    },
  }[phase];

  const PhaseIcon = phaseMeta.Icon;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gap: space.md,
      }}
    >
      {/* Phase header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: space.md,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
          {(["infeasible", "repair", "feasible"] as Phase[]).map((p, i) => {
            const active = p === phase;
            const done = ["infeasible", "repair", "feasible"].indexOf(p) < ["infeasible", "repair", "feasible"].indexOf(phase);
            const color =
              p === "infeasible" ? palette.error : p === "repair" ? palette.warning : palette.success;
            return (
              <React.Fragment key={p}>
                <motion.div
                  animate={{ scale: active ? 1 : 0.86, opacity: active || done ? 1 : 0.35 }}
                  transition={{ duration: 0.32 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    background: active ? color : done ? alpha(color, 0.16) : "transparent",
                    color: active ? "#ffffff" : color,
                    borderRadius: 6,
                    fontFamily: typeTokens.numeral,
                    fontSize: typeTokens.small,
                    fontWeight: 900,
                    letterSpacing: "0.5px",
                    border: `1px solid ${alpha(color, active ? 0 : 0.4)}`,
                  }}
                >
                  <span style={{ fontSize: 10 }}>0{i + 1}</span>
                  <span>{p.toUpperCase()}</span>
                </motion.div>
                {i < 2 && (
                  <div
                    style={{
                      width: 22,
                      height: 1,
                      background: alpha(palette.ink, 0.22),
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${phase}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: space.sm,
            }}
          >
            <PhaseIcon size={22} color={phaseMeta.color} strokeWidth={2.2} />
            <div>
              <div
                style={{
                  fontSize: typeTokens.h3,
                  fontWeight: 900,
                  color: phaseMeta.color,
                  lineHeight: 1.15,
                }}
              >
                {phaseMeta.titleAr}
              </div>
              <div
                dir="ltr"
                style={{
                  fontFamily: typeTokens.numeral,
                  fontSize: typeTokens.micro,
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                  color: alpha(phaseMeta.color, 0.7),
                }}
              >
                {phaseMeta.titleEn}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cells grid */}
      <div
        style={{
          background: alpha(palette.slideBgSoft, 0.7),
          border: `1px solid ${alpha(palette.ink, 0.1)}`,
          borderRadius: radius.md,
          padding: `${space.md}px ${space.md}px`,
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: space.sm,
        }}
      >
        <div
          dir="ltr"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            fontFamily: typeTokens.numeral,
          }}
        >
          <div
            style={{
              fontSize: typeTokens.micro,
              fontWeight: 800,
              letterSpacing: "1.4px",
              color: palette.inkMuted,
            }}
          >
            DECISION VECTOR  x ∈ {"{0, 1}"}<sup>30,010</sup>  · sample of 30 sites
          </div>
          <div style={{ fontSize: typeTokens.micro, color: palette.inkMuted, fontWeight: 700 }}>
            xᵢ = 1 → ترقّي   ·   xᵢ = 0 → إبقاء
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${N_CELLS}, 1fr)`,
            gap: 4,
            alignContent: "center",
          }}
        >
          {cells.map((c) => {
            const isFlipped = !!c.flippedByRepair;
            const bg = c.selected
              ? isFeasible
                ? palette.success
                : palette.primary
              : isFlipped
                ? alpha(palette.warning, 0.35)
                : alpha(palette.ink, 0.08);
            return (
              <motion.div
                key={c.id}
                layout
                initial={false}
                animate={{
                  background: bg,
                  scale: isFlipped && phase === "repair" ? [1, 1.18, 1] : 1,
                }}
                transition={{ duration: 0.42 }}
                style={{
                  aspectRatio: "1",
                  borderRadius: 3,
                  border: c.selected
                    ? `1px solid ${alpha("#ffffff", 0.4)}`
                    : `1px solid ${alpha(palette.ink, 0.08)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: typeTokens.numeral,
                  fontSize: 8,
                  fontWeight: 900,
                  color: c.selected ? "#ffffff" : palette.inkMuted,
                  position: "relative",
                }}
              >
                {c.selected ? "1" : "0"}
                {isFlipped && phase === "repair" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      position: "absolute",
                      inset: -3,
                      border: `1.5px solid ${palette.warning}`,
                      borderRadius: 4,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Budget gauge */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: space.md,
          background: "#ffffff",
          border: `1px solid ${alpha(palette.ink, 0.12)}`,
          borderRadius: radius.md,
          padding: `${space.sm}px ${space.md}px`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: typeTokens.micro,
              fontWeight: 800,
              letterSpacing: "1.2px",
              color: palette.inkMuted,
              fontFamily: typeTokens.numeral,
            }}
          >
            BUDGET  Σ cᵢ · xᵢ
          </div>
          <div dir="ltr" style={{ fontSize: typeTokens.small, color: palette.inkSoft, fontWeight: 700 }}>
            Limit B = ${BUDGET_M}M
          </div>
        </div>
        <div style={{ position: "relative", height: 14 }}>
          {/* track */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: alpha(palette.ink, 0.06),
              borderRadius: 7,
            }}
          />
          {/* fill */}
          <motion.div
            layout
            animate={{
              width: `${Math.min(120, budgetRatio * 100)}%`,
              background: isFeasible ? palette.success : palette.error,
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              borderRadius: 7,
            }}
          />
          {/* budget line */}
          <div
            style={{
              position: "absolute",
              top: -3,
              bottom: -3,
              left: `${Math.min(100, 100)}%`,
              width: 2,
              background: palette.ink,
              transform: "translateX(-1px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -14,
              left: "100%",
              transform: "translateX(-50%)",
              fontFamily: typeTokens.numeral,
              fontSize: 9,
              fontWeight: 900,
              color: palette.ink,
            }}
          >
            B
          </div>
        </div>
        <motion.div
          key={`cost-${currentCost.toFixed(1)}`}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.24 }}
          dir="ltr"
          style={{
            fontFamily: typeTokens.numeral,
            fontSize: typeTokens.h3,
            fontWeight: 900,
            color: isFeasible ? palette.success : palette.error,
            minWidth: 82,
            textAlign: "right",
          }}
        >
          ${currentCost.toFixed(0)}M
        </motion.div>
      </div>
    </div>
  );
};
