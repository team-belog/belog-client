type PageParameters = {
  page_location: string;
  page_referrer: string;
  page_title: string;
};

type GoogleTagArguments =
  | ["js", Date]
  | ["set", PageParameters]
  | ["config", string, Record<string, unknown>]
  | ["event", "page_view", PageParameters];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GoogleTagArguments) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const STATIC_PAGE_PATHS = new Set([
  "/",
  "/landing",
  "/login",
  "/register",
  "/register/profile",
  "/group",
  "/group/new",
  "/group/join",
  "/group/invite",
  "/group/complete",
  "/meetup/new",
  "/pre-log",
  "/pre-log/new",
  "/pre-log/memo",
  "/post-log",
  "/post-log/ticket",
  "/bill-log",
  "/bill-log/new",
  "/my",
  "/my/edit",
  "/notification",
  "/setting",
  "/setting/account",
  "/pwa-guide",
]);

const DYNAMIC_PAGE_PATHS = [
  { pattern: /^\/group\/\d+$/, path: "/group/:id" },
  { pattern: /^\/meetup\/\d+$/, path: "/meetup/:id" },
  { pattern: /^\/meetup\/\d+\/members$/, path: "/meetup/:id/members" },
  { pattern: /^\/meetup\/\d+\/respond$/, path: "/meetup/:id/respond" },
  { pattern: /^\/meetup\/\d+\/status$/, path: "/meetup/:id/status" },
  { pattern: /^\/post-log\/\d+$/, path: "/post-log/:id" },
  { pattern: /^\/bill-log\/\d+$/, path: "/bill-log/:id" },
];

const CAMPAIGN_FIELDS = {
  utm_id: "campaign_id",
  utm_source: "campaign_source",
  utm_medium: "campaign_medium",
  utm_campaign: "campaign_name",
  utm_term: "campaign_term",
  utm_content: "campaign_content",
} as const;

let initialized = false;
let lastPageKey: string | null = null;
let previousPageLocation: string | null = null;

export function normalizeAnalyticsPath(pathname: string) {
  const path = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");

  if (STATIC_PAGE_PATHS.has(path)) return path;

  return DYNAMIC_PAGE_PATHS.find(({ pattern }) => pattern.test(path))?.path ?? null;
}

function getInitialPageReferrer() {
  if (!document.referrer) return "";

  try {
    const referrer = new URL(document.referrer);
    if (!["https:", "http:"].includes(referrer.protocol)) return "";
    if (referrer.origin !== window.location.origin) return referrer.origin;

    const path = normalizeAnalyticsPath(referrer.pathname);
    return path ? `${referrer.origin}${path}` : referrer.origin;
  } catch {
    return "";
  }
}

function getCampaignParameters(search: string) {
  const params = new URLSearchParams(search);
  const campaign: Record<string, string> = {};

  for (const [queryParameter, campaignField] of Object.entries(CAMPAIGN_FIELDS)) {
    const value = params.get(queryParameter)?.trim();
    if (value) campaign[campaignField] = value;
  }

  return campaign;
}

export function trackGoogleAnalyticsPageView(
  measurementId: string,
  pathname: string,
  search: string,
) {
  if (typeof window === "undefined") return;

  const analyticsPath = normalizeAnalyticsPath(pathname);
  const disableKey = `ga-disable-${measurementId}` as const;

  if (!analyticsPath) {
    window[disableKey] = true;
    lastPageKey = null;
    return;
  }

  const pageKey = `${pathname}?${search}`;
  if (lastPageKey === pageKey) return;

  window[disableKey] = false;
  const page: PageParameters = {
    page_location: `${window.location.origin}${analyticsPath}`,
    page_referrer: previousPageLocation ?? getInitialPageReferrer(),
    page_title: document.title,
  };

  const dataLayer = (window.dataLayer ??= []);
  const gtag: NonNullable<Window["gtag"]> =
    window.gtag ??
    function () {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };
  window.gtag = gtag;

  if (!initialized) gtag("js", new Date());

  gtag("set", page);

  if (!initialized) {
    gtag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...getCampaignParameters(search),
    });
    initialized = true;
  }

  gtag("event", "page_view", page);
  lastPageKey = pageKey;
  previousPageLocation = page.page_location;
}
