# Cloudflare Pages deployment

One public repository builds two independent static Pages sites. There are no Workers, Pages Functions, or server runtime. The demo deploys automatically on pushes to `main`; personal deployment stays on your machine, using ignored files. No personal data or personal production credentials need to be stored in GitHub.

## Automatic demo deployment

Connect the public repository directly through the Cloudflare dashboard. Cloudflare installs dependencies, checks TypeScript, builds the fictional demo, and publishes `dist/` after a merge or push to `main`. No GitHub Actions deployment workflow, GitHub environment, or Cloudflare API token in GitHub is needed.

### One-time GitHub and Cloudflare setup

1. In **Workers & Pages → Create application → Pages → Connect to Git**, authorize Cloudflare's GitHub integration for this public repository only.
2. Select the repository and configure:

   | Setting | Value |
   | :-- | :-- |
   | Production branch | `main` |
   | Root directory | Repository root (leave blank) |
   | Build command | `pnpm lint && pnpm build` |
   | Build output directory | `dist` |
   | Build variable `NODE_VERSION` | `24.15.0` |
   | Build variable `PNPM_VERSION` | `11.3.0` |

3. Save and deploy. Cloudflare detects `pnpm-lock.yaml` and installs dependencies before the build. Do not use `pnpm deploy` as the build command: Pages publishes the output itself. The demo origin comes from the tracked `.env`; no origin override or personal configuration is needed.
4. Under **Build → Branch control**, keep automatic production deployment enabled and set preview branches to **None** to deploy only `main`. Protect `main` with your normal merge/approval rules.
5. Associate the demo domain with this project if needed. Check its deployment logs and deployed commit in Cloudflare. Retry a failed build there after fixing settings, or push a code correction to `main`.

Cloudflare does not convert Direct Upload projects into Git-integrated projects. Create a new Git-connected project if the old demo used Direct Upload. Reusing an existing project name may require deleting the old project first; deletion removes its deployments and takes that site offline. Never delete the personal project. Resolve custom-domain/DNS associations before deleting a project or moving a domain, and verify the replacement site afterward.

### Build isolation

Keep personal data and credentials out of the demo project's build variables, secrets, and repository. A fresh checkout contains neither `.env.personal` nor `cards.personal.ts`, and the default build selects only the fictional dataset. Preview builds must remain disabled for the main-only workflow. Do not configure a second Git-connected project for personal deployment or add personal data to a CI artifact. Application code and dependencies on `main` are trusted build inputs; protect that branch and review dependency changes. Personal deployment remains entirely local.

## Local setup

Install dependencies with `pnpm install --frozen-lockfile`, then authenticate locally with `pnpm exec wrangler login`. If multiple accounts are available, set `CLOUDFLARE_ACCOUNT_ID` in your shell. Do not put account-specific settings or credentials in tracked files. Vite environment files configure builds, not Wrangler authentication.

Create the demo project through **Connect to Git**, as above, not `wrangler pages project create`, which creates a Direct Upload project. The tracked `wrangler.jsonc` selects the demo project and `dist/` for optional local uploads. If your Git-connected project has a different name, update the public project name in that file and the optional `deploy` package command together.

For personal deployment, first follow [personal data setup](personal-data.md). Create the separate personal Pages project once if needed, replacing the generic name below with your own:

```sh
pnpm exec wrangler pages project create your-personal-project --production-branch main
```

## Local commands

| Variant | Develop | Build | Preview | Build and deploy |
| :-- | :-- | :-- | :-- | :-- |
| Demo | `pnpm dev` | `pnpm build` | `pnpm preview` | `pnpm deploy` |
| Personal | `pnpm dev:personal` | `pnpm build:personal` | `pnpm preview:personal` | `pnpm deploy:personal` |

Set the personal destination once in your ignored `.env.personal`, alongside the existing origin:

```dotenv
VITE_SITE_ORIGIN=https://your-domain.example
CLOUDFLARE_PAGES_PROJECT_NAME=your-personal-project
```

Then run `pnpm deploy:personal`. Its launcher requires both settings in that file before building, uses its explicit origin for the build, and uploads only `dist-personal/` to the configured project with `--branch main`. It does not rely on your checked-out Git branch, so tags and detached stable commits work too. The personal Pages production branch must be `main`. Wrangler credentials and account selection come from local login or your shell, not from the Vite environment file.

The command uses `--experimental-strip-types` to execute the TypeScript launcher and shared validation on the supported Node.js 22.12 minimum. Node.js 22.18 and later enable type stripping by default; retaining the flag also supports earlier compatible Node versions without another dependency. `pnpm lint` performs type checking separately.

Never set the personal destination to the demo project. Deployment publishes personal details to Cloudflare; run it only when you intend to publish them. Bundled transfer details are accessible to visitors, not secret just because their source file is ignored. `CLOUDFLARE_PAGES_PROJECT_NAME` has no `VITE_` prefix and is not exposed through `import.meta.env`.

Wrangler Pages does not support custom `--config` paths. An existing ignored `wrangler.personal.jsonc` may remain as a local note, but is not consumed by these commands and is not needed for a fresh setup. The launcher supplies the supported output/project arguments without hardcoding a private destination in tracked code.

## Development, stable deployments, and rollback

1. Develop features on short-lived branches using fictional data, check with `pnpm lint` and `pnpm build`, then merge into `main`.
2. Select a stable commit or release tag for personal production. Back up the ignored cards, environment files, and any private local notes outside Git before switching versions. Start from a clean tracked worktree and use `git switch --detach <commit-or-tag>` in this same repository. Do not use force checkout or `git clean -x`, which can destroy local data.
3. Run `pnpm install --frozen-lockfile`, `pnpm lint`, then `pnpm deploy:personal`. Confirm the selected version supports the current card model and configuration-driven personal deployment.
4. Record the code SHA (`git rev-parse HEAD`) and the personal data revision in a private local note, then return with `git switch main`.

To update personal data independently, edit `src/data/cards.personal.ts` and run `pnpm deploy:personal` at the selected code version. No code release is required. To roll back code, repeat these steps with the previous known-good commit or tag. This rebuild uses your **current** local data; restore a secure backup separately if you also need historical data. For older commits without the launcher, build with `pnpm build:personal` and deploy explicitly with `pnpm exec wrangler pages deploy dist-personal --project-name your-personal-project --branch main`. No second repository, extra remote, or synchronized release branch is needed.

## Custom domains

Associate each domain only with its corresponding Pages project under **Workers & Pages → project → Custom domains**, before changing DNS. If DNS is external, configure the CNAME to that project's `*.pages.dev` hostname after association. Resolve existing project or hostname ownership conflicts first. Keep personal domain values in local configuration, not this public documentation.

Project creation, domain association, DNS changes, and deployments are separate operations; none are performed by local validation.
