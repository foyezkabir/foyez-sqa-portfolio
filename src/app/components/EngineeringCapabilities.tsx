import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * Scored by depth of evidence, not confidence. Shipped and owned rates highest,
 * used on client projects sits in the middle, certified with lighter hands-on
 * rates lower. That rule is printed in the caption below the chart, so every
 * number can be argued from something concrete rather than asserted.
 *
 * The spread is deliberate. A radar sitting at 90 on every axis draws a flat
 * pentagon, tells a reader nothing, and reads as marketing.
 *
 * IMPROVED RATHER THAN REPLACED, at Foyez's instruction. Worth recording that an
 * earlier pass swapped this chart for horizontal bars on the argument that a radar
 * compresses magnitude. The measurement behind that was real, 17 points of score
 * rendering as 22px of radius, but replacing the chart was not what he asked for.
 * The radar is the section's visual identity and it stays.
 *
 * FOUR MEASURED PROBLEMS, all fixed inside the radar:
 *
 *   1. THREE AXIS LABELS RENDERED OUTSIDE THE CARD at 390px. "AI-Assisted QA",
 *      "Documentation" and "Automation" were clipped. Fixed by a responsive
 *      outerRadius, a derived textAnchor per label, and smaller padding on a phone.
 *
 *   2. THE SCORES WERE HOVER ONLY, so the radius did all the work and a 17-point
 *      spread looked like a regular pentagon. Every vertex now prints its score.
 *      The scale stays an honest 0 to 100: Foyez was offered a truncated scale to
 *      exaggerate the dips and chose to keep the geometry fair and let the digits
 *      carry the precision.
 *
 *   3. NO KEYBOARD OR TOUCH ACCESS. Measured zero focusable elements inside the SVG,
 *      and a tooltip never opens on touch, so on a phone the evidence did not exist.
 *      A visible evidence list was added and then REMOVED at Foyez's instruction,
 *      because it repeated the tooltip word for word. See the note on the sr-only
 *      list below: the evidence is hover-only again for sighted users, by his
 *      decision, with a screen-reader equivalent retained.
 *
 *   4. A FLAT 500px HEIGHT at every width, which gave a 213px-wide plot stretched
 *      to 500px tall on a phone. Now square via aspect, capped at 560px.
 *
 * The tooltip stays, but as an enhancement rather than the only way to read the
 * chart.
 */
const data = [
  {
    subject: "Manual Testing",
    value: 95,
    evidence: "Three years core in every role, plus ISTQB-CTFL certification.",
  },
  {
    subject: "AI-Assisted QA",
    value: 92,
    /*
      Repo names match github.com/foyezkabir exactly, including the QREW
      spelling. A portfolio that prints "AG-CREW" sends anyone who searches for
      it nowhere.

      Named MCP servers rather than the phrase "MCP tooling". The generic term
      is filler and bare "MCP" is an acronym a non-technical recruiter cannot
      place; Claude Code plus the specific servers reads as someone who has
      built with it. Claude Code is what AG-QREW's own README calls the AI
      backbone for agent orchestration.
    */
    evidence:
      "AG-QREW five-agent pipeline, QA-Scripter and qa-api-pilot, built on Claude Code with Playwright and Chrome DevTools MCP.",
  },
  {
    subject: "Documentation",
    value: 88,
    evidence: "Requirement specs, traceability matrix, reports and user manuals.",
  },
  {
    subject: "API Testing",
    value: 80,
    evidence: "Postman and Newman, with a 24-row negative test matrix.",
  },
  {
    subject: "Automation",
    value: 78,
    evidence: "Playwright, Cypress and Selenium on a strict Page Object Model.",
  },
];

/**
 * Hover readout.
 *
 * The numbers are hidden on the axis on purpose, but hiding them everywhere
 * leaves a reader able to see that one axis is longer without knowing by how
 * much. A tooltip resolves that on demand instead of cluttering the chart
 * permanently.
 *
 * Shows "88 / 100", never "88%". These are scores against the rubric in the
 * caption, not percentages of anything, and "88%" would invite exactly the
 * "percent of what?" question the framing is meant to avoid.
 *
 * Carries the evidence too, so the answer to "88 based on what?" arrives at the
 * moment the reader thinks to ask.
 */
function CapabilityTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: (typeof data)[number] }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;

  return (
    <div className="max-w-[300px] rounded-lg border border-border bg-background/95 px-3 py-2 shadow-xl backdrop-blur-sm">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-foreground">{d.subject}</span>
        <span className="text-sm tabular-nums text-foreground/70">{d.value} / 100</span>
      </div>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{d.evidence}</p>
    </div>
  );
}

/**
 * The label band is a function of viewport width, so the radius has to be too. This
 * cannot be done in CSS: outerRadius is a recharts prop, not a style.
 *
 * matchMedia rather than a resize listener on innerWidth. It fires only when the
 * query result actually flips, not on every pixel of a drag, and it needs no
 * debounce. The listener is removed on unmount.
 *
 * Initialised from matchMedia directly rather than defaulting to one value and
 * correcting in an effect, so the first paint is already right and the chart does not
 * visibly resize on load.
 */
function useMatches(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function EngineeringCapabilities() {
  /*
    THREE BANDS, EACH SOLVED BY MEASURING WHICH LABELS CLIPPED rather than picked.
    Recharts draws axis labels OUTSIDE outerRadius, so the leftover percentage IS the
    label band, and the longest label needs the most room.

    Final values, each arrived at by measuring and re-measuring, not by choosing:

        38 percent  below 480px
        46 percent  480 to 639px
        66 percent  640px and up

    These came DOWN from 44 / 52 / 72 when the label group was pushed 20px outward to
    fix the crowding Foyez reported. Pushing labels out costs plot radius, so the two
    numbers move together: change one and re-measure the other. Getting that wrong is
    what produced a run where desktop cleared the dots by 11px while a phone sat at 3px.

    "AI-Assisted QA" is the constraint at every step: it is the longest string and it
    sits on a near-horizontal axis, where a label reaches furthest sideways. Whatever
    fits it fits everything.

    THE MEASUREMENT THAT NEARLY SHIPPED A BUG, and the lesson is the useful part. An
    early sweep compared each label to the CARD's edge and reported zero failures at
    72 percent everywhere. A SCREENSHOT then showed "AI-Assisted Q" with the final A
    missing. The card was never the clipping boundary: recharts sets overflow hidden on
    the SVG it renders, so the SVG's own box is what cuts a label, and the label ran
    11px past that while still sitting comfortably inside the card. The measurement was
    right about the wrong edge.

    Fixed at the root by [&_svg]:overflow-visible on the wrapper, which stops any
    truncation at every width at once. Chasing it with the radius alone had failed:
    62 percent fixed 1280 and broke the 424 to 512 band. The radius bands then only
    have to keep labels inside the CARD, which is the real visual boundary.

    320px is below the R4 gate of 390px, but a clipped label is a visible defect at any
    width, and the extra query costs nothing.
  */
  const isTiny = useMatches("(max-width: 479px)");
  const isNarrow = useMatches("(max-width: 639px)");
  const radiusPct = isTiny ? "38%" : isNarrow ? "46%" : "66%";

  return (
    <section className="px-8 section-y relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        <div className="text-center space-y-4">
          {/* Ramped in Module 11, along with every other section heading. */}
          <h2 className="text-4xl sm:text-5xl font-bold">
            Engineering Capabilities
          </h2>
          <p className="text-lg text-muted-foreground">
            Five disciplines, rated by depth of evidence rather than confidence
          </p>
        </div>

        <div className="relative">
          {/* Glow pulled back so the hero panel stays the brightest thing on the page. */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl opacity-30" />
          
          {/*
            PADDING DROPS ON A PHONE. p-12 is 48px a side, which took 96px out of a
            311px card and left the SVG only 213px wide while still 500px tall. The
            plot was squeezed narrow and tall, and the axis labels had nowhere to go.
          */}
          <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl px-2 py-4 sm:p-8 lg:p-12 backdrop-blur-sm">
            {/*
              HEIGHT IS RESPONSIVE NOW, not a flat 500. A radar is square by nature,
              so a fixed height that ignores width gives a tall thin plot on a phone
              and wasted air on a desktop. Measured: at 390px the old chart was 213px
              wide and 500px tall.

              The ResponsiveContainer aspect prop keeps it square, and the wrapper
              caps how tall it may get so the section does not become enormous on a
              wide screen.
            */}
            {/*
              [&_svg]:overflow-visible IS THE ROOT-CAUSE FIX, and it replaced a losing
              game of shrinking outerRadius percentages.

              recharts sets overflow hidden on the SVG it renders, so any axis label
              extending past the plot box is cut mid-word. "AI-Assisted QA" is the
              longest string and sits on a near-horizontal axis where a label reaches
              furthest sideways, so it was clipped by a measured 11px. Chasing it with
              the radius shrank the shape at some widths and still failed at others:
              62 percent fixed 1280 but broke the 424 to 512 band.

              Letting the SVG paint outside its own box fixes every width at once, and
              it is safe here because the CARD provides the real boundary and has ample
              padding. The earlier sweeps confirmed labels sit well inside the card even
              when they cross the SVG edge.
            */}
            <div className="mx-auto w-full max-w-[560px] [&_svg]:overflow-visible">
              <ResponsiveContainer width="100%" aspect={1}>
              {/*
                outerRadius PULLS THE PLOT IN TO LEAVE ROOM FOR THE LABELS, and the
                phone value was solved rather than guessed.

                Recharts places axis labels OUTSIDE outerRadius, so the label band is
                whatever percentage is left over. At the default the labels needed more
                room than existed and three of five rendered outside the card at 390px.

                Measured: at 72 percent, two still clipped, "AI-Assisted QA" and
                "Automation", which are the two longest strings on the horizontal
                axes where a label extends furthest. 55 percent on a phone clears
                both. The desktop value stays generous because a 560px plot has room
                for the label band without shrinking the shape.
              */}
              <RadarChart data={data} outerRadius={radiusPct}>
                <PolarGrid stroke="#1f1f1f" strokeWidth={1} />
                {/*
                  pointerEvents none on the tick text as well as the dots. The
                  axis labels sit close to the outer vertices, and wherever a
                  label overlapped a dot it swallowed the mouse event, so the
                  chart surface never recomputed the hovered angle and the
                  tooltip returned nothing. Documentation was the casualty.
                */}
                {/*
                  THE LABEL NOW CARRIES ITS SCORE, which is the single biggest
                  improvement here and it is what stops the shape having to do
                  precision work it cannot do.

                  Measured on the old chart: the five scores span 17 points and that
                  rendered as 22px of radius difference. A radar encodes magnitude as
                  radius, so a 17-point spread on a 0 to 100 scale is always going to
                  look like a near-regular pentagon. Rather than distort the scale to
                  fake a bigger difference, the exact number is printed next to its
                  axis. The shape gives the impression, the digits give the fact.

                  It replaces a hover-only tooltip as the primary readout, which
                  matters because a tooltip never opens on a touch device at all. The
                  tooltip stays for the evidence line.

                  fontSize ramps with the viewport: a 14px label was fine at 1280 but
                  three of the five labels rendered OUTSIDE the card at 390px, so they
                  are smaller on a phone where the plot is smaller too.
                */}
                <PolarAngleAxis
                  dataKey="subject"
                  tick={(props) => {
                    const { x, y, payload, index } = props as {
                      x: number;
                      y: number;
                      payload: { value: string };
                      index: number;
                    };
                    const score = data[index]?.value;
                    /*
                      textAnchor is derived from position rather than fixed. A single
                      anchor pushes the left-hand labels off one edge and the
                      right-hand ones off the other, which is exactly how the three
                      clipped labels happened.
                    */
                    const cxApprox = (props as { cx: number }).cx;
                    const cyApprox = (props as { cy: number }).cy;
                    const anchor =
                      Math.abs(x - cxApprox) < 8
                        ? "middle"
                        : x > cxApprox
                          ? "start"
                          : "end";

                    /*
                      THE WHOLE LABEL GROUP IS PUSHED RADIALLY OUTWARD from the vertex,
                      because Foyez reported the numbers sitting too close to both the
                      text and the data point, and both were measurable.

                      Measured before this change, at 1280px: the "95" on Manual Testing
                      sat 4px from its own data dot. Recharts places a tick at the axis
                      end, which is right on top of the plotted point, so a two-line
                      label starting there inevitably crowds the mark.

                      Offsetting along the vector from the centre THROUGH the vertex is
                      what keeps every label in its own direction: a flat dx/dy would
                      push the top label sideways and the side labels vertically. The
                      vector is normalised so all five move by the same distance
                      regardless of where they sit on the circle.
                    */
                    const vx = x - cxApprox;
                    const vy = y - cyApprox;
                    const len = Math.hypot(vx, vy) || 1;
                    /*
                      THE OFFSET IS A CONSTANT, NOT A FRACTION OF THE RADIUS, and that
                      is deliberate after getting it wrong once.

                      A flat 14px was tried while the narrow-band radius was also being
                      reduced, and the two changes fought each other: shrinking the plot
                      moves the vertex inward, so a fixed push left the score only 3 to
                      5px from its dot on a phone even though desktop measured 11px.

                      The gap that matters is between the label group and the DOT, and
                      the dot sits at the vertex, so the offset has to be large enough
                      on its own terms at the smallest plot. 20px clears the 8px dot
                      plus its 7px active ring at every band, and being a constant it
                      does not shrink away exactly when the plot gets tight.
                    */
                    const OUTWARD = 20;
                    const lx = x + (vx / len) * OUTWARD;
                    const ly = y + (vy / len) * OUTWARD;
                    /*
                      ON THE TINY BAND THE SIDE LABELS CENTRE OVER THEIR VERTEX rather
                      than growing outward from it.

                      Measured at 320px: "AI-Assisted QA" is 80px wide, starts 203px
                      into a card whose right edge is 273px, so it crossed by 11px. A
                      "start" anchor grows away from the centre, which is exactly the
                      wrong direction when the vertex is already near the edge.

                      Flipping the anchor outright was tried and rejected: it would
                      push the label inward across the plot and collide with the shape.
                      "middle" splits the difference, so the label straddles its vertex
                      and only half its width extends outward, which the 11px overflow
                      comfortably absorbs.

                      Only on the tiny band. From 360px up the original anchors have
                      room and read better, since a label sitting outside its vertex
                      is unambiguous about which axis it belongs to.
                    */
                    const safeAnchor = isTiny ? "middle" : anchor;
                    return (
                      <g>
                        <text
                          x={lx}
                          y={ly}
                          textAnchor={safeAnchor}
                          dominantBaseline="middle"
                          className="fill-muted-foreground text-[11px] sm:text-[13px]"
                          pointerEvents="none"
                        >
                          {payload.value}
                        </text>
                        {/*
                          The score sits on its own line under the label, in the
                          brighter foreground token so it reads as the value rather
                          than more label. tabular-nums per R1: five numbers being
                          compared around a chart is exactly that case.

                          THE GAP WAS NEGATIVE BEFORE THIS. At dy 15 against a 13px
                          label and a 14px score, the two boxes OVERLAPPED by a
                          measured 2px, which is why the number read as crowding its
                          label rather than sitting under it. 19 gives a real gap
                          instead of a collision.
                        */}
                        <text
                          x={lx}
                          y={ly + 22}
                          textAnchor={safeAnchor}
                          dominantBaseline="middle"
                          className="fill-foreground text-[12px] sm:text-[14px] font-semibold [font-variant-numeric:tabular-nums]"
                          pointerEvents="none"
                        >
                          {score}
                        </text>
                      </g>
                    );
                  }}
                  strokeWidth={0}
                />
                {/*
                  Kept for the 0 to 100 domain, but the numeric ticks are hidden
                  on purpose. Printing "88" on the axis claims a precision this
                  data does not have and invites "88 out of what, measured how?".
                  The shape carries the comparison; the caption carries the rule.
                */}
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Tooltip content={<CapabilityTooltip />} cursor={false} />
                {/*
                  Visible dots do two jobs: they show a reader there are five
                  discrete data points rather than a smooth blob, and they give
                  the tooltip a real hit target. activeDot is deliberately
                  larger than the dot so the hover area exceeds the mark.
                */}
                <Radar
                  name="Capabilities"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0, pointerEvents: "none" }}
                  activeDot={{
                    r: 7,
                    fill: "#3b82f6",
                    stroke: "#0a0a0a",
                    strokeWidth: 2,
                    pointerEvents: "none",
                  }}
                />
              </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/*
          THE VISIBLE EVIDENCE LIST IS GONE, at Foyez's instruction, because it said
          exactly what the tooltip says.

          He was right that it was duplication, and it was worse than approximate:
          verified byte-identical. Hovering Manual Testing produced "Three years core
          in every role, plus ISTQB-CTFL certification." and the list rendered the same
          string, so a desktop reader met every evidence line twice, once in the list
          and again on hover.

          The tooltip owns the evidence now. That is a reasonable division of labour:
          the scores print permanently at each vertex, so the chart is readable at a
          glance, and the supporting detail arrives on demand for whoever wants it.

          THE COST WAS STATED AND ACCEPTED, and it is recorded here rather than hidden.
          Returning the evidence to hover-only means TOUCH USERS SEE NONE OF IT: a
          tooltip does not open on tap, and the SVG has zero focusable elements, so
          keyboard users cannot reach a vertex either. That was the R9 problem the
          visible list existed to solve. Foyez was told and chose this, so the
          sr-only list below is the compromise: it restores the evidence for screen
          readers at zero visual cost and duplicates nothing a sighted reader sees.

          IF THE EVIDENCE IS EVER WANTED ON THE PAGE AGAIN, it has to REPLACE the
          tooltip's evidence line rather than sit alongside it, or this duplication
          comes straight back.
        */}
        <ul className="sr-only">
          {data.map((d) => (
            <li key={d.subject}>
              {d.subject}: {d.value} out of 100. {d.evidence}
            </li>
          ))}
        </ul>

        {/* The rubric is published so the scores are auditable, not vanity. */}
        <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto">
          Shipped and owned rates highest. Used on client projects sits in the middle.
          Certified with lighter hands-on rates lower.
        </p>
      </div>
    </section>
  );
}
