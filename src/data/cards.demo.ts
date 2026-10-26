import type { BankCardData } from '@/types/card';

const CARD_OWNER = {
  name: {
    spei: 'Alvaro Capaceta Magallanes',
    label: 'Alvaro Capaceta Magallanes',
  },
};

export const BANK_CARDS: readonly [BankCardData, ...BankCardData[]] = [
  {
    id: 'bbva',
    bank: {
      name: { spei: 'BBVA', label: 'BBVA' },
      clabe: '111111111111111111',
      logo: 'visa',
      digits: '1042',
    },
    owner: CARD_OWNER,
    variant: 'bbva',
  },
  {
    id: 'nu',
    bank: {
      name: { spei: 'Nubank', label: 'Nubank' },
      clabe: '222222222222222222',
      logo: 'mastercard',
      digits: '7386',
    },
    owner: CARD_OWNER,
    variant: 'nu',
  },
  {
    id: 'mercadopago',
    bank: {
      name: { spei: 'Mercado Pago', label: 'Mercado Pago' },
      clabe: '333333333333333333',
      logo: 'mastercard',
      digits: '2537',
    },
    owner: CARD_OWNER,
    variant: 'mercadopago',
  },
  {
    id: 'revolut',
    bank: {
      name: { spei: 'Revolut', label: 'Revolut' },
      clabe: '444444444444444444',
      logo: 'visa',
      digits: '5910',
    },
    owner: CARD_OWNER,
    variant: 'revolut',
  },
  {
    id: 'santander',
    bank: {
      name: { spei: 'Santander', label: 'Santander' },
      clabe: '555555555555555555',
      logo: 'mastercard',
      digits: '6824',
    },
    owner: CARD_OWNER,
    variant: 'santander',
  },
  {
    id: 'banorte',
    bank: {
      name: { spei: 'Banorte', label: 'Banorte' },
      clabe: '666666666666666666',
      logo: 'visa',
      digits: '3075',
    },
    owner: CARD_OWNER,
    variant: 'banorte',
  },
  {
    id: 'heybanco',
    bank: {
      name: { spei: 'Hey Banco', label: 'Hey Banco' },
      clabe: '777777777777777777',
      logo: 'visa',
      digits: '9651',
    },
    owner: CARD_OWNER,
    variant: 'heybanco',
  },
  {
    id: 'citibanamex',
    bank: {
      name: { spei: 'Citibanamex', label: 'Citibanamex' },
      clabe: '888888888888888888',
      logo: 'mastercard',
      digits: '4268',
    },
    owner: CARD_OWNER,
    variant: 'citibanamex',
  },
  {
    id: 'hsbc',
    bank: {
      name: { spei: 'HSBC', label: 'HSBC' },
      clabe: '999999999999999999',
      logo: 'visa',
      digits: '8530',
    },
    owner: CARD_OWNER,
    variant: 'hsbc',
  },
  {
    id: 'klar',
    bank: {
      name: { spei: 'Klar', label: 'Klar' },
      clabe: '000000000000000000',
      logo: 'mastercard',
      digits: '1697',
    },
    owner: CARD_OWNER,
    variant: 'klar',
  },
];
