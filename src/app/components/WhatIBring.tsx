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
                
                <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 space-y-4 backdrop-blur-sm h-full">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-500" />
                  </div>
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
                    <h3 className="text-xl lg:text-2xl font-semibold md:min-h-[3.5rem] lg:min-h-0">
                      {capability.title}
                    </h3>
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
