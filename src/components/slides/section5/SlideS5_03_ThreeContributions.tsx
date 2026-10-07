import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
  SlideFooter,
} from "./shared";
import { fadeUp, staggerParent } from "../../design/motion";
import {
  Dna,
  Wrench,
  Scale,
  Signal,
  DollarSign,
  Zap,
  ArrowLeft,
} from "lucide-react";

const METRICS = [
  {
    label: "التغطية",
    bpso: "95.12%",
    aga: "94.91%",
    icon: Signal,
    note: "BPSO vs AGA",
  },
  {
    label: "التكلفة",
    bpso: "132.8 M$",
    aga: "141.2 M$",
    icon: DollarSign,
    note: "~6.0%",
  },
  {
    label: "الطاقة",
    bpso: "78.3 MWh",
    aga: "82.7 MWh",
    icon: Zap,
    note: "~5.3%",
  },
  {
    label: "SFI",
    bpso: "0.71",
    aga: "0.52",
    icon: Scale,
    note: "+36.5%",
  },
] as const;

export const SlideS5_03_ThreeContributions: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="النتائج الجوهرية والتحقق التجريبي"
        badge={<SectionBadge text="استنتاجات الفصل السابع" variant="accent" />}
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
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          margin: "4px 0",
        }}
      >
        <motion.p
          variants={fadeUp}
          style={{
            margin: 0,
            fontSize: "19.3px",
            fontWeight: 700,
            color: "#334155",
            lineHeight: 1.5,
            padding: "0 4px",
          }}
        >
          إطار هندسي متكامل لتخطيط ترقية شبكات 5G في بيئات متعددة الأجيال؛ يحقق التوازن الدقيق بين
          التغطية والكلفة واستهلاك الطاقة عبر استمثال هجين (AGA و BPSO) مدعوماً بآلية حتمية لإصلاح القيود،
          مع توسيع النموذج بقيد العدالة المكانية (SFI) وفق استنتاجات الفصل السابع.
        </motion.p>

        {/* Connected core → extension */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "12px",
            flex: 1,
            minHeight: 0,
          }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              flex: 1.1,
              borderRadius: "16px",
              padding: "16px 18px",
              background:
                "linear-gradient(145deg, #1b2624 0%, #2c5952 48%, #428177 100%)",
              color: "#edebe0",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: "1.5px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "0.3px",
                opacity: 0.9,
              }}
            >
              النواة الخوارزمية المطبقة
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {["AGA", "BPSO", "Constraint Repair"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontSize: "19.3px",
                    fontWeight: 900,
                    fontFamily: "Inter, Cairo, sans-serif",
                  }}
                >
                  {tag === "Constraint Repair" ? (
                    <Wrench size={14} />
                  ) : (
                    <Dna size={14} />
                  )}
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: 700,
                lineHeight: 1.45,
                opacity: 0.95,
              }}
            >
              صياغة استمثال متعدد الأهداف مع تحقق تجريبي شامل على 79,268 موقعاً
              خلوياً فعلياً (الفصل السابع).
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              alignSelf: "center",
              color: "#6b1f2a",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={28} strokeWidth={2.5} />
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              flex: 0.9,
              borderRadius: "16px",
              padding: "16px 18px",
              background: "#ffffff",
              border: "2px solid #2e7d5b",
              borderRight: "5px solid #2e7d5b",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#2e7d5b",
                fontWeight: 900,
                fontSize: "21.1px",
              }}
            >
              <Scale size={20} />
              توسيع النموذج: إدراج العدالة المكانية (SFI)
            </div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: 700,
                color: "#1e293b",
                lineHeight: 1.45,
              }}
            >
              ربط كفاءة التغطية بالإنصاف الجغرافي: رفع مؤشر SFI بنسبة 36.5% دون
              الإخلال بحدود التغطية الراديوية الإجمالية (الفصل السابع).
            </div>
          </motion.div>
        </div>

        {/* Metric ribbon — not card grid */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                style={{
                  borderRadius: "12px",
                  padding: "10px 12px",
                  background: "#ffffff",
                  borderTop: "3px solid #428177",
                  border: "1px solid rgba(66, 129, 119, 0.25)",
                  borderTopWidth: 3,
                  borderTopColor: "#428177",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "6px",
                  }}
                >
                  <Icon size={16} color="#428177" />
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {m.label}
                  </span>
                  <span
                    style={{
                      marginRight: "auto",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#2e7d5b",
                      fontFamily: "Inter",
                    }}
                  >
                    {m.note}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "8px",
                    fontFamily: "Inter, Cairo, sans-serif",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#64748b",
                      }}
                    >
                      BPSO
                    </div>
                    <div
                      style={{
                        fontSize: "21.8px",
                        fontWeight: 900,
                        color: "#428177",
                      }}
                    >
                      {m.bpso}
                    </div>
                  </div>
                  <div style={{ opacity: 0.35, fontWeight: 900 }}>vs</div>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#64748b",
                      }}
                    >
                      AGA
                    </div>
                    <div
                      style={{
                        fontSize: "19.8px",
                        fontWeight: 800,
                        color: "#6b1f2a",
                      }}
                    >
                      {m.aga}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      <SlideFooter slideLabel="Slide 03 · Section 05 · Thesis Evidence" />
    </div>
  );
};
