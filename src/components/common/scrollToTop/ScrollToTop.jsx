"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll al principio cada vez que cambia la ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Puedes cambiar a "auto" si prefieres instantáneo
    });
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null; // Este componente no renderiza nada
};

export default ScrollToTop;
