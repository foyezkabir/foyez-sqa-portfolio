import { Button } from "./ui/button";
/*
  ArrowUpRight was dropped when View Work was removed on 2026-08-11. It was the only
  consumer, so the import went with the button rather than being left behind as dead
  weight in the bundle.
*/
import { FileDown, Mail, BadgeCheck, Github, Linkedin } from "lucide-react";
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

  NINE CHIPS SINCE 2026-10-26: Foyez asked for Appium directly after Playwright,
  the day he added it to his toolset (recorded in cv-data.txt, superseding the
  July note that automation was web only). Bands re-derived again; see the row.
*/
const techStack = [
  "AI Agents",
  "MCP",
  "Playwright",
  "Appium",
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
          {/*
            SHARPENED, at Foyez's choice, after comparing this hero with a peer
            SQA portfolio whose tagline is a single hard line.

            It read "Building automation systems teams actually trust." That was
            good: it named an outcome rather than an activity, and "actually" did
            real work. What it did not do was say the one thing no other QA CV on
            the pile can say.

            The replacement is a two-beat contrast, and the contrast IS the point.
            The first half is the machine's job, the second is his, and a reader
            takes away that he is not selling automation for its own sake. It also
            echoes the closing line of Automation-First, "the part a tool cannot
            do, deciding what is worth testing", so the hero and that section now
            argue the same thing rather than two unrelated things.

            R5: BOTH HALVES TRACE. The agents are cv-data.txt line 122, "Built a
            suite of Claude Code agents automating core QA workflows", and six
            public repositories. The judgement half is line 33's "requirement
            analysis, test planning, and end-to-end validation" plus the TulipTech
            leadership bullets. Nothing here is a new claim.

            NO METRIC, DELIBERATELY. The obvious "punchier" move is a number, and
            this template shipped with three invented ones that had to be torn out.
            A contrast that is true beats a figure that is not.
          */}
          <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-balance">
            Agents do the repetitive work. I own the judgement.
          </p>

          {/*
            REWRITTEN BECAUSE THE NEW TAGLINE MADE IT REDUNDANT, and a screenshot
            caught it where the measurements did not.

            It read "Hand over a product and I own quality end to end, from test
            strategy to release sign-off, with AI agents doing the repetitive
            work." Sitting under "Agents do the repetitive work. I own the
            judgement." that repeated BOTH halves of the line above it, in the same
            order, within 40px. The reader met the same idea twice before reaching
            the buttons.

            A supporting line under a claim should say what the claim does not.
            The tagline states the division of labour; this now says what that
            division BUYS a team, which is the end-to-end ownership and the
            sign-off, and it names the deliverable rather than restating the
            arrangement.

            R5: unchanged in substance, still cv-data.txt line 33's requirement
            analysis, test planning and end-to-end validation, plus the TulipTech
            release sign-off bullets. Only the framing moved.
          */}
          <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
            Hand over a product and quality is owned end to end, from test
            strategy through to release sign-off.
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
            FOUR CONTROLS, ALL LABELLED, ALL WITH REAL DESTINATIONS. Set by Foyez
            2026-08-11: Contact, LinkedIn, GitHub and Download Resume, and nothing
            else.

            VIEW WORK WAS REMOVED AT HIS REQUEST. It pointed at #projects, an in-page
            scroll, and it was the only control here that did not leave the page. The
            nav carries Work, and the page scrolls, so the destination is not lost.
            What goes in its place is the emphasis: Contact is now the primary and
            solid white, which is the correct hierarchy for a portfolio hero anyway.
            Contact was always the real goal; View Work was a step on the way to it.

            THE ICON-ONLY SOCIAL ROW ADDED EARLIER THE SAME DAY IS GONE. It was the
            right answer to a different question, keeping a fourth CTA from flattening
            a three-step ladder. Foyez has now asked for all four as peers, so icons
            without labels would be the odd ones out. Labelled buttons also state
            their destination without relying on glyph recognition, which is better
            for the two links whose logos a reader may not know.

            EMPHASIS: solid white, then three outlines. One primary and three peers,
            rather than four equals or a four-step ladder nobody can read. Contact is
            the action worth taking; LinkedIn, GitHub and the CV are all "find out
            more", so they share a weight. Ghost was dropped for the resume because at
            four items a near-invisible fourth button reads as disabled next to three
            outlined ones.

            R6 ON ALL FOUR. Every one renders only when its URL exists: mailtoHref is
            derived from profile.email, and the other three are guarded on
            profile.linkedinUrl, profile.githubUrl and profile.resumeUrl. Emptying any
            value in profile.ts removes that control rather than leaving a dead one.

            THE WRAP HAD TO BE CAPPED, AND THE FIRST VERSION OF THIS COMMENT WAS
            WRONG ABOUT IT. It claimed four items would wrap 2/2 on their own. Measured
            at 640px, the width where the full-width stack ends and the row begins,
            they wrapped 3/1 with Download Resume stranded alone: the exact R4 orphan
            the three-button version had already been fixed for, reintroduced by the
            fourth item.

            THE ARITHMETIC, so the next person does not have to rediscover it. The four
            buttons measure 112 + 120 + 109 + 193 and take three 16px gaps, so one line
            needs 582px. At 640px the container is about 561px, just under, so the
            greedy wrap takes three and drops the widest onto its own line. At 768px
            the container is 689px and all four fit.

            THE CAP HAD TO BE DERIVED, NOT PICKED. max-w-md was tried first and did
            nothing: it applied correctly at 448px and the row still wrapped 3/1,
            because Contact, LinkedIn and GitHub plus two gaps are only 373px and fit
            inside it comfortably. A cap that is wider than the thing it is meant to
            exclude is not a cap.

            The window is bounded on both sides. It must be at least the widest PAIR,
            GitHub plus Download Resume plus a gap, 318px, or the second row breaks
            too. It must be under the first TRIPLE, 373px, or three still fit. So any
            value from 318 to 372 works and everything outside fails. 340px sits in
            the middle with roughly 20px of margin either side, which is enough to
            absorb a label or font-metric change without silently reverting to 3/1.

            Tailwind's own steps miss this window: max-w-sm is 384px, above it, and
            max-w-xs is 320px, inside but only 2px clear of the lower bound. Hence the
            arbitrary value.

            THE CAP LIFTS AT md, NOT lg, AND THAT BOUNDARY WAS ALSO MEASURED. Released
            at lg first, which was too late: 768px has 689px of container against the
            582px one line needs, so it was showing a 2/2 that had room to be a single
            row. Moving the release to md restores 4-across from 768 while 760px, just
            below it, still wraps a clean 2/2.

            So the full ladder is: full-width stack below 640, balanced 2/2 from 640 to
            767, one row from 768 up.

            Below sm they stay a full-width stack, one per line. That reads as a
            deliberate mobile layout rather than a bad wrap, and the targets are easier
            to hit.

            Verified at 390, 640, 700, 768, 800, 1024, 1280 and 1920: every width is
            either 4-across, a clean 2/2, or the full-width stack. No mixed shape with a
            stranded last item at any width.

            EXTERNAL LINKS CARRY target="_blank" AND rel="noreferrer noopener", and
            say so in an aria-label, so a screen reader user is told the tab will
            change before they activate it. The resume is a download and the mailto
            hands off to a mail client, so neither takes a new tab.
          */}
          <div className="mx-auto flex flex-col items-stretch gap-4 pt-2 sm:max-w-[340px] sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:max-w-none">
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
            {/*
              CONTACT INHERITED THE WHITE TREATMENT FROM VIEW WORK, and the whole
              override had to move with it rather than being left behind on a deleted
              button. Every line below is load bearing:

              WHITE, HERO ONLY. Foyez asked for white after violet, scoped to this
              button rather than the shared variant, so the Contact SECTION's own CTA
              stays blue. Promoting white into buttonVariants would turn every primary
              button on the site into a white slab.

              bg-white with text-neutral-950, not text-black. Pure black on pure white
              is 21:1 and technically fine, but the page's own foreground is
              oklch(0.145) rather than #000, so the softer near-black matches the type
              colour used everywhere else and still measures about 19:1.

              Hover DARKENS the label rather than the fill. A white button has nowhere
              brighter to go, so the usual "lighten on hover" move is unavailable;
              dropping the fill to neutral-200 keeps the state change visible without
              inventing a tint.

              The explicit dark: variants are required, not redundant. The shared
              variant sets dark:bg-blue-600, which would otherwise win in dark mode and
              repaint this button blue.

              THE FOCUS RING HAD TO BE OVERRIDDEN TOO, and this is the part that is
              easy to miss. buttonVariants uses focus-visible:ring-ring/50, which
              composites to about #2e2e2e. The ring paints OUTSIDE the fill, so it
              lands on the near-black page rather than on the button: measured 1.46:1
              against the background, well under the 3:1 a focus indicator needs, so
              keyboard users got effectively no indicator. A dark ring is only ever
              visible when the button itself is dark. White fill therefore needs a
              white ring, with an offset so it reads as a ring rather than as a
              thicker button edge.
            */}
            <Button
              size="lg"
              className="w-full gap-2 bg-white text-neutral-950 hover:bg-neutral-200 hover:text-neutral-950 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:w-auto"
              asChild
            >
              <a href={mailtoHref}>
                <Mail className="w-4 h-4" aria-hidden />
                Contact
              </a>
            </Button>
            {profile.linkedinUrl && (
              <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto" asChild>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile, opens in a new tab"
                >
                  <Linkedin className="w-4 h-4" aria-hidden />
                  LinkedIn
                </a>
              </Button>
            )}
            {profile.githubUrl && (
              <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto" asChild>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile, opens in a new tab"
                >
                  <Github className="w-4 h-4" aria-hidden />
                  GitHub
                </a>
              </Button>
            )}
            {profile.resumeUrl && (
              <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto" asChild>
                <a href={profile.resumeUrl} download>
                  <FileDown className="w-4 h-4" aria-hidden />
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

            RE-SOLVED FOR NINE CHIPS, the third re-derivation, when Appium joined
            after Playwright on 2026-10-26 at Foyez's request.

            Measured widths, gap 8px: AI Agents 84.3, MCP 54.6, Playwright 90.9,
            Appium 74.9, Python 69.8, JavaScript 87.4, Postman 80.6, TestRail
            72.4, CI/CD 60.3. Nine chips need 739.2px to sit on one line.

            Greedy wrap simulated over every cap from 180 to 820. Three orphan
            bands this time:

                cap            wrap
                >= 740         9 on one line
                671 to 739     8 / 1         <- orphan
                591 to 670     7 / 2
                502 to 590     6 / 3
                407 to 501     5 / 4
                403 to 406     4 / 5
                335 to 402     4 / 4 / 1     <- orphan
                329 to 334     4 / 3 / 2
                249 to 328     3 / 3 / 3
                230 to 248     2 / 2 / 2 / 3  (and 3/2/2/2 at the top)
                180 to 229     2 / 2 / 2 / 2 / 1 <- orphan

            THE EXISTING CAPS SURVIVED AGAIN, verified live rather than assumed:
            256px lands in 3/3/3 and 432px lands in 5/4, both mid-band, both
            balanced. Rendered wraps confirmed at 390 (3/3/3), 800 (5/4), 1280
            and 1920 (one line).

            From lg the row is uncapped and inherits the hero copy's max-w-3xl,
            768px, which clears 739.2 and puts all nine on one line, BUT THE
            HEADROOM IS NOW 28.8px, down from 110. A tenth chip, or renaming any
            chip more than a couple of characters longer, cannot fit one line in
            768 and will land in the 8/1 orphan band: at that point this row
            needs an explicit lg cap in a safe band (591 to 670 or 502 to 590)
            instead of lg:max-w-none.

            IF A CHIP IS ADDED, RENAMED OR REORDERED, re-run that simulation. The
            bands are a function of the exact chip widths, so they move. This is
            the third time they have had to.
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