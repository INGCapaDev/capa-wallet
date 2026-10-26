import { useState } from 'react';
import { BANK_CARDS } from '@/data/cards';
import type { BankCardData } from '@/types/card';
import { InvalidWalletNavigationError, SelectedCardNotFoundError } from '@/errors/wallet.errors';
import { WalletLayout } from '@/components/layout/WalletLayout';
import { WalletPocket } from '@/components/wallet/WalletPocket';
import { soundFX } from '@/utils/audio';
import { triggerHaptic } from '@/utils/haptics';
import { useCardControls } from '@/hooks/use-card-controls';
import { useWalletKeyboard } from '@/hooks/use-wallet-keyboard';

function getInitialCardId(): string {
  const hash = window.location.hash.slice(1).toLowerCase();
  return BANK_CARDS.find((card) => card.id === hash)?.id ?? BANK_CARDS[0].id;
}

function getSelectedCard(id: string): BankCardData {
  const card = BANK_CARDS.find((card) => card.id === id);
  if (!card) throw new SelectedCardNotFoundError(id);
  return card;
}

export function WalletPage() {
  const [selectedCardId, setSelectedCardId] = useState(getInitialCardId);
  const selectedCard = getSelectedCard(selectedCardId);

  const {
    toast, copiedClabe, copiedSummary, showToast, resetCopied,
    soundEnabled, toggleSound, isFlipped, setIsFlipped,
    handleFlipCard, handleCopyClabe, handleCopySummary,
  } = useCardControls(selectedCard);

  const handleSelectCard = (card: BankCardData) => {
    if (card.id !== selectedCardId) resetCopied();
    soundFX.playCardSlide();
    triggerHaptic('slide');
    setSelectedCardId(card.id);
    setIsFlipped(false);
    history.replaceState(null, '', `#${card.id}`);
  };

  const handleNavigateCard = (direction: -1 | 1) => {
    const currentIndex = BANK_CARDS.indexOf(selectedCard);
    const nextIndex = (currentIndex + direction + BANK_CARDS.length) % BANK_CARDS.length;
    const nextCard = BANK_CARDS[nextIndex];
    if (!nextCard) throw new InvalidWalletNavigationError();
    handleSelectCard(nextCard);
  };

  useWalletKeyboard({
    cards: BANK_CARDS,
    onCopyClabe: handleCopyClabe,
    onFlipCard: handleFlipCard,
    onToggleSound: toggleSound,
    onNavigateCard: handleNavigateCard,
    onSelectCard: handleSelectCard,
  });

  return (
    <WalletLayout toast={toast} soundEnabled={soundEnabled} onToggleSound={toggleSound}>
      <WalletPocket
        cards={BANK_CARDS}
        selectedCard={selectedCard}
        onSelectCard={handleSelectCard}
        onPreviousCard={() => handleNavigateCard(-1)}
        onNextCard={() => handleNavigateCard(1)}
        onCopyClabe={handleCopyClabe}
        copiedClabe={copiedClabe}
        onCopySummary={handleCopySummary}
        copiedSummary={copiedSummary}
        isFlipped={isFlipped}
        onFlip={handleFlipCard}
        onShowToast={showToast}
      />
    </WalletLayout>
  );
}
