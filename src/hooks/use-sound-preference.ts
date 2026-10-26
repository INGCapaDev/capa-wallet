import { useState } from 'react';
import { soundFX } from '@/utils/audio';

export function useSoundPreference(onShowToast: (title: string) => void) {
  const [soundEnabled, setSoundEnabled] = useState(() => soundFX.isEnabled());

  const toggleSound = () => {
    const enabled = soundFX.toggleSound();
    setSoundEnabled(enabled);
    onShowToast(enabled ? 'Sonido activado' : 'Sonido silenciado');
  };

  return { soundEnabled, toggleSound };
}
