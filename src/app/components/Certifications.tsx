import { useState } from "react";
import { Award, BadgeCheck, ExternalLink, GraduationCap, Maximize2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type Certification = {
  title: string;
  issuer: string;
  summary: string;
  icon: typeof Award;
  /**
   * Certificate image. Drop the PNG in public/certificates/ and set the path
   * here, for example "/certificates/istqb-ctfl.png".
   *
   * With an image the card becomes a button that opens the certificate at full
   * size. Without one it renders as a plain card showing its icon, and is
   * deliberately NOT clickable, because a card that looks pressable but opens
   * an empty dialog is a dead affordance.
   */
  image?: string;
  /** Public verification link, if the issuer provides one. */
  credentialUrl?: string;
};

/**
 * Credentials, assessed by a third party. Deliberately separate from the
 * capabilities radar above, which is self-scored against a published rubric.
 *
 * Layout is four across with small thumbnails, not a carousel and not a
 * see-more. With four items a carousel hides three behind arrow clicks that most
 * readers never make, and a see-more hides content for no gain. Four across plus
 * click-to-enlarge keeps every credential visible while halving the section
 * height, and anyone who wants to read a certificate gets it full size.
 *
 * Add or swap an entry by editing the array. To change the count, adjust the
 * grid: three across suits five or six items, four across suits four or eight.
 * A single card alone on the last row reads as a mistake.
 */
const certifications: Certification[] = [
  {
    title: "ISTQB Certified Tester, Foundation Level 4.0",
    issuer: "ISTQB",
    summary:
      "The industry baseline for test engineering: test design techniques, the full test process, and test management.",
    icon: BadgeCheck,
  },
  {
    title: "Cypress: Web Automation Testing",
    issuer: "Udemy",
    summary:
      "End-to-end browser automation in Cypress, from selectors and assertions through to running suites in CI.",
    icon: Award,
  },
  {
    title: "ISO 27001:2022 (ISMS)",
    issuer: "Alison / Udemy",
    summary:
      "Information security management: risk assessment, controls, and what auditors look for.",
    icon: ShieldCheck,
  },
  {
    title: "Business Analysis",
    issuer: "Udemy",
    summary:
      "Requirement gathering and stakeholder analysis, turning business needs into specifications a team can build from.",
    icon: GraduationCap,
  },
];

export function Certifications() {
  const [openCert, setOpenCert] = useState<Certification | null>(null);

  return (
    <section className="px-8 py-32">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Certifications &amp; Training</h2>
          {/*
            This line is doing real work. The capabilities radar two sections up
            is honest but still self-judged. These were assessed by someone else,
            and saying so shows the author knows the difference between the two
            kinds of claim, which is the instinct a QA hire should have.
          */}
          <p className="text-lg text-muted-foreground">
            Independently verified, not self-assessed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            const clickable = Boolean(cert.image);

            const inner = (
              <>
                {/*
                  The media slot is a fixed 4:3 box whether or not an image
                  exists, with the icon centred in it as the fallback. An image
                  is roughly 200px tall against a 44px icon, so mixing the two
                  pushed the titles to different heights and left the row
                  ragged. This keeps all four aligned even if only some of the
                  certificate PNGs have been supplied.
                */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-background/40">
                  {cert.image ? (
                    <>
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate issued by ${cert.issuer}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Hover hint, so the enlarge affordance is discoverable. */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Maximize2 className="h-5 w-5 text-foreground" aria-hidden />
                      </div>
                    </>
                  ) : (
                    <Icon className="h-8 w-8 text-blue-500/70" aria-hidden />
                  )}
                </div>

                <div className="space-y-1">
                  {/*
                    Two lines reserved for every title. Card boxes were already
                    identical (270x379 across all four), but two of these titles
                    wrap to two lines and two fit on one, which started the
                    summary text 22px lower on half the cards and left the row
                    looking ragged. 2.75rem is two lines of text-base at
                    leading-snug.
                  */}
                  <h3 className="min-h-[2.75rem] text-base font-semibold leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-blue-400">{cert.issuer}</p>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {cert.summary}
                </p>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-auto inline-flex items-center gap-1.5 text-xs text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Verify credential
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                )}
              </>
            );

            const cardClasses =
              "relative flex h-full w-full flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-secondary/50 to-secondary/30 p-5 text-left backdrop-blur-sm";

            return (
              <div key={cert.title} className="relative group">
                {/* Glow on hover only, matching the other card sections. */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                {clickable ? (
                  <button
                    type="button"
                    onClick={() => setOpenCert(cert)}
                    aria-label={`View the ${cert.title} certificate at full size`}
                    className={`${cardClasses} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60`}
                  >
                    {inner}
                  </button>
                ) : (
                  <div className={cardClasses}>{inner}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-size certificate viewer. */}
      <Dialog open={Boolean(openCert)} onOpenChange={(open) => !open && setOpenCert(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg">{openCert?.title}</DialogTitle>
            <DialogDescription>{openCert?.issuer}</DialogDescription>
          </DialogHeader>
          {openCert?.image && (
            <img
              src={openCert.image}
              alt={`${openCert.title} certificate issued by ${openCert.issuer}`}
              className="max-h-[70vh] w-full rounded-lg border border-border object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
