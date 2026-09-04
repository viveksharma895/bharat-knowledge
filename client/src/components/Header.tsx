"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ISTClock from "./ISTClock";
import {
  topNav,
  exploreSections,
  categoryLinks,
  sourceLinks,
  aboutLinks,
} from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (open) return;
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const mobileDropdownContent: Record<
    string,
    { title: string; items: { label: string; href: string }[]; href: string }
  > = {
    Explore: {
      title: "Explore",
      href: "/explore",
      items: exploreSections.map((s) => ({ label: s.label, href: s.href })),
    },
    Categories: {
      title: "Categories",
      href: "/categories",
      items: categoryLinks,
    },
    Sources: { title: "Sources", href: "/sources", items: sourceLinks },
    About: { title: "About", href: "/about", items: aboutLinks },
  };

  return (
    <>
      <div className="h-1 w-full tricolor-stripe fixed top-0 left-0 right-0 z-50" />
      <header className="fixed top-1 left-0 right-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-border/70 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Logo />
          <nav
            ref={navRef}
            className="hidden xl:flex items-center gap-0.5 font-medium text-sm text-brand-slate"
          >
            {topNav.map((item) => {
              const active = isActive(pathname, item.href);
              const hasChildren = !!item.children && item.children.length > 0;
              return (
                <div key={item.label} className="relative group">
                  <a
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 ${
                      active
                        ? "text-brand-navy font-semibold bg-brand-navy/5"
                        : "hover:text-brand-navy hover:bg-black/5"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180">
                        expand_more
                      </span>
                    )}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron" />
                    )}
                  </a>

                  {hasChildren && item.label === "Explore" && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 w-[720px]">
                      <div className="rounded-2xl bg-white border border-brand-border shadow-elevation overflow-hidden">
                        <div className="p-3 grid grid-cols-5 gap-2">
                          {exploreSections.map((section) => (
                            <div key={section.label} className="min-w-0">
                              <a
                                href={section.href}
                                className={`block px-3 py-2 rounded-lg mb-1 transition-colors ${
                                  isActive(pathname, section.href)
                                    ? "bg-brand-navy/5 text-brand-navy"
                                    : "hover:bg-black/5 text-brand-navy"
                                }`}
                              >
                                <div className="flex items-center gap-2 font-semibold text-[13px]">
                                  <span className="material-symbols-outlined text-[16px] text-brand-saffron">
                                    {section.icon}
                                  </span>
                                  {section.label}
                                </div>
                              </a>
                              <ul className="space-y-0.5">
                                {section.children.map((child) => (
                                  <li key={child.href}>
                                    <a
                                      href={child.href}
                                      className={`block px-3 py-1 text-xs rounded-md transition-colors truncate ${
                                        isActive(pathname, child.href)
                                          ? "text-brand-navy font-semibold bg-brand-navy/5"
                                          : "text-brand-slate hover:text-brand-navy hover:bg-black/5"
                                      }`}
                                    >
                                      {child.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-brand-border px-4 py-2.5 flex items-center justify-between bg-brand-cream-warm">
                          <span className="text-xs text-brand-slate">
                            Explore the full breadth of the archive.
                          </span>
                          <a
                            href="/explore"
                            className="text-xs font-semibold text-brand-saffron hover:underline inline-flex items-center gap-1"
                          >
                            View all Explore
                            <span className="material-symbols-outlined text-[14px]">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {hasChildren && item.label !== "Explore" && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 w-64">
                      <div className="rounded-2xl bg-white border border-brand-border shadow-elevation overflow-hidden p-2">
                        <div className="px-3 py-1.5 font-semibold text-brand-navy text-xs uppercase tracking-wider">
                          {item.label}
                        </div>
                        {item.children!.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(pathname, child.href)
                                ? "text-brand-navy font-semibold bg-brand-navy/5"
                                : "text-brand-slate hover:text-brand-navy hover:bg-black/5"
                            }`}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* <a
              href="/search"
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors inline-flex items-center gap-1"
            >
              <span>Search</span>
              <span className="material-symbols-outlined text-[16px]">search</span>
            </a> */}
          </nav>

          <div className="flex items-center gap-3">
            <ISTClock />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="xl:hidden w-11 h-11 rounded-xl flex items-center justify-center border border-brand-border/70 bg-white/60 hover:bg-black/5 transition-colors cursor-pointer text-brand-navy"
            >
              <span className="material-symbols-outlined text-[24px]">
                {open ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="xl:hidden fixed inset-0 top-[84px] z-30 bg-brand-cream/95 backdrop-blur-md overflow-y-auto pb-24">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-1">
            {topNav.map((item) => {
              const active = isActive(pathname, item.href);
              const dd = mobileDropdownContent[item.label];
              const hasChildren = !!dd;
              return (
                <div
                  key={item.label}
                  className="border-b border-brand-border/60 pb-1"
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown((v) =>
                            v === item.label ? null : item.label,
                          );
                        }}
                        aria-expanded={openDropdown === item.label}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base transition-colors text-brand-navy hover:bg-black/5 cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[20px] text-brand-saffron">
                            {item.icon}
                          </span>
                          {item.label}
                        </span>
                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        >
                          expand_more
                        </span>
                      </button>
                      {openDropdown === item.label && (
                        <div className="pb-2 pl-8 pr-2 space-y-0.5">
                          <a
                            href={dd.href}
                            className="block px-3 py-2 text-sm font-semibold text-brand-saffron hover:underline"
                          >
                            {dd.title} overview
                          </a>
                          {dd.items.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive(pathname, child.href)
                                  ? "text-brand-navy font-semibold bg-brand-navy/5"
                                  : "text-brand-slate hover:text-brand-navy hover:bg-black/5"
                              }`}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-base transition-colors ${
                        active
                          ? "bg-brand-navy/5 text-brand-navy font-semibold"
                          : "text-brand-slate hover:bg-black/5 hover:text-brand-navy"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] text-brand-saffron">
                        {item.icon}
                      </span>
                      {item.label}
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-brand-saffron" />
                      )}
                    </a>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
