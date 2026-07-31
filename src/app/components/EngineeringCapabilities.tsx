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
 * pentagon, tells a reader nothing, and reads as marketing. The visible dips are
 * what make the high values credible.
 *
 * Each entry carries its own supporting evidence, shown on hover and mirrored in
 * an sr-only list further down for keyboard and screen reader users.
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

export function EngineeringCapabilities() {
  return (
    <section className="px-8 py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
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
          
          <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-12 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={500}>
              <RadarChart data={data}>
                <PolarGrid stroke="#1f1f1f" strokeWidth={1} />
                {/*
                  pointerEvents none on the tick text as well as the dots. The
                  axis labels sit close to the outer vertices, and wherever a
                  label overlapped a dot it swallowed the mouse event, so the
                  chart surface never recomputed the hovered angle and the
                  tooltip returned nothing. Documentation was the casualty.
                */}
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#a1a1a1", fontSize: 14, pointerEvents: "none" }}
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

        {/*
          The chart is SVG and its values are now hover-only, which leaves
          keyboard and screen reader users with nothing. This is the text
          equivalent: same numbers, same evidence, no visual weight.
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
