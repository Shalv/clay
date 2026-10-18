import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import {
  ITEM_TAGS,
  PILLAR_BANNER_IMAGES,
  PILLAR_GRADIENTS,
  SOLUTION_ITEM_IMAGES,
  SolutionItemEntry,
  getSolutionItemIcon,
} from "../data/solutionsMeta";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

interface SolutionItemDetailPageProps {
  entry: SolutionItemEntry;
  /** The other capability modules shipped inside the same pillar. */
  siblings: SolutionItemEntry[];
  onOpenContact: (interest?: string) => void;
  /** Capability pages sit under a pillar, so Back returns there. */
  onOpenPillar: (id: string) => void;
  onOpenItem: (slug: string) => void;
}

/**
 * Standalone page for one capability module of SOLUTION_PILLARS, addressed at
 * /solutions/:slug alongside the pillar pages. Content comes from the same
 * record the SolutionsGrid card renders, so a shared module never has to be
 * described twice.
 */
export const SolutionItemDetailPage: React.FC<SolutionItemDetailPageProps> = ({
  entry,
  siblings,
  onOpenContact,
  onOpenPillar,
  onOpenItem,
}) => {
  const { item, pillar, slug } = entry;
  const image = SOLUTION_ITEM_IMAGES[item.name] || PILLAR_BANNER_IMAGES[pillar.id];
  const tag = ITEM_TAGS[item.name] || pillar.badge;
  const gradient = PILLAR_GRADIENTS[pillar.id] || PILLAR_GRADIENTS["run-transform"];
  const interest = `${item.name} — ${pillar.title}`;

  return (
    <div className="py-12 sm:py-16 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Return rail: the parent pillar stays one click away. */}
      <div className="mb-8">
        <button
          onClick={() => onOpenPillar(pillar.id)}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#005a9e] dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          <span>Back to {pillar.title}</span>
        </button>
      </div>

      <motion.div
        key={slug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-900">
          {image && (
            <img
              src={image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs">
            <MicrosoftLogo className="w-3.5 h-3.5" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Microsoft Cloud
            </span>
          </span>
          <span
            className={`absolute top-4 right-4 inline-flex items-center gap-2 bg-gradient-to-r ${gradient} px-3 py-1.5 rounded-full shadow-md`}
          >
            <span className="text-xs font-bold text-white">{tag}</span>
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
            <p className="text-xs sm:text-sm font-semibold text-sky-200 mb-2 uppercase tracking-wider">
              {pillar.title}
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
              {item.name}
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="w-11 h-11 rounded-xl bg-[#005a9e]/10 dark:bg-sky-500/10 border border-[#005a9e]/20 dark:border-sky-500/25 flex items-center justify-center text-[#005a9e] dark:text-sky-400 shrink-0">
                {getSolutionItemIcon(item.name)}
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenContact(interest)}
                className="px-5 py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Walkthrough</span>
              </button>
              <button
                onClick={() => onOpenContact(interest)}
                className="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer w-full sm:w-auto"
              >
                Discuss Architecture
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              What {item.name} Covers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {item.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pillar rail: the modules delivered alongside this one. */}
      <div className="mt-14 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
            More Inside the {pillar.title} Pillar
          </h2>
          <button
            onClick={() => onOpenPillar(pillar.id)}
            className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>See the full {pillar.title} page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {siblings.map((other) => (
            <button
              key={other.slug}
              onClick={() => onOpenItem(other.slug)}
              className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#005a9e] dark:text-sky-400 shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-sky-500/10 transition">
                  {getSolutionItemIcon(other.item.name)}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {ITEM_TAGS[other.item.name] || pillar.badge}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                {other.item.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {other.item.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
