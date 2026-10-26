// zod/mini keeps the browser bundle small; this module is the only schema consumer.
import * as z from 'zod/mini';
import { InvalidSiteOriginError, MissingSiteOriginError } from '../errors/configuration.errors.ts';

function isHttpsOrigin(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.origin === value;
  } catch {
    return false;
  }
}

const siteOrigin = z.string().check(z.refine(isHttpsOrigin, 'Expected a clean HTTPS origin'));

export function parseSiteOrigin(value: unknown): string {
  if (value === undefined || value === '') throw new MissingSiteOriginError();
  const result = z.safeParse(siteOrigin, value);
  if (!result.success) throw new InvalidSiteOriginError();
  return result.data;
}
