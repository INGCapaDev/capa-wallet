# Demo and personal card data

Capa Wallet defaults to fictional banking details. The demo uses the author's approved display name; its card endings and transfer identifiers are fictional. It displays, copies, and shares transfer details; it does not process payments. Do not send money using the demo identifiers.

## Default: fictional demo

```sh
pnpm dev
pnpm build
pnpm preview
```

These commands use the tracked `src/data/cards.demo.ts` dataset. The build writes to `dist/`, even when a personal dataset exists locally. The demo displays a fictional-data warning.

## Personal version

1. Create `src/data/cards.personal.ts` by copying `src/data/cards.demo.ts`, unless your personal file already exists.
2. Edit only the personal file to add your cardholder names, transfer identifiers, and card endings. Preserve its `BANK_CARDS` export and nonempty tuple type, and use design variants from `src/data/card-designs.ts`. Keep card IDs unique.
3. Create a Git-ignored `.env.personal` file containing `VITE_SITE_ORIGIN=https://your-domain.example`, using your own HTTPS origin without a trailing slash. This overrides the tracked `.env` demo default through Vite's native mode-specific loading. Personal mode requires `.env.personal`, `.env.personal.local`, or an explicit `VITE_SITE_ORIGIN` build-environment override. Set the value in that override before building; empty mode files would still inherit the generic `.env` default.
4. Check the types with `pnpm lint`. When present, the personal TypeScript file is included in that check.
5. Run the explicit personal commands:

```sh
pnpm dev:personal
pnpm build:personal
pnpm preview:personal
```

Personal builds write to `dist-personal/`, separately from the demo. Personal mode fails if `cards.personal.ts` is missing; it never silently substitutes demo data. The personal version does not display the demo warning.

Vite resolves `@/data/cards` to exactly one dataset at build time. TypeScript resolves that import to the tracked demo module for its shared contract; it also checks the personal file independently when present. There is no runtime fetch or glob import of personal data.

Vite substitutes `%VITE_SITE_ORIGIN%` directly in the initial HTML. `loadEnv` in the Vite configuration only validates that the value is a clean HTTPS origin; no custom HTML replacement plugin is used. `VITE_` values are public to the browser, so never use that prefix for secrets. The tracked `.env` contains only public demo defaults; keep all private settings in ignored mode-specific files. Restart the dev server after changing environment files.

The tracked `.env` is also the setup template: a fresh clone builds without extra steps. `.env.example` is not loaded by Vite and would duplicate that file, so it is intentionally absent. Personal overrides belong only in ignored mode-specific files such as `.env.personal`.

Application code imports `{ AppConfig }` from `@/config` instead of reading environment variables directly. `AppConfig.site` is a readonly string returned by the shared site-origin parser; `AppConfig.isPersonal` is a readonly boolean derived from Vite's built-in mode. There are no custom environment type declarations or unchecked value casts. Vite uses the same parser to validate static HTML inputs before the app runs, and `AppConfig` uses it again for the browser bundle, so both paths reject the same malformed values. Configuration is build-time, not runtime-editable deployment settings.

### Adding a setting

`src/config/env.ts` validates the environment with a small `zod/mini` schema, and the origin parser maps failures to the named configuration errors without including the supplied value. The mini entry point keeps the browser bundle small; it uses the same schema concepts as standard Zod with `.check()` checks and functional `safeParse`. Zod provides defaults, optionality, and type inference without handwritten parsers:

- `z.string()` infers `string`; `z.optional(schema)` infers `string | undefined`, and `z._default(schema, 'example')` infers a non-optional `string`.
- `z.stringbool()` parses the documented boolean spellings and infers `boolean`. Do not use `z.coerce.boolean()`: it turns the string `"false"` into `true`.
- For numbers, reject blank input before coercion: `z.pipe(z.string().check(z.trim(), z.minLength(1)), z.coerce.number())`. `z.coerce.number()` alone maps `""` to `0` and leaves `"sdf"` as `NaN`.
- Defaults apply only to absent values, never to a defined invalid value, and `false`, `0`, and an empty string remain distinct from absence.
- Use `z.infer` when a derived type needs a name, and declare the schema instead of wrapping it in a helper.

A required setting with no safe fallback, such as the site origin, keeps its dedicated named error rather than being defaulted.

## What stays out of Git

The personal source, `.env.personal`, and `dist-personal/` are ignored. Verify before committing:

```sh
git check-ignore src/data/cards.personal.ts .env.personal dist-personal/
git status --short
```

Do not force-add ignored files or put real banking details in the demo module. Ignoring a file does not remove data from older commits; never publish history containing sensitive information.

Keep secure backups of your local configuration outside Git. A fresh clone will not contain it. A remote build also will not have it unless separately provisioned; a local personal build can consume it without committing or uploading the source file.

## Publication boundary

Only `dist/` is the public-demo output. `dist-personal/` contains real transfer details intentionally delivered to visitors of the personal site. Anyone with access to that site can inspect those details, including its JavaScript bundle. Neither a private repository nor build-time configuration provides website access control. Never store passwords, banking credentials, private keys, or access tokens in either dataset.

Cloudflare Pages/Wrangler deployment configuration is planned for the demo. For any customized deployment, provision your own ignored configuration and choose its deployment target explicitly. Do not upload personal output to a demo project.
