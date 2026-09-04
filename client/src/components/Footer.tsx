import Logo from "./Logo";

const taxonomyLinks = [
  { label: "Explore", href: "/explore" },
  { label: "People", href: "/explore/people" },
  { label: "Places", href: "/explore/places" },
  { label: "Organizations", href: "/explore/organizations" },
  { label: "History", href: "/explore/history" },
  { label: "Culture", href: "/explore/culture" },
];

const platformLinks = [
  { label: "Categories", href: "/categories" },
  { label: "About Bharat Knowledge", href: "/about" },
  { label: "Our Mission", href: "/about/mission" },
  { label: "Editorial Principles", href: "/about/editorial-principles" },
  { label: "Contact", href: "/about/contact" },
];

const integrityLinks = [
  { label: "Sources", href: "/sources" },
  { label: "Government Sources", href: "/sources/government" },
  { label: "Research & Universities", href: "/sources/research-universities" },
  { label: "Source Methodology", href: "/sources/methodology" },
  { label: "How We Verify Information", href: "/about/how-we-verify" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy-deep text-slate-400 text-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The sovereign, source-backed public knowledge infrastructure for
              India. Free, permanent, and accessible without tracking or
              paywalls.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              <span>Archived with National Academic Integrity</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Taxonomy
            </h4>
            <ul className="space-y-2.5 text-xs">
              {taxonomyLinks.map((link) => (
                <li key={link.label}>
                  <a className="hover:text-white transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a className="hover:text-white transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Integrity
            </h4>
            <ul className="space-y-2.5 text-xs">
              {integrityLinks.map((link) => (
                <li key={link.label}>
                  <a className="hover:text-white transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Bharat Knowledge. Non-profit public knowledge utility.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>English</span>
            <span>•</span>
            <span>हिन्दी</span>
            <span>•</span>
            <span>বাংলা</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">
              22 Scheduled Languages
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}