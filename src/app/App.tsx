import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import { Header } from "./components/Header";
import { SiteFooter } from "./components/SiteFooter";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";

/**
 * MODULE 6 turned this file into the router. The nine home sections moved to
 * pages/HomePage.tsx unchanged, and the footer to components/SiteFooter.tsx so
 * both routes end the same way.
 *
 * react-router 7.13.0 was already in package.json and unused, so the route costs
 * no new dependency.
 *
 * THE THING THAT MAKES A CLIENT-SIDE ROUTE SHIP BROKEN is the server, not the
 * code: without a rewrite, /projects returns 404 on a refresh and on every shared
 * link, because no such file exists on disk. Handled by vercel.json at the repo
 * root. Vite's dev server already falls back to index.html, which is exactly why
 * this class of bug so often reaches production unnoticed.
 *
 * That vercel.json rewrite is a bare catch-all, /(.*) to /index.html, and it looks
 * like it should swallow every certificate PDF. It does not: Vercel checks the
 * FILESYSTEM before it applies rewrites, so any request matching a real file wins
 * first. An earlier version used a negative-lookahead pattern to exclude assets
 * and certificates by hand and was replaced deliberately. This project has already
 * broken certificate serving once with a clever extension pattern, in
 * vite.config.ts, and the lesson was to prefer a guarantee the platform already
 * makes over a regex that has to be right.
 */

/**
 * Route-change scrolling, and it has two jobs rather than one.
 *
 * WITHOUT A HASH: go to the top, so arriving at /projects does not land the
 * visitor at whatever offset the home page happened to be scrolled to. "auto"
 * rather than "smooth" on purpose, because html carries scroll-behavior: smooth
 * for in-page anchors and inheriting it here would animate a full-page scroll on
 * arrival, which reads as the page moving on its own.
 *
 * WITH A HASH: scroll that element into view by hand, because the browser cannot.
 * This was a measured defect, not a precaution. The header's nav links point at
 * /#experience and friends, so clicking Experience from /projects is a full
 * document load. The browser tries to honour the fragment while parsing, at which
 * point #root is still empty and there is nothing called "experience" to scroll
 * to, so it silently gives up: the URL read /#experience and the page sat at
 * scrollY 0 with the Experience section nowhere near the viewport. All four nav
 * links were dead from /projects.
 *
 * An effect is the right place for it and no timer is needed: effects run after
 * React has committed the DOM, so the element exists by the time this runs. The
 * optional chaining is the honest fallback for a hash that matches nothing, which
 * leaves the page at the top rather than throwing.
 *
 * scrollIntoView with no options, deliberately, so it inherits html's
 * scroll-behavior instead of hardcoding one. That means it also honours
 * prefers-reduced-motion once Module 11 gates that rule on the media query.
 *
 * In-page hash clicks on the home page still go through the browser, not through
 * here. A fragment anchor within the same document does not fire popstate, so
 * react-router never sees it, which is fine: native anchor scrolling is the
 * behaviour we want and reimplementing it would be strictly worse.
 */
/**
 * RELOAD ALWAYS LANDS AT THE TOP. Foyez reported that reloading did not return him
 * to the top of the page, and there were TWO independent causes. Both are fixed
 * here, and neither was visible from reading the old effect.
 *
 * CAUSE 1, the browser restoring scroll position. history.scrollRestoration defaults
 * to "auto", so pressing F5 four thousand pixels down the page put the visitor back
 * at four thousand pixels. The effect below never ran for this, because a reload is
 * not a route change: pathname and hash are identical, so React sees no new value to
 * react to. Setting scrollRestoration to "manual" hands that decision to us.
 *
 * CAUSE 2, a leftover hash. Clicking any nav item rewrites the URL to /#skills and
 * it stays there. Reloading then honoured the fragment and returned to Skills at
 * y 2742. The URL genuinely says "skills", so this is defensible behaviour, but it
 * is not what Foyez wants from a refresh.
 *
 * SO A RELOAD AND A COLD LINK ARE TREATED DIFFERENTLY, which is the whole trick.
 * A pasted or shared /#experience link must still land on Experience, since that is
 * the point of having anchors at all. The Navigation Timing API distinguishes them:
 * type "reload" means the visitor refreshed, anything else means they arrived. So a
 * hash is honoured on arrival and ignored on refresh.
 *
 * The hash is stripped from the URL on a reload too, via replaceState. Without that
 * the address bar would still read /#skills while the page sat at the top, so a
 * second refresh would look inconsistent with the first, and copying the URL would
 * hand someone a link to a section the sender was not looking at.
 */
function useTopOnReload() {
  useEffect(() => {
    /*
      Guarded rather than assumed. scrollRestoration is widely supported but it is
      still a feature check, and this file must not throw on a browser that lacks it.
    */
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const [entry] = performance.getEntriesByType("navigation");
    const isReload =
      (entry as PerformanceNavigationTiming | undefined)?.type === "reload";

    if (!isReload) return;

    /*
      Drop the fragment before scrolling, so the address bar agrees with where the
      page actually is. replaceState rather than assigning location.hash, which
      would push a history entry and make the back button undo a refresh.
    */
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    /*
      Same smooth-scroll defeat as the route-change effect below, and for the same
      reason: behavior "auto" alone loses to html's scroll-behavior: smooth, which
      would make a refresh animate up the page instead of starting at the top.
    */
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previous;
  }, []);
}

function RouteScroll() {
  const { pathname, hash } = useLocation();
  useTopOnReload();

  useEffect(() => {
    /*
      On a reload the hash has already been stripped above and the page pinned to
      the top, so this must not then scroll somewhere. Reading the live hash rather
      than the value captured at render is what makes that safe: by the time this
      runs, location.hash is empty on a reload.
    */
    const live = window.location.hash;
    if (live) {
      document.getElementById(live.slice(1))?.scrollIntoView();
      return;
    }

    /*
      A ROUTE CHANGE MUST JUMP TO THE TOP, NOT ANIMATE TO IT, and passing
      behavior: "auto" was not enough to get that.

      Foyez reported that "See all projects" and "What each one is" arrived on
      /projects "from the bottom". Traced by sampling scrollY every 30ms after the
      click: clicking from y 7778 left the new page sitting at y 3522 for 1231ms
      and only then reaching 0. So the route did change and the scroll did happen,
      but as a visible 3522px animation, which is exactly what "comes from the
      bottom" describes. "See all projects" looked fine only because it is higher
      up the page, so its animation was short enough to miss.

      CAUSE: html carries scroll-behavior: smooth for in-page anchors, and it wins
      here. The behavior option on scrollTo is documented to override the CSS, but
      the computed style on html still reads "smooth" at this moment and the
      browser animated anyway, so the option cannot be relied on for this.

      FIX: turn the CSS rule off on the element, jump, then restore it. Restoring
      matters, because that rule is what makes every in-page nav anchor glide, and
      leaving it disabled would trade this bug for a worse one. Setting it back to
      an empty string returns control to the stylesheet rather than hardcoding
      "smooth" here, so the stylesheet stays the single source of truth, including
      when Module 11 gates it on prefers-reduced-motion.
    */
    /*
      TWO SCROLLS, AND THE SECOND ONE IS THE FIX. Measured, because the first
      attempt at this looked correct and did nothing.

      Foyez reported that "See all projects" and "What each one is" arrived on
      /projects part way down. Confirmed: clicking from y 7778 on the home page
      left the new page pinned at y 3522 and it stayed there. 3522 is exactly
      /projects' maximum scroll, 4422 of content minus a 900 viewport, which is
      the tell. The browser CLAMPS the inherited scroll offset to the new, shorter
      document rather than resetting it, and it does that clamp during the layout
      that follows this effect.

      So a single scrollTo here is written and then overwritten: the effect runs,
      sets 0, and the subsequent layout re-applies the clamped 3522. Verified by
      instrumenting scrollTo, which showed exactly one call, from this file, with
      the page already reporting y 0 at that moment, and a final resting position
      of 3522 anyway.

      requestAnimationFrame reasserts it after that layout has happened, which is
      the earliest moment the clamp cannot come back. Both scrolls are kept: the
      synchronous one wins the common case where the next document is tall enough
      that no clamp occurs, so the page never paints mid-content even for a frame.

      SMOOTH IS DEFEATED AROUND BOTH. html carries scroll-behavior: smooth for
      in-page anchors, and passing behavior "auto" was not sufficient on its own,
      so the rule is switched off on the element and restored immediately. It is
      restored to the previous inline value rather than to the literal "smooth",
      so the stylesheet stays the single source of truth for that rule, including
      when it is gated on prefers-reduced-motion.

      The rAF is cancelled on cleanup, so a fast second navigation cannot land a
      stale frame callback on the newer route.
    */
    const jumpToTop = () => {
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      root.style.scrollBehavior = previous;
    };

    jumpToTop();
    const frame = requestAnimationFrame(jumpToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    /*
      `dark` also sits on <html> in index.html, and that is not redundant. This
      class scopes the theme variables to the app subtree; the one on <html> is
      what stops body itself resolving the light theme and painting white, which
      showed through on scroll repaints and on rubber-band overscroll.
    */
    <div className="dark min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <RouteScroll />
        <Header />
        {/*
          No max-width wrapper. Every section caps its own content with an inner
          max-w container, so a wrapper here changed nothing about text width and
          only clipped each section's background at 1440px, leaving flat black
          gutters on wide screens with a visible hard edge.
        */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            {/*
              Anything else renders the home page rather than a bespoke 404. There
              are exactly two routes and no user-generated URLs, so the only way to
              reach a third is a typo or a stale link, and the home page is a more
              useful landing than a dead end. Revisit if the site ever grows real
              deep links.
            */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
        <SiteFooter />
      </BrowserRouter>
    </div>
  );
}
