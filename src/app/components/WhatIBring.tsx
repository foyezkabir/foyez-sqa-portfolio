import { Bot, FileText, Layers, ShieldCheck } from "lucide-react";

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
const capabilities = [
  {
    icon: ShieldCheck,
    title: "Owns Delivery, Grows the Team",
    description:
      "Hand over a product and quality is owned end to end, from test strategy to release sign-off. Leads QA on client products and trains juniors and interns.",
  },
  {
    icon: Bot,
    title: "Autonomous AI QA Pipelines",
    description:
      "Agents that write test cases, push them to TestRail, generate Playwright specs, run the suite, and report.",
  },
  {
    icon: FileText,
    title: "Written for the Next Person",
    description:
      "Client conversations turned into specs, reports and user manuals plain enough for a new joiner to pick up and run with, every requirement traced through to its tests and defects.",
  },
  {
    icon: Layers,
    title: "Automation Built to Last",
    description:
      "Web suites in Playwright, Cypress and Selenium on a strict Page Object Model, wired into CI so they keep paying off long after the first sprint.",
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
                
                <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 space-y-3 backdrop-blur-sm h-full">
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
                    <div className="flex items-start gap-2.5 md:min-h-[3.5rem] lg:min-h-[4rem] xl:min-h-0">
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
