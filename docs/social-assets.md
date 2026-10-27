# Social previews and indexing policy

The Dynamic Deck brand kit supplies one app-wide social preview. Its illustrated cards show the approved shortened display name `Alvaro Capaceta`, abstract marks, and masked identifiers. These are marketing illustrations, not functional banking details.

## Assets

- `public/social/capa-wallet-og.jpg`: canonical 1200 × 630 Open Graph and Twitter/X image, 165,304 bytes (below 300 KB). Both metadata entries use this same landscape asset, independent of viewport or selected card.
- `public/favicon.svg` and `public/favicon.ico`: browser-tab icon and fallback.
- `public/apple-touch-icon.png`: 180 × 180 Apple bookmark/home-screen icon. No web app manifest or service worker is provided; the site is not offered as an installable PWA.
- `public/robots.txt` and `public/_headers`: crawler instructions and Cloudflare Pages indexing headers, described below.

The header renders Lucide's `CreditCard` icon rather than a public image. Unused PNG preview alternatives, manual-post exports, and icon variants have been removed from `public/`; earlier versions remain recoverable from Git history. The retained image files are unchanged.

## Initial HTML and production origins

`index.html` owns one set of canonical, Open Graph, Twitter/X, favicon, theme-color, and robots tags. Vite natively replaces `%VITE_SITE_ORIGIN%` from environment files at build time, so crawlers can read absolute HTTPS image URLs without executing React. The tracked `.env` holds the public demo origin `https://wallet.ingcapadev.com`; generic ignored overrides are documented in [personal-data.md](personal-data.md). There is no custom HTML replacement plugin.

All card links use the same preview. Per-card metadata, SSR, and dynamic image generation are not implemented. Preview caching and platform behavior must be checked on the actual deployment; local validation does not establish a working WhatsApp, Discord, or Telegram embed.

## Indexing discouragement, not privacy

Initial HTML includes `noindex, nofollow, nosnippet, noimageindex`. On static Cloudflare Pages, `public/_headers` applies the same `X-Robots-Tag` policy through a domain-independent `/*` rule, including static assets and SPA fallback responses. Verify the deployed root, arbitrary paths, assets, and applicable error responses; Vite's preview server does not apply Pages `_headers` rules.

`robots.txt` allows ordinary crawlers to fetch pages so they can see `noindex`, while asking selected training crawlers not to crawl. Blocking all crawling could prevent search engines from seeing the indexing directive. Social-preview fetchers remain able to request the static HTML and images.

No sitemap or URL-discovery list is published. These are requests to compliant automated clients, not authentication or anti-scraping protection. Public pages and bundled configuration can still be inspected, copied, or scraped, and the public GitHub repository remains discoverable. Existing search results may take time to disappear after crawlers observe the policy.
