import React from "react";
import {
  Briefcase,
  CloudLightning,
  ShieldCheck,
  Globe2,
  FileCheck,
  Lock,
  Headphones,
  TrendingUp,
  Layers,
} from "lucide-react";
import {
  BusinessCentralIcon,
  DynamicsIcon,
  CopilotIcon,
  PowerAppsIcon,
  PowerAutomateIcon,
  PowerBIIcon,
  FabricIcon,
  AzureIcon,
  EntraIcon,
  ExcelIcon,
  TeamsIcon,
  MicrosoftLogo,
} from "../components/icons/MicrosoftIcons";
import agenticAiImg from "../assets/images/agentic_ai_orchestration_1790754514111.jpg";
import dynamicsCoreImg from "../assets/images/dynamics_365_core_erp_1790754528919.jpg";
import aiProductivityImg from "../assets/images/ai_productivity_copilot_1790754545049.jpg";
import { SOLUTION_PILLARS } from "./coreenactData";

/**
 * Presentation metadata for the solution pillars, shared by the SolutionsGrid
 * cards and the per-pillar pages under /solutions/:slug. These tables used to
 * live privately inside SolutionsGrid.tsx; a second page that wanted the same
 * banner image or tag had to duplicate all five maps, so they live here once.
 */
export type SolutionPillar = (typeof SOLUTION_PILLARS)[number];
export type SolutionPillarItem = SolutionPillar["items"][number];

export const PILLAR_BANNER_IMAGES: Record<string, string> = {
  "run-transform": dynamicsCoreImg,
  "data-ai-insights": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80",
  "scale-localize": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=80",
  "secure-govern": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  "ai-productivity": aiProductivityImg,
  "edcore-solution": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
};

export const PILLAR_GRADIENTS: Record<string, string> = {
  "run-transform": "from-blue-600 via-indigo-600 to-cyan-500",
  "data-ai-insights": "from-purple-600 via-pink-600 to-indigo-600",
  "scale-localize": "from-emerald-500 via-teal-500 to-cyan-500",
  "secure-govern": "from-amber-500 via-orange-500 to-red-500",
  "ai-productivity": "from-cyan-500 via-blue-600 to-indigo-600",
  "edcore-solution": "from-rose-600 via-red-600 to-amber-500",
};

export const SOLUTION_ITEM_IMAGES: Record<string, string> = {
  // Run & Transform (Microsoft Dynamics 365 Core)
  "Dynamics 365 Business Central": dynamicsCoreImg,
  "Dynamics 365 Finance & Operations": "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=800&q=80",
  "Dynamics 365 CRM": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  "AI Agent in ERP": agenticAiImg,
  "AI-OCR Document Recognition": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
  "Power Apps & Power Automate": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",

  // Data, AI & Insights
  "Power BI Executive Dashboards": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80",
  "Jet Reports for Business Central": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "Microsoft Fabric & OneLake": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "Data & AI Advisory": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",

  // Scale & Localize
  "Global ERP Rollouts": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  "India Localization & Statutory Compliance": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
  "NAV to Cloud Migration": "https://images.unsplash.com/photo-1619410283995-43d9134e7656?auto=format&fit=crop&w=800&q=80",

  // Secure & Govern
  "Security & Role Governance (RBAC)": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
  "ERP Audit & Health Check": "https://images.unsplash.com/photo-1573166364366-3f4f8b1857ea?auto=format&fit=crop&w=800&q=80",
  "24/7 Managed Services & Support": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",

  // AI & Productivity (Agentic AI)
  "Microsoft Copilot for Business Central": aiProductivityImg,
  "Custom Agentic AI Solutions": agenticAiImg,
  "Digital Transformation Advisory": "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",

  // EdCore
  "Student Lifecycle & Admissions": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  "Automated Fee & Financial Accounting": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  "Academic Planning & Timetable Engine": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  "Integrated LMS & Student Portal": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
};

export const ITEM_TAGS: Record<string, string> = {
  "Dynamics 365 Business Central": "Cloud ERP",
  "Dynamics 365 Finance & Operations": "Enterprise Supply Chain",
  "Dynamics 365 CRM": "Customer Engagement",
  "AI Agent in ERP": "Autonomous Agents",
  "AI-OCR Document Recognition": "Deep-Learning OCR",
  "Power Apps & Power Automate": "Low-Code Apps",
  "Power BI Executive Dashboards": "Executive Telemetry",
  "Jet Reports for Business Central": "Financial Modeling",
  "Microsoft Fabric & OneLake": "Unified Lakehouse",
  "Data & AI Advisory": "Enterprise Governance",
  "Global ERP Rollouts": "Multi-Entity Core",
  "India Localization & Statutory Compliance": "NIC GST & e-Invoice",
  "NAV to Cloud Migration": "C/AL to AL Refactoring",
  "Security & Role Governance (RBAC)": "Entra ID & SoD",
  "ERP Audit & Health Check": "Architectural Diagnostics",
  "24/7 Managed Services & Support": "SLA Operations Desk",
  "Microsoft Copilot for Business Central": "Generative Copilot",
  "Custom Agentic AI Solutions": "Multi-Agent Orchestration",
  "Digital Transformation Advisory": "Executive Roadmap",
  "Student Lifecycle & Admissions": "Admissions & Registry",
  "Automated Fee & Financial Accounting": "Bank Payment Gateways",
  "Academic Planning & Timetable Engine": "Conflict-Free Engine",
  "Integrated LMS & Student Portal": "Self-Service LMS",
};

/** Helper to render authentic, best-in-class Microsoft product icons for each solution item */
export const getSolutionItemIcon = (name: string) => {
  if (name.includes("Business Central") || name.includes("NAV")) {
    return <BusinessCentralIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Dynamics") || name.includes("CRM") || name.includes("ERP")) {
    return <DynamicsIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Copilot") || name.includes("AI Agent") || name.includes("Agentic")) {
    return <CopilotIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Power Apps")) {
    return <PowerAppsIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Power Automate")) {
    return <PowerAutomateIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Power BI")) {
    return <PowerBIIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Fabric") || name.includes("OneLake")) {
    return <FabricIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Azure") || name.includes("Synapse") || name.includes("Cloud")) {
    return <AzureIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Security") || name.includes("Governance") || name.includes("RBAC")) {
    return <EntraIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("Jet Reports") || name.includes("Accounting") || name.includes("Financial")) {
    return <ExcelIcon className="w-4 h-4 shrink-0" />;
  }
  if (name.includes("LMS") || name.includes("Student") || name.includes("Academic")) {
    return <TeamsIcon className="w-4 h-4 shrink-0" />;
  }
  return <MicrosoftLogo className="w-4 h-4 shrink-0" />;
};

/** Which Microsoft co-brand badge each service practice carries. */
export const SERVICE_MS_APP: Record<
  string,
  "business-central" | "azure" | "partner" | "teams" | "power-bi"
> = {
  "erp-consulting": "business-central",
  "nav-migration": "azure",
  "erp-audit": "partner",
  "global-rollouts": "teams",
  "india-localization": "business-central",
  "security-governance": "azure",
  "managed-services": "partner",
  "digital-marketing": "power-bi",
};

/** Lucide icon for a service's iconName field, shared by the list and detail pages. */
export const getServiceIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case "Briefcase":
      return <Briefcase className={className} />;
    case "CloudLightning":
      return <CloudLightning className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Globe2":
      return <Globe2 className={className} />;
    case "FileCheck":
      return <FileCheck className={className} />;
    case "Lock":
      return <Lock className={className} />;
    case "Headphones":
      return <Headphones className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    default:
      return <Layers className={className} />;
  }
};

/**
 * URL slug for a capability item. The catalogue gives items a name and nothing
 * else, so the slug is derived once here and shared by the card link and the
 * /solutions/:slug lookup instead of being recomputed in two places.
 */
export const solutionItemSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface SolutionItemEntry {
  slug: string;
  item: SolutionPillarItem;
  pillar: SolutionPillar;
}

/** Capability items flattened out of their pillars, each with its parent. */
export const SOLUTION_ITEMS: SolutionItemEntry[] = SOLUTION_PILLARS.flatMap(
  (pillar) => pillar.items.map((item) => ({ slug: solutionItemSlug(item.name), item, pillar }))
);

export const findSolutionItem = (slug: string): SolutionItemEntry | null =>
  SOLUTION_ITEMS.find((entry) => entry.slug === slug) ?? null;
