import React from 'react';
import { motion } from 'framer-motion';

interface KPICardProps {
  value: string | number;
  label: string;
  labelEn?: string;
  unit?: string;
  variant?: 'primary' | 'accent' | 'secondary' | 'outline-primary' | 'outline-accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const KPICard: React.FC<KPICardProps> = ({
  value,
  label,
  labelEn,
  unit,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  delay = 0,
}) => {
  const sizeMap = {
    sm: { value: 32, label: 13, unit: 16, padding: '20px 16px' },
    md: { value: 48, label: 16, unit: 20, padding: '28px 24px' },
    lg: { value: 64, label: 18, unit: 24, padding: '36px 32px' },
    xl: { value: 80, label: 20, unit: 28, padding: '44px 40px' },
  };

  const { value: valSize, label: lblSize, unit: unitSize, padding } = sizeMap[size];

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--white)',
      border: 'none',
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--white)',
      border: 'none',
    },
    secondary: {
      background: 'var(--secondary)',
      color: 'var(--text-dark)',
      border: '2px solid rgba(66,129,119,0.3)',
    },
    'outline-primary': {
      background: 'transparent',
      color: 'var(--primary)',
      border: '2px solid var(--primary)',
    },
    'outline-accent': {
      background: 'transparent',
      color: 'var(--accent)',
      border: '2px solid var(--accent)',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        borderRadius: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...variantStyles[variant],
      }}
      whileHover={onClick ? { scale: 1.03, y: -2 } : {}}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Value */}
      <div style={{
        fontSize: `${valSize}px`,
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-2px',
        fontFamily: 'Inter, Cairo, sans-serif',
        direction: 'ltr',
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
      }}>
        <span>{value}</span>
        {unit && (
          <span style={{
            fontSize: `${unitSize}px`,
            fontWeight: 600,
            opacity: 0.75,
            letterSpacing: 0,
          }}>
            {unit}
          </span>
        )}
      </div>

      {/* Label Arabic */}
      <div style={{
        fontSize: `${lblSize}px`,
        fontWeight: 700,
        textAlign: 'center',
        marginTop: '10px',
        fontFamily: 'Cairo, sans-serif',
        opacity: 0.95,
        lineHeight: 1.3,
      }}>
        {label}
      </div>

      {/* Label English */}
      {labelEn && (
        <div style={{
          fontSize: `${lblSize - 3}px`,
          fontFamily: 'Inter, sans-serif',
          opacity: 0.65,
          marginTop: '3px',
          fontWeight: 500,
          letterSpacing: '0.3px',
          direction: 'ltr',
        }}>
          {labelEn}
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;
