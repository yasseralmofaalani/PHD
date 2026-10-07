import React from "react";
import { motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { IMPACT, LIMITS } from "./facts";
import { C, CONTRIB, ContribKey, ResStage, Show, ShowG, T, useBeats } from "./stage";

/* ═════════════ R-19 · What did the experiments prove? ═════════════ */

const PROVED: Array<{ k: ContribKey; claim: string; evidence: string[] }> = [
  {
    k: 1,
    claim: "إمكانية تعظيم التغطية الراديوية مع خفض متزامن للكلفة الرأسمالية واستهلاك الطاقة على شبكة وطنية فعلية",
    evidence: ["تغطية 95.12%", "كلفة −6.0%", "طاقة −5.3%", "p < 0.001"],
  },
  {
    k: 2,
    claim: "تضمين العدالة المكانية كقيد إلزامي لا يضر بالأداء التقني للتغطية متى ما صُمم نموذج الاستمثال بدقة",
    evidence: ["SFI 0.52 → 0.71", "خسارة تغطية ≤ 0.1%"],
  },
  {
    k: 3,
    claim: "جدوى العزل المكاني من جانب الشبكة بدقة عالية، مع وجود علاقة عكسية مثبتة بين التسرب وكثافة المحطات",
    evidence: ["حضري 97.5%", "شبه حضري 94.2%", "ريفي 89.6%"],
  },
  {
    k: 3,
    claim: "إمكانية حوكمة التحكم التشغيلي والاستعادة عبر بيئات متعددة المصنعين من خلال طبقة تجريد موحدة",
    evidence: ["تنسيق 98.1% / 97.4%", "استعادة < 5 · 7 · 10 دقائق"],
  },
];

export const ResProved: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(PROVED.length);
  return (
    <ResStage
      phase={5}
      question="ما الخلاصات الهندسية الجوهرية المثبتة تجريبياً؟"
      title="الخلاصات التجريبية الرئيسية المدعومة بالبراهين الإحصائية"
      beats={["الخلاصة الأولى", "الخلاصة الثانية", "الخلاصة الثالثة", "الخلاصة الرابعة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
     source=""
    >
      <div style={{ flex: 1, minHeight: 0, position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 18 }}>
        {PROVED.map((p, i) => {
          const c = CONTRIB[p.k];
          return (
            <Show key={p.claim} step={step} at={i + 1} from="scale" style={{ minHeight: 0 }}>
              <div
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  background: "#fff",
                  borderRadius: 18,
                  border: `1px solid ${C.hair}`,
                  borderRight: `6px solid ${c.color}`,
                  boxShadow: step === i + 1 ? `0 16px 36px ${alpha(c.color, 0.18)}` : "0 8px 22px rgba(15,23,42,0.05)",
                  padding: "14px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transition: "box-shadow .3s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 35.4, fontWeight: 900, color: alpha(c.color, 0.35) }}>{`0${i + 1}`}</span>
                  <span style={{ fontSize: 19, fontWeight: 900, color: c.color }}>{c.ordinal}</span>
                </div>
                <div style={{ fontSize: "clamp(21.8px, 1.89vw, 27.3px)", fontWeight: 900, lineHeight: 1.5 }}>{p.claim}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                  {p.evidence.map((e) => (
                    <span key={e} style={{ fontSize: 18.6, fontWeight: 800, color: c.color, background: c.soft, borderRadius: 999, padding: "3px 12px" }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </Show>
          );
        })}
        <Show step={step} at={1} style={{ position: "absolute", left: "50%", top: "50%", zIndex: 3, pointerEvents: "none" }}>
          <div
            style={{
              transform: "translate(-50%, -50%)",
              width: 92,
              height: 92,
              borderRadius: "50%",
              background: C.ink,
              color: "#fff",
              border: `3px solid ${C.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 19.8,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            البرهان
            <br />
            التجريبي
          </div>
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-21 · Result → contribution ═════════════ */

const LINKS: Array<{ k: ContribKey; text: string }> = [
  { k: 1, text: "تغطية 95.12%" },
  { k: 1, text: "توفير كلفة 6.0% وطاقة 5.3%" },
  { k: 1, text: "تنفيذ أسرع 16% · استقرار أعلى لـ AGA" },
  { k: 1, text: "عائد متناقص بعد ≈140 M$" },
  { k: 2, text: "SFI ‏0.71 مقابل 0.52 (+36.5%)" },
  { k: 2, text: "خسارة تغطية ≤ 0.1%" },
  { k: 3, text: "دقة عزل 97.5% حضرياً" },
  { k: 3, text: "نجاح تنسيق 98.1% / 97.4%" },
  { k: 3, text: "استعادة < 5 · 7 · 10 دقائق" },
];

export const ResResultToContribution: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const ry = (i: number) => 34 + i * 58;
  const cy = (k: ContribKey) => (k === 1 ? 120 : k === 2 ? 300 : 445);
  return (
    <ResStage
      phase={5}
      question="كيف تترابط النتائج الرقمية مع المساهمات العلمية للأطروحة؟"
      title="مصفوفة الربط بين الدلائل القياسية والمساهمات الأكاديمية"
      beats={["المساهمة الأولى", "المساهمة الثانية", "المساهمة الثالثة", "الصورة الكاملة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg viewBox="0 0 1400 540" style={{ width: "100%", height: "100%" }}>
          {([1, 2, 3] as const).map((k) => {
            const c = CONTRIB[k];
            const active = step >= k;
            return (
              <g key={k} opacity={active ? 1 : 0.25} style={{ transition: "opacity .4s" }}>
                <rect x={1010} y={cy(k) - 56} width={370} height={112} rx={18} fill={active ? c.color : "#fff"} stroke={c.color} strokeWidth={2} />
                <T x={1195} y={cy(k) - 20} size={15} weight={800} fill={active ? "rgba(255,255,255,0.8)" : c.color}>
                  {c.ordinal}
                </T>
                <T x={1195} y={cy(k) + 14} size={21} weight={900} fill={active ? "#fff" : c.color}>
                  {c.short}
                </T>
              </g>
            );
          })}
          {LINKS.map((l, i) => {
            const c = CONTRIB[l.k];
            const y = ry(i);
            return (
              <ShowG key={l.text} step={step} at={l.k}>
                <motion.path
                  d={`M 560 ${y} C 780 ${y}, 800 ${cy(l.k)}, 1006 ${cy(l.k)}`}
                  fill="none"
                  stroke={alpha(c.color, step === 4 ? 0.5 : 0.75)}
                  strokeWidth={2.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 * (i % 4) }}
                />
                <rect x={40} y={y - 22} width={520} height={44} rx={12} fill="#fff" stroke={alpha(c.color, 0.5)} />
                <rect x={552} y={y - 22} width={8} height={44} rx={3} fill={c.color} />
                <T x={530} y={y + 1} size={16.5} anchor="start" weight={900}>
                  {l.text}
                </T>
              </ShowG>
            );
          })}
        </svg>
      </div>
      <Show step={step} at={4} style={{ textAlign: "center", fontSize: "clamp(21.1px, 1.77vw, 26px)", fontWeight: 900 }}>
        تستند كل مساهمة إلى برهان كمي مقيس ومستقل، وتتكامل مجتمعة لتشكل منظومة موحدة للتخطيط والتحكم المكاني في الشبكات الخلوية.
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-22 · Practical impact ═════════════ */

export const ResImpact: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(IMPACT.length);
  return (
    <ResStage
      phase={5}
      question="ما هي التوصيات التطبيقية المستخلصة للجهات التنظيمية ومشغلي الاتصالات؟"
      title="الأثر التطبيقي: خارطة التوصيات التشغيلية والاستراتيجية"
      beats={IMPACT.map((m) => m.title)}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 7 · §2.2.7"
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        {IMPACT.map((m, i) => {
          const c = CONTRIB[m.contribution];
          return (
            <Show key={m.title} step={step} at={i + 1} from="right">
              <div style={{ display: "grid", gridTemplateColumns: "250px 1fr 260px", alignItems: "center", gap: 16, background: "#fff", borderRadius: 16, border: `1px solid ${C.hair}`, padding: "12px 18px", boxShadow: "0 8px 22px rgba(15,23,42,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, alignSelf: "stretch", borderRadius: 4, background: c.color }} />
                  <div>
                    <div style={{ fontSize: 19, fontWeight: 900, color: c.color }}>{c.ordinal}</div>
                    <div style={{ fontSize: 23.6, fontWeight: 900 }}>{m.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 19.8, fontWeight: 700, color: C.inkSoft, lineHeight: 1.6 }}>{m.body}</div>
                <div style={{ justifySelf: "end", fontSize: 19.1, fontWeight: 900, color: c.color, background: c.soft, borderRadius: 999, padding: "5px 14px", whiteSpace: "nowrap" }}>{m.evidence}</div>
              </div>
            </Show>
          );
        })}
      </div>
    </ResStage>
  );
};

/* ═════════════ R-23 · Limits of generalisation ═════════════ */

export const ResLimits: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(2);
  return (
    <ResStage
      phase={5}
      question="ما هو النطاق المحدد لصحة النتائج وما المتطلبات المنهجية لتعميمها؟"
      title="محددات التعميم والآفاق التطويرية"
      beats={["الحدود المعلنة", "ماذا تعني"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الفصل 7 · §1.2.7 — الفصل 6 · §5.6"
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, alignContent: "center" }}>
        {LIMITS.map((l, i) => (
          <motion.div
            key={l.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.45 }}
            style={{ background: "#fff", borderRadius: 16, border: `1px solid ${C.hair}`, borderTop: `4px solid ${alpha(C.ink, 0.55)}`, padding: "14px 14px", display: "flex", flexDirection: "column", gap: 6, minHeight: 210 }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 27.3, fontWeight: 900, color: alpha(C.ink, 0.25) }}>{`0${i + 1}`}</div>
            <div style={{ fontSize: 23, fontWeight: 900 }}>{l.title}</div>
            <div style={{ fontSize: 18.6, fontWeight: 700, color: C.inkSoft, lineHeight: 1.65 }}>{l.body}</div>
            <div style={{ marginTop: "auto", fontSize: 18, fontWeight: 800, color: C.inkMuted }}>{l.source}</div>
          </motion.div>
        ))}
      </div>
      <Show step={step} at={2} style={{ marginTop: 14 }}>
        <div style={{ textAlign: "center", fontSize: "clamp(21.1px, 1.77vw, 26px)", fontWeight: 900, lineHeight: 1.6 }}>
          تتسم النتائج بموثوقية عالية ضمن نطاق شروطها المحددة، ويشكل كل محدد منطلقاً واضحاً لمسارات البحث المستقبلية.
        </div>
      </Show>
    </ResStage>
  );
};
