import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { profile } from "../data/profile";

/*
  Padding sits on the header element and the max-width on the inner div,
  mirroring how Hero nests px-8 outside max-w-7xl. With px-8 inside the
  container instead, the two resolved 32px apart and the logo did not line up
  with the hero badge on wide screens.
*/

/**
 * The four section targets. Ids live on wrapper divs in pages/HomePage.tsx.
 *
 * MODULE 6 MADE THESE ROUTE-AWARE, and this is one of the three things the plan
 * flagged as able to ship the new route broken. A bare "#capabilities" does
 * nothing at all when the visitor is on /projects: there is no such element on
 * that page, so all four nav links silently become no-ops. Prefixed with "/",
 * they navigate home and then scroll.
 *
 * On the home page the bare hash is still used, so clicking Capabilities from the
 * home page is an in-page scroll and not a re-navigation. The browser's own anchor
 * behaviour plus html { scroll-behavior: smooth } does the work, which is why
 * these are anchors rather than router Links: react-router does not scroll to a
 * hash for you, and reimplementing that is a worse version of something the
 * browser already does correctly.
 */
/*
  LABELS MATCH THE HEADING THEY LAND ON. Checked against the live DOM rather
  than assumed:

    capabilities -> "Engineering Capabilities"
    projects     -> "Featured Work"
    experience   -> "Experience"
    contact      -> "Let's Connect"

  "Projects" was renamed to "Work" for two reasons. It landed on a section
  headed Featured Work, so the label promised one word and delivered another.
  Worse, /projects is a real route in this app, so the same word named two
  different destinations: the nav item scrolled down the home page while the
  route loaded a different page. "Work" collides with neither.

  THE ID STAYS "projects". It is the scroll target, not visible copy, and
  renaming it would mean editing the wrapper in HomePage.tsx and would break
  any /#projects link already shared or bookmarked. Label and id are allowed
  to differ; only the label is read by a human.

  "Contact" is deliberately NOT renamed to "Let's Connect". Contact is the word
  every visitor scans the top right for, and the heading is free to be warmer
  than the nav item pointing at it. Matching the heading here would cost
  recognition and gain nothing.
*/
/*
  FIVE ITEMS, IN PAGE ORDER. Skills was added at Foyez's request once the section
  existed. Nav order matches scroll order, so a reader working down the menu moves
  down the page rather than jumping around it.

  THE WIDTH WAS RE-MEASURED, not assumed, because a fifth item is what pushes this
  row toward the logo lock-up. At the md breakpoint where the nav first appears the
  gap between the lock-up and the first link is the number that matters, and it is
  checked at 768, 800, 1280 and 1920 rather than eyeballed at one width.
*/
const NAV = [
  { id: "capabilities", label: "Capabilities" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/**
 * MOBILE MENU. Below md the nav was `hidden` and nothing replaced it, so a phone
 * visitor had NO navigation at all across a page that measures 21 screens on a
 * 390px viewport. Scrolling was the only way to reach Experience or Contact, and
 * most recruiters open a portfolio link on a phone. This was the largest functional
 * gap on the site.
 *
 * HAND-ROLLED RATHER THAN A RADIX SHEET, on the same reasoning this project used to
 * reject framer-motion for one tilt: a panel holding five anchors does not need a
 * dialog library, and Sheet drags in focus-trap and portal machinery for a control
 * that closes on navigation anyway.
 *
 * WHAT IT STILL HAS TO GET RIGHT, because a hand-rolled menu is where these get
 * skipped:
 *   Escape closes it, which is the one keyboard convention every user expects.
 *   The trigger is a real button with aria-expanded and aria-controls, so a screen
 *     reader announces the state rather than just "button".
 *   Body scroll is locked while it is open, otherwise the page scrolls behind the
 *     panel on iOS and the reader loses their place.
 *   It closes on route change AND on link click. Both are needed: an in-page hash
 *     link on the home page never changes the route, so pathname alone would leave
 *     the panel open over the section it just scrolled to.
 *   The panel is not rendered at all when closed, so its links are not tab stops.
 *
 * The trigger is md:hidden and the desktop nav is hidden below md, so exactly one
 * of the two is ever present. No duplicate tab stops.
 */
/**
 * WHICH SECTION IS ON SCREEN, for the nav's active underline.
 *
 * R12 IS THE REASON THIS IS SHAPED THE WAY IT IS, and it is worth reading before
 * touching it. That rule records the hero test-run panel freezing TWICE because an
 * animation was gated on a flag set by an IntersectionObserver: when the reopening
 * event never arrived, it stayed frozen with no path back.
 *
 * This observer is therefore READ-ONLY. It reports a label for styling and nothing
 * else. Nothing renders conditionally on it, nothing animates on it, and no content
 * is hidden behind it. If it never fires, the nav simply shows no active underline
 * and every link still works, which is a cosmetic degradation rather than a wedge.
 *
 * rootMargin pulls the detection band to the upper third of the viewport, so the
 * "current" section is the one a reader is actually looking at rather than whichever
 * happens to clip the very bottom edge. Without it, scrolling down highlights the
 * NEXT section a moment before it arrives.
 *
 * Sorting the intersecting entries by position and taking the first is what makes it
 * stable when two sections are in the band at once, which happens on every scroll
 * between sections. Taking the most-visible entry instead flickers.
 */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    /*
      GUARDED, and this was a real crash rather than a precaution. Calling the
      constructor unguarded threw "ReferenceError: IntersectionObserver is not
      defined" inside Header, which unmounted the entire React tree: measured
      document.getElementById('root').children.length === 0 and zero body text. A
      white screen, from a nav underline.

      Found by deliberately deleting window.IntersectionObserver before boot to test
      that the new Reveal component fails open. Reveal was fine; this was not.

      The active underline is decoration. Losing it costs nothing; losing the page
      costs everything, so the feature degrades and the site still renders.
    */
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -66% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    /*
      THE LAST SECTION CANNOT REACH THE DETECTION BAND, and this is not a tuning
      problem, it is arithmetic. The band sits in the upper third of the viewport, but
      the page runs out of scroll before the final section's top gets there, so
      scrolling to the very bottom left "Experience" marked while Contact filled the
      screen. Measured: scrolling to #contact reported the wrong label.

      Shrinking the band to fix it would break the other four, since a shallow band
      makes the "current" section flip a moment before a reader arrives at it.

      So the bottom of the page is a special case, handled explicitly: within 2px of
      maximum scroll the last id wins outright. Cheap, exact, and it cannot fight the
      observer, because it only ever applies where the observer has nothing useful to
      say.

      passive: true because this listener never calls preventDefault, which lets the
      browser keep scrolling without waiting on it.
    */
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(ids[ids.length - 1]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, enabled]);

  return active;
}

/*
  A module-level constant, not an inline array. useActiveSection depends on `ids`, and
  a fresh array literal on every render would tear down and rebuild the observer on
  every render.
*/
const NAV_IDS = NAV.map((item) => item.id);

export function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  /*
    Only tracked on the home page. The section ids do not exist on /projects, so
    observing there would find nothing and the nav would show no active state, which
    is correct: no nav item corresponds to the projects page.
  */
  const activeId = useActiveSection(NAV_IDS, onHome);

  /*
    HAS THE READER SCROLLED PAST THE HERO?

    Foyez pointed out that his name appears at 16px in this header and again at 72px
    in the hero, 86px apart and both fully on screen at the top of the page. Measured:
    the name occurs 3 times on the page and the role 4 times.

    Deleting the header name was the wrong fix, because the header is `fixed` and the
    hero name is only visible in the first viewport. On a page that runs 21 screens on
    a phone, the header lock-up is the ONLY thing carrying his identity for the other
    20. It is not redundant, it is redundant IN ONE PLACE.

    So the name is hidden while the hero is on screen and fades in below it. He also
    said, correctly, that an empty header would look unfinished, which is why the FK
    monogram stays visible the whole time and only the wordmark moves.

    A PLAIN SCROLL LISTENER, NOT AN OBSERVER, and deliberately so. This needs a
    THRESHOLD CROSSING, not element visibility, and a scroll handler reading scrollY
    against innerHeight is the direct expression of that. It also cannot repeat the
    R12 failure: there is no flag waiting for an event that might never arrive, the
    value is recomputed from the clock of the scroll position on every event, and it
    is seeded by calling the handler once on mount so a page restored mid-scroll is
    correct on the first paint rather than after the first scroll.

    passive: true, since this never calls preventDefault.

    OFF THE HOME PAGE THE NAME IS ALWAYS SHOWN. /projects has no hero to duplicate, so
    hiding the wordmark there would be a loss with no gain.
  */
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  /*
    Read once on mount rather than subscribed to. A visitor changing their motion
    preference mid-visit is vanishingly rare, and the cost of getting it wrong is one
    300ms fade until the next navigation, not a broken page.
  */
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!onHome) {
      setScrolledPastHero(true);
      return;
    }
    const onScroll = () => {
      /*
        70% of the viewport rather than 100%. By the time the hero name has scrolled
        most of the way off, the header wordmark is no longer competing with it, and
        waiting for the full height leaves an awkward stretch where neither is
        readable.
      */
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  // Close on route change, so navigating to /projects does not leave it hanging.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    /*
      Scroll lock. Stored and restored rather than set to "" blindly, so this cannot
      clobber an overflow value something else set.
    */
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-8">
      <div className="max-w-6xl mx-auto py-4 flex items-center justify-between">
        {/*
          The lock-up became a link to the home page in Module 6. A site name in
          the top left is the one control every visitor already expects to go home,
          and once a second route exists it has somewhere to go. A router Link, so
          the return trip does not re-download the bundle.
        */}
        <Link
          to="/"
          aria-label={`${profile.name}, back to the home page`}
          className="flex items-center no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-lg"
        >
          {/*
            THE FK MONOGRAM IS THE PERSISTENT MARK. The blue terminal tile was removed
            earlier as dull; this replaces it with something that is actually Foyez's,
            and it already existed in the project as public/favicon-512.png, drawn as
            a white FK on the dark theme's own background. No new asset, no generic
            glyph, and it reads as a mark rather than as a stock icon.

            It stays visible at every scroll position, which is what stops the header
            looking empty while the wordmark is hidden. Foyez raised exactly that when
            the fade was proposed.

            alt="" and aria-hidden, deliberately. The Link already carries an
            aria-label naming him and saying where it goes, so a screen reader
            announcing the monogram as well would say his name twice for one control.
            R9 asks for real alt text on images that carry meaning; here the meaning is
            on the link.
          */}
          <img
            src="/favicon-512.png"
            alt=""
            aria-hidden
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-lg"
          />

          {/*
            THE WORDMARK FADES IN ONLY AFTER THE HERO, which is the whole fix for the
            duplication Foyez spotted.

            OPACITY AND WIDTH, not conditional rendering. Removing the element from
            the DOM would make the nav jump sideways as it appears and disappear from
            the accessibility tree on the one screen where it is least needed. Keeping
            it mounted and animating it means the layout settles once and stays.

            R8: opacity is a compositor property, but max-width is a LAYOUT one and
            animating it is exactly what R8 warns against. It is used here anyway and
            the reason is worth stating: the alternative, animating transform, would
            slide the wordmark over or under the nav rather than letting the nav sit
            where it always sits. This is one element, transitioning once per page
            visit, on a threshold crossing rather than a loop, so the layout cost is
            paid twice in a session rather than per frame of a continuous animation.

            motion-reduce:transition-none per R8, so a reduced-motion visitor gets the
            end state with no animation at all.

            aria-hidden while collapsed, so a screen reader is not offered a name that
            is visually absent. The Link's own aria-label is unaffected and still
            announces him at every scroll position.
          */}
          {/*
            INLINE STYLES, NOT CONDITIONAL CLASSES, and this was arrived at by
            debugging rather than preference.

            Two attempts with toggled utility classes both failed silently, and the
            reason is worth keeping. The class list on the element read exactly
            "ml-3 max-w-xs opacity-100" while the COMPUTED values were max-width 0px
            and opacity 0. Both the expanded and the collapsed utilities live in the
            stylesheet permanently, they carry identical specificity, so which one
            wins is decided by SOURCE ORDER in the generated CSS, not by which class
            React put on the element last. Toggling class names cannot beat that.

            An earlier attempt also used max-w-[280px], which Tailwind never generated
            at all: 0 occurrences in the built CSS while every neighbouring utility
            was present. Two different silent failures in the same element.

            Inline styles have higher specificity than any utility class, so they
            settle it. The transition stays in the class list because it is
            unconditional and has nothing to lose a cascade fight with.

            THE LESSON, since this is the third silent-no-op in this project after
            bg-[--status-good] and scale-x: VERIFY A TOGGLED STYLE BY READING THE
            COMPUTED VALUE. A correct-looking class list proves nothing.
          */}
          <div
            aria-hidden={!scrolledPastHero}
            style={{
              maxWidth: scrolledPastHero ? "280px" : "0px",
              opacity: scrolledPastHero ? 1 : 0,
              marginLeft: scrolledPastHero ? "0.75rem" : "0",
              /*
                THE TRANSITION IS INLINE TOO, and it has to be. R8 requires reduced
                motion to be honoured, and motion-reduce:transition-none is a CLASS,
                which cannot override an inline transition on the same element.
                Measured: with the transition in the class list it still computed
                0.3s under prefers-reduced-motion, so the rule was silently ignored.

                Deciding it in JS from the same media query the CSS would have used
                keeps one source of truth, and "none" here means a reduced-motion
                visitor gets the end state instantly rather than a 300ms animation
                to the same place.
              */
              transition: prefersReducedMotion
                ? "none"
                : "opacity 300ms ease-out, max-width 300ms ease-out, margin 300ms ease-out",
            }}
            className="flex min-w-0 flex-col overflow-hidden leading-tight"
          >
            <span className="whitespace-nowrap font-semibold text-foreground">
              {profile.name}
            </span>
            <span className="whitespace-nowrap text-[11px] uppercase tracking-wider text-muted-foreground">
              {profile.role}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => {
            const isActive = activeId === item.id;
            return (
              /*
                A WHITE UNDERLINE ON HOVER, AND A PERSISTENT ONE ON THE CURRENT
                SECTION, at Foyez's request. Before this the nav gave no indication
                of position at all, on a page that measures 21 screens on a phone.

                THE RULE IS AN ABSOLUTE SPAN, NOT text-decoration. An underline
                drawn by the text decoration sits tight against the letterforms and
                cuts through descenders in "Capabilities" and "Experience". A 2px
                span positioned below the text clears them and gives control over
                width and colour that text-decoration does not.

                It scales on the X axis rather than animating width, per R8: width is
                a layout property and animating it forces layout on every frame,
                where transform does not. origin-left makes it wipe in from the left
                rather than growing from the centre.

                aria-current="page" is the real signal for the active item. The
                underline and the brighter text are visual only, so a screen reader
                would otherwise have no idea which section is current: R7's rule that
                a state never rests on colour alone applies to position too.
              */
              <a
                key={item.id}
                href={onHome ? `#${item.id}` : `/#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`group relative text-sm transition-colors no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-white transition-transform duration-200 motion-reduce:transition-none ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/*
          R9: an icon-only control needs an accessible name, and this one also needs
          to announce whether the panel is open. aria-expanded carries the state and
          aria-controls ties the button to the panel it owns.

          44px square, which is the minimum comfortable touch target. The icon itself
          is 20px; the rest is hit area, and -mr-2 pulls the extra padding back so the
          glyph still lines up with the container's right edge rather than sitting
          inset from it.
        */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {/*
        THE PANEL IS ONLY IN THE DOM WHEN OPEN. Rendering it hidden would leave five
        anchors in the tab order behind a closed menu, which is the classic
        hand-rolled-menu bug.

        It sits inside <header> rather than in a portal, so it inherits the header's
        own stacking context and cannot end up behind a later section. border-t
        continues the header's bottom rule instead of drawing a second one.
      */}
      {open && (
        <nav
          id="mobile-menu"
          /*
            OPAQUE, NOT bg-background/95. Caught in a screenshot rather than by
            measuring: at 95% over the hero the headline and the tech chips showed
            through the panel and competed with the link labels. Backdrop blur softens
            a busy background but it does not stop high-contrast white text bleeding
            through 5% of transparency. A navigation panel has to be readable over
            whatever it happens to cover, and the only reliable way is to cover it.
          */
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.id}>
                {/*
                  onClick closes the panel as well as the route effect above, and
                  both are needed. On the home page these are in-page hash links, so
                  the pathname never changes and the route effect never fires; the
                  panel would stay open over the section it just scrolled to.
                */}
                {/*
                  THE ACTIVE ITEM IS MARKED HERE TOO, and it uses a LEFT BAR rather
                  than the desktop underline. In a vertical list an underline reads
                  as a divider between rows; a bar on the leading edge reads as
                  "this one", which is the convention for a stacked menu.

                  Same aria-current as the desktop nav, so the state is announced
                  rather than being colour and position alone.
                */}
                <a
                  href={onHome ? `#${item.id}` : `/#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={activeId === item.id ? "page" : undefined}
                  className={`block border-l-2 py-3 pl-3 pr-2 text-base no-underline transition-colors hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded ${
                    activeId === item.id
                      ? "border-white text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}