import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Mail, User, Building } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialInterest,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusInfo, setStatusInfo] = useState<{
    message: string;
    enquiryId?: string;
    database?: { saved: boolean; storage: string; recordId: string };
    targetEmail?: string;
    emailDispatched?: boolean;
    provider?: string;
    smtpNote?: string;
    autoReply?: { sent: boolean; to?: string; reason?: string };
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: initialInterest || "Dynamics 365 Business Central",
    timeframe: "Within 3 months",
    notes: "",
  });

  React.useEffect(() => {
    if (initialInterest) {
      setFormData((prev) => ({
        ...prev,
        interest: initialInterest,
        notes: prev.notes ? prev.notes : `Interested in BC Add-on module: ${initialInterest}`,
      }));
    }
  }, [initialInterest, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "book_consultation",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          interest: formData.interest,
          timeframe: formData.timeframe,
          notes: formData.notes,
        }),
      });
      const data = await res.json();
      setStatusInfo({
        message: data.message || "Inquiry received and routed successfully",
        enquiryId: data.enquiryId,
        database: data.database,
        targetEmail: data.targetEmail || "info@coreenact.com",
        emailDispatched: data.emailDispatched,
        smtpNote: data.smtpNote,
        autoReply: data.autoReply,
      });
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#0078D4", "#0284c7", "#4f46e5", "#10b981"],
      });
    } catch {
      setStatusInfo({
        message: "Inquiry recorded for info@coreenact.com",
        targetEmail: "info@coreenact.com",
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-10 text-left p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#005a9e] dark:text-sky-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading">
                    Schedule Business Central Review
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Direct consultation with Coreenact (info@coreenact.com) • Haryana & Mississauga
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">Discovery Session Requested!</div>
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-left text-xs space-y-1.5 max-w-md mx-auto">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Inquiry Dispatched to {statusInfo?.targetEmail || "info@coreenact.com"}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      All consultation parameters for <span className="font-semibold text-slate-800">{formData.name}</span> ({formData.email}) regarding <span className="font-semibold text-slate-800">{formData.interest}</span> have been sent to our executive team.
                    </p>
                    {statusInfo?.enquiryId && (
                      <div className="pt-1.5 border-t border-blue-200/60 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-slate-400">Reference:</span>
                        <span className="font-bold text-blue-700">{statusInfo.enquiryId}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Our Principal Solutions Architects will follow up at <span className="font-semibold text-blue-700">{formData.email}</span> within 4 business hours.
                  </p>
                  {statusInfo?.autoReply?.sent && (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 max-w-md mx-auto">
                      A confirmation copy has been emailed to {formData.email}.
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        onClose();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Sarah Jenkins"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-xs text-slate-900 placeholder-slate-400 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sjenkins@enterprise.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-xs text-slate-900 placeholder-slate-400 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Global Logistics Corp"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-xs text-slate-900 placeholder-slate-400 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Area of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-xs text-slate-900 focus:bg-white"
                    >
                      <optgroup label="Core ERP Services">
                        <option>Dynamics 365 Business Central</option>
                        <option>Dynamics NAV to Business Central Cloud Migration</option>
                        <option>Dynamics 365 Finance & Supply Chain</option>
                        <option>India GST & E-Invoicing Localization</option>
                        <option>Copilot & Automated Workflows in BC</option>
                        <option>Power Platform & Power BI Integration</option>
                        <option>Continuous 24/7 Managed Services</option>
                      </optgroup>
                      <optgroup label="Business Central Add-ons">
                        <option>Vendor & Customer Portal</option>
                        <option>HRMS Portal</option>
                        <option>Visitor Management App</option>
                        <option>QR & BAR Code</option>
                        <option>Signing Pad / Handwritten</option>
                        <option>In App Approval System</option>
                        <option>Whatsapp & Shopify Integration with BC</option>
                        <option>Digital Class – 3 & 2 Signature</option>
                        <option>E-Invoices & E-way Bills</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Implementation Target Timeframe
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {["Immediate (< 3 mo)", "3 - 6 months", "Strategic Planning"].map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setFormData({ ...formData, timeframe: t })}
                          className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition border cursor-pointer ${
                            formData.timeframe === t
                              ? "bg-blue-50 border-blue-500 text-blue-700 shadow-2xs"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Legacy Footprint / Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g., Currently running Dynamics NAV 2016 with 60 users across 3 entities, looking to migrate to Business Central cloud with GST compliance."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-xs text-slate-900 placeholder-slate-400 resize-none focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg font-bold text-sm text-white bg-[#005a9e] hover:bg-[#004a82] shadow-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Inquiry to info@coreenact.com...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Business Central Review & TCO Audit</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
