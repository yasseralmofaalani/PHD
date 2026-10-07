import React from "react";
import { motion } from "framer-motion";
import SlideBreadcrumb from "../ui/SlideBreadcrumb";
import RevealItem, { StepIndicator } from "../ui/RevealItem";
import { useStepReveal } from "../../hooks/useStepReveal";
import { datasetStats } from "../../data/thesisData";
import {
  Scale,
  Database,
  Layers,
  Wrench,
  Radio,
  DollarSign,
  Zap,
  Compass,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  GitBranch,
  Settings,
  Activity,
  Cpu,
  BarChart3,
  ShieldCheck,
  Binary,
  Sparkles,
  MapPin,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Check,
  Award,
  Maximize2,
} from "lucide-react";

const darkSlideStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "clamp(12px, 1.8vh, 20px) clamp(22px, 2.8vw, 40px)",
  boxSizing: "border-box",
  fontFamily: "Cairo, sans-serif",
  background: "transparent",
  color: "#000000",
};

const techGridStyle: React.CSSProperties = {
  display: "none",
};

// ─────────────────────────────────────────────────────────────
// Slide 18 (Slide16ContribMap): The 3 Research Contributions Journey
// ─────────────────────────────────────────────────────────────
export const Slide16ContribMap: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  const contributions = [
    {
      num: "01",
      chapter: "الفصل الرابع",
      title: "تحسين تخطيط نشر الجيل الخامس (5G) في البيئات محدودة الموارد",
      sub: "ترقية ذكية للأبراج القائمة بثلاثية: أقصى تغطية + أقل كلفة + أقل استهلاك طاقة",
      badge: "النمذجة الرياضية والاستمثال الخوارزمي",
      icon: <Radio size={30} color="#ffffff" />,
      color: "var(--primary)",
      accentColor: "rgba(66, 129, 119, 0.15)",
      highlights: [
        "دالة هدف ثلاثية: تعظيم SINR وتقليل CapEx والطاقة",
        "ابتكار آلية إصلاح القيود التكيفية المدمجة في صلب BPSO و AGA",
        "تحقيق 100% حلول مجدية تشغيلياً وتسريع التقارب بنسبة 45%",
      ],
      kpi: "وفر 62% بالكلفة + 38% بالطاقة",
    },
    {
      num: "02",
      chapter: "الفصل الخامس",
      title: "إنصاف الأرياف وإدماج المعامل الرابع: العدالة المكانية (SFI)",
      sub: "تطوير الخوارزميتين بفرض قيد التكافؤ الجغرافي لترددات النطاق العريض",
      badge: "العدالة المكانية وتطوير الخوارزميات",
      icon: <Scale size={30} color="#ffffff" />,
      color: "var(--accent)",
      accentColor: "rgba(107, 31, 42, 0.15)",
      highlights: [
        "كشف التحيز التجاري: تركيز 95% من الترقية في المدن وحرمان الأرياف",
        "صياغة مؤشر SFI وترقية دالة اللياقة إلى رباعية: SF(X) ≥ 0.85",
        "تطوير خطوة إصلاح العدالة وإعادة التوزيع التلقائي في الخوارزميتين",
      ],
      kpi: "قفزة نوعية +36.5% في عدالة الأرياف",
    },
    {
      num: "03",
      chapter: "الفصل السادس",
      title:
        "التنسيق التشغيلي والتحكم البرمجي بالعزل الجغرافي (GIS Zero-Jamming)",
      sub: "الانتقال من التخطيط الاستراتيجي إلى التحكم الميداني اللحظي متعدد الموردين",
      badge: "التحكم الميداني وأمن الطوارئ",
      icon: <Layers size={30} color="#ffffff" />,
      color: "var(--primary)",
      accentColor: "rgba(66, 129, 119, 0.15)",
      highlights: [
        "بديل آمن للتشويش الراديوي المدمر: عزل برمجي موجه بالمضلعات",
        "معمارية محايدة تدير معدات Huawei و Ericsson بالتوازي",
        "استجابة قياسية < 10 ثوانٍ مع بروتوكول استعادة فورية آمن",
      ],
      kpi: "استجابة < 10s بدقة عزل 97.5%",
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb
        part="03"
        partLabel="المساهمات البحثية"
        chapter=""
      />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(18px, 1.22vw, 22px)",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                الرحلة الابتكارية للأطروحة — من التخطيط الرياضي إلى التحكم
                الميداني
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28.8px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
              المساهمات البحثية الثلاث للأطروحة: التسلسل والترابط الهيكلي
            </h1>
          </div>
          <StepIndicator
            totalSteps={totalSteps}
            currentStep={step}
            onStepClick={goToStep}
          />
        </div>
      </RevealItem>

      {/* Steps 2, 3, 4: The 3 Connected Contribution Cards */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "10px 0",
          alignItems: "stretch",
        }}
      >
        {contributions.map((c, i) => (
          <RevealItem
            key={c.num}
            visibleAtStep={i + 2}
            currentStep={step}
            animation="scale"
            style={{ height: "100%" }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                border: `2.5px solid ${c.color === "var(--accent)" ? "var(--accent)" : "var(--primary)"}`,
                boxShadow:
                  c.color === "var(--accent)"
                    ? "0 8px 24px rgba(107, 31, 42, 0.14)"
                    : "0 8px 24px rgba(66, 129, 119, 0.14)",
                padding: "clamp(14px, 1.6vh, 20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  height: "6px",
                  background: c.color,
                }}
              />

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                    marginTop: "2px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "14px",
                        background: c.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <span
                        style={{
                          background: c.accentColor,
                          color: c.color,
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "clamp(18px, 1.1vw, 22px)",
                          fontWeight: 900,
                        }}
                      >
                        {c.chapter}
                      </span>
                      <div
                        style={{
                          fontSize: "clamp(18px, 0.98vw, 22px)",
                          color: "rgba(0,0,0,0.65)",
                          fontWeight: 700,
                          marginTop: "2px",
                        }}
                      >
                        {c.badge}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "clamp(33.6px, 3.05vw, 42.5px)",
                      fontWeight: 900,
                      fontFamily: "Inter",
                      color: c.color,
                      opacity: 0.95,
                    }}
                  >
                    {c.num}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(21.1px, 1.53vw, 23.6px)",
                    fontWeight: 900,
                    color: "#000000",
                    lineHeight: 1.35,
                    marginBottom: "6px",
                  }}
                >
                  {c.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(18px, 1.12vw, 22px)",
                    color: "rgba(0,0,0,0.75)",
                    lineHeight: 1.4,
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                >
                  {c.sub}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {c.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        color={c.color}
                        style={{ flexShrink: 0, marginTop: "3px" }}
                      />
                      <span
                        style={{
                          fontSize: "clamp(18px, 1.1vw, 22px)",
                          color: "#1a1a1a",
                          fontWeight: 700,
                          lineHeight: 1.35,
                        }}
                      >
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: c.accentColor,
                  borderRadius: "12px",
                  padding: "8px 12px",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border: `1.5px solid ${c.color === "var(--accent)" ? "rgba(107, 31, 42, 0.35)" : "rgba(66, 129, 119, 0.35)"}`,
                }}
              >
                <Sparkles size={16} color={c.color} />
                <span
                  style={{
                    fontSize: "clamp(18px, 1.16vw, 22px)",
                    fontWeight: 900,
                    color: c.color,
                    textAlign: "center",
                  }}
                >
                  {c.kpi}
                </span>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>

      {/* Step 5: The Grand Unified Synthesis Banner */}
      <RevealItem visibleAtStep={5} currentStep={step} animation="fadeUp">
        <div
          style={{
            background:
              "linear-gradient(90deg, var(--primary) 0%, #2f6058 100%)",
            borderRadius: "14px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 10,
            color: "#ffffff",
            boxShadow: "0 4px 16px rgba(66, 129, 119, 0.28)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GitBranch size={18} color="#ffffff" />
            </div>
            <div>
              <span
                style={{
                  fontSize: "clamp(18px, 1.28vw, 22px)",
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                التكامل البنيوي للمساهمات:
              </span>
              <span
                style={{
                  fontSize: "clamp(18px, 1.16vw, 22px)",
                  color: "#edebe0",
                  marginRight: "6px",
                }}
              >
                تبدأ بالتخطيط الأمثل لمواقع 5G، وتُصحح بإنصاف الأرياف (SFI)،
                وتكتمل بالتحكم الميداني اللحظي الآمن.
              </span>
            </div>
          </div>
          <span
            style={{
              fontSize: "clamp(18px, 1.04vw, 22px)",
              background: "var(--accent)",
              color: "#ffffff",
              padding: "4px 14px",
              borderRadius: "16px",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            منظومة شاملة End-to-End
          </span>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 19 (Slide17OptModel): Contribution 1 - The 3-Objective Model & Tower Upgrade
// ─────────────────────────────────────────────────────────────
export const Slide17OptModel: React.FC<{
  onOpenModal?: (id: string) => void;
}> = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  const objectives = [
    {
      dir: "تعظيم Maximize",
      symbol: "w₁ · C(X)",
      weight: "w₁ = 0.40",
      title: "جودة التغطية الراديوية",
      metric: "SINR ≥ 12 dB + RSRP",
      color: "var(--primary)",
      desc: "تعظيم نسبة المساحة والمستخدمين المشمولين بتغطية 5G بالاعتماد على نموذج انتشار 3GPP وخرائط التضاريس الرقمية DEM 30m.",
    },
    {
      dir: "تقليل Minimize",
      symbol: "w₂ · K(X)",
      weight: "w₂ = 0.35",
      title: "النفقات الرأسمالية (CapEx)",
      metric: "وفر استثماري > 62%",
      color: "var(--accent)",
      desc: "حصر الترقية بإعادة استثمار الأبراج والكبائن القائمة، لتفادي التكلفة الباهظة لبناء مواقع جديدة في ظل الحصار الاقتصادي.",
    },
    {
      dir: "تقليل Minimize",
      symbol: "w₃ · E(X)",
      weight: "w₃ = 0.25",
      title: "استهلاك الطاقة التشغيلية (OPEX)",
      metric: "توفير طاقة > 38%",
      color: "var(--primary)",
      desc: "ترقية المواقع ذات الكفاءة الطاقية الأعلى وإطفاء/تكييف الترددات الخاملة، للتغلب على الانقطاع الحاد للكهرباء وأزمة المحروقات.",
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb
        part="03"
        partLabel="المساهمات البحثية"
        chapter="المساهمة 1 (الفصل 4) — نموذج التحسين ثلاثي الأبعاد"
      />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(18px, 1.22vw, 22px)",
                  fontWeight: 800,
                  color: "var(--primary)",
                }}
              >
                المساهمة البحثية الأولى — الفصل الرابع: صياغة مسألة الترقية
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28.8px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
              نموذج الاستمثال الرياضي ثلاثي الأهداف لترقية شبكات الجيل الخامس
            </h1>
          </div>
          <StepIndicator
            totalSteps={totalSteps}
            currentStep={step}
            onStepClick={goToStep}
          />
        </div>
      </RevealItem>

      {/* Main Content Layout */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.35fr 1fr",
          gap: "16px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "10px 0",
          alignItems: "stretch",
        }}
      >
        {/* Left: The 3 Core Objective Cards (Steps 2, 3, 4) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          {objectives.map((o, i) => (
            <RevealItem
              key={o.title}
              visibleAtStep={i + 2}
              currentStep={step}
              animation="fadeRight"
              style={{ flex: 1 }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "12px 18px",
                  border: `2px solid ${o.color === "var(--accent)" ? "rgba(107, 31, 42, 0.4)" : "rgba(66, 129, 119, 0.4)"}`,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(18px, 1.1vw, 22px)",
                        background:
                          o.color === "var(--accent)"
                            ? "rgba(107, 31, 42, 0.12)"
                            : "rgba(66, 129, 119, 0.12)",
                        color: o.color,
                        padding: "2px 10px",
                        borderRadius: "8px",
                        fontWeight: 900,
                      }}
                    >
                      {o.dir}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(19.8px, 1.46vw, 22.4px)",
                        fontWeight: 900,
                        color: "#000000",
                      }}
                    >
                      {o.title}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(18px, 1.22vw, 22px)",
                        color: "#ffffff",
                        background: o.color,
                        padding: "2px 10px",
                        borderRadius: "8px",
                        fontFamily: "Inter",
                        fontWeight: 800,
                      }}
                    >
                      {o.symbol}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(18px, 1.1vw, 22px)",
                        color: "rgba(0,0,0,0.6)",
                        fontWeight: 800,
                        fontFamily: "Inter",
                      }}
                    >
                      {o.weight}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "clamp(18px, 1.16vw, 22px)",
                    color: "#2c3531",
                    margin: 0,
                    lineHeight: 1.4,
                    fontWeight: 600,
                  }}
                >
                  {o.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: o.color,
                      fontWeight: 800,
                    }}
                  >
                    🎯 المستهدف الهندسي:
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "#000000",
                      fontWeight: 800,
                    }}
                  >
                    {o.metric}
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>

        {/* Right: Formulation Box & Tower Upgrade Engineering Schematic (Step 5) */}
        <RevealItem
          visibleAtStep={5}
          currentStep={step}
          animation="scale"
          style={{ height: "100%" }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "2px solid var(--primary)",
              borderRadius: "18px",
              padding: "16px 20px",
              boxShadow: "0 8px 24px rgba(66, 129, 119, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <Cpu size={22} color="var(--primary)" />
                <span
                  style={{
                    fontSize: "clamp(19.3px, 1.34vw, 22px)",
                    fontWeight: 900,
                    color: "var(--primary)",
                  }}
                >
                  اقتران اللياقة الرياضي التجميعي (Fitness Function)
                </span>
              </div>

              {/* Formula Block */}
              <div
                style={{
                  background: "rgba(66, 129, 119, 0.08)",
                  borderRadius: "14px",
                  padding: "12px",
                  border: "1.5px solid rgba(66, 129, 119, 0.3)",
                  textAlign: "center",
                  direction: "ltr",
                  fontFamily: "Inter",
                  fontSize: "clamp(18px, 1.34vw, 22px)",
                  fontWeight: 900,
                  color: "#000000",
                  lineHeight: 1.5,
                }}
              >
                <div>Max F(X) = w₁·C(X) − w₂·K(X) − w₃·E(X)</div>
                <div
                  style={{
                    fontSize: "clamp(18px, 1.1vw, 22px)",
                    color: "var(--accent)",
                    fontWeight: 800,
                    marginTop: "6px",
                    borderTop: "1px dashed rgba(66, 129, 119, 0.3)",
                    paddingTop: "6px",
                  }}
                >
                  Subject to: ∑ wᵢ = 1 &nbsp;|&nbsp; X ∈ &#123;0, 1&#125;ᴺ
                  &nbsp;|&nbsp; K(X) ≤ Budget_Max
                </div>
              </div>
            </div>

            {/* Technical Schematic: 4G Site Upgraded to 5G */}
            <div
              style={{
                background: "rgba(237, 235, 224, 0.6)",
                borderRadius: "14px",
                padding: "10px 14px",
                border: "1px solid rgba(0,0,0,0.1)",
                margin: "8px 0",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(18px, 1.16vw, 22px)",
                  fontWeight: 800,
                  color: "#000000",
                  marginBottom: "6px",
                }}
              >
                🏗️ جوهر الترقية المادية للأبراج (Brownfield 5G Upgrade):
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    padding: "8px",
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "rgba(0,0,0,0.6)",
                      fontWeight: 700,
                    }}
                  >
                    البنية القائمة (4G LTE)
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.16vw, 22px)",
                      fontWeight: 900,
                      color: "#000000",
                    }}
                  >
                    إبقاء البرج والكبينة
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(66, 129, 119, 0.12)",
                    padding: "8px",
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "1px solid rgba(66, 129, 119, 0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "var(--primary)",
                      fontWeight: 800,
                    }}
                  >
                    تحديث 5G NR Massive MIMO
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.16vw, 22px)",
                      fontWeight: 900,
                      color: "var(--primary)",
                    }}
                  >
                    إضافة وحدات AAU النشطة
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Insight */}
            <div
              style={{
                background: "rgba(107, 31, 42, 0.08)",
                borderRadius: "10px",
                padding: "8px 12px",
                border: "1px solid rgba(107, 31, 42, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircle2
                size={18}
                color="var(--accent)"
                style={{ flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "clamp(18px, 1.1vw, 22px)",
                  color: "#000000",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                يتفوق هذا النموذج على المقاربات الفردية بالموازنة الدقيقة بين
                أداء الراديو وسقف الميزانية وأزمة الطاقة.
              </span>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 20 (Slide18BPSO_AGA): Contribution 1 - Deep Dive into BPSO vs AGA Mechanics & OUR CONTRIBUTION
// ─────────────────────────────────────────────────────────────
export const Slide18BPSO_AGA: React.FC<{
  onOpenModal?: (id: string) => void;
}> = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb
        part="03"
        partLabel="المساهمات البحثية"
        chapter="المساهمة 1 (الفصل 4) — التطوير الخوارزمي لـ BPSO و AGA"
      />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(18px, 1.22vw, 22px)",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                المساهمة البحثية الأولى — الفصل الرابع: الاستمثال الخوارزمي وحل
                معضلة NP-Hard
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28.8px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
              الميكانيكية الرياضية لخوارزميتي BPSO و AGA والتعديلات الخوارزمية
              المقترحة
            </h1>
          </div>
          <StepIndicator
            totalSteps={totalSteps}
            currentStep={step}
            onStepClick={goToStep}
          />
        </div>
      </RevealItem>

      {/* Steps 2 & 3: Deep Technical Comparison of Algorithmic Equations */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "8px 0",
          alignItems: "stretch",
        }}
      >
        {/* Step 2: BPSO Mathematical Engine */}
        <RevealItem
          visibleAtStep={2}
          currentStep={step}
          animation="fadeRight"
          style={{ height: "100%" }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "2.5px solid var(--primary)",
              borderRadius: "18px",
              padding: "clamp(12px, 1.6vh, 18px)",
              boxShadow: "0 8px 24px rgba(66, 129, 119, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Cpu size={24} color="var(--primary)" />
                  <span
                    style={{
                      fontSize: "clamp(24.8px, 2.2vw, 30px)",
                      fontWeight: 900,
                      color: "var(--primary)",
                      fontFamily: "Inter",
                    }}
                  >
                    BPSO
                  </span>
                </div>
                <span
                  style={{
                    background: "var(--primary)",
                    color: "#ffffff",
                    padding: "3px 12px",
                    borderRadius: "14px",
                    fontSize: "clamp(18px, 1.04vw, 22px)",
                    fontWeight: 900,
                  }}
                >
                  خوارزمية أسراب الجسيمات الثنائية
                </span>
              </div>

              {/* Mathematical formulation block */}
              <div
                style={{
                  background: "rgba(66, 129, 119, 0.08)",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  fontFamily: "Inter",
                  fontSize: "clamp(18px, 1.04vw, 22px)",
                  direction: "ltr",
                  textAlign: "left",
                  border: "1px solid rgba(66, 129, 119, 0.25)",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontWeight: 800, color: "var(--primary)" }}>
                  1. Velocity Update:
                </div>
                <div style={{ color: "#000000", fontWeight: 700 }}>
                  v_id(t+1) = ω·v_id(t) + c₁r₁(pBest_id - x_id) + c₂r₂(gBest_d -
                  x_id)
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "var(--primary)",
                    marginTop: "4px",
                  }}
                >
                  2. Sigmoid Transfer & Position:
                </div>
                <div style={{ color: "#000000", fontWeight: 700 }}>
                  S(v_id) = 1 / (1 + e^-v_id) &nbsp;⇒&nbsp; x_id(t+1) = (rand
                  &lt; S(v_id)) ? 1 : 0
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "rgba(0,0,0,0.65)",
                    marginTop: "2px",
                  }}
                >
                  Inertia ω decreases linearly from 0.9 to 0.4
                </div>
              </div>

              {/* Technical Features */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    color="var(--primary)"
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.1vw, 22px)",
                      color: "#1a1a1a",
                      fontWeight: 600,
                    }}
                  >
                    <strong>التشفير المباشر:</strong> كل جسيم متجه ثنائي{" "}
                    {"X ∈ {0,1}ᴺ"} يمثل قرارات الترقية للمواقع.
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    color="var(--primary)"
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.1vw, 22px)",
                      color: "#1a1a1a",
                      fontWeight: 600,
                    }}
                  >
                    <strong>سرعة التقارب:</strong> أسرع تقارب زمني (118s) بفضل
                    كفاءة الذاكرة المشتركة لـ gBest.
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(66, 129, 119, 0.12)",
                borderRadius: "10px",
                padding: "6px 10px",
                textAlign: "center",
                border: "1px solid rgba(66, 129, 119, 0.3)",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(18px, 1.1vw, 22px)",
                  fontWeight: 800,
                  color: "var(--primary)",
                }}
              >
                ⚡ أسرع بـ 16.9% في زمن الحساب ومثالية للشبكات القطرية الضخمة
                (79,268 موقعاً)
              </span>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: AGA Mathematical Engine */}
        <RevealItem
          visibleAtStep={3}
          currentStep={step}
          animation="fadeLeft"
          style={{ height: "100%" }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "2.5px solid var(--accent)",
              borderRadius: "18px",
              padding: "clamp(12px, 1.6vh, 18px)",
              boxShadow: "0 8px 24px rgba(107, 31, 42, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <GitBranch size={24} color="var(--accent)" />
                  <span
                    style={{
                      fontSize: "clamp(24.8px, 2.2vw, 30px)",
                      fontWeight: 900,
                      color: "var(--accent)",
                      fontFamily: "Inter",
                    }}
                  >
                    AGA
                  </span>
                </div>
                <span
                  style={{
                    background: "var(--accent)",
                    color: "#ffffff",
                    padding: "3px 12px",
                    borderRadius: "14px",
                    fontSize: "clamp(18px, 1.04vw, 22px)",
                    fontWeight: 900,
                  }}
                >
                  الخوارزمية الجينية التكيفية
                </span>
              </div>

              {/* Mathematical formulation block */}
              <div
                style={{
                  background: "rgba(107, 31, 42, 0.08)",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  fontFamily: "Inter",
                  fontSize: "clamp(18px, 1.04vw, 22px)",
                  direction: "ltr",
                  textAlign: "left",
                  border: "1px solid rgba(107, 31, 42, 0.25)",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontWeight: 800, color: "var(--accent)" }}>
                  1. Tournament Selection & Crossover:
                </div>
                <div style={{ color: "#000000", fontWeight: 700 }}>
                  k = 3 &nbsp;|&nbsp; Adaptive Crossover: Single / Two-Point Pc
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "var(--accent)",
                    marginTop: "4px",
                  }}
                >
                  2. Dynamic 3-Stage Mutation Rate Pm(t):
                </div>
                <div style={{ color: "#000000", fontWeight: 700 }}>
                  t &lt; T/3: Pm = 0.08 (Exploration) &nbsp;|&nbsp; t ≥ 2T/3: Pm
                  = 0.02 (Exploitation)
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "rgba(0,0,0,0.65)",
                    marginTop: "2px",
                  }}
                >
                  Linear dynamic decay in middle phase
                </div>
              </div>

              {/* Technical Features */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    color="var(--accent)"
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.1vw, 22px)",
                      color: "#1a1a1a",
                      fontWeight: 600,
                    }}
                  >
                    <strong>التنوع الوراثي:</strong> ديناميكية $P_m$ تمنع الركود
                    في النهايات المحلية في التضاريس المعقدة.
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    color="var(--accent)"
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(18px, 1.1vw, 22px)",
                      color: "#1a1a1a",
                      fontWeight: 600,
                    }}
                  >
                    <strong>الاستقرار الإحصائي:</strong> أقل انحراف معياري عبر
                    30 تشغيلاً مما يضمن ثبات الخطط الهندسية.
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(107, 31, 42, 0.12)",
                borderRadius: "10px",
                padding: "6px 10px",
                textAlign: "center",
                border: "1px solid rgba(107, 31, 42, 0.3)",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(18px, 1.1vw, 22px)",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                🛡️ الأعلى استقراراً وحصانة ضد التشتت الإحصائي عبر 30 تكراراً
                مستقلاً
              </span>
            </div>
          </div>
        </RevealItem>
      </div>

      {/* Step 4 & 5: WHAT WAS OUR NOVEL CONTRIBUTION TO BOTH ALGORITHMS? */}
      <RevealItem visibleAtStep={4} currentStep={step} animation="fadeUp">
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "2px solid var(--accent)",
            padding: "12px 18px",
            boxShadow: "0 6px 18px rgba(107, 31, 42, 0.12)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <Award size={22} color="var(--accent)" />
            <h4
              style={{
                fontSize: "clamp(19.3px, 1.4vw, 22px)",
                fontWeight: 900,
                color: "var(--accent)",
                margin: 0,
              }}
            >
              المساهمة العلمية والمنهجية للأطروحة على الخوارزميتين في المساهمة
              الأولى (الفصل 4):
            </h4>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "14px",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "clamp(18px, 1.12vw, 22px)",
                color: "#1a1a1a",
                lineHeight: 1.45,
                margin: 0,
                fontWeight: 600,
              }}
            >
              فشل الخوارزميات التقليدية (Standard PSO / GA) ينجم عن توليد حلول
              غير قابلة للتنفيذ تنتهك الميزانية.{" "}
              <strong>
                مساهمتنا تمثلت في تضمين مشغل إصلاح القيود التكيفي (Adaptive
                Constraint Repair Operator)
              </strong>{" "}
              داخل حلقة التحديث، واستبدال دوال العقاب (Penalty Functions) بإصلاح
              توجيهي مباشر:
              <br />
              <code
                style={{
                  direction: "ltr",
                  display: "inline-block",
                  color: "var(--accent)",
                  fontWeight: 800,
                  fontSize: "19px",
                  marginTop: "2px",
                }}
              >
                While Total_Cost &gt; B do: Remove site (x_i = 0) with lowest
                (Coverage / Cost)
              </code>
            </p>
            <div
              style={{
                background: "rgba(66, 129, 119, 0.1)",
                borderRadius: "12px",
                padding: "8px 12px",
                border: "1.5px solid rgba(66, 129, 119, 0.3)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(18px, 1.04vw, 22px)",
                  color: "var(--primary)",
                  fontWeight: 800,
                }}
              >
                الأثر المباشر لمساهمتنا:
              </div>
              <div
                style={{
                  fontSize: "clamp(19.3px, 1.4vw, 22px)",
                  fontWeight: 900,
                  color: "#000000",
                }}
              >
                100% حلول مجدية تشغيلياً + تسريع التقارب 45%
              </div>
            </div>
          </div>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 21 (Slide19ConstraintRepair): Detailed Engineering Flowchart of Constraint Repair
// ─────────────────────────────────────────────────────────────
export const Slide19ConstraintRepair: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 6 });

  const steps = [
    {
      num: "01",
      title: "توليد المتجه الثنائي الأولي",
      code: "Initial Solution X ∈ {0,1}ᴺ",
      desc: "توليد أولي للجسيمات أو الأبناء؛ لكل موقع رقم ثنائي يمثل قرار ترقيته لـ 5G.",
      action: "فضاء أولي يحوي خروقات",
      color: "var(--primary)",
      icon: <Binary size={22} color="var(--primary)" />,
    },
    {
      num: "02",
      title: "كشف خروقات الميزانية والقيود",
      code: "Budget & Coverage Check",
      desc: "حساب التكلفة الإجمالية: إذا تجاوزت سقف الميزانية B، أو انخفضت التغطية عن Cmin.",
      action: "كشف مباشر للحلول غير الصالحة",
      color: "var(--accent)",
      icon: <AlertTriangle size={22} color="var(--accent)" />,
    },
    {
      num: "03",
      title: "محرك الإصلاح التكيفي",
      code: "Smart Guided Repair Loop",
      desc: "إلغاء المواقع الأقل نسبة (تغطية/تكلفة)، وإضافة مواقع حيوية بنهج جشع حتى استيفاء القيود.",
      action: "تصحيح تكيفي دون إتلاف الحل",
      color: "var(--primary)",
      icon: <Wrench size={22} color="var(--primary)" />,
    },
    {
      num: "04",
      title: "اعتماد الحل وحساب اللياقة F(X)",
      code: "Fitness Evaluation (100% Valid)",
      desc: "تقييم اللياقة فقط للحلول السليمة تماماً؛ مما يمنع ضياع الموارد الحسابية في حلول مستحيلة.",
      action: "حلول قابلة للتنفيذ الميداني فوراً",
      color: "var(--accent)",
      icon: <ShieldCheck size={22} color="var(--accent)" />,
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb
        part="03"
        partLabel="المساهمات البحثية"
        chapter="المساهمة 1 (الفصل 4) — المخطط التدفقي لآلية إصلاح القيود"
      />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(18px, 1.22vw, 22px)",
                  fontWeight: 800,
                  color: "var(--primary)",
                }}
              >
                المساهمة البحثية الأولى — الفصل الرابع: المخطط التدفقي لآلية
                إصلاح القيود التكيفية
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28.8px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
              المسار الهندسي لآلية إصلاح القيود: دورة العمل التكيفية وضمان
              الجدوى
            </h1>
          </div>
          <StepIndicator
            totalSteps={totalSteps}
            currentStep={step}
            onStepClick={goToStep}
          />
        </div>
      </RevealItem>

      {/* Steps 2-5: 4 Sequential Pipeline Stages with Flow Icons */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "10px 0",
          alignItems: "stretch",
        }}
      >
        {steps.map((s, i) => (
          <RevealItem
            key={s.title}
            visibleAtStep={i + 2}
            currentStep={step}
            animation="scale"
            style={{ height: "100%" }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "clamp(14px, 1.8vh, 18px)",
                border: `2px solid ${s.color === "var(--accent)" ? "rgba(107, 31, 42, 0.4)" : "rgba(66, 129, 119, 0.4)"}`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                position: "relative",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {s.icon}
                    <span
                      style={{
                        background: s.color,
                        color: "#ffffff",
                        borderRadius: "12px",
                        padding: "2px 10px",
                        fontSize: "clamp(18px, 1.04vw, 22px)",
                        fontWeight: 900,
                        fontFamily: "Inter",
                      }}
                    >
                      المرحلة {s.num}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "clamp(18px, 0.98vw, 22px)",
                      color: "rgba(0,0,0,0.6)",
                      fontWeight: 800,
                      fontFamily: "Inter",
                    }}
                  >
                    Step {s.num}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "clamp(19.1px, 1.4vw, 22px)",
                    fontWeight: 900,
                    color: "#000000",
                    lineHeight: 1.35,
                    marginBottom: "4px",
                  }}
                >
                  {s.title}
                </div>

                <div
                  style={{
                    fontSize: "clamp(18px, 1.04vw, 22px)",
                    color: s.color,
                    fontFamily: "Inter",
                    fontWeight: 800,
                    marginBottom: "6px",
                  }}
                >
                  {s.code}
                </div>

                <p
                  style={{
                    fontSize: "clamp(18px, 1.16vw, 22px)",
                    color: "#2c3531",
                    lineHeight: 1.45,
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {s.desc}
                </p>
              </div>

              <div
                style={{
                  background:
                    s.color === "var(--accent)"
                      ? "rgba(107, 31, 42, 0.1)"
                      : "rgba(66, 129, 119, 0.1)",
                  borderRadius: "10px",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "clamp(18px, 1.1vw, 22px)",
                  fontWeight: 800,
                  color: s.color,
                  marginTop: "10px",
                  border: `1px solid ${s.color === "var(--accent)" ? "rgba(107, 31, 42, 0.25)" : "rgba(66, 129, 119, 0.25)"}`,
                }}
              >
                ✓ {s.action}
              </div>
            </div>
          </RevealItem>
        ))}
      </div>

      {/* Step 6: Breakthrough Banner */}
      <RevealItem visibleAtStep={6} currentStep={step} animation="fadeUp">
        <div
          style={{
            background:
              "linear-gradient(90deg, var(--accent) 0%, #4a141d 100%)",
            borderRadius: "14px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 10,
            color: "#ffffff",
            boxShadow: "0 4px 16px rgba(107, 31, 42, 0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CheckCircle2 size={24} color="#ffffff" />
            <span
              style={{ fontSize: "clamp(18px, 1.28vw, 22px)", fontWeight: 800 }}
            >
              المردود الحسابي لمساهمة الأطروحة: القضاء التام على الحلول العقيمة
              (100% Feasible Solutions) وتسريع زمن التقارب الحسابي بنسبة 45%.
            </span>
          </div>
          <span
            style={{
              fontSize: "clamp(18px, 1.04vw, 22px)",
              background: "rgba(255,255,255,0.2)",
              padding: "4px 14px",
              borderRadius: "14px",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            Zero Infeasible Solutions
          </span>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 22 (Slide20Dataset): Real Operational Syrian Cellular Dataset
// ─────────────────────────────────────────────────────────────
export const Slide20Dataset: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb
        part="03"
        partLabel="المساهمات البحثية"
        chapter="البيئة التجريبية — قاعدة بيانات الشبكة الخلوية السورية"
      />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(18px, 1.22vw, 22px)",
                  fontWeight: 800,
                  color: "var(--primary)",
                }}
              >
                البيانات الواقعية للتحقق — الجمهورية العربية السورية
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28.8px, 2.93vw, 37.8px)",
                fontWeight: 900,
                color: "#000000",
                margin: 0,
              }}
            >
              قاعدة بيانات الشبكة الخلوية الوطنية: 79,268 موقعاً وسجلاً تشغيلياً
            </h1>
          </div>
          <StepIndicator
            totalSteps={totalSteps}
            currentStep={step}
            onStepClick={goToStep}
          />
        </div>
      </RevealItem>

      {/* Main Grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "16px",
          position: "relative",
          zIndex: 10,
          minHeight: 0,
          margin: "10px 0",
          alignItems: "stretch",
        }}
      >
        {/* Step 2: Left Giant Highlight Card */}
        <RevealItem
          visibleAtStep={2}
          currentStep={step}
          animation="scale"
          style={{ height: "100%" }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "2px solid var(--primary)",
              borderRadius: "18px",
              padding: "clamp(16px, 2vh, 24px)",
              boxShadow: "0 8px 24px rgba(66, 129, 119, 0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Database
              size={48}
              color="var(--primary)"
              style={{ marginBottom: "8px" }}
            />
            <div
              style={{
                fontSize: "clamp(52px, 6.71vw, 76px)",
                fontWeight: 900,
                color: "var(--primary)",
                fontFamily: "Inter",
                lineHeight: 1,
              }}
            >
              {datasetStats.totalSites.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: "clamp(23px, 1.83vw, 27.3px)",
                fontWeight: 900,
                color: "#000000",
                marginTop: "6px",
              }}
            >
              موقع وسجل خلوي حقيقي تم نمذجته بالكامل
            </div>
            <p
              style={{
                fontSize: "clamp(18px, 1.22vw, 22px)",
                color: "#2c3531",
                marginTop: "6px",
                maxWidth: "460px",
                lineHeight: 1.45,
                fontWeight: 600,
              }}
            >
              بيانات تشغيلية وهندسية وراديوية دقيقة تشمل المشغلين الوطنيين
              السوريين (Syriatel و MTN) مدمجة مع نموذج الارتفاع الرقمي DEM 30m.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                width: "100%",
                marginTop: "14px",
              }}
            >
              <div
                style={{
                  background: "rgba(66, 129, 119, 0.1)",
                  padding: "10px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid rgba(66, 129, 119, 0.25)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(18px, 1.04vw, 22px)",
                    color: "var(--primary)",
                    fontWeight: 800,
                  }}
                >
                  المشغلان الوطنيان
                </div>
                <div
                  style={{
                    fontSize: "clamp(19.3px, 1.34vw, 22px)",
                    fontWeight: 900,
                    color: "#000000",
                  }}
                >
                  Syriatel + MTN
                </div>
              </div>
              <div
                style={{
                  background: "rgba(107, 31, 42, 0.1)",
                  padding: "10px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid rgba(107, 31, 42, 0.25)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(18px, 1.04vw, 22px)",
                    color: "var(--accent)",
                    fontWeight: 800,
                  }}
                >
                  الذكاء الجغرافي GIS
                </div>
                <div
                  style={{
                    fontSize: "clamp(19.3px, 1.34vw, 22px)",
                    fontWeight: 900,
                    color: "#000000",
                  }}
                >
                  DEM 30m + UTM 37N
                </div>
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Steps 3 & 4: Breakdown Panels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Step 3: Generations Distribution */}
          <RevealItem
            visibleAtStep={3}
            currentStep={step}
            animation="fadeRight"
            style={{ flex: 1 }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1.5px solid rgba(66, 129, 119, 0.3)",
                borderRadius: "16px",
                padding: "14px 18px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(19.3px, 1.34vw, 22px)",
                  fontWeight: 900,
                  color: "#000000",
                  marginBottom: "8px",
                }}
              >
                📊 التوزيع حسب أجيال التقنية الخلوية القائمة:
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: "rgba(66, 129, 119, 0.1)",
                    padding: "8px",
                    borderRadius: "10px",
                    border: "1px solid rgba(66, 129, 119, 0.25)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "var(--primary)",
                      fontWeight: 800,
                    }}
                  >
                    2G (GSM)
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(21.8px, 1.71vw, 26px)",
                      fontWeight: 900,
                      color: "#000000",
                      fontFamily: "Inter",
                    }}
                  >
                    26.9%
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(66, 129, 119, 0.1)",
                    padding: "8px",
                    borderRadius: "10px",
                    border: "1px solid rgba(66, 129, 119, 0.25)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "var(--primary)",
                      fontWeight: 800,
                    }}
                  >
                    3G (UMTS)
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(21.8px, 1.71vw, 26px)",
                      fontWeight: 900,
                      color: "#000000",
                      fontFamily: "Inter",
                    }}
                  >
                    35.2%
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(107, 31, 42, 0.1)",
                    padding: "8px",
                    borderRadius: "10px",
                    border: "1px solid rgba(107, 31, 42, 0.25)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "var(--accent)",
                      fontWeight: 800,
                    }}
                  >
                    4G (LTE)
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(21.8px, 1.71vw, 26px)",
                      fontWeight: 900,
                      color: "#000000",
                      fontFamily: "Inter",
                    }}
                  >
                    37.9%
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Step 4: Geographic Urban vs Rural */}
          <RevealItem
            visibleAtStep={4}
            currentStep={step}
            animation="fadeRight"
            style={{ flex: 1 }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1.5px solid rgba(66, 129, 119, 0.3)",
                borderRadius: "16px",
                padding: "14px 18px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(19.3px, 1.34vw, 22px)",
                  fontWeight: 900,
                  color: "#000000",
                  marginBottom: "8px",
                }}
              >
                📍 التوزع الجغرافي (الحضري مقابل الريفي):
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: "rgba(66, 129, 119, 0.1)",
                    border: "1.5px solid rgba(66, 129, 119, 0.3)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "var(--primary)",
                      fontWeight: 800,
                    }}
                  >
                    المناطق الحضرية الكبرى
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(24.8px, 1.95vw, 28.8px)",
                      fontWeight: 900,
                      color: "#000000",
                      fontFamily: "Inter",
                    }}
                  >
                    62%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(18px, 0.98vw, 22px)",
                      color: "rgba(0,0,0,0.6)",
                      marginTop: "2px",
                    }}
                  >
                    عائد مالي وتجاري سريع
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(107, 31, 42, 0.1)",
                    border: "1.5px solid rgba(107, 31, 42, 0.3)",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(18px, 1.04vw, 22px)",
                      color: "var(--accent)",
                      fontWeight: 800,
                    }}
                  >
                    المناطق الريفية والنائية
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(24.8px, 1.95vw, 28.8px)",
                      fontWeight: 900,
                      color: "#000000",
                      fontFamily: "Inter",
                    }}
                  >
                    38%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(18px, 0.98vw, 22px)",
                      color: "var(--accent)",
                      fontWeight: 800,
                      marginTop: "2px",
                    }}
                  >
                    مُهددة بالحرمان الرقمي ⚠️
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </div>
  );
};
