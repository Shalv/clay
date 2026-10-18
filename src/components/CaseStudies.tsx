import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  ArrowRight,
  Building2,
} from "lucide-react";
import { CASE_STUDIES } from "../data/solutionsData";
import { MicrosoftLogo, TechIcon, MicrosoftAppBadge } from "./icons/MicrosoftIcons";

const CASE_IMAGES: Record<string, string> = {
  "logistics-global":
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
  "medtech-retail":
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
  "fintech-enterprise":
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80",
};

const CASE_TECH_BADGES: Record<string, Array<"business-central" | "copilot" | "power-bi" | "azure" | "power-automate" | "dataverse">> = {
  "logistics-global": ["business-central", "copilot", "power-bi"],
  "medtech-retail": ["business-central", "azure", "power-automate"],
  "fintech-enterprise": ["business-central", "copilot", "dataverse"],
};

interface CaseStudiesProps {
  onOpenContact: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  onOpenContact,
}) => {
  const [selectedCase, setSelectedCase] = useState<string>(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCase) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden text-left">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
            <span>Enterprise Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Industry Vertical{" "}
            <span className="text-[#005a9e] dark:text-sky-400">
              Success Stories
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            See how mid-market and enterprise organizations replaced obsolete legacy software with Microsoft Dynamics 365, Azure Cloud, and automated workflows to drive verified business value.
          </p>
        </div>

        {/* Vertical Selection Selector Bar - Vibrant Gradient Active State */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CASE_STUDIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedCase === c.id
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <Building2 className={`w-4 h-4 ${selectedCase === c.id ? "text-white" : "text-blue-600 dark:text-sky-400"}`} />
              <span>{c.industry}</span>
            </button>
          ))}
        </div>

        {/* Highlighted Case Card */}
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden text-left"
        >
          {/* Industry photo header */}
          <div className="h-56 sm:h-72 w-full relative overflow-hidden bg-slate-900">
              <img
                src={CASE_IMAGES[activeCase.id]}
                alt={`${activeCase.industry} case study - Indian delivery team`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-blue-600 dark:text-sky-400 mb-2 shadow-md">
                    <Building2 className="w-3.5 h-3.5" />
                    {activeCase.industry}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white font-heading max-w-2xl drop-shadow-sm">
                    {activeCase.headline}
                  </h3>
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 px-3.5 py-1.5 rounded-full shadow-md shrink-0">
                  <MicrosoftLogo className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Delivered on Microsoft Dynamics 365</span>
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Delivery Partner: Coreenact Microsoft Dynamics 365 Practice
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {(CASE_TECH_BADGES[activeCase.id] ?? ["business-central"]).map((app) => (
                      <MicrosoftAppBadge key={app} app={app} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Quick Consultation Shortcut */}
                <button
                  onClick={onOpenContact}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <span>Discuss Vertical with Architect</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Challenge & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenge card */}
                <div className="p-6 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-slate-850 space-y-3 h-full">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    The Legacy Challenge
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {activeCase.challenge}
                  </p>
                </div>

                {/* Solution card */}
                <div className="p-6 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-slate-850 space-y-3 h-full">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-blue-800 dark:text-sky-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-sky-400" />
                    Coreenact Architecture & Solution
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {activeCase.solution}
                  </p>
                </div>
              </div>

              {/* Outcome & Stats Strip */}
              <div className="p-6 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-slate-850 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Business Transformation Outcome
                    </div>
                    <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                      {activeCase.outcome}
                    </p>
                  </div>

                  {/* Metric counters */}
                  <div className="flex items-center gap-4 shrink-0">
                    {activeCase.stats.map((stat, i) => (
                      <div key={i} className="text-center px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-xs">
                        <div className="text-2xl font-black font-mono text-blue-600 dark:text-sky-400">
                          {stat.value}
                        </div>
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Ready for similar transformative enterprise results with Dynamics 365?
                </span>
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <span>Speak with an Industry Practice Lead</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
