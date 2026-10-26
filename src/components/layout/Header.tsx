import { Button } from '@/components/ui/Button';
import { AppConfig } from '@/config';
import { CreditCard, Volume2, VolumeX } from 'lucide-react';

export interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function Header({
  soundEnabled,
  onToggleSound,
}: HeaderProps) {
  return (
    <header className="w-full bg-transparent select-none z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between relative">
        <div className="flex items-center text-slate-400">
          <CreditCard className="w-4 h-4" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center pointer-events-none select-none">
          <span className="text-xs sm:text-sm font-medium text-slate-300 tracking-wider font-['Geist','Inter',sans-serif]">
            Capa Wallet
          </span>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSound}
            className="w-8 h-8"
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            aria-label={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            icon={
              soundEnabled ? (
                <Volume2 className="w-4 h-4 text-slate-400 hover:text-slate-200" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-600 hover:text-slate-400" />
              )
            }
          />
        </div>
      </div>
      {!AppConfig.isPersonal && (
        <p className="px-4 text-center text-xs text-slate-400">
          Demo con datos bancarios ficticios. No envíes dinero.
        </p>
      )}
    </header>
  );
}
