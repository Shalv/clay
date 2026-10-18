import React from "react";
import {
  Building,
  CheckCircle2,
  Globe2,
  Compass,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Award,
  Layers,
} from "lucide-react";
import { ABOUT_COREENACT, COREENACT_CONTACT } from "../data/coreenactData";
import { MicrosoftLogo, TechIcon, MicrosoftAppBadge } from "./icons/MicrosoftIcons";
import enterpriseTeamImg from "../assets/images/indian_enterprise_team_1790050320734.jpg";
import chiefArchitectImg from "../assets/images/lead_architect_portrait_1790047813689.jpg";
import advisoryLeadImg from "../assets/images/indian_advisory_lead_1790050344886.jpg";

interface AboutPageProps {
  onOpenContact: () => void;
  onGroundLocation: (cityName: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenContact,
  onGroundLocation,
}) => {
  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          <Building className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
          <span>About Coreenact Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
          Engineered for Enterprise{" "}
          <span className="text-[#005a9e] dark:text-sky-400">
            Certainty & Velocity
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Coreenact is an enterprise consulting and digital engineering firm specializing in Microsoft Dynamics 365 Business Central, cloud transformations, and automated business workflows.
        </p>
      </div>

      {/* Hero Image Strip - Nested Gradient Border */}
      <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 max-w-5xl mx-auto shadow-2xl shadow-blue-500/15">
        <div className="relative rounded-[22px] overflow-hidden max-w-5xl mx-auto h-72 sm:h-96 group">
          <img
            src={enterpriseTeamImg}
            alt="Coreenact Microsoft enterprise consulting team in modern executive center"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-white text-base sm:text-lg font-bold drop-shadow-sm">
              Certified Indian Architects • Global Multi-Entity Delivery • Real Microsoft Technology
            </span>
            <span className="inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 px-3.5 py-1.5 rounded-full shadow-md">
              <MicrosoftLogo className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Solutions Partner</span>
            </span>
          </div>
        </div>
      </div>

      {/* Core Company Story & Pillars */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-10 space-y-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#005a9e] dark:text-sky-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
              The Coreenact Foundation
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ERP consulting, Microsoft Business Central, & Enterprise Automation
            </p>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {ABOUT_COREENACT.story}
        </p>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {ABOUT_COREENACT.pillars.map((pil, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5"
            >
              <div className="flex items-center gap-2 text-[#005a9e] dark:text-sky-400 text-base font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>{pil.title}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pil.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Phase Implementation Methodology */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Our 5-Phase Delivery Framework
          </h2>
          <p className="text-sm text-slate-600">
            A battle-tested agile methodology designed to prevent scope creep, ensure data integrity, and guarantee on-time cutover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ABOUT_COREENACT.methodology.map((m) => (
            <div
              key={m.phase}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition-colors mb-2">
                  {m.phase}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {m.description}
                </p>
              </div>
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#005a9e] dark:bg-sky-400 w-2/3 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Leadership & Enterprise Architects */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span>Engineering Leadership</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Enterprise Practice Leaders & Architects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Every Coreenact engagement is personally guided by certified Microsoft Solution Architects with over a decade of deep ERP engineering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Architect Card 1: Nested Gradient Bordered */}
          <div className="rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between h-full">
              {/* Photo & Header */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={chiefArchitectImg}
                  alt="Lead Solutions Architect - Coreenact Indian Dynamics 365 Practice"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <MicrosoftAppBadge app="business-central" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-blue-900 shadow-md">
                    Chief Architect
                  </span>
                  <span className="text-xs font-semibold text-sky-200">
                    15+ Years NAV & Business Central
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    Lead Solutions Architect
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Microsoft Certified: Dynamics 365 Solutions Architect Expert</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    Specialized in large-scale legacy NAV-to-BC database refactoring, multi-entity financial structures, and India GST compliance engines.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 20+ Global Go-Lives
                  </span>
                  <button
                    onClick={onOpenContact}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Architect Card 2: Nested Gradient Bordered */}
          <div className="rounded-3xl p-[2px] bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 shadow-xl">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between h-full">
              {/* Photo & Header */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={advisoryLeadImg}
                  alt="Principal Advisory Consultant - Coreenact Indian ERP Practice"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <MicrosoftAppBadge app="copilot" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-purple-900 shadow-md">
                    Principal Advisory
                  </span>
                  <span className="text-xs font-semibold text-purple-200">
                    Cloud ERP & AI Copilot Integration
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    Principal Advisory Consultant
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Microsoft Certified: Power Platform & Dynamics 365 Functional Lead</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    Directs manufacturing shop-floor automation, automated supply chain forecasting, and Microsoft Copilot workflows in Business Central.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% On-Time Delivery
                  </span>
                  <button
                    onClick={onOpenContact}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Microsoft Credentials & Global Footprint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Microsoft Credentials Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <MicrosoftLogo className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Microsoft Solutions Partner
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Validated partner competencies across Business Applications & Cloud
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <TechIcon label="Dynamics 365" className="w-5 h-5" />
                <span>Dynamics 365</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Business Central & Finance & Supply Chain certified architects
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <TechIcon label="Power Apps" className="w-5 h-5" />
                <span>Power Platform</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Power Apps, Power Automate RPA, and Power BI enterprise reporting
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <TechIcon label="Azure" className="w-5 h-5" />
                <span>Azure AI & Cloud</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Azure infrastructure, Copilot Studio, and secure cloud hosting
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <TechIcon label="Entra" className="w-5 h-5" />
                <span>Security & Trust</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Microsoft Entra ID, Purview, and zero-trust identity governance
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <span>Connect with our Principal Architect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Hubs Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#005a9e] dark:text-sky-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Global Delivery Footprint
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Offices in Haryana, India and Mississauga, Canada
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {COREENACT_CONTACT.offices.map((office) => (
              <div
                key={office.id}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden space-y-2.5 group"
              >
                <div className="h-24 w-full overflow-hidden relative">
                  <img
                    src={
                      office.id === "india" || office.city.toLowerCase().includes("haryana")
                        ? "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=70"
                        : "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=900&q=70"
                    }
                    alt={`${office.city} enterprise office`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                </div>
                <div className="px-5 space-y-2.5 pb-5">
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#005a9e] dark:text-sky-400" />
                    <span>
                      {office.city}, {office.country}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                    {office.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{office.address}</p>
                <div className="pt-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {office.timing}
                  </span>
                  <button
                    onClick={() => onGroundLocation(office.city)}
                    className="text-[#005a9e] dark:text-sky-400 hover:text-[#004a82] dark:hover:text-sky-300 font-bold flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>View Location</span>
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-400 pt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <span>Primary Contact:</span>
              <a
                href={`mailto:${COREENACT_CONTACT.email}`}
                className="text-[#005a9e] dark:text-sky-400 hover:underline font-mono font-bold"
              >
                {COREENACT_CONTACT.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>Phone:</span>
              <a
                href={`tel:+91${COREENACT_CONTACT.phoneRaw}`}
                className="text-[#005a9e] dark:text-sky-400 hover:underline font-mono font-bold"
              >
                {COREENACT_CONTACT.phone}
              </a>
            </div>
            <a
              href={COREENACT_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold text-xs hover:bg-emerald-100 transition"
            >
              <span>WhatsApp ({COREENACT_CONTACT.phoneRaw})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
