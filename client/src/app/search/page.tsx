import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchShortcut from "@/components/SearchShortcut";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Search | Bharat Knowledge | Open Knowledge Platform",
  description:
    "Search across people, places, organizations, history, culture, and more in the Bharat Knowledge archive.",
};

export default function SearchPage() {
  return (
    <>
      <SearchShortcut />
      <Header />
      <main className="pt-24 pb-16 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="pb-8 mb-8 border-b border-brand-border">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-saffron uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span>Search</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy mb-4">
              Search the Archive
            </h1>
            <p className="text-brand-slate text-lg leading-relaxed max-w-2xl">
              Find people, places, organizations, history, and culture across
              the source-backed Bharat Knowledge repository.
            </p>
          </header>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-brand-slate">
              search
            </span>
            <input
              id="main-knowledge-search"
              type="search"
              placeholder="Search people, places, events, institutions..."
              className="w-full py-4 pl-12 pr-4 rounded-2xl border border-brand-border bg-white text-brand-navy placeholder:text-brand-slate/70 focus:outline-none focus:ring-2 focus:ring-brand-saffron/40 focus:border-brand-saffron/40 shadow-subtle"
            />
          </div>

          <div className="mt-8 p-8 rounded-2xl bg-brand-navy-surface border border-white/10 text-center">
            <div className="flex items-center justify-center gap-2 text-white font-semibold mb-2">
              <span className="material-symbols-outlined text-[20px] text-brand-amber-light">
                search
              </span>
              Coming Soon
            </div>
            <p className="text-slate-300 text-sm">
              Full-text search will be enabled once content is served dynamically
              from the backend. In the meantime, explore by category.
            </p>
            <a
              href="/explore"
              className="mt-5 inline-flex items-center gap-2 bg-brand-saffron hover:bg-brand-saffron-glow text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">travel_explore</span>
              Explore Categories
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
