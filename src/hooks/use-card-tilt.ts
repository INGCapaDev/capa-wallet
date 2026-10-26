import { useState, type MouseEvent, type TouchEvent } from 'react';

export interface CardTilt {
  x: number;
  y: number;
  glareX: number;
  glareY: number;
  active: boolean;
}

const INITIAL_TILT: CardTilt = {
  x: 0,
  y: 0,
  glareX: 50,
  glareY: 50,
  active: false,
};

export function useCardTilt(isActive: boolean) {
  const [tilt, setTilt] = useState(INITIAL_TILT);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 10;

    setTilt({
      x: -y * maxTilt,
      y: x * maxTilt,
      glareX: ((event.clientX - rect.left) / rect.width) * 100,
      glareY: ((event.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!isActive) return;
    if (event.target instanceof Element && event.target.closest('button')) return;

    const touch = event.touches[0];
    if (!touch) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 8;

    setTilt({
      x: -y * maxTilt,
      y: x * maxTilt,
      glareX: 50,
      glareY: 50,
      active: true,
    });
  };

  const resetTilt = () => setTilt(INITIAL_TILT);

  return { tilt, handleMouseMove, handleTouchMove, resetTilt };
}
