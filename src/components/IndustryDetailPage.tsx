import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { IndustryItem } from "../types";
import {
  INDUSTRY_IMAGES,
  INDUSTRY_MS_APP,
  getIndustryIcon,
} from "../data/industriesMeta";
import { DynamicsIcon, MicrosoftLogo, MicrosoftAppBadge } from "./icons/MicrosoftIcons";

interface IndustryDetailPageProps {
  industry: IndustryItem;
  /** Every other sector, so a deep link still reaches the rest of the catalog. */
  siblings: IndustryItem[];
  onOpenContact: (interest?: string) => void;
  onBack: () => void;
  onOpenIndustry: (id: string) => void;
}

/**
 * Standalone page for one entry of INDUSTRIES_CATALOG, addressed at
 * /industries/:slug. It reproduces the spotlight block from IndustriesPage from
 * the same record, so the tab view and the deep link cannot drift apart.
 */
export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({
  industry,
  siblings,
  onOpenContact,
  onBack,
  onOpenIndustry,
}) => {
  const interest = `${industry.name} industry solutions`;

  return (
    <div className="py-12 sm:py-16 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Return rail: the catalog stays one click away. */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#005a9e] dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          <span>All Industries</span>
        </button>
      </div>

      <motion.div
        key={industry.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl overflow-hidden"
      >
        <div className="rounded-[22px] bg-white dark:bg-slate-900 overflow-hidden">
          {/* Banner */}
          <div className="h-64 sm:h-80 md:h-[420px] w-full relative overflow-hidden bg-slate-900 group">
            <img
              src={INDUSTRY_IMAGES[industry.id]}
              alt={`${industry.name} industry`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
            <div className="absolute top-5 left-5 z-10">
              <MicrosoftAppBadge
                app={INDUSTRY_MS_APP[industry.id] || "business-central"}
                size="md"
              />
            </div>
            <span className="absolute top-5 right-5 inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-xs">
              <MicrosoftLogo className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Built on Dynamics 365
              </span>
            </span>
            <div className="absolute bottom-6 left-6 sm:left-10 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/80 text-white mb-2 backdrop-blur-xs shadow-sm">
                Operational Framework
              </span>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading drop-shadow-md tracking-tight">
                {industry.name}
              </h1>
              <p className="mt-2 text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                {industry.tagline}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  {getIndustryIcon(industry.iconName)}
                </div>
                <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                  {industry.resultMetric.label}
                  <div className="text-xl font-bold text-blue-700 dark:text-sky-400 font-mono normal-case tracking-normal">
                    {industry.resultMetric.value}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenContact(interest)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Industry Demo</span>
              </button>
            </div>

            {/* Friction versus engineered outcome, the same pairing as the tab view */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-rose-50 border border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/60 space-y-4">
                <h2 className="text-xs sm:text-sm font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Pervasive Industry Friction</span>
                </h2>
                <ul className="space-y-3">
                  {industry.challenges.map((challenge, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 dark:text-rose-100/90 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200 dark:bg-sky-500/10 dark:border-sky-900/60 space-y-4">
                <h2 className="text-xs sm:text-sm font-bold text-blue-900 dark:text-sky-200 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span>Coreenact Engineered Outcomes</span>
                </h2>
                <ul className="space-y-3">
                  {industry.solutions.map((solution, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0 mt-2" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <DynamicsIcon className="w-4 h-4" />
                <span>Microsoft Dynamics 365 Pre-Configured Capabilities</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {industry.d365Features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2.5 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                    <span className="font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Need to see how your specific business process maps to Dynamics 365?
              </div>
              <button
                onClick={() => onOpenContact(interest)}
                className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:text-[#004a82] dark:hover:text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Consult Architect for {industry.name} Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sector rail keeps every other industry reachable from a deep link. */}
      <div className="mt-14 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
            Other Industry Specializations
          </h2>
          <button
            onClick={onBack}
            className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View the full industries catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {siblings.map((other) => (
            <button
              key={other.id}
              onClick={() => onOpenIndustry(other.id)}
              className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#005a9e] dark:text-sky-400 shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-sky-500/10 transition">
                  {getIndustryIcon(other.iconName)}
                </span>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400">
                  {other.resultMetric.value}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                {other.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {other.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
