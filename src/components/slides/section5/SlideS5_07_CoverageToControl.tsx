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
  Compass,
  GitMerge,
  Radio,
  MapPinned,
  Network,
  Shield,
  Activity,
} from "lucide-react";

const quick = t.quick;

export const SlideS5_07_CoverageToControl: React.FC = () => {
  const spine = [
    {
      id: "strategic",
      title: "التخطيط الاستراتيجي",
      en: "STRATEGIC PLANNING",
      color: "#428177",
      icon: Compass,
      bullets: [
        "ترقية انتقائية توازن بدقة بين نفقات CAPEX و OPEX",
        "تعظيم التغطية وضمان التكافؤ المكاني عبر مؤشر SFI",
        "قرارات استراتيجية تمهد لاستدامة البنية الخلوية",
      ],
    },
    {
      id: "optimization",
      title: "الاستمثال الرياضي الهجين",
      en: "HYBRID OPTIMIZATION",
      color: "#2e7d5b",
      icon: GitMerge,
      bullets: [
        "خوارزميتا AGA و BPSO مع آلية حتمية لإصلاح القيود",
        "توليد جبهة باريتو لموازنة التغطية والكلفة والطاقة",
        "زمن تقارب (118–142 ثانية) ملائم للتخطيط الهندسي",
      ],
    },
    {
      id: "operational",
      title: "التحكم التشغيلي الميداني",
      en: "OPERATIONAL CONTROL",
      color: "#6b1f2a",
      icon: Radio,
      bullets: [
        "عزل مكاني دقيق للخدمة بنسبة 97.5% دون تشويش طيفي",
        "تنسيق برمجي موحد عبر معدات Huawei و Ericsson (> 97.4%)",
        "إدارة مكانية فورية وتراجع آمن (Rollback) على 2G/3G/4G",
      ],
    },
  ];

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="تكامل المنظومة: من التخطيط الاستراتيجي إلى التحكم التشغيلي"
        badge={
          <SectionBadge text="محور واحد — ثلاث طبقات" variant="primary" />
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
          margin: "4px 0",
          gap: "10px",
        }}
      >
        {/* Unified spine diagram */}
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            borderRadius: "16px",
            border: "1.5px solid rgba(66, 129, 119, 0.3)",
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 0,
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              alignItems: "stretch",
              position: "relative",
            }}
          >
            {/* Arrow backbone */}
            <svg
              style={{
                position: "absolute",
                top: "38px",
                right: "8%",
                left: "8%",
                height: "24px",
                pointerEvents: "none",
                zIndex: 0,
              }}
              viewBox="0 0 400 24"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#428177" />
                  <stop offset="50%" stopColor="#2e7d5b" />
                  <stop offset="100%" stopColor="#6b1f2a" />
                </linearGradient>
              </defs>
              <path
                d="M 380 12 L 30 12 M 30 12 L 42 6 M 30 12 L 42 18"
                fill="none"
                stroke="url(#spineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {spine.map((node, idx) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0.92, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...quick, delay: idx * 0.04 }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    background: `${node.color}08`,
                    border: `1.5px solid ${node.color}40`,
                    borderRadius: "14px",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: node.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} color="#ffffff" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "21.1px",
                          fontWeight: 900,
                          color: "#0f172a",
                        }}
                      >
                        {node.title}
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 800,
                          fontFamily: "Inter",
                          color: node.color,
                        }}
                      >
                        {node.en}
                      </div>
                    </div>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      padding: "0 14px 0 0",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "#1e293b",
                      lineHeight: 1.45,
                    }}
                  >
                    {node.bullets.map((b) => (
                      <li key={b} style={{ marginBottom: "4px" }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Layer stack — architecture strip */}
          <div
            style={{
              marginTop: "12px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {[
              {
                icon: MapPinned,
                label: "الاستهداف الجغرافي (GIS)",
                sub: "تحديد المضلعات والقطاعات",
                color: "#428177",
              },
              {
                icon: Network,
                label: "التكامل متعدد الموردين",
                sub: "Huawei · Ericsson",
                color: "#2e7d5b",
              },
              {
                icon: Shield,
                label: "العزل البرمجي للموجات",
                sub: "حجب جغرافي بنسبة 97.5%",
                color: "#6b1f2a",
              },
              {
                icon: Activity,
                label: "الرصد والاستعادة الفورية",
                sub: "مؤشرات الأداء والتراجع الآمن",
                color: "#428177",
              },
            ].map((chip, i) => {
              const ChipIcon = chip.icon;
              return (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0.92 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...quick, delay: 0.08 + i * 0.02 }}
                  style={{
                    background: "#edebe0",
                    border: `1px solid ${chip.color}35`,
                    borderRadius: "10px",
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ChipIcon size={18} color={chip.color} />
                  <div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 900,
                        color: "#0f172a",
                      }}
                    >
                      {chip.label}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: chip.color,
                        fontFamily: "Inter, Cairo",
                      }}
                    >
                      {chip.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            fontSize: "18.6px",
            fontWeight: 800,
            color: "#1e293b",
            textAlign: "center",
            padding: "6px 12px",
            background: "rgba(107, 31, 42, 0.06)",
            borderRadius: "8px",
            border: "1px solid rgba(107, 31, 42, 0.15)",
          }}
        >
          تتجلى القوة التطبيقية للأطروحة في امتدادها من النمذجة الاستراتيجية طويلة الأمد إلى التنفيذ الإجرائي الحركي على الشبكات الحية القائمة (2G/3G/4G).
        </div>
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
