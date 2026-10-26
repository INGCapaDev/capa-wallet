# TODO

Shared product and showcase roadmap for Capa Wallet. These entries describe deferred work, not execution authorization or a guarantee that a feature is already available.

## Shareable focused-card pages

- [ ] Support direct links such as `/nu`, `/bbva`, and `/revolut` that show only the requested card.
  - Purpose: share a focused card experience instead of the whole wallet.
  - Reuse the card's design, flip/tilt interactions, copy/share actions, and feedback without giving the focused view a card collection or wallet-navigation state.
  - Exclude the carousel, other-card previews, counters/dots, previous/next controls, card-switching swipes/shortcuts, and links back to the wallet from valid focused pages.
  - Keep `/` as the full wallet and preserve existing `/#card-id` links. Direct visits and refreshes on focused paths must work on the deployed host.
  - Decide whether any existing share control should share the focused URL; do not silently replace current transfer-detail sharing.
  - Routing-library selection remains open; TanStack Router has not been approved or installed.

- [ ] Add a minimalist, text-only not-found page for unknown card IDs and unmatched paths.
  - Keep the view focused: brief not-found text and one link to `/`, without a carousel or other-card suggestions.
  - Handle unknown routes explicitly instead of silently showing the full wallet. Address HTTP status behavior with the actual deployment rather than assuming a client-rendered page returns HTTP 404.

## Discoverability and automated access

- [ ] Verify the direct-link-oriented app's indexing and crawler policy on the deployed host.
  - Initial HTML robots metadata, `robots.txt`, and a Pages `_headers` wildcard are configured. Verify the deployed root, assets, arbitrary paths, and applicable error responses; extend verification to future focused-card/not-found routes. Avoid publishing discovery lists or sitemaps.
  - Plan crawling and indexing directives together: blocking crawling can prevent a crawler from seeing a page's `noindex`. Verify the intended deployed responses, not just source files.
  - Review social/link-preview behavior: previews also use automated fetchers, and blocking them may prevent previews of shared links. Avoid exposing card details in metadata.
  - Document direct-link-oriented sharing and indexing discouragement as a README feature, with the limitations below clearly stated rather than claiming private or undiscoverable access. This applies to the deployed app; a public GitHub repository remains discoverable, especially when linked from a portfolio.
  - Limitation: public direct links, robots directives, `noindex`, and AI-bot policies are not access controls and cannot guarantee that all crawlers, scrapers, or AI systems are blocked. Predictable paths and client-side configuration remain accessible.
  - Confirmed access model: public-repository discoverability is acceptable; the deployed website should remain direct-link-oriented and discourage indexing and crawlers, accepting that these measures cannot guarantee restricted access. Authentication or access-gating infrastructure is not requested.

## Public portfolio showcase

- [ ] Publish the sanitized public showcase with fresh history and fictional demonstration data.
  - Publish only the inspected Capa Wallet source and public assets with a clean initial history. Never publish historical commits containing sensitive information.
  - Inspect all proposed public files, assets, documentation, and demo output for personal/banking information and secrets before upload. Replacing current data does not remove earlier committed values. Any history rewriting or remediation needs separate authorization.
  - Keep every banking identifier in `src/data/cards.demo.ts` fictional, including random four-digit endings and obvious repeated-digit 18-digit CLABE placeholders. The author-approved display name is `Alvaro Capaceta Magallanes`. Preserve the explicit personal-mode boundary in future changes.
  - Ensure display, copy, share, and future focused-card views use the selected dataset consistently. Keep the demo disclaimer accurate: no payments are processed and users must not send money to demo identifiers.

- [ ] Publish the project under the agreed Capa Wallet name.
  - Public repository: `INGCapaDev/capa-wallet`. Keep customization configuration ignored and reusable improvements in the shared project.
  - Suggested description: "Interactive 3D bank-card showcase for sharing transfer details, built with React and TypeScript. Fictional demo data only; no payments are processed."
  - After the public-release safety checkpoint, verify repository naming, public links, and the exact source inventory before upload.

- [ ] Publish the portfolio-ready README and fictional-data screenshots with the public repository.
  - Match the concise introduction, preview, feature list, and command table of [my-blog](https://github.com/INGCapaDev/my-blog) and [minimalist-resume](https://github.com/INGCapaDev/minimalist-resume), without copying unverified feature or performance claims.
  - Cover the project's purpose, demo link, visuals, core interactions, tech stack, local setup, and fictional-data/no-payments disclaimer. Describe transfer-detail copying/sharing accurately rather than claiming the app performs bank transfers.
  - Label the demo deployment and focused routes as planned until verified. Distinguish configured indexing directives from verified deployed responses, and public source visibility from website access control.

- [ ] Configure static Cloudflare Pages hosting through Wrangler for the public demo.
  - Public demo: `wallet.ingcapadev.com`.
  - No Workers deployment, Pages Functions, or server runtime. Keep any customized deployment details in that user's ignored local configuration rather than the public repository.
  - Document Pages custom-domain association and DNS prerequisites. Deployments, domain association, and DNS mutations require separate authorization; do not claim either site is live before checking it.

- [ ] Verify social-sharing previews for the deployed showcase.
  - The Dynamic Deck kit, initial-HTML metadata, absolute build-time image URLs, favicon, header mark, and manifest are integrated. Verify their deployed responses, canonical origin, image content types, and platform caches before claiming live previews work.
  - Use demo-safe preview text and imagery with no real banking identifiers. Decide whether focused-card links need distinct previews or the shared showcase preview when implementing those routes.
  - Verify previews on the deployed host while coordinating crawler directives with the discoverability entry above; do not promise working social previews while blocking the fetchers they require.
