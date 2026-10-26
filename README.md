# 💳 Capa Wallet

Capa Wallet is an interactive, browser-based demo for displaying and sharing transfer details. Explore a 3D card carousel, flip cards, and copy or share transfer information.

> **Demo data only.** The names and banking details shown are fictional. Do not send money using them. Capa Wallet does not connect to bank accounts, store funds, or process payments.

**Try the demo:** [capa-wallet.pages.dev](https://capa-wallet.pages.dev)

## 🥃 Preview

![Capa Wallet desktop demo showing a layered carousel of fictional bank cards](docs/images/desktop.png)

<details>
<summary>Mobile preview</summary>

<img src="docs/images/mobile.png" alt="Capa Wallet mobile demo with fictional card details and copy and share controls" width="390" />

</details>

## 🔥 Features

- Browse cards in an interactive 3D carousel, or open an individual card.
- Flip cards and copy a transfer identifier or formatted transfer summary.
- Share through WhatsApp or your device’s native sharing options.
- Use swipe and keyboard controls, with optional sound and haptic feedback where supported.
- Responsive layouts for desktop and mobile.

## 🚀 Run locally

Requires Node.js 22.12 or later and pnpm.

```sh
git clone https://github.com/INGCapaDev/capa-wallet.git
cd capa-wallet
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
| :-- | :-- |
| `pnpm dev` | Run the demo locally |
| `pnpm lint` | Check TypeScript |
| `pnpm build` | Build the demo |
| `pnpm preview` | Preview the built demo |

## 📃 License

No open-source license has been selected. Public repository visibility alone does not grant permission to use, modify, or distribute this project.
