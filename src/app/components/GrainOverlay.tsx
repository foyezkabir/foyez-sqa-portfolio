/**
 * Film grain.
 *
 * A flat dark background reads as cheap because it is mathematically flat.
 * A few percent of neutral noise gives the panels a surface to sit on. The
 * feColorMatrix desaturates the turbulence, which is colored by default, and
 * stitchTiles keeps the pattern seamless when it repeats.
 *
 * Pure CSS: no JS, no animation, no repaint cost.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.045] ${className}`}
      style={{ backgroundImage: NOISE, backgroundSize: "160px 160px" }}
    />
  );
}
