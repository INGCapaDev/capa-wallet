import { useState, type MouseEvent } from 'react';
import { BANK_CARDS } from '@/data/cards';
import type { BankCardData } from '@/types/card';
import { InvalidWalletNavigationError, SelectedCardNotFoundError } from '@/errors/wallet.errors';
import { Header } from '@/components/layout/Header';
import { WalletPocket } from '@/components/wallet/WalletPocket';
import { Toast } from '@/components/ui/Toast';
import { soundFX } from '@/utils/audio';
import { triggerHaptic } from '@/utils/haptics';
import { spei } from '@/utils/spei';
import { useWalletFeedback } from '@/hooks/use-wallet-feedback';
import { useWalletKeyboard } from '@/hooks/use-wallet-keyboard';
import { useSoundPreference } from '@/hooks/use-sound-preference';

function getInitialCardId(): string {
  const hash = window.location.hash.slice(1).toLowerCase();
  return BANK_CARDS.find((card) => card.id === hash)?.id ?? BANK_CARDS[0].id;
}

function getSelectedCard(id: string): BankCardData {
  const card = BANK_CARDS.find((card) => card.id === id);
  if (!card) throw new SelectedCardNotFoundError(id);
  return card;
}

export default function App() {
  const [selectedCardId, setSelectedCardId] = useState(getInitialCardId);
  const [isFlipped, setIsFlipped] = useState(false);
  const selectedCard = getSelectedCard(selectedCardId);

  const { toast, copiedClabe, copiedSummary, showToast, resetCopied, copyText } = useWalletFeedback();
  const { soundEnabled, toggleSound } = useSoundPreference(showToast);

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

  const handleFlipCard = () => {
    soundFX.playCardFlip();
    triggerHaptic('flip');
    setIsFlipped((prev) => !prev);
  };

  const handleCopyClabe = async (event?: MouseEvent) => {
    event?.stopPropagation();
    await copyText(selectedCard.bank.clabe, 'clabe');
  };

  const handleCopySummary = async () => {
    await copyText(spei.generateShareText(selectedCard), 'summary');
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
    <div className="min-h-[100dvh] bg-[#08090d] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 font-['Geist','Inter',sans-serif]">
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <Toast
        visible={toast.visible}
        title={toast.title}
        detail={toast.detail}
      />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-4 md:py-6 overflow-hidden">
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
      </main>
    </div>
  );
}
