import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parseEnv } from 'node:util';
import { defineConfig } from 'vite';
import { parseSiteOrigin } from './src/config/env.ts';
import {
  MissingPersonalCardsError,
  MissingPersonalEnvironmentError,
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

  const envFile = path.resolve(import.meta.dirname, isPersonal ? '.env.personal' : '.env');
  if (isPersonal && !existsSync(envFile)) throw new MissingPersonalEnvironmentError();
  const environment = parseEnv(readFileSync(envFile, 'utf8'));
  const origin = parseSiteOrigin(process.env.VITE_SITE_ORIGIN ?? environment.VITE_SITE_ORIGIN);

  return {
    envDir: false,
    define: {
      'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify(origin),
    },
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
