import React from "react";
import { motion } from "framer-motion";
import { ALG, C, Chip, ContribStage, KpiTile, Show, ShowG, T, useBeats } from "./kit";
import { RepairEngine } from "./RepairEngine";
import { CH4_BUDGET, CH4_RESULTS, CH4_STABILITY } from "./facts";

const BPSO = ALG.bpso.color;
const AGA = ALG.aga.color;
const STD = ALG.stdGa.color;
const RND = ALG.random.color;

/* ═════════════ 7 · Adaptive Constraint Repair (kept / enhanced slide 27) ═════════════ */

const REPAIR_BEATS = ["حل غير صالح", "إصلاح الميزانية", "إصلاح التغطية", "حل صالح", "عودة إلى البحث"];

export const C1RepairEngine: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const focus = step === 2 ? "budget" : step === 3 ? "coverage" : step >= 4 ? "all" : null;
  const engineStage = step <= 1 ? 2 : step === 2 ? 3 : step === 3 ? 4 : step === 4 ? 6 : 7;
  return (
    <ContribStage
      contribution={1}
      title="كيف نمنع الخوارزمية من إنتاج حلول غير صالحة؟"
      beats={REPAIR_BEATS}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 8 }}>
        {[
          { t: "Infeasible", d: "تجاوز الميزانية أو تغطية دون الحد", c: C.red, on: step >= 1 },
          { t: "Adaptive Repair", d: "حذف الأدنى جدوى أو إضافة الأعلى جدوى", c: C.gold, on: step >= 2 },
          { t: "Feasible", d: "Budget ✓  Coverage ✓  Valid ✓", c: C.green, on: step >= 4 },
        ].map((s) => (
          <div key={s.t} style={{ background: s.on ? "#fff" : "rgba(255,255,255,0.45)", border: `1.5px solid ${s.on ? s.c : C.hair}`, borderRadius: 12, padding: "10px 14px", opacity: s.on ? 1 : 0.5, overflow: "hidden" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 18, color: s.c }}>{s.t}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.inkSoft, lineHeight: 1.35 }}>{s.d}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 280, display: "grid", gridTemplateColumns: "1fr 260px", gap: 12, minWidth: 0 }}>
        <div style={{ minHeight: 280, height: "100%", minWidth: 0, overflow: "hidden" }}>
          <RepairEngine stage={engineStage} showFairness={false} fairness="locked" focus={focus} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, minWidth: 0, overflow: "hidden" }}>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.4 }}>الإصلاح ليس تفصيلاً برمجياً</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.inkSoft, lineHeight: 1.55 }}>
          بعد كل تحديث للحل، تُزال العناصر الأقل كفاءة من حيث التغطية مقابل التكلفة عند تجاوز الحد الأقصى للميزانية (B)، ثم تُضاف العناصر الأعلى كفاءة حتى تحقيق الحد الأدنى المطلوب من التغطية
          </div>
          <Chip color={C.gold} solid>
            آلية مشتركة بين AGA و BPSO
          </Chip>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 9 · Hero results ═════════════ */

export const C1HeroResults: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const b = CH4_RESULTS.bpso;
  const a = CH4_RESULTS.aga;
  return (
    <ContribStage
      contribution={1}
      title="BPSO تحقق أفضل أداء إجمالي"
      beats={["مؤشرات BPSO", "مقابل AGA", "الفروق الحاسمة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Show step={step} at={1} style={{ background: "rgba(66,129,119,0.08)", border: `2px solid ${BPSO}`, borderRadius: 22, padding: 22, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 900, color: BPSO }}>BPSO</div>
          <div style={{ fontSize: "clamp(42px, 4.6vw, 64px)", fontWeight: 900, color: BPSO, lineHeight: 1.05, margin: "8px 0 14px" }}>
            {b.coverage.toFixed(2)}%
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <KpiTile label="التكلفة" value={b.cost.toFixed(1)} unit="M$" color={BPSO} />
            <KpiTile label="الطاقة" value={b.energy.toFixed(1)} unit="MWh" color={BPSO} />
          </div>
        </Show>
        <Show step={step} at={2} style={{ background: "rgba(107,31,42,0.06)", border: `2px solid ${AGA}`, borderRadius: 22, padding: 22, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 900, color: AGA }}>AGA</div>
          <div style={{ fontSize: "clamp(42px, 4.6vw, 64px)", fontWeight: 900, color: AGA, lineHeight: 1.05, margin: "8px 0 14px" }}>
            {a.coverage.toFixed(2)}%
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <KpiTile label="التكلفة" value={a.cost.toFixed(1)} unit="M$" color={AGA} />
            <KpiTile label="الطاقة" value={a.energy.toFixed(1)} unit="MWh" color={AGA} />
          </div>
        </Show>
      </div>
      <Show step={step} at={3} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 12 }}>
        <KpiTile label="التغطية لصالح BPSO" value={CH4_RESULTS.deltaCoverage} color={C.green} />
        <KpiTile label="كلفة أقل" value={CH4_RESULTS.deltaCost} color={C.green} />
        <KpiTile label="طاقة أفضل" value={CH4_RESULTS.deltaEnergy} color={C.green} />
      </Show>
    </ContribStage>
  );
};

/* ═════════════ 10 · Stability ═════════════ */

export const C1Stability: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const rows = [
    { k: "Coverage (%)", aga: CH4_STABILITY.aga.coverage, as: CH4_STABILITY.aga.coverageStd, bp: CH4_STABILITY.bpso.coverage, bs: CH4_STABILITY.bpso.coverageStd },
    { k: "Cost (M$)", aga: CH4_STABILITY.aga.cost, as: CH4_STABILITY.aga.costStd, bp: CH4_STABILITY.bpso.cost, bs: CH4_STABILITY.bpso.costStd },
    { k: "Energy (MWh)", aga: CH4_STABILITY.aga.energy, as: CH4_STABILITY.aga.energyStd, bp: CH4_STABILITY.bpso.energy, bs: CH4_STABILITY.bpso.energyStd },
  ];
  return (
    <ContribStage
      contribution={1}
      title="الأداء وحده لا يكفي: تحليل الاستقرار"
      beats={["15 تشغيلاً مستقلاً", "متوسطات ومعيارية", "الأداء مقابل الاستقرار"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ display: "grid", gap: 10, alignContent: "center" }}>
          {rows.map((r) => (
            <Show key={r.k} step={step} at={2}>
              <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: "12px 16px" }}>
                <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 16, color: C.inkSoft, marginBottom: 6 }}>
                  {r.k}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ color: AGA }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 26 }}>{r.aga.toFixed(2)}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 16 }}> ± {r.as}</span>
                  </div>
                  <div style={{ color: BPSO }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 26 }}>{r.bp.toFixed(2)}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 16 }}> ± {r.bs}</span>
                  </div>
                </div>
              </div>
            </Show>
          ))}
        </div>
        <Show step={step} at={3} from="left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <div style={{ background: "rgba(66,129,119,0.08)", borderRadius: 16, padding: 16, borderRight: `5px solid ${BPSO}` }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: BPSO }}>BPSO → أفضل متوسط أداء</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.inkSoft, marginTop: 6 }}>أعلى تغطية وأقل كلفة وطاقة في المتوسط</div>
          </div>
          <div style={{ background: "rgba(107,31,42,0.07)", borderRadius: 16, padding: 16, borderRight: `5px solid ${AGA}` }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: AGA }}>AGA → استقرار أعلى</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.inkSoft, marginTop: 6 }}>انحراف معياري أدنى في المقاييس الثلاثة</div>
          </div>
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 11 · Convergence (conceptual, chapter analysis only) ═════════════ */

export const C1Convergence: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ContribStage
      contribution={1}
      title="التقارب: سرعة الوصول مقابل سلاسة التحسن"
      beats={["أول 80 تكراراً", "الاستقرار بعد 200", "كفاية 300", "الخلاصة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 16 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${C.hair}`,
            padding: 10,
            minHeight: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", flex: 1, minHeight: 280, display: "block" }}>
            <T x={320} y={22} size={15} weight={900}>
              Illustration · Iteration vs Fitness
            </T>
            <line x1={70} y1={300} x2={600} y2={300} stroke={C.ink} strokeOpacity={0.45} strokeWidth={1.6} />
            <line x1={70} y1={40} x2={70} y2={300} stroke={C.ink} strokeOpacity={0.45} strokeWidth={1.6} />
            {/* X / Y axis titles */}
            <T x={335} y={348} size={14} weight={900} fill={C.ink}>
              المحور X · التكرار (Iteration)
            </T>
            <text
              x={18}
              y={170}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
              fontWeight={900}
              fill={C.ink}
              fontFamily="Cairo, sans-serif"
              transform="rotate(-90 18 170)"
            >
              المحور Y · اللياقة Fitness
            </text>
            {[0, 80, 200, 300].map((it) => {
              const x = 70 + (it / 300) * 530;
              return (
                <g key={it}>
                  <line x1={x} y1={300} x2={x} y2={306} stroke={C.ink} />
                  <T x={x} y={322} size={12} latin fill={C.inkSoft}>
                    {it}
                  </T>
                  {it > 0 && <line x1={x} y1={48} x2={x} y2={300} stroke={C.hair} />}
                </g>
              );
            })}
            <ShowG step={step} at={1}>
              <path d="M70 270 C 130 120, 190 95, 214 90 S 370 78, 430 74 S 600 70, 600 70" fill="none" stroke={BPSO} strokeWidth={3.2} />
              <T x={160} y={78} size={13} weight={900} latin fill={BPSO}>
                BPSO
              </T>
            </ShowG>
            <ShowG step={step} at={1}>
              <path d="M70 275 C 160 210, 230 150, 270 120 S 410 88, 470 80 S 600 74, 600 74" fill="none" stroke={AGA} strokeWidth={3.2} />
              <T x={260} y={168} size={13} weight={900} latin fill={AGA}>
                AGA
              </T>
            </ShowG>
            <ShowG step={step} at={2}>
              <rect x={70 + (200 / 300) * 530 - 1} y={48} width={2} height={252} fill={C.gold} opacity={0.7} />
              <T x={70 + (200 / 300) * 530 + 56} y={58} size={12} weight={800} fill={C.gold}>
                استقرار ~200
              </T>
            </ShowG>
          </svg>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.inkMuted, textAlign: "center", flexShrink: 0 }}>رسم توضيحي تحليلي، وليس تمثيلًا للبيانات الأصلية.    </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <Show step={step} at={1}>
            <Chip color={BPSO} solid>
              BPSO أسرع خلال أول 80 تكراراً
            </Chip>
          </Show>
          <Show step={step} at={2}>
            <Chip color={C.gold} solid>
              كلاهما يستقر بعد نحو 200 تكرار
            </Chip>
          </Show>
          <Show step={step} at={3}>
            <Chip color={C.ink}>T = 300 كافٍ عملياً</Chip>
          </Show>
          <Show step={step} at={4}>
            <div style={{ background: C.ink, color: "#fff", borderRadius: 14, padding: 14, fontSize: 20, fontWeight: 900, lineHeight: 1.45 }}>
              BPSO تتقارب أسرع، بينما AGA أكثر سلاسة واستقراراً.
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 12 · Pareto (conceptual) ═════════════ */

const PARETO = {
  bpso: [
    [78, 92],
    [70, 84],
    [62, 76],
    [54, 70],
    [48, 64],
  ],
  aga: [
    [86, 88],
    [74, 78],
    [66, 68],
    [58, 60],
    [50, 52],
    [42, 46],
  ],
  std: [
    [88, 96],
    [76, 90],
    [68, 84],
  ],
  rnd: [
    [96, 110],
    [88, 104],
    [80, 98],
  ],
};

export const C1Pareto: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const toXY = (c: number, cov: number) => [80 + ((c - 35) / 80) * 480, 300 - ((cov - 40) / 80) * 240] as const;
  return (
    <ContribStage
      contribution={1}
      title="جبهة باريتو: المفاضلة بين التغطية والتكلفة"
      beats={["فضاء المفاضلة", "قرب BPSO من المنطقة المثلى", "تنوع حلول AGA"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل الرابع: تحليل الجبهة المثلى، الشكل 15"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${C.hair}`,
            padding: 8,
            minHeight: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", flex: 1, minHeight: 280, display: "block" }}>
            <T x={300} y={22} size={15} weight={900}>
              Coverage vs Cost · Conceptual Pareto
            </T>
            <line x1={70} y1={310} x2={560} y2={310} stroke={C.ink} strokeOpacity={0.35} />
            <line x1={70} y1={40} x2={70} y2={310} stroke={C.ink} strokeOpacity={0.35} />
            <T x={320} y={340} size={13} weight={800} fill={C.inkSoft}>
              Cost →
            </T>
            <T x={28} y={170} size={13} weight={800} fill={C.inkSoft}>
              Cov
            </T>
            <path d="M90 70 C 160 90, 220 130, 300 190 S 480 280, 540 300" fill="none" stroke={C.green} strokeOpacity={0.35} strokeWidth={8} />
            {(
              [
                [PARETO.rnd, RND, 1],
                [PARETO.std, STD, 1],
                [PARETO.aga, AGA, 2],
                [PARETO.bpso, BPSO, 2],
              ] as const
            ).map(([pts, color, at]) =>
              pts.map(([c, cov], i) => {
                const [x, y] = toXY(c, cov);
                return (
                  <ShowG key={`${color}-${i}`} step={step} at={at}>
                    <circle cx={x} cy={y} r={color === BPSO ? 7 : 6} fill={color} />
                  </ShowG>
                );
              }),
            )}
          </svg>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 6 }}>
            <Chip color={BPSO}>BPSO</Chip>
            <Chip color={AGA}>AGA</Chip>
            <Chip color={STD}>Standard GA</Chip>
            <Chip color={RND}>Random</Chip>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.inkMuted, textAlign: "center" }}>توضيح مفهومي وفق تحليل الشكل 15 — ليست إحداثيات رقمية أصلية</div>
        </div>
        <Show step={step} at={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>
            حلول BPSO أقرب عموماً إلى منطقة المفاضلة المثلى، بينما AGA تمنح تنوعاً أوسع على الجبهة.
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.inkSoft }}>كلتا الخوارزميتين تتفوقان بوضوح على GA التقليدية والاختيار العشوائي.</div>
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 13 · Budget vs coverage ═════════════ */

export const C1Budget: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const xOf = (b: number) => 80 + ((b - 80) / 60) * 510;
  const yOf = (c: number) => 300 - ((c - 87) / 10) * 240;
  const path = (key: "aga" | "bpso") => CH4_BUDGET.map((r, i) => `${i === 0 ? "M" : "L"}${xOf(r.budget)} ${yOf(r[key])}`).join(" ");
  return (
    <ContribStage
      contribution={1}
      title="الميزانية مقابل التغطية: عائد متناقص"
      beats={["بعد تجاوز استثمار يقارب 140 M$، تصبح الزيادة الإضافية في التغطية محدودة مقارنة بالزيادة في التكلفة، مما يشير إلى بلوغ حدّ جدوى هندسي واقتصادي تتراجع بعده كفاءة الاستثمار في تحسين التغطية."]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${C.hair}`, padding: 10 }}>
          <svg viewBox="0 0 640 360" style={{ width: "100%", height: "100%" }}>
            <T x={330} y={22} size={15} weight={900}>
              Budget (M$) vs Coverage (%)
            </T>
            <line x1={80} y1={300} x2={590} y2={300} stroke={C.ink} strokeOpacity={0.45} strokeWidth={1.6} />
            <line x1={80} y1={40} x2={80} y2={300} stroke={C.ink} strokeOpacity={0.45} strokeWidth={1.6} />
            {/* X / Y axis titles */}
            <T x={335} y={348} size={14} weight={900} fill={C.ink}>
              المحور X · الميزانية Budget (M$)
            </T>
            <text
              x={20}
              y={170}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
              fontWeight={900}
              fill={C.ink}
              fontFamily="Cairo, sans-serif"
              transform="rotate(-90 20 170)"
            >
              المحور Y · التغطية Coverage (%)
            </text>
            {CH4_BUDGET.map((r) => (
              <g key={r.budget}>
                <line x1={xOf(r.budget)} y1={300} x2={xOf(r.budget)} y2={306} stroke={C.ink} />
                <T x={xOf(r.budget)} y={322} size={12} latin fill={C.inkSoft}>
                  {r.budget}
                </T>
              </g>
            ))}
            {[88, 90, 92, 94, 96].map((c) => (
              <T key={c} x={58} y={yOf(c)} size={11} latin fill={C.inkMuted}>
                {c}
              </T>
            ))}
            <path d={path("aga")} fill="none" stroke={AGA} strokeWidth={3} />
            <path d={path("bpso")} fill="none" stroke={BPSO} strokeWidth={3} />
            {CH4_BUDGET.map((r) => (
              <g key={`p${r.budget}`}>
                <circle cx={xOf(r.budget)} cy={yOf(r.aga)} r={5} fill={AGA} />
                <circle cx={xOf(r.budget)} cy={yOf(r.bpso)} r={5} fill={BPSO} />
                <T x={xOf(r.budget)} y={yOf(r.bpso) - 12} size={11} latin fill={BPSO}>
                  {r.bpso}
                </T>
              </g>
            ))}
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          <Show step={step} at={2}>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.inkSoft }}>BPSO تحقق تغطية أعلى عند المستوى نفسه من الميزانية في الحالات الأربع.</div>
          </Show>
          <Show step={step} at={3}>
            <div style={{ background: C.gold, color: "#fff", borderRadius: 16, padding: 16 }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 20 }}>تناقص العوائد (Diminishing Returns):</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>  </div>
              <div style={{ fontSize: 17, fontWeight: 800, marginTop: 6, lineHeight: 1.45 }}> بعد تجاوز استثمار يقارب 140 M$، تصبح الزيادة الإضافية في التغطية محدودة مقارنة بالزيادة في التكلفة، مما يشير إلى بلوغ حدّ جدوى هندسي واقتصادي تتراجع بعده كفاءة الاستثمار في تحسين التغطية.</div>
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ 14 · Baselines ═════════════ */

export const C1Baselines: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(2);
  const methods = [
    { n: "BPSO", cov: CH4_RESULTS.bpso.coverage, cost: CH4_RESULTS.bpso.cost, en: CH4_RESULTS.bpso.energy, c: BPSO },
    { n: "AGA", cov: CH4_RESULTS.aga.coverage, cost: CH4_RESULTS.aga.cost, en: CH4_RESULTS.aga.energy, c: AGA },
    { n: "Std. GA", cov: CH4_RESULTS.stdGa.coverage, cost: CH4_RESULTS.stdGa.cost, en: CH4_RESULTS.stdGa.energy, c: STD },
    { n: "Random", cov: CH4_RESULTS.random.coverage, cost: CH4_RESULTS.random.cost, en: CH4_RESULTS.random.energy, c: RND },
  ];
  const bar = (v: number, max: number, min: number, color: string) => (
    <div style={{ flex: 1, height: 18, background: C.hair, borderRadius: 6 }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${((v - min) / (max - min)) * 100}%` }} transition={{ duration: 0.8 }} style={{ height: "100%", background: color, borderRadius: 6 }} />
    </div>
  );
  return (
    <ContribStage
      contribution={1}
      title="التقييم المقارن لأداء الخوارزميتين المقترحتين مقارنةً بالحل الأساسي والحل العشوائي"
      beats={["التغطية والكلفة والطاقة", "أثر الإصلاح مقابل العشوائية"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ display: "grid", gap: 14, flex: 1, alignContent: "center" }}>
        {[
          { title: "Coverage (%)", key: "cov" as const, max: 96, min: 86, better: "high" },
          { title: "Cost (M$)", key: "cost" as const, max: 155, min: 120, better: "low" },
          { title: "Energy (MWh)", key: "en" as const, max: 95, min: 70, better: "low" },
        ].map((m) => (
          <div key={m.title} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${C.hair}`, padding: "10px 14px" }}>
            <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, marginBottom: 6 }}>
              {m.title}
            </div>
            {methods.map((r) => (
              <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <span style={{ width: 84, fontFamily: "Inter, sans-serif", fontWeight: 900, color: r.c, fontSize: 15 }}>{r.n}</span>
                {bar(r[m.key], m.max, m.min, r.c)}
                <span style={{ width: 54, fontFamily: "Inter, sans-serif", fontWeight: 900 }}>{r[m.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Show step={step} at={2} style={{ marginTop: 8, display: "flex", gap: 10, justifyContent: "center" }}>
        <Chip color={C.ink}>زمن BPSO 118s · AGA 142s · Random 25s</Chip>
        <Chip color={C.green} solid>
          الاختيار العشوائي خط أساس ضعيف بوضوح
        </Chip>
      </Show>
    </ContribStage>
  );
};

/* ═════════════ 15 · Engineering decision ═════════════ */

export const C1Decision: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const rows = [
    { k: "Coverage", aga: "جيد", bpso: "الأفضل" },
    { k: "Cost", aga: "أعلى", bpso: "أقل" },
    { k: "Energy", aga: "أعلى", bpso: "أقل" },
    { k: "Convergence", aga: "أبطأ", bpso: "أسرع" },
    { k: "Stability", aga: "أفضل", bpso: "أدنى" },
    { k: "Runtime", aga: "142 s", bpso: "118 s" },
    { k: "Overall", aga: "قوي", bpso: "مفضّل" },
  ];
  const cell = (value: string, color: string, emphasize: boolean) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span
        dir={/[A-Za-z0-9]/.test(value) ? "ltr" : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 118,
          padding: "7px 18px",
          borderRadius: 999,
          fontSize: 24,
          fontWeight: 900,
          lineHeight: 1.15,
          fontFamily: /[A-Za-z0-9]/.test(value) ? "Inter, sans-serif" : undefined,
          color: emphasize ? "#fff" : color,
          background: emphasize ? color : `${color}18`,
          boxShadow: emphasize ? `0 6px 16px ${color}33` : "none",
        }}
      >
        {value}
      </span>
    </div>
  );
  return (
    <ContribStage
      contribution={1}
      title="أي خوارزمية نختار؟"
      beats={["مصفوفة القرار", "التوصية الأساسية", "متى تبقى AGA أفضل"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 18 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            border: `1px solid ${C.hair}`,
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 14px 36px rgba(15,23,42,0.07)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr 1fr",
              alignItems: "center",
              background: C.ink,
              padding: "16px 22px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>المعيار</span>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  background: AGA,
                  color: "#fff",
                  borderRadius: 999,
                  padding: "5px 18px",
                  fontSize: 20,
                  fontWeight: 900,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: 0.4,
                }}
              >
                AGA
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  background: BPSO,
                  color: "#fff",
                  borderRadius: 999,
                  padding: "5px 18px",
                  fontSize: 20,
                  fontWeight: 900,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: 0.4,
                }}
              >
                BPSO
              </span>
            </div>
          </div>
          {rows.map((r, i) => {
            const overall = r.k === "Overall";
            return (
              <div
                key={r.k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.15fr 1fr 1fr",
                  alignItems: "center",
                  flex: 1,
                  minHeight: 0,
                  padding: "0 22px",
                  background: overall ? "rgba(66,129,119,0.10)" : i % 2 ? "rgba(15,23,42,0.03)" : "#fff",
                  borderTop: overall ? "1px solid rgba(66,129,119,0.18)" : "1px solid rgba(15,23,42,0.05)",
                }}
              >
                <span
                  dir="ltr"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: overall ? 23 : 21,
                    fontWeight: 800,
                    letterSpacing: 0.2,
                    color: C.ink,
                  }}
                >
                  {r.k}
                </span>
                {cell(r.aga, AGA, r.aga === "أفضل" || overall)}
                {cell(r.bpso, BPSO, r.bpso === "الأفضل" || r.bpso === "أقل" || r.bpso === "أسرع" || r.bpso === "مفضّل" || overall)}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <Show step={step} at={2}>
            <div style={{ background: BPSO, color: "#fff", borderRadius: 18, padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 800, opacity: 0.85 }}>Recommended</div>
              <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4, lineHeight: 1.35 }}>BPSO لتخطيط الشبكة الإجمالي</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8, lineHeight: 1.5 }}>أفضل توازن بين التغطية والكلفة والطاقة والتقارب وزمن التنفيذ.</div>
            </div>
          </Show>
          <Show step={step} at={3}>
            <div style={{ background: "rgba(107,31,42,0.08)", borderRadius: 18, padding: 16, border: `1.5px solid ${AGA}` }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: AGA }}> **تُظهر خوارزمية AGA ملاءمة أكبر في الحالات التي تُعطى فيها الأولوية لاستقرار الأداء وقابلية تكرار النتائج عبر التشغيلات المستقلة.**
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.inkSoft, marginTop: 6, lineHeight: 1.5 }}> </div>
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};
