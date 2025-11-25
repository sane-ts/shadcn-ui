import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

type ResolvedTheme = "dark" | "light";
type Theme = ResolvedTheme | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const initialState = {
  theme: "system" as Theme,
  setTheme: (_theme: Theme) => {},
  resolvedTheme: "light" as ResolvedTheme,
  systemTheme: "light" as ResolvedTheme,
};

const ThemeProviderContext = createContext(initialState);

const preferDark = window.matchMedia("(prefers-color-scheme: dark)");

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const systemTheme: ResolvedTheme = useSyncExternalStore(
    (fn) => (
      preferDark.addEventListener("change", fn),
      () => preferDark.removeEventListener("change", fn)
    ),
    () => (preferDark.matches ? "dark" : "light"),
  );

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const { documentElement } = window.document;
    documentElement.classList.remove("light", "dark");
    documentElement.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      systemTheme,
      resolvedTheme,
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [systemTheme, resolvedTheme, theme, storageKey],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
