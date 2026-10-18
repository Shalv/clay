import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { SOLUTIONS as TECH_SOLUTIONS } from "../data/solutionsData";
import { MicrosoftLogo, TechIcon } from "./icons/MicrosoftIcons";

interface TechStackShowcaseProps {
  onOpenContact: () => void;
}

export const TechStackShowcase: React.FC<TechStackShowcaseProps> = ({
  onOpenContact,
}) => {
  const [activeId, setActiveId] = useState<string>(TECH_SOLUTIONS[0].id);
  const active = TECH_SOLUTIONS.find((s) => s.id === activeId) || TECH_SOLUTIONS[0];

  return (
    <section
      id="tech-stack"
      className="py-20 bg-slate-50/60 dark:bg-[#0b0f19] border-t border-slate-200/80 dark:border-slate-800 text-left relative overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
            <span>Microsoft Cloud Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Enterprise Architecture &{" "}
            <span className="text-[#005a9e] dark:text-sky-400">
              Technology Stack
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Certified Microsoft Dynamics 365, Azure Cloud, and Power Platform components engineered for high-availability enterprise scale.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {TECH_SOLUTIONS.map((sol) => (
            <button
              key={sol.id}
              onClick={() => setActiveId(sol.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeId === sol.id
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 shadow-2xs"
              }`}
            >
              {sol.badge}
            </button>
          ))}
        </div>

        {/* Active solution detail panel - Nested Gradient-Bordered Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-w-6xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left: description + capabilities */}
                <div className="lg:col-span-3 space-y-5">
                  <div>
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-900 mb-3 shadow-2xs">
                      {active.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                      {active.title}
                    </h3>
                    <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                      {active.tagline}
                    </p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {active.description}
                  </p>
                  <ul className="space-y-2.5">
                    {active.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-sky-400 hover:text-indigo-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      <span>Discuss this stack with an enterprise architect</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: real Microsoft product icon grid + metric */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-blue-500/30 via-indigo-500/25 to-purple-500/30">
                    <div className="p-5 rounded-[14px] bg-gradient-to-br from-slate-50 to-white dark:from-slate-850 dark:to-slate-900">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                        <MicrosoftLogo className="w-3.5 h-3.5" />
                        <span>Microsoft Ecosystem Components</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {active.microsoftStack.map((tech) => (
                          <div
                            key={tech}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs"
                          >
                            <TechIcon label={tech} className="w-5 h-5 shrink-0" />
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Verified metric box: Nested Gradient Border */}
                  <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-blue-500/40">
                    <div className="p-4 rounded-[14px] bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-white dark:from-slate-850 dark:to-slate-900 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black font-mono bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                          {active.metrics.value}
                        </div>
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                          {active.metrics.label}
                        </div>
                      </div>
                      <button
                        onClick={onOpenContact}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Assess Fit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
