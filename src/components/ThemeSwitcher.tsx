import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeSwitcherProps {
  compact?: boolean;
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  compact = false,
  className = "",
}) => {
  const { isDark, toggleTheme, setTheme } = useTheme();

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to high-contrast dark theme"}
        title={isDark ? "Switch to Light Theme" : "Switch to High-Contrast Dark Theme"}
        className={`relative p-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center border ${
          isDark
            ? "bg-slate-900 text-amber-300 border-slate-700 hover:bg-slate-800 hover:border-amber-400/50"
            : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
        } ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selector"
      className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        role="radio"
        aria-checked={!isDark}
        aria-label="Light mode"
        title="Light Mode"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
          !isDark
            ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium"
        }`}
      >
        <Sun className={`w-3.5 h-3.5 transition-colors ${!isDark ? "text-amber-500" : "text-slate-400"}`} />
        <span className="hidden xl:inline">Light</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        role="radio"
        aria-checked={isDark}
        aria-label="High-contrast dark mode for technical users"
        title="High-Contrast Dark Mode"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
          isDark
            ? "bg-slate-800 text-sky-400 font-bold shadow-xs border border-slate-700"
            : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"
        }`}
      >
        <Moon className={`w-3.5 h-3.5 transition-colors ${isDark ? "text-sky-400" : "text-slate-500"}`} />
        <span className="hidden xl:inline">Dark</span>
      </button>
    </div>
  );
};
