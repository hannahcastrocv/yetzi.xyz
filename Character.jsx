import { artwork, siteConfig } from "../config";

export default function Character() {
  const c = artwork.character;
  return (
    <div
      className="layer layer--character"
      style={{ "--char-left": c.left, "--char-top": c.top, "--char-width": c.width }}
    >
      <img src={c.src} alt={`${siteConfig.brandName} floating in the hot spring`} />
    </div>
  );
}
