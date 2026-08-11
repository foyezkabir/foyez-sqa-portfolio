import {
  Bot,
  Compass,
  FileInput,
  ListChecks,
  Play,
} from "lucide-react";

/**
 * MODULE 3. HOW FOYEZ WORKS, as a five-step flow. He asked for this directly:
 * requirements in, handed to the agents, explore the site against the business and
 * write the test plan, execute it, then list the issues ready for a dev fix.
 *
 * WHY THIS IS NOT THE PIPELINE THIS FILE ALREADY HAD REMOVED TWICE, which matters
 * because the distinction is the only thing keeping it out of QA + AI's lane:
 *
 *   QA + AI      WHAT EACH AGENT IS. Named: qa-tc-writer reads the ticket and the
 *                Figma frames and imports to TestRail through its API,
 *                qa-script-writer writes Playwright specs on a decoupled Page
 *                Object Model, qa-api-tester builds the Postman collection,
 *                qa-hawk walks the feature and files the defects.
 *   this section HOW FOYEZ WORKS. A process, start to finish, with the delegation
 *                in the middle of it. No agent is named, no tool is named.
 *
 * SO THE RULE FOR EDITING THIS FILE: no agent names, no tool names, no counts of
 * agents, no orchestrator. The moment a tile says "qa-hawk" or "TestRail" this
 * becomes the third telling of QA + AI and goes dull again, which is exactly what
 * happened when it was a four-step pipeline of "authors cases, generates specs,
 * files defects, writes the report". Process words only.
 *
 * EVERY STEP TRACES TO cv-data.txt.
 *   1  "Skilled in requirement analysis, test planning, and end-to-end
 *      validation", line 33, which is nearly this flow stated in one sentence.
 *      Inputs are "Jira tickets and requirements", line 126, and Figma designs,
 *      line 131.
 *   2  "Built a suite of Claude Code agents automating core QA workflows", line
 *      122. The delegation is the point of the section above it.
 *   3  "an exploratory testing agent that navigates business logic flows", line
 *      127, plus "test planning" from line 33. Explore first, then plan, which is
 *      the order Foyez described and the order that makes the plan worth anything.
 *   4  "Performed functional, regression, integration, and UAT testing", line 179.
 *   5  "captures defect screenshots, and files structured bug reports for both
 *      frontend and API issues", lines 128 to 129.
 *
 * NUMBERS RATHER THAN ARROWS BETWEEN TILES, and this was learned the hard way
 * earlier today. Arrows only read horizontally. This grid is five across at lg,
 * three then two at sm and one per row on a phone, so any arrow either points the
 * wrong way or has to be hidden, and a flow whose direction disappears on a phone
 * is not a flow. 01 to 05 survives every reflow and is in the document order too,
 * since the list is an <ol>.
 *
 * THE COLUMN COUNTS AVOID AN R4 ORPHAN, and this was re-solved after Foyez checked
 * the section on an iPad mini and asked whether the flow still read correctly. It did
 * not.
 *
 * sm:grid-cols-3 wrapped 3 + 2 at EVERY width from 640 to 1023px, which is the entire
 * tablet band: iPad mini portrait 768, iPad Air 820, iPad Pro 11 inch 834. Measured
 * one empty cell in the last row at all of them.
 *
 * For a five-STEP FLOW that is worse than an ordinary unbalanced wrap. The reader goes
 * 01, 02, 03 along the first row, then jumps back to the far left for 04 and 05, so
 * the left-to-right reading that carries the sequence breaks in the middle. A gap in a
 * grid of unordered cards is untidy; a gap in a pipeline misstates the process.
 *
 * FIVE ITEMS CANNOT WRAP EVENLY INTO 2, 3 OR 4 COLUMNS. 2 gives 2+2+1, 3 gives 3+2,
 * 4 gives 4+1. Only 1 and 5 divide it, so the fix is not a better wrap but no wrap at
 * all: one per row on a phone, five across from md up.
 *
 * md, NOT sm, and the 128px difference matters. At sm the tiles are 103 to 123px wide
 * and "Requirements" cannot fit or hyphenate inside one: measured card scrollWidth 119
 * against clientWidth 101, so the word was clipped from 640 to 720px. hyphens-auto did
 * not rescue it. md starts the row at 768px where a tile is 128px, which holds every
 * title. Between 640 and 767 the single-column stack is correct: it is unambiguous
 * about order and nothing is cramped.
 *
 * gap-3 rather than gap-4 below lg, because five tiles at 640px leave roughly 108px
 * each and the gap is competing with the tile's own padding for that width. It steps
 * back to gap-4 at lg where there is room.
 */
const steps = [
  {
    n: "01",
    title: "Requirements",
    detail: "Tickets, specs and designs",
    Icon: FileInput,
  },
  {
    n: "02",
    /*
      THIS TILE WAS MEANINGLESS AND FOYEZ CALLED IT. It read "To the agents /
      The repetitive half, unattended", which names no agent, says whose they are,
      and never says what "the repetitive half" is. That is what the
      no-agent-names rule above costs if it is applied without thinking: the other
      four tiles describe an action, so they survived losing the proper nouns.
      This one IS the handover, so stripping the nouns left nothing behind.

      Two things came out of it after that, both at Foyez's instruction. "Claude
      Code" went, because naming a vendor broke this file's own
      process-words-only rule and was redundant anyway: the hero chip says "AI
      Agents", the repo cards carry "Claude Code agents" as their stack and QA + AI
      names the tooling. Then "I built" went too.

      SO THE TILE CANNOT LEAN ON AUTHORSHIP, and it does not need to. Agents &
      Automation carries six public repos under Foyez's own GitHub account, which
      proves he built them far better than a sentence claiming it does. This tile
      only has to say what happens at the handover, which is that something takes
      over and nobody supervises it from that point. "Unattended" is the load
      bearing word, not "I built".
    */
    title: "Delegated",
    detail: "The agent suite takes over, unattended",
    Icon: Bot,
  },
  {
    n: "03",
    /*
      "Explore, then plan" fitted its tile with only 10px to spare at 1024px,
      where this grid is at its narrowest. That is not a margin, it is a
      coincidence: one different scrollbar width or font metric and it wraps,
      which starts the detail text at a different height than its neighbours and
      breaks the row. Shortened. The ordering the longer title carried, explore
      BEFORE planning, is in the detail line instead, where there is room for it.
    */
    title: "Explore & plan",
    detail: "Business flows walked first, then the plan",
    Icon: Compass,
  },
  {
    n: "04",
    title: "Execute",
    detail: "Functional, regression and API",
    Icon: Play,
  },
  {
    n: "05",
    title: "Issues listed",
    detail: "Structured reports with evidence, ready for a fix",
    Icon: ListChecks,
  },
] as const;

export function AutomationFirst() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Automation-First Quality Engineering
          </h2>
          {/*
            SETS UP THE FLOW BELOW, AND NOW ACTUALLY DESCRIBES IT. The previous
            line was "handing the repetitive half of the job to machines, and
            keeping the half that needs judgement", which Foyez challenged: does it
            cover the agent flow, and is the time saving mentioned? It did neither.
            "The repetitive half" named nothing, "machines" is vaguer than "agents
            I built", and there was no mention of time at all.

            It now names the endpoints, which are tiles 01 and 05, and what the
            agents absorb, which is tiles 02 to 04. So the sentence and the tiles
            describe the same thing instead of sitting next to each other.

            THE TIME CLAIM IS QUALITATIVE ON PURPOSE. cv-data.txt line 52 says
            Foyez authored test cases and imported them through the TestRail API,
            "significantly reducing test documentation time". That is his own CV
            wording and it supports saying the time went into documentation and
            came back. It does NOT support a number, and this template shipped with
            invented ones: "80% coverage improvement", "60% execution time
            reduced", "Scaled testing 10x", all recorded as sourceless in
            cv-data.txt line 423. No figure goes here without Foyez measuring one.
          */}
          {/*
            WIDENED FROM 2xl TO 3xl, at Foyez's request to use the space, and it
            stays centred under the heading rather than moving left.

            2xl measured 672px, about 53 characters, which is narrow enough that
            this three-sentence line ran to four wrapped rows inside a 1152px
            section and left most of the width empty. 3xl is 768px, roughly 61
            characters, which is comfortably inside the 45 to 90 range for prose
            and takes a row out of the block.

            It is NOT taken to the full section width. This is a centred
            introductory line under a centred heading, and centred text needs a
            tighter measure than left-aligned text: both edges are ragged, so a
            long centred line is genuinely harder to track back. mx-auto keeps it
            under the heading, which is what Foyez asked for.
          */}
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Not about writing more tests. It is a shorter path from a requirement
            to a filed issue. The agents absorb the test documentation and the
            execution runs, which is where the time used to go.
          </p>
        </div>

        {/*
          R3: equal grid tracks, never per-tile widths, and h-full on the tile so
          it fills the stretched row.
        */}
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-5 lg:gap-4">
          {steps.map(({ n, title, detail, Icon }) => (
            <li key={n} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-xl border border-border bg-gradient-to-br from-secondary/50 to-secondary/30 p-4 backdrop-blur-sm">
                {/*
                  Icon and number on one row, then the title immediately under it.
                  Foyez reported the previous version's label as too far from its
                  icon: the icon sat on its own row with a gap-3 beneath, which put
                  about 32px of nothing between the glyph and the words it labels.
                  gap-2 here, and the icon row is only as tall as the icon.
                */}
                <div className="flex items-center justify-between">
                  <Icon
                    className="h-4.5 w-4.5 shrink-0 text-blue-500"
                    aria-hidden
                  />
                  {/*
                    tabular-nums per R1: five step numbers in a row is exactly the
                    case where digits have to align without reaching for a second
                    font family.
                  */}
                  <span
                    className="text-[0.6875rem] font-semibold tabular-nums text-blue-400/70"
                    aria-hidden
                  >
                    {n}
                  </span>
                </div>

                {/*
                  Titles are deliberately short, which is what Foyez asked for, and
                  short enough to hold one line in the narrowest tile this grid
                  produces. That is checked rather than assumed, because a title
                  wrapping on one tile and not another starts the detail text at
                  different heights across the row, which R3 rules out. If a title
                  is ever lengthened, re-measure before shipping it.

                  A TWO-LINE RESERVE THROUGH THE NARROW BAND, added when the grid went
                  five-across from sm. At 640 to 800px a tile is 103 to 135px wide and
                  "Explore & plan" and "Issues listed" wrap to two lines while
                  "Execute" does not, so the detail lines started at different heights
                  across the row. Measured: detailsAligned false at 640, 668, 700, 744,
                  768 and 800.

                  min-h-[2.5rem] holds two lines of text-sm, so every detail line
                  starts at the same y whether its title wrapped or not. Released at lg
                  where all five titles fit on one line and a reserve would only add
                  whitespace. This is the same fix, for the same reason, that What I
                  Bring needed on its card titles.
                */}
                <p className="min-h-[2.5rem] hyphens-auto text-sm font-semibold leading-snug lg:min-h-0">
                  {title}
                </p>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/*
          WHAT THE FLOW DOES NOT HAND OVER, and it now connects to the line above
          it rather than repeating it. The previous version opened with "What is
          worth testing, and whether a build is safe to release, stays with me",
          which was the same judgement point the lead sentence had already made, so
          the section said one thing twice and mentioned the payoff of the flow
          nowhere.

          It now closes the loop the lead opens: the lead says where the time used
          to go, this says what it goes into instead. Time saved is stated as a
          reallocation rather than as a boast, which is both truer and the only form
          of it that survives having no measured figure.

          One line rather than the bordered panel this section used to carry,
          because the tiles are the visual now and a second block competed with
          the row.
        */}
        {/*
          Widened from 3xl to 4xl for the same reason as the lead, and kept centred.
          896px is about 84 characters at this smaller size, still inside the prose
          range, and it drops this closing line from three rows to two.
        */}
        <p className="mx-auto max-w-4xl text-center text-sm sm:text-base text-muted-foreground leading-relaxed">
          The time that frees goes into the part a tool cannot do, deciding what is
          worth testing and whether a build is safe to release. That judgement
          stays with me, and it is what makes owning quality end to end practical
          rather than a claim.
        </p>
      </div>
    </section>
  );
}
