import React from "react";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
} from "./shared";
import {
  MapPin,
  Cpu,
  Network,
  Gauge,
  AppWindow,
  Radio,
  ArrowLeft,
} from "lucide-react";

type ArchBlock = {
  labelAr: string;
  labelEn: string;
  icon: React.ReactNode;
  color: string;
};

export const SlideS5_11_TheBigPicture: React.FC = () => {
  const inputs: ArchBlock[] = [
    {
      labelAr: "نظم GIS المكانية",
      labelEn: "SPATIAL GIS",
      icon: <MapPin size={22} color="#ffffff" />,
      color: "#428177",
    },
    {
      labelAr: "الاستمثال الذكي",
      labelEn: "AI & OPTIMIZATION",
      icon: <Cpu size={22} color="#ffffff" />,
      color: "#2e7d5b",
    },
    {
      labelAr: "معمارية O-RAN",
      labelEn: "OPEN-RAN",
      icon: <Network size={22} color="#ffffff" />,
      color: "#6b1f2a",
    },
    {
      labelAr: "متحكم Near-RT RIC",
      labelEn: "NEAR-RT RIC",
      icon: <Gauge size={22} color="#ffffff" />,
      color: "#428177",
    },
    {
      labelAr: "تطبيقات xApps",
      labelEn: "xAPPS",
      icon: <AppWindow size={22} color="#ffffff" />,
      color: "#2e7d5b",
    },
  ];

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="المعمارية المستقبلية المقترحة: تكامل التحليل المكاني ومعايير O-RAN للتحكم التكيفي"
        badge={
          <SectionBadge text="Future Architecture" variant="accent" />
        }
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
          minHeight: 0,
        }}
      >
        <div
          style={{
            background: "rgba(107, 31, 42, 0.07)",
            border: "1.5px dashed rgba(107, 31, 42, 0.35)",
            borderRadius: "10px",
            padding: "8px 14px",
            fontSize: "19px",
            fontWeight: 800,
            color: "#6b1f2a",
            textAlign: "right",
          }}
        >
          رؤية معمارية مستقبلية (الفصل السادس): استشراف دمج التحليل المكاني مع مواصفات Open-RAN
          ومتحكمات Near-RT RIC عبر تطبيقات xApps المخصصة —{" "}
          <strong>Future Architecture</strong> وليس بنية منفذة عملياً بالأطروحة.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {inputs.map((block, idx) => (
            <React.Fragment key={block.labelEn}>
              <div
                style={{
                  background: "#ffffff",
                  border: `1.5px solid ${block.color}45`,
                  borderRadius: "14px",
                  padding: "12px 14px",
                  minWidth: "118px",
                  textAlign: "center",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: block.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  {block.icon}
                </div>
                <div
                  style={{
                    fontSize: "18.6px",
                    fontWeight: 900,
                    color: "#0f172a",
                  }}
                >
                  {block.labelAr}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: block.color,
                    fontFamily: "Inter",
                    marginTop: "2px",
                  }}
                >
                  {block.labelEn}
                </div>
              </div>
              {idx < inputs.length - 1 && (
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#64748b",
                    fontFamily: "Inter",
                  }}
                >
                  +
                </span>
              )}
            </React.Fragment>
          ))}

          <ArrowLeft size={28} color="#428177" strokeWidth={2.5} />

          <div
            style={{
              background: "linear-gradient(135deg, #428177 0%, #2e7d5b 100%)",
              borderRadius: "16px",
              padding: "16px 22px",
              minWidth: "200px",
              textAlign: "center",
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(66, 129, 119, 0.35)",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              <Radio size={26} color="#ffffff" />
            </div>
            <div style={{ fontSize: "21.1px", fontWeight: 900 }}>
              تحكم راديوي تكيفي مكانياً
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 800,
                fontFamily: "Inter",
                opacity: 0.95,
                marginTop: "4px",
              }}
            >
              SPATIAL ADAPTIVE CONTROL
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {[
            {
              t: "الأساس المكاني (GIS)",
              d: "المساهمة المنجزة في الأطروحة: استثمار البيانات الجغرافية في قيادة قرارات التخطيط والتحكم.",
              c: "#428177",
              tag: "Implemented Contribution",
            },
            {
              t: "طبقة التحكم البرمجي (O-RAN / RIC)",
              d: "امتداد مستقبلي: نقل نماذج التنسيق نحو متحكمات RIC المفتوحة للتوافق مع شبكات الجيل القادم.",
              c: "#6b1f2a",
              tag: "Future Architecture",
            },
            {
              t: "تطبيقات xApps الذكية",
              d: "تكامل مستقبلي: تحويل خوارزميات الأطروحة إلى تطبيقات xApps تعمل لحظياً لإدارة الموارد الراديوية.",
              c: "#2e7d5b",
              tag: "Future Direction",
            },
          ].map((row) => (
            <div
              key={row.t}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                border: `1.5px solid ${row.c}35`,
                borderTop: `4px solid ${row.c}`,
                padding: "10px 12px",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 900,
                  fontFamily: "Inter",
                  color: row.c,
                  background: `${row.c}12`,
                  padding: "2px 8px",
                  borderRadius: "6px",
                }}
              >
                {row.tag}
              </span>
              <div
                style={{
                  fontSize: "19.3px",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginTop: "6px",
                }}
              >
                {row.t}
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
                {row.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
