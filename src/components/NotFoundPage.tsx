import React from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { PageType } from "../types";
import { PAGE_TITLES } from "../routes";

type NotFoundPageProps = {
  pathname: string;
  onNavigate: (page: PageType) => void;
};

/** Links to the destinations that actually exist as routes. */
const SUGGESTIONS: { page: PageType; label: string; desc: string }[] = [
  { page: "services", label: "Services", desc: "Full-lifecycle Business Central delivery" },
  { page: "industries", label: "Industries", desc: "Sector blueprints and modules" },
  { page: "ai-agents", label: "AI & Agents", desc: "Copilot 101, Copilot Studio, ERP agents" },
  { page: "resources", label: "Resources", desc: "Docs, release waves and guides" },
  { page: "contact", label: "Contact", desc: "Talk to a solutions architect" },
];

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ pathname, onNavigate }) => (
  <section className="py-20 sm:py-28">
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400">
            404 · no route matches
          </span>
        </div>

        <h1 className="mt-5 font-medium text-slate-900 dark:text-slate-50 tracking-[-0.035em] leading-[1.15] text-[clamp(1.9rem,5.6vw,3.5rem)]">
          That address isn&apos;t part of the site
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          <code className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded break-all">
            {pathname}
          </code>{" "}
          isn&apos;t a route here. Everything on the site lives under one of the paths below, so
          pick a destination and you&apos;ll be moved straight there.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <Compass className="w-4 h-4" />
            {Object.keys(PAGE_TITLES).length} routes available
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUGGESTIONS.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="text-left p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/60 dark:hover:border-sky-400/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                {item.label}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {item.desc}
              </div>
              <div className="mt-3 font-mono text-xs text-slate-400 dark:text-slate-600">
                /{item.page === "home" ? "" : item.page}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
