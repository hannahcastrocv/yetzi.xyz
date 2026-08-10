// ---------------------------------------------------------------------------
//  Minimal, dependency-free reads from the Arc JSON-RPC.
//  Everything here is REAL on-chain data. No fabricated numbers.
//
//  Two read paths, tried in order, so it works in as many environments as
//  possible:
//    1) direct fetch to the RPC endpoint(s)  (works on any normal host — the
//       Arc RPC sends `access-control-allow-origin: *`)
//    2) the connected wallet's own provider  (bypasses our fetch entirely when
//       a page/sandbox blocks outbound calls to the RPC domain)
// ---------------------------------------------------------------------------
import { siteConfig } from "../config";

const RPCS =
  (siteConfig.chain.rpcUrls && siteConfig.chain.rpcUrls.length
    ? siteConfig.chain.rpcUrls
    : [siteConfig.chain.rpcUrl]).filter(Boolean);
const TOKEN = siteConfig.contractAddress;
const CHAIN_ID = siteConfig.chain.chainIdHex;

let _id = 1;

// Path 1: direct fetch, with failover across endpoints.
async function rpcFetch(method, params) {
  let lastErr;
  for (const url of RPCS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: _id++, method, params }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      if (json.error) throw new Error(json.error.message || "RPC error");
      return json.result;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("All RPC endpoints failed");
}

// Path 2: the injected wallet's provider (no CORS / domain restriction on us).
async function rpcViaWallet(method, params) {
  const eth = typeof window !== "undefined" && window.ethereum;
  if (!eth) throw new Error("no wallet");
  // eth_call must target the Arc chain to return correct data.
  try {
    const cur = await eth.request({ method: "eth_chainId" });
    if (cur !== CHAIN_ID) {
      try {
        await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: CHAIN_ID }] });
      } catch (sw) {
        if (sw && sw.code === 4902) {
          await eth.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: CHAIN_ID,
              chainName: siteConfig.chain.name,
              rpcUrls: RPCS,
              nativeCurrency: siteConfig.chain.nativeCurrency,
            }],
          });
        }
        // if the user declines the switch we still attempt the call
      }
    }
  } catch { /* ignore and attempt the call */ }
  return eth.request({ method, params });
}

async function rpc(method, params) {
  try {
    return await rpcFetch(method, params);
  } catch (e) {
    try {
      return await rpcViaWallet(method, params);
    } catch {
      throw e; // surface the original fetch error
    }
  }
}

const pad32 = (hexNo0x) => hexNo0x.replace(/^0x/, "").padStart(64, "0");
const hexToBig = (h) => BigInt(h && h !== "0x" ? h : "0x0");
const toUnits = (big, decimals) => Number(big) / 10 ** decimals;

const ethCall = (data) => rpc("eth_call", [{ to: TOKEN, data }, "latest"]);

// Cache immutable token metadata for the session.
let _tokenInfo = null;

export async function getTokenInfo() {
  if (_tokenInfo) return _tokenInfo;
  const [decHex, supHex] = await Promise.all([
    ethCall("0x313ce567"), // decimals()
    ethCall("0x18160ddd"), // totalSupply()
  ]);
  const decimals = Number(hexToBig(decHex));
  const totalSupply = toUnits(hexToBig(supHex), decimals);
  _tokenInfo = { decimals, totalSupply, symbol: siteConfig.brandName, contractAddress: TOKEN };
  return _tokenInfo;
}

// Real ERC-20 balance for any address (balanceOf(address)).
export async function getBalance(address) {
  const info = await getTokenInfo();
  const balHex = await ethCall("0x70a08231" + pad32(address.toLowerCase()));
  const balance = toUnits(hexToBig(balHex), info.decimals);
  const supplyShare = info.totalSupply ? balance / info.totalSupply : 0;
  return { balance, supplyShare, ...info };
}
