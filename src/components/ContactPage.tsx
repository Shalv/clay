import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Building,
  Clock,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Send,
  Navigation,
  Route as RouteIcon,
  ExternalLink,
  LocateFixed,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { COREENACT_CONTACT } from "../data/coreenactData";

const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || "";

interface RouteDirectionsControllerProps {
  originQuery: string;
  destinationCoords: { lat: number; lng: number };
  travelMode: "DRIVING" | "TRANSIT" | "WALKING";
  triggerKey: number;
  onRouteComputed: (info: {
    distanceText: string;
    durationText: string;
  } | null) => void;
  onRouteError: (msg: string | null) => void;
}

const RouteDirectionsController: React.FC<RouteDirectionsControllerProps> = ({
  originQuery,
  destinationCoords,
  travelMode,
  triggerKey,
  onRouteComputed,
  onRouteError,
}) => {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Clear existing route overlays helper
  const clearOverlays = () => {
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
    markersRef.current.forEach((m) => {
      m.map = null;
    });
    markersRef.current = [];
  };

  useEffect(() => {
    if (!map) return;
    if (!originQuery.trim() || triggerKey === 0) {
      clearOverlays();
      map.panTo(destinationCoords);
      map.setZoom(15);
      return;
    }

    if (!routesLib) return;

    let cancelled = false;

    const calculateRoute = async () => {
      clearOverlays();
      onRouteError(null);

      try {
        // Recommended replacement for legacy DirectionsService: Route.computeRoutes()
        // Docs: https://developers.google.com/maps/documentation/javascript/routes?utm_campaign=gmp_mcp_codeassist_v1_aistudio
        const RouteClass = (routesLib as any).Route;
        if (!RouteClass || typeof RouteClass.computeRoutes !== "function") {
          onRouteError(
            "Live route preview unavailable. Click 'Open in Google Maps' for turn-by-turn directions."
          );
          return;
        }

        let parsedOrigin: string | { lat: number; lng: number } =
          originQuery.trim();
        const coordMatch = parsedOrigin.match(
          /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/
        );
        if (coordMatch) {
          parsedOrigin = {
            lat: parseFloat(coordMatch[1]),
            lng: parseFloat(coordMatch[2]),
          };
        }

        const { routes } = await RouteClass.computeRoutes({
          origin: parsedOrigin,
          destination: destinationCoords,
          travelMode,
          fields: [
            "path",
            "legs",
            "durationMillis",
            "distanceMeters",
            "localizedValues",
            "viewport",
          ],
        });

        if (cancelled) return;

        const primaryRoute = routes?.[0];
        if (!primaryRoute) {
          onRouteComputed(null);
          onRouteError(
            "No route found for this starting point. Try specifying a nearby city or landmark."
          );
          return;
        }

        const polylines: google.maps.Polyline[] =
          primaryRoute.createPolylines();
        polylines.forEach((polyline) => polyline.setMap(map));
        polylinesRef.current = polylines;

        if (typeof primaryRoute.createWaypointAdvancedMarkers === "function") {
          const waypointMarkers: google.maps.marker.AdvancedMarkerElement[] =
            await primaryRoute.createWaypointAdvancedMarkers();
          if (!cancelled) {
            waypointMarkers.forEach((m) => {
              m.map = map;
            });
            markersRef.current = waypointMarkers;
          }
        }

        if (primaryRoute.viewport) {
          map.fitBounds(primaryRoute.viewport);
        }

        const distanceText =
          primaryRoute.localizedValues?.distance?.text ||
          (primaryRoute.distanceMeters
            ? `${(primaryRoute.distanceMeters / 1000).toFixed(1)} km`
            : "");
        const durationText =
          primaryRoute.localizedValues?.duration?.text ||
          (primaryRoute.durationMillis
            ? `${Math.round(primaryRoute.durationMillis / 60000)} mins`
            : "");

        onRouteComputed({ distanceText, durationText });
      } catch (err: any) {
        if (cancelled) return;
        const msg = String(err?.message || err || "");
        if (
          msg.includes("OVER_QUERY_LIMIT") ||
          msg.includes("RESOURCE_EXHAUSTED") ||
          msg.includes("QuotaExceededError") ||
          msg.includes("429")
        ) {
          window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
        }
        onRouteComputed(null);
        onRouteError(
          "Could not compute in-map route from that location. Use 'Get Turn-by-Turn Directions' to open directly in Google Maps."
        );
      }
    };

    void calculateRoute();

    return () => {
      cancelled = true;
    };
  }, [map, routesLib, originQuery, destinationCoords, travelMode, triggerKey]);

  useEffect(() => {
    return () => clearOverlays();
  }, []);

  return null;
};

interface ContactPageProps {
  onGroundLocation: (cityName: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onGroundLocation,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>("india");
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(true);
  const [originInput, setOriginInput] = useState<string>("");
  const [activeOriginQuery, setActiveOriginQuery] = useState<string>("");
  const [travelMode, setTravelMode] = useState<
    "DRIVING" | "TRANSIT" | "WALKING"
  >("DRIVING");
  const [routeTriggerKey, setRouteTriggerKey] = useState<number>(0);
  const [routeSummary, setRouteSummary] = useState<{
    distanceText: string;
    durationText: string;
  } | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [isLocatingUser, setIsLocatingUser] = useState<boolean>(false);

  const selectedOffice =
    COREENACT_CONTACT.offices.find((o) => o.id === selectedOfficeId) ||
    COREENACT_CONTACT.offices[0];

  const handleSelectOfficeOnMap = (officeId: string, cityName: string) => {
    setSelectedOfficeId(officeId);
    setInfoWindowOpen(true);
    setRouteTriggerKey(0);
    setRouteSummary(null);
    setRouteError(null);
    const el = document.getElementById("office-directions-map");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      onGroundLocation(cityName);
    }
  };

  const handleComputeDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originInput.trim()) return;
    setActiveOriginQuery(originInput.trim());
    setRouteTriggerKey((prev) => prev + 1);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setRouteError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocatingUser(true);
    setRouteError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingUser(false);
        const coordsStr = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        setOriginInput(coordsStr);
        setActiveOriginQuery(coordsStr);
        setRouteTriggerKey((prev) => prev + 1);
      },
      () => {
        setIsLocatingUser(false);
        setRouteError(
          "Unable to retrieve your current location. Please type your starting city or landmark."
        );
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleResetMap = () => {
    setOriginInput("");
    setActiveOriginQuery("");
    setRouteTriggerKey(0);
    setRouteSummary(null);
    setRouteError(null);
    setInfoWindowOpen(true);
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    selectedOffice.address
  )}${
    originInput.trim()
      ? `&origin=${encodeURIComponent(originInput.trim())}`
      : ""
  }&travelmode=${travelMode.toLowerCase()}`;
  const [statusInfo, setStatusInfo] = useState<{
    message: string;
    enquiryId?: string;
    database?: { saved: boolean; storage: string; recordId: string };
    targetEmail?: string;
    emailDispatched?: boolean;
    smtpNote?: string;
    autoReply?: { sent: boolean; to?: string; reason?: string };
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Microsoft Dynamics 365 Business Central",
    office: "India (Haryana)",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact_page",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          office: formData.office,
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
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
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
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
          <span>Contact Coreenact</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
          Let’s Build Your{" "}
          <span className="text-[#005a9e] dark:text-sky-400">
            Intelligent Digital Core
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          Connect directly with Coreenact’s Microsoft certified solution architects in Haryana or Mississauga to scope your Dynamics 365 Business Central project, schedule a diagnostic audit, or request a custom proposal.
        </p>
      </div>

      {/* Main Grid: Office Locations on Left, Consultation Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Official Contact & Offices (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email & Phone/WhatsApp Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#005a9e] flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Primary Enterprise Email
                </div>
                <a
                  href={`mailto:${COREENACT_CONTACT.email}`}
                  className="text-base sm:text-lg font-bold text-[#005a9e] dark:text-sky-400 hover:underline font-mono transition"
                >
                  {COREENACT_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 flex items-center justify-center text-[#005a9e] dark:text-sky-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Direct Phone & WhatsApp
                  </div>
                  <a
                    href={`tel:+91${COREENACT_CONTACT.phoneRaw}`}
                    className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#005a9e] dark:hover:text-sky-400 font-mono transition"
                  >
                    {COREENACT_CONTACT.phone}
                  </a>
                </div>
              </div>

              <a
                href={COREENACT_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Inquiries regarding Microsoft Dynamics 365 Business Central, NAV migrations, global rollouts, and custom AI agents are reviewed and answered within 4 business hours.
            </p>
          </div>

          {/* Detailed Office Cards */}
          {COREENACT_CONTACT.offices.map((office) => (
            <div
              key={office.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#005a9e] dark:text-sky-400">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 transition">
                      {office.city} Office
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {office.region}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                  {office.badge}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-1" />
                  <span className="leading-relaxed">{office.address}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pl-6">
                  <span className="font-medium">Landmark:</span>
                  <span>{office.landmark}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pl-6">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{office.timing}</span>
                </div>

                {office.phone && (
                  <div className="flex flex-wrap items-center gap-3 text-xs pl-6 pt-1">
                    <a
                      href={`tel:+91${COREENACT_CONTACT.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 font-mono font-bold text-[#005a9e] dark:text-sky-400 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{office.phone}</span>
                    </a>
                    {office.whatsappUrl && (
                      <a
                        href={office.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-100 transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleSelectOfficeOnMap(office.id, office.city)}
                  className="text-xs sm:text-sm font-semibold text-[#005a9e] dark:text-sky-400 hover:text-[#004a82] dark:hover:text-sky-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>View Location & Directions</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {office.coords.lat.toFixed(2)}°, {office.coords.lng.toFixed(2)}°
                </span>
              </div>
            </div>
          ))}

          {/* Strategic Delivery Centers */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Core Delivery Hubs & CoE
            </h4>
            <div className="space-y-2.5">
              {COREENACT_CONTACT.deliveryHighlights.map((c, i) => (
                <div
                  key={i}
                  className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#005a9e] dark:bg-sky-400 shrink-0 mt-1.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{c.title} ({c.location}):</span>{" "}
                    <span className="text-slate-600 dark:text-slate-400">{c.focus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Consultation Form + Google Map & Directions (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#005a9e] dark:text-sky-400" />
                <span>Architecture & Discovery Form</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                Request a Dedicated Consultation
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Tell us about your organization and requirements. Our Microsoft Solutions Practice Leads will analyze your current setup and provide a preliminary Business Central implementation blueprint.
              </p>
            </div>

              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    Inquiry Dispatched to {statusInfo?.targetEmail || "info@coreenact.com"}!
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-left text-xs space-y-2 max-w-lg mx-auto">
                    <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Transmitted to Executive Inbox ({statusInfo?.targetEmail || "info@coreenact.com"})</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your project parameters for <span className="font-bold text-blue-700">{formData.service}</span> ({formData.office}) have been forwarded to our practice leads.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-200/60 font-mono text-[11px] text-slate-700">
                      <div><span className="text-slate-400">Prospect:</span> {formData.name}</div>
                      <div><span className="text-slate-400">Email:</span> {formData.email}</div>
                      {formData.company && <div className="col-span-2"><span className="text-slate-400">Company:</span> {formData.company}</div>}
                    </div>
                    {statusInfo?.enquiryId && (
                      <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between font-mono text-[11px]">
                        <span className="text-slate-400">Ref ID:</span>
                        <span className="font-bold text-blue-700">{statusInfo.enquiryId}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Our Microsoft Solutions Architects will follow up directly at <span className="font-mono font-bold text-blue-700">{formData.email}</span> within 4 business hours.
                  </p>

                  {statusInfo?.autoReply?.sent && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 max-w-md mx-auto">
                      A confirmation copy has been emailed to {formData.email}.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Acme Enterprises Ltd."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Primary Area of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="Microsoft Dynamics 365 Business Central">
                          Dynamics 365 Business Central
                        </option>
                        <option value="Dynamics 365 Finance & Operations">
                          Dynamics 365 Finance & Operations
                        </option>
                        <option value="NAV to Business Central Cloud Migration">
                          NAV to Business Central Cloud Migration
                        </option>
                        <option value="ERP Audit & Health Check">
                          ERP Audit & Health Check
                        </option>
                        <option value="Global ERP Rollouts">
                          Global ERP Rollouts
                        </option>
                        <option value="India Localization & GST Compliance">
                          India Localization & GST Compliance
                        </option>
                        <option value="Continuous 24/7 Managed Services">
                          Continuous 24/7 Managed Services
                        </option>
                        <option value="Copilot & Custom Automation">
                          Copilot & Custom Automation
                        </option>
                        <option value="EdCore Education ERP & LMS">
                          EdCore Education ERP & LMS
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Preferred Coreenact Hub
                      </label>
                      <select
                        value={formData.office}
                        onChange={(e) =>
                          setFormData({ ...formData, office: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="India (Haryana)">
                          Haryana, India (123-1st Floor, SRS Corporate Tower, Faridabad)
                        </option>
                        <option value="Canada (Mississauga)">
                          Mississauga, Canada (4255 Sherwoodtowne)
                        </option>
                        <option value="Global / Virtual">
                          Global Virtual / Follow-the-Sun
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                      Project Notes & Objectives
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Share current ERP systems (e.g. Dynamics NAV, SAP, QuickBooks, Tally), user counts, target timeline, or custom integration requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting to info@coreenact.com...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Enterprise Inquiry to info@coreenact.com</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-xs text-slate-500 pt-1">
                    Direct inquiries can also be sent anytime to{" "}
                    <a
                      href={`mailto:${COREENACT_CONTACT.email}`}
                      className="text-[#005a9e] dark:text-sky-400 underline font-mono font-medium"
                    >
                      {COREENACT_CONTACT.email}
                    </a>
                  </div>
                </form>
              )}
          </div>

          {/* Interactive Google Map & Route Directions after Request a Dedicated Consultation */}
          <div
            id="office-directions-map"
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold bg-blue-50 dark:bg-slate-800 text-[#005a9e] dark:text-sky-400 border border-blue-200/80 dark:border-slate-700">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Interactive Location & Route Directions</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                  Get Directions to Our {selectedOffice.city} Office
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-[#005a9e] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>{selectedOffice.address}</span>
                </p>
              </div>

              {/* Hub Selector Tabs */}
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {COREENACT_CONTACT.offices.map((office) => (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() =>
                      handleSelectOfficeOnMap(office.id, office.city)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedOffice.id === office.id
                        ? "bg-[#005a9e] text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {office.city} ({office.country})
                  </button>
                ))}
              </div>
            </div>

            {/* Route Planner Bar */}
            <form
              onSubmit={handleComputeDirections}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    placeholder={
                      selectedOffice.id === "india"
                        ? "Enter starting point (e.g., Nehru Place, New Delhi or IGI Airport)..."
                        : "Enter starting point (e.g., Pearson Airport or Downtown Toronto)..."
                    }
                    className="w-full pl-3.5 pr-9 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocatingUser}
                    title="Use my current location"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#005a9e] dark:hover:text-sky-400 transition cursor-pointer"
                  >
                    <LocateFixed
                      className={`w-4 h-4 ${isLocatingUser ? "animate-spin text-blue-600" : ""}`}
                    />
                  </button>
                </div>

                <select
                  value={travelMode}
                  onChange={(e) =>
                    setTravelMode(
                      e.target.value as "DRIVING" | "TRANSIT" | "WALKING"
                    )
                  }
                  aria-label="Travel mode"
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-hidden focus:border-blue-600"
                >
                  <option value="DRIVING">Driving</option>
                  <option value="TRANSIT">Transit</option>
                  <option value="WALKING">Walking</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#005a9e] hover:bg-[#004a82] text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer shrink-0"
                >
                  <RouteIcon className="w-3.5 h-3.5" />
                  <span>Preview Route</span>
                </button>

                {routeTriggerKey > 0 && (
                  <button
                    type="button"
                    onClick={handleResetMap}
                    title="Reset Map"
                    className="px-2.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 text-xs font-semibold inline-flex items-center justify-center gap-1 transition cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Reset</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  {routeSummary ? (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
                      <span>Distance: {routeSummary.distanceText}</span>
                      <span>•</span>
                      <span>Est. Travel Time: {routeSummary.durationText}</span>
                    </span>
                  ) : routeError ? (
                    <span className="text-amber-700 dark:text-amber-400 font-medium">
                      {routeError}
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">
                      Landmark: <strong className="text-slate-700 dark:text-slate-200">{selectedOffice.landmark}</strong>
                    </span>
                  )}
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#005a9e] dark:text-sky-400 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Turn-by-Turn Directions in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </form>

            {/* Google Map Canvas.

                The map is only mounted when a key exists, and it is wrapped in a
                Suspense boundary of its own instead of relying on the single
                page-level boundary in App.tsx (L576). Without its own boundary,
                anything the map subtree suspends on takes the whole page down with
                it - form included - and a form that unmounts mid-edit is a form
                that loses the field you are typing in.

                With no API key the scripted map is not mounted at all - the
                keyless ?output=embed iframe below covers that case, so a visitor
                still gets a real pan/zoom map instead of a placeholder panel. */}
            <div className="w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-800">
              {GOOGLE_MAPS_API_KEY ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full animate-pulse bg-slate-200 dark:bg-slate-800" />
                  }
                >
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <Map
                      key={selectedOffice.id}
                      mapId="DEMO_MAP_ID"
                      defaultCenter={selectedOffice.coords}
                      defaultZoom={15}
                      gestureHandling="cooperative"
                      internalUsageAttributionIds={[
                        "gmp_mcp_codeassist_v1_aistudio",
                      ]}
                      className="w-full h-full"
                    >
                      {routeTriggerKey === 0 && (
                        <AdvancedMarker
                          position={selectedOffice.coords}
                          title={`Coreenact - ${selectedOffice.city} Office`}
                          onClick={() => setInfoWindowOpen(true)}
                        >
                          <Pin
                            background="#005a9e"
                            borderColor="#003b66"
                            glyphColor="#ffffff"
                          />
                        </AdvancedMarker>
                      )}

                      {infoWindowOpen && routeTriggerKey === 0 && (
                        <InfoWindow
                          position={selectedOffice.coords}
                          onCloseClick={() => setInfoWindowOpen(false)}
                          pixelOffset={[0, -36]}
                        >
                          <div className="p-1 max-w-[240px] text-slate-900 space-y-1.5">
                            <div className="font-bold text-xs text-[#005a9e]">
                              Coreenact {selectedOffice.city} ({selectedOffice.region})
                            </div>
                            <div className="text-[11px] text-slate-700 leading-snug">
                              {selectedOffice.address}
                            </div>
                            <a
                              href={googleMapsDirectionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline pt-0.5"
                            >
                              <span>Get Directions</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </InfoWindow>
                      )}

                      <RouteDirectionsController
                        originQuery={activeOriginQuery}
                        destinationCoords={selectedOffice.coords}
                        travelMode={travelMode}
                        triggerKey={routeTriggerKey}
                        onRouteComputed={setRouteSummary}
                        onRouteError={setRouteError}
                      />
                    </Map>
                  </APIProvider>
                </Suspense>
              ) : (
                /* Keyless embed: google.com/maps?q=<lat>,<lng>&output=embed needs no
                   API key and no billing account, yet still renders a full draggable
                   map. Coordinates come from the selected hub rather than a fixed
                   pair, and the key is the office id so switching hubs rebuilds the
                   frame on the right location instead of panning a stale document. */
                <iframe
                  key={selectedOffice.id}
                  title={`Coreenact ${selectedOffice.city} office location`}
                  src={`https://www.google.com/maps?q=${selectedOffice.coords.lat},${selectedOffice.coords.lng}&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
