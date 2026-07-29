import { Button } from "./ui/button";
import { Mail, Linkedin, Github } from "lucide-react";
import { mailtoHref, profile } from "../data/profile";

export function Contact() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          {/* Glow pulled back so the hero panel stays the brightest thing on the page. */}
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-lg opacity-20" />
          
          <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-3xl p-16 backdrop-blur-sm text-center space-y-8">
            {/* Hairline top highlight: the tighter replacement for the blur wash. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
            />
            <div className="space-y-4">
              <h2 className="text-5xl font-bold">Let's Connect</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Open to discussing test automation, quality engineering, or collaboration opportunities.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="gap-2" asChild>
                <a href={mailtoHref}>
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </a>
              </Button>
              {profile.linkedinUrl && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer noopener">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {profile.githubUrl && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer noopener">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}