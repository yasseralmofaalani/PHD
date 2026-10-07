import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { assetUrl } from "../../../lib/assets";
import { Formula } from "../contributions/kit";
import { AGA_PARAMS, BPSO_PARAMS, DATASET, CH6_DESIGN, SEED_RUNS, TTEST } from "./facts";
import {
  ArrowDefs,
  BRONZE,
  C,
  CONTRIB,
  Chevron,
  Draw,
  EASE,
  HeroNumber,
  N,
  PHASES,
  Pulse,
  ResStage,
  Show,
  ShowG,
  T,
  hexPts,
  useBeats,
} from "./stage";
import { IndexMark, METHOD_MARKS, Plate, StationTitle } from "./marks";

/* ═════════════ R-1 · Section opener ═════════════ */

export const ResMarker: React.FC = () => {
  const xs = PHASES.map((_, i) => 1290 - i * 196.7);
  const chain = `M ${xs[0]} 120 ` + xs.slice(1).map((x) => `L ${x} 120`).join(" ");
  return (
    <div
      className="slide"
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(32px, 4vw, 64px)",
        boxSizing: "border-box",
        fontFamily: "Cairo, sans-serif",
        color: C.nightInk,
        background: `radial-gradient(ellipse 70% 60% at 85% 20%, ${alpha(C.teal, 0.28)} 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 90%, ${alpha(C.maroon, 0.3)} 0%, transparent 60%), ${C.night}`,
      }}
    >
      <div style={{ display: "none" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} style={{ position: "relative", display: "flex", alignItems: "center", gap: 28 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(90px, 12.2vw, 150px)", fontWeight: 900, color: C.gold, lineHeight: 0.9 }}>04</span>
        <div>
          <div style={{ fontSize: 21.1, fontWeight: 800, color: C.cyan, letterSpacing: 1 }}>القسم الرابع</div>
          <h1 style={{ margin: 0, fontSize: "clamp(42.6px, 5.12vw, 62px)", fontWeight: 900, lineHeight: 1.15 }}>النتائج العملية والإنتاج البحثي</h1>
          <div style={{ marginTop: 8, fontSize: "clamp(21.1px, 1.77vw, 26px)", fontWeight: 700, color: C.nightInkSoft }}>
            كيف تحولت المساهمات النظرية إلى براهين تجريبية مقيسة، ثم إلى نتاج علمي محكّم
          </div>
        </div>
      </motion.div>

      <svg viewBox="0 0 1400 230" style={{ position: "relative", width: "100%", marginTop: "clamp(28px, 5vh, 60px)" }}>
        <ArrowDefs colors={{ mk: C.gold }} />
        <Draw d={chain} color={alpha(C.gold, 0.55)} width={2} dashed delay={0.5} duration={2.2} />
        {xs.map((x, i) => {
          const last = i === PHASES.length - 1;
          return (
            <motion.g key={PHASES[i]} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.3, duration: 0.5, ease: EASE }} style={{ transformOrigin: `${x}px 120px` }}>
              <polygon points={hexPts(x, 120, last ? 46 : 38)} fill={last ? C.gold : "rgba(255,255,255,0.05)"} stroke={last ? C.gold : C.cyan} strokeWidth={1.8} />
              <T x={x} y={121} size={last ? 24 : 21} latin fill={last ? C.night : C.nightInk} weight={900}>
                {i + 1}
              </T>
              <T x={x} y={196} size={19} fill={last ? C.gold : C.nightInk} weight={900}>
                {PHASES[i]}
              </T>
            </motion.g>
          );
        })}
        <Pulse d={chain} color={C.gold} r={4} dur={5} begin={2.8} />
      </svg>
    </div>
  );
};

/* ═════════════ R-2 · Validation methodology — rising journey ═════════════ */

const METHOD_STEPS = [
  { title: "البيانات الواقعية", ev: "شبكتا MTN وSyriatel" },
  { title: "المعالجة المكانية", ev: "ArcGIS Pro · PostGIS" },
  { title: "النموذج والخوارزميات", ev: "BPSO · AGA · إصلاح القيود" },
  { title: "التجارب والمحاكاة", ev: `خمسة سيناريوهات · ${CH6_DESIGN.governorates} محافظات` },
  { title: "المقارنة الإحصائية", ev: `${TTEST.runs} تشغيلاً · اختبار t` },
  { title: "النتائج", ev: "تخطيط · عدالة · تحكم" },
  { title: "الإنتاج البحثي", ev: "مقالتان منشورتان · مقالة قيد المراجعة" },
];

const METHOD_SEGS: ReadonlyArray<readonly [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]]> = [
  [[86, 78], [80, 78], [78, 72], [72, 66]],
  [[72, 66], [66, 60], [64, 56], [60, 52]],
  [[60, 52], [56, 48], [52, 46], [48, 42]],
  [[48, 42], [44, 38], [40, 36], [36, 32]],
  [[36, 32], [32, 28], [28, 26], [24, 24]],
  [[24, 24], [20, 22], [16, 20], [12, 18]],
];

const METHOD_ANCHORS = [METHOD_SEGS[0][0], METHOD_SEGS[1][0], METHOD_SEGS[2][0], METHOD_SEGS[3][0], METHOD_SEGS[4][0], METHOD_SEGS[5][0], METHOD_SEGS[5][3]] as const;

function methodPath(w: number, h: number) {
  const X = (v: number) => (v / 100) * w;
  const Y = (v: number) => (v / 100) * h;
  return METHOD_SEGS.map((seg, i) => {
    const [p0, c1, c2, p] = seg;
    const head = i === 0 ? `M ${X(p0[0])} ${Y(p0[1])} ` : "";
    return `${head}C ${X(c1[0])} ${Y(c1[1])}, ${X(c2[0])} ${Y(c2[1])}, ${X(p[0])} ${Y(p[1])}`;
  }).join(" ");
}

export const ResMethod: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(METHOD_STEPS.length);
  const canvasRef = useRef<HTMLDivElement>(null);
  const riseRef = useRef<SVGPathElement>(null);
  const [canvas, setCanvas] = useState({ w: 0, h: 0 });
  const [pathLen, setPathLen] = useState(1);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setCanvas({ w: rect.width, h: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const riseD = canvas.w > 0 ? methodPath(canvas.w, canvas.h) : "";
  useEffect(() => {
    if (riseRef.current) setPathLen(riseRef.current.getTotalLength() || 1);
  }, [riseD]);

  const progress = Math.max(0, (step - 1) / (METHOD_STEPS.length - 1));

  return (
    <ResStage
      phase={-1}
      question="ما منهجية التحقق التجريبي المعتمدة لتقييم المساهمات؟"
      title="منهجية التحقق التجريبي وسلسلة التقييم العلمي"
      beats={METHOD_STEPS.map((s) => s.title)}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصول 4 و5 و6 من الأطروحة"
    >
      <div ref={canvasRef} style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <svg viewBox={`0 0 ${Math.max(canvas.w, 1)} ${Math.max(canvas.h, 1)}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
          <defs>
            <linearGradient id="res-rise" x1={(86 / 100) * canvas.w} y1={(78 / 100) * canvas.h} x2={(12 / 100) * canvas.w} y2={(18 / 100) * canvas.h} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={C.teal} />
              <stop offset="70%" stopColor={C.teal} />
              <stop offset="100%" stopColor={C.gold} />
            </linearGradient>
          </defs>
          {riseD && <path ref={riseRef} d={riseD} fill="none" stroke="none" />}
          {riseD && pathLen > 20 && (
            <>
              <path d={riseD} fill="none" stroke="rgba(66,129,119,0.16)" strokeWidth="9" strokeLinecap="round" strokeDasharray={pathLen} strokeDashoffset={pathLen * (1 - progress)} style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }} />
              <path d={riseD} fill="none" stroke="url(#res-rise)" strokeWidth="2.75" strokeLinecap="round" strokeDasharray={pathLen} strokeDashoffset={pathLen * (1 - progress)} style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }} />
            </>
          )}
        </svg>

        {METHOD_STEPS.map((s, i) => {
          const last = i === METHOD_STEPS.length - 1;
          const tone = last ? C.gold : i >= 5 ? C.maroon : C.teal;
          const Mark = METHOD_MARKS[i];
          const current = step === i + 1;
          return (
            <AnimatePresence key={s.title}>
              {step >= i + 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: `${METHOD_ANCHORS[i][0]}%`,
                    top: `${METHOD_ANCHORS[i][1]}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: current ? 5 : 3,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: current ? 1.06 : 0.92, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: 8 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <Plate active={current} tone={tone} gold={last}>
                      <IndexMark n={`0${i + 1}`} color={tone} />
                      <Mark />
                      <StationTitle>{s.title}</StationTitle>
                      {i === 0 ? (
                        <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft, textAlign: "center", marginTop: 2 }}>
                          <N>{DATASET.totalSites}</N> موقعاً حقيقياً
                        </div>
                      ) : (
                        <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft, textAlign: "center", marginTop: 2 }}>{s.ev}</div>
                      )}
                    </Plate>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </ResStage>
  );
};

/* ═════════════ R-3 · Results map ═════════════ */

const MAP_NODES = [
  {
    k: 1 as const,
    pos: { x: 83, y: 56 },
    q: "كيف نحدد المحطات المثلى للترقية لتحقيق أقصى تغطية بأدنى كلفة واستهلاك للطاقة؟",
    measures: ["التغطية", "الكلفة", "الطاقة", "الاستقرار"],
    chapter: "الفصل 4",
  },
  {
    k: 2 as const,
    pos: { x: 50, y: 21 },
    q: "كيف نضمن توجيه الاستثمار نحو المناطق الطرفية والريفية دون الإخلال بكفاءة التغطية؟",
    measures: ["SFI", "أثر قيد العدالة", "التوزيع الجغرافي"],
    chapter: "الفصل 5",
  },
  {
    k: 3 as const,
    pos: { x: 17, y: 56 },
    q: "كيف نطبق عزلاً مكانياً دقيقاً للخدمة الراديوية مع تفادي الانتشار غير المقصود نحو الجوار؟",
    measures: ["دقة العزل", "الانتشار", "التنسيق", "الاستعادة"],
    chapter: "الفصل 6",
  },
];

export const ResMap: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const hub = { x: 50, y: 68 };
  return (
    <ResStage
      phase={0}
      question="ما المعايير المقيسة للتحقق من تكامل المساهمات؟"
      title="تكامل النتائج التجريبية: من النماذج المنفردة إلى منظومة موحدة"
      beats={["المساهمة الأولى", "المساهمة الثانية", "المساهمة الثالثة", "التقاء المساهمات"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <ellipse cx={50} cy={52} rx={33} ry={38} fill="none" stroke={alpha(C.teal, 0.18)} strokeWidth={1} strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          <ShowG step={step} at={2}>
            <motion.path d="M 82 34 Q 76 21 65 21" fill="none" stroke={C.gold} strokeWidth={2} strokeDasharray="6 5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          </ShowG>
          <ShowG step={step} at={3}>
            <motion.path d="M 35 21 Q 24 21 18 34" fill="none" stroke={C.gold} strokeWidth={2} strokeDasharray="6 5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          </ShowG>
          <ShowG step={step} at={4}>
            {MAP_NODES.map((n, i) => (
              <motion.line
                key={n.k}
                x1={n.pos.x}
                y1={n.pos.y}
                x2={hub.x}
                y2={hub.y}
                stroke={CONTRIB[n.k].color}
                strokeWidth={2.6}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              />
            ))}
          </ShowG>
        </svg>

        {MAP_NODES.map((n, i) => {
          const c = CONTRIB[n.k];
          return (
            <Show key={n.k} step={step} at={i + 1} from="scale" style={{ position: "absolute", left: `${n.pos.x}%`, top: `${n.pos.y}%`, width: "29%", zIndex: 2 }}>
              <div style={{ transform: "translate(-50%, -50%)", position: "absolute", left: 0, top: 0, width: "100%" }}>
                <div style={{ background: "#fff", borderRadius: 18, border: `1.5px solid ${alpha(c.color, 0.45)}`, borderTop: `5px solid ${c.color}`, boxShadow: `0 14px 34px ${alpha(c.color, 0.16)}`, padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 19, fontWeight: 900, color: "#fff", background: c.color, borderRadius: 6, padding: "1px 10px" }}>{c.ordinal}</span>
                    <span style={{ fontSize: 19, fontWeight: 800, color: C.inkMuted }}>{n.chapter}</span>
                  </div>
                  <div style={{ fontSize: "clamp(21.8px, 1.83vw, 26px)", fontWeight: 900, marginTop: 6, color: c.color }}>{c.short}</div>
                  <div style={{ fontSize: 18.6, fontWeight: 700, color: C.inkSoft, lineHeight: 1.55, marginTop: 2 }}>{n.q}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                    {n.measures.map((m) => (
                      <span key={m} style={{ fontSize: 19, fontWeight: 800, color: c.color, background: c.soft, borderRadius: 999, padding: "2px 9px" }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Show>
          );
        })}

        <Show step={step} at={4} from="scale" delay={0.5} style={{ position: "absolute", left: `${hub.x}%`, top: `${hub.y}%`, zIndex: 3 }}>
          <div style={{ position: "absolute", left: 0, top: 0, transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div
              animate={{ boxShadow: [`0 0 0 0 ${alpha(C.gold, 0.45)}`, `0 0 0 22px ${alpha(C.gold, 0)}`] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "clamp(150px, 14vw, 220px)",
                aspectRatio: "1",
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 30%, ${C.tealDeep}, ${C.night})`,
                border: `3px solid ${C.gold}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#fff",
                padding: 18,
                boxSizing: "border-box",
              }}
            >
              <div style={{ fontSize: "clamp(21.8px, 1.95vw, 27.6px)", fontWeight: 900, lineHeight: 1.35 }}>نظام تخطيط وتحكم مكاني متكامل</div>
            </motion.div>
            <div style={{ marginTop: 10, fontSize: 19.8, fontWeight: 900, color: C.inkSoft, whiteSpace: "nowrap" }}>
              <span style={{ color: CONTRIB[1].color }}>تخطيط استراتيجي</span> · <span style={{ color: CONTRIB[2].color }}>عدالة مكانية</span> · <span style={{ color: CONTRIB[3].color }}>تحكم تشغيلي</span>
            </div>
          </div>
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-4 · From GIS to decision ═════════════ */

const LAYERS = [
  { name: "نظم المعلومات الجغرافية", role: `توحيد البيانات الراديوية لـ ${DATASET.totalSites} موقعاً جغرافياً`, ev: "ArcGIS Pro · Spatial Join", color: C.teal },
  { name: "التحسين الذكي", role: "استمثال قرارات الترقية في فضاء مقيد متعدد الأهداف", ev: "BPSO · AGA · إصلاح القيود", color: C.tealDeep },
  { name: "العدالة المكانية", role: "إلزام التوزيع الجغرافي العادل للاستثمارات ومنع التمركز", ev: "SFI · حد أدنى لكل منطقة", color: C.maroon },
  { name: "التحكم المكاني", role: "إنفاذ قرارات العزل على القطاعات المتقاطعة جغرافياً", ev: "تقاطع مضلّع · عزل من جانب الشبكة", color: BRONZE },
  { name: "مؤشرات الأداء", role: "تقييم الأداء التشغيلي والتحقق من اكتمال الاستعادة", ev: "9 مؤشرات مراقبة · 6 مقاييس", color: C.ink },
];

export const ResGisLogic: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(LAYERS.length + 1);
  const y = (i: number) => 62 + i * 104;
  return (
    <ResStage
      phase={1}
      question="كيف تتحول نظم GIS من أداة تمثيل مرئي إلى محرك لاتخاذ القرار الهندسي؟"
      title="سلسلة المعالجة: من الطبقات الجغرافية إلى مؤشرات الأداء"
      beats={[...LAYERS.map((l) => l.name), "الخلاصة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 4 (المعالجة المكانية) · الفصل 5 (SFI) · الفصل 6 (التقاطع المكاني والمراقبة)"
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <svg viewBox="0 0 1400 540" style={{ flex: 1, minHeight: 0, width: "100%" }}>
          <ArrowDefs colors={{ gb: C.gold }} />
          {step >= 2 && <Draw key={step} d={`M 700 ${y(0) + 30} V ${y(Math.min(step, LAYERS.length) - 1) - 34}`} color={C.gold} width={3.5} arrow="gb" duration={0.5} />}
          {LAYERS.map((l, i) => {
            const cy = y(i);
            const active = step === i + 1;
            return (
              <ShowG key={l.name} step={step} at={i + 1}>
                <motion.g initial={{ y: -16 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                  <polygon
                    points={`${700 - 260 + 50},${cy - 32} ${700 + 260 + 50},${cy - 32} ${700 + 260 - 50},${cy + 32} ${700 - 260 - 50},${cy + 32}`}
                    fill={active ? alpha(l.color, 0.16) : "#fff"}
                    stroke={l.color}
                    strokeWidth={active ? 2.6 : 1.5}
                  />
                  <T x={700} y={cy} size={27} weight={900} fill={l.color}>
                    {l.name}
                  </T>
                  <T x={1390} y={cy} size={20} anchor="start" weight={900} fill={C.ink}>
                    {l.role}
                  </T>
                  <T x={10} y={cy} size={18} anchor="end" weight={800} fill={C.inkSoft}>
                    {l.ev}
                  </T>
                </motion.g>
              </ShowG>
            );
          })}
          <ShowG step={step} at={1}>
            <T x={1390} y={16} size={16} anchor="start" weight={900} fill={C.inkMuted}>
              الدور الوظيفي في النموذج
            </T>
            <T x={10} y={16} size={16} anchor="end" weight={900} fill={C.inkMuted}>
              أداة التحقق في الأطروحة
            </T>
          </ShowG>
        </svg>
        <Show step={step} at={LAYERS.length + 1} style={{ textAlign: "center", fontSize: "clamp(21.8px, 1.89vw, 27.3px)", fontWeight: 900, marginTop: 4 }}>
          البيانات المكانية تحدد <span style={{ color: C.teal }}>الموقع الدقيق</span>، والعدالة تضمن <span style={{ color: C.maroon }}>التوازن الجغرافي</span>، والتحكم ينفّذ <span style={{ color: BRONZE }}>إعادة التشكيل</span>،
          ومؤشرات الأداء تثبت <span style={{ color: C.ink, textDecoration: `underline 3px ${C.gold}` }}>الجدوى الهندسية</span>
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-5 · The real experiment ═════════════ */

const PIPELINE = ["البيانات", "GIS", "PostGIS", "Atoll / mPlanet", "الخوارزميات", "المحاكاة", "التقييم الإحصائي"];

const Split: React.FC<{ label: string; parts: Array<{ name: string; value: string; share: number; color: string }> }> = ({ label, parts }) => (
  <div>
    <div style={{ fontSize: 19, fontWeight: 900, color: C.inkSoft, marginBottom: 4 }}>{label}</div>
    <div style={{ display: "flex", height: 30, borderRadius: 8, overflow: "hidden" }}>
      {parts.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ flexGrow: 0.001 }}
          animate={{ flexGrow: p.share }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
          style={{ flexBasis: 0, background: p.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 19, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden" }}
        >
          {p.name} <N>{p.value}</N>
        </motion.div>
      ))}
    </div>
  </div>
);

export const ResExperiment: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ResStage
      phase={2}
      question="ما خصائص البيانات التجريبية وبيئة التقييم المعتمدة؟"
      title="البيئة التجريبية: بيانات تشغيلية حقيقية لكامل الشبكة الخلوية في سورية"
      beats={["حجم البيانات", "تركيبتها", "سلسلة التنفيذ", "حجم التجارب"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 4 · جدول 3 — الفصل 6 · جدول 31 و§4.3.6 — الفصل 5 · §6.5.5"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
          <Show step={step} at={1}>
            <div style={{ fontSize: 19.8, fontWeight: 900, color: C.inkSoft }}>موقعاً خلوياً تشغيلياً لشبكتي MTN وSyriatel</div>
            <HeroNumber value={79268} size="clamp(70px, 8vw, 122px)" />
          </Show>
          <Show step={step} at={2} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Split
              label="حسب الجيل"
              parts={[
                { name: "2G", value: DATASET.g2, share: 21356, color: C.g2 },
                { name: "3G", value: DATASET.g3, share: 27902, color: C.g3 },
                { name: "4G مرشحة للترقية", value: DATASET.g4Candidates, share: 30010, color: C.teal },
              ]}
            />
            <Split
              label="حسب المشغّل"
              parts={[
                { name: "Syriatel", value: DATASET.syriatel, share: 49464, color: C.tealDeep },
                { name: "MTN", value: DATASET.mtn, share: 29512, color: C.gold },
              ]}
            />
            <Split
              label="حسب البيئة"
              parts={[
                { name: "حضري", value: DATASET.urbanPct, share: 62, color: C.maroon },
                { name: "ريفي", value: DATASET.ruralPct, share: 38, color: alpha(C.maroon, 0.55) },
              ]}
            />
          </Show>
        </div>

        <Show step={step} at={1} from="scale" style={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, minHeight: 0, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.hair}`, background: "#fff", boxShadow: "0 10px 28px rgba(15,23,42,0.08)" }}>
            <img src={assetUrl("thesis_figures/fig18_syria_candidate_sites_map.png")} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: C.inkMuted, marginTop: 4, textAlign: "center" }}>الشكل 18 · التوزع الجغرافي للمحطات المرشحة للترقية</div>
        </Show>
      </div>

      <Show step={step} at={3} style={{ marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
          {PIPELINE.map((p, i) => (
            <React.Fragment key={p}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 19.3,
                  fontWeight: 900,
                  padding: "8px 4px",
                  borderRadius: 10,
                  background: i === PIPELINE.length - 1 ? C.maroon : i < 4 ? "#fff" : alpha(C.teal, 0.12),
                  color: i === PIPELINE.length - 1 ? "#fff" : C.ink,
                  border: `1px solid ${i === PIPELINE.length - 1 ? C.maroon : alpha(C.teal, 0.35)}`,
                  whiteSpace: "nowrap",
                }}
              >
                {p}
              </motion.div>
              {i < PIPELINE.length - 1 && <Chevron color={C.teal} size={18} />}
            </React.Fragment>
          ))}
        </div>
      </Show>
      <Show step={step} at={4} style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
        {[
          ["سيناريوهات تخطيطية", "S1–S5"],
          ["تشغيلة متكررة لتقييم الاستقرار", `${SEED_RUNS}`],
          ["تشغيلة مستقلة لاختبار الدلالة الإحصائية", `${TTEST.runs}`],
          ["محافظات لسيناريوهات التحكم", `${CH6_DESIGN.governorates}`],
          ["سيناريوهات حضرية / ريفية", `~${CH6_DESIGN.urbanScenarios} / ~${CH6_DESIGN.ruralScenarios}`],
          ["دقيقة مدة محاكاة السيناريو", CH6_DESIGN.durationMin],
        ].map(([label, v]) => (
          <span key={label} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, background: "#fff", border: `1px solid ${C.hair}`, borderRadius: 999, padding: "4px 14px", fontSize: 18.6, fontWeight: 800 }}>
            <N color={C.teal} size={17}>
              {v}
            </N>
            {label}
          </span>
        ))}
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-6 · The algorithm as a journey ═════════════ */

const REPAIR_RULES = [
  { when: "تجاوز الميزانية", then: "حذف المواقع الأدنى نسبةَ تغطية / كلفة", color: C.red },
  { when: "تغطية أقل من الحد الأدنى", then: "إضافة المواقع الأعلى نسبةَ تغطية / كلفة", color: C.teal },
  { when: "عدم استيفاء عتبة العدالة الإقليمية", then: "إعادة تخصيص المواقع مكانياً حتى استيفاء شرط Σxᵢ ≥ αⱼ", color: C.maroon },
];

export const ResAlgorithm: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const node = (x: number, y: number, w: number, label: string, sub: string, color: string, solid = false) => (
    <g>
      <rect x={x - w / 2} y={y - 44} width={w} height={88} rx={16} fill={solid ? color : "#fff"} stroke={color} strokeWidth={2} />
      <T x={x} y={y - 12} size={24} weight={900} fill={solid ? "#fff" : C.ink}>
        {label}
      </T>
      <T x={x} y={y + 20} size={16} weight={800} fill={solid ? "rgba(255,255,255,0.85)" : C.inkSoft}>
        {sub}
      </T>
    </g>
  );
  return (
    <ResStage
      phase={1}
      question="كيف تضمن آلية المعالجة توليد حلول متوافقة مع جميع القيود الهندسية؟"
      title="آلية التحسين المقيد: مسار المعالجة وإصلاح الحلول"
      contrib={1}
      beats={["الإدخال", "الدالة الهدف", "إصلاح القيود", "التحديث والتكرار", "الحل"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 4 · جداول 4 و5 و§إصلاح القيود — الفصل 5 · الدالة الموسّعة"
    >
      <div style={{ minHeight: 52, display: "flex", justifyContent: "center" }}>
        <Show step={step} at={2}>
          <Formula size={20} style={{ padding: "8px 18px" }}>
            max F = w<sub>1</sub>·Coverage(x) − w<sub>2</sub>·Cost(x) − w<sub>3</sub>·Energy(x) + <b style={{ color: C.maroon }}>w<sub>4</sub>·Fairness(x)</b>
          </Formula>
        </Show>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg viewBox="0 0 1400 480" style={{ width: "100%", height: "100%" }}>
          <ArrowDefs colors={{ fa: C.teal, fg: C.gold, fm: C.maroon }} />
          <ShowG step={step} at={1}>
            {node(1220, 70, 300, "الإدخال", `${DATASET.g4Candidates} موقعاً مرشحاً للترقية`, C.teal)}
            <T x={1220} y={136} size={15} weight={800} fill={C.inkMuted}>
              {`سرب / مجتمع من ${BPSO_PARAMS.swarm} حلاً ثنائياً`}
            </T>
          </ShowG>
          <ShowG step={step} at={2}>
            <Draw d="M 1068 70 H 978" color={C.teal} arrow="fa" width={2.5} />
            {node(830, 70, 290, "التقييم", "دالة الهدف متعددة المعايير (رباعية الأهداف)", C.teal)}
          </ShowG>
          <ShowG step={step} at={3}>
            <Draw d="M 683 70 H 528" color={C.gold} arrow="fg" width={3} />
            <rect x={30} y={8} width={494} height={310} rx={20} fill={alpha(C.gold, 0.09)} stroke={C.gold} strokeWidth={2.6} />
            <T x={277} y={40} size={26} weight={900} fill={BRONZE}>
              إصلاح القيود
            </T>
            <T x={277} y={70} size={16} weight={800} fill={C.inkSoft}>
              إصلاح الحلول غير المقبولة توجيهياً بدلاً من إقصائها
            </T>
            {REPAIR_RULES.map((r, i) => (
              <motion.g key={r.when} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.25 }}>
                <rect x={48} y={90 + i * 74} width={458} height={66} rx={12} fill="#fff" stroke={alpha(r.color, 0.5)} />
                <rect x={496} y={90 + i * 74} width={10} height={66} rx={4} fill={r.color} />
                <T x={482} y={112 + i * 74} size={18} anchor="start" weight={900} fill={r.color}>
                  {`إذا: ${r.when}`}
                </T>
                <T x={482} y={140 + i * 74} size={16} anchor="start" weight={800} fill={C.ink}>
                  {`← ${r.then}`}
                </T>
              </motion.g>
            ))}
          </ShowG>
          <ShowG step={step} at={4}>
            <Draw d="M 277 318 V 400 H 598" color={C.teal} arrow="fa" width={2.5} />
            <rect x={600} y={345} width={460} height={112} rx={16} fill="#fff" stroke={C.teal} strokeWidth={2} />
            <T x={830} y={372} size={22} weight={900}>
              التحديث
            </T>
            <T x={830} y={404} size={15} weight={800} fill={C.inkSoft} latin>
              {`BPSO: ω ${BPSO_PARAMS.inertia} · c₁ = c₂ = ${BPSO_PARAMS.c1} · Vmax ${BPSO_PARAMS.vmax}`}
            </T>
            <T x={830} y={432} size={15} weight={800} fill={C.inkSoft} latin>
              {`AGA: k = ${AGA_PARAMS.tournamentK} · Pc ${AGA_PARAMS.crossoverRate} · Pm ${AGA_PARAMS.mutationStart} → ${AGA_PARAMS.mutationEnd}`}
            </T>
            <Draw d="M 830 343 V 118" color={C.teal} dashed arrow="fa" width={2.5} />
            <T x={850} y={232} size={18} anchor="end" weight={900} fill={C.teal}>
              {`إعادة التقييم حتى ${BPSO_PARAMS.iterations} تكرار`}
            </T>
            <Pulse d="M 683 70 H 528 M 277 318 V 400 H 598 M 830 343 V 118" r={5} dur={4} />
          </ShowG>
          <ShowG step={step} at={5}>
            <Draw d="M 1062 400 H 1104" color={C.maroon} arrow="fm" width={2.6} />
            {node(1245, 400, 270, "الحل الأمثل القابل للتنفيذ", "مصفوفة المواقع المختارة للترقية", C.maroon, true)}
          </ShowG>
        </svg>
      </div>
    </ResStage>
  );
};
