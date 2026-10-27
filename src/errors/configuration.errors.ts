export class MissingPersonalEnvironmentError extends Error {
  override readonly name = 'MissingPersonalEnvironmentError';

  constructor() {
    super('Personal mode requires .env.personal with VITE_SITE_ORIGIN. Add CLOUDFLARE_PAGES_PROJECT_NAME for deployment.');
  }
}

export class MissingPersonalProjectError extends Error {
  override readonly name = 'MissingPersonalProjectError';

  constructor() {
    super('Personal deployment requires CLOUDFLARE_PAGES_PROJECT_NAME in .env.personal.');
  }
}

export class MissingPersonalCardsError extends Error {
  override readonly name = 'MissingPersonalCardsError';

  constructor() {
    super('Personal mode requires src/data/cards.personal.ts. Copy cards.demo.ts to that file and add your details locally.');
  }
}

export class MissingSiteOriginError extends Error {
  override readonly name = 'MissingSiteOriginError';

  constructor() {
    super('VITE_SITE_ORIGIN must be set in an environment file or the build environment.');
  }
}

export class InvalidSiteOriginError extends Error {
  override readonly name = 'InvalidSiteOriginError';

  constructor() {
    super('VITE_SITE_ORIGIN must be an HTTPS origin without credentials, a path, a trailing slash, a query, or a fragment.');
  }
}
