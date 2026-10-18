import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { PageType } from "../types";

interface NavbarProps {
  activePage?: PageType;
  onSelectPage?: (page: PageType, sectionId?: string) => void;
  onOpenContact: (initialInterest?: string) => void;
  onNavigate?: (sectionId: string) => void;
  onSelectAddon?: (addon: unknown) => void;
  onOpenChat?: () => void;
}

/**
 * Editorial navigation. A single solid paper bar that turns transparent over the
 * dark home hero and back to paper once the visitor scrolls. The previous
 * utility strip, theme switcher and gradient pill nav are gone: the redesign is
 * one light theme with a monochrome canvas.
 */
const NAV: Array<{ id: PageType; label: string }> = [
  { id: "solutions", label: "Solutions" },
  { id: "services", label: "Services" },
  { id: "ai-agents", label: "AI & Agents" },
  { id: "industries", label: "Industries" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "case-studies", label: "Case Studies" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "About" },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage = "home",
  onSelectPage,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: PageType) => {
    setOpen(false);
    onSelectPage?.(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Only the home page opens on a dark hero, so only there does the bar float.
  const overHero = activePage === "home" && !scrolled && !open;

  return (
    <>
      <header className={`cx-nav${overHero ? " cx-over" : ""}`}>
        <div className="cx-wrap cx-nav-in">
          <div className="cx-brand" onClick={() => go("home")} title="Coreenact home">
            <img className="cx-logo cx-logo-light" src="/coreenact-logo-light.png" alt="Coreenact Solutions" />
            <img className="cx-logo cx-logo-dark" src="/coreenact-logo-dark.png" alt="Coreenact Solutions" />
            <span className="cx-sep" />
            <img className="cx-partner" src="/Microsoft-Solutions-Partner.png" alt="Microsoft Solutions Partner" />
          </div>

          <nav className="cx-nav-links">
            {NAV.map((n) => (
              <a
                key={n.id}
                onClick={() => go(n.id)}
                className={activePage === n.id ? "cx-active" : ""}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="cx-nav-cta">
            <button className="cx-btn cx-btn-light" onClick={() => onOpenContact()}>
              Book a consultation <ArrowRight />
            </button>
          </div>

          <button className="cx-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className={`cx-drawer${open ? " cx-open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.id} onClick={() => go(n.id)}>
            {n.label}
            <ArrowUpRight size={18} />
          </a>
        ))}
        <div className="cx-drawer-foot">
          <button className="cx-btn cx-btn-ink" onClick={() => { setOpen(false); onOpenContact(); }}>
            Book a consultation <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};
