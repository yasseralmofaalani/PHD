import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
  SlideFooter,
} from "./shared";
import { ThesisImage } from "../../ui/ThesisImage";
import { fadeUp, staggerParent } from "../../design/motion";
import {
  Database,
  Map,
  Cpu,
  Radio,
  GitBranch,
  ArrowLeft,
} from "lucide-react";

const PIPELINE = [
  { label: "Spatial Data", labelAr: "البيانات المكانية", icon: Database },
  { label: "GIS", labelAr: "نظم المعلومات الجغرافية", icon: Map },
  { label: "Optimization", labelAr: "الاستمثال الرياضي", icon: Cpu },
  { label: "Network Planning", labelAr: "تخطيط شبكة النفاذ", icon: Radio },
  { label: "Decision Support", labelAr: "دعم القرار الهندسي", icon: GitBranch },
] as const;

export const SlideS5_02_ResearchSynthesis: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="توليف الأطروحة: من البيانات الحقلية إلى دعم القرار الهندسي"
        badge={<SectionBadge text="التوليف البحثي" variant="primary" />}
      />

      <motion.div
        variants={staggerParent(0.04, 0)}
        initial={reduce ? undefined : "hidden"}
        animate="visible"
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "minmax(200px, 0.85fr) minmax(280px, 1.15fr)",
          gap: "20px",
          alignItems: "stretch",
          margin: "6px 0",
        }}
      >
        {/* Hero numeral + pipeline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            minHeight: 0,
          }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              textAlign: "center",
              padding: "12px 8px",
              borderRadius: "16px",
              background:
                "linear-gradient(180deg, rgba(66,129,119,0.12) 0%, #ffffff 55%)",
              border: "2px solid rgba(66, 129, 119, 0.28)",
            }}
          >
            <div
              style={{
                fontSize: "clamp(47px, 6.71vw, 64px)",
                fontWeight: 900,
                color: "#428177",
                letterSpacing: "-1px",
                lineHeight: 1,
                fontFamily: "Inter, Cairo, sans-serif",
              }}
            >
              79,268
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "19.3px",
                fontWeight: 800,
                color: "#1e293b",
                lineHeight: 1.4,
              }}
            >
              Real Cellular Data from Syrian operators
            </div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: 700,
                color: "#64748b",
                marginTop: "4px",
              }}
            >
              بيانات تشغيلية فعلية متعددة الأجيال (2G/3G/4G) للمشغلين السوريين (Syriatel & MTN)
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "6px",
              padding: "10px 12px",
              borderRadius: "14px",
              background: "#ffffff",
              border: "1.5px solid rgba(66, 129, 119, 0.22)",
            }}
          >
            {PIPELINE.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "#428177",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color="#edebe0" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "19.3px",
                          fontWeight: 900,
                          color: "#0f172a",
                        }}
                      >
                        {step.labelAr}
                      </div>
                      <div
                        style={{
                          fontSize: "19px",
                          fontWeight: 700,
                          color: "#428177",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingInlineEnd: "16px",
                        color: "#6b1f2a",
                      }}
                    >
                      <ArrowLeft size={16} strokeWidth={2.5} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        </div>

        {/* Central spatial figure */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            borderRadius: "16px",
            overflow: "hidden",
            background: "#ffffff",
            border: "2px solid rgba(107, 31, 42, 0.2)",
            boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              background: "#428177",
              color: "#edebe0",
              fontSize: "19.3px",
              fontWeight: 800,
            }}
          >
            الركيزة المكانية: التوزيع الجغرافي لمواقع الترقية المرشحة (الشكل 18)
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(180deg, #f8faf9 0%, rgba(237,235,224,0.5) 100%)",
            }}
          >
            <ThesisImage
              src="thesis_figures/fig18_syria_candidate_sites_map.png"
              alt="خريطة مواقع الترقية المرشحة في سوريا"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "340px",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            style={{
              padding: "8px 14px",
              fontSize: "19px",
              fontWeight: 700,
              color: "#1e293b",
              borderTop: "1px solid rgba(66, 129, 119, 0.2)",
            }}
          >
            من القياسات التشغيلية الحقلية ← التحليل المكاني المتقدم ← قرارات هندسية محسوبة وقابلة للتنفيذ
          </div>
        </motion.div>
      </motion.div>

      <SlideFooter slideLabel="Slide 02 · Section 05 · Data to Decision" />
    </div>
  );
};
