// S4_01 — Dataset scale: real national inventory → GIS → optimization
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  NumberReveal,
  MediaPlane,
  ProcessRiver,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { datasetStats } from "../../../data/thesisData";

export const SlideS4_01_SectionIntro: React.FC = () => {
  const reduce = useReducedMotion();
  const d = datasetStats;

  const techMix = [
    { label: "2G", val: d.sites2G, color: palette.primaryDeep },
    { label: "3G", val: d.sites3G, color: palette.primary },
    { label: "4G", val: d.sites4G, color: palette.success },
  ];

  return (
    <SlideStage variant="hero" chapter="النتائج · 01" sectionTag="DATASET SCALE">
      <SlideTitleBlock
        eyebrow="البيانات الوطنية الحقيقية"
        titleAr="79,268 موقعاً — من سجلات الشبكة إلى خطة ترقية مكانية"
        accent="primary"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: space.lg,
          marginTop: space.sm,
        }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0.94, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: space.md,
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              background: `radial-gradient(circle at 50% 18%, ${alpha(palette.primary, 0.32)} 0%, ${alpha(palette.primary, 0.05)} 65%)`,
              border: `2px solid ${alpha(palette.primary, 0.4)}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: space.sm,
              padding: space.lg,
              boxShadow: `0 16px 40px ${alpha(palette.primary, 0.14)}`,
            }}
          >
            <span style={{ fontWeight: 900, color: palette.primary, fontSize: typeTokens.small, letterSpacing: "0.6px" }}>
              حجم قاعدة البيانات · {d.country}
            </span>
            <NumberReveal
              value={d.totalSites}
              fractionDigits={0}
              size={typeTokens.hero}
              color={palette.primary}
            />
            <div
              dir="ltr"
              style={{
                display: "flex",
                gap: space.md,
                fontFamily: typeTokens.numeral,
                fontSize: typeTokens.small,
                fontWeight: 800,
                color: palette.inkSoft,
              }}
            >
              <span>{d.operators.join(" · ")}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: space.sm }}>
            {techMix.map((t) => (
              <div
                key={t.label}
                style={{
                  textAlign: "center",
                  padding: `${space.sm}px ${space.xs}px`,
                  borderRadius: 14,
                  background: alpha(t.color, 0.1),
                  border: `1.5px solid ${alpha(t.color, 0.35)}`,
                }}
              >
                <div style={{ fontSize: typeTokens.micro, fontWeight: 900, color: t.color }}>{t.label}</div>
                <div
                  dir="ltr"
                  style={{
                    fontFamily: typeTokens.numeral,
                    fontWeight: 900,
                    fontSize: typeTokens.h3,
                    color: palette.ink,
                  }}
                >
                  {t.val.toLocaleString("en-US")}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: space.sm,
              padding: `${space.sm}px ${space.md}px`,
              borderRadius: 12,
              background: alpha(palette.accent, 0.08),
              border: `1px solid ${alpha(palette.accent, 0.28)}`,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                dir="ltr"
                style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h2, color: palette.accent }}
              >
                {d.urbanPercent}%
              </div>
              <div style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft }}>حضري</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                dir="ltr"
                style={{ fontFamily: typeTokens.numeral, fontWeight: 900, fontSize: typeTokens.h2, color: palette.success }}
              >
                {d.ruralPercent}%
              </div>
              <div style={{ fontSize: typeTokens.micro, fontWeight: 800, color: palette.inkSoft }}>ريفي</div>
            </div>
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: space.md, minHeight: 0 }}>
          <ProcessRiver
            color={palette.primary}
            steps={[
              { label: "سجلات خلوية", sub: "Sites DB" },
              { label: "معالجة GIS", sub: "DEM · Clutter" },
              { label: "استمثال", sub: "AGA · BPSO" },
              { label: "نتائج التخطيط", sub: "Coverage · Cost" },
            ]}
          />
          <MediaPlane
            src="thesis_figures/fig18_syria_candidate_sites_map.png"
            fig="شكل 18"
            caption="توزيع المواقع المرشحة على المحافظات السورية"
            tint={palette.primary}
            style={{ flex: 1, minHeight: 180 }}
          />
        </div>
      </div>

      <SlideFootnote badge="REAL DATA" color={palette.primary}>
        كل تجارب الفصول 4–6 تُبنى على نفس المخزون المكاني — لا بيانات اصطناعية للمواقع.
      </SlideFootnote>
    </SlideStage>
  );
};
