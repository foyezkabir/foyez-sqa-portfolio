import {
  ArrowRight,
  Bot,
  Building2,
  HeartHandshake,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { ProjectCard } from "./ProjectCard";

/**
 * MODULE 5: FEATURED WORK. Four cards, layout unchanged.
 *
 * CLIENT PRODUCTS ONLY, decided by Foyez on 2026-07-30. The agent repos that an
 * earlier plan had here moved to Agents & Automation, which now carries them with
 * real GitHub links and README-sourced descriptions. Repeating them here would
 * show a reader the same three repos twice in one scroll. It also closed the open
 * card-4 question, which was LolerFlow against qa-api-pilot: with the agents out,
 * LolerFlow takes a card outright.
 *
 * WHAT WAS REMOVED, and it is the single worst thing that has been on this page.
 * Four invented projects, "AI-Powered Test Generator", "Visual Regression
 * Framework", "QA Analytics Dashboard", "Contract Testing Suite", each with an
 * invented impact metric: "80% coverage improvement", "60% execution time
 * reduced", "Improved team visibility", "Scaled testing 10x". None of those
 * numbers has a source. None of those projects exists. They are exactly the kind
 * of claim an interviewer opens with, and the answer would have been that they
 * are template text.
 *
 * WHAT REPLACES THEM: outcome statements rather than metrics. Foyez has no
 * measured numbers for these products, so the cards state what actually happened,
 * which is checkable in a conversation, instead of a percentage that is not. The
 * `outcome` field is deliberately typed as a string and not a number for that
 * reason: there is no slot here for a figure to be dropped into later without
 * someone having to write a sentence and stand behind it.
 */
export type Project = {
  title: string;
  /** What the product is. From cv-data.txt, condensed, nothing added. */
  description: string;
  /** What Foyez did and what came of it. No percentages, ever. */
  outcome: { icon: typeof Rocket; text: string };
  /** Technical and domain scope, so the card carries keywords without prose. */
  tags: string[];
  /**
   * Empathika and VelaCrew have one. The others are client platforms with no
   * public URL, so their View Project button is not rendered at all rather than
   * rendered pointing nowhere.
   */
  url?: string;
};

/*
  ORDER IS FOYEZ'S: leadership first. PharmaZ247 and LolerFlow are the two
  products he led end to end, and they are also the two with the strongest
  outcomes, so they take the first row. VelaCrew, StretchSense MDM and Empathika
  are contribution-scale work and follow.

  This is also the first time the View Project button becomes real anywhere on the
  site. It has been hidden on every card until now precisely because no card had a
  URL, and R6 says a control renders only when it has a destination.

  VELACREW ADDED 2026-10-26, from facts Foyez supplied that day, recorded in
  cv-data.txt under the TulipTech projects. Three limits he set explicitly:
  no sole-QA or lead phrasing (LolerFlow keeps the end-to-end claim), no ticket
  numbers or defect specifics anywhere on the site, and no product URL. The
  testing surfaced security findings, so the card says security and adversarial
  testing happened and deliberately stops there.

  THE THIRD LIMIT WAS LIFTED later the same day: Foyez supplied
  https://velacrew.ai/ and asked for it on the project, so the card now carries
  a View Project button like Empathika's. The first two limits still stand.
*/
/*
  ALL FIVE TulipTech client products, exported for the /projects page. The home
  section renders `featuredProjects` below instead, because the Figma structure
  fixes Featured Work at four cards (R14) and Foyez picked which four on
  2026-10-26: PharmaZ247, LolerFlow, VelaCrew and Empathika. StretchSense MDM
  appears on /projects only.
*/
export const projects: Project[] = [
  {
    title: "PharmaZ247",
    description:
      "Multi-tenant pharmacy ERP and telehealth platform for the Bangladesh market: FEFO inventory under DGDA compliance, POS, master data, and separate doctor and customer portals for appointments, teleconsultation and prescriptions in Bengali and English.",
    outcome: {
      icon: Rocket,
      text: "Led QA from MVP to market launch, across web, mobile and desktop",
    },
    /*
      TestRail came off this row on 2026-07-31, at Foyez's call.

      It was the odd one out and the row is better without it. Every other tag on
      every card in this section describes the PRODUCT: its domain, its platforms,
      its architecture, an integration it ships with. TestRail is a tool Foyez used
      to test the product, which is a different kind of claim sitting in the same
      visual row, and it already appears where it belongs, in the TulipTech
      Experience bullet about designing and executing test cases in TestRail.
    */
    tags: ["Regulated domain", "Web, mobile, desktop", "Multi-tenant"],
  },
  {
    title: "LolerFlow",
    description:
      "Multi-tenant SaaS for UK LOLER lifting-equipment inspection and compliance, covering assets, inspections, defects, certificates, audit packs and a simPro integration.",
    outcome: {
      icon: ShieldCheck,
      text: "Led QA end to end, delivered through client demos and sign-off milestones",
    },
    tags: ["Safety compliance", "Third-party integration", "SaaS", "simPro"],
  },
  {
    title: "VelaCrew",
    /*
      Foyez's approved wording from 2026-10-26, recast into the card's
      product-description slot. The full two-sentence copy he supplied lives
      verbatim in cv-data.txt and in the Experience bullets; the card condenses
      it the same way the PharmaZ247 card condenses its cv-data entry.
    */
    description:
      "AI-agent project management platform where every team member has a personal AI agent: agents communicate with each other, task updates move through agent proposals with human confirmation, and project boards are imported from the Huly tracker and executed as team rounds.",
    outcome: {
      icon: Bot,
      /*
        "Adversarial AI testing" compresses his line "adversarial testing of
        the AI agents themselves (prompt injection, destructive instructions,
        conflicting commands)", which appears in full on the Experience card.
        Deliberately NOT "Led" or "sole": he ruled that phrasing out.
      */
      text: "Functional, multi-user, integration, security and adversarial AI testing",
    },
    tags: ["AI agents", "Multi-user", "Huly integration"],
    url: "https://velacrew.ai/",
  },
  {
    title: "StretchSense MDM",
    description:
      "Enterprise XR device management platform, covering centralised device management, security and scalability.",
    outcome: {
      icon: Building2,
      text: "Handling the full QA cycle on an enterprise device platform",
    },
    tags: ["Enterprise", "XR devices", "Security", "Scalability"],
  },
  {
    title: "Empathika",
    description:
      "AI-powered all-in-one care home management platform, covering medication, care planning, HR and compliance.",
    outcome: {
      icon: HeartHandshake,
      text: "QA validation across a sprint on a live care platform",
    },
    tags: ["Care sector", "AI product", "Compliance"],
    url: "https://empathika.com/",
  },
];

/*
  THE HOME FOUR, DERIVED BY EXCLUSION rather than typed as a second list, so a
  future edit to any shared card cannot leave the two pages disagreeing. Foyez
  chose the set on 2026-10-26 when VelaCrew arrived: the two led products keep
  the first row, VelaCrew and Empathika take the second, and StretchSense MDM
  moves to /projects only. Order is inherited from `projects`, so his
  leadership-first sequence holds here without being restated.
*/
export const featuredProjects: Project[] = projects.filter(
  (project) => project.title !== "StretchSense MDM",
);

export function Projects() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">Featured Work</h2>
          {/*
            Subtitle replaced. "Building tools and frameworks that improve quality
            at scale" described the invented tooling projects that used to be here
            and is wrong about the real ones, which are client products Foyez
            tested rather than tools he built. The tools have their own section.
          */}
          <p className="text-lg text-muted-foreground">
            Client products, owned through to release
          </p>
        </div>

        {/*
          Two by two, unchanged from the template. auto-rows-fr is added, because
          the two rows would otherwise size independently and produce the same
          "small big" mismatch Foyez reported on Agents & Automation. With it, all
          four cards are the same height whatever the description length.
        */}
        {/*
          The card itself lives in ProjectCard, because the /projects page in
          Module 6 renders the same four client products. One copy of the card
          means the element order that fixes the R3 outcome-line break cannot be
          quietly undone in a second file.
        */}
        <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/*
          See all projects, which the plan has always had below this grid. It is
          the only See all button on the site: Featured Work is the one section
          with more behind it, and Module 6 is the page it opens.

          A router Link. It shipped as a plain anchor for the length of one module,
          because Module 5 was built before Module 6 and a Link rendered outside a
          router throws. Now that App.tsx mounts the router this stays inside the
          SPA rather than re-downloading the bundle.
        */}
        <div className="flex justify-center">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/projects">
              See all projects
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
