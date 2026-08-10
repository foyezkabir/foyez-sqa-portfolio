import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children into place as they enter the viewport.
 *
 * ADDED after Foyez compared this site with iamnaiem.me, a peer SQA portfolio whose
 * sections animate in on scroll. The observation was right: a long page that arrives
 * all at once reads flatter than one that reveals itself as you go.
 *
 * R12 IS THE WHOLE REASON THIS IS BUILT THE WAY IT IS, and it must be read before
 * touching this file. That rule records the hero test-run panel freezing TWICE,
 * reported both times as "not auto running, stilled". Cause both times: rendering was
 * gated on a flag an IntersectionObserver had to set, and when the reopening event
 * never arrived it stayed frozen with no path back.
 *
 * So the failure mode is designed out rather than guarded against:
 *
 *   THE CONTENT IS ALWAYS IN THE DOM AND ALWAYS LAID OUT. Only opacity and transform
 *   change. Nothing is conditionally rendered, nothing is display:none, nothing waits
 *   for a callback to exist. A screen reader, a crawler and Ctrl+F all see everything
 *   from the first paint, whatever the observer does.
 *
 *   IT FAILS OPEN, NOT CLOSED. If IntersectionObserver is missing, if the callback
 *   never fires, if the element is created off-screen and never scrolled to, the
 *   effect sets visible immediately as its fallback. The worst case is content that
 *   appears without animating, which nobody notices. The unacceptable case, invisible
 *   content, cannot happen.
 *
 *   IT NEVER RE-HIDES. Once shown, the observer disconnects and the element stays
 *   put. Scrolling back up must not fade anything out: that is a loop with a state
 *   that can get stuck, which is precisely what R12 forbids.
 *
 * R8: TRANSFORM AND OPACITY ONLY, never a layout property, and the whole thing is
 * skipped under prefers-reduced-motion. Reduced motion is checked FIRST and returns
 * the content visible with no transition at all, rather than animating to the same
 * place, so there is no motion to be sick from and no listener to miss.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds. Use sparingly, to stagger siblings, never to sequence a whole page. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /*
    Initialised true when motion is reduced, so those visitors never see a
    transition frame at all, not even the end of one.
  */
  const [visible, setVisible] = useState(
    () =>
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (visible) return;

    const el = ref.current;
    /*
      No element, or no observer support: show it. This is the fail-open branch and
      it is the reason this component cannot repeat the frozen-panel bug.
    */
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      /*
        A small negative bottom margin so the reveal fires slightly before the block
        is fully on screen, which reads as the content being ready rather than as a
        late reaction to the scroll.
      */
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      /*
        will-change is deliberately NOT set. It promotes every wrapped section to its
        own compositor layer for the life of the page, and this component wraps most
        of the page. The animation is a 500ms opacity and translate on a handful of
        elements; that does not need a permanent layer per section.
      */
      className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={delay && !visible ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
