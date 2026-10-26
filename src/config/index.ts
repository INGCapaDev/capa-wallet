import { parseSiteOrigin } from './env.ts';

export const AppConfig = {
  site: parseSiteOrigin(import.meta.env.VITE_SITE_ORIGIN),
  isPersonal: import.meta.env.MODE === 'personal',
} as const;
