import { useState, useCallback, useEffect, useRef } from 'react';
import { TOTAL_SLIDES } from '../data/slidesConfig';

const initialFromHash = (): number => {
  if (typeof window === 'undefined') return 0;
  const m = window.location.hash.match(/slide[=-]?(\d+)/i);
  if (!m) return 0;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(n, TOTAL_SLIDES - 1)) : 0;
};

const clampSlide = (index: number) =>
  Math.max(0, Math.min(index, TOTAL_SLIDES - 1));

export const useNavigation = () => {
  const [currentSlide, setCurrentSlide] = useState(initialFromHash);
  const slideRef = useRef(currentSlide);
  slideRef.current = currentSlide;

  // Soft debounce only — never hard-lock navigation (that made Space feel
  // like an in-slide "reveal" that needed several presses).
  const lastNavAt = useRef(0);

  const goTo = useCallback((index: number, force = false) => {
    const clamped = clampSlide(index);
    if (!force && clamped === slideRef.current) return;
    const now = Date.now();
    if (!force && now - lastNavAt.current < 120) return;
    lastNavAt.current = now;
    slideRef.current = clamped;
    setCurrentSlide(clamped);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#slide=${clamped}`);
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = initialFromHash();
      if (next !== slideRef.current) {
        slideRef.current = next;
        setCurrentSlide(next);
      }
    };
    window.addEventListener('hashchange', onHash);

    const api = window as unknown as {
      __goToSlide?: (i: number) => void;
      __getSlide?: () => number;
    };
    api.__goToSlide = (i: number) => goTo(i, true);
    api.__getSlide = () => slideRef.current;

    return () => {
      window.removeEventListener('hashchange', onHash);
      delete api.__goToSlide;
      delete api.__getSlide;
    };
  }, [goTo]);

  const goNext = useCallback(() => {
    goTo(slideRef.current + 1);
  }, [goTo]);

  const goPrev = useCallback(() => {
    goTo(slideRef.current - 1);
  }, [goTo]);

  const goFirst = useCallback(() => goTo(0, true), [goTo]);
  const goLast = useCallback(() => goTo(TOTAL_SLIDES - 1, true), [goTo]);

  return {
    currentSlide,
    isAnimating: false,
    goTo,
    goNext,
    goPrev,
    goFirst,
    goLast,
    totalSlides: TOTAL_SLIDES,
    isFirst: currentSlide === 0,
    isLast: currentSlide === TOTAL_SLIDES - 1,
  };
};
