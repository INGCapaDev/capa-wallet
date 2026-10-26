import type { BankCardData } from '@/types/card';
import { BankCard } from '@/components/card/BankCard';
import { WalletLayout } from '@/components/layout/WalletLayout';
import { WalletActions } from '@/components/wallet/WalletActions';
import { useCardControls } from '@/hooks/use-card-controls';
import { useCardKeyboard } from '@/hooks/use-card-keyboard';
import { useWalletSharing } from '@/hooks/use-wallet-sharing';

interface FocusedCardPageProps {
  card: BankCardData;
}

export function FocusedCardPage({ card }: FocusedCardPageProps) {
  const {
    toast, copiedClabe, copiedSummary, showToast,
    soundEnabled, toggleSound, isFlipped,
    handleFlipCard, handleCopyClabe, handleCopySummary,
  } = useCardControls(card);
  const { handleShareWhatsApp, handleNativeShare } = useWalletSharing({
    card,
    onCopySummary: handleCopySummary,
    onShowToast: showToast,
  });

  useCardKeyboard({
    onCopyClabe: handleCopyClabe,
    onFlipCard: handleFlipCard,
    onToggleSound: toggleSound,
  });

  return (
    <WalletLayout toast={toast} soundEnabled={soundEnabled} onToggleSound={toggleSound}>
      <div className="w-full flex flex-col items-center py-4 sm:py-6">
        <div className="w-full max-w-[420px] px-3">
          <BankCard
            card={card}
            mode="active"
            isFlipped={isFlipped}
            onFlip={handleFlipCard}
            onCopyClabe={handleCopyClabe}
            copiedClabe={copiedClabe}
          />
        </div>
        <WalletActions
          isFlipped={isFlipped}
          onFlip={handleFlipCard}
          copiedClabe={copiedClabe}
          onCopyClabe={handleCopyClabe}
          copiedSummary={copiedSummary}
          onCopySummary={handleCopySummary}
          onShareWhatsApp={handleShareWhatsApp}
          onNativeShare={handleNativeShare}
        />
      </div>
    </WalletLayout>
  );
}
