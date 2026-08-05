import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/**
 * Three real roles, newest first. Every claim traces to cv-data.txt.
 *
 * The leadership on card 1 is the most important thing in this section and it is
 * NOT on the CV. Every TulipTech bullet there is individual-contributor language
 * ("Authored test cases", "Developed scripts", "Performed manual testing"), which
 * undersells two products led end to end, a junior mentored, an MVP carried to
 * launch and a second product delivered through client demos. Foyez supplied
 * those facts separately, so this section states them plainly.
 *
 * SRS, STS, UIS and RTM stay spelled out on card 2 on purpose. What I Bring
 * deliberately avoids the acronyms because readability is the better pitch, but
 * they are recruiter and ATS keywords and need to be searchable somewhere on the
 * page. This is that somewhere.
 *
 * Card 1 says led QA across web, mobile and desktop, and stops there. It does
 * not say automated across three platforms, because automation is web only.
 * Those are two separate facts and merging them would be a false claim.
 *
 * Bullets rather than a paragraph, at Foyez's call. The first build put each role
 * in one block of running prose, which came out at 599 and 555 characters and
 * read as a wall. Nobody scans a wall. Bullets also match how a reader already
 * expects an experience section to be laid out, so the strongest claim on the
 * page (led QA end to end) now gets its own line instead of being buried
 * mid-sentence.
 *
 * One claim per bullet, front-loaded with the verb, so the left edge of the list
 * reads as a list of actions: Led, Drove, Delivered, Authored, Built.
 *
 * TULIPTECH IS SPLIT INTO TWO LABELLED GROUPS, and the copy below is Foyez's
 * own, supplied verbatim on 2026-07-30 and recorded in cv-data.txt under
 * EXPANDED TULIPTECH SCOPE. He owns the role, so he gets to say what it did.
 *
 * The two groups are the point of the split. Core QA work and agent-building are
 * genuinely different workstreams, and a flat eleven-bullet list would have
 * buried the second one. A reader skimming for "can this person own delivery"
 * and a reader skimming for "can this person build AI tooling" both find their
 * answer under a heading instead of hunting through prose.
 *
 * The first group is "QA Strategy & Execution", Foyez's wording, settled after
 * three rejected attempts. The history is worth keeping because each rejection
 * was for a different and legitimate reason:
 *
 *   "Quality Assurance Leadership" overclaimed. Only four of its six bullets are
 *   leadership (led two products, drove PharmaZ247 to launch, delivered LolerFlow
 *   through sign-off, mentored the junior engineer). Authoring SRS / FRD / RTM
 *   and designing and executing test cases in TestRail are individual-contributor
 *   work, and a heading that fits two thirds of its own list is the kind of thing
 *   an interviewer picks at first.
 *
 *   "Quality Assurance" was tautological. The job title directly above it is SQA
 *   Engineer, so the label repeated the role and told a reader nothing.
 *
 *   "Responsibilities" was accurate but generic. CV guidance advises against
 *   vague headings that convey no expertise, and against task-framing in place of
 *   achievement-framing. It shipped briefly before Foyez replaced it.
 *
 * The final label fits all six bullets without overclaiming: strategy covers the
 * leading and the documentation, execution covers the TestRail work and the
 * delivery. It also pairs as a contrast with the second group, which is what he
 * built rather than what he owns.
 *
 * The leadership signal does not depend on the label. The group opens on "Led
 * end-to-end QA for two client products" and closes on the mentoring bullet, so
 * the evidence is the first and last thing a reader meets either way, and What I
 * Bring card 1 carries the message as a title higher up the page.
 *
 * Only TulipTech is grouped. Shadhin and A1qa stay flat, because neither has two
 * distinct workstreams to separate, and inventing headings to make the cards
 * match would be symmetry for its own sake.
 *
 * KNOWN TRADEOFF, measured not guessed. These bullets are Foyez's wording and
 * they are long: the longest is 190 characters against the ~100 the previous
 * draft held to. At 390px that renders as a 9-line bullet, because a card only
 * gives about 223px of text width there, which measures 25 characters per line,
 * and it pushes this card to 2516px tall on a phone against 990px on a laptop.
 * Desktop is unaffected and reads well at 3 lines and 91 characters per line.
 * The copy is his call and it ships as written; the mobile cost is reported
 * rather than silently edited away.
 *
 * The `projects` chips carry the names the bullets have no room for. Card 3 has
 * none and renders without the row, rather than with an empty one.
 */
/*
  EXPORTED because the /projects page in Module 6 lists the same ten Shadhin
  products with the same one-line summaries and the same links. Two copies of that
  list would be two things to keep in step, and the ten-project count has already
  had to move twice in one afternoon. One array, one place to change it.
*/
export const experiences = [
  {
    role: "SQA Engineer",
    company: "TulipTech",
    years: "Mar 2026 - Present",
    groups: [
      {
        title: "QA Strategy & Execution",
        bullets: [
          "Led end-to-end QA for two client products, owning test strategy, execution, and stakeholder communication from development through release.",
          "Drove PharmaZ247, a multi-tenant pharmacy ERP and telehealth platform, from MVP to market launch, testing across web, mobile, and desktop clients under DGDA pharmacy compliance requirements.",
          "Delivered LolerFlow, a UK LOLER compliance platform with simPro integration, including client-facing demos and sign-off milestones.",
          "Authored business and requirement documentation post-testing (SRS, FRD, RTM) to formalise scope and traceability for stakeholders.",
          "Designed and executed test cases in TestRail, tracking coverage and results through structured test execution cycles and reporting.",
          "Mentored one junior QA engineer, reviewing test cases and providing hands-on guidance on execution standards.",
        ],
      },
      {
        title: "AI-Driven QA Automation",
        bullets: [
          "Built a suite of Claude Code agents automating core QA workflows, including test case authoring with direct TestRail import via API, significantly reducing manual documentation time.",
          "Developed agents generating Playwright automation scripts using the Page Object Model (POM) pattern, and API test collections in Postman, directly from Jira tickets and requirements.",
          "Created an exploratory testing agent that navigates business logic flows, captures defect screenshots, and files structured bug reports for both frontend and API issues.",
          "Built documentation-generation agents producing SRS, FRD, and RTM artifacts, with verification against Figma designs to ensure implementation accuracy.",
          "Designed an orchestrator layer coordinating outputs across the agent suite, serving as the sole Jira-facing interface and resolving conflicts between agent-generated results.",
        ],
      },
    ],
    projects: [
      {
        name: "PharmaZ247",
        url: "",
        summary:
          "A multi-tenant pharmacy ERP and telehealth platform: FEFO inventory under DGDA compliance, POS, and separate doctor and customer portals.",
        tags: [],
        platforms: [],
      },
      {
        name: "LolerFlow",
        url: "",
        summary:
          "A multi-tenant SaaS platform for UK LOLER lifting-equipment inspection: assets, defects, certificates, audit packs and a simPro integration.",
        tags: [],
        platforms: [],
      },
      {
        name: "StretchSense MDM",
        url: "",
        summary:
          "An enterprise XR device management platform for centralised device management, security and scalability.",
        tags: [],
        platforms: [],
      },
      // The only TulipTech project with a link in the CV PDF.
      {
        name: "Empathika",
        url: "https://empathika.com/",
        summary:
          "An AI-powered care home management platform covering medication, care planning, HR and compliance.",
        tags: [],
        platforms: [],
      },
    ],
  },
  {
    role: "QA Engineer",
    company: "Shadhin Technologies Ltd.",
    years: "Jun 2023 - Feb 2026",
    groups: [
      {
        title: null,
        /*
          TEN BULLETS, ONE PER CV BULLET. Foyez said many were missing and he was
          right: this listed six against the CV's ten at lines 171 to 195, so four
          responsibilities were simply absent.

          What was missing, and why each one is worth the line:
            UI/UX validation      cv line 181. The only bullet here about judging a
                                  flow rather than executing against it.
            Test plans and cases  cv line 184. Authoring, as distinct from the RTM
                                  bullet, which is only about traceability.
            Jira, Agile, Scrum    cv line 186. The most costly omission. Agile and
                                  Scrum are standard recruiter filter terms and this
                                  is the one place on the site that evidences them
                                  against a real role and date range.
            Ownership mindset     cv line 192. The only bullet about how he works
                                  rather than what he produced.

          ORDER IS THE CV'S ORDER, not a re-ranking, so the two can be diffed line
          by line by anyone checking. The wording is condensed to match the voice of
          this section, which states an action and stops, but no bullet adds a claim
          the CV does not make. Compare against cv-data.txt before editing any of
          them.
        */
        bullets: [
          "Delivered QA across ten products on web and mobile.",
          "Covered requirement analysis through functional, regression, integration and UAT testing.",
          "Turned stakeholder conversations into structured SRS, STS and UIS documents.",
          "Maintained a Requirements Traceability Matrix (RTM) linking requirements to test cases and defects.",
          "Reviewed UI and UX flows against business rules and usability standards, flagging gaps and recommending fixes.",
          "Wrote and maintained test plans, test scenarios and requirement-linked test cases.",
          "Tracked requirements, tasks and defects in Jira across Agile and Scrum sprints, from planning through stand-ups to retrospectives.",
          "Contributed to the Playwright, Cypress and Selenium automation effort and its CI execution.",
          "Took ownership of quality risk, surfacing it early and working it through in hybrid and remote teams.",
          "Mentored QA interns on requirement analysis and documentation standards.",
        ],
      },
    ],
    /*
      Ten, ordered by Foyez's own ranking rather than by the CV. He set the
      sequence explicitly on 2026-07-30: Purbachol, Quran with Maryam, the two
      NRB products, Billions for Bangladesh, Host-A-Akhor, Docadvisor, Looop
      Denki, postJini, Black Pigeon HR.

      That replaces the previous rule, which was CV order with the two non-CV
      projects appended. His ranking wins because he knows which of these carry
      the most weight and a reader scans a row left to right, so the strongest
      work belongs at the front. Eight are on the CV; NRBFS and postJini are not.

      An earlier version named only three and let the count bullet carry the rest,
      which undersold a genuinely broad track record for no gain.

      The bullet says "ten products" and the row holds ten chips. Those two
      numbers have to move together, so changing one without the other is the
      obvious way for this card to start lying. It has already had to move twice,
      eight to nine to ten, in a single afternoon.

      URLs are the ones embedded as hyperlink annotations in the CV PDF, read out
      of the file rather than retyped, then each one checked with a real request.
      Seven of the eight CV links returned 200.

      Two exceptions, both deliberate:
        NRB World: the CV points at https://app.nrbworld.org/, which resolves to
        13.213.186.11 but times out on connect. The apex nrbworld.org answers
        200, so the chip uses that. The CV itself still needs fixing.
        Black Pigeon HR: no link in the CV, and the CV marks it ongoing. It
        renders as a plain chip rather than a broken one.

      "Purbachol Water Supply" is shortened from the CV's "Purbachol Water Supply
      Project (PWSP)". The full string is about 250px as a chip, wider than the
      245px a card gives at 390px, so it would have overflowed on a phone.
    */
    projects: [
      // Purbachol: Foyez's replacement for the CV's app.rajukpws.com/login. Both
      // answer 200, so this is not a broken-link fix: it swaps a login form for
      // the public landing page, the more useful destination for a reader who
      // has no account and will not be creating one.
      {
        name: "Purbachol Water Supply",
        url: "https://www.rajukpws.com/",
        summary:
          "Water supply portal for Purbachal New Town, run by RAJUK with United Delcot Water Limited: new connection applications, account transfers, billing and rates, and a complaints channel.",
        tags: ["Utility billing", "Customer portal", "Complaints handling", "Government utility"],
        platforms: ["Web"],
      },
      {
        name: "Quran with Maryam",
        url: "https://www.maryamandfatima.com/",
        // Condensed from the CV's 160-character original, which is the longest
        // project line on the whole document. It was shortened when these
        // summaries were tooltips; it stays shortened because the /projects rows
        // read better at this length too.
        summary:
          "An online resource for studying the Quran and Dua, aimed at beginners and scholars alike, with interactive learning tools and the hiring of knowledgeable individuals for Islamic events.",
        tags: ["Quran and Dua", "Learning platform", "Interactive tools", "Bookings"],
        platforms: ["Web", "Android", "iOS"],
      },
      /*
        The two NRB products sit together because Foyez ranked them that way.
        Note this is the opposite of an earlier decision in this file, which
        deliberately separated them so the shared prefix would not imply a
        relationship. His ranking overrides that: he knows whether they are
        related and it is his track record.

        NRB World uses the App Store listing, the live canonical product now that
        the CV's app.nrbworld.org is dead. Country code deliberately dropped:
        Foyez supplied apps.apple.com/ci/app/nrb-world/id6474484953, and that
        /ci/ segment pins every visitor to the Cote d'Ivoire storefront. The
        country-less form is the same app ID, also 200, and sends each visitor to
        their own storefront.

        nrbworld.org also answers 200 and would work in any browser, where an App
        Store link only helps iOS visitors. Foyez's rule is app where an app is
        the product, web where web is, so the App Store link stays.

        NRBFS is "NRB Family Support", read off its own Play Store listing rather
        than assumed. An earlier note here guessed "FS" might mean Financial
        Services. It does not. That is exactly why the chip shipped as a bare
        name until the link arrived.
      */
      {
        name: "NRB World",
        url: "https://apps.apple.com/app/id6474484953",
        summary:
          "A social network for Bangladesh's non-residents: category-based circulation to reach a targeted audience, follows and recommendations, mentions and hashtags, and instant notifications.",
        tags: ["Social networking", "Feeds and hashtags", "Push notifications", "Search and follow"],
        platforms: ["Web", "Android", "iOS"],
      },
      {
        name: "NRBFS",
        url: "https://play.google.com/store/apps/details?id=com.nrbfs.nrbfs&hl=en",
        // Not from the CV. Taken from the app's own Play Store listing, which
        // describes it as a "trusted digital gateway for essential services".
        summary:
          "NRB Family Support. A service coordination platform for non-resident Bangladeshis, covering document applications such as NID and passport renewal, travel, healthcare and property management.",
        tags: ["Service coordination", "Document applications", "Healthcare and travel", "Property management"],
        platforms: ["Web", "Android", "iOS"],
      },
      {
        name: "Billions for Bangladesh",
        url: "https://billionsforbangladesh.com/",
        summary:
          "A platform dedicated to empowering the people of Bangladesh through initiatives and programmes, with the stated aim of raising billions of dollars for the country.",
        tags: ["Fundraising", "Programmes and initiatives"],
        platforms: ["Web", "Android"],
      },
      {
        name: "Host-A-Akhor",
        url: "https://www.hostakkhor.com/",
        summary:
          "A platform for storing old writings and voices.",
        tags: ["Archive", "Writing and audio"],
        platforms: ["Web", "Android", "iOS"],
      },
      {
        name: "Docadvisor",
        url: "https://www.docadvisor.xyz/",
        summary:
          "A generative AI doctor recommendation system: share symptoms at any hour and it points you to the best specialised doctor nearby.",
        tags: ["Generative AI", "Symptom input", "Specialist matching", "Healthcare"],
        platforms: ["Web"],
      },
      {
        name: "Looop Denki",
        url: "https://looop-denki.com/home/",
        summary:
          "A Japanese electricity retailer: a tariff simulator, online signup in about five minutes, automatic bill discounts, and no contract lock-in or cancellation fee.",
        tags: ["Electricity retail", "Tariff simulation", "Online signup", "Japan"],
        platforms: ["Web"],
      },
      // The two without links land last, which is a useful side effect of the
      // ranking rather than the reason for it: the row now runs linked chips
      // first and plain ones at the end, so the clickable group reads as a block.
      {
        // "PostJini", capital P, confirmed by Foyez on 2026-07-30. He first wrote
        // it as "postJini" and that shipped verbatim while the styling was
        // unconfirmed; this is the settled spelling.
        name: "PostJini",
        url: "",
        // Foyez's own description. Not on the CV.
        summary:
          "Schedules and publishes social media posts to Facebook, Instagram and X.",
        tags: ["Social scheduling", "Facebook, Instagram, X"],
        platforms: [],
      },
      {
        name: "Black Pigeon HR",
        url: "",
        summary:
          "A platform to make the hiring process easy. Ongoing.",
        tags: ["Recruitment"],
        platforms: [],
      },
    ],
  },
  {
    role: "Functional Testing (Intern)",
    company: "A1qa",
    years: "Apr 2023 - Jun 2023",
    groups: [
      {
        title: null,
        bullets: [
          "Tracked and documented defects through to resolution.",
          "Managed tasks, sprint planning and issue tracking in Jira.",
          "Designed test surveys to surface issues early.",
        ],
      },
    ],
    projects: [],
  },
];

export function Experience() {
  return (
    <section className="px-8 section-y">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          {/*
            Ramps down at the narrow end per the responsiveness gate, and still
            resolves to text-5xl from 640px up so it matches every other section
            heading on desktop.
          */}
          <h2 className="text-4xl sm:text-5xl font-bold">Experience</h2>
          {/*
            Replaces template copy ("across different scales and industries",
            which claimed a breadth of industry nobody had checked). This states
            the actual arc of the three cards below: the intern role tracked
            defects someone else triaged, the current role signs off releases.
          */}
          <p className="text-lg text-muted-foreground">
            Three roles, one direction: from tracking defects to owning the release
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.company} className="relative group">
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold">{exp.role}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground tabular-nums px-3 py-1 bg-background/50 border border-border/50 rounded-lg">
                    {exp.years}
                  </span>
                </div>
                {/*
                  One block per workstream. A group with no title renders just
                  its list, so the single-group roles are not paying for a
                  heading they do not have.

                  list-disc is needed explicitly: the Tailwind base layer strips
                  list styling from every ul, which is what the project chip row
                  below relies on. Markers are tinted to match the company line
                  rather than left at full-strength foreground, so they punctuate
                  the list without competing with the text.

                  THE MEASURE IS CAPPED, AND THE CAP MOVED FROM 3xl TO 5xl. Foyez
                  pointed out that the bullets were leaving a wide empty gutter on
                  the right and asked for the space to be used.

                  He was right, and the cause was drift rather than a bad decision.
                  This cap was solved when the card was 960px of usable width, and
                  3xl's 768px put the longest line at about 91 characters, which was
                  the target. Aligning every section to max-w-6xl widened the card to
                  1152px, so the same 768px cap suddenly left 351px unused: 74
                  characters of text beside a third of a card of nothing.

                  5xl restores the ORIGINAL INTENT at the new card width. Measured
                  against the rendered font rather than estimated: 1024px is about 92
                  characters, which is the same measure the 960px card was tuned to,
                  and roughly 40px still breathes before the padding.

                  It is deliberately NOT uncapped. Full width measures about 104
                  characters, past the point where the eye reliably finds the start of
                  the next line, and readability is the entire reason these are
                  bullets rather than a paragraph. Using the space is not the same as
                  using all of it.

                  IF THE SECTION CONTAINER WIDTH CHANGES AGAIN, re-derive this. The
                  cap is a function of the card width, and it has now drifted once.
                */}
                <div className="mt-5 space-y-5">
                  {exp.groups.map((groupItem) => (
                    <div key={groupItem.title ?? "ungrouped"}>
                      {groupItem.title && (
                        /*
                          h4 keeps the outline intact: h2 Experience, h3 role,
                          h4 workstream. Sized well below the h3 so it reads as a
                          divider inside the card rather than competing with the
                          job title, and left at full foreground so it separates
                          cleanly from the muted bullet text underneath.
                        */
                        <h4 className="mb-2 text-sm font-semibold tracking-wide text-foreground">
                          {groupItem.title}
                        </h4>
                      )}
                      <ul className="space-y-2 list-disc pl-5 max-w-5xl marker:text-blue-400/70">
                        {groupItem.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-muted-foreground leading-relaxed pl-1"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {exp.projects.length > 0 && (
                  /*
                    Stacked below sm, one row from sm up. Deliberately NOT a plain
                    flex-wrap, which orphans a chip on the last line across a wide
                    band of widths.

                    The chips are fixed-width pills, so the wrap is arithmetic and
                    was checked rather than eyeballed. The widest set needs 444px
                    on one line; the narrowest container at sm is 512px, so from
                    640px up neither set ever wraps. Below that the column stack
                    gives a uniform list instead of a ragged 2+1, which is the
                    only balanced option once a 146px chip cannot share a 245px
                    line with anything.

                    A flex-wrap here orphaned Shadhin as 2+1 from roughly 400px to
                    485px and TulipTech as 2+1+1 in the low 300s. Sampling only
                    390, 800, 1280 and 1920 reported clean, because 390 happens to
                    miss the bad band by 2px.

                    sm:max-w-lg is the second half of the fix, and it is load
                    bearing. Adding NRBFS as a ninth chip reintroduced an orphan:
                    the row wrapped 4+4+1 with NRBFS stranded alone, across every
                    viewport from 746px to 822px.

                    512px is not a round number picked by eye. The wrap was solved
                    arithmetically for both chip sets across every viewport from
                    640 to 1920, and 512 is the largest cap that is orphan-free
                    for both AND lands on a Tailwind scale value. It also happens
                    to equal the narrowest container the row ever gets at sm, so
                    the cap pins the width identically at every desktop size,
                    giving one layout that never reflows while resizing rather
                    than a row that reshuffles as the window moves.

                    THE CAP WAS RE-SOLVED AND RAISED, and this is the third time it
                    has had to be. Foyez asked why the chips were bundled into a
                    narrow block when the card has space to the right, and he was
                    right: the row sat at 512px inside 928px of available card, so
                    Shadhin's ten wrapped to three cramped lines beside empty space.

                    Two things had changed since 512 was correct. Removing the
                    outbound links took the external-link icon off every chip, so
                    every chip got narrower, and the widths this cap is a function
                    of all moved. Re-measured rather than assumed: Shadhin's ten now
                    need 1219px on one line, TulipTech's four need 445px, gap 8px.

                    RE-SOLVED ARITHMETICALLY ACROSS EVERY CAP FROM 440 TO 940, both
                    chip sets, testing for a last row holding a single chip while
                    another row holds more. Two orphan-free bands exist:

                        448 to 572     Shadhin 4+4+2   (the old 512 lives here)
                        676 to 940     Shadhin 5+5 to 7+3

                    AND A REAL ORPHAN BAND BETWEEN THEM, 576 to 672, where Shadhin
                    wraps 4+5+1 and strands Black Pigeon HR alone. That is exactly
                    why this was solved rather than widened by eye: raising the cap
                    to a comfortable-looking 640 would have shipped an R4 orphan.

                    sm:max-w-lg is kept for the band between 640 and 1024, where the
                    card itself is narrower and 512 is still the correct answer, so
                    the cap steps up only once there is room for it. Below sm the
                    column stack is unchanged.

                    RE-SOLVED A THIRD TIME after every section container was aligned
                    to max-w-6xl. That widened this card from 1024 to 1152, giving the
                    row 1086px of usable width, and the previous lg:max-w-none let it
                    use all of it: nine chips fitted on line one and Black Pigeon HR
                    was stranded alone across every width from 1232 to 1920. The
                    uncapped value was only ever safe while the card was narrower.

                    Re-solved arithmetically over every cap from 440 to 1156:

                        448 to 572      Shadhin 3+3+4
                        676 to 1084     Shadhin 5+5 through 8+2
                        1086 and up     Shadhin 9+1, orphan

                    So the lg value is an explicit max-w-4xl, 896px, which gives 7+3
                    and sits well inside the safe band rather than at its edge. 1084
                    is the true ceiling; choosing 896 leaves headroom for a chip to be
                    renamed a little longer without immediately tipping over.

                    THIS CAP IS TUNED TO THESE EXACT STRINGS and must be re-solved
                    whenever a chip is added, renamed, gains an icon, loses one, or
                    THE SECTION CONTAINER WIDTH CHANGES. It has now moved three times:
                    adding postJini as a tenth chip and turning NRBFS into a link kept
                    512 valid at 3+3+4, removing every link icon invalidated it, and
                    widening the container invalidated it again.
                  */
                  <ul
                    aria-label={`Projects at ${exp.company}`}
                    className="flex flex-col items-start gap-2 mt-5 sm:flex-row sm:flex-wrap sm:max-w-lg lg:max-w-4xl"
                  >
                    {exp.projects.map((project) => (
                      <li key={project.name}>
                        {/*
                          NAMES ONLY, NO OUTBOUND LINKS, at Foyez's instruction after
                          he asked whether Experience needs the names or the links
                          given /projects exists.

                          MEASURED FIRST RATHER THAN ARGUED. All nine linked projects
                          here appear on /projects with identical URLs, so every link
                          in this section was a duplicate of one over there.

                          The NAME is not a duplicate, which is why it stays. On
                          /projects these nine all render their outbound control as
                          the generic string "View Project" and the name is only a
                          card heading, grouped by project type. Here the name sits
                          under an employer and a date range, which is the one thing
                          /projects cannot express: that this work happened in that
                          role, in that period. Strip the names and a role becomes
                          "I tested some things".

                          The URL is what goes, for two reasons. It is redundant with
                          /projects, and nine outbound links in the middle of a CV are
                          nine invitations to leave the site before reaching Contact.
                          /projects is now the single owner of these URLs.

                          THE DATA KEEPS ITS url FIELDS ON PURPOSE. They are still
                          correct and still the source for /projects, so this is a
                          presentation decision expressed here rather than a deletion
                          that would have to be undone from the CV if Foyez reverses
                          it. Three of these entries already had url: "" and rendered
                          exactly like this, so no new visual case is introduced.

                          R6 is satisfied by construction now: there is no anchor and
                          no external-link icon anywhere in this list, so nothing
                          looks pressable and nothing is. The ExternalLink import went
                          with the anchor, since this was its only use in this file.
                        */}
                        <span className="inline-block px-3 py-1 bg-background/50 border border-border/50 rounded-lg text-xs text-foreground/80">
                          {project.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/*
                  THE REPLACEMENT FOR THE TOOLTIPS, and the reason this line exists
                  at all. Every chip used to reveal its one-line summary on hover
                  and on keyboard focus. That came out once /projects shipped,
                  because the tooltip had become a strictly worse copy of it: one
                  summary at a time, desktop only, and Radix deliberately never
                  opens a tooltip on touch, so phone visitors had never seen a
                  single one of them.

                  What the tooltip did usefully was signal that there was more to
                  know about these names. This line does that job in text, which
                  works on every device and needs no hover, and it is the honest
                  answer to "where did the descriptions go".

                  Rendered per role rather than once for the section, so it sits
                  directly under the names it refers to.
                */}
                {exp.projects.length > 0 && (
                  /*
                    A router Link, not an anchor. This stays inside the SPA, so it
                    does not re-download and re-run the bundle to reach a page the
                    visitor already has loaded.
                  */
                  <Link
                    to="/projects"
                    aria-label={`What each ${exp.company} project is, on the all projects page`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-400 no-underline transition-colors hover:text-blue-300 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded"
                  >
                    What each one is
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
