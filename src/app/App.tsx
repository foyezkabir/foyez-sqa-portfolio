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
function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
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
