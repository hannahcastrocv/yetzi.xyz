# YETZI — *Got Yeeted. Landed on Arc.*

An animated single-page landing site built from your reference artwork. The
scene is **not** a flat background: YETZI and two floating steam/ice puffs were
separated onto their own transparent layers and the water behind them was
re-painted, so the ape floats, the puffs drift, and sakura petals fall —
independently — over a clean background. Everything is centred and balanced like
the reference, and the whole thing is driven by one config file.

---

## 🚀 Two ways to use this

**A) Full React + Vite project** (recommended — clean, editable, deployable)
**B) Zero-build** — just open `preview/index.html` in a browser. It's a single
self-contained file with the images baked in. Handy for a quick look or a dead
simple host.

---

## ✏️ Where to change things — `src/config.js`

Open **`src/config.js`**. This is the only file you need for content. Change a
value, save, done:

```js
export const siteConfig = {
  brandName: "YETZI",
  ticker: "$YETZI",
  slogan: "Got Yeeted. Landed on Arc.",
  tagline: "The bluest ape in the hot spring.",

  contractAddress: "YOUR_CONTRACT_ADDRESS",   // ← paste your CA here

  links: {
    buy:       "YOUR_BUY_LINK",        // ← BUY YETZI button
    x:         "YOUR_X_LINK",          // ← https://x.com/...
    telegram:  "YOUR_TELEGRAM_LINK",   // ← https://t.me/...
    community: "YOUR_COMMUNITY_LINK",  // ← Discord / community invite
    website:   "YOUR_WEBSITE_LINK",    // ← https://...
  },

  pageTitle: "YETZI — Got Yeeted. Landed on Arc.",
};
```

| I want to change…            | Edit this in `src/config.js`        |
| ---------------------------- | ----------------------------------- |
| Contract address             | `contractAddress`                   |
| Buy link                     | `links.buy`                         |
| X / Twitter link             | `links.x`                           |
| Telegram link                | `links.telegram`                    |
| Community link               | `links.community`                   |
| Website / other social link  | `links.website`                     |
| Brand name / ticker          | `brandName`, `ticker`               |
| Slogan (speech bubble)       | `slogan`                            |
| Tagline (under the name)     | `tagline`                           |
| Browser tab title            | `pageTitle`                         |

Every social icon opens its link in a **new tab** with `rel="noopener
noreferrer"`. The contract address has a **copy button** (shows *“Copied!”*).

> Using the zero-build file instead? The same values live at the top of
> `preview/index.html` in a `cfg` block — edit them there.

---

## 🖼️ The artwork / images

I already split your reference image into layers for you. They live in
**`public/assets/`**:

| File          | What it is                                            |
| ------------- | ----------------------------------------------------- |
| `bg.webp`     | The hot-spring scene with YETZI **and** the two puffs removed and the water re-painted. This is the static background. |
| `yetzi.webp`  | YETZI on transparency — the layer that floats.        |
| `ice1.webp`   | Upper steam/ice puff — drifts on its own.             |
| `ice2.webp`   | Left steam/ice puff — drifts on its own.              |

You don't need to place anything — it already works. **To swap in your own
art**, just replace these four files (keep the names) and, if the layer sits in
a different spot, adjust the positions in the `artwork` block at the bottom of
`src/config.js` (values are a % of the background image):

```js
export const artwork = {
  aspectRatio: 2.5006,                 // width / height of bg.webp
  background: "/assets/bg.webp",
  character: { src: "/assets/yetzi.webp", left: "30.812%", top: "2.648%", width: "48.815%" },
  ice: [
    { src: "/assets/ice1.webp", className: "layer--ice1" },
    { src: "/assets/ice2.webp", className: "layer--ice2" },
  ],
};
```

---

## 🧩 Project structure

```
yetzi-site/
├─ index.html               # HTML shell (fonts, meta, #root)
├─ package.json
├─ vite.config.js           # set `base` here if deploying to a sub-path
├─ README.md
├─ public/
│  └─ assets/               # ← your images live here
│     ├─ bg.webp
│     ├─ yetzi.webp
│     ├─ ice1.webp
│     └─ ice2.webp
├─ preview/
│  └─ index.html            # zero-build, self-contained version
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ config.js             # ← EDIT CONTENT HERE
   ├─ styles.css            # all styling + animations
   └─ components/
      ├─ Hero.jsx           # composes the scene + UI
      ├─ Logo.jsx
      ├─ SpeechBubble.jsx
      ├─ Character.jsx      # the floating YETZI layer
      ├─ IcePieces.jsx      # drifting puffs
      ├─ Petals.jsx         # falling sakura
      ├─ ContractAddress.jsx# copy-to-clipboard
      ├─ BuyButton.jsx
      ├─ SocialLinks.jsx
      └─ Icons.jsx          # inline SVG icons (no icon library)
```

---

## 🛠️ Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it.

---

## 📦 Build & deploy

```bash
npm run build      # outputs a static site to dist/
npm run preview    # preview the production build locally
```

`dist/` is a plain static folder — host it anywhere:

- **Vercel / Netlify:** import the repo (or drag-and-drop `dist/`). Framework:
  *Vite*. Build command `npm run build`, output dir `dist`.
- **Cloudflare Pages / any static host / S3:** upload the contents of `dist/`.
- **GitHub Pages (project site at `/your-repo/`):** set `base: "/your-repo/"`
  in `vite.config.js`, run `npm run build`, and publish `dist/`.

**No Node at all?** Just upload `preview/index.html` — it's fully
self-contained (images embedded). Rename it to `index.html` on your host.

---

## ♿ Accessibility & motion

- Social buttons and the copy button have `aria-label`s; links are keyboard
  focusable with a visible focus ring.
- **`prefers-reduced-motion`** is respected: if the visitor has reduced motion
  enabled, the floating, drifting and petals are switched off and the scene sits
  still.

---

## 🎨 Tweaking the vibe (optional)

Everything visual is in `src/styles.css`:

- **Colours:** the `:root` variables at the top (`--royal`, `--navy`,
  `--water`, `--sakura`, …).
- **Float / drift feel:** the `floatChar`, `drift1`, `drift2` keyframes.
- **Fonts:** *Luckiest Guy* (display) + *Fredoka* (body), loaded in
  `index.html`.
- **How the scene crops on each screen:** the `--fx` / `--fy` focal point on
  `.scene` (and its media queries) decides what stays centred.

---

## 🗺️ Pages & routing (NEW)

The site is now three routes, using a **hash router** so it works on any static
host (GitHub Pages, Netlify, Vercel, S3…) with **no server rewrite rules**:

| Route            | Page          | What it is |
|------------------|---------------|------------|
| `/#/`            | Home          | The animated hero (unchanged). |
| `/#/cave`        | The Cave      | Holder-only area → wallet connect → **Proof of Yeti** card. |
| `/#/mountain`    | The Mountain  | Market-cap climb visualised on a stylised YETZI mountain. |

A small floating nav (top-left) switches between them. The homepage art,
animations and layout are untouched.

## 🖼️ Artwork & favicon (NEW)

- **PHOTO 1** (the YETZI head) is used **only** in The Cave / Proof of Yeti and
  as the favicon. It lives at **`public/assets/photo1.webp`** (transparent
  cut-out). Swap that one file to change the Cave art everywhere.
- Favicons: `public/favicon.ico`, `public/favicon-256.png`,
  `public/apple-touch-icon.png` (all generated from PHOTO 1).
- The homepage `$YETZI` badge no longer prints the word "YETZI" beside it.

## 🔗 The Cave — live holder data

Everything shown is **real, on-chain data** read from the Arc JSON-RPC
(`chain.rpcUrl` in config, CORS-open). A visitor connects an injected wallet
(MetaMask/Rabby) — or pastes any address to look it up — and we read:

- **YETZI held** and **share of supply** — live via `balanceOf` on Arc.
- **Total supply / symbol / decimals** — live from the token contract.

Data we **cannot** verify from a public browser API is simply **not shown**
(e.g. holder rank). To enable rank, set `dataSources.holderRankApi` to a URL
that returns `{ "rank": 123 }` (use `{address}` as a placeholder in the URL).

The **Proof of Yeti** card only appears for real holders (balance > 0), and
`SHARE MY PROOF` opens a pre-filled X post. It's designed to be screenshot-worthy.

## 🏔️ The Mountain — market cap climb

- The mountain **terrain is designed art**, not a plotted price history (there's
  no public historical feed). **Milestones** are configurable market-cap targets
  (`mountainMilestones`), and the **"YETZI IS HERE"** marker sits at the current
  market cap on a log scale — it moves automatically as data updates (60s).
- **Total supply is always live** (on-chain). **Market cap = price × supply.**
  There is no reliable public browser price feed for this token yet
  (RadarDEX's API is Cloudflare-gated), so until you connect one the page runs on
  `demoMarketCap` and shows a visible **`◐ DEMO DATA`** badge — never presented
  as live.

### Going live on price

Set **`dataSources.priceApi`** to a URL returning `{ "priceUsd": 0.00000123 }`
(or edit `fetchPriceUsd()` in `src/lib/market.js` to match your feed / read the
DEX pool directly with ethers). Once a price resolves, the badge flips to
**`● LIVE`** and the market cap becomes real automatically.

### Editing milestones

```js
mountainMilestones: [
  { mc: 10000,  name: "BASE CAMP",  blurb: "The climb begins." },
  { mc: 100000, name: "SNOW GATE",  blurb: "Through the white gate." },
  // add / remove / rename freely — keep ascending order
],
```

## 🧩 Project structure (NEW)

```
src/
  config.js            ← all content + data-source settings
  App.jsx              ← hash router (Home / Cave / Mountain) + nav
  pages/               ← Home, Cave, Mountain
  components/          ← Hero (+ homepage parts), Nav, WalletConnect,
                         HolderProfile, ProofOfYeti, MountainChart, MountainMilestone
  lib/
    chain.js           ← real on-chain reads (balanceOf, totalSupply)
    market.js          ← market-cap provider (live price hook + demo fallback)
    wallet.js          ← EIP-1193 connect
    format.js          ← number / address formatting
```

## 🏗️ Build & deploy

```bash
npm install
npm run build      # → dist/  (upload the folder to any static host)
```

Because it's a hash router, no redirects/rewrites are needed. `preview/index.html`
is a single self-contained copy of the whole app (all three pages, images baked
in) — handy for a quick look or a one-file host.
