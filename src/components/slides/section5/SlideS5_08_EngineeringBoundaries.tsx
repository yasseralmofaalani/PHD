import React from "react";
import { motion } from "framer-motion";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
} from "./shared";
import { fadeUp, t } from "../../design/motion";
import {
  Target,
  AlertOctagon,
  Telescope,
  MapPin,
  Server,
  Clock,
  Cpu,
  Building2,
  Radio,
  Layers,
} from "lucide-react";

const quick = t.quick;

export const SlideS5_08_EngineeringBoundaries: React.FC = () => {
  const columns = [
    {
      id: "scope",
      title: "نطاق البحث المنجز",
      en: "CURRENT SCOPE",
      color: "#428177",
      icon: Target,
      items: [
        {
          icon: MapPin,
          text: "دراسة حالة واقعية على شبكة الجمهورية العربية السورية اعتماداً على بيانات جغرافية وتشغيلية محلية",
        },
        {
          icon: Server,
          text: "تطبيق طبقة التحكم الميداني على تجهيزات الموردين الرئيسيين (Huawei و Ericsson)",
        },
        {
          icon: Radio,
          text: "تركيز إجراءات التحكم والعزل التشغيلي على بنية النفاذ القائمة (2G/3G/4G)",
        },
        {
          icon: Clock,
          text: "زمن معالجة خوارزمي (118-142 ثانية) يلبي متطلبات التخطيط الهندسي دون الحاجة للزمن الحقيقي الصارم",
        },
      ],
    },
    {
      id: "limits",
      title: "المحددات المنهجية والتقنية",
      en: "KNOWN LIMITATIONS",
      color: "#6b1f2a",
      icon: AlertOctagon,
      items: [
        {
          icon: MapPin,
          text: "تعميم النموذج على شبكات أخرى يتطلب تكييف قواعد البيانات الجغرافية والسياسات المحلية",
        },
        {
          icon: Server,
          text: "توسيع التحكم ليشمل معدات Nokia و ZTE يستلزم تطوير محولات برمجية خاصة (Adapters)",
        },
        {
          icon: Clock,
          text: "اعتماد لقطة حركة ساكنة (Static Snapshot) دون نمذجة التغيرات الزمنية اللحظية للطلب",
        },
        {
          icon: Cpu,
          text: "المنظومة مصممة للتحكم التشغيلي الإداري وليس للضبط الراديوي اللحظي (Sub-millisecond RF)",
        },
        {
          icon: Building2,
          text: "اختبارات النشر التجاري الشامل تقع خارج النطاق الأكاديمي والتحقق المخبري للدراسة",
        },
      ],
    },
    {
      id: "opportunities",
      title: "الآفاق والفرص البحثية المتاحة",
      en: "RESEARCH OPPORTUNITIES",
      color: "#2e7d5b",
      icon: Telescope,
      items: [
        {
          icon: Clock,
          text: "نمذجة ديناميكية حركة المرور المتغيرة زمنياً (Dynamic Traffic Demand) عبر التنبؤ الذكي",
        },
        {
          icon: Server,
          text: "توسيع معمارية التحكم البرمجي لتشمل مزيداً من الموردين والتكامل مع مواصفات Open-RAN",
        },
        {
          icon: Layers,
          text: "تطوير الإطار ليشمل تقنيات 5G/6G: تشكيل الحزم، تقطيع الشبكة، ومستويات التحكم الموزعة",
        },
        {
          icon: MapPin,
          text: "إعادة تطبيق المنهجية المكانية المقترحة في سياقات جغرافية وتضاريسية إقليمية ودولية متنوعة",
        },
      ],
    },
  ];

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="الحدود الهندسية والمنهجية للدراسة"
        badge={
          <SectionBadge text="الأمانة الأكاديمية ونطاق التطبيق" variant="accent" />
        }
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          minHeight: 0,
          margin: "4px 0",
          alignItems: "stretch",
        }}
      >
        {columns.map((col, colIdx) => {
          const ColIcon = col.icon;
          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0.92, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...quick, delay: colIdx * 0.04 }}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                border: `1.5px solid ${col.color}35`,
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minHeight: 0,
              }}
            >
              <div
                style={{
                  background: col.color,
                  color: "#ffffff",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <ColIcon size={22} />
                <div>
                  <div style={{ fontSize: "19.8px", fontWeight: 900 }}>
                    {col.title}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      fontFamily: "Inter",
                      opacity: 0.92,
                    }}
                  >
                    {col.en}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {col.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.text}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "8px 10px",
                        borderRadius: "10px",
                        background: `${col.color}0a`,
                        border: `1px solid ${col.color}20`,
                      }}
                    >
                      <ItemIcon
                        size={17}
                        color={col.color}
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span
                        style={{
                          fontSize: "19px",
                          fontWeight: 700,
                          color: "#1e293b",
                          lineHeight: 1.45,
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0.92, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={quick}
        style={{
          position: "relative",
          zIndex: 5,
          background: "rgba(66, 129, 119, 0.1)",
          border: "1.5px solid rgba(66, 129, 119, 0.25)",
          borderRadius: "10px",
          padding: "8px 16px",
          fontSize: "18.6px",
          fontWeight: 800,
          color: "#1e293b",
          textAlign: "center",
        }}
      >
        إن التحديد الدقيق للمحددات الهندسية يجسد رصانة المنهج العلمي، ويبرز بدقة{" "}
        <span style={{ color: "#428177" }}>نطاق المساهمة المحققة</span>،
        فاتحاً آفاقاً واضحة لأبحاث ما بعد الدكتوراه.
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          justifyContent: "space-between",
          fontSize: "19px",
          color: "rgba(0,0,0,0.65)",
          fontWeight: 700,
          borderTop: "1px solid rgba(66, 129, 119, 0.2)",
          paddingTop: "6px",
        }}
      >
        <span></span>
        <span style={{ fontFamily: "Inter" }}>
         
        </span>
      </div>
    </div>
  );
};
