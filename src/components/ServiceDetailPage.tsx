import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Award, Calendar, CheckCircle2 } from "lucide-react";
import { ServiceItem } from "../types";
import { SERVICE_MS_APP, getServiceIcon } from "../data/solutionsMeta";
import { MicrosoftAppBadge } from "./icons/MicrosoftIcons";

interface ServiceDetailPageProps {
  service: ServiceItem;
  /** Every other practice, so the page can offer its own catalogue rail. */
  siblings: ServiceItem[];
  onOpenContact: (interest?: string) => void;
  onBack: () => void;
  onOpenService: (id: string) => void;
}

/**
 * Standalone page for one entry of SERVICES_CATALOG, addressed at
 * /services/:slug. Sections and styling mirror the inline card on ServicesPage
 * so a deep link and the tab view read as the same practice, and everything is
 * derived from the catalogue record rather than duplicated text.
 */
export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  siblings,
  onOpenContact,
  onBack,
  onOpenService,
}) => {
  const interest = `${service.title} — ${service.subtitle}`;

  return (
    <div className="py-12 sm:py-16 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Return rail: the catalog stays one click away. */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#005a9e] dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          <span>All Services</span>
        </button>
      </div>

      {/* Hero panel */}
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] overflow-hidden bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute top-4 right-4 z-10">
            <MicrosoftAppBadge
              app={SERVICE_MS_APP[service.id] || "business-central"}
              size="md"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold bg-white dark:bg-slate-900 text-[#005a9e] dark:text-sky-400 mb-3 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
              {service.subtitle}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="w-11 h-11 rounded-xl bg-[#005a9e]/10 dark:bg-sky-500/10 border border-[#005a9e]/20 dark:border-sky-500/25 flex items-center justify-center text-[#005a9e] dark:text-sky-400 shrink-0">
                {getServiceIcon(service.iconName)}
              </div>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenContact(interest)}
                className="px-5 py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Scoping Session</span>
              </button>
              <button
                onClick={() => onOpenContact(interest)}
                className="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer w-full sm:w-auto"
              >
                Inquire About Service
              </button>
            </div>
          </div>

          {/* Three-column breakdown, same order and accents as the tab card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DetailColumn
              dotClass="bg-[#005a9e] dark:bg-sky-400"
              iconClass="text-[#005a9e] dark:text-sky-400"
              heading="Phased Execution Lifecycle"
              entries={service.phases}
              as="list"
            />
            <DetailColumn
              dotClass="bg-indigo-600 dark:bg-indigo-400"
              iconClass="text-indigo-600 dark:text-indigo-400"
              heading="Verified Deliverables"
              entries={service.deliverables}
              as="list"
            />
            <DetailColumn
              dotClass="bg-emerald-600 dark:bg-emerald-400"
              iconClass="text-emerald-600 dark:text-emerald-400"
              heading="Strategic Business Value"
              entries={service.benefits}
              as="dots"
            />
          </div>
        </div>
      </motion.div>

      {/* Catalogue rail keeps every practice reachable from a deep link. */}
      <div className="mt-14 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
            Other Coreenact Service Practices
          </h2>
          <button
            onClick={onBack}
            className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View the full services catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {siblings.map((svc) => (
            <button
              key={svc.id}
              onClick={() => onOpenService(svc.id)}
              className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#005a9e] dark:text-sky-400 shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-sky-500/10 transition">
                  {getServiceIcon(svc.iconName, "w-4 h-4")}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {svc.badge}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                {svc.title}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {svc.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DetailColumnProps {
  heading: string;
  entries: string[];
  dotClass: string;
  iconClass: string;
  /** "list" checks every row off; "dots" reads as outcome bullets. */
  as: "list" | "dots";
}

const DetailColumn: React.FC<DetailColumnProps> = ({
  heading,
  entries,
  dotClass,
  iconClass,
  as,
}) => (
  <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      <span>{heading}</span>
    </h3>
    <ul className="space-y-3">
      {entries.map((entry, idx) => (
        <li
          key={idx}
          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
        >
          {as === "list" ? (
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${iconClass}`} />
          ) : (
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${iconClass.replace("text-", "bg-")}`} />
          )}
          <span>{entry}</span>
        </li>
      ))}
    </ul>
  </div>
);
