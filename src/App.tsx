import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SolutionsGrid } from "./components/SolutionsGrid";
import { CaseStudies } from "./components/CaseStudies";
import { GlobalHubs } from "./components/GlobalHubs";
import { TechStackShowcase } from "./components/TechStackShowcase";
import { Footer } from "./components/Footer";
import { MorePossibilitiesSection } from "./components/MorePossibilitiesSection";
import { ContactModal } from "./components/ContactModal";
import { AddonsListCard } from "./components/AddonsListCard";
import { AddonDetailModal } from "./components/AddonDetailModal";
import { AddonsDrawer } from "./components/AddonsDrawer";
import { AddonItem, ADDONS_LIST } from "./data/addonsData";
import { PageType } from "./types";
import {
  Route,
  ADDONS_PATH,
  NOT_FOUND_TITLE,
  PAGE_TITLES,
  addonPath,
  aiTopicPath,
  enquiryPath,
  industryPath,
  initialPageFromLocation,
  isCatalogPath,
  isPageName,
  pageForRoute,
  pagePath,
  routeFromLocation,
  routeKey,
  servicePath,
  solutionPath,
} from "./routes";
import { NotFoundPage } from "./components/NotFoundPage";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Factory,
  Info,
  Mail,
  ChevronRight,
  Layers,
  TrendingUp,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  COREENACT_CONTACT,
  INDUSTRIES_CATALOG,
  SERVICES_CATALOG,
  SOLUTION_PILLARS,
} from "./data/coreenactData";
import { findSolutionItem, SOLUTION_ITEMS } from "./data/solutionsMeta";
import { MicrosoftAppBadge } from "./components/icons/MicrosoftIcons";
import consultantConsultingImg from "./assets/images/indian_d365_consultant_1790050307568.jpg";
import industryOpsCardImg from "./assets/images/indian_industry_ops_1790050360620.jpg";
import globalConsultingTeamImg from "./assets/images/enterprise_consulting_team_1790047798645.jpg";
import agenticAiImg from "./assets/images/agentic_ai_orchestration_1790754514111.jpg";

/*
 * Route-level chunks. Now that the address decides what renders, everything that
 * is not the landing view is fetched on demand instead of being parsed before
 * first paint: the sub-pages, the ROI calculator and the two chat surfaces
 * (which pull in react-markdown) all leave the initial bundle. Components above
 * the fold on home stay eager so the hero never waits on a second request.
 */
const ServicesPage = lazy(() =>
  import("./components/ServicesPage").then((m) => ({ default: m.ServicesPage }))
);
const ServiceDetailPage = lazy(() =>
  import("./components/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage }))
);
const SolutionDetailPage = lazy(() =>
  import("./components/SolutionDetailPage").then((m) => ({ default: m.SolutionDetailPage }))
);
const SolutionItemDetailPage = lazy(() =>
  import("./components/SolutionItemDetailPage").then((m) => ({
    default: m.SolutionItemDetailPage,
  }))
);
const IndustryDetailPage = lazy(() =>
  import("./components/IndustryDetailPage").then((m) => ({ default: m.IndustryDetailPage }))
);
const CopilotTopicPage = lazy(() =>
  import("./components/CopilotTopicPage").then((m) => ({ default: m.CopilotTopicPage }))
);
const IndustriesPage = lazy(() =>
  import("./components/IndustriesPage").then((m) => ({ default: m.IndustriesPage }))
);
const AboutPage = lazy(() =>
  import("./components/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import("./components/ContactPage").then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import("./components/PrivacyPolicyPage").then((m) => ({
    default: m.PrivacyPolicyPage,
  }))
);
const RoiCalculator = lazy(() =>
  import("./components/RoiCalculator").then((m) => ({ default: m.RoiCalculator }))
);
const AiAgentsPage = lazy(() =>
  import("./components/AiAgentsPage").then((m) => ({ default: m.AiAgentsPage }))
);
const ResourcesPage = lazy(() =>
  import("./components/ResourcesPage").then((m) => ({ default: m.ResourcesPage }))
);
const DigitalMarketingSection = lazy(() =>
  import("./components/DigitalMarketingSection").then((m) => ({
    default: m.DigitalMarketingSection,
  }))
);
const WhatsAppLiveChatWidget = lazy(() =>
  import("./components/WhatsAppLiveChatWidget").then((m) => ({
    default: m.WhatsAppLiveChatWidget,
  }))
);
const ConsultantReplyPortal = lazy(() =>
  import("./components/ConsultantReplyPortal").then((m) => ({
    default: m.ConsultantReplyPortal,
  }))
);

/**
 * Reserves roughly the height of a page while its chunk arrives. Lighthouse
 * measured CLS at 0 on this site; a zero-height fallback would turn that into a
 * jump, so the placeholder is sized rather than empty.
 */
const PageSkeleton = () => (
  <div
    className="flex min-h-[70vh] items-center justify-center"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-sky-400" />
  </div>
);

export default function App() {
  // The URL is the single source of truth for what is on screen. route is parsed
  // from window.location on boot, so a deep link or a refresh renders exactly what
  // the address asks for. pageBehind keeps the underlying page visible while an
  // overlay route (/addons/:id, /enquiry) sits on top of it.
  const [route, setRoute] = useState<Route>(() => routeFromLocation());
  const [pageBehind, setPageBehind] = useState<PageType>(initialPageFromLocation);
  const [historyStack, setHistoryStack] = useState<PageType[]>(() => {
    const page = initialPageFromLocation();
    return page === "home" ? ["home"] : ["home", page];
  });
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);
  const [replySessionId, setReplySessionId] = useState<string | null>(null);
  const [contactInterest, setContactInterest] = useState<string>("Dynamics 365 Business Central");
  const lastScrolledPath = useRef<string | null>(routeKey(route));

  // Everything below is derived from the route rather than stored alongside it,
  // so no view can ever disagree with the address bar.
  const currentPage: PageType = pageForRoute(route) ?? pageBehind;
  const selectedAddon =
    route.kind === "addon"
      ? ADDONS_LIST.find((addon) => addon.id === route.id) ?? null
      : null;
  // Catalog detail routes look their record up here. A slug the catalog does not
  // have is a genuine not-found page rather than a page rendered from nothing.
  const selectedService =
    route.kind === "service"
      ? SERVICES_CATALOG.find((service) => service.id === route.id) ?? null
      : null;
  const selectedPillar =
    route.kind === "solution"
      ? SOLUTION_PILLARS.find((pillar) => pillar.id === route.id) ?? null
      : null;
  // /solutions/:slug carries two families: a pillar, or one capability item that
  // is not a pillar. Only the second lookup runs once the first has missed.
  const selectedItemEntry =
    route.kind === "solution" && !selectedPillar ? findSolutionItem(route.id) : null;
  const selectedIndustry =
    route.kind === "industry"
      ? INDUSTRIES_CATALOG.find((industry) => industry.id === route.id) ?? null
      : null;
  const detailTitle =
    selectedService?.title ??
    selectedPillar?.title ??
    selectedItemEntry?.item.name ??
    selectedIndustry?.name ??
    null;
  const isAddonDetailOpen = selectedAddon !== null;
  const isAddonsDrawerOpen = route.kind === "addons";
  const isContactOpen = route.kind === "enquiry";
  const isNotFound =
    route.kind === "unknown" ||
    (route.kind === "addon" && !selectedAddon) ||
    (route.kind === "service" && !selectedService) ||
    (route.kind === "solution" && !selectedPillar && !selectedItemEntry) ||
    (route.kind === "industry" && !selectedIndustry);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const session = params.get("replySession") || params.get("reply");
      if (session) {
        setReplySessionId(session);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleQuotaExceeded = () => setGmpQuotaExceeded(true);
    window.addEventListener("gmp-quota-exceeded", handleQuotaExceeded);
    return () => window.removeEventListener("gmp-quota-exceeded", handleQuotaExceeded);
  }, []);

  // Back and forward now walk real paths, so popstate only has to re-read the
  // address and let the derived state fall out of it.
  useEffect(() => {
    const handlePopState = () => applyRoute(routeFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isNotFound) {
      document.title = NOT_FOUND_TITLE;
      return;
    }
    // The AI topic page titles itself: its catalogue stays out of this bundle, so
    // App cannot name the record and must not overwrite what the page set.
    if (route.kind === "aiTopic") return;
    // A practice page carries its own name so a shared link reads correctly in a
    // tab, instead of every detail page claiming to be "Services".
    document.title = detailTitle ? `${detailTitle} | Coreenact` : PAGE_TITLES[currentPage];
    // Keyed on the route rather than the page so two detail pages of the same
    // catalog still re-title when only the slug changed.
  }, [currentPage, detailTitle, isNotFound, route]);

  /**
   * /services/digital-marketing names a practice that already owns a full page.
   * pageForRoute renders that page straight away; this only canonicalises the
   * address so the URL bar matches what is on screen.
   */
  useEffect(() => {
    if (route.kind !== "redirect") return;
    try {
      window.history.replaceState({ page: pageForRoute(route) }, "", route.to);
    } catch {}
  }, [route]);

  /** Adopt a route as view state, keeping the in-app trail for the breadcrumb. */
  const applyRoute = (next: Route) => {
    setRoute(next);
    const page = pageForRoute(next);
    if (!page) return;
    setPageBehind(page);
    setHistoryStack((prev) => {
      if (prev[prev.length - 1] === page) return prev;
      const idx = prev.lastIndexOf(page);
      return idx !== -1 ? prev.slice(0, idx + 1) : [...prev, page];
    });
    // Detail pages are documents of their own, so each one opens at the top; the
    // scroll itself happens in the effect below, once the new document exists.
  };

  /**
   * A page change has to land the visitor at the top of the page they asked for.
   * Doing this inside applyRoute cannot work: every page is lazy, so at that
   * instant the browser is still looking at the page being navigated away from,
   * and a smooth scroll started there animates against the old document's height.
   * A footer link into a long page therefore stalled hundreds of pixels down
   * (measured at scrollY 8868 of 9288 on /privacy-policy). Running after the
   * commit, with an instant jump, measures against the right document.
   */
  useEffect(() => {
    const key = routeKey(route);
    if (!key || lastScrolledPath.current === key) return;
    lastScrolledPath.current = key;
    window.scrollTo(0, 0);
  }, [route]);

  const pushRoute = (url: string, state: Record<string, unknown>) => {
    try {
      window.history.pushState(state, "", url);
    } catch {}
    applyRoute(routeFromLocation());
  };

  const replaceRoute = (url: string, state: Record<string, unknown>) => {
    try {
      window.history.replaceState(state, "", url);
    } catch {}
    applyRoute(routeFromLocation());
  };

  const scrollToSection = (sectionId: string): boolean => {
    const el = document.getElementById(sectionId);
    if (!el) return false;
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  };

  const formatPageTitle = (page: PageType): string => {
    switch (page) {
      case "home":
        return "Home";
      case "solutions":
        return "Solutions";
      case "services":
        return "Services";
      case "ai-agents":
        return "AI & Agents";
      case "digital-marketing":
        return "Digital Marketing";
      case "industries":
        return "Industries";
      case "about":
        return "About Us";
      case "case-studies":
        return "Case Studies";
      case "resources":
        return "Resources";
      case "contact":
        return "Contact Us";
      default:
        return (page as string).replace("-", " ");
    }
  };

  const handleOpenContact = (interest?: string) => {
    if (interest) {
      setContactInterest(interest);
    }
    pushRoute(enquiryPath(interest), { overlay: "enquiry" });
  };

  /**
   * Opening an overlay pushes a history entry, so closing pops it and the URL
   * falls back to the page underneath. Arriving at an overlay path directly has
   * nothing underneath in history, so rewrite the address instead of leaving the
   * site behind.
   */
  const closeOverlay = () => {
    if (window.history.state?.overlay) {
      window.history.back();
    } else {
      replaceRoute(pagePath(pageBehind), { page: pageBehind });
    }
  };

  const handleSelectAddon = (addon: AddonItem) => {
    pushRoute(addonPath(addon.id), { overlay: "addon" });
  };

  const openAddonsDrawer = () => {
    pushRoute(ADDONS_PATH, { overlay: "addons" });
  };

  /** Catalog detail pages are real pages, so they are pushed, not overlaid. */
  const handleOpenService = (id: string) => {
    pushRoute(servicePath(id), { page: "services" });
  };

  const handleOpenSolution = (id: string) => {
    pushRoute(solutionPath(id), { page: "solutions" });
  };

  /** Capability items live in the same namespace as their pillar. */
  const handleOpenSolutionItem = (slug: string) => {
    pushRoute(solutionPath(slug), { page: "solutions" });
  };

  const handleOpenIndustry = (id: string) => {
    pushRoute(industryPath(id), { page: "industries" });
  };

  const handleOpenTopic = (id: string) => {
    pushRoute(aiTopicPath(id), { page: "ai-agents" });
  };

  const handleSelectPage = (page: PageType, sectionId?: string) => {
    if (page === currentPage && route.kind === "page") {
      if (sectionId) {
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 50);
      }
      return;
    }
    // applyRoute owns the scroll-to-top whenever the page actually changes.
    pushRoute(pagePath(page), { page });
    if (sectionId) {
      // The target only exists once the new page has mounted.
      setTimeout(() => {
        if (!scrollToSection(sectionId)) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    }
  };

  const handleGoBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // Remove current page
      const prevPage = newStack[newStack.length - 1] || "home";
      setHistoryStack(newStack);
      replaceRoute(pagePath(prevPage), { page: prevPage });
    } else {
      handleSelectPage("home");
    }
  };

  const previousPage: PageType =
    historyStack.length > 1 ? historyStack[historyStack.length - 2] : "home";

  const handleNavigate = (target: string) => {
    // A catalog detail path is a page of its own, not an anchor to scroll to.
    if (isCatalogPath(target)) {
      pushRoute(target, { page: currentPage });
      return;
    }

    // Anything that names a route is a page change.
    if (isPageName(target)) {
      handleSelectPage(target);
      return;
    }

    // If target is calculator or estimator, navigate to contact page #calculator
    if (target === "calculator" || target === "estimator" || target === "#estimator") {
      handleSelectPage("contact", "calculator");
      return;
    }

    // Otherwise it is a section id that lives on the home page.
    if (currentPage !== "home") {
      handleSelectPage("home");
      setTimeout(() => {
        scrollToSection(target);
      }, 100);
    } else {
      scrollToSection(target);
    }
  };

  const handleGroundLocation = (cityName: string) => {
    if (currentPage === "home") {
      const el = document.getElementById("maps");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (currentPage === "contact") {
      const el = document.getElementById("office-directions-map");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    handleSelectPage("contact", "office-directions-map");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-200">
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{" "}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{" "}
            for instructions to update your account.
          </span>
        </div>
      )}
      {/* Top Navigation Header */}
      <Navbar
        activePage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
        onSelectAddon={handleSelectAddon}
      />

      {/* Page Breadcrumb / Bar for Subpages */}
      {currentPage !== "home" && (
        <div className="pt-48 sm:pt-40 pb-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2.5 sm:gap-3 text-slate-500 dark:text-slate-400 min-w-0">
              <button
                onClick={handleGoBack}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-sky-400 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 font-semibold transition-all shadow-2xs cursor-pointer shrink-0"
                title={previousPage ? `Back to ${formatPageTitle(previousPage)}` : "Go back"}
                aria-label={previousPage ? `Back to ${formatPageTitle(previousPage)}` : "Go back"}
              >
                <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
                <span>Back</span>
                {previousPage && previousPage !== "home" && (
                  <span className="hidden sm:inline text-xs font-normal text-slate-400 dark:text-slate-500">
                    to {formatPageTitle(previousPage)}
                  </span>
                )}
              </button>

              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <button
                  onClick={() => handleSelectPage("home")}
                  className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition"
                >
                  Home
                </button>
                {previousPage && previousPage !== "home" && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                    <button
                      onClick={() => handleSelectPage(previousPage)}
                      className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition"
                    >
                      {formatPageTitle(previousPage)}
                    </button>
                  </>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                {detailTitle ? (
                  // The catalog becomes a crumb you can click back out of.
                  <button
                    onClick={() => handleSelectPage(currentPage)}
                    className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition"
                  >
                    {formatPageTitle(currentPage)}
                  </button>
                ) : (
                  <span className="text-blue-700 dark:text-sky-400 font-bold capitalize font-mono text-sm truncate">
                    {formatPageTitle(currentPage)}
                  </span>
                )}
                {selectedItemEntry && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                    <button
                      onClick={() => handleOpenSolution(selectedItemEntry.pillar.id)}
                      className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition"
                    >
                      {selectedItemEntry.pillar.title}
                    </button>
                  </>
                )}
                {detailTitle && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                    <span className="text-blue-700 dark:text-sky-400 font-bold font-mono text-sm truncate">
                      {detailTitle}
                    </span>
                  </>
                )}
              </div>

              <span className="sm:hidden text-blue-700 dark:text-sky-400 font-bold capitalize font-mono text-xs truncate">
                {detailTitle ?? formatPageTitle(currentPage)}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
              <button
                onClick={() => handleOpenContact()}
                className="hidden sm:inline text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer"
              >
                Book D365 Consultation
              </button>
              <button
                onClick={() => handleSelectPage("contact")}
                className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition cursor-pointer whitespace-nowrap"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic View Switcher */}
      <main className="flex-grow" style={{ backgroundColor: "#ffffff" }}>
      <Suspense fallback={<PageSkeleton />}>
        {/* An address that matches no route replaces the page instead of
            stacking on top of it, so a stale link never shows home content
            underneath a not-found message. */}
        {isNotFound ? (
          <NotFoundPage pathname={window.location.pathname} onNavigate={handleSelectPage} />
        ) : (
          <>
        {currentPage === "home" && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenCalculator={() => handleNavigate("calculator")}
              onOpenContact={() => handleOpenContact()}
            />

            {/* Solution pillars — editorial numbered list */}
            <section id="solutions" className="cx-section">
              <div className="cx-wrap">
                <div className="cx-split cx-split-top">
                  <div>
                    <span className="cx-eyebrow">Solution pillars</span>
                    <h2 className="cx-d2 cx-mt-m">
                      More possibilities.
                      <br />
                      Always your control.
                    </h2>
                  </div>
                  <div>
                    <p className="cx-lead">
                      Six pillars cover the full arc of an enterprise ERP programme — core
                      operations, data and insight, global scale, governance, agentic AI and a
                      flagship education platform.
                    </p>
                  </div>
                </div>
                <div className="cx-plist cx-mt-l">
                  {SOLUTION_PILLARS.map((p, i) => (
                    <button
                      key={p.id}
                      className="cx-prow"
                      style={{ width: "100%", textAlign: "left" }}
                      onClick={() => handleOpenSolution(p.id)}
                    >
                      <span className="cx-pnum">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="cx-ptitle" style={{ display: "block" }}>{p.title}</span>
                        <span className="cx-psub" style={{ display: "block" }}>{p.subtitle}</span>
                      </span>
                      <span style={{ color: "#9d988d", alignSelf: "center" }} aria-hidden>
                        <ArrowUpRight size={18} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Enterprise Solutions & EdCore */}
            <SolutionsGrid
              onSelectSolution={() => handleOpenContact()}
              onOpenContact={() => handleOpenContact()}
              onOpenPillar={handleOpenSolution}
              onOpenItem={handleOpenSolutionItem}
            />

            {/* 3b. Interactive Real Microsoft Technology Stack Showcase */}
            <TechStackShowcase onOpenContact={() => handleOpenContact()} />

            {/* 3c. Business Central Add-on Suite Showcase */}
            <section id="addons" className="py-16 bg-[#040817] text-white border-y border-blue-900/40 relative overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-sky-300 text-xs font-mono mb-3">
                    <span className="w-2 h-2 bg-[#0078d4] inline-block shadow-xs shadow-blue-500/50" />
                    <span>MICROSOFT DYNAMICS 365 BC EXTENSIONS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
                    Business Central Add-on Suite
                  </h2>
                  <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
                    Pre-built enterprise add-ons that integrate directly with Business Central to automate workflows, capture approvals, and bridge external channels.
                  </p>
                </div>

                <AddonsListCard
                  onSelectAddon={handleSelectAddon}
                  onOpenConsultation={(addonName) => handleOpenContact(addonName)}
                />
              </div>
            </section>

            {/* 6. Enterprise Case Studies */}
            <CaseStudies
              onOpenContact={() => handleOpenContact()}
            />

            {/* 7. Global Hubs & Delivery Centers */}
            <GlobalHubs
              onGroundLocation={handleGroundLocation}
              onOpenContact={() => handleOpenContact()}
            />

            {/* 8. More possibilities. Always your control. (Section before Footer) */}
            <MorePossibilitiesSection onOpenContact={handleOpenContact} />
          </>
        )}

        {currentPage === "digital-marketing" && (
          <div className="pt-8">
            <DigitalMarketingSection
              isStandalonePage={true}
              onBack={handleGoBack}
              onBackHome={handleGoBack}
              onOpenContact={handleOpenContact}
            />
          </div>
        )}

        {currentPage === "ai-agents" && route.kind === "page" && (
          <div className="pt-4">
            <AiAgentsPage
              onOpenContact={handleOpenContact}
              onOpenTopic={handleOpenTopic}
            />
          </div>
        )}

        {route.kind === "aiTopic" && (
          <CopilotTopicPage
            topicId={route.id}
            onOpenContact={handleOpenContact}
            onBack={() => handleSelectPage("ai-agents")}
            onOpenTopic={handleOpenTopic}
          />
        )}

        {/* The catalog list only renders for its own address; a detail slug
            replaces it rather than stacking underneath it. */}
        {currentPage === "services" && route.kind === "page" && (
          <ServicesPage
            onOpenContact={() => handleOpenContact()}
            onNavigateDigitalMarketing={() => handleSelectPage("digital-marketing")}
            onOpenService={handleOpenService}
          />
        )}

        {selectedService && (
          <ServiceDetailPage
            service={selectedService}
            siblings={SERVICES_CATALOG.filter((svc) => svc.id !== selectedService.id)}
            onOpenContact={handleOpenContact}
            onBack={() => handleSelectPage("services")}
            onOpenService={handleOpenService}
          />
        )}

        {currentPage === "industries" && route.kind === "page" && (
          <IndustriesPage
            onOpenContact={() => handleOpenContact()}
            onOpenIndustry={handleOpenIndustry}
          />
        )}

        {selectedIndustry && (
          <IndustryDetailPage
            industry={selectedIndustry}
            siblings={INDUSTRIES_CATALOG.filter(
              (other) => other.id !== selectedIndustry.id
            )}
            onOpenContact={handleOpenContact}
            onBack={() => handleSelectPage("industries")}
            onOpenIndustry={handleOpenIndustry}
          />
        )}

        {currentPage === "resources" && (
          <ResourcesPage
            onOpenContact={handleOpenContact}
            onNavigateTab={handleNavigate}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onOpenContact={() => handleOpenContact()}
            onGroundLocation={handleGroundLocation}
          />
        )}

        {currentPage === "privacy-policy" && (
          <PrivacyPolicyPage onOpenContact={() => handleOpenContact()} />
        )}

        {currentPage === "contact" && (
          <>
            <ContactPage
              onGroundLocation={handleGroundLocation}
            />
            <RoiCalculator
              onOpenContact={(interest) =>
                handleOpenContact(interest || "Dynamics 365 Business Central Licensing & ROI")
              }
            />
          </>
        )}

        {currentPage === "solutions" && route.kind === "page" && (
          <div className="pt-8">
            <SolutionsGrid
              onSelectSolution={() => handleOpenContact()}
              onOpenContact={() => handleOpenContact()}
              onOpenPillar={handleOpenSolution}
              onOpenItem={handleOpenSolutionItem}
            />
          </div>
        )}

        {selectedPillar && (
          <SolutionDetailPage
            pillar={selectedPillar}
            siblings={SOLUTION_PILLARS.filter((other) => other.id !== selectedPillar.id)}
            onOpenContact={handleOpenContact}
            onBack={() => handleSelectPage("solutions")}
            onOpenSolution={handleOpenSolution}
            onOpenItem={handleOpenSolutionItem}
          />
        )}

        {selectedItemEntry && (
          <SolutionItemDetailPage
            entry={selectedItemEntry}
            siblings={SOLUTION_ITEMS.filter(
              (other) =>
                other.pillar.id === selectedItemEntry.pillar.id &&
                other.slug !== selectedItemEntry.slug
            )}
            onOpenContact={handleOpenContact}
            onOpenPillar={handleOpenSolution}
            onOpenItem={handleOpenSolutionItem}
          />
        )}

        {currentPage === "case-studies" && (
          <div className="pt-8 pb-16">
            <CaseStudies
              onOpenContact={() => handleOpenContact()}
            />
          </div>
        )}
          </>
        )}
      </Suspense>
      </main>

      {/* Dark Footer as requested */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* Floating Action Button for Add-on Suite */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={openAddonsDrawer}
          className="p-3 sm:px-4 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-md transition-all duration-150 flex items-center gap-3 cursor-pointer border border-slate-700/50 dark:border-slate-200"
          title="Explore Microsoft Dynamics 365 Business Central Add-ons"
        >
          <div className="w-7 h-7 rounded-lg bg-[#005a9e] text-white flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="font-bold text-xs leading-tight flex items-center gap-1.5">
              <span>BC Add-on Suite</span>
              <span className="text-[10px] bg-[#005a9e]/20 text-[#005a9e] dark:bg-blue-100 dark:text-blue-800 px-1.5 py-0.5 rounded font-mono font-medium">
                9 Modules
              </span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-600 font-mono mt-0.5 leading-none">
              Dynamics 365 BC Extensions
            </div>
          </div>
        </button>
      </div>

      {/* WhatsApp Real-Time Live Chat with Consultant (+91 84487 96169) */}
      {/* Empty fallback on purpose: the launcher is position:fixed, so nothing
          shifts when it arrives a moment later. */}
      <Suspense fallback={null}>
        <WhatsAppLiveChatWidget
          consultantPhone="918448796169"
          displayPhone="+91 84487 96169"
        />
      </Suspense>

      {/* Add-on Detailed Modal */}
      <AddonDetailModal
        addon={selectedAddon}
        isOpen={isAddonDetailOpen}
        onClose={closeOverlay}
        onOpenConsultation={(addonName) => handleOpenContact(addonName)}
      />

      {/* Add-ons Sliding Drawer */}
      <AddonsDrawer
        isOpen={isAddonsDrawerOpen}
        onClose={closeOverlay}
        onSelectAddon={handleSelectAddon}
        onOpenConsultation={handleOpenContact}
      />

      {/* Contact & Architecture Discovery Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={closeOverlay}
        initialInterest={
          route.kind === "enquiry" && route.interest ? route.interest : contactInterest
        }
      />

      {/* One-Tap Consultant Live Reply Portal from WhatsApp link */}
      {replySessionId && (
        <Suspense fallback={null}>
          <ConsultantReplyPortal
            sessionId={replySessionId}
            onClose={() => {
              setReplySessionId(null);
              try {
                const url = new URL(window.location.href);
                url.searchParams.delete("replySession");
                url.searchParams.delete("reply");
                window.history.replaceState({}, "", url.pathname);
              } catch {}
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
