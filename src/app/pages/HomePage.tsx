import { Hero } from "../components/Hero";
import { AutomationFirst } from "../components/AutomationFirst";
import { EngineeringCapabilities } from "../components/EngineeringCapabilities";
import { SkillsAndTools } from "../components/SkillsAndTools";
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
      {/*
        SKILLS SITS DIRECTLY AFTER THE RADAR, and the pairing is the point. The
        radar scores five themes with evidence, this lists the full working set
        from the CV. Scored summary first, then the detail behind it, so a reader
        who wants depth gets the rubric and a reader scanning for a tool name
        finds the list immediately below it.

        THEY HAVE SEPARATE IDS NOW. They shared the "capabilities" wrapper when
        Skills shipped, which was fine while only Capabilities was in the nav.
        Foyez then asked for Skills in the menu too, and a nav item cannot target
        a section that has no id of its own: both links would have scrolled to the
        same place and the second would have looked broken.
      */}
      <div id="capabilities">
        <EngineeringCapabilities />
      </div>
      <div id="skills">
        <SkillsAndTools />
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
      {/*
        NO EDUCATION SECTION. It had one for part of a day and Foyez cut it: a
        single degree under a 48px heading read too solo, which it did, because
        three facts is not a section's worth of content. The degree now sits in
        the hero identity block, where it belongs, next to the name and the role.
        That also keeps this page on the nine sections the Figma structure defines.
      */}
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
