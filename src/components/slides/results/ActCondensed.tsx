import React from "react";
import { motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { CH5_FINAL, FAIRNESS_EFFECT, HEADLINE, ISOLATION_BY_ENV, METHODS, RESTORATION, RUNTIME, STABILITY, TTEST } from "./facts";
import { C, CONTRIB, CountUp, EASE, N, ResStage, Show, StatTag, useBeats } from "./stage";

/**
 * Condensed results section — planning, fairness, and control slides.
 * Every number comes from `facts.ts` (thesis Ch.4–7).
 */

const cardBase: React.CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  border: `1px solid ${C.hair}`,
  boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
  boxSizing: "border-box",
};

const Kicker: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span style={{ fontSize: 19, fontWeight: 900, color: "#fff", background: color, borderRadius: 6, padding: "1px 10px", alignSelf: "flex-start" }}>{children}</span>
);

const Takeaway: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.teal }) => (
  <div
    style={{
      textAlign: "center",
      fontSize: "clamp(21.1px, 1.83vw, 26px)",
      fontWeight: 900,
      lineHeight: 1.6,
      color: C.ink,
      background: alpha(color, 0.09),
      border: `1px solid ${alpha(color, 0.3)}`,
      borderRadius: 14,
      padding: "8px 18px",
    }}
  >
    {children}
  </div>
);

/* ═════════════ 2 · Planning results (contribution 1) ═════════════ */

type Metric = { key: "coverage" | "cost" | "energy"; label: string; unit: string; lo: number; hi: number; dec: number; better: string; hero: string; heroNote: string; stat: string };

const METRICS: Metric[] = [
  { key: "coverage", label: "التغطية", unit: "%", lo: 86, hi: 96, dec: 2, better: "", hero: HEADLINE.coverage, heroNote: `${HEADLINE.coverageDelta} عن AGA`, stat: TTEST.coverage },
  { key: "cost", label: "الكلفة", unit: "M$", lo: 120, hi: 152, dec: 1, better: " ", hero: `−${HEADLINE.costSaving}`, heroNote: "132.8 مقابل 141.2 M$", stat: TTEST.cost },
  { key: "energy", label: "الطاقة", unit: "MWh", lo: 70, hi: 94, dec: 1, better: " ", hero: `−${HEADLINE.energySaving}`, heroNote: "78.3 مقابل 82.7 MWh", stat: TTEST.energy },
];

const BAR_ORDER = ["random", "stdga", "aga", "bpso"] as const;

export const ResPlanningResults: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const tone = CONTRIB[1].color;
  const m = METRICS[Math.min(step, 3) - 1];
  return (
    <ResStage
      phase={3}
      contrib={1}
      question=" التقييم المقارن لأداء النموذج المقترح في تحسين تخطيط الترقية"
      title="نتائج تحسين التخطيط: تحقيق كفاءة تغطية أعلى مع خفض التكلفة واستهلاك الطاقة"
      beats={["التغطية", "الكلفة", "الطاقة", "الاستقرار والزمن"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 20 }}>
        {/* left panel */}
        <div style={{ ...cardBase, padding: "16px 22px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          {step <= 3 ? (
            <>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontSize: 27.3, fontWeight: 900, color: tone }}>
                  {m.label} <span style={{ fontSize: 19.3, color: C.inkMuted }}>({m.unit})</span>
                </span>
                <span style={{ fontSize: 19, fontWeight: 800, color: C.inkMuted }}>{m.better}</span>
              </div>
              {BAR_ORDER.map((id) => {
                const row = METHODS.find((x) => x.id === id)!;
                const v = row[m.key];
                const pct = Math.max(6, ((v - m.lo) / (m.hi - m.lo)) * 100);
                const isBpso = id === "bpso";
                const isAga = id === "aga";
                const color = isBpso ? tone : isAga ? alpha(tone, 0.55) : "rgba(15,23,42,0.22)";
                return (
                  <div key={id} style={{ display: "grid", gridTemplateColumns: "190px 1fr 82px", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 19.8, fontWeight: isBpso ? 900 : 700, color: isBpso ? tone : C.ink }}>{row.ar}</span>
                    <div style={{ height: 26, background: "rgba(15,23,42,0.05)", borderRadius: 8, overflow: "hidden" }}>
                      <motion.div key={m.key + id} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: EASE }} style={{ height: "100%", background: color, borderRadius: 8, marginInlineStart: 0 }} />
                    </div>
                    <N weight={900} size={16} color={isBpso ? tone : C.ink}>
                      {v.toFixed(m.dec)}
                    </N>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div style={{ fontSize: 27.3, fontWeight: 900, color: tone }}>BPSO تحقق الأداء الأفضل سرعةً وجودة، وAGA تتفوق في الاستقرار الإحصائي</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.35fr 1fr 1fr",
                  gap: 0,
                  alignItems: "stretch",
                  border: `1px solid ${C.hair}`,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "contents",
                  }}
                >
                  {[
                    { t: "المؤشر (متوسط ± انحراف معياري)", align: "right" as const },
                    { t: "AGA", align: "center" as const },
                    { t: "BPSO", align: "center" as const },
                  ].map((h) => (
                    <div
                      key={h.t}
                      style={{
                        fontSize: 18.5,
                        fontWeight: 900,
                        color: C.inkMuted,
                        background: "rgba(15,23,42,0.04)",
                        padding: "10px 12px",
                        textAlign: h.align,
                        borderBottom: `1.5px solid ${C.hair}`,
                      }}
                    >
                      {h.t}
                    </div>
                  ))}
                </div>
                {STABILITY.map((s, i) => (
                  <React.Fragment key={s.metric}>
                    <div
                      style={{
                        fontSize: 20.5,
                        fontWeight: 900,
                        padding: "10px 12px",
                        textAlign: "right",
                        borderTop: i === 0 ? undefined : `1px solid ${C.hair}`,
                        background: i % 2 ? "rgba(15,23,42,0.02)" : "#fff",
                      }}
                    >
                      {s.metric}
                      {s.unit ? <span style={{ fontSize: 17, color: C.inkMuted, marginInlineStart: 6 }}>({s.unit})</span> : null}
                    </div>
                    <div
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        borderTop: i === 0 ? undefined : `1px solid ${C.hair}`,
                        background: i % 2 ? "rgba(15,23,42,0.02)" : "#fff",
                      }}
                    >
                      <N weight={800} size={17}>
                        {s.aga.mean} ± {s.aga.sd}
                      </N>
                    </div>
                    <div
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        borderTop: i === 0 ? undefined : `1px solid ${C.hair}`,
                        background: i % 2 ? "rgba(15,23,42,0.02)" : "#fff",
                      }}
                    >
                      <N weight={900} size={17} color={tone}>
                        {s.bpso.mean} ± {s.bpso.sd}
                      </N>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                <span style={{ fontSize: 19.3, fontWeight: 900, color: tone, background: alpha(tone, 0.1), borderRadius: 999, padding: "4px 14px" }}>
                  زمن التنفيذ: BPSO {RUNTIME.bpso} ث مقابل AGA {RUNTIME.aga} ث
                </span>
                <span style={{ fontSize: 19.3, fontWeight: 900, color: tone, background: alpha(tone, 0.1), borderRadius: 999, padding: "4px 14px" }}>أسرع بنحو {RUNTIME.faster}</span>
              </div>
            </>
          )}
        </div>

        {/* right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
          <div style={{ ...cardBase, borderTop: `5px solid ${tone}`, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <Kicker color={tone}>{step <= 3 ? `BPSO · ${m.label}` : "الخلاصة"}</Kicker>
            {step <= 3 ? (
              <>
                <div key={m.key} style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: "clamp(54px, 7.32vw, 92px)", lineHeight: 1, color: tone, direction: "ltr" }}>
                  {m.hero}
                </div>
                <div style={{ fontSize: 21.8, fontWeight: 800, color: C.inkSoft }}>{m.heroNote}</div>
                <StatTag>{m.stat}</StatTag>
              </>
            ) : (
              <div style={{ fontSize: 24.8, fontWeight: 900, lineHeight: 1.7 }}>
                تُعتمد BPSO لخوارزميات التخطيط الاستراتيجي الواسع، بينما تفضَّل AGA عند الحاجة إلى استقرار فائق واتساق تكراري صارم
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {METRICS.map((x, i) => (
              <div key={x.key} style={{ flex: 1, textAlign: "center", fontSize: 18.6, fontWeight: 900, color: step === i + 1 ? "#fff" : C.inkSoft, background: step === i + 1 ? tone : "#fff", border: `1px solid ${C.hair}`, borderRadius: 12, padding: "6px 4px", transition: "all .3s" }}>
                {x.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResStage>
  );
};

/* ═════════════ 3 · Spatial fairness (contribution 2) ═════════════ */

export const ResFairnessResults: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const tone = CONTRIB[2].color;
  const scen = FAIRNESS_EFFECT;
  return (
    <ResStage
      phase={3}
      contrib={2}
      question="هل يمكن ضمان عدالة التوزيع الجغرافي للاستثمار دون التأثير سلباً على التغطية؟"
      title="العدالة المكانية: الارتقاء بمؤشر SFI من 0.52 إلى 0.71"
      beats={["قبل وبعد", "ثلاثة سيناريوهات", "الثمن شبه معدوم"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: step >= 2 ? "1fr 1fr" : "1fr", gap: 20, transition: "all .4s" }}>
          {/* hero before / after */}
          <div style={{ ...cardBase, padding: "18px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
            <div style={{ fontSize: 19.8, fontWeight: 800, color: C.inkSoft }}>مؤشر العدالة المكانية المكيف (Jain's SFI) · القيمة الأعلى تعني توزيعاً أعدل</div>
            {[
              { name: "AGA", v: 0.52, c: alpha(tone, 0.5) },
              { name: "BPSO", v: 0.71, c: tone },
            ].map((r) => (
              <div key={r.name} style={{ display: "grid", gridTemplateColumns: "70px 1fr 92px", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 23 }}>{r.name}</span>
                <div style={{ height: 38, background: "rgba(15,23,42,0.06)", borderRadius: 10, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.v * 100}%` }} transition={{ duration: 0.9, ease: EASE, delay: r.name === "BPSO" ? 0.3 : 0 }} style={{ height: "100%", background: r.c, borderRadius: 10 }} />
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 40.1, color: r.name === "BPSO" ? tone : C.inkSoft }}>{r.v.toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: "clamp(51.5px, 6.1vw, 76px)", color: tone, lineHeight: 1, direction: "ltr" }}>
                +<CountUp value={36.5} decimals={1} suffix="%" />
              </span>
              <span style={{ fontSize: 21.8, fontWeight: 900 }}>قفزة نوعية في مؤشر العدالة المكانية</span>
              <StatTag>p &lt; 0.001</StatTag>
            </div>
          </div>

          {/* scenarios */}
          <Show step={step} at={2} from="right" style={{ minHeight: 0 }}>
            <div style={{ ...cardBase, height: "100%", padding: "16px 22px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
              <div style={{ fontSize: 21.8, fontWeight: 900, color: tone }}>التأثير المتدرج لإلزامية قيد العدالة (خوارزمية BPSO · ميزانية متوسطة)</div>
              {scen.map((s, i) => (
                <div key={s.scenario} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 19, fontWeight: 900, color: tone }}>{s.scenario}</div>
                    <div style={{ fontSize: 19.1, fontWeight: 800 }}>{s.label}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 54px", gap: 8, alignItems: "center" }}>
                      <div style={{ height: 18, background: "rgba(15,23,42,0.06)", borderRadius: 6, overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.fiBpso * 100}%` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: EASE }} style={{ height: "100%", background: tone, borderRadius: 6 }} />
                      </div>
                      <N weight={900} size={15} color={tone}>{s.fiBpso.toFixed(2)}</N>
                    </div>
                    <div style={{ fontSize: 19, fontWeight: 700, color: C.inkSoft }}>
                      SFI · التغطية <N weight={800}>{s.covBpso.toFixed(2)}%</N>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 19, fontWeight: 700, color: C.inkMuted }}>ميزانية متوسطة (10,000 موقع) · السيناريوهات S2 وS4 وS5</div>
            </div>
          </Show>
        </div>
        <Show step={step} at={3}>
          <Takeaway color={tone}>
            أثبتت النتائج إمكانية كسر التمركز الحضري (الذي استأثر بـ <N>{HEADLINE.urbanConcentration}</N> تقليدياً) مع بقاء الفاقد في التغطية ضمن حدود ضئيلة جداً (<N>{CH5_FINAL.coverageLoss}</N>).
          </Takeaway>
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ 4 · Control & isolation (contribution 3) ═════════════ */

export const ResControlResults: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(2);
  const tone = CONTRIB[3].color;
  const col = (i: number): React.CSSProperties => ({ ...cardBase, borderTop: `5px solid ${tone}`, padding: "12px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, minHeight: 0, opacity: step >= i ? 1 : 0.1, transform: step >= i ? "none" : "translateY(10px)", transition: "opacity .5s, transform .5s" });
  const accColors = [tone, alpha(tone, 0.7), alpha(tone, 0.45)];
  return (
    <ResStage
      phase={3}
      contrib={3}
      question="ما كفاءة العزل المكاني من جانب الشبكة ومدى إمكانية استعادة الخدمة بأمان؟"
      title="التحكم التشغيلي: دقة عزل متقدمة، واستعادة محكومة زمنياً"
      beats={["دقة العزل", "زمن الاستعادة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* isolation */}
          <div style={col(1)}>
            <Kicker color={tone}>01 · العزل المكاني</Kicker>
            <div style={{ fontSize: 20, fontWeight: 900 }}>دقة العزل بحسب البيئة</div>
            {ISOLATION_BY_ENV.map((e, i) => (
              <div key={e.env} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                    <span style={{ fontSize: 18, fontWeight: 800 }}>{e.env}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.inkSoft }}>
                      انتشار <N weight={800}>{e.spillover}%</N>
                    </span>
                  </div>
                  <div style={{ height: 12, background: "rgba(15,23,42,0.06)", borderRadius: 6, overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: step >= 1 ? `${e.accuracy}%` : 0 }} transition={{ duration: 0.8, delay: 0.15 * i, ease: EASE }} style={{ height: "100%", background: accColors[i], borderRadius: 6 }} />
                  </div>
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 28, color: tone, direction: "ltr" }}>{e.accuracy}%</span>
              </div>
            ))}
          </div>

          {/* restoration */}
          <div style={col(2)}>
            <Kicker color={tone}>02 · الاستعادة</Kicker>
            <div style={{ fontSize: 20, fontWeight: 900 }}>زمن الاستعادة حسب الجيل</div>
            {RESTORATION.map((r, i) => {
              const ratFull =
                r.rat === "2G"
                  ? { ar: "الجيل الثاني", en: "2G" }
                  : r.rat === "3G"
                    ? { ar: "الجيل الثالث", en: "3G" }
                    : { ar: "الجيل الرابع", en: "4G" };
              return (
                <div key={r.rat} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 20.5, fontWeight: 900 }}>
                      {ratFull.ar}{" "}
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: C.inkMuted }}>({ratFull.en})</span>
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 28, color: tone, direction: "ltr", flexShrink: 0 }}>{r.label}</span>
                  </div>
                  <div style={{ height: 14, background: "rgba(15,23,42,0.06)", borderRadius: 6, overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: step >= 2 ? `${(r.minutes / 10) * 100}%` : 0 }} transition={{ duration: 0.8, delay: 0.15 * i, ease: EASE }} style={{ height: "100%", background: accColors[i], borderRadius: 6 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ResStage>
  );
};
