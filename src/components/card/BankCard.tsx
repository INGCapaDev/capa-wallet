import type { MouseEvent } from 'react';
import type { BankCardData } from '@/types/card';
import { CARD_DESIGNS } from '@/data/card-designs';
import { useCardTilt } from '@/hooks/use-card-tilt';
import { BankCardBack } from '@/components/card/BankCardBack';
import { BankCardFront } from '@/components/card/BankCardFront';
import { cardStyles } from '@/components/card/cardVariants';

interface BankCardBaseProps {
  card: BankCardData;
  className?: string;
}

interface ActiveBankCardProps extends BankCardBaseProps {
  mode: 'active';
  isFlipped: boolean;
  onFlip: () => void;
  onCopyClabe: (event: MouseEvent) => void;
  copiedClabe: boolean;
}

interface NeighborBankCardProps extends BankCardBaseProps {
  mode: 'neighbor';
  onSelect: () => void;
}

interface ReflectionBankCardProps extends BankCardBaseProps {
  mode: 'reflection';
}

export type BankCardProps = ActiveBankCardProps | NeighborBankCardProps | ReflectionBankCardProps;

interface BankCardFrameProps extends BankCardBaseProps {
  isActive: boolean;
  isFlipped: boolean;
  copiedClabe: boolean;
  onActivate?: (event?: MouseEvent) => void;
  onCopyClabe?: (event: MouseEvent) => void;
}

function BankCardFrame({
  card,
  className = '',
  isActive,
  isFlipped,
  copiedClabe,
  onActivate,
  onCopyClabe,
}: BankCardFrameProps) {
  const { tilt, handleMouseMove, handleTouchMove, resetTilt } = useCardTilt(isActive);
  const design = CARD_DESIGNS[card.variant];
  const bankLabel = card.bank.name.short ?? card.bank.name.label;
  const isInteractive = onActivate !== undefined;
  const transformStyle = isFlipped
    ? `rotateY(180deg) rotateX(${tilt.x}deg) rotateZ(0deg)`
    : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(0deg)`;

  const handleActivate = (event?: MouseEvent) => {
    event?.stopPropagation();
    onActivate?.();
  };

  const handleCopyClabe = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onCopyClabe?.(event);
  };

  return (
    <div
      className={`relative select-none perspective-1000 w-full aspect-[1.586/1] ${className}`}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        onTouchMove={handleTouchMove}
        onTouchEnd={resetTilt}
        onTouchCancel={resetTilt}
        className="w-full h-full relative rounded-2xl sm:rounded-3xl cursor-pointer transition-transform duration-300 ease-out transform-style-3d group"
        style={{
          transform: isActive ? transformStyle : undefined,
          boxShadow: cardStyles.boxShadow(design.accentColor, isActive),
        }}
        onClick={isInteractive ? handleActivate : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-hidden={isInteractive ? undefined : true}
        aria-label={isInteractive ? `${bankLabel} - Haz clic para ${isActive ? 'voltear' : 'seleccionar'}` : undefined}
        onKeyDown={(event) => {
          if (!isInteractive || event.target !== event.currentTarget) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleActivate();
          }
        }}
      >
        <BankCardFront
          card={card}
          design={design}
          bankLabel={bankLabel}
          isActive={isActive}
          isFlipped={isFlipped}
          tilt={tilt}
          onActivate={isActive ? handleActivate : undefined}
        />

        <BankCardBack
          card={card}
          design={design}
          bankLabel={bankLabel}
          isActive={isActive}
          isFlipped={isFlipped}
          copiedClabe={copiedClabe}
          onActivate={isActive ? handleActivate : undefined}
          onCopyClabe={onCopyClabe ? handleCopyClabe : undefined}
        />
      </div>
    </div>
  );
}

export function BankCard(props: BankCardProps) {
  const { mode } = props;

  if (mode === 'active') {
    const { card, className, isFlipped, onFlip, onCopyClabe, copiedClabe } = props;
    return (
      <BankCardFrame
        card={card}
        className={className}
        isActive
        isFlipped={isFlipped}
        copiedClabe={copiedClabe}
        onActivate={onFlip}
        onCopyClabe={onCopyClabe}
      />
    );
  }

  if (mode === 'neighbor') {
    const { card, className, onSelect } = props;
    return (
      <BankCardFrame
        card={card}
        className={className}
        isActive={false}
        isFlipped={false}
        copiedClabe={false}
        onActivate={onSelect}
      />
    );
  }

  const { card, className } = props;
  return (
    <BankCardFrame
      card={card}
      className={className}
      isActive={false}
      isFlipped={false}
      copiedClabe={false}
    />
  );
}
