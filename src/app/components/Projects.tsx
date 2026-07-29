import { Button } from "./ui/button";
import { ExternalLink, TrendingDown, CheckCircle2, Zap } from "lucide-react";

/**
 * TODO: replace with your real projects.
 *
 * Titles, descriptions and especially the `impact` metrics below are template
 * values from the Figma export, not measurements from your work. Swap them for
 * real numbers or drop the metric. Add a `url` to any project and its "View
 * Project" button links out; without one the button is hidden.
 */
const projects: Array<{
  title: string;
  description: string;
  tags: string[];
  impact: { icon: typeof CheckCircle2; text: string };
  url?: string;
}> = [
  {
    title: "AI-Powered Test Generator",
    description:
      "Automated test case generation using GPT-4 to analyze UI components and create comprehensive test suites.",
    tags: ["OpenAI API", "TypeScript", "Playwright"],
    impact: { icon: CheckCircle2, text: "80% coverage improvement" },
  },
  {
    title: "Visual Regression Framework",
    description:
      "Custom visual regression testing system with pixel-perfect comparison and automated baseline management.",
    tags: ["Playwright", "Docker", "AWS S3"],
    impact: { icon: TrendingDown, text: "60% execution time reduced" },
  },
  {
    title: "QA Analytics Dashboard",
    description:
      "Real-time quality metrics dashboard aggregating test results and flakiness tracking.",
    tags: ["React", "Node.js", "PostgreSQL"],
    impact: { icon: Zap, text: "Improved team visibility" },
  },
  {
    title: "Contract Testing Suite",
    description:
      "Microservices contract testing implementation ensuring API compatibility across 15+ services.",
    tags: ["Pact", "TypeScript", "GraphQL"],
    impact: { icon: CheckCircle2, text: "Scaled testing 10x" },
  },
];

export function Projects() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Featured Work</h2>
          <p className="text-lg text-muted-foreground">
            Building tools and frameworks that improve quality at scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const ImpactIcon = project.impact.icon;
            return (
              <div
                key={project.title}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-8 space-y-6 backdrop-blur-sm h-full flex flex-col">
                  <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <ImpactIcon className="w-4 h-4" />
                    <span>{project.impact.text}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.url && (
                    <Button variant="outline" size="sm" className="gap-2 w-full mt-2" asChild>
                      <a href={project.url} target="_blank" rel="noreferrer noopener">
                        View Project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}