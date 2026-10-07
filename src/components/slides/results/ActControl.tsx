import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { Formula } from "../contributions/kit";
import { ISOLATION_BY_ENV, MONITORED_KPIS, RESTORATION, VENDORS } from "./facts";
import {
  ArrowDefs,
  BRONZE,
  C,
  CONTRIB,
  Card,
  Chevron,
  Draw,
  EASE,
  FigureSvg,
  HeroNumber,
  N,
  Pulse,
  ResStage,
  Show,
  ShowG,
  StatTag,
  T,
  hexPts,
  useBeats,
} from "./stage";

const B = CONTRIB[3].color;

/* ───────── Illustrative operational grid ───────── */

type Cell = { id: string; x: number; y: number; tech: string; vendor: "h" | "e"; kind: "in" | "edge" | "ring" | "out"; d: number };

const TARGET: Array<[number, number]> = [
  [370, 210],
  [520, 172],
  [650, 228],
  [672, 340],
  [598, 430],
  [452, 440],
  [352, 362],
];
const TARGET_D = "M " + TARGET.map(([x, y]) => `${x} ${y}`).join(" L ") + " Z";
const CENTER = { x: 510, y: 310 };

const inPoly = (x: number, y: number) => {
  let inside = false;
  for (let i = 0, j = TARGET.length - 1; i < TARGET.length; j = i++) {
    const [xi, yi] = TARGET[i];
    const [xj, yj] = TARGET[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

const buildCells = (): Cell[] => {
  const r = 30;
  const w = Math.sqrt(3) * r;
  const cells: Cell[] = [];
  const techs = [C.g2, C.g3, C.g4];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 18; col++) {
      const x = 70 + col * w + (row % 2 ? w / 2 : 0);
      const y = 110 + row * 45;
      const samples = [[x, y], ...Array.from({ length: 6 }, (_, k) => [x + 0.8 * r * Math.cos((Math.PI / 3) * k), y + 0.8 * r * Math.sin((Math.PI / 3) * k)])];
      const hits = samples.filter(([sx, sy]) => inPoly(sx, sy)).length;
      const kind: Cell["kind"] = hits >= 5 ? "in" : hits >= 1 ? "edge" : "out";
      cells.push({ id: `${row}-${col}`, x, y, tech: techs[(row + col * 2) % 3], vendor: col < 9 ? "h" : "e", kind, d: Math.hypot(x - CENTER.x, y - CENTER.y) });
    }
  }
  const edges = cells.filter((c) => c.kind === "edge");
  for (const c of cells) {
    if (c.kind === "out" && edges.some((e) => Math.hypot(e.x - c.x, e.y - c.y) < 1.1 * w)) c.kind = "ring";
  }
  return cells;
};

const SCENARIO = [
  { h: "تحديد النطاق الجغرافي", b: "تعريف المضلع المكاني المستهدف بدقة على طبقات نظم GIS" },
  { h: "التقاطع المكاني للقطاعات", b: "تحديد الخلايا الراديوية المتقاطعة هندسياً مع حدود المضلع" },
  { h: "التنسيق متعدد الموردين", b: "تحويل الأمر التشغيلي الموحد إلى تعليمات تنفيذية خاصة بكل مصنّع" },
  { h: "إنفاذ العزل المكاني", b: "تقييد الوصول الراديوي من جانب الشبكة Core/RAN دون تشويش" },
  { h: "كبح التسرب الجغرافي", b: "تطبيق تقييد جزئي على الخلايا الحدودية لمنع امتداد الأثر إلى المحيط" },
  { h: "الاستعادة المنظمة", b: "إلغاء التقييد بالتسلسل وإعادة تنشيط الموارد الراديوية" },
  { h: "التحقق عبر مؤشرات الأداء", b: `مراقبة ${MONITORED_KPIS.length} مؤشرات أداء رئيسية (KPIs) لضمان استقرار الخدمة` },
];

/* ═════════════ R-14 · Isolation scenario ═════════════ */

export const ResIsolationScenario: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(SCENARIO.length);
  const cells = useMemo(buildCells, []);
  const targetCells = cells.filter((c) => c.kind === "in" || c.kind === "edge");
  const fillFor = (c: Cell) => {
    if (step >= 6) return alpha(c.tech, 0.16);
    if (c.kind === "in" && step >= 4) return alpha(C.ink, 0.82);
    if (c.kind === "edge" && step >= 5) return "url(#partial)";
    if ((c.kind === "in" || c.kind === "edge") && step >= 2) return alpha(C.gold, 0.32);
    return alpha(c.tech, 0.16);
  };
  return (
    <ResStage
      phase={2}
      question="كيف ينفَّذ العزل الجغرافي الدقيق لخدمات الاتصال مع الحفاظ على استمرارية الشبكة المحيطة؟"
      title="سيناريو العزل المكاني: سير العمليات من الاستهداف إلى استعادة الخدمة"
      contrib={3}
      beats={SCENARIO.map((s) => s.h)}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 6 · الشكل 31 و§5.2.6 — رسم توضيحي لسير العمل، لا خريطة تشغيلية"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "0.38fr 1fr", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 7 }}>
          {SCENARIO.map((s, i) => {
            const on = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={s.h} style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: step >= i + 1 ? 1 : 0.28, transition: "opacity .3s" }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 99,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: 19,
                    background: on ? B : done ? alpha(B, 0.18) : "#fff",
                    color: on ? "#fff" : B,
                    border: `1.5px solid ${B}`,
                  }}
                >
                  {done ? "✓" : i + 1}
                </span>
                <div>
                  <div style={{ fontSize: on ? 17 : 15, fontWeight: 900, color: on ? C.ink : C.inkSoft, transition: "font-size .2s" }}>{s.h}</div>
                  {on && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 18.6, fontWeight: 700, color: C.inkSoft, lineHeight: 1.55 }}>
                      {s.b}
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ minHeight: 0, background: "#fff", borderRadius: 18, border: `1px solid ${C.hair}`, boxShadow: "0 10px 28px rgba(15,23,42,0.06)", overflow: "hidden" }}>
          <svg viewBox="0 0 1060 580" style={{ width: "100%", height: "100%" }}>
            <defs>
              <pattern id="partial" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="10" height="10" fill={alpha(C.gold, 0.35)} />
                <line x1="0" y1="0" x2="0" y2="10" stroke={B} strokeWidth="4" />
              </pattern>
            </defs>
            <ArrowDefs colors={{ va: B }} />

            {cells.map((c) => (
              <polygon
                key={c.id}
                points={hexPts(c.x, c.y, 29)}
                fill={fillFor(c)}
                stroke={step >= 2 && step < 6 && (c.kind === "in" || c.kind === "edge") ? B : alpha(C.ink, 0.12)}
                strokeWidth={step >= 2 && step < 6 && (c.kind === "in" || c.kind === "edge") ? 2 : 1}
                style={{ transition: `fill 0.5s ease ${step === 6 ? (c.d / 600).toFixed(2) : 0}s` }}
              />
            ))}

            <ShowG step={step} at={5} until={6}>
              {cells
                .filter((c) => c.kind === "ring")
                .map((c, i) => (
                  <motion.polygon key={c.id} points={hexPts(c.x, c.y, 29)} fill="none" stroke={C.green} strokeWidth={2.5} initial={{ opacity: 0 }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity, delay: (i % 6) * 0.1 }} />
                ))}
            </ShowG>

            <ShowG step={step} at={7}>
              {targetCells.map((c, i) => (
                <motion.g key={c.id} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (i % 12) * 0.05 }} style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
                  <circle cx={c.x} cy={c.y} r={10} fill={C.green} />
                  <path d={`M ${c.x - 5} ${c.y} l 3.5 3.5 l 6 -7`} fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
                </motion.g>
              ))}
            </ShowG>

            <ShowG step={step} at={1}>
              <motion.path d={TARGET_D} fill={step === 1 ? alpha(C.red, 0.08) : "none"} stroke={C.red} strokeWidth={4} strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: EASE }} />
            </ShowG>

            <ShowG step={step} at={3} until={6}>
              <rect x={300} y={14} width={150} height={44} rx={10} fill="#fff" stroke={C.huawei} strokeWidth={1.8} />
              <T x={375} y={37} size={16} latin weight={900} fill={C.huawei}>
                Huawei
              </T>
              <rect x={455} y={14} width={150} height={44} rx={10} fill={B} />
              <T x={530} y={37} size={15} weight={900} fill="#fff">
                طبقة التنسيق
              </T>
              <rect x={610} y={14} width={150} height={44} rx={10} fill="#fff" stroke={C.ericsson} strokeWidth={1.8} />
              <T x={685} y={37} size={16} latin weight={900} fill={C.ericsson}>
                Ericsson
              </T>
              {targetCells.map((c) => {
                const from = c.vendor === "h" ? 375 : 685;
                const d = `M ${from} 58 Q ${from} ${(58 + c.y) / 2} ${c.x} ${c.y - 14}`;
                return <Draw key={c.id} d={d} color={alpha(c.vendor === "h" ? C.huawei : C.ericsson, 0.45)} width={1.4} duration={0.6} />;
              })}
              <Pulse d="M 530 58 Q 450 140 420 260" color={B} r={5} dur={1.6} />
              <Pulse d="M 530 58 Q 620 140 620 300" color={B} r={5} dur={1.6} begin={0.5} />
            </ShowG>

            <ShowG step={step} at={5} until={6}>
              <rect x={760} y={520} width={280} height={44} rx={10} fill="#fff" stroke={C.hair} />
              <rect x={1004} y={532} width={20} height={20} fill="url(#partial)" />
              <T x={990} y={542} size={13} anchor="start" weight={800}>
                تقييد جزئي للحدود
              </T>
              <rect x={898} y={532} width={20} height={20} fill="none" stroke={C.green} strokeWidth={2.5} />
              <T x={884} y={542} size={13} anchor="start" weight={800}>
                خدمة مستمرة خارج النطاق
              </T>
            </ShowG>
            <ShowG step={step} at={6}>
              <T x={1040} y={548} size={14} anchor="start" weight={900} fill={C.teal}>
                {step >= 7 ? "استعادة مؤكدة للخدمة بالتحقق القياسي" : "استعادة مرحلية متدرجة من المركز نحو الأطراف"}
              </T>
            </ShowG>
          </svg>
        </div>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-15 · 97.5% ═════════════ */

export const ResIsolationAccuracy: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const urban = ISOLATION_BY_ENV[0];
  return (
    <ResStage
      phase={3}
      question="ما مدى الدقة المكانية المحققة في سيناريوهات العزل الراديوي؟"
      title="كفاءة العزل المكاني: دقة تصل إلى 97.5% في البيئات الحضرية الكثيفة"
      contrib={3}
      beats={["الرقم", "مقابل ماذا؟", "لماذا الحضر؟"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 6 · جدول 32 و§4.4.6 (مقارنة بمقاربات التشويش الراديوي)"
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 22,
          background: `radial-gradient(ellipse 60% 70% at 50% 40%, ${alpha(C.gold, 0.18)} 0%, transparent 70%), ${C.night}`,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: 20,
        }}
      >
        <div style={{ display: "none" }} />
        <div style={{ position: "relative", fontSize: "clamp(21.8px, 1.95vw, 27.6px)", fontWeight: 900, color: C.nightInkSoft }}>دقة العزل المكاني</div>
        <div style={{ position: "relative", lineHeight: 1 }}>
          <HeroNumber value={urban.accuracy} decimals={1} suffix="%" color={C.gold} size="clamp(120px, 15vw, 230px)" />
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
          <span style={{ fontSize: "clamp(23px, 2.2vw, 31.2px)", fontWeight: 900 }}>في البيئات الحضرية الكثيفة</span>
          <StatTag dark>{`${urban.accuracy}% ${urban.accuracyCi} · متوسط تشغيلات مستقلة`}</StatTag>
        </div>

        <Show step={step} at={2} style={{ position: "relative", marginTop: 22, width: "min(980px, 92%)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "stretch", gap: 14 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "10px 14px", opacity: 0.8 }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.nightInkSoft }}>الأساليب التقليدية</div>
              <div style={{ fontSize: 23, fontWeight: 900 }}>التشويش الراديوي الترددي (Jamming)</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: C.nightInkSoft, lineHeight: 1.6 }}>افتقار للتحكم الجغرافي الدقيق · تداخل كهرومغناطيسي عشوائي · استهلاك طاقة وكشف إشعاعي</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Chevron color={C.gold} size={30} />
            </div>
            <div style={{ border: `1.5px solid ${C.gold}`, borderRadius: 14, padding: "10px 14px", background: alpha(C.gold, 0.08) }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.gold }}>المقاربة المقترحة في الأطروحة</div>
              <div style={{ fontSize: 23, fontWeight: 900 }}>عزل برمجي من جانب الشبكة موجَّه بنظم GIS</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: C.nightInkSoft, lineHeight: 1.6 }}>تحكم جغرافي قطاعي دقيق · انعدام تام للتداخل الترددي · إجراء شبكي غير قابل للرصد الإشعاعي</div>
            </div>
          </div>
        </Show>
        <Show step={step} at={3} style={{ position: "relative", marginTop: 16, fontSize: "clamp(19.8px, 1.65vw, 23.6px)", fontWeight: 800, color: C.nightInkSoft, textAlign: "center", maxWidth: 900, lineHeight: 1.7 }}>
          تتيح صغر مساحات التغطية القطاعية وكثافة المحطات في البيئات الحضرية مطابقة مضلع العزل بأعلى درجات الدقة والامتثال المكاني.
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-16 · Spillover by environment ═════════════ */

const ENV_COLORS = [B, alpha(C.gold, 0.75), alpha(C.gold, 0.45)];

const Bars: React.FC<{ title: string; better: string; k: "accuracy" | "spillover" | "collateral"; max: number; delay?: number }> = ({ title, better, k, max, delay = 0 }) => (
  <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: "8px 10px", display: "flex", flexDirection: "column" }}>
    <div style={{ fontSize: 19.1, fontWeight: 900 }}>{title}</div>
    <div style={{ fontSize: 19, fontWeight: 800, color: C.inkMuted }}>{better}</div>
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: 150, marginTop: 6 }}>
      {ISOLATION_BY_ENV.map((e, i) => (
        <div key={e.env} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: "30%" }}>
          <N size={14}>{e[k]}</N>
          <motion.div initial={{ height: 0 }} animate={{ height: `${(e[k] / max) * 118}px` }} transition={{ duration: 0.8, delay: delay + i * 0.12, ease: EASE }} style={{ width: "70%", background: ENV_COLORS[i], borderRadius: "6px 6px 0 0" }} />
        </div>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-around", fontSize: 19, fontWeight: 800, color: C.inkSoft, marginTop: 4 }}>
      {ISOLATION_BY_ENV.map((e) => (
        <span key={e.env} style={{ width: "30%", textAlign: "center" }}>
          {e.env}
        </span>
      ))}
    </div>
  </div>
);

export const ResSpillover: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ResStage
      phase={4}
      question="كيف تتأثر دقة العزل المكاني بالتغيرات الطبوغرافية وكثافة المحطات؟"
      title="التباين البيئي: تحليل دقة العزل ونسب التسرب غير المقصود"
      contrib={3}
      beats={["الكثافة", "دقة العزل", "الانتشار والأثر الجانبي", "التفسير والتخفيف"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 6 · الشكل 31 وجدول 32 و§5.3.6"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 0.95fr", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <Show step={step} at={2}>
              <Bars title="دقة العزل %" better="" k="accuracy" max={100} />
            </Show>
            <Show step={step} at={3}>
              <Bars title="الانتشار غير المقصود %" better="الأقل أفضل" k="spillover" max={50} />
            </Show>
            <Show step={step} at={3} delay={0.2}>
              <Bars title="التأثير الجانبي %" better="الأقل أفضل" k="collateral" max={50} delay={0.2} />
            </Show>
          </div>
          <Show step={step} at={4} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Card color={B} top style={{ padding: "10px 14px" }}>
              <div style={{ fontSize: 20.5, fontWeight: 900, lineHeight: 1.6 }}>ارتفاع نسبة التسرب في المناطق الريفية هو نتيجة حتمية لكبر مساحات الخلايا الراديوية (Cell Footprints) وتباعد المحطات، وليس قصوراً في خوارزمية التحكم.</div>
              <Formula size={15} style={{ marginTop: 6 }}>
                Spillover Ratio ∝ 1 / Infrastructure Density
              </Formula>
            </Card>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 18.6, fontWeight: 900 }}>آليات التخفيف الهندسية المعتمدة:</span>
              {["حظر انتقائي لبيانات الحزم (Selective Packet Filtering)", "تعليق جلسات الحامل (Bearer Suspension)", "التحكم في معايير الحركية وإعادة الاختيار"].map((m) => (
                <span key={m} style={{ fontSize: 19, fontWeight: 800, color: BRONZE, background: alpha(C.gold, 0.14), borderRadius: 999, padding: "3px 10px" }}>
                  {m}
                </span>
              ))}
            </div>
          </Show>
        </div>

        <Show step={step} at={1} from="scale" style={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <FigureSvg src="thesis_figures/fig31_gis_spatial_intersection_cells.png" w={674} h={613}>
              <rect x={14} y={362} width={294} height={208} rx={10} fill="none" stroke={B} strokeWidth={4} />
              <rect x={316} y={362} width={346} height={208} rx={10} fill="none" stroke={C.green} strokeWidth={4} strokeDasharray="10 7" />
              <ShowG step={step} at={3}>
                <motion.ellipse cx={430} cy={270} rx={86} ry={100} fill="none" stroke={C.red} strokeWidth={4} initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
              </ShowG>
            </FigureSvg>
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: C.inkMuted, textAlign: "center", marginTop: 4 }}>الشكل 31 · التقاطع المكاني واختيار الخلايا المستهدفة — حضري كثيف مقابل ريفي</div>
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-17 · Multi-vendor coordination ═════════════ */

const FLOW = [
  { h: "طبقة التنسيق المكاني", s: "GIS + تجريد الموردين" },
  { h: "سير عمل موحّد", s: "أمر واحد ← إجراءات خاصة بكل مورّد" },
  { h: "مراقبة المؤشرات", s: `${MONITORED_KPIS.length} مؤشرات أداء` },
  { h: "الاستعادة", s: "تراجع منظّم" },
];

export const ResMultiVendor: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const metrics = [
    { k: "orchestration" as const, ci: "orchestrationCi" as const, label: "نجاح التنسيق" },
    { k: "handover" as const, ci: "handoverCi" as const, label: "كبح إجراءات التسليم (Handover Prevention)" },
    { k: "restoration" as const, ci: "restorationCi" as const, label: "اتساق تنفيذ الاستعادة" },
  ];
  return (
    <ResStage
      phase={3}
      question="هل تضمن طبقة التنسيق المقترحة اتساق الأوامر التشغيلية عبر بيئات غير متجانسة الموردين؟"
      title="التنسيق متعدد المصنّعين (Multi-Vendor): مسار تشغيلي موحد فوق بنية غير متجانسة"
      contrib={3}
      beats={["الموردون", "طبقة التنسيق", "من الأمر إلى الاستعادة", "النتائج", "حدود التعميم"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 6 · الشكل 29 وجدول 33 — الفصل 7 · §1.2.7"
    >
      <div style={{ display: "flex", alignItems: "stretch", gap: 8, minHeight: 170 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "17%" }}>
          {[
            { n: "Huawei", c: C.huawei, at: 1 },
            { n: "Ericsson", c: C.ericsson, at: 1 },
            { n: "Nokia / ZTE", c: C.inkMuted, at: 5, future: true },
          ].map((v) => (
            <Show key={v.n} step={step} at={v.at} from="right">
              <div
                style={{
                  borderRadius: 12,
                  padding: "8px 10px",
                  background: v.future ? "transparent" : "#fff",
                  border: `1.8px ${v.future ? "dashed" : "solid"} ${v.c}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 21.8, color: v.c }}>{v.n}</div>
                {v.future && <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft }}>يتطلب وحدة مواءمة إضافية</div>}
              </div>
            </Show>
          ))}
        </div>
        {FLOW.map((f, i) => (
          <React.Fragment key={f.h}>
            <Show step={step} at={i === 0 ? 2 : 3} delay={i === 0 ? 0 : (i - 1) * 0.25} style={{ display: "flex", alignItems: "center" }}>
              <Chevron color={B} />
            </Show>
            <Show step={step} at={i === 0 ? 2 : 3} delay={i === 0 ? 0 : (i - 1) * 0.25} style={{ flex: 1, display: "flex" }}>
              <div
                style={{
                  flex: 1,
                  borderRadius: 14,
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  background: i === 0 ? B : "#fff",
                  color: i === 0 ? "#fff" : C.ink,
                  border: `1.6px solid ${B}`,
                }}
              >
                <div style={{ fontSize: 21.1, fontWeight: 900 }}>{f.h}</div>
                <div style={{ fontSize: 19, fontWeight: 700, opacity: 0.8, marginTop: 2 }}>{f.s}</div>
              </div>
            </Show>
          </React.Fragment>
        ))}
      </div>

      <Show step={step} at={4} style={{ marginTop: 16, flex: 1, minHeight: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {metrics.map((m, i) => (
            <Card key={m.k} color={B} top>
              <div style={{ fontSize: 21.1, fontWeight: 900, marginBottom: 8 }}>{m.label}</div>
              {(["huawei", "ericsson"] as const).map((v) => (
                <div key={v} style={{ display: "grid", gridTemplateColumns: "70px 1fr", alignItems: "center", gap: 8, marginBottom: 6, direction: "ltr" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 19, color: v === "huawei" ? C.huawei : C.ericsson }}>{v === "huawei" ? "Huawei" : "Ericsson"}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 14, background: alpha(C.ink, 0.06), borderRadius: 7, overflow: "hidden" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${VENDORS[v][m.k]}%` }} transition={{ duration: 0.9, delay: i * 0.15, ease: EASE }} style={{ height: "100%", background: v === "huawei" ? C.huawei : C.ericsson, opacity: 0.85 }} />
                    </div>
                    <N size={16}>{`${VENDORS[v][m.k]}%`}</N>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                <StatTag>{`H ${VENDORS.huawei[m.ci]}`}</StatTag>
                <StatTag>{`E ${VENDORS.ericsson[m.ci]}`}</StatTag>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: "clamp(19.8px, 1.65vw, 23.6px)", fontWeight: 900, marginTop: 12 }}>أثبتت طبقة التجريد البرمجية قدرتها على توحيد زمن واستجابة العزل والاستعادة بنسب نجاح تفوق 97% لكلا المصنّعين.</div>
      </Show>
      <Show step={step} at={5} style={{ textAlign: "center", fontSize: 18.6, fontWeight: 800, color: C.inkSoft, marginTop: 6 }}>
        تم التحقق العملي على تجهيزات Huawei وEricsson؛ ويخضع دمج موردين إضافيين (مثل Nokia وZTE) لإضافة محولات برمجية مخصصة (Vendor Adapters).
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-18 · Restoration ═════════════ */

const TIMELINE = [
  { h: "العزل" },
  { h: "التراجع" },
  { h: "مزامنة الشبكة الجوهرية" },
  { h: "إعادة تفعيل الراديو" },
  { h: "التحقق بالمؤشرات" },
  { h: "عودة الخدمة" },
];

export const ResRestoration: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(TIMELINE.length + 3);
  const xs = TIMELINE.map((_, i) => 1300 - i * 240);
  const reached = Math.min(step, TIMELINE.length);
  return (
    <ResStage
      phase={3}
      question="ما هو الأفق الزمني اللازم لاستعادة استقرار الخدمة الراديوية بعد رفع العزل؟"
      title="استعادة الخدمة: تسلسل زمني محكوم ومحدد المعالم عبر أجيال الشبكة"
      contrib={3}
      beats={[...TIMELINE.map((t) => t.h), "زمن الاستعادة", "مكوّنات الزمن", "الحكم التشغيلي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 6 · الشكل 32 وجدولا 33 و34 و§3.4.6"
    >
      <svg viewBox="0 0 1400 150" style={{ width: "100%" }}>
        <ArrowDefs colors={{ ra: B }} />
        {reached > 1 && <Draw key={reached} d={`M ${xs[0]} 52 H ${xs[reached - 1]}`} color={alpha(B, 0.55)} width={3} duration={0.55} />}
        {TIMELINE.map((t, i) => (
          <ShowG key={t.h} step={step} at={i + 1}>
            <circle cx={xs[i]} cy={52} r={i === 0 || i === TIMELINE.length - 1 ? 22 : 17} fill={i === 0 ? C.ink : i === TIMELINE.length - 1 ? C.green : "#fff"} stroke={i === 0 ? C.ink : i === TIMELINE.length - 1 ? C.green : B} strokeWidth={2.5} />
            <T x={xs[i]} y={53} size={14} latin weight={900} fill={i === 0 || i === TIMELINE.length - 1 ? "#fff" : B}>
              {i + 1}
            </T>
            <T x={xs[i]} y={100} size={17} weight={900}>
              {t.h}
            </T>
          </ShowG>
        ))}
        {step >= TIMELINE.length && <Pulse d={`M ${xs[0]} 52 H ${xs[xs.length - 1]}`} color={C.gold} r={5} dur={3.5} />}
      </svg>

      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 6 }}>
        <Show step={step} at={TIMELINE.length + 1}>
          <Card color={B} top style={{ height: "100%", boxSizing: "border-box" }}>
            <div style={{ fontSize: 21.1, fontWeight: 900, marginBottom: 10 }}>متوسط تأخير الاستعادة</div>
            {RESTORATION.map((r, i) => (
              <div key={r.rat} style={{ display: "grid", gridTemplateColumns: "44px 1fr 92px", alignItems: "center", gap: 10, marginBottom: 12, direction: "ltr" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 23, color: [C.g2, C.g3, C.g4][i] }}>{r.rat}</span>
                <div style={{ height: 22, background: alpha(C.ink, 0.05), borderRadius: 11, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(r.minutes / 10) * 100}%` }} transition={{ duration: 0.9, delay: i * 0.2, ease: EASE }} style={{ height: "100%", background: [C.g2, C.g3, C.g4][i] }} />
                </div>
                <N size={17}>{r.label}</N>
              </div>
            ))}
            <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft }}>يرتبط زمن الاستعادة طردياً بدرجة تعقيد بروتوكولات الإشارات وتبادل الرسائل في مستوى التحكم (Control Plane).</div>
          </Card>
        </Show>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Show step={step} at={TIMELINE.length + 2}>
            <Formula size={16}>
              T<sub>restore</sub> = T<sub>propagation</sub> + T<sub>core sync</sub> + T<sub>cell reactivation</sub> + T<sub>UE recovery</sub>
            </Formula>
            <div style={{ fontSize: 19.3, fontWeight: 800, color: C.inkSoft, lineHeight: 1.7, marginTop: 8 }}>
              يتطلب الجيل الرابع زمناً أطول نظراً لضرورة مزامنة مقسم الحزم الأساسي (EPC)، وتجديد حوامل البيانات (EPS Bearers)، وإعادة بناء جلسات الأجهزة المستخدمة.
            </div>
          </Show>
          <Show step={step} at={TIMELINE.length + 3}>
            <Card color={C.green} top>
              <div style={{ fontSize: 20.5, fontWeight: 900, lineHeight: 1.6 }}>أزمنة استعادة تقع ضمن الحدود المقبولة تشغيلياً (Operational SLA) في حالات الاستجابة للطوارئ وإدارة الأزمات المحددة جغرافياً.</div>
              <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 19, fontWeight: 800 }}>اتساق الاستعادة:</span>
                <StatTag>{`Huawei ${VENDORS.huawei.restoration}% ${VENDORS.huawei.restorationCi}`}</StatTag>
                <StatTag>{`Ericsson ${VENDORS.ericsson.restoration}% ${VENDORS.ericsson.restorationCi}`}</StatTag>
              </div>
            </Card>
          </Show>
        </div>
      </div>
    </ResStage>
  );
};
