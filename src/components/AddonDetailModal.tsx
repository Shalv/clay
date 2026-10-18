import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ArrowRight, Layers, ShieldCheck, Zap } from "lucide-react";
import { AddonItem } from "../data/addonsData";

interface AddonDetailModalProps {
  addon: AddonItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (addonName: string) => void;
}

export const AddonDetailModal: React.FC<AddonDetailModalProps> = ({
  addon,
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  if (!addon) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 border border-slate-200 dark:border-slate-800 shadow-xl z-10 text-left"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#005a9e] inline-block shrink-0" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#005a9e] dark:text-sky-400">
                  {addon.category}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                {addon.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#005a9e] dark:text-sky-400 font-medium mt-1 leading-relaxed">
                {addon.tagline}
              </p>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {addon.description}
            </div>

            {/* Benefits */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Key Value & Capabilities</span>
              </div>
              <ul className="space-y-2">
                {addon.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BC Integration */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <Layers className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-100 font-semibold">Business Central Compatibility: </strong>
                {addon.bcIntegration}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation(addon.name);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request {addon.name} Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
