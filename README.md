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
