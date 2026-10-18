import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  TrendingUp,
  Target,
  FileText,
  Share2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Zap,
  Globe2,
  Award,
  Layers,
  DollarSign,
  IndianRupee,
  ChevronRight,
  ShieldCheck,
  Check,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  DIGITAL_MARKETING_SERVICES,
  MARKETING_CASE_RESULTS,
  MARKETING_TECH_STACK,
  MARKETING_SPRINT_STEPS,
  MarketingService,
} from "../data/digitalMarketingData";
import { MicrosoftAppBadge, MicrosoftLogo } from "./icons/MicrosoftIcons";

interface DigitalMarketingSectionProps {
  onOpenContact: (interest?: string) => void;
  isStandalonePage?: boolean;
  onBackHome?: () => void;
  onBack?: () => void;
}

export const DigitalMarketingSection: React.FC<DigitalMarketingSectionProps> = ({
  onOpenContact,
  isStandalonePage = false,
  onBackHome,
  onBack,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("seo-geo");

  const selectedService = useMemo(() => {
    return (
      DIGITAL_MARKETING_SERVICES.find((s) => s.id === selectedServiceId) ||
      DIGITAL_MARKETING_SERVICES[0]
    );
  }, [selectedServiceId]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-5 h-5" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5" />;
      case "Target":
        return <Target className="w-5 h-5" />;
      case "FileText":
        return <FileText className="w-5 h-5" />;
      case "Share2":
        return <Share2 className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="digital-marketing"
      className="py-12 sm:py-20 bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-mono font-bold tracking-wide shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span>COREENACT DIGITAL GROWTH LAB</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-heading">
            Full-Funnel Digital Marketing & B2B Revenue Acceleration
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Dominate search rankings, acquire high-intent enterprise buyers, and bridge your digital campaigns directly to Microsoft Dynamics 365 CRM & ERP pipelines with closed-loop attribution.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Google & Meta Certified
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              B2B Account-Based Marketing (ABM)
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Dynamics 365 Customer Insights & Automation
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Transparent ROAS & ROI Metrics
            </span>
          </div>
        </div>

        {/* Practice Overview: Phased Execution Lifecycle, Deliverables & Business Impact */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-left">
          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#005a9e] dark:text-sky-400 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>B2B Digital Marketing & Growth Practice Blueprint</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                  Closed-Loop Digital Acquisition & Dynamics 365 Attribution
                </h2>
              </div>
              <button
                onClick={() => onOpenContact("B2B Digital Marketing & Growth Acceleration")}
                className="px-5 py-2.5 rounded-xl bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Growth Scoping Session</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 1. Phased Execution Lifecycle */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#005a9e] dark:bg-sky-400" />
                  <span>Phased Execution Lifecycle</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {[
                    "Phase 1: 120-Point Technical SEO, Pixel & Competitor Gap Audit",
                    "Phase 2: Target ICP Architecture, High-Intent Keywords & Ad Creative Build",
                    "Phase 3: Multi-Channel Launch: Google Search, LinkedIn ABM & Core Web Vitals",
                    "Phase 4: CRM/ERP Closed-Loop Attribution & Lead-to-Opportunity Sync",
                    "Phase 5: ROAS Scaling, Conversion Rate Optimization (CRO) & Power BI Dashboards",
                  ].map((phase, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                      <span>{phase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Verified Deliverables */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  <span>Verified Deliverables</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {[
                    "Targeted Inbound B2B Lead Generation (MQL/SQL) Engine",
                    "Technical SEO & Generative Search (GEO) Optimization Blueprint",
                    "High-ROAS Google Ads, LinkedIn & Meta Ads Campaign Architecture",
                    "Microsoft Dynamics 365 Customer Insights & Marketing Journey Setup",
                    "Real-Time Executive Marketing ROI & CAC Dashboards in Power BI",
                  ].map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Strategic Business Value */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  <span>Strategic Business Value</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {[
                    "Average +310% organic search traffic growth within 12 months",
                    "Average 4.8x verified ROAS on enterprise paid campaigns",
                    "100% closed-loop attribution tracking from first click to ERP invoice",
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Core Services Interactive Navigator */}
        <div className="space-y-8">
          {/* Horizontal Filter Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {DIGITAL_MARKETING_SERVICES.map((srv) => {
              const isSelected = srv.id === selectedServiceId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]"
                      : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {getServiceIcon(srv.icon)}
                  <span>{srv.title.split("(")[0].trim()}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {srv.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Service Detailed Showcase: Nested Gradient Border Card */}
          <div className="rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-blue-500/10">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Visual Asset & KPI Badge */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 h-64 sm:h-80 bg-slate-900 group">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    
                    {/* Floating KPI Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <MicrosoftAppBadge app="customer-insights" size="sm" />
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-white shadow-xs">
                        Verified Impact
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-800/80 shadow-md">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {selectedService.kpis.label}
                      </div>
                      <div className="text-2xl font-black text-blue-600 dark:text-sky-400 font-mono">
                        {selectedService.kpis.metric}
                      </div>
                    </div>
                  </div>

                  {/* Tool Stack Tags */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Production Tool Stack & Platforms
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedService.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: In-Depth Features & Deliverables */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
                      {getServiceIcon(selectedService.icon)}
                      <span>Enterprise Capability</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                      {selectedService.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {selectedService.subtitle}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* 2-Column Specs: Key Features & Deliverables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Core Capabilities */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Core Capabilities</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {selectedService.keyFeatures.map((kf, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span>{kf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span>Client Deliverables</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {selectedService.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenContact(`Digital Marketing: ${selectedService.title}`)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Request Proposal for {selectedService.title.split("(")[0].trim()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenContact("Free SEO & Digital Marketing Audit")}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                    >
                      Book Free 30-Min Growth Audit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Service Overview Grid (So all services are fully visible simultaneously) */}
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Complete Digital Marketing Services Spectrum
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore every component of our integrated B2B digital acquisition and retention engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIGITAL_MARKETING_SERVICES.map((srv) => (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedServiceId(srv.id);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="rounded-2xl p-[1.5px] bg-gradient-to-br from-slate-200 via-blue-200/50 to-indigo-200/50 dark:from-slate-800 dark:via-blue-900/30 dark:to-indigo-950 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 group cursor-pointer shadow-xs hover:shadow-lg text-left flex flex-col justify-between"
              >
                <div className="rounded-[14px] bg-white dark:bg-slate-900 p-5 flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-sky-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60 group-hover:scale-105 transition-transform">
                        {getServiceIcon(srv.icon)}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {srv.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        Key KPI Benchmark:
                      </div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {srv.kpis.metric} {srv.kpis.label.toLowerCase()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-sky-400">
                    <span>Explore Full Scope</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 90-Day Sprint Delivery Framework */}
        <div className="space-y-8">
          <div className="text-left space-y-1 max-w-2xl">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
              Battle-Tested Growth Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Our 90-Day B2B Revenue Acceleration Roadmap
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clear milestone progression engineered to build durable organic equity while generating immediate paid revenue momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_SPRINT_STEPS.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl p-[1.5px] bg-gradient-to-b from-blue-500/30 to-slate-200 dark:to-slate-800 text-left h-full"
              >
                <div className="rounded-[14px] bg-white dark:bg-slate-900 p-6 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-sky-400">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                        {s.duration}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
                        {s.phase}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        {s.focus}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                      {s.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Milestone Sign-Off</span>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real B2B Case Results Showcase */}
        <div className="space-y-8">
          <div className="text-left space-y-1 max-w-2xl">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Proven Enterprise Results
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              How We Scale High-Growth Organizations
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Measurable outcomes from industrial manufacturers, enterprise SaaS, and healthcare organizations across India and North America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MARKETING_CASE_RESULTS.map((cr) => (
              <div
                key={cr.id}
                className="rounded-2xl p-[1.5px] bg-gradient-to-br from-purple-500/40 via-indigo-500/20 to-blue-500/40 text-left h-full flex flex-col justify-between"
              >
                <div className="rounded-[14px] bg-white dark:bg-slate-900 p-6 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {cr.clientIndustry}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {cr.region}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {cr.title}
                    </h4>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                          Challenge:{" "}
                        </strong>
                        {cr.challenge}
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                          Strategy:{" "}
                        </strong>
                        {cr.strategy}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-3 gap-2">
                      {cr.metrics.map((m, idx) => (
                        <div key={idx} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                          <div className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 font-mono">
                            {m.value}
                          </div>
                          <div className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MarTech Partners Badge Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Enterprise Platforms & Certified Partner Ecosystem
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {MARKETING_TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  ({tech.badge})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl">
          <div className="rounded-[22px] bg-white dark:bg-slate-900 p-8 sm:p-12 text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800 font-mono">
                ZERO-OBLIGATION TECHNICAL AUDIT
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 font-heading">
                Ready to Accelerate Your Enterprise Growth?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Claim a complimentary 30-minute growth diagnostic with our senior marketing architects. We'll analyze your search visibility, competitor ad strategies, and CRM funnel bottlenecks at zero cost.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenContact("Free 30-Minute Digital Marketing & SEO Audit")}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>Claim Free Digital Growth & SEO Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenContact("General Digital Marketing Consultation")}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                Schedule Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
