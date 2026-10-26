import type { BankCardData } from '@/types/card';

interface WalletCounterProps {
  current: number;
  total: number;
}

function WalletCounter({ current, total }: WalletCounterProps) {
  return (
    <div className="flex items-center gap-1 text-xs font-['Geist','Inter',sans-serif] font-medium tracking-wide text-white/50 select-none">
      <span className="text-white/90 font-semibold">{current}</span>
      <span className="text-white/30 text-[11px] mx-0.5">/</span>
      <span className="text-white/50">{total}</span>
    </div>
  );
}

interface WalletProgressDotsProps {
  cards: readonly BankCardData[];
  currentIndex: number;
  onSelectCard: (card: BankCardData) => void;
}

function WalletProgressDots({
  cards,
  currentIndex,
  onSelectCard,
}: WalletProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {cards.map((card, index) => {
        const isCurrent = index === currentIndex;
        const bankLabel = card.bank.name.short ?? card.bank.name.label;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              if (!isCurrent) onSelectCard(card);
            }}
            title={bankLabel}
            aria-label={`Ver ${bankLabel}`}
            className="transition-all duration-300 py-1 cursor-pointer"
          >
            {isCurrent ? (
              <div className="w-5 sm:w-6 h-1 rounded-full bg-white/70 transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export interface WalletProgressIndicatorProps {
  cards: readonly BankCardData[];
  currentIndex: number;
  onSelectCard: (card: BankCardData) => void;
}

export function WalletProgressIndicator({
  cards,
  currentIndex,
  onSelectCard,
}: WalletProgressIndicatorProps) {
  return (
    <div className="w-full max-w-5xl px-4 sm:px-8 flex items-center justify-start mb-2 z-30">
      <div className="flex items-center gap-3">
        <WalletCounter current={currentIndex + 1} total={cards.length} />

        <div className="h-2.5 w-[1px] bg-white/10" />

        <WalletProgressDots
          cards={cards}
          currentIndex={currentIndex}
          onSelectCard={onSelectCard}
        />
      </div>
    </div>
  );
}
