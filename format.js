// Small formatting helpers shared by The Cave and The Mountain.

export const shortAddr = (a) =>
  a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "";

// 1234567.89 -> "1,234,567"  (compact optional)
export function formatTokens(n) {
  if (n == null || isNaN(n)) return "—";
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
  if (n >= 1e3) return Math.round(n).toLocaleString("en-US");
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

// USD market-cap: "$62,000" / "$1.2M"
export function formatUsd(n) {
  if (n == null || isNaN(n)) return "—";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
  if (n >= 1e3) return "$" + Math.round(n).toLocaleString("en-US");
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export const isAddress = (a) => /^0x[a-fA-F0-9]{40}$/.test((a || "").trim());
