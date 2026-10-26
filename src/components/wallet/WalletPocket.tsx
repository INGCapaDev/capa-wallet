import type { MouseEvent } from 'react';
import type { BankCardData } from '@/types/card';
import { WalletActions } from '@/components/wallet/WalletActions';
import { WalletCarousel } from '@/components/wallet/WalletCarousel';
import { WalletProgressIndicator } from '@/components/wallet/WalletProgressIndicator';
import { useWalletSharing } from '@/hooks/use-wallet-sharing';

export interface WalletPocketProps {
  cards: readonly BankCardData[];
  selectedCard: BankCardData;
  onSelectCard: (card: BankCardData) => void;
  onPreviousCard: () => void;
  onNextCard: () => void;
  onCopyClabe: (event?: MouseEvent) => void;
  copiedClabe: boolean;
  onCopySummary: () => Promise<void>;
  copiedSummary: boolean;
  isFlipped: boolean;
  onFlip: () => void;
  onShowToast: (title: string, detail?: string) => void;
}

export function WalletPocket({
  cards,
  selectedCard,
  onSelectCard,
  onPreviousCard,
  onNextCard,
  onCopyClabe,
  copiedClabe,
  onCopySummary,
  copiedSummary,
  isFlipped,
  onFlip,
  onShowToast,
}: WalletPocketProps) {
  const currentIndex = cards.findIndex((card) => card.id === selectedCard.id);
  const { handleShareWhatsApp, handleNativeShare } = useWalletSharing({
    card: selectedCard,
    onCopySummary,
    onShowToast,
  });

  return (
    <div className="w-full flex flex-col items-center select-none font-['Geist','Inter',sans-serif] relative overflow-hidden py-1 sm:py-3">
      <WalletProgressIndicator
        cards={cards}
        currentIndex={currentIndex}
        onSelectCard={onSelectCard}
      />

      <WalletCarousel
        cards={cards}
        currentIndex={currentIndex}
        isFlipped={isFlipped}
        copiedClabe={copiedClabe}
        onFlip={onFlip}
        onCopyClabe={onCopyClabe}
        onSelectCard={onSelectCard}
        onPreviousCard={onPreviousCard}
        onNextCard={onNextCard}
      />

      <WalletActions
        isFlipped={isFlipped}
        onFlip={onFlip}
        copiedClabe={copiedClabe}
        onCopyClabe={onCopyClabe}
        copiedSummary={copiedSummary}
        onCopySummary={onCopySummary}
        onShareWhatsApp={handleShareWhatsApp}
        onNativeShare={handleNativeShare}
      />
    </div>
  );
}
