import { Code2, ExternalLink } from "lucide-react";

/**
 * Six real public repositories. Every name, URL, description and stack label here
 * was read out of the GitHub API and the repos' own READMEs, not retyped from
 * memory, because a wrong repo name sends a reader nowhere and this whole section
 * exists to be checked.
 *
 * This replaces the template section that shipped three INVENTED repos
 * (playwright-ai-helper, visual-regression-toolkit, api-contract-validator) with
 * invented star counts. Those never existed on the account.
 *
 * The account has 27 repos. The other 21 are 2021 to 2022 university coursework:
 * machine-learning notebooks, a forked disease-prediction project, and first-
 * website HTML. Showing those under a QA heading would work against the
 * positioning, so the six here are the QA-relevant ones with enough real content
 * to describe honestly.
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
type Repo = {
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
};

const repos: Repo[] = [
  {
    name: "AG-QREW",
    url: "https://github.com/foyezkabir/AG-QREW",
    description:
      "Agentic QREW. Five agents coordinate through a shared task list to run a whole sprint cycle: test cases into TestRail, Playwright specs that run, bugs filed, and a signed-off report.",
    stack: "Claude Code agents",
  },
  {
    name: "QA-Scripter",
    url: "https://github.com/foyezkabir/QA-Scripter",
    description:
      "Turns Jira tickets, Figma designs, Gherkin or the live UI into maintainable Playwright tests on a strict decoupled Page Object Model.",
    stack: "TypeScript",
  },
  {
    name: "qa-api-pilot",
    url: "https://github.com/foyezkabir/qa-api-pilot",
    description:
      "A reusable Postman and Newman scaffold for any REST API, driven by four Claude Code agents, with nothing hardcoded to one project.",
    stack: "Python",
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
    <section className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Agents &amp; Automation
          </h2>
          {/*
            The subtitle is the point of the section. Everything above it on the
            page is Foyez's own account of his work; these six are the part a
            stranger can open and read without taking his word for anything.
          */}
          <p className="text-lg text-muted-foreground">
            Public repositories, readable end to end
          </p>
        </div>

        {/*
          A carousel rather than a grid, and the reason is card size rather than
          navigation.

          As a 3-by-2 grid the six cards sat in TWO rows. A grid row stretches its
          own cards to match each other, but the two rows size independently, so
          row one and row two ended up different heights depending on how long
          their descriptions ran. That is the "small big" Foyez saw.

          A carousel puts all six in ONE flex row. Flex stretch then equalises
          every card against the single tallest one, so a long summary and a short
          summary produce identically sized cards by construction rather than by
          luck. Same mechanism the Certifications section uses.

          Four visible at lg, so only two sit behind the arrows. That ratio is the
          reason a carousel is honest here: hiding two of six is a real
          affordance, where hiding four of six would be a place content goes to
          die. Same call, and the same reasoning, as Certifications.
        */}
        {/*
          STILL A GRID, NOT A SLIDER, and Foyez asked for a slider twice. This is
          the one thing in this module that is not what he requested, so the reason
          needs to be plain.

          The carousel was built, and the shared component loses the last card.
          Measured at 1280px with the section in view and generous settles, three
          runs each:
            Certifications, 5 slides: track advanced EIGHT pixels then reported
            canScrollNext false, leaving the fifth certificate outside the 1152px
            viewport at x 1168 to 1438.
            This section, 6 slides: advanced one slide pitch and stopped, one short
            of the sixth card.

          A fix was attempted in ui/carousel.tsx, reInit on rAF, window load and
          fonts.ready. It made things WORSE and consistent: Certifications then
          moved zero pixels on every attempt at every width. Reverted, with the
          evidence and the current theory recorded in that file.

          So a slider here would ship a section that hides one of six repositories,
          which is worse than a section that does not slide. The grid shows all six
          with no interaction and cannot strand anything.

          The equal-size requirement, which is what Foyez actually wanted, IS met:
          auto-rows-fr forces every row to the same height. The original "small
          big" was the two grid rows sizing independently, and that is fixed.

          A NOTE ON MY OWN ERRORS HERE, because they cost real time. This bug was
          intermittent at first and I retracted a correct report of it after one
          clean run, then reinstated it once raw geometry showed the 8px travel.
          Anything measured through embla needs repeated runs, not one.
        */}
        <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
              <div key={repo.name} className="relative group h-full">
                  {/* Glow on hover only, matching the other card sections. */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/*
                    STRETCHED-LINK PATTERN, and it is required rather than clever.

                    The card was a single <a> wrapping everything, which is the
                    simplest thing that works until a card needs a SECOND link.
                    One repo now links its SonarCloud report as well as GitHub, and
                    an <a> inside an <a> is invalid HTML that browsers silently
                    unnest, breaking both links.

                    So the card is a div, and the GitHub link is an absolutely
                    positioned overlay covering it. The whole card stays clickable
                    and keeps its pointer cursor, while the quality-report link
                    sits above the overlay on a higher z-index and wins its own
                    clicks. Two real links, no nesting.

                    focus-within on the card draws the ring, because the element
                    receiving focus is now the invisible overlay rather than the
                    visible box.

                    h-full plus auto-rows-fr on the grid is what equalises the
                    sizes.
                  */}
                  <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-secondary/50 to-secondary/30 p-6 backdrop-blur-sm transition-colors group-hover:border-blue-400/50 focus-within:ring-2 focus-within:ring-blue-400/60">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${repo.name} on GitHub, opens in a new tab`}
                      className="absolute inset-0 z-10 rounded-2xl no-underline focus:outline-none hover:no-underline"
                    />
                    {/*
                      ICON INLINE WITH THE NAME, at Foyez's request, matching the
                      original design. An earlier pass moved it onto its own row to
                      buy the title width, which he did not like.

                      What buys the width back instead is dropping the decorative
                      external-link icon that used to sit at the top right. It was
                      never load bearing here: the entire card is a link, it has an
                      aria-label saying it opens in a new tab, and the footer
                      already carries an external-link icon on the one card with a
                      second destination. Removing it returns about 22px to the
                      title, which is what keeps long names to two lines.

                      items-start with mt-0.5 on the icon, so the glyph sits on the
                      first line of a two-line name rather than centring itself
                      against the whole block.
                    */}
                    <div className="flex items-start gap-2">
                      <Code2
                        className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
                        aria-hidden
                      />
                      {/*
                        Reserved title box, THREE lines, sized to the measured worst
                        case rather than the common one. Equal card heights alone
                        are not enough: if one title is one line and another is
                        three, the descriptions beneath start at different heights
                        and the row reads ragged inside identical boxes.

                        Two lines was tried and is not enough. At 1024px, where
                        four cards share the width and each gets its narrowest,
                        "playwright-api-automation-python" needs three lines while
                        its neighbours need one, so a two-line reserve was overrun
                        exactly where it mattered. The cost is some whitespace under
                        short names on wide screens, which is the right trade for
                        descriptions that always start on the same line.

                        overflow-wrap:anywhere rather than break-words. Browsers
                        break at hyphens but never at underscores, and break-word
                        only breaks as a last resort, so
                        "Teebay_buggy_automation" pushed past the card padding.
                        "anywhere" also counts toward min-content sizing, which is
                        what actually keeps it inside.
                      */}
                      <h3 className="min-h-[5.25rem] flex-1 text-base font-semibold leading-snug [overflow-wrap:anywhere]">
                        {repo.name}
                      </h3>
                    </div>

                    {/*
                      flex-1 pushes the stack line to the bottom, so every
                      footer sits on the same baseline however long the
                      description is. Combined with the equal card heights, that
                      is what makes a long summary and a short summary produce
                      the same card.
                    */}
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {repo.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      {/*
                        One accent colour for every dot, not a per-language
                        palette. The reserved status tokens in theme.css include a
                        blue, a green, an amber and a red, so a language palette
                        would start colliding with state meaning. The language
                        name is always written beside the dot, so the colour
                        carries nothing on its own.
                      */}
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-blue-500"
                        aria-hidden
                      />
                      {repo.stack}

                      {/*
                        Renders only when a third-party report actually exists, so
                        five of the six cards show nothing here rather than an
                        empty slot or a placeholder. z-20 lifts it above the
                        stretched GitHub overlay so this link receives its own
                        clicks.
                      */}
                      {repo.qualityReport && (
                        <a
                          href={repo.qualityReport.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${repo.qualityReport.label} for ${repo.name} on SonarCloud, opens in a new tab`}
                          className="relative z-20 ml-auto inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-foreground/80 no-underline transition-colors hover:border-blue-400/50 hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                        >
                          {repo.qualityReport.label}
                          <ExternalLink
                            className="h-3 w-3 shrink-0 opacity-60"
                            aria-hidden
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
          ))}
        </div>
      </div>
    </section>
  );
}
