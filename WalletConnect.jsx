import { useState } from "react";
import { connectWallet, hasWallet } from "../lib/wallet";
import { isAddress } from "../lib/format";

export default function WalletConnect({ onAddress, busy }) {
  const [error, setError] = useState("");
  const [manual, setManual] = useState(false);
  const [value, setValue] = useState("");

  const connect = async () => {
    setError("");
    try {
      const addr = await connectWallet();
      onAddress(addr);
    } catch (e) {
      if (e.code === "NO_WALLET") {
        setManual(true);
        setError("No wallet detected. Paste a wallet address to look it up instead.");
      } else {
        setError("Connection cancelled.");
      }
    }
  };

  const submitManual = () => {
    const v = value.trim();
    if (!isAddress(v)) { setError("That doesn't look like a 0x wallet address."); return; }
    setError("");
    onAddress(v);
  };

  return (
    <div className="wc">
      <div className="wc__actions">
        <button className="wc__btn" onClick={connect} disabled={busy}>
          {busy ? "Reading the ice…" : "❄  Connect Wallet"}
        </button>
        {!manual && (
          <button className="wc__ghost" onClick={() => setManual(true)}>
            or look up an address
          </button>
        )}
      </div>

      {manual && (
        <div className="wc__manual">
          <input
            className="wc__input"
            placeholder="0x… wallet address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitManual()}
            spellCheck="false"
            autoComplete="off"
          />
          <button className="wc__btn wc__btn--sm" onClick={submitManual} disabled={busy}>
            Look up
          </button>
        </div>
      )}

      {error && <p className="wc__error">{error}</p>}
      {!hasWallet() && !manual && (
        <p className="wc__hint">Tip: open in a wallet browser (MetaMask/Rabby) to connect directly.</p>
      )}
    </div>
  );
}
