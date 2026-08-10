// Wallet connection via any injected EIP-1193 provider (MetaMask, Rabby, etc.).
// We only need the address here; balances are read from the Arc RPC in chain.js,
// so the user's wallet does NOT need to be on the Arc network to see their YETZI.

export function hasWallet() {
  return typeof window !== "undefined" && !!window.ethereum;
}

export async function connectWallet() {
  if (!hasWallet()) {
    const err = new Error("NO_WALLET");
    err.code = "NO_WALLET";
    throw err;
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts || !accounts.length) throw new Error("No accounts returned");
  return accounts[0];
}

export function onAccountsChanged(cb) {
  if (!hasWallet() || !window.ethereum.on) return () => {};
  const handler = (accs) => cb(accs && accs[0] ? accs[0] : null);
  window.ethereum.on("accountsChanged", handler);
  return () => window.ethereum.removeListener?.("accountsChanged", handler);
}
