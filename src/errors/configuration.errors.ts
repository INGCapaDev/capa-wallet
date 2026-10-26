export class MissingPersonalCardsError extends Error {
  override readonly name = 'MissingPersonalCardsError';

  constructor() {
    super('Personal mode requires src/data/cards.personal.ts. Copy cards.demo.ts to that file and add your details locally.');
  }
}

export class MissingPersonalOriginError extends Error {
  override readonly name = 'MissingPersonalOriginError';

  constructor() {
    super('Personal mode requires an origin override in .env.personal, .env.personal.local, or VITE_SITE_ORIGIN in the build environment.');
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
