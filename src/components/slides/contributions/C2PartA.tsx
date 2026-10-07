import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ThesisImage } from "../../ui/ThesisImage";
import { C, CITIES, Chip, ContribStage, Formula, MapSite, Show, ShowG, SyriaBase, T, makeSites, insideSyria, useBeats } from "./kit";
import { RepairEngine } from "./RepairEngine";
import { CH4_RESULTS } from "./facts";

/* ───────── Shared illustrative map: traditional → fairness-constrained ───────── */

type Pair = { a: MapSite; b: MapSite; moves: boolean };

const RURAL_TARGETS: Array<[number, number]> = [
  [380, 250], [420, 300], [450, 260], [480, 320], [520, 230],
  [550, 180], [590, 160], [610, 220], [650, 130], [600, 90],
  [430, 150], [380, 180], [340, 220], [280, 250], [305, 340],
  [310, 420], [340, 450], [280, 480], [500, 360], [560, 290],
];

export const useFairPairs = (count = 120): Pair[] =>
  useMemo(() => {
    const trad = makeSites(count, 41, 0.9);
    let k = 0;
    return trad.map((s, i) => {
      if (s.urban && i % 3 === 0) {
        const [tx, ty] = RURAL_TARGETS[k % RURAL_TARGETS.length];
        const jitter = ((k * 37) % 30) - 15;
        k++;
        const x = tx + jitter;
        const y = ty + (((k * 53) % 30) - 15);
        const b = insideSyria(x, y) ? { ...s, x, y, urban: false } : s;
        return { a: s, b, moves: b !== s };
      }
      return { a: s, b: s, moves: false };
    });
  }, [count]);

export const FairMap: React.FC<{ t: number; pairs: Pair[]; idSuffix: string; labels?: boolean; viewBox?: string; children?: React.ReactNode }> = ({
  t,
  pairs,
  idSuffix,
  labels,
  viewBox = "80 30 820 490",
  children,
}) => (
  <svg viewBox={viewBox} style={{ width: "100%", height: "100%" }}>
    <SyriaBase idSuffix={idSuffix} labels={labels} color={C.maroon} />
    {pairs.map((p, i) => {
      const x = p.a.x + (p.b.x - p.a.x) * t;
      const y = p.a.y + (p.b.y - p.a.y) * t;
      const moved = p.moves && t > 0.5;
      return (
        <motion.g key={i} initial={false} animate={{ x, y }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: (i % 20) * 0.02 }}>
          <circle r={moved ? 9 : 7} fill={moved ? "rgba(46,125,91,0.18)" : "rgba(107,31,42,0.12)"} />
          <circle r={3.4} fill={moved ? C.green : C.maroon} stroke="#fff" strokeWidth={1} />
        </motion.g>
      );
    })}
    {children}
  </svg>
);

/* ═════════════ II-1 · The problem that was not represented ═════════════ */

export const C2Problem: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const pairs = useFairPairs();
  return (
    <ContribStage
      contribution={2}
      title="قصور نماذج التحسين التقليدية: إغفال التوزيع العادل"
      beats={["مخرجات التخطيط التقليدي", "تركز الترقيات في المراكز الحضرية", "حرمان النطاقات الريفية", "المفاضلة: نسبة التغطية مقابل العدالة المكانية"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 18 }}>
        <div style={{ minHeight: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <FairMap t={0} pairs={pairs} idSuffix="p2">
              <ShowG step={step} at={2}>
                {[CITIES[0], CITIES[1], CITIES[2]].map((c) => (
                  <g key={c.id}>
                    <circle cx={c.x} cy={c.y} r={46} fill="rgba(107,31,42,0.10)" stroke={C.maroon} strokeWidth={2}>
                      <animate attributeName="r" values="42;50;42" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
              </ShowG>
              <ShowG step={step} at={3}>
                {[
                  [560, 260, 110],
                  [720, 170, 80],
                  [420, 400, 70],
                ].map(([x, y, r], i) => (
                  <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.7} fill="rgba(15,23,42,0.04)" stroke={C.inkMuted} strokeDasharray="6 5" strokeWidth={1.8} />
                ))}
              </ShowG>
            </FairMap>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flexShrink: 0 }}>
            <Show step={step} at={2}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "12px 14px",
                  border: `2px solid ${C.maroon}`,
                  boxShadow: "0 6px 18px rgba(107,31,42,0.10)",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 900, color: C.maroon, marginBottom: 4, fontFamily: "Inter, sans-serif" }}>
                  المراكز الحضرية
                </div>
                <div style={{ fontSize: 18.5, fontWeight: 800, color: C.ink, lineHeight: 1.4 }}>
                  تركز استثماري كثيف في المراكز الحضرية
                </div>
              </div>
            </Show>
            <Show step={step} at={3}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "12px 14px",
                  border: `2px solid ${C.inkMuted}`,
                  boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 900, color: C.inkSoft, marginBottom: 4, fontFamily: "Inter, sans-serif" }}>
                  النطاقات الريفية
                </div>
                <div style={{ fontSize: 18.5, fontWeight: 800, color: C.ink, lineHeight: 1.4 }}>
                  نطاقات ريفية شاسعة تعاني تدني كثافة التغطية
                </div>
              </div>
            </Show>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "14px 18px", border: `1px solid ${C.hair}` }}>
            <div style={{ fontSize: 19.3, fontWeight: 800, color: C.inkSoft }}>نسبة التغطية الكلية المتحققة (BPSO · S2)</div>
            <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 51.5, fontWeight: 900, color: C.teal, textAlign: "right" }}>
              {CH4_RESULTS.bpso.coverage}%
            </div>
          </div>
          <Show step={step} at={4} from="scale">
            <div style={{ fontSize: "clamp(28.8px, 2.81vw, 40.1px)", fontWeight: 900, textAlign: "center", lineHeight: 1.3 }}>
              ارتفاع التغطية الكلية <span style={{ color: C.maroon }}>≠</span> عدالة توزيعها الجغرافي
            </div>
            <div style={{ marginTop: 12, fontSize: 19.1, fontWeight: 700, color: C.inkSoft, lineHeight: 1.75, borderRight: `3px solid ${C.maroon}`, paddingRight: 10 }}>
              «قصور جوهري في نماذج التخطيط التقليدية: الانحياز التلقائي نحو المناطق ذات الكثافة السكانية والجدوى الاقتصادية المرتفعة على حساب الأرياف»
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ II-2 · What changed in the model ═════════════ */

const Pill: React.FC<{ label: string; color: string; glow?: boolean }> = ({ label, color, glow }) => (
  <div
    style={{
      padding: "10px 18px",
      borderRadius: 999,
      fontSize: 23.6,
      fontWeight: 900,
      color: "#fff",
      background: color,
      boxShadow: glow ? `0 0 0 6px ${color}33, 0 10px 24px ${color}55` : "none",
      textAlign: "center",
    }}
  >
    {label}
  </div>
);

export const C2ModelExtension: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ContribStage
      contribution={2}
      title="التوسيع الرياضي للنموذج بإضافة معيار العدالة"
      beats={["النموذج الأولي ثلاثي الأهداف", "إدماج معيار العدالة كهدف رابع", "مؤشر العدالة المكانية (SFI)", "أصالة التوسيع الرياضي والمفهومي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 90px 1fr", alignItems: "stretch", gap: 10 }}>
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 22, border: `1.5px solid ${C.hair}`, padding: 22, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
          <div style={{ fontSize: 19.8, fontWeight: 900, color: C.inkMuted, letterSpacing: 1 }}>المرحلة الأولى · النموذج ثلاثي الأهداف</div>
          <Pill label="التغطية" color={C.teal} />
          <Pill label="التكلفة" color={C.teal} />
          <Pill label="الطاقة" color={C.teal} />
          <Formula size={16}>
            max F = w<sub>1</sub>·Cov − w<sub>2</sub>·Cost − w<sub>3</sub>·Energy
          </Formula>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Show step={step} at={2} from="right">
            <svg width={80} height={60} viewBox="0 0 80 60">
              <path d="M70 30 H 14 M28 14 L12 30 L28 46" stroke={C.maroon} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Show>
        </div>

        <Show step={step} at={2} from="left" style={{ background: "#fff", borderRadius: 22, border: `2px solid ${C.maroon}`, padding: 22, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 16px 40px rgba(107,31,42,0.12)", justifyContent: "center" }}>
          <div style={{ fontSize: 19.8, fontWeight: 900, color: C.maroon, letterSpacing: 1 }}>المرحلة الثانية · النموذج الموسّع رباعي الأهداف</div>
          <Pill label="التغطية" color={C.teal} />
          <Pill label="التكلفة" color={C.teal} />
          <Pill label="الطاقة" color={C.teal} />
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 180, damping: 12 }}>
            <Pill label="+ العدالة المكانية" color={C.green} glow />
          </motion.div>
          <Formula size={15}>
            max F = w<sub>1</sub>·Cov − w<sub>2</sub>·Cost − w<sub>3</sub>·Energy <b style={{ color: C.green }}>+ w<sub>4</sub>·Fairness</b>
          </Formula>
        </Show>
      </div>

      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 12,
          minHeight: 0,
        }}
      >
        <Show step={step} at={3} from="scale" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 96, height: 96, flexShrink: 0, borderRadius: "50%", background: C.green, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(46,125,91,0.15)" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 34 }}>SFI</div>
            <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 17 }}>
              0 → 1
            </div>
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.55, minWidth: 0 }}>
            مؤشر العدالة المكانية (SFI)
            <br />
            <span style={{ color: C.inkSoft, fontSize: 18.5 }}>صياغة رياضية مستندة إلى مؤشر Jain لتقييم التكافؤ الجغرافي عبر المحافظات والمناطق</span>
          </div>
        </Show>

        <Show step={step} at={4} from="left">
          <div
            style={{
              fontSize: 19.5,
              fontWeight: 800,
              color: C.maroon,
              lineHeight: 1.55,
              background: "rgba(107,31,42,0.06)",
              border: `1.5px solid rgba(107,31,42,0.28)`,
              borderRight: `4px solid ${C.maroon}`,
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            «توسيع مفاهيمي ورياضي أصيل لنموذج ترقية الشبكة»: إعادة صياغة جذرية للمسألة وليست مجرد تكرار تجريبي
          </div>
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ II-3 · Spatial fairness as a mathematical component ═════════════ */

const REGIONS = [CITIES[0], CITIES[1], CITIES[2], CITIES[4], CITIES[9], CITIES[10], CITIES[11]];

export const C2Math: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ContribStage
      contribution={2}
      title="الصياغة الرياضية لقيد ومعيار العدالة المكانية"
      beats={["دالة الهدف الموسعة", "مؤشر العدالة المكانية SFI", "التقسيم الإقليمي إلى نطاقات Rj", "فرض قيد العتبة الدنيا αj"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل الخامس: المعادلات كما وردت في الأطروحة"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Formula size={26} style={{ padding: "12px 24px" }}>
            max F = w<sub>1</sub>·Coverage(x) − w<sub>2</sub>·Cost(x) − w<sub>3</sub>·Energy(x){" "}
            <motion.span
              animate={step >= 2 ? { backgroundColor: "rgba(46,125,91,0.18)", color: C.green } : { backgroundColor: "rgba(0,0,0,0)", color: C.ink }}
              style={{ borderRadius: 8, padding: "0 6px", fontWeight: 800 }}
            >
              + w<sub>4</sub>·Fairness(x)
            </motion.span>
          </Formula>
          <div dir="ltr" style={{ textAlign: "center", marginTop: 4, fontFamily: "'Cambria Math', serif", fontSize: 21.8, color: C.inkSoft }}>
            w<sub>1</sub> + w<sub>2</sub> + w<sub>3</sub> + w<sub>4</sub> = 1
          </div>
        </motion.div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 18, marginTop: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <Show step={step} at={2}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Chip color={C.green} solid>
                SFI
              </Chip>
              <span style={{ fontSize: 20.5, fontWeight: 800 }}>مؤشر Jain للإنصاف الجغرافي: مقياس معياري مجاله [0, 1]</span>
            </div>
          </Show>
          <Show step={step} at={3}>
            <div style={{ fontSize: 20.5, fontWeight: 800, lineHeight: 1.7 }}>
              تقسيم الرقعة الجغرافية للشبكة إلى قطاعات مكانية متمايزة (<b dir="ltr">R<sub>j</sub></b>)
            </div>
          </Show>
          <Show step={step} at={4}>
            <div style={{ fontSize: 19.3, fontWeight: 900, color: C.maroon, marginBottom: 6 }}>قيد كفاية التغطية الإقليمية (قيد العدالة)</div>
            <Formula size={26} color={C.maroon}>
              Σ<sub>i∈R<sub>j</sub></sub> x<sub>i</sub> ≥ α<sub>j</sub> ,&nbsp; ∀j
            </Formula>
            <div style={{ fontSize: 19.3, fontWeight: 700, color: C.inkSoft, lineHeight: 1.7, marginTop: 8 }}>
              ضمان عتبة دنيا (αj) من المحطات المرقاة لكل منطقة بما يتناسب مع مساحتها وكتلتها السكانية
            </div>
          </Show>
        </div>

        <svg viewBox="80 30 820 490" style={{ width: "100%", height: "100%" }}>
          <SyriaBase idSuffix="mt" color={C.maroon} />
          {step >= 3 &&
            REGIONS.map((r, i) => (
              <motion.g
                key={r.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0 }}
                style={{ transformOrigin: `${r.x}px ${r.y}px` }}
              >
                <circle cx={r.x} cy={r.y} r={i < 4 ? 40 : 62} fill="rgba(107,31,42,0.06)" stroke={C.maroon} strokeDasharray="5 4" strokeWidth={1.6} />
                <T x={r.x} y={r.y - (i < 4 ? 50 : 72)} size={13} latin weight={900} fill={C.maroon}>
                  {`R${i + 1}`}
                </T>
              </motion.g>
            ))}
          {step >= 4 &&
            REGIONS.map((r, i) => (
              <motion.g
                key={`b${r.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0 }}
              >
                <rect x={r.x - 22} y={r.y - 9} width={44} height={18} rx={9} fill={C.green} />
                <T x={r.x} y={r.y} size={11} latin weight={900} fill="#fff">
                  ≥ αⱼ
                </T>
              </motion.g>
            ))}
        </svg>
      </div>
    </ContribStage>
  );
};

/* ═════════════ II-4 · Fairness on the map (hero) ═════════════ */

export const C2MapTransformation: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const pairs = useFairPairs();
  const t = step >= 3 ? 1 : 0;
  return (
    <ContribStage
      contribution={2}
      title="الأثر الميداني لتطبيق قيد العدالة المكانية"
      beats={["النمط التقليدي المتمركز حضرياً", "تفعيل قيد العتبة المكانية", "إعادة التوازن الجغرافي للمحطات", "المطابقة مع النتائج المنشورة في الأطروحة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: step >= 4 ? "1.5fr 1fr" : "1fr", gap: 16 }}>
        <div style={{ position: "relative", minHeight: 0 }}>
          <div style={{ position: "absolute", top: 4, right: 8, zIndex: 2, display: "flex", gap: 8 }}>
            <Chip color={t ? C.green : C.maroon} solid>
              {t ? "النموذج الموسع بقيد العدالة المكانية" : "النموذج التقليدي غير المقيد بالعدالة"}
            </Chip>
          </div>
          <FairMap t={t} pairs={pairs} idSuffix="mx" labels>
            <ShowG step={step} at={2} until={3}>
              {[
                [560, 250, 100],
                [730, 170, 70],
                [420, 400, 64],
                [430, 270, 50],
              ].map(([x, y, r], i) => (
                <g key={i}>
                  <ellipse cx={x} cy={y} rx={r} ry={r * 0.7} fill="rgba(46,125,91,0.08)" stroke={C.green} strokeWidth={2} strokeDasharray="6 5">
                    <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
                  </ellipse>
                  <T x={x} y={y} size={13} latin weight={900} fill={C.green}>
                    {"Σx < αⱼ"}
                  </T>
                </g>
              ))}
            </ShowG>
          </FairMap>
        </div>
        {step >= 4 && (
          <Show step={step} at={4} from="left" style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
            <div style={{ fontSize: 19.3, fontWeight: 900, color: C.inkSoft }}>    التوزيع الجغرافي لمحطات BPSO ومقارنته بالنموذج التقليدي</div>
            <div style={{ flex: 1, minHeight: 0, background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ThesisImage src="thesis_figures/fig24_syria_bpso_geographic_distribution.png" alt="الشكل 24" style={{ height: "100%", width: "auto" }} />
            </div>
          </Show>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 6 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 19, fontWeight: 800 }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: C.maroon }} /> موقع مرقى ضمن التوزيع الأساسي
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 19, fontWeight: 800 }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: C.green }} /> موقع أُعيد توجيهه لرفع التغطية في المناطق المحرومة
        </span>
      </div>
    </ContribStage>
  );
};

/* ═════════════ II-5 · Fairness inside the search (hero) ═════════════ */

const PSEUDO = [
  { n: 9, t: "عند تجاوز الميزانية (B): إزالة المواقع الأقل جدوى (تغطية/تكلفة)." },
  { n: 10, t: "عند انخفاض التغطية: إضافة المواقع الأعلى جدوى." },
  { n: 11, t: "إعادة موازنة التوزيع الجغرافي لاستيفاء عتبات العدالة αj.", hot: true },
  { n: 12, t: "تقييم اللياقة مع التكلفة والتغطية والعدالة والقيود الراديوية." },
  { n: 13, t: "تحديث pBest عند تحسّن الحل المحلي." },
  { n: 14, t: "تحديث gBest من أفضل الحلول المحلية." },
];

export const C2FairSearch: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  // Progressive reveal of the repair engine so bottom nodes remain visible
  const engineStage = step <= 1 ? 5 : step === 2 ? 6 : 7;
  return (
    <ContribStage
      contribution={2}
      title="دمج قيد العدالة ضمن آلية البحث لتوجيه خوارزمية التحسين نحو حلول أكثر توازنًا"
      beats={["محرك الإصلاح الأساسي", "تفعيل مسار الموازنة المكانية", "التكامل مع الحلقات التكرارية", "إنتاج حلول مقبولة تحقق العدالة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            minHeight: 0,
            minWidth: 0,
            background: "#fff",
            borderRadius: 16,
            border: `1.5px solid ${C.hair}`,
            padding: 8,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <RepairEngine
            stage={engineStage}
            showFairness
            fairness="active"
            focus={step === 1 ? "fairness" : step === 2 ? "fairness" : step >= 3 ? "all" : null}
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            minHeight: 0,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflow: "hidden",
          }}
        >
          <Show step={step} at={1} until={3} style={{ flexShrink: 0 }}>
            <div
              style={{
                background: "rgba(46,125,91,0.08)",
                border: `1.5px solid ${C.green}`,
                borderRadius: 14,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.45, color: C.ink }}>
                معيار العدالة ليس تقييمًا لاحقًا
                <span style={{ color: C.green }}> بل قيد هيكلي في كل دورة تكرارية</span>
              </div>
            </div>
          </Show>

          <Show step={step} at={2} until={3} style={{ flexShrink: 0 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: `2px solid ${C.green}`,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: C.green, marginBottom: 4, fontFamily: "Inter, sans-serif" }}>
                مسار العدالة المكانية
              </div>
              <div style={{ fontSize: 18.5, fontWeight: 800, lineHeight: 1.45 }}>
                انتهاك شرط العدالة المكانية → إعادة التوازن الجغرافي للمواقع حتى استيفاء عتبات αj
              </div>
            </div>
          </Show>

          <Show
            step={step}
            at={3}
            until={4}
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              dir="rtl"
              style={{
                flex: 1,
                minHeight: 0,
                background: C.ink,
                color: "#e8efe9",
                borderRadius: 14,
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: "rgba(232,239,233,0.7)", marginBottom: 2 }}>
                حلقة الإصلاح داخل الخوارزمية
              </div>
              {PSEUDO.map((p) => (
                <div
                  key={p.n}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 16.5,
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 6,
                    background: p.hot ? "rgba(46,125,91,0.45)" : "transparent",
                    lineHeight: 1.35,
                  }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", opacity: 0.55, width: 18, flexShrink: 0 }}>{p.n}</span>
                  <span style={{ minWidth: 0 }}>{p.t}</span>
                </div>
              ))}
            </div>
          </Show>

          <Show step={step} at={4} style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.4 }}>
              النتيجة: حلول مقبولة تحقق التوازن بين التكلفة والتغطية والعدالة
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto 1fr",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                borderRadius: 14,
                border: `1.5px solid ${C.hair}`,
                padding: "14px 10px",
              }}
            >
              {[
                { t: "BPSO / AGA", c: C.teal },
                { t: "قيد العدالة", c: C.green },
                { t: "حل مقبول عادل", c: C.green, solid: true },
              ].map((b, i) => (
                <React.Fragment key={b.t}>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "14px 8px",
                      borderRadius: 12,
                      fontSize: 17,
                      fontWeight: 900,
                      color: b.solid ? "#fff" : C.ink,
                      background: b.solid ? b.c : "#fff",
                      border: `2px solid ${b.c}`,
                    }}
                  >
                    {b.t}
                  </div>
                  {i < 2 && (
                    <div style={{ fontSize: 22, fontWeight: 900, color: C.green, textAlign: "center" }}>←</div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div
              style={{
                fontSize: 17.5,
                fontWeight: 800,
                color: C.green,
                background: "rgba(46,125,91,0.1)",
                borderRadius: 12,
                padding: "10px 12px",
                textAlign: "center",
              }}
            >
              Feasible · Budget ✓ · Coverage ✓ · Fairness ✓
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};
