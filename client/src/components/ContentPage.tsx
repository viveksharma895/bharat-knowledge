import Header from "./Header";
import Footer from "./Footer";
import SearchShortcut from "./SearchShortcut";
import ScrollToTop from "./ScrollToTop";
import Logo from "./Logo";

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ContentPage({
  eyebrow,
  title,
  description,
  children,
}: ContentPageProps) {
  return (
    <>
      <SearchShortcut />
      <Header />
      <main className="pt-24 pb-16 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="pb-10 mb-10 border-b border-brand-border">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-saffron uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>{eyebrow ?? "Bharat Knowledge"}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy mb-4">
              {title}
            </h1>
            <p className="text-brand-slate text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          </header>

          <div className="prose-sm space-y-4 text-brand-slate leading-relaxed">
            {children}
          </div>

          <div className="mt-14 p-8 rounded-2xl bg-brand-navy-surface border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-white font-semibold mb-1">
                <span className="material-symbols-outlined text-[18px] text-brand-amber-light">
                  verified
                </span>
                Verified & Source-Backed
              </div>
              <p className="text-slate-300 text-sm">
                Every entry is reviewed against primary sources and archived for
                the public good.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-brand-saffron hover:bg-brand-saffron-glow text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Back to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
