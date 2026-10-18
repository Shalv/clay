import { SolutionItem, CaseStudy } from "../types";

export const SOLUTIONS: SolutionItem[] = [
  {
    id: "d365-fo",
    title: "Dynamics 365 Business Central",
    tagline: "Global ERP Modernization & Intelligent Supply Chain",
    badge: "Enterprise ERP",
    color: "from-blue-500 to-indigo-600",
    accentGradient: "linear-gradient(135deg, #0078D4 0%, #4F46E5 100%)",
    iconName: "Layers",
    description:
      "Unify multinational financial operations, automate manufacturing schedules, and build resilient, predictive supply chains with Microsoft's flagship enterprise ERP.",
    capabilities: [
      "Autonomous financial reconciliation & AI ledger closing",
      "Warehouse management with computer vision & IoT",
      "Demand forecasting powered by Azure Synapse AI",
      "Multi-currency, multi-entity compliance & SOX governance",
    ],
    metrics: { label: "Average Cycle Time Reduction", value: "62%" },
    microsoftStack: ["D365 Finance", "D365 Supply Chain", "Azure Data Lake", "Power BI"],
  },
  {
    id: "copilot-agents",
    title: "Microsoft Copilot & Custom AI Agents",
    tagline: "Autonomous Workflow Orchestration for ERP & CRM",
    badge: "Generative AI",
    color: "from-purple-500 to-pink-500",
    accentGradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    iconName: "Bot",
    description:
      "Transform human productivity by embedding autonomous AI agents directly into Business Central, F&O, Teams, and customer engagement channels using Copilot Studio.",
    capabilities: [
      "Custom Copilot Studio agents with enterprise guardrails",
      "Zero-code natural language querying for complex ERP tables",
      "Sales Copilot meeting summarization and auto-CRM updates",
      "Autonomous customer service resolution bots with high accuracy",
    ],
    metrics: { label: "Employee Productivity Boost", value: "3.4x" },
    microsoftStack: ["Copilot Studio", "Azure OpenAI", "Semantic Kernel", "Teams Bot Framework"],
  },
  {
    id: "business-central",
    title: "Dynamics 365 Business Central",
    tagline: "All-In-One Cloud ERP for Fast-Growing Enterprises",
    badge: "Mid-Market Leader",
    color: "from-cyan-500 to-teal-500",
    accentGradient: "linear-gradient(135deg, #06B6D4 0%, #10B981 100%)",
    iconName: "Briefcase",
    description:
      "Streamline sales, procurement, inventory, and bookkeeping with rapid deployment, intuitive workflows, and seamless Microsoft 365 integration.",
    capabilities: [
      "Seamless Outlook quote-to-cash workflow automation",
      "Real-time inventory levels with automated replenishment alerts",
      "Integrated job costing and project management",
      "Over 4,000+ AppSource industry extension integrations",
    ],
    metrics: { label: "Faster Implementation Speed", value: "45 Days" },
    microsoftStack: ["Business Central", "Outlook Connector", "Excel Add-in", "Power Automate"],
  },
  {
    id: "power-platform",
    title: "Power Platform Center of Excellence",
    tagline: "Hyper-Automation, RPA & Low-Code Innovation",
    badge: "Hyper-Automation",
    color: "from-amber-500 to-rose-500",
    accentGradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    iconName: "Zap",
    description:
      "Empower both professional developers and citizen innovators to eliminate manual bottlenecks with Power Apps, Power Automate RPA, and Power Pages.",
    capabilities: [
      "Unattended desktop & cloud robotic process automation (RPA)",
      "Mobile field apps with offline data synchronization",
      "Enterprise CoE governance, DLP policies, and ALM pipelines",
      "External partner portals built securely on Power Pages",
    ],
    metrics: { label: "Hours Saved Annually Per Client", value: "14,500+" },
    microsoftStack: ["Power Apps", "Power Automate Desktop", "Power Pages", "Dataverse"],
  },
  {
    id: "azure-fabric",
    title: "Azure Cloud & Microsoft Fabric",
    tagline: "Unified Analytics, Lakehouse & Zero-Trust Cloud",
    badge: "Cloud & Data",
    color: "from-sky-500 to-blue-600",
    accentGradient: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
    iconName: "Cloud",
    description:
      "Consolidate fragmented data silos into a modern Microsoft Fabric lakehouse, enabling real-time executive decisioning and military-grade cloud security.",
    capabilities: [
      "Zero-downtime database migration from on-prem to Azure",
      "OneLake unified enterprise data architecture",
      "Power BI DirectLake real-time dashboards for executives",
      "Zero-Trust Defender, Entra ID, and Purview governance",
    ],
    metrics: { label: "Data Pipeline Query Speedup", value: "10x" },
    microsoftStack: ["Microsoft Fabric", "Azure Synapse", "OneLake", "Power BI Embedded"],
  },
  {
    id: "crm-customer-insights",
    title: "D365 Customer Insights & Sales",
    tagline: "Predictive Omnichannel Engagement & B2B Pipeline",
    badge: "Customer Experience",
    color: "from-emerald-500 to-cyan-600",
    accentGradient: "linear-gradient(135deg, #10B981 0%, #0891B2 100%)",
    iconName: "Users",
    description:
      "Gain a 360-degree unified view of client accounts, trigger behavioral nurturing flows, and forecast deal closures with predictive AI intelligence.",
    capabilities: [
      "Unified customer 360 profiles across POS, web, and ERP",
      "AI deal scoring and next-best-action recommendations",
      "Seamless LinkedIn Sales Navigator synchronization",
      "Automated marketing journeys with real-time churn alerts",
    ],
    metrics: { label: "Pipeline Conversion Lift", value: "+38%" },
    microsoftStack: ["D365 Sales", "Customer Insights", "LinkedIn Integration", "Azure AI"],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "logistics-global",
    client: "Apex Freight Global",
    industry: "Transportation & Global Supply Chain",
    headline: "Global Migration from Legacy SAP to Dynamics 365 F&O Across 18 Countries",
    challenge:
      "Legacy on-premise SAP ECC 6.0 created disconnected silos across European, Asian, and American distribution hubs, costing $4.2M annually in maintenance.",
    solution:
      "Coreenact designed a phased zero-downtime cutover to Dynamics 365 Supply Chain with custom Copilot dispatch agents and automated Power BI rate analytics.",
    outcome:
      "Cut dispatch latency by 74%, unified inventory visibility across 42 fulfillment warehouses, and delivered full ROI within 11 months.",
    stats: [
      { label: "Cost Savings", value: "$6.8M", color: "text-cyan-400" },
      { label: "Dispatch Speed", value: "+74%", color: "text-emerald-400" },
      { label: "Cutover Downtime", value: "0 hrs", color: "text-purple-400" },
    ],
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "medtech-retail",
    client: "Novacure Medical Systems",
    industry: "Healthcare & Life Sciences",
    headline: "Automating FDA-Compliant Field Service with D365 & Power Platform",
    challenge:
      "High-value hospital imaging equipment required strict compliance tracking. Paper-based field service caused SLA penalties and delayed repairs.",
    solution:
      "Deployed Dynamics 365 Field Service connected to Azure IoT telemetry, enabling predictive dispatch before equipment failure occurs.",
    outcome:
      "Reduced emergency hospital machine downtime by 52% and achieved 100% electronic audit trail readiness for FDA inspectors.",
    stats: [
      { label: "Downtime Prevented", value: "52%", color: "text-emerald-400" },
      { label: "First-Time Fix Rate", value: "94.6%", color: "text-cyan-400" },
      { label: "Audit Prep Time", value: "-85%", color: "text-amber-400" },
    ],
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "fintech-enterprise",
    client: "Vanguard Asset Partners",
    industry: "Wealth Management & Private Equity",
    headline: "Deploying Copilot Studio Autonomous Agents for Deal Flow Intelligence",
    challenge:
      "Investment analysts spent 30+ hours weekly manually extracting data from 200-page fund memorandums into CRM accounts.",
    solution:
      "Built custom Coreenact Copilot agents using Azure OpenAI & Dataverse that instantly extract financial tables, risk factors, and valuation metrics.",
    outcome:
      "Saved 22 hours per analyst per week, accelerated pipeline reviews by 4.5x, and eliminated data transcription discrepancies.",
    stats: [
      { label: "Analyst Time Saved", value: "22 hrs/wk", color: "text-purple-400" },
      { label: "Review Velocity", value: "4.5x", color: "text-cyan-400" },
      { label: "Compliance Rate", value: "99.9%", color: "text-blue-400" },
    ],
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
];

export const GLOBAL_OFFICES = [
  {
    city: "Haryana",
    country: "India (Engineering & CoE)",
    address: "123-1st Floor, SRS CORPORATE TOWER, NH-19, Sector 31, Faridabad, Haryana 121003",
    coords: { lat: 28.4447, lng: 77.3119 },
    specialty: "Global ERP Engineering, India GST Localization & Continuous Managed Services",
  },
  {
    city: "Mississauga / Toronto",
    country: "Canada (Americas)",
    address: "4255 Sherwoodtowne Blvd, Ste 300, Mississauga, ON L4Z 1Y5, Canada",
    coords: { lat: 43.5988, lng: -79.6441 },
    specialty: "North America Enterprise Consulting, Cloud Migration & Architecture Advisory",
  },
];
