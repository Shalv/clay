import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Bot,
  ScanText,
  ShieldCheck,
  Headphones,
  Globe2,
  Building2,
  GraduationCap,
  FileCheck,
  Laptop,
  Cpu,
} from "lucide-react";
import { SOLUTION_PILLARS } from "../data/coreenactData";
// Only MicrosoftLogo is used directly here now; the product-icon dispatcher
// that needed the rest moved to data/solutionsMeta with the other shared tables.
import { MicrosoftLogo } from "./icons/MicrosoftIcons";
import {
  PILLAR_BANNER_IMAGES,
  PILLAR_GRADIENTS,
  SOLUTION_ITEM_IMAGES,
  ITEM_TAGS,
  getSolutionItemIcon,
  solutionItemSlug,
} from "../data/solutionsMeta";

interface SolutionsGridProps {
  onSelectSolution: (solutionTitle: string) => void;
  onOpenContact: () => void;
  /** Routes to /solutions/:slug for a whole pillar. */
  onOpenPillar?: (id: string) => void;
  /** Routes to /solutions/:slug for one capability item. */
  onOpenItem?: (slug: string) => void;
}

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({
  onSelectSolution,
  onOpenContact,
  onOpenPillar,
  onOpenItem,
}) => {
  const [activePillarId, setActivePillarId] = useState<string>("all");

  const currentPillars =
    activePillarId === "all"
      ? SOLUTION_PILLARS
      : SOLUTION_PILLARS.filter((p) => p.id === activePillarId);

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden text-left border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-sky-300 text-xs font-bold tracking-normal shadow-2xs">
            <MicrosoftLogo className="w-3.5 h-3.5" />
            <span>Microsoft Dynamics 365 Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Enterprise Solutions for the{" "}
            <span className="text-blue-700 dark:text-sky-400">
              Intelligent Digital Core
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Structured around Microsoft Dynamics 365 Business Central, Power Platform, Azure AI, and proprietary platforms like EdCore. We convert enterprise complexity into connected, automated execution.
          </p>
        </div>

        {/* Pillars Nav Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <button
            onClick={() => setActivePillarId("all")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activePillarId === "all"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            }`}
          >
            All Solutions + EdCore
          </button>
          {/* "Run & Transform" is no longer offered as its own filter chip. It is
              still part of the data and keeps rendering under
              "All Solutions + EdCore". */}
          {SOLUTION_PILLARS.filter((pillar) => pillar.id !== "run-transform").map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillarId(pillar.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activePillarId === pillar.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {pillar.title}
            </button>
          ))}
        </div>

        {/* Pillars Showcase with Images */}
        <div className="space-y-16">
          {currentPillars.map((pillar) => {
            const bannerImage = PILLAR_BANNER_IMAGES[pillar.id] || PILLAR_BANNER_IMAGES["run-transform"];
            const isFourCards = pillar.items.length === 4;

            return (
              <div
                key={pillar.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden"
              >
                {/* Pillar Hero Banner with Increased Height */}
                <div className="h-64 sm:h-80 md:h-[380px] w-full relative overflow-hidden bg-slate-900 group">
                  <img
                    src={bannerImage}
                    alt={`${pillar.title} enterprise solution`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                    {/* Top Badges */}
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

                    {/* Bottom Overlay Content */}
                    <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8">
                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading drop-shadow-md mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sky-300 font-semibold text-sm sm:text-base md:text-lg max-w-3xl mb-4 drop-shadow-sm">
                        {pillar.subtitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() =>
                            onSelectSolution(`${pillar.title}: ${pillar.subtitle}`)
                          }
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                        >
                          <span>Consult Architect</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={onOpenContact}
                          className="px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                        >
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>Schedule Discovery Call</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pillar Body Content */}
                  <div className="p-6 sm:p-10 space-y-8">
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Mobile swipe hint for single-line 4-card pillars */}
                    {isFourCards && (
                      <div className="flex lg:hidden items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400">
                        <span>
                          {pillar.id === "edcore-solution"
                            ? "Swipe horizontally to view all 4 institutional modules in a single line →"
                            : "Swipe horizontally to view all 4 capability modules in a single line →"}
                        </span>
                      </div>
                    )}

                    {/* Capability Item Cards Grid with Images */}
                    <div
                      className={
                        isFourCards
                          ? "flex lg:grid overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-4 xl:gap-5 snap-x snap-mandatory lg:grid-cols-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
                          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      }
                    >
                      {pillar.items.map((item, itemIdx) => {
                        const itemImg =
                          SOLUTION_ITEM_IMAGES[item.name] ||
                          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                        const tag = ITEM_TAGS[item.name] || pillar.badge;
                        const isEdCore = pillar.id === "edcore-solution";

                        return (
                          <div
                            key={itemIdx}
                            className={`rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group text-left ${
                              isFourCards
                                ? "w-[80vw] sm:w-[290px] lg:w-auto shrink-0 lg:shrink snap-center"
                                : ""
                            }`}
                          >
                            <div>
                              {/* Card Image Thumbnail */}
                              <div
                                className={`${
                                  isFourCards ? "h-36 sm:h-40 xl:h-44" : "h-48 sm:h-52"
                                } w-full overflow-hidden relative bg-slate-900`}
                              >
                                <img
                                  src={itemImg}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                                <div className="absolute top-3 left-3">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/20 shadow-xs">
                                    <MicrosoftLogo className="w-3 h-3" />
                                    <span>Microsoft Cloud</span>
                                  </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 shadow-xs backdrop-blur-xs flex items-center gap-1.5">
                                    {getSolutionItemIcon(item.name)}
                                    <span>{tag}</span>
                                  </span>
                                </div>
                                <div className="absolute bottom-3 left-4 right-4">
                                  <h4
                                    className={`text-white font-extrabold ${
                                      isFourCards ? "text-sm sm:text-base" : "text-sm sm:text-base xl:text-lg"
                                    } drop-shadow-sm leading-snug`}
                                  >
                                    {item.name}
                                  </h4>
                                </div>
                              </div>

                              {/* Card Body */}
                              <div
                                className={`${
                                  isFourCards ? "p-4 sm:p-4.5 xl:p-5" : "p-5 sm:p-6"
                                } space-y-3.5 sm:space-y-4`}
                              >
                                <p
                                  className={`text-xs ${
                                    isFourCards ? "sm:text-xs xl:text-sm" : "sm:text-sm"
                                  } text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3`}
                                >
                                  {item.description}
                                </p>

                                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                                  {item.features.map((feat, fIdx) => (
                                    <div
                                      key={fIdx}
                                      className={`flex items-center gap-2 ${
                                        isFourCards ? "text-xs" : "text-xs sm:text-sm"
                                      } text-slate-700 dark:text-slate-300 font-medium`}
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                      <span className="truncate">{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`${
                                isFourCards ? "p-4 sm:p-4.5 xl:p-5" : "p-5 sm:p-6"
                              } pt-0 space-y-2.5`}
                            >
                              {/* Each module is a page of its own, so the card
                                  offers the way onto it before the pitch. */}
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
                                onClick={() =>
                                  onSelectSolution(`${pillar.title} - ${item.name}`)
                                }
                                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-sky-300 hover:text-blue-800 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                              >
                                <span className="truncate">
                                  {isEdCore
                                    ? "Discuss EdCore"
                                    : "Discuss Architecture"}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Every pillar is a dedicated page at /solutions/:slug. */}
                    {onOpenPillar && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => onOpenPillar(pillar.id)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold transition cursor-pointer group/pillar"
                        >
                          <span>View the full {pillar.title} page</span>
                          <ArrowRight className="w-4 h-4 group-hover/pillar:translate-x-1 transition-transform shrink-0" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Banner with Authentic Indian Solution Architect */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-[#0c192c] p-8 sm:p-10 text-white shadow-xl overflow-hidden text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white text-slate-900 border-2 border-blue-400/40 flex items-center justify-center p-3 shadow-lg">
                <MicrosoftLogo className="w-12 h-12" />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow-sm">
                Solutions Partner
              </span>
            </div>
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <MicrosoftLogo className="w-3.5 h-3.5" />
                <span>Accredited Microsoft Solutions Partner Practice</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Need a Custom Dynamics 365 Architecture Blueprint?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our Microsoft Certified Solution Architects in New Delhi and Mississauga conduct technical discovery, assess legacy ERP gaps, and structure an outcome-driven milestone delivery plan.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-lg flex items-center gap-2 shrink-0 transition cursor-pointer hover:scale-[1.02]"
          >
            <span>Schedule Architecture Review</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

