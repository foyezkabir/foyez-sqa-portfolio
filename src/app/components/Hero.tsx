import { Button } from "./ui/button";
import { FileDown, Mail, Eye, BadgeCheck } from "lucide-react";
import { experienceLabel, mailtoHref, profile } from "../data/profile";
import { TestRunPanel } from "./TestRunPanel";
import { TiltCard } from "./TiltCard";
import { GrainOverlay } from "./GrainOverlay";

/*
  Order is deliberate. AI Agents leads because it is the only entry a reader
  cannot find on every other QA CV, and MCP follows immediately so the AI claim
  arrives with a mechanism attached rather than as a buzzword.

  The remaining five read as a workflow: author specs, hit the APIs, manage the
  cases and results, and run the whole thing continuously. CI/CD anchors the end
  because first and last are the most-scanned positions in a wrapping row, so a
  heavily filtered keyword belongs there rather than buried in the middle.

  Cypress, Selenium and Python are cut for space and appear in Experience.
*/
const techStack = [
  "AI Agents",
  "MCP",
  "Playwright",
  "TypeScript",
  "Postman",
  "TestRail",
  "CI/CD",
];

export function Hero() {
  return (
    <section className="relative px-8 hero-y min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <GrainOverlay />

      {/*
        CENTRED IDENTITY BLOCK, then the panel beneath it, at Foyez's request.

        This was a two-column grid: copy on the left, TestRunPanel on the right.
        He asked for the name, the years and the certification promoted, bold and
        centred, and chose the name as the largest element on the page.

        The panel moved DOWN rather than out. It is the one thing here a reader
        cannot get from a sentence, a test run advancing on its own, so centring
        the text was never a reason to delete it. Full width below the copy, which
        also gives it more room than the old half-width column did.

        max-w-3xl on the copy, not the section's max-w-7xl. Centred text needs a
        measure: ragged on both edges across 1200px is genuinely hard to read,
        where the old left-aligned column got its measure from the grid for free.
      */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          {/*
            THE NAME IS THE H1 NOW. It used to be the value proposition, and the
            swap is a deliberate trade Foyez made: a name is not a
            differentiator, so the claim below is what actually wins the reader,
            but the name is what a recruiter scans for first and it was
            previously only in the 14px header lock-up.

            Same ramp shape as every other heading on the site, one step larger
            at the top end because this is the page's single biggest element.
          */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
            {profile.name}
          </h1>

          {/*
            Role and duration, bold, directly under the name. The years are
            derived in profile.ts rather than typed, so this line cannot fall out
            of date. tabular-nums per R1, which is what this project uses instead
            of a second font family when a digit sits in running text.
          */}
          <p className="text-xl sm:text-2xl font-semibold text-foreground/90 tabular-nums">
            {profile.role}
            <span className="mx-2 text-muted-foreground/50" aria-hidden>
              ·
            </span>
            {experienceLabel()}
          </p>

          {/*
            EDUCATION MOVED UP HERE FROM ITS OWN SECTION, at Foyez's request: one
            degree filling a whole section between Certifications and Experience
            read, in his words, too solo. A single card under a 48px heading is a
            lot of page for three facts.

            It belongs in this block anyway. Everything above it is identity,
            which is what a degree is; it was only ever a section because there
            was no identity block to put it in until this hero existed. Deleting
            that section also returns the home page to the nine sections the Figma
            structure defines, which R14 prefers.

            Muted and one step down from the role line on purpose. It is
            supporting evidence, not the headline, and it must not compete with
            the name two lines above.

            Facts unchanged from cv-data.txt lines 344 to 348. The CGPA is still
            deliberately omitted, and that is still Foyez's call to reverse.
          */}
          {/*
            PROOF BLOCK: the certification and the degree together, below the
            name and the role rather than above them.

            The pill used to lead the hero. Foyez asked whether that was right and
            it was not, for two reasons. It put a 12px element directly above a
            72px one, so the reader met a credential before they knew whose it
            was, which works against the name-leads hierarchy he chose. And
            ISTQB-CTFL is the industry's baseline certification, held by most
            working testers, so it is good evidence but weak positioning; leading
            with it overweighted it against the agents and the public repos
            further down.

            The counter-argument was real and is why it is still here at all: it
            is the one claim on this page a stranger can verify without taking
            Foyez's word for it. That argues for visible, not for first.

            Reading order is now who, then what, then what backs it up. The two
            credentials sit in one block because they are the same kind of thing,
            assessed by someone else, and grouping them stops the hero being five
            separate stacked lines before the tagline.

            space-y-3 inside, tighter than the block's space-y-8, so the pill and
            the degree read as one unit rather than as two more entries in the
            stack.
          */}
          <div className="space-y-3">
            {/*
              BadgeCheck rather than colour alone. R7: a blue pill reading
              "certified" leans entirely on the blue to signal "verified", and the
              icon carries that meaning when the colour is stripped.
            */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {profile.certification}
            </div>

            {/*
              THE BREAKS ARE DELIBERATE RATHER THAN LEFT TO THE WRAP. Written as
              one flat string with middot separators, this ran to three lines at
              390px and the separators were free to land at the START of a line,
              which reads as a typo.

              So the two halves are block-level below 640px, giving a clean
              degree-then-institution stack, and inline with separators from 640px
              up where the whole thing fits on one line. The separator between the
              university and the year stays inside the second half, so those two
              never split from each other.

              nowrap on each segment stops a break landing mid-phrase, for example
              between "North" and "South".
            */}
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="block whitespace-nowrap sm:inline">
                BSc Computer Science &amp; Engineering
              </span>
              <span
                className="mx-2 hidden text-muted-foreground/50 sm:inline"
                aria-hidden
              >
                ·
              </span>
              <span className="block whitespace-nowrap sm:inline">
                North South University
                <span className="mx-2 text-muted-foreground/50" aria-hidden>
                  ·
                </span>
                <span className="tabular-nums">2022</span>
              </span>
            </p>
          </div>

          {/*
            The old h1, demoted to a tagline. Still the strongest claim on the
            page, so it stays visually loud and immediately under the identity
            block, just no longer the largest thing or the document heading.
          */}
          <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-balance">
            Building automation systems teams actually trust.
          </p>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
            Hand over a product and I own quality end to end, from test strategy
            to release sign-off, with AI agents doing the repetitive work.
          </p>

          {/*
            THREE BUTTONS IN A WRAPPING ROW ORPHAN THE THIRD ON A PHONE. At 390px
            the row measured 2 / 1, leaving Download Resume alone on its own line,
            which is the same R4 problem as the chips.

            Fixed by making them a full-width stack below 640px rather than by
            hunting for a cap. A wrapped row with one item stranded on the last
            line reads as an accident; three full-width buttons, each on its own
            line, read as a deliberate mobile layout, and they are easier to hit.
            From 640px up they revert to an auto-width centred row, where all
            three fit on one line with room to spare.
          */}
          {/*
            ONE PRIMARY, NOT TWO. View Work and Contact were both the default
            solid blue, which Foyez flagged as flat, and he is right: two
            identical filled buttons side by side make the reader choose between
            equals, so neither reads as the main action.

            Now solid blue, then outline, then ghost, which is the order the page
            actually wants. View Work is what a stranger should do first, since
            everything persuasive is downstream of it. Contact is the real goal but
            it is premature before the work has been seen. Download Resume is for
            the reader who has already decided, so it can be the quietest.

            R6 still holds on the third: it renders only when profile.resumeUrl is
            non-empty, so a missing file means no button rather than a dead one.
            Ghost keeps a visible focus-visible ring, so the drop in emphasis does
            not cost keyboard users the affordance.
          */}
          <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
              <a href="#projects">
                <Eye className="w-4 h-4" />
                View Work
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto" asChild>
              <a href={mailtoHref}>
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </Button>
            {profile.resumeUrl && (
              <Button size="lg" variant="ghost" className="w-full gap-2 sm:w-auto" asChild>
                <a href={profile.resumeUrl} download>
                  <FileDown className="w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            )}
          </div>

          {/*
            SEVEN CHIPS WRAP BADLY AND CENTRING DOES NOT FIX IT. Worth stating
            plainly, because the first version of this block assumed it did:
            justify-center centres the last line, it does not change how many
            items land on it. Seven items greedily wrapped still leaves one
            alone, which R4 calls a bug, and it now had two chances to happen
            instead of one.

            Simulated the greedy wrap across every container width from 150px to
            780px using the measured chip widths, which gives the exact bands:

                container      wrap
                >= 582px       7 on one line
                514 to 581     6 / 1     <- orphan
                434 to 513     5 / 2
                344 to 433     4 / 3
                328 to 343     3 / 4
                260 to 327     3 / 3 / 1 <- orphan
                246 to 259     3 / 2 / 2
                230 to 245     2 / 2 / 3
                190 to 229     2 / 2 / 2 / 1 <- orphan

            Two orphan bands sit right where real viewports land: a 390px phone
            gives the row 311px, which is 3/3/1, and a 640px tablet gives it
            about 561px, which is 6/1. The old max-w-sm only ever avoided the
            first one by accident, and only on desktop.

            So the cap is pinned into a safe band at each breakpoint rather than
            left to chance: 256px lands in 3/2/2, 432px lands in 4/3, and from
            1024px the uncapped row inherits max-w-3xl's 768px, which clears 582
            and puts all seven on one line.

            IF A CHIP IS ADDED, RENAMED OR REORDERED, re-run that simulation.
            The bands are a function of the exact chip widths, so they move.
          */}
          <div className="mx-auto flex max-w-[256px] flex-wrap justify-center gap-2 pt-2 sm:max-w-[432px] lg:max-w-none">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-secondary/50 border border-border rounded-md text-xs text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/*
          max-w-4xl, wider than the copy above it but not the full max-w-7xl. At
          full width the panel's rows stretch far enough apart that a spec name
          on the left and its status on the right stop reading as one line.
        */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <TiltCard>
            <TestRunPanel />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}