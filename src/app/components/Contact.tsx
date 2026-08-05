import { Button } from "./ui/button";
import { Mail, Linkedin, Github } from "lucide-react";
import { mailtoHref, profile } from "../data/profile";

/**
 * MODULE 10: CONTACT. Layout unchanged. The section was already correct in
 * structure; what was missing was the data behind two of its three buttons.
 *
 * LinkedIn and GitHub were hidden because profile.ts had empty strings for both,
 * and this component renders a button only when its URL is non-empty. That guard
 * is why the page has never shipped a control pointing nowhere, and it stays.
 * Filling the two URLs in profile.ts is the whole of this module's data change.
 *
 * The phone number is not published. See the note in profile.ts.
 *
 * Three accessibility and responsiveness fixes made at the same time, all of them
 * things this section had in common with the template it came from:
 *
 *   Every icon is aria-hidden. Each one sits next to its own label, so a screen
 *   reader announcing the glyph as well would read the button twice.
 *
 *   The two external links say so. target=_blank with no warning is a small
 *   surprise for a screen-reader user, who gets moved to a new context with no
 *   announcement, so the aria-label states it.
 *
 *   The email button breaks its address rather than overflowing. At 390px the
 *   card gives about 262px of usable width and the address needs more than that
 *   at the default button size, so the button now wraps the string instead of
 *   pushing past the card. Buttons ship with whitespace-nowrap, which is the
 *   right default everywhere except here.
 */
export function Contact() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto">
        <div className="relative group">
          {/* Glow pulled back so the hero panel stays the brightest thing on the page. */}
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-lg opacity-20" />

          {/*
            p-16 drops to p-8 below sm. Sixteen units is 64px a side, which took
            128px out of a 326px card at 390px: nearly 40 percent of the width
            spent on padding, and it was the reason the email address had nowhere
            to go.
          */}
          <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-3xl p-8 sm:p-16 backdrop-blur-sm text-center space-y-8">
            {/* Hairline top highlight: the tighter replacement for the blur wash. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
            />
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold">Let's Connect</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Open to discussing test automation, quality engineering, or
                collaboration opportunities.
              </p>
            </div>

            {/*
              THE BUTTON ROW STACKS BELOW md RATHER THAN WRAPPING, and that is the
              orphan rule rather than a style preference. Three buttons of
              different widths in a flex-wrap row produce a 2 + 1 wrap somewhere in
              the range, leaving one alone on the last line looking like a mistake.
              A uniform column cannot orphan anything.

              THE BREAKPOINT WAS SOLVED, AND sm WAS WRONG. It stacked below sm
              first, on the reasoning that the three buttons need about 470px and
              the card gives 512px at its narrowest sm width. Measured every 16px
              from 320 to 1920, that failed: from 640 to 704 the row wrapped 2 + 1,
              five widths in a row. The arithmetic missed the padding. At 640 the
              card's own padding steps up to p-16, so the inner width is
              640 - 64 - 128 = 448px, not 512px, and the row cannot fit. md is the
              first breakpoint where it can: 768 - 64 - 128 = 576px.

              Re-verified across the same 101 widths: zero orphans, and nothing
              crossing the card padding at any width.
            */}
            <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center md:flex-wrap">
              {/*
                WHITE, MATCHING THE HERO'S VIEW WORK BUTTON, at Foyez's request.
                These are the page's two primary calls to action, one at the top
                and one at the bottom, so they should look like the same control.
                Blue here and white there read as two different kinds of button.

                The classes are duplicated from Hero rather than promoted into
                buttonVariants, deliberately. A white default would repaint every
                primary button on the site, and only these two should be white.
                If a third ever needs it, extract it then, not now.

                Contrast measured against the white label it replaces, resting
                #ffffff on #0a0a0a is 19.8:1 and hover #e5e5e5 is 15.72:1.

                The focus ring override is REQUIRED, not decorative. The shared
                ring-ring/50 composites to about #2e2e2e and paints OUTSIDE the
                fill, so on the near-black page it measured 1.46:1, well under the
                3:1 a focus indicator needs. A dark ring only works on a dark
                button. See the same note in Hero.tsx.
              */}
              <Button
                size="lg"
                className="gap-2 whitespace-normal bg-white text-neutral-950 hover:bg-neutral-200 hover:text-neutral-950 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                asChild
              >
                <a href={mailtoHref}>
                  <Mail className="w-4 h-4 shrink-0" aria-hidden />
                  {profile.email}
                </a>
              </Button>
              {profile.linkedinUrl && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${profile.name} on LinkedIn, opens in a new tab`}
                  >
                    <Linkedin className="w-4 h-4 shrink-0" aria-hidden />
                    LinkedIn
                  </a>
                </Button>
              )}
              {profile.githubUrl && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${profile.name} on GitHub, opens in a new tab`}
                  >
                    <Github className="w-4 h-4 shrink-0" aria-hidden />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
