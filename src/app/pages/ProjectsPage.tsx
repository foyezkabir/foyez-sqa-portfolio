import { useLayoutEffect } from "react";
import {
  ArrowLeft,
  Globe,
  Link2Off,
  MonitorSmartphone,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router";

import { Button } from "../components/ui/button";
import { ProjectCard } from "../components/ProjectCard";
import { RepoCard } from "../components/RepoCard";
import { projects, type Project } from "../components/Projects";
import { repos } from "../components/AgentsAndAutomation";
import { experiences } from "../components/Experience";

/**
 * MODULE 6: /projects. The only structural addition to the site.
 *
 * WHY IT EXISTS. Featured Work shows four client products and Agents & Automation
 * shows eight repositories, which between them leave the ten Shadhin products with
 * nothing but a chip and a hover tooltip on the Experience card. Ten products is a
 * genuinely broad track record and it deserves to be readable.
 *
 * IT ALSO CLOSES A KNOWN ACCESSIBILITY GAP, which is the part worth stating
 * plainly. Radix deliberately does not open tooltips on touch, because a tap has
 * to activate the link instead, so a phone visitor sees the ten project names on
 * the Experience card and never their descriptions. R9 says information available
 * only on hover needs a text equivalent. This page is that equivalent: the same
 * summaries, always visible, at every width and on every input device.
 *
 * NO DATA IS RESTATED HERE. Every list on this page is imported from the component
 * that owns it. That is deliberate: the ten-project count has already had to move
 * twice in one afternoon, and a second hand-typed copy of any of these lists is
 * the cheapest possible way for the two pages to start disagreeing about what
 * Foyez has worked on.
 *
 * WHY THE SHADHIN TEN ARE ROWS AND NOT CARDS. There is a one-line description for
 * each but no per-project account of what Foyez did on it. Ten full cards with
 * empty outcome lines would look padded and would draw the eye straight to the
 * gaps. As compact rows with their descriptions they read as a credible track
 * record. Any one of them gets promoted to a full card the moment Foyez supplies
 * what he actually did on it.
 */

/** The Shadhin role owns the ten-product list. Found by company, not by index. */
const shadhin = experiences.find((role) =>
  role.company.startsWith("Shadhin"),
);

/**
 * THE ACCENT LINE LISTS EVERY PLATFORM THE PRODUCT SHIPS ON, from data Foyez
 * supplied on 2026-07-31.
 *
 * The card shell has a slot between the title and the description, which the
 * TulipTech cards fill with an outcome statement. The Shadhin ten have no
 * per-project outcome: there is a CV one-liner for each and nothing about what
 * Foyez specifically did on it. Writing ten outcome sentences would be inventing
 * claims about real client work, which is the one thing R5 rules out absolutely.
 * So the slot carries platform reach instead, which is a real, checkable fact
 * about each product and says nothing about his contribution.
 *
 * IT USED TO BE DERIVED FROM THE URL HOST, and that was wrong in a way worth
 * recording, because the derivation looked airtight. An apps.apple.com link
 * became "iOS app", a play.google.com link became "Android app", anything else
 * became "Web". Self-maintaining, no second list, impossible to get out of step
 * with the link beside it. It was also UNDER-REPORTING four of these products:
 * NRB World and NRBFS are on web, Android AND iOS, and the single link each one
 * carries is a consequence of Foyez's own link policy, app link where an app is
 * the product, not a statement of where the product exists. Deriving a fact from
 * one link's host quietly turned "here is one place you can get this" into "this
 * is the only place it runs".
 *
 * The plan file anticipated exactly this: it records that Foyez declined a
 * multi-link chip layout on the Experience card and that "full web / iOS /
 * Android breakdowns, where they exist, belong on the /projects page".
 *
 * Only ONE link per card still, because only one URL per project is on record.
 * The platform list is text, not links, so it never implies a destination it
 * cannot deliver.
 *
 * R7 is satisfied without trying: an icon plus the platform names, so stripping
 * the blue leaves the meaning intact.
 */
function platformLine(platforms: readonly string[]): {
  icon: typeof Globe;
  text: string;
} {
  if (platforms.length === 0) {
    return { icon: Link2Off, text: "No public link yet" };
  }

  const hasWeb = platforms.includes("Web");
  const hasMobile = platforms.some((p) => p !== "Web");

  /*
    MonitorSmartphone for a product that is both web and mobile. Worth a note,
    because a phone glyph was deliberately REMOVED from What I Bring card 4 for
    implying mobile automation. The reasoning does not carry over: that card was
    about what Foyez automates, which is web only, while this line is about where
    a client's product runs. Automation scope is stated separately and is still
    web only everywhere on the site.
  */
  const icon = hasWeb && hasMobile ? MonitorSmartphone : hasWeb ? Globe : Smartphone;

  return { icon, text: platforms.join(", ") };
}

/**
 * The ten Shadhin products, mapped into the same shape the client-product cards
 * use so they can go through the SAME component.
 *
 * THEY USED TO BE COMPACT ROWS, and Foyez rejected that on sight: the page put
 * rich two-column cards under TulipTech and a thin list under Shadhin, which reads
 * as two different pages stitched together. He is right, and the earlier reasoning
 * in the plan file was wrong in an instructive way. It argued that ten full cards
 * with empty outcome lines would look padded and draw the eye to the gaps. The
 * flaw was treating the outcome slot as unfillable, when there was a real fact
 * available for it all along.
 *
 * Reusing ProjectCard rather than writing a second card is the point. A visual
 * match maintained by two similar components drifts the first time one is edited;
 * a shared component cannot mismatch.
 *
 * THE TAGS AND MOST OF THE DESCRIPTIONS NOW COME OFF THE LIVE PRODUCTS, not the CV
 * one-liner, because Foyez said the cards looked empty and pointed out that the
 * links were right there. He was right, and it is a better source than the CV:
 * seven of the eight live URLs were read directly, and what they say about
 * themselves is checkable by anyone in one click. Provenance for every line is
 * recorded in cv-data.txt under LIVE PRODUCT FACTS.
 *
 * Two have no live source and are unchanged. Host-A-Akkhor serves a bare
 * JavaScript shell with no text and no meta description, and PostJini and Black
 * Pigeon HR have no public URL at all, so those keep their CV wording and their
 * tags come from that wording rather than from anywhere new.
 *
 * NOTHING HERE DESCRIBES WHAT FOYEZ DID. These are facts about the products, the
 * same as the TulipTech card tags ("Regulated domain", "Multi-tenant", "simPro").
 * His contribution is still the role bullets on the Experience card, and no card
 * in this group claims an outcome, because there is still no per-project evidence
 * for one.
 */
const shadhinProjects: Project[] = (shadhin?.projects ?? []).map((project) => ({
  title: project.name,
  description: project.summary,
  outcome: platformLine(project.platforms),
  tags: project.tags,
  url: project.url || undefined,
}));

/** The TulipTech role supplies the dates for the client-products group heading. */
const tulipTech = experiences.find((role) => role.company === "TulipTech");

function GroupHeading({
  title,
  meta,
  count,
}: {
  title: string;
  meta: string;
  count: number;
}) {
  return (
    <div className="space-y-2 border-b border-border pb-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        {/*
          The count is derived from the array length, never typed. The Experience
          card learned this the hard way: its bullet said "eight products" while the
          chip row held ten, because the two were separate strings.
        */}
        <span className="text-sm text-muted-foreground tabular-nums">
          {count} {count === 1 ? "project" : "projects"}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{meta}</p>
    </div>
  );
}

export function ProjectsPage() {
  /*
    THIS PAGE PINS ITSELF TO THE TOP ON MOUNT, and it is deliberately redundant
    with RouteScroll in App.tsx.

    Foyez reported three times that arriving here landed part way down the page,
    and the third time was after a fix that measured clean. Every reproduction
    attempt with a real trusted click, on both the dev server and a production
    preview build, and including the path where a stale #hash is still in the URL
    from a nav click, reported y 0. So the router-level fix does work in every case
    that could be constructed, and the failure he is seeing was not reproducible
    here.

    That is exactly the situation where a second, independent guarantee is worth
    more than another round of measurement. RouteScroll depends on a router effect
    firing with the right timing relative to the browser's scroll clamp. This does
    not depend on the router at all: the page itself, on mount, puts the window at
    the top. If the router effect is early, late, or does not run, this still holds.

    useLayoutEffect rather than useEffect on purpose. It runs BEFORE the browser
    paints, so the first frame a visitor sees is already at the top, rather than a
    frame of mid-page content that is corrected afterwards. That is the difference
    between "loads at the top" and "jumps to the top", and the second one is what
    reads as broken.

    The rAF reassert is here for the same reason it is in App.tsx: the browser
    clamps an inherited scroll offset into this shorter document during the layout
    that follows, which can overwrite a scroll set before it.

    scroll-behavior is forced off around both, because html carries
    scroll-behavior: smooth for in-page anchors and it otherwise animates this,
    which is the visible "comes from the bottom" symptom. It is restored to its
    previous inline value so the stylesheet keeps owning that rule.
  */
  useLayoutEffect(() => {
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
  }, []);

  return (
    /*
      pt-32 clears the fixed header, which is about 73px tall. The home page gets
      that clearance from the Hero's own padding, and this page has no hero.
    */
    <main className="px-8 pt-32 pb-24">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="space-y-6">
          {/*
            A router Link, not an anchor. This one stays inside the SPA, so going
            back to the home page does not re-download and re-run the whole bundle.
            The nav links in the header are anchors instead, because they target a
            section id on another route and a hash needs the browser's own
            scroll-into-view behaviour.
          */}
          <Button variant="ghost" size="sm" className="gap-2 -ml-3" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Back to home
            </Link>
          </Button>

          {/*
            HEADING AND SUBTITLE CENTRED, at Foyez's request, which also brings this
            page into line with every section heading on the home page. Those are all
            centred blocks, so a left-aligned h1 here was the odd one out.

            text-center on the wrapper rather than on each child, so the two cannot
            drift apart later.

            The Back to home button above is deliberately NOT centred. It is
            navigation rather than part of the title block, it belongs on the left
            edge where a back control is expected, and its -ml-3 pulls the ghost
            button's padding back so its label lines up with the content edge.
            Centring it would both break that alignment and read as a third title
            line.
          */}
          <div className="space-y-4 text-center">
            {/*
              An h1, because this page has no hero to carry one. Ramped for the
              same reason every other heading on the site now is.
            */}
            <h1 className="text-4xl sm:text-5xl font-bold">All Projects</h1>
            {/*
              FIRST PERSON, AND SHORTER. Foyez rejected the previous line, which
              read "Everything Foyez has tested or built, grouped by where it came
              from. Public repositories link to the code; client products link out
              where a public address exists."

              Two things were wrong with it. It referred to him in the THIRD
              PERSON on his own portfolio, where every other section speaks as him
              ("Hand over a product and I own quality end to end", "That judgement
              stays with me"), so this page read as though someone else wrote it.
              And the second sentence explained the page's own link conventions,
              which a reader works out by looking at it, so it spent two lines of
              prime space narrating the UI instead of saying anything.

              It also carried a semicolon, which this project's copy does not use.
            */}
            {/*
              mx-auto is required, not decorative. max-w-3xl caps this paragraph at
              768px inside a 1152px container, and text-center only centres the TEXT
              WITHIN the box, not the box itself. Without the auto margins the box
              stays pinned left, so the subtitle would sit visibly off-centre from
              the h1 above it on any viewport wider than 768px.
            */}
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Everything I have tested or built, grouped by where it came from.
            </p>
          </div>
        </div>

        {/*
          TOOLING FIRST, and the order is the same argument the home page makes in
          reverse. On the home page the sections escalate how checkable each claim
          is, ending on third-party credentials. Here the reader has already
          clicked through from Featured Work wanting more, so the page opens on the
          part that needs no trust at all: eight repositories they can read.
        */}
        <section className="space-y-8">
          {/*
            A plain ampersand in the title below. It is a JS string prop rather
            than JSX text, so an HTML entity there would render literally as
            "&amp;" on the page.
          */}
          <GroupHeading
            title="AI Agents & QA Tooling"
            meta="Public repositories, readable end to end"
            count={repos.length}
          />
          {/*
            EIGHT cards since 2026-10-26, and eight is still orphan-safe in this
            grid: 2 columns wrap 2/2/2/2 and 3 columns wrap 3/3/2, no card alone
            on a last row at any width. SEVEN WAS NOT: 7 is prime, so it orphans
            in both 2 and 3 columns, which is exactly why appium-test-reportium
            was added alongside Appium-Scripter rather than stopping at seven.
            If a card is ever added or removed, redo this arithmetic first.
          */}
          <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <GroupHeading
            title="TulipTech"
            meta={`SQA Engineer, ${tulipTech?.years ?? ""}`}
            count={projects.length}
          />
          {/*
            THIS GRID CHANGED FROM TWO COLUMNS TO THREE when VelaCrew made the
            group five cards on 2026-10-26, and the column count is arithmetic,
            not taste. Five divides into no two-column grid without stranding a
            single card on the last row, which is the orphan R4 bans outright.
            Three columns wrap 3+2, balanced at every width where the grid is
            active, and below lg the single column cannot orphan anything.

            The step is at lg rather than md ON PURPOSE. At md a three-column
            track inside this container is about 224px, far too narrow for these
            cards, and a two-column md range would reintroduce the 2+2+1 orphan.
            One column through the tablet range is the only orphan-free option
            that keeps the cards readable.

            Shadhin below stays two-column: ten divides by two and not by
            three, so the two groups genuinely need different column counts.
          */}
          <div className="grid auto-rows-fr grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} narrow />
            ))}
          </div>
        </section>

        {shadhin && (
          <section className="space-y-8">
            <GroupHeading
              title="Shadhin Technologies Ltd."
              meta={`QA Engineer, ${shadhin.years}`}
              count={shadhin.projects.length}
            />

            {/*
              THE SAME GRID AND THE SAME COMPONENT AS TULIPTECH ABOVE, which is
              what Foyez asked for and the only way to guarantee it stays true.

              TWO COLUMNS IS ALSO THE ONLY ORPHAN-FREE COUNT HERE, so this is not
              purely a consistency choice. Ten cards divide evenly by 1 and 2 but
              not by 3: at three across the last row would hold a single card,
              which is exactly the orphan R4 names. Two across gives five full rows
              and matches the group above it.
            */}
            <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 gap-8">
              {shadhinProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
