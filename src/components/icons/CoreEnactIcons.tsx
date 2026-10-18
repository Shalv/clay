import React from "react";

/**
 * CoreEnact's own product marks.
 *
 * The sphere renders the supplied artwork from public/logos/; these simplified
 * recreations exist only so a badge is never left empty if that file fails to
 * load. Colours follow the supplied artwork's blue -> violet -> pink ramp.
 */

export const EducateIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="CoreEnact Educate" role="img">
    <defs>
      <linearGradient id="ceEduGrad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#00A2FF" />
        <stop offset="52%" stopColor="#7A2FE0" />
        <stop offset="100%" stopColor="#FF2E93" />
      </linearGradient>
    </defs>
    <path d="M16 6 30 12l-14 6L2 12z" fill="url(#ceEduGrad)" />
    <path d="M9 15.5V22c0 2.5 3.1 4.5 7 4.5s7-2 7-4.5v-6.5l-7 3z" fill="url(#ceEduGrad)" opacity="0.72" />
    <path d="M27.5 13.2v7.6" stroke="url(#ceEduGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="27.5" cy="22.6" r="2" fill="url(#ceEduGrad)" />
  </svg>
);

export const PayrollIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="CoreEnact Payroll" role="img">
    <defs>
      <linearGradient id="cePayGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00C2FF" />
        <stop offset="50%" stopColor="#7A2FE0" />
        <stop offset="100%" stopColor="#FF2E93" />
      </linearGradient>
    </defs>
    <circle cx="13" cy="10" r="5" fill="url(#cePayGrad)" />
    <path d="M3 26c0-5.5 4.5-9 10-9s10 3.5 10 9z" fill="url(#cePayGrad)" opacity="0.8" />
    <circle cx="23.5" cy="21.5" r="7" fill="url(#cePayGrad)" />
    <path
      d="M20.6 18.2h5.6M20.6 20.6h5.6M24.6 18.2c1.6 0 2.4.9 2.4 2s-.9 2-2.6 2h-1.2l3 3.4"
      stroke="#fff"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const Enact360Icon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="CoreEnact 360" role="img">
    <defs>
      <linearGradient id="ce360Grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00C2FF" />
        <stop offset="50%" stopColor="#5B45E8" />
        <stop offset="100%" stopColor="#FF2E93" />
      </linearGradient>
    </defs>
    <path
      d="M25 8.5A11.5 11.5 0 1 0 28 17"
      fill="none"
      stroke="url(#ce360Grad)"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
    <path d="M28.6 18.8 24.4 13l6.4-.6z" fill="url(#ce360Grad)" />
    <circle cx="13" cy="14" r="3.4" fill="url(#ce360Grad)" />
    <path d="M7.4 22.6c0-3.1 2.5-5.2 5.6-5.2s5.6 2.1 5.6 5.2z" fill="url(#ce360Grad)" opacity="0.8" />
  </svg>
);
