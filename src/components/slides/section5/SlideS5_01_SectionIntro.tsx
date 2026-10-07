import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
  SlideFooter,
} from "./shared";
import { fadeUp, staggerParent } from "../../design/motion";
import { assetUrl } from "../../../lib/assets";
import {
  AlertCircle,
  Layers3,
  Cpu,
  Target,
  ChevronDown,
} from "lucide-react";

const FLOW = [
  {
    q: "ما جوهر الإشكالية الهندسية؟",
    body: "معضلة تخطيط وترقية الشبكات الخلوية في بيئة هجينة متعددة الأجيال تحت قيود مكانية وتشغيلية متضاربة",
    icon: AlertCircle,
    color: "#6b1f2a",
  },
  {
    q: "ما الإطار المنهجي المقترح؟",
    body: "منظومة متكاملة تدمج نظم المعلومات الجغرافية (GIS) مع الاستمثال الرياضي وتخطيط الشبكات الخلوية",
    icon: Layers3,
    color: "#428177",
  },
  {
    q: "ما الإضافات الخوارزمية والرياضية؟",
    body: "خوارزميات AGA و BPSO مع آلية حتمية لإصلاح القيود ونمذجة قيد العدالة المكانية (SFI)",
    icon: Cpu,
    color: "#2e7d5b",
  },
  {
    q: "ما المخرجات والتحقق التطبيقي؟",
    body: "قرارات تخطيطية قابلة للقياس الميداني: موازنة التغطية والكلفة والطاقة مع كسر التمركز الحضري",
    icon: Target,
    color: "#428177",
  },
] as const;

export const SlideS5_01_SectionIntro: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${assetUrl("syria-network-bg.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          pointerEvents: "none",
          filter: "grayscale(40%)",
          zIndex: 0,
        }}
      />

      <SlideHeader
        titleAr="الخاتمة — الحصيلة العلمية والهندسية للأطروحة"
        badge={
          <SectionBadge text="Visual Overview · القسم 05" variant="primary" />
        }
      />

      <motion.div
        variants={staggerParent(0.05, 0)}
        initial={reduce ? undefined : "hidden"}
        animate="visible"
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 4% 12px",
        }}
      >
        <motion.p
          variants={fadeUp}
          style={{
            margin: "0 0 16px",
            fontSize: "19.8px",
            fontWeight: 800,
            color: "#2c5952",
            textAlign: "center",
          }}
        >
          مسار بحثي تكاملي: من تشخيص الإشكالية إلى البناء الخوارزمي والتحقق التجريبي المقاس
        </motion.p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "min(920px, 100%)",
            gap: 0,
          }}
        >
          {FLOW.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === FLOW.length - 1;
            return (
              <React.Fragment key={step.q}>
                <motion.div
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    gap: "16px",
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: `2px solid ${step.color}30`,
                    borderRight: `5px solid ${step.color}`,
                    padding: "14px 18px",
                    boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: `${step.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={step.color} strokeWidth={2.2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "21.8px",
                        fontWeight: 900,
                        color: step.color,
                        marginBottom: "4px",
                      }}
                    >
                      {step.q}
                    </div>
                    <div
                      style={{
                        fontSize: "19.8px",
                        fontWeight: 700,
                        color: "#1e293b",
                        lineHeight: 1.45,
                      }}
                    >
                      {step.body}
                    </div>
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: step.color,
                      color: "#fff",
                      fontSize: "19px",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                </motion.div>
                {!isLast && (
                  <motion.div
                    variants={fadeUp}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "4px 0",
                      color: "#428177",
                    }}
                  >
                    <ChevronDown size={22} strokeWidth={2.5} />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      <SlideFooter slideLabel="Slide 01 · Section 05 · Visual Overview" />
    </div>
  );
};
