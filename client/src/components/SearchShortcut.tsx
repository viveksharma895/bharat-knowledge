"use client";

import { useEffect } from "react";

export default function SearchShortcut() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("main-knowledge-search");
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}