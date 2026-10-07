import React from "react";
import { motion } from "framer-motion";
import { alpha } from "../../design/tokens";
import { CLOSING_QUOTE, PAPERS } from "./facts";
import { C, CONTRIB, Draw, EASE, PhaseTrack, ResStage, Show, ShowG, T, useBeats } from "./stage";

const Dark: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <div
    className="slide"
    dir="rtl"
    onClick={onClick}
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 clamp(32px, 4vw, 64px)",
      boxSizing: "border-box",
      fontFamily: "Cairo, sans-serif",
      color: C.nightInk,
      background: `radial-gradient(ellipse 60% 55% at 50% 45%, ${alpha(C.teal, 0.22)} 0%, transparent 65%), ${C.night}`,
      cursor: onClick ? "pointer" : "default",
      userSelect: "none",
    }}
  >
    <div style={{ display: "none" }} />
    {children}
  </div>
);

const StatusBadge: React.FC<{ published: boolean; label: string }> = ({ published, label }) => (
  <span
    style={{
      fontSize: 19,
      fontWeight: 900,
      borderRadius: 999,
      padding: "2px 10px",
      color: published ? "#fff" : "#7a5410",
      background: published ? C.green : alpha(C.gold, 0.2),
      border: published ? "none" : `1px dashed ${C.gold}`,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

/* ═════════════ R-24 · Transition to research output ═════════════ */

export const ResToPapers: React.FC = () => (
  <Dark>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ position: "relative", marginBottom: 26 }}>
      <PhaseTrack phase={6} dark />
    </motion.div>
    <svg viewBox="0 0 1200 240" style={{ position: "relative", width: "min(1100px, 92%)" }}>
      {([1, 2, 3] as const).map((k, i) => {
        const y0 = 40 + i * 80;
        return <Draw key={k} d={`M 1180 ${y0} C 900 ${y0}, 780 120, 640 120`} color={[C.cyan, "#c0596a", C.gold][i]} width={3} delay={0.2 + i * 0.2} duration={1.2} />;
      })}
      {PAPERS.map((p, i) => (
        <motion.g key={p.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 + i * 0.25, duration: 0.6, ease: EASE }}>
          <rect x={150 + i * 140} y={52} width={110} height={140} rx={8} fill="rgba(255,255,255,0.06)" stroke={p.published ? C.cyan : C.gold} strokeWidth={1.8} strokeDasharray={p.published ? undefined : "6 5"} />
          {[0, 1, 2, 3, 4].map((l) => (
            <rect key={l} x={164 + i * 140} y={74 + l * 18} width={l === 4 ? 46 : 82} height={6} rx={3} fill="rgba(255,255,255,0.18)" />
          ))}
          <T x={205 + i * 140} y={214} size={13} weight={900} fill={p.published ? C.cyan : C.gold}>
            {p.published ? "منشور" : "قيد المراجعة"}
          </T>
        </motion.g>
      ))}
      <motion.circle cx={640} cy={120} r={16} fill={C.gold} initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.2, duration: 0.6 }} />
      <Draw d="M 622 120 H 590" color={C.gold} width={3} delay={1.3} duration={0.3} />
    </svg>
    <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.7 }} style={{ position: "relative", margin: "18px 0 0", fontSize: "clamp(40.1px, 4.64vw, 56px)", fontWeight: 900, textAlign: "center" }}>
      من البراهين التجريبية إلى النتاج العلمي المنشور
    </motion.h1>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.7 }} style={{ position: "relative", marginTop: 8, fontSize: "clamp(21.1px, 1.83vw, 26px)", fontWeight: 700, color: C.nightInkSoft, textAlign: "center" }}>
      اقتران كل مساهمة بحثية بمخطوطة علمية محكمة في مجلات ومؤتمرات تخصصية
    </motion.div>
  </Dark>
);

/* ═════════════ R-25 · Research portfolio ═════════════ */

const PORTFOLIO_POS: Record<1 | 2 | 3, { left: string; top: string; width: string }> = {
  1: { left: "84%", top: "36%", width: "31%" },
  2: { left: "50%", top: "80%", width: "36%" },
  3: { left: "16%", top: "36%", width: "31%" },
};

export const ResPortfolio: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  return (
    <ResStage
      phase={6}
      question="ما الحصيلة الأكاديمية والنتاج العلمي المحكّم للأطروحة؟"
      title="المحفظة البحثية والنتاج العلمي المنشور"
      beats={["الأطروحة", "مقالة المساهمة الأولى", "مقالة المساهمة الثانية", "مقالة المساهمة الثالثة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <ellipse cx={50} cy={50} rx={34} ry={40} fill="none" stroke={alpha(C.teal, 0.16)} strokeDasharray="4 6" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          {PAPERS.map((p) => {
            const pos = PORTFOLIO_POS[p.contribution];
            return (
              <ShowG key={p.id} step={step} at={p.contribution + 1}>
                <motion.line
                  x1={50}
                  y1={36}
                  x2={parseFloat(pos.left)}
                  y2={parseFloat(pos.top)}
                  stroke={CONTRIB[p.contribution].color}
                  strokeWidth={2.4}
                  strokeDasharray={p.published ? undefined : "7 6"}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </ShowG>
            );
          })}
        </svg>

        <Show step={step} at={1} from="scale" style={{ position: "absolute", left: "50%", top: "36%", zIndex: 2 }}>
          <motion.div
            animate={{ boxShadow: [`0 0 0 0 ${alpha(C.gold, 0.4)}`, `0 0 0 20px ${alpha(C.gold, 0)}`] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{
              transform: "translate(-50%, -50%)",
              width: "clamp(150px, 13vw, 190px)",
              aspectRatio: "1",
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, ${C.tealDeep}, ${C.night})`,
              border: `3px solid ${C.gold}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <span style={{ fontWeight: 900, fontSize: "clamp(27.3px, 2.44vw, 33.6px)", textAlign: "center", lineHeight: 1.2 }}>الأطروحة</span>
            <span style={{ fontSize: 19, fontWeight: 800, color: C.gold, marginTop: 4 }}>ثلاث أوراق علمية</span>
          </motion.div>
        </Show>

        {PAPERS.map((p) => {
          const c = CONTRIB[p.contribution];
          const pos = PORTFOLIO_POS[p.contribution];
          return (
            <Show key={p.id} step={step} at={p.contribution + 1} from="scale" style={{ position: "absolute", left: pos.left, top: pos.top, width: pos.width, zIndex: 3 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  transform: "translate(-50%, -50%)",
                  background: "#fff",
                  borderRadius: 16,
                  border: `1px solid ${alpha(c.color, 0.35)}`,
                  borderTop: `5px solid ${c.color}`,
                  boxShadow: `0 14px 34px ${alpha(c.color, 0.14)}`,
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 19, fontWeight: 900, color: "#fff", background: c.color, borderRadius: 6, padding: "1px 8px" }}>{c.ordinal}</span>
                  <StatusBadge published={p.published} label={p.status} />
                </div>
                <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 19, fontWeight: 800, lineHeight: 1.4, textAlign: "left", color: C.ink }}>
                  {p.title}
                </div>
                <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 19, fontWeight: 900, color: c.color, textAlign: "left" }}>
                  {p.venue || "—"}
                  <span style={{ fontWeight: 600, color: C.inkMuted }}>{` · ${p.citation}`}</span>
                </div>
                <div style={{ fontSize: 19, fontWeight: 700, color: C.inkSoft, lineHeight: 1.55, borderTop: `1px solid ${C.hair}`, paddingTop: 5 }}>{p.idea}</div>
              </div>
            </Show>
          );
        })}
      </div>
    </ResStage>
  );
};

/* ═════════════ R-26 · Contribution → paper journey ═════════════ */

const STAGES = ["المساهمة", "المخطوطة", "التحكيم", "القبول", "النشر"];

export const ResPaperJourney: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const xs = STAGES.map((_, i) => 1060 - i * 190);
  return (
    <ResStage
      phase={6}
      question="ما هي الحالة الأكاديمية ومسار التحكيم لكل ورقة بحثية؟"
      title="مسار النشر العلمي: من صياغة المخطوطة إلى النشر النهائي"
      beats={["المساهمة الأولى", "المساهمة الثانية", "المساهمة الثالثة", "الحصيلة"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source="الأطروحة · صفحة «المقالات» — المراحل دون تواريخ لعدم توثيقها"
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
        <svg viewBox="0 0 1400 70" style={{ width: "100%" }}>
          {STAGES.map((s, i) => (
            <T key={s} x={xs[i]} y={35} size={17} weight={900} fill={C.inkSoft}>
              {s}
            </T>
          ))}
        </svg>
        {([1, 2, 3] as const).map((k) => {
          const p = PAPERS.find((x) => x.contribution === k)!;
          const c = CONTRIB[k];
          const reach = p.published ? STAGES.length - 1 : 2;
          return (
            <Show key={k} step={step} at={k} from="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr", position: "relative" }}>
                <svg viewBox="0 0 1400 120" style={{ width: "100%" }}>
                  <line x1={xs[0]} x2={xs[STAGES.length - 1]} y1={60} y2={60} stroke={alpha(C.ink, 0.1)} strokeWidth={4} strokeLinecap="round" />
                  <Draw d={`M ${xs[0]} 60 H ${xs[reach]}`} color={c.color} width={6} duration={0.4 * reach + 0.3} />
                  {STAGES.map((s, i) => {
                    const done = i <= reach;
                    return (
                      <motion.g key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 * i }}>
                        <circle cx={xs[i]} cy={60} r={i === reach ? 17 : 12} fill={done ? c.color : "#fff"} stroke={done ? c.color : alpha(C.ink, 0.2)} strokeWidth={2} strokeDasharray={!done ? "4 3" : undefined} />
                        {i === reach && !p.published && <motion.circle cx={xs[i]} cy={60} fill="none" stroke={C.gold} strokeWidth={3} initial={{ r: 17, opacity: 0.9 }} animate={{ r: 30, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} />}
                      </motion.g>
                    );
                  })}
                  <T x={1385} y={44} size={17} anchor="start" weight={900} fill={c.color}>
                    {c.ordinal}
                  </T>
                  <T x={1385} y={74} size={13} anchor="start" weight={700} fill={C.inkSoft}>
                    {c.short}
                  </T>
                  <T x={xs[STAGES.length - 1] - 30} y={50} size={13.5} anchor="start" weight={900} fill={p.published ? C.green : "#7a5410"}>
                    {p.status}
                  </T>
                  <T x={xs[STAGES.length - 1] - 30} y={76} size={12} anchor="start" latin weight={700} fill={C.inkMuted}>
                    {p.venue ? p.venue.replace(" · Q1", "") : "Round 1"}
                  </T>
                </svg>
              </div>
            </Show>
          );
        })}
        <Show step={step} at={4} style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 6 }}>
          {[
            { n: "2", t: "مقالتان منشورتان", c: C.green },
            { n: "1", t: "مقالة قيد المراجعة", c: C.gold },
            { n: "3/3", t: "أوراق بحثية تغطي كافة المساهمات", c: C.teal },
          ].map((s) => (
            <div key={s.t} style={{ display: "flex", alignItems: "baseline", gap: 8, background: "#fff", border: `1px solid ${C.hair}`, borderRadius: 14, padding: "8px 18px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 35.4, fontWeight: 900, color: s.c }}>{s.n}</span>
              <span style={{ fontSize: 19.8, fontWeight: 900 }}>{s.t}</span>
            </div>
          ))}
        </Show>
      </div>
    </ResStage>
  );
};

/* ═════════════ R-27 · Scientific fingerprint ═════════════ */

const PRINT = [
  { h: "البيانات", s: "79,268 موقعاً" },
  { h: "GIS", s: "ArcGIS Pro · PostGIS" },
  { h: "التحسين", s: "BPSO · AGA · إصلاح القيود" },
  { h: "العدالة المكانية", s: "SFI 0.71" },
  { h: "التحكم الذكي", s: "عزل 97.5% حضرياً" },
  { h: "تنسيق Multi-Vendor", s: "Huawei · Ericsson" },
  { h: "التحقق التجريبي", s: "30 تشغيلاً · t-test" },
];

const PRINT_LINKS: Record<1 | 2 | 3, number[]> = { 1: [0, 1, 2, 6], 2: [1, 2, 3, 6], 3: [1, 4, 5, 6] };

export const ResFingerprint: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(3);
  const hub = { x: 700, y: 285 };
  const pos = PRINT.map((_, i) => {
    const a = ((-90 + (i * 360) / PRINT.length) * Math.PI) / 180;
    return { x: hub.x + 400 * Math.cos(a), y: hub.y + 215 * Math.sin(a) };
  });
  const paperPos: Record<1 | 2 | 3, { x: number; y: number }> = { 1: { x: 1300, y: 300 }, 2: { x: 700, y: 545 }, 3: { x: 100, y: 300 } };
  return (
    <ResStage
      phase={6}
      question="ما هي البصمة العلمية والقيمة المضافة التي تقدمها الأطروحة للمجتمع البحثي؟"
      title="البصمة العلمية التراكمية للأطروحة"
      beats={["سبعة أبعاد تكاملية", "الأوراق المنشورة", "الأثر العلمي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg viewBox="0 0 1400 580" style={{ width: "100%", height: "100%" }}>
          <ellipse cx={hub.x} cy={hub.y} rx={400} ry={215} fill="none" stroke={alpha(C.teal, 0.2)} strokeDasharray="5 7" />
          {pos.map((p, i) => (
            <motion.line key={i} x1={hub.x} y1={hub.y} x2={p.x} y2={p.y} stroke={alpha(C.teal, 0.45)} strokeWidth={1.6} strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.18, duration: 0.5 }} />
          ))}

          <ShowG step={step} at={2}>
            {([1, 2, 3] as const).map((k) =>
              PRINT_LINKS[k].map((n, j) => (
                <motion.path
                  key={`${k}-${n}`}
                  d={`M ${paperPos[k].x} ${paperPos[k].y} Q ${(paperPos[k].x + pos[n].x) / 2} ${(paperPos[k].y + pos[n].y) / 2 + (k === 2 ? -40 : 0)} ${pos[n].x} ${pos[n].y}`}
                  fill="none"
                  stroke={alpha(CONTRIB[k].color, 0.55)}
                  strokeWidth={2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.15 * j + (k - 1) * 0.3, duration: 0.6 }}
                />
              )),
            )}
            {([1, 2, 3] as const).map((k) => {
              const p = PAPERS.find((x) => x.contribution === k)!;
              const pp = paperPos[k];
              return (
                <g key={k}>
                  <rect x={pp.x - 88} y={pp.y - 26} width={176} height={52} rx={12} fill={CONTRIB[k].color} />
                  <T x={pp.x} y={pp.y - 8} size={13} weight={900} fill="#fff">
                    {`مقالة ${CONTRIB[k].ordinal}`}
                  </T>
                  <T x={pp.x} y={pp.y + 12} size={12} weight={800} fill="rgba(255,255,255,0.85)">
                    {p.status}
                  </T>
                </g>
              );
            })}
          </ShowG>

          {PRINT.map((n, i) => {
            const p = pos[i];
            return (
              <motion.g key={n.h} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.18, duration: 0.45, ease: EASE }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
                <rect x={p.x - 104} y={p.y - 32} width={208} height={64} rx={14} fill="#fff" stroke={C.teal} strokeWidth={1.6} />
                <T x={p.x} y={p.y - 9} size={17} weight={900}>
                  {n.h}
                </T>
                <T x={p.x} y={p.y + 15} size={12.5} weight={700} fill={C.inkSoft}>
                  {n.s}
                </T>
              </motion.g>
            );
          })}

          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }} style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
            <circle cx={hub.x} cy={hub.y} r={86} fill={C.night} stroke={C.gold} strokeWidth={3} />
            <T x={hub.x} y={hub.y + 2} size={30} weight={900} fill="#fff">
              الأطروحة
            </T>
          </motion.g>
        </svg>
      </div>
      <Show step={step} at={3} style={{ textAlign: "center", fontSize: "clamp(21.1px, 1.77vw, 26px)", fontWeight: 900 }}>
        تتكامل سبعة محاور بحثية لتؤسس إطاراً هندسياً فريداً، ترفد به الأوراق المنشورة الإنتاج العلمي العالمي
      </Show>
    </ResStage>
  );
};

/* ═════════════ R-28 · Closing ═════════════ */

const CHAIN = ["البيانات المكانية الواقعية", "الاستمثال الذكي والعدالة", "التحكم المكاني الدقيق", "البراهين التجريبية المقيسة", "النتاج العلمي المحكّم"];

export const ResClosing: React.FC = () => {
  const { step, goNext } = useBeats(2);
  return (
    <Dark onClick={() => goNext()}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "nowrap", width: "100%" }}>
        {CHAIN.map((c, i) => (
          <React.Fragment key={c}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.45, duration: 0.55, ease: EASE }}
              style={{
                padding: "14px 18px",
                borderRadius: 16,
                border: `1.5px solid ${i === CHAIN.length - 1 ? C.gold : "rgba(255,255,255,0.18)"}`,
                background: i === CHAIN.length - 1 ? alpha(C.gold, 0.14) : "rgba(255,255,255,0.04)",
                fontSize: "clamp(21.8px, 2.07vw, 30px)",
                fontWeight: 900,
                color: i === CHAIN.length - 1 ? C.gold : C.nightInk,
                whiteSpace: "nowrap",
              }}
            >
              {c}
            </motion.div>
            {i < CHAIN.length - 1 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 + i * 0.45 }} style={{ color: C.cyan, fontSize: 31.2, fontWeight: 900 }}>
                ←
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </div>
      <Show step={step} at={2} style={{ position: "relative", marginTop: "clamp(34px, 6vh, 64px)", maxWidth: 1050, textAlign: "center" }}>
        <div style={{ fontSize: 60, lineHeight: 0.6, color: C.gold, fontFamily: "Georgia, serif" }}>”</div>
        <div style={{ fontSize: "clamp(24.8px, 2.56vw, 35.4px)", fontWeight: 800, lineHeight: 1.75 }}>{CLOSING_QUOTE}</div>
        <div style={{ marginTop: 10, fontSize: 19.3, fontWeight: 800, color: C.nightInkSoft }}>الملخص التنفيذي للأطروحة</div>
      </Show>
    </Dark>
  );
};
