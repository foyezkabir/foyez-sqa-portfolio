import { Briefcase } from "lucide-react";
import { profile } from "../data/profile";

/**
 * TODO: replace with real roles from the CV, newest first.
 *
 * Three blank templates, matching the original layout. Every field is
 * placeholder text so nothing unverified can go live by accident. Delete any
 * card you do not need: the section renders however many entries are here.
 */
const experiences = [
  {
    role: profile.role,
    company: "Add your current company",
    years: "2023 - Present",
    description:
      "Add one or two lines on what you own here: frameworks you built, coverage or execution-time gains, and the tools you used.",
  },
  {
    role: "Add your previous role",
    company: "Add the company",
    years: "Add dates",
    description:
      "Add one or two lines: what you tested, what you automated, and the measurable result.",
  },
  {
    role: "Add your first role",
    company: "Add the company",
    years: "Add dates",
    description:
      "Add one or two lines: where you started, the tools you picked up, and what you shipped.",
  },
];

export function Experience() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Experience</h2>
          <p className="text-lg text-muted-foreground">
            Building quality systems across different scales and industries
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
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
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}