// GIS isolation: target polygon vs radio sectors (in / border / out).
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { palette, alpha, type as typeTokens } from "../../design/tokens";

interface IsolationSceneProps {
  showLabels?: boolean;
}

export const IsolationScene: React.FC<IsolationSceneProps> = ({
  showLabels = true,
}) => {
  const shouldReduce = useReducedMotion();
  return (
    <svg viewBox="0 0 420 280" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="iso-aoi" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={alpha(palette.accent, 0.28)} />
          <stop offset="100%" stopColor={alpha(palette.accent, 0)} />
        </radialGradient>
      </defs>
      <rect width="420" height="280" fill={palette.slideBgSoft} />
      {/* hex hint */}
      {[40, 120, 200, 280, 360].map((x, i) =>
        [40, 110, 180, 250].map((y, j) => (
          <circle key={`${i}-${j}`} cx={x + (j % 2) * 18} cy={y} r="1.2" fill={alpha(palette.primary, 0.18)} />
        )),
      )}

      <motion.polygon
        initial={shouldReduce ? undefined : { opacity: 0.94, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        points="210,70 290,110 275,200 160,210 130,130"
        fill="url(#iso-aoi)"
        stroke={palette.accent}
        strokeWidth="2"
        strokeDasharray="6 4"
        style={{ transformOrigin: "210px 145px" }}
      />

      {/* inside cell */}
      <g>
        <path d="M 210 145 L 250 115 L 250 175 Z" fill={alpha(palette.primary, 0.35)} stroke={palette.primary} />
        <circle cx="210" cy="145" r="5" fill={palette.primary} />
        {showLabels && (
          <text x="252" y="148" fontSize="10" fontWeight="800" fill={palette.primary} fontFamily="Cairo, sans-serif">داخل</text>
        )}
      </g>
      {/* border cell */}
      <g>
        <path d="M 275 175 L 320 150 L 325 210 Z" fill={alpha(palette.gold, 0.35)} stroke={palette.gold} />
        <circle cx="275" cy="175" r="5" fill={palette.gold} />
        {showLabels && (
          <text x="328" y="182" fontSize="10" fontWeight="800" fill="#854d0e" fontFamily="Cairo, sans-serif">حدودي</text>
        )}
      </g>
      {/* outside cell */}
      <g>
        <path d="M 80 80 L 120 55 L 125 115 Z" fill={alpha(palette.ink, 0.08)} stroke={alpha(palette.ink, 0.35)} />
        <circle cx="80" cy="80" r="5" fill={palette.inkMuted} />
        {showLabels && (
          <text x="40" y="78" fontSize="10" fontWeight="800" fill={palette.inkMuted} fontFamily="Cairo, sans-serif">خارج</text>
        )}
      </g>

      <motion.circle
        animate={shouldReduce ? undefined : { r: [18, 36, 18], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity }}
        cx="210"
        cy="145"
        fill="none"
        stroke={palette.accent}
        strokeWidth="1"
      />
      {showLabels && (
        <text x="210" y="248" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.accent} fontFamily="Cairo, sans-serif">
          مضلع الحدث · Target Polygon
        </text>
      )}
    </svg>
  );
};
