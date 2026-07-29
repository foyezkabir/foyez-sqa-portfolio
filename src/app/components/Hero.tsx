import { Button } from "./ui/button";
import { FileDown, Mail, Eye } from "lucide-react";
import { heroBadge, mailtoHref, profile } from "../data/profile";
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
    <section className="relative px-8 py-32 min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <GrainOverlay />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400">
              {heroBadge}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Building automation systems teams actually trust.
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Hand over a product and I own quality end to end, from test strategy to
              release sign-off, with AI agents doing the repetitive work.
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="#projects">
                  <Eye className="w-4 h-4" />
                  View Work
                </a>
              </Button>
              <Button size="lg" className="gap-2" asChild>
                <a href={mailtoHref}>
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </Button>
              {profile.resumeUrl && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href={profile.resumeUrl} download>
                    <FileDown className="w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
              )}
            </div>

            {/*
              max-w-sm forces a balanced 4 + 3 wrap. Unconstrained, the seventh
              chip is orphaned alone on the second line, which reads as an
              accident rather than a layout.
            */}
            <div className="flex flex-wrap gap-2 pt-4 max-w-sm">
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

          {/* Right side - Product UI Mock */}
          <div className="relative">
            <TiltCard>
              <TestRunPanel />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}