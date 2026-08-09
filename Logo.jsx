import { siteConfig } from "../config";

export default function Logo() {
  return (
    <h1 className="logo" aria-label={siteConfig.brandName}>
      {siteConfig.brandName}
    </h1>
  );
}
