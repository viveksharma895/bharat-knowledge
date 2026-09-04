"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-elevation cursor-pointer group transition-all duration-300 hover:scale-110 hover:shadow-glow active:scale-95 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #ea580c, #f97316)",
      }}
    >
      <span className="material-symbols-outlined text-white text-[20px] transition-transform duration-300 group-hover:-translate-y-0.5">
        keyboard_arrow_up
      </span>
    </button>
  );
}
