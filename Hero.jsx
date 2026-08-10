import { artwork, siteConfig } from "../config";
import Logo from "./Logo";
import SpeechBubble from "./SpeechBubble";
import Character from "./Character";
import IcePieces from "./IcePieces";
import Petals from "./Petals";
import ContractAddress from "./ContractAddress";
import BuyButton from "./BuyButton";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  return (
    <main className="app" style={{ "--ar": artwork.aspectRatio }}>
      {/* ---- Living artwork ---- */}
      <div className="scene">
        <img className="scene__bg" src={artwork.background} alt="" aria-hidden="true" />
        <IcePieces />
        <Character />
        <Petals />
      </div>

      {/* legibility veils (static) */}
      <div className="veil veil--top" />
      <div className="veil veil--bottom" />

      {/* ---- UI overlay ---- */}
      <div className="ui">
        <div className="ui__top">
          <Logo />
          <SpeechBubble />
        </div>

        <div className="panel">
          <div className="name">
            <span className="tick">{siteConfig.ticker}</span>
          </div>
          <p className="tagline">{siteConfig.tagline}</p>
          <ContractAddress />
          <BuyButton />
          <SocialLinks />
        </div>
      </div>
    </main>
  );
}
