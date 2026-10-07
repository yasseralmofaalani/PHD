// S4_06 — GIS spatial results + control evidence strip
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SlideStage, SlideTitleBlock, ProcessRiver, MediaPlane, MetricMeaning, SlideFootnote } from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { isolationAccuracy, multiVendor, restorationTime } from "../../../data/thesisData";
import { SyriaSpatialCanvas } from "../../ui/visualPatterns/SyriaSpatialCanvas";

export const SlideS4_06_ResultsControl: React.FC = () => {
  const reduce = useReducedMotion();
  const iso = isolationAccuracy;

  const gisSteps = [
    { label: "بيانات مكانية", sub: "GIS layers" },
    { label: "بنية خلوية", sub: "Multi-RAT" },
    { label: "قيود جغرافية", sub: "DEM · clutter" },
    { label: "استمثال", sub: "AGA · BPSO" },
    { label: "دعم قرار", sub: "Maps · KPIs" },
  ];

  return (
    <SlideStage variant="default" chapter="النتائج · 06 · GIS" sectionTag="SPATIAL ENVIRONMENT">
      <SlideTitleBlock
        eyebrow="GIS كبيئة موحّدة"
        titleAr="من الطبقات المكانية إلى قرارات التخطيط والتحكم على الخريطة"
        accent="primary"
        compact
      />

      <motion.div
        initial={reduce ? undefined : { opacity: 0.97 }}
        animate={{ opacity: 1 }}
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "0.72fr 1.28fr",
          gap: space.md,
          marginTop: space.sm,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: space.sm, minHeight: 0 }}>
          <ProcessRiver steps={gisSteps} color={palette.primaryDeep} />
          <div
            style={{
              flex: 1,
              minHeight: 100,
              borderRadius: 16,
              overflow: "hidden",
              border: `1.5px solid ${alpha(palette.primary, 0.28)}`,
              background: alpha(palette.primary, 0.04),
            }}
          >
            <SyriaSpatialCanvas
              height="100%"
              showLabels
              showBackbone
              showHexMesh
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: space.sm }}>
            <MetricMeaning
              label="عزل حضري كثيف"
              meaning={`دقة ${iso.urban}% (±1.3%) — نطاق Dense Urban فقط`}
              color={palette.accent}
            />
            <MetricMeaning
              label="متعدد الموردين"
              meaning={`Huawei ${multiVendor.huawei.orchestrationSuccess.mean}% · Ericsson ${multiVendor.ericsson.orchestrationSuccess.mean}% نجاح تنسيق`}
              color={palette.primary}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr auto",
            gap: space.sm,
            minHeight: 0,
          }}
        >
          <MediaPlane
            src="thesis_figures/fig18_syria_candidate_sites_map.png"
            fig="شكل 18"
            caption="مواقع مرشحة وطنية"
            tint={palette.primary}
          />
          <MediaPlane
            src="thesis_figures/fig24_syria_bpso_geographic_distribution.png"
            fig="شكل 24"
            caption="عدالة مكانية بعد SFI"
            tint={palette.accent}
          />
          <div style={{ gridColumn: "1 / -1" }}>
            <MediaPlane
              src="thesis_figures/fig31_gis_spatial_intersection_cells.png"
              fig="شكل 31"
              caption="تقاطع خلايا GIS للعزل المكاني"
              tint={palette.primaryDeep}
              style={{ minHeight: 140 }}
            />
          </div>
        </div>
      </motion.div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: space.md,
          justifyContent: "center",
          marginTop: space.sm,
          padding: `${space.sm}px ${space.md}px`,
          borderRadius: 12,
          background: alpha(palette.ink, 0.04),
          border: `1px solid ${alpha(palette.ink, 0.12)}`,
        }}
      >
        {(["2G", "3G", "4G"] as const).map((k) => (
          <span key={k} style={{ fontSize: typeTokens.small, fontWeight: 800, color: palette.inkSoft }}>
            {restorationTime[k].label}: ≤{restorationTime[k].max} {restorationTime[k].unit}
          </span>
        ))}
        <span style={{ fontSize: typeTokens.small, fontWeight: 800, color: palette.inkSoft }}>
          · multi-vendor overall {iso.multiVendorOverall}%
        </span>
      </div>

      <SlideFootnote badge="GIS + Control" color={palette.primaryDeep}>
        GIS ليس خلفية زخرفية — يضم القيود المكانية، نتائج التخطيط، وأدلة التحكم (عزل · استعادة · تعدد موردين).
      </SlideFootnote>
    </SlideStage>
  );
};
