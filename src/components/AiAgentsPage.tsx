import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Bot,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Zap,
  Lock,
  Database,
  FileText,
  Workflow,
  ChevronDown,
  ChevronUp,
  Building2,
  Factory,
  GraduationCap,
  Landmark,
  Stethoscope,
  ShoppingBag,
  TrendingUp,
  X,
  Search,
  Check,
  Scale,
  Users,
  Briefcase,
  Code2,
} from "lucide-react";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

import {
  COPILOT_101_IMAGES,
  CopilotTopicDetail,
  COPILOT_TOPIC_DETAILS,
  COPILOT_RELATED_STORIES,
} from "../data/copilotTopics";

interface AiAgentsPageProps {
  onOpenContact: (initialInterest?: string) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenChat?: (initialRole?: "consultant" | "architect" | "fast" | "ai_specialist") => void;
  /** Routes to /ai-agents/:id, so a topic card can be shared as a real URL. */
  onOpenTopic?: (id: string) => void;
}

export const AiAgentsPage: React.FC<AiAgentsPageProps> = ({
  onOpenContact,
  onOpenChat,
  onOpenTopic,
}) => {
  // Active FAQ state for smooth accordion toggles
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active category filter for topics & cards
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Active filter for Related Stories section
  const [relatedStoryFilter, setRelatedStoryFilter] = useState<string>("all");

  // Detailed modal state for card-wise deep dive
  const [selectedTopic, setSelectedTopic] = useState<CopilotTopicDetail | null>(null);

  // Inline expanded cards set for quick on-card workflow reading
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpandCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Filtered topics based on search query and category
  const filteredTopics = useMemo(() => {
    return COPILOT_TOPIC_DETAILS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.appTitle && item.appTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Filtered Related Stories
  const filteredRelatedStories = useMemo(() => {
    if (relatedStoryFilter === "all") return COPILOT_RELATED_STORIES;
    return COPILOT_RELATED_STORIES.filter((story) => {
      if (relatedStoryFilter === "business") {
        return story.badge === "Business AI";
      }
      if (relatedStoryFilter === "legal-hr") {
        return story.badge === "Legal & Compliance" || story.badge === "Human Resources" || story.badge === "Operations & HR";
      }
      if (relatedStoryFilter === "architecture-software") {
        return story.badge === "Architecture & Engineering" || story.badge === "Architecture & Software";
      }
      if (relatedStoryFilter === "agents") {
        return story.badge === "Agent Technology";
      }
      return true;
    });
  }, [relatedStoryFilter]);

  // Official FAQ questions and answers from Microsoft Copilot 101 (WITHOUT ANY NUMERIC SEQUENCING)
  const copilotFaqs = [
    {
      question: "Is Microsoft Copilot compatible with other Microsoft services like Azure and Dynamics 365?",
      answer:
        "Yes, Microsoft Copilot is deeply integrated across the Microsoft ecosystem. Beyond Microsoft 365 productivity apps, Copilot connects directly with Microsoft Dynamics 365 Business Central, Dynamics 365 Finance & Operations, Microsoft Fabric, Microsoft Power Platform, and Microsoft Azure OpenAI Service. It uses Microsoft Graph and secure enterprise connectors to provide grounded intelligence while strictly respecting existing role-based access controls (RBAC).",
    },
    {
      question: "What are some real-world examples of how businesses are using Microsoft Copilot?",
      answer:
        "Enterprises use Microsoft Copilot to automate routine tasks and enhance decision-making across departments. Finance teams use Copilot in Business Central and Excel to automate bank reconciliation, analyze cash flow variances, and forecast receivables. Operations teams predict inventory replenishment needs and evaluate supplier contracts. Sales and customer service teams draft personalized quotes, summarize customer inquiries, and resolve service tickets with AI-grounded suggestions.",
    },
    {
      question: "Do I need any special setup or configuration to start using Microsoft Copilot?",
      answer:
        "To get started with Microsoft Copilot, organizations need an eligible Microsoft 365 subscription (such as Business Standard, Business Premium, E3, or E5) and appropriate Copilot licensing. For enterprise deployment, Coreenact helps businesses prepare by establishing clean Microsoft Entra ID tenant permissions, configuring Microsoft Purview data loss prevention (DLP) labels, and setting up secure connections to Business Central and custom ERP databases.",
    },
    {
      question: "What support and training resources are available for getting started with Microsoft Copilot?",
      answer:
        "Microsoft provides extensive self-paced documentation, interactive guides, and adoption kits through Microsoft Learn and Copilot 101. As an accredited Microsoft Solutions Partner, Coreenact provides hands-on executive briefings, process-mapping workshops, prompt engineering guidance for ERP workflows, and dedicated change management to ensure rapid user adoption and measurable business ROI.",
    },
    {
      question: "Is Microsoft Copilot available in different languages, and does it support multilingual workflows?",
      answer:
        "Yes, Microsoft Copilot supports dozens of global languages, including English, Spanish, Japanese, French, German, Portuguese, Italian, Chinese, and many more. It can interpret prompts in one language and produce structured reports, summaries, or customer emails in another, making it an invaluable tool for multinational enterprises coordinating across global hubs.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 min-h-screen text-left transition-colors duration-200">
      {/* 1. HERO SECTION: Official Microsoft Copilot 101 Structure */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Official Partner Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <span>Microsoft Solutions Partner</span>
            <span aria-hidden="true">·</span>
            <span>Business Applications & AI</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-700 dark:text-sky-400 font-semibold">AI & Autonomous Agents</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Comprehensive Copilot 101 Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-800 dark:text-sky-300 text-xs font-semibold">
                <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                <span>Microsoft Copilot 101: Resources, Topics & Related Stories</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-heading text-balance">
                What is a Copilot? Enterprise AI & Autonomous Agents
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                An introduction to what a copilot is, how AI assistants work, how to streamline business operations with autonomous agents, and enterprise implementation across Microsoft Dynamics 365 and Microsoft 365 apps.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenContact("Copilot & Autonomous Agents Architecture Consultation")}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Copilot Architecture Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onOpenChat && (
                  <button
                    onClick={() => onOpenChat("ai_specialist")}
                    className="px-5 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md transition flex items-center gap-2 cursor-pointer ring-2 ring-blue-400/30"
                  >
                    <Sparkles className="w-4 h-4 text-sky-200 animate-pulse" />
                    <span>Launch Gemini AI Strategist</span>
                  </button>
                )}
                <button
                  onClick={() => scrollToSection("topic-explorer")}
                  className="px-5 py-3 rounded-lg font-semibold text-sm bg-slate-100 hover:bg-slate-200/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                >
                  Explore Topic Capabilities
                </button>
                <button
                  onClick={() => scrollToSection("related-stories")}
                  className="px-5 py-3 rounded-lg font-semibold text-sm bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800 transition cursor-pointer"
                >
                  Related Stories
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Commercial Data Protection
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  No Model Training on Customer Data
                </span>
                <span className="flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Microsoft Graph & ERP Grounding
                </span>
              </div>
            </div>

            {/* Right Column: Exact Microsoft Copilot 101 Hero Insert Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 group">
                <img
                  src={COPILOT_101_IMAGES.heroInsert}
                  alt="Microsoft Copilot conversational assistant on desktop interface"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs uppercase tracking-wider font-mono text-sky-300 font-semibold mb-1">
                    Microsoft Copilot 101
                  </div>
                  <div className="text-base font-bold text-white mb-1">
                    Your Everyday AI Companion
                  </div>
                  <div className="text-xs text-slate-300 leading-snug">
                    Microsoft Copilot combines large language models with Microsoft Graph to deliver real-time assistance, intelligent automation, and contextual decision support.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: WHAT IS A COPILOT? (Core Definition & 3 Pillars from Copilot 101) */}
      <section id="what-is-copilot" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                Definition & Foundation
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                What is a copilot?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                A <strong>copilot</strong> is an AI-powered conversational assistant designed to enhance productivity and creativity by providing real-time support, suggestions, and contextual guidance across applications and workflows.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Just like a copilot in aviation who shares flight responsibilities with the lead pilot, an AI copilot operates alongside you—assisting with complex calculations, drafting communications, summarizing datasets, and automating repetitive activities so you can refocus on strategic, high-value work.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900">
                <img
                  src={COPILOT_101_IMAGES.overview}
                  alt="A professional engaging with Microsoft Copilot AI assistant"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </div>
            </div>
          </div>

          {/* 3 Core Pillars Cards - WITHOUT SEQUENCING NUMBERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-500 transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-sky-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Boosting Productivity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Complete tasks faster with a copilot’s intelligent suggestions, making content creation, data analysis, and communication more efficient across every department.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-blue-700 dark:text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accelerated workflow execution</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-sky-400 dark:hover:border-sky-500 transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 flex items-center justify-center">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Simplifying Automation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  A copilot can automate repetitive tasks, handle multi-step actions, and trigger transactional system updates with no manual coding required.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero-code task orchestration</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-purple-400 dark:hover:border-purple-500 transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Providing Contextual Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  AI suggestions help you make faster, more informed decisions grounded in your organization’s real-time emails, files, calendars, and ERP records.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tenant-grounded accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARD-WISE & TOPIC-WISE EXPLORER CONTROLS */}
      <section id="topic-explorer" className="py-8 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                Topic-Wise & Card-Wise Breakdown
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Explore Topic Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Browse detailed functional capabilities and execution workflows across applications and industries.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics, apps, or industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: "all", label: "All Topics" },
              { id: "apps", label: "What Copilot Can Do (M365 & ERP)" },
              { id: "architecture", label: "AI Architecture & NLP" },
              { id: "agents", label: "Autonomous Agents & Studio" },
              { id: "industries", label: "Industry Applications" },
              { id: "solutions", label: "Solutions & Automation Hub" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE CARD-WISE DETAILED TOPICS GRID */}
      <section className="py-12 sm:py-16 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong>{filteredTopics.length}</strong> card-wise detailed topics
            </span>
            <span className="hidden sm:inline">
              Aligned with Microsoft Copilot 101 Specifications
            </span>
          </div>

          {/* Cards Grid - NO SEQUENCING NUMBERS ANYWHERE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => {
              const isExpanded = !!expandedCards[topic.id];

              return (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                >
                  {/* Top Image Banner */}
                  <div
                    onClick={() => setSelectedTopic(topic)}
                    className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={topic.imageUrl}
                      alt={topic.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-blue-600/90 text-white text-[11px] font-bold shadow-xs">
                      {topic.appTitle || topic.badge}
                    </div>

                    {/* Tagline */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold truncate">
                      {topic.tagline}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-sky-400 font-bold mb-1">
                          {topic.subtitle}
                        </div>
                        <h4
                          onClick={() => setSelectedTopic(topic)}
                          className="text-lg font-bold text-slate-900 dark:text-white font-heading cursor-pointer hover:text-blue-600 dark:hover:text-sky-400 transition"
                        >
                          {topic.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {topic.summary}
                      </p>

                      {/* 3 Structured Key Capabilities Bullet Points on the Card */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Key Capabilities:
                        </div>
                        {topic.keyCapabilities.slice(0, 3).map((cap, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Inline Expanded Details (When Toggled) */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs animate-in fade-in duration-200">
                          {/* Step-by-Step Execution Architecture */}
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-[11px]">
                              <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                              <span>Execution Workflow:</span>
                            </div>
                            <div className="space-y-1.5 pl-1">
                              {topic.howItWorks.map((step, sIdx) => (
                                <div key={sIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {topic.complianceNote && (
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/80 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                              <span>{topic.complianceNote}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleExpandCard(topic.id)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Less Info</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Quick Breakdown</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          onOpenTopic ? onOpenTopic(topic.id) : setSelectedTopic(topic)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>{onOpenTopic ? "See Full Page" : "Full Dossier"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TOPIC DETAIL MODAL (Deep-Dive Card-Wise Dossier) */}
      {selectedTopic && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header with Image Banner */}
            <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedTopic.imageUrl}
                alt={selectedTopic.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedTopic(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                    {selectedTopic.appTitle || selectedTopic.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-sky-300 text-xs font-mono">
                    {selectedTopic.tagline}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {selectedTopic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {selectedTopic.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
              {/* Full Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                  Topic Overview & Context
                </h4>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedTopic.summary}
                </p>
              </div>

              {/* Detailed Key Capabilities Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                  Core Enterprise Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTopic.keyCapabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Execution Architecture */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                  Step-by-Step Architecture & Workflow
                </h4>
                <div className="space-y-2">
                  {selectedTopic.howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Trust Note */}
              {selectedTopic.complianceNote && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Security & Trust:</strong> {selectedTopic.complianceNote}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-850/90 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Want to implement this capability in your Microsoft 365 or Business Central tenant?
              </div>
              <div className="flex items-center gap-3">
                {onOpenTopic && (
                  <button
                    onClick={() => {
                      const id = selectedTopic.id;
                      setSelectedTopic(null);
                      onOpenTopic(id);
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>See Full Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedTopic.title;
                    setSelectedTopic(null);
                    onOpenContact(`Implementation Consultation: ${title}`);
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Implementation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECTION: THE BUSINESS BENEFITS OF A COPILOT (Copilot 101 Core Pillars) */}
      <section id="business-benefits" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
              Proven Enterprise Outcomes
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              The business benefits of a copilot
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When organizations equip their workforce with Microsoft Copilot and automated agents, the impacts scale across operational efficiency, customer satisfaction, and fiscal performance.
            </p>
          </div>

          {/* 3 Outcome Cards - WITHOUT SEQUENCING NUMBERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-sky-400 flex items-center justify-center">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Reduce Manual Effort
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Automating processes like document creation, data analysis, email summarizing, and scheduling minimizes time spent on routine administrative tasks, making employees happier and more engaged with meaningful work.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>Eliminate spreadsheet reconciliation fatigue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>Speed up quote generation by up to 5x</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Enhance Decision-Making
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  By providing intelligent insights, anomaly detection, and predictive forecasts, a copilot empowers users and leadership to make faster, high-confidence decisions grounded in enterprise facts.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Real-time working capital variance insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Accurate inventory safety stock suggestions</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Impact the Bottom Line
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  When employees spend less time on manual paperwork and make important decisions faster, they have more time to focus on strategic initiatives that drive business expansion and profitability.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Direct reduction in operational headcount overhead</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Faster customer SLA turnaround and loyalty</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: RELATED STORIES (From Microsoft Copilot 101) */}
      <section id="related-stories" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-semibold">
                <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                <span>Microsoft Copilot 101 Hub</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                Related stories
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Explore in-depth domain guides, implementation stories, and architectural insights directly from the official Microsoft Copilot 101 series.
              </p>
            </div>

            {/* Category Filter Pills for Related Stories */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Stories" },
                { id: "business", label: "Business AI (Sales & Marketing)" },
                { id: "legal-hr", label: "Legal & HR Operations" },
                { id: "architecture-software", label: "Architecture & Engineering" },
                { id: "agents", label: "Agent & Bot Technology" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setRelatedStoryFilter(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    relatedStoryFilter === pill.id
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Related Stories Grid - NO SEQUENCING NUMBERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelatedStories.map((story) => {
              const isExpanded = !!expandedCards[story.id];

              return (
                <div
                  key={story.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                >
                  {/* Story Cover Image */}
                  <div
                    onClick={() => setSelectedTopic(story)}
                    className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-blue-600/90 text-white text-[11px] font-bold shadow-xs">
                      {story.badge}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold truncate">
                      {story.tagline}
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-sky-400 font-bold mb-1">
                          {story.subtitle}
                        </div>
                        <h3
                          onClick={() => setSelectedTopic(story)}
                          className="text-lg font-bold text-slate-900 dark:text-white font-heading cursor-pointer hover:text-blue-600 dark:hover:text-sky-400 transition"
                        >
                          {story.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {story.summary}
                      </p>

                      {/* 3 Core Capability Highlights */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Key Takeaways & Capabilities:
                        </div>
                        {story.keyCapabilities.slice(0, 3).map((cap, cIdx) => (
                          <div
                            key={cIdx}
                            className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Step-by-Step Workflow */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs animate-in fade-in duration-200">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-[11px]">
                            <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                            <span>Implementation Architecture:</span>
                          </div>
                          <div className="space-y-1.5 pl-1">
                            {story.howItWorks.map((step, sIdx) => (
                              <div key={sIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                          {story.complianceNote && (
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/80 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-750 flex items-start gap-2 mt-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                              <span>{story.complianceNote}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleExpandCard(story.id)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Less Info</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Quick Breakdown</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          onOpenTopic ? onOpenTopic(story.id) : setSelectedTopic(story)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>{onOpenTopic ? "See Full Page" : "Read Full Story"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SECTION: COMMERCIAL DATA PROTECTION & TRUST */}
      <section id="security-trust" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
              Enterprise Trust & Security
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Commercial Data Protection & Zero Model Training
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When utilizing Microsoft Copilot with enterprise work credentials, your organizational data is protected by the most stringent security and compliance certifications in the cloud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">No Model Training</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your prompts, retrieved Microsoft Graph records, and generated replies are never used to train the public foundational models of OpenAI or Microsoft.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Lock className="w-6 h-6 text-blue-600 dark:text-sky-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tenant Isolation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All data remains strictly within your Microsoft 365 and Azure sovereign tenant boundary. Copilot respects existing user permission ACLs automatically.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Purview DLP Integration</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sensitivity labels (Confidential, Restricted, Secret) configured in Microsoft Purview are strictly enforced. Restricted records cannot leak into Copilot summaries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Global Compliance</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Certified compliant with SOC 1/2/3, ISO/IEC 27001, HIPAA, GDPR, FedRAMP High, and the EU Data Boundary commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION: FREQUENTLY ASKED QUESTIONS (From Copilot 101 - WITHOUT ANY SEQUENCING NUMBERS) */}
      <section id="faqs" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Frequently asked questions
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Find answers to common questions about Microsoft Copilot compatibility, real-world deployment, tenant configuration, and multilingual support.
            </p>
          </div>

          {/* Accordion List - WITHOUT ANY "01/", "02/" SEQUENCING NUMBERS */}
          <div className="max-w-4xl space-y-4">
            {copilotFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 transition"
                  >
                    <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-heading">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600 dark:text-sky-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. SECTION: COREENACT IMPLEMENTATION & ARCHITECTURE DISCOVERY CTA */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0b0f19]">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/80 text-sky-300 text-xs font-semibold">
                <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                <span>Certified Microsoft Solutions Partner</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
                Ready to Implement Microsoft Copilot & Custom Agents?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Coreenact’s certified Microsoft architects evaluate your tenant readiness, configure Microsoft Graph permission hygiene, design custom Copilot Studio agents, and integrate Business Central workflows with guaranteed enterprise security.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenContact("Copilot & Autonomous Agents Architecture Consultation")}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Copilot Architecture Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://www.microsoft.com/en-us/microsoft-copilot/copilot-101/what-is-copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-2"
                >
                  <span>Visit Microsoft Copilot 101</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="text-xs text-slate-400 pt-4 flex flex-wrap items-center gap-4">
                <span>Direct Advisory: New Delhi (India) & Mississauga (Canada)</span>
                <span>•</span>
                <span>Inquiries: info@coreenact.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
