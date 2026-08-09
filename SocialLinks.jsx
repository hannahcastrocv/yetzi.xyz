import { siteConfig } from "../config";
import { XIcon, TelegramIcon } from "./Icons";

const SOCIALS = [
  { key: "x",         label: "X (Twitter)", Icon: XIcon },
  { key: "telegram",  label: "Telegram",    Icon: TelegramIcon },
];

export default function SocialLinks() {
  return (
    <nav className="socials" aria-label="YETZI social links">
      {SOCIALS.map(({ key, label, Icon }) => (
        <a
          key={key}
          className="social"
          href={siteConfig.links[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
}
