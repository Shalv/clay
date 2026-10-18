import React from "react";
import {
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Building,
  Globe,
  Lock,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { COREENACT_CONTACT } from "../data/coreenactData";

interface PrivacyPolicyPageProps {
  onOpenContact?: () => void;
}

const EFFECTIVE_DATE = "October 16, 2026";
const LAST_UPDATED = "October 16, 2026";

/**
 * Every fact below is traceable to this codebase rather than to a template: the
 * form fields come from ContactPage/ContactModal, the storage keys from
 * ThemeContext and WhatsAppLiveChatWidget, and the named processors from
 * server.ts and vercel.json. Where the site genuinely does not do something a
 * typical policy claims - no analytics, no advertising cookies, no cookie
 * banner, no newsletter signup - the text says so instead of covering it up.
 */
type Block =
  | { kind: "p"; node: React.ReactNode }
  | { kind: "list"; items: React.ReactNode[] }
  | { kind: "sub"; title: string; node?: React.ReactNode; items?: React.ReactNode[] };

interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

const SECTIONS: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            Coreenact Solutions Pvt. Ltd. (&ldquo;Coreenact,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed
            to protecting the personal information you share with us.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            This Privacy Policy explains how we collect, use, store, disclose and protect
            your information when you visit our website at{" "}
            <a
              href="https://www.coreenact.com/"
              className="text-[#005a9e] dark:text-sky-400 font-semibold hover:underline"
            >
              https://www.coreenact.com/
            </a>
            , contact us, request a demonstration, inquire about our services, use the
            on-site live chat, or otherwise interact with us.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            By using our website, you acknowledge that you have read this Privacy Policy.
            Where consent is required by applicable law, we will obtain your consent before
            processing your personal information.
          </>
        ),
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    blocks: [
      {
        kind: "sub",
        title: "Information you give us",
        node: (
          <>
            We collect only what each channel on this website actually asks for. Our
            enquiry form on the contact page collects your full name, business email
            address, company name, the solution area you are interested in, your preferred
            Coreenact hub and any project notes you choose to include. The consultation
            pop-up used elsewhere on the site asks for the same details plus your phone
            number and your target implementation timeframe.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            If you start a live chat with us, we additionally ask for your name and phone
            number so a consultant can reply to you. Your messages are held in a chat
            session on our own server, acknowledged automatically by a set of prepared
            replies written by our team, and emailed to a consultant, who may continue the
            conversation with you on WhatsApp.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            We do not ask for, and do not collect, a job title, government identifier,
            payment card details or any other sensitive personal data through this
            website.
          </>
        ),
      },
      {
        kind: "sub",
        title: "Business and service information",
        node: (
          <>
            If you inquire about our services, request a product demonstration or engage
            our team, we may collect information relating to your business requirements,
            current systems, technology needs, preferred solutions and your communications
            with us.
          </>
        ),
      },
      {
        kind: "sub",
        title: "Technical and usage information",
        node: (
          <>
            This website does not use analytics platforms, advertising pixels or
            cross-site tracking scripts. However, our hosting infrastructure automatically
            records standard request metadata, which may include:
          </>
        ),
      },
      {
        kind: "list",
        items: [
          "IP address of the requesting device",
          "Browser type and version, device and operating system",
          "Pages and files requested, and the time of the request",
          "Referring website or source",
          "Diagnostic and error information from our servers",
        ],
      },
      {
        kind: "p",
        node: (
          <>
            This information is used to keep the site running, to diagnose failures and to
            defend against abuse, not to build behavioural profiles of visitors.
          </>
        ),
      },
      {
        kind: "sub",
        title: "Browser storage and cookies",
        node: (
          <>
            The site does not set first-party cookies and does not display a cookie consent
            banner, because it has nothing to consent to. It does store a small amount of
            information in your browser&rsquo;s local storage so that your experience works:
          </>
        ),
      },
      {
        kind: "list",
        items: [
          <>
            <strong className="font-bold">Your theme preference</strong> &mdash; whether
            you chose the light or dark appearance.
          </>,
          <>
            <strong className="font-bold">Live chat identifiers</strong> &mdash; a session
            reference, and the name and phone number you enter, so that an open
            conversation is not lost when the page reloads.
          </>,
        ],
      },
      {
        kind: "p",
        node: (
          <>
            Third-party services embedded on our pages, such as the Google Maps view on our
            contact page, may set their own cookies or use similar technologies under their
            own policies. Clearing your browser storage or blocking cookies in your browser
            settings will remove the entries above; doing so may affect site
            functionality, but no part of this website depends on tracking.
          </>
        ),
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    blocks: [
      {
        kind: "p",
        node: <>We may use your information for the following purposes:</>,
      },
      {
        kind: "list",
        items: [
          "To respond to inquiries and requests for information.",
          "To schedule product demonstrations, consultations and business meetings.",
          "To provide information about our ERP, CRM, HRMS, AI and data platform services.",
          "To understand your business requirements and recommend relevant solutions.",
          "To communicate with you regarding our services, proposals and ongoing projects.",
          "To operate the live chat - generating its automatic acknowledgement and routing your message to a human consultant.",
          "To improve our website, products, services and user experience.",
          "To monitor website performance, prevent fraud and maintain security.",
          "To comply with applicable legal obligations.",
          "To protect our rights, property and legitimate business interests.",
        ],
      },
      {
        kind: "p",
        node: (
          <>
            We will not use your personal information for purposes incompatible with those
            described in this Policy unless permitted by applicable law or, where required,
            with your consent.
          </>
        ),
      },
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            Where applicable data protection laws require a legal basis for processing, we
            process personal information based on one or more of the following:
          </>
        ),
      },
      {
        kind: "list",
        items: [
          <>
            <strong className="font-bold">Consent:</strong> when you have provided consent
            for a specific purpose.
          </>,
          <>
            <strong className="font-bold">Contractual necessity:</strong> when processing is
            necessary to provide a service, or to take steps you request before entering
            into a contract.
          </>,
          <>
            <strong className="font-bold">Legal obligations:</strong> when processing is
            necessary to comply with applicable laws.
          </>,
          <>
            <strong className="font-bold">Legitimate interests:</strong> when processing is
            necessary for legitimate business purposes, provided those interests do not
            override applicable privacy rights.
          </>,
        ],
      },
      {
        kind: "p",
        node: (
          <>
            The legal basis applicable to a particular activity depends on the
            circumstances and the laws governing that activity.
          </>
        ),
      },
    ],
  },
  {
    id: "how-we-share",
    title: "How We Share Your Information",
    blocks: [
      {
        kind: "p",
        node: <>We do not sell your personal information as part of our ordinary business practices.</>,
      },
      {
        kind: "p",
        node: <>We may share information with the following categories of recipients when necessary:</>,
      },
      {
        kind: "list",
        items: [
          <>
            <strong className="font-bold">Service providers:</strong> our website hosting
            provider, our Microsoft 365 mail system, which is how enquiry notifications and
            confirmations are delivered, and other vendors supporting our operations.
          </>,
          <>
            <strong className="font-bold">Communication platforms:</strong> where you use
            live chat, your conversation may be carried over WhatsApp so a consultant can
            answer you on a channel you can reach.
          </>,
          <>
            <strong className="font-bold">Technology providers:</strong> the third-party
            platforms listed in section 6 that render or power specific features of the
            website.
          </>,
          <>
            <strong className="font-bold">Business partners:</strong> relevant technology or
            implementation partners where sharing is necessary to respond to your request or
            deliver an agreed service.
          </>,
          <>
            <strong className="font-bold">Professional advisers:</strong> legal, accounting,
            auditing and other professional advisers where necessary.
          </>,
          <>
            <strong className="font-bold">Authorities:</strong> government, regulatory or
            law enforcement authorities when required by law or a valid legal process.
          </>,
          <>
            <strong className="font-bold">Business transaction parties:</strong> parties
            involved in a merger, acquisition, restructuring or sale of business assets,
            subject to appropriate safeguards.
          </>,
        ],
      },
      {
        kind: "p",
        node: (
          <>
            We expect third-party service providers handling personal information on our
            behalf to apply appropriate confidentiality and security measures.
          </>
        ),
      },
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services, Embeds and Links",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            Our website uses or links to third-party platforms so that certain features
            work. Each one receives the information noted below in order to provide that
            feature:
          </>
        ),
      },
      {
        kind: "list",
        items: [
          <>
            <strong className="font-bold">Website hosting:</strong> our pages and API
            endpoints are served by a commercial hosting platform, which records standard
            request logs.
          </>,
          <>
            <strong className="font-bold">Microsoft 365:</strong> enquiries submitted
            through this site are transmitted by email to our inbox, so the content of your
            message is processed by Microsoft&rsquo;s mail infrastructure.
          </>,
          <>
            <strong className="font-bold">Google Fonts:</strong> typefaces are loaded from
            Google&rsquo;s font servers, which see your IP address as part of serving the
            file.
          </>,
          <>
            <strong className="font-bold">Google Maps:</strong> the map on our contact page
            is an embedded Google Maps view, which may set cookies and records usage under
            Google&rsquo;s own terms.
          </>,
          <>
            <strong className="font-bold">WhatsApp:</strong> the live chat offers a link to
            continue the conversation on WhatsApp, which is operated by Meta and governed by
            its own privacy policy.
          </>,
          <>
            <strong className="font-bold">Imagery:</strong> some photographs on this site are
            served from third-party image CDNs, which see your IP address when the browser
            requests them.
          </>,
        ],
      },
      {
        kind: "p",
        node: (
          <>
            These third parties process information according to their own privacy policies
            and terms, which we encourage you to review before using those features. We are
            not responsible for the independent privacy practices of third-party websites or
            services, except to the extent required by applicable law.
          </>
        ),
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            We retain personal information only for as long as reasonably necessary to
            fulfil the purposes for which it was collected, including responding to
            inquiries, maintaining business relationships, providing services, resolving
            disputes and meeting legal or regulatory requirements.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            Information submitted through this website is retained in the business email and
            CRM records of our practice team. We keep no visitor database on this site: an
            enquiry is handed straight to our mailbox, and if that delivery fails the
            submission content is written to the server log instead, so the enquiry can be
            recovered rather than lost. Temporary technical state, such as an open
            live-chat transcript held in the running application, is not permanent and is
            cleared when the service restarts.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            When information is no longer required, we take reasonable steps to delete it,
            anonymise it or securely dispose of it, subject to applicable legal obligations.
            Retention periods vary with the type of information and the purpose of
            processing.
          </>
        ),
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            We implement reasonable technical, organisational and administrative safeguards
            designed to protect personal information against unauthorised access,
            disclosure, alteration, loss or misuse. The website is served over HTTPS, and
            credentials used by our systems are kept in protected configuration rather than
            in the site itself.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            However, no method of transmitting information over the internet or storing
            information electronically is completely secure, so we cannot guarantee absolute
            security. A live-chat conversation can be reopened through the reply link issued
            for that session, so please do not share that link and avoid sending us
            sensitive information in chat. If a personal data breach occurs, we will take
            appropriate steps in accordance with applicable legal requirements.
          </>
        ),
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    blocks: [
      {
        kind: "p",
        node: <>Depending on your location and applicable law, you may have the right to:</>,
      },
      {
        kind: "list",
        items: [
          "Request access to your personal information.",
          "Request correction or updating of inaccurate information.",
          "Request deletion of your personal information, subject to applicable exceptions.",
          "Withdraw consent where processing is based on consent.",
          "Request information about how your personal information is processed.",
          "Object to, or request restriction of, certain processing activities where applicable.",
          "Request a copy of your information in a legally required or supported format.",
          "Raise a complaint with the relevant data protection authority.",
        ],
      },
      {
        kind: "p",
        node: (
          <>
            To exercise an applicable right, contact us using the details in{" "}
            <a href="#contact" className="text-[#005a9e] dark:text-sky-400 font-semibold hover:underline">
              Contact Us
            </a>{" "}
            below. We may need to verify your identity before acting on a request, and we
            will respond within the period required by applicable law.
          </>
        ),
      },
    ],
  },
  {
    id: "business-data",
    title: "Privacy of Business and Enterprise Data",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            Coreenact provides enterprise technology solutions, including ERP, CRM, HRMS and
            business automation systems, that process information on behalf of business
            customers.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            Where we process personal information on behalf of a customer through such
            services, our role and responsibilities are governed by the applicable customer
            agreement, any data processing agreement, and relevant privacy laws. Customers
            are responsible for ensuring they have the necessary authority and legal basis
            to provide personal information to us for processing.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            Information submitted through our public website should not include confidential
            business records, employee information, financial records, credentials or other
            sensitive information unless the submission channel is specifically designed and
            authorised for that purpose.
          </>
        ),
      },
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            Your information may be processed or stored in locations outside your state or
            country. We operate hubs in Faridabad, India and Mississauga, Canada, and the
            service providers described in section 6 &mdash; including our hosting, mail and
            cloud vendors &mdash; may process data in other jurisdictions.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            Where international transfers are subject to legal requirements, we take
            appropriate steps to ensure that such transfers comply with applicable data
            protection laws and relevant safeguards.
          </>
        ),
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            Our website and business services are intended for businesses and professional
            users and are not directed at children. We do not knowingly collect personal
            information from children in circumstances where doing so would violate
            applicable law.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            If you believe a child has provided personal information to us inappropriately,
            please contact us so that we can review the matter and take appropriate action.
          </>
        ),
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            This website has no newsletter subscription form, and submitting an enquiry does
            not by itself enrol you in marketing. We send service-related communications in
            response to your inquiries and business interactions, including the
            confirmation copy generated when you submit a form.
          </>
        ),
      },
      {
        kind: "p",
        node: (
          <>
            Where permitted by applicable law, we may also contact you about our services,
            product updates, events or relevant business offerings. You can opt out of
            marketing communications at any time by using the unsubscribe mechanism provided
            or by contacting us directly. Opting out will not prevent us from sending
            essential service-related or legally required communications.
          </>
        ),
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        kind: "p",
        node: (
          <>
            We may update this Privacy Policy from time to time to reflect changes in our
            business practices, technology, legal requirements or services. Any revised
            version will be published on this page with an updated &ldquo;Last
            Updated&rdquo; date, and where required by applicable law we will provide
            additional notice or obtain consent for material changes.
          </>
        ),
      },
      {
        kind: "p",
        node: <>We encourage you to review this page periodically.</>,
      },
    ],
  },
];

const BlockRenderer: React.FC<{ block: Block }> = ({ block }) => {
  if (block.kind === "p") {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {block.node}
      </p>
    );
  }

  if (block.kind === "list") {
    return (
      <ul className="space-y-2 pl-5 list-disc marker:text-[#005a9e] dark:marker:text-sky-400">
        {block.items.map((item, index) => (
          <li
            key={index}
            className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-2.5 pt-1">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-heading">
        {block.title}
      </h3>
      {block.node && (
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {block.node}
        </p>
      )}
      {block.items && (
        <ul className="space-y-2 pl-5 list-disc marker:text-[#005a9e] dark:marker:text-sky-400">
          {block.items.map((item, index) => (
            <li
              key={index}
              className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onOpenContact,
}) => {
  const contactOffice = COREENACT_CONTACT.offices[0];

  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
          <span>Privacy &amp; Data</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
          Privacy Policy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          How Coreenact collects, uses and protects the information you share when you visit
          this website, submit an enquiry, or talk to our team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Effective date: {EFFECTIVE_DATE}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Last updated: {LAST_UPDATED}
          </span>
        </div>
      </div>

      {/* Index + body */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8 lg:gap-12 mt-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              On this page
            </p>
            <nav className="space-y-0.5 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
              {SECTIONS.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-xs text-slate-500 dark:text-slate-400 hover:text-[#005a9e] dark:hover:text-sky-400 transition leading-snug py-0.5"
                >
                  <span className="font-bold text-slate-400 dark:text-slate-600 mr-1.5">
                    {index + 1}.
                  </span>
                  {section.title}
                </a>
              ))}
              <a
                href="#contact"
                className="block text-xs text-slate-500 dark:text-slate-400 hover:text-[#005a9e] dark:hover:text-sky-400 transition leading-snug py-0.5"
              >
                <span className="font-bold text-slate-400 dark:text-slate-600 mr-1.5">
                  {SECTIONS.length + 1}.
                </span>
                Contact Us
              </a>
            </nav>
          </div>
        </aside>

        <div className="max-w-3xl mx-auto lg:mx-0 space-y-12">
          {SECTIONS.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 font-heading flex items-baseline gap-2.5">
                <span className="text-[#005a9e] dark:text-sky-400 tabular-nums">
                  {index + 1}.
                </span>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, blockIndex) => (
                  <BlockRenderer key={blockIndex} block={block} />
                ))}
              </div>
            </section>
          ))}

          {/* Contact */}
          <section id="contact" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 font-heading flex items-baseline gap-2.5">
              <span className="text-[#005a9e] dark:text-sky-400 tabular-nums">
                {SECTIONS.length + 1}.
              </span>
              Contact Us
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have questions about this Privacy Policy, wish to exercise your privacy
              rights, or have concerns about how your personal information is handled,
              please contact us. Include enough detail about your request for us to
              understand and respond to it appropriately.
            </p>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Company
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Coreenact Solutions Pvt. Ltd.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${COREENACT_CONTACT.email}`}
                  className="flex items-start gap-3 group"
                >
                  <Mail className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Email
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                      {COREENACT_CONTACT.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:+91${COREENACT_CONTACT.phoneRaw}`}
                  className="flex items-start gap-3 group"
                >
                  <Phone className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Phone
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                      {COREENACT_CONTACT.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={COREENACT_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MessageCircle className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      WhatsApp
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition inline-flex items-center gap-1">
                      {COREENACT_CONTACT.phone}
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </span>
                  </span>
                </a>

                <a
                  href="https://www.coreenact.com/"
                  className="flex items-start gap-3 group"
                >
                  <Globe className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Website
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#005a9e] dark:group-hover:text-sky-400 transition">
                      https://www.coreenact.com/
                    </span>
                  </span>
                </a>
              </div>

              <div className="pt-1 space-y-3 border-t border-slate-200 dark:border-slate-800">
                {COREENACT_CONTACT.offices.map((office) => (
                  <div key={office.id} className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {office.region}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                        {office.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenContact?.()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Privacy Question? Contact Our Team</span>
              </button>
              <a
                href={`mailto:${contactOffice.email}?subject=${encodeURIComponent(
                  "Privacy request - Coreenact website"
                )}`}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition inline-flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
            </div>
          </section>

          {/* Closing note */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                This Privacy Policy provides general information about our privacy
                practices. It should be reviewed and adapted to reflect our actual data
                collection, website technologies, service providers and applicable legal
                obligations before it is relied upon as formal legal advice.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#005a9e] dark:hover:text-sky-400 transition inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </div>
  );
};
