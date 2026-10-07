import React from "react";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
} from "./shared";
import { ThesisImage } from "../../ui/ThesisImage";
import {
  Sliders,
  RefreshCw,
  Brain,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

type RoadStep = {
  titleAr: string;
  titleEn: string;
  detail: string;
  color: string;
  icon: React.ReactNode;
};

export const SlideS5_10_ResearchRoadmap: React.FC = () => {
  const steps: RoadStep[] = [
    {
      titleAr: "الاستمثال المنجز (نطاق الأطروحة)",
      titleEn: "CURRENT OPTIMIZATION",
      detail:
        "مساهمة محققة: استمثال مكاني متعدد الأهداف يجمع التخطيط الاستراتيجي، العدالة المكانية، والتحكم التشغيلي الميداني.",
      color: "#428177",
      icon: <Sliders size={24} color="#ffffff" />,
    },
    {
      titleAr: "الاستمثال التكيفي الديناميكي",
      titleEn: "ADAPTIVE OPTIMIZATION",
      detail:
        "أفق مستقبلي: ضبط معاملات الاستمثال والقيود لحظياً مع تبدل أحمال الشبكة والسياق الجغرافي.",
      color: "#2e7d5b",
      icon: <RefreshCw size={24} color="#ffffff" />,
    },
    {
      titleAr: "التحكم بالتعلم المعزز (RL)",
      titleEn: "RL & AI-DRIVEN CONTROL",
      detail:
        "امتداد مستقبلي: توظيف وكلاء التعلم المعزز للإدارة الذاتية التكيفية لموارد الراديو (كما نوقش في الفصل السادس).",
      color: "#6b1f2a",
      icon: <Brain size={24} color="#ffffff" />,
    },
    {
      titleAr: "الإدارة الذاتية الكاملة (Zero-Touch)",
      titleEn: "AUTONOMOUS NETWORK MGMT",
      detail:
        "رؤية مستقبلية: أتمتة تشغيلية كاملة للشبكة عبر التنسيق الذاتي المغلق (Closed-Loop Automation).",
      color: "#428177",
      icon: <Sparkles size={24} color="#ffffff" />,
    },
  ];

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="خارطة التحول التكنولوجي: من الاستمثال الساكن إلى الإدارة الذكية المستقلة"
        badge={
          <SectionBadge
            text="Future Direction — Not Implemented"
            variant="accent"
          />
        }
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "14px",
          minHeight: 0,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minHeight: 0,
          }}
        >
          <div
            style={{
              background: "rgba(107, 31, 42, 0.08)",
              border: "1.5px solid rgba(107, 31, 42, 0.25)",
              borderRadius: "10px",
              padding: "8px 12px",
              fontSize: "19px",
              fontWeight: 800,
              color: "#6b1f2a",
              textAlign: "right",
            }}
          >
            يمثل الذكاء الاصطناعي والتعلم المعزز (RL){" "}
            <strong>امتداداً بحثياً مستقبلياً</strong> لمخرجات الأطروحة (نوقش في الفصل السادس)
            وليس من ضمن النتائج المطبقة عملياً.
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0",
              position: "relative",
              padding: "8px 0",
            }}
          >
            {steps.map((step, idx) => (
              <React.Fragment key={step.titleEn}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "52px 1fr",
                    gap: "12px",
                    alignItems: "center",
                    background: idx === 0 ? "#ffffff" : "rgba(255,255,255,0.92)",
                    border:
                      idx === 0
                        ? `2px solid ${step.color}`
                        : `1.5px dashed ${step.color}70`,
                    borderRadius: "12px",
                    padding: "10px 12px",
                    boxShadow:
                      idx === 0
                        ? `0 4px 14px ${step.color}20`
                        : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "19.3px",
                          fontWeight: 900,
                          color: "#0f172a",
                        }}
                      >
                        {step.titleAr}
                      </span>
                      {idx === 0 ? (
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 900,
                            background: "#2e7d5b",
                            color: "#fff",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontFamily: "Inter",
                          }}
                        >
                          Implemented
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 900,
                            background: "rgba(107, 31, 42, 0.12)",
                            color: "#6b1f2a",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontFamily: "Inter",
                          }}
                        >
                          Future Direction
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        color: step.color,
                        fontFamily: "Inter",
                        marginTop: "2px",
                      }}
                    >
                      {step.titleEn}
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: "19px",
                        fontWeight: 700,
                        color: "#334155",
                        lineHeight: 1.45,
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "4px 0",
                      color: steps[idx + 1].color,
                    }}
                  >
                    <ArrowLeft size={20} strokeWidth={3} />
                  </div>
                )}
              </React.Fragment>
            ))}
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
              background: "#428177",
              color: "#ffffff",
              fontSize: "19px",
              fontWeight: 800,
            }}
          >
            سياق الأطروحة — تحسين موارد الشبكة (مرجع بصري)
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(180deg, #f8faf9 0%, rgba(237,235,224,0.4) 100%)",
              minHeight: 0,
            }}
          >
            <ThesisImage
              src="thesis_figures/fig18_syria_candidate_sites_map.png"
              alt="خريطة مواقع الترقية — نقطة انطلاق التحسين المكاني"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "320px",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            style={{
              padding: "8px 12px",
              fontSize: "19px",
              fontWeight: 700,
              color: "#475569",
              borderTop: "1px solid rgba(66, 129, 119, 0.2)",
              textAlign: "right",
            }}
          >
            مسار التطور: من الاستمثال المكاني الرياضي المنجز إلى الدمج المستقبلي مع خوارزميات التعلم المعزز والذكاء الاصطناعي (الفصل السادس).
          </div>
        </div>
      </div>
    </div>
  );
};
