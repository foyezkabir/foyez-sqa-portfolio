import { profile } from "../data/profile";

/**
 * Extracted from App.tsx when Module 6 added the /projects route, so both pages
 * end the same way. It was inline markup before, which would have meant two
 * copies of the copyright line and two places for the year to go stale.
 */
export function SiteFooter() {
  /*
    DERIVED, NOT TYPED. The year was hardcoded as 2026, which is the exact staleness
    this file's own header comment says the extraction was meant to prevent: it
    removed the duplicate copy but left the literal behind. On 1 January it would
    have silently read a year out of date, on the one page element a reader uses to
    judge whether a site is maintained.
  */
  const year = new Date().getFullYear();

  return (
    <footer className="px-8 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
        {/*
          NAME, YEAR, ROLE. THE STACK BRAG IS GONE, at Foyez's request.

          It read "Built with React & TypeScript", and it was the wrong claim on
          two counts. React and TypeScript are the template's stack rather than
          anything Foyez is selling, and neither appears in his CV skill list, so
          the site's most-repeated technical boast was for tools he does not claim.
          On an SQA portfolio it also reads as a tester advertising frontend
          framework choices, which is off-message next to Playwright and TestRail.

          A footer is attribution, not a credits roll. There is nothing here now
          that has to be defended or kept up to date.
        */}
        <p>
          &copy; <span className="tabular-nums">{year}</span> {profile.name}.{" "}
          {profile.role}.
        </p>
      </div>
    </footer>
  );
}
