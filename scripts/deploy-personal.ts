import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';
import { build } from 'vite';
import { parseSiteOrigin } from '../src/config/env.ts';
import {
  MissingPersonalEnvironmentError,
  MissingPersonalProjectError,
} from '../src/errors/configuration.errors.ts';

const root = path.resolve(import.meta.dirname, '..');
const envFile = path.join(root, '.env.personal');

if (!existsSync(envFile)) throw new MissingPersonalEnvironmentError();

const personalEnvironment = parseEnv(readFileSync(envFile, 'utf8'));
const origin = parseSiteOrigin(personalEnvironment.VITE_SITE_ORIGIN);
const project = personalEnvironment.CLOUDFLARE_PAGES_PROJECT_NAME;

if (project === undefined || project.trim() === '') throw new MissingPersonalProjectError();

process.env.VITE_SITE_ORIGIN = origin;
await build({ root, mode: 'personal' });

const wranglerPackage = fileURLToPath(import.meta.resolve('wrangler/package.json'));
const wrangler = path.join(path.dirname(wranglerPackage), 'bin/wrangler.js');
const deployment = spawnSync(process.execPath, [
  wrangler,
  'pages',
  'deploy',
  'dist-personal',
  `--project-name=${project}`,
  '--branch=main',
], {
  cwd: root,
  stdio: 'inherit',
});

if (deployment.error) throw deployment.error;
process.exitCode = deployment.status ?? 1;
