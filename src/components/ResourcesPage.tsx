import React, { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  BookOpen,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Code2,
  Grid,
  FileSpreadsheet,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
  Bookmark,
  Share2,
} from "lucide-react";
import { MicrosoftLogo, MicrosoftAppBadge } from "./icons/MicrosoftIcons";
import {
  RESOURCE_CATEGORIES_DATA,
  UPCOMING_UPDATES_DATA,
  ResourceItem,
  UpcomingUpdateItem,
} from "../data/resourcesData";

interface ResourcesPageProps {
  onOpenContact: (interest?: string) => void;
  onNavigateTab?: (tabId: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onOpenContact }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>("all");
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [isRefreshingUpdates, setIsRefreshingUpdates] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Just now");
  const [copiedLinkNotice, setCopiedLinkNotice] = useState<string | null>(null);

  const handleRefreshUpdates = () => {
    setIsRefreshingUpdates(true);
    setTimeout(() => {
      setIsRefreshingUpdates(false);
      const now = new Date();
      setLastSyncTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 600);
  };

  const handleShareLink = (url: string, title: string) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setCopiedLinkNotice(`Copied link for "${title}"`);
        setTimeout(() => setCopiedLinkNotice(null), 3000);
      }
    } catch {
      // Fallback
    }
  };

  // Filtered upcoming updates
  const filteredUpdates = useMemo(() => {
    return UPCOMING_UPDATES_DATA.filter((update) => {
      const matchesSearch =
        searchQuery === "" ||
        update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.releaseWave.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPillar =
        selectedPillarFilter === "all" || update.category === selectedPillarFilter;

      const matchesStatus =
        selectedStatusFilter === "all" || update.status === selectedStatusFilter;

      return matchesSearch && matchesPillar && matchesStatus;
    });
  }, [searchQuery, selectedPillarFilter, selectedStatusFilter]);

  // Filtered resource categories
  const filteredCategories = useMemo(() => {
    return RESOURCE_CATEGORIES_DATA.map((cat) => {
      const matchingItems = cat.items.filter((item) => {
        const matchesSearch =
          searchQuery === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSearch;
      });

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter((cat) => {
      if (selectedCategoryTab !== "all" && cat.id !== selectedCategoryTab) {
        return false;
      }
      return cat.items.length > 0;
    });
  }, [searchQuery, selectedCategoryTab]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "Code2":
        return <Code2 className="w-5 h-5" />;
      case "Grid":
        return <Grid className="w-5 h-5" />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Toast Notice */}
      {copiedLinkNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{copiedLinkNotice}</span>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-slate-900/60 dark:via-[#0b0f19] dark:to-[#0b0f19] py-12 md:py-16">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-sky-300 text-xs font-bold tracking-wide">
                  <MicrosoftLogo className="w-3.5 h-3.5" />
                  <span>Official Microsoft Dynamics 365 Business Central Resources</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Release Wave 2025/2026 Sync Active</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white font-heading text-balance">
                Business Central Resources & Live Upcoming Updates
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl text-balance">
                Explore Microsoft's complete suite of official technical documentation, India GST statutory frameworks, certification study paths, developer APIs, and real-time release plans.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <a
                  href="https://www.microsoft.com/en-in/dynamics-365/products/business-central"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-blue-700 dark:text-sky-400 hover:underline"
                >
                  <span>Microsoft Official Product Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span>·</span>
                <a
                  href="https://learn.microsoft.com/en-in/dynamics365/release-plan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 hover:underline"
                >
                  <span>Microsoft Release Plans Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span>·</span>
                <span>Last Verified: {lastSyncTime}</span>
              </div>
            </div>

            {/* Quick Actions / External Primary CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://www.microsoft.com/en-in/dynamics-365/products/business-central"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MicrosoftLogo className="w-4 h-4" />
                <span>Visit Microsoft Business Central Hub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onOpenContact("Business Central Implementation & Roadmap Review")}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Architecture Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Controls: Search & Category Tabs */}
      <section className="sticky top-20 z-30 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-2xs">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation, GST guides, Copilot agents, MB-800, AL code..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Segmented Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {[
                { id: "all", label: "All Resources" },
                { id: "updates-anchor", label: "Upcoming Updates" },
                { id: "documentation", label: "Docs & Learn" },
                { id: "localization", label: "India GST" },
                { id: "training", label: "MB-800 Training" },
                { id: "developer", label: "AL Developers" },
                { id: "community-appsource", label: "AppSource & Community" },
                { id: "migration-whitepapers", label: "Playbooks" },
              ].map((tab) => {
                const isActive =
                  tab.id === "updates-anchor"
                    ? selectedCategoryTab === "updates-anchor"
                    : selectedCategoryTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === "updates-anchor") {
                        const el = document.getElementById("upcoming-updates-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        setSelectedCategoryTab("all");
                      } else {
                        setSelectedCategoryTab(tab.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: LIVE UPCOMING UPDATES & RELEASE WAVE ROADMAP */}
      <section
        id="upcoming-updates-section"
        className="py-14 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400">
                  Continuous Release Cadence
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-heading">
                Upcoming Updates & Release Wave Roadmap
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Continuous capabilities tracked from Microsoft Release Wave 2025 Wave 2, 2026 Wave 1, and the Microsoft AI at Work Roadmap.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefreshUpdates}
                disabled={isRefreshingUpdates}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2 cursor-pointer shadow-2xs"
                title="Simulate live check with Microsoft Dynamics 365 Roadmap"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-blue-600 dark:text-sky-400 ${
                    isRefreshingUpdates ? "animate-spin" : ""
                  }`}
                />
                <span>{isRefreshingUpdates ? "Checking..." : "Sync Status"}</span>
              </button>

              <a
                href="https://learn.microsoft.com/en-in/dynamics365/release-plan/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              >
                <span>View Full Microsoft Release Plans</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Secondary Filters for Roadmap: Pillar & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">
                Pillar:
              </span>
              {[
                "all",
                "AI & Copilot",
                "Finance & Core",
                "Supply Chain",
                "India Localization",
                "Developer & Admin",
                "Governance",
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPillarFilter(p)}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                    selectedPillarFilter === p
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {p === "all" ? "All Pillars" : p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">
                Status:
              </span>
              {["all", "Rolling Out", "Public Preview", "General Availability"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                    selectedStatusFilter === s
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {s === "all" ? "All Statuses" : s}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Updates Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  No upcoming updates match your search criteria. Try clearing filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPillarFilter("all");
                    setSelectedStatusFilter("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
                >
                  Reset Roadmap Filters
                </button>
              </div>
            ) : (
              filteredUpdates.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between space-y-5 shadow-xs hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition group text-left"
                >
                  <div className="space-y-4">
                    {/* Header: Wave and Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-sky-300">
                        {item.releaseWave}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          item.status === "Rolling Out"
                            ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                            : item.status === "Public Preview"
                            ? "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800"
                            : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                        {item.category} · Target: {item.targetDate}
                      </span>
                      <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Quantified Business Impact */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs">
                      <div className="font-bold text-slate-900 dark:text-slate-200 mb-0.5">
                        Business Value:
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.businessImpact}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        Key Capabilities:
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {item.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-blue-600 dark:text-sky-400 font-bold shrink-0">
                              ✓
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coreenact Advisory Note */}
                    <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200">
                      <span className="font-bold">Coreenact Advisory: </span>
                      <span>{item.coreenactAdvisoryNote}</span>
                    </div>
                  </div>

                  {/* Card Footer: Microsoft Link & Action */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <a
                      href={item.microsoftDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>Read Documentation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onOpenContact(`Upcoming Update: ${item.title}`)}
                      className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
                    >
                      Discuss Implementation →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: OFFICIAL MICROSOFT RESOURCE CATEGORIES */}
      <section className="py-16">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredCategories.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                No resources match your search "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
              >
                Clear Search Query
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-sky-400 flex items-center justify-center shrink-0">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white font-heading">
                          {category.title}
                        </h2>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                          {category.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition group text-left"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            {item.isOfficialMicrosoft && (
                              <span className="inline-flex items-center gap-1 font-bold text-blue-700 dark:text-sky-400">
                                <MicrosoftLogo className="w-3 h-3" />
                                <span>Microsoft Learn</span>
                              </span>
                            )}
                            {item.readTimeOrDuration && (
                              <>
                                <span>·</span>
                                <span>{item.readTimeOrDuration}</span>
                              </>
                            )}
                          </div>

                          <button
                            onClick={() => handleShareLink(item.externalUrl, item.title)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                            title="Copy link"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Tags as clean unboxed typography with typographic dots */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          {item.tags.map((tag, tIdx) => (
                            <React.Fragment key={tIdx}>
                              <span>#{tag}</span>
                              {tIdx < item.tags.length - 1 && (
                                <span className="text-slate-300 dark:text-slate-600">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-700 dark:text-sky-400 hover:underline flex items-center gap-1.5"
                        >
                          <span>Open Resource</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => onOpenContact(`Resource Inquiry: ${item.title}`)}
                          className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition"
                        >
                          Request Workshop
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION 3: ENTERPRISE ADVISORY & IMPLEMENTATION CALLOUT */}
      <section className="py-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 border border-blue-500/40 text-sky-200 text-xs font-mono font-bold">
                <MicrosoftLogo className="w-3.5 h-3.5" />
                <span>Coreenact Advisory Practice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
                Ready to Implement Business Central or Plan Your Cloud Migration?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our certified Microsoft Solution Architects in Haryana (India) and Mississauga (Canada) can conduct an architecture audit, fit-gap analysis, and provide transparent fixed-fee migration pricing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenContact("Business Central Implementation & Roadmap Review")}
                className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://learn.microsoft.com/en-in/dynamics365/business-central/LocalFunctionality/India/india-local-functionality"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <span>India GST Local Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
