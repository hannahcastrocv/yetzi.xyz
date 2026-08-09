// Ambient sakura petals drifting from the cherry branch.
// Purely decorative; hidden automatically when reduced motion is on.

const PETALS = Array.from({ length: 9 }).map((_, i) => ({
  left: 55 + Math.random() * 44,          // start on the right half (near the branch)
  duration: 9 + Math.random() * 7,
  delay: -Math.random() * 12,
  scale: 0.7 + Math.random() * 0.8,
  sway: 6 + Math.random() * 12,
}));

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--scale": p.scale,
            "--sway": `${p.sway}vw`,
          }}
        />
      ))}
    </div>
  );
}
