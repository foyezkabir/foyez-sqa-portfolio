import { Hero } from "./components/Hero";
import { AutomationFirst } from "./components/AutomationFirst";
import { EngineeringCapabilities } from "./components/EngineeringCapabilities";
import { WhatIBring } from "./components/WhatIBring";
import { Projects } from "./components/Projects";
import { AgentsAndAutomation } from "./components/AgentsAndAutomation";
import { Certifications } from "./components/Certifications";
import { Experience } from "./components/Experience";
import { QAWithAI } from "./components/QAWithAI";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { profile } from "./data/profile";

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Header />
      {/*
        No max-width here on purpose. Every section already caps its own content
        with an inner max-w container, so a wrapper here changed nothing about
        text width. All it did was clip each section's background at 1440px,
        which left flat black gutters on wide screens where the grid and gradient
        abruptly stopped. Backgrounds now run edge to edge; content stays capped.
      */}
      <div>
        <Hero />
        <AutomationFirst />
        <div id="capabilities">
          <EngineeringCapabilities />
        </div>
        <WhatIBring />
        <div id="projects">
          <Projects />
        </div>
        {/*
          Placed between Featured Work and Certifications on purpose, so the page
          escalates how checkable each claim is: work Foyez describes, then code a
          reader can open, then credentials a third party assessed.
        */}
        <AgentsAndAutomation />
        <Certifications />
        <div id="experience">
          <Experience />
        </div>
        <QAWithAI />
        <div id="contact">
          <Contact />
        </div>
        
        {/* Footer */}
        <footer className="px-8 py-12 border-t border-border">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>
              © 2026 {profile.name}. {profile.role}. Built with React & TypeScript.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}