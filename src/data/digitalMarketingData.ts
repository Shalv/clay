export interface MarketingService {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  accentColor: string;
  image: string;
  description: string;
  keyFeatures: string[];
  deliverables: string[];
  kpis: { metric: string; label: string };
  tools: string[];
}

export interface MarketingCaseResult {
  id: string;
  clientIndustry: string;
  region: string;
  title: string;
  challenge: string;
  strategy: string;
  metrics: Array<{ label: string; value: string }>;
}

export const DIGITAL_MARKETING_SERVICES: MarketingService[] = [
  {
    id: "seo-geo",
    title: "Search Engine Optimization (SEO & GEO)",
    subtitle: "Technical SEO, Core Web Vitals, Commercial Intent Dominance & Generative Search Visibility",
    badge: "Organic Growth",
    icon: "Search",
    accentColor: "from-blue-600 to-cyan-600",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=1200&q=80",
    description:
      "Dominate search results across Google, Bing, and new AI-powered search engines (Perplexity, ChatGPT Search, Google Gemini). We build high-converting organic engines powered by deep technical health, high-intent keyword clustering, and authoritative digital PR.",
    keyFeatures: [
      "Technical Site Architecture & Crawl Budget Optimization",
      "Generative Engine Optimization (GEO) for AI citations",
      "High-Intent Commercial & Transactional Keyword Mapping",
      "Enterprise Schema Markup & Rich Snippet Engineering",
      "Core Web Vitals & Page Speed Acceleration (Sub-1.2s LCP)",
      "High-Domain Authority (DA 60+) Backlink Outreach & Digital PR",
    ],
    deliverables: [
      "Full 120-Point Technical SEO Audit & Code-Fix Roadmap",
      "Target Keyword Opportunity Matrix (Volume vs. Difficulty)",
      "Monthly On-Page & Technical Health Scorecard",
      "Weekly Keyword Rank Tracking & Competitor Gap Analysis",
      "Quarterly Content Strategy & Topical Authority Clusters",
    ],
    kpis: { metric: "+310%", label: "Average Organic Traffic Growth (12 Mo)" },
    tools: ["Ahrefs", "Semrush", "Screaming Frog", "Google Search Console", "Google Analytics 4"],
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing & Paid Media",
    subtitle: "High-ROAS Google Ads, LinkedIn B2B Campaigns & Precision Meta Retargeting",
    badge: "Paid Acquisition",
    icon: "TrendingUp",
    accentColor: "from-emerald-600 to-teal-600",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80",
    description:
      "Maximize return on ad spend (ROAS) through tightly targeted paid campaigns. From Google Search capturing bottom-of-funnel buyers to LinkedIn Ads targeting verified C-level executives in India, North America, and the Middle East.",
    keyFeatures: [
      "Google Search, Performance Max & YouTube Video Ads",
      "LinkedIn Sponsored Content & Account-Targeted InMail Ads",
      "Meta Ads (Facebook & Instagram) High-Intent Conversion Funnels",
      "Real-Time Click-Fraud Detection & Negative Keyword Sculpting",
      "Custom High-Converting Landing Page Design with A/B Testing",
      "Server-Side Conversion API (CAPI) & Enhanced Tracking Setup",
    ],
    deliverables: [
      "Target Audience Segmentation & Demographic Blueprints",
      "High-Converting Ad Creatives & Copywriting Variations",
      "Dedicated Custom Landing Pages Optimized for Conversions",
      "Real-Time Performance Dashboard with Live ROAS & CPL",
      "Bi-Weekly Budget Re-Allocation & Bid Optimization Reports",
    ],
    kpis: { metric: "4.8x", label: "Average B2B Campaign ROAS Delivered" },
    tools: ["Google Ads", "LinkedIn Campaign Manager", "Meta Ads Manager", "Microsoft Advertising", "Optmyzr"],
  },
  {
    id: "abm-inbound",
    title: "Account-Based Marketing (ABM) & B2B Leads",
    subtitle: "High-Ticket Enterprise Client Acquisition & Target Account Orchestration",
    badge: "Enterprise Pipeline",
    icon: "Target",
    accentColor: "from-purple-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Win high-value enterprise accounts with tailored 1:1 and 1:few ABM programs. We identify your Ideal Customer Profile (ICP), map out key buying committees, and coordinate hyper-personalized outreach across digital touchpoints.",
    keyFeatures: [
      "Ideal Customer Profile (ICP) & Target Account List (TAL) Curation",
      "Buying Committee Persona Mapping (CXO, VP, IT Director, CFO)",
      "Multi-Touch Account Orchestration (Ads, Direct Mail, Email)",
      "Personalized Content Hubs & Dynamic Executive Decks",
      "Seamless Hand-off to Sales & SDR Qualification Workflows",
      "CRM Pipeline Velocity & Opportunity Acceleration Tracking",
    ],
    deliverables: [
      "Validated Target Account Directory (500–5,000 Verified Accounts)",
      "Customized ABM Collateral for Specific Enterprise Verticals",
      "Automated Multi-Channel Outreach Playbooks for Sales Teams",
      "Weekly Pipeline Review & Account Engagement Heatmap",
      "Account-Level Revenue Attribution Reports",
    ],
    kpis: { metric: "68%", label: "Target Account Engagement Rate" },
    tools: ["Dynamics 365 Sales", "HubSpot ABM", "Apollo.io", "LinkedIn Sales Navigator", "ZoomInfo"],
  },
  {
    id: "content-thought-leadership",
    title: "Content Marketing & Thought Leadership",
    subtitle: "Authoritative Whitepapers, Enterprise Case Studies & CXO Ghostwriting",
    badge: "Brand Authority",
    icon: "FileText",
    accentColor: "from-amber-600 to-orange-600",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Build undeniable authority in your market. We craft technical whitepapers, comprehensive industry benchmark studies, and executive LinkedIn thought leadership that positions your leadership team as true industry pioneers.",
    keyFeatures: [
      "Comprehensive Industry Whitepapers & Research Reports",
      "Founder & CXO LinkedIn Ghostwriting and Narrative Design",
      "Customer Success Journalism & Deep-Dive Case Studies",
      "Technical Blog Clusters Engineered for Organic Search Intent",
      "High-Impact Sales Decks, Product One-Pagers & Brochures",
      "Interactive Calculators, Diagnostic Quizzes & Lead Magnets",
    ],
    deliverables: [
      "Quarterly Editorial Calendar & Topical Authority Map",
      "2-4 Long-Form Technical Whitepapers / Ebooks Per Quarter",
      "Weekly Executive LinkedIn Articles & Engagement Management",
      "Professionally Formatted PDF Downloads & Sales Enablement Sheets",
      "Plagiarism-Free, Fact-Checked, Domain-Expert Written Assets",
    ],
    kpis: { metric: "3.4x", label: "Higher Lead-to-Meeting Conversion Rate" },
    tools: ["Notion", "Figma", "Grammarly Business", "Canva Pro", "Typeform"],
  },
  {
    id: "social-branding",
    title: "Social Media Management & Brand Positioning",
    subtitle: "Omnichannel B2B Social Presence, Visual Guidelines & Employer Branding",
    badge: "Brand Visibility",
    icon: "Share2",
    accentColor: "from-rose-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Transform your corporate social media from an afterthought into a powerful brand engine. We manage end-to-end design, copywriting, video shorts, and community engagement across LinkedIn, YouTube, and Twitter/X.",
    keyFeatures: [
      "Complete Brand Visual Identity & Social Design Language",
      "Consistent 3-5x Weekly Publishing Schedule on Key Channels",
      "B2B Explainer Videos, Carousels & Infographics",
      "Employee Advocacy Programs to Multiply Organic Reach",
      "Active Community & Inbound Direct Message Management",
      "Executive Profiling for Recruitment & Employer Branding",
    ],
    deliverables: [
      "Custom Brand Style Guide & Social Component Templates",
      "30+ Branded Multi-Format Assets Prepared Monthly",
      "Monthly Content Review Call & Engagement Diagnostic",
      "Crisis Management & Brand Sentiment Monitoring Protocol",
      "Quarterly Competitor Share of Voice (SOV) Analysis",
    ],
    kpis: { metric: "+240%", label: "Average Brand Impressions Growth" },
    tools: ["Buffer", "Sprout Social", "Adobe Illustrator", "CapCut Pro", "LinkedIn Elevate"],
  },
  {
    id: "marketing-automation",
    title: "Marketing Automation, CRM & Analytics",
    subtitle: "Dynamics 365 Customer Insights, HubSpot Journeys & Real-Time Power BI Dashboards",
    badge: "MarTech & Data",
    icon: "Cpu",
    accentColor: "from-cyan-600 to-blue-700",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Eliminate lead leakage by bridging your marketing engine with your ERP/CRM core. We design automated lead nurture flows in Microsoft Dynamics 365 Customer Insights or HubSpot, track closed-loop revenue, and deliver Power BI dashboards.",
    keyFeatures: [
      "Dynamics 365 Marketing & Customer Insights Automated Journeys",
      "HubSpot & Salesforce Marketing Cloud Architecture Setup",
      "Closed-Loop Revenue Attribution from First Click to Invoice",
      "Google Tag Manager (GTM) Server-Side Tagging & Event Tracking",
      "Automated Lead Scoring, Routing & Sales Stage Triggers",
      "Executive Marketing ROI Dashboards in Microsoft Power BI",
    ],
    deliverables: [
      "Full MarTech Stack Architecture & Data Flow Map",
      "Configured Lead Scoring & Lifecycle Stage Rules",
      "Custom Power BI Dashboard with Real-Time CAC & Pipeline Metrics",
      "Automated Email Drip Sequences for Inactive Leads",
      "GDPR / Indian DPDP Act Compliant Privacy & Opt-In Architecture",
    ],
    kpis: { metric: "100%", label: "Closed-Loop Revenue Tracking Accuracy" },
    tools: ["Dynamics 365 Customer Insights", "Power BI", "HubSpot", "Google Tag Manager", "Zapier"],
  },
];

export const MARKETING_CASE_RESULTS: MarketingCaseResult[] = [
  {
    id: "mfg-leads",
    clientIndustry: "Precision Industrial Manufacturing",
    region: "Delhi NCR, India",
    title: "Industrial Exporter Scales Global High-Value RFQs via Google Ads & ABM",
    challenge:
      "A Tier-1 automotive component manufacturer relied solely on trade exhibitions and had zero digital inbound leads from North American and European OEMs.",
    strategy:
      "Deployed international Google Search campaigns targeting high-intent industrial keywords, built custom technical landing pages with 3D product specs, and executed targeted LinkedIn ABM aimed at automotive procurement directors.",
    metrics: [
      { label: "Increase in Qualified RFQs", value: "+380%" },
      { label: "Cost Per Acquisition", value: "-45%" },
      { label: "New Pipeline Generated", value: "$6.2M" },
    ],
  },
  {
    id: "saas-seo",
    clientIndustry: "Enterprise Cloud Software",
    region: "Bangalore & Toronto",
    title: "B2B SaaS Achieves Page 1 Dominance for High-Ticket ERP Software Keywords",
    challenge:
      "A high-growth B2B fintech platform was burning budget on low-converting ads without ranking organically for their primary commercial software categories.",
    strategy:
      "Executed a 9-month programmatic SEO and topical cluster strategy, fixed site speed to achieve 98/100 Core Web Vitals, and published 24 authoritative research whitepapers with Tier-1 backlinks.",
    metrics: [
      { label: "Organic Search Growth", value: "+520%" },
      { label: "Keywords in Top 3", value: "94+" },
      { label: "Blended CAC Reduction", value: "32%" },
    ],
  },
  {
    id: "healthcare-abm",
    clientIndustry: "Diagnostics & Medical Equipment",
    region: "Mumbai & Dubai",
    title: "Healthcare Equipment Brand Scales Hospital Procurement Sales via Omni-Channel Funnels",
    challenge:
      "Hospital procurement cycles were exceeding 14 months, with high sales rep overhead and low conversion on initial sales pitches.",
    strategy:
      "Created an omnichannel nurture system with Dynamics 365 Marketing, retargeting hospital CXOs with clinical validation studies and automated email journeys triggered by procurement tender dates.",
    metrics: [
      { label: "Sales Cycle Shortening", value: "40 Days" },
      { label: "Demo Booking Rate", value: "+210%" },
      { label: "Influenced Hospital Deals", value: "₹18.4 Cr" },
    ],
  },
];

export const MARKETING_TECH_STACK = [
  { name: "Google Ads", category: "Paid Search & Performance", badge: "Google Partner" },
  { name: "LinkedIn Ads", category: "B2B Account-Based Marketing", badge: "Certified" },
  { name: "Microsoft Dynamics 365 Marketing", category: "Enterprise Automation", badge: "Gold Competency" },
  { name: "Google Analytics 4 (GA4)", category: "Advanced Analytics", badge: "Verified" },
  { name: "Microsoft Power BI", category: "Revenue Dashboards", badge: "Enterprise" },
  { name: "Semrush / Ahrefs", category: "SEO & Competitive Intel", badge: "Pro Stack" },
  { name: "HubSpot", category: "Inbound & CRM Workflows", badge: "Platform Partner" },
  { name: "Meta Business Suite", category: "Paid Social & Retargeting", badge: "Meta Partner" },
];

export const MARKETING_SPRINT_STEPS = [
  {
    id: "audit-blueprint",
    phase: "Audit & ICP Blueprint",
    duration: "Days 1 – 15",
    focus: "Discovery, Competitor Intel & Technical Health",
    bullets: [
      "120-point technical SEO & tracking health diagnostic",
      "Historical ad account audit & wasted-spend identification",
      "Target audience definition & ICP buyer persona workshop",
      "Competitor keyword gap and paid ad creative analysis",
    ],
  },
  {
    id: "infrastructure-foundation",
    phase: "Infrastructure & Tracking Foundation",
    duration: "Days 16 – 30",
    focus: "Conversion Tracking & High-Converting Assets",
    bullets: [
      "Server-side GA4, GTM tags & conversion API deployment",
      "CRM/ERP lead flow synchronization (Dynamics 365 / HubSpot)",
      "High-converting landing page creation with interactive forms",
      "Comprehensive ad copy & visual creative library production",
    ],
  },
  {
    id: "campaign-launch",
    phase: "Campaign Launch & Multi-Channel Testing",
    duration: "Days 31 – 60",
    focus: "High-Intent Acquisition & Continuous A/B Splits",
    bullets: [
      "Launch Google Search commercial intent campaigns",
      "Initiate LinkedIn ABM outreach to Tier-1 Target Accounts",
      "Publish first pillar content cluster & technical whitepaper",
      "Real-time bid management, search term sculpting & fraud protection",
    ],
  },
  {
    id: "scale-optimization",
    phase: "Scale, Optimization & Pipeline Attribution",
    duration: "Days 61 – 90+",
    focus: "ROAS Maximization & Closed-Loop Growth",
    bullets: [
      "Scale winning ad sets while trimming underperforming ad spend",
      "Deploy automated re-engagement workflows for stalled deals",
      "Executive Power BI marketing ROI dashboard live sync",
      "Quarterly strategy roadmap review with senior growth director",
    ],
  },
];
