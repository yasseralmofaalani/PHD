import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Fingerprint, Layers, MapPinned, MessageSquare, Phone, Radio, RotateCcw, Server, Timer, Wifi, type LucideIcon } from "lucide-react";
import { Box, C, Chip, ContribStage, EASE, Pulse, Show, ShowG, SYRIA_OUTLINE, SyriaBase, T, insideSyria, useBeats, useSites } from "./kit";

/* ───────── Shared operational geometry ───────── */

const pointInPoly = (pts: Array<[number, number]>, x: number, y: number) => {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

const Tower: React.FC<{ x: number; y: number; color: string; s?: number }> = ({ x, y, color, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round">
    <path d="M0 -10 L-6 9 M0 -10 L6 9 M-4 3 H4 M-2.5 -3 H2.5" />
    <circle cx={0} cy={-11} r={1.8} fill={color} />
  </g>
);

/* ═════════════ III-1 · Syria map + tri-sector cells + isolation circle ═════════════ */

const SECTOR_EDGE = ["#60a5fa", "#fb7185", "#4ade80"] as const;
const ZONE = { x: 318, y: 283, r: 34 };

const dist = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by);
const inCircle = (x: number, y: number) => dist(x, y, ZONE.x, ZONE.y) <= ZONE.r;

const rhombus = (cx: number, cy: number, angleDeg: number, size: number): Array<[number, number]> => {
  const a = (angleDeg * Math.PI) / 180;
  const tip = size;
  const side = size * 0.62;
  return [
    [cx, cy],
    [cx + side * Math.cos(a - Math.PI / 6), cy + side * Math.sin(a - Math.PI / 6)],
    [cx + tip * Math.cos(a), cy + tip * Math.sin(a)],
    [cx + side * Math.cos(a + Math.PI / 6), cy + side * Math.sin(a + Math.PI / 6)],
  ];
};

const polyStr = (pts: Array<[number, number]>) => pts.map((p) => p.join(",")).join(" ");

const sectorReachesZone = (pts: Array<[number, number]>) => pts.some(([x, y]) => inCircle(x, y)) || pointInPoly(pts, ZONE.x, ZONE.y);

const ring = (n: number, radius: number, start = -Math.PI / 2) =>
  Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    return { x: ZONE.x + Math.cos(a) * radius, y: ZONE.y + Math.sin(a) * radius * 0.82 };
  });

type ReachKind = "inside" | "outside-reach" | "far";
type SectorSite = {
  x: number;
  y: number;
  size: number;
  kind: ReachKind;
  sectors: Array<{ pts: Array<[number, number]>; hit: boolean }>;
};

const useTriSites = (): SectorSite[] => {
  const cloud = useSites(58, 19, 0.64);
  return useMemo(() => {
    const designed = [...ring(3, 12), ...ring(8, ZONE.r + 18), ...ring(6, ZONE.r + 56, Math.PI / 8)];
    const merged: Array<{ x: number; y: number; urban?: boolean }> = [];
    const take = (p: { x: number; y: number; urban?: boolean }, minD: number) => {
      if (!insideSyria(p.x, p.y)) return;
      if (merged.some((s) => dist(s.x, s.y, p.x, p.y) < minD)) return;
      merged.push(p);
    };
    designed.forEach((p) => take(p, 14));
    cloud.forEach((p) => take(p, 16));

    return merged.map((s) => {
      const d = dist(s.x, s.y, ZONE.x, ZONE.y);
      const siteInside = d <= ZONE.r;
      const toward = (Math.atan2(ZONE.y - s.y, ZONE.x - s.x) * 180) / Math.PI;
      const near = d < ZONE.r + 40;
      const size = siteInside ? 16 : near ? 24 : s.urban ? 13 : 11;
      const rot = near && !siteInside ? toward : (s.x + s.y) % 60;
      const sectors = [0, 1, 2].map((k) => {
        const pts = rhombus(s.x, s.y, rot + k * 120, size);
        return { pts, hit: sectorReachesZone(pts) };
      });
      const kind: ReachKind = siteInside ? "inside" : sectors.some((sec) => sec.hit) ? "outside-reach" : "far";
      return { x: s.x, y: s.y, size, kind, sectors };
    });
  }, [cloud]);
};

const TriSite: React.FC<{ site: SectorSite; reveal: number }> = ({ site, reveal }) => {
  const showReach = reveal >= 3;
  const showZone = reveal >= 2;
  const isOut = site.kind === "outside-reach";
  const isIn = site.kind === "inside";
  const goldIn = showZone && isIn;
  return (
    <g>
      {showReach && isOut && (
        <line x1={site.x} y1={site.y} x2={ZONE.x} y2={ZONE.y} stroke={C.gold} strokeOpacity={0.28} strokeWidth={0.9} strokeDasharray="3 3" />
      )}
      {site.sectors.map((sec, k) => {
        const hit = showReach && sec.hit;
        const outHit = hit && isOut;
        const gold = goldIn || outHit;
        return (
          <g key={k}>
            <polygon
              points={polyStr(sec.pts)}
              fill={goldIn ? "rgba(200,149,26,0.72)" : outHit ? "rgba(200,149,26,0.42)" : "rgba(8,16,18,0.25)"}
              stroke={gold ? C.gold : SECTOR_EDGE[k]}
              strokeWidth={gold ? 1.2 : 0.85}
              strokeLinejoin="round"
              opacity={showReach && site.kind === "far" ? 0.38 : 1}
            />
            <line x1={sec.pts[0][0]} y1={sec.pts[0][1]} x2={sec.pts[2][0]} y2={sec.pts[2][1]} stroke={gold ? C.gold : SECTOR_EDGE[k]} strokeWidth={0.45} opacity={0.8} />
          </g>
        );
      })}
      <circle
        cx={site.x}
        cy={site.y}
        r={(isOut && showReach) || goldIn ? 2.1 : 1.55}
        fill={goldIn || (showReach && isOut) ? C.gold : "#fb7185"}
        stroke="#fff"
        strokeWidth={0.45}
      />
    </g>
  );
};

const ZoneLayer: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <g>
    <circle cx={ZONE.x} cy={ZONE.y} r={ZONE.r + 10} fill="rgba(200,149,26,0.06)" />
    <circle cx={ZONE.x} cy={ZONE.y} r={ZONE.r} fill="rgba(200,149,26,0.10)" stroke={C.gold} strokeWidth={2.4} />
    <circle cx={ZONE.x} cy={ZONE.y} r={ZONE.r + 5} fill="none" stroke={C.gold} strokeOpacity={0.45} strokeWidth={0.9} strokeDasharray="3.5 3" />
    {!compact && (
      <T x={ZONE.x} y={ZONE.y - ZONE.r - 10} size={11} weight={900} fill={C.gold}>
        منطقة حجب الخدمة
      </T>
    )}
  </g>
);

export const C3Problem: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(4);
  const sites = useTriSites();
  const insideN = sites.filter((s) => s.kind === "inside").length;
  const reachN = sites.filter((s) => s.kind === "outside-reach").length;
  return (
    <ContribStage
      contribution={3}
      title="تحديد نطاق حجب الخدمة واستخلاص الخلايا الواصلة إليه"
      beats={["توزيع الخلايا داخل سورية", "دائرة المنطقة المستهدفة", "خلايا خارج الدائرة تصل إليها", "العزل يستهدف الواصل لا الموقع فقط"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.7fr 0.85fr", gap: 14 }}>
        <div style={{ position: "relative", minHeight: 0, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 10 }}>
          <div style={{ position: "relative", minHeight: 0, borderRadius: 18, overflow: "hidden", background: "rgba(8,16,18,0.45)", border: "1px solid rgba(79,184,171,0.18)" }}>
            <svg viewBox="228 36 520 472" style={{ width: "100%", height: "100%" }}>
              <defs>
                <clipPath id="syria-clip-c3">
                  <path d={SYRIA_OUTLINE} />
                </clipPath>
                <radialGradient id="zone-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(200,149,26,0.32)" />
                  <stop offset="70%" stopColor="rgba(200,149,26,0.08)" />
                  <stop offset="100%" stopColor="rgba(200,149,26,0)" />
                </radialGradient>
              </defs>
              <SyriaBase idSuffix="c3full" dark labels color={C.cyan} />
              <g clipPath="url(#syria-clip-c3)">
                {sites.map((s, i) => (
                  <TriSite key={i} site={s} reveal={step} />
                ))}
              </g>
              <ShowG step={step} at={2}>
                <circle cx={ZONE.x} cy={ZONE.y} r={92} fill="url(#zone-glow)" />
                <ZoneLayer />
                <rect x={ZONE.x - 78} y={ZONE.y - 78} width={156} height={156} rx={6} fill="none" stroke={C.gold} strokeOpacity={0.55} strokeWidth={1.2} strokeDasharray="4 3" />
              </ShowG>
            </svg>
            <div style={{ position: "absolute", right: 10, top: 8 }}>
              <Chip color={C.cyan} dark>
                سورية كاملة
              </Chip>
            </div>
          </div>
          <div style={{ position: "relative", minHeight: 0, borderRadius: 18, overflow: "hidden", background: "rgba(8,16,18,0.55)", border: `1.5px solid ${step >= 2 ? C.gold : "rgba(79,184,171,0.28)"}` }}>
            <svg viewBox={`${ZONE.x - 78} ${ZONE.y - 78} 156 156`} style={{ width: "100%", height: "100%" }}>
              <defs>
                <clipPath id="syria-clip-c3z">
                  <path d={SYRIA_OUTLINE} />
                </clipPath>
              </defs>
              <SyriaBase idSuffix="c3zoom" dark color={C.cyan} />
              <g clipPath="url(#syria-clip-c3z)">
                {sites
                  .filter((s) => dist(s.x, s.y, ZONE.x, ZONE.y) < 110)
                  .map((s, i) => (
                    <TriSite key={`z${i}`} site={s} reveal={step} />
                  ))}
              </g>
              <ShowG step={step} at={2}>
                <ZoneLayer compact />
              </ShowG>
            </svg>
            <div style={{ position: "absolute", right: 10, top: 8 }}>
              <Chip color={C.gold} dark={step < 2} solid={step >= 2}>
                تكبير النطاق
              </Chip>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
          <Chip color={C.cyan} dark>
            سيناريوهات الطوارئ المصرّح بها
          </Chip>
          <Show step={step} at={3} style={{ display: "grid", gap: 8 }}>
            <div style={{ background: "rgba(200,149,26,0.14)", border: `1.5px solid ${C.gold}`, borderRadius: 14, padding: "10px 12px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.gold }}>مواقع داخل الدائرة</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 30, fontWeight: 900, color: C.gold, lineHeight: 1.1 }}>{insideN}</div>
            </div>
            <div style={{ background: "rgba(200,149,26,0.14)", border: `1.5px solid ${C.gold}`, borderRadius: 14, padding: "10px 12px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.gold }}>خارج الدائرة لكن تغطيتها تصل</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 30, fontWeight: 900, color: C.gold, lineHeight: 1.1 }}>{reachN}</div>
              {step >= 4 && (
                <div style={{ fontSize: 15, fontWeight: 800, color: C.nightInk, marginTop: 6, lineHeight: 1.45 }}>
                  موقع خارج النطاق قد يغطي الدائرة بقطاعه. العزل يستهدف الخلايا الواصلة فقط.
                </div>
              )}
            </div>
          </Show>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ III-2 · Cellular service control mechanism ═════════════ */

const CREAM = "#f4f2ea";
const CREAM_SOFT = "rgba(244,242,234,0.74)";
const GOLD_LIT = "#f0c14d";

const FLOW = [
  {
    title: "تحديد المنطقة",
    beat: "تحديد المنطقة",
    tag: "دخل الخوارزمية",
    accent: C.gold,
    line: "دخل الخوارزمية: المنطقة المراد حجب التغطية عنها، الخلايا الخليوية، وتوقع التغطية الجغرافية لكل خلية.",
  },
  {
    title: "تقاطع التغطية",
    beat: "تقاطع التغطية",
    tag: "نظم المعلومات الجغرافية",
    accent: C.cyan,
    line: "يتقاطع نظام المعلومات الجغرافية المنطقة المراد حجبها مع طبقات التغطية المتوقعة، فتُستخلَص الخلايا التي تصل تغطيتها إلى النطاق.",
  },
  {
    title: "المعرّف والتعليمات",
    beat: "المعرّف والتعليمات",
    tag: "لكل خلية واصلة",
    accent: C.gold,
    line: "يُحدَّد الرقم المميز لكل خلية، وتُحدَّد التعليمات البرمجية لحجب الرسائل أو الاتصالات أو الإنترنت.",
  },
  {
    title: "إلغاء التعريف",
    beat: "إلغاء التعريف",
    tag: "الشبكة الجوهرية",
    accent: C.red,
    line: "تُنفَّذ التعليمات البرمجية لإلغاء تعريف هذه الخلايا من الشبكة الجوهرية الخليوية.",
  },
  {
    title: "تغطية بلا خدمة",
    beat: "تغطية بلا خدمة",
    tag: "النتيجة التشغيلية",
    accent: C.gold,
    line: "تبقى التغطية الراديوية موجودة، ولكن لا توجد خدمة.",
  },
  {
    title: "استعادة الخدمة",
    beat: "استعادة الخدمة",
    tag: "إعادة التعريف",
    accent: C.green,
    line: "بعد الانتهاء تُستعاد الخدمة بإعادة تعريف هذه الخلايا في الشبكة الجوهرية.",
  },
  {
    title: "عشر دقائق",
    beat: "عشر دقائق",
    tag: "الزمن التشغيلي",
    accent: C.gold,
    line: "عملية الحجب والاستعادة لا تتجاوز عشر دقائق.",
  },
] as const;

const CELLS: Array<{ id: string; svc: string; icon: LucideIcon }> = [
  { id: "417-01-18421", svc: "الرسائل", icon: MessageSquare },
  { id: "417-02-19007", svc: "الاتصالات", icon: Phone },
  { id: "417-01-20314", svc: "الإنترنت", icon: Wifi },
];

const INPUTS: Array<{ icon: LucideIcon; title: string; sub: string; color: string }> = [
  { icon: MapPinned, title: "المنطقة المراد حجب التغطية عنها", sub: "النطاق الجغرافي للحجب", color: C.gold },
  { icon: MapPinned, title: "الخلايا الخليوية", sub: "", color: C.gold },
  { icon: Radio, title: "توقع التغطية", sub: "البصمة الجغرافية لكل خلية", color: C.cyan },
];

const sectorAim = (pts: Array<[number, number]>) => (Math.atan2(pts[2][1] - pts[0][1], pts[2][0] - pts[0][0]) * 180) / Math.PI;
const angApart = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

const GisCanvas: React.FC<{ sites: SectorSite[] }> = ({ sites }) => (
  <svg viewBox={`${ZONE.x - 92} ${ZONE.y - 78} 184 156`} style={{ width: "100%", height: "100%", display: "block" }}>
    <SyriaBase idSuffix="mech" color="#8fd9cf" fillOpacity={0.14} />
    <circle cx={ZONE.x} cy={ZONE.y} r={ZONE.r + 10} fill="rgba(200,149,26,0.08)" />
    <motion.circle
      cx={ZONE.x}
      cy={ZONE.y}
      r={ZONE.r}
      fill="rgba(200,149,26,0.16)"
      stroke={C.gold}
      strokeWidth={1.8}
      strokeDasharray="5 3"
      animate={{ opacity: [0.72, 1, 0.72] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    />
    {(() => {
      const painted = sites.flatMap((site, i) => {
        const siteInside = dist(site.x, site.y, ZONE.x, ZONE.y) <= ZONE.r;
        const toward = (Math.atan2(ZONE.y - site.y, ZONE.x - site.x) * 180) / Math.PI;
        return site.sectors.map((sec, k) => ({
          key: `${i}-${k}`,
          sec,
          k,
          gold: siteInside || angApart(sectorAim(sec.pts), toward) <= 52,
        }));
      });
      const ordered = [...painted.filter((p) => p.gold), ...painted.filter((p) => !p.gold)];
      return ordered.map(({ key, sec, k, gold }) => (
        <g key={key}>
          <polygon
            points={polyStr(sec.pts)}
            fill={gold ? "rgba(200,149,26,0.78)" : SECTOR_EDGE[k]}
            fillOpacity={gold ? 0.82 : 0.92}
            stroke={gold ? C.gold : SECTOR_EDGE[k]}
            strokeWidth={gold ? 1.15 : 1}
            strokeLinejoin="round"
          />
          <line
            x1={sec.pts[0][0]}
            y1={sec.pts[0][1]}
            x2={sec.pts[2][0]}
            y2={sec.pts[2][1]}
            stroke={gold ? "#fff4d2" : "#0c1618"}
            strokeWidth={0.65}
            strokeLinecap="round"
            opacity={0.85}
          />
        </g>
      ));
    })()}
    {sites.map((site, i) => {
      const siteInside = dist(site.x, site.y, ZONE.x, ZONE.y) <= ZONE.r;
      return <circle key={`dot-${i}`} cx={site.x} cy={site.y} r={siteInside ? 2.2 : 1.45} fill={siteInside ? C.gold : "#e8e4d8"} stroke="#0c1618" strokeWidth={0.35} />;
    })}
    <T x={ZONE.x} y={ZONE.y - ZONE.r - 8} size={9} weight={900} fill={C.gold}>
      نطاق الحجب
    </T>
  </svg>
);

const SvcMark: React.FC<{ icon: LucideIcon; color: string; off?: boolean; label: string }> = ({ icon: Icon, color, off, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <div
      style={{
        position: "relative",
        width: 58,
        height: 58,
        borderRadius: 16,
        display: "grid",
        placeItems: "center",
        border: `1.5px solid ${off ? C.red : color}`,
        background: off ? "rgba(176,58,46,0.12)" : `${color}22`,
      }}
    >
      <Icon size={26} color={CREAM} strokeWidth={1.8} />
      {off && <span style={{ position: "absolute", width: 2, height: 46, borderRadius: 2, background: C.red, transform: "rotate(42deg)" }} />}
    </div>
    <div style={{ fontSize: 16, fontWeight: 800, color: off ? "rgba(244,242,234,0.55)" : CREAM }}>{label}</div>
  </div>
);

const CoreCard: React.FC<{ tone: string; verb: string }> = ({ tone, verb }) => (
  <div
    style={{
      height: "100%",
      minHeight: 0,
      borderRadius: 18,
      border: `1.5px solid ${tone}`,
      background: "rgba(0,0,0,0.24)",
      boxShadow: `inset 0 0 36px ${tone}24`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: 12,
      textAlign: "center",
    }}
  >
    <Server size={34} color={tone} strokeWidth={1.75} />
    <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 18, color: tone, letterSpacing: 0.4 }}>
      Core
    </div>
    <div style={{ fontSize: 22, fontWeight: 900, color: CREAM, lineHeight: 1.25 }}>{verb}</div>
    <div style={{ fontSize: 15, fontWeight: 700, color: CREAM_SOFT }}>الشبكة الجوهرية</div>
  </div>
);

const FlowArrow: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ display: "grid", placeItems: "center" }}>
    <svg width="26" height="64" viewBox="0 0 26 64" aria-hidden>
      <path d="M18 6 L8 32 L18 58" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CellRows: React.FC<{ mode: "instruct" | "undef" | "define" }> = ({ mode }) => {
  const tone = mode === "define" ? C.green : mode === "undef" ? C.red : C.gold;
  const verb = mode === "define" ? "إعادة التعريف" : mode === "undef" ? "إلغاء التعريف" : "التعليمة";
  return (
    <div style={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
      {CELLS.map((cell, i) => {
        const Icon = cell.icon;
        return (
          <motion.div
            key={cell.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.45, ease: EASE }}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1.15fr 0.95fr",
              gap: 10,
              alignItems: "center",
              background: "rgba(255,255,255,0.045)",
              border: `1px solid ${tone}73`,
              borderRadius: 14,
              padding: "8px 12px",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", background: `${tone}22`, border: `1px solid ${tone}` }}>
              <Icon size={18} color={tone} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: CREAM_SOFT }}>الرقم المميز</div>
              <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 900, color: CREAM, letterSpacing: 0.2 }}>
                {cell.id}
              </div>
            </div>
            <div style={{ textAlign: "start", minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: tone }}>{verb}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: CREAM, lineHeight: 1.25 }}>{mode === "define" ? cell.svc : `حجب ${cell.svc}`}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const MechanismVisual: React.FC<{ step: number; sites: SectorSite[] }> = ({ step, sites }) => {
  if (step === 1) {
    return (
      <div style={{ height: "100%", minHeight: 0, display: "grid", gridTemplateRows: "auto minmax(0, 1fr)", gap: 10, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {INPUTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.45, ease: EASE }}
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.045)",
                  border: `1.5px solid ${item.color}88`,
                  overflow: "hidden",
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, background: `${item.color}22`, border: `1px solid ${item.color}` }}>
                  <Icon size={22} color={item.color} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 13, color: item.color }}>
                    0{i + 1}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: CREAM, lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: CREAM_SOFT, marginTop: 2, lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div
          style={{
            minHeight: 0,
            overflow: "hidden",
            borderRadius: 16,
            padding: "8px 16px 12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(90deg, rgba(200,149,26,0.1), rgba(200,149,26,0.22))",
            border: `1.5px solid ${C.gold}`,
          }}
        >
          <svg viewBox="0 0 360 28" style={{ width: "68%", height: 22, display: "block", margin: "0 auto", flexShrink: 0 }} aria-hidden>
            <path d="M40 2 L180 24 M180 2 L180 24 M320 2 L180 24" fill="none" stroke={C.gold} strokeWidth="1.6" />
            <circle cx="180" cy="24" r="3.2" fill={C.gold} />
          </svg>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 4 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: GOLD_LIT }}>تُجمع العناصر الثلاثة ثم تُمرَّر</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: CREAM, lineHeight: 1.15 }}>دخل الخوارزمية</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {["منطقة الحجب", "المنطقة", "التغطية"].map((chip) => (
                <span key={chip} style={{ fontSize: 15, fontWeight: 800, color: "#1a1408", background: GOLD_LIT, borderRadius: 999, padding: "5px 12px" }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const layers = [
      { color: C.gold, icon: MapPinned, title: "طبقة المنطقة", sub: "النطاق الجغرافي المراد حجبه" },
      { color: C.cyan, icon: Radio, title: "طبقة التغطية", sub: "التوقع الجغرافي لكل خلية" },
      { color: GOLD_LIT, icon: Layers, title: "ناتج التقاطع", sub: "الخلايا التي تصل تغطيتها" },
    ];
    return (
      <div style={{ height: "100%", minHeight: 0, display: "grid", gridTemplateRows: "minmax(0, 1fr) auto", gap: 8, overflow: "hidden" }}>
        <div style={{ minHeight: 0, borderRadius: 16, overflow: "hidden", background: "rgba(0,0,0,0.22)", border: "1px solid rgba(143,217,207,0.28)", position: "relative" }}>
          <GisCanvas sites={sites} />
          <div style={{ position: "absolute", left: 10, bottom: 10, fontSize: 14, fontWeight: 800, color: CREAM, background: "rgba(12,22,24,0.78)", borderRadius: 999, padding: "4px 10px" }}>
            الذهبي: داخل الدائرة أو اتجاهه نحوها
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 34px 1fr 34px 1fr", gap: 8, alignItems: "center" }}>
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <React.Fragment key={layer.title}>
                {i > 0 && (
                  <div style={{ display: "grid", placeItems: "center" }}>
                    {i === 1 ? (
                      <span style={{ fontSize: 16, fontWeight: 900, color: GOLD_LIT }}>مع</span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                        <path d="M12 3 L5 9 L12 15" fill="none" stroke={GOLD_LIT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 14, padding: "8px 10px", background: "rgba(255,255,255,0.045)", border: `1px solid ${layer.color}66`, minWidth: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, display: "grid", placeItems: "center", flexShrink: 0, background: `${layer.color}22` }}>
                    <Icon size={16} color={layer.color} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: CREAM, lineHeight: 1.2 }}>{layer.title}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: CREAM_SOFT, marginTop: 1, lineHeight: 1.3 }}>{layer.sub}</div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: GOLD_LIT, fontSize: 16, fontWeight: 800 }}>
            <Fingerprint size={18} />
            الرقم المميز والتعليمة البرمجية
          </div>
          <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1408", background: GOLD_LIT, borderRadius: 999, padding: "4px 10px" }}>
            LOCK(Cell-ID, SMS | VOICE | DATA)
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <CellRows mode="instruct" />
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div style={{ height: "100%", minHeight: 0, display: "grid", gridTemplateColumns: "1.35fr 28px 0.72fr", gap: 8 }}>
        <CellRows mode="undef" />
        <FlowArrow color={C.red} />
        <CoreCard tone={C.red} verb="إلغاء التعريف" />
      </div>
    );
  }

  if (step === 5) {
    return (
      <div style={{ height: "100%", minHeight: 0, display: "grid", gridTemplateColumns: "1fr 52px 1fr", gap: 8 }}>
        <div style={{ minHeight: 0, borderRadius: 18, border: `1.5px solid ${C.cyan}`, background: "rgba(79,184,171,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 10 }}>
          <svg viewBox="0 0 180 110" style={{ width: "78%", maxHeight: 120 }}>
            {[0, 1, 2].map((k) => (
              <motion.circle
                key={k}
                cx={90}
                cy={64}
                fill="none"
                stroke={C.cyan}
                strokeWidth={1.6}
                initial={{ r: 16, opacity: 0.7 }}
                animate={{ r: [16, 48], opacity: [0.65, 0] }}
                transition={{ duration: 2.1, repeat: Infinity, delay: k * 0.55, ease: "easeOut" }}
              />
            ))}
            <Tower x={90} y={64} color={C.cyan} s={1.7} />
          </svg>
          <div style={{ fontSize: 28, fontWeight: 900, color: CREAM, lineHeight: 1.15 }}>التغطية موجودة</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: CREAM_SOFT }}>البث الراديوي مستمر</div>
        </div>
        <div style={{ display: "grid", placeItems: "center", fontSize: 22, fontWeight: 900, color: GOLD_LIT }}>لكن</div>
        <div style={{ minHeight: 0, borderRadius: 18, border: `1.5px solid ${C.red}`, background: "rgba(176,58,46,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 10 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {CELLS.map((cell) => (
              <SvcMark key={cell.id} icon={cell.icon} color={C.red} off label={cell.svc} />
            ))}
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: CREAM, lineHeight: 1.15 }}>لا توجد خدمة</div>
        </div>
      </div>
    );
  }

  if (step === 6) {
    return (
      <div style={{ height: "100%", minHeight: 0, display: "grid", gridTemplateColumns: "0.72fr 28px 1.35fr", gap: 8 }}>
        <CoreCard tone={C.green} verb="إعادة التعريف" />
        <FlowArrow color={C.green} />
        <div style={{ minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.green, fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
            <RotateCcw size={18} />
            تعود الخلايا معرَّفة وتعود خدماتها
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, minHeight: 0 }}>
            {CELLS.map((cell, i) => {
              const Icon = cell.icon;
              return (
                <motion.div
                  key={cell.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4, ease: EASE }}
                  style={{ borderRadius: 16, padding: "12px 10px", background: "rgba(46,125,91,0.12)", border: `1.5px solid ${C.green}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 14, display: "grid", placeItems: "center", background: "rgba(46,125,91,0.2)" }}>
                    <Icon size={22} color={CREAM} />
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: CREAM }}>{cell.svc}</div>
                  <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 800, color: CREAM_SOFT }}>
                    {cell.id}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", minHeight: 0, display: "grid", gridTemplateColumns: "0.72fr 1.28fr", gap: 18, alignItems: "center" }}>
      <div style={{ display: "grid", placeItems: "center" }}>
        <div
          style={{
            width: "min(176px, 100%)",
            aspectRatio: "1",
            borderRadius: "50%",
            border: `3px solid ${C.gold}`,
            boxShadow: "0 0 0 10px rgba(200,149,26,0.14), inset 0 0 32px rgba(200,149,26,0.16)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Timer size={18} color={GOLD_LIT} />
          <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 64, color: GOLD_LIT, lineHeight: 0.9, marginTop: 2 }}>
            ≤10
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, color: CREAM }}>دقائق</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "حجب الخدمة", note: "من تحديد النطاق حتى انقطاع الخدمة" },
          { label: "استعادة الخدمة", note: "من إعادة التعريف حتى عودة الخدمة" },
        ].map((row) => (
          <div key={row.label}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: CREAM }}>{row.label}</div>
              <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 900, color: GOLD_LIT }}>
                ≤ 10 min
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: CREAM_SOFT, marginTop: 2 }}>{row.note}</div>
            <div style={{ marginTop: 8, height: 10, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.9, ease: EASE }}
                style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${C.cyan}, ${C.gold})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const C3Architecture: React.FC = () => {
  const sites = useTriSites();
  const { step, goNext, goToStep } = useBeats(FLOW.length);
  const shown = Math.min(FLOW.length, Math.max(1, step));
  const current = FLOW[shown - 1];
  const progress = (shown - 1) / (FLOW.length - 1);
  return (
    <ContribStage
      contribution={3}
      title="آلية عمل التحكم بالخدمة الخليوية"
      beats={FLOW.map((item) => item.beat)}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "minmax(250px, 0.34fr) minmax(0, 1fr)", gap: 14 }}>
        <div style={{ position: "relative", minHeight: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ position: "absolute", right: 17, top: 16, bottom: 16, width: 2, background: "rgba(15,23,42,0.08)", zIndex: 0 }} />
          <div
            style={{
              position: "absolute",
              right: 17,
              top: 16,
              width: 2,
              zIndex: 0,
              height: `calc((100% - 32px) * ${progress})`,
              background: C.gold,
              transition: "height 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          {FLOW.map((item, i) => {
            const reached = step >= i + 1;
            const now = step === i + 1;
            return (
              <div key={item.title} style={{ flex: now ? 1.15 : 1, minHeight: 0, display: "grid", gridTemplateColumns: "36px minmax(0, 1fr)", gap: 8, alignItems: "stretch" }}>
                <div style={{ display: "grid", placeItems: "center", position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      width: now ? 34 : 28,
                      height: now ? 34 : 28,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 900,
                      fontSize: now ? 14 : 12,
                      color: now || reached ? "#1a1408" : C.inkMuted,
                      background: now || reached ? (now ? C.gold : C.cyan) : "#f7f6f0",
                      border: `1.5px solid ${now ? C.gold : reached ? C.cyan : "rgba(15,23,42,0.12)"}`,
                      boxShadow: now ? "0 0 0 4px rgba(200,149,26,0.18)" : "none",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
                <button
                  type="button"
                  data-no-advance="true"
                  onClick={() => goToStep(i + 1)}
                  style={{
                    minWidth: 0,
                    minHeight: 0,
                    height: "100%",
                    textAlign: "right",
                    cursor: "pointer",
                    fontFamily: "Cairo, sans-serif",
                    borderRadius: 14,
                    padding: "0 12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: now ? "#fff" : reached ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)",
                    border: now ? `1.5px solid ${C.gold}` : "1px solid rgba(15,23,42,0.06)",
                    boxShadow: now ? "0 8px 20px rgba(200,149,26,0.12)" : "none",
                    opacity: reached || now ? 1 : 0.55,
                  }}
                >
                  <div style={{ fontSize: now ? 18 : 15.5, fontWeight: 900, color: now ? C.ink : C.inkSoft, lineHeight: 1.25 }}>{item.title}</div>
                  {now && <div style={{ fontSize: 13, fontWeight: 800, color: item.accent, marginTop: 2 }}>{item.tag}</div>}
                </button>
              </div>
            );
          })}
        </div>

        <div
          style={{
            minWidth: 0,
            minHeight: 0,
            position: "relative",
            borderRadius: 22,
            overflow: "hidden",
            background: "linear-gradient(165deg, #132224 0%, #0c1618 58%, #101c1e 100%)",
            border: `1.5px solid ${current.accent}77`,
            boxShadow: "0 16px 36px rgba(12,22,24,0.16)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(circle at 100% 0%, rgba(200,149,26,0.16), transparent 34%)",
            }}
          />
          <div key={shown} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "14px 16px 12px", minHeight: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: current.accent }}>{current.tag}</div>
                <div dir="ltr" style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 13, color: GOLD_LIT }}>
                  {String(shown).padStart(2, "0")} / 07
                </div>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <MechanismVisual step={shown} sites={sites} />
              </div>
              <div style={{ flexShrink: 0, marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(244,242,234,0.12)" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: CREAM, lineHeight: 1.45 }}>{current.line}</div>
              </div>
          </div>
        </div>
      </div>
    </ContribStage>
  );
};

/* ═════════════ III-5 · Service isolation vs power-off ═════════════ */

const Scene: React.FC<{ mode: "off" | "iso"; phase: number }> = ({ mode, phase }) => {
  const neighbors: Array<[number, number]> = [
    [70, 70],
    [250, 70],
    [70, 230],
    [250, 230],
  ];
  const off = mode === "off";
  return (
    <svg viewBox="0 0 320 300" style={{ width: "100%", height: "100%" }}>
      <rect x={110} y={100} width={100} height={100} rx={12} fill="none" stroke={C.gold} strokeWidth={2.4} strokeDasharray="6 4" />
      {neighbors.map(([x, y], i) => (
        <g key={i}>
          <motion.circle cx={x} cy={y} initial={false} animate={{ r: off && phase >= 2 ? 112 : 58 }} transition={{ duration: 1.2 }} fill={off && phase >= 2 ? "rgba(176,58,46,0.14)" : "rgba(79,184,171,0.08)"} stroke={off && phase >= 2 ? C.red : "rgba(79,184,171,0.4)"} strokeDasharray="4 4" />
          <Tower x={x} y={y} color={C.nightInk} s={1.1} />
        </g>
      ))}
      <motion.circle cx={160} cy={150} initial={false} animate={{ r: off && phase >= 1 ? 0 : 58, opacity: off && phase >= 1 ? 0 : 1 }} transition={{ duration: 0.8 }} fill="rgba(79,184,171,0.2)" stroke={C.cyan} strokeWidth={1.6} />
      <Tower x={160} y={150} color={off && phase >= 1 ? "#6d7a7c" : C.cyan} s={1.5} />
      {off && phase >= 1 && <path d="M146 136 L174 164 M174 136 L146 164" stroke={C.red} strokeWidth={4} strokeLinecap="round" />}
      {!off && phase >= 1 && (
        <g transform="translate(268 260)">
          <rect x={-22} y={-18} width={44} height={36} rx={6} fill={C.nightSoft} stroke={C.cyan} />
          <T x={0} y={0} size={10} latin fill={C.nightInk}>
            Core
          </T>
          <path d="M14 -24 L28 -10 M28 -24 L14 -10" stroke={C.red} strokeWidth={3} strokeLinecap="round" />
        </g>
      )}
      {/* user equipment */}
      <g transform="translate(178 172)">
        <rect x={-6} y={-11} width={12} height={22} rx={3} fill={C.nightInk} />
        {((off && phase >= 2) || (!off && phase >= 2)) && (
          <path d={off ? "M8 0 L40 -60" : "M8 0 L-12 -18"} stroke={off ? C.red : C.cyan} strokeWidth={2} strokeDasharray="3 3" />
        )}
        {!off && phase >= 2 && <path d="M10 -16 L20 -6 M20 -16 L10 -6" stroke={C.red} strokeWidth={2.5} strokeLinecap="round" />}
      </g>
    </svg>
  );
};

export const C3Isolation: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const offSteps = ["إطفاء التغذية الراديوية للخلية", "تلاشي التغطية الحاملة في الموقع", "تغلغل تغطية الخلايا المجاورة لملء الفراغ", "إعادة ارتباط الأجهزة عبر الخلايا المحيطة", "فشل العزل الدقيق وتوسع نطاق الاضطراب"];
  const isoSteps = ["تحديد القطاعات المتداخلة عبر GIS", "تعليق الخدمة منطقياً في الشبكة الجوهرية (Core)", "استمرار البث الراديوي للإشارات المرجعية", "بقاء الأجهزة مرتبطة دون إمكانية النفاذ", "رفض طلبات الخدمة مع دقة جغرافية محكمة"];
  return (
    <ContribStage
      contribution={3}
      title="آلية عزل الخدمة المنطقي مع الحفاظ على البث الراديوي"
      beats={["إيقاف الطاقة التقليدي (RF Off)", "تداعيات التسريب والاتصال العكسي", "العزل البرمجي من الشبكة الجوهرية", "استمرار الإشارة وتجميد الخدمة", "المفهوم الهندسي الجوهري"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          { mode: "off" as const, title: "الإيقاف الراديوي التقليدي (قطع الطاقة)", color: C.red, steps: offSteps, at: 1, phase: step >= 2 ? 2 : 1, n: step >= 2 ? 5 : 2 },
          { mode: "iso" as const, title: "العزل المنطقي المقترح (الحفاظ على الإشعاع)", color: C.cyan, steps: isoSteps, at: 3, phase: step >= 4 ? 2 : 1, n: step >= 4 ? 5 : 2 },
        ].map((col) => (
          <Show key={col.mode} step={step} at={col.at} from={col.mode === "off" ? "right" : "left"} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${col.color}66`, borderRadius: 18, padding: 12, minHeight: 0 }}>
            <div style={{ gridColumn: "1 / -1", fontSize: 23, fontWeight: 900, color: col.color }}>{col.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {col.steps.slice(0, col.n).map((s, i) => (
                <motion.div key={s} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} style={{ fontSize: 18.6, fontWeight: 800, padding: "6px 10px", borderRadius: 10, background: i === 4 ? `${col.color}33` : "rgba(255,255,255,0.05)", color: C.nightInk }}>
                  {s}
                </motion.div>
              ))}
            </div>
            <div style={{ minHeight: 0 }}>
              <Scene mode={col.mode} phase={col.phase} />
            </div>
          </Show>
        ))}
      </div>
      <div style={{ minHeight: 70, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 6 }}>
        <Show step={step} at={5}>
          <div style={{ fontSize: 24.8, fontWeight: 900, color: C.nightInk }}>
            الفصل الهندسي التام بين <span style={{ color: C.cyan }}>استمرارية التغطية الراديوية</span> و <span style={{ color: C.gold }}>إمكانية النفاذ للخدمات</span>
          </div>
        </Show>
        <Show step={step} at={5} style={{ display: "flex", gap: 6, flexWrap: "wrap", maxWidth: 460, justifyContent: "flex-end" }}>
          {["الصوت", "الرسائل", "بيانات الحزم", "جلسات الحامل Bearer", "التسليم Handover"].map((t) => (
            <Chip key={t} color={C.cyan} dark>
              {t}
            </Chip>
          ))}
        </Show>
      </div>
    </ContribStage>
  );
};

/* ═════════════ III-6 · Closed loop (hero) ═════════════ */

const LOOP = [
  { t: "المنطقة المستهدفة", k: "iso" },
  { t: "استعلام مكاني GIS", k: "iso" },
  { t: "تقاطع التغطية", k: "iso" },
  { t: "استخراج الخلايا", k: "iso" },
  { t: "تصنيف المورد والتقنية", k: "iso" },
  { t: "التنسيق", k: "iso" },
  { t: "تقييد الخدمة", k: "iso" },
  { t: "مراقبة KPI", k: "kpi" },
  { t: "القرار", k: "dec" },
  { t: "التراجع Rollback", k: "res" },
  { t: "مزامنة الشبكة الجوهرية", k: "res" },
  { t: "إعادة تنشيط RAN", k: "res" },
  { t: "التحقق من KPI", k: "res" },
  { t: "استعادة الخدمة", k: "res" },
] as const;
const LOOP_AT = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4];
const LCX = 500;
const LCY = 235;
const LRX = 400;
const LRY = 190;
const loopPos = (i: number): [number, number] => {
  const a = -Math.PI / 2 - (i / LOOP.length) * Math.PI * 2;
  return [LCX + LRX * Math.cos(a), LCY + LRY * Math.sin(a)];
};
const LOOP_D = `M ${LCX} ${LCY - LRY} A ${LRX} ${LRY} 0 1 0 ${LCX + 0.1} ${LCY - LRY}`;

export const C3ClosedLoop: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(5);
  const color = (k: string) => (k === "iso" ? C.cyan : k === "kpi" ? C.gold : k === "dec" ? C.gold : C.green);
  return (
    <ContribStage
      contribution={3}
      title="دورة العزل والاستعادة المؤتمتة: منظومة الحلقة المغلقة"
      beats={["الاستهداف والتحليل المكاني", "التنسيق وفرض التقييد", "مراقبة المؤشرات واتخاذ القرار", "التراجع التدريجي واستعادة الخدمة", "إغلاق حلقة التحكم التشغيلي"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
      source=""
    >
      <svg viewBox="40 10 920 460" style={{ width: "100%", flex: 1, minHeight: 0 }}>
        <ellipse cx={LCX} cy={LCY} rx={LRX} ry={LRY} fill="none" stroke="rgba(79,184,171,0.18)" strokeWidth={16} />
        {step >= 5 && (
          <>
            <motion.path d={LOOP_D} fill="none" stroke={C.cyan} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
            <Pulse d={LOOP_D} color={C.gold} r={8} dur={6} />
            <Pulse d={LOOP_D} color={C.cyan} r={6} dur={6} begin={3} />
          </>
        )}
        {LOOP.map((n, i) => {
          const [x, y] = loopPos(i);
          return (
            <ShowG key={n.t} step={step} at={LOOP_AT[i]} delay={(i % 5) * 0.1}>
              {n.k === "dec" ? (
                <g>
                  <path d={`M${x} ${y - 30} L${x + 62} ${y} L${x} ${y + 30} L${x - 62} ${y} Z`} fill={C.gold} />
                  <T x={x} y={y} size={14} weight={900} fill={C.night}>
                    {n.t}
                  </T>
                </g>
              ) : (
                <Box x={x} y={y} w={150} h={40} label={n.t} color={color(n.k)} dark size={13} solid={i === 0 || i === LOOP.length - 1} />
              )}
            </ShowG>
          );
        })}
        <ShowG step={step} at={3}>
          <T x={LCX} y={LCY - 30} size={15} weight={800} fill={C.nightInkSoft}>
            انتهاء الحالة المصرّح بها؟
          </T>
        </ShowG>
        <ShowG step={step} at={5}>
          <T x={LCX} y={LCY + 6} size={30} weight={900} fill={C.nightInk}>
            حلقة مغلقة
          </T>
          <T x={LCX} y={LCY + 40} size={13} weight={900} latin fill={C.cyan}>
            CLOSED LOOP
          </T>
        </ShowG>
      </svg>
    </ContribStage>
  );
};
