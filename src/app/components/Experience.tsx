import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

/**
 * Three real roles, newest first. Every claim traces to cv-data.txt.
 *
 * The leadership on card 1 is the most important thing in this section and it is
 * NOT on the CV. Every TulipTech bullet there is individual-contributor language
 * ("Authored test cases", "Developed scripts", "Performed manual testing"), which
 * undersells two products led end to end, a junior mentored, an MVP carried to
 * launch and a second product delivered through client demos. Foyez supplied
 * those facts separately, so this section states them plainly.
 *
 * SRS, STS, UIS and RTM stay spelled out on card 2 on purpose. What I Bring
 * deliberately avoids the acronyms because readability is the better pitch, but
 * they are recruiter and ATS keywords and need to be searchable somewhere on the
 * page. This is that somewhere.
 *
 * Card 1 says led QA across web, mobile and desktop, and stops there. It does
 * not say automated across three platforms, because automation is web only.
 * Those are two separate facts and merging them would be a false claim.
 *
 * Bullets rather than a paragraph, at Foyez's call. The first build put each role
 * in one block of running prose, which came out at 599 and 555 characters and
 * read as a wall. Nobody scans a wall. Bullets also match how a reader already
 * expects an experience section to be laid out, so the strongest claim on the
 * page (led QA end to end) now gets its own line instead of being buried
 * mid-sentence.
 *
 * One claim per bullet, front-loaded with the verb, so the left edge of the list
 * reads as a list of actions: Led, Drove, Delivered, Authored, Built.
 *
 * TULIPTECH IS SPLIT INTO TWO LABELLED GROUPS, and the copy below is Foyez's
 * own, supplied verbatim on 2026-07-30 and recorded in cv-data.txt under
 * EXPANDED TULIPTECH SCOPE. He owns the role, so he gets to say what it did.
 *
 * The two groups are the point of the split. Core QA work and agent-building are
 * genuinely different workstreams, and a flat eleven-bullet list would have
 * buried the second one. A reader skimming for "can this person own delivery"
 * and a reader skimming for "can this person build AI tooling" both find their
 * answer under a heading instead of hunting through prose.
 *
 * The first group is "QA Strategy & Execution", Foyez's wording, settled after
 * three rejected attempts. The history is worth keeping because each rejection
 * was for a different and legitimate reason:
 *
 *   "Quality Assurance Leadership" overclaimed. Only four of its six bullets are
 *   leadership (led two products, drove PharmaZ247 to launch, delivered LolerFlow
 *   through sign-off, mentored the junior engineer). Authoring SRS / FRD / RTM
 *   and designing and executing test cases in TestRail are individual-contributor
 *   work, and a heading that fits two thirds of its own list is the kind of thing
 *   an interviewer picks at first.
 *
 *   "Quality Assurance" was tautological. The job title directly above it is SQA
 *   Engineer, so the label repeated the role and told a reader nothing.
 *
 *   "Responsibilities" was accurate but generic. CV guidance advises against
 *   vague headings that convey no expertise, and against task-framing in place of
 *   achievement-framing. It shipped briefly before Foyez replaced it.
 *
 * The final label fits all six bullets without overclaiming: strategy covers the
 * leading and the documentation, execution covers the TestRail work and the
 * delivery. It also pairs as a contrast with the second group, which is what he
 * built rather than what he owns.
 *
 * The leadership signal does not depend on the label. The group opens on "Led
 * end-to-end QA for two client products" and closes on the mentoring bullet, so
 * the evidence is the first and last thing a reader meets either way, and What I
 * Bring card 1 carries the message as a title higher up the page.
 *
 * Only TulipTech is grouped. Shadhin and A1qa stay flat, because neither has two
 * distinct workstreams to separate, and inventing headings to make the cards
 * match would be symmetry for its own sake.
 *
 * KNOWN TRADEOFF, measured not guessed. These bullets are Foyez's wording and
 * they are long: the longest is 190 characters against the ~100 the previous
 * draft held to. At 390px that renders as a 9-line bullet, because a card only
 * gives about 223px of text width there, which measures 25 characters per line,
 * and it pushes this card to 2516px tall on a phone against 990px on a laptop.
 * Desktop is unaffected and reads well at 3 lines and 91 characters per line.
 * The copy is his call and it ships as written; the mobile cost is reported
 * rather than silently edited away.
 *
 * The `projects` chips carry the names the bullets have no room for. Card 3 has
 * none and renders without the row, rather than with an empty one.
 */
const experiences = [
  {
    role: "SQA Engineer",
    company: "TulipTech",
    years: "Mar 2026 - Present",
    groups: [
      {
        title: "QA Strategy & Execution",
        bullets: [
          "Led end-to-end QA for two client products, owning test strategy, execution, and stakeholder communication from development through release.",
          "Drove PharmaZ247, a multi-tenant pharmacy ERP and telehealth platform, from MVP to market launch, testing across web, mobile, and desktop clients under DGDA pharmacy compliance requirements.",
          "Delivered LolerFlow, a UK LOLER compliance platform with simPro integration, including client-facing demos and sign-off milestones.",
          "Authored business and requirement documentation post-testing (SRS, FRD, RTM) to formalise scope and traceability for stakeholders.",
          "Designed and executed test cases in TestRail, tracking coverage and results through structured test execution cycles and reporting.",
          "Mentored one junior QA engineer, reviewing test cases and providing hands-on guidance on execution standards.",
        ],
      },
      {
        title: "AI-Driven QA Automation",
        bullets: [
          "Built a suite of Claude Code agents automating core QA workflows, including test case authoring with direct TestRail import via API, significantly reducing manual documentation time.",
          "Developed agents generating Playwright automation scripts using the Page Object Model (POM) pattern, and API test collections in Postman, directly from Jira tickets and requirements.",
          "Created an exploratory testing agent that navigates business logic flows, captures defect screenshots, and files structured bug reports for both frontend and API issues.",
          "Built documentation-generation agents producing SRS, FRD, and RTM artifacts, with verification against Figma designs to ensure implementation accuracy.",
          "Designed an orchestrator layer coordinating outputs across the agent suite, serving as the sole Jira-facing interface and resolving conflicts between agent-generated results.",
        ],
      },
    ],
    projects: [
      {
        name: "PharmaZ247",
        url: "",
        summary:
          "A multi-tenant pharmacy ERP and telehealth platform: FEFO inventory under DGDA compliance, POS, and separate doctor and customer portals.",
      },
      {
        name: "LolerFlow",
        url: "",
        summary:
          "A multi-tenant SaaS platform for UK LOLER lifting-equipment inspection: assets, defects, certificates, audit packs and a simPro integration.",
      },
      {
        name: "StretchSense MDM",
        url: "",
        summary:
          "An enterprise XR device management platform for centralised device management, security and scalability.",
      },
      // The only TulipTech project with a link in the CV PDF.
      {
        name: "Empathika",
        url: "https://empathika.com/",
        summary:
          "An AI-powered care home management platform covering medication, care planning, HR and compliance.",
      },
    ],
  },
  {
    role: "QA Engineer",
    company: "Shadhin Technologies Ltd.",
    years: "Jun 2023 - Feb 2026",
    groups: [
      {
        title: null,
        bullets: [
          "Delivered QA across ten products on web and mobile.",
          "Covered requirement analysis through functional, regression, integration and UAT testing.",
          "Turned stakeholder conversations into structured SRS, STS and UIS documents.",
          "Maintained a Requirements Traceability Matrix (RTM) linking requirements to test cases and defects.",
          "Contributed to the Playwright, Cypress and Selenium automation effort and its CI execution.",
          "Mentored QA interns on requirement analysis and documentation standards.",
        ],
      },
    ],
    /*
      Ten, ordered by Foyez's own ranking rather than by the CV. He set the
      sequence explicitly on 2026-07-30: Purbachol, Quran with Maryam, the two
      NRB products, Billions for Bangladesh, Host-A-Akhor, Docadvisor, Looop
      Denki, postJini, Black Pigeon HR.

      That replaces the previous rule, which was CV order with the two non-CV
      projects appended. His ranking wins because he knows which of these carry
      the most weight and a reader scans a row left to right, so the strongest
      work belongs at the front. Eight are on the CV; NRBFS and postJini are not.

      An earlier version named only three and let the count bullet carry the rest,
      which undersold a genuinely broad track record for no gain.

      The bullet says "ten products" and the row holds ten chips. Those two
      numbers have to move together, so changing one without the other is the
      obvious way for this card to start lying. It has already had to move twice,
      eight to nine to ten, in a single afternoon.

      URLs are the ones embedded as hyperlink annotations in the CV PDF, read out
      of the file rather than retyped, then each one checked with a real request.
      Seven of the eight CV links returned 200.

      Two exceptions, both deliberate:
        NRB World: the CV points at https://app.nrbworld.org/, which resolves to
        13.213.186.11 but times out on connect. The apex nrbworld.org answers
        200, so the chip uses that. The CV itself still needs fixing.
        Black Pigeon HR: no link in the CV, and the CV marks it ongoing. It
        renders as a plain chip rather than a broken one.

      "Purbachol Water Supply" is shortened from the CV's "Purbachol Water Supply
      Project (PWSP)". The full string is about 250px as a chip, wider than the
      245px a card gives at 390px, so it would have overflowed on a phone.
    */
    projects: [
      // Purbachol: Foyez's replacement for the CV's app.rajukpws.com/login. Both
      // answer 200, so this is not a broken-link fix: it swaps a login form for
      // the public landing page, the more useful destination for a reader who
      // has no account and will not be creating one.
      {
        name: "Purbachol Water Supply",
        url: "https://www.rajukpws.com/",
        summary: "An automated water billing management system.",
      },
      {
        name: "Quran with Maryam",
        url: "https://www.maryamandfatima.com/",
        // Condensed from the CV's 160-character original, which is the longest
        // project line on the whole document and too long for a tooltip.
        summary:
          "A mobile and web platform for listening to and learning the Quran and Dua, and for hiring knowledgeable individuals for Islamic events.",
      },
      /*
        The two NRB products sit together because Foyez ranked them that way.
        Note this is the opposite of an earlier decision in this file, which
        deliberately separated them so the shared prefix would not imply a
        relationship. His ranking overrides that: he knows whether they are
        related and it is his track record.

        NRB World uses the App Store listing, the live canonical product now that
        the CV's app.nrbworld.org is dead. Country code deliberately dropped:
        Foyez supplied apps.apple.com/ci/app/nrb-world/id6474484953, and that
        /ci/ segment pins every visitor to the Cote d'Ivoire storefront. The
        country-less form is the same app ID, also 200, and sends each visitor to
        their own storefront.

        nrbworld.org also answers 200 and would work in any browser, where an App
        Store link only helps iOS visitors. Foyez's rule is app where an app is
        the product, web where web is, so the App Store link stays.

        NRBFS is "NRB Family Support", read off its own Play Store listing rather
        than assumed. An earlier note here guessed "FS" might mean Financial
        Services. It does not. That is exactly why the chip shipped as a bare
        name until the link arrived.
      */
      {
        name: "NRB World",
        url: "https://apps.apple.com/app/id6474484953",
        summary:
          "A business networking platform designed for Bangladesh's non-residents.",
      },
      {
        name: "NRBFS",
        url: "https://play.google.com/store/apps/details?id=com.nrbfs.nrbfs&hl=en",
        // Not from the CV. Taken from the app's own Play Store listing, which
        // describes it as a "trusted digital gateway for essential services".
        summary:
          "NRB Family Support, a digital gateway for essential services.",
      },
      {
        name: "Billions for Bangladesh",
        url: "https://billionsforbangladesh.com/",
        summary:
          "A platform with the aim of raising billions of dollars for Bangladesh.",
      },
      {
        name: "Host-A-Akhor",
        url: "https://www.hostakkhor.com/",
        summary: "A platform for storing old writings and voices.",
      },
      {
        name: "Docadvisor",
        url: "https://www.docadvisor.xyz/",
        summary: "A generative AI-based doctor recommendation system.",
      },
      {
        name: "Looop Denki",
        url: "https://looop-denki.com/home/",
        summary: "An electricity billing management system of Japan.",
      },
      // The two without links land last, which is a useful side effect of the
      // ranking rather than the reason for it: the row now runs linked chips
      // first and plain ones at the end, so the clickable group reads as a block.
      {
        // "PostJini", capital P, confirmed by Foyez on 2026-07-30. He first wrote
        // it as "postJini" and that shipped verbatim while the styling was
        // unconfirmed; this is the settled spelling.
        name: "PostJini",
        url: "",
        // Foyez's own description. Not on the CV.
        summary:
          "Schedules and publishes social media posts to Facebook, Instagram and X.",
      },
      {
        name: "Black Pigeon HR",
        url: "",
        summary: "A platform to make the hiring process easy. Ongoing.",
      },
    ],
  },
  {
    role: "Functional Testing (Intern)",
    company: "A1qa",
    years: "Apr 2023 - Jun 2023",
    groups: [
      {
        title: null,
        bullets: [
          "Tracked and documented defects through to resolution.",
          "Managed tasks, sprint planning and issue tracking in Jira.",
          "Designed test surveys to surface issues early.",
        ],
      },
    ],
    projects: [],
  },
];

export function Experience() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          {/*
            Ramps down at the narrow end per the responsiveness gate, and still
            resolves to text-5xl from 640px up so it matches every other section
            heading on desktop.
          */}
          <h2 className="text-4xl sm:text-5xl font-bold">Experience</h2>
          {/*
            Replaces template copy ("across different scales and industries",
            which claimed a breadth of industry nobody had checked). This states
            the actual arc of the three cards below: the intern role tracked
            defects someone else triaged, the current role signs off releases.
          */}
          <p className="text-lg text-muted-foreground">
            Three roles, one direction: from tracking defects to owning the release
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.company} className="relative group">
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold">{exp.role}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground tabular-nums px-3 py-1 bg-background/50 border border-border/50 rounded-lg">
                    {exp.years}
                  </span>
                </div>
                {/*
                  One block per workstream. A group with no title renders just
                  its list, so the single-group roles are not paying for a
                  heading they do not have.

                  list-disc is needed explicitly: the Tailwind base layer strips
                  list styling from every ul, which is what the project chip row
                  below relies on. Markers are tinted to match the company line
                  rather than left at full-strength foreground, so they punctuate
                  the list without competing with the text.

                  max-w-3xl caps the reading measure. The card itself is 960px of
                  usable width at desktop, and bullets were rendering 938px wide,
                  which measured 121 characters on one line. That is well past the
                  point where the eye reliably finds the start of the next line,
                  and readability is the entire reason these are bullets rather
                  than a paragraph. Capped, the longest sits around 91.
                */}
                <div className="mt-5 space-y-5">
                  {exp.groups.map((groupItem) => (
                    <div key={groupItem.title ?? "ungrouped"}>
                      {groupItem.title && (
                        /*
                          h4 keeps the outline intact: h2 Experience, h3 role,
                          h4 workstream. Sized well below the h3 so it reads as a
                          divider inside the card rather than competing with the
                          job title, and left at full foreground so it separates
                          cleanly from the muted bullet text underneath.
                        */
                        <h4 className="mb-2 text-sm font-semibold tracking-wide text-foreground">
                          {groupItem.title}
                        </h4>
                      )}
                      <ul className="space-y-2 list-disc pl-5 max-w-3xl marker:text-blue-400/70">
                        {groupItem.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-muted-foreground leading-relaxed pl-1"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {exp.projects.length > 0 && (
                  /*
                    Stacked below sm, one row from sm up. Deliberately NOT a plain
                    flex-wrap, which orphans a chip on the last line across a wide
                    band of widths.

                    The chips are fixed-width pills, so the wrap is arithmetic and
                    was checked rather than eyeballed. The widest set needs 444px
                    on one line; the narrowest container at sm is 512px, so from
                    640px up neither set ever wraps. Below that the column stack
                    gives a uniform list instead of a ragged 2+1, which is the
                    only balanced option once a 146px chip cannot share a 245px
                    line with anything.

                    A flex-wrap here orphaned Shadhin as 2+1 from roughly 400px to
                    485px and TulipTech as 2+1+1 in the low 300s. Sampling only
                    390, 800, 1280 and 1920 reported clean, because 390 happens to
                    miss the bad band by 2px.

                    sm:max-w-lg is the second half of the fix, and it is load
                    bearing. Adding NRBFS as a ninth chip reintroduced an orphan:
                    the row wrapped 4+4+1 with NRBFS stranded alone, across every
                    viewport from 746px to 822px.

                    512px is not a round number picked by eye. The wrap was solved
                    arithmetically for both chip sets across every viewport from
                    640 to 1920, and 512 is the largest cap that is orphan-free
                    for both AND lands on a Tailwind scale value. It also happens
                    to equal the narrowest container the row ever gets at sm, so
                    the cap pins the width identically at every desktop size,
                    giving one layout that never reflows while resizing rather
                    than a row that reshuffles as the window moves.

                    Current layout: TulipTech's four on one line, Shadhin's ten as
                    3+3+4.

                    THIS CAP IS TUNED TO THESE EXACT STRINGS and must be re-solved
                    whenever a chip is added, renamed, or gains an icon. It has
                    already survived one such change: adding postJini as a tenth
                    chip and turning NRBFS into a link, which widened it by the
                    external-link icon, moved the layout from 3+3+3 to 3+3+4 but
                    left 512px valid. That was re-derived, not assumed.
                  */
                  <ul
                    aria-label={`Projects at ${exp.company}`}
                    className="flex flex-col items-start gap-2 mt-5 sm:flex-row sm:flex-wrap sm:max-w-lg"
                  >
                    {exp.projects.map((project) => (
                      <li key={project.name}>
                        {/*
                          Every chip carries its one-line summary on hover AND on
                          keyboard focus. Radix handles both, and wires
                          aria-describedby from the trigger to the content, so a
                          screen reader announces the summary rather than it being
                          purely visual.

                          delayDuration 200 rather than the component default of
                          0. With ten chips in a row, a zero delay fires a tooltip
                          for every chip the cursor crosses on its way somewhere
                          else, which flickers.

                          KNOWN LIMITATION, stated rather than papered over: Radix
                          deliberately does not open tooltips on touch, because a
                          tap has to activate the link instead. So a phone user
                          sees no summary. The text equivalent for them is the
                          /projects page in Module 6, where these same
                          descriptions are always-visible text rather than a
                          hover. Until that page exists, touch users get the
                          project name and the link, which is what they had
                          before this change.
                        */}
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            {project.url ? (
                              /*
                                A chip is a link ONLY when it has a real URL. The
                                unlinked ones render as a span with no pointer
                                cursor and no icon, so nothing on this row looks
                                pressable unless it goes somewhere.

                                The icon matters beyond decoration: it is the only
                                non-hover signal telling a reader which chips are
                                clickable. Colour alone would not survive a
                                greyscale print or a colour-blind reader.

                                no-underline is explicit and stays. Nothing
                                underlines these today, because the Tailwind base
                                layer makes an anchor inherit text-decoration
                                rather than default to underline, but that is a
                                reset detail rather than a decision. Foyez asked
                                for no underline on a project name, so it is
                                pinned here rather than left to depend on the
                                reset surviving a Tailwind upgrade.
                                hover:no-underline covers the hover state too,
                                which a resting computed style would not catch.
                              */
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={`${project.name}, opens in a new tab`}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-background/50 border border-border/50 rounded-lg text-xs text-foreground/80 no-underline transition-colors hover:text-foreground hover:border-blue-400/50 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                              >
                                {project.name}
                                <ExternalLink
                                  className="h-3 w-3 shrink-0 opacity-60"
                                  aria-hidden
                                />
                              </a>
                            ) : (
                              /*
                                tabIndex 0 on a non-interactive span looks wrong at
                                a glance, and is correct here. The ARIA tooltip
                                pattern requires the trigger to be focusable, and
                                without it a keyboard user could never read the
                                summaries for the two chips that have no link.

                                It does not turn the chip into a fake button: no
                                pointer cursor, no icon, no href, nothing happens
                                on Enter. What it gains is the same summary the
                                other eight expose.
                              */
                              <span
                                tabIndex={0}
                                className="inline-block px-3 py-1 bg-background/50 border border-border/50 rounded-lg text-xs text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                              >
                                {project.name}
                              </span>
                            )}
                          </TooltipTrigger>
                          {/*
                            max-w-xs is load bearing. TooltipContent ships with
                            w-fit and no cap, so the 137-character Quran with
                            Maryam summary would render as one enormous single
                            line straight off the side of the viewport.

                            text-wrap:wrap overrides the text-balance that
                            TooltipContent sets in its own base classes, and it is
                            a fix rather than a preference.

                            The box is w-fit capped at 320px, so its width is
                            min(max-content, 320). text-balance then equalises line
                            lengths, which shortens EVERY line, so text sat around
                            165px to 230px inside a 320px box and left dead space
                            down the right. Measured worst case: 56 percent filled.

                            text-pretty was tried first and is NOT enough. It fixed
                            the long summaries but Chrome still balances short
                            two-line paragraphs to avoid a stubby last line, so
                            "An automated water billing management system." still
                            split into two 165px lines inside a 320px box.

                            Plain greedy wrapping is what actually fills the box:
                            each line runs to the cap, and a short summary that
                            fits on one line makes w-fit shrink the box to hug it.

                            IT HAS TO BE AN INLINE STYLE, not a class. Overriding
                            with the arbitrary utility [text-wrap:wrap] was tried
                            and silently failed: the declaration was generated into
                            the CSS, but text-balance and text-wrap:wrap set the
                            same property, both classes survived on the element,
                            and Tailwind's own source order decided the winner.
                            Computed style still read "balance". A class cannot
                            reliably beat a class from the same layer, so the style
                            attribute is used, which always wins. Verified by
                            reading getComputedStyle rather than trusting the
                            class list.

                            Measured effect: worst dead space on any box went from
                            131px to 46px, and the least-filled box from 56 percent
                            to 84 percent.

                            An explicit width:max-content was also tried here, to
                            make short summaries hug instead of sitting in a 320px
                            box. It changed the numbers by exactly nothing, because
                            Radix's popper constrains the width itself, so it was
                            removed rather than left in looking load bearing.

                            The 46px worst case that remains is ordinary word wrap:
                            the next word does not fit the leftover space, so it
                            moves down. Short of hyphenation or justified text that
                            is as tight as wrapped prose gets.
                          */}
                          <TooltipContent
                            className="max-w-xs leading-relaxed"
                            style={{ textWrap: "wrap" }}
                          >
                            {project.summary}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
