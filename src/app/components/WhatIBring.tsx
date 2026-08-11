/*
  ICONS CHOSEN FOR WHAT THEY SAY, not for topic adjacency. Foyez asked twice for better
  icons and the first pass only removed their backgrounds, which was not the ask.

  The four they replace were all gestures at a subject rather than statements about it:
    ShieldCheck  read as SECURITY. Nothing about owning delivery or growing a team.
    Bot          a generic robot. Says "AI" and nothing about a pipeline.
    FileText     a blank page. Says "document", not "readable" or "handed over".
    Layers       stacked rectangles. Means nothing specific about automation at all.

  The replacements each carry the card's actual claim:
    UserCheck    a person with a tick. Ownership and mentoring, which is the card.
    Workflow     a branching flow. Literally a pipeline, which is the card.
    BookOpen     an open book. Something a NEXT PERSON reads, which is the card.
    Repeat       a loop. Suites that keep running long after the first sprint.
*/
import { BookOpen, Repeat, UserCheck, Workflow } from "lucide-react";

/**
 * Every claim on these four cards traces to the CV or a public repo.
 *
 * The four cover the full lifecycle rather than describing execution three
 * times: own it, automate it, document and hand it over, run it. Leadership is
 * card 1 by request, and cards 1 and 3 both use "hand over" on purpose so they
 * reinforce the hero subtitle instead of reading as unrelated bullets.
 *
 * Card 3 deliberately avoids naming SRS, STS, UIS and RTM. The selling point is
 * that a newcomer can read the docs, not the acronyms. Those keywords stay in
 * the Experience section, where recruiters and ATS filters can still find them.
 *
 * Card 4 says WEB suites, and the precision is deliberate. Testing covers web,
 * mobile and desktop; automation is web. Those are two separate facts and this
 * card is only about automation, so merging them would overstate it. The wider
 * platform scope is stated in Experience and Featured Work, where it belongs.
 */
/*
  EVERY TAG TRACES, and none of them is a new claim. R5 applies to a three-word badge
  exactly as it does to a sentence, and a keyword row is the easiest place on a page to
  quietly add a skill nobody can back up.

  Each tag below is either named in the card's own description or in cv-data.txt:
    Test planning, Test execution,               cv 33 and 184 for planning, 116 and
    Release sign-off, Mentoring                  190 for execution, 194 for mentoring,
                                                 plus the TulipTech leadership bullets
    Claude Code, MCP, TestRail API, Playwright   cv 122 to 127 and 323 to 324, which
                                                 names Playwright MCP and Chrome
                                                 DevTools MCP explicitly
    SRS, FRD, RTM, User manuals                  cv 114 lists "SRS, FRD, RTM" exactly;
                                                 user manuals at 178
    Playwright, JavaScript, POM, CI/CD           cv 60, 318 and 190, and the card text

  FOUR TAGS PER CARD NOW, up from three at Foyez's request. The earlier comment here
  warned that a fourth would reopen the wrap arithmetic, and it did: see the reserve
  note on the badge row below, which had to be re-measured for three lines.

  "POM" RATHER THAN "Page Object Model", and it is a fit decision rather than a style
  one. Measured at 900px: the three tags needed 324px against 329px available, a 5px
  margin that is coincidence rather than headroom, and at 768px where the two-column
  grid starts they wrapped and misaligned across the row. "Page Object Model" was the
  widest tag at 137px. The card's own description spells the term out in full two lines
  above, so the abbreviation loses nothing.

  REVISED AT FOYEZ'S REQUEST, and one of his asks was declined on R5 grounds. He wanted
  TypeScript on card 4. It appears NOWHERE in cv-data.txt as a skill: line 318 reads
  "Python, JavaScript, HTML, and CSS". TypeScript was removed from the hero chips
  earlier in this same session for exactly that reason, so adding it here would have
  reintroduced the problem one section down. He chose JavaScript instead, which the CV
  does claim and which Playwright specs are written in either way.

  Cypress was dropped from card 4 at his request even though the CV supports it, since
  the card is about the automation approach and Playwright plus the POM says that more
  sharply. "User manuals" made way for FRD.

  THREE PER CARD, NOT FOUR OR FIVE. Three fits one line at every width this grid
  produces, so the row cannot wrap and unbalance the cards it was added to balance.
*/
const capabilities = [
  {
    icon: UserCheck,
    title: "Owns Delivery, Grows the Team",
    description:
      "Hand over a product and quality is owned end to end, from test strategy to release sign-off. Leads QA on client products and trains juniors and interns.",
    tags: ["Test planning", "Test execution", "Release sign-off", "Mentoring"],
  },
  {
    icon: Workflow,
    title: "Autonomous AI QA Pipelines",
    description:
      /*
        LENGTHENED, and the added words are facts the card was missing rather than
        padding. Foyez saw a gap between this description and its badge row, and it was
        measurable: 106 characters here against 178 on card 3, which under R3's
        equal-height rule left a 52px hole where card 3 had none.

        Filling a layout gap with prose is usually the wrong move, and it would have
        been here too if the extra words said nothing. These say two things the card
        omitted entirely, both from cv-data.txt lines 122 to 134: the agents start from
        JIRA TICKETS, which is what makes the pipeline autonomous rather than a set of
        scripts someone runs, and an ORCHESTRATOR coordinates them, which is the part
        no other section explains at this level.

        Now 176 characters, within two of card 3, so the gap closes because the content
        genuinely balances rather than because the box was stretched.
      */
      "Agents that read a Jira ticket, write the test cases, push them to TestRail, generate Playwright specs, run the suite and report, with an orchestrator coordinating the handoffs.",
    tags: ["Claude Code", "MCP", "TestRail API", "Playwright"],
  },
  {
    icon: BookOpen,
    title: "Written for the Next Person",
    description:
      "Client conversations turned into specs, reports and user manuals plain enough for a new joiner to pick up and run with, every requirement traced through to its tests and defects.",
    tags: ["SRS", "FRD", "RTM", "User manuals"],
  },
  {
    icon: Repeat,
    title: "Automation Built to Last",
    description:
      "Web suites in Playwright, Cypress and Selenium on a strict Page Object Model, wired into CI so they keep paying off long after the first sprint.",
    tags: ["Playwright", "JavaScript", "POM", "CI/CD"],
  },
];

export function WhatIBring() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          {/* Ramped in Module 11, along with every other section heading. */}
          <h2 className="text-4xl sm:text-5xl font-bold">What I Bring</h2>
          <p className="text-lg text-muted-foreground">
            Engineering capabilities that improve team velocity and product quality
          </p>
        </div>

        {/*
          auto-rows-fr, found 2026-07-31 while verifying an unrelated change.

          Without it the two grid rows size independently, so the four cards in one
          grid were not the same height: measured 256px on the top row against 282px
          on the bottom at 1280px. R3 asks for identical boxes across a grid, not
          just across a row, and this is the exact "small big" mismatch Foyez
          reported on Agents & Automation, which was fixed there and left here.
        */}
        <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex h-full flex-col bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 backdrop-blur-sm">
                  {/*
                    THE TINTED BOX IS GONE, at Foyez's request. It was a 56px
                    bg-blue-500/10 tile holding a 28px glyph, which made these the
                    largest and heaviest icons on the site and left four blue tiles
                    reading as the subject of the section instead of the titles.

                    It was also inconsistent. The site had three different icon
                    treatments: 56px boxed here, 48px boxed in QA + AI, and a bare
                    16 to 18px glyph in Automation-First and Skills & Tools. This
                    now matches the bare-glyph pattern, which is the one used by the
                    two most recently built sections.

                    ARIA-HIDDEN ADDED, which was missing. Every other decorative
                    icon on the site carries it. Without it a screen reader can
                    announce the glyph alongside the title it decorates, which is
                    the R9 rule these four were quietly breaking.

                    space-y-4 dropped to space-y-3 on the card. The old spacing was
                    tuned around a 56px block; with a 20px glyph the same gap left
                    the icon floating away from the title it labels. This is the
                    same correction Automation-First already needed when Foyez
                    reported its label sitting too far from its icon.
                  */}
                  <div className="space-y-2">
                    {/*
                      A RAMP PLUS A RESERVE, and it needed both. Measured every 8px
                      from 320 to 1920, not sampled.

                      The break: at a flat text-2xl, "Automation Built to Last" fits
                      one line from 856px while "Written for the Next Person" still
                      needs two, so the two descriptions in that row started 32px
                      apart inside cards of identical height.

                      Holding text-xl until lg was tried first, on its own, because
                      that alone fixed the same problem in ProjectCard. It is NOT
                      enough here: these four titles are close in length and cross
                      the wrap threshold at different points, so shrinking the type
                      only moved the mismatch, from 856 to 1016 down to 768 to 808
                      on the bottom row and 840 to 848 on the top row.

                      So the ramp keeps the type honest and the reserve holds two
                      lines of text-xl, 56px, through the md two-column range where
                      the wrap is uneven. It is released at lg, where all four fit
                      on one line at text-2xl and a reserve would only add
                      whitespace. Below md the grid is a single column, so each card
                      is its own row and parity cannot break.
                    */}
                    {/*
                      THE ICON SITS ON THE TITLE LINE, at Foyez's request, rather
                      than stacked above it. Same pattern as Automation-First and
                      Skills & Tools, where the glyph and the label it belongs to
                      read as one unit instead of as two rows.

                      THE RESERVE MOVED OFF THE h3 AND ONTO THIS ROW, and that
                      detail is load bearing. md:min-h-[3.5rem] holds two lines of
                      text-xl through the md two-column range, where these four
                      titles wrap at different widths. Left on the h3 while the h3
                      is a flex ITEM, the reserve makes the h3 taller than its text
                      and items-start then pins the glyph to the top of that padded
                      box, so the icon and the first line of text stop agreeing.
                      Putting the min-h on the flex CONTAINER keeps the row the
                      right height and lets both children sit on the same baseline.

                      items-start, not items-center: with a title that wraps to two
                      lines, centring would float the glyph to the middle of the
                      block instead of beside the first line, which is where a mark
                      labelling a heading belongs.

                      mt-0.5 nudges the 20px glyph down onto the cap height of the
                      text next to it. Optical alignment: an icon's bounding box is
                      taller than the letterforms, so matching the box tops leaves
                      the glyph looking a couple of pixels high.

                      THE RESERVE NOW RUNS THROUGH lg AND IS RELEASED AT xl, and
                      that change is the direct consequence of putting the icon on
                      this line. It was lg:min-h-0, released at 1024, which was
                      correct while the title had the full card width to itself.

                      Adding the glyph and its 10px gap costs the title about 30px
                      of line, which moves the wrap threshold right. Caught at
                      exactly 1024 by sweeping every 8px from 768 to 1024: card
                      heights still matched at 242px, but the two descriptions in
                      the top row started 32px apart, 4137 against 4105, because
                      "Owns Delivery, Grows the Team" now needs two lines at
                      text-2xl where "Autonomous AI QA Pipelines" needs one. R3 asks
                      for contents to line up, not just for boxes to match, so equal
                      heights alone was not good enough.

                      xl is where the two-column track is wide enough that all four
                      fit on one line WITH the glyph, so the reserve can be dropped
                      without the mismatch coming back.

                      TWO RESERVE SIZES, BECAUSE THE TYPE RAMPS. The title is
                      text-xl to lg and text-2xl from lg, and a reserve has to hold
                      two lines of whatever size is actually rendering:

                          text-xl   line-height 28px  ->  56px, the md value
                          text-2xl  line-height 32px  ->  64px, the lg value

                      Running the 56px reserve into the text-2xl range left it 8px
                      short of two lines, which showed up as the two descriptions in
                      the top row starting 8px apart across 1024 to 1080. Measured,
                      not derived: the wrapping title's row was 64px against 56px
                      for its neighbour.
                    */}
                    <div className="flex items-start gap-4 md:min-h-[3.5rem] lg:min-h-[4rem] xl:min-h-0">
                      {/*
                        NO BACKGROUND, A BIGGER GLYPH. This icon has now been through
                        three treatments and the sequence is worth recording, because
                        each step was a real correction rather than churn.

                          56px tinted tile   original. Removed as the heaviest icon
                                             treatment on the site; four blue blocks
                                             read as the section's subject instead of
                                             the titles.
                          20px bare glyph    overcorrected. Measured against every other
                                             card section, this left What I Bring the
                                             only one with no visual device at all.
                          44px tinted tile   restored an anchor, and Foyez rejected the
                                             tile look again.
                          28px bare glyph    here. Keeps the anchor by SIZE rather than
                                             by a box, which is the one axis the
                                             previous three never tried.

                        The lesson: the problem was never whether the icon had a box,
                        it was that a 20px glyph is too small to anchor a 568px card.
                        28px is large enough to hold the corner without a container.

                        group-hover brightens the glyph itself with the card's existing
                        hover glow, so the icon still participates in the interaction.
                        Colour only, per R8.
                      */}
                      <Icon
                        className="mt-1 h-7 w-7 shrink-0 text-blue-400 transition-colors duration-300 group-hover:text-blue-300 motion-reduce:transition-none"
                        aria-hidden
                      />
                      <h3 className="text-xl lg:text-2xl font-semibold">
                        {capability.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>

                  {/*
                    THE KEYWORD ROW, filling the space that made these cards look
                    hollow. Measured before it: 15 to 38 percent of each card was empty
                    below the text, worst on the AI card at 85px of nothing, because
                    R3's equal-height rule pins all four to the tallest while their
                    descriptions differ by two lines.

                    The fix is not to close the gap but to put something in it. Foyez
                    chose badges over shrinking the cards, and they earn their place
                    twice: they give a recruiter scannable keywords, and they match the
                    badge language Featured Work already uses, so this is the site's own
                    vocabulary rather than a new device.

                    mt-auto IS THE WHOLE MECHANISM. It pushes the row to the bottom of
                    the flex column, so the badges sit on the card's base rather than
                    directly under text of varying length. That means they line up
                    across a row even though the descriptions do not, which turns the
                    uneven whitespace from a ragged gap into a deliberate margin.

                    The card needed flex flex-col for that to work; it was a plain block
                    with space-y before.

                    aria-hidden on the row. Every tag repeats a word already present in
                    the card's title or description, so a screen reader would hear
                    "TestRail" twice in ten seconds. The badges are a visual index, not
                    new information.
                  */}
                  <ul
                    className="mt-auto flex min-h-[5rem] flex-wrap content-end gap-1.5 pt-5 sm:gap-2 xl:min-h-0"
                    aria-hidden
                  >
                    {capability.tags.map((tag) => (
                      <li
                        key={tag}
                        className="whitespace-nowrap rounded-md border border-border/60 bg-background/40 px-2 py-1.5 text-[11px] leading-none text-muted-foreground sm:px-2.5 sm:text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
