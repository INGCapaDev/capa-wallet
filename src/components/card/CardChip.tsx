import type { CardDesign } from '@/data/card-designs';

export type CardChipVariant = CardDesign['chipColor'];

export interface CardChipProps {
  variant?: CardChipVariant;
  className?: string;
}

export function CardChip({
  variant = 'gold',
  className = 'w-11 h-9',
}: CardChipProps) {
  const isGold = variant === 'gold';
  const baseGrad = isGold
    ? 'from-amber-200 via-amber-400 to-amber-600'
    : 'from-slate-200 via-slate-300 to-slate-400';
  const borderCol = isGold ? 'border-amber-500/60' : 'border-slate-400/60';
  const lineCol = isGold ? 'rgba(180, 83, 9, 0.45)' : 'rgba(71, 85, 105, 0.45)';

  return (
    <div
      className={`relative ${className} rounded-md bg-gradient-to-br ${baseGrad} p-1 shadow-inner border ${borderCol} overflow-hidden select-none`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-black/20 pointer-events-none" />
      <svg className="w-full h-full relative z-10" viewBox="0 0 44 34">
        <rect x="2" y="2" width="12" height="13" rx="2" fill="none" stroke={lineCol} strokeWidth="1" />
        <rect x="2" y="19" width="12" height="13" rx="2" fill="none" stroke={lineCol} strokeWidth="1" />
        <rect x="18" y="2" width="10" height="9" rx="1.5" fill="none" stroke={lineCol} strokeWidth="1" />
        <rect x="18" y="13" width="10" height="8" rx="1.5" fill="none" stroke={lineCol} strokeWidth="1" />
        <rect x="18" y="23" width="10" height="9" rx="1.5" fill="none" stroke={lineCol} strokeWidth="1" />
        <rect x="30" y="2" width="12" height="13" rx="2" fill="none" stroke={lineCol} strokeWidth="1" />
        <rect x="30" y="19" width="12" height="13" rx="2" fill="none" stroke={lineCol} strokeWidth="1" />
        <circle cx="23" cy="17" r="1.5" fill={lineCol} />
      </svg>
    </div>
  );
}
