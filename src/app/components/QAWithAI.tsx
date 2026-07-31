import { Bug, ClipboardList, Code2, Sparkles } from "lucide-react";

/**
 * MODULE 9: QA + AI. Heading, paragraph and three sub-cards, layout unchanged.
 *
 * THE INVENTED CLAIM IS GONE. The middle card was "Auto Healing", described as
 * "self-healing selectors and adaptive test maintenance". Foyez has never claimed
 * that and no repository of his does it. It is also the single most
 * over-promised feature in the whole AI-testing category, so a reader who knows
 * the field reads it as marketing and starts discounting everything around it.
 * The other two were softer versions of the same problem: "AI-generated test
 * cases based on component analysis" is not how his agents work, and "pattern
 * detection and failure root cause analysis" describes nothing he has built.
 *
 * WHAT REPLACES THEM: one pass of the real pipeline, in the order it runs. Every
 * card names the agent that does the work, which is what makes the section
 * checkable rather than aspirational, and each of those agents exists as a skill
 * in this repo and is described in cv-data.txt under EXPANDED TULIPTECH SCOPE.
 *
 * IT DELIBERATELY DOES NOT RELIST THE REPOSITORIES. Agents & Automation already
 * shows AG-QREW and the rest as cards with links. This section is the same work
 * told as a workflow: what happens, in what order, and who hands off to whom.
 * That is the one thing a list of repositories cannot convey, and it is the
 * reason both sections can exist without repeating each other.
 *
 * THE NUMBERS ARE THE POINT OF THE STEP BADGES. A three-card row reads as three
 * unrelated features by default, which is exactly how the template's cards read.
 * Numbering them turns the row into a sequence, so the reader understands that
 * the third card only happens because the first two did.
 */

/** One pass of the AG-QREW cycle. Order is the order the agents actually run. */
const steps = [
  {
    icon: ClipboardList,
    title: "Cases into TestRail",
    /*
      qa-tc-writer. "Test case authoring with direct TestRail import via API" is
      Foyez's own wording in cv-data.txt, and Figma frames are named as an input
      in the same place.
    */
    body: "qa-tc-writer reads the ticket and the Figma frames, writes the test cases, and imports them into TestRail through its API.",
  },
  {
    icon: Code2,
    title: "Specs on a strict POM",
    /*
      qa-script-writer plus qa-api-tester. The decoupled Page Object Model is
      QA-Scripter's own README language, not a generic claim about good practice.
    */
    body: "qa-script-writer turns the same requirements into Playwright specs on a decoupled Page Object Model, with qa-api-tester building the Postman collection alongside them.",
  },
  {
    icon: Bug,
    title: "Defects filed, run reported",
    /*
      qa-hawk. "Navigates business logic flows, captures defect screenshots, and
      files structured bug reports for both frontend and API issues", condensed
      from cv-data.txt.
    */
    body: "qa-hawk walks the built feature, captures the evidence, files structured defect reports for the UI and the API, and closes with a report.",
  },
];

export function QAWithAI() {
  return (
    <section className="px-8 py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="relative group">
          {/* Glow pulled back so the hero panel stays the brightest thing on the page. */}
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-lg opacity-20" />

          {/*
            p-12 drops to p-6 below sm. At 390px the padding was eating 96px of a
            326px card, which is 29 percent of the width spent on empty space and
            it pushed the step bodies into very narrow columns.
          */}
          <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-3xl p-6 sm:p-12 backdrop-blur-sm">
            {/* Hairline top highlight: the tighter replacement for the blur wash. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
            />
            <div className="text-center space-y-8">
              {/*
                The glyph shrinks with the heading. At a fixed 40px against a
                36px heading it was the larger of the two and read as the
                subject of the line rather than a mark beside it.
              */}
              <div className="flex items-center justify-center gap-3">
                <Sparkles
                  className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 text-purple-400"
                  aria-hidden
                />
                <h2 className="text-4xl sm:text-5xl font-bold">QA + AI</h2>
              </div>

              {/*
                The paragraph is the orchestrator, which is the part of this work
                nothing else on the page explains. Both facts in it are Foyez's
                own: the QA Lead layer is the sole Jira-facing interface, and it
                resolves conflicts between agent-generated results.

                "Unattended" is the load-bearing word. Five agents that need a
                human between every step would be a worse process than doing it by
                hand, so the claim only means anything if the cycle runs on its own.
              */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Five agents behind one orchestrator, and the orchestrator is the
                only one that talks to Jira. It reads the ticket, hands the work
                out, settles it when two agents disagree, and reports back. What
                follows is a single pass of that cycle, running unattended.
              </p>

              {/*
                auto-rows-fr and h-full, so the three cards are one height whatever
                the body lengths. The template relied on the bodies happening to be
                similar, which is the "small big" mismatch Foyez reported
                elsewhere waiting to happen.
              */}
              <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-left sm:text-center">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="flex h-full flex-col gap-3"
                    >
                      {/*
                        Icon and step number in one badge row. The number carries
                        the sequence and the glyph carries the subject, so neither
                        is doing the other's job, and the number is real text
                        rather than a decorative shape a screen reader would skip.
                      */}
                      <div className="flex items-center gap-2 sm:justify-center">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-purple-400" aria-hidden />
                        </div>
                        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                          Step {index + 1}
                        </span>
                      </div>

                      {/*
                        Two lines reserved. "Defects filed, run reported" wraps to
                        two at every width where the row is three across, while
                        "Cases into TestRail" fits on one, so without the reserve
                        the three bodies start at different heights inside cards
                        that are otherwise identical.
                      */}
                      <h4 className="min-h-[3rem] font-semibold leading-snug">
                        {step.title}
                      </h4>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
