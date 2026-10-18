export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
  color: string;
  items: ResourceItem[];
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'documentation' | 'roadmap' | 'tool' | 'training' | 'whitepaper' | 'community' | 'video' | 'localization';
  externalUrl: string;
  isOfficialMicrosoft: boolean;
  featured?: boolean;
  tags: string[];
  readTimeOrDuration?: string;
  versionOrWave?: string;
}

export interface UpcomingUpdateItem {
  id: string;
  title: string;
  category: 'AI & Copilot' | 'Finance & Core' | 'Supply Chain' | 'India Localization' | 'Developer & Admin' | 'Governance';
  status: 'Rolling Out' | 'Public Preview' | 'General Availability' | 'Planned';
  targetDate: string;
  releaseWave: string;
  description: string;
  businessImpact: string;
  microsoftDocUrl: string;
  coreenactAdvisoryNote: string;
  features: string[];
}

export const UPCOMING_UPDATES_DATA: UpcomingUpdateItem[] = [
  {
    id: "update-copilot-agent-canvas",
    title: "Autonomous Payables & Financial Agents in Business Central",
    category: "AI & Copilot",
    status: "Rolling Out",
    targetDate: "October 2025 - April 2026",
    releaseWave: "2025 Release Wave 2 / 2026 Wave 1",
    description:
      "Next-generation Microsoft Copilot Studio autonomous agents embedded directly inside Business Central. Capable of autonomously matching purchase orders with vendor invoices, flagging GL variances, and proposing payment batches with human-in-the-loop approvals.",
    businessImpact:
      "Reduces manual invoice entry cycles by up to 75% and eliminates human reconciliation bottlenecks in high-volume accounts payable.",
    microsoftDocUrl:
      "https://learn.microsoft.com/en-in/dynamics365/business-central/ai-copilot-overview",
    coreenactAdvisoryNote:
      "Coreenact configures custom approval boundaries and multi-tier delegation matrices so autonomous agents stay strictly within your CFO internal controls.",
    features: [
      "AI-driven matching of multi-line purchase orders to scanned vendor bills",
      "Automatic ledger anomaly detection and exchange rate variance warnings",
      "One-click Copilot chat assistance for ledger inquiries across multi-company tenants",
      "Human-in-the-loop review workflow before committing GL postings",
    ],
  },
  {
    id: "update-india-einvoice-peppol",
    title: "Enhanced India IRP E-Invoicing & Automated E-Way Bill Reconciliation",
    category: "India Localization",
    status: "General Availability",
    targetDate: "Continuous Updates 2025-2026",
    releaseWave: "2025 Wave 2 & Monthly Hotfixes",
    description:
      "Direct API integration updates aligning with the latest GSTN / National Informatics Centre (NIC) Invoice Registration Portal (IRP) v1.04 schema, automated IRN generation, digitally signed QR codes, and multi-modal E-Way bill distance computations.",
    businessImpact:
      "Zero manual portal uploads; 100% compliance with statutory mandate thresholds down to ₹5 Crore turnover entities.",
    microsoftDocUrl:
      "https://learn.microsoft.com/en-in/dynamics365/business-central/LocalFunctionality/India/india-local-functionality",
    coreenactAdvisoryNote:
      "Coreenact provides certified pre-configured AL connectors for ClearTax, Cygnet, and NIC direct GST APIs with automatic fallback routing.",
    features: [
      "Automated IRN generation upon Sales Invoice Posting",
      "QR code printing natively on standard RDL and Word layout documents",
      "Consolidated multi-vehicle E-Way bill generation for inter-state hub transfers",
      "Automated GSTR-2B input tax credit reconciliation engine",
    ],
  },
  {
    id: "update-subscription-billing",
    title: "Advanced Subscription Billing & Recurring Revenue Management",
    category: "Finance & Core",
    status: "General Availability",
    targetDate: "October 2025 / Rolling Out",
    releaseWave: "2025 Release Wave 2",
    description:
      "Enterprise recurring billing engine supporting multi-year contracts, usage-based consumption tiers, price escalations, deferred revenue recognition (ASC 606 / IFRS 15), and automated customer renewal notifications.",
    businessImpact:
      "Enables SaaS, equipment leasing, and AMC service providers to manage recurring contracts natively without requiring separate third-party billing software.",
    microsoftDocUrl:
      "https://learn.microsoft.com/en-in/dynamics365/release-plan/2024wave2/smb/dynamics365-business-central/manage-recurring-revenue-subscription-billing",
    coreenactAdvisoryNote:
      "We recommend configuring automated revenue deferral schedules at contract inception to prevent audit reconciliation delays at month-end.",
    features: [
      "Automated recurring invoice batch creation across billing intervals",
      "Milestone-based and consumption-metered billing models",
      "Audit-proof ASC 606 & IFRS 15 deferred revenue schedules",
      "Contract renewal automation with automatic index-based price adjustments",
    ],
  },
  {
    id: "update-ai-work-roadmap",
    title: "Transition to Unified Microsoft AI at Work Continuous Roadmap",
    category: "Governance",
    status: "Rolling Out",
    targetDate: "2026 Continuous Cadence",
    releaseWave: "Microsoft AI at Work Roadmap",
    description:
      "Microsoft is evolving traditional static PDF release plans into the live, interactive 'AI at Work roadmap'. This provides real-time transparency into feature lifecycle stages: In Development, Rolling Out, and Launched across Dynamics 365 and Power Platform.",
    businessImpact:
      "IT leaders and ERP directors can track exact deployment dates and environment availability windows continuously instead of waiting for bi-annual PDF documents.",
    microsoftDocUrl:
      "https://learn.microsoft.com/en-in/dynamics365/release-plan/",
    coreenactAdvisoryNote:
      "Coreenact tests each continuous wave in our sandboxes 45 days prior to tenant GA rollout, ensuring custom AL extensions remain 100% regression-free.",
    features: [
      "Continuous live roadmap visibility for Business Central features",
      "Categorization by In Development, Rolling Out, and Launched states",
      "Direct integration with Microsoft Learn What's New documentation",
      "Tenant admin notification alerts inside Dynamics 365 Admin Center",
    ],
  },
  {
    id: "update-warehouse-mobile-automation",
    title: "Enhanced Mobile Barcode Scanning & Directed Put-Away Routing",
    category: "Supply Chain",
    status: "Public Preview",
    targetDate: "Early 2026",
    releaseWave: "2026 Release Wave 1",
    description:
      "Modernized mobile barcode experience optimized for ruggedized warehouse terminals and mobile tablets. Includes camera-based OCR barcode parsing, cross-docking directives, pick-face replenishment alerts, and offline receipt caching.",
    businessImpact:
      "Cuts picking errors by over 90% and accelerates physical goods dispatch in multi-zone distribution centers.",
    microsoftDocUrl:
      "https://learn.microsoft.com/en-in/dynamics365/business-central/warehouse-how-to-pick-items-with-warehouse-picks",
    coreenactAdvisoryNote:
      "Coreenact pairs this capability with our rugged industrial mobile device integration for Zebra, Honeywell, and iOS/Android scanning terminals.",
    features: [
      "N-tier bin location routing based on item velocity and physical weight limits",
      "Instant 2D Datamatrix and GS1 barcode identification",
      "Batch pick waves with automated replenishment triggers",
      "Direct carrier tracking number association and airway bill printing",
    ],
  },
  {
    id: "update-al-compiler-dev-governance",
    title: "AL Language Modernization, GitHub Actions CI/CD & Security Profiles",
    category: "Developer & Admin",
    status: "Rolling Out",
    targetDate: "Q1-Q2 2026",
    releaseWave: "2025 Wave 2 / 2026 Wave 1",
    description:
      "Upgraded AL compiler diagnostics, granular role-based security permissions at the field and action level, automated AL-Go for GitHub CI/CD pipeline automation, and telemetry streaming to Azure Application Insights.",
    businessImpact:
      "Reduces extension deployment cycle times from days to minutes while enforcing airtight zero-trust data governance.",
    microsoftDocUrl:
      "https://learn.microsoft.com/en-in/dynamics365/business-central/dev-itpro/developer/devenv-dev-overview",
    coreenactAdvisoryNote:
      "All Coreenact AL code is built on strict Microsoft AL Guidelines, using automated GitHub Actions regression suites before production cutover.",
    features: [
      "Native GitHub Actions CI/CD integration using Microsoft AL-Go",
      "Granular field-level encryption and masking for sensitive financial records",
      "Real-time SQL telemetry and long-running query alerts via Azure Insights",
      "Modernized Copilot AL code generation support in Visual Studio Code",
    ],
  },
];

export const RESOURCE_CATEGORIES_DATA: ResourceCategory[] = [
  {
    id: "documentation",
    title: "Product Documentation & Microsoft Learn",
    description:
      "Deep architectural guides, end-user manuals, functional workflows, and administration protocols straight from Microsoft's official engineering team.",
    badge: "Official Documentation",
    iconName: "BookOpen",
    color: "blue",
    items: [
      {
        id: "doc-bc-overview",
        title: "Dynamics 365 Business Central Documentation Home",
        description:
          "Comprehensive documentation covering business functionality, setup, administration, and technical architecture.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["Core Docs", "Microsoft Learn", "Architecture"],
        readTimeOrDuration: "Complete Guide",
      },
      {
        id: "doc-whats-new",
        title: "What's New and Planned in Business Central",
        description:
          "Detailed capability breakdown of the newest features, release waves, deprecations, and monthly service updates.",
        type: "roadmap",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/dev-itpro/whatsnew/whatsnew-overview",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["Release Waves", "Roadmap", "What's New"],
        readTimeOrDuration: "Live Updated",
      },
      {
        id: "doc-finance",
        title: "Financial Management in Business Central",
        description:
          "General ledger setup, dimensional accounting, accounts payable/receivable, bank account reconciliation, and fiscal year close.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/finance",
        isOfficialMicrosoft: true,
        tags: ["Finance", "General Ledger", "Taxation"],
        readTimeOrDuration: "25 min read",
      },
      {
        id: "doc-supply-chain",
        title: "Supply Chain & Inventory Costing Architecture",
        description:
          "Item tracking, FIFO/Average/Standard costing methods, multi-warehouse routing, transfer orders, and drop shipments.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/inventory-manage-inventory",
        isOfficialMicrosoft: true,
        tags: ["Supply Chain", "Inventory", "Warehousing"],
        readTimeOrDuration: "20 min read",
      },
      {
        id: "doc-copilot-guide",
        title: "Microsoft Copilot & Generative AI in Business Central",
        description:
          "Official guide to generative AI capabilities, automated item marketing text, bank reconciliation assistance, and autonomous agents.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/ai-copilot-overview",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["Copilot", "AI Agents", "Automation"],
        readTimeOrDuration: "15 min read",
      },
    ],
  },
  {
    id: "localization",
    title: "India Statutory Localization & GST Hub",
    description:
      "Statutory compliance manuals, IRP real-time e-invoicing architecture, E-Way bill protocols, and TDS/TCS accounting designed for Indian tax law.",
    badge: "India GST Compliance",
    iconName: "ShieldCheck",
    color: "emerald",
    items: [
      {
        id: "loc-india-official",
        title: "Official India Local Functionality Guide",
        description:
          "Microsoft's definitive documentation on statutory capabilities specific to Indian businesses, GST configurations, and tax ledgers.",
        type: "localization",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/LocalFunctionality/India/india-local-functionality",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["India GST", "Statutory", "Compliance"],
        readTimeOrDuration: "Official Docs",
      },
      {
        id: "loc-einvoice",
        title: "IRP E-Invoicing & Signed QR Code Setup",
        description:
          "Technical specifications for integrating Government Invoice Registration Portal (IRP) directly with Business Central sales posting routines.",
        type: "localization",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/LocalFunctionality/India/tax-engine-gst",
        isOfficialMicrosoft: true,
        tags: ["E-Invoicing", "IRP NIC", "GSTN"],
        readTimeOrDuration: "18 min read",
      },
      {
        id: "loc-ewaybill",
        title: "Automated E-Way Bill Generation & Multi-State Logistics",
        description:
          "How to configure transport consignor/consignee data, vehicle numbers, and generate E-Way bill JSON files natively from Transfer & Sales Shipments.",
        type: "localization",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/LocalFunctionality/India/gst-e-way-bill",
        isOfficialMicrosoft: true,
        tags: ["E-Way Bill", "Logistics", "Interstate"],
        readTimeOrDuration: "12 min read",
      },
      {
        id: "loc-tds-tcs",
        title: "TDS & TCS Withholding Tax Accounting in BC",
        description:
          "Setting up nature of deductions (NOD), section thresholds under Indian Income Tax Act 1961, and generating quarterly Challan / Form 26Q reports.",
        type: "localization",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/LocalFunctionality/India/tax-deducted-source-overview",
        isOfficialMicrosoft: true,
        tags: ["TDS", "TCS", "Direct Tax"],
        readTimeOrDuration: "14 min read",
      },
    ],
  },
  {
    id: "training",
    title: "Training, Learning Paths & Certifications",
    description:
      "Skill up with official Microsoft Learn role-based curricula, hands-on interactive labs, and preparation guides for the coveted MB-800 certification.",
    badge: "Skills & Career",
    iconName: "GraduationCap",
    color: "purple",
    items: [
      {
        id: "train-mb800",
        title: "Exam MB-800: Dynamics 365 Business Central Functional Consultant",
        description:
          "Official exam objectives, study guide, free practice assessment, and scheduling details to become a certified Microsoft Business Central Consultant.",
        type: "training",
        externalUrl: "https://learn.microsoft.com/en-in/credentials/certifications/d365-business-central-functional-consultant-associate/",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["Certification", "MB-800", "Career Path"],
        readTimeOrDuration: "Certification Path",
      },
      {
        id: "train-learn-paths",
        title: "Microsoft Learn: Interactive Business Central Catalog",
        description:
          "Over 120 free, self-paced modules ranging from basic financial posting to advanced manufacturing routing and Power Platform integration.",
        type: "training",
        externalUrl: "https://learn.microsoft.com/en-in/training/browse/?products=dynamics-business-central",
        isOfficialMicrosoft: true,
        tags: ["Self-Paced", "Hands-On Labs", "Modules"],
        readTimeOrDuration: "120+ Modules",
      },
      {
        id: "train-guided-tour",
        title: "Microsoft Dynamics 365 Business Central Guided Product Tour",
        description:
          "Interactive walk-through demonstrating financial insights, inventory control, purchase approvals, and executive dashboards in a live simulated environment.",
        type: "video",
        externalUrl: "https://dynamics.microsoft.com/en-in/business-central/guided-tour/",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["Interactive Tour", "Product Demo", "UI Walkthrough"],
        readTimeOrDuration: "15 min tour",
      },
    ],
  },
  {
    id: "developer",
    title: "Developer Architecture & AL Extensions",
    description:
      "Modern development tooling, clean event-driven AL design patterns, GitHub CI/CD automation, API endpoints, and cloud database optimization.",
    badge: "For AL Developers",
    iconName: "Code2",
    color: "cyan",
    items: [
      {
        id: "dev-al-overview",
        title: "AL Development Environment & Visual Studio Code",
        description:
          "Setting up the modern AL language extension in VS Code, configuring launch.json, and connecting to online Docker or cloud sandbox containers.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/dev-itpro/developer/devenv-get-started",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["AL Language", "VS Code", "Extensions"],
        readTimeOrDuration: "Architectural Guide",
      },
      {
        id: "dev-api-odata",
        title: "Business Central REST APIs & OData v4 Integration",
        description:
          "Connecting external systems, web applications, e-commerce stores, and third-party CRMs via standard and custom API page objects.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/dev-itpro/api-reference/v2.0/",
        isOfficialMicrosoft: true,
        tags: ["REST API", "OData", "Integrations"],
        readTimeOrDuration: "Reference",
      },
      {
        id: "dev-telemetry",
        title: "Application Insights Cloud Telemetry & Performance Tuning",
        description:
          "Instrumenting production Business Central environments with Azure Application Insights to monitor slow queries, locking deadlocks, and user sessions.",
        type: "documentation",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/dev-itpro/administration/telemetry-overview",
        isOfficialMicrosoft: true,
        tags: ["Telemetry", "Azure Insights", "Performance"],
        readTimeOrDuration: "16 min read",
      },
    ],
  },
  {
    id: "community-appsource",
    title: "AppSource Ecosystem & Community Forums",
    description:
      "Extend your Business Central ERP with certified Microsoft AppSource add-ons, connect with global user groups, and submit product feature ideas.",
    badge: "Ecosystem & Apps",
    iconName: "Grid",
    color: "amber",
    items: [
      {
        id: "eco-appsource",
        title: "Microsoft AppSource: Business Central Marketplace",
        description:
          "Browse thousands of verified apps and add-ons built by global Microsoft partners, including payment gateways, EDI connectors, and industry extensions.",
        type: "tool",
        externalUrl: "https://appsource.microsoft.com/en-in/marketplace/apps?product=dynamics-365-business-central",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["AppSource", "Add-ons", "Extensions"],
        readTimeOrDuration: "App Marketplace",
      },
      {
        id: "eco-community",
        title: "Official Microsoft Dynamics 365 Community Forum",
        description:
          "Ask questions, troubleshoot complex error codes, and collaborate with Microsoft MVPs, engineers, and fellow enterprise administrators worldwide.",
        type: "community",
        externalUrl: "https://community.dynamics.com/forums/thread/?groupid=e3bbcd2b-8a8b-4927-aa3c-535388c3a907",
        isOfficialMicrosoft: true,
        tags: ["Community", "Forums", "Peer Support"],
        readTimeOrDuration: "Global Forum",
      },
      {
        id: "eco-ideas",
        title: "Dynamics 365 Business Central Ideas Portal",
        description:
          "Directly submit feature requests and vote on product enhancements prioritized by the Microsoft product engineering team in Copenhagen.",
        type: "community",
        externalUrl: "https://experience.dynamics.com/ideas/list/?category=c0ab6f76-ec36-e911-a88a-000d3a1f3c3d",
        isOfficialMicrosoft: true,
        tags: ["Ideas", "Feedback", "Product Roadmap"],
        readTimeOrDuration: "Idea Submission",
      },
      {
        id: "eco-stories",
        title: "Microsoft Customer Stories & Case Studies",
        description:
          "Explore how mid-sized and large enterprises worldwide deployed Business Central to unify supply chains, slash costs, and accelerate reporting.",
        type: "whitepaper",
        externalUrl: "https://customers.microsoft.com/en-in/search?sq=business%20central",
        isOfficialMicrosoft: true,
        tags: ["Case Studies", "ROI", "Customer Stories"],
        readTimeOrDuration: "Executive Proof",
      },
    ],
  },
  {
    id: "migration-whitepapers",
    title: "Migration Playbooks & Analyst Reports",
    description:
      "Independent economic assessments, Forrester TEI studies, security whitepapers, and step-by-step migration playbooks from legacy NAV to Cloud.",
    badge: "Research & Playbooks",
    iconName: "FileSpreadsheet",
    color: "rose",
    items: [
      {
        id: "wp-forrester-tei",
        title: "Forrester Consulting: Total Economic Impact™ of Business Central",
        description:
          "Independent study showing 162% return on investment (ROI), payback in under 7 months, and significant cost reductions over legacy on-premise ERPs.",
        type: "whitepaper",
        externalUrl: "https://www.microsoft.com/en-in/dynamics-365/products/business-central",
        isOfficialMicrosoft: true,
        featured: true,
        tags: ["Forrester TEI", "ROI Analysis", "Executive Report"],
        readTimeOrDuration: "Analyst Study",
      },
      {
        id: "wp-nav-migration",
        title: "Microsoft Dynamics NAV to Business Central Migration Guide",
        description:
          "Step-by-step playbook on converting legacy C/AL code to AL extensions, upgrading SQL databases, and migrating master data with zero downtime.",
        type: "whitepaper",
        externalUrl: "https://learn.microsoft.com/en-in/dynamics365/business-central/dev-itpro/upgrade/upgrade-overview-v2",
        isOfficialMicrosoft: true,
        tags: ["NAV Upgrade", "Migration Playbook", "C/AL to AL"],
        readTimeOrDuration: "Technical Playbook",
      },
      {
        id: "wp-trust-center",
        title: "Microsoft Cloud Trust Center & Compliance Standards",
        description:
          "SOC 1, SOC 2, ISO/IEC 27001, GDPR, and Indian data localization compliance documentation for Microsoft Azure data centers hosting Business Central.",
        type: "whitepaper",
        externalUrl: "https://www.microsoft.com/en-in/trust-center",
        isOfficialMicrosoft: true,
        tags: ["Trust Center", "Security", "ISO 27001", "SOC 2"],
        readTimeOrDuration: "Compliance Docs",
      },
    ],
  },
];
