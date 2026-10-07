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
  AlertCircle,
  Database,
  FunctionSquare,
  Cpu,
  Wrench,
  Scale,
  SlidersHorizontal,
  Sprout,
} from "lucide-react";

const quick = t.quick;

export const SlideS5_05_ScientificLesson: React.FC = () => {
  const milestones = [
    {
      id: "problem",
      label: "تشخيص الإشكالية",
      sub: "فجوة الترقية والتحكم الراديوي",
      icon: AlertCircle,
      color: "#6b1f2a",
    },
    {
      id: "gis",
      label: "الأساس المكاني",
      sub: "بناء فضاء القرار الجغرافي",
      icon: Database,
      color: "#428177",
    },
    {
      id: "model",
      label: "الصياغة الرياضية",
      sub: "تعدد الأهداف وتضارب القيود",
      icon: FunctionSquare,
      color: "#428177",
    },
    {
      id: "algo",
      label: "الاستمثال الهجين",
      sub: "استكشاف الحلول (AGA/BPSO)",
      icon: Cpu,
      color: "#2e7d5b",
    },
    {
      id: "repair",
      label: "إصلاح القيود",
      sub: "ضمان جدوى الحلول هندسياً",
      icon: Wrench,
      color: "#2e7d5b",
    },
    {
      id: "fair",
      label: "العدالة المكانية",
      sub: "إدراج قيد الإنصاف الجغرافي SFI",
      icon: Scale,
      color: "#6b1f2a",
    },
    {
      id: "control",
      label: "التحكم الميداني",
      sub: "التنسيق متعدد الموردين",
      icon: SlidersHorizontal,
      color: "#428177",
    },
    {
      id: "conclusion",
      label: "الأطروحة المتكاملة",
      sub: "الحصاد والآفاق المستقبلية",
      icon: Sprout,
      color: "#2e7d5b",
    },
  ];

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="المسار التكاملي للأطروحة: التسلسل المنهجي والتراكم المعرفي"
        badge={
          <SectionBadge text="خط زمني بصري للمسار البحثي" variant="primary" />
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
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          margin: "6px 0 4px",
          gap: "10px",
        }}
      >
        <div
          style={{
            fontSize: "19.1px",
            fontWeight: 800,
            color: "#1e293b",
            background: "rgba(66, 129, 119, 0.1)",
            border: "1px solid rgba(66, 129, 119, 0.25)",
            borderRadius: "10px",
            padding: "8px 14px",
            lineHeight: 1.45,
          }}
        >
          مسار منهجي مترابط: كل مرحلة تؤسس للمرحلة اللاحقة، حيث تتوج الخاتمة المحاور الثلاثة:
          التخطيط الاستراتيجي ← الإنصاف المكاني ← التحكم التشغيلي الميداني.
        </div>

        <div
          style={{
            flex: 1,
            position: "relative",
            background: "#ffffff",
            borderRadius: "16px",
            border: "1.5px solid rgba(66, 129, 119, 0.28)",
            padding: "18px 16px 14px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          {/* Spine */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "4%",
              left: "4%",
              height: "5px",
              transform: "translateY(-50%)",
              background:
                "linear-gradient(270deg, #6b1f2a 0%, #428177 35%, #2e7d5b 70%, #428177 100%)",
              borderRadius: "4px",
              opacity: 0.85,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "6px",
              alignItems: "stretch",
              position: "relative",
              zIndex: 2,
            }}
          >
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isHarvest = m.id === "conclusion";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0.92, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...quick, delay: idx * 0.03 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: isHarvest ? "52px" : "44px",
                      height: isHarvest ? "52px" : "44px",
                      borderRadius: "50%",
                      background: isHarvest
                        ? "linear-gradient(145deg, #2e7d5b, #428177)"
                        : "#ffffff",
                      border: `2.5px solid ${m.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isHarvest
                        ? "0 4px 14px rgba(46, 125, 91, 0.35)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                      position: "relative",
                      zIndex: 3,
                    }}
                  >
                    <Icon
                      size={isHarvest ? 24 : 20}
                      color={isHarvest ? "#ffffff" : m.color}
                      strokeWidth={2.2}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "19px",
                      fontWeight: 900,
                      color: "#0f172a",
                      lineHeight: 1.25,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: m.color,
                      lineHeight: 1.3,
                      fontFamily: "Inter, Cairo, sans-serif",
                    }}
                  >
                    {m.sub}
                  </div>
                  {idx < milestones.length - 1 && (
                    <span
                      style={{
                        position: "absolute",
                        display: "none",
                      }}
                      aria-hidden
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Vertical connector labels (reading direction) */}
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 2%",
              fontSize: "18px",
              fontWeight: 800,
              color: "rgba(66, 129, 119, 0.9)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span>START</span>
            <span style={{ color: "#2e7d5b" }}>HARVEST → CONCLUSIONS</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0.92, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={quick}
          style={{
            background:
              "linear-gradient(90deg, rgba(107,31,42,0.08) 0%, rgba(66,129,119,0.12) 50%, rgba(46,125,91,0.14) 100%)",
            borderRadius: "12px",
            borderRight: "4px solid #2e7d5b",
            padding: "10px 16px",
            fontSize: "19.3px",
            fontWeight: 800,
            color: "#1e293b",
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: "#2e7d5b" }}>الخلاصة العلمية:</span> صياغة إطار هندسي موحد يربط التخطيط
          الاستراتيجي التوسعي بالإنصاف المكاني والتحكم التشغيلي المرن — ليتجاوز مجرد التلخيص التقليدي فصلاً بفصل.
        </motion.div>
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
          Slide 05 • Thesis Journey Timeline
        </span>
      </div>
    </div>
  );
};
