import type { MouseEvent } from 'react';
import { Check, Copy, RotateCw } from 'lucide-react';
import type { BankCardData } from '@/types/card';
import type { CardDesign } from '@/data/card-designs';
import { spei } from '@/utils/spei';
import { CardLogo } from '@/components/card/CardLogo';
import { cardStyles } from '@/components/card/cardVariants';
import { Button } from '@/components/ui/Button';

interface BankCardBackProps {
  card: BankCardData;
  design: CardDesign;
  bankLabel: string;
  isActive: boolean;
  isFlipped: boolean;
  copiedClabe: boolean;
  onActivate?: (event?: MouseEvent) => void;
  onCopyClabe?: (event: MouseEvent) => void;
}

export function BankCardBack({
  card,
  design,
  bankLabel,
  isActive,
  isFlipped,
  copiedClabe,
  onActivate,
  onCopyClabe,
}: BankCardBackProps) {
  return (
    <div
      className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden backface-hidden flex flex-col justify-between border p-5 sm:p-7 shadow-2xl"
      style={{
        ...cardStyles.back(design),
        pointerEvents: isFlipped ? 'auto' : 'none',
      }}
    >
      <div className="-mx-5 -mt-5 sm:-mx-7 sm:-mt-7">
        <div className="w-full h-10 sm:h-11 bg-black/95 relative overflow-hidden flex items-center justify-between px-5 sm:px-7 border-b border-white/10">
          <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90 font-['Geist','Inter',sans-serif]">
            {bankLabel}
          </span>

          {isActive && onActivate && (
            <Button
              size="icon"
              shape="circle"
              onClick={onActivate}
              tabIndex={isFlipped ? 0 : -1}
              title="Voltear"
              aria-label="Voltear tarjeta"
              className="sm:w-8 sm:h-8"
              icon={<RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />}
            />
          )}
        </div>
      </div>

      <div className="space-y-4 py-1">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-slate-400 block font-['Geist','Inter',sans-serif]">
              CLABE Interbancaria
            </span>
            <div className="font-['Geist','Inter',sans-serif] text-sm sm:text-base font-semibold text-white tracking-widest tabular-nums select-all truncate">
              {spei.formatClabe(card.bank.clabe)}
            </div>
          </div>

          {isActive && onCopyClabe && (
            <Button
              size="icon"
              variant={copiedClabe ? 'active' : 'default'}
              onClick={onCopyClabe}
              tabIndex={isFlipped ? 0 : -1}
              title="Copiar CLABE"
              aria-label="Copiar CLABE"
              className="relative z-20"
              icon={
                copiedClabe ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/90" />
                )
              }
            />
          )}
        </div>

        <div className="space-y-0.5">
          <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-slate-400 block font-['Geist','Inter',sans-serif]">
            Beneficiario
          </div>
          <div className="text-xs sm:text-sm font-medium text-white tracking-wide truncate font-['Geist','Inter',sans-serif]">
            {card.owner.name.label}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-['Geist','Inter',sans-serif] text-[11px]">
        <span className="text-slate-400 font-medium">
          Banco SPEI: {card.bank.name.spei}
        </span>
        <div className="flex items-center">
          <CardLogo
            network={card.bank.logo}
            variant="color"
            className={card.bank.logo === 'visa' ? 'h-3.5 w-auto opacity-80' : 'h-4.5 w-auto opacity-80'}
          />
        </div>
      </div>
    </div>
  );
}
