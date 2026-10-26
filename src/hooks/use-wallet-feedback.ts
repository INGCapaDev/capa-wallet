import { useEffect, useRef, useState } from 'react';
import { soundFX } from '@/utils/audio';
import { triggerHaptic } from '@/utils/haptics';

type CopyTarget = 'clabe' | 'summary';

interface WalletToast {
  visible: boolean;
  title: string;
  detail?: string;
}

export function useWalletFeedback() {
  const [toast, setToast] = useState<WalletToast>({ visible: false, title: '' });
  const [copied, setCopied] = useState({ clabe: false, summary: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimers = useRef<Record<CopyTarget, ReturnType<typeof setTimeout> | undefined>>({
    clabe: undefined,
    summary: undefined,
  });
  const copyRequest = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const timers = copyTimers.current;
    return () => {
      mounted.current = false;
      copyRequest.current += 1;
      clearTimeout(toastTimer.current);
      clearTimeout(timers.clabe);
      clearTimeout(timers.summary);
    };
  }, []);

  const showToast = (title: string, detail?: string) => {
    if (!mounted.current) return;
    clearTimeout(toastTimer.current);
    setToast({ visible: true, title, detail });
    toastTimer.current = setTimeout(() => {
      setToast((previous) => ({ ...previous, visible: false }));
    }, 2400);
  };

  const resetCopied = () => {
    copyRequest.current += 1;
    clearTimeout(copyTimers.current.clabe);
    clearTimeout(copyTimers.current.summary);
    setCopied({ clabe: false, summary: false });
  };

  const copyText = async (text: string, target: CopyTarget) => {
    const request = ++copyRequest.current;
    clearTimeout(copyTimers.current[target]);
    setCopied((previous) => ({ ...previous, [target]: false }));

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      if (request === copyRequest.current) showToast('Error al copiar');
      return;
    }

    if (request !== copyRequest.current) return;

    soundFX.playCopySuccess();
    triggerHaptic('copy');
    setCopied((previous) => ({ ...previous, [target]: true }));
    showToast(target === 'clabe' ? 'CLABE copiada' : 'Resumen copiado');
    copyTimers.current[target] = setTimeout(() => {
      setCopied((previous) => ({ ...previous, [target]: false }));
    }, 2400);
  };

  return {
    toast,
    copiedClabe: copied.clabe,
    copiedSummary: copied.summary,
    showToast,
    resetCopied,
    copyText,
  };
}
