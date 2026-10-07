// ============================================================
//  ParetoFrontChart — Coverage vs Cost scatter with dual fronts
//  reproducing Fig. 15 of the thesis (BPSO dominates AGA).
// ============================================================

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ComposedChart,
} from "recharts";
import { palette, alpha, type as typeTokens } from "../../design/tokens";

// Data drawn from thesis Table 6 (coverage vs budget) approximated
// as a Pareto front. BPSO front sits above AGA front (better trade-off).
const bpsoFront = [
  { cost: 80, coverage: 71.4 },
  { cost: 100, coverage: 84.2 },
  { cost: 120, coverage: 91.7 },
  { cost: 130.5, coverage: 95.14 },
  { cost: 140, coverage: 96.3 },
];
const agaFront = [
  { cost: 80, coverage: 66.5 },
  { cost: 100, coverage: 79.9 },
  { cost: 120, coverage: 88.4 },
  { cost: 139.6, coverage: 94.9 },
  { cost: 145, coverage: 95.5 },
];

interface Props {
  height?: number | string;
  animate?: boolean;
}

export const ParetoFrontChart: React.FC<Props> = ({ height = 260, animate = true }) => {
  const shouldReduce = useReducedMotion();
  const [reveal, setReveal] = useState(shouldReduce || !animate ? 5 : 0);

  useEffect(() => {
    if (shouldReduce || !animate) return;
    let cancelled = false;
    const step = (i: number) => {
      if (cancelled) return;
      setReveal(i);
      if (i < 5) setTimeout(() => step(i + 1), 220);
    };
    setTimeout(() => step(1), 260);
    return () => {
      cancelled = true;
    };
  }, [animate, shouldReduce]);

  const bpso = bpsoFront.slice(0, reveal);
  const aga = agaFront.slice(0, reveal);

  return (
    <div style={{ width: "100%", height, direction: "ltr" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 20, right: 24, left: 8, bottom: 16 }}>
          <CartesianGrid stroke={alpha(palette.ink, 0.06)} />
          <XAxis
            type="number"
            dataKey="cost"
            domain={[70, 150]}
            ticks={[80, 100, 120, 140]}
            stroke={palette.inkMuted}
            tick={{ fill: palette.inkMuted, fontSize: 11, fontFamily: typeTokens.numeral }}
            label={{
              value: "CapEx ($M)",
              position: "insideBottom",
              offset: -6,
              fill: palette.inkMuted,
              fontSize: 11,
              fontFamily: typeTokens.numeral,
              letterSpacing: 1.2,
            }}
          />
          <YAxis
            type="number"
            dataKey="coverage"
            domain={[62, 98]}
            ticks={[65, 75, 85, 95]}
            stroke={palette.inkMuted}
            tick={{ fill: palette.inkMuted, fontSize: 11, fontFamily: typeTokens.numeral }}
            label={{
              value: "Coverage (%)",
              angle: -90,
              position: "insideLeft",
              fill: palette.inkMuted,
              fontSize: 11,
              fontFamily: typeTokens.numeral,
              letterSpacing: 1.2,
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: `1px solid ${alpha(palette.ink, 0.15)}`,
              borderRadius: 8,
              fontFamily: typeTokens.numeral,
              fontSize: 12,
            }}
            formatter={(v: number, name: string) =>
              name === "coverage" ? `${v.toFixed(2)}%` : `$${v}M`
            }
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontFamily: typeTokens.numeral, fontSize: 11, paddingTop: 6 }}
          />
          <Line
            name="BPSO front"
            data={bpsoFront.slice(0, reveal)}
            type="monotone"
            dataKey="coverage"
            stroke={palette.primary}
            strokeWidth={2.4}
            dot={false}
            isAnimationActive={false}
            legendType="line"
          />
          <Line
            name="AGA front"
            data={agaFront.slice(0, reveal)}
            type="monotone"
            dataKey="coverage"
            stroke={palette.accent}
            strokeWidth={2.2}
            strokeDasharray="6 4"
            dot={false}
            isAnimationActive={false}
            legendType="line"
          />
          <Scatter
            name="BPSO solutions"
            data={bpso}
            fill={palette.primary}
            shape="circle"
            legendType="none"
          />
          <Scatter
            name="AGA solutions"
            data={aga}
            fill={palette.accent}
            shape="diamond"
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
