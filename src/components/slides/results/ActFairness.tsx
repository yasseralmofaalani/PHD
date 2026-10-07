import React from "react";
import { motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { Formula } from "../contributions/kit";
import { FAIRNESS_EFFECT, HEADLINE, METHODS, TTEST } from "./facts";
import { ALGO } from "./ActPlanning";
import { C, CONTRIB, Card, Draw, EASE, FigureSvg, HeroNumber, N, ResStage, Show, ShowG, StatTag, T, useBeats } from "./stage";

const M = CONTRIB[2].color;

/* ═════════════ R-12 · The SFI moment ═════════════ */

export const ResSfiMoment: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(6);
  const px = (i: number) => 90 + i * 170;
  const py = (v: number) => 200 - ((v - 0.45) / 0.3) * 160;
  const traj = FAIRNESS_EFFECT.map((f, i) => `${i ? "L" : "M"} ${px(i)} ${py(f.fiBpso)}`).join(" ");
  return (
    <ResStage
      phase={3}
      question="هل يمكن توجيه الترقية نحو المناطق المحرومة دون التضحية بكفاءة التغطية الكلية؟"
      title="معيار العدالة المكانية: كسر التمركز الحضري في ترقيات الشبكة"
      contrib={2}
      beats={["التمركز الحضري", "أين تذهب الاستثمارات؟", "مؤشر SFI", "القيد الصريح", "أثر القيد", "النتيجة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        {step <= 2 && (
          <Show step={step} at={1} from="scale" style={{ textAlign: "center", maxWidth: 780 }}>
            <div style={{ fontSize: 21.1, fontWeight: 900, color: C.inkSoft }}>في التخطيط التقليدي المعتمد على الكثافة</div>
            <HeroNumber value={82} suffix="%" color={M} size="clamp(90px, 11vw, 160px)" />
            <div style={{ fontSize: "clamp(24.8px, 2.44vw, 33.6px)", fontWeight: 900, lineHeight: 1.45, marginTop: 6 }}>من ترقيات النطاق العريض تتمركز في المدن الكبرى الرئيسية</div>
            <div style={{ width: "min(560px, 80%)", height: 18, borderRadius: 9, overflow: "hidden", background: alpha(M, 0.1), direction: "ltr", margin: "16px auto 0" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1.1, ease: EASE }} style={{ height: "100%", background: M }} />
            </div>
            <Show step={step} at={2} style={{ marginTop: 22 }}>
              <div style={{ fontSize: "clamp(27.3px, 2.81vw, 37.8px)", fontWeight: 900, color: M, lineHeight: 1.45 }}>أين يتجه الاستثمار الرأسمالي؟ وما مصير المجتمعات الريفية والطرفية؟</div>
            </Show>
          </Show>
        )}

        {step === 3 && (
          <Show step={step} at={3} from="scale" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(72px, 10.98vw, 120px)", fontWeight: 900, color: C.green, lineHeight: 0.9 }}>SFI</div>
            <div style={{ fontSize: "clamp(27.3px, 2.68vw, 37.8px)", fontWeight: 900, marginTop: 8 }}>مؤشر العدالة المكانية</div>
            <div style={{ fontSize: 21.1, fontWeight: 700, color: C.inkSoft, lineHeight: 1.7, marginTop: 10, maxWidth: 640 }}>
              مقياس كمي لتوازن توزيع محطات الترقية جغرافياً بالاعتماد على مؤشري Jain وGini المعدلين مكانياً (القيمة الأقرب إلى 1 تعكس عدالة توزيع تامة).
            </div>
          </Show>
        )}

        {step === 4 && (
          <Show step={step} at={4} from="scale" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(27.3px, 2.56vw, 35.4px)", fontWeight: 900, marginBottom: 16 }}>صياغة العدالة المكانية كقيد صريح ضمن نموذج الاستمثال</div>
            <Formula size={32} color={M}>
              Σ<sub>i∈R<sub>j</sub></sub> x<sub>i</sub> ≥ α<sub>j</sub> ,&nbsp; ∀j
            </Formula>
            <div style={{ fontSize: 21.8, fontWeight: 800, color: C.inkSoft, marginTop: 14 }}>ضمان حصة دنيا ملزمة (αⱼ) من مواقع الترقية لكل منطقة إدارية / جغرافية</div>
          </Show>
        )}

        {step >= 5 && (
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: step >= 6 ? "1fr 1fr" : "1fr", gap: 20, alignItems: "center" }}>
            <Show step={step} at={5}>
              <Card color={C.teal} top style={{ padding: "12px 18px" }}>
                <div style={{ fontSize: 19.8, fontWeight: 900 }}>
                  أثر التفعيل المتدرج لقيد العدالة على أداء <N>BPSO</N>
                </div>
                <svg viewBox="0 0 520 250" style={{ width: "100%" }}>
                  {FAIRNESS_EFFECT.map((f, i) => (
                    <g key={f.scenario}>
                      <line x1={px(i)} x2={px(i)} y1={20} y2={214} stroke={alpha(C.ink, 0.08)} />
                      <T x={px(i)} y={232} size={14} weight={900}>
                        {f.label}
                      </T>
                      <T x={px(i)} y={248} size={11.5} latin weight={700} fill={C.inkMuted}>
                        {`${f.scenario} · ${f.covBpso.toFixed(2)}%`}
                      </T>
                    </g>
                  ))}
                  <Draw d={traj} color={C.green} width={4} duration={1.2} />
                  {FAIRNESS_EFFECT.map((f, i) => (
                    <motion.g key={f.scenario} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.4 }} style={{ transformOrigin: `${px(i)}px ${py(f.fiBpso)}px` }}>
                      <circle cx={px(i)} cy={py(f.fiBpso)} r={10} fill={C.green} />
                      <T x={px(i)} y={py(f.fiBpso) - 22} size={18} latin weight={900} fill={C.green}>
                        {f.fiBpso.toFixed(2)}
                      </T>
                    </motion.g>
                  ))}
                </svg>
              </Card>
            </Show>
            <Show step={step} at={6} from="scale">
              <div style={{ background: C.ink, color: "#fff", borderRadius: 22, padding: "22px 24px", boxShadow: `0 16px 40px ${alpha(C.green, 0.25)}`, textAlign: "center" }}>
                <div style={{ fontSize: 19.3, fontWeight: 800, opacity: 0.75 }}>مقارنة خوارزميتي التحسين تحت قيد العدالة الكامل</div>
                <div dir="ltr" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 8 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: "clamp(44.8px, 5.12vw, 62px)", color: C.gold }}>0.52</span>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontSize: 44.8, color: "rgba(255,255,255,0.6)", transformOrigin: "left" }}>
                    ⟶
                  </motion.span>
                  <HeroNumber value={0.71} decimals={2} color={C.cyan} size="clamp(56px, 6vw, 86px)" />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 23, fontWeight: 900 }}>
                    تحسّن في مؤشر العدالة <N color={C.cyan}>+{HEADLINE.sfiGain}</N>
                  </span>
                  <StatTag dark>{TTEST.sfi}</StatTag>
                </div>
                <div style={{ marginTop: 14, fontSize: 21.1, fontWeight: 900, color: C.cyan }}>
                  انخفاض التغطية نتيجة القيد ≤ <N>0.1%</N>
                </div>
              </div>
            </Show>
          </div>
        )}
      </div>
    </ResStage>
  );
};

/* ═════════════ R-13 · Fairness on the map ═════════════ */

const URBAN = [
  [300, 305, 60],
  [243, 505, 62],
  [185, 738, 66],
] as const;

const RURAL = [
  { cx: 770, cy: 250, rx: 150, ry: 110 },
  { cx: 690, cy: 470, rx: 120, ry: 90 },
  { cx: 420, cy: 620, rx: 150, ry: 80 },
  { cx: 215, cy: 860, rx: 100, ry: 70 },
] as const;

export const ResSfiMap: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const max = 0.75;
  return (
    <ResStage
      phase={3}
      question="كيف انعكس قيد العدالة عملياً على التوزع الجغرافي للمحطات المرقاة؟"
      title="التمثيل الجغرافي للعدالة: امتداد خدمات الجيل الخامس نحو الأطراف"
      contrib={2}
      beats={["الخريطة", "الترقيات الحضرية", "الترقيات الريفية", "مقارنة SFI"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 5 · الشكل 24 وجدول 25"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "0.85fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
          <Show step={step} at={1}>
            <div style={{ fontSize: 19.8, fontWeight: 800, color: C.inkSoft, lineHeight: 1.7 }}>
              التوزع الجغرافي لمحطات <N>BPSO</N> تحت قيد العدالة مقترناً بالتدرج المكاني لمؤشر SFI
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 6, fontSize: 19.3, fontWeight: 900 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 99, background: "#2e9d3a" }} /> ترقية حضرية
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 99, background: "#d32f2f" }} /> ترقية ريفية
              </span>
            </div>
          </Show>
          <Show step={step} at={2}>
            <div style={{ borderRight: `4px solid ${C.green}`, paddingRight: 12, fontSize: 21.1, fontWeight: 900, lineHeight: 1.6 }}>استدامة ترقية العقد الحضرية عالية الكثافة الحركية (دمشق، حلب، حمص)</div>
          </Show>
          <Show step={step} at={3}>
            <div style={{ borderRight: `4px solid ${C.red}`, paddingRight: 12, fontSize: 21.1, fontWeight: 900, lineHeight: 1.6 }}>امتداد المحطات المرقاة إلى المحافظات الشرقية والشمالية الشرقية ووادي الفرات والمناطق الجنوبية</div>
          </Show>
          <Show step={step} at={4}>
            <Card color={M} top style={{ padding: "10px 14px" }}>
              <div style={{ fontSize: 19.3, fontWeight: 900, marginBottom: 6 }}>مقارنة مؤشر العدالة المكانية (SFI) بين خوارزميات التخطيط</div>
              <div style={{ display: "grid", gap: 6 }}>
                {METHODS.map((m, i) => {
                  const color = m.id === "bpso" ? ALGO.bpso : m.id === "aga" ? ALGO.aga : ALGO.base;
                  return (
                    <div key={m.id} style={{ display: "grid", gridTemplateColumns: "92px 1fr", alignItems: "center", gap: 8 }}>
                      <span dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 19, fontWeight: 800, textAlign: "right", color: m.id === "bpso" || m.id === "aga" ? C.ink : C.inkSoft }}>
                        {m.name}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, direction: "ltr" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(m.sfi / max) * 80}%` }} transition={{ duration: 0.7, delay: i * 0.12 }} style={{ height: 14, borderRadius: 7, background: color }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18.6, fontWeight: 900, color: m.id === "bpso" ? C.teal : C.inkSoft }}>{m.sfi.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 19.8, fontWeight: 900 }}>
                  BPSO مقابل AGA: <N color={C.teal}>+{HEADLINE.sfiGain}</N>
                </span>
                <StatTag>{TTEST.sfi}</StatTag>
              </div>
            </Card>
          </Show>
        </div>

        <div style={{ minHeight: 0, display: "flex", justifyContent: "center" }}>
          <FigureSvg src="thesis_figures/fig24_syria_bpso_geographic_distribution.png" w={1024} h={1024} style={{ maxWidth: "100%", aspectRatio: "1" }}>
            <ShowG step={step} at={2}>
              {URBAN.map(([cx, cy, r], i) => (
                <motion.circle key={cx} cx={cx} cy={cy} fill="none" stroke={C.green} strokeWidth={6} initial={{ r: r * 0.4, opacity: 0 }} animate={{ r, opacity: 1 }} transition={{ delay: i * 0.2, duration: 0.6 }} />
              ))}
            </ShowG>
            <ShowG step={step} at={3}>
              {RURAL.map((e, i) => (
                <motion.ellipse key={e.cx} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={alpha(C.red, 0.06)} stroke={C.red} strokeWidth={5} strokeDasharray="14 10" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2, duration: 0.6 }} style={{ transformOrigin: `${e.cx}px ${e.cy}px` }} />
              ))}
            </ShowG>
          </FigureSvg>
        </div>
      </div>
    </ResStage>
  );
};
