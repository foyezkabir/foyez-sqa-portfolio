/**
 * Single source of truth for identity and contact data.
 *
 * Every value is checked before it is used. An empty string means the related
 * control is not rendered at all, rather than rendered pointing nowhere, so a
 * missing URL can never ship as a broken button.
 */

export const profile = {
  name: "Foyez Ullah Kabir",
  role: "SQA Engineer",
  /** Leads the hero badge: the one claim a stranger can verify independently. */
  certification: "ISTQB-CTFL Certified",
  yearsExperience: "3+ Years",
  email: "foyezkabir00@gmail.com",

  /** Lives in public/, so the filename is what lands in the reader's Downloads. */
  resumeUrl: "/Foyez-Ullah-Kabir-SQA-Engineer-CV.pdf",

  /* Module 10 */
  linkedinUrl: "",
  githubUrl: "",
} as const;

/**
 * Badge line at the top of the hero.
 *
 * The name is deliberately absent: the fixed header lock-up already shows it
 * at every scroll position, and repeating it about 100px lower would waste the
 * slot on the credential.
 */
export const heroBadge = `${profile.certification} · ${profile.role} · ${profile.yearsExperience}`;

export const mailtoHref = `mailto:${profile.email}`;
