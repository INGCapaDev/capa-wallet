export type HapticPattern = 'flip' | 'copy' | 'slide' | 'click' | 'success';

/**
 * Trigger subtle physical haptic vibration feedback via Web Vibration API
 * Designed to enhance the physical, tactile feel of handling luxury cards and copying data.
 */
export function triggerHaptic(type: HapticPattern): void {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
    return;
  }

  try {
    switch (type) {
      case 'flip':
        // Crisp mechanical snap (tap -> pause -> settle)
        navigator.vibrate([14, 30, 20]);
        break;
      case 'copy':
        // Confident double-pulse success haptic
        navigator.vibrate([22, 45, 38]);
        break;
      case 'slide':
        // Soft friction whisper as card slides out of wallet pocket
        navigator.vibrate(12);
        break;
      case 'click':
        // Micro tap
        navigator.vibrate(8);
        break;
      case 'success':
        // Full positive chime vibration
        navigator.vibrate([18, 40, 28]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Vibration may be restricted or unsupported on some platforms
  }
}
