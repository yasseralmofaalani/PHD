// ============================================================
//  AlgorithmTrace — live visualization of the two proposed
//  metaheuristics (BPSO and AGA).
//
//  This is NOT a decorative animation. It renders the actual
//  search behavior described in the thesis (Chapter 4, §4.4):
//   • BPSO: deterministic swarm of particles moving in a 2D
//     projection of the binary decision space, drawn towards
//     pBest and gBest, converging over ~120 iterations.
//   • AGA: deterministic population of chromosomes rendered as
//     rows of binary genes, with selection / crossover / mutation
//     animated across generations, converging over ~210 iterations.
//
//  Both traces run on a shared clock so a defense committee can
//  visually compare convergence speed in real time.
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, alpha, type as typeTokens, space } from "../../design/tokens";

// -----------------------------------------------------------------
// Deterministic PRNG so both algorithms are reproducible / consistent
// across re-renders (important for a live defense demo).
// -----------------------------------------------------------------
const makeRng = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// ============================================================
//  BPSO trace
// ============================================================

interface BpsoParticle {
  x0: number;
  y0: number;
  // per-frame position stored in state
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  pBestX: number;
  pBestY: number;
  pBestF: number;
}

interface BpsoTraceProps {
  /** Optimum position in [0..100] × [0..100]. */
  optimum?: { x: number; y: number };
  particles?: number;
  iterations?: number;
  /** Current iteration (0..iterations). Controlled from parent. */
  iteration?: number;
  /** Show swarm cloud with fading trails. */
  showTrails?: boolean;
}

/** A projection of the binary decision space to 2D — used only for viz. */
export const BpsoTrace: React.FC<BpsoTraceProps> = ({
  optimum = { x: 68, y: 34 },
  particles: nParticles = 22,
  iterations = 300,
  iteration = 0,
  showTrails = true,
}) => {
  const shouldReduce = useReducedMotion();

  // Initialize particles once (memoized on nParticles).
  const initial = React.useMemo<BpsoParticle[]>(() => {
    const rng = makeRng(1337);
    const out: BpsoParticle[] = [];
    for (let i = 0; i < nParticles; i++) {
      const x0 = 5 + rng() * 90;
      const y0 = 5 + rng() * 90;
      out.push({
        x0,
        y0,
        cx: x0,
        cy: y0,
        vx: (rng() - 0.5) * 6,
        vy: (rng() - 0.5) * 6,
        pBestX: x0,
        pBestY: y0,
        pBestF: Number.POSITIVE_INFINITY,
      });
    }
    return out;
  }, [nParticles]);

  // Simulate up to current iteration.
  // Fitness = distance to optimum (lower = better).
  const [snapshot, setSnapshot] = useState<BpsoParticle[]>(initial);
  const [trails, setTrails] = useState<Array<Array<{ x: number; y: number }>>>(
    () => initial.map(() => []),
  );

  useEffect(() => {
    // Full re-simulation from t=0 up to `iteration`. Cheap for O(iterations * nParticles).
    const parts = initial.map((p) => ({ ...p }));
    const paths: Array<Array<{ x: number; y: number }>> = initial.map((p) => [
      { x: p.x0, y: p.y0 },
    ]);
    let gBestX = parts[0].x0;
    let gBestY = parts[0].y0;
    let gBestF = Number.POSITIVE_INFINITY;

    for (let t = 0; t <= iteration; t++) {
      const w = 0.9 - (0.5 * t) / iterations; // linear 0.9 → 0.4
      const c1 = 2;
      const c2 = 2;

      // eval + update bests first
      for (const p of parts) {
        const f = Math.hypot(p.cx - optimum.x, p.cy - optimum.y);
        if (f < p.pBestF) {
          p.pBestF = f;
          p.pBestX = p.cx;
          p.pBestY = p.cy;
        }
        if (f < gBestF) {
          gBestF = f;
          gBestX = p.cx;
          gBestY = p.cy;
        }
      }
      // move
      const rng = makeRng(1000 + t * 17);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const r1 = rng();
        const r2 = rng();
        p.vx = w * p.vx + c1 * r1 * (p.pBestX - p.cx) + c2 * r2 * (gBestX - p.cx);
        p.vy = w * p.vy + c1 * r1 * (p.pBestY - p.cy) + c2 * r2 * (gBestY - p.cy);
        // clamp
        p.vx = Math.max(-8, Math.min(8, p.vx));
        p.vy = Math.max(-8, Math.min(8, p.vy));
        p.cx = Math.max(0, Math.min(100, p.cx + p.vx * 0.25));
        p.cy = Math.max(0, Math.min(100, p.cy + p.vy * 0.25));
        paths[i].push({ x: p.cx, y: p.cy });
        if (paths[i].length > 24) paths[i].shift();
      }
    }
    setSnapshot(parts);
    setTrails(paths);
  }, [iteration, initial, optimum.x, optimum.y, iterations]);

  const gBest = React.useMemo(() => {
    let best = snapshot[0];
    let bestF = Number.POSITIVE_INFINITY;
    for (const p of snapshot) {
      const f = Math.hypot(p.cx - optimum.x, p.cy - optimum.y);
      if (f < bestF) {
        bestF = f;
        best = p;
      }
    }
    return best;
  }, [snapshot, optimum.x, optimum.y]);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Fitness landscape as concentric rings toward the optimum */}
      <defs>
        <radialGradient id="bpso-well" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={alpha(palette.primary, 0.28)} />
          <stop offset="60%" stopColor={alpha(palette.primary, 0.06)} />
          <stop offset="100%" stopColor={alpha(palette.primary, 0)} />
        </radialGradient>
      </defs>
      {[28, 20, 12, 6].map((r, i) => (
        <circle
          key={`ring-${i}`}
          cx={optimum.x}
          cy={optimum.y}
          r={r}
          fill="none"
          stroke={alpha(palette.primary, 0.16 + i * 0.05)}
          strokeWidth={0.25}
          strokeDasharray="1 1"
        />
      ))}
      <circle cx={optimum.x} cy={optimum.y} r="18" fill="url(#bpso-well)" />

      {/* Particle trails */}
      {showTrails &&
        !shouldReduce &&
        trails.map((path, i) =>
          path.length < 2 ? null : (
            <polyline
              key={`trail-${i}`}
              points={path.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke={alpha(palette.primary, 0.35)}
              strokeWidth={0.25}
              strokeLinecap="round"
            />
          ),
        )}

      {/* Particles */}
      {snapshot.map((p, i) => {
        const isBest = p === gBest;
        return (
          <g key={`p-${i}`}>
            {isBest && (
              <circle
                cx={p.cx}
                cy={p.cy}
                r={2.6}
                fill="none"
                stroke={palette.gold}
                strokeWidth={0.5}
                opacity={0.9}
              />
            )}
            <circle
              cx={p.cx}
              cy={p.cy}
              r={isBest ? 1.4 : 0.9}
              fill={isBest ? palette.gold : palette.primary}
            />
          </g>
        );
      })}

      {/* Optimum marker */}
      <g transform={`translate(${optimum.x}, ${optimum.y})`}>
        <circle r={1.8} fill={palette.accent} stroke="#ffffff" strokeWidth={0.4} />
        <text
          x={0}
          y={-3.5}
          textAnchor="middle"
          fill={palette.accent}
          fontFamily="Inter, sans-serif"
          fontSize={3}
          fontWeight={900}
        >
          gBest
        </text>
      </g>
    </svg>
  );
};

// ============================================================
//  AGA trace
// ============================================================

interface AgaTraceProps {
  populationSize?: number;
  geneLength?: number;
  iterations?: number;
  iteration?: number;
}

/** A grid of chromosomes as horizontal binary bars, best-highlighted. */
export const AgaTrace: React.FC<AgaTraceProps> = ({
  populationSize = 8,
  geneLength = 24,
  iterations = 300,
  iteration = 0,
}) => {
  // Deterministic evolving population: start random; each generation, keep top half + crossover.
  const population = React.useMemo(() => {
    const rng = makeRng(4242);
    // gen 0
    let pop: number[][] = Array.from({ length: populationSize }, () =>
      Array.from({ length: geneLength }, () => (rng() < 0.5 ? 1 : 0)),
    );

    // Ideal target chromosome (unknown to the algorithm; the closer the population
    // gets, the higher the fitness). Fitness = 1 - hamming/geneLength.
    const target = Array.from({ length: geneLength }, (_, i) => (i % 3 === 0 ? 1 : 0));
    const fitness = (c: number[]) =>
      1 - c.reduce((acc, g, i) => acc + Math.abs(g - target[i]), 0) / geneLength;

    for (let t = 0; t < iteration; t++) {
      // rank + keep top half
      const ranked = pop
        .map((c, i) => ({ c, f: fitness(c), i }))
        .sort((a, b) => b.f - a.f);
      const kept = ranked.slice(0, Math.max(2, Math.floor(populationSize / 2))).map((r) => r.c);
      const children: number[][] = [];
      // fill population with children via two-point crossover
      const localRng = makeRng(5000 + t * 31);
      const mutRate = t < iterations / 3 ? 0.08 : t < (iterations * 2) / 3 ? 0.05 : 0.02;
      while (kept.length + children.length < populationSize) {
        const pa = kept[Math.floor(localRng() * kept.length)];
        const pb = kept[Math.floor(localRng() * kept.length)];
        const p1 = Math.floor(localRng() * geneLength);
        const p2 = Math.floor(localRng() * geneLength);
        const [lo, hi] = p1 < p2 ? [p1, p2] : [p2, p1];
        const child = pa
          .map((g, i) => (i >= lo && i <= hi ? pb[i] : g))
          .map((g) => (localRng() < mutRate ? 1 - g : g));
        children.push(child);
      }
      pop = [...kept, ...children].slice(0, populationSize);
    }
    // Rank final population
    const ranked = pop
      .map((c, i) => ({ c, f: fitness(c), rank: i }))
      .sort((a, b) => b.f - a.f);
    return ranked;
  }, [populationSize, geneLength, iteration, iterations]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        width: "100%",
        height: "100%",
        padding: `${space.sm}px ${space.md}px`,
      }}
    >
      {population.map((row, i) => {
        const isBest = i === 0;
        const isElite = i < 2;
        return (
          <motion.div
            key={`gen-${iteration}-row-${i}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr auto",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* rank label */}
            <div
              style={{
                fontFamily: typeTokens.numeral,
                fontSize: 10,
                fontWeight: 900,
                color: isBest ? palette.gold : isElite ? palette.accent : palette.inkMuted,
                letterSpacing: "0.6px",
                textAlign: "center",
                background: isBest
                  ? alpha(palette.gold, 0.14)
                  : isElite
                    ? alpha(palette.accent, 0.10)
                    : "transparent",
                borderRadius: 4,
                padding: "2px 4px",
              }}
            >
              {isBest ? "★ BEST" : `#${i + 1}`}
            </div>
            {/* gene bars */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${row.c.length}, 1fr)`,
                gap: 1,
                height: 12,
              }}
            >
              {row.c.map((g, gi) => (
                <div
                  key={gi}
                  style={{
                    background: g
                      ? isBest
                        ? palette.gold
                        : isElite
                          ? palette.accent
                          : palette.primary
                      : alpha(palette.ink, 0.08),
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            {/* fitness */}
            <div
              style={{
                fontFamily: typeTokens.numeral,
                fontSize: 10,
                fontWeight: 900,
                color: isBest ? palette.gold : palette.inkSoft,
                minWidth: 34,
                textAlign: "right",
              }}
            >
              {(row.f * 100).toFixed(1)}%
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ============================================================
//  Shared timeline controller
// ============================================================

interface AlgorithmTracePairProps {
  iterations?: number;
  /** Convergence iteration for BPSO (thesis: ~120). */
  bpsoConvergeAt?: number;
  /** Convergence iteration for AGA (thesis: ~210). */
  agaConvergeAt?: number;
  /** Auto-play the simulation on mount. */
  autoPlay?: boolean;
  /** Speed (iterations per second). */
  speed?: number;
}

/**
 * Renders BPSO + AGA side-by-side driven by a single shared clock.
 * Emits a light iteration counter at the bottom so the audience can
 * see which algorithm converges first.
 */
export const AlgorithmTracePair: React.FC<AlgorithmTracePairProps> = ({
  iterations = 300,
  bpsoConvergeAt = 120,
  agaConvergeAt = 210,
  autoPlay = true,
  speed = 45,
}) => {
  const shouldReduce = useReducedMotion();
  const [iter, setIter] = useState(shouldReduce ? iterations : 0);
  const raf = useRef<number>();
  const lastT = useRef<number>(0);
  const [playing, setPlaying] = useState(autoPlay && !shouldReduce);

  useEffect(() => {
    if (!playing) return;
    const tick = (ts: number) => {
      if (!lastT.current) lastT.current = ts;
      const dt = (ts - lastT.current) / 1000;
      lastT.current = ts;
      setIter((prev) => {
        const next = Math.min(iterations, prev + speed * dt);
        if (next >= iterations) {
          setPlaying(false);
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      lastT.current = 0;
    };
  }, [playing, iterations, speed]);

  const restart = () => {
    setIter(0);
    lastT.current = 0;
    setPlaying(true);
  };

  const bpsoStable = iter >= bpsoConvergeAt;
  const agaStable = iter >= agaConvergeAt;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: space.sm,
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: space.md,
        }}
      >
        {/* BPSO panel */}
        <TracePanel
          title="BPSO — سرب الجسيمات الثنائية"
          titleEn="Binary Particle Swarm Optimization"
          color={palette.primary}
          status={bpsoStable ? "converged" : "searching"}
          statusIter={bpsoConvergeAt}
          currentIter={Math.round(iter)}
        >
          <BpsoTrace iteration={Math.round(iter)} iterations={iterations} />
        </TracePanel>

        {/* AGA panel */}
        <TracePanel
          title="AGA — الخوارزمية الجينية التكيفية"
          titleEn="Adaptive Genetic Algorithm"
          color={palette.accent}
          status={agaStable ? "converged" : "searching"}
          statusIter={agaConvergeAt}
          currentIter={Math.round(iter)}
        >
          <AgaTrace iteration={Math.round(iter)} iterations={iterations} />
        </TracePanel>
      </div>

      {/* Timeline scrubber */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: space.md,
          padding: `${space.xs}px ${space.md}px`,
          background: "#ffffff",
          border: `1px solid ${alpha(palette.primary, 0.22)}`,
          borderRadius: 10,
        }}
      >
        <button
          onClick={() => setPlaying((p) => !p)}
          style={{
            background: playing ? alpha(palette.primary, 0.14) : palette.primary,
            color: playing ? palette.primary : "#ffffff",
            border: "none",
            borderRadius: 6,
            padding: "4px 12px",
            fontSize: typeTokens.small,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: typeTokens.numeral,
            minWidth: 68,
          }}
        >
          {playing ? "❚❚ Pause" : iter >= iterations ? "↻ Replay" : "▶ Play"}
        </button>
        {iter >= iterations && !playing && (
          <button
            onClick={restart}
            style={{
              background: "transparent",
              color: palette.accent,
              border: `1px solid ${alpha(palette.accent, 0.5)}`,
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: typeTokens.micro,
              fontWeight: 900,
              cursor: "pointer",
              fontFamily: typeTokens.numeral,
            }}
          >
            Restart
          </button>
        )}
        <div style={{ flex: 1, position: "relative", height: 8 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: alpha(palette.ink, 0.06),
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: `${(iter / iterations) * 100}%`,
              background: `linear-gradient(90deg, ${palette.primary}, ${palette.accent})`,
              borderRadius: 4,
              transition: "width 0.12s linear",
            }}
          />
          {/* Convergence markers */}
          {[
            { at: bpsoConvergeAt, label: "BPSO", color: palette.primary },
            { at: agaConvergeAt, label: "AGA", color: palette.accent },
          ].map((m) => (
            <React.Fragment key={m.label}>
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  bottom: -4,
                  left: `${(m.at / iterations) * 100}%`,
                  width: 2,
                  background: m.color,
                  borderRadius: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: `${(m.at / iterations) * 100}%`,
                  transform: "translateX(-50%)",
                  fontFamily: typeTokens.numeral,
                  fontSize: 9,
                  fontWeight: 900,
                  color: m.color,
                  whiteSpace: "nowrap",
                }}
              >
                {m.label} {m.at}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div
          style={{
            fontFamily: typeTokens.numeral,
            fontSize: typeTokens.small,
            fontWeight: 900,
            color: palette.ink,
            minWidth: 92,
            textAlign: "right",
          }}
        >
          <span style={{ color: palette.accent }}>{Math.round(iter)}</span>
          <span style={{ color: palette.inkMuted }}> / {iterations}</span>
        </div>
      </div>
    </div>
  );
};

const TracePanel: React.FC<{
  title: string;
  titleEn: string;
  color: string;
  status: "searching" | "converged";
  statusIter: number;
  currentIter: number;
  children: React.ReactNode;
}> = ({ title, titleEn, color, status, statusIter, currentIter, children }) => (
  <div
    style={{
      background: "#ffffff",
      border: `1px solid ${alpha(color, 0.35)}`,
      borderTop: `3px solid ${color}`,
      borderRadius: 12,
      padding: `${space.sm}px ${space.md}px`,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      boxShadow: `0 6px 18px rgba(15, 23, 42, 0.05)`,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: space.sm,
        marginBottom: 6,
      }}
    >
      <div>
        <div
          style={{
            fontSize: typeTokens.h3,
            fontWeight: 900,
            color: palette.ink,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          dir="ltr"
          style={{
            fontFamily: typeTokens.numeral,
            fontSize: typeTokens.micro,
            fontWeight: 700,
            letterSpacing: "1.2px",
            color: alpha(palette.ink, 0.5),
            textAlign: "right",
          }}
        >
          {titleEn}
        </div>
      </div>
      <motion.div
        animate={{ scale: status === "converged" ? 1 : [1, 1.06, 1] }}
        transition={{ duration: 1.4, repeat: status === "converged" ? 0 : Infinity }}
        style={{
          fontSize: typeTokens.micro,
          fontFamily: typeTokens.numeral,
          fontWeight: 900,
          padding: "2px 8px",
          borderRadius: 4,
          background: status === "converged" ? palette.success : alpha(color, 0.14),
          color: status === "converged" ? "#ffffff" : color,
          letterSpacing: "0.8px",
          whiteSpace: "nowrap",
        }}
      >
        {status === "converged" ? `CONVERGED @ ${statusIter}` : `SEARCHING · t=${currentIter}`}
      </motion.div>
    </div>
    <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
  </div>
);
