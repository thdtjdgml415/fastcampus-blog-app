import { ReactNode, createContext, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

interface ThemePorps {
  children: ReactNode;
}
export const ThemeContextProvider = ({ children }: ThemePorps) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
