import { RepoCard } from "./RepoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

/**
 * Eight real public repositories. Every name, URL, description and stack label
 * here was read out of the GitHub API and the repos' own READMEs, not retyped
 * from memory, because a wrong repo name sends a reader nowhere and this whole
 * section exists to be checked.
 *
 * This replaces the template section that shipped three INVENTED repos
 * (playwright-ai-helper, visual-regression-toolkit, api-contract-validator) with
 * invented star counts. Those never existed on the account.
 *
 * SIX BECAME EIGHT on 2026-10-26: Foyez asked for Appium-Scripter after
 * QA-Scripter, and approved appium-test-reportium alongside it (see the note on
 * that entry for why eight is also the grid-safe count). Later the same day he
 * set the full order; see the note on the array.
 *
 * The account has 31 public repos at the 2026-10-26 count. The remainder are
 * mostly 2021 to 2022 university coursework: machine-learning notebooks, a
 * forked disease-prediction project, and first-website HTML. Showing those
 * under a QA heading would work against the positioning, so the eight here are
 * the QA-relevant ones with enough real content to describe honestly.
 *
 * Deliberately NOT included, and why:
 *   Playwright_practice_project actually contains the Black Pigeon automation
 *   project, with a CI badge and a 38kB README. It is genuinely strong work, but
 *   the repo NAME says "practice project", which undercuts it on a portfolio.
 *   It earns a card as soon as Foyez renames it on GitHub.
 *   PWSP-Automation--Cypress, NRB-Global-Automation---Cypress and Test-Jenkins
 *   have either no README or a one-line stub, so there is nothing to describe
 *   without inventing it. That is why no Cypress repo appears here despite
 *   Cypress being a real skill: the evidence is thin, not the skill.
 */
export type Repo = {
  name: string;
  url: string;
  description: string;
  /**
   * Primary language per the GitHub languages API, EXCEPT for AG-QREW. That repo
   * returns an empty object, because it holds agent definitions in Markdown and
   * no compiled code at all. Labelling it with a language would be a small lie,
   * so it states what it actually is.
   */
  stack: string;
  /**
   * Optional link to a third-party quality report.
   *
   * Deliberately a LINK and not a number. SonarCloud currently reports 94.0
   * percent coverage and a passing gate for the one repo that publishes there,
   * and hardcoding "94%" would go stale on the next push, exactly like the
   * 24-row matrix figure the plan already has to keep re-checking. A link is
   * always current and it is attested by someone other than Foyez, which is the
   * whole point of putting it on a portfolio.
   *
   * Only one repo has this. The other five publish nothing comparable, and an
   * invented stand-in is exactly what R5 exists to prevent.
   */
  qualityReport?: { label: string; url: string };
  /**
   * npm package name, when the repo is published as one. Renders a footer pill
   * linking to the npm page, with the last-month download count fetched LIVE
   * from npm's public downloads API at view time.
   *
   * The count is deliberately never hardcoded, for the same reason the
   * SonarCloud slot above is a link and not a number: a figure typed in today
   * is stale by next month, and R5 treats a stale number as an invented one.
   * The live value is attested by npm, not by Foyez, and when the fetch fails
   * (offline, API change) the pill falls back to the bare "npm" label rather
   * than a wrong figure.
   */
  npm?: string;
};

/*
  Exported for the /projects page, for the same single-source reason as
  `experiences`.

  THE ORDER IS FOYEZ'S, set 2026-10-26, replacing the AG-QREW-first order from
  earlier the same day: QA-Scripter leads, then the two Appium repos, then
  qa-api-pilot, then AG-QREW, with the remaining three keeping their relative
  order at the back. Do not re-sort.
*/
export const repos: Repo[] = [
  {
    name: "QA-Scripter",
    url: "https://github.com/foyezkabir/QA-Scripter",
    description:
      "Turns Jira tickets, Figma designs, Gherkin or the live UI into maintainable Playwright tests on a strict decoupled Page Object Model.",
    stack: "TypeScript",
  },
  {
    /*
      ADDED 2026-10-26 at Foyez's instruction, directly after QA-Scripter. He
      asked for it as "qa-appium scripter", but the repo on the account is
      Appium-Scripter, and R5 says the name on the card matches GitHub
      character for character, so that is what renders. The skill inside it is
      called /qa-appium-scripter, which is likely where his name came from.
    */
    name: "Appium-Scripter",
    url: "https://github.com/foyezkabir/Appium-Scripter",
    description:
      "Claude Code skill that generates Appium and WebdriverIO mobile suites for Android and iOS, native, React Native, Flutter or hybrid, with a stage gate that refuses to call a half-finished module done.",
    stack: "TypeScript",
  },
  {
    /*
      ADDED IN THE SAME PASS as Appium-Scripter, with Foyez's approval, for
      grid arithmetic as much as content: seven cards orphan in both the
      two-column and the three-column /projects grid (7 is prime), where eight
      wraps 2/2/2/2 and 3/3/2. It also pairs naturally with Appium-Scripter,
      whose suites it reports on, which is why it sits directly after it.
    */
    name: "appium-test-reportium",
    url: "https://github.com/foyezkabir/appium-test-reportium",
    description:
      "Published on npm as testreportium: self-contained HTML test reports for Appium in one file, zero network calls, failure screenshots embedded, with run history and quality gates. Reads JUnit XML from any runner.",
    stack: "JavaScript",
    /*
      Verified 2026-10-26: the registry lists testreportium at 0.2.1 with its
      repository field pointing back at this repo, and the downloads API
      reported 543 for the trailing month. That figure is NOT rendered from
      here; the card fetches it live so it can never go stale.
    */
    npm: "testreportium",
  },
  {
    name: "qa-api-pilot",
    url: "https://github.com/foyezkabir/qa-api-pilot",
    description:
      "A reusable Postman and Newman scaffold for any REST API, driven by four Claude Code agents, with nothing hardcoded to one project.",
    stack: "Python",
  },
  {
    name: "AG-QREW",
    url: "https://github.com/foyezkabir/AG-QREW",
    description:
      "Agentic QREW. Five agents coordinate through a shared task list to run a whole sprint cycle: test cases into TestRail, Playwright specs that run, bugs filed, and a signed-off report.",
    stack: "Claude Code agents",
  },
  {
    name: "playwright-api-automation-python",
    url: "https://github.com/foyezkabir/playwright-api-automation-python",
    description:
      "API test framework on Playwright and pytest, with Allure reporting, a CI/CD pipeline and a SonarCloud quality gate.",
    stack: "Python",
    qualityReport: {
      label: "Quality gate",
      url: "https://sonarcloud.io/project/overview?id=foyezkabir_playwright-api-automation-python",
    },
  },
  {
    name: "Teebay_buggy_automation",
    url: "https://github.com/foyezkabir/Teebay_buggy_automation",
    description:
      "Thirty Playwright tests across eight suites on a Page Object Model, shipped alongside the React app they exercise.",
    stack: "Python",
  },
  {
    name: "InC-Automation-Selenium",
    url: "https://github.com/foyezkabir/InC-Automation-Selenium",
    description:
      "Selenium suite for the Interactive Cares site, covering contact form submission and input validation scenarios.",
    stack: "Python",
  },
];

export function AgentsAndAutomation() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Agents &amp; Automation
          </h2>
          {/*
            The subtitle is the point of the section. Everything above it on the
            page is Foyez's own account of his work; these eight are the part a
            stranger can open and read without taking his word for anything.
          */}
          <p className="text-lg text-muted-foreground">
            Public repositories, readable end to end
          </p>
        </div>

        {/*
          A SLIDER, WHICH IS WHAT FOYEZ ASKED FOR TWICE.

          It shipped as a grid instead, and the reason was a real bug rather than
          a preference: the shared carousel could not reach its last slide, so a
          slider here would have hidden one of six repositories. A section that
          loses content is worse than a section that does not slide, so the grid
          was the honest fallback while the component was broken.

          ui/carousel.tsx has since been rebuilt on CSS scroll-snap with no
          JavaScript slide measurement anywhere, which removes that whole class of
          bug rather than patching one instance of it. Verified for six cards with
          three runs at each of 390, 800, 1024, 1280 and 1920; re-verified for
          eight on 2026-10-26 when the two Appium repos joined: last card reaches
          full visibility and the arrows disable at both ends, at 390, 800, 1280
          and 1920.

          Three visible at lg, so five sit behind the arrows with eight cards.
          Less comfortable than the two-of-six it was when written, but the
          mechanism is the same as Certifications and every card remains
          reachable; /projects still lays all eight out at once for anyone who
          wants them in one view.

          The equal-size requirement Foyez actually wanted is met more strongly
          than the grid managed it. All eight cards are in ONE flex row, so
          flex stretch equalises every card against the single tallest one by
          construction. The grid needed auto-rows-fr to stop its two rows sizing
          independently, which was the "small big" he first reported.

          The card itself lives in RepoCard, because the /projects page in Module 6
          renders the same eight repositories. One copy of the card means the title
          reserve, the underscore wrap rule and the stretched-link pattern cannot
          drift apart between the two pages.
        */}
        <Carousel>
          <CarouselContent className="-ml-8">
            {repos.map((repo) => (
              <CarouselItem
                key={repo.name}
                className="pl-8 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <RepoCard repo={repo} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/*
            Arrows centred below rather than the component default of 48px
            outside the container, which would overflow the section's 32px
            padding and clip on narrow screens. Centred below is safe at every
            width and reachable on touch. Matches Certifications.
          */}
          <div className="flex items-center justify-center gap-3 pt-10">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
