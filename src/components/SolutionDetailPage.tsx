import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";
import {
  SolutionPillar,
  PILLAR_BANNER_IMAGES,
  PILLAR_GRADIENTS,
  SOLUTION_ITEM_IMAGES,
  ITEM_TAGS,
  getSolutionItemIcon,
  solutionItemSlug,
} from "../data/solutionsMeta";

interface SolutionDetailPageProps {
  pillar: SolutionPillar;
  /** The remaining pillars, so a deep link still reaches the whole catalogue. */
  siblings: SolutionPillar[];
  onOpenContact: (interest?: string) => void;
  onBack: () => void;
  onOpenSolution: (id: string) => void;
  /** Routes from a pillar page down to one of its capability modules. */
  onOpenItem?: (slug: string) => void;
}

/**
 * Standalone page for one entry of SOLUTION_PILLARS, addressed at
 * /solutions/:slug. The banner, capability cards and tags all come from the
 * shared metadata that SolutionsGrid renders, so a pillar looks identical
 * whether it is seen in the list or deep linked.
 */
export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({
  pillar,
  siblings,
  onOpenContact,
  onBack,
  onOpenSolution,
  onOpenItem,
}) => {
  const interest = `${pillar.title}: ${pillar.subtitle}`;
  const bannerImage = PILLAR_BANNER_IMAGES[pillar.id] || PILLAR_BANNER_IMAGES["run-transform"];
  const gradient = PILLAR_GRADIENTS[pillar.id] || PILLAR_GRADIENTS["run-transform"];

  return (
    <div className="py-12 sm:py-16 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Return rail: the catalog stays one click away. */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#005a9e] dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          <span>All Solutions</span>
        </button>
      </div>

      {/* Hero panel */}
      <motion.div
        key={pillar.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] overflow-hidden bg-slate-900">
          <img
            src={bannerImage}
            alt={`${pillar.title} enterprise solution`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
          <div className="absolute top-5 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 shadow-sm backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{pillar.badge}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-xs">
              <MicrosoftLogo className="w-4 h-4" />
              <span className="hidden sm:inline">Microsoft Dynamics 365 Core</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight drop-shadow-md">
              {pillar.title}
            </h1>
            <p className="mt-3 text-sky-300 font-semibold text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed drop-shadow-sm">
              {pillar.subtitle}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${gradient}`} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              {pillar.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenContact(interest)}
                className="px-5 py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Discovery Call</span>
              </button>
              <button
                onClick={() => onOpenContact(interest)}
                className="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer w-full sm:w-auto"
              >
                Consult Architect
              </button>
            </div>
          </div>

          {/* Capability modules — same card anatomy as the grid on /solutions */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Capability Modules
            </h2>
            <div
              className={`grid gap-5 ${
                pillar.items.length === 4
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {pillar.items.map((item) => {
                const itemImg =
                  SOLUTION_ITEM_IMAGES[item.name] ||
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                const tag = ITEM_TAGS[item.name] || pillar.badge;

                return (
                  <div
                    key={item.name}
                    className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group text-left"
                  >
                    <div className="h-40 w-full overflow-hidden relative bg-slate-900">
                      <img
                        src={itemImg}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 shadow-xs backdrop-blur-xs flex items-center gap-1.5">
                          {getSolutionItemIcon(item.name)}
                          <span>{tag}</span>
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug drop-shadow-sm">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3.5 flex-1 flex flex-col">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                      <ul className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                        {item.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 pt-0 space-y-2.5">
                      {onOpenItem && (
                        <button
                          onClick={() => onOpenItem(solutionItemSlug(item.name))}
                          className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer group/more shadow-xs"
                        >
                          <span className="truncate">See More</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/more:translate-x-1 transition-transform shrink-0" />
                        </button>
                      )}
                      <button
                        onClick={() => onOpenContact(`${pillar.title} - ${item.name}`)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-sky-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                      >
                        <span className="truncate">Discuss Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Catalogue rail keeps every pillar reachable from a deep link. */}
      <div className="mt-14 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
            Other Coreenact Solution Pillars
          </h2>
          <button
            onClick={onBack}
            className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View the full solutions catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {siblings.map((other) => (
            <button
              key={other.id}
              onClick={() => onOpenSolution(other.id)}
              className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                    PILLAR_GRADIENTS[other.id] || PILLAR_GRADIENTS["run-transform"]
                  } flex items-center justify-center text-white shrink-0`}
                >
                  <MicrosoftLogo className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {other.badge}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                {other.title}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {other.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
