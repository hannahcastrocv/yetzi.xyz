import { useState } from "react";
import { siteConfig } from "../config";
import { CopyIcon, CheckIcon } from "./Icons";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const addr = siteConfig.contractAddress;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(addr);
    } catch {
      // Fallback for browsers without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = addr;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="contract">
      <span className="contract__label">CA</span>
      <span className="contract__addr" title={addr}>{addr}</span>
      <button
        className={`copy-btn ${copied ? "copied" : ""}`}
        onClick={copy}
        aria-label={copied ? "Contract address copied" : "Copy contract address"}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="tip">Copied!</span>
      </button>
    </div>
  );
}
