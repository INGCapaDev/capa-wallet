import type { BankCardData } from '@/types/card';
import { soundFX } from '@/utils/audio';
import { triggerHaptic } from '@/utils/haptics';
import { spei } from '@/utils/spei';

interface WalletSharingOptions {
  card: BankCardData;
  onCopySummary: () => Promise<void>;
  onShowToast: (title: string, detail?: string) => void;
}

export function useWalletSharing({
  card,
  onCopySummary,
  onShowToast,
}: WalletSharingOptions) {
  const shareText = spei.generateShareText(card);

  const handleShareWhatsApp = () => {
    soundFX.playCardClick();
    triggerHaptic('click');
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    soundFX.playCardClick();
    triggerHaptic('click');

    if (!navigator.share) {
      await onCopySummary();
      return;
    }

    try {
      await navigator.share({
        title: `Datos de transferencia — ${card.owner.name.spei}`,
        text: shareText,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      onShowToast('Error al compartir');
    }
  };

  return { handleShareWhatsApp, handleNativeShare };
}
