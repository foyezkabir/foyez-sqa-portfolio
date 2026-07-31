import { Terminal } from "lucide-react";
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
const NAV = [
  { id: "capabilities", label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-8">
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        {/*
          The lock-up became a link to the home page in Module 6. A site name in
          the top left is the one control every visitor already expects to go home,
          and once a second route exists it has somewhere to go. A router Link, so
          the return trip does not re-download the bundle.
        */}
        <Link
          to="/"
          aria-label={`${profile.name}, back to the home page`}
          className="flex items-center gap-3 no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-lg"
        >
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5 text-white" aria-hidden />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground">{profile.name}</span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {profile.role}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={onHome ? `#${item.id}` : `/#${item.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}