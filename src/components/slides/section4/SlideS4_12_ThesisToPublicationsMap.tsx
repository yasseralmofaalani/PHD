// S4_12 — Vertical spine: thesis threads → publications (not a 3-card grid)
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SlideStage,
  SlideTitleBlock,
  StoryNode,
  StoryArrow,
  StatusPill,
  SlideFootnote,
} from "./shared";
import { palette, alpha, space, type as typeTokens } from "../../design/tokens";
import { publications } from "../../../data/thesisData";

const pub1 = publications[0];
const pub2 = publications[1];
const pub3 = publications[2];

type SpineRow = {
  thread: string;
  steps: string[];
  pubLabel: string;
  statusEn: string;
  statusAr: string;
  tone: "published" | "accepted" | "pending";
  color: string;
};

const SPINE: SpineRow[] = [
  {
    thread: "Optimization Framework",
    steps: ["إطار التحسين", "AGA + BPSO", "نتائج S2"],
    pubLabel: "Pub 2",
    statusEn: pub2.statusLabelEn,
    statusAr: pub2.statusLabelAr,
    tone: "accepted",
    color: palette.primary,
  },
  {
    thread: "Spatial Fairness",
    steps: ["Jain SFI", "سيناريو عدالة", "نتائج S3"],
    pubLabel: "Pub 3",
    statusEn: pub3.statusLabelEn,
    statusAr: pub3.statusLabelAr,
    tone: "pending",
    color: palette.warning,
  },
  {
    thread: "Cellular Service / Spatial Analysis",
    steps: ["GIS + عزل", "تطبيق ميداني", "نتائج Ch.6"],
    pubLabel: "Pub 1",
    statusEn: pub1.statusLabelEn,
    statusAr: pub1.statusLabelAr,
    tone: "published",
    color: palette.accent,
  },
];

export const SlideS4_12_ThesisToPublicationsMap: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <SlideStage variant="default" chapter="الإنتاج العلمي · خريطة" sectionTag="THESIS → PAPERS">
      <SlideTitleBlock
        eyebrow="ثلاث مسارات علمية — ثلاث أوراق"
        titleAr="من مساهمات الأطروحة إلى المنشورات"
        accent="primary"
        compact
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: space.lg,
          marginTop: space.sm,
        }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0.96, scaleY: 0.98 }}
          animate={{ opacity: 1, scaleY: 1 }}
          style={{
            width: 6,
            borderRadius: 99,
            background: `linear-gradient(180deg, ${palette.primary}, ${palette.accent}, ${palette.warning})`,
            marginInline: space.md,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: space.lg, minHeight: 0, overflow: "auto" }}>
          {SPINE.map((row) => (
            <motion.div
              key={row.thread}
              initial={reduce ? undefined : { opacity: 0.96, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: space.sm,
                padding: space.md,
                borderRadius: 16,
                background: alpha(row.color, 0.06),
                border: `1.5px solid ${alpha(row.color, 0.28)}`,
                borderInlineStart: `4px solid ${row.color}`,
              }}
            >
              <div
                dir="ltr"
                style={{
                  fontFamily: typeTokens.numeral,
                  fontSize: typeTokens.micro,
                  fontWeight: 900,
                  color: row.color,
                  letterSpacing: "0.6px",
                }}
              >
                {row.thread}
              </div>

              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: space.xs }}>
                {row.steps.map((step, i) => (
                  <React.Fragment key={step}>
                    {i > 0 && <StoryArrow color={row.color} />}
                    <StoryNode title={step} color={row.color} style={{ flex: "0 1 auto", minWidth: 88 }} />
                  </React.Fragment>
                ))}
                <StoryArrow color={palette.inkSoft} />
                <StoryNode
                  code={row.pubLabel}
                  title={row.pubLabel}
                  sub={row.statusEn}
                  color={row.color}
                  active
                />
                <StatusPill label={`${row.statusEn} / ${row.statusAr}`} tone={row.tone} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SlideFootnote color={palette.primary} badge="MAP">
        Pub1 = control · Pub2 = planning · Pub3 = fairness — بدون اختلاق أسماء مجلات للورقتين 2 و 3.
      </SlideFootnote>
    </SlideStage>
  );
};
