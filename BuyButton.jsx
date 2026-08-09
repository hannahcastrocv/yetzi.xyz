import { siteConfig } from "../config";
import { CartIcon } from "./Icons";

export default function BuyButton() {
  return (
    <a
      className="buy"
      href={siteConfig.links.buy}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CartIcon /> BUY {siteConfig.brandName}
    </a>
  );
}
