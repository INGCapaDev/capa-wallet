import { useEffect } from 'react';
import type { BankCardData } from '@/types/card';
import { useCardKeyboard } from '@/hooks/use-card-keyboard';

interface WalletKeyboardOptions {
  cards: readonly BankCardData[];
  onCopyClabe: () => void;
  onFlipCard: () => void;
  onToggleSound: () => void;
  onNavigateCard: (direction: -1 | 1) => void;
  onSelectCard: (card: BankCardData) => void;
}

export function useWalletKeyboard({
  cards,
  onCopyClabe,
  onFlipCard,
  onToggleSound,
  onNavigateCard,
  onSelectCard,
}: WalletKeyboardOptions) {
  useCardKeyboard({ onCopyClabe, onFlipCard, onToggleSound });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const key = event.key.toLowerCase();
      switch (key) {
        case 'arrowright':
          event.preventDefault();
          onNavigateCard(1);
          return;
        case 'arrowleft':
          event.preventDefault();
          onNavigateCard(-1);
          return;
      }

      if (!/^[0-9]$/.test(key)) return;
      const index = key === '0' ? 9 : Number.parseInt(key, 10) - 1;
      const card = cards[index];
      if (!card) return;
      event.preventDefault();
      onSelectCard(card);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards, onNavigateCard, onSelectCard]);
}
