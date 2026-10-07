import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThesisImage } from "../../ui/ThesisImage";
import { ALG, ArrowDefs, Box, C, Chip, ContribStage, CountUp, Draw, Formula, KpiTile, Pulse, Show, ShowG, SyriaBase, T, useBeats, useSites } from "./kit";
import { AGA_PARAMS, CH4_PLAN_SCENARIOS, CH4_RESULTS, DATASET } from "./facts";

const BPSO = ALG.bpso.color;
const AGA = ALG.aga.color;

/* ═════════════ 1 · Opening / The Challenge ═════════════ */

export const C1Challenge: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const sites = useSites(820, 11);
  return (
    <ContribStage
      contribution={1}
      title="تحسين تخطيط نشر الجيل الخامس في البيئات محدودة الموارد"
      beats={["79,268 موقعاً خلوياً", "ثلاثة أهداف متعارضة", "السؤال المركزي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 18 }}>
        <div style={{ position: "relative", minHeight: 0 }}>
          <svg viewBox="80 30 820 490" style={{ width: "100%", height: "100%" }}>
            <SyriaBase idSuffix="ch" />
            {sites.map((s, i) => (
              <motion.circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.urban ? 1.7 : 2.1}
                fill={s.urban ? BPSO : C.gold}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.78 }}
                transition={{ delay: (i % 140) * 0.006, duration: 0.35 }}
              />
            ))}
          </svg>
          <div style={{ position: "absolute", left: 12, bottom: 8, display: "flex", gap: 10 }}>
            <Chip color={BPSO}> **إطار منهجي لتحويل الفجوة البحثية إلى منظومة حل متكاملة**
            </Chip>
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div style={{ fontSize: "clamp(72px, 8.4vw, 128px)", fontWeight: 900, color: C.ink, lineHeight: 0.92, textShadow: "0 0 28px rgba(244,242,234,0.96)" }}>
              <CountUp value={79268} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: BPSO, background: "rgba(244,242,234,0.92)", borderRadius: 10, padding: "3px 16px" }}>موقعاً خلوياً تشغيلياً</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, minHeight: 0 }}>
          <Show step={step} at={2} style={{ display: "grid", gap: 8 }}>
            {[
              { t: "Coverage ↑", ar: "تعظيم التغطية", c: C.green },
              { t: "CAPEX ↓", ar: "خفض الكلفة الرأسمالية", c: C.maroon },
              { t: "Energy ↓", ar: "ترشيد استهلاك الطاقة", c: C.gold },
            ].map((k) => (
              <div key={k.t} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, borderRight: `5px solid ${k.c}`, padding: "10px 14px", boxShadow: "0 8px 22px rgba(15,23,42,0.05)" }}>
                <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 24, color: k.c, lineHeight: 1 }}>
                  {k.t}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.inkSoft, marginTop: 2 }}>{k.ar}</div>
              </div>
            ))}
          </Show>
          <Show step={step} at={3}>
            <div style={{ background: C.ink, color: "#fff", borderRadius: 14, padding: "12px 14px", fontSize: 20, fontWeight: 900, lineHeight: 1.4 }}>
              أي المواقع نرقّي إلى الجيل الخامس؟
              <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, opacity: 0.7, marginTop: 4 }}>
                Which sites should be upgraded to 5G?
              </div>
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 2 · Real Network → Optimization pipeline ═════════════ */

const PIPE = [
  { ar: "بيانات تشغيلية", en: "Real Data" },
  { ar: "تنظيف البيانات", en: "Cleaning" },
  { ar: "معالجة GIS", en: "GIS" },
  { ar: "النموذج الرياضي", en: "Model" },
  { ar: "AGA / BPSO", en: "Metaheuristics" },
  { ar: "التجارب", en: "Experiments" },
  { ar: "القرار الهندسي", en: "Decision" },
];

export const C1Pipeline: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(8);
  return (
    <ContribStage
      contribution={1}
      title="من الشبكة الحقيقية إلى قرار التحسين"
      beats={["البيانات التشغيلية", "التنظيف", "المعالجة الجغرافية", "النموذج الرياضي", "AGA و BPSO", "التجارب", "القرار الهندسي", "مسار بحث واحد"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
        <svg viewBox="0 0 1260 250" style={{ width: "100%", height: 260 }}>
          <ArrowDefs colors={{ "pl-t": BPSO, "pl-g": C.gold }} />
          <Draw d="M80 130 H 1180" color={BPSO} width={3.4} duration={1.1} />
          <Pulse d="M80 130 H 1180" color={C.gold} r={7} dur={3.4} />
          {PIPE.map((p, i) => {
            const x = 95 + i * 172;
            const on = step >= i + 1;
            const last = i === PIPE.length - 1;
            return (
              <ShowG key={p.en} step={step} at={i + 1}>
                <circle cx={x} cy={130} r={22} fill={on ? (last ? C.ink : BPSO) : "#fff"} stroke={last ? C.ink : BPSO} strokeWidth={3} />
                <T x={x} y={130} size={17} weight={900} latin fill={on ? "#fff" : BPSO}>
                  {String(i + 1).padStart(2, "0")}
                </T>
                <Box x={x} y={on && step === i + 1 ? 52 : 50} w={160} h={66} label={p.ar} sub={p.en} color={last ? C.ink : BPSO} solid={last || step === i + 1} size={17} glow={step === i + 1} />
              </ShowG>
            );
          })}
        </svg>

        <Show step={step} at={8} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { t: "شبكة حقيقية", d: "79,268 موقعاً · MTN وSyriatel" },
            { t: "مسألة محدودة الموارد", d: "تغطية أعلى بكلفة وطاقة أقل" },
            { t: "قرار قابل للتنفيذ", d: "أي المواقع تُرقّى أولاً" },
          ].map((c) => (
            <div key={c.t} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: "16px 18px" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: BPSO }}>{c.t}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.inkSoft, marginTop: 4 }}>{c.d}</div>
            </div>
          ))}
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 3 · Real dataset dashboard ═════════════ */

export const C1Dataset: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(7);
  const sites = useSites(640, 23);
  const genColor = (i: number) => (i % 79 < 21 ? C.g2 : i % 79 < 49 ? C.g3 : C.g4);

  const GIS_FRAMES = [
    {
      src: "thesis_figures/gis_lte_coverage_polygons.jpg",
      title: "طبقة تغطية LTE",
      caption: "مضلعات التغطية الراديوية فوق الخريطة الأساسية — عتبة −105 dBm",
      tag: "Coverage Layer",
    },
    {
      src: "thesis_figures/gis_lte_sectors_cells.jpg",
      title: "خلايا وقطاعات LTE",
      caption: "اتجاهات القطاعات (Azimuth) مع جدول خصائص الخلايا التشغيلية",
      tag: "Sectors · Cells",
    },
    {
      src: "thesis_figures/gis_cite4g_sites_table.jpg",
      title: "قاعدة مواقع 4G",
      caption: "سمات المواقع: الإحداثيات، الهوائيات، الميل، ومعرّفات الخلايا",
      tag: "Site Attributes",
    },
  ] as const;

  const galleryOn = step >= 5;
  const frameIndex = galleryOn ? Math.min(step - 5, GIS_FRAMES.length - 1) : -1;
  const frame = frameIndex >= 0 ? GIS_FRAMES[frameIndex] : null;

  return (
    <ContribStage
      contribution={1}
      title="قاعدة البيانات التشغيلية للشبكة السورية"
      beats={[
        "حجم الشبكة",
        "توزيع الأجيال",
        "المشغّلان والبيئة",
        "4G قاعدة مرشحي NSA",
        "طبقة التغطية GIS",
        "القطاعات والخلايا",
        "سمات المواقع",
      ]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.05fr 1.15fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          <div style={{ background: C.ink, borderRadius: 18, padding: "16px 18px", color: "#fff" }}>
            <div style={{ fontSize: 17, fontWeight: 800, opacity: 0.7 }}>إجمالي المواقع</div>
            <div style={{ fontSize: "clamp(52px, 5.6vw, 78px)", fontWeight: 900, lineHeight: 1, fontFamily: "Inter, sans-serif" }}>
              <CountUp value={79268} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { l: "2G", v: DATASET.g2, c: C.g2, n: 21356 },
              { l: "3G", v: DATASET.g3, c: C.g3, n: 27902 },
              { l: "4G", v: DATASET.g4Candidates, c: C.g4, n: 30010 },
            ].map((g, i) => (
              <Show key={g.l} step={step} at={2} delay={i * 0.08}>
                <KpiTile label={g.l} value={g.v} color={g.c} note="موقع" />
              </Show>
            ))}
          </div>
          <Show step={step} at={3} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <KpiTile label="المشغّلان" value={DATASET.operators} color={C.ink} note="MTN · Syriatel" />
            <KpiTile label="حضري" value={DATASET.urbanPct} color={BPSO} />
            <KpiTile label="ريفي" value={DATASET.ruralPct} color={C.gold} />
          </Show>
          <Show step={step} at={4}>
            <div style={{ background: "rgba(30,136,229,0.08)", border: `1.5px solid ${C.g4}`, borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.g4 }}>تمثل شبكة 4G قاعدة اختيار مواقع الترقية ضمن بنية NSA (Non-Standalone) لشبكات 5G.</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.inkSoft, marginTop: 4 }}>
                30,010 موقع LTE معتمدة كمجموعة N وفق المعمارية غير المستقلة
              </div>
            </div>
          </Show>

          {galleryOn && frame && (
            <motion.div
              key={frame.src}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                marginTop: "auto",
                background: "#fff",
                borderRadius: 14,
                border: `1.5px solid ${C.hair}`,
                padding: "12px 14px",
                boxShadow: "0 8px 22px rgba(15,23,42,0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{frame.title}</span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 900,
                    color: C.g4,
                    background: "rgba(30,136,229,0.1)",
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  {frame.tag}
                </span>
              </div>
              <div style={{ fontSize: 16.5, fontWeight: 700, color: C.inkSoft, lineHeight: 1.45 }}>{frame.caption}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                {GIS_FRAMES.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 99,
                      background: i === frameIndex ? C.g4 : "rgba(15,23,42,0.12)",
                      transition: "background .3s",
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, color: C.inkMuted }}>
               
              </div>
            </motion.div>
          )}
        </div>

        <div
          style={{
            minHeight: 0,
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            background: "#fff",
            border: `1.5px solid ${C.hair}`,
            boxShadow: "0 10px 28px rgba(15,23,42,0.07)",
          }}
        >
          <svg viewBox="80 30 820 490" style={{ width: "100%", height: "100%", display: "block" }}>
            <SyriaBase idSuffix="ds" labels={!galleryOn} />
            {sites.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={2} fill={genColor(i)} opacity={galleryOn ? 0.35 : 0.82} />
            ))}
          </svg>

          {!galleryOn && (
            <div style={{ position: "absolute", left: 10, bottom: 8, display: "flex", gap: 8 }}>
              <Chip color={C.g2}>2G</Chip>
              <Chip color={C.g3}>3G</Chip>
              <Chip color={C.g4}>4G</Chip>
              <Chip color={C.inkMuted}>توزيع تخطيطي</Chip>
            </div>
          )}

          <AnimatePresence mode="wait">
            {frame && (
              <motion.div
                key={frame.src}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "rgba(15,23,42,0.55)",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "8px 12px",
                    background: "linear-gradient(90deg, rgba(15,23,42,0.88), rgba(30,136,229,0.75))",
                    color: "#fff",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 900 }}>{frame.title}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 900, opacity: 0.9 }}>
                    GIS · {frameIndex + 1}/{GIS_FRAMES.length}
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 8,
                    background: "#0b1220",
                  }}
                >
                  <ThesisImage
                    src={frame.src}
                    alt={frame.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 4 · Why the problem is hard ═════════════ */

export const C1WhyHard: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const cards = [
    { t: "حجم هائل", d: "79,268 موقعاً · 30,010 مرشحاً" },
    { t: "قرار ثنائي", d: "xᵢ ∈ {0, 1} لكل موقع" },
    { t: "أهداف متعددة", d: "تغطية × كلفة × طاقة" },
    { t: "قيود صلبة", d: "ميزانية · سقف K · تغطية دنيا" },
    { t: "سلوك غير خطّي", d: "Normalization ثم دالة موزونة" },
    { t: "NP-hard", d: "الحل الدقيق غير عملي بهذا النطاق" },
  ];
  return (
    <ContribStage
      contribution={1}
      title="لماذا لا يكفي «اختيار مواقع»؟"
      beats={["أبعاد الصعوبة", "فضاء توافقي هائل", "استحالة الحل الدقيق", "ضرورة الاستدلال الفوقي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {cards.map((c, i) => (
          <Show key={c.t} step={step} at={1} delay={i * 0.06}>
            <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: "12px 14px", minHeight: 92 }}>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{c.t}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.inkSoft, marginTop: 4 }}>{c.d}</div>
            </div>
          </Show>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 16, marginTop: 12, alignItems: "center" }}>
        <Show step={step} at={2} from="right">
          <div style={{ textAlign: "center" }}>
            <div dir="ltr" style={{ fontFamily: "'Cambria Math', serif", fontSize: "clamp(52px, 6vw, 84px)", fontWeight: 700, color: C.maroon, lineHeight: 1 }}>
              2<sup style={{ fontSize: "0.48em" }}>30,010</sup>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.inkSoft, marginTop: 6 }}>تشكيلة ممكنة لخطة الترقية</div>
          </div>
        </Show>
        <Show step={step} at={3}>
          <div style={{ background: "rgba(107,31,42,0.07)", borderRadius: 16, padding: "16px 18px", borderRight: `5px solid ${C.maroon}` }}>
            <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>
              نحن لا نختار مواقع فحسب — بل نبحث في فضاء توافقي هائل تحت أهداف متنافسة وقيود صلبة.
            </div>
            <Show step={step} at={4} style={{ marginTop: 12 }}>
              <Chip color={C.maroon} solid>
              وعليه، تصبح الخوارزميات ما وراء التجريبية (Metaheuristic Algorithms) ضرورةً منهجيةً وليست خيارًا.
              </Chip>
            </Show>
          </div>
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 5 · Mathematical model ═════════════ */

const OBJ = [
  { key: "cov", label: "التغطية", dir: "تعظيم ↑", x: 500, y: 70, color: C.green },
  { key: "cost", label: "التكلفة", dir: "تقليل ↓", x: 790, y: 330, color: C.maroon },
  { key: "en", label: "الطاقة", dir: "تقليل ↓", x: 210, y: 330, color: C.gold },
];

export const C1Model: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  return (
    <ContribStage
      contribution={1}
      title="النموذج الرياضي: قرار واحد وثلاثة أهداف"
      beats={["متغير القرار", "الأهداف الثلاثة", "الدالة الموزونة", "توحيد القياس", "القيود الصلبة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
        <svg viewBox="80 0 840 440" style={{ width: "100%", height: "100%" }}>
          {OBJ.map((o, i) => (
            <ShowG key={o.key} step={step} at={2}>
              <Draw d={`M500 230 L${o.x} ${o.y}`} color={o.color} width={3} delay={i * 0.1} />
              <Pulse d={`M500 230 L${o.x} ${o.y}`} color={o.color} r={5} dur={1.7} begin={i * 0.2} />
              <circle cx={o.x} cy={o.y} r={56} fill="#fff" stroke={o.color} strokeWidth={3} />
              <T x={o.x} y={o.y - 10} size={20} weight={900} fill={o.color}>
                {o.label}
              </T>
              <T x={o.x} y={o.y + 16} size={14} weight={800} fill={C.inkSoft}>
                {o.dir}
              </T>
            </ShowG>
          ))}
          <circle cx={500} cy={230} r={90} fill={C.ink} />
          <T x={500} y={214} size={18} weight={900} fill="#fff">
            قرار الترقية
          </T>
          <T x={500} y={240} size={14} latin fill="rgba(255,255,255,0.7)">
            xᵢ ∈ {"{0,1}"}
          </T>
          <T x={500} y={262} size={13} weight={800} fill="rgba(255,255,255,0.65)">
            اختيار المواقع
          </T>
        </svg>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <Show step={step} at={3}>
            <Formula size={20}>
              max F = w<sub>1</sub> Coverage − w<sub>2</sub> Cost − w<sub>3</sub> Energy
            </Formula>
            <div dir="ltr" style={{ textAlign: "center", marginTop: 6, fontFamily: "'Cambria Math', serif", fontSize: 20, color: C.inkSoft }}>
              w<sub>1</sub> + w<sub>2</sub> + w<sub>3</sub> = 1
            </div>
          </Show>
          <Show step={step} at={4}>
            <Chip color={BPSO}>Min-Max Normalization → قيم لا بُعدية في {"{0,1}"}</Chip>
          </Show>
          <Show step={step} at={5} style={{ display: "grid", gap: 8 }}>
            {[
              { ar: "الميزانية", f: <>Σ Costᵢ · xᵢ ≤ B</> },
              { ar: "سقف المواقع", f: <>Σ xᵢ ≤ K</> },
              { ar: "تغطية دنيا", f: <>Coverage(x) ≥ C<sub>min</sub></> },
            ].map((c) => (
              <div key={c.ar} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 110, fontWeight: 900, fontSize: 18 }}>{c.ar}</span>
                <Formula size={17} style={{ flex: 1, padding: "6px 10px" }}>
                  {c.f}
                </Formula>
              </div>
            ))}
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 6 · Why two algorithms ═════════════ */

const AgaMachine: React.FC = () => {
  const nodes = ["المجتمع", "الانتقاء", "التقاطع", "الطفرة"];
  const pos = [
    [200, 50],
    [330, 160],
    [200, 270],
    [70, 160],
  ];
  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      <circle cx={200} cy={160} r={110} fill="none" stroke={AGA} strokeOpacity={0.3} strokeWidth={14} />
      <Pulse d="M200 50 A110 110 0 1 1 199.9 50" color={AGA} r={7} dur={3} />
      {nodes.map((n, i) => (
        <g key={n}>
          <rect x={pos[i][0] - 56} y={pos[i][1] - 22} width={112} height={44} rx={22} fill={i === 3 ? AGA : "#fff"} stroke={AGA} strokeWidth={2} />
          <T x={pos[i][0]} y={pos[i][1]} size={15} weight={900} fill={i === 3 ? "#fff" : AGA}>
            {n}
          </T>
        </g>
      ))}
      <T x={200} y={160} size={13} weight={800} fill={C.inkSoft}>
        Evolution
      </T>
    </svg>
  );
};

const SWARM = [
  [60, 60],
  [110, 250],
  [320, 70],
  [340, 260],
  [70, 170],
  [220, 40],
  [250, 280],
];

const BpsoMachine: React.FC = () => (
  <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
    <circle cx={200} cy={160} r={34} fill="rgba(66,129,119,0.16)" stroke={BPSO} strokeWidth={2} />
    <T x={200} y={160} size={13} weight={900} latin fill={BPSO}>
      gBest
    </T>
    {SWARM.map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y} x2={200} y2={160} stroke={BPSO} strokeOpacity={0.25} strokeDasharray="4 4" />
        <motion.circle
          r={8}
          fill={BPSO}
          initial={{ cx: x, cy: y }}
          animate={{ cx: [x, x + (200 - x) * 0.45, x], cy: [y, y + (160 - y) * 0.45, y] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      </g>
    ))}
    <T x={60} y={36} size={11} latin fill={C.inkMuted}>
      pBest
    </T>
  </svg>
);

export const C1TwoAlgorithms: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ContribStage
      contribution={1}
      title=" مقارنة خوارزميتين للتحقق من كفاءة الحل: AGA مقابل BPSO"
      beats={["استراتيجيتان مستقلتان", "AGA: تطور", "BPSO: ذكاء سربي", "إصلاح قيود مشترك"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Show step={step} at={2} from="right" style={{ display: "flex", flexDirection: "column", minHeight: 0, background: "rgba(107,31,42,0.05)", borderRadius: 20, border: `1.5px solid ${AGA}55`, padding: 14 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: AGA }}>AGA · Evolution</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.inkSoft }}>خوارزمية جينية تكيفية</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <AgaMachine />
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {["Population-based", "Selection", "Crossover", "Adaptive mutation", "Constraint repair"].map((t) => (
              <Chip key={t} color={AGA}>
                {t}
              </Chip>
            ))}
          </div>
        </Show>
        <Show step={step} at={3} from="left" style={{ display: "flex", flexDirection: "column", minHeight: 0, background: "rgba(66,129,119,0.06)", borderRadius: 20, border: `1.5px solid ${BPSO}55`, padding: 14 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: BPSO }}>BPSO · Swarm</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.inkSoft }}>سرب جسيمات ثنائي</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <BpsoMachine />
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {["Swarm-based", "pBest / gBest", "Velocity", "Sigmoid", "Constraint repair"].map((t) => (
              <Chip key={t} color={BPSO}>
                {t}
              </Chip>
            ))}
          </div>
        </Show>
      </div>
      <Show step={step} at={4} style={{ marginTop: 8, textAlign: "center", fontSize: 20, fontWeight: 800, color: C.inkSoft }}>
        البيانات نفسها · القيود نفسها · آلية الإصلاح نفسها · مقارنة منهجية عادلة
       
    
      </Show>
    </ContribStage>
  );
};

/* ═════════════ 8 · Experimental setup (lives in Part A export list via Part B) ═════════════ */

export const C1Experiments: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  return (
    <ContribStage
      contribution={1}
      title="إعداد التجارب: مقارنة عادلة وقابلة للتكرار"
      beats={["ثوابت التجربة", "سيناريوهات الحجم", "خطوط الأساس"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
        {[
          { l: "المواقع", v: DATASET.totalSites },
          { l: "المشغّلان", v: String(DATASET.operators) },
          { l: "الخوارزميات", v: "AGA + BPSO" },
          { l: "المجتمع / السرب", v: String(CH4_RESULTS.population) },
          { l: "التكرارات", v: String(CH4_RESULTS.iterations) },
          { l: "التشغيلات", v: String(CH4_RESULTS.runs) },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.inkSoft }}>{k.l}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 900, color: BPSO, marginTop: 4 }}>{k.v}</div>
          </motion.div>
        ))}
      </div>

      <Show step={step} at={2} style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginTop: 14 }}>
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${C.hair}`, padding: 16, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 900 }}>تصاعد الموارد عبر ثلاثة سيناريوهات</div>
          {CH4_PLAN_SCENARIOS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 48, fontFamily: "Inter, sans-serif", fontWeight: 900, color: BPSO }}>{s.id}</span>
              <div style={{ flex: 1, height: 28, background: C.hair, borderRadius: 8, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${((i + 1) / 3) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.12 }} style={{ height: "100%", background: i === 1 ? BPSO : i === 2 ? C.ink : C.gold }} />
              </div>
              <span style={{ width: 90, fontWeight: 900 }}>{s.sites}</span>
              <span style={{ width: 70, fontSize: 16, fontWeight: 800, color: C.inkSoft }}>{s.budget}</span>
            </div>
          ))}
        </div>
        <Show step={step} at={3} from="left" style={{ display: "grid", gap: 8, alignContent: "center" }}>
          {[
            { n: "Proposed AGA", c: AGA },
            { n: "Proposed BPSO", c: BPSO },
            { n: "Standard GA", c: ALG.stdGa.color },
            { n: "Random Selection", c: ALG.random.color },
          ].map((m) => (
            <Chip key={m.n} color={m.c} solid={m.n.startsWith("Proposed")}>
              {m.n}
            </Chip>
          ))}
          <div style={{ fontSize: 16, fontWeight: 700, color: C.inkMuted }}></div>
        </Show>
      </Show>
    </ContribStage>
  );
};
