import React from "react";
import { motion } from "motion/react";
import { MapPin, Building, Compass } from "lucide-react";
import { GLOBAL_OFFICES } from "../data/solutionsData";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

const OFFICE_IMAGES: Record<string, string> = {
  Haryana:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=75",
  "New Delhi":
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=75",
  "Mississauga / Toronto":
    "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=75",
};

interface GlobalHubsProps {
  onGroundLocation: (cityName: string) => void;
  onOpenContact: () => void;
}

export const GlobalHubs: React.FC<GlobalHubsProps> = ({
  onGroundLocation,
  onOpenContact,
}) => {
  return (
    <section id="maps" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden text-left">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
            <MicrosoftLogo className="w-3.5 h-3.5" />
            <span>Global Microsoft Delivery Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Worldwide Delivery Centers &{" "}
            <span className="text-[#005a9e] dark:text-sky-400">
              Microsoft Cloud Hubs
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Dedicated enterprise delivery centers in Haryana, India and Mississauga, Canada providing 24/7 Microsoft Dynamics 365 Business Central engineering and consulting.
          </p>
        </div>

        {/* Global Hubs Grid (New Delhi & Mississauga) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {GLOBAL_OFFICES.map((office, idx) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between text-left group"
            >
              <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={OFFICE_IMAGES[office.city]}
                  alt={`${office.city} delivery center`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 px-2.5 py-1 rounded-md shadow-xs">
                  <MicrosoftLogo className="w-3.5 h-3.5" />
                </span>
                <span className="absolute bottom-3 left-4 text-white font-bold text-lg">
                  {office.city}
                </span>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                      <Building className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                      {office.country}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {office.city}
                    </h3>
                    <div className="text-sm text-slate-600 flex items-start gap-2 mt-2 leading-relaxed">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Practice Center:
                    </div>
                    <div className="text-sm text-blue-700 font-semibold">
                      {office.specialty}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onGroundLocation(office.city)}
                    className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:text-[#004a82] dark:hover:text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>View Location</span>
                  </button>
                  <span className="text-xs font-mono text-slate-400">
                    {office.coords.lat.toFixed(2)}°, {office.coords.lng.toFixed(2)}°
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
