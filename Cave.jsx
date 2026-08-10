import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import { getBalance } from "../lib/chain";
import { onAccountsChanged } from "../lib/wallet";
import WalletConnect from "../components/WalletConnect";
import HolderProfile from "../components/HolderProfile";
import ProofOfYeti from "../components/ProofOfYeti";

async function fetchRank(address) {
  const url = siteConfig.dataSources.holderRankApi;
  if (!url) return null;
  try {
    const res = await fetch(url.replace("{address}", address));
    const json = await res.json();
    const r = Number(json.rank);
    return isFinite(r) ? r : null;
  } catch {
    return null;
  }
}

export default function Cave() {
  const [address, setAddress] = useState(null);
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    document.body.classList.add("page-scroll");
    return () => document.body.classList.remove("page-scroll");
  }, []);
  useEffect(() => onAccountsChanged((a) => { if (a) load(a); else reset(); }), []);

  const reset = () => { setAddress(null); setData(null); setErr(""); };

  const load = async (addr) => {
    setBusy(true); setErr(""); setAddress(addr);
    try {
      const [chain, rank] = await Promise.all([getBalance(addr), fetchRank(addr)]);
      setData({ ...chain, address: addr, rank });
    } catch (e) {
      setErr("Couldn't reach the Arc network from here. In-app previews block outside calls — this works on your live site or if you open the file directly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cave">
      {/* backdrop */}
      <div className="cave__bg" aria-hidden="true">
        <div className="cave__glow cave__glow--1" />
        <div className="cave__glow cave__glow--2" />
        <div className="cave__crystals" />
        <div className="cave__particles">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} style={{
              left: `${(i * 4.5 + (i % 3) * 3) % 100}%`,
              animationDuration: `${9 + (i % 7)}s`,
              animationDelay: `${-(i % 11)}s`,
              opacity: 0.25 + (i % 5) * 0.12,
            }} />
          ))}
        </div>
        <div className="cave__vignette" />
      </div>

      <div className="cave__inner">
        <header className="cave__head">
          <h1 className="cave__title">THE CAVE</h1>
          <p className="cave__steps">
            <span>HOLD YETZI</span><i>→</i><span>ENTER THE CAVE</span><i>→</i><span>GET YOUR PROOF OF YETI</span>
          </p>
          <p className="cave__sub">The exclusive den for verified $YETZI holders.</p>
        </header>

        {!data && (
          <div className="cave__gate">
            <div className="cave__gateArt">
              <img src={siteConfig.proofArtwork} alt="YETZI" />
            </div>
            <p className="cave__gateText">Connect your wallet to reveal your Proof of Yeti.</p>
            <WalletConnect onAddress={load} busy={busy} />
            {err && <p className="cave__err">{err}</p>}
          </div>
        )}

        {data && (
          <div className="cave__result">
            <HolderProfile data={data} />
            <ProofOfYeti data={data} />
            <button className="cave__switch" onClick={reset}>← use another wallet</button>
          </div>
        )}

        <a className="cave__source" href={siteConfig.dataSources.arcscan} target="_blank" rel="noopener noreferrer">
          Balances read live from the Arc chain · view on ArcScan ↗
        </a>
      </div>
    </div>
  );
}
