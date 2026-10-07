import React from "react";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
} from "./shared";
import {
  ExternalLink,
  Radio,
  Scale,
  ShieldAlert,
  MapPin,
  Globe,
  Layers,
  Compass,
  Play,
} from "lucide-react";

export const SlideS5_InteractiveSimulations: React.FC = () => {
  const testsUrl = "https://yaser-presentation.vercel.app/tests/";

  const experiments = [
    {
      num: "01",
      path: "المسار الاستراتيجي",
      title: "ترقية الأبراج نحو الجيل الخامس (5G)",
      scope: "نطاق التطبيق: دمشق وريفها (Case Study)",
      color: "#428177",
      icon: <Radio size={22} color="#ffffff" />,
      desc: "اختيار وترقية المواقع المثلى باستخدام خوارزمية BPSO لتحقيق أعلى تغطية (95.12%) بأقل كلفة CapEx وترشيد استهلاك الطاقة.",
      kpis: [
        { label: "نسبة التغطية", val: "95.12%" },
        { label: "وفر الميزانية", val: "8.4 M$" },
        { label: "ترشيد الطاقة", val: "5.3%" },
      ],
      actionText: "تشغيل محاكاة الترقية المثلى",
    },
    {
      num: "02",
      path: "المسار الاستراتيجي",
      title: "ترقية الأبراج مع قيد العدالة المكانية",
      scope: "نطاق التطبيق: دمشق وريفها (Case Study)",
      color: "#2e7d5b",
      icon: <Scale size={22} color="#ffffff" />,
      desc: "فرض قيد العدالة المكانية SFI كقيد ملزم لضمان نشر متوازن وعادل لشبكة 5G وردم الفجوة الرقمية بين مراكز المدن والأرياف.",
      kpis: [
        { label: "مؤشر العدالة SFI", val: "0.71" },
        { label: "التغطية الريفية", val: "88.7%" },
        { label: "تحسن العدالة", val: "+36.5%" },
      ],
      actionText: "تشغيل محاكاة العدالة المكانية",
    },
    {
      num: "03",
      path: "المسار التشغيلي",
      title: "عزل الخدمة الخلوية جغرافياً لسيناريوهات الطوارئ",
      scope: "نطاق التطبيق: برزة ومساكن برزة (Case Study)",
      color: "#6b1f2a",
      icon: <ShieldAlert size={22} color="#ffffff" />,
      desc: "تطبيق العزل المكاني الجغرافي بمساعدة GIS لمواقع محددة في حالات الطوارئ دون تشويش راديوي، مع استعادة آلية (Rollback).",
      kpis: [
        { label: "دقة العزل الحضري", val: "97.5%" },
        { label: "التنسيق المشترك", val: "> 97.4%" },
        { label: "زمن الاستعادة", val: "< 10 min" },
      ],
      actionText: "تشغيل محاكاة العزل البرمجي",
    },
  ];

  return (
    <div style={slideContainerStyle}>
      <div style={techGridStyle} />

      <SlideHeader
        partNum="05"
        partTitle="الخاتمة والآفاق المستقبلية"
        chapter="التحقق الميداني والمحاكاة التفاعلية"
        titleAr="التجارب التطبيقية الحية على خريطة سوريا"
        titleEn="LIVE INTERACTIVE SIMULATION EXPERIMENTS ON SYRIA MAP"
        subtitle="التحقق التطبيقي: من الصياغة الرياضية المجردة إلى المحاكاة الجغرافية التفاعلية على شبكة خلوية فعلية تضم 79,268 موقعاً"
        badge={<SectionBadge text="محاكاة حية (Live Tests)" variant="accent" />}
      />

      {/* Main Container */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 0,
          margin: "4px 0",
          gap: "10px",
        }}
      >
        {/* Top Hero Card: Gateway to Interactive Platform */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            border: "1.5px solid rgba(66, 129, 119, 0.35)",
            boxShadow: "0 4px 16px rgba(66, 129, 119, 0.08)",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent top stripe */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              height: "3.5px",
              background:
                "linear-gradient(90deg, #428177 0%, #2e7d5b 50%, #6b1f2a 100%)",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #428177 0%, #2e7d5b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(66, 129, 119, 0.3)",
              }}
            >
              <Globe size={26} color="#ffffff" />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "2px",
                }}
              >
                <span
                  style={{
                    fontSize: "22.4px",
                    fontWeight: 900,
                    color: "#000000",
                  }}
                >
                  منصة المحاكاة الجغرافية التفاعلية المباشرة (Live Web GIS
                  Platform)
                </span>
                <span
                  style={{
                    fontSize: "19px",
                    background: "rgba(66, 129, 119, 0.12)",
                    color: "#428177",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontWeight: 800,
                    fontFamily: "Inter",
                  }}
                >
                  79,268 Cell Sites
                </span>
              </div>
              <div
                style={{
                  fontSize: "19.1px",
                  color: "#1e293b",
                  fontWeight: 700,
                  lineHeight: 1.45,
                }}
              >
                بيئة تفاعلية للتحقق الميداني المباشر تتيح استعراض سيناريوهات الترقية والتحكم
                على البنية الخلوية الفعلية في الجمهورية العربية السورية (مشغلي Syriatel و MTN بمختلف أجيال النفاذ).
              </div>
            </div>
          </div>

          {/* Primary Action Button to open URL */}
          <a
            href={testsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "linear-gradient(135deg, #428177 0%, #2e7d5b 100%)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "19.1px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(66, 129, 119, 0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <Compass size={18} />
            <span>فتح المنصة التفاعلية الحية</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Three Experiments Grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
            alignItems: "stretch",
            minHeight: 0,
          }}
        >
          {experiments.map((exp) => (
            <div
              key={exp.num}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: `1.5px solid ${exp.color}40`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top Accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  height: "4px",
                  background: exp.color,
                }}
              />

              <div>
                {/* Header Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      background: `${exp.color}15`,
                      color: exp.color,
                      fontSize: "18.6px",
                      fontWeight: 900,
                      padding: "3px 10px",
                      borderRadius: "8px",
                      border: `1px solid ${exp.color}30`,
                    }}
                  >
                    {exp.path}
                  </span>
                  <span
                    dir="ltr"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "23px",
                      fontWeight: 900,
                      color: "rgba(0,0,0,0.2)",
                    }}
                  >
                    0{exp.num}
                  </span>
                </div>

                {/* Title & Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: exp.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: `0 3px 8px ${exp.color}35`,
                    }}
                  >
                    {exp.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 900,
                        color: exp.color,
                      }}
                    >
                      التجربة {exp.num}
                    </div>
                    <h3
                      style={{
                        fontSize: "21.1px",
                        fontWeight: 900,
                        color: "#000000",
                        lineHeight: 1.35,
                        margin: "2px 0 0 0",
                      }}
                    >
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Scope Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "#f8f8f5",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    fontSize: "18.6px",
                    fontWeight: 800,
                    color: "#2c3531",
                    marginBottom: "8px",
                    width: "100%",
                  }}
                >
                  <MapPin size={15} color={exp.color} />
                  <span>{exp.scope}</span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "19.1px",
                    color: "#1e293b",
                    fontWeight: 700,
                    lineHeight: 1.5,
                    margin: "0 0 10px 0",
                  }}
                >
                  {exp.desc}
                </p>

                {/* Mini KPIs */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "6px",
                    background: "#faf9f5",
                    borderRadius: "10px",
                    padding: "8px 6px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {exp.kpis.map((k, ki) => (
                    <div key={ki}>
                      <div
                        dir="ltr"
                        style={{
                          fontSize: "19.1px",
                          fontWeight: 900,
                          fontFamily: "Inter",
                          color: exp.color,
                        }}
                      >
                        {k.val}
                      </div>
                      <div
                        style={{
                          fontSize: "19px",
                          color: "#475569",
                          fontWeight: 700,
                          marginTop: "1px",
                        }}
                      >
                        {k.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button to launch test */}
              <a
                href={testsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: `${exp.color}15`,
                  border: `1.5px solid ${exp.color}45`,
                  borderRadius: "10px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: exp.color,
                  textDecoration: "none",
                  fontSize: "18.6px",
                  fontWeight: 900,
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Play size={14} fill={exp.color} />
                  <span>{exp.actionText}</span>
                </div>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Unifying Connector Banner */}
        <div
          style={{
            background:
              "linear-gradient(90deg, #428177 0%, #2e7d5b 50%, #6b1f2a 100%)",
            borderRadius: "12px",
            padding: "10px 18px",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Layers size={20} color="#edebe0" />
            <span
              style={{ fontSize: "19.1px", fontWeight: 900, color: "#ffffff" }}
            >
              تكامل الإطار: الدمج الميداني بين قاعدة البيانات الجغرافية المكانية،
              خوارزميات الاستمثال الذكية (BPSO/AGA)، وطبقة التحكم البرمجي الموحد متعدد الموردين
            </span>
          </div>

          <a
            href={testsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "18.6px",
              background: "rgba(255,255,255,0.22)",
              padding: "4px 12px",
              borderRadius: "12px",
              fontWeight: 800,
              fontFamily: "Inter",
              color: "#ffffff",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              flexShrink: 0,
            }}
          >
            <span>yaser-presentation.vercel.app/tests</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Footer Meta */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "19px",
          color: "rgba(0,0,0,0.7)",
          fontWeight: 700,
          borderTop: "1px solid rgba(66, 129, 119, 0.2)",
          paddingTop: "6px",
        }}
      >
    <span></span>
        <span style={{ fontFamily: "Inter", fontWeight: 700 }}>
          
        </span>
      </div>
    </div>
  );
};
