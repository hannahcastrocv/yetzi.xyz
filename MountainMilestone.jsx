import { formatUsd } from "../lib/format";

// A single milestone marker on the ridge. Label pill sits on `side` ("L"/"R").
// `sz` carries responsive sizes so labels stay legible when the SVG scales down.
export default function MountainMilestone({ m, pos, reached, active, side, sz, onActivate }) {
  const gap = sz.lead;
  const anchor = side === "L" ? "end" : "start";
  const labelX = pos.x + (side === "L" ? -gap : gap);
  const textX = labelX + (side === "L" ? -6 : 6);

  return (
    <g
      className={"ms" + (reached ? " is-reached" : "") + (active ? " is-active" : "")}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      tabIndex={0}
      role="button"
      aria-label={`${m.name}, ${formatUsd(m.mc)}`}
    >
      <line className="ms__leader" x1={pos.x} y1={pos.y} x2={labelX} y2={pos.y} />
      <circle className="ms__ring" cx={pos.x} cy={pos.y} r={sz.ring} strokeWidth={sz.ringW} />
      <circle className="ms__dot" cx={pos.x} cy={pos.y} r={sz.dot} />
      <text className="ms__mc" style={{ fontSize: sz.mc, strokeWidth: sz.halo }} x={textX} y={pos.y - sz.mc * 0.28} textAnchor={anchor}>
        {formatUsd(m.mc)}
      </text>
      <text className="ms__name" style={{ fontSize: sz.name, strokeWidth: sz.halo }} x={textX} y={pos.y + sz.name * 1.05} textAnchor={anchor}>
        {m.name}
      </text>
      <circle className="ms__hit" cx={pos.x} cy={pos.y} r={sz.hit} />
    </g>
  );
}
