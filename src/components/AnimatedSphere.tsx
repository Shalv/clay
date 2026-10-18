import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Enact360Icon,
  EducateIcon,
  PayrollIcon,
} from "./icons/CoreEnactIcons";
import {
  AzureIcon,
  BusinessCentralIcon,
  CopilotIcon,
  DynamicsIcon,
  ExcelIcon,
  FabricIcon,
  LoopIcon,
  OneDriveIcon,
  OutlookIcon,
  PowerAutomateIcon,
  PowerBIIcon,
  PowerAppsIcon,
  PowerPlatformIcon,
  SharePointIcon,
  SqlServerIcon,
  TeamsIcon,
  VisualStudioIcon,
  VivaIcon,
} from "./icons/MicrosoftIcons";

/**
 * AnimatedSphere
 * ---------------------------------------------------------------------------
 * Hero background: uses the user-provided 3D rotating particle sphere video
 * (`/hero-particle-sphere.mp4`) as the core luminous background visual, with
 * the Microsoft Dynamics 365 Business Central mark positioned at the center
 * and Microsoft ecosystem service badges orbiting in 3D around the sphere shell.
 */

export const LOGO_ASSETS = {
  businessCentral: "/logos/dynamics-365-business-central.png",
  dynamics365: "/logos/microsoft-dynamics-365.png",
  powerBi: "/logos/microsoft-power-bi.png",
  powerPlatform: "/logos/microsoft-power-platform.webp",
  powerApps: "/logos/microsoft-power-apps.webp",
  azure: "/logos/microsoft-azure.png",
  copilot: "/logos/microsoft-copilot.svg",
  loop: "/logos/microsoft-loop.png",
  outlook: "/logos/microsoft-outlook.png",
  sqlServer: "/logos/microsoft-sql-server.svg",
  visualStudio: "/logos/microsoft-visual-studio.webp",
  educate: "/logos/coreenact-educate.png",
  payroll: "/logos/coreenact-payroll.png",
  enact360: "/logos/coreenact-360.png",
} as const;

type ServiceNode = {
  id: string;
  label: string;
  src?: string;
  Icon: React.FC<{ className?: string }>;
  inset?: number;
};

const SERVICES: ServiceNode[] = [
  { id: "powerbi", label: "Microsoft Power BI", src: LOGO_ASSETS.powerBi, inset: 74, Icon: PowerBIIcon },
  { id: "azure", label: "Microsoft Azure", src: LOGO_ASSETS.azure, inset: 80, Icon: AzureIcon },
  { id: "copilot", label: "Microsoft Copilot", src: LOGO_ASSETS.copilot, inset: 70, Icon: CopilotIcon },
  { id: "loop", label: "Microsoft Loop", src: LOGO_ASSETS.loop, inset: 66, Icon: LoopIcon },
  { id: "outlook", label: "Microsoft Outlook", src: LOGO_ASSETS.outlook, inset: 76, Icon: OutlookIcon },
  { id: "sqlserver", label: "Microsoft SQL Server", src: LOGO_ASSETS.sqlServer, inset: 68, Icon: SqlServerIcon },
  { id: "visualstudio", label: "Microsoft Visual Studio", src: LOGO_ASSETS.visualStudio, inset: 68, Icon: VisualStudioIcon },
  { id: "dynamics365", label: "Microsoft Dynamics 365", src: LOGO_ASSETS.dynamics365, inset: 78, Icon: DynamicsIcon },
  { id: "powerplatform", label: "Microsoft Power Platform", src: LOGO_ASSETS.powerPlatform, inset: 62, Icon: PowerPlatformIcon },
  { id: "powerapps", label: "Microsoft Power Apps", src: LOGO_ASSETS.powerApps, inset: 66, Icon: PowerAppsIcon },
  { id: "automate", label: "Microsoft Power Automate", Icon: PowerAutomateIcon },
  { id: "excel", label: "Microsoft Excel", Icon: ExcelIcon },
  { id: "teams", label: "Microsoft Teams", Icon: TeamsIcon },
  { id: "viva", label: "Microsoft Viva", Icon: VivaIcon },
  { id: "onedrive", label: "Microsoft OneDrive", Icon: OneDriveIcon },
  { id: "sharepoint", label: "Microsoft SharePoint", Icon: SharePointIcon },
  { id: "fabric", label: "Microsoft Fabric", Icon: FabricIcon },
  { id: "educate", label: "CoreEnact Educate", src: LOGO_ASSETS.educate, inset: 64, Icon: EducateIcon },
  { id: "payroll", label: "CoreEnact Payroll", src: LOGO_ASSETS.payroll, inset: 58, Icon: PayrollIcon },
  { id: "enact360", label: "CoreEnact 360", src: LOGO_ASSETS.enact360, inset: 58, Icon: Enact360Icon },
];

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const ORBIT_RADIUS_FACTOR = 1.05;

type FrameRotation = {
  drift: number;
  cosY: number;
  sinY: number;
  cosX: number;
  sinX: number;
};

const rotationAt = (time: number): FrameRotation => ({
  drift: time * 0.45,
  cosY: Math.cos(time * 0.3),
  sinY: Math.sin(time * 0.3),
  cosX: Math.cos(time * 0.2),
  sinX: Math.sin(time * 0.2),
});

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const spherePoint = (theta: number, phi: number, rot: FrameRotation) => {
  const st = Math.sin(theta);
  const x = st * Math.cos(phi + rot.drift);
  const y = st * Math.sin(phi + rot.drift);
  const z = Math.cos(theta);

  const newX = x * rot.cosY - z * rot.sinY;
  const newZ = x * rot.sinY + z * rot.cosY;

  const newY = y * rot.cosX - newZ * rot.sinX;
  const finalZ = y * rot.sinX + newZ * rot.cosX;

  return { x: newX, y: newY, z: finalZ };
};

const useServiceLayout = (nodes: ServiceNode[]) =>
  useMemo(
    () =>
      nodes.map((node, i) => ({
        node,
        theta: Math.acos(clamp01(1 - (2 * (i + 0.5)) / nodes.length)),
        phi: GOLDEN_ANGLE * i,
      })),
    [nodes],
  );

export const AnimatedSphere: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const { isDark } = useTheme();

  const [failedAssets, setFailedAssets] = useState<Record<string, boolean>>({});
  const [coreAssetFailed, setCoreAssetFailed] = useState(false);
  const layout = useServiceLayout(SERVICES);

  // Responsive badge and layout positioning loop
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let coreSize = 220;
    let badgeSize = 44;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const span = Math.min(width, height);
      badgeSize = Math.round(Math.min(48, Math.max(26, span * 0.065)));
      coreSize = Math.round(Math.min(280, Math.max(150, span * 0.38)));
      root.style.setProperty("--sphere-badge", `${badgeSize}px`);
      root.style.setProperty("--sphere-core", `${coreSize}px`);
    };

    resize();
    const observer =
      typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    if (observer) observer.observe(root);
    else window.addEventListener("resize", resize);

    let time = 0;

    const moveBadges = () => {
      const radius = Math.min(width, height) * 0.44;
      const rot = rotationAt(time);
      const orbitRadius = radius * ORBIT_RADIUS_FACTOR;
      const keepOut = coreSize * 0.52 + badgeSize * 0.5;

      for (let i = 0; i < layout.length; i += 1) {
        const el = badgeRefs.current[i];
        if (!el) continue;

        const { theta, phi } = layout[i];
        const point = spherePoint(theta, phi, rot);
        let dx = point.x * orbitRadius;
        let dy = point.y * orbitRadius;

        const depth = (point.z + 1) / 2;
        const scale = 0.65 + 0.4 * depth;
        let opacity = clamp01((point.z + 0.25) / 0.72) * 0.95;

        const distance = Math.hypot(dx, dy);
        if (distance < keepOut) {
          const push = keepOut / (distance || 1);
          dx *= push;
          dy *= push;
          opacity *= 0.55;
        }

        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity < 0.03 ? "hidden" : "visible";
      }

      if (!reduceMotion) {
        time += 0.016;
        frameRef.current = requestAnimationFrame(moveBadges);
      }
    };

    moveBadges();

    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [layout]);

  const badgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,0.96)",
    borderColor: isDark ? "rgba(56,189,248,0.28)" : "rgba(0,90,158,0.18)",
    boxShadow: isDark
      ? "0 0 16px rgba(56,189,248,0.22), inset 0 1px 0 rgba(255,255,255,0.06)"
      : "0 2px 10px rgba(2,32,71,0.10), inset 0 1px 0 rgba(255,255,255,0.85)",
  };

  const coreGlowStyle: React.CSSProperties = {
    opacity: isDark ? 0.95 : 0.9,
    filter: isDark
      ? "brightness(1.15) saturate(1.1) drop-shadow(0 0 24px rgba(56,189,248,0.45)) drop-shadow(0 8px 18px rgba(0,0,0,0.65))"
      : "drop-shadow(0 6px 14px rgba(2,32,71,0.18)) drop-shadow(0 0 16px rgba(0,90,158,0.15))",
  };

  return (
    <div
      ref={rootRef}
      className="relative isolate h-full w-full [--sphere-badge:44px] [--sphere-core:240px] flex items-center justify-center"
      role="img"
      aria-label="3D particle sphere background with orbiting Microsoft and CoreEnact ecosystem badges"
    >

      {/* Centerpiece: Translucent Business Central Core Logo floating in the particle field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-300"
        style={coreGlowStyle}
      >
        <div className="grid h-[var(--sphere-core)] w-[var(--sphere-core)] place-items-center">
          {!coreAssetFailed ? (
            <img
              src={LOGO_ASSETS.businessCentral}
              alt="Microsoft Dynamics 365 Business Central"
              width={260}
              height={260}
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain"
              onError={() => setCoreAssetFailed(true)}
            />
          ) : (
            <BusinessCentralIcon className="h-[92%] w-[92%]" />
          )}
        </div>
      </div>

      {/* Orbiting Ecosystem Badges in 3D Lattice */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] select-none"
      >
        {layout.map(({ node }, i) => {
          const Icon = node.Icon;
          const useAsset = Boolean(node.src && !failedAssets[node.id]);
          const fill = node.inset ?? 62;
          return (
            <div
              key={node.id}
              ref={(el) => {
                badgeRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 flex h-[var(--sphere-badge)] w-[var(--sphere-badge)] items-center justify-center rounded-full border backdrop-blur-sm will-change-transform"
              style={{
                ...badgeStyle,
                transform: "translate3d(0, 0, 0)",
                opacity: 0,
                marginLeft: "calc(var(--sphere-badge) / -2)",
                marginTop: "calc(var(--sphere-badge) / -2)",
              }}
              data-service={node.id}
            >
              {useAsset ? (
                <img
                  src={node.src}
                  alt={`${node.label} logo`}
                  width={48}
                  height={48}
                  loading="eager"
                  decoding="async"
                  className="object-contain"
                  style={{ width: `${fill}%`, height: `${fill}%` }}
                  onError={() =>
                    setFailedAssets((prev) => ({ ...prev, [node.id]: true }))
                  }
                />
              ) : (
                <Icon className="h-[62%] w-[62%]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedSphere;
