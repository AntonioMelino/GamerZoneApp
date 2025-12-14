"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Obtener tema guardado en localStorage o usar 'dark' por defecto
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("gamerzone-theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    // Aplicar el tema al documento
    document.documentElement.setAttribute("data-theme", theme);
    // Guardar en localStorage
    localStorage.setItem("gamerzone-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
