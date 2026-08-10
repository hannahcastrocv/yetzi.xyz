import { siteConfig } from "../config";
import { shortAddr, formatTokens } from "../lib/format";

export default function ProofOfYeti({ data }) {
  if (!data || !(data.balance > 0)) return null;
  const { address, balance, supplyShare, rank } = data;

  const share = () => {
    const text =
      `I'm a verified $YETZI holder ❄️\n` +
      `Holding ${formatTokens(balance)} YETZI on Arc.\n` +
      `Proof of Yeti secured. ${siteConfig.slogan}`;
    const url =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(text) +
      "&url=" +
      encodeURIComponent(siteConfig.links.x);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="proof-wrap">
      <div className="proof" id="proof-card">
        <div className="proof__glow" aria-hidden="true" />
        <div className="proof__header">
          <span className="proof__brand">{siteConfig.ticker}</span>
          <span className="proof__chain">ARC</span>
        </div>

        <div className="proof__art">
          <img src={siteConfig.proofArtwork} alt="YETZI" draggable="false" />
        </div>

        <div className="proof__title">PROOF OF YETI</div>
        <div className="proof__status">✔ VERIFIED HOLDER</div>

        <div className="proof__stats">
          <div className="proof__stat">
            <span className="k">Holds</span>
            <span className="v">{formatTokens(balance)} <em>YETZI</em></span>
          </div>
          {rank != null && (
            <div className="proof__stat">
              <span className="k">Rank</span>
              <span className="v">#{rank}</span>
            </div>
          )}
          {rank == null && supplyShare > 0 && (
            <div className="proof__stat">
              <span className="k">Supply</span>
              <span className="v">{(supplyShare * 100).toFixed(supplyShare < 0.01 ? 3 : 2)}%</span>
            </div>
          )}
        </div>

        <div className="proof__addr mono">{shortAddr(address)}</div>
        <div className="proof__foot">{siteConfig.slogan}</div>
      </div>

      <button className="proof__share" onClick={share}>
        𝕏  SHARE MY PROOF
      </button>
      <p className="proof__hint">Screenshot the card to post the visual too.</p>
    </div>
  );
}
