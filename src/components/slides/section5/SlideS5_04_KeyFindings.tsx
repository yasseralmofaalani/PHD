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
  Map,
  Cpu,
  Wrench,
  Scale,
  GitMerge,
  Building2,
  Database,
  Shield,
  Compass,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

const SCIENTIFIC: { label: string; icon: LucideIcon }[] = [
  { label: "الاستمثال المكاني المعتمد على نظم GIS", icon: Map },
  { label: "خوارزميات الاستمثال الهجين (AGA / BPSO)", icon: Cpu },
  { label: "آلية إصلاح القيود الطبوغرافية والهندسية", icon: Wrench },
  { label: "نمذجة قيد العدالة المكانية (SFI Formulation)", icon: Scale },
  { label: "الاستمثال متعدد الأهداف وجبهة باريتو", icon: GitMerge },
];

const PRACTICAL: { label: string; icon: LucideIcon }[] = [
  { label: "دعم قرارات تخطيط شبكات النفاذ الراديوي", icon: Building2 },
  { label: "التحقق الميداني ببيانات تشغيلية فعلية", icon: Database },
  { label: "الامتثال للقيود التضاريسية والتشغيلية الواقعية", icon: Shield },
  { label: "منظومة دعم القرار المكاني للمشغلين", icon: Compass },
  { label: "الربط بين التخطيط الاستراتيجي والتحكم الميداني", icon: SlidersHorizontal },
];

function ContributionBranch({
  title,
  accent,
  items,
  side,
}: {
  title: string;
  accent: string;
  items: { label: string; icon: LucideIcon }[];
  side: "scientific" | "practical";
}) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: "16px",
        padding: "14px 16px",
        background: side === "scientific" ? "#ffffff" : "rgba(255,255,255,0.92)",
        border: `2px solid ${accent}35`,
        borderTop: `4px solid ${accent}`,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          fontSize: "21.1px",
          fontWeight: 900,
          color: accent,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "relative",
          paddingInlineStart: "8px",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "8px",
            bottom: "8px",
            insetInlineEnd: "22px",
            width: "2px",
            background: `${accent}40`,
            borderRadius: 2,
          }}
        />
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: accent,
                  flexShrink: 0,
                  marginInlineEnd: "4px",
                  boxShadow: `0 0 0 3px ${accent}22`,
                }}
              />
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: `${accent}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color={accent} />
              </div>
              <span
                style={{
                  fontSize: "19.3px",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.35,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export const SlideS5_04_KeyFindings: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div style={slideContainerStyle} dir="rtl">
      <div style={techGridStyle} />

      <SlideHeader
        titleAr="الأثر العلمي والتطبيقي"
        badge={<SectionBadge text="المساهمة المزدوجة" variant="success" />}
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
          gap: "14px",
          margin: "6px 0",
        }}
      >
        {/* Hub connector */}
        <motion.div
          variants={fadeUp}
          style={{
            alignSelf: "center",
            padding: "8px 20px",
            borderRadius: "999px",
            background: "#428177",
            color: "#edebe0",
            fontSize: "19.3px",
            fontWeight: 900,
            boxShadow: "0 4px 14px rgba(66, 129, 119, 0.35)",
          }}
        >
          المنظومة التكاملية للأطروحة: التحليل المكاني · الاستمثال الهجين · التخطيط الراديوي · التحكم التشغيلي
        </motion.div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          <ContributionBranch
            title="المساهمة العلمية والنظرية (Scientific)"
            accent="#428177"
            items={SCIENTIFIC}
            side="scientific"
          />

          <motion.div
            variants={fadeUp}
            style={{
              width: "3px",
              alignSelf: "stretch",
              background:
                "linear-gradient(180deg, #428177 0%, #6b1f2a 50%, #2e7d5b 100%)",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />

          <ContributionBranch
            title="المساهمة التطبيقية والهندسية (Practical)"
            accent="#6b1f2a"
            items={PRACTICAL}
            side="practical"
          />
        </div>
      </motion.div>

      <SlideFooter slideLabel="Slide 04 · Section 05 · Scientific & Practical Impact" />
    </div>
  );
};
