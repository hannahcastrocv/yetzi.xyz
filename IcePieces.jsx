import { artwork } from "../config";

export default function IcePieces() {
  return (
    <>
      {artwork.ice.map((piece, i) => (
        <div key={i} className={`layer layer--ice ${piece.className}`}>
          <img src={piece.src} alt="" aria-hidden="true" />
        </div>
      ))}
    </>
  );
}
