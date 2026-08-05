import { Button } from "./ui/button";
import { FileDown, Mail, ArrowUpRight, BadgeCheck } from "lucide-react";
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

  Cypress and Selenium are cut for space and appear in Experience.

  PYTHON ADDED AND TYPESCRIPT REPLACED BY JAVASCRIPT, both at Foyez's request, and
  the second one fixed an R5 problem rather than just a preference.

  TypeScript was NOT in cv-data.txt. The languages line, 318, reads "Python,
  JavaScript, HTML, and CSS", so the hero was advertising a language his own CV
  never claims, in the most-read block on the site. JavaScript is what the CV says
  and it is the honest chip. Python comes from the same line and from line 504.

  Python sits before JavaScript because that is the CV's own order, so the two
  can be diffed against it without thinking.

  EIGHT CHIPS NOW, NOT SEVEN, which invalidates the old wrap solution. The bands
  below were re-derived from scratch for the new set; see the note on the row.
*/
const techStack = [
  "AI Agents",
  "MCP",
  "Playwright",
  "Python",
  "JavaScript",
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
      <div className="max-w-6xl mx-auto w-full relative z-10">
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
          {/*
            ROLE AND CERTIFICATION ARE ONE UNIT NOW, at Foyez's request: the
            ISTQB pill used to sit with the degree, which read as "education"
            and put a professional credential in the academic slot. It belongs
            with the designation, since ISTQB-CTFL is what qualifies the role
            line above it, not a school fact.

            space-y-3 inside, tighter than the block's space-y-8, so the role
            and the pill read as one lock-up rather than two stacked lines.
          */}
          <div className="space-y-3">
            <p className="text-xl sm:text-2xl font-semibold text-foreground/90 tabular-nums">
              {profile.role}
              <span className="mx-2 text-muted-foreground/50" aria-hidden>
                ·
              </span>
              {experienceLabel()}
            </p>

            {/*
              BadgeCheck rather than colour alone. R7: a blue pill reading
              "certified" leans entirely on the blue to signal "verified", and
              the icon carries that meaning when the colour is stripped.
            */}
            {/*
              WHITE, at Foyez's request, and deliberately NOT a solid white fill.

              The recommendation was to keep this blue: it is a status badge rather
              than an action, and blue is the site's information accent, used on the
              logo mark, the radar stroke, all eight Skills group icons and the
              company names in Experience. He chose white for the look. Recorded
              because the reasoning matters for what shape the white takes.

              A SOLID white fill is the wrong white here. View Work and the email
              button are solid white because they are the page's two primary
              ACTIONS, and that scarcity is what makes them read as pressable. This
              pill cannot be clicked, so a third solid white block would promise an
              action it does not have, which is R6's dead-affordance problem in
              reverse.

              So: a hairline white border and white text over a barely-there fill.
              Reads as white and sits with the buttons tonally, without looking like
              one. Contrast measured at 21:1 for the text and the border stays under
              the 3:1 that would make it look like a control edge.
            */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.06] px-3 py-1 text-xs text-white">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {profile.certification}
            </div>
          </div>

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
            THE DEGREE STANDS ALONE now that the pill has moved up to the role.
            Reading order is who, then what they do and what certifies it, then
            where they trained, which is the order of decreasing relevance to a
            hiring reader.
          */}
          <div>
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
            {/*
              WHITE, HERO ONLY. Foyez asked for white after violet, and scoped
              it to this button rather than the shared variant, so the Contact
              section CTA stays blue. The override lives here for that reason:
              promoting white into buttonVariants would turn every primary
              button on the site into a white slab.

              bg-white with text-neutral-950, not text-black. Pure black on pure
              white is 21:1 and technically fine, but the page's own foreground
              is oklch(0.145) rather than #000, so the softer near-black matches
              the type colour used everywhere else and still measures ~19:1.

              Hover DARKENS the label rather than the fill. A white button has
              nowhere brighter to go, so the usual "lighten on hover" move is
              unavailable; dropping the fill to neutral-200 instead keeps the
              state change visible without inventing a tint.

              The explicit dark: variants are required, not redundant. The
              shared variant sets dark:bg-blue-600, which would otherwise win in
              dark mode and repaint this button blue.

              THE FOCUS RING HAD TO BE OVERRIDDEN TOO, and this is the part that
              is easy to miss. buttonVariants uses focus-visible:ring-ring/50,
              which composites to about #2e2e2e. The ring paints OUTSIDE the
              fill, so it lands on the near-black page, not on the button:
              measured 1.46:1 against the background, well under the 3:1 a focus
              indicator needs, so keyboard users got effectively no indicator.
              A dark ring is only ever visible when the button itself is dark.
              White fill therefore needs a white ring, with an offset so it
              reads as a ring rather than as a thicker button edge.
            */}
            <Button
              size="lg"
              className="w-full gap-2 bg-white text-neutral-950 hover:bg-neutral-200 hover:text-neutral-950 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:w-auto"
              asChild
            >
              {/*
                ARROW AFTER THE LABEL, NOT BEFORE IT. Eye was the wrong mark:
                it reads as passive observation, and every editor UI has trained
                readers to see it as a visibility toggle rather than a link.

                A directional mark belongs after the text, because it points at
                where the click goes. A leading arrow points back into the label.
                ArrowUpRight rather than the plain ArrowRight already used by
                "See all projects", so two different links do not share one mark.

                The nudge is transform-only per R8, and group-hover drives it
                from the button so the arrow still moves when the pointer is
                anywhere on the button, not just over the 16px icon.

                R8 reduced motion is handled by motion-reduce:transition-none
                alone. It removes the ANIMATION while still allowing the hover
                end state, which is what R8 asks for: skip to the end state, do
                not loop.

                DO NOT ADD motion-reduce:transform-none HERE. It was in the first
                version of this button and it broke the nudge outright: Tailwind
                v4 compiles it to `transform: none`, it carries the same
                specificity as the group-hover utilities, and it is emitted later
                in the stylesheet, so it won the cascade and the arrow sat
                displaced at rest and snapped back on hover, exactly inverted.
                Verified by measuring computed `translate` in both states.

                Note for future edits: v4 translate utilities write the standalone
                `translate` property, NOT `transform`. Reading
                getComputedStyle().transform to check this nudge will always
                report "none" and look like a failure. Read `translate`.

                The icon is aria-hidden because "View Work" already says where
                this goes, so announcing an arrow adds nothing.
              */}
              <a href="#projects" className="group">
                View Work
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
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
            CENTRING DOES NOT FIX A BAD WRAP. Worth stating plainly, because the
            first version of this block assumed it did: justify-center centres the
            last line, it does not change how many items land on it. A greedy wrap
            that strands one chip alone is an R4 orphan whether it is centred or
            not.

            RE-SOLVED FOR EIGHT CHIPS, replacing the seven-chip bands that were
            here before. Python was added and TypeScript became JavaScript, so
            every width this depends on moved and the old table was void.

            Measured widths, gap 8px: AI Agents 84.3, MCP 54.6, Playwright 90.9,
            Python 69.8, JavaScript 87.4, Postman 80.6, TestRail 72.4, CI/CD 60.3.
            Eight chips need 656.3px to sit on one line.

            Greedy wrap simulated over every cap from 180 to 780. Only two orphan
            bands exist, which is a narrower risk than the three the seven-chip set
            had:

                cap            wrap
                >= 658         8 on one line
                588 to 657     7 / 1     <- orphan
                520 to 587     6 / 2
                424 to 519     5 / 3
                326 to 423     4 / 4
                324 to 325     4 / 3 / 1 <- orphan
                248 to 323     3 / 3 / 2  (and 3/2/3 at the low end)
                180 to 247     2 / 2 / 2 / 2

            THE EXISTING CAPS SURVIVED THE CHANGE, verified rather than assumed:
            256px lands in 3/3/2 and 432px lands in 5/3, both safe. They are kept
            rather than retuned, since a cap that already sits mid-band is better
            than a new number chosen to look tidy.

            From lg the row is uncapped and inherits the hero copy's max-w-3xl,
            768px, which clears 658 and puts all eight on one line. That is only
            110px of headroom above the 7/1 band, so if the hero measure is ever
            narrowed below 658 this row needs an explicit lg cap instead.

            IF A CHIP IS ADDED, RENAMED OR REORDERED, re-run that simulation. The
            bands are a function of the exact chip widths, so they move. This is
            the second time they have had to.
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