import type { BankCardData } from '@/types/card';

export const spei = {
  formatClabe(clabe: string): string {
    return `${clabe.slice(0, 3)} ${clabe.slice(3, 6)} ${clabe.slice(6, 17)} ${clabe.slice(17)}`;
  },

  generateShareText(card: BankCardData): string {
    return `Beneficiario: ${card.owner.name.spei}
Banco: ${card.bank.name.spei}
CLABE: ${card.bank.clabe}`;
  },
};
