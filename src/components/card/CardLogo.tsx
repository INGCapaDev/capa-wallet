import type { CardNetwork } from '@/types/card';

export type CardLogoMode = 'color' | 'monochrome';

interface NetworkMarkProps {
  variant?: CardLogoMode;
  className?: string;
}

export interface CardLogoProps extends NetworkMarkProps {
  network: CardNetwork;
}

export function MastercardLogo({ className = 'h-7', variant = 'color' }: NetworkMarkProps) {
  const isColor = variant === 'color';
  return (
    <svg viewBox="0 0 48 30" className={className} fill="none" aria-label="Mastercard">
      {isColor ? (
        <>
          <circle cx="15" cy="15" r="14" fill="#EB001B" />
          <circle cx="33" cy="15" r="14" fill="#F79E1B" fillOpacity="0.9" />
          <path
            d="M24 6.8c3.2 2.2 5.3 5.9 5.3 10.2s-2.1 8-5.3 10.2c-3.2-2.2-5.3-5.9-5.3-10.2s2.1-8 5.3-10.2z"
            fill="#FF5F00"
          />
        </>
      ) : (
        <>
          <circle cx="15" cy="15" r="14" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="33" cy="15" r="14" fill="#FFFFFF" fillOpacity="0.45" />
          <path
            d="M24 6.8c3.2 2.2 5.3 5.9 5.3 10.2s-2.1 8-5.3 10.2c-3.2-2.2-5.3-5.9-5.3-10.2s2.1-8 5.3-10.2z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />
        </>
      )}
    </svg>
  );
}

export function VisaLogo({ className = 'h-5', variant = 'color' }: NetworkMarkProps) {
  const isColor = variant === 'color';
  return (
    <svg
      viewBox="55 140 668 220"
      className={className}
      fill="none"
      aria-label="Visa"
    >
      <path
        d="M58.9453 152.762L60.0794 146.162H149.49C162.401 146.162 172.949 153.954 175.032 167.612L197.739 286.953L253.385 146.162H309.469L222.868 353.237H166.655L124.721 191.537C120.872 176.619 119.245 171.815 96.395 163.565C78.6488 156.369 58.9453 152.762 58.9453 152.762Z"
        fill="#FFFFFF"
      />
      <path
        d="M58.9453 152.762L60.0794 146.162H149.49C154.5 146.162 159 148 163 151L141 185C127.5 172 119.245 171.815 96.395 163.565C78.6488 156.369 58.9453 152.762 58.9453 152.762Z"
        fill={isColor ? '#FAA61A' : '#FFFFFF'}
        fillOpacity={isColor ? 1 : 0.75}
      />
      <path
        d="M288.025 353.237L332.021 146.162H385.348L341.506 353.237H288.025Z"
        fill="#FFFFFF"
      />
      <path
        d="M399.884 212.007C399.884 167.144 441.738 142.862 488.573 142.862C518.568 142.862 539.837 152.04 539.837 152.04L530.378 195.765C530.378 195.765 510.831 185.865 486.872 185.865C465.637 185.865 455.402 195.206 455.402 203.732C455.402 213.307 467.277 219.61 481.547 227.184C503.029 238.586 529.94 252.869 529.94 285.535C529.94 331.166 489.648 356.64 438.442 356.64C403.895 356.64 377.873 345.141 377.873 345.141L387.539 299.87C387.539 299.87 410.127 313.482 440.35 313.482C461.645 313.482 474.114 303.74 474.114 292.857C474.114 282.136 461.343 275.251 446.395 267.192C425.306 255.822 399.884 242.116 399.884 212.007Z"
        fill="#FFFFFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M605.561 165.137C610.575 153.069 617.408 146.162 630.304 146.162H675.383L718.555 353.237H669.068L662.47 321.887H594.143L583.292 353.237H527.208L605.561 165.137ZM637.598 202.107L654.223 279.812H609.685L637.598 202.107Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CardLogo({
  network,
  variant = 'color',
  className = 'h-5 sm:h-6',
}: CardLogoProps) {
  if (network === 'visa') {
    return <VisaLogo className={className} variant={variant} />;
  }
  return <MastercardLogo className={className} variant={variant} />;
}
