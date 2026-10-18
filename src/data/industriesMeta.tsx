/**
 * Presentation metadata for INDUSTRIES_CATALOG.
 *
 * The list page (/industries) and every detail page (/industries/:id) render
 * the same banners and Microsoft product badges, so the mapping lives here
 * rather than inside one of the two components.
 */
import React from "react";
import {
  Factory,
  GraduationCap,
  ShoppingBag,
  Zap,
  Briefcase,
  HardHat,
  Ship,
  Stethoscope,
  Truck,
  Layers,
} from "lucide-react";

export const INDUSTRY_IMAGES: Record<string, string> = {
  manufacturing: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=75",
  fmcg: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=75",
  retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=75",
  education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=75",
  "professional-services": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=75",
  construction: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=75",
  "maritime-logistics": "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=75",
  healthcare: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=75",
  distribution: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
};

export const INDUSTRY_MS_APP: Record<
  string,
  "business-central" | "power-bi" | "copilot" | "teams" | "power-apps" | "azure" | "dataverse" | "power-automate"
> = {
  manufacturing: "business-central",
  fmcg: "power-bi",
  retail: "business-central",
  education: "business-central",
  "professional-services": "teams",
  construction: "power-apps",
  "maritime-logistics": "azure",
  healthcare: "dataverse",
  distribution: "power-automate",
};

/** Industry catalogue icons are stored by name, so resolve them in one place. */
export const getIndustryIcon = (iconName: string) => {
  switch (iconName) {
    case "Factory":
      return <Factory className="w-5 h-5" />;
    case "GraduationCap":
      return <GraduationCap className="w-5 h-5" />;
    case "ShoppingBag":
      return <ShoppingBag className="w-5 h-5" />;
    case "Zap":
      return <Zap className="w-5 h-5" />;
    case "Briefcase":
      return <Briefcase className="w-5 h-5" />;
    case "HardHat":
      return <HardHat className="w-5 h-5" />;
    case "Ship":
      return <Ship className="w-5 h-5" />;
    case "Stethoscope":
      return <Stethoscope className="w-5 h-5" />;
    case "Truck":
      return <Truck className="w-5 h-5" />;
    default:
      return <Layers className="w-5 h-5" />;
  }
};
