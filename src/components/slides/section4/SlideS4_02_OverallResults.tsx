// S4_02 — Optimization evolution: Phase 1 (3 objectives) → Phase 2 (+ SFI)
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SlideStage, SlideTitleBlock, StoryNode, StoryArrow, SlideFootnote } from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { datasetStats } from "../../../data/thesisData";

export const SlideS4_02_OverallResults: React.FC = () => {
  const reduce = useReducedMotion();

  const phase1 = [
    { code: "MAP", title: "بيانات GIS + مواقع", sub: `${datasetStats.totalSites.toLocaleString("en-US")} موقع` },
    { code: "MODEL", title: "تغطية · CAPEX · طاقة", sub: "3 أهداف" },
    { code: "ALGO", title: "AGA / BPSO", sub: "الفصل 4 · S2" },
    { code: "OUT", title: "خطة ترقية شبكة", sub: "بدون SFI" },
  ];

  const phase2 = [
    { code: "+SFI", title: "قيد العدالة المكانية", sub: "Jain SFI", active: true },
    { code: "MODEL*", title: "نموذج رباعي الأهداف", sub: "4 أهداف" },
    { code: "ALGO", title: "AGA / BPSO", sub: "الفصل 5" },
    { code: "OUT*", title: "توازن جغرافي أوسع", sub: "SFI ↑", active: true },
  ];

  return (
    <SlideStage variant="default" chapter="النتائج · 02" sectionTag="OPTIMIZATION STORY">
      <SlideTitleBlock
        eyebrow="مسار البحث التجريبي"
        titleAr="من استمثال ثلاثي الأهداف إلى تخطيط مكانياً أكثر عدالة"
        accent="primary"
        compact
      />

      <motion.div
        initial={reduce ? undefined : { opacity: 0.96 }}
        animate={{ opacity: 1 }}
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: space.lg,
          marginTop: space.sm,
        }}
      >
        <div>
          <div
            style={{
              fontSize: typeTokens.small,
              fontWeight: 900,
              color: palette.primary,
              marginBottom: space.sm,
              display: "flex",
              alignItems: "center",
              gap: space.sm,
            }}
          >
            <span
              dir="ltr"
              style={{
                background: palette.primary,
                color: "#fff",
                padding: "3px 10px",
                borderRadius: 8,
                fontFamily: typeTokens.numeral,
                fontSize: typeTokens.micro,
              }}
            >
              Phase 1
            </span>
            Coverage + CAPEX + Energy → AGA/BPSO → Network Upgrade Planning
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {phase1.map((n, i) => (
              <React.Fragment key={n.code}>
                <StoryNode code={n.code} title={n.title} sub={n.sub} color={palette.primary} style={{ flex: "1 1 140px" }} />
                {i < phase1.length - 1 && <StoryArrow color={palette.primary} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`,
            borderRadius: 99,
          }}
        />

        <div>
          <div
            style={{
              fontSize: typeTokens.small,
              fontWeight: 900,
              color: palette.accent,
              marginBottom: space.sm,
              display: "flex",
              alignItems: "center",
              gap: space.sm,
            }}
          >
            <span
              dir="ltr"
              style={{
                background: palette.accent,
                color: "#fff",
                padding: "3px 10px",
                borderRadius: 8,
                fontFamily: typeTokens.numeral,
                fontSize: typeTokens.micro,
              }}
            >
              Phase 2
            </span>
            + Spatial Fairness → AGA/BPSO → Spatially balanced planning
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {phase2.map((n, i) => (
              <React.Fragment key={`${n.code}-${i}`}>
                <StoryNode
                  code={n.code}
                  title={n.title}
                  sub={n.sub}
                  color={palette.accent}
                  active={n.active}
                  style={{ flex: "1 1 140px" }}
                />
                {i < phase2.length - 1 && <StoryArrow color={palette.accent} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            borderRadius: 16,
            padding: space.lg,
            background: alpha(palette.primaryDeep, 0.06),
            border: `1.5px dashed ${alpha(palette.primary, 0.28)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: typeTokens.body,
            fontWeight: 800,
            color: palette.inkSoft,
            lineHeight: 1.55,
          }}
        >
          الخوارزميتان تبقيان ثابتتين — ما يتغيّر هو{" "}
          <strong style={{ color: palette.accent }}>صياغة الأهداف</strong> و{" "}
          <strong style={{ color: palette.primary }}>معنى «النتيجة الأمثل»</strong> على الخريطة.
        </div>
      </motion.div>

      <SlideFootnote color={palette.accent}>
        S2 (الفصل 4) يقيس الأداء ثلاثياً؛ سيناريو العدالة (الفصل 5) يضيف SFI كهدف رابع قابل للقياس.
      </SlideFootnote>
    </SlideStage>
  );
};
