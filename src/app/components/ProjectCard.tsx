import { ExternalLink } from "lucide-react";

import { Button } from "./ui/button";
import type { Project } from "./Projects";

/**
 * One client-product card, extracted from Projects when Module 6 added the
 * /projects page. Markup unchanged; it moved because two pages render it and the
 * element order below is the fix for a measured R3 break, which is exactly the
 * kind of thing that gets silently undone in a second copy.
 */
export function ProjectCard({
  project,
  narrow = false,
}: {
  project: Project;
  /**
   * For the three-column grid on /projects, added 2026-10-26 when VelaCrew made
   * the TulipTech group five cards. The default outcome reserve below was
   * measured for two-column tracks (329px at the md floor, 560px at lg), and a
   * three-column lg track is only about 362px: the longest outcome sentences
   * need three lines there, so the default two-line lg reserve would misalign
   * the descriptions across a row, the exact R3 break the reserve exists to
   * prevent.
   *
   * The narrow variant reserves three lines at lg and NOTHING below it, because
   * that grid is a single column until lg and a one-column grid has no row
   * neighbour to align with: a reserve there is pure dead space under every
   * one-line outcome on a 700px-wide card.
   */
  narrow?: boolean;
}) {
  const OutcomeIcon = project.outcome.icon;

  return (
    <div className="relative group h-full">
      {/* Glow on hover only, matching every other card section. */}
      <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 space-y-6 backdrop-blur-sm h-full flex flex-col">
        {/*
          THE ORDER HERE IS THE FIX FOR A MEASURED R3 BREAK, so it is worth
          stating before someone tidies it back.

          The first build had title, then description with flex-1, then the
          outcome line, tags and button. flex-1 bottom-anchors everything below it,
          and the bottom group is NOT the same height on every card: Empathika
          carries a View Project button the other three cannot have, and four tags
          wrap to two rows at some widths and one at others. So the blue outcome
          line landed at a different height on each card inside otherwise identical
          boxes. Measured: 37 of 51 widths from 320 to 1920 failed, including every
          width from 768 to 1920. Invisible in a screenshot, obvious in a
          row-by-row measurement.

          Now the top of the card is fixed: title, outcome, description. All three
          start at the same y across a row by construction, which is what R3 asks
          for. flex-1 moved onto the description, so the variable-height part is
          the tag row and the optional button at the very bottom, where a
          difference reads as one card having a call to action rather than as a
          broken grid.

          Putting the outcome directly under the title is also the better read.
          What Foyez did is the reason the card exists; what the product is
          provides the context underneath it.
        */}
        <div className="space-y-3">
          {/*
            THE RAMP STEPS AT lg, NOT sm, AND THAT IS A SOLVED NUMBER.

            It was text-xl sm:text-2xl, which was correct while only the four
            TulipTech products used this card. The ten Shadhin products have much
            longer names, and at 24px in the narrow end of the md two-column range
            they wrapped: measured every 16px, "Billions for Bangladesh" and
            "Purbachol Water Supply" take two lines from 768 to 832 where a card is
            only 329 to 361px wide, while their row neighbours take one. That put
            the accent line and the description at different heights across a row,
            the same R3 break the element order below was written to fix.

            Two ways to fix it: reserve two title lines in that band, or scale the
            type so the wrap never happens. The reserve was rejected because it
            needs a breakpoint at 848px, a magic number tuned to these exact
            strings and one rename away from being wrong, and it would leave 32px
            of dead space under every one-line title above the band.

            Holding text-xl until lg costs nothing and needs no tuned number: at
            20px the longest name fits one line from 768 up, and the type ramp is
            what R4 asks for anyway. Verified single-line at every width from 768
            to 1920.
          */}
          <h3 className="text-xl lg:text-2xl font-semibold">{project.title}</h3>

          {/*
            The outcome line, where the template kept its fake metrics.

            The reserve is what keeps the description below it aligned when one
            outcome sentence wraps and another does not. Sized to the measured
            worst case per breakpoint rather than to the common case, the same way
            the title reserves in Certifications and RepoCard are.

            THREE LINES UNTIL lg, TWO FROM lg, and the breakpoint was solved rather
            than guessed. Line counts were measured every 16px from 768 to 1200.
            The worst case is the top of the md two-column range, where a card is
            only 329px wide and 241px of that is text: both "Led QA" sentences take
            three lines there while the other two take two. From lg the widest card
            never needs more than two. An earlier version put the step at sm and
            failed from 768 to 816 for exactly this reason.

            items-start with mt-0.5 on the glyph, so on a wrapped sentence the icon
            stays on the first line instead of centring itself against the block.
          */}
          <div
            className={
              narrow
                ? "flex items-start gap-2 text-sm text-blue-400 lg:min-h-[3.75rem]"
                : "flex min-h-[3.75rem] items-start gap-2 text-sm text-blue-400 lg:min-h-[2.5rem]"
            }
          >
            <OutcomeIcon className="mt-0.5 w-4 h-4 shrink-0" aria-hidden />
            <span>{project.outcome.text}</span>
          </div>
        </div>

        {/*
          flex-1 here, so the description absorbs the slack and the tag row sits on
          the card's bottom padding whatever the description length.

          text-base, RAISED FROM text-sm 2026-08-11. Foyez marked this description
          and a What I Bring description as needing to be the same size. Measured at
          1154px, the two card BOXES were already identical, 522px wide with 32px
          padding, 32px gap, in the same 1075px container, with the same 24px/600
          title. The only real mismatch was here: 14px against What I Bring's 16px.

          RAISED RATHER THAN LOWERED, which inverts the instruction and is
          deliberate. "Follow Featured Work" read literally means dropping What I
          Bring to 14px, but Foyez asked earlier in the same session to make the
          card text in that section BIGGER, so shrinking it would undo a change he
          had just requested. Put to him with both directions costed; he chose to
          raise this one. The sections now agree at 16px and nothing got smaller.

          THE OUTCOME LINE ABOVE STAYS text-sm ON PURPOSE. It is a caption on the
          title, not body copy, and its min-h-[3.75rem] reserve is tuned to
          text-sm wrapping. Resizing it would silently break that reserve.
        */}
        <p className="flex-1 text-base text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/*
          Rendered only when there are tags. The Shadhin projects have a CV
          one-liner each and no per-project scope beyond it, so inventing four
          category chips per card to fill this row would be exactly the
          plausible-looking filler R5 exists to prevent. An absent row is honest;
          a fabricated one is not.
        */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/*
          Renders only when a real URL exists. Three of the four client platforms
          have no public address, so those cards end at the tags rather than
          showing a button that goes nowhere.
        */}
        {project.url && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 w-full mt-2"
            asChild
          >
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit the ${project.title} site, opens in a new tab`}
            >
              View Project
              <ExternalLink className="w-3 h-3" aria-hidden />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
