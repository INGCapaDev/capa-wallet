import { Check } from 'lucide-react';

export interface ToastProps {
  visible: boolean;
  title: string;
  detail?: string;
}

export function Toast({ visible, title }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform pointer-events-none select-none ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-3 scale-95'
      }`}
    >
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-white/20 text-white backdrop-blur-md shadow-xl font-['Geist','Inter',sans-serif]">
        <Check className="w-3.5 h-3.5 text-white/90 shrink-0" />
        <span className="text-xs font-medium tracking-wide text-white/90">
          {title}
        </span>
      </div>
    </div>
  );
}
