import { useEffect } from 'react';

interface KeyboardHandlers {
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export const useKeyboard = ({ onNext, onPrev, onFirst, onLast }: KeyboardHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // Don't trigger if modal is open
      if (document.querySelector('.modal-overlay')) {
        if (e.key === 'Escape') {
          const closeBtn = document.querySelector('.modal-close-btn') as HTMLButtonElement;
          closeBtn?.click();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
        case 'PageDown':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowRight':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          onPrev();
          break;
        case 'Home':
          e.preventDefault();
          onFirst();
          break;
        case 'End':
          e.preventDefault();
          onLast();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onFirst, onLast]);
};
