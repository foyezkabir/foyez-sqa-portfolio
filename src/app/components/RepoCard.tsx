import { useEffect, useState } from "react";

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
  /*
    Live last-month download count for a card published on npm. Fetched from
    npm's public downloads API in the visitor's browser, so the figure is
    npm's at view time, never a typed-in copy that goes stale: the same
    reasoning that made the SonarCloud slot a link instead of a number. On any
    failure the state stays null and the pill renders as a bare "npm" link,
    because a missing number is honest and a stale one is not (R5).
  */
  const [npmDownloads, setNpmDownloads] = useState<number | null>(null);
  useEffect(() => {
    if (!repo.npm) return;
    let cancelled = false;
    fetch(`https://api.npmjs.org/downloads/point/last-month/${repo.npm}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.downloads === "number") {
          setNpmDownloads(data.downloads);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repo.npm]);

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
            Reserved title box, TWO lines, sized to the measured worst case rather
            than the common one. Equal card heights alone are not enough: if one
            title is one line and another is two, the descriptions beneath start at
            different heights and the row reads ragged inside identical boxes.

            THIS WAS THREE LINES AND THE THREE WAS STALE. The note it carried said
            two lines was overrun at 1024px by
            "playwright-api-automation-python". That was true when it was written
            and stopped being true in the same pass that removed the decorative
            external-link icon from the top right, which returned about 22px to the
            title. Nothing re-measured it afterwards, so a 5.25rem reserve went on
            holding 84px for content whose worst case is 44px, and Foyez reported
            the leftover as too much gap.

            Re-measured properly, by binary searching the narrowest box each name
            still fits two lines in:

              playwright-api-automation-python   162px   <- worst
              InC-Automation-Selenium            139px
              Teebay_buggy_automation            114px
              the three short names               65px or less

            The narrowest box this layout ever produces is 187px, at a 640px
            viewport where the carousel is at basis-1/2. 187 against a 162
            requirement leaves 25px of margin, so two lines holds at every width,
            not just the four in the gate.

            IF A LONGER REPO NAME IS EVER ADDED, re-run that measurement. A name
            needing more than 187px for two lines silently overruns this box.

            overflow-wrap:anywhere rather than break-words. Browsers break at
            hyphens but never at underscores, and break-word only breaks as a last
            resort, so "Teebay_buggy_automation" pushed past the card padding.
            "anywhere" also counts toward min-content sizing, which is what
            actually keeps it inside.
          */}
          <h3 className="min-h-[2.75rem] flex-1 text-base font-semibold leading-snug [overflow-wrap:anywhere]">
            {repo.name}
          </h3>
        </div>

        {/*
          flex-1 pushes the stack line to the bottom, so every footer sits on the
          same baseline however long the description is. Combined with the equal
          card heights, that is what makes a long summary and a short summary
          produce the same card.
        */}
        {/*
          text-base, RAISED FROM text-sm 2026-08-11, in the same pass that raised
          ProjectCard. Not requested directly: Foyez asked for What I Bring and
          Featured Work to match, and a sweep of every card description afterwards
          found these repo cards still at 14px while the other fourteen on the
          Projects page had moved to 16px.

          Left alone they would have been the only cards on the site with smaller
          body copy, which is the exact inconsistency the request was about. They
          sit in their own grid rather than beside a ProjectCard, so R3 parity
          never caught it and a screenshot would not have shown it either.
        */}
        <p className="flex-1 text-base leading-relaxed text-muted-foreground">
          {repo.description}
        </p>

        {/*
          flex-wrap, added with the npm pill: "npm, 1,234 downloads/month" does
          not fit beside the language on the 187px narrowest card, so the pill
          drops to its own line there instead of overflowing the card.
        */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/70">
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
            Renders only when a third-party report actually exists; one card has
            one, and the npm pill below follows the same rule for the one
            published package. Every other card shows nothing here rather than
            an empty slot or a placeholder. z-20 lifts these above the stretched
            GitHub overlay so each link receives its own clicks.
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

          {/*
            The npm pill. Same construction as the quality-report pill above:
            a real outbound link above the stretched overlay, icon plus words,
            nothing resting on colour. The download count inside it is the
            live fetch at the top of this component and simply does not
            appear until it has loaded.
          */}
          {repo.npm && (
            <a
              href={`https://www.npmjs.com/package/${repo.npm}`}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${repo.npm} on npm, opens in a new tab`}
              className="relative z-20 ml-auto inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-foreground/80 no-underline transition-colors hover:border-blue-400/50 hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            >
              npm
              {npmDownloads !== null &&
                `, ${npmDownloads.toLocaleString("en-US")} downloads/month`}
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
