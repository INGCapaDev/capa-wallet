import { CopyActionButton } from '@/components/wallet/CopyActionButton';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { RotateCw, Share2 } from 'lucide-react';

export interface WalletActionsProps {
  isFlipped: boolean;
  onFlip: () => void;
  copiedClabe: boolean;
  onCopyClabe: () => void;
  copiedSummary: boolean;
  onCopySummary: () => void;
  onShareWhatsApp: () => void;
  onNativeShare: () => void;
}

export function WalletActions({
  isFlipped,
  onFlip,
  copiedClabe,
  onCopyClabe,
  copiedSummary,
  onCopySummary,
  onShareWhatsApp,
  onNativeShare,
}: WalletActionsProps) {
  return (
    <div className="w-full max-w-[420px] mt-4 sm:mt-6 space-y-2.5 z-30 px-3">
      <div className="flex items-center gap-2">
        <Button
          onClick={onFlip}
          className="flex-1"
          icon={<RotateCw className="w-3.5 h-3.5" />}
        >
          {isFlipped ? 'Frente' : 'Reverso'}
        </Button>

        <CopyActionButton
          copied={copiedClabe}
          onCopy={onCopyClabe}
          label="CLABE"
          copiedLabel="Copiada"
        />

        <CopyActionButton
          copied={copiedSummary}
          onCopy={onCopySummary}
          label="Resumen"
          copiedLabel="Copiado"
          title="Copiar datos completos: Beneficiario, Banco y CLABE"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onShareWhatsApp}
          title="Compartir datos por WhatsApp"
          aria-label="Compartir por WhatsApp"
          className="flex-1 px-4 group"
          icon={
            <WhatsAppIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          }
        >
          WhatsApp
        </Button>

        <Button
          onClick={onNativeShare}
          title="Compartir directamente con el sistema"
          aria-label="Compartir con el sistema"
          className="flex-1 px-4 group"
          icon={
            <Share2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          }
        >
          Compartir
        </Button>
      </div>
    </div>
  );
}
