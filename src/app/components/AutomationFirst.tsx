/**
 * MODULE 3. One heading, one paragraph, structure unchanged.
 *
 * The template copy this replaces was "Quality isn't about writing more tests,
 * it's about building intelligent systems that scale. I design automation
 * frameworks that think about architecture, reliability, and team velocity
 * first." Two problems with it. It made a claim Foyez has never made, an
 * "architecture-first approach", which is the same invented phrase Module 2 had
 * to strip out of a What I Bring card. And it said nothing a hundred other QA
 * portfolios do not say, in the one slot on the page that exists purely to state
 * a position.
 *
 * WHAT THE NEW COPY DOES. It opens by rejecting the obvious reading of its own
 * heading, because "automation-first" is a phrase a reader has already decided
 * they know the meaning of, and the interesting thing here is that Foyez means
 * something more specific by it. Then it says what the agents actually take off
 * his plate, and what he keeps. Then it lands the ownership message from Module
 * 1d, which the hero states in one line and has no room to justify.
 *
 * EVERY CLAIM IS TRACEABLE.
 *   "five Claude Code agents" is the AG-QREW repo, whose README describes five
 *   agents coordinating through a shared task list, and it lines up with the five
 *   skills in this repo: qa-tc-writer, qa-script-writer, qa-hawk, qa-api-tester
 *   and the QA Lead orchestrator.
 *   "authoring cases, generating specs, filing defects, writing the report" is
 *   the four-step chain from the TulipTech AI-Driven QA Automation bullets in
 *   cv-data.txt, in the order the pipeline runs them.
 *   "owning quality end to end" is Foyez's own positioning, recorded in Module 1d
 *   and evidenced by two client products led at TulipTech.
 *
 * DELIBERATELY NOT NAMED: AG-QREW. It already appears with a real GitHub link in
 * Agents & Automation, and Module 9 tells the same pipeline as a workflow. A
 * third mention of one repo name in one scroll reads as thin material rather than
 * as emphasis, so this paragraph describes the capability and lets the sections
 * below it carry the proof. The one number, five, is what keeps it from being a
 * buzzword.
 *
 * LENGTH WAS MEASURED, NOT GUESSED, and the first draft failed. At 20px in a
 * 311px column a 450-character paragraph rendered as SIXTEEN centred lines at
 * 390px, and centred text is the worst possible shape for that: every line
 * starts in a different place, so the eye loses the next one. Two changes:
 * the copy came down to 407 characters by cutting one of three judgement
 * examples, and the type now ramps text-lg sm:text-xl. Measured: 13 lines at
 * 390px against 6 from 800px up. Still the longest single paragraph on the page,
 * which is the point of the section, but it reads as prose rather than as a wall.
 * At 320px it is 18 lines, which is the narrowest width anyone reasonably tests
 * and two steps below the 390px gate.
 *
 * Both the heading and the paragraph ramp, since a fixed size at every breakpoint
 * is what R4 rules out. The remaining fixed section headings are Module 11's
 * sweep.
 */
export function AutomationFirst() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl sm:text-5xl font-bold">
          Automation-First Quality Engineering
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Automation-first is not about writing more tests. It is about handing
          the repetitive half of the job to five Claude Code agents that run
          unattended: authoring cases, generating specs, filing defects, writing
          the report. What is left is the judgement a tool cannot make, what is
          worth testing and whether a build is safe to release. That is what
          makes owning quality end to end practical rather than a claim.
        </p>
      </div>
    </section>
  );
}
