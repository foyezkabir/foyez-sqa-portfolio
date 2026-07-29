# CLAUDE.md

Project rules for the Foyez Ullah Kabir SQA portfolio. Claude Code loads this
file automatically at the start of every session.

These are **gates, not suggestions**. Do not ship work that violates one. If a
request conflicts with a rule, follow the Override Protocol at the bottom
instead of silently complying.

Companion files:
- `cv-data.txt` is the only source of truth for facts about Foyez.
- `portfolio-change-plan.txt` is the only source of truth for what changes and
  in what order.

---

## R1. One font, everywhere

- Montserrat only. It is set once via `--font-sans` in `src/styles/theme.css`
  and imported in `src/styles/fonts.css`.
- Never hardcode `font-family` in a component.
- Never introduce a second family, including `font-mono`. Use `tabular-nums`
  when digits must align in a column.
- Form and interactive elements do not inherit font by default. The
  `button, input, optgroup, select, textarea { font-family: inherit }` base rule
  in `theme.css` must stay.

**Verify:** every element on the page must compute to Montserrat. Not a sample,
all of them.

---

## R2. No em dashes, no en dashes

- ASCII hyphen `-` only. Banned characters: `—` `–` `―` `‒` `−`
- Applies to source, comments, copy, docs, and this file.
- Use a comma, a colon, "to" for ranges, or a full stop instead.

**Verify:** `grep -rn '[—–―‒−]' src/ index.html *.txt *.md --exclude=CLAUDE.md`

CLAUDE.md is excluded because this file has to name the banned characters in
order to ban them. A check that always reports hits gets ignored, so the command
must return a true zero.

---

## R3. Card parity: identical boxes across a grid

Cards in the same grid must be **the same width and the same height**, whatever
their content. An image or no image, a long title or a short one, three lines of
body text or six. No exceptions.

Mechanisms that must stay in place:
- Equal grid tracks (`grid-cols-N`), never per-card widths.
- `h-full` on the card so it fills the stretched grid row.
- **Fixed-aspect media slots.** A slot that is sometimes an image and sometimes
  an icon must be a fixed `aspect-[x/y]` box either way, with the icon centred
  as the fallback. A 200px image next to a 44px icon pushes every following
  element out of line.
- **Reserve space for wrapping text.** If one title wraps to two lines and
  another fits on one, give the element a `min-h` for the taller case, or the
  text below it starts at different heights across the row.

Equal boxes are not enough. **Contents must line up too:** media slot, title,
and body text each start at the same y within a row.

**Verify:** measure in the browser and compare, grouped **by row**. Cards in
different rows have different y positions, so comparing every card in a wrapped
grid produces a false failure.

---

## R4. Responsiveness is a gate, not a polish pass

Every change is checked at four widths before it is called done:

| Width  | Target                       |
| ------ | ---------------------------- |
| 390px  | phone                        |
| 800px  | tablet                       |
| 1280px | laptop                       |
| 1920px | wide desktop                 |

Hard requirements:
- **Zero horizontal overflow at every width.**
  `document.documentElement.scrollWidth <= window.innerWidth`
- No clipped or cut-off text.
- **No orphans.** A single item alone on the last line of a wrapped row reads as
  a bug. Cap the container or change the column count so the wrap is balanced.
- Type scales down. Never one fixed size across all breakpoints. Headings use
  `text-4xl sm:text-5xl lg:text-6xl` style ramps.
- Never disable zoom, never set a fixed pixel page width.

---

## R5. Never invent a fact

- Every claim on the site traces to `cv-data.txt` or a public repo.
- **Banned:** invented metrics, star counts, percentages, scores, company names,
  project names, dates, or testimonials. The template shipped fake GitHub star
  counts and fake "80% coverage improvement" figures. They are gone. They do not
  come back.
- Anything unverified is either omitted or **visibly** placeholder, plus a
  `TODO CONFIRM` comment naming what is needed. Never plausible-looking filler.
- Self-assessed numbers must publish the rubric next to them.
- Repo names, usernames and URLs must match the real thing character for
  character. `AG-QREW`, not `AG-CREW`. A wrong name sends a reader nowhere.

---

## R6. No dead affordances

- A button or link renders **only** when it has a real destination. Empty URL
  means the control is not rendered at all, not rendered and broken.
- A card that opens a dialog is a `<button>` only when there is something to
  open. Otherwise it is a plain `div` with no pointer cursor.
- Anything that looks pressable must do something.

---

## R7. Status colour is never the only signal

- Use the validated tokens in `theme.css`: `--status-good`, `--status-critical`,
  `--status-running`, `--status-warning`. Never raw Tailwind colours for state.
- `good` and `critical` measure only ΔE 4.1 apart under deuteranopia, so
  **every status must carry an icon AND a word.** Strip the colour and the
  meaning must survive.
- Status colours are reserved. Never reuse one as a chart series colour.
- Numbers and labels wear text tokens. A coloured mark sits beside them and
  carries the identity.

---

## R8. Motion has rules

- Honour `prefers-reduced-motion: reduce`. Skip to the end state, no loop.
- Animate `transform` and `opacity` only. Never animate layout properties.
- **Pause work nobody can see.** Loops stop when the tab is hidden or the
  element is off-screen, and replay from the start on return. A loop running in
  a background tab burns cycles and looks frozen when the visitor comes back.
- Never delay the first paint of the headline.
- Do not add an animation library for one effect. A hand-rolled rAF lerp cost
  1.9kB where framer-motion cost 44kB gzipped for the same tilt.

---

## R9. Accessibility is part of done

- Information available only on hover needs a text equivalent, for example an
  `sr-only` list mirroring chart values.
- Icon-only controls need an `aria-label`.
- Images need real `alt` text describing the content, not the filename.
- Decorative layers get `aria-hidden` and `pointer-events-none`.
- Interactive elements need a visible `focus-visible` state.

---

## R10. Layout: full-bleed backgrounds, capped content

- Section backgrounds run edge to edge. Content is capped by an inner
  `max-w-*` container inside each section.
- **Never wrap the page in a max-width.** It does nothing for text width, since
  sections already cap themselves, and it clips every section background,
  leaving dead gutters with a visible hard edge on wide screens.
- The header container and the hero container must resolve to the same left
  edge. Padding outside the max-width in both, never inside one and outside the
  other.
- `class="dark"` belongs on `<html>`. Put it on a div inside `<body>` and body
  itself resolves the light theme and paints white, which shows through on
  scroll repaints and rubber-band overscroll.

---

## R11. Verify by measuring, never by eyeballing

- `npm run build` must pass before anything is called done.
- Assert against the live DOM: computed styles, bounding boxes, counts. A
  screenshot is a sanity check, not evidence.
- **Test the mechanism, not the happy path.** Hover every point, not one. Click
  every card, not the first. Bugs that only affect item three are the norm:
  a radar tooltip returned the same label for all five vertices, and one of five
  hover targets returned nothing, both invisible in a screenshot.
- Where a feature depends on assets that do not exist yet, test with a
  throwaway placeholder, then delete it.
- Report what was actually checked. If something was not verified, say so.
- Never claim a fix works without evidence in the same message.

---

## R12. Commits carry no co-author trailer

- **Never add `Co-Authored-By: Claude ...` to a commit in this repo.** No
  AI-assistance trailers, footers, or "generated with" lines either.
- Reason: this is Foyez's professional portfolio. GitHub renders co-authors on
  the commit list and on his contribution graph, so a trailer puts a second
  author's name on work he is presenting as his own.
- Write the commit message as normal, describing the change and the reasoning.
  Just end it there.

---

## R13. One module at a time

- `portfolio-change-plan.txt` sets the order. Build one module, verify it, stop,
  report. Do not batch modules.
- Update that file when a module lands: status, what shipped, and the reasoning
  behind any decision that was not obvious.
- The nine home sections and their card counts come from the Figma structure.
  Content changes freely. Structure does not, unless explicitly agreed.

---

## Verification commands

```bash
# Build must pass.
npm run build

# Banned dash characters anywhere in the project. Must return zero hits.
grep -rn '[—–―‒−]' src/ index.html *.txt *.md --exclude=CLAUDE.md

# Unverified content still outstanding.
grep -rn "TODO CONFIRM" src/
```

Responsive gate, run in the browser at 390, 800, 1280 and 1920:

```js
({
  width: window.innerWidth,
  overflow: document.documentElement.scrollWidth > window.innerWidth,
  notMontserrat: [...document.querySelectorAll('*')]
    .filter(el => !/Montserrat/i.test(getComputedStyle(el).fontFamily)).length,
})
// Required: overflow === false and notMontserrat === 0 at every width.
```

---

## Override Protocol

Foyez owns this project and can override any rule. He asked to be told when a
request breaks one, so silent compliance is the wrong answer and so is refusing.

When a request conflicts with a rule:

1. **Say so immediately.** Name the rule number.
2. **State the concrete cost** in one or two sentences. What specifically
   breaks, and who notices.
3. **Offer the compliant alternative** that gets him what he wants.
4. **Wait for an explicit override.** "Do it anyway" or "override R4" is enough.
   Silence or an unrelated reply is not consent.
5. **Log it.** Record the override and its reason in
   `portfolio-change-plan.txt`, so a decision made once is not mistaken later
   for an accident.

Do not moralise and do not repeat the warning once it has been given. Say it
once, clearly, then do what he decides.
