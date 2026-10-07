import { useState, useEffect, useCallback } from 'react';

interface UseStepRevealOptions {
  totalSteps: number;
  /** If true, starts with step 0 (nothing revealed). Default: true */
  startEmpty?: boolean;
  /** Initial step number (overrides startEmpty). e.g., 1 */
  initialStep?: number;
  /** If true, pressing ANY key (except backward/modifiers) advances the step */
  anyKeyAdvance?: boolean;
}

interface UseStepRevealReturn {
  /** Current revealed step (0 = nothing revealed, 1 = first item, etc.) */
  step: number;
  /** Whether all steps have been revealed */
  isComplete: boolean;
  /** Whether we're at step 0 (nothing extra revealed) */
  isAtStart: boolean;
  /** Advance to next step. Returns true if it consumed the event. */
  goNext: () => boolean;
  /** Go back one step. Returns true if it consumed the event. */
  goPrev: () => boolean;
  /** Jump to a specific step */
  goToStep: (s: number) => void;
  /** Reveal all at once */
  revealAll: () => void;
  /** Total number of steps */
  totalSteps: number;
}

/**
 * Hook for progressive reveal / sequential animation in presentation slides.
 * 
 * Intercepts keyboard navigation (Space, ArrowRight, ArrowDown, Enter, PageDown, or any key)
 * to reveal items step-by-step. Only passes through to slide navigation when
 * all items are revealed (forward) or at step 0 / 1 (backward).
 */
export const useStepReveal = ({
  totalSteps,
  startEmpty = true,
  initialStep,
  anyKeyAdvance = false,
}: UseStepRevealOptions): UseStepRevealReturn => {
  const [step, setStep] = useState(
    initialStep !== undefined ? initialStep : startEmpty ? 0 : totalSteps
  );

  const goNext = useCallback((): boolean => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      return true; // consumed
    }
    return false; // let parent handle navigation
  }, [step, totalSteps]);

  const goPrev = useCallback((): boolean => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      return true; // consumed
    }
    return false; // let parent handle navigation
  }, [step]);

  const goToStep = useCallback(
    (s: number) => {
      setStep(Math.max(0, Math.min(s, totalSteps)));
    },
    [totalSteps]
  );

  const revealAll = useCallback(() => {
    setStep(totalSteps);
  }, [totalSteps]);

  // Keyboard interception
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when modal is open
      if (document.querySelector('.modal-overlay')) return;
      // Don't intercept when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const backwardKeys = ['ArrowRight', 'ArrowUp', 'PageUp', 'Backspace', 'p', 'P'];
      const standardForwardKeys = [' ', 'ArrowLeft', 'ArrowDown', 'Enter', 'PageDown', 'n', 'N'];
      const modifierOrIgnoredKeys = ['Escape', 'Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

      const isBackward = backwardKeys.includes(e.key);
      const isForward = anyKeyAdvance
        ? !isBackward && !modifierOrIgnoredKeys.includes(e.key)
        : standardForwardKeys.includes(e.key);

      if (isForward) {
        if (step < totalSteps) {
          e.preventDefault();
          e.stopPropagation();
          setStep((prev) => prev + 1);
        }
        // If step === totalSteps, let the event bubble to parent navigation
      } else if (isBackward) {
        if (step > 1) {
          e.preventDefault();
          e.stopPropagation();
          setStep((prev) => prev - 1);
        }
        // If step <= 1, let the event bubble to parent navigation
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [step, totalSteps, anyKeyAdvance]);

  return {
    step,
    isComplete: step >= totalSteps,
    isAtStart: step === 0,
    goNext,
    goPrev,
    goToStep,
    revealAll,
    totalSteps,
  };
};
