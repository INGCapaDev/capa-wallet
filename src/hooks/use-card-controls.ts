import { useState, type MouseEvent } from 'react';
import type { BankCardData } from '@/types/card';
import { useWalletFeedback } from '@/hooks/use-wallet-feedback';
import { useSoundPreference } from '@/hooks/use-sound-preference';
import { soundFX } from '@/utils/audio';
import { triggerHaptic } from '@/utils/haptics';
import { spei } from '@/utils/spei';

export function useCardControls(card: BankCardData) {
  const [isFlipped, setIsFlipped] = useState(false);
  const feedback = useWalletFeedback();
  const sound = useSoundPreference(feedback.showToast);

  const handleFlipCard = () => {
    soundFX.playCardFlip();
    triggerHaptic('flip');
    setIsFlipped((previous) => !previous);
  };

  const handleCopyClabe = async (event?: MouseEvent) => {
    event?.stopPropagation();
    await feedback.copyText(card.bank.clabe, 'clabe');
  };

  const handleCopySummary = async () => {
    await feedback.copyText(spei.generateShareText(card), 'summary');
  };

  return {
    ...feedback,
    ...sound,
    isFlipped,
    setIsFlipped,
    handleFlipCard,
    handleCopyClabe,
    handleCopySummary,
  };
}
