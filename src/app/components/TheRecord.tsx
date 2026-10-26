/**
 * MODULE 35. FOUR NUMBERS, DIRECTLY UNDER THE HERO.
 *
 * Foyez asked whether the site should carry a stat row like the one on a reference
 * portfolio, whose four tiles read "200+ critical defects caught pre-UAT", "95
 * Playwright specs authored", "1,000+ test cases in TestRail" and "4 client platforms
 * delivered". The section is a good idea and this is it. The reference's NUMBERS were
 * not usable, and the distinction is the whole reason this file has a long comment.
 *
 * WHY THE NUMBERS COULD NOT SIMPLY BE COPIED. cv-data.txt contains no countable claim
 * anywhere: grepping it for a digit next to "test", "case", "defect", "bug", "spec",
 * "script", "project", "product", "client", "agent" or "scenario" returns NOTHING. The
 * CV is written entirely qualitatively. This template also shipped with three invented
 * metrics, "80% coverage improvement", "60% execution time reduced" and "Scaled testing
 * 10x", recorded as sourceless at cv-data.txt line 423 and deleted. Inventing four more
 * on the one page whose argument is that every claim is checkable would undo that.
 *
 * SO THE FIGURES CAME FROM FOYEZ DIRECTLY, and each was negotiated rather than taken as
 * offered. That history matters because none of it is in the CV and nobody can check it
 * later without this note:
 *
 *   DEFECTS. He first said "could be more than 3000", then "4000+". Both were flagged as
 *   estimates rather than counts, and an estimate presented as a hard figure fails the
 *   moment an interviewer asks how it was arrived at. He settled on 3,500+. The rule
 *   applied: an estimate rounds DOWN to a floor you would state without hesitation.
 *
 *   TEST CASES, 8,500+, AND THE FIGURE MOVED THREE TIMES. He offered "7,000+ written
 *   and 1,500+ executed"; the written figure was dropped; it was then scoped to 3,000+
 *   in TestRail with 1,500+ executed as a second tile; he has now dropped the executed
 *   tile and combined the written total at 8,500+ across TestRail and Excel.
 *
 *   THE NOTE MUST NAME BOTH SYSTEMS. The original reason for dropping the combined
 *   figure was that it spanned TestRail and Excel with no clean answer to "which
 *   system?". Combining is fine as long as the page answers that question itself, which
 *   "In TestRail and Excel" does. Never let this tile imply a single tool.
 *
 *   PROJECTS AUTOMATED, restored after being cut for tile arithmetic. Six, and the
 *   wording is load bearing: this work sits in COMPANY repositories, not his public
 *   ones, so it is NOT the same six as the six public repos in Agents & Automation. The
 *   tile says "projects automated" and must never say "repositories", since that would
 *   send a reader to GitHub expecting code they cannot see.
 *
 *   THE 80 TO 85 PERCENT TIME SAVING HE MENTIONED IS DELIBERATELY ABSENT. A percentage
 *   implies a measurement, against a baseline, over a defined scope. He described it as
 *   what his API agent achieves rather than something he timed, and it is the same
 *   shape as the invented percentages that were torn out of this template. It can go in
 *   the moment there is a measurement behind it.
 *
 * THREE OF THESE FOUR STAND ON FOYEZ'S WORD. Only the products figure can be checked by
 * a reader, and that is why it is here rather than a fourth self-reported number:
 * Experience lists all fifteen by name, so anyone can count them without leaving the
 * page. Mixing one verifiable figure with three reported ones is stronger than four of
 * the same kind, and it is the honest shape of the underlying evidence.
 *
 * FOURTEEN BECAME FIFTEEN on 2026-10-26 when VelaCrew joined the TulipTech list. This
 * figure is a hand-typed copy of a count that lives in Experience, so the two move
 * together or the tile lies: re-check it whenever a project chip is added or removed.
 *
 * NO ICONS AND NO COLOUR ON THE FIGURES. The reference tiles use gradient numerals; the
 * numbers here wear the plain foreground token, because a large figure is already the
 * loudest thing in its tile and colouring it adds decoration rather than meaning. That
 * is the same rule the dataviz guidance applies to chart labels.
 */
const stats = [
  {
    /*
      Written as a string rather than a number so the "+" and the thousands comma are
      part of the value. These are labels, not quantities to compute with.
    */
    value: "3,500+",
    label: "Defects logged",
    /* Three roles across three years, which is the answer to "over what period". */
    note: "Across three years and three roles",
  },
  {
    /*
      8,500+ SPANS TWO SYSTEMS, AND THE NOTE SAYS SO. That qualifier is not decoration,
      it is the thing that keeps the figure honest.

      This number has moved three times and the history explains the wording. Foyez
      first offered "7,000+ written", which was dropped precisely BECAUSE his previous
      employer kept test cases in Excel rather than TestRail, so a single total spanning
      both would invite "which system?" and have no clean answer. It was then scoped to
      3,000+ in TestRail alone. He has now chosen to combine them at 8,500+.

      That reversal is fine, but only if the page states the scope rather than implying
      one tool. "In TestRail and Excel" turns the obvious follow-up question into
      information the reader already has, and a recruiter who asks about it gets the
      same answer the site gave them.

      R5: this is Foyez's own figure, not from cv-data.txt, which contains no countable
      claim anywhere. Same footing as the defects count.
    */
    value: "8,500+",
    label: "Test cases written",
    note: "In TestRail and Excel",
  },
  {
    /*
      RESTORED at Foyez's request after being cut for tile arithmetic. The fact was
      always true; it lost its place when the TestRail figures split into two tiles.

      "PROJECTS AUTOMATED", NEVER "REPOSITORIES", and this wording is load bearing. He
      confirmed this work sits in COMPANY repositories, not his public ones, so it is
      NOT the same six as the six public repos in Agents & Automation. Anything hinting
      at browsable code would send a reader to GitHub expecting to find something they
      cannot see, which is worse than making no claim at all.

      The note names the tools instead, which is the checkable part of the claim and
      matches the CV summary's Playwright, Cypress, Selenium and Appium. Appium was
      added 2026-10-26 at Foyez's request, the day the updated CV PDF carrying it
      replaced the old one in this repo.
    */
    value: "6",
    label: "Real-world projects automated",
    note: "Playwright, Appium, Cypress and Selenium",
  },
  {
    value: "15",
    label: "Client products tested",
    /*
      The one line here a reader can act on. Experience names all fifteen, so this
      says where to look rather than asking to be believed.
    */
    note: "All named in Experience below",
  },
] as const;

export function TheRecord() {
  return (
    <section className="px-8 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/*
          NO HEADING ON THIS SECTION, deliberately, and it is the only one on the page
          without one. It sits immediately under the hero as a continuation of the
          introduction rather than as a new topic, and a 48px heading above four
          numbers would slow down the one thing this row is for, which is scale at a
          glance before the reader has committed to anything.

          It is also why this section is NOT in the nav: there is no heading to land on
          and nothing here that a reader would go looking for by name.

          FOUR ITEMS DIVIDE CLEANLY, which is why there are four. 2 across at sm and 4
          at lg both wrap evenly, so there is no R4 orphan at any width and no
          arithmetic to re-solve later. A fifth stat would reintroduce exactly the
          5-item wrap problem that had to be fixed in Automation-First.
        */}
        <dl className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ value, label, note }) => (
            <div
              key={label}
              className="flex h-full flex-col rounded-2xl border border-border bg-gradient-to-br from-secondary/50 to-secondary/30 p-4 text-center backdrop-blur-sm sm:p-6"
            >
              {/*
                dd BEFORE dt in the markup, which reads oddly and is correct. The
                number is the value and the label describes it, so the pairing is
                right; visually the number leads because that is the point of a stat
                tile. A dl allows dd to precede its dt within the same group.

                tabular-nums per R1: four figures in a row is exactly the case this
                project uses instead of reaching for a second font family.
              */}
              <dd className="text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {value}
              </dd>
              <dt className="mt-1.5 min-h-[2.5rem] text-sm font-medium text-foreground/90 lg:min-h-0">
                {label}
              </dt>
              {/*
                The qualifier is not decoration. Every figure here invites "over what
                period" or "measured where", and answering it in 5 words on the tile
                is cheaper than leaving the reader to wonder or ask.
              */}
              <p className="mt-auto pt-1 text-xs leading-snug text-muted-foreground">
                {note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
