import React from "react";
import { motion } from "framer-motion";
import {
  slideContainerStyle,
  techGridStyle,
  SlideHeader,
  SectionBadge,
} from "./shared";
import { ThesisImage } from "../../ui/ThesisImage";
import { fadeUp, t } from "../../design/motion";
import { ArrowLeft, TrendingUp } from "lucide-react";

const quick = t.quick;

export const SlideS5_06_OptimalToFair: React.FC = () => {
  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="التحول المنهجي: من الاستمثال التجاري إلى التخطيط المنصف مكانياً"
        badge={
          <SectionBadge text="العدالة المكانية — الفصل 5 / 7" variant="accent" />
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
          gap: "8px",
        }}
      >
        {/* Morph flow strip */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 72px 1fr",
            gap: "8px",
            alignItems: "stretch",
            minHeight: 0,
          }}
        >
          {/* Before */}
          <motion.div
            initial={{ opacity: 0.92, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={quick}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1.5px solid rgba(107, 31, 42, 0.35)",
              borderTop: "4px solid #6b1f2a",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "19.8px",
                  fontWeight: 900,
                  color: "#6b1f2a",
                }}
              >
                النهج التقليدي: الاستمثال المنحاز تجارياً
              </span>
              <span
                style={{
                  fontSize: "19px",
                  fontWeight: 800,
                  fontFamily: "Inter",
                  color: "#6b1f2a",
                  background: "rgba(107,31,42,0.1)",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
              >
                BEFORE
              </span>
            </div>
            <div
              style={{
                flex: 1,
                minHeight: "140px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(107,31,42,0.2)",
                background: "#fafaf9",
                marginBottom: "8px",
              }}
            >
              <ThesisImage
                src="thesis_figures/fig18_syria_candidate_sites_map.png"
                alt="الشكل 18 — خريطة المواقع المرشحة وتركز حضري"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
              }}
            >
              <div
                style={{
                  background: "rgba(107,31,42,0.08)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  SFI
                </div>
                <div
                  style={{
                    fontSize: "27.3px",
                    fontWeight: 900,
                    fontFamily: "Inter",
                    color: "#6b1f2a",
                  }}
                >
                  ≈ 0.52
                </div>
              </div>
              <div
                style={{
                  background: "rgba(107,31,42,0.08)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  النمط المكاني
                </div>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 900,
                    color: "#6b1f2a",
                    lineHeight: 1.35,
                  }}
                >
                  تمركز حضري مكثف وإغفال الأرياف
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bridge */}
          <motion.div
            initial={{ opacity: 0.92, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={quick}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#428177",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(66,129,119,0.35)",
              }}
            >
              <ArrowLeft size={28} color="#edebe0" strokeWidth={2.5} />
            </div>
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "18px",
                fontWeight: 900,
                color: "#428177",
                letterSpacing: "0.5px",
              }}
            >
              إدراج قيد العدالة SFI
            </div>
            <div
              style={{
                background: "#2e7d5b",
                color: "#fff",
                borderRadius: "10px",
                padding: "6px 8px",
                textAlign: "center",
                minWidth: "64px",
              }}
            >
              <TrendingUp size={18} style={{ margin: "0 auto 2px" }} />
              <div
                style={{
                  fontSize: "19px",
                  fontWeight: 900,
                  fontFamily: "Inter",
                }}
              >
                +36.5%
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0.92, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={quick}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1.5px solid rgba(46, 125, 91, 0.4)",
              borderTop: "4px solid #2e7d5b",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "19.8px",
                  fontWeight: 900,
                  color: "#2e7d5b",
                }}
              >
                النهج المطور: تخطيط عادل ومتوازن مكانياً
              </span>
              <span
                style={{
                  fontSize: "19px",
                  fontWeight: 800,
                  fontFamily: "Inter",
                  color: "#2e7d5b",
                  background: "rgba(46,125,91,0.12)",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
              >
                AFTER
              </span>
            </div>
            <div
              style={{
                flex: 1,
                minHeight: "140px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(46,125,91,0.25)",
                background: "#f0fdf4",
                marginBottom: "8px",
              }}
            >
              <ThesisImage
                src="thesis_figures/fig24_syria_bpso_geographic_distribution.png"
                alt="الشكل 24 — التوزيع الجغرافي بعد BPSO المنصف"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
              }}
            >
              <div
                style={{
                  background: "rgba(46,125,91,0.1)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  SFI
                </div>
                <div
                  style={{
                    fontSize: "27.3px",
                    fontWeight: 900,
                    fontFamily: "Inter",
                    color: "#2e7d5b",
                  }}
                >
                  0.71
                </div>
              </div>
              <div
                style={{
                  background: "rgba(46,125,91,0.1)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  نسبة التغطية الراديوية
                </div>
                <div
                  style={{
                    fontSize: "27.3px",
                    fontWeight: 900,
                    fontFamily: "Inter",
                    color: "#2e7d5b",
                  }}
                >
                  95.12%
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#428177",
                  }}
                >
                  مصانة هندسياً
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid rgba(66, 129, 119, 0.3)",
            borderRadius: "10px",
            padding: "8px 14px",
            fontSize: "18.6px",
            fontWeight: 800,
            color: "#0f172a",
            textAlign: "center",
          }}
        >
          إثبات هندسي حاسم: إدراج قيد العدالة المكانية أعاد توجيه قرارات الترقية نحو المناطق المحرومة
          دون أي هدر في الكفاءة الراديوية الإجمالية (ارتفاع SFI من 0.52 إلى 0.71 مع ثبات التغطية عند 95.12%).
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
