export interface AddonItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  bcIntegration: string;
  category: string;
}

export const ADDONS_LIST: AddonItem[] = [
  {
    id: "vendor-customer-portal",
    name: "Vendor & Customer Portal",
    tagline: "Secure 24/7 Self-Service Web Portals Connected with Business Central",
    description:
      "Empower suppliers and customers with real-time web portals directly integrated with Microsoft Dynamics 365 Business Central. Vendors can view purchase orders, submit delivery notes, upload tax invoices, and reconcile ledgers. Customers can browse catalogs, place orders, download invoices, track dispatches, and log support tickets.",
    benefits: [
      "Zero manual data entry for vendor invoices & order confirmations",
      "Real-time customer order tracking and online statement downloads",
      "Automated ledger balance and reconciliation dispute logging",
      "Role-based secure access with multi-factor authentication",
    ],
    bcIntegration: "Two-way OData/API sync with D365 BC Purchase & Sales modules",
    category: "Portal & Collaboration",
  },
  {
    id: "hrms-portal",
    name: "HRMS Portal",
    tagline: "Complete Employee Lifecycle, Biometric Attendance & Payroll for BC",
    description:
      "A comprehensive Human Resource Management System portal seamlessly connected to D365 Business Central. Handles employee self-service (ESS), biometric attendance, leave approvals, automated Indian statutory payroll (PF, ESI, PT, TDS), loan management, and appraisal cycles.",
    benefits: [
      "Self-service portal for leave applications and payslip downloads",
      "Automated biometric attendance sync with payroll ledger",
      "Statutory compliance for Indian payroll (PF, ESI, PT, TDS)",
      "Direct General Ledger (GL) posting into Business Central payroll journals",
    ],
    bcIntegration: "Direct posting to Business Central General Ledger & Bank Accounts",
    category: "Human Capital",
  },
  {
    id: "visitor-management-app",
    name: "Visitor Management App",
    tagline: "Digital Gate Pass, Visitor Check-in & Security Protocol Automation",
    description:
      "Replace manual physical registers with an enterprise tablet & mobile visitor management app. Capture visitor photos, scan ID proofs, alert employee hosts via SMS/WhatsApp, print digital visitor badges with QR codes, and maintain compliance audit trails.",
    benefits: [
      "Instant host notification via WhatsApp & Email upon guest arrival",
      "Pre-registration links for scheduled contractor & visitor visits",
      "QR-enabled instant check-in/out and digital badge printing",
      "Evacuation roll-call and visitor audit reports for facility security",
    ],
    bcIntegration: "Linked to Business Central employee master and facility locations",
    category: "Security & Facilities",
  },
  {
    id: "qr-bar-code",
    name: "QR & BAR Code",
    tagline: "High-Speed Barcode & 2D QR Generation and Warehouse Scanning for BC",
    description:
      "Enable end-to-end barcode and QR code automation across your warehouses, production lines, and retail counters. Print 1D/2D GS1 barcodes directly from Business Central reports and use handheld Android scanners for real-time inventory movements.",
    benefits: [
      "Instant QR and Barcode printing on item labels and shipping manifests",
      "Error-free bin-to-bin transfers, pick/pack verification, and physical counts",
      "Support for serial and lot tracking with expiration date validation",
      "Compatible with Zebra, Honeywell, and Android mobile computers",
    ],
    bcIntegration: "Native integration with Business Central Item, Lot & Warehouse tracking",
    category: "Supply Chain & Warehouse",
  },
  {
    id: "signing-pad-handwritten",
    name: "Signing Pad / Handwritten",
    tagline: "Electronic Handwritten Signature Capture for Proof of Delivery & Contracts",
    description:
      "Capture handwritten digital signatures on tablets, touchscreens, or dedicated signature pads during delivery, inspection, or agreement sign-offs. Signatures are timestamped, geo-tagged, and embedded directly into Business Central PDF invoices and POD documents.",
    benefits: [
      "Paperless proof-of-delivery (POD) with instant customer sign-off",
      "Automated PDF generation with embedded cryptographic timestamp",
      "Field service sign-off on mobile devices during job completion",
      "Reduces invoice dispute cycles and speeds up cash collection",
    ],
    bcIntegration: "Stored as attachments in Business Central Sales Invoice & Delivery records",
    category: "Digital Signature & POD",
  },
  {
    id: "in-app-approval-system",
    name: "In App Approval System",
    tagline: "Dynamic Multi-Tier Workflow & Approval Engine within Business Central",
    description:
      "Upgrade beyond standard approval limits with custom visual multi-tier approval matrixes. Route approvals based on department, dimension, budget limits, or line-item margins, with instant mobile push notifications and one-click approvals.",
    benefits: [
      "Configurable hierarchy for POs, Credit Memos, and Payment Journals",
      "Approve or reject on-the-go via mobile app, email, or Microsoft Teams",
      "Delegation rules and out-of-office automated rerouting",
      "Complete immutable audit log of approval history for SOX and ISO audits",
    ],
    bcIntegration: "Native Business Central AL extension with workflow engine hooks",
    category: "Workflow & Governance",
  },
  {
    id: "whatsapp-shopify-integration",
    name: "Whatsapp & Shopify Integration with BC",
    tagline: "Automated WhatsApp Notifications & Real-Time Shopify Omnichannel Sync",
    description:
      "Connect your D365 Business Central ERP directly to WhatsApp Business API and Shopify stores. Automatically send order confirmations, dispatch tracking, and invoice PDFs on WhatsApp; synchronize Shopify inventory, orders, customer details, and price books in real time.",
    benefits: [
      "Automated WhatsApp messages with PDF invoices and dispatch tracking links",
      "Real-time bidirectional inventory sync preventing stockouts on Shopify",
      "Automated Shopify order import into Business Central sales orders",
      "Support for multi-store Shopify configurations and global currencies",
    ],
    bcIntegration: "Real-time webhook and REST API sync with Business Central Web Services",
    category: "Omnichannel & Messaging",
  },
  {
    id: "digital-class-3-2-signature",
    name: "Digital Class – 3 & 2 Signature",
    tagline: "PKI DSC Digital Signature Integration for Tax Invoices & Statutory Filings",
    description:
      "Bulk sign outgoing GST tax invoices, Form 16s, purchase orders, and audit documents using Class 3 or Class 2 USB Token / HSM Digital Signature Certificates (DSC) directly from within Microsoft Dynamics 365 Business Central.",
    benefits: [
      "Bulk automated signing of hundreds of GST tax invoices in seconds",
      "Compliant with Indian IT Act 2000 and GST statutory signing rules",
      "Supports USB tokens, ePass, mToken, and cloud HSM signing keys",
      "Visual digital signature seal placed automatically on custom invoice layouts",
    ],
    bcIntegration: "Direct integration with Business Central report rendering and PDF generation",
    category: "Compliance & Security",
  },
  {
    id: "e-invoices-eway-bills",
    name: "E-Invoices & E-way Bills",
    tagline: "Automated Indian GST NIC Portal Integration for IRN, QR Code & E-way Bills",
    description:
      "Direct real-time API integration with the Government National Informatics Centre (NIC) / GSP portal. Generate E-invoices with official IRN (Invoice Reference Number) and signed QR code, plus automated E-way bill generation with Part A & Part B vehicle updates directly inside Business Central.",
    benefits: [
      "One-click IRN generation directly from posted sales and transfer shipments",
      "Automatic generation and cancellation of E-way bills without visiting NIC portal",
      "Consolidated E-way bill generation and distance auto-calculation",
      "100% compliant with latest GST e-invoicing mandates and validation rules",
    ],
    bcIntegration: "Direct GSP / GSTN API connection built inside Business Central AL code",
    category: "GST & Tax Localization",
  },
];
