import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // The redesign is a single editorial light theme, so the mode is locked to
  // "light" regardless of what an older visit stored. The context keeps its
  // shape so existing consumers continue to compile.
  const [theme] = useState<ThemeMode>("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
    try {
      localStorage.setItem("coreenact_theme", "light");
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    // no-op: single-theme design
  };

  const setTheme = (_newTheme: ThemeMode) => {
    // no-op: single-theme design
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
