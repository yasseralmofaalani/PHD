import React from 'react';
import { motion } from 'framer-motion';

interface SyriaGISMapProps {
  variant?: 'planning' | 'isolation' | 'simple';
  width?: number | string;
  height?: number | string;
  showLabel?: boolean;
}

const SyriaGISMap: React.FC<SyriaGISMapProps> = ({
  variant = 'simple',
  width = '100%',
  height = '100%',
  showLabel = true,
}) => {
  // Simplified Syria outline path (conceptual representation)
  const syriaPath = `
    M 120 60
    L 180 50
    L 240 55
    L 280 45
    L 320 55
    L 360 48
    L 400 60
    L 420 80
    L 410 110
    L 430 140
    L 420 170
    L 400 185
    L 380 200
    L 360 210
    L 330 220
    L 300 230
    L 260 240
    L 220 250
    L 190 245
    L 160 235
    L 140 220
    L 110 210
    L 90 195
    L 75 175
    L 80 150
    L 70 130
    L 80 105
    L 100 85
    Z
  `;

  // Cell tower positions (conceptual)
  const towers = [
    { x: 150, y: 100, type: 'urban', gen: '4G' },
    { x: 200, y: 120, type: 'urban', gen: '4G' },
    { x: 250, y: 110, type: 'urban', gen: '4G' },
    { x: 300, y: 130, type: 'urban', gen: '3G' },
    { x: 350, y: 100, type: 'suburban', gen: '3G' },
    { x: 380, y: 130, type: 'suburban', gen: '4G' },
    { x: 340, y: 160, type: 'suburban', gen: '3G' },
    { x: 280, y: 180, type: 'suburban', gen: '4G' },
    { x: 220, y: 185, type: 'rural', gen: '2G' },
    { x: 160, y: 175, type: 'rural', gen: '2G' },
    { x: 120, y: 160, type: 'rural', gen: '2G' },
    { x: 130, y: 130, type: 'rural', gen: '2G' },
    { x: 320, y: 200, type: 'rural', gen: '2G' },
    { x: 260, y: 215, type: 'rural', gen: '2G' },
    { x: 200, y: 220, type: 'rural', gen: '2G' },
    { x: 380, y: 80, type: 'urban', gen: '4G' },
    { x: 170, y: 145, type: 'suburban', gen: '3G' },
    { x: 240, y: 155, type: 'suburban', gen: '3G' },
  ];

  const getColor = (type: string, gen: string) => {
    if (gen === '4G') return '#428177';
    if (gen === '3G') return 'rgba(66,129,119,0.6)';
    return 'rgba(107,31,42,0.5)';
  };

  const getRadius = (type: string) => {
    if (type === 'urban') return 3;
    if (type === 'suburban') return 2.5;
    return 2;
  };

  // Target polygon for isolation variant
  const targetPolygon = `200,100 280,90 310,140 280,165 200,155 175,130`;

  // Coverage hexagons (simplified)
  const coverageAreas = [
    { cx: 200, cy: 120, rx: 40, ry: 30 },
    { cx: 300, cy: 130, rx: 45, ry: 32 },
    { cx: 350, cy: 100, rx: 35, ry: 28 },
    { cx: 150, cy: 100, rx: 38, ry: 28 },
  ];

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg
        viewBox="60 35 390 240"
        style={{ width: '100%', height: '100%' }}
        aria-label="خريطة سوريا المفاهيمية للشبكة الخلوية"
        role="img"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(66,129,119,0.08)" strokeWidth="0.5" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="60" y="35" width="390" height="240" fill="url(#grid-pattern)" />

        {/* Coverage areas (background) */}
        {variant !== 'simple' && coverageAreas.map((area, i) => (
          <motion.ellipse
            key={i}
            cx={area.cx}
            cy={area.cy}
            rx={area.rx}
            ry={area.ry}
            fill="rgba(66,129,119,0.08)"
            stroke="rgba(66,129,119,0.2)"
            strokeWidth="0.8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
          />
        ))}

        {/* Syria Outline */}
        <motion.path
          d={syriaPath}
          fill="rgba(66,129,119,0.06)"
          stroke="#428177"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ strokeDasharray: '1000', strokeDashoffset: '1000' }}
        />

        {/* Target Polygon (Isolation variant) */}
        {variant === 'isolation' && (
          <motion.polygon
            points={targetPolygon}
            fill="rgba(107,31,42,0.12)"
            stroke="#6b1f2a"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        )}

        {/* Cell Towers / Sites */}
        {towers.map((tower, i) => (
          <motion.g key={i}>
            {/* Coverage ring */}
            <motion.circle
              cx={tower.x}
              cy={tower.y}
              r={tower.type === 'urban' ? 18 : tower.type === 'suburban' ? 15 : 12}
              fill={tower.gen === '4G' ? 'rgba(66,129,119,0.07)' : 'rgba(107,31,42,0.05)'}
              stroke={tower.gen === '4G' ? 'rgba(66,129,119,0.15)' : 'rgba(107,31,42,0.1)'}
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 + 0.5, duration: 0.3 }}
            />
            {/* Site dot */}
            <motion.circle
              cx={tower.x}
              cy={tower.y}
              r={getRadius(tower.type)}
              fill={getColor(tower.type, tower.gen)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 + 0.6, duration: 0.3 }}
            />
          </motion.g>
        ))}

        {/* City labels (conceptual) */}
        <text x="195" y="118" fontSize="8" fill="rgba(0,0,0,0.5)" fontFamily="Cairo" textAnchor="middle">دمشق</text>
        <text x="345" y="98" fontSize="7" fill="rgba(0,0,0,0.4)" fontFamily="Cairo" textAnchor="middle">حلب</text>
        <text x="290" y="128" fontSize="7" fill="rgba(0,0,0,0.4)" fontFamily="Cairo" textAnchor="middle">حمص</text>

        {/* Connection lines (planning variant) */}
        {variant === 'planning' && towers.slice(0, 6).map((t, i) => {
          const next = towers[(i + 1) % 6];
          return (
            <motion.line
              key={`line-${i}`}
              x1={t.x} y1={t.y} x2={next.x} y2={next.y}
              stroke="rgba(66,129,119,0.2)"
              strokeWidth="0.8"
              strokeDasharray="3 2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Legend */}
      {showLabel && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '12px',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '6px',
          padding: '6px 10px',
          fontSize: '10px',
          fontFamily: 'Cairo, Inter, sans-serif',
          border: '1px solid rgba(66,129,119,0.2)',
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#428177' }} />
              <span>4G</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(66,129,119,0.6)' }} />
              <span>3G</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(107,31,42,0.5)' }} />
              <span>2G</span>
            </div>
          </div>
          <div style={{ marginTop: '3px', color: 'rgba(0,0,0,0.4)', fontSize: '9px', fontFamily: 'Inter' }}>
            Conceptual Illustration
          </div>
        </div>
      )}
    </div>
  );
};

export default SyriaGISMap;
