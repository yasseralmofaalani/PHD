import React from "react";
import { motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { CONVERGENCE, METHODS, RUNTIME, STABILITY, TTEST } from "./facts";
import {
  ArrowDefs,
  BRONZE,
  C,
  Card,
  Draw,
  EASE,
  FigureSvg,
  HeroNumber,
  N,
  ResStage,
  Show,
  ShowG,
  StatTag,
  T,
  useBeats,
} from "./stage";

export const ALGO = { bpso: C.teal, aga: C.gold, base: "#9aa3ae" } as const;

const byId = (id: (typeof METHODS)[number]["id"]) => METHODS.find((m) => m.id === id)!;

/* ═════════════ R-7 · Coverage ═════════════ */

export const ResC1Coverage: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const x = (v: number) => 200 + (v - 88) * 137.5;
  const rows = ["random", "stdga", "nofair", "aga", "bpso"] as const;
  const rowY = (i: number) => 60 + i * 78;
  const bp = byId("bpso");
  const ag = byId("aga");
  return (
    <ResStage
      phase={3}
      question="ما مدى التحسن في نسبة التغطية الراديوية المحققة؟"
      title="التغطية الراديوية: تحسن مقيس ذو دلالة إحصائية مؤكدة"
      contrib={1}
      beats={["المحاور", "الطرق المرجعية", "AGA", "BPSO", "الفرق"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 5 · جدول 25 (سيناريو قيد العدالة) · اختبار t على 30 تشغيلاً"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "0.42fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <Show step={step} at={4}>
            <div style={{ fontSize: 19.3, fontWeight: 900, color: C.inkSoft }}>تغطية BPSO</div>
            <HeroNumber value={bp.coverage} decimals={2} suffix="%" />
          </Show>
          <Show step={step} at={5}>
            <Card color={C.teal} top>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <N color={C.teal} size={38}>
                  +0.21%
                </N>
                <span style={{ fontSize: 19.8, fontWeight: 900 }}>فارق لصالح BPSO مقارنة بـ AGA</span>
              </div>
              <svg viewBox="0 0 400 96" style={{ width: "100%", marginTop: 6 }}>
                <line x1={20} y1={58} x2={380} y2={58} stroke={C.hair} strokeWidth={2} />
                {[94.8, 94.9, 95.0, 95.1, 95.2].map((v) => {
                  const px = 20 + ((v - 94.8) / 0.4) * 360;
                  return (
                    <g key={v}>
                      <line x1={px} y1={52} x2={px} y2={64} stroke={C.inkMuted} />
                      <T x={px} y={84} size={12} latin weight={700} fill={C.inkMuted}>
                        {v.toFixed(1)}
                      </T>
                    </g>
                  );
                })}
                <ArrowDefs colors={{ zc: C.teal }} />
                <circle cx={20 + ((ag.coverage - 94.8) / 0.4) * 360} cy={58} r={9} fill={ALGO.aga} />
                <circle cx={20 + ((bp.coverage - 94.8) / 0.4) * 360} cy={58} r={9} fill={ALGO.bpso} />
                <Draw d={`M ${20 + ((ag.coverage - 94.8) / 0.4) * 360} 26 H ${20 + ((bp.coverage - 94.8) / 0.4) * 360 - 6}`} color={C.teal} width={2.4} arrow="zc" />
                <T x={20 + ((ag.coverage - 94.8) / 0.4) * 360 - 30} y={40} size={12} latin weight={800} fill={BRONZE}>
                  AGA
                </T>
                <T x={20 + ((bp.coverage - 94.8) / 0.4) * 360 + 36} y={40} size={12} latin weight={800} fill={C.teal}>
                  BPSO
                </T>
              </svg>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                <StatTag>{TTEST.coverage}</StatTag>
                <StatTag>σ AGA 0.38 · σ BPSO 0.45</StatTag>
              </div>
            </Card>
          </Show>
        </div>

        <svg viewBox="0 0 1400 470" style={{ width: "100%", height: "100%" }}>
          <ShowG step={step} at={1}>
            {Array.from({ length: 9 }, (_, i) => 88 + i).map((v) => (
              <g key={v}>
                <line x1={x(v)} y1={25} x2={x(v)} y2={420} stroke={alpha(C.ink, v === 88 ? 0.35 : 0.08)} strokeWidth={1} />
                <T x={x(v)} y={442} size={15} latin weight={700} fill={C.inkSoft}>
                  {`${v}%`}
                </T>
              </g>
            ))}
            <T x={750} y={466} size={14} weight={800} fill={C.inkMuted}>
              نسبة التغطية الراديوية (%) — يبدأ المحور من 88% لإبراز الفروق الدقيقة
            </T>
          </ShowG>
          {rows.map((id, i) => {
            const m = byId(id);
            const at = id === "aga" ? 3 : id === "bpso" ? 4 : 2;
            const color = id === "aga" ? ALGO.aga : id === "bpso" ? ALGO.bpso : ALGO.base;
            const y = rowY(i);
            const sd = id === "aga" ? 0.38 : id === "bpso" ? 0.45 : 0;
            return (
              <ShowG key={id} step={step} at={at}>
                <T x={20} y={y} size={id === "aga" || id === "bpso" ? 17 : 15} anchor="end" weight={900} fill={id === "aga" || id === "bpso" ? C.ink : C.inkSoft}>
                  {m.ar}
                </T>
                <motion.line x1={x(88)} y1={y} y2={y} stroke={alpha(color, 0.35)} strokeWidth={2} initial={{ x2: x(88) }} animate={{ x2: x(m.coverage) }} transition={{ duration: 0.8, ease: EASE }} />
                {sd > 0 && <line x1={x(m.coverage - sd)} y1={y} x2={x(m.coverage + sd)} y2={y} stroke={color} strokeWidth={5} strokeLinecap="round" opacity={0.35} />}
                <motion.circle cy={y} r={id === "bpso" || id === "aga" ? 13 : 10} fill={color} initial={{ cx: x(88) }} animate={{ cx: x(m.coverage) }} transition={{ duration: 0.8, ease: EASE }} />
                <T x={x(m.coverage)} y={y - 26} size={15} latin weight={900} fill={id === "random" || id === "stdga" || id === "nofair" ? C.inkSoft : color}>
                  {m.coverage.toFixed(2)}
                </T>
              </ShowG>
            );
          })}
          <ShowG step={step} at={5}>
            <rect x={x(94.4)} y={rowY(3) - 44} width={x(95.7) - x(94.4)} height={rowY(4) - rowY(3) + 80} rx={14} fill="none" stroke={C.teal} strokeWidth={2} strokeDasharray="6 5" />
          </ShowG>
        </svg>
      </div>
      <Show step={step} at={5} delay={0.3} style={{ textAlign: "center", fontSize: "clamp(19.8px, 1.65vw, 23.6px)", fontWeight: 900, color: C.inkSoft }}>
        تقارب نسب التغطية بين الخوارزميات الذكية يجعل المفاضلة الهندسية محكومة بعوامل الكلفة، واستهلاك الطاقة، والعدالة المكانية.
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-8 · Cost & energy ═════════════ */

const Dumbbell: React.FC<{
  step: number;
  base: number;
  label: string;
  unit: string;
  lo: number;
  hi: number;
  key2: "cost" | "energy";
  saving: string;
  test: string;
}> = ({ step, base, label, unit, lo, hi, key2, saving, test }) => {
  const x = (v: number) => 40 + ((v - lo) / (hi - lo)) * 560;
  const ag = byId("aga")[key2];
  const bp = byId("bpso")[key2];
  const refs = (["nofair", "stdga", "random"] as const).map((id, i) => ({ id, v: byId(id)[key2], up: i % 2 === 0 }));
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += 5) ticks.push(v);
  return (
    <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${C.hair}`, boxShadow: "0 10px 28px rgba(15,23,42,0.06)", padding: "12px 16px", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 24.8, fontWeight: 900 }}>{label}</span>
        <span style={{ fontSize: 19, fontWeight: 800, color: C.inkMuted }}>
          <N weight={800}>{unit}</N> · القيمة الأقل أفضل
        </span>
      </div>
      <svg viewBox="0 0 640 200" style={{ width: "100%" }}>
        <ArrowDefs colors={{ [`db-${key2}`]: C.teal }} />
        <ShowG step={step} at={base}>
          <line x1={30} y1={110} x2={610} y2={110} stroke={alpha(C.ink, 0.3)} strokeWidth={1.5} />
          {ticks.map((v) => (
            <g key={v}>
              <line x1={x(v)} y1={104} x2={x(v)} y2={116} stroke={alpha(C.ink, 0.35)} />
              <T x={x(v)} y={134} size={13} latin weight={700} fill={C.inkMuted}>
                {v}
              </T>
            </g>
          ))}
          {refs.map((r) => (
            <g key={r.id}>
              <circle cx={x(r.v)} cy={110} r={6} fill={ALGO.base} />
              <T x={x(r.v)} y={r.up ? 88 : 158} size={11.5} latin weight={700} fill={C.inkMuted}>
                {`${byId(r.id).name} ${r.v}`}
              </T>
            </g>
          ))}
        </ShowG>
        <ShowG step={step} at={base + 1}>
          <circle cx={x(ag)} cy={110} r={12} fill={ALGO.aga} />
          <T x={x(ag)} y={186} size={14} latin weight={900} fill={BRONZE}>
            {`AGA ${ag}`}
          </T>
        </ShowG>
        <ShowG step={step} at={base + 2}>
          <Draw d={`M ${x(ag) - 14} 110 H ${x(bp) + 16}`} color={C.teal} width={4} arrow={`db-${key2}`} />
          <circle cx={x(bp)} cy={110} r={12} fill={ALGO.bpso} />
          <T x={x(bp)} y={186} size={14} latin weight={900} fill={C.teal}>
            {`BPSO ${bp}`}
          </T>
        </ShowG>
      </svg>
      <Show step={step} at={base + 3} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 19.8, fontWeight: 900 }}>نسبة الوفر</span>
          <HeroNumber value={parseFloat(saving)} decimals={1} suffix="%" size="clamp(42px, 4.4vw, 64px)" />
        </div>
        <StatTag>{test}</StatTag>
      </Show>
    </div>
  );
};

export const ResC1CostEnergy: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  return (
    <ResStage
      phase={4}
      question="ما حجم الوفر الاقتصادي والطاقي الذي تحققه خوارزمية BPSO؟"
      title="الكلفة الرأسمالية واستهلاك الطاقة: خفض متزامن مع الحفاظ على التغطية"
      contrib={1}
      beats={["المحاور والطرق المرجعية", "AGA", "BPSO", "الفرق", "زمن التنفيذ"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 5 · جدولا 25 و28 · اختبار t على 30 تشغيلاً — الفصل 7 · §1.7"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Dumbbell step={step} base={1} label="كلفة الترقية" unit="M$" lo={125} hi={155} key2="cost" saving="6.0" test={TTEST.cost} />
        <Dumbbell step={step} base={1} label="استهلاك الطاقة" unit="MWh" lo={75} hi={95} key2="energy" saving="5.3" test={TTEST.energy} />
      </div>
      <Show step={step} at={5} style={{ marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: `1px solid ${C.hair}`, borderRadius: 14, padding: "10px 18px" }}>
          <span style={{ fontSize: 21.1, fontWeight: 900, whiteSpace: "nowrap" }}>زمن المعالجة الحسابية</span>
          <div style={{ flex: 1, display: "grid", gap: 6 }}>
            {[
              { n: "BPSO", v: RUNTIME.bpso, c: ALGO.bpso },
              { n: "AGA", v: RUNTIME.aga, c: ALGO.aga },
            ].map((r) => (
              <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 10, direction: "ltr" }}>
                <span style={{ width: 52, fontFamily: "Inter, sans-serif", fontWeight: 900, color: r.c }}>{r.n}</span>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(r.v / RUNTIME.aga) * 70}%` }} transition={{ duration: 0.8, ease: EASE }} style={{ height: 14, borderRadius: 7, background: r.c }} />
                <N size={15}>{`${r.v} s`}</N>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <N color={C.teal} size={30}>
              {RUNTIME.faster}
            </N>
            <div style={{ fontSize: 19, fontWeight: 900, color: C.inkSoft }}>تسريع حسابي</div>
          </div>
        </div>
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-9 · Budget vs coverage ═════════════ */

const BUDGET = [
  { b: 80, aga: 88.7, bpso: 89.4 },
  { b: 100, aga: 91.9, bpso: 92.8 },
  { b: 120, aga: 93.8, bpso: 94.5 },
  { b: 140, aga: 94.8, bpso: 95.1 },
] as const;

export const ResBudget: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const x = (b: number) => 140 + ((b - 70) / 90) * 1120;
  const y = (v: number) => 420 - ((v - 88) / 8) * 380;
  const line = (k: "aga" | "bpso") => BUDGET.map((p, i) => `${i ? "L" : "M"} ${x(p.b)} ${y(p[k])}`).join(" ");
  return (
    <ResStage
      phase={5}
      question="ما نقطة الاستثمار المثلى التي تضمن أعلى عائد في التغطية؟"
      title="حساسية الميزانية: رصد ظاهرة العائد المتناقص عند عتبة 140 مليون دولار"
      contrib={1}
      beats={["AGA", "BPSO", "الفجوة", "حدّ العائد"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 5 · جدول 27 والشكل 27 (مع قيد العدالة المكانية)"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "0.36fr 1fr", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <Show step={step} at={3}>
            <Card color={C.teal} top>
              <div style={{ fontSize: 21.1, fontWeight: 900, lineHeight: 1.55 }}>تحقق BPSO كفاءة استثمارية متفوقة بتغطية أعلى عند نفس الميزانية المرصودة عبر كافة المستويات</div>
            </Card>
          </Show>
          <Show step={step} at={4}>
            <Card color={C.gold} top>
              <div style={{ fontSize: 21.1, fontWeight: 900, lineHeight: 1.55 }}>تتسطح منحنيات الاستجابة بعد 140 مليون دولار، حيث يؤدي ضخ استثمارات إضافية إلى مكاسب هامشية طفيفة في التغطية</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: C.inkSoft, marginTop: 4 }}>تحديد العتبة الحرجة لجدوى الإنفاق الرأسمالي (CAPEX)</div>
            </Card>
          </Show>
        </div>
        <svg viewBox="0 0 1300 480" style={{ width: "100%", height: "100%" }}>
          {[88, 90, 92, 94, 96].map((v) => (
            <g key={v}>
              <line x1={x(70)} x2={x(160)} y1={y(v)} y2={y(v)} stroke={alpha(C.ink, 0.08)} />
              <T x={x(70) - 14} y={y(v)} size={14} latin anchor="end" weight={700} fill={C.inkMuted}>
                {`${v}%`}
              </T>
            </g>
          ))}
          {BUDGET.map((p) => (
            <T key={p.b} x={x(p.b)} y={446} size={15} latin weight={800} fill={C.inkSoft}>
              {`${p.b} M$`}
            </T>
          ))}
          <ShowG step={step} at={4}>
            <rect x={x(140)} y={y(96)} width={x(160) - x(140)} height={y(88) - y(96)} fill={alpha(C.gold, 0.12)} />
            <line x1={x(140)} x2={x(140)} y1={y(96)} y2={y(88)} stroke={C.gold} strokeWidth={2} strokeDasharray="6 5" />
            <T x={(x(140) + x(160)) / 2} y={y(95.8)} size={15} weight={900} fill={BRONZE}>
              منطقة العائد المتناقص (Diminishing Returns)
            </T>
          </ShowG>
          <ShowG step={step} at={3}>
            {BUDGET.map((p) => (
              <line key={p.b} x1={x(p.b)} x2={x(p.b)} y1={y(p.aga)} y2={y(p.bpso)} stroke={C.teal} strokeWidth={6} opacity={0.25} strokeLinecap="round" />
            ))}
          </ShowG>
          {(["aga", "bpso"] as const).map((k, i) => (
            <ShowG key={k} step={step} at={i + 1}>
              <Draw d={line(k)} color={ALGO[k]} width={3.5} duration={1} />
              {BUDGET.map((p, j) => (
                <motion.g key={p.b} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + j * 0.2 }}>
                  <circle cx={x(p.b)} cy={y(p[k])} r={8} fill={ALGO[k]} />
                  <T x={x(p.b)} y={y(p[k]) + (k === "bpso" ? -22 : 24)} size={14} latin weight={900} fill={k === "aga" ? BRONZE : C.teal}>
                    {p[k].toFixed(1)}
                  </T>
                </motion.g>
              ))}
              <T x={x(140) + 20} y={y(BUDGET[3][k]) + (k === "bpso" ? -6 : 14)} size={15} latin anchor="end" weight={900} fill={k === "aga" ? BRONZE : C.teal}>
                {k.toUpperCase()}
              </T>
            </ShowG>
          ))}
        </svg>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-10 · Balanced verdict ═════════════ */

export const ResC1Balance: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  return (
    <ResStage
      phase={4}
      question="كيف تتوزع نقاط القوة النسبية بين خوارزميتي BPSO وAGA؟"
      title="مقارنة منهجية متوازنة: التمايز بين الكفاءة الحسابية والاستقرار الإحصائي"
      contrib={1}
      beats={["أين تتفوق BPSO", "أين تتفوق AGA", "الخلاصة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 5 · جدولا 23 و24 والشكلان 23 و28 — الملخص والفصل 7"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Show step={step} at={1} from="right" style={{ minHeight: 0 }}>
          <Card color={ALGO.bpso} top style={{ height: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <N color={ALGO.bpso} size={30}>
                BPSO
              </N>
              <span style={{ fontSize: 21.8, fontWeight: 900 }}>تفوق في معايير الاستمثال وسرعة التقارب</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {[
                ["التغطية", "95.12%"],
                ["كفاءة الطاقة", "78.3 MWh"],
                ["العدالة المكانية", "SFI 0.71"],
                ["الكلفة", "132.8 M$"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: alpha(C.teal, 0.07), borderRadius: 12, padding: "8px 12px" }}>
                  <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft }}>{k}</div>
                  <N color={C.teal} size={24}>
                    {v}
                  </N>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 19.8, fontWeight: 800, lineHeight: 1.7 }}>
              تقارب متسارع خلال أول <N>{CONVERGENCE.fastWindow}</N> جيلاً · زمن حساب إجمالي <N>{RUNTIME.bpso} s</N>
            </div>
          </Card>
        </Show>

        <Show step={step} at={2} from="left" style={{ minHeight: 0 }}>
          <Card color={ALGO.aga} top style={{ height: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <N color={BRONZE} size={30}>
                AGA
              </N>
              <span style={{ fontSize: 21.8, fontWeight: 900 }}>أعلى متانة إحصائية وتشتتاً أقل</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: C.inkSoft, marginTop: 6 }}>الانحراف المعياري عبر 30 تشغيلة مستقلة — القيمة الأقل تدل على استقرار أعلى</div>
            <div style={{ display: "grid", gap: 9, marginTop: 8 }}>
              {STABILITY.map((s, i) => {
                const max = Math.max(s.aga.sd, s.bpso.sd);
                return (
                  <div key={s.metric} style={{ display: "grid", gridTemplateColumns: "84px 1fr", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 19.3, fontWeight: 900 }}>{s.metric}</span>
                    <div style={{ display: "grid", gap: 3, direction: "ltr" }}>
                      {(["aga", "bpso"] as const).map((k) => (
                        <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(s[k].sd / max) * 72}%` }}
                            transition={{ duration: 0.7, delay: i * 0.12 }}
                            style={{ height: 10, borderRadius: 5, background: ALGO[k], opacity: k === "aga" ? 1 : 0.45 }}
                          />
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 19, fontWeight: 800, color: k === "aga" ? BRONZE : C.inkMuted }}>
                            {`σ ${s[k].sd}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 10, fontSize: 19.1, fontWeight: 800, lineHeight: 1.6 }}>تقارب تدريجي يضمن استقرار الحلول، مع مرونة ضبط واسعة عبر معاملات التحوير والتقاطع</div>
          </Card>
        </Show>
      </div>
      <Show step={step} at={3} style={{ marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, background: C.ink, color: "#fff", borderRadius: 14, padding: "12px 20px", fontSize: "clamp(19.8px, 1.65vw, 23.6px)", fontWeight: 900 }}>
          <span>
            تستقر كلتا الخوارزميتين بعد قرابة <N>{CONVERGENCE.stableAfter}</N> جيل حسابي:
          </span>
          <span style={{ color: C.cyan }}>BPSO للحلول المتقاربة بأقل كلفة وطاقة</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: C.gold }}>AGA للتطبيقات المشترطة اتساقاً مطلقاً وتشتتاً أدنى</span>
        </div>
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-11 · Pareto, step by step ═════════════ */

const FRONT = "M 156 113 L 166 250 L 185 330 L 212 397 L 270 502 L 365 607 L 500 712 L 580 764 L 700 817 L 800 838 L 958 855";
const STARS = [
  [318, 460],
  [487, 570],
  [612, 696],
] as const;

const PARETO_TEXT = [
  { h: "معضلة المفاضلة (Trade-off)", b: "زيادة التغطية الراديوية تتطلب حتماً زيادة الكلفة الاستثمارية، مما يفرض البحث عن الحل المتوازن غير الخاضع للهيمنة (Non-dominated)." },
  { h: "فضاء الحلول المحسوبة", b: "تمثل كل نقطة تشكيلة ترقية متكاملة للمحطات (دوائر GA ومثلثات PSO) ضمن الفضاء ثنائي الأبعاد." },
  { h: "جبهة باريتو الفعالة", b: "تحدد الجبهة الحدود القصوى للأداء، حيث تتفوق حلول BPSO بالاقتراب من الجبهة، بينما تحقق AGA انتشاراً أوسع وتنوعاً حلولياً أعلى." },
  { h: "نقطة العمل الهندسية المختارة", b: "تقع الحلول المختارة في منطقة التوازن الركبي (Knee Region)، محققةً أقصى عائد تغطية قبل الدخول في نطاق الكلفة الحادة." },
];

export const ResPareto: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  return (
    <ResStage
      phase={4}
      question="كيف تحدد جبهة باريتو نقطة التوازن المثلى بين التغطية والكلفة؟"
      title="تحليل جبهة باريتو: استكشاف فضاء المقايضة بين التغطية والاستثمار"
      contrib={1}
      beats={["السؤال", "فضاء الحلول", "الجبهة", "الحل المختار", "الربط بالأهداف"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 5 · الشكل 25 و§4.6.5 · الشكل 26"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "0.9fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          {PARETO_TEXT.map((t, i) => (
            <Show key={t.h} step={step} at={i + 1}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", opacity: step === i + 1 || step === 5 ? 1 : 0.45, transition: "opacity .3s" }}>
                <span style={{ width: 30, height: 30, borderRadius: 99, background: i === 3 ? C.green : C.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontWeight: 900, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{ fontSize: 21.8, fontWeight: 900 }}>{t.h}</div>
                  <div style={{ fontSize: 19.1, fontWeight: 700, color: C.inkSoft, lineHeight: 1.6 }}>{t.b}</div>
                </div>
              </div>
            </Show>
          ))}
          <Show step={step} at={5} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            {[
              ["التغطية", "المحور الرأسي", C.teal],
              ["الكلفة", "المحور الأفقي", C.teal],
              ["الطاقة", "BPSO: طاقة أقل مع عدالة أعلى (الشكل 26)", C.green],
              ["العدالة", "كل الحلول محسوبة تحت قيد العدالة المكانية", C.maroon],
            ].map(([h, b, c]) => (
              <div key={h} style={{ background: "#fff", borderRight: `4px solid ${c}`, borderRadius: 10, padding: "6px 10px" }}>
                <div style={{ fontSize: 19.1, fontWeight: 900, color: c }}>{h}</div>
                <div style={{ fontSize: 19, fontWeight: 700, color: C.inkSoft }}>{b}</div>
              </div>
            ))}
          </Show>
        </div>

        <div style={{ minHeight: 0, display: "flex", justifyContent: "center" }}>
          <FigureSvg src="thesis_figures/fig25_pareto_coverage_cost_sfi.png" w={1024} h={1024} dim={step === 1 ? 0.82 : 0} style={{ maxWidth: "100%", aspectRatio: "1" }}>
            <ArrowDefs colors={{ pq: C.maroon }} />
            {step === 1 && (
              <g>
                <Draw d="M 140 900 H 980" color={C.maroon} width={5} arrow="pq" />
                <Draw d="M 120 900 V 110" color={C.teal} width={5} arrow="pq" />
                <T x={560} y={870} size={34} weight={900} fill={C.maroon}>
                  الكلفة ←
                </T>
                <T x={190} y={500} size={34} anchor="end" weight={900} fill={C.teal}>
                  ↑ التغطية
                </T>
              </g>
            )}
            <ShowG step={step} at={3}>
              <motion.path d={FRONT} fill="none" stroke={C.gold} strokeWidth={14} strokeOpacity={0.45} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: EASE }} />
            </ShowG>
            <ShowG step={step} at={4}>
              {STARS.map(([sx, sy], i) => (
                <motion.circle key={sx} cx={sx} cy={sy} fill="none" stroke={C.green} strokeWidth={5} initial={{ r: 10, opacity: 0 }} animate={{ r: [22, 40, 22], opacity: 1 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }} />
              ))}
            </ShowG>
          </FigureSvg>
        </div>
      </div>
    </ResStage>
  );
};
