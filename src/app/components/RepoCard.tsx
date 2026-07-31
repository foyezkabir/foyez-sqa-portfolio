import { Code2, ExternalLink } from "lucide-react";

import type { Repo } from "./AgentsAndAutomation";

/**
 * One repository card, extracted from AgentsAndAutomation when Module 6 added the
 * /projects page. The markup is unchanged; the only reason it moved is that two
 * pages now render it, and a second copy of it would be a second place for the
 * title reserve, the wrap rule and the stretched-link pattern to drift out of
 * step. Every comment below records something that was measured.
 */
export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="relative group h-full">
      {/* Glow on hover only, matching the other card sections. */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/*
        STRETCHED-LINK PATTERN, and it is required rather than clever.

        The card was a single <a> wrapping everything, which is the simplest thing
        that works until a card needs a SECOND link. One repo links its SonarCloud
        report as well as GitHub, and an <a> inside an <a> is invalid HTML that
        browsers silently unnest, breaking both links.

        So the card is a div, and the GitHub link is an absolutely positioned
        overlay covering it. The whole card stays clickable and keeps its pointer
        cursor, while the quality-report link sits above the overlay on a higher
        z-index and wins its own clicks. Two real links, no nesting.

        focus-within on the card draws the ring, because the element receiving
        focus is now the invisible overlay rather than the visible box.
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
          ICON INLINE WITH THE NAME, at Foyez's request, matching the original
          design. An earlier pass moved it onto its own row to buy the title width,
          which he did not like.

          What buys the width back instead is dropping the decorative
          external-link icon that used to sit at the top right. It was never load
          bearing here: the entire card is a link, it has an aria-label saying it
          opens in a new tab, and the footer already carries an external-link icon
          on the one card with a second destination. Removing it returns about 22px
          to the title, which is what keeps long names to two lines.

          items-start with mt-0.5 on the icon, so the glyph sits on the first line
          of a two-line name rather than centring itself against the whole block.
        */}
        <div className="flex items-start gap-2">
          <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden />
          {/*
            Reserved title box, THREE lines, sized to the measured worst case
            rather than the common one. Equal card heights alone are not enough: if
            one title is one line and another is three, the descriptions beneath
            start at different heights and the row reads ragged inside identical
            boxes.

            Two lines was tried and is not enough. At 1024px, where the cards are
            at their narrowest, "playwright-api-automation-python" needs three
            lines while its neighbours need one, so a two-line reserve was overrun
            exactly where it mattered. The cost is some whitespace under short
            names on wide screens, which is the right trade for descriptions that
            always start on the same line.

            overflow-wrap:anywhere rather than break-words. Browsers break at
            hyphens but never at underscores, and break-word only breaks as a last
            resort, so "Teebay_buggy_automation" pushed past the card padding.
            "anywhere" also counts toward min-content sizing, which is what
            actually keeps it inside.
          */}
          <h3 className="min-h-[5.25rem] flex-1 text-base font-semibold leading-snug [overflow-wrap:anywhere]">
            {repo.name}
          </h3>
        </div>

        {/*
          flex-1 pushes the stack line to the bottom, so every footer sits on the
          same baseline however long the description is. Combined with the equal
          card heights, that is what makes a long summary and a short summary
          produce the same card.
        */}
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-foreground/70">
          {/*
            One accent colour for every dot, not a per-language palette. The
            reserved status tokens in theme.css include a blue, a green, an amber
            and a red, so a language palette would start colliding with state
            meaning. The language name is always written beside the dot, so the
            colour carries nothing on its own.
          */}
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-blue-500"
            aria-hidden
          />
          {repo.stack}

          {/*
            Renders only when a third-party report actually exists, so five of the
            six cards show nothing here rather than an empty slot or a placeholder.
            z-20 lifts it above the stretched GitHub overlay so this link receives
            its own clicks.
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
  );
}
