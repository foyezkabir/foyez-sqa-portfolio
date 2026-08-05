import {
  Braces,
  Bot,
  Database,
  GitBranch,
  Kanban,
  TestTube2,
  Wrench,
  Workflow,
} from "lucide-react";

/**
 * MODULE 34. THE SKILLS SECTION, added at Foyez's request after he asked where it
 * was and pointed out it is in the CV. It was not on the site at all.
 *
 * WHAT WAS ACTUALLY MISSING, measured against the rendered page rather than
 * assumed. Of the 38 items in cv-data.txt's PREFERRED WORKING TOOLS block, 22 did
 * not appear anywhere on the site, and four of those had zero occurrences in the
 * whole of src/: GitHub Actions, Agile & Scrum, SDLC / STLC, and MySQL. Mobile
 * Application Testing was absent too, which cv-data.txt line 434 had already
 * flagged as "a gap in the skills list".
 *
 * Engineering Capabilities was NOT this section. It scores five themes on a radar
 * and drops the rest, which is a summary, not a list. Both can exist because they
 * answer different questions:
 *
 *   Engineering Capabilities  HOW DEEP, on five axes, with evidence per axis.
 *   this section             WHAT, in full, grouped the way the CV groups it.
 *
 * R14 OVERRIDE, GRANTED EXPLICITLY BY FOYEZ. This takes the home page from nine
 * sections to ten, and the nine come from the Figma structure. He was told the cost
 * and chose to add it anyway, because recruiter filter terms that are not on the
 * page cannot be searched for. Logged in portfolio-change-plan.txt.
 *
 * R5: EVERY ITEM HERE IS VERBATIM FROM cv-data.txt LINES 311 TO 337. Nothing is
 * added, nothing is upgraded, nothing is invented. The category names are the CV's
 * own category names. If a skill is not in that block it does not belong here, and
 * the fix is to add it to the CV first.
 *
 * NO SCORES, NO PROFICIENCY BARS, DELIBERATELY. A number next to a skill is a
 * self-assessment, and R7 requires a published rubric next to any such figure. The
 * radar section already carries the one rubric this site can defend. Repeating
 * scores here would either duplicate that or invent 38 new unsourced ones.
 *
 * PRESENTATION IS A DEFINITION LIST, NOT A CARD GRID. It shipped as eight bordered
 * cards and Foyez rejected them. The reason is in the comment on the dl below, but
 * the short version is that R3's equal-height rule and groups holding between 1 and
 * 10 items cannot both be satisfied, so seven of eight cards were padding. Do not
 * reintroduce cards here without solving that first.
 *
 * NO COLONS in the prose, per the convention the plan file records for
 * Automation-First.
 */
const GROUPS = [
  {
    /* cv-data.txt line 311. Mobile Application Testing leads because it was the
       item the CV notes called out as missing from the site. */
    title: "Software Testing & QA",
    Icon: TestTube2,
    items: [
      "Mobile Application Testing",
      "API Testing",
      "Automation Testing",
      "Functional Testing",
      "Regression Testing",
      "Integration Testing",
      "UAT Testing",
      "Test Case Writing & Execution",
      "Bug Reporting & Defect Tracking",
      "Cross-Browser & Cross-Platform Testing",
    ],
  },
  {
    /* cv-data.txt line 317. */
    title: "Languages",
    Icon: Braces,
    items: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    /* cv-data.txt line 320. */
    title: "Testing Tools",
    Icon: Wrench,
    items: [
      "TestRail",
      "Playwright",
      "Cypress",
      "Selenium",
      "Postman",
      "Chrome DevTools",
    ],
  },
  {
    /* cv-data.txt line 323. Claude Code CLI is the CV's exact wording, not
       "Claude Code", so it stays as written. */
    title: "MCP & AI Tools",
    Icon: Bot,
    items: [
      "Claude Code CLI",
      "Playwright MCP",
      "Chrome DevTools MCP",
      "TestRail API Integration",
      "Postman API Automation",
    ],
  },
  {
    /* cv-data.txt line 327. */
    title: "CI/CD & Version Control",
    Icon: GitBranch,
    items: ["Git", "GitHub", "GitHub Actions"],
  },
  {
    /* cv-data.txt line 333. */
    title: "Methodology",
    Icon: Workflow,
    items: ["Agile & Scrum", "SDLC", "STLC"],
  },
  {
    /* cv-data.txt line 330. "(Basics)" is kept because dropping it would upgrade
       the claim, which R5 forbids. */
    title: "Database",
    Icon: Database,
    items: ["MySQL (Basics)"],
  },
  {
    /* cv-data.txt line 336. */
    title: "Collaboration",
    Icon: Kanban,
    items: ["Jira", "Slack", "Odoo", "Trello", "Google Workspace"],
  },
] as const;

export function SkillsAndTools() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">Skills &amp; Tools</h2>
          {/*
            SAYS SOMETHING ABOUT THE WORK, NOT ABOUT THE DATA SOURCE. The first
            version read "The full working set, grouped the way the CV groups it",
            which Foyez rejected, correctly. It described an implementation
            decision, how the list was organised, which is of no interest to a
            reader; it belongs in a code comment, which is where it now lives.

            The line has one job. A 37-item list invites the suspicion that it was
            padded to catch recruiter searches, so this answers that doubt and
            nothing else.

            The contrast form is the house pattern for this site, and every
            neighbouring section uses it:
              Certifications        "Independently verified, not self-assessed"
              Agents & Automation   "Public repositories, readable end to end"
              Featured Work         "Client products, owned through to release"
            Short, and each earns its place by making a claim a reader can check
            against the section under it.

            WHY IT IS NOT "USED ON DELIVERED WORK", which was tried and pulled on
            R5 grounds. 15 of these 37 items appear nowhere in cv-data.txt's
            employment history, only in its PREFERRED WORKING TOOLS list, which is
            a list of tools Foyez works with rather than evidence of shipped use:
            Python, JavaScript, HTML, CSS, Chrome DevTools, Playwright MCP, Chrome
            DevTools MCP, GitHub, GitHub Actions, STLC, MySQL, Slack, Odoo, Trello
            and Cross-Browser & Cross-Platform Testing. Python for instance occurs
            twice in the whole CV, both times in a list, never against a project.
            So "used on delivered work" would assert something the CV cannot back
            for nearly half the section.

            "No padding" claims only that nothing was added to catch recruiter
            searches. That is true of all 37, since every one is lifted from the
            CV, and it still rebuts the one doubt a list this long invites.

            IF THIS LINE IS EVER STRENGTHENED, re-run that check first. The claim
            has to hold for every item in the list, not for the impressive ones.
          */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The working set, no padding
          </p>
        </div>

        {/*
          DEFINITION ROWS, NOT CARDS. Foyez called the card version bad, and the
          measurements agreed.

          WHY THE CARDS FAILED. R3 forces every card in a grid to one height, and
          these groups hold between 1 and 10 items. Every card was therefore
          pinned to 442px at 1280px, which meant the Database card was 442px tall
          to display the single string "MySQL (Basics)". Seven of the eight were
          mostly empty space, and the section ran 1191px, about 1.32 screens, to
          show 37 short strings.

          That is not a styling problem, it is the wrong container. Card parity
          and wildly uneven content are in direct conflict, and the content is the
          part that cannot change, because it is the CV's own grouping.

          A DEFINITION LIST IS WHAT THIS DATA ACTUALLY IS: a term with a set of
          values against it, eight times over. So it is a real dl / dt / dd, which
          also means a screen reader announces the label-to-items relationship
          rather than eight unrelated headings each followed by a list.

          R3 DOES NOT APPLY, and that is the point rather than a loophole. R3
          governs cards in a grid and there are no cards now. Each row is exactly
          as tall as its content, so the one-item row is one line and the ten-item
          row is two. No forced height means no dead space.

          The label column is a fixed sm:w-52 so all eight labels share one left
          edge and the eye can run down them. Below sm the label sits above its
          items instead, because a label column plus items inside 326px leaves the
          items too narrow to read.
        */}
        <dl className="divide-y divide-border border-y border-border">
          {GROUPS.map(({ title, Icon, items }) => (
            <div
              key={title}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="flex shrink-0 items-center gap-2 sm:w-52">
                <Icon className="h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                <span className="text-sm font-semibold leading-snug">
                  {title}
                </span>
              </dt>

              {/*
                The items are a wrapped run of plain text separated by a middot
                rather than bordered chips. 37 bordered pills was most of the
                visual noise: every item carried a box, so nothing stood out and
                the whole block read as texture. Text with separators reads as a
                list of names, which is what it is.

                The middots are aria-hidden and decorative. A screen reader gets
                the dd boundaries, so it does not need to hear "middot" 29 times.

                THE SEPARATOR TRAILS ITS ITEM, IT DOES NOT LEAD THE NEXT ONE, and
                this was a real bug caught in a screenshot rather than by
                measuring. With the middot rendered before each item from the
                second onward, the ten-item row wrapped so that a separator landed
                at the START of the second line, reading "· UAT Testing", which
                looks like a typo. The hero's degree line had the same failure
                earlier and was fixed the same way.

                Pairing each item with a FOLLOWING separator inside one
                whitespace-nowrap span keeps the two glued together, so a middot
                can never begin a line and can never be orphaned from the item it
                follows. The last item gets no separator.
              */}
              <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 text-sm leading-relaxed">
                {items.map((item, i) => (
                  /*
                    whitespace-nowrap only from sm up. It exists to keep an item
                    glued to its trailing separator so a middot can never start a
                    line, but on a very narrow phone it also forbids the longest
                    string from breaking at all: "Cross-Browser & Cross-Platform
                    Testing" measures 277px, which overflowed a 305px viewport at
                    320px by 4px. Below sm the items are already one per line in a
                    stacked block where a separator cannot be orphaned mid-row, so
                    nowrap buys nothing there and costs an overflow.
                  */
                  <span
                    key={item}
                    className="text-foreground/80 sm:whitespace-nowrap"
                  >
                    {item}
                    {i < items.length - 1 && (
                      <span
                        className="ml-2 text-muted-foreground/40"
                        aria-hidden
                      >
                        &middot;
                      </span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
