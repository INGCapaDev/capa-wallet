export interface CardDesign {
  accentColor: string;
  gradientBg: string;
  chipColor: 'gold' | 'silver';
}

export const CARD_DESIGNS = {
  bbva: {
    accentColor: '#00a9e0',
    gradientBg: 'linear-gradient(135deg, #004481 0%, #002347 50%, #001224 100%)',
    chipColor: 'silver',
  },
  nu: {
    accentColor: '#d6a0ff',
    gradientBg: 'linear-gradient(135deg, #8a05be 0%, #580082 55%, #2c0042 100%)',
    chipColor: 'gold',
  },
  mercadopago: {
    accentColor: '#00e5ff',
    gradientBg: 'linear-gradient(135deg, #009ee3 0%, #005a87 50%, #001e2e 100%)',
    chipColor: 'silver',
  },
  revolut: {
    accentColor: '#e2e8f0',
    gradientBg: 'linear-gradient(135deg, #262933 0%, #15171d 55%, #08090c 100%)',
    chipColor: 'gold',
  },
  santander: {
    accentColor: '#ff4d4d',
    gradientBg: 'linear-gradient(135deg, #780000 0%, #3a0000 55%, #180000 100%)',
    chipColor: 'silver',
  },
  banorte: {
    accentColor: '#ff2a4b',
    gradientBg: 'linear-gradient(135deg, #2b0b10 0%, #170709 50%, #0d0406 100%)',
    chipColor: 'gold',
  },
  heybanco: {
    accentColor: '#ccff00',
    gradientBg: 'linear-gradient(135deg, #1c1f24 0%, #101216 55%, #08090a 100%)',
    chipColor: 'silver',
  },
  citibanamex: {
    accentColor: '#1fa2ff',
    gradientBg: 'linear-gradient(135deg, #0b3d68 0%, #06223d 50%, #031221 100%)',
    chipColor: 'gold',
  },
  hsbc: {
    accentColor: '#db0011',
    gradientBg: 'linear-gradient(135deg, #2b313a 0%, #191c22 50%, #0c0e12 100%)',
    chipColor: 'silver',
  },
  klar: {
    accentColor: '#b46eff',
    gradientBg: 'linear-gradient(135deg, #38125e 0%, #200738 55%, #10031d 100%)',
    chipColor: 'gold',
  },
} satisfies Record<string, CardDesign>;

export type CardVariantId = keyof typeof CARD_DESIGNS;
