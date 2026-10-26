import type { CardVariantId } from '@/data/card-designs';

export type CardNetwork = 'visa' | 'mastercard';

export interface SpeiName {
  spei: string;
  label: string;
}

export interface BankName extends SpeiName {
  short?: string;
}

export interface BankCardData {
  id: string;
  bank: {
    name: BankName;
    clabe: string;
    logo: CardNetwork;
    digits: string;
  };
  owner: {
    name: SpeiName;
  };
  variant: CardVariantId;
}
