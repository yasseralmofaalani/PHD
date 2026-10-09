import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C, Chip, ContribStage, KpiTile, Show, SyriaBase, T, hexPts, useBeats, useSites } from "./kit";
import { FairMap, useFairPairs } from "./C2PartA";
import { CH4_RESULTS, CH5_FINAL, FAIRNESS_EFFECT, SCENARIOS } from "./facts";
import { alpha } from "../../design/tokens";

/* ═════════════ II-7 · Effect of fairness ═════════════ */

const SfiGauge: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const angle = -90 + value * 180;
  const arc = (v: number) => {
    const a = Math.PI * (1 - v);
    return [150 + 120 * Math.cos(a), 160 - 120 * Math.sin(a)];
  };
  const [ex, ey] = arc(value);
  return (
    <svg viewBox="0 0 300 200" style={{ width: "100%", height: "100%" }}>
      <path d="M30 160 A120 120 0 0 1 270 160" fill="none" stroke={C.hair} strokeWidth={22} strokeLinecap="round" />
      <motion.path d={`M30 160 A120 120 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`} fill="none" stroke={C.green} strokeWidth={22} strokeLinecap="round" initial={false} animate={{ d: `M30 160 A120 120 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}` }} transition={{ duration: 0.9 }} />
      <motion.line x1={150} y1={160} x2={150} y2={56} stroke={C.ink} strokeWidth={4} strokeLinecap="round" initial={false} animate={{ rotate: angle }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "150px 160px" }} />
      <circle cx={150} cy={160} r={8} fill={C.ink} />
      <T x={30} y={185} size={13} latin fill={C.inkSoft}>
        0
      </T>
      <T x={270} y={185} size={13} latin fill={C.inkSoft}>
        1
      </T>
      <T x={150} y={190} size={14} weight={900} fill={C.inkSoft}>
        {label}
      </T>
    </svg>
  );
};

const fairnessTone = (level: number) =>
  level === 0 ? { color: C.inkMuted, bg: alpha(C.ink, 0.06) } : level === 1 ? { color: C.gold, bg: alpha(C.gold, 0.14) } : { color: C.green, bg: alpha(C.green, 0.14) };

export const C2FairnessEffect: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const idx = Math.min(step, 3) - 1;
  const row = FAIRNESS_EFFECT[idx];
  return (
    <ContribStage
      contribution={2}
      title="الأثر الكمي لإدراج قيد العدالة المكانية"
      beats={["السيناريو الأساسي دون قيد العدالة (S2)", "إدماج العدالة بمستوى جزئي (S4)", "تحقيق العدالة المكانية الكاملة (S5)", "أثر العدالة على كفاءة التغطية"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, height: "100%", display: "grid", gridTemplateColumns: "1.35fr 1.05fr 0.95fr", gap: 16, alignItems: "stretch", overflow: "hidden" }}>
        <div
          style={{
            minHeight: 0,
            height: "100%",
            background: "#fff",
            borderRadius: 16,
            border: `1.5px solid ${C.hair}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              fontSize: 16.5,
              fontWeight: 900,
              color: C.maroon,
              background: alpha(C.maroon, 0.07),
              borderBottom: `1.5px solid ${C.hair}`,
              flexShrink: 0,
            }}
          >
            جدول سيناريوهات الاختبار
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "grid",
              gridTemplateRows: "auto repeat(5, 1fr)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.7fr 0.9fr 1.35fr 0.85fr",
                background: C.maroon,
                color: "#fff",
                fontWeight: 800,
                fontSize: 14.5,
                padding: "8px 10px",
                alignItems: "center",
              }}
            >
              <div>السيناريو</div>
              <div>الميزانية</div>
              <div>قيد العدالة المستهدفة</div>
              <div style={{ textAlign: "center" }}>عدد المواقع</div>
            </div>
            {SCENARIOS.map((s, i) => {
              const on = s.id === row.scenario;
              const tone = fairnessTone(s.level);
              return (
                <motion.div
                  key={s.id}
                  initial={false}
                  animate={{
                    backgroundColor: on ? alpha(C.green, 0.16) : i % 2 === 0 ? "#fff" : alpha(C.ink, 0.03),
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.7fr 0.9fr 1.35fr 0.85fr",
                    alignItems: "center",
                    padding: "0 10px",
                    borderTop: `1px solid ${C.hair}`,
                    boxShadow: on ? `inset -4px 0 0 ${C.green}` : undefined,
                    minHeight: 0,
                  }}
                >
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 17.5, color: on ? C.green : C.ink }}>{s.id}</div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: C.ink }}>{s.budget}</div>
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 14,
                        fontWeight: 800,
                        color: on ? "#fff" : tone.color,
                        background: on ? C.green : tone.bg,
                        borderRadius: 999,
                        padding: "3px 9px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.fairness}
                    </span>
                  </div>
                  <div dir="ltr" style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 16.5, color: C.ink }}>
                    {s.sites}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 0, overflow: "hidden" }}>
          <div style={{ fontSize: 18.5, fontWeight: 900, color: C.inkSoft }}>مؤشر العدالة المكانية · BPSO</div>
          <AnimatePresence mode="wait">
            <motion.div key={row.fiBpso} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.4 }} style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: "clamp(64px, 8vw, 110px)", color: C.green, lineHeight: 1 }}>
              {row.fiBpso.toFixed(2)}
            </motion.div>
          </AnimatePresence>
          <div style={{ width: "80%", height: 120, flexShrink: 0 }}>
            <SfiGauge value={row.fiBpso} label={row.label} />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            {FAIRNESS_EFFECT.map((r, i) => (
              <Chip key={r.scenario} color={i <= idx ? C.green : C.inkMuted} solid={i === idx}>
                {r.scenario} · {r.fiBpso.toFixed(2)}
              </Chip>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 10, minHeight: 0, alignContent: "center" }}>
          <KpiTile label="التغطية · BPSO" value={`${row.covBpso.toFixed(2)}%`} color={C.teal} />
          <KpiTile label="مؤشر العدالة · AGA" value={row.fiAga.toFixed(2)} color={C.maroon} note={`التغطية ${row.covAga.toFixed(2)}%`} />
          <Show step={step} at={4} from="left">
            <div style={{ background: "rgba(46,125,91,0.1)", border: `1.5px solid ${C.green}`, borderRadius: 14, padding: "10px 14px", fontSize: 20.5, fontWeight: 900, lineHeight: 1.6 }}>
              قفزة نوعية في مؤشر العدالة المكانية مع انخفاض هامشي للغاية في نسبة التغطية لا يتعدى <span dir="ltr">0.1%</span>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft, marginTop: 2 }}>
                BPSO: <span dir="ltr">{CH4_RESULTS.bpso.coverage}% → {CH5_FINAL.bpso.coverage}%</span>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ II-8 · Overall results — radar ═════════════ */

const b5 = CH5_FINAL.bpso;
const a5 = CH5_FINAL.aga;
const AXES = [
  { label: "التغطية", bpso: 100, aga: (a5.coverage / b5.coverage) * 100 },
  { label: "كفاءة التكلفة", bpso: 100, aga: (b5.cost / a5.cost) * 100 },
  { label: "كفاءة الطاقة", bpso: 100, aga: (b5.energy / a5.energy) * 100 },
  { label: "العدالة المكانية", bpso: 100, aga: (a5.sfi / b5.sfi) * 100 },
  { label: "سرعة التقارب", bpso: 100, aga: (b5.runtime / a5.runtime) * 100 },
];
const R_MIN = 60;
const R_MAX = 100;
const RAD = 165;
const CX = 230;
const CY = 215;

const radarPoint = (i: number, v: number): [number, number] => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / AXES.length;
  const r = ((Math.max(v, R_MIN) - R_MIN) / (R_MAX - R_MIN)) * RAD;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const poly = (key: "bpso" | "aga") => AXES.map((ax, i) => radarPoint(i, ax[key]).join(",")).join(" ");

export const C2Radar: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ContribStage
      contribution={2}
      title="التقييم الشامل للأداء متعدد المعايير في ظل قيد العدالة"
      beats={["محاور الأداء الخمسة", "أداء AGA التكيفية", "أداء سرب الجسيمات BPSO", "المقارنة الإحصائية للمؤشرات الرئيسية"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source={` `}
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18 }}>
        <svg viewBox="0 0 460 440" style={{ width: "100%", height: "100%" }}>
          {[60, 70, 80, 90, 100].map((lvl) => (
            <polygon key={lvl} points={AXES.map((_, i) => radarPoint(i, lvl).join(",")).join(" ")} fill={lvl === 100 ? "rgba(255,255,255,0.7)" : "none"} stroke={C.hair} strokeWidth={1.2} />
          ))}
          {AXES.map((ax, i) => {
            const [x, y] = radarPoint(i, 100);
            const [lx, ly] = radarPoint(i, 113);
            return (
              <g key={ax.label}>
                <line x1={CX} y1={CY} x2={x} y2={y} stroke={C.hair} />
                <T x={lx} y={ly} size={15} weight={900}>
                  {ax.label}
                </T>
              </g>
            );
          })}
          {[70, 80, 90].map((lvl) => {
            const [x, y] = radarPoint(0, lvl);
            return (
              <T key={lvl} x={x + 14} y={y} size={10} latin fill={C.inkMuted}>
                {`${lvl}%`}
              </T>
            );
          })}
          {step >= 2 && (
            <motion.polygon points={poly("aga")} fill="rgba(107,31,42,0.18)" stroke={C.maroon} strokeWidth={3} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ transformOrigin: `${CX}px ${CY}px` }} />
          )}
          {step >= 3 && (
            <motion.polygon points={poly("bpso")} fill="rgba(66,129,119,0.16)" stroke={C.teal} strokeWidth={3} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ transformOrigin: `${CX}px ${CY}px` }} />
          )}
          {step >= 2 && (
            <g transform="translate(20 418)">
              <rect width={14} height={14} rx={3} fill={C.maroon} />
              <T x={40} y={7} size={13} latin>
                AGA
              </T>
              {step >= 3 && (
                <g transform="translate(80 0)">
                  <rect width={14} height={14} rx={3} fill={C.teal} />
                  <T x={42} y={7} size={13} latin>
                    BPSO
                  </T>
                </g>
              )}
            </g>
          )}
        </svg>

        <div style={{ display: "grid", gap: 10, alignContent: "center" }}>
          <Show step={step} at={4} style={{ display: "grid", gap: 10 }}>
            <KpiTile label="مؤشر العدالة المكانية SFI" value={b5.sfi.toFixed(2)} color={C.green} note={`AGA: ${a5.sfi.toFixed(2)} · نسبة التحسن ${CH5_FINAL.fairnessGain}`} big />
            <KpiTile label="التغطية" value={`${b5.coverage}%`} color={C.teal} note={`AGA: ${a5.coverage}%`} />
            <KpiTile label="التكلفة" value={b5.cost} unit="M$" color={C.teal} note={`AGA: ${a5.cost} M$`} />
            <KpiTile label="زمن التنفيذ" value={b5.runtime} unit="s" color={C.teal} note={`AGA: ${a5.runtime} s`} />
            <div style={{ fontSize: 19, fontWeight: 800, color: C.maroon }}>AGA: تمتاز بموثوقية إحصائية وتشتت أقل عبر مختلف التشغيلات</div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ II-10 · Message ═════════════ */

export const C2Message: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(2);
  const pairs = useFairPairs();
  const terms = [
    { l: "التغطية", c: C.teal },
    { l: "التكلفة", c: C.teal },
    { l: "الطاقة", c: C.teal },
    { l: "العدالة المكانية", c: C.green },
  ];
  return (
    <ContribStage contribution={2} title="" hideHeader step={step} goNext={goNext} goToStep={goToStep}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <FairMap t={1} pairs={pairs} idSuffix="msg" viewBox="60 20 860 510" />
      </div>
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontSize: 21.1, fontWeight: 900, color: C.maroon, letterSpacing: 1 }}>
          المساهمة الثانية
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ fontSize: "clamp(42.5px, 5.12vw, 64px)", fontWeight: 900, textAlign: "center", lineHeight: 1.2 }}>
          تأصيل <span style={{ color: C.green }}>العدالة المكانية</span> كمعيار حاكم في التحسين الشبكي
        </motion.div>
        <Show step={step} at={2} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {terms.map((t, i) => (
            <React.Fragment key={t.l}>
              {i > 0 && <span style={{ fontSize: 35.4, fontWeight: 900, color: C.inkMuted }}>+</span>}
              <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} style={{ padding: "10px 20px", borderRadius: 999, background: t.c, color: "#fff", fontSize: 27.3, fontWeight: 900, boxShadow: i === 3 ? "0 0 0 8px rgba(46,125,91,0.2)" : "none" }}>
                {t.l}
              </motion.span>
            </React.Fragment>
          ))}
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ Transition · planning → control ═════════════ */

const HEXES = (() => {
  const out: Array<{ x: number; y: number; k: number }> = [];
  let k = 0;
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 11; c++) {
      out.push({ x: 120 + c * 68 + (r % 2) * 34, y: 70 + r * 58, k: k++ });
    }
  }
  return out;
})();

const POLY = "M380 170 L520 140 L610 210 L590 320 L460 350 L360 280 Z";

export const ContribTransition: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const sites = useSites(260, 77);
  return (
    <ContribStage contribution={3} title="" hideHeader step={step} goNext={goNext} goToStep={goToStep}>
      <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
        <svg viewBox="60 20 880 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <AnimatePresence>
            {step === 1 && (
              <motion.g key="opt" initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 2.4 }} transition={{ duration: 1.1 }} style={{ transformOrigin: "260px 300px" }}>
                <SyriaBase idSuffix="tr" dark />
                {sites.map((s, i) => (
                  <circle key={i} cx={s.x} cy={s.y} r={i % 5 === 0 ? 4 : 2} fill={i % 5 === 0 ? C.gold : C.cyan} opacity={0.8} />
                ))}
              </motion.g>
            )}
            {step >= 2 && (
              <motion.g key="ops" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} style={{ transformOrigin: "500px 260px" }}>
                {HEXES.map((h) => (
                  <polygon key={h.k} points={hexPts(h.x, h.y, 36)} fill="rgba(79,184,171,0.05)" stroke="rgba(79,184,171,0.4)" strokeWidth={1.2} />
                ))}
                {HEXES.map((h) => (
                  <circle key={`t${h.k}`} cx={h.x} cy={h.y} r={3} fill={C.cyan} />
                ))}
                {step >= 3 && (
                  <motion.path d={POLY} fill="rgba(200,149,26,0.14)" stroke={C.gold} strokeWidth={3.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
                )}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none", gap: 14 }}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="q1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.7 }} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 21.1, fontWeight: 900, color: C.gold, letterSpacing: 2 }}>التخطيط الاستراتيجي</div>
                <div style={{ fontSize: "clamp(53.8px, 7.32vw, 90px)", fontWeight: 900, color: C.nightInk, textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}>أين نوجّه استثمار الترقية؟</div>
              </motion.div>
            ) : (
              <motion.div key="q2" initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8 }} style={{ textAlign: "center", background: "rgba(12,22,24,0.55)", borderRadius: 24, padding: "10px 30px" }}>
                <div style={{ fontSize: 21.1, fontWeight: 900, color: C.cyan, letterSpacing: 2 }}>التحكم التشغيلي الميداني</div>
                <div style={{ fontSize: "clamp(49.3px, 6.59vw, 84px)", fontWeight: 900, color: C.nightInk }}>أين نتحكم بانسياب الخدمة؟</div>
                {step >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ fontSize: 23, fontWeight: 800, color: C.nightInkSoft }}>
                    الانتقال من التخطيط الهيكلي إلى الإدارة المكانية والتشغيلية للشبكة
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ContribStage>
  );
};
