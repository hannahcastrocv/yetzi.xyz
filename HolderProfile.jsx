import { shortAddr, formatTokens } from "../lib/format";
import { siteConfig } from "../config";

// Renders only data points that were actually retrieved. Anything unknown
// (e.g. rank when no rank API is configured) is simply omitted — never faked.
export default function HolderProfile({ data }) {
  if (!data) return null;
  const { address, balance, supplyShare, rank } = data;
  const isHolder = balance > 0;

  return (
    <div className="profile">
      <div className="profile__status" data-holder={isHolder}>
        <span className="profile__dot" />
        {isHolder ? "YETZI HOLDER" : "NOT HOLDING YET"}
      </div>

      <dl className="profile__grid">
        <div className="profile__row">
          <dt>Wallet</dt>
          <dd className="mono">{shortAddr(address)}</dd>
        </div>

        <div className="profile__row">
          <dt>YETZI Held</dt>
          <dd>{formatTokens(balance)} <span className="unit">YETZI</span></dd>
        </div>

        {supplyShare > 0 && (
          <div className="profile__row">
            <dt>Share of Supply</dt>
            <dd>{(supplyShare * 100).toFixed(supplyShare < 0.0001 ? 5 : supplyShare < 0.01 ? 4 : 2)}%</dd>
          </div>
        )}

        {rank != null && (
          <div className="profile__row">
            <dt>Holder Rank</dt>
            <dd>#{rank}</dd>
          </div>
        )}
      </dl>

      {!isHolder && (
        <a className="profile__cta" href={siteConfig.links.buy} target="_blank" rel="noopener noreferrer">
          Grab some $YETZI to enter the Cave →
        </a>
      )}
    </div>
  );
}
