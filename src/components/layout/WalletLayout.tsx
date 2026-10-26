import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Toast } from '@/components/ui/Toast';

interface WalletLayoutProps {
  children: ReactNode;
  soundEnabled: boolean;
  onToggleSound: () => void;
  toast: {
    visible: boolean;
    title: string;
    detail?: string;
  };
}

export function WalletLayout({ children, soundEnabled, onToggleSound, toast }: WalletLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-[#08090d] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 font-['Geist','Inter',sans-serif]">
      <Header soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
      <Toast visible={toast.visible} title={toast.title} detail={toast.detail} />
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-4 md:py-6 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
