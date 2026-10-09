import React from "react";
import { motion } from "framer-motion";
import { C, Chip, ContribStage, Formula, Show, hexPts, useBeats } from "./kit";
import { CH6_EXPERIMENT, ISOLATION_BY_ENV } from "./facts";

/* ═════════════ III-7 · Restoration & verification ═════════════ */

const REST_STEPS = [
  { t: "التحقق من ترخيص اكتمال العملية", g: 1, tag: "العزل" },
  { t: "استعادة تكوينات الخدمة الخاصة بالمورد", g: 2, tag: "التراجع" },
  { t: "مزامنة ونشر الشبكة الجوهرية", g: 2, tag: "المزامنة" },
  { t: "إعادة تنشيط القطاعات الراديوية", g: 3, tag: "إعادة التنشيط" },
  { t: "إعادة اتصال المستخدم واستعادة الجلسة", g: 3, tag: "" },
  { t: "التحقق من طبيعية مؤشرات الأداء", g: 4, tag: "فحص KPI" },
  { t: "تأكيد التشغيل المستقر للشبكة", g: 4, tag: "شبكة مستعادة" },
];

export const C3Restoration: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const done = REST_STEPS.filter((s) => s.g <= step).length;
  return (
    <ContribStage
      contribution={3}
      title="إجراءات استعادة الخدمة والتحقق من الاستقرار التشغيلي"
      beats={["حالة العزل النشط", "التراجع ومزامنة الشبكة الجوهرية", "إعادة تنشيط طبقة النفاذ الراديوي (RAN)", "التحقق من مؤشرات الأداء (KPIs)", "تحليل مكونات كمون الاستعادة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ position: "relative", padding: "0 10px" }}>
          <div style={{ position: "absolute", top: 34, right: 40, left: 40, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
          <motion.div initial={false} animate={{ width: `calc(${(Math.max(done - 1, 0) / (REST_STEPS.length - 1)) * 100}% - ${(Math.max(done - 1, 0) / (REST_STEPS.length - 1)) * 80}px)` }} transition={{ duration: 0.9 }} style={{ position: "absolute", top: 34, right: 40, height: 8, borderRadius: 4, background: `linear-gradient(270deg, ${C.gold}, ${C.green})` }} />
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${REST_STEPS.length}, 1fr)`, gap: 8, position: "relative" }}>
            {REST_STEPS.map((s, i) => {
              const on = s.g <= step;
              return (
                <div key={s.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                  <div style={{ height: 22, fontSize: 19, fontWeight: 900, color: on ? C.gold : "transparent" }}>{s.tag}</div>
                  <motion.div
                    animate={{ scale: on ? 1 : 0.8, background: on ? (i === REST_STEPS.length - 1 ? C.green : C.cyan) : "rgba(255,255,255,0.08)" }}
                    style={{ width: 34, height: 34, borderRadius: 17, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontWeight: 900, color: C.night }}
                  >
                    {i + 1}
                  </motion.div>
                  <div style={{ fontSize: 18.6, fontWeight: 800, color: on ? C.nightInk : C.nightInkSoft, opacity: on ? 1 : 0.45, lineHeight: 1.5 }}>{s.t}</div>
                </div>
              );
            })}
          </div>
        </div>

        <Show step={step} at={5} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18, alignItems: "center" }}>
          <div>
            <Formula dark size={18}>
              T<sub>restore</sub> = T<sub>propagation</sub> + T<sub>core sync</sub> + T<sub>cell reactivation</sub> + T<sub>UE recovery</sub>
            </Formula>
            <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden", marginTop: 10, direction: "ltr" }}>
              {[C.gold, C.cyan, C.g4, C.green].map((c, i) => (
                <motion.div key={c} initial={{ flex: 0 }} animate={{ flex: 1 }} transition={{ delay: i * 0.15 }} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 19.3, fontWeight: 800, color: C.nightInkSoft }}>2G / 3G: إعادة تفعيل تعريفات الخدمة وسجلات التوجيه في BSC وRNC وMSC</div>
            <div style={{ fontSize: 19.3, fontWeight: 800, color: C.nightInk }}>4G: مزامنة EPC · استرداد قنوات الحامل (Bearers) · التراجع عن قوائم ACL · إعادة إنشاء جلسة LTE</div>
          </div>
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ III-8 · Operational results by environment ═════════════ */

const EnvScene: React.FC<{ r: number; spill: number }> = ({ r, spill }) => {
  const cells: Array<[number, number]> = [];
  const w = r * Math.sqrt(3);
  for (let row = -1; row < 220 / (r * 1.5) + 1; row++) {
    for (let col = -1; col < 300 / w + 1; col++) cells.push([col * w + (row % 2 ? w / 2 : 0), row * r * 1.5]);
  }
  return (
    <svg viewBox="0 0 300 200" style={{ width: "100%", height: "100%" }}>
      <defs>
        <pattern id={`hatch-${r}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={8} stroke={C.red} strokeWidth={3} strokeOpacity={0.55} />
        </pattern>
        <clipPath id={`clip-${r}`}>
          <rect x={0} y={0} width={300} height={200} rx={12} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${r})`}>
        <ellipse cx={150} cy={100} rx={62 + spill * 2.4} ry={46 + spill * 1.8} fill={`url(#hatch-${r})`} />
        {cells.map(([x, y], i) => (
          <polygon key={i} points={hexPts(x, y, r - 1)} fill="none" stroke="rgba(79,184,171,0.45)" strokeWidth={1} />
        ))}
        <path d="M110 70 L180 60 L200 100 L175 140 L120 135 L100 100 Z" fill="rgba(200,149,26,0.22)" stroke={C.gold} strokeWidth={2.6} />
      </g>
    </svg>
  );
};

const EnvMetric: React.FC<{ label: string; value: number; ci?: string; color: string }> = ({ label, value, ci, color }) => (
  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "6px 8px", borderTop: `3px solid ${color}` }}>
    <div style={{ fontSize: 19, fontWeight: 800, color: C.nightInkSoft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
    <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: "clamp(23px, 2.32vw, 35.4px)", color, textAlign: "right", lineHeight: 1.15 }}>
      {value}%
    </div>
    <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 700, color: C.nightInkSoft, textAlign: "right", minHeight: 13 }}>
      {ci ?? ""}
    </div>
  </div>
);

export const C3OperationalResults: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const scenes = [{ r: 12 }, { r: 22 }, { r: 40 }];
  return (
    <ContribStage
      contribution={3}
      title="تقييم الأداء التشغيلي وفق البيئات الجغرافية"
      beats={["البيئة الحضرية الكثيفة", "البيئة شبه الحضرية", "البيئة الريفية", "ارتباط التسريب المكاني بكثافة البنية التحتية"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source={``}
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "minmax(0, 1fr)", gap: 14 }}>
        {ISOLATION_BY_ENV.map((e, i) => (
          <Show key={e.env} step={step} at={i + 1} from="up" style={{ display: "flex", flexDirection: "column", gap: 8, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${i === 2 ? C.red : "rgba(79,184,171,0.3)"}`, borderRadius: 18, padding: 12, minHeight: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 23.6, fontWeight: 900 }}>{e.env}</span>
              <Chip color={i === 0 ? C.cyan : i === 1 ? C.gold : C.red} dark>
                {i === 0 ? "خلايا صغرية Micro · كثافة عالية" : i === 1 ? "بيئة متوسطة الكثافة" : "خلايا ماكرو Macro · كثافة منخفضة"}
              </Chip>
            </div>
            <div style={{ flex: 1, minHeight: 40, borderRadius: 12, background: "rgba(0,0,0,0.25)", overflow: "hidden" }}>
              <EnvScene r={scenes[i].r} spill={e.spillover} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr", gap: 6 }}>
              <EnvMetric label="دقة العزل" value={e.accuracy} ci={e.accuracyCi} color={C.cyan} />
              <EnvMetric label="الانتشار غير المقصود" value={e.spillover} ci={e.spilloverCi} color={i === 2 ? C.red : C.gold} />
              <EnvMetric label="التأثير الجانبي" value={e.collateral} color={C.nightInkSoft} />
            </div>
          </Show>
        ))}
      </div>
     
    </ContribStage>
  );
};
