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
};

/* ============================================================================
 *  🎨  ARTWORK LAYOUT  (advanced — you normally don't need to change this)
 *  ----------------------------------------------------------------------------
 *  The scene is the reference artwork with YETZI and the steam/ice puffs
 *  separated onto their own layers so they float independently. Positions are
 *  a percentage of the artwork, so they always line up over the background.
 *  Only tweak these if you replace the art with your own separated layers.
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
