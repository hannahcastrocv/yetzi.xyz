import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import { getMarketCap } from "../lib/market";
import { formatUsd } from "../lib/format";
import MountainChart from "../components/MountainChart";

export default function Mountain() {
  const [mc, setMc] = useState(null);      // { marketCap, source, ... }
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const res = await getMarketCap();
    setMc(res);
    setLoading(false);
  };

  useEffect(() => {
    document.body.classList.add("page-scroll");
    return () => document.body.classList.remove("page-scroll");
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 60000); // marker moves automatically as data updates
    return () => clearInterval(t);
  }, []);

  const marketCap = mc?.marketCap ?? siteConfig.demoMarketCap;
  const source = mc?.source ?? "demo";

  return (
    <div className="mountain">
      <header className="mountain__head">
        <h1 className="mountain__title">THE MOUNTAIN</h1>
        <p className="mountain__sub">YETZI climbs higher as the market cap grows.</p>

        <div className="mountain__now">
          <span className="mountain__nowLabel">CURRENT MARKET CAP</span>
          <span className="mountain__nowValue">
            {loading ? "…" : formatUsd(marketCap)}
          </span>
          <span className={"mountain__badge " + source}>
            {source === "live" ? "● LIVE" : "◐ DEMO DATA"}
          </span>
        </div>
      </header>

      <MountainChart marketCap={marketCap} source={source} />

      <p className="mountain__note">
        {source === "live"
          ? "Live data. Total supply is read on-chain from Arc; price from the configured feed."
          : "Total supply is read live on-chain. USD price has no public browser feed yet, so market cap shown is DEMO placeholder — set a price source in config to go live."}
      </p>

      <a className="mountain__source" href={siteConfig.dataSources.radarDex} target="_blank" rel="noopener noreferrer">
        Trade $YETZI on RadarDEX ↗
      </a>
    </div>
  );
}
