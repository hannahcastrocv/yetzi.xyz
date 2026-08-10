import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "../config";
import { formatUsd } from "../lib/format";
import MountainMilestone from "./MountainMilestone";

const W = 1000;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Monotonic climbing ridge (always rising left→right) so higher MC = higher up.
function buildRidge(H) {
  const base = H - 46;
  return [
    [140, base],
    [286, H - 150],
    [430, H - 250],
    [560, H - 338],
    [686, H - 430],
    [800, H - 512],
    [884, 92], // summit
  ];
}

// Sample a point at arc-length fraction f (0..1) along the polyline.
function sampler(points) {
  const segs = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    segs.push({ x0, y0, x1, y1, len, acc: total });
    total += len;
  }
  return (f) => {
    const target = clamp(f, 0, 1) * total;
    for (const s of segs) {
      if (target <= s.acc + s.len || s === segs[segs.length - 1]) {
        const t = s.len ? (target - s.acc) / s.len : 0;
        return { x: s.x0 + (s.x1 - s.x0) * t, y: s.y0 + (s.y1 - s.y0) * t };
      }
    }
    const last = points[points.length - 1];
    return { x: last[0], y: last[1] };
  };
}

export default function MountainChart({ marketCap, source }) {
  const milestones = siteConfig.mountainMilestones;
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
  );
  const [active, setActive] = useState(null); // index | "current" | null
  const wrapRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setNarrow(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // Dismiss tooltip when tapping empty space (mobile).
  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setActive(null);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  const H = narrow ? 760 : 560;
  const ridge = useMemo(() => buildRidge(H), [H]);
  const sample = useMemo(() => sampler(ridge), [ridge]);

  // Responsive sizes (viewBox units). Bigger on mobile so labels stay legible
  // once the 1000-wide viewBox is scaled down to a phone screen.
  const sz = narrow
    ? { mc: 30, name: 23, ring: 12, ringW: 3.5, dot: 6, halo: 5, lead: 20, hit: 30 }
    : { mc: 15, name: 12, ring: 9, ringW: 2.5, dot: 4.5, halo: 3.2, lead: 14, hit: 22 };
  const you = narrow
    ? { halo: 40, disc: 27, img: 48, flagW: 168, flagH: 40, flagY: -52, flagFont: 20 }
    : { halo: 26, disc: 17, img: 36, flagW: 104, flagH: 24, flagY: -34, flagFont: 11 };

  const logMin = Math.log10(milestones[0].mc);
  const logMax = Math.log10(milestones[milestones.length - 1].mc);
  const fracOf = (mc) => clamp((Math.log10(Math.max(mc, 1)) - logMin) / (logMax - logMin), 0, 1);

  const msPositions = milestones.map((m) => sample(fracOf(m.mc)));
  const nowFrac = fracOf(marketCap);
  const nowPos = sample(nowFrac);

  // Mountain body path (ridge down to baseline).
  const bodyPath =
    `M ${ridge[0][0]} ${H} ` +
    ridge.map((p) => `L ${p[0]} ${p[1]}`).join(" ") +
    ` L ${ridge[ridge.length - 1][0]} ${H} Z`;
  const ridgeLine = "M " + ridge.map((p) => `${p[0]} ${p[1]}`).join(" L ");

  // The "climbed" portion of the ridge up to YETZI's current position (glowing trail).
  const trailPts = [];
  for (let i = 0; i <= 40; i++) trailPts.push(sample((nowFrac * i) / 40));
  const trailLine = "M " + trailPts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");

  const activeMs = typeof active === "number" ? milestones[active] : null;
  const activePos = typeof active === "number" ? msPositions[active] : null;

  const pct = (v, dim) => (dim === "x" ? (v / W) * 100 : (v / H) * 100);

  return (
    <div className="mchart" ref={wrapRef}>
      <svg
        className="mchart__svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="YETZI market-cap mountain"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b2b57" />
            <stop offset="0.55" stopColor="#12447f" />
            <stop offset="1" stopColor="#2f78c4" />
          </linearGradient>
          <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#dcefff" />
            <stop offset="1" stopColor="#7fb8ee" />
          </linearGradient>
          <linearGradient id="back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bcd9f6" />
            <stop offset="1" stopColor="#6a9fd6" />
          </linearGradient>
          <linearGradient id="trail" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7ae0ff" />
            <stop offset="1" stopColor="#ffe27a" />
          </linearGradient>
          <radialGradient id="peakGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffe27a" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffe27a" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* sky */}
        <rect x="0" y="0" width={W} height={H} fill="url(#sky)" />
        {/* stars / snow dust */}
        {Array.from({ length: 26 }).map((_, i) => {
          const x = (i * 137.5) % W;
          const y = (i * 71.3) % (H * 0.55);
          return <circle key={i} className="mchart__dust" cx={x} cy={y} r={i % 4 === 0 ? 1.7 : 1} />;
        })}

        {/* back mountains for depth */}
        <path d={`M 0 ${H} L 210 ${H - 230} L 380 ${H - 120} L 560 ${H - 300} L 720 ${H - 150} L 1000 ${H - 340} L 1000 ${H} Z`}
              fill="url(#back)" opacity="0.5" />

        {/* fog band */}
        <ellipse className="mchart__fog" cx={W * 0.5} cy={H - 130} rx={W * 0.62} ry="46" filter="url(#soft)" />

        {/* peak glow */}
        <circle cx={ridge[ridge.length - 1][0]} cy={ridge[ridge.length - 1][1]} r="120" fill="url(#peakGlow)" />

        {/* main mountain */}
        <path d={bodyPath} fill="url(#snow)" stroke="#123a6e" strokeWidth="3" strokeLinejoin="round" />
        {/* ice shading strata */}
        <path d={ridgeLine} fill="none" stroke="#bfe0ff" strokeWidth="6" strokeLinecap="round" opacity="0.5" />

        {/* climbed trail (glows up to YETZI) */}
        <path d={trailLine} fill="none" stroke="url(#trail)" strokeWidth="5" strokeLinecap="round"
              className="mchart__trail" />

        {/* milestones */}
        {milestones.map((m, i) => (
          <MountainMilestone
            key={m.mc}
            m={m}
            pos={msPositions[i]}
            reached={marketCap >= m.mc}
            active={active === i}
            side={i >= milestones.length - 2 ? "L" : "R"}
            sz={sz}
            onActivate={() => setActive(i)}
          />
        ))}

        {/* current YETZI position */}
        <g className="you" transform={`translate(${nowPos.x}, ${nowPos.y})`}
           onMouseEnter={() => setActive("current")} onClick={() => setActive("current")}
           tabIndex={0} role="button" aria-label="YETZI is here">
          <circle className="you__halo" r={you.halo} />
          <circle className="you__disc" r={you.disc} />
          <clipPath id="youClip"><circle r={you.disc - 2} /></clipPath>
          <image href={siteConfig.proofArtwork} x={-you.img / 2} y={-you.img / 2} width={you.img} height={you.img} clipPath="url(#youClip)" />
          <g className="you__flag" transform={`translate(0,${you.flagY})`}>
            <rect x={-you.flagW / 2} y={-you.flagH / 2} width={you.flagW} height={you.flagH} rx={you.flagH / 2} />
            <text x="0" y={you.flagFont * 0.12} textAnchor="middle" style={{ fontSize: you.flagFont }}>YETZI IS HERE</text>
          </g>
        </g>
      </svg>

      {/* Tooltip (HTML overlay so it scales cleanly) */}
      {activeMs && activePos && (
        <div
          className="mtip"
          style={{
            left: `${pct(activePos.x, "x")}%`,
            top: `${pct(activePos.y, "y")}%`,
          }}
        >
          <div className="mtip__name">{activeMs.name}</div>
          <div className="mtip__mc">{formatUsd(activeMs.mc)}</div>
          <div className="mtip__blurb">{activeMs.blurb}</div>
          <div className={"mtip__tag " + (marketCap >= activeMs.mc ? "reached" : "locked")}>
            {marketCap >= activeMs.mc ? "✔ REACHED" : "LOCKED"}
          </div>
        </div>
      )}
      {active === "current" && (
        <div
          className="mtip mtip--you"
          style={{ left: `${pct(nowPos.x, "x")}%`, top: `${pct(nowPos.y, "y")}%` }}
        >
          <div className="mtip__name">YETZI is here</div>
          <div className="mtip__mc">{formatUsd(marketCap)}</div>
          <div className="mtip__blurb">
            {source === "live" ? "Live market cap" : "Demo market cap"}
          </div>
        </div>
      )}
    </div>
  );
}
