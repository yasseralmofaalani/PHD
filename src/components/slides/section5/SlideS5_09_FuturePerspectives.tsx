import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Network,
  Radio,
  Satellite,
  Boxes,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { slideContainerStyle, techGridStyle, SlideHeader, SectionBadge, SlideFooter } from "./shared";
import { useStepReveal } from "../../../hooks/useStepReveal";
import { C, EASE } from "../results/stage";
import { alpha } from "../../design/tokens";

const TEAL = "#428177";
const MAROON = "#6b1f2a";
const GOLD = "#c8951a";

type Horizon = {
  n: string;
  title: string;
  claim: string;
  color: string;
  icon: LucideIcon;
  axis: string;
};

const HORIZONS: Horizon[] = [
  {
    n: "01",
    title: "تخطيط ذكي ديناميكي",
    claim: "دمج نماذج التنبؤ بالطلب مع خوارزميات التحسين لدعم قرارات ترقية أكثر استجابة لتغيّر الحركة.",
    color: TEAL,
    icon: Network,
    axis: "تخطيط",
  },
  {
    n: "02",
    title: "ذكاء اصطناعي تكيّفي",
    claim: "توظيف التعلم الآلي والتعلم المعزز للانتقال من التخطيط الساكن إلى تحكم استباقي يتكيّف مع الشبكة.",
    color: TEAL,
    icon: Brain,
    axis: "تخطيط",
  },
  {
    n: "03",
    title: "تنسيق أوسع للموردين",
    claim: "دعم مزيد من مورّدي الشبكة وتعزيز قابلية التشغيل البيني في البيئات الخلوية غير المتجانسة.",
    color: MAROON,
    icon: Boxes,
    axis: "تشغيل",
  },
  {
    n: "04",
    title: "تكامل مع الشبكات المفتوحة",
    claim: "دراسة دمج الإطار مع O-RAN وRIC وxApps لتحقيق تحكم أكثر مرونة في الشبكات المستقبلية.",
    color: MAROON,
    icon: Radio,
    axis: "تشغيل",
  },
  {
    n: "05",
    title: "التوسع نحو شبكات 6G",
    claim: "تكييف الإطار مع متطلبات الجيل السادس، بما فيها البنى الراديوية الحديثة وتقنيات التحكم البرمجي.",
    color: GOLD,
    icon: Satellite,
    axis: "أفق تقني",
  },
  {
    n: "06",
    title: "التوأم الرقمي للشبكة",
    claim: "بناء نموذج رقمي يحاكي الشبكة وبيئتها الجغرافية لاختبار سيناريوهات الترقية والتحكم قبل التطبيق الميداني.",
    color: GOLD,
    icon: Layers,
    axis: "أفق تقني",
  },
];

export const SlideS5_09_FuturePerspectives: React.FC = () => {
  const { step, totalSteps, goNext } = useStepReveal({ totalSteps: 4, initialStep: 1 });
  const visibleCount = step === 1 ? 2 : step === 2 ? 4 : 6;

  return (
    <div
      style={{ ...slideContainerStyle, cursor: step < totalSteps ? "pointer" : "default" }}
      dir="rtl"
      onClick={() => step < totalSteps && goNext()}
    >
      <div style={techGridStyle} />
      <SlideHeader
        titleAr="الآفاق المستقبلية"
        badge={<SectionBadge text="أجندة بحثية · الفصل السابع" variant="primary" />}
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
       

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {HORIZONS.map((h, i) => {
            const on = i < visibleCount;
            const Icon = h.icon;
            return (
              <motion.div
                key={h.n}
                animate={{
                  opacity: on ? 1 : 0.12,
                  y: on ? 0 : 10,
                }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: `1.5px solid ${on ? alpha(h.color, 0.35) : "rgba(15,23,42,0.08)"}`,
                  borderTop: `5px solid ${h.color}`,
                  boxShadow: on ? "0 8px 22px rgba(15,23,42,0.07)" : "none",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 11,
                      background: alpha(h.color, 0.12),
                      color: h.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 900,
                        color: h.color,
                        background: alpha(h.color, 0.1),
                        borderRadius: 999,
                        padding: "2px 10px",
                      }}
                    >
                      {h.axis}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 18,
                        fontWeight: 900,
                        color: h.color,
                      }}
                    >
                      {h.n}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "clamp(20px, 1.7vw, 24px)",
                    fontWeight: 900,
                    color: C.ink,
                    lineHeight: 1.3,
                  }}
                >
                  {h.title}
                </div>
                <div
                  style={{
                    fontSize: 17.5,
                    fontWeight: 700,
                    color: C.inkSoft,
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {h.claim}
                </div>
              </motion.div>
            );
          })}
        </div>

        
      </div>

      <SlideFooter slideLabel=" " />
    </div>
  );
};
