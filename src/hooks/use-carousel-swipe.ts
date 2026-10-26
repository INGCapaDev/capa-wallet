import {
  useRef,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { PanInfo } from 'motion/react';

interface CarouselSwipeOptions {
  onPreviousCard: () => void;
  onNextCard: () => void;
}

export function useCarouselSwipe({
  onPreviousCard,
  onNextCard,
}: CarouselSwipeOptions) {
  const panPointerId = useRef<number | null>(null);
  const suppressClick = useRef(false);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    const isControl = event.target instanceof Element && event.target.closest('button');
    panPointerId.current = event.pointerType === 'touch' && event.isPrimary && !isControl
      ? event.pointerId
      : null;
  };

  const handlePanStart = (event: PointerEvent) => {
    if (event.pointerId === panPointerId.current) suppressClick.current = true;
  };

  const handlePanEnd = (event: PointerEvent, { offset }: PanInfo) => {
    if (event.pointerId !== panPointerId.current) return;
    panPointerId.current = null;
    if (event.type === 'pointercancel') return;
    if (Math.abs(offset.x) <= 35 || Math.abs(offset.x) <= Math.abs(offset.y) * 1.1) return;
    if (offset.x > 0) {
      onPreviousCard();
      return;
    }
    onNextCard();
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    handlePointerDown,
    handlePanStart,
    handlePanEnd,
    handleClickCapture,
  };
}
