import { PageType } from "./types";

/**
 * Every view in the app is addressed by a real URL path, and the path is the
 * source of truth for what renders: App derives its state from parseRoute()
 * instead of flipping a page flag that leaves the address bar untouched.
 *
 * Deep links and refreshes work because both hosts already rewrite unknown
 * paths back to the SPA entry point: vercel.json has
 * "/((?!api/).*)" -> "/index.html" and server.ts ends with
 * app.get("*") -> dist/index.html.
 */
export const PAGE_PATHS: Record<PageType, string> = {
  home: "/",
  solutions: "/solutions",
  services: "/services",
  "ai-agents": "/ai-agents",
  "digital-marketing": "/digital-marketing",
  industries: "/industries",
  about: "/about",
  "case-studies": "/case-studies",
  resources: "/resources",
  contact: "/contact",
  // Legal text is reachable from the footer bar, not the main navigation, so it
  // is a real page with a real URL rather than a modal bolted onto Contact.
  "privacy-policy": "/privacy-policy",
};

/** Overlay views that sit on top of whatever page is underneath. */
export const ADDONS_PATH = "/addons";
export const ENQUIRY_PATH = "/enquiry";

/**
 * Catalog prefixes. Each carries its own detail pages one segment deep:
 * /services/erp-audit, /solutions/data-ai-insights, /industries/manufacturing,
 * /ai-agents/copilot-word-docs. They are prefix matches rather than PAGE_PATHS
 * entries because the set of slugs is data-driven.
 */
export const SERVICE_PREFIX = "/services";
export const SOLUTION_PREFIX = "/solutions";
export const INDUSTRY_PREFIX = "/industries";
export const AI_AGENT_PREFIX = "/ai-agents";

/**
 * digital-marketing already owns a full page of its own, so the generic
 * /services/:slug shape points at it instead of rendering a second thinner
 * page for the same practice.
 */
const CATALOG_REDIRECTS: Record<string, string> = {
  [`${SERVICE_PREFIX}/digital-marketing`]: "/digital-marketing",
};

const HOME_TITLE = "Coreenact - Microsoft Dynamics 365 Business Central Partner";

/** document.title per route. Home keeps the original site title for SEO. */
export const PAGE_TITLES: Record<PageType, string> = {
  home: HOME_TITLE,
  solutions: "Solutions | Coreenact",
  services: "Services | Coreenact",
  "ai-agents": "AI & Agents | Coreenact",
  "digital-marketing": "Digital Marketing | Coreenact",
  industries: "Industries | Coreenact",
  about: "About Us | Coreenact",
  "case-studies": "Case Studies | Coreenact",
  resources: "Resources | Coreenact",
  contact: "Contact Us | Coreenact",
  "privacy-policy": "Privacy Policy | Coreenact",
};

export const NOT_FOUND_TITLE = "Page not found | Coreenact";

const PATH_TO_PAGE = new Map<string, PageType>(
  (Object.entries(PAGE_PATHS) as [PageType, string][]).map(([page, path]) => [path, page])
);

export type Route =
  | { kind: "page"; page: PageType }
  | { kind: "service"; id: string }
  /** A solution pillar (/solutions/run-transform) or one of its capability items. */
  | { kind: "solution"; id: string }
  | { kind: "industry"; id: string }
  | { kind: "aiTopic"; id: string }
  | { kind: "addons" }
  | { kind: "addon"; id: string }
  | { kind: "enquiry"; interest: string | null }
  | { kind: "redirect"; to: string }
  | { kind: "unknown"; pathname: string };

export const pagePath = (page: PageType): string => PAGE_PATHS[page] || "/";

export const servicePath = (id: string): string => `${SERVICE_PREFIX}/${id}`;

export const solutionPath = (id: string): string => `${SOLUTION_PREFIX}/${id}`;

export const industryPath = (id: string): string => `${INDUSTRY_PREFIX}/${id}`;

export const aiTopicPath = (id: string): string => `${AI_AGENT_PREFIX}/${id}`;

export const addonPath = (id: string): string => `${ADDONS_PATH}/${id}`;

export const enquiryPath = (interest?: string): string =>
  interest ? `${ENQUIRY_PATH}?interest=${encodeURIComponent(interest)}` : ENQUIRY_PATH;

/** "/Services/" and "/services/" both resolve to "/services"; "/" stays "/". */
const normalize = (pathname: string): string => {
  const trimmed = (pathname || "/").replace(/\/+$/, "").toLowerCase();
  return trimmed === "" ? "/" : trimmed;
};

/**
 * A catalog detail path is exactly one segment past its prefix. Anything deeper
 * ("/services/a/b") is a typo or a scraped artefact, so it becomes unknown
 * instead of silently matching the nearest slug.
 */
const detailSegment = (path: string, prefix: string): string | null => {
  if (!path.startsWith(`${prefix}/`)) return null;
  const rest = path.slice(prefix.length + 1);
  return rest && !rest.includes("/") ? decodeURIComponent(rest) : null;
};

export const parseRoute = (pathname: string, search = ""): Route => {
  const path = normalize(pathname);

  const redirect = CATALOG_REDIRECTS[path];
  if (redirect) return { kind: "redirect", to: redirect };

  const page = PATH_TO_PAGE.get(path);
  if (page) return { kind: "page", page };

  const serviceId = detailSegment(path, SERVICE_PREFIX);
  if (serviceId) return { kind: "service", id: serviceId };

  const solutionId = detailSegment(path, SOLUTION_PREFIX);
  if (solutionId) return { kind: "solution", id: solutionId };

  const industryId = detailSegment(path, INDUSTRY_PREFIX);
  if (industryId) return { kind: "industry", id: industryId };

  const topicId = detailSegment(path, AI_AGENT_PREFIX);
  if (topicId) return { kind: "aiTopic", id: topicId };

  if (path === ADDONS_PATH) return { kind: "addons" };
  if (path.startsWith(`${ADDONS_PATH}/`)) {
    const id = decodeURIComponent(path.slice(ADDONS_PATH.length + 1));
    // A shared link can arrive with extra segments; anything but a bare slug
    // is treated as unknown rather than silently matched.
    if (id && !id.includes("/")) return { kind: "addon", id };
    return { kind: "unknown", pathname: path };
  }
  if (path === ENQUIRY_PATH) {
    const interest = new URLSearchParams(search).get("interest");
    return { kind: "enquiry", interest: interest && interest.trim() ? interest : null };
  }

  return { kind: "unknown", pathname: path };
};

export const routeFromLocation = (): Route =>
  parseRoute(window.location.pathname, window.location.search);

/**
 * The nav-highlighted page a route belongs to. Detail pages report their
 * catalog so the navbar, breadcrumb and back trail keep treating them as part
 * of Services or Solutions. Overlays return null and leave the page underneath.
 */
export const pageForRoute = (route: Route): PageType | null => {
  switch (route.kind) {
    case "page":
      return route.page;
    case "service":
      return "services";
    case "solution":
      return "solutions";
    case "industry":
      return "industries";
    case "aiTopic":
      return "ai-agents";
    // The target of a catalog redirect is known while parsing, so the dedicated
    // page can render immediately and the address be rewritten a moment later.
    case "redirect":
      return PATH_TO_PAGE.get(normalize(route.to)) ?? null;
    default:
      return null;
  }
};

/** Stable identity for a route, used to decide when a real page change happened. */
export const routeKey = (route: Route): string | null => {
  switch (route.kind) {
    case "page":
      return PAGE_PATHS[route.page];
    case "service":
      return servicePath(route.id);
    case "solution":
      return solutionPath(route.id);
    case "industry":
      return industryPath(route.id);
    case "aiTopic":
      return aiTopicPath(route.id);
    case "redirect":
      return route.to;
    default:
      return null;
  }
};

/** The page a URL resolves to, or home for overlay and unrecognised paths. */
export const initialPageFromLocation = (): PageType => {
  const page = pageForRoute(routeFromLocation());
  return page ?? "home";
};

/** True for a catalog detail path, whether or not the slug actually exists. */
export const isCatalogPath = (target: string): boolean =>
  [SERVICE_PREFIX, SOLUTION_PREFIX, INDUSTRY_PREFIX, AI_AGENT_PREFIX].some(
    (prefix) => target.startsWith(`${prefix}/`)
  );

export const isPageName = (target: string): target is PageType =>
  Object.prototype.hasOwnProperty.call(PAGE_PATHS, target);
