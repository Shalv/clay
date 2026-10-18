import React, { useState } from "react";
import {
  Move,
  BarChart3,
  FileCheck2,
  Database,
  Bot,
  TrendingUp,
  Code2,
  Search,
  ArrowRight,
} from "lucide-react";

interface MorePossibilitiesSectionProps {
  onOpenContact?: (interest?: string) => void;
}

export const MorePossibilitiesSection: React.FC<MorePossibilitiesSectionProps> = ({
  onOpenContact,
}) => {
  const [activeDraggableWidgets, setActiveDraggableWidgets] = useState<string[]>([
    "gl-revenue",
    "gst-irn",
    "inventory",
    "copilot-alert",
  ]);
  const [chatInput, setChatInput] = useState("Show unposted vendor invoices > ₹5 Lakh");
  const [chatResponse, setChatResponse] = useState<string | null>(
    "Found 3 unposted invoices totaling ₹18,40,000 for Apex Logistics. 2 have matching POs ready to post."
  );

  const toggleWidget = (id: string) => {
    setActiveDraggableWidgets((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="more-possibilities"
      className="relative bg-white dark:bg-[#0b0f19] py-20 border-t border-slate-200/80 dark:border-slate-800 text-left overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider font-mono">
            <span>Modular Enterprise Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            More possibilities. Always your control.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Design Intelligence helps you move faster without giving up authorship. Preview every result, refine it through conversation, or customize it directly with hands-on tools.
          </p>
        </div>

        {/* Bento Grid: 5 Core Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Block 1: Drag-and-drop workspace (Large 7 Columns) */}
          <div className="md:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 group hover:border-blue-400/60 dark:hover:border-sky-400/60 transition-all duration-300 shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-sky-400 flex items-center justify-center">
                <Move className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Drag-and-drop workspace
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Use the modern workspace editor to drag, drop, resize, and arrange enterprise telemetry, chart of accounts, and inventory modules across desktop, tablet, and mobile.
              </p>
            </div>

            {/* Interactive Workspace Mini Canvas */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-mono">Live Workspace Canvas</span>
                <span>Click to toggle modules</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div
                  onClick={() => toggleWidget("gl-revenue")}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                    activeDraggableWidgets.includes("gl-revenue")
                      ? "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-sky-300"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  <span>General Ledger & Cash Flow</span>
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>

                <div
                  onClick={() => toggleWidget("gst-irn")}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                    activeDraggableWidgets.includes("gst-irn")
                      ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  <span>India GST & IRN Status</span>
                  <FileCheck2 className="w-3.5 h-3.5" />
                </div>

                <div
                  onClick={() => toggleWidget("inventory")}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                    activeDraggableWidgets.includes("inventory")
                      ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  <span>Warehouse Inventory Scan</span>
                  <Database className="w-3.5 h-3.5" />
                </div>

                <div
                  onClick={() => toggleWidget("copilot-alert")}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                    activeDraggableWidgets.includes("copilot-alert")
                      ? "bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  <span>Copilot Anomaly Alert</span>
                  <Bot className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: AI assistant in context (5 Columns) */}
          <div className="md:col-span-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 group hover:border-blue-400/60 dark:hover:border-sky-400/60 transition-all duration-300 shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                AI assistant in context
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Get answers and execute changes with an AI assistant that understands your exact chart of accounts, tenant data, and statutory rules.
              </p>
            </div>

            {/* Chat Simulator */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-sky-200 font-medium">
                {chatInput}
              </div>
              {chatResponse && (
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 leading-relaxed">
                  ⚡ {chatResponse}
                </div>
              )}
              <div className="flex gap-1.5 pt-1">
                <button
                  onClick={() => {
                    setChatInput("Check GST return mismatch for Q2");
                    setChatResponse("GSTR-2B vs Purchase Register comparison: 0 mismatches found across 840 invoices.");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                >
                  Check GST mismatch
                </button>
                <button
                  onClick={() => {
                    setChatInput("Bank recon status for HDFC");
                    setChatResponse("HDFC Current Account reconciled to 100%. 14 pending cheques cleared.");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                >
                  HDFC Recon
                </button>
              </div>
            </div>
          </div>

          {/* Block 3: Transform data with AI Studio (4 Columns) */}
          <div className="md:col-span-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 flex flex-col justify-between space-y-5 group hover:border-blue-400/60 dark:hover:border-sky-400/60 transition shadow-sm">
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Create intelligence with AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Turn millions of transactional ledger rows into predictive insights, automated bank rec recaps, and board-ready visual dashboards with Azure Fabric.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Process Throughput</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">+142%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[88%]" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Manual Ledger: 14 hrs</span>
                <span>Copilot Studio: 18 mins</span>
              </div>
            </div>
          </div>

          {/* Block 4: Custom Extensions with AI (4 Columns) */}
          <div className="md:col-span-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 flex flex-col justify-between space-y-5 group hover:border-blue-400/60 dark:hover:border-sky-400/60 transition shadow-sm">
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Create site & system sections with AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Describe a custom section, AL extension, or portal integration and automated AI scaffolding structures it to fit existing tenant schemas.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800 space-y-1">
              <div className="text-emerald-400">// AI Scaffolded Extension</div>
              <div>pageextension 50100 CustExt</div>
              <div className="text-slate-500">{"{ layout { addlast(...) } }"}</div>
            </div>
          </div>

          {/* Block 5: Search & AI visibility (4 Columns) */}
          <div className="md:col-span-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 flex flex-col justify-between space-y-5 group hover:border-blue-400/60 dark:hover:border-sky-400/60 transition shadow-sm">
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Search & AI visibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Build complete audit compliance and enterprise discoverability. Track where transactions appear in automated workflows and statutory reports.
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Audit Trail: Immutable</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">IRN Sync Latency: 16ms</span>
                <span className="text-emerald-600 font-bold">Optimal</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar before footer */}
        {onOpenContact && (
          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Ready to elevate your Microsoft Dynamics 365 footprint?
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Talk to certified Microsoft Solutions Practice Leads in New Delhi NCR & Canada.
              </div>
            </div>
            <button
              onClick={() => onOpenContact("General Enterprise Consultation")}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MorePossibilitiesSection;
