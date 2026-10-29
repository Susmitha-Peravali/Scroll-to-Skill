/**
 * config.js
 * ---------
 * Central configuration file for "From Scroll to Skill".
 *
 * ⚠️ OFFICIAL WORKSHOP REGISTRATION CONFIGURATION:
 * The challenge brief does not provide an official registration URL.
 * Keep REGISTRATION_URL configurable below.
 * If left as a placeholder or empty, the application will honestly inform
 * the student/evaluator that the official link will be added once available,
 * without navigating to broken domains or pretending a registration occurred.
 */

// ─────────────────────────────────────────────────────────────────────────────
// WORKSHOP REGISTRATION URL
// Leave as placeholder or set to your live registration form when available.
// ─────────────────────────────────────────────────────────────────────────────
export const REGISTRATION_URL =
  "https://your-registration-link.example.com/workshop";
// ↑ Set this to the official registration link once confirmed.

/**
 * Checks whether REGISTRATION_URL is still unconfigured / a placeholder.
 */
export function isPlaceholderUrl(url = REGISTRATION_URL) {
  if (!url) return true;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed === "" ||
    trimmed.includes("your-registration-link.example.com") ||
    trimmed.includes("example.com") ||
    trimmed.startsWith("https://placeholder")
  );
}

/**
 * Safely appends UTM and tracking parameters to any base URL without
 * overriding existing query parameters.
 */
export function buildRegistrationUrl(
  baseUrl = REGISTRATION_URL,
  utmSource = "direct",
  utmCampaign = "scroll_to_skill",
  refCode = ""
) {
  try {
    const url = new URL(baseUrl);
    if (utmSource && !url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", utmSource);
    }
    if (utmCampaign && !url.searchParams.has("utm_campaign")) {
      url.searchParams.set("utm_campaign", utmCampaign);
    }
    if (refCode && !url.searchParams.has("ref")) {
      url.searchParams.set("ref", refCode);
    }
    return url.toString();
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    let extra = `utm_source=${encodeURIComponent(utmSource)}&utm_campaign=${encodeURIComponent(utmCampaign)}`;
    if (refCode) {
      extra += `&ref=${encodeURIComponent(refCode)}`;
    }
    return `${baseUrl}${separator}${extra}`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKSHOP EVENT DETAILS (Official Challenge Brief details)
// ─────────────────────────────────────────────────────────────────────────────
export const WORKSHOP = {
  name: "Build Your First AI Project in 60 Minutes",
  duration: "60 minutes",
  price: "Free",
  format: "Live Interactive Workshop",
  tagline: "Learn how to turn your idea into a working AI project.",
  benefitPoints: [
    "Beginner-friendly",
    "No prior AI project needed",
    "Practical, placement-ready guidance",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGN TARGET BREAKDOWN (500 Registration Goal)
// ─────────────────────────────────────────────────────────────────────────────
export const CAMPAIGN_TARGETS = {
  totalTarget: 500,
  channels: [
    {
      id: "ambassadors",
      name: "Campus Ambassadors",
      target: 200,
      description: "Direct peer-to-peer word of mouth & class reps",
    },
    {
      id: "clubs",
      name: "College Clubs",
      target: 160,
      description: "Technical, coding & innovation club partnerships",
    },
    {
      id: "whatsapp",
      name: "Approved WhatsApp Communities",
      target: 80,
      description: "Moderated student batches, study groups & discord",
    },
    {
      id: "faculty",
      name: "Faculty & Placement Cells",
      target: 40,
      description: "Official department circulars & training officers",
    },
    {
      id: "linkedin",
      name: "LinkedIn & Personal Posts",
      target: 20,
      description: "Ambassador thought-leadership & student build posts",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PROMOTION CHANNELS (UTM definitions)
// ─────────────────────────────────────────────────────────────────────────────
export const UTM_SOURCES = {
  ambassador: "campus_ambassador",
  club: "college_club",
  whatsapp: "whatsapp_community",
  faculty: "placement_cell",
  linkedin: "linkedin",
  direct: "direct",
};

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS TRACKING STUBS
// Wire up to Google Analytics 4, Plausible, or Mixpanel when ready.
// ─────────────────────────────────────────────────────────────────────────────
export const analytics = {
  trackPageView: () => {
    console.debug("[analytics] page_view");
  },
  trackDiscoveryStarted: () => {
    console.debug("[analytics] discovery_started");
  },
  trackDirectRegistrationClick: (source) => {
    console.debug("[analytics] direct_registration_click", { source });
  },
  trackBlockerSelected: (blocker) => {
    console.debug("[analytics] blocker_selected:", blocker);
  },
  trackInterestSelected: (interest) => {
    console.debug("[analytics] interest_selected:", interest);
  },
  trackProjectUnlocked: (projectId, interest, blocker) => {
    console.debug("[analytics] project_unlocked:", { projectId, interest, blocker });
  },
  trackRegistrationClick: (projectId, source) => {
    console.debug("[analytics] registration_click:", { projectId, source });
  },
  trackToolkitGenerated: (channel, college) => {
    console.debug("[analytics] toolkit_link_generated:", { channel, college });
  },
  trackInvitationCopied: () => {
    console.debug("[analytics] invitation_copied");
  },
};
