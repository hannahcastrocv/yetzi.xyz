import { siteConfig } from "../config";

export default function SpeechBubble() {
  return (
    <div className="bubble" role="text">
      {siteConfig.slogan}
    </div>
  );
}
