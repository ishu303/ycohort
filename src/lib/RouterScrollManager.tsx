import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

export default function RouterScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fullPath = pathname + hash;

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: fullPath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    if (typeof window.clarity === "function") {
      window.clarity("set", "page_path", fullPath);
    }
  }, [pathname, hash]);

  return null;
}
