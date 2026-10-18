import React from "react";

/**
 * The official Microsoft "four-square" logo (in use since 2012).
 * Colors match Microsoft's published brand palette exactly:
 * #F25022 (red), #7FBA00 (green), #00A4EF (blue), #FFB900 (yellow).
 * This is the real Microsoft mark — used across the site anywhere
 * Coreenact needs to visually substantiate its "Microsoft Partner" claim.
 */
export const MicrosoftLogo: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    viewBox="0 0 23 23"
    className={className}
    aria-label="Microsoft"
    role="img"
  >
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

/** Logo + "Microsoft" wordmark, for use in badges / partner strips. */
export const MicrosoftWordmark: React.FC<{
  className?: string;
  textClassName?: string;
}> = ({ className = "w-5 h-5", textClassName = "text-slate-800 dark:text-white" }) => (
  <span className="inline-flex items-center gap-2">
    <MicrosoftLogo className={className} />
    <span className={`font-semibold tracking-tight ${textClassName}`} style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}>
      Microsoft
    </span>
  </span>
);

/**
 * A pill-style "Official Microsoft Partner" credential badge, built around
 * the real Microsoft mark so it reads as an authentic partner credential
 * rather than a generic icon.
 */
export const MicrosoftPartnerBadge: React.FC<{ className?: string; compact?: boolean }> = ({
  className = "",
  compact = false,
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 shadow-xs ${
      compact ? "px-2 py-1" : "px-3 py-1.5"
    } ${className}`}
  >
    <MicrosoftLogo className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
    <span className={`font-bold text-slate-800 ${compact ? "text-[10px]" : "text-xs"}`}>
      Solutions Partner
    </span>
  </span>
);

/* ------------------------------------------------------------------ */
/*  Real Microsoft product marks (brand-accurate colors & silhouettes) */
/* ------------------------------------------------------------------ */

export const AzureIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Azure" role="img">
    <defs>
      <linearGradient id="azureGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5EA0EF" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
    </defs>
    <path d="M11.4 3.5H19l-8.3 24.4-8.2-2.1z" fill="url(#azureGrad)" />
    <path d="M11.4 3.5 3.5 25.8h6.7l4.4-13.2 6.6 16.9-11.4-.1h20.7L18.1 3.5z" fill="#0078D4" opacity="0.9" />
    <path d="M20.9 20.4 11.4 3.5h4.3l14.8 24.9H21.7z" fill="#83B9F9" opacity="0.85" />
  </svg>
);

export const PowerBIIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Power BI" role="img">
    <rect x="4" y="14" width="6" height="14" rx="1" fill="#F2C811" />
    <rect x="13" y="8" width="6" height="20" rx="1" fill="#F2C811" opacity="0.85" />
    <rect x="22" y="2" width="6" height="26" rx="1" fill="#F2C811" opacity="0.65" />
  </svg>
);

export const DynamicsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Dynamics 365" role="img" fill="none">
    <defs>
      <linearGradient id="d365Grad1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00A4EF" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
      <linearGradient id="d365Grad2" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0078D4" />
        <stop offset="100%" stopColor="#004E8C" />
      </linearGradient>
    </defs>
    <path
      d="M5 5.5h10l-4.5 10H5V5.5z"
      fill="url(#d365Grad1)"
    />
    <path
      d="M10.5 15.5h11l-5.5 12H5l5.5-12z"
      fill="url(#d365Grad2)"
    />
    <path
      d="M16 5.5h11v10h-6.5L16 5.5z"
      fill="url(#d365Grad1)"
    />
    <path
      d="M21.5 15.5H27V27.5h-11l5.5-12z"
      fill="url(#d365Grad2)"
    />
  </svg>
);

export const TeamsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Teams" role="img">
    <rect x="2" y="9" width="18" height="18" rx="3" fill="#5059C9" />
    <circle cx="24.5" cy="10" r="4" fill="#7B83EB" />
    <path d="M18 9h9a3 3 0 0 1 3 3v6.5a5.5 5.5 0 0 1-9.9 3.3" fill="none" stroke="#7B83EB" strokeWidth="0" />
    <path d="M18 9h9.5A2.5 2.5 0 0 1 30 11.5v5.9a5.4 5.4 0 0 1-9.7 3.3L18 18.6Z" fill="#7B83EB" />
    <rect x="6" y="14" width="10" height="2" fill="#fff" />
    <rect x="9.5" y="14" width="3" height="9" fill="#fff" />
  </svg>
);

export const CopilotIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-label="Microsoft Copilot" role="img" fill="none">
    <defs>
      <linearGradient id="copilotRibbonBlue" x1="2" y1="3" x2="16" y2="17" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00A4EF" />
        <stop offset="50%" stopColor="#0078D4" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="copilotRibbonWarm" x1="8" y1="7" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFB900" />
        <stop offset="35%" stopColor="#F25022" />
        <stop offset="70%" stopColor="#E01E5A" />
        <stop offset="100%" stopColor="#B4009E" />
      </linearGradient>
    </defs>
    <path
      d="M10.5 4.5C8.3 2.3 4.7 2.3 2.5 4.5C0.3 6.7 0.3 10.3 2.5 12.5L8.5 18.5C9.6 19.6 11.4 19.6 12.5 18.5L15.2 15.8C15.7 15.3 15.7 14.5 15.2 14L8 6.8C8.9 5.8 10.2 5.5 11.2 6.2L10.5 4.5Z"
      fill="url(#copilotRibbonBlue)"
    />
    <path
      d="M13.5 19.5C15.7 21.7 19.3 21.7 21.5 19.5C23.7 17.3 23.7 13.7 21.5 11.5L15.5 5.5C14.4 4.4 12.6 4.4 11.5 5.5L8.8 8.2C8.3 8.7 8.3 9.5 8.8 10L16 17.2C15.1 18.2 13.8 18.5 12.8 17.8L13.5 19.5Z"
      fill="url(#copilotRibbonWarm)"
    />
  </svg>
);

export const ExcelIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Excel" role="img">
    <rect x="4" y="3" width="20" height="26" rx="1.5" fill="#107C41" />
    <rect x="4" y="3" width="20" height="6" fill="#21A366" />
    <path d="M9 12h4.2l2.8 4.4 2.8-4.4H23l-4.4 6 4.4 6h-4.2l-2.8-4.4L13.2 24H9l4.4-6z" fill="#fff" />
  </svg>
);

export const OutlookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Outlook" role="img">
    <rect x="14" y="6" width="16" height="20" rx="1.5" fill="#0A2767" />
    <rect x="14" y="6" width="16" height="6" fill="#0364B8" />
    <circle cx="10" cy="16" r="9" fill="#28A8EA" />
    <circle cx="10" cy="16" r="5.5" fill="#fff" />
    <circle cx="10" cy="16" r="3" fill="#0078D4" />
  </svg>
);

export const PowerAutomateIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Power Automate" role="img">
    <path d="M18 3 6 18h8l-2 11 12-15h-8z" fill="#0066FF" />
  </svg>
);

export const PowerAppsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Power Apps" role="img">
    <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" fill="#742774" />
    <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" fill="#fff" opacity="0.92" />
  </svg>
);

export const FabricIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Fabric" role="img">
    <path d="M4 8 16 3l12 5-12 5z" fill="#3BC5F6" />
    <path d="M4 16 16 11l12 5-12 5z" fill="#0F6CBD" />
    <path d="M4 24 16 19l12 5-12 5z" fill="#004E8C" />
  </svg>
);

export const EntraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Entra ID" role="img">
    <circle cx="16" cy="16" r="13" fill="none" stroke="#0078D4" strokeWidth="3" />
    <circle cx="16" cy="16" r="6" fill="#50E6FF" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Microsoft 365 collaboration marks                                  */
/*  Simplified brand recreations (same approach as the marks above):   */
/*  official geometry approximated, colours taken from the published   */
/*  product palettes. Drop licensed SVGs into public/logos/ to upgrade.*/
/* ------------------------------------------------------------------ */

export const OneDriveIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft OneDrive" role="img">
    <defs>
      <linearGradient id="oneDriveDeep" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0364B8" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
      <linearGradient id="oneDriveLight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#50B0F0" />
        <stop offset="100%" stopColor="#2886DD" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="14.5" r="9" fill="url(#oneDriveDeep)" />
    <circle cx="11.5" cy="17.5" r="6.5" fill="url(#oneDriveLight)" />
    <rect x="5" y="18" width="24" height="6.5" rx="3.25" fill="url(#oneDriveDeep)" />
  </svg>
);

export const SharePointIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft SharePoint" role="img">
    <defs>
      <linearGradient id="sharePointTeal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#038387" />
        <stop offset="100%" stopColor="#008272" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="8.5" r="4.5" fill="#6BE4CB" />
    <circle cx="14.5" cy="18" r="11" fill="url(#sharePointTeal)" />
    <path
      d="M19.4 13.2c-1.1-1.3-2.8-2-4.6-2-2.7 0-4.6 1.4-4.6 3.4 0 3.1 6.9 2.2 6.9 5.4 0 1.5-1.5 2.5-3.6 2.5-2 0-3.6-.8-4.5-2.1"
      fill="none"
      stroke="#fff"
      strokeWidth="2.1"
      strokeLinecap="round"
    />
  </svg>
);

export const VivaIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Viva" role="img">
    <defs>
      <linearGradient id="vivaViolet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B053D8" />
        <stop offset="100%" stopColor="#742774" />
      </linearGradient>
      <linearGradient id="vivaMagenta" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E3008C" />
        <stop offset="100%" stopColor="#B053D8" />
      </linearGradient>
    </defs>
    <path d="M3 6h15a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-6 5z" fill="url(#vivaViolet)" />
    <path d="M14 13h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-9l-6 5v-5a3 3 0 0 1-3-3z" fill="url(#vivaMagenta)" opacity="0.9" />
  </svg>
);

export const LoopIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Loop" role="img">
    <defs>
      <linearGradient id="loopBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0078D4" />
        <stop offset="100%" stopColor="#50E6FF" />
      </linearGradient>
      <linearGradient id="loopViolet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8764B8" />
        <stop offset="100%" stopColor="#B053D8" />
      </linearGradient>
      <linearGradient id="loopMagenta" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E3008C" />
        <stop offset="100%" stopColor="#FCB6D9" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="8.5" r="6" fill="none" stroke="url(#loopBlue)" strokeWidth="3" />
    <circle cx="8" cy="21" r="6" fill="none" stroke="url(#loopViolet)" strokeWidth="3" />
    <circle cx="24" cy="21" r="6" fill="none" stroke="url(#loopMagenta)" strokeWidth="3" />
  </svg>
);

/**
 * Fallback-only marks. The sphere prefers the licensed files in public/logos/;
 * these render if an asset request fails, so a badge is never left empty.
 */
export const SqlServerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft SQL Server" role="img">
    <defs>
      <linearGradient id="sqlBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#9FB6C1" />
        <stop offset="45%" stopColor="#DCE9EF" />
        <stop offset="100%" stopColor="#8FA9B6" />
      </linearGradient>
    </defs>
    <ellipse cx="16" cy="7" rx="11" ry="4" fill="#C9DDE4" />
    <path d="M5 7v18c0 2.2 4.9 4 11 4s11-1.8 11-4V7z" fill="url(#sqlBody)" />
    <ellipse cx="16" cy="25" rx="11" ry="4" fill="#2F5D70" opacity="0.35" />
    <path d="M5 13c0 2.2 4.9 4 11 4s11-1.8 11-4" fill="none" stroke="#8FA9B6" strokeWidth="1.4" />
  </svg>
);

export const VisualStudioIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Visual Studio" role="img">
    <defs>
      <linearGradient id="vsRibbon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8764B8" />
        <stop offset="100%" stopColor="#5C2D91" />
      </linearGradient>
    </defs>
    <path d="M4 6l12 10L4 26z" fill="url(#vsRibbon)" />
    <path d="M4 6l12 10 12-8v16l-12-8L4 26z" fill="url(#vsRibbon)" opacity="0.75" />
  </svg>
);

/** Fallback for the Power Platform badge; the real mark is a brandlogos WebP. */
export const PowerPlatformIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Power Platform" role="img">
    <defs>
      <linearGradient id="ppRibbon" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#57D36A" />
        <stop offset="52%" stopColor="#0E978F" />
        <stop offset="100%" stopColor="#0B4C8C" />
      </linearGradient>
    </defs>
    <path
      d="M8 7h12a6 6 0 0 1 0 12h-8"
      fill="none"
      stroke="url(#ppRibbon)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M18 19 9 28"
      fill="none"
      stroke="url(#ppRibbon)"
      strokeWidth="6"
      strokeLinecap="round"
      opacity="0.82"
    />
  </svg>
);

export const BusinessCentralIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => {
  const [imgError, setImgError] = React.useState(false);

  if (!imgError) {
    return (
      <img
        src="/logos/dynamics-365-business-central.png"
        alt="Microsoft Dynamics 365 Business Central"
        className={`${className} object-contain inline-block shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Dynamics 365 Business Central" role="img">
      <defs>
        <linearGradient id="bcGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00A4EF" />
          <stop offset="100%" stopColor="#0078D4" />
        </linearGradient>
        <linearGradient id="bcGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#004E8C" />
        </linearGradient>
        <linearGradient id="bcTeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00B7C3" />
          <stop offset="100%" stopColor="#0078D4" />
        </linearGradient>
      </defs>
      <path d="M4 8l12-5 12 5-12 5z" fill="url(#bcTeal)" />
      <path d="M4 8v16l12 5V13z" fill="url(#bcGrad1)" />
      <path d="M28 8v16l-12 5V13z" fill="url(#bcGrad2)" opacity="0.9" />
      <circle cx="16" cy="13" r="2.5" fill="#fff" opacity="0.9" />
    </svg>
  );
};

export const DataverseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Dataverse" role="img">
    <circle cx="16" cy="16" r="13" fill="#0078D4" opacity="0.15" />
    <circle cx="16" cy="8" r="4" fill="#0078D4" />
    <circle cx="9" cy="21" r="4" fill="#107C41" />
    <circle cx="23" cy="21" r="4" fill="#742774" />
    <line x1="16" y1="8" x2="9" y2="21" stroke="#0078D4" strokeWidth="2" />
    <line x1="16" y1="8" x2="23" y2="21" stroke="#0078D4" strokeWidth="2" />
    <line x1="9" y1="21" x2="23" y2="21" stroke="#0078D4" strokeWidth="2" />
  </svg>
);

export const CopilotStudioIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Copilot Studio" role="img">
    <defs>
      <linearGradient id="csGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00A4EF" />
        <stop offset="50%" stopColor="#7B83EB" />
        <stop offset="100%" stopColor="#B4009E" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="24" height="24" rx="6" fill="url(#csGrad)" />
    <circle cx="12" cy="13" r="2.5" fill="#fff" />
    <circle cx="20" cy="13" r="2.5" fill="#fff" />
    <path d="M11 20c1.5 2 3.5 2.5 5 2.5s3.5-.5 5-2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

/**
 * Reusable official Microsoft Application Badge for cards
 */
export const MicrosoftAppBadge: React.FC<{
  app:
    | "business-central"
    | "copilot"
    | "power-bi"
    | "power-automate"
    | "power-apps"
    | "azure"
    | "fabric"
    | "teams"
    | "dataverse"
    | "partner"
    | "d365-crm"
    | "customer-insights"
    | "excel"
    | "entra";
  className?: string;
  size?: "sm" | "md";
}> = ({ app, className = "", size = "sm" }) => {
  const badgeMap = {
    "business-central": {
      name: "Dynamics 365 Business Central",
      icon: <BusinessCentralIcon className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} />,
      bg: "bg-blue-50/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 border-blue-200 dark:border-blue-800",
    },
    copilot: {
      name: "Microsoft Copilot in BC",
      icon: <CopilotIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-purple-50/95 dark:bg-slate-900/95 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    },
    "power-bi": {
      name: "Microsoft Power BI",
      icon: <PowerBIIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-amber-50/95 dark:bg-slate-900/95 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    },
    "power-automate": {
      name: "Microsoft Power Automate",
      icon: <PowerAutomateIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-sky-50/95 dark:bg-slate-900/95 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    },
    "power-apps": {
      name: "Microsoft Power Apps",
      icon: <PowerAppsIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-fuchsia-50/95 dark:bg-slate-900/95 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800",
    },
    azure: {
      name: "Microsoft Azure Cloud",
      icon: <AzureIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-blue-50/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 border-blue-200 dark:border-blue-800",
    },
    fabric: {
      name: "Microsoft Fabric",
      icon: <FabricIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-cyan-50/95 dark:bg-slate-900/95 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    },
    teams: {
      name: "Microsoft Teams",
      icon: <TeamsIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-indigo-50/95 dark:bg-slate-900/95 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    },
    dataverse: {
      name: "Microsoft Dataverse",
      icon: <DataverseIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-teal-50/95 dark:bg-slate-900/95 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    },
    partner: {
      name: "Microsoft Solutions Partner",
      icon: <MicrosoftLogo className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
    },
    "d365-crm": {
      name: "Dynamics 365 CRM",
      icon: <DynamicsIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-rose-50/95 dark:bg-slate-900/95 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    },
    "customer-insights": {
      name: "Dynamics 365 Customer Insights",
      icon: <DynamicsIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-emerald-50/95 dark:bg-slate-900/95 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
    excel: {
      name: "Microsoft Excel for BC",
      icon: <ExcelIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-emerald-50/95 dark:bg-slate-900/95 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
    entra: {
      name: "Microsoft Entra ID",
      icon: <EntraIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />,
      bg: "bg-sky-50/95 dark:bg-slate-900/95 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    },
  };

  const item = badgeMap[app] || badgeMap["business-central"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-xs backdrop-blur-sm ${item.bg} ${className}`}
    >
      {item.icon}
      <span>{item.name}</span>
    </span>
  );
};

/** Generic fallback chip for any other Microsoft-ecosystem term. */
export const MicrosoftGenericIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <MicrosoftLogo className={className} />
);

const ICON_MAP: Array<{ match: RegExp; Icon: React.FC<{ className?: string }> }> = [
  { match: /business central/i, Icon: BusinessCentralIcon },
  { match: /sql server/i, Icon: SqlServerIcon },
  { match: /visual studio/i, Icon: VisualStudioIcon },
  { match: /azure|synapse|onelake|purview|defender/i, Icon: AzureIcon },
  { match: /entra/i, Icon: EntraIcon },
  { match: /power\s*bi/i, Icon: PowerBIIcon },
  { match: /fabric/i, Icon: FabricIcon },
  { match: /power\s*automate/i, Icon: PowerAutomateIcon },
  { match: /power\s*platform/i, Icon: PowerPlatformIcon },
  { match: /power\s*apps|power\s*pages/i, Icon: PowerAppsIcon },
  { match: /dataverse/i, Icon: DataverseIcon },
  { match: /copilot\s*studio/i, Icon: CopilotStudioIcon },
  { match: /copilot|semantic kernel|openai/i, Icon: CopilotIcon },
  { match: /teams/i, Icon: TeamsIcon },
  { match: /excel/i, Icon: ExcelIcon },
  { match: /outlook/i, Icon: OutlookIcon },
  { match: /dynamics|d365|erp|f&o|finance|supply chain|sales|customer insights/i, Icon: DynamicsIcon },
];

/**
 * Given a free-text stack label (e.g. "Azure Data Lake", "Power BI Embedded"),
 * renders the closest matching real Microsoft product icon, falling back to
 * the Microsoft logo itself.
 */
export const TechIcon: React.FC<{ label: string; className?: string }> = ({
  label,
  className = "w-5 h-5",
}) => {
  const found = ICON_MAP.find((entry) => entry.match.test(label));
  const Icon = found ? found.Icon : MicrosoftGenericIcon;
  return <Icon className={className} />;
};
