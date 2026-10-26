import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { parseSiteOrigin } from './src/config/env.ts';
import {
  MissingPersonalCardsError,
  MissingPersonalOriginError,
} from './src/errors/configuration.errors.ts';

export default defineConfig(({ mode }) => {
  const isPersonal = mode === 'personal';
  const cardsFile = path.resolve(
    import.meta.dirname,
    isPersonal ? 'src/data/cards.personal.ts' : 'src/data/cards.demo.ts',
  );

  if (isPersonal && !existsSync(cardsFile)) {
    throw new MissingPersonalCardsError();
  }

  const hasPersonalEnv = ['.env.personal', '.env.personal.local'].some((file) =>
    existsSync(path.resolve(import.meta.dirname, file)),
  );
  if (isPersonal && !hasPersonalEnv && !process.env.VITE_SITE_ORIGIN) {
    throw new MissingPersonalOriginError();
  }

  const environment = loadEnv(mode, import.meta.dirname, 'VITE_');
  parseSiteOrigin(environment.VITE_SITE_ORIGIN);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@/data/cards': cardsFile,
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    build: {
      outDir: isPersonal ? 'dist-personal' : 'dist',
    },
  };
});
