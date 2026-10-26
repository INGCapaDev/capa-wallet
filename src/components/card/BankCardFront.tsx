import type { MouseEvent } from 'react';
import { RotateCw } from 'lucide-react';
import type { BankCardData } from '@/types/card';
import type { CardDesign } from '@/data/card-designs';
import type { CardTilt } from '@/hooks/use-card-tilt';
import { CardChip } from '@/components/card/CardChip';
import { CardLogo } from '@/components/card/CardLogo';
import {
  CardLaserArcs,
  cardStyles,
} from '@/components/card/cardVariants';
import { Button } from '@/components/ui/Button';

interface BankCardFrontProps {
  card: BankCardData;
  design: CardDesign;
  bankLabel: string;
  isActive: boolean;
  isFlipped: boolean;
  tilt: CardTilt;
  onActivate?: (event?: MouseEvent) => void;
}

export function BankCardFront({
  card,
  design,
  bankLabel,
  isActive,
  isFlipped,
  tilt,
  onActivate,
}: BankCardFrontProps) {
  const accentColor = design.accentColor;

  return (
    <div
      className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden backface-hidden p-5 sm:p-7 flex flex-col justify-between"
      style={{
        ...cardStyles.front(design),
        pointerEvents: isFlipped ? 'none' : 'auto',
      }}
    >
      <CardLaserArcs accentColor={accentColor} />

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: tilt.active ? 0.6 : 0.2,
          background: `radial-gradient(circle 300px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="text-lg sm:text-xl font-semibold tracking-tight text-white font-['Geist','Inter',sans-serif] drop-shadow-sm">
          {bankLabel}
        </span>

        <div className="flex items-center">
          <div className="flex items-center justify-center p-1 select-none pointer-events-none drop-shadow-md">
            <CardLogo
              network={card.bank.logo}
              variant="color"
              className={card.bank.logo === 'visa' ? 'h-4 sm:h-5 w-auto' : 'h-6 sm:h-7 w-auto'}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between my-auto">
        <CardChip variant={design.chipColor} className="w-10 h-8 sm:w-12 sm:h-9 shadow-md" />

        {isActive && onActivate && (
          <Button
            size="icon"
            shape="circle"
            onClick={onActivate}
            tabIndex={isFlipped ? -1 : 0}
            title="Voltear"
            aria-label="Voltear tarjeta"
            className="sm:w-8 sm:h-8"
            icon={<RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />}
          />
        )}
      </div>

      <div className="relative z-10 space-y-2">
        <div className="font-['Geist','Inter',sans-serif] text-sm sm:text-base tracking-widest text-white font-medium tabular-nums drop-shadow-sm flex items-center gap-2.5">
          <span className="text-white/60 tracking-[0.24em] text-xs sm:text-sm font-normal select-none">
            •••• •••• ••••
          </span>
          <span className="text-white font-semibold tracking-wider text-base sm:text-lg">
            {card.bank.digits}
          </span>
        </div>

        <div className="pt-1.5 border-t border-white/15">
          <div className="text-xs sm:text-sm font-medium tracking-wide text-white/95 font-['Geist','Inter',sans-serif] truncate">
            {card.owner.name.label}
          </div>
        </div>
      </div>
    </div>
  );
}
