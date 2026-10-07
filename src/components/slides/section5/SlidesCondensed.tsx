import React from "react";
import { motion } from "framer-motion";
import { Scale, Sliders, Target } from "lucide-react";
import { slideContainerStyle, techGridStyle, SlideHeader, SectionBadge, SlideFooter } from "./shared";
import { useStepReveal } from "../../../hooks/useStepReveal";
import { C, CONTRIB, EASE } from "../results/stage";
import { IMPACT } from "../results/facts";
import { alpha } from "../../design/tokens";

/**
 * Condensed conclusion section — three slides (conclusions, recommendations,
 * limits → future work). Content follows thesis Chapter 7 (§1.7, §1.2.7,
 * §2.2.7, §3.7).
 */

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  border: "1px solid rgba(15,23,42,0.10)",
  boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
  boxSizing: "border-box",
};

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "relative", zIndex: 5, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>{children}</div>
);

const Reveal: React.FC<{ on: boolean; children: React.ReactNode; style?: React.CSSProperties }> = ({ on, children, style }) => (
  <motion.div animate={{ opacity: on ? 1 : 0.1, y: on ? 0 : 12 }} transition={{ duration: 0.5, ease: EASE }} style={style}>
    {children}
  </motion.div>
);

const Banner: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.teal }) => (
  <div style={{ textAlign: "center", fontSize: "clamp(21.1px, 1.83vw, 26px)", fontWeight: 900, lineHeight: 1.6, background: alpha(color, 0.09), border: `1px solid ${alpha(color, 0.3)}`, borderRadius: 14, padding: "9px 20px" }}>{children}</div>
);

/* ═════════════ 1 · Conclusions ═════════════ */

const CONCLUSIONS = [
  {
    k: 1 as const,
    icon: <Target size={22} color="#fff" />,
    title: "تخطيط ترقية 5G متعدد الأهداف",
    body: "نموذج يوازن التغطية والكلفة والطاقة على شبكة حقيقية، بخوارزميتي AGA وBPSO وآلية مشتركة لإصلاح القيود",
    evidence: ["تغطية 95.12%", "كلفة −6.0%", "طاقة −5.3%"],
  },
  {
    k: 2 as const,
    icon: <Scale size={22} color="#fff" />,
    title: "العدالة المكانية قيداً في القرار",
    body: "مؤشر العدالة SFI يدخل نموذج الترقية فيحدّ من التمركز الحضري دون التضحية بالكفاءة",
    evidence: ["SFI 0.52 → 0.71", "خسارة تغطية ≤ 0.1%"],
  },
  {
    k: 3 as const,
    icon: <Sliders size={22} color="#fff" />,
    title: "تحكم مكاني بديل عن التشويش",
    body: "طبقة تنسيق متعددة الموردين تعتمد GIS لعزل الخدمة جغرافياً واستعادتها بشكل قابل للتراجع",
    evidence: ["عزل 97.5% حضرياً", "تنسيق 98.1% / 97.4%"],
  },
];

export const SlideS5_Conclusions: React.FC = () => {
  const { step, totalSteps, goNext } = useStepReveal({ totalSteps: 4, initialStep: 1 });
  return (
    <div style={{ ...slideContainerStyle, cursor: step < totalSteps ? "pointer" : "default" }} dir="rtl" onClick={() => step < totalSteps && goNext()}>
      <div style={techGridStyle} />
      <SlideHeader titleAr="الاستنتاجات: ماذا قدّمت الأطروحة؟" badge={<SectionBadge text="Conclusions — Ch.7 §1.7" variant="primary" />} />
      <Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {CONCLUSIONS.map((c, i) => {
            const t = CONTRIB[c.k];
            return (
              <Reveal key={c.title} on={step >= i + 1} style={{ ...card, borderTop: `5px solid ${t.color}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
                  <span style={{ fontSize: 19, fontWeight: 900, color: t.color }}>{t.ordinal}</span>
                </div>
                <div style={{ fontSize: "clamp(23px, 1.95vw, 27.6px)", fontWeight: 900, lineHeight: 1.4 }}>{c.title}</div>
                <div style={{ fontSize: 19.8, fontWeight: 700, color: C.inkSoft, lineHeight: 1.7 }}>{c.body}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                  {c.evidence.map((e) => (
                    <span key={e} style={{ fontSize: 18.6, fontWeight: 800, color: t.color, background: t.soft, borderRadius: 999, padding: "3px 12px" }}>
                      {e}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal on={step >= 4}>
          <Banner>أظهرت المقارنة تفوق BPSO في سرعة التقارب (118 ث مقابل 142 ث) وجودة الحلول، بينما تميزت AGA باستقرار إحصائي أعلى — ما يمنح المشغل مرونة المواءمة بحسب أهدافه التشغيلية</Banner>
        </Reveal>
      </Body>
      <SlideFooter slideLabel="الاستنتاجات" />
    </div>
  );
};

/* ═════════════ 2 · Recommendations ═════════════ */

export const SlideS5_Recommendations: React.FC = () => {
  const { step, totalSteps, goNext } = useStepReveal({ totalSteps: IMPACT.length, initialStep: 1 });
  return (
    <div style={{ ...slideContainerStyle, cursor: step < totalSteps ? "pointer" : "default" }} dir="rtl" onClick={() => step < totalSteps && goNext()}>
      <div style={techGridStyle} />
      <SlideHeader titleAr="التوصيات العملية للمشغّل وصانع القرار" badge={<SectionBadge text="" variant="accent" />} />
      <Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {IMPACT.map((m, i) => {
            const t = CONTRIB[m.contribution];
            return (
              <Reveal key={m.title} on={step >= i + 1} style={{ ...card, borderRight: `7px solid ${t.color}`, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 8, minHeight: 170 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 37.8, fontWeight: 900, color: alpha(t.color, 0.35) }}>{`0${i + 1}`}</span>
                  <span style={{ fontSize: 19, fontWeight: 900, color: "#fff", background: t.color, borderRadius: 6, padding: "1px 9px" }}>{t.ordinal}</span>
                </div>
                <div style={{ fontSize: "clamp(23px, 1.95vw, 27.6px)", fontWeight: 900 }}>{m.title}</div>
                <div style={{ fontSize: 19.8, fontWeight: 700, color: C.inkSoft, lineHeight: 1.7 }}>{m.body}</div>
                <span style={{ marginTop: "auto", alignSelf: "flex-start", fontSize: 19.3, fontWeight: 900, color: t.color, background: t.soft, borderRadius: 999, padding: "4px 14px" }}>{m.evidence}</span>
              </Reveal>
            );
          })}
        </div>
      </Body>
      <SlideFooter slideLabel="التوصيات" />
    </div>
  );
};
