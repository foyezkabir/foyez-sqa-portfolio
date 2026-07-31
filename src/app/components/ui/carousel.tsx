"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";

/*
  CSS SCROLL-SNAP SLIDER. This replaces the embla-carousel implementation, and it
  is the fix for a real content-losing bug rather than a preference.

  WHAT WAS BROKEN. embla measured every slide on init and derived its scroll
  bounds from those numbers. Under this Vite setup the elements exist before the
  CSS that sizes them arrives, so the measurement could latch at or near zero and
  the bounds collapsed. Measured at 1280px, Certifications, five slides: the
  track advanced EIGHT pixels on the first Next click and then reported
  canScrollNext false, leaving the fifth certificate outside the 1152px viewport
  at x 1168 to 1438. Agents & Automation advanced one pitch and stopped one card
  short. It was INTERMITTENT, which is why an earlier pass wrongly retracted a
  correct bug report after a single clean run.

  A reInit-on-rAF / window-load / fonts.ready patch was tried and made it worse
  and consistent: zero pixels of travel at every width. Reverted.

  WHY THIS APPROACH RATHER THAN ANOTHER PATCH. The browser lays the track out and
  the browser owns the scroll range, so a card cannot be stranded by a stale
  measurement, because no slide is ever measured to decide where the track may
  go. That removes the class of bug instead of one instance of it. It also slides
  natively on touch and trackpad, which embla's drag emulation only approximated.

  Consumers are unchanged: same five exports, same class names, same
  negative-margin plus padding gutter. Certifications needed only its now
  meaningless `opts` prop removed.
*/

/*
  THE GUTTER LIVES ON THE SCROLLING ELEMENT, NOT ON THE FLEX TRACK, and that one
  detail is what makes snapping land flush. It is worth spelling out because
  moving it back would silently clip the last card by exactly the gutter width.

  The layout is the standard shadcn gutter trick: the row is pulled left by 24px
  and every item carries 24px of left padding, so the visible cards are separated
  by 24px while the first one still starts at the content edge.

  If that -24px sits on the flex track, the track begins 24px inside the
  scrolling element's own left edge, so scroll-snap-align:start aligns each
  item's PADDING box to the viewport and every snapped card ends up 24px right of
  where it should be. At 1280px that clipped 16px off the right-hand card.

  With the -24px on the scrolling element instead, the element's left edge and
  the first item's padding-box left edge are the same point, so a snapped card
  lands exactly on the content edge and the final snap position coincides with
  the end of the track. Verified at 1280px: snap positions 0 and 294, maximum
  scroll 294, so the fifth certificate reaches the right-hand edge exactly.
*/

/** Sub-pixel slack. Percentage-width tracks put both scroll edges on fractions. */
const EPSILON = 1.5;

type CarouselApi = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  /** The scrolling element itself, for anything the two helpers above do not cover. */
  node: () => HTMLDivElement | null;
};

type CarouselProps = {
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/** Read per click rather than cached, so an OS change mid-session is honoured. */
function scrollBehaviour(): ScrollBehavior {
  if (typeof window === "undefined" || !window.matchMedia) return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/**
 * Geometry of the scrolling element, read fresh on every use. Returns each
 * item's offset in scroll coordinates plus the furthest the track may travel.
 *
 * `limit` is the LAST ITEM'S far edge minus the visible size. Two other
 * plausible sources were tried first and both are wrong here:
 *
 *   el.scrollWidth is too big. The card sections put an absolutely positioned
 *   hover-glow layer at -inset-1 inside every card, and an absolute descendant
 *   does count toward an ancestor scroll container's scrollable overflow, so
 *   scrollWidth reports about 4px more than the track occupies. Measured 1474
 *   against a real 1470 at 1280px. Four pixels is enough to leave the Next arrow
 *   permanently enabled with nothing left to reveal, which is exactly the dead
 *   affordance this project has been removing everywhere else.
 *
 *   The track's own width is too small, and this one actually shipped broken for
 *   a moment. A flex container does not grow to contain flex items that refuse
 *   to shrink, so the track measures the same 1176px as the viewport it sits in
 *   while its five items overflow it. limit came out as zero and the Next arrow
 *   was born disabled: the exact symptom this rewrite exists to remove, caught
 *   by the harness rather than by looking at it.
 *
 * Item border boxes are the honest measure. getBoundingClientRect on an item
 * reports its own border box and ignores anything overflowing out of it, so the
 * glow is excluded without having to special-case it.
 */
function geometry(el: HTMLDivElement, isVertical: boolean) {
  const track = el.firstElementChild as HTMLElement | null;
  const items = Array.from(track?.children ?? []) as HTMLElement[];
  const containerRect = el.getBoundingClientRect();
  const position = isVertical ? el.scrollTop : el.scrollLeft;
  const visible = isVertical ? el.clientHeight : el.clientWidth;

  const boxes = items.map((item) => {
    const rect = item.getBoundingClientRect();
    return isVertical
      ? { start: rect.top - containerRect.top + position, size: rect.height }
      : { start: rect.left - containerRect.left + position, size: rect.width };
  });

  const content = boxes.length
    ? Math.max(...boxes.map((box) => box.start + box.size))
    : isVertical
      ? el.scrollHeight
      : el.scrollWidth;

  return {
    offsets: boxes.map((box) => box.start),
    position,
    limit: Math.max(0, content - visible),
  };
}

function Carousel({
  orientation = "horizontal",
  setApi,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const isVertical = orientation === "vertical";

  /*
    Both arrows are enabled straight off the live scroll position, which is the
    same source of truth the browser scrolls against. Deliberately NOT derived
    from a slide index: an index-based check is precisely what let the old
    component believe it had reached the end with 291px of track remaining.
  */
  const measure = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { position, limit } = geometry(el, isVertical);
    setCanScrollPrev(position > EPSILON);
    setCanScrollNext(position < limit - EPSILON);
  }, [isVertical]);

  /*
    One card per click. The target is read off the real DOM boxes rather than
    computed from an assumed pitch, because the card width changes at every
    breakpoint and getBoundingClientRect is true whatever the flex basis is.

    Clamping to `limit` is what guarantees the last card is reachable: the final
    item's own snap position sits past the maximum scroll offset, so scrolling to
    it verbatim would be a no-op. Clamped, the click lands on the end of the
    track, which is also where the last snap position resolves.
  */
  const step = React.useCallback(
    (direction: 1 | -1) => {
      const el = scrollRef.current;
      if (!el) return;

      const { offsets, position, limit } = geometry(el, isVertical);

      const target =
        direction > 0
          ? offsets.find((offset) => offset > position + EPSILON)
          : [...offsets].reverse().find((offset) => offset < position - EPSILON);

      const next = Math.max(
        0,
        Math.min(target ?? (direction > 0 ? limit : 0), limit),
      );

      el.scrollTo({
        [isVertical ? "top" : "left"]: next,
        behavior: scrollBehaviour(),
      });
    },
    [isVertical],
  );

  const scrollPrev = React.useCallback(() => step(-1), [step]);
  const scrollNext = React.useCallback(() => step(1), [step]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";
      const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    },
    [isVertical, scrollPrev, scrollNext],
  );

  /*
    Re-measure on scroll, on a container resize AND on a track resize.

    The track observer is the one that matters on first paint. The arrows render
    before the fonts and the card CSS settle, and a ResizeObserver fires when the
    real size arrives rather than at a guessed lifecycle moment. That is the
    piece the embla version needed and never had: its own theory of the bug was
    a stale first measurement, and it tried to solve it by re-measuring at rAF,
    window load and fonts.ready, none of which is the moment the layout changes.
  */
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    measure();
    el.addEventListener("scroll", measure, { passive: true });

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    const track = el.firstElementChild;
    if (track) observer.observe(track);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  React.useEffect(() => {
    if (!setApi) return;
    setApi({
      scrollPrev,
      scrollNext,
      canScrollPrev: () => canScrollPrev,
      canScrollNext: () => canScrollNext,
      node: () => scrollRef.current,
    });
  }, [setApi, scrollPrev, scrollNext, canScrollPrev, canScrollNext]);

  return (
    <CarouselContext.Provider
      value={{
        scrollRef,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { scrollRef, orientation } = useCarousel();
  const isVertical = orientation === "vertical";

  return (
    /*
      The scrolling element, and it carries the consumer's gutter class. See the
      long note at the top of this file for why the negative margin has to be
      here and not on the flex track below.

      tabIndex 0 because a scrollable region has to be reachable by keyboard:
      without it, a keyboard-only visitor could not move the track at all and the
      two arrow buttons would be the only way through. The wrapper above
      intercepts the arrow keys so a keypress advances a whole card instead of
      nudging by the browser's default scroll distance.

      no-scrollbar hides the native bar. The arrows are the visible affordance,
      and a persistent 15px horizontal bar on Windows would eat into the card
      height that R3 parity is measured against.

      overscroll-x contain stops a swipe that reaches the end of the track from
      turning into a browser back-navigation gesture.
    */
    <div
      ref={scrollRef}
      tabIndex={0}
      role="group"
      aria-label="Slides, scrollable"
      data-slot="carousel-viewport"
      className={cn(
        "no-scrollbar snap-mandatory overscroll-x-contain rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60",
        isVertical
          ? "-mt-4 snap-y overflow-y-auto overflow-x-hidden"
          : "-ml-4 snap-x overflow-x-auto overflow-y-hidden",
        // A consumer's own gutter class wins here, since tailwind-merge keeps
        // only the last utility from the margin group.
        className,
      )}
    >
      <div
        className={cn("flex", isVertical && "flex-col")}
        data-slot="carousel-content"
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full snap-start",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
