import { profile } from "../data/profile";

/**
 * Extracted from App.tsx when Module 6 added the /projects route, so both pages
 * end the same way. It was inline markup before, which would have meant two
 * copies of the copyright line and two places for the year to go stale.
 */
export function SiteFooter() {
  return (
    <footer className="px-8 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
        <p>
          © 2026 {profile.name}. {profile.role}. Built with React &amp;
          TypeScript.
        </p>
      </div>
    </footer>
  );
}
