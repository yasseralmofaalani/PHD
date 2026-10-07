import React from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Layers,
  Network,
  Compass,
  Cpu,
  Binary,
  BarChart3,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface SectionMarkerProps {
  number: string;
  titleAr: string;
  titleEn?: string;
  subtitle?: string;
  sectionId?: string;
}

const SectionMarker: React.FC<SectionMarkerProps> = ({
  number,
  titleAr,
  subtitle,
  sectionId,
}) => {
  // Determine pillars based on section number or title
  const getSectionPillars = () => {
    if (number === "01" || number === "٠١" || titleAr.includes("المقدمة")) {
      return [
        {
          icon: <Radio size={24} />,
          title: "تطور أجيال الاتصالات",
          desc: "التحول من 4G إلى 5G ومتطلبات الترقية الذكية للأبراج",
        },
        {
          icon: <Layers size={24} />,
          title: "واقع وتحديات الشبكات السورية",
          desc: "قيود الاستثمار، أزمة الطاقة، والتفاوت بين الريف والمدينة",
        },
        {
          icon: <Network size={24} />,
          title: "إشكالية البحث المركزية",
          desc: "  متعددة الأهداف بين التغطية الخليوية والكلفة المادية والعدالة المكانية",
        },
        {
          icon: <Compass size={24} />,
          title: "الأهداف الاستراتيجية",
          desc: " بناء إطار تحسين راديوي مكاني متكامل ومنظومة عزل آمنة للخدمات الخليوية",
        },
      ];
    }
    if (number === "02" || number === "٠٢" || titleAr.includes("النظرية")) {
      return [
        {
          icon: <Cpu size={24} />,
          title: "المفاهيم الراديوية والمكانية",
          desc: "انتشار الأمواج، مصفوفات التغطية، ونظم المعلومات الجغرافية GIS",
        },
        {
          icon: <BarChart3 size={24} />,
          title: "مؤشرات الأداء الرئيسية KPI",
          desc: "Key Performance Indicators · حساب نسبة الإشارة للتداخل SINR ومعدلات الإنتاجية الطيفية",
        },
        {
          icon: <Binary size={24} />,
          title: "خوارزميات الذكاء الاصطناعي",
          desc: "المقارنة المرجعية بين الخوارزميات التطورية وحشود الجسيمات",
        },
        {
          icon: <Layers size={24} />,
          title: "تحديد الفجوة البحثية",
          desc: "غياب البعد الجغرافي والعدالة المكانية في النماذج السابقة",
        },
      ];
    }
    if (number === "03" || number === "٠٣" || titleAr.includes("المساهمات")) {
      return [
        {
          icon: <Binary size={24} />,
          title: "النموذج الرياضي للترقية",
          desc: "صياغة دالة الهدف الموزونة متوازنة التغطية والكلفة وكفاءة الطاقة",
        },
        {
          icon: <Zap size={24} />,
          title: "خوارزميتا BPSO و AGA",
          desc: "التحسين الاستدلالي المتقدم مع آلية مشتركة لإصلاح القيود المكانية",
        },
        {
          icon: <Compass size={24} />,
          title: "مؤشر العدالة المكانية SFI",
          desc: "صياغة رياضية تضمن التوزيع العادل للطيف وتحدّ من التمركز الحضري",
        },
        {
          icon: <ShieldCheck size={24} />,
          title: "منظومة التحكم والعزل الآمن",
          desc: "عزل جغرافي موجه وقابل للتراجع بديلاً عن التشويش عبر موردين متعددين",
        },
      ];
    }
    if (number === "04" || number === "٠٤" || titleAr.includes("النتائج")) {
      return [
        {
          icon: <BarChart3 size={24} />,
          title: "الأساس التجريبي والتحقق",
          desc: "تطبيق على 79,268 موقعاً خلوياً حقيقياً، 5 سيناريوهات و30 تشغيلاً مستقلاً",
        },
        {
          icon: <CheckCircle2 size={24} />,
          title: "تفوّق التغطية والكلفة والطاقة",
          desc: "تغطية 95.12% مع توفير 6.0% في التكلفة و5.3% في استهلاك الطاقة لصالح BPSO",
        },
        {
          icon: <Award size={24} />,
          title: "العدالة المكانية والتحكم",
          desc: "قفزة مؤشر SFI إلى 0.71 (+36.5%) وعزل جغرافي بدقة 97.5% حضرياً",
        },
        {
          icon: <Sparkles size={24} />,
          title: " الإنتاج العلمي",
          desc: "ثلاث مقالات علمية   ",
        },
      ];
    }
    return [
      {
        icon: <Award size={24} />,
        title: "الاستنتاجات الشاملة",
        desc: "إثبات التوازن بين التغطية والكلفة والطاقة مع كسر الانحياز الحضري للأطروحة",
      },
      {
        icon: <Layers size={24} />,
        title: "التوصيات العملية للمشغلين",
        desc: "النشر المرحلي لخفض CAPEX، الإدارة الذكية للطاقة، وتنسيق الطوارئ الموحد",
      },
      {
        icon: <Zap size={24} />,
        title: "حدود الدراسة المنهجية",
        desc: "تأطير النطاق: البيانات اللحظية، موردان رئيسيان، والتخطيط الاستراتيجي",
      },
      {
        icon: <Sparkles size={24} />,
        title: "الآفاق والاتجاهات المستقبلية",
        desc: "شبكات 6G، الأتمتة الذاتية Zero-Touch، التوائم الرقمية",
      },
    ];
  };

  const pillars = getSectionPillars();

  return (
    <div
      className="section-marker-slide"
      dir="rtl"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "transparent",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-dark, #000000)",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      {/* Main Slide Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1240px",
          padding: "24px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "26px",
          textAlign: "center",
        }}
      >
        {/* Main Title Header */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: "clamp(42.6px, 5.86vw, 68px)",
              fontWeight: 900,
              color: "var(--primary, #428177)",
              fontFamily: "Cairo, sans-serif",
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: "0.5px",
            }}
          >
            {titleAr}
          </motion.h1>

          {/* Decorative underline bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "180px", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              height: "4px",
              background:
                "linear-gradient(90deg, transparent, #428177, #6b1f2a, transparent)",
              borderRadius: "3px",
              marginTop: "14px",
            }}
          />
        </div>

        {/* Arabic Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontSize: "clamp(21.8px, 2.2vw, 27.3px)",
              fontFamily: "Cairo, sans-serif",
              fontWeight: 600,
              color: "#000000",
              lineHeight: 1.6,
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* 4 Pillars Grid Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "18px",
            width: "100%",
            marginTop: "12px",
          }}
        >
          {pillars.map((pillar, idx) => {
            const isPrimary = idx % 2 === 0;
            const themeColor = isPrimary
              ? "var(--primary, #428177)"
              : "var(--accent, #6b1f2a)";
            const bgTint = isPrimary
              ? "rgba(66, 129, 119, 0.12)"
              : "rgba(107, 31, 42, 0.10)";
            const borderTint = isPrimary
              ? "rgba(66, 129, 119, 0.28)"
              : "rgba(107, 31, 42, 0.24)";

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: "#ffffff",
                  border: `1.5px solid ${borderTint}`,
                  borderRadius: "16px",
                  padding: "24px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "14px",
                    background: bgTint,
                    border: `1.5px solid ${borderTint}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: themeColor,
                  }}
                >
                  {React.isValidElement(pillar.icon)
                    ? React.cloneElement(
                        pillar.icon as React.ReactElement<{
                          color?: string;
                          size?: number;
                        }>,
                        {
                          color: isPrimary ? "#428177" : "#6b1f2a",
                          size: 28,
                        },
                      )
                    : pillar.icon}
                </div>
                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: 900,
                    color: themeColor,
                    fontFamily: "Cairo, sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </div>
                <div
                  style={{
                    fontSize: "19.3px",
                    fontWeight: 600,
                    color: "#2c3531",
                    fontFamily: "Cairo, sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  {pillar.desc}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionMarker;
