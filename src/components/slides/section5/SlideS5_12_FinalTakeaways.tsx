import React from "react";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
  SlideFooter,
} from "./shared";
import { ThesisImage } from "../../ui/ThesisImage";
import {
  Radio,
  Copy,
  PlayCircle,
  TrendingUp,
  Sliders,
  GitBranch,
  Leaf,
  ArrowLeft,
} from "lucide-react";

const cycleStep = (
  labelAr: string,
  labelEn: string,
  icon: React.ReactNode,
  color: string
) => ({ labelAr, labelEn, icon, color });

export const SlideS5_12_FinalTakeaways: React.FC = () => {
  const loop = [
    cycleStep("المحاكاة المكانية", "SPATIAL SIMULATION", <PlayCircle size={18} color="#fff" />, "#428177"),
    cycleStep("التنبؤ بحركة المرور", "TRAFFIC PREDICTION", <TrendingUp size={18} color="#fff" />, "#2e7d5b"),
    cycleStep("الاستمثال متعدد الأهداف", "MULTI-OBJ OPTIMIZATION", <Sliders size={18} color="#fff" />, "#428177"),
    cycleStep("اتخاذ القرار الآلي", "AUTOMATED DECISION", <GitBranch size={18} color="#fff" />, "#6b1f2a"),
    cycleStep("التنفيذ على الشبكة", "NETWORK EXECUTION", <Radio size={18} color="#fff" />, "#2e7d5b"),
  ];

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="الرؤية المستقبلية: التوأم الرقمي للشبكات والأتمتة الذاتية"
        badge={
          <SectionBadge text="Future Research Direction" variant="accent" />
        }
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          minHeight: 0,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#ffffff",
              borderRadius: "14px",
              border: "1.5px dashed rgba(107, 31, 42, 0.35)",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(66, 129, 119, 0.1)",
                  border: "2px solid #428177",
                }}
              >
                <Radio size={28} color="#428177" style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: "19.3px", fontWeight: 900 }}>
                  الشبكة الخلوية المادية
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#428177",
                    fontFamily: "Inter",
                  }}
                >
                  PHYSICAL CELLULAR NETWORK
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  color: "#6b1f2a",
                  fontWeight: 900,
                  fontSize: "18px",
                  fontFamily: "Inter",
                }}
              >
                <span>↔</span>
                <span>SYNC</span>
                <span>↔</span>
              </div>

              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(107, 31, 42, 0.08)",
                  border: "2px dashed #6b1f2a",
                }}
              >
                <Copy size={28} color="#6b1f2a" style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: "19.3px", fontWeight: 900 }}>
                  التوأم الرقمي المكاني
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#6b1f2a",
                    fontFamily: "Inter",
                  }}
                >
                  SPATIAL DIGITAL TWIN — Ch7 §3.7
                </div>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "19px",
                fontWeight: 700,
                color: "#475569",
                textAlign: "right",
                lineHeight: 1.5,
              }}
            >
              الأتمتة الشاملة (Zero-Touch AI Orchestration): أفق بحثي واعد لتنسيق تشغيلي
              ذاتي مغلق الحلقة؛ يمثل امتداداً مستقبلياً لما بعد الأطروحة.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "6px",
              background: "#ffffff",
              borderRadius: "12px",
              border: "1.5px solid rgba(66, 129, 119, 0.3)",
              padding: "10px 12px",
            }}
          >
            {loop.map((step, idx) => (
              <React.Fragment key={step.labelEn}>
                <div style={{ textAlign: "center", minWidth: "72px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 4px",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 900 }}>
                    {step.labelAr}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: step.color,
                      fontFamily: "Inter",
                    }}
                  >
                    {step.labelEn}
                  </div>
                </div>
                {idx < loop.length - 1 && (
                  <ArrowLeft size={16} color="#94a3b8" strokeWidth={2.5} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(46, 125, 91, 0.08)",
              border: "1px solid rgba(46, 125, 91, 0.3)",
              borderRadius: "10px",
              padding: "8px 12px",
              fontSize: "19px",
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            <Leaf size={18} color="#2e7d5b" />
            <span>
              <strong>امتداد مستقبلي موصى به:</strong> الانتقال من التخطيط الواعي بالطاقة نحو شبكات خلوية خضراء مستدامة
              بالاعتماد على خوارزميات ذكاء السرب لترشيد استهلاك شبكات RAN (الفصل السابع).
            </span>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            border: "1.5px solid rgba(66, 129, 119, 0.35)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              background: "#6b1f2a",
              color: "#ffffff",
              fontSize: "19px",
              fontWeight: 800,
            }}
          >
            تمثيل بصري — سياق الشبكة الوطنية (مرجع الأطروحة)
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            <ThesisImage
              src="thesis_figures/fig18_syria_candidate_sites_map.png"
              alt="خريطة سوريا — سياق التوأم الرقمي المستقبلي"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "340px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      <SlideFooter slideLabel="Slide 12 • Future Vision (Digital Twin)" />
    </div>
  );
};
