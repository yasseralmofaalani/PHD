import React from "react";
import { motion } from "framer-motion";
import { ArrowDefs, C, ContribStage, Draw, Pulse, ShowG, T, useBeats } from "./kit";

const SPINE = [
  { y: 62, ar: "البيانات", en: "DATA" },
  { y: 182, ar: "التحسين", en: "OPTIMIZATION" },
  { y: 302, ar: "العدالة المكانية", en: "SPATIAL FAIRNESS" },
  { y: 422, ar: "التحكم التشغيلي", en: "OPERATIONAL CONTROL" },
];

const AXES = [
  { n: "01", y: 182, ar: "التخطيط والتحسين الذكي للترقية", en: "Intelligent Upgrade Planning", tools: "BPSO · AGA", color: C.teal },
  { n: "02", y: 302, ar: "تأصيل العدالة المكانية (SFI)", en: "Spatial Fairness Modeling", tools: "SFI · قيد العدالة", color: C.maroon },
  { n: "03", y: 422, ar: "التحكم المكاني متعدد الموردين", en: "GIS-Assisted Multi-Vendor Control", tools: "GIS · Huawei · Ericsson", color: "#1f6f78" },
];

export const ContribOpening: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  return (
    <ContribStage
      contribution={0}
      title="المساهمات البحثية المحورية"
      beats={["المنظومة البحثية المتكاملة", "المحور الأول: التخطيط والتحسين", "المحور الثاني: العدالة المكانية", "المحور الثالث: التحكم التشغيلي", "آلية إصلاح القيود: الرابط المنهجي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <svg viewBox="0 0 1000 490" style={{ width: "100%", height: "100%" }}>
        <ArrowDefs colors={{ "op-a": C.teal, "op-r": C.gold }} />

        {/* Spine */}
        <Draw d="M450 86 V 398" color={C.teal} width={3} arrow="op-a" duration={1.2} />
        <Pulse d="M450 86 V 398" color={C.gold} r={5} dur={2.6} />
        {SPINE.map((s, i) => (
          <motion.g key={s.en} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 * i, duration: 0.5 }} style={{ transformOrigin: `450px ${s.y}px` }}>
            <rect x={340} y={s.y - 26} width={220} height={52} rx={26} fill={i === 0 ? C.ink : "#fff"} stroke={C.ink} strokeWidth={1.6} />
            <T x={450} y={s.y - 7} size={17} weight={900} fill={i === 0 ? "#fff" : C.ink}>
              {s.ar}
            </T>
            <T x={450} y={s.y + 13} size={10.5} weight={800} latin fill={i === 0 ? "rgba(255,255,255,0.7)" : C.inkMuted}>
              {s.en}
            </T>
          </motion.g>
        ))}

        {/* Three axes */}
        {AXES.map((a, i) => (
          <ShowG key={a.n} step={step} at={i + 2}>
            <Draw d={`M560 ${a.y} H 618`} color={a.color} width={2.4} />
            <rect x={620} y={a.y - 46} width={360} height={92} rx={16} fill="#fff" stroke={a.color} strokeWidth={2} />
            <rect x={900} y={a.y - 46} width={80} height={92} rx={16} fill={a.color} />
            <rect x={900} y={a.y - 46} width={20} height={92} fill={a.color} />
            <T x={940} y={a.y} size={34} weight={900} latin fill="#fff">
              {a.n}
            </T>
            <T x={760} y={a.y - 20} size={17} weight={900}>
              {a.ar}
            </T>
            <T x={760} y={a.y + 4} size={12} weight={800} latin fill={C.inkMuted}>
              {a.en}
            </T>
            <T x={760} y={a.y + 27} size={12.5} weight={800} fill={a.color}>
              {a.tools}
            </T>
          </ShowG>
        ))}

        {/* Constraint repair thread across axes 01 and 02 */}
        <ShowG step={step} at={5}>
          <Draw d="M340 182 H 250" color={C.gold} width={2.4} arrow="op-r" />
          <Draw d="M340 302 H 250" color={C.gold} width={2.4} arrow="op-r" delay={0.2} />
          <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <rect x={40} y={138} width={206} height={208} rx={22} fill="rgba(200,149,26,0.12)" stroke={C.gold} strokeWidth={2.2} strokeDasharray="7 5" />
            <T x={143} y={196} size={20} weight={900} fill="#8a6410">
              إصلاح القيود
            </T>
            <T x={143} y={222} size={12} weight={800} latin fill="#8a6410">
              CONSTRAINT REPAIR
            </T>
            <T x={143} y={262} size={13} weight={800} fill={C.inkSoft}>
            آلية تنسيق وتوجيه مشتركة            </T>
            <T x={143} y={286} size={13} weight={800} fill={C.inkSoft}>
              بين المحورين 01 و 02
            </T>
          </motion.g>
        </ShowG>
      </svg>
    </ContribStage>
  );
};
