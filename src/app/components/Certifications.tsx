import {
  Award,
  BadgeCheck,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type Certification = {
  title: string;
  issuer: string;
  summary: string;
  /** Rasterised page 1, used as the card thumbnail. An img cannot render a PDF. */
  image: string;
  /** The certificate itself. Opens in a new tab rather than downloading. */
  pdf: string;
};

/**
 * One icon per issuer, keyed BY issuer rather than stored per certificate.
 *
 * That is the point: the two Udemy certificates cannot drift onto different
 * icons, because neither of them owns an icon. They both resolve through this
 * map. An earlier version put the icon on each certificate, and Cypress ended up
 * with an award while Business Analysis got a graduation cap despite both coming
 * from Udemy.
 *
 * Adding a certificate from a new school means adding one line here. Miss it and
 * the fallback keeps the card intact rather than crashing.
 */
const ISSUER_ICON: Record<string, typeof Award> = {
  ISTQB: BadgeCheck,
  Udemy: Award,
  "Alison / Udemy": ShieldCheck,
  "IT Training BD": GraduationCap,
};

/**
 * Credentials, assessed by a third party. Deliberately separate from the
 * capabilities radar above, which is self-scored against a published rubric.
 *
 * Five certificates in a carousel showing four at a time on desktop, so only one
 * sits behind the arrows. That ratio is the reason a carousel works here: hiding
 * one of five is a genuine affordance, where hiding three of four would be a
 * place content goes to die.
 *
 * Clicking a card opens the PDF in a new tab, using the browser's own PDF viewer
 * for zoom, page navigation and print. Deliberately not an in-page iframe:
 * mobile Safari and Chrome frequently refuse to render PDFs in iframes and show
 * a blank box or a download prompt instead.
 *
 * The thumbnails are mixed orientation, three landscape and two portrait, and the
 * media slot is a fixed 4:3 box so every card is the same height whatever the
 * image shape. The image is cropped to fill it, anchored to the top, so the slot
 * reads as a banner rather than a letterboxed page. See the note on the img for
 * why cropping is the right call here.
 */
const certifications: Certification[] = [
  {
    title: "ISTQB Certified Tester, Foundation Level 4.0",
    issuer: "ISTQB",
    summary:
      "The industry baseline for test engineering: test design techniques, the full test process, and test management.",
    image: "/certificates/istqb-ctfl.png",
    pdf: "/certificates/istqb-ctfl.pdf",
  },
  {
    title: "Cypress: Web Automation Testing",
    issuer: "Udemy",
    summary:
      "End-to-end browser automation in Cypress, from selectors and assertions through to running suites in CI.",
    image: "/certificates/cypress-web-automation.png",
    pdf: "/certificates/cypress-web-automation.pdf",
  },
  {
    title: "ISO 27001:2022 (ISMS)",
    issuer: "Alison / Udemy",
    summary:
      "Information security management: risk assessment, controls, and what auditors look for.",
    image: "/certificates/iso-27001-isms.png",
    pdf: "/certificates/iso-27001-isms.pdf",
  },
  {
    title: "Business Analysis",
    issuer: "Udemy",
    summary:
      "Requirement gathering and stakeholder analysis, turning business needs into specifications a team can build from.",
    image: "/certificates/business-analysis.png",
    pdf: "/certificates/business-analysis.pdf",
  },
  {
    title: "Software Quality Assurance",
    issuer: "IT Training BD",
    summary:
      "Foundational QA training across the test lifecycle, documentation standards, and defect management.",
    image: "/certificates/sqa-course.png",
    pdf: "/certificates/sqa-course.pdf",
  },
];

export function Certifications() {
  return (
    <section className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Certifications &amp; Training</h2>
          {/*
            This line is doing real work. The capabilities radar two sections up
            is honest but still self-judged. These five were assessed by someone
            else, and saying so shows the author knows the difference between the
            two kinds of claim, which is the instinct a QA hire should have.
          */}
          <p className="text-lg text-muted-foreground">
            Independently verified, not self-assessed
          </p>
        </div>

        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-6">
            {certifications.map((cert) => {
              const Icon = ISSUER_ICON[cert.issuer] ?? BadgeCheck;
              return (
                <CarouselItem
                  key={cert.title}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="relative group h-full">
                    {/* Glow on hover only, matching the other card sections. */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Open the ${cert.title} certificate from ${cert.issuer} as a PDF in a new tab`}
                      className="relative flex h-full w-full flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-secondary/50 to-secondary/30 p-5 text-left backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    >
                      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-background/40">
                        {/*
                          Banner crop: object-cover so the image fills the slot
                          edge to edge on every card, and object-top so the crop
                          keeps the head of the certificate.

                          The certificates are mixed orientation. The landscape
                          ones are 1.34 against a 1.333 slot, so they lose only a
                          sliver. The two portrait ones show roughly their top
                          half, which is the logo, the title and the recipient
                          name. What gets cropped is the signature block at the
                          bottom, and the whole certificate is one click away in
                          the PDF, so nothing is actually withheld.

                          Earlier versions used object-contain, which showed the
                          full page but left dark side gaps on the portrait cards,
                          then a blurred copy behind to fill those gaps. Both
                          looked like a workaround next to a landscape card that
                          filled naturally.
                        */}
                        <img
                          src={cert.image}
                          alt={`${cert.title} certificate issued by ${cert.issuer}`}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {/* Hover hint, so the open-PDF affordance is discoverable. */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1.5 bg-background/70 text-xs text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                          Open PDF
                        </div>
                      </div>

                      <div className="space-y-1">
                        {/*
                          Two lines reserved for every title, since some wrap and
                          some do not. Without it the summary text starts at a
                          different height on each card and the row reads ragged.
                        */}
                        <h3 className="min-h-[2.75rem] text-base font-semibold leading-snug">
                          {cert.title}
                        </h3>
                        <p className="flex items-center gap-1.5 text-xs text-blue-400">
                          {/* Resolved from ISSUER_ICON, so one school always reads
                            with one glyph. See the note on that map. */}
                          <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {cert.issuer}
                        </p>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {cert.summary}
                      </p>
                    </a>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/*
            Arrows centred below rather than the component default of 48px
            outside the container, which would overflow the section's 32px
            padding and clip on narrow screens. Centred below is safe at every
            width and reachable on touch.
          */}
          <div className="flex items-center justify-center gap-3 pt-10">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
