/* ============================================================================
 *  ✏️  EDIT EVERYTHING HERE
 *  ----------------------------------------------------------------------------
 *  This is the ONLY file you need to touch to update the site's content.
 *  Change a value, save, and the page updates automatically.
 * ==========================================================================*/

export const siteConfig = {
  brandName: "YETZI",
  ticker: "$YETZI",
  slogan: "Got Yeeted. Landed on Arc.",
  tagline: "The bluest ape in the hot spring.",

  //  👇  Paste your token's contract address here
  contractAddress: "0x05050f4f6b2500ecd13e02c6a6569a15a0f2ce97",

  //  👇  All buttons / social icons read their URLs from here
  links: {
    buy:       "https://radardex.pro/#0x05050f4f6b2500ecd13e02c6a6569a15a0f2ce97",  // BUY YETZI button
    x:         "https://x.com/yetzionarc",        // X / Twitter
    telegram:  "https://t.me/officialyetzi",      // Telegram
  },

  //  Optional page <title> shown in the browser tab
  pageTitle: "YETZI — Got Yeeted. Landed on Arc.",

  /* --------------------------------------------------------------------------
   *  🔗  ON-CHAIN + DATA SOURCES  (The Cave + The Mountain)
   *  These power live holder balances and market-cap. See src/lib/ for the
   *  small, swappable fetchers that read from them.
   * ------------------------------------------------------------------------*/
  chain: {
    name: "Arc",
    chainIdHex: "0x13b2",                 // 5042
    rpcUrl: "https://rpc.arc-scan.io",    // CORS-open JSON-RPC (read-only reads work in-browser)
    rpcUrls: ["https://rpc.arc-scan.io"], // add more endpoints here for failover
    explorerToken: "https://arc-scan.io/token/0x05050f4f6b2500ecd13e02c6a6569a15a0f2ce97",
    nativeCurrency: { name: "Arc", symbol: "ARC", decimals: 18 },
  },

  dataSources: {
    arcscan:  "https://arc-scan.io/token/0x05050f4f6b2500ecd13e02c6a6569a15a0f2ce97",
    radarDex: "https://radardex.pro/#0x05050f4f6b2500ecd13e02c6a6569a15a0f2ce97",

    //  OPTIONAL: paste a URL that returns JSON { "priceUsd": 0.00000123 }
    //  (or edit src/lib/market.js to match your feed's shape). While this is
    //  empty, The Mountain runs on clearly-labelled DEMO market-cap below.
    priceApi: "",

    //  OPTIONAL: paste a URL that returns { "rank": 127 } for a wallet, e.g.
    //  "https://your-api/holders/rank?address={address}". Empty = rank hidden.
    holderRankApi: "",
  },

  //  Used ONLY while no live price feed is connected, so the mountain isn't
  //  empty during development. Shown with a visible "DEMO" badge — never
  //  presented as live data.
  demoMarketCap: 62000,

  /* --------------------------------------------------------------------------
   *  🏔️  MOUNTAIN MILESTONES  (fully configurable)
   *  mc = market-cap threshold, name = YETZI-themed level name.
   *  Keep them in ascending order. Add/remove freely.
   * ------------------------------------------------------------------------*/
  mountainMilestones: [
    { mc: 10000,    name: "BASE CAMP",    blurb: "The climb begins." },
    { mc: 25000,    name: "FROST TRAIL",  blurb: "First steps in the snow." },
    { mc: 50000,    name: "ICE RIDGE",    blurb: "Footing on the glacier." },
    { mc: 100000,   name: "SNOW GATE",    blurb: "Through the white gate." },
    { mc: 250000,   name: "GLACIER CAMP", blurb: "Halfway to the clouds." },
    { mc: 500000,   name: "YETZI PEAK",   blurb: "Above the treeline." },
    { mc: 1000000,  name: "ARC SUMMIT",   blurb: "One million. Legendary." },
    { mc: 5000000,  name: "SKY THRONE",   blurb: "Where yetis become myths." },
    { mc: 10000000, name: "MOONRISE",     blurb: "The summit above summits." },
  ],

  //  Artwork used ONLY inside The Cave / Proof of Yeti (PHOTO 1).
  //  Swap the file at public/assets/photo1.webp to change it.
  proofArtwork: "/assets/photo1.webp",
};

/* ============================================================================
 *  🎨  ARTWORK LAYOUT  (advanced — you normally don't need to change this)
 * ==========================================================================*/

export const artwork = {
  aspectRatio: 2.5006,                 // 1983 x 793
  background: "/assets/bg.webp",       // water scene with YETZI + puffs removed
  character: {
    src: "/assets/yetzi.webp",
    left: "30.812%", top: "2.648%", width: "48.815%",
  },
  ice: [
    { src: "/assets/ice1.webp", className: "layer--ice1" },
    { src: "/assets/ice2.webp", className: "layer--ice2" },
  ],
};
