import React, { useEffect, useMemo } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  COPILOT_RELATED_STORIES,
  COPILOT_TOPIC_DETAILS,
} from "../data/copilotTopics";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";
import { NotFoundPage } from "./NotFoundPage";

interface CopilotTopicPageProps {
  /**
   * Resolved here rather than in App: the Copilot catalogue is a large block of
   * prose, and looking it up in App would pull it into the main bundle that
   * every visitor downloads, including the ones who never reach AI & Agents.
   */
  topicId: string;
  onOpenContact: (interest?: string) => void;
  onBack: () => void;
  onOpenTopic: (id: string) => void;
}

const ALL_TOPICS = [...COPILOT_TOPIC_DETAILS, ...COPILOT_RELATED_STORIES];

/**
 * Standalone page for one Copilot / AI agent topic, addressed at
 * /ai-agents/:id. The AI & Agents list page shows this same record inside a
 * modal; the page exists so a card can also be shared as a URL, and reads from
 * the identical data set so the two views stay word-for-word consistent.
 */
export const CopilotTopicPage: React.FC<CopilotTopicPageProps> = ({
  topicId,
  onOpenContact,
  onBack,
  onOpenTopic,
}) => {
  const topic = ALL_TOPICS.find((entry) => entry.id === topicId) ?? null;
  const related = useMemo(
    () =>
      topic
        ? ALL_TOPICS.filter(
            (entry) => entry.category === topic.category && entry.id !== topic.id
          ).slice(0, 6)
        : [],
    [topic]
  );

  // App leaves the tab title alone on this route so it does not have to know
  // the catalogue; whoever has the record owns the title.
  useEffect(() => {
    if (topic) document.title = `${topic.title} | Coreenact`;
  }, [topic]);

  if (!topic) {
    return (
      <div className="py-4">
        <NotFoundPage pathname={window.location.pathname} onNavigate={onBack} />
      </div>
    );
  }

  const interest = `${topic.appTitle || topic.badge}: ${topic.title}`;

  return (
    <div className="py-12 sm:py-16 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Return rail: the list page stays one click away. */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#005a9e] dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          <span>All AI &amp; Agents Topics</span>
        </button>
      </div>

      <motion.div
        key={topic.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-900">
          <img
            src={topic.imageUrl}
            alt={topic.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs">
            <MicrosoftLogo className="w-3.5 h-3.5" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {topic.badge}
            </span>
          </span>
          {topic.appTitle && (
            <span className="absolute top-4 right-4 inline-flex items-center gap-2 bg-sky-500/90 px-3 py-1.5 rounded-full shadow-md">
              <Bot className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-bold text-white">{topic.appTitle}</span>
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
            <p className="text-xs sm:text-sm font-semibold text-sky-200 mb-2 uppercase tracking-wider">
              {topic.tagline}
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
              {topic.title}
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
              {topic.subtitle}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
              {topic.summary}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenContact(interest)}
                className="px-5 py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an AI Readiness Call</span>
              </button>
              <button
                onClick={() => onOpenContact(interest)}
                className="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer w-full sm:w-auto"
              >
                Ask an Architect
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#005a9e] dark:text-sky-400" />
                <span>Key Capabilities</span>
              </h2>
              <ul className="space-y-3">
                {topic.keyCapabilities.map((capability, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#005a9e] dark:text-sky-400" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>How It Works</span>
              </h2>
              <ol className="space-y-3">
                {topic.howItWorks.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {topic.complianceNote && (
            <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                  Data Governance &amp; Trust
                </div>
                <p className="text-xs sm:text-sm text-emerald-950/80 dark:text-emerald-100/80 mt-1 leading-relaxed">
                  {topic.complianceNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {related.length > 0 && (
        <div className="mt-14 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Related {topic.badge} Topics
            </h2>
            <button
              onClick={onBack}
              className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Browse every topic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((other) => (
              <button
                key={other.id}
                onClick={() => onOpenTopic(other.id)}
                className="text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group overflow-hidden"
              >
                <div className="h-28 w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={other.imageUrl}
                    alt={other.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    {other.appTitle || other.badge}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition line-clamp-2">
                    {other.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {other.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
