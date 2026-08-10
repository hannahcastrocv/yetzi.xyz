// ---------------------------------------------------------------------------
//  Market-cap provider for The Mountain.
//
//  Market cap = livePriceUsd  ×  realTotalSupply(from chain)
//
//  Total supply is ALWAYS real (read from the Arc RPC). The USD price has no
//  reliable public browser API for this token yet (RadarDEX's API is
//  Cloudflare-gated), so:
//    • If siteConfig.dataSources.priceApi is set -> we use it  -> source:"live"
//    • Otherwise we fall back to siteConfig.demoMarketCap       -> source:"demo"
//
//  The UI shows a LIVE / DEMO badge based on `source`, so placeholder data is
//  never presented as real. To go live, either fill in priceApi or edit
//  fetchPriceUsd() below to read your DEX pool.
// ---------------------------------------------------------------------------
import { siteConfig } from "../config";
import { getTokenInfo } from "./chain";

async function fetchPriceUsd() {
  const url = siteConfig.dataSources.priceApi;
  if (!url) return null;
  try {
    const res = await fetch(url);
    const json = await res.json();
    // Accepts { priceUsd } or { price } — tweak to match your feed.
    const p = Number(json.priceUsd ?? json.price);
    return isFinite(p) && p > 0 ? p : null;
  } catch {
    return null;
  }
}

// Returns { marketCap, price, totalSupply, source: "live" | "demo" }
export async function getMarketCap() {
  const info = await getTokenInfo().catch(() => null);
  const totalSupply = info?.totalSupply ?? null;

  const price = await fetchPriceUsd();
  if (price != null && totalSupply != null) {
    return { marketCap: price * totalSupply, price, totalSupply, source: "live" };
  }

  // Honest fallback — clearly flagged as demo.
  return {
    marketCap: siteConfig.demoMarketCap,
    price: totalSupply ? siteConfig.demoMarketCap / totalSupply : null,
    totalSupply,
    source: "demo",
  };
}
