import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-['Geist','Inter',sans-serif] font-medium transition-all shadow-sm cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          'bg-black/50 hover:bg-black/70 border border-white/20 text-white/90 hover:text-white backdrop-blur-md',
        active:
          'bg-white/20 hover:bg-white/25 border border-white/40 text-white backdrop-blur-md',
        ghost:
          'bg-transparent hover:bg-white/10 text-white/80 hover:text-white border border-transparent',
      },
      size: {
        default:
          'text-xs min-h-[40px] px-2.5 sm:px-3 py-2.5 active:scale-95 gap-1.5 sm:gap-2',
        sm: 'text-xs min-h-[32px] px-2 py-1.5 active:scale-95 gap-1.5',
        icon: 'shrink-0',
      },
      shape: {
        rounded: 'rounded-xl',
        circle: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        size: 'icon',
        shape: 'circle',
        class: 'w-10 h-10 active:scale-90 p-0',
      },
      {
        size: 'icon',
        shape: 'rounded',
        class: 'p-2 sm:p-2.5 active:scale-95',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'rounded',
    },
  }
);
