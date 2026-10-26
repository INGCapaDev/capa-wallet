import { useEffect } from 'react';

interface CardKeyboardOptions {
  onCopyClabe: () => void;
  onFlipCard: () => void;
  onToggleSound: () => void;
}

export function useCardKeyboard({ onCopyClabe, onFlipCard, onToggleSound }: CardKeyboardOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      switch (event.key.toLowerCase()) {
        case 'c':
          event.preventDefault();
          onCopyClabe();
          return;
        case 'f':
          event.preventDefault();
          onFlipCard();
          return;
        case 'm':
          event.preventDefault();
          onToggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCopyClabe, onFlipCard, onToggleSound]);
}
