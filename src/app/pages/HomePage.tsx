import { Hero } from "../components/Hero";
import { AutomationFirst } from "../components/AutomationFirst";
import { EngineeringCapabilities } from "../components/EngineeringCapabilities";
import { WhatIBring } from "../components/WhatIBring";
import { Projects } from "../components/Projects";
import { AgentsAndAutomation } from "../components/AgentsAndAutomation";
import { Certifications } from "../components/Certifications";
import { Experience } from "../components/Experience";
import { QAWithAI } from "../components/QAWithAI";
import { Contact } from "../components/Contact";

/**
 * The home page, lifted out of App.tsx unchanged when Module 6 added the second
 * route. Section order, ids and markup are identical to what App.tsx held before,
 * so this is a move rather than an edit.
 *
 * No max-width wrapper here, on purpose. Every section already caps its own
 * content with an inner max-w container, so a wrapper changes nothing about text
 * width. All it did was clip each section's background at 1440px, leaving flat
 * black gutters on wide screens with a visible hard edge where the grid and
 * gradient stopped.
 */
export function HomePage() {
  return (
    <>
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
        Between Featured Work and Certifications on purpose, so the page escalates
        how checkable each claim is: work Foyez describes, then code a reader can
        open, then credentials a third party assessed.
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
    </>
  );
}
