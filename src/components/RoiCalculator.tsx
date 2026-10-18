import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  Calculator,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Sliders,
  Users,
  Layers,
  Sparkles,
  Server,
  RefreshCw,
  HelpCircle,
  Award,
} from "lucide-react";

interface RoiCalculatorProps {
  onOpenContact: (interest?: string) => void;
}

type Currency = "INR" | "USD";
type CalculatorMode = "fresh" | "migration";

// Official Microsoft Dynamics 365 Business Central Monthly Per-User / Device Pricing
export const D365_BC_PRICING = {
  PREMIUM: 9155, // ₹9,155 / user / month
  ESSENTIAL: 6655, // ₹6,655 / user / month
  DEVICE: 3780, // ₹3,780 / device / month
  TEAM: 665, // ₹665 / user / month
} as const;

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  onOpenContact,
}) => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [mode, setMode] = useState<CalculatorMode>("fresh");

  // License Seat Configuration
  const [essentialUsers, setEssentialUsers] = useState<number>(15);
  const [premiumUsers, setPremiumUsers] = useState<number>(5);
  const [deviceLicenses, setDeviceLicenses] = useState<number>(2);
  const [teamMembers, setTeamMembers] = useState<number>(8);

  // Migration specifics
  const [currentSystem, setCurrentSystem] = useState<string>("nav");
  const [isFastTrack, setIsFastTrack] = useState<boolean>(true);

  // Implementation / Module specifics
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "bc-finance",
    "bc-supply-chain",
    "copilot-bc",
    "gst-compliance",
  ]);
  const [implementationPace, setImplementationPace] = useState<"standard" | "express">("standard");

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const totalSeats = useMemo(() => {
    return essentialUsers + premiumUsers + deviceLicenses + teamMembers;
  }, [essentialUsers, premiumUsers, deviceLicenses, teamMembers]);

  // Quick Archetype Presets
  const applyPreset = (
    essential: number,
    premium: number,
    device: number,
    team: number
  ) => {
    setEssentialUsers(essential);
    setPremiumUsers(premium);
    setDeviceLicenses(device);
    setTeamMembers(team);
  };

  // Financial and ROI Calculations
  const calculations = useMemo(() => {
    const isINR = currency === "INR";
    const exchangeRate = 84; // 1 USD ~ 84 INR

    // Exact Monthly License Totals in INR based on official prices
    const monthlyPremiumINR = premiumUsers * D365_BC_PRICING.PREMIUM;
    const monthlyEssentialINR = essentialUsers * D365_BC_PRICING.ESSENTIAL;
    const monthlyDeviceINR = deviceLicenses * D365_BC_PRICING.DEVICE;
    const monthlyTeamINR = teamMembers * D365_BC_PRICING.TEAM;

    const monthlyLicenseTotalINR =
      monthlyPremiumINR +
      monthlyEssentialINR +
      monthlyDeviceINR +
      monthlyTeamINR;

    const annualLicenseTotalINR = monthlyLicenseTotalINR * 12;
    const threeYearLicenseTotalINR = annualLicenseTotalINR * 3;

    // Rates in active currency
    const ratePremium = isINR
      ? D365_BC_PRICING.PREMIUM
      : Math.round(D365_BC_PRICING.PREMIUM / exchangeRate);
    const rateEssential = isINR
      ? D365_BC_PRICING.ESSENTIAL
      : Math.round(D365_BC_PRICING.ESSENTIAL / exchangeRate);
    const rateDevice = isINR
      ? D365_BC_PRICING.DEVICE
      : Math.round(D365_BC_PRICING.DEVICE / exchangeRate);
    const rateTeam = isINR
      ? D365_BC_PRICING.TEAM
      : Math.round(D365_BC_PRICING.TEAM / exchangeRate);

    const monthlyLicenseTotal = isINR
      ? monthlyLicenseTotalINR
      : Math.round(monthlyLicenseTotalINR / exchangeRate);

    const annualLicenseTotal = monthlyLicenseTotal * 12;
    const threeYearLicenseTotal = annualLicenseTotal * 3;

    // Module & Copilot Impact
    const moduleMultiplier = 1 + selectedModules.length * 0.1;
    const copilotBonus = selectedModules.includes("copilot-bc") ? 1.35 : 1.0;

    // 1. Fresh Implementation Model
    // Implementation Services estimation based on seat tier & scope
    const baseImplServiceINR =
      Math.max(350000, totalSeats * 18000) *
      moduleMultiplier *
      (implementationPace === "express" ? 1.15 : 1.0);
    const implService = isINR
      ? Math.round(baseImplServiceINR)
      : Math.round(baseImplServiceINR / exchangeRate);

    // Productivity & Operational Value Reclaimed per year
    // (Automated financial close, eliminated manual spreadsheet reconciliation, paperless invoicing)
    const annualProductivityValueINR =
      Math.max(480000, totalSeats * 85000) * copilotBonus;
    const annualProductivityValue = isINR
      ? Math.round(annualProductivityValueINR)
      : Math.round(annualProductivityValueINR / exchangeRate);

    const threeYearGrossValue = annualProductivityValue * 3;
    const threeYearNetFreshRoi = Math.max(
      threeYearLicenseTotal * 0.6,
      threeYearGrossValue - (threeYearLicenseTotal + implService)
    );

    // 2. Migration Model (Legacy to Business Central Cloud)
    // Legacy on-premise upkeep cost per user (infrastructure, SQL licenses, DBA, hardware refresh)
    const legacyCostPerUserUSD =
      currentSystem === "nav"
        ? 210 // On-prem NAV maintenance, SQL server, hardware depreciation
        : currentSystem === "sap"
        ? 310
        : currentSystem === "oracle"
        ? 290
        : currentSystem === "netsuite"
        ? 230
        : currentSystem === "tally"
        ? 150
        : 180;

    const legacyCostPerUser = isINR
      ? legacyCostPerUserUSD * exchangeRate
      : legacyCostPerUserUSD;

    const legacyAnnualCost = totalSeats * legacyCostPerUser * 12;
    const modernAnnualTotalCost = annualLicenseTotal * 1.08; // license + minor cloud support

    const baselineMigrationSavings = isINR
      ? Math.max(300000, totalSeats * 52000)
      : Math.max(3600, totalSeats * 620);

    const annualMigrationSavings = Math.max(
      baselineMigrationSavings,
      Math.round(legacyAnnualCost - modernAnnualTotalCost + annualProductivityValue * 0.4)
    );
    const threeYearMigrationSavings = Math.round(annualMigrationSavings * 3);

    // Hours Reclaimed and Metrics
    const hoursSavedPerYear = Math.round(totalSeats * 185 * copilotBonus);
    const productivityUplift = Math.min(
      65,
      Math.round(22 + selectedModules.length * 5 + (copilotBonus > 1 ? 12 : 0))
    );

    const paybackMonths =
      mode === "fresh"
        ? Math.max(5, Math.min(13, Math.round(12 - totalSeats / 40)))
        : Math.max(4, Math.min(12, Math.round(10 - totalSeats / 50 - (isFastTrack ? 2 : 0))));

    return {
      monthlyLicenseTotal,
      annualLicenseTotal,
      threeYearLicenseTotal,
      monthlyPremium: isINR ? monthlyPremiumINR : Math.round(monthlyPremiumINR / exchangeRate),
      monthlyEssential: isINR ? monthlyEssentialINR : Math.round(monthlyEssentialINR / exchangeRate),
      monthlyDevice: isINR ? monthlyDeviceINR : Math.round(monthlyDeviceINR / exchangeRate),
      monthlyTeam: isINR ? monthlyTeamINR : Math.round(monthlyTeamINR / exchangeRate),
      ratePremium,
      rateEssential,
      rateDevice,
      rateTeam,
      implService,
      annualProductivityValue,
      threeYearNetFreshRoi,
      annualMigrationSavings,
      threeYearMigrationSavings,
      hoursSavedPerYear,
      productivityUplift,
      paybackMonths,
      exchangeRate,
    };
  }, [
    currency,
    mode,
    essentialUsers,
    premiumUsers,
    deviceLicenses,
    teamMembers,
    totalSeats,
    currentSystem,
    isFastTrack,
    selectedModules,
    implementationPace,
  ]);

  const formatAmount = (amount: number) => {
    if (currency === "INR") {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      }
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} Lakh`;
      }
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
    } else {
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(2)}M`;
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);
    }
  };

  const formatExact = (amount: number) => {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#0078D4", "#10b981", "#f59e0b", "#6366f1", "#06b6d4"],
    });
  };

  return (
    <section
      id="calculator"
      className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/25 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-[#070e24] border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden text-left"
    >
      {/* Decorative ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          {/* Exclusivity Badge: Explicitly Business Central, Not F&O */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-sky-300 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Award className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>Dedicated Microsoft Dynamics 365 Business Central Estimator</span>
            <span className="hidden sm:inline text-blue-400 dark:text-blue-500">•</span>
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400 font-semibold normal-case">
              Calibrated for Business Central (Not F&O)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Dynamics 365 Business Central{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Implementation & ROI Estimator
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
            Model your monthly licensing and 3-year TCO exclusively for{" "}
            <strong className="text-slate-900 dark:text-white font-semibold">
              Microsoft Dynamics 365 Business Central
            </strong>
            . Calculate exact costs for{" "}
            <span className="text-blue-600 dark:text-sky-400 font-semibold">Fresh Implementation</span>{" "}
            or{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Legacy NAV Migration</span>{" "}
            using official monthly pricing: Premium (₹9,155), Essential (₹6,655), Device (₹3,780), and Team Member (₹665).
          </p>

          {/* Primary Mode Toggle: Fresh Implementation vs. Migration */}
          <div className="pt-3 flex flex-wrap justify-center items-center gap-3">
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md">
              <button
                type="button"
                onClick={() => setMode("fresh")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  mode === "fresh"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Fresh Implementation & Licensing</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("migration")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  mode === "migration"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/25 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Legacy to Business Central Migration</span>
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <IndianRupee className="w-3.5 h-3.5" />
                <span>INR (₹)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>USD ($)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notice Card: Explicit D365 Business Central boundary */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-blue-950 dark:text-blue-200">
            <Award className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
            <span>
              <strong>Notice:</strong> This model is built specifically for{" "}
              <strong>Microsoft Dynamics 365 Business Central</strong> cloud implementations and migrations.
              It does not apply to D365 Finance &amp; Operations (F&amp;O), which operates on different architectural tiers and licensing minimums.
            </span>
          </div>
          <div className="font-mono text-[11px] text-blue-700 dark:text-sky-300 font-bold shrink-0">
            Official Per-User Monthly Pricing Applied
          </div>
        </div>

        {/* Main Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Inputs & License Breakdown */}
          <div className="lg:col-span-7 rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 shadow-xl shadow-blue-500/10">
            <div className="rounded-[22px] p-6 sm:p-8 bg-white dark:bg-slate-900 h-full space-y-6 text-left">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {mode === "fresh"
                        ? "Business Central License & Scope Configuration"
                        : "Legacy NAV Migration & License Parameters"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Configure individual seat tiers (Premium, Essential, Device, Team Member)
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-blue-700 dark:text-sky-400 border border-slate-200 dark:border-slate-700">
                  Total Seats: {totalSeats}
                </div>
              </div>

              {/* 1. Quick Archetype Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Quick Organization Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: "Starter Team", e: 5, p: 0, d: 0, t: 2, total: 7 },
                    { label: "Mid-Market", e: 15, p: 5, d: 2, t: 8, total: 30 },
                    { label: "Manufacturing", e: 10, p: 25, d: 10, t: 15, total: 60 },
                    { label: "Wholesale/Retail", e: 25, p: 0, d: 8, t: 20, total: 53 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset.e, preset.p, preset.d, preset.t)}
                      className="p-2 rounded-xl text-left border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 hover:border-blue-500 dark:hover:border-sky-400 transition cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {preset.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {preset.total} seats ({preset.e}E/{preset.p}P)
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Interactive License Matrix: 4 License Types */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                    <span>Microsoft Business Central User Licenses</span>
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Official Microsoft Monthly Rates
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Premium Users: ₹9,155 */}
                  <div className="p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/30 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/20 shadow-2xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                            Premium User
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white font-mono">
                            Full ERP + Mfg
                          </span>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 mt-0.5">
                          {currency === "INR" ? "₹9,155" : `$${calculations.ratePremium}`} / user / mo
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                          Manufacturing (BOM, Routing), Service Management, plus all Essential features.
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-indigo-200 dark:border-indigo-800 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPremiumUsers((p) => Math.max(0, p - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-indigo-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={500}
                          value={premiumUsers}
                          onChange={(e) => setPremiumUsers(Math.max(0, Number(e.target.value) || 0))}
                          className="w-8 text-center font-mono font-bold text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setPremiumUsers((p) => Math.min(500, p + 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-indigo-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 pt-1 border-t border-indigo-100 dark:border-indigo-900/60 flex justify-between">
                      <span>Monthly subtotal:</span>
                      <strong className="text-indigo-900 dark:text-indigo-300">
                        {formatAmount(calculations.monthlyPremium)}/mo
                      </strong>
                    </div>
                  </div>

                  {/* Essential Users: ₹6,655 */}
                  <div className="p-3.5 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/60 via-white to-cyan-50/30 dark:from-blue-950/40 dark:via-slate-900 dark:to-cyan-950/20 shadow-2xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-blue-950 dark:text-blue-200">
                            Essential User
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white font-mono">
                            Full ERP
                          </span>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-blue-700 dark:text-sky-300 mt-0.5">
                          {currency === "INR" ? "₹6,655" : `$${calculations.rateEssential}`} / user / mo
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                          Financials, Sales, Purchasing, Inventory, CRM, Projects &amp; Warehouse.
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-blue-200 dark:border-blue-800 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEssentialUsers((e) => Math.max(0, e - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={500}
                          value={essentialUsers}
                          onChange={(e) => setEssentialUsers(Math.max(0, Number(e.target.value) || 0))}
                          className="w-8 text-center font-mono font-bold text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setEssentialUsers((e) => Math.min(500, e + 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 pt-1 border-t border-blue-100 dark:border-blue-900/60 flex justify-between">
                      <span>Monthly subtotal:</span>
                      <strong className="text-blue-900 dark:text-sky-300">
                        {formatAmount(calculations.monthlyEssential)}/mo
                      </strong>
                    </div>
                  </div>

                  {/* Device Licenses: ₹3,780 */}
                  <div className="p-3.5 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/30 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/20 shadow-2xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                            Device License
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white font-mono">
                            Shared Terminal
                          </span>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
                          {currency === "INR" ? "₹3,780" : `$${calculations.rateDevice}`} / device / mo
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                          Shared warehouse barcode scanners, shop-floor kiosks, or POS terminals.
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
                        <button
                          type="button"
                          onClick={() => setDeviceLicenses((d) => Math.max(0, d - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-emerald-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={200}
                          value={deviceLicenses}
                          onChange={(e) => setDeviceLicenses(Math.max(0, Number(e.target.value) || 0))}
                          className="w-8 text-center font-mono font-bold text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setDeviceLicenses((d) => Math.min(200, d + 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-emerald-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 pt-1 border-t border-emerald-100 dark:border-emerald-900/60 flex justify-between">
                      <span>Monthly subtotal:</span>
                      <strong className="text-emerald-900 dark:text-emerald-300">
                        {formatAmount(calculations.monthlyDevice)}/mo
                      </strong>
                    </div>
                  </div>

                  {/* Team Member: ₹665 */}
                  <div className="p-3.5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/30 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/20 shadow-2xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                            Team Member
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white font-mono">
                            Read + Approve
                          </span>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 mt-0.5">
                          {currency === "INR" ? "₹665" : `$${calculations.rateTeam}`} / user / mo
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                          Reports reading, purchase approvals, timesheets, and expense submissions.
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-amber-200 dark:border-amber-800 shrink-0">
                        <button
                          type="button"
                          onClick={() => setTeamMembers((t) => Math.max(0, t - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-amber-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={500}
                          value={teamMembers}
                          onChange={(e) => setTeamMembers(Math.max(0, Number(e.target.value) || 0))}
                          className="w-8 text-center font-mono font-bold text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setTeamMembers((t) => Math.min(500, t + 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-amber-100 transition flex items-center justify-center text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 pt-1 border-t border-amber-100 dark:border-amber-900/60 flex justify-between">
                      <span>Monthly subtotal:</span>
                      <strong className="text-amber-900 dark:text-amber-300">
                        {formatAmount(calculations.monthlyTeam)}/mo
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Subtotal Banner for Monthly Licenses */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="text-slate-700 dark:text-slate-300">
                    Combined Monthly D365 BC License Run-Rate:
                  </div>
                  <div className="text-sm font-bold text-blue-700 dark:text-sky-300">
                    {formatAmount(calculations.monthlyLicenseTotal)} / month
                  </div>
                </div>
              </div>

              {/* 3. Conditional Mode Controls: Fresh vs Migration */}
              {mode === "migration" ? (
                /* Legacy ERP selection */
                <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                    Current Legacy Platform Being Replaced
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "nav", label: "Dynamics NAV (On-Prem)" },
                      { id: "sap", label: "SAP ECC / B1" },
                      { id: "tally", label: "Tally Prime / ERP 9" },
                      { id: "oracle", label: "Oracle EBS" },
                      { id: "netsuite", label: "NetSuite" },
                      { id: "custom", label: "Custom SQL ERP" },
                    ].map((sys) => {
                      const active = currentSystem === sys.id;
                      return (
                        <button
                          key={sys.id}
                          type="button"
                          onClick={() => setCurrentSystem(sys.id)}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-center transition cursor-pointer border ${
                            active
                              ? "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/80 dark:to-blue-950/80 border-indigo-500 text-indigo-950 dark:text-sky-300 shadow-xs font-bold"
                              : "bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {sys.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* FastTrack Toggle */}
                  <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-between">
                    <div className="text-xs text-slate-700 dark:text-slate-300 pr-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">
                        Coreenact FastTrack NAV to Cloud (60-Day Cutover)
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Automated C/AL code refactoring to modern AL extensions and historical GL data cleansing.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isFastTrack}
                      onChange={(e) => setIsFastTrack(e.target.checked)}
                      className="w-5 h-5 rounded-md accent-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                /* Fresh Implementation Delivery Scope */
                <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                      Implementation Deployment Framework
                    </label>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-sky-400">
                      5-Phase Methodology
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setImplementationPace("standard")}
                      className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                        implementationPace === "standard"
                          ? "bg-blue-50 dark:bg-blue-950/70 border-blue-500 text-blue-950 dark:text-sky-300 font-bold shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold">Standard 90-Day Enterprise</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Comprehensive discovery, custom AL extensions, full UAT and hypercare.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImplementationPace("express")}
                      className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                        implementationPace === "express"
                          ? "bg-blue-50 dark:bg-blue-950/70 border-blue-500 text-blue-950 dark:text-sky-300 font-bold shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold">Express 45-Day Out-of-the-Box</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Pre-configured chart of accounts, standard workflows &amp; fast rollout.
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Target Modules */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                    Target Business Central Capabilities &amp; Localization
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedModules.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: "bc-finance", label: "D365 BC Financials & GL", tag: "Finance" },
                    { id: "bc-supply-chain", label: "Supply Chain & Multi-Warehouse", tag: "SCM" },
                    { id: "copilot-bc", label: "Copilot AI in Business Central", tag: "AI Copilot" },
                    { id: "gst-compliance", label: "India GST, E-Invoicing & E-Way", tag: "Statutory" },
                    { id: "power-bi", label: "Power BI Executive Reporting", tag: "Analytics" },
                    { id: "power-automate", label: "Power Automate Approval Flows", tag: "RPA" },
                  ].map((mod) => {
                    const active = selectedModules.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer transition border flex items-center justify-between ${
                          active
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/70 dark:to-indigo-950/70 border-blue-400 text-blue-950 dark:text-sky-200 font-semibold shadow-2xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                              active
                                ? "bg-blue-600 text-white font-bold"
                                : "border border-slate-400 dark:border-slate-600"
                            }`}
                          >
                            {active && "✓"}
                          </div>
                          <span className="truncate">{mod.label}</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 font-mono text-blue-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700 font-bold shrink-0">
                          {mod.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Financial Results, License Investment & ROI */}
          <div className="lg:col-span-5 rounded-3xl p-[2px] bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 shadow-xl shadow-emerald-500/10">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 text-left">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>D365 BC Financial Model ({currency})</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    {mode === "fresh" ? "Fresh Implementation" : "Migration"}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                  {mode === "fresh"
                    ? "D365 Business Central Investment & Value"
                    : "Migration TCO Savings"}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {mode === "fresh"
                    ? `Itemized monthly and annual investment for ${totalSeats} total users/devices across official Microsoft BC SKUs.`
                    : `Net 3-year TCO savings after replacing on-premise ${currentSystem.toUpperCase()} with Business Central Cloud.`}
                </p>
              </div>

              {/* Major Headline Metric Card */}
              <div className="rounded-2xl p-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-600 shadow-md">
                <div className="rounded-[14px] p-5 sm:p-6 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 space-y-2">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>
                      {mode === "fresh"
                        ? "3-Year Net Business Value / ROI"
                        : "3-Year Cumulative TCO Savings"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {currency}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent font-mono tracking-tight">
                    {formatAmount(
                      mode === "fresh"
                        ? calculations.threeYearNetFreshRoi
                        : calculations.threeYearMigrationSavings
                    )}
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 font-medium pt-1">
                    {mode === "fresh" ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                        +{formatAmount(calculations.annualProductivityValue)} / year
                      </span>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                        +{formatAmount(calculations.annualMigrationSavings)} / year
                      </span>
                    )}{" "}
                    <span>operational savings across {totalSeats} total users</span>
                  </div>
                </div>
              </div>

              {/* Itemized Microsoft Business Central License Breakdown Table */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                    <span>Official D365 BC License Breakdown</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Per Month</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>
                      Premium ({premiumUsers} × {currency === "INR" ? "₹9,155" : `$${calculations.ratePremium}`})
                    </span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {formatAmount(calculations.monthlyPremium)}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>
                      Essential ({essentialUsers} × {currency === "INR" ? "₹6,655" : `$${calculations.rateEssential}`})
                    </span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {formatAmount(calculations.monthlyEssential)}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>
                      Device ({deviceLicenses} × {currency === "INR" ? "₹3,780" : `$${calculations.rateDevice}`})
                    </span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {formatAmount(calculations.monthlyDevice)}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>
                      Team Member ({teamMembers} × {currency === "INR" ? "₹665" : `$${calculations.rateTeam}`})
                    </span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {formatAmount(calculations.monthlyTeam)}
                    </strong>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center font-bold text-slate-900 dark:text-slate-100">
                    <span>Monthly License Total:</span>
                    <span className="text-blue-600 dark:text-sky-400">
                      {formatAmount(calculations.monthlyLicenseTotal)} / mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[10px]">
                    <span>Annual License Investment (12 Mo):</span>
                    <span>{formatExact(calculations.annualLicenseTotal)} / yr</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[10px]">
                    <span>3-Year License Total (36 Mo):</span>
                    <span>{formatExact(calculations.threeYearLicenseTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Sub Metrics: Payback, Productivity, Hours Saved */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-blue-700 dark:text-sky-300 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Payback</span>
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                    {calculations.paybackMonths} Mo
                  </div>
                  <div className="text-[9px] text-slate-500">Break-even window</div>
                </div>

                <div className="rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>Speed Uplift</span>
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                    +{calculations.productivityUplift}%
                  </div>
                  <div className="text-[9px] text-slate-500">Process velocity</div>
                </div>

                <div className="rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Hours Saved</span>
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                    {calculations.hoursSavedPerYear.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-500">Hours/yr reclaimed</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleCelebrate();
                    onOpenContact(
                      `Dynamics 365 Business Central ${mode === "fresh" ? "Fresh Implementation" : "Migration"} (${totalSeats} seats: ${premiumUsers}P, ${essentialUsers}E, ${deviceLicenses}D, ${teamMembers}T)`
                    );
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <ShieldCheck className="w-4 h-4 text-sky-200" />
                  <span>
                    Get Itemized {currency} Business Central Proposal ({totalSeats} Seats)
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenContact(
                      `D365 Business Central Licensing Consultation (${totalSeats} Seats)`
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Custom Licensing &amp; Architecture Audit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
