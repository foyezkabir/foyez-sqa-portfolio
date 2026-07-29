import { useEffect, useRef, useState, type ReactNode } from "react";

/** Peak rotation in degrees. Past about 8 the panel starts to look warped. */
const MAX_TILT = 6;
/** Lerp factor per frame. Lower is heavier and smoother. */
const EASE = 0.12;

/**
 * Mouse-tracked 3D tilt with a specular highlight that slides across the glass,
 * which is what makes a panel feel like a physical object rather than a
 * rectangle.
 *
 * Written against rAF and direct style writes rather than an animation library
 * on purpose: pulling in framer-motion for this one effect cost 44kB gzipped on
 * a hero that is the LCP element. Nothing here re-renders React, and the loop
 * parks itself once the panel has settled and the pointer has left.
 *
 * Deliberately inert unless the viewport is >= 1024px AND the visitor has not
 * asked for reduced motion. Combining a transform with the panel's
 * backdrop-blur is expensive on mobile GPUs, and on touch there is no hover to
 * track in the first place, so below that width this renders children untouched
 * and attaches no listeners at all.
 */
export function TiltCard({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(wide.matches && !still.matches);

    sync();
    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Normalised pointer position across the card: 0 to 1 on each axis.
    const cur = { x: 0.5, y: 0.5 };
    const tgt = { x: 0.5, y: 0.5 };
    let raf = 0;
    let running = false;
    let hovering = false;

    const tick = () => {
      cur.x += (tgt.x - cur.x) * EASE;
      cur.y += (tgt.y - cur.y) * EASE;

      if (cardRef.current) {
        const ry = (cur.x - 0.5) * 2 * MAX_TILT;
        const rx = (0.5 - cur.y) * 2 * MAX_TILT;
        cardRef.current.style.transform = `perspective(1200px) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      }
      if (glareRef.current) {
        const gx = (cur.x * 100).toFixed(1);
        const gy = (cur.y * 100).toFixed(1);
        glareRef.current.style.background = `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.07), transparent 45%)`;
      }

      // Park the loop once it has caught up and the pointer is gone.
      const settled =
        Math.abs(tgt.x - cur.x) < 0.0005 && Math.abs(tgt.y - cur.y) < 0.0005;
      if (settled && !hovering) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tgt.x = (e.clientX - r.left) / r.width;
      tgt.y = (e.clientY - r.top) / r.height;
      hovering = true;
      start();
    };

    const onLeave = () => {
      hovering = false;
      tgt.x = 0.5;
      tgt.y = 0.5;
      start();
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <div ref={wrapRef}>
      <div ref={cardRef} className="relative will-change-transform">
        {children}
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        />
      </div>
    </div>
  );
}
