import React from "react";
import { AddonItem, ADDONS_LIST } from "../data/addonsData";
import {
  Users,
  UserCheck,
  Building2,
  QrCode,
  PenTool,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Receipt,
  ArrowRight,
  ChevronRight,
  Layers,
} from "lucide-react";
import { BusinessCentralIcon, MicrosoftLogo } from "./icons/MicrosoftIcons";

interface AddonsListCardProps {
  onSelectAddon?: (addon: AddonItem) => void;
  onOpenConsultation?: (addonName?: string) => void;
  className?: string;
}

export const AddonsListCard: React.FC<AddonsListCardProps> = ({
  onSelectAddon,
  onOpenConsultation,
  className = "",
}) => {
  const getAddonIcon = (id: string) => {
    switch (id) {
      case "vendor-customer-portal":
        return <Users className="w-4 h-4 text-sky-400" />;
      case "hrms-portal":
        return <UserCheck className="w-4 h-4 text-emerald-400" />;
      case "visitor-management-app":
        return <Building2 className="w-4 h-4 text-cyan-400" />;
      case "qr-bar-code":
        return <QrCode className="w-4 h-4 text-amber-400" />;
      case "signing-pad-handwritten":
        return <PenTool className="w-4 h-4 text-purple-400" />;
      case "in-app-approval-system":
        return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
      case "whatsapp-shopify-integration":
        return <MessageSquare className="w-4 h-4 text-teal-400" />;
      case "digital-class-3-2-signature":
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
      case "e-invoices-eway-bills":
        return <Receipt className="w-4 h-4 text-rose-400" />;
      default:
        return <Layers className="w-4 h-4 text-blue-400" />;
    }
  };

  const getAddonBadge = (id: string) => {
    switch (id) {
      case "vendor-customer-portal":
        return "Self-Service Web Portals";
      case "hrms-portal":
        return "Payroll & Attendance";
      case "visitor-management-app":
        return "Digital Gate Passes";
      case "qr-bar-code":
        return "GS1 Scanning & Labels";
      case "signing-pad-handwritten":
        return "Signature on POD";
      case "in-app-approval-system":
        return "Multi-Tier Approval Matrix";
      case "whatsapp-shopify-integration":
        return "Shopify & WhatsApp Sync";
      case "digital-class-3-2-signature":
        return "PKI DSC PDF Signing";
      case "e-invoices-eway-bills":
        return "IRN & GST E-way Bills";
      default:
        return "BC Extension";
    }
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden ${className}`}
      id="coreenact-addons-list-card"
    >
      {/* Header Bar */}
      <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BusinessCentralIcon className="w-5 h-5 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <span>Dynamics 365 Business Central Add-ons</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Plug & play enterprise AL extensions for Microsoft D365 BC
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
          <MicrosoftLogo className="w-3 h-3" />
          <span>9 Modules</span>
        </span>
      </div>

      {/* Grid of Addons (2-columns on sm, 1-col on mobile) */}
      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[65vh] sm:max-h-[500px] overflow-y-auto">
        {ADDONS_LIST.map((addon) => (
          <button
            key={addon.id}
            onClick={() => {
              if (onSelectAddon) {
                onSelectAddon(addon);
              } else if (onOpenConsultation) {
                onOpenConsultation(addon.name);
              }
            }}
            className="group w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition flex items-start gap-2.5 cursor-pointer shadow-2xs"
            title={`View details for ${addon.name}`}
          >
            {/* Module Icon Tile */}
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 transition-colors mt-0.5">
              {getAddonIcon(addon.id)}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition-colors truncate">
                  {addon.name}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <BusinessCentralIcon className="w-2.5 h-2.5 shrink-0" />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {getAddonBadge(addon.id)} • BC Extension
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Action Footer */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
          Tailored for Indian GST, E-Invoicing & Supply Chain
        </span>
        <button
          onClick={() => onOpenConsultation?.("Enterprise Add-on Suite")}
          className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Request Add-on Demo</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
