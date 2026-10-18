import { ServiceItem, IndustryItem } from "../types";

export const COREENACT_CONTACT = {
  email: "info@coreenact.com",
  phone: "+91 84487 96169",
  phoneRaw: "8448796169",
  whatsappUrl: "https://wa.me/918448796169",
  phoneCanada: "",
  addressIndia: "123-1st Floor, SRS CORPORATE TOWER, NH-19, Sector 31, Faridabad, Haryana 121003",
  addressCanada: "4255 Sherwoodtowne Blvd, Ste 300, Mississauga, ON L4Z 1Y5, Canada",
  consultationUrl: "https://coreenact.com",
  tagline: "Converting Enterprise Complexity into an Intelligent Core",
  socials: {
    linkedin: "https://www.linkedin.com/company/coreenact-solutions",
    x: "https://x.com/coreenact40183",
    instagram: "https://www.instagram.com/coreenact",
    youtube: "https://www.youtube.com/@CoreenactSolutions",
  },
  offices: [
    {
      id: "india",
      region: "India Headquarters",
      city: "Haryana",
      country: "India",
      address: "123-1st Floor, SRS CORPORATE TOWER, NH-19, Sector 31, Faridabad, Haryana 121003",
      landmark: "SRS Corporate Tower, NH-19, Sector 31, Faridabad",
      email: "info@coreenact.com",
      phone: "+91 84487 96169",
      whatsappUrl: "https://wa.me/918448796169",
      coords: { lat: 28.4447, lng: 77.3119 },
      badge: "Delivery & Engineering CoE",
      timing: "Mon - Sat: 9:00 AM - 7:00 PM IST",
    },
    {
      id: "canada",
      region: "North America Office",
      city: "Mississauga",
      country: "Canada",
      address: "4255 Sherwoodtowne Blvd, Ste 300, Mississauga, ON L4Z 1Y5, Canada",
      landmark: "Sherwoodtowne Business Corridor, Greater Toronto Area",
      email: "info@coreenact.com",
      phone: "",
      whatsappUrl: "",
      coords: { lat: 43.5988, lng: -79.6441 },
      badge: "Americas Consulting Hub",
      timing: "Mon - Fri: 9:00 AM - 6:00 PM EST",
    },
  ],
  deliveryHighlights: [
    {
      title: "Global ERP Engineering CoE",
      location: "Haryana, India",
      focus: "End-to-End AL Extension Engineering, India GST Localization & 24/7 Managed Services",
    },
    {
      title: "North America Consulting Hub",
      location: "Mississauga, Canada",
      focus: "Enterprise Business Central Architecture, Cloud Migrations & Strategic Advisory",
    },
  ],
};

export const SOLUTION_PILLARS = [
  {
    id: "run-transform",
    title: "Run & Transform",
    subtitle: "Enterprise ERP, Cloud Financials & Operations",
    badge: "Core ERP",
    color: "from-blue-600 to-indigo-600",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgLight: "bg-blue-500/10",
    description:
      "Replace legacy software and disconnected spreadsheets with modern Microsoft Dynamics 365 solutions that unify operations, sales, finance, and supply chains.",
    items: [
      {
        name: "Dynamics 365 Business Central",
        description: "All-in-one comprehensive cloud ERP designed to manage financials, manufacturing, jobs, and inventory.",
        features: ["Financial Management", "Manufacturing & Supply Chain", "Project Job Costing", "Multi-Entity Consolidation"],
      },
      {
        name: "Dynamics 365 Finance & Operations",
        description: "Flagship global enterprise ERP for high-volume multinational supply chains and complex manufacturing.",
        features: ["Automated General Ledger", "Global Asset Management", "Warehouse IoT & Robotics", "Global SOX Governance"],
      },
      {
        name: "Dynamics 365 CRM",
        description: "Customer Engagement suite connecting sales pipelines, marketing journeys, and omnichannel service desks.",
        features: ["Lead-to-Opportunity AI", "Omnichannel Service Center", "Customer Journey Automation", "Outlook & Teams Sync"],
      },
      {
        name: "AI Agent in ERP",
        description: "Autonomous reasoning agents built into ERP workflows to handle reconciliation, exception routing, and approvals.",
        features: ["Autonomous Bank Recs", "Intelligent Anomaly Detection", "Auto-PO Approval Routing", "Conversational ERP Queries"],
      },
      {
        name: "AI-OCR Document Recognition",
        description: "Deep-learning OCR engine reading AP invoices, bills of lading, and receipts with zero manual data entry.",
        features: ["Line-Item Table Extraction", "3-Way Invoice Matching", "Multi-Language Processing", "Direct ERP Posting"],
      },
      {
        name: "Power Apps & Power Automate",
        description: "Low-code hyper-automation connecting frontline mobile teams and eliminating repetitive manual handoffs.",
        features: ["Mobile Inventory Apps", "Approval Flows in Teams", "Desktop RPA Bots", "200+ Standard Data Connectors"],
      },
    ],
  },
  {
    id: "data-ai-insights",
    title: "Data, AI & Insights",
    subtitle: "Unified Analytics, Lakehouse & Executive Intelligence",
    badge: "Analytics",
    color: "from-purple-600 to-pink-600",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgLight: "bg-purple-500/10",
    description:
      "Transform disparate operational data into real-time decisioning dashboards, executive forecasts, and predictive insights.",
    items: [
      {
        name: "Power BI Executive Dashboards",
        description: "Rich, interactive visual telemetry embedded natively into Business Central and Microsoft Teams.",
        features: ["Real-time Cash Flow Visuals", "Inventory Turnover Telemetry", "Executive Board Packs", "Mobile Drilldowns"],
      },
      {
        name: "Jet Reports for Business Central",
        description: "Fast, flexible Excel-integrated reporting engineered specifically for Dynamics 365 Business Central.",
        features: ["Financial Statement Modeling", "Consolidated P&L & Balance Sheet", "Automated Report Distribution", "Direct SQL/API Links"],
      },
      {
        name: "Microsoft Fabric & OneLake",
        description: "Unified all-in-one data lakehouse architecture consolidating ERP, CRM, and third-party data lakes.",
        features: ["OneLake Unified Storage", "DirectLake High Speed Queries", "Data Science & Machine Learning", "Purview Enterprise Governance"],
      },
      {
        name: "Data & AI Advisory",
        description: "Strategic guidance to establish data governance, maturity assessments, and AI adoption frameworks.",
        features: ["Data Readiness Audit", "Semantic Model Design", "ROI Prioritization Matrix", "Executive Architecture Roadmaps"],
      },
    ],
  },
  {
    id: "scale-localize",
    title: "Scale & Localize",
    subtitle: "Global Multi-Entity Rollouts & Regional Compliance",
    badge: "Scale",
    color: "from-emerald-600 to-teal-600",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgLight: "bg-emerald-500/10",
    description:
      "Standardize global business applications across countries while seamlessly meeting local statutory and tax compliance requirements.",
    items: [
      {
        name: "Global ERP Rollouts",
        description: "Multi-country deployment framework using governed templates, standardized charts of accounts, and local adaptations.",
        features: ["Governed Core Template", "Phased Geographic Cutover", "Multi-Currency Consolidation", "24/7 Follow-the-Sun Support"],
      },
      {
        name: "India Localization & Statutory Compliance",
        description: "Native Business Central compliance with GST, TDS, TCS, e-Invoicing, e-Way bills, and Indian accounting standards.",
        features: ["Automated GSTIN Validation", "Direct NIC e-Invoice Portal Link", "Real-Time e-Way Bill Generation", "Statutory Audit Ready Trails"],
      },
      {
        name: "NAV to Cloud Migration",
        description: "Proven, low-risk migration journey modernizing legacy Dynamics NAV (2009–2018) into Business Central Cloud SaaS.",
        features: ["Legacy C/AL to AL Code Refactoring", "Historical Data Cleanse & Extract", "Zero Operational Disruption", "User Enablement Bootcamps"],
      },
    ],
  },
  {
    id: "secure-govern",
    title: "Secure & Govern",
    subtitle: "Enterprise Compliance, ERP Health Check & Managed Care",
    badge: "Governance",
    color: "from-amber-600 to-orange-600",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgLight: "bg-amber-500/10",
    description:
      "Ensure business systems remain resilient, fully compliant with international standards, and continuously optimized.",
    items: [
      {
        name: "Security & Role Governance (RBAC)",
        description: "Fine-grained permissions, segregation of duties (SoD), and Microsoft Entra ID integration to protect sensitive records.",
        features: ["Role-Based Access Controls", "Segregation of Duties Matrices", "Conditional Access & MFA", "Comprehensive Audit Logging"],
      },
      {
        name: "ERP Audit & Health Check",
        description: "Deep architectural diagnostic assessing code cleanliness, database indexes, integration latency, and license utilization.",
        features: ["Custom Code Diagnostics", "Performance Bottleneck Analysis", "License Optimization Review", "Actionable 30-Day Fix Plan"],
      },
      {
        name: "24/7 Managed Services & Support",
        description: "Dedicated SLA-driven support team ensuring continuous uptime, monthly feature rollouts, and user training.",
        features: ["Tier 1-3 Support Desk", "Automated Health Monitoring", "Major Release Wave Testing", "Dedicated Solution Architect"],
      },
    ],
  },
  {
    id: "ai-productivity",
    title: "AI & Productivity",
    subtitle: "Microsoft Copilot, Agentic AI & Intelligent Workflows",
    badge: "Agentic AI",
    color: "from-cyan-600 to-blue-600",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgLight: "bg-cyan-500/10",
    description:
      "Infuse agentic intelligence into everyday business tools so teams can accomplish in minutes what once took hours.",
    items: [
      {
        name: "Microsoft Copilot for Business Central",
        description: "Native Copilot experiences enabling natural language inventory lookups, bank matching assistance, and automated marketing copy.",
        features: ["Natural Language Data Querying", "Bank Account Reconciliation", "AI Item Marketing Descriptions", "Sales Order Automation"],
      },
      {
        name: "Custom Agentic AI Solutions",
        description: "Specialized multi-agent systems designed using Azure OpenAI and Copilot Studio that execute end-to-end business workflows.",
        features: ["Autonomous Vendor Dispatch Bots", "Contract Risk Analysis Agents", "Claims Triage Automation", "Cross-System Synchronization"],
      },
      {
        name: "Digital Transformation Advisory",
        description: "Holistic strategic roadmap aligning business KPIs, process optimization, and intelligent automation for leadership teams.",
        features: ["Process Mining & Bottleneck Map", "Business Case & TCO Modeling", "Change Management Framework", "Post-Deployment Value Realization"],
      },
    ],
  },
  {
    id: "edcore-solution",
    title: "EdCore — Education ERP & LMS",
    subtitle: "Specialized Comprehensive Platform for Modern Academic Institutions",
    badge: "Flagship Product",
    color: "from-rose-600 to-red-600",
    textColor: "text-rose-400",
    borderColor: "border-rose-500/30",
    bgLight: "bg-rose-500/10",
    description:
      "Coreenact's proprietary institutional platform built on Microsoft Dynamics 365, unifying academic administration, student lifecycle, fees, and digital learning.",
    items: [
      {
        name: "Student Lifecycle & Admissions",
        description: "From applicant inquiry and paperless enrollment to graduation and alumni management.",
        features: ["Online Admission Portals", "Document Verification AI", "Merit & Quota Allocations", "Alumni Engagement Registry"],
      },
      {
        name: "Automated Fee & Financial Accounting",
        description: "Complex fee structures, installments, scholarship reconciliations, and direct bank payment gateway links.",
        features: ["Dynamic Fee Calculation", "Automated SMS/Email Reminders", "Direct Bank Payment Gateways", "Defaulter & Audit Reports"],
      },
      {
        name: "Academic Planning & Timetable Engine",
        description: "Intelligent scheduling for classrooms, labs, faculty allocations, and automated exam hall ticket generation.",
        features: ["Conflict-Free Timetable Generator", "Faculty Workload Balancing", "Attendance & Biometric Sync", "Gradebook & Report Cards"],
      },
      {
        name: "Integrated LMS & Student Portal",
        description: "Self-service mobile and web portals for students, parents, and teachers with assignments and attendance.",
        features: ["Parent Mobile Application", "Assignment & Quiz Submission", "Lecture Notes & Video Repository", "Microsoft Teams Classroom Integration"],
      },
    ],
  },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: "erp-consulting",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    title: "ERP Implementation & Consulting",
    subtitle: "Turnkey Microsoft Dynamics 365 Business Central & F&O Deployments",
    badge: "Flagship Service",
    iconName: "Briefcase",
    color: "from-cyan-500 to-blue-600",
    description:
      "We design, configure, and deploy Microsoft Dynamics 365 tailored to your operational realities. Our methodology balances rapid time-to-value with long-term architectural stability.",
    phases: [
      "Phase 1: Discovery, Business Process Mapping & Gap Analysis",
      "Phase 2: Solution Architecture & Custom Extensibility Design",
      "Phase 3: Agile Sprints, Configuration & Integration Build",
      "Phase 4: User Acceptance Testing (UAT) & End-User Training",
      "Phase 5: Cutover Strategy, Go-Live & Hypercare Support",
    ],
    deliverables: [
      "Target Operating Model & Process Design Documents (PDD)",
      "Configured & tested Dynamics 365 environment in Azure",
      "Validated historical data migration scripts",
      "Role-based end-user training documentation & video guides",
      "30-day post-go-live on-site and remote hypercare guarantee",
    ],
    benefits: [
      "40% faster deployment with pre-configured industry templates",
      "Elimination of manual spreadsheets across finance and supply chain",
      "Real-time visibility into inventory, order margins, and cash flow",
    ],
  },
  {
    id: "nav-migration",
    image:
      "https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=1200&q=80",
    title: "NAV to Cloud Migration",
    subtitle: "De-risk your modernization from Dynamics NAV to Business Central SaaS",
    badge: "Cloud Modernization",
    iconName: "CloudLightning",
    color: "from-purple-500 to-indigo-600",
    description:
      "Move away from obsolete on-premise servers and costly maintenance. We convert legacy C/AL customizations to modern AL extensions and cleanly migrate historical data.",
    phases: [
      "Code & Customization Audit: Identifying legacy vs out-of-the-box fit",
      "C/AL to AL Code Conversion and Extension Packaging",
      "Data Cleanse, Extraction & Cloud Staging via Azure Data Factory",
      "Mock Cutover Simulations to eliminate surprises",
      "Weekend Go-Live with zero workday operational downtime",
    ],
    deliverables: [
      "Comprehensive Migration Feasibility Assessment",
      "Refactored AL Extensions compliant with Microsoft AppSource standards",
      "Clean migrated master data, opening balances, and ledger history",
      "Cloud security hardening and Microsoft Entra ID single sign-on",
    ],
    benefits: [
      "Automatic bi-annual Microsoft feature updates without rework",
      "Zero infrastructure hosting and on-prem backup costs",
      "Anywhere access via modern web, iOS, and Android applications",
    ],
  },
  {
    id: "erp-audit",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
    title: "ERP Audit & Health Check",
    subtitle: "Independent diagnostics to uncover performance bottlenecks and security risks",
    badge: "Optimization",
    iconName: "ShieldCheck",
    color: "from-amber-500 to-rose-600",
    description:
      "Is your current ERP slow, customized into a corner, or suffering low adoption? Our independent diagnostic identifies technical debt, security loopholes, and licensing waste.",
    phases: [
      "Technical code review and index fragmentation assessment",
      "Business process adherence and user adoption interviews",
      "Integration architecture and API latency inspection",
      "License utilization and user permission audit",
      "Executive presentation with prioritized 30/60/90-day roadmap",
    ],
    deliverables: [
      "Executive ERP Health Report with Red/Amber/Green scorecards",
      "Database tuning and index optimization recommendations",
      "Remediation plan for problematic custom code",
      "Licensing cost optimization plan (average 18% savings)",
    ],
    benefits: [
      "Immediate system responsiveness improvement",
      "Uncover hidden compliance and security exposure",
      "Clear, unbiased guidance on whether to optimize or re-implement",
    ],
  },
  {
    id: "global-rollouts",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    title: "Global ERP Rollouts",
    subtitle: "Governed multi-entity deployment across regions and subsidiaries",
    badge: "Multi-Entity",
    iconName: "Globe2",
    color: "from-blue-500 to-cyan-500",
    description:
      "Scale your core Microsoft business template across multiple international entities. We establish a robust global template while respecting local accounting standards and languages.",
    phases: [
      "Global Core Template Definition (Chart of Accounts, Workflows, Reporting)",
      "Subsidiary Localization Gap Assessment",
      "Sequential Country Deployment Roadmap",
      "Centralized Intercompany & Multi-Currency Consolidation Setup",
      "24/7 Follow-the-Sun Global Hypercare",
    ],
    deliverables: [
      "Standardized Global Blueprint Document",
      "Automated intercompany transaction clearing rules",
      "Consolidated financial reporting in primary reporting currencies",
      "Local regulatory compliance pack for each subsidiary",
    ],
    benefits: [
      "Single source of truth across all international subsidiaries",
      "Drastic reduction in global month-end closing cycles",
      "Consistent operational compliance and group-level auditing",
    ],
  },
  {
    id: "india-localization",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    title: "India Localization & Tax Compliance",
    subtitle: "Complete GST, TDS, TCS, e-Invoicing & e-Way Bill Automation",
    badge: "Statutory Compliance",
    iconName: "FileCheck",
    color: "from-emerald-500 to-teal-600",
    description:
      "Operating in India requires navigating intricate tax statutes. Our specialized India practice provides deeply integrated compliance for Business Central and F&O.",
    phases: [
      "Statutory Requirement Mapping: GST, TDS, TCS, RCM & e-Invoicing",
      "Native Business Central India Localization configuration",
      "API Integration with Government e-Invoice and e-Way Bill Portals",
      "Tax reconciliation and GSTR filing workflow automation",
      "Statutory audit trail validation and compliance sign-off",
    ],
    deliverables: [
      "Direct ERP integration for IRN generation with QR codes",
      "Automated e-Way bill creation with transporter ID capture",
      "TDS/TCS deduction rules with automated Form 16/26Q outputs",
      "GSTR-1, GSTR-2B, and GSTR-3B auto-reconciliation utilities",
    ],
    benefits: [
      "Zero manual portal uploading—generate IRN and e-Way bills in 1 click",
      "100% audit readiness with zero statutory penalty exposure",
      "Automated vendor GSTIN verification preventing ITC claim loss",
    ],
  },
  {
    id: "security-governance",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    title: "Security, Governance & Compliance",
    subtitle: "Zero-trust identity, segregation of duties and audit trails",
    badge: "Cybersecurity",
    iconName: "Lock",
    color: "from-rose-500 to-orange-500",
    description:
      "Protect your core enterprise data from unauthorized access, insider fraud, and data leaks with military-grade Microsoft cloud security principles.",
    phases: [
      "Risk assessment & privileged access mapping",
      "Segregation of Duties (SoD) conflict detection and policy build",
      "Microsoft Entra ID Conditional Access & MFA enforcement",
      "Field-level data encryption and Purview compliance tagging",
      "Ongoing automated security monitoring and quarterly audits",
    ],
    deliverables: [
      "Segregation of Duties matrix and exception mitigation policy",
      "Granular Permission Sets tailored to actual employee job roles",
      "Automated Change Log tracking sensitive master record edits",
      "SOC 2, ISO 27001, and GDPR readiness gap report",
    ],
    benefits: [
      "Guaranteed prevention of unauthorized financial record alterations",
      "Frictionless single sign-on with Azure AD/Entra ID",
      "Confidence during internal and external regulatory audits",
    ],
  },
  {
    id: "managed-services",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    title: "Continuous Managed Services & Support",
    subtitle: "Dedicated SLA-driven support and continuous post-go-live evolution",
    badge: "24/7 SLA",
    iconName: "Headphones",
    color: "from-indigo-500 to-purple-600",
    description:
      "An ERP is an evolving asset. Our managed services team acts as an extension of your IT department, providing proactive monitoring, bug fixes, and continuous improvements.",
    phases: [
      "Knowledge Transition and System Baseline Documentation",
      "SLA Agreement Setup: 15-minute critical response target",
      "Ongoing ticket resolution, system monitoring, and monthly health reports",
      "Bi-annual Microsoft major wave update testing & sandbox validation",
      "Monthly architectural advisory sessions to unlock new features",
    ],
    deliverables: [
      "Dedicated Client Success Manager & named Solution Architect",
      "Enterprise ticketing portal with real-time SLA metrics",
      "Pre-release sandbox testing before Microsoft updates hit production",
      "Monthly executive review of system usage, tickets, and enhancements",
    ],
    benefits: [
      "99.9% uptime and immediate escalation paths for critical issues",
      "Stay perpetually on the latest version of Business Central",
      "Lower cost compared to hiring and retaining an in-house ERP team",
    ],
  },
  {
    id: "digital-marketing",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80",
    title: "B2B Digital Marketing & Growth Acceleration",
    subtitle: "Full-Funnel Organic SEO, High-ROAS Paid Ads & Dynamics 365 Marketing Automation",
    badge: "Revenue Growth",
    iconName: "TrendingUp",
    color: "from-blue-600 to-indigo-600",
    description:
      "Transform your digital presence into a predictable enterprise pipeline. We deliver data-driven Search Engine Optimization (SEO & GEO), precision Google & LinkedIn ad campaigns, account-based marketing (ABM), and closed-loop Dynamics 365 Customer Insights attribution.",
    phases: [
      "Phase 1: 120-Point Technical SEO, Pixel & Competitor Gap Audit",
      "Phase 2: Target ICP Architecture, High-Intent Keywords & Ad Creative Build",
      "Phase 3: Multi-Channel Launch: Google Search, LinkedIn ABM & Core Web Vitals",
      "Phase 4: CRM/ERP Closed-Loop Attribution & Lead-to-Opportunity Sync",
      "Phase 5: ROAS Scaling, Conversion Rate Optimization (CRO) & Power BI Dashboards",
    ],
    deliverables: [
      "Targeted Inbound B2B Lead Generation (MQL/SQL) Engine",
      "Technical SEO & Generative Search (GEO) Optimization Blueprint",
      "High-ROAS Google Ads, LinkedIn & Meta Ads Campaign Architecture",
      "Microsoft Dynamics 365 Customer Insights & Marketing Journey Setup",
      "Real-Time Executive Marketing ROI & CAC Dashboards in Power BI",
    ],
    benefits: [
      "Average +310% organic search traffic growth within 12 months",
      "Average 4.8x verified ROAS on enterprise paid campaigns",
      "100% closed-loop attribution tracking from first click to ERP invoice",
    ],
  },
];

export const INDUSTRIES_CATALOG: IndustryItem[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Discrete & Process Manufacturing, Shop Floor & Supply Chain",
    iconName: "Factory",
    color: "from-blue-500 to-indigo-600",
    challenges: [
      "Disconnected shop floor machines causing inaccurate production counts",
      "Difficulty managing multi-level Bill of Materials (BOM) revisions",
      "Unpredictable raw material lead times and inventory stockouts",
      "Lack of real-time machine capacity and labor cost tracking",
    ],
    solutions: [
      "Business Central discrete & process manufacturing modules with automated MRP",
      "IoT sensor integration feeding live production line status directly to ERP",
      "Dynamic routing schedules and automated machine maintenance triggers",
      "Integrated quality control check gates across raw materials and finished goods",
    ],
    d365Features: [
      "Multi-level Bill of Materials (BOM) & Version Control",
      "Material Requirements Planning (MRP) & Capacity Planning",
      "Shop Floor Execution via Mobile Barcode Terminals",
      "Subcontracting & Outside Processing Management",
    ],
    resultMetric: { label: "Production Throughput Increase", value: "+34%" },
  },
  {
    id: "fmcg",
    name: "FMCG (Fast-Moving Consumer Goods)",
    tagline: "High-Volume Distribution, Batch/Lot Expiry & Trade Schemes",
    iconName: "ShoppingBag",
    color: "from-emerald-500 to-teal-600",
    challenges: [
      "Stock spoilage due to lack of FEFO (First-Expired, First-Out) picking",
      "Complex distributor trade discounts, rebates, and secondary billing",
      "High volume of daily delivery orders with tight dispatch SLAs",
      "Fragmented visibility across regional warehouses and super-stockists",
    ],
    solutions: [
      "Automated FEFO warehouse dispatch algorithms preventing product obsolescence",
      "Configurable trade promotion management calculating discounts automatically",
      "Real-time distributor portal built on Power Pages with inventory sync",
      "AI-driven demand forecasting reducing surplus safety stock",
    ],
    d365Features: [
      "Batch, Lot & Serial Tracking with Expiry Date Enforcements",
      "Distributor Trade Rebates & Promotional Pricing Engines",
      "Automated Dispatch Planning with Route Optimization",
      "Multi-Location Inventory Balancing & Transfer Orders",
    ],
    resultMetric: { label: "Inventory Expiry Waste Cut", value: "-68%" },
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    tagline: "Omnichannel POS, Inventory Synchronization & Unified Commerce",
    iconName: "Store",
    color: "from-purple-500 to-pink-600",
    challenges: [
      "Inventory mismatches between physical retail stores and online channels",
      "Slow point-of-sale checkout speeds during peak festive rush hours",
      "Difficulty processing returns and omnichannel gift cards across channels",
      "Fragmented customer data preventing personalized loyalty promotions",
    ],
    solutions: [
      "Unified cloud inventory engine syncing physical POS, Shopify, Amazon, and Magento",
      "Offline-resilient Cloud POS with one-tap payment processing",
      "Centralized customer profile engine linking loyalty points across store and web",
      "Automated order routing to the nearest fulfillment center to reduce shipping costs",
    ],
    d365Features: [
      "Cloud Point-of-Sale (POS) with Hardware Integration",
      "Shopify & Magento Bi-Directional Connectors",
      "Unified Gift Card, Loyalty & Customer Rewards",
      "Omnichannel Buy-Online-Pick-Up-In-Store (BOPIS)",
    ],
    resultMetric: { label: "Checkout & Fulfillment Speed", value: "+45%" },
  },
  {
    id: "education",
    name: "Education & EdCore",
    tagline: "K-12, Higher Ed & University Lifecycle Management",
    iconName: "GraduationCap",
    color: "from-rose-500 to-red-600",
    challenges: [
      "Manual paper-based admission inquiries and lost student documents",
      "Tedious student fee collection, defaulter tracking, and manual receipts",
      "Complex faculty timetable scheduling and classroom clash resolution",
      "Disconnected learning systems requiring multiple logins for students & parents",
    ],
    solutions: [
      "Coreenact's EdCore platform unifying admissions, LMS, exams, and financials",
      "Online fee collection gateway with auto-receipting and SMS payment links",
      "AI timetable algorithm creating conflict-free faculty and room schedules",
      "Mobile parent portal providing live attendance, grades, and fee history",
    ],
    d365Features: [
      "EdCore Comprehensive Student Information System (SIS)",
      "Automated Installment Fee Management & Payment Gateway",
      "Conflict-Free Timetable & Exam Seating Engine",
      "Microsoft Teams for Education & LMS Integration",
    ],
    resultMetric: { label: "Fee Collection Efficiency", value: "+82%" },
  },
  {
    id: "professional-services",
    name: "Professional Services",
    tagline: "Consulting, IT Services, Legal & Engineering Project Accounting",
    iconName: "Briefcase",
    color: "from-indigo-500 to-blue-600",
    challenges: [
      "Unbilled billable hours lost to cumbersome manual timesheets",
      "Project budget overruns discovered weeks after project completion",
      "Suboptimal resource utilization and bench cost management",
      "Delayed client invoicing due to slow milestone sign-off processes",
    ],
    solutions: [
      "Integrated Job Costing and Resource Scheduling inside Business Central",
      "Mobile timesheet & expense logging with camera receipt OCR scanning",
      "Real-time project WIP (Work in Progress), milestone billing, and profitability analytics",
      "Resource allocation heatmap identifying underutilized talent",
    ],
    d365Features: [
      "Project Job Costing & Milestone Billing Automation",
      "Mobile Time & Expense Capture with Optical Character Recognition",
      "Resource Capacity Planning & Utilization Heatmaps",
      "Revenue Recognition compliant with ASC 606 / IFRS 15",
    ],
    resultMetric: { label: "Billable Utilization Gain", value: "+21%" },
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    tagline: "Job Costing, Subcontractor Management & Material Logistics",
    iconName: "HardHat",
    color: "from-amber-500 to-yellow-600",
    challenges: [
      "Material theft and unrecorded deliveries at remote construction jobsites",
      "Subcontractor billing disputes and missing compliance/insurance waivers",
      "Inability to track actual project costs against initial contractor bids",
      "Complex progress billing (AIA G702/G703) requiring manual paperwork",
    ],
    solutions: [
      "Comprehensive job budgeting tracking committed costs, purchase orders, and actuals",
      "Mobile site receipt app capturing geotagged proof of material delivery",
      "Subcontractor management module tracking retention, insurance, and lien waivers",
      "Automated percentage-of-completion progress billing generation",
    ],
    d365Features: [
      "AIA Format Progress Billing & Retention Tracking",
      "Subcontractor Agreement & Compliance Management",
      "Heavy Equipment Maintenance & Utilization Scheduling",
      "Jobsite Mobile Material Requisition & Inspection Apps",
    ],
    resultMetric: { label: "Budget Overrun Prevention", value: "95%" },
  },
  {
    id: "maritime-logistics",
    name: "Maritime & Logistics",
    tagline: "Freight Forwarding, Fleet Maintenance & Container Tracking",
    iconName: "Ship",
    color: "from-cyan-500 to-blue-600",
    challenges: [
      "Demurrage and detention fees caused by delayed customs paperwork",
      "Lack of real-time vessel and container location tracking across ports",
      "High vessel maintenance costs and unexpected port downtime",
      "Multi-currency freight rate calculations prone to calculation errors",
    ],
    solutions: [
      "Direct carrier EDI integrations providing real-time container milestone tracking",
      "Automated demurrage alerts tracking container dwell times at terminals",
      "Preventive vessel maintenance logs tracking engine hours and spare parts",
      "Multi-currency freight billing engine calculating landed costs automatically",
    ],
    d365Features: [
      "Container & Vessel Milestone Tracking via Logistics APIs",
      "Landed Cost Engine factoring customs, tariffs & demurrage",
      "Fleet Preventive Maintenance & Spare Parts Inventory",
      "Multi-Currency Automated Rate Sheets & Invoice Factoring",
    ],
    resultMetric: { label: "Demurrage Penalty Reduction", value: "-75%" },
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "Pharma Distribution, Medical Devices & FDA Compliance",
    iconName: "Stethoscope",
    color: "from-teal-500 to-emerald-600",
    challenges: [
      "Strict regulatory audits requiring electronic signatures (21 CFR Part 11)",
      "Cold chain temperature violations resulting in quarantined inventory",
      "Complicated hospital consignment stock management and reconciliation",
      "High costs associated with paper batch production records",
    ],
    solutions: [
      "Validated Dynamics 365 environment with electronic signature workflows",
      "IoT temperature sensor integration logging cold chain telemetry in real time",
      "Hospital consignment inventory module updating usage automatically via barcode",
      "End-to-end forward and backward recall traceability in under 60 seconds",
    ],
    d365Features: [
      "Electronic Signatures & Audit Trails compliant with FDA 21 CFR Part 11",
      "Cold Chain IoT Telemetry Logging & Breach Alerts",
      "Hospital Consignment Inventory & Auto-Replenishment",
      "Forward/Backward Recall Traceability Engine",
    ],
    resultMetric: { label: "Audit Preparation Time", value: "-85%" },
  },
  {
    id: "distribution",
    name: "Distribution & Wholesale",
    tagline: "Advanced Warehousing, Cross-Docking & Supplier Rebates",
    iconName: "Truck",
    color: "from-blue-600 to-sky-500",
    challenges: [
      "Inefficient warehouse travel paths causing slow order pick speeds",
      "Errors in complex vendor volume rebate calculations and claims",
      "High returns processing costs due to mispicked orders",
      "Inability to commit accurate delivery dates (ATP) to customers",
    ],
    solutions: [
      "Directed putaway and wave picking algorithms optimizing warehouse routes",
      "Automated vendor rebate tracking recording earned incentives on every PO",
      "Barcode scanning validation achieving 99.8% pick accuracy",
      "Capable-to-Promise (CTP) engine providing real-time delivery commitments",
    ],
    d365Features: [
      "Wave, Batch & Zone Directed Warehouse Picking",
      "Vendor Rebate & Incentive Claim Management",
      "Available-to-Promise (ATP) & Capable-to-Promise (CTP) Calculation",
      "Cross-Docking & Container Consolidation Planning",
    ],
    resultMetric: { label: "Warehouse Pick Accuracy", value: "99.8%" },
  },
];

export const ABOUT_COREENACT = {
  headline: "Turning Enterprise Complexity into an Intelligent Core",
  mission:
    "At Coreenact, we believe enterprise software should deliver measurable business outcomes, not just installed licenses. We help organizations modernize their operations through connected Microsoft business applications, trusted data, practical automation, and responsible AI.",
  story:
    "Founded by seasoned enterprise architects with decades of collective experience in Microsoft Dynamics and enterprise digital transformation, Coreenact was created to bridge the gap between business strategy and technology execution. Too many organizations were left with fragmented ERP silos, manual workarounds, and stalled digital initiatives. Coreenact replaces that friction with a unified, intelligent foundation built on Microsoft Dynamics 365 Business Central, Azure, Power Platform, and Agentic AI.",
  pillars: [
    {
      title: "Independent & Objective Advice",
      description:
        "We prioritize what your business genuinely needs over software vendor quotas. Our recommendations are grounded in pragmatic operational realities.",
    },
    {
      title: "Microsoft-Native Excellence",
      description:
        "As an accredited Microsoft Solutions Partner, we build within Microsoft's standard frameworks, ensuring clean upgrades, zero lock-in, and longevity.",
    },
    {
      title: "Outcome-Driven Methodology",
      description:
        "Our 5-phase delivery model ensures tight budget control, rapid milestone achievements, zero-downtime cutovers, and verifiable post-go-live ROI.",
    },
    {
      title: "AI-First Enterprise Evolution",
      description:
        "We don't stop at ERP go-live. We extend your core with Microsoft Copilot, agentic automation, and predictive analytics to maintain your competitive edge.",
    },
  ],
  methodology: [
    {
      id: "discovery-blueprint",
      phase: "Discovery & Operational Blueprint",
      description:
        "We conduct deep-dive workshops with process owners to map current pain points, identify regulatory requirements, and create the Target Operating Model (TOM).",
    },
    {
      id: "architecture-design",
      phase: "Architecture & Solution Design",
      description:
        "Our Microsoft Certified Solution Architects design the end-to-end data schemas, integration contracts, security permissions, and custom extension specs.",
    },
    {
      id: "agile-configuration",
      phase: "Agile Configuration & Sprint Builds",
      description:
        "Working in 2-week agile sprints, we configure Dynamics 365, develop modern AL extensions, build Power Automate flows, and connect peripheral systems.",
    },
    {
      id: "data-migration",
      phase: "Data Migration & Validation Testing",
      description:
        "We execute multi-stage mock data cutovers, test automated scripts, conduct rigorous User Acceptance Testing (UAT), and run end-user training bootcamps.",
    },
    {
      id: "cutover-evolution",
      phase: "Cutover, Go-Live & Continuous Evolution",
      description:
        "We manage the weekend cutover with zero workday disruption, provide 30-day on-site and remote hypercare, and transition into continuous SLA-backed managed support.",
    },
  ],
};
