interface LanguageData {
  name: string;
  script: string | null;
  recordCount: string;
  badgeClass: string;
}

const languages: LanguageData[] = [
  {
    name: "English",
    script: "National Corpus",
    recordCount: "85,000+ Records",
    badgeClass: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "हिन्दी",
    script: "Hindi",
    recordCount: "62,000+ Records",
    badgeClass: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "বাংলা",
    script: "Bengali",
    recordCount: "Pilot Corpus",
    badgeClass: "bg-amber-100 text-amber-800",
  },
  {
    name: "मराठी",
    script: "Marathi",
    recordCount: "Pilot Corpus",
    badgeClass: "bg-amber-100 text-amber-800",
  },
  {
    name: "தமிழ்",
    script: "Tamil",
    recordCount: "Pilot Corpus",
    badgeClass: "bg-amber-100 text-amber-800",
  },
];

export default function Multilingual() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-brand-saffron font-bold text-xs uppercase tracking-widest mb-3">
            <span className="material-symbols-outlined text-[18px]">
              translate
            </span>
            <span>Linguistic Parity</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-navy tracking-tight leading-tight mb-4">
            Knowledge in the Languages of India.
          </h2>
          <p className="font-sans text-base sm:text-lg text-brand-slate leading-relaxed">
            Live native-language dossiers upholding identical citation standards
            across scheduled languages.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="p-5 rounded-2xl bg-brand-cream border border-brand-border text-center hover:border-brand-saffron transition-all"
            >
              <span className="font-serif text-xl font-bold text-brand-navy block">
                {lang.name}
              </span>
              <span className="text-xs text-brand-slate block mt-0.5">
                {lang.script}
              </span>
              <span
                className={`inline-block mt-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${lang.badgeClass}`}
              >
                {lang.recordCount}
              </span>
            </div>
          ))}
          <div className="p-5 rounded-2xl bg-white border border-brand-border text-center hover:border-brand-navy transition-all flex flex-col justify-center">
            <span className="font-serif text-lg font-bold text-brand-navy block">
              +17 More
            </span>
            <a
              className="text-xs text-brand-saffron font-semibold hover:underline mt-1"
              href="#"
            >
              Scheduled Tongues →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}