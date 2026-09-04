"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ISTClock from "./ISTClock";
import { navItems } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <div className="h-1 w-full tricolor-stripe fixed top-0 left-0 right-0 z-50" />
      <header className="fixed top-1 left-0 right-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-border/70 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden xl:flex items-center gap-1 font-medium text-sm text-brand-slate">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <a
                  key={item.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    active
                      ? "text-brand-navy font-semibold bg-brand-navy/5"
                      : "hover:text-brand-navy hover:bg-black/5"
                  }`}
                  href={item.href}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron" />
                  )}
                </a>
              );
            })}
          </nav>

          <ISTClock />
        </div>
      </header>
    </>
  );
}
