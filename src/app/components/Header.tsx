import { Terminal } from "lucide-react";
import { profile } from "../data/profile";

/*
  Padding sits on the header element and the max-width on the inner div,
  mirroring how Hero nests px-8 outside max-w-7xl. With px-8 inside the
  container instead, the two resolved 32px apart and the logo did not line up
  with the hero badge on wide screens.
*/
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-8">
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">{profile.name}</span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {profile.role}
            </span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#capabilities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Capabilities
          </a>
          <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Experience
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}