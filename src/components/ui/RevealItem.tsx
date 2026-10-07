import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RevealItemProps {
  /** The step number at which this item should appear (1-indexed) */
  visibleAtStep: number;
  /** Current revealed step from useStepReveal */
  currentStep: number;
  /** Content to reveal */
  children: React.ReactNode;
  /** Animation style. Default: 'fade' */
  animation?: 'fade' | 'fadeUp' | 'fadeRight' | 'fadeLeft' | 'scale';
  /** Animation duration in seconds. Default: 0.4 */
  duration?: number;
  /** Additional delay in seconds. Default: 0 */
  delay?: number;
  /** CSS className */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
}

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

/**
 * Wraps content with a smooth reveal animation.
 * Content becomes visible when `currentStep >= visibleAtStep`.
 * Once visible, content stays visible until step goes below.
 */
const RevealItem: React.FC<RevealItemProps> = ({
  visibleAtStep,
  currentStep,
  children,
  animation = 'fadeUp',
  duration = 0.4,
  delay = 0,
  className,
  style,
}) => {
  const isVisible = currentStep >= visibleAtStep;
  const variants = animationVariants[animation];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            duration,
            delay,
            ease: 'easeOut',
          }}
          className={className}
          style={style}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealItem;

/**
 * Step progress indicator dots — shows which step is active.
 * Useful for slides with multiple reveal steps.
 */
export const StepIndicator: React.FC<{
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
}> = ({ totalSteps, currentStep, onStepClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: 'var(--card-bg, #ffffff)',
        padding: '5px 12px',
        borderRadius: '20px',
        border: '1px solid var(--card-border, rgba(66,129,119,0.25))',
      }}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isPassed = stepNum <= currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <button
            key={stepNum}
            onClick={() => onStepClick?.(stepNum)}
            style={{
              width: isCurrent ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: isCurrent
                ? 'var(--primary, #428177)'
                : isPassed
                  ? 'rgba(66, 129, 119, 0.4)'
                  : 'rgba(0, 0, 0, 0.1)',
              border: 'none',
              cursor: onStepClick ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        );
      })}
      <span
        style={{
          fontSize: '11px',
          fontWeight: 800,
          color: 'var(--text-dark, #000)',
          marginRight: '6px',
          paddingRight: '8px',
          borderRight: '1px solid rgba(0,0,0,0.1)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
};
