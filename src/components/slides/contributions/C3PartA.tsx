import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Layers, MapPinned, Radio, SlidersHorizontal, Waypoints } from "lucide-react";
import { Box, C, Chip, ContribStage, Pulse, Show, ShowG, SYRIA_OUTLINE, SyriaBase, T, insideSyria, useBeats, useSites } from "./kit";
import { ARCH_LAYERS } from "./facts";

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
  const isOut = site.kind === "outside-reach";
  const isIn = site.kind === "inside";
  return (
    <g>
      {showReach && isOut && (
        <line x1={site.x} y1={site.y} x2={ZONE.x} y2={ZONE.y} stroke={C.gold} strokeOpacity={0.28} strokeWidth={0.9} strokeDasharray="3 3" />
      )}
      {site.sectors.map((sec, k) => {
        const hit = showReach && sec.hit;
        const outHit = hit && isOut;
        return (
          <g key={k}>
            <polygon
              points={polyStr(sec.pts)}
              fill={outHit ? "rgba(200,149,26,0.55)" : hit && isIn ? "rgba(79,184,171,0.28)" : "rgba(8,16,18,0.25)"}
              stroke={outHit ? C.gold : hit && isIn ? C.cyan : SECTOR_EDGE[k]}
              strokeWidth={outHit ? 1.15 : 0.85}
              strokeLinejoin="round"
              opacity={showReach && site.kind === "far" ? 0.38 : 1}
            />
            <line x1={sec.pts[0][0]} y1={sec.pts[0][1]} x2={sec.pts[2][0]} y2={sec.pts[2][1]} stroke={outHit ? C.gold : SECTOR_EDGE[k]} strokeWidth={0.45} opacity={0.8} />
          </g>
        );
      })}
      <circle
        cx={site.x}
        cy={site.y}
        r={isOut && showReach ? 2.1 : 1.55}
        fill={showReach && isOut ? C.gold : showReach && isIn ? C.cyan : "#fb7185"}
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
            <div style={{ background: "rgba(79,184,171,0.10)", border: `1.5px solid ${C.cyan}`, borderRadius: 14, padding: "10px 12px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.nightInkSoft }}>مواقع داخل الدائرة</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 30, fontWeight: 900, color: C.cyan, lineHeight: 1.1 }}>{insideN}</div>
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

/* ═════════════ III-2 · Six-layer architecture ═════════════ */

const LAYER_META = [
  { icon: MapPinned, short: "التحليل المكاني", role: "استعلام النطاق وتجهيز الملفات الجغرافية", out: "نطاق جغرافي" },
  { icon: Radio, short: "استخلاص الخلايا", role: "نمذجة الانتشار ثم التقاطع المكاني", out: "خلايا واصلة" },
  { icon: Layers, short: "التجريد متعدد الموردين", role: "توحيد الأوامر عبر محولات الموردين", out: "أمر موحّد" },
  { icon: Waypoints, short: "محرك التنسيق", role: "سياسات العزل والتحكم في النفاذ", out: "قرار تنفيذي" },
  { icon: SlidersHorizontal, short: "إعادة التهيئة", role: "ضبط عقد النفاذ والشبكة الجوهرية", out: "تهيئة حيّة" },
  { icon: Activity, short: "المراقبة والاستعادة", role: "مؤشرات الأداء ثم الاستعادة التلقائية", out: "حلقة مغلقة" },
] as const;

const archNode = (i: number, r = 112) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  return { x: 160 + r * Math.cos(a), y: 160 + r * Math.sin(a) };
};

export const C3Architecture: React.FC = () => {
  const { step, goNext, goToStep } = useBeats(7);
  const active = Math.min(step, 6) - 1;
  const integrated = step >= 7;
  return (
    <ContribStage
      contribution={3}
      title="الهندسة المعمارية للمنظومة: ست طبقات وظيفية متكاملة"
      beats={["التحليل المكاني GIS", "النمذجة الراديوية والاستخلاص", "التجريد متعدد الموردين", "محرك التنسيق والسياسات", "إعادة التهيئة الديناميكية", "المراقبة والاستعادة التلقائية", "التكامل الوظيفي الشامل"]}
      step={step}
      goNext={goNext}
      goToStep={goToStep}
    >
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.45fr 0.9fr", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, minHeight: 0 }}>
          {LAYER_META.map((layer, i) => {
            const Icon = layer.icon;
            const reached = step >= i + 1;
            const now = !integrated && step === i + 1;
            const tone = !reached ? "rgba(79,184,171,0.32)" : now || integrated ? C.gold : C.cyan;
            return (
              <motion.div
                key={layer.short}
                initial={false}
                animate={{ opacity: reached ? 1 : 0.42, scale: now || integrated ? 1 : 0.985 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 0,
                  overflow: "hidden",
                  background: now || integrated ? "rgba(200,149,26,0.12)" : "#ffffff",
                  border: `1.5px solid ${now || integrated ? C.gold : reached ? "rgba(79,184,171,0.38)" : "rgba(79,184,171,0.16)"}`,
                  boxShadow: now || integrated ? "0 0 22px rgba(200,149,26,0.18)" : "none",
                  borderRadius: 18,
                  padding: "12px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(8,16,18,0.45)",
                      border: `1px solid ${tone}`,
                    }}
                  >
                    <Icon size={20} color={tone} strokeWidth={2.2} />
                  </div>
                  <div style={{ textAlign: "start" }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 30, fontWeight: 900, color: tone, lineHeight: 1 }}>{i + 1}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: tone, marginTop: 2 }}>{layer.out}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: reached ? C.nightInk : C.nightInkSoft, lineHeight: 1.25, marginTop: 8 }}>{layer.short}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: C.nightInkSoft, lineHeight: 1.4, marginTop: 6 }}>{layer.role}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
          <svg viewBox="0 0 320 320" style={{ width: "100%", maxHeight: 290 }}>
            <circle cx={160} cy={160} r={124} fill="none" stroke="rgba(79,184,171,0.14)" strokeWidth={18} />
            {LAYER_META.map((_, i) => {
              const a = archNode(i);
              const b = archNode((i + 1) % 6);
              const lit = i === 5 ? integrated : step >= i + 2;
              return (
                <line
                  key={`e${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={integrated ? C.gold : lit ? C.cyan : "rgba(79,184,171,0.18)"}
                  strokeWidth={lit || integrated ? 2 : 1}
                  strokeDasharray={i === 5 && !integrated ? "4 4" : undefined}
                />
              );
            })}
            <circle cx={160} cy={160} r={52} fill="rgba(8,16,18,0.88)" stroke={integrated ? C.gold : C.cyan} strokeWidth={2} />
            <T x={160} y={150} size={16} weight={900} fill={integrated ? C.gold : C.cyan}>
              المنظومة
            </T>
            <T x={160} y={172} size={13} weight={800} fill={C.nightInkSoft}>
              ست طبقات
            </T>
            {LAYER_META.map((layer, i) => {
              const { x, y } = archNode(i);
              const reached = step >= i + 1;
              const now = !integrated && step === i + 1;
              const tone = !reached ? "rgba(79,184,171,0.35)" : now || integrated ? C.gold : C.cyan;
              return (
                <g key={layer.short}>
                  <circle cx={x} cy={y} r={now || integrated ? 23 : 19} fill="#0c1618" stroke={tone} strokeWidth={now || integrated ? 2.4 : 1.5} />
                  <T x={x} y={y} size={16} weight={900} fill={tone} latin>
                    {i + 1}
                  </T>
                </g>
              );
            })}
          </svg>
          <div
            style={{
              background: integrated ? "rgba(200,149,26,0.12)" : "rgba(79,184,171,0.10)",
              border: `1.5px solid ${integrated ? C.gold : C.cyan}`,
              borderRadius: 14,
              padding: "12px 14px",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 800, color: C.nightInkSoft }}>{integrated ? "التكامل الوظيفي" : `الطبقة ${active + 1} من 6`}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: integrated ? C.gold : C.nightInk, marginTop: 2 }}>
              {integrated ? "من النطاق الجغرافي إلى الاستعادة" : LAYER_META[active].short}
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.nightInkSoft, marginTop: 5, lineHeight: 1.45 }}>
              {integrated ? "البيانات تنزل من التحليل المكاني إلى الشبكة، ثم تعود المؤشرات بالمراقبة فتغلق الحلقة." : ARCH_LAYERS[active]}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.nightInkSoft, marginTop: 6 }}></div>
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
