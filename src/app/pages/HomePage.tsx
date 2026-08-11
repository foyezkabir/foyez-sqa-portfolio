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
import { Reveal } from "../components/Reveal";
import { TheRecord } from "../components/TheRecord";

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
      {/*
        THE STAT ROW SITS DIRECTLY UNDER THE HERO, which is the whole point of it.
        A reader who has just met the name and the claim gets the scale of the work
        before committing to nine sections of detail. Placed anywhere lower it would
        be a summary of things already read.

        Wrapped in Reveal like every other section below the hero, so it fades in
        rather than being the one block that appears instantly.
      */}
      <Reveal>
        <TheRecord />
      </Reveal>
      <Reveal>
        <AutomationFirst />
      </Reveal>
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
        <Reveal>
          <EngineeringCapabilities />
        </Reveal>
      </div>
      <div id="skills">
        <Reveal>
          <SkillsAndTools />
        </Reveal>
      </div>
      <Reveal>
        <WhatIBring />
      </Reveal>
      <div id="projects">
        <Reveal>
          <Projects />
        </Reveal>
      </div>
      {/*
        Between Featured Work and Certifications on purpose, so the page escalates
        how checkable each claim is: work Foyez describes, then code a reader can
        open, then credentials a third party assessed.
      */}
      <Reveal>
        <AgentsAndAutomation />
      </Reveal>
      {/*
        id ADDED 2026-08-11 so the nav can land here. Foyez asked for a
        Certifications menu item and the section had no scroll target, so the item
        could not have been added without this wrapper.

        The id is on a wrapper rather than the section itself, matching every other
        target on this page. Consistency aside, it means the anchor lands above the
        section's own top padding rather than partway into it.
      */}
      <div id="certifications">
        <Reveal>
          <Certifications />
        </Reveal>
      </div>
      {/*
        NO EDUCATION SECTION. It had one for part of a day and Foyez cut it: a
        single degree under a 48px heading read too solo, which it did, because
        three facts is not a section's worth of content. The degree now sits in
        the hero identity block, where it belongs, next to the name and the role.
        That also keeps this page on the nine sections the Figma structure defines.
      */}
      <div id="experience">
        <Reveal>
          <Experience />
        </Reveal>
      </div>
      <Reveal>
        <QAWithAI />
      </Reveal>
      <div id="contact">
        <Reveal>
          <Contact />
        </Reveal>
      </div>
    </>
  );
}
