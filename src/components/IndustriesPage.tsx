import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Factory,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { INDUSTRIES_CATALOG } from "../data/coreenactData";
import {
  INDUSTRY_IMAGES,
  INDUSTRY_MS_APP,
  getIndustryIcon,
} from "../data/industriesMeta";
import { DynamicsIcon, MicrosoftLogo, MicrosoftAppBadge } from "./icons/MicrosoftIcons";

interface IndustriesPageProps {
  onOpenContact: () => void;
  /** Sends the visitor to the industry's own page. Omitted, cards stay tabs. */
  onOpenIndustry?: (id: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onOpenContact,
  onOpenIndustry,
}) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(INDUSTRIES_CATALOG[0].id);
  const activeIndustry =
    INDUSTRIES_CATALOG.find((ind) => ind.id === selectedIndustryId) || INDUSTRIES_CATALOG[0];

  // A card is a tab first and a page link second: without a router it can only
  // swap the spotlight below it.
  const handleCardSelect = (id: string) => {
    setSelectedIndustryId(id);
    onOpenIndustry?.(id);
  };

  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          <Factory className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
          <span>Industry Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
          Tailored ERP & AI for Your{" "}
          <span className="text-[#005a9e] dark:text-sky-400">
            Specific Operating Model
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Generic ERP templates fail because every industry operates with distinct economics, compliance mandates, and supply chain constraints. We configure Microsoft Dynamics 365 to fit your exact reality.
        </p>
      </div>

      {/* Industry Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-10">
        {INDUSTRIES_CATALOG.map((ind) => {
          const isSelected = ind.id === selectedIndustryId;
          return (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition text-center cursor-pointer border ${
                isSelected
                  ? "bg-[#005a9e] text-white border-[#005a9e] shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="w-7 h-7 rounded flex items-center justify-center">
                {getIndustryIcon(ind.iconName)}
              </div>
              <span className="text-xs font-semibold leading-tight line-clamp-1">
                {ind.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Industry Spotlight View */}
      <motion.div
        key={activeIndustry.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl mb-16 overflow-hidden"
      >
        <div className="rounded-[22px] bg-white dark:bg-slate-900 overflow-hidden">
          {/* Industry photo banner - Increased Height */}
          <div className="h-72 sm:h-96 md:h-[460px] lg:h-[500px] w-full relative overflow-hidden bg-slate-900 group">
            <img
              src={INDUSTRY_IMAGES[activeIndustry.id]}
              alt={`${activeIndustry.name} industry`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
            <div className="absolute top-5 left-5 z-10">
              <MicrosoftAppBadge app={INDUSTRY_MS_APP[activeIndustry.id] || "business-central"} size="md" />
            </div>
            <span className="absolute top-5 right-5 inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-xs">
              <MicrosoftLogo className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Built on Dynamics 365</span>
            </span>
            <div className="absolute bottom-6 left-6 sm:left-10 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/80 text-white mb-2 backdrop-blur-xs shadow-sm">
                Operational Framework
              </span>
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading drop-shadow-md">
                {activeIndustry.name}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                {getIndustryIcon(activeIndustry.iconName)}
              </div>
              <div>
                <p className="text-sm sm:text-base text-blue-700 dark:text-sky-400 font-bold mt-0.5">
                  {activeIndustry.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-right">
                <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                  {activeIndustry.resultMetric.label}
                </div>
                <div className="text-xl font-bold text-blue-700 dark:text-sky-400 font-mono">
                  {activeIndustry.resultMetric.value}
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Industry Demo</span>
              </button>
            </div>
          </div>

          {/* Contrast: Typical Industry Hurdles vs Coreenact Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Industry Hurdles */}
            <div className="p-6 sm:p-8 rounded-2xl bg-rose-50 border border-rose-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Pervasive Industry Friction</span>
              </h3>
              <ul className="space-y-3">
                {activeIndustry.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coreenact Native Solutions */}
            <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Coreenact Engineered Outcomes</span>
              </h3>
              <ul className="space-y-3">
                {activeIndustry.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Microsoft Dynamics 365 Specialized Features */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <DynamicsIcon className="w-4 h-4" />
              <span>Microsoft Dynamics 365 Pre-Configured Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeIndustry.d365Features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-center gap-2.5 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  <span className="font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Need to see how your specific business process maps to Dynamics 365?
            </div>
            <button
              onClick={onOpenContact}
              className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:text-[#004a82] dark:hover:text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Consult Architect for {activeIndustry.name} Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of All 9 Industries */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
          All Industry Specializations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_CATALOG.map((ind) => (
            <div
              key={ind.id}
              onClick={() => handleCardSelect(ind.id)}
              className={`rounded-2xl cursor-pointer transition-all duration-300 border text-left overflow-hidden group hover:shadow-lg ${
                ind.id === selectedIndustryId
                  ? "bg-slate-50 dark:bg-slate-800/80 border-blue-600 dark:border-sky-500 shadow-md ring-2 ring-blue-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {/* Industry Card Image - Increased Height to h-56 sm:h-64 */}
              <div className="h-56 sm:h-64 w-full overflow-hidden relative bg-slate-900">
                <img
                  src={INDUSTRY_IMAGES[ind.id]}
                  alt={ind.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 z-10">
                  <MicrosoftAppBadge app={INDUSTRY_MS_APP[ind.id] || "business-central"} size="sm" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-blue-700 dark:text-sky-300 shadow-xs backdrop-blur-xs">
                    {ind.resultMetric.value}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-white font-extrabold text-lg drop-shadow-sm">
                    {ind.name}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-2xs">
                  {getIndustryIcon(ind.iconName)}
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400">
                  {ind.resultMetric.value}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{ind.name}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">{ind.tagline}</p>
              <div className="text-xs font-semibold text-blue-600 dark:text-sky-400 flex items-center gap-1 group-hover:text-blue-700 transition">
                <span>
                  {onOpenIndustry
                    ? "See More: Full Industry Page"
                    : "View Full Industry Blueprint"}
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
