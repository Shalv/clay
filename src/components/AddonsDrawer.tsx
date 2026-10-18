import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { AddonsListCard } from "./AddonsListCard";
import { AddonItem } from "../data/addonsData";

interface AddonsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddon: (addon: AddonItem) => void;
  onOpenConsultation: (addonName?: string) => void;
}

export const AddonsDrawer: React.FC<AddonsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectAddon,
  onOpenConsultation,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg h-full bg-[#050917] text-white shadow-2xl z-10 flex flex-col border-l border-blue-900/40 overflow-hidden"
          >
            {/* Top Close Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#070d22]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-500 inline-block shadow-xs shadow-blue-500/50" />
                <span className="text-sm font-bold tracking-wide uppercase font-heading text-white">
                  Add-on Suite
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-900/60 text-sky-300 border border-blue-700/50 ml-1">
                  9 Modules
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Close Add-ons Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <AddonsListCard
                className="border-none shadow-none p-2 sm:p-2 bg-transparent"
                onSelectAddon={(addon) => {
                  onClose();
                  onSelectAddon(addon);
                }}
                onOpenConsultation={(addonName) => {
                  onClose();
                  onOpenConsultation(addonName);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
