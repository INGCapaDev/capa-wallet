import type { CSSProperties } from 'react';
import type { CardDesign } from '@/data/card-designs';

export const cardStyles = {
  boxShadow(accentColor: string, isCenterCard: boolean): string {
    if (isCenterCard) {
      return `0 0 25px ${accentColor}80, 0 0 50px ${accentColor}33, 0 25px 50px -12px rgba(0,0,0,0.85)`;
    }
    return `0 0 16px ${accentColor}55, 0 10px 25px rgba(0,0,0,0.6)`;
  },

  front({ accentColor, gradientBg }: CardDesign): CSSProperties {
    return {
      background: `linear-gradient(135deg, rgba(10, 12, 18, 0.35) 0%, rgba(10, 12, 18, 0.65) 100%), ${gradientBg}`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transform: 'rotateY(0deg) translateZ(1px)',
      border: `1.5px solid ${accentColor}`,
      boxShadow: `inset 0 0 20px ${accentColor}40`,
    };
  },

  back({ accentColor }: CardDesign): CSSProperties {
    return {
      background: `linear-gradient(145deg, #12141a 0%, #08090d 100%)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transform: 'rotateY(180deg) translateZ(1px)',
      borderColor: accentColor,
      boxShadow: `inset 0 0 20px ${accentColor}30`,
    };
  },
};

interface CardLaserArcsProps {
  accentColor: string;
}

export function CardLaserArcs({ accentColor }: CardLaserArcsProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 250"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M-40 260 C 120 220, 260 120, 420 50"
        stroke={accentColor}
        strokeWidth="2"
        strokeOpacity="0.85"
        filter="blur(0.5px)"
      />
      <path
        d="M-20 280 C 140 230, 270 140, 430 80"
        stroke={accentColor}
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      <path
        d="M-50 180 C 100 240, 220 200, 440 210"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <path
        d="M30 260 C 200 180, 280 80, 420 -20"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
    </svg>
  );
}
