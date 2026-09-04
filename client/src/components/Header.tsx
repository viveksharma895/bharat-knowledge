import Logo from "./Logo";
import ISTClock from "./ISTClock";

export default function Header() {
  return (
    <>
      <div className="h-1 w-full tricolor-stripe fixed top-0 left-0 right-0 z-50" />
      <header className="fixed top-1 left-0 right-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-border/70 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden xl:flex items-center gap-1 font-medium text-sm text-brand-slate">
            <a
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors"
              href="#explore-categories"
            >
              Explore
            </a>
            <a
              className="px-3 py-1.5 rounded-lg text-brand-navy font-semibold hover:bg-black/5 transition-colors flex items-center gap-1"
              href="#featured-people"
            >
              <span>People</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron" />
            </a>
            <a
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors"
              href="#explore-categories"
            >
              Politics
            </a>
            <a
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors"
              href="#explore-categories"
            >
              Places
            </a>
            <a
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors"
              href="#explore-categories"
            >
              Organizations
            </a>
            <a
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors"
              href="#explore-categories"
            >
              History
            </a>
            <a
              className="px-3 py-1.5 rounded-lg hover:text-brand-navy hover:bg-black/5 transition-colors"
              href="#explore-categories"
            >
              Culture
            </a>
          </nav>

          <ISTClock />
        </div>
      </header>
    </>
  );
}
