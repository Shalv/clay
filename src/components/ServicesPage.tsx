import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Award,
} from "lucide-react";
import { SERVICES_CATALOG } from "../data/coreenactData";
import { SERVICE_MS_APP, getServiceIcon } from "../data/solutionsMeta";
import { ServiceItem } from "../types";
import { MicrosoftAppBadge, MicrosoftLogo } from "./icons/MicrosoftIcons";

interface ServicesPageProps {
  onOpenContact: () => void;
  onNavigateDigitalMarketing?: () => void;
  /** Routes to /services/:slug. Falls back to the inline tab view when absent. */
  onOpenService?: (id: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenContact,
  onNavigateDigitalMarketing,
  onOpenService,
}) => {
  const coreErpServices = SERVICES_CATALOG.filter(
    (s) => s.id !== "digital-marketing"
  );
  const [activeServiceId, setActiveServiceId] = useState<string>(
    coreErpServices[0].id
  );
  const activeService =
    coreErpServices.find((s) => s.id === activeServiceId) || coreErpServices[0];

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === "digital-marketing" && onNavigateDigitalMarketing) {
      onNavigateDigitalMarketing();
      return;
    }
    setActiveServiceId(serviceId);
  };

  /**
   * The quick-access grid means a dedicated page now, so it navigates. Digital
   * Marketing is the one practice that predates /services/:slug and keeps its own
   * address, and without a router wired in the card still switches the tab view.
   */
  const openPracticePage = (svc: ServiceItem) => {
    if (svc.id === "digital-marketing" || !onOpenService) {
      handleServiceSelect(svc.id);
      return;
    }
    onOpenService(svc.id);
  };

  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
          <span>Coreenact Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
          Enterprise Services for the{" "}
          <span className="text-[#005a9e] dark:text-sky-400">
            Microsoft Cloud
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          From turnkey Microsoft Dynamics 365 Business Central implementations and legacy NAV migrations to 24/7 SLA managed care and India statutory compliance, we provide full-lifecycle enterprise engineering.
        </p>
      </div>

      {/* Services Nav Pill Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {SERVICES_CATALOG.map((svc) => {
          const isSelected = svc.id === activeServiceId;
          const isDigitalMarketing = svc.id === "digital-marketing";
          return (
            <button
              key={svc.id}
              onClick={() => handleServiceSelect(svc.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[#005a9e] text-white shadow-xs"
                  : isDigitalMarketing
                    ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {getServiceIcon(svc.iconName, "w-4 h-4")}
              <span>{svc.title}</span>
              {isDigitalMarketing && (
                <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Service Showcase Card */}
      <motion.div
        key={activeService.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-16 overflow-hidden"
      >
        <div>
          {/* Product-style Hero Image for the Active Service */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] overflow-hidden bg-slate-900">
            <img
              src={activeService.image}
              alt={activeService.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            <div className="absolute top-4 right-4 z-10">
              <MicrosoftAppBadge app={SERVICE_MS_APP[activeService.id] || "business-central"} size="md" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold bg-white dark:bg-slate-900 text-[#005a9e] dark:text-sky-400 mb-2.5 shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>{activeService.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white font-heading">
                {activeService.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-[#005a9e] dark:text-sky-400 font-semibold">
                {activeService.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Scoping Session</span>
              </button>
              <button
                onClick={onOpenContact}
                className="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer w-full sm:w-auto"
              >
                Inquire About Service
              </button>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            {activeService.description}
          </p>

          {/* Three Column Breakdown: Phases, Deliverables, Value Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* 1. Methodological Phases */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#005a9e] dark:bg-sky-400" />
                <span>Phased Execution Lifecycle</span>
              </h3>
              <ul className="space-y-3">
                {activeService.phases.map((phase, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>{phase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Key Deliverables */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                <span>Verified Deliverables</span>
              </h3>
              <ul className="space-y-3">
                {activeService.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Business Impact & Benefits */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <span>Strategic Business Value</span>
              </h3>
              <ul className="space-y-3">
                {activeService.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Ready to assess your project scope?
                </div>
                <button
                  onClick={onOpenContact}
                  className="mt-2 text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:text-[#004a82] dark:hover:text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Request Scoping Workshop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of All Services for Quick Access */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 font-heading">
          Explore All Coreenact Service Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATALOG.map((svc) => {
            const isDigitalMarketing = svc.id === "digital-marketing";
            return (
              <div
                key={svc.id}
                onClick={() => openPracticePage(svc)}
                className={`rounded-2xl cursor-pointer transition-all duration-200 border text-left overflow-hidden flex flex-col ${
                  svc.id === activeServiceId
                    ? "bg-blue-50/50 dark:bg-slate-800 border-blue-400 shadow-md"
                    : isDigitalMarketing
                      ? "bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/50 border-indigo-300 dark:border-indigo-800 hover:border-indigo-500 hover:shadow-md"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:shadow-xs"
                }`}
              >
                {/* Product-style thumbnail image */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden shrink-0">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                    {getServiceIcon(svc.iconName)}
                  </div>
                  <div className="absolute top-3 right-3">
                    <MicrosoftAppBadge app={SERVICE_MS_APP[svc.id] || "business-central"} size="sm" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col grow">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{svc.title}</h4>
                    {isDigitalMarketing && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                        Dedicated Page
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">{svc.subtitle}</p>
                  <div className="text-xs font-bold text-blue-600 dark:text-sky-400 flex items-center gap-1 mt-auto">
                    <span>
                      {isDigitalMarketing
                        ? "Open Dedicated Digital Marketing Page"
                        : onOpenService
                          ? "Open Dedicated Practice Page"
                          : "View Full Practice Scope"}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
