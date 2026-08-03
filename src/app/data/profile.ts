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
  /** The one claim a stranger can verify independently. */
  certification: "ISTQB-CTFL Certified",
  email: "foyezkabir00@gmail.com",

  /** Lives in public/, so the filename is what lands in the reader's Downloads. */
  resumeUrl: "/Foyez-Ullah-Kabir-SQA-Engineer-CV.pdf",

  /*
    MODULE 10. Both were empty, which meant the Contact section rendered the email
    button alone and silently dropped the other two. Filled in now, so all three
    appear.

    THE PHONE NUMBER IS DELIBERATELY NOT HERE, and it is in cv-data.txt if it is
    ever wanted. Email plus LinkedIn plus GitHub is the normal contact set for a
    public page; a mobile number on one is an invitation to scrapers, and a
    recruiter who wants to call will ask for it in the first reply anyway.
  */
  linkedinUrl: "https://www.linkedin.com/in/foyez-kabir/",
  githubUrl: "https://github.com/foyezkabir",
} as const;

/**
 * First professional QA role: the A1qa functional testing internship, which
 * cv-data.txt and the Experience section both date to April 2023. Month is
 * 0-indexed, so 3 is April.
 */
const CAREER_START = new Date(2023, 3, 1);

/**
 * Years of experience, DERIVED rather than typed.
 *
 * This was the string "3+ Years" sitting in the object above. It was accurate,
 * and that is exactly the problem: April 2023 to August 2026 is 3 years 4
 * months, so it read correctly and would have kept reading "3+" through April
 * 2027, at which point the site would have been quietly understating him by a
 * year with nothing to prompt an edit. A hardcoded duration is a fact with an
 * expiry date on it.
 *
 * Floor, not round. "3+ years" has to stay true for the whole of year three, so
 * 3 years 11 months is still 3+, and it only becomes 4+ on the anniversary.
 *
 * 365.25 days absorbs leap years. Exact calendar arithmetic is not worth it for
 * a number that only changes once a year and is qualified with a plus sign.
 */
export function yearsOfExperience(now: Date = new Date()): number {
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  return Math.floor((now.getTime() - CAREER_START.getTime()) / MS_PER_YEAR);
}

/** "3+ years", recomputed on every render so it cannot go stale. */
export const experienceLabel = () => `${yearsOfExperience()}+ years`;

export const mailtoHref = `mailto:${profile.email}`;
