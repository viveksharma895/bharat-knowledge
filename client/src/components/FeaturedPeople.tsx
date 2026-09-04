interface PersonData {
  name: string;
  image: string;
  years: string;
  citations: string;
  badge: string;
  badgeColor: string;
  quote: string;
  description: string;
  detail1Label: string;
  detail1Value: string;
  detail2Label: string;
  detail2Value: string;
  featured?: boolean;
  link: string;
}

const people: PersonData[] = [
  {
    name: "Mahatma Gandhi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQGs0ymkRLRRy1sqhVCkzMVd_4xtlpXWlQy-oI2-9COA9KKseCjPsjeZK8lWcjUQ3Ko8IH8Tf7jQ6nXPL94c9hL22nfPDKn94ONASyaR7OjngumxEQxQhZAVvs9tfchqv6dDWuR39BERbmF2Rs1-5f4rHi6cEkv8axGNCI6iBVWyokZSudc1gTFslboy1J8uwmhS4ArXgqCosKYdayukPPVPe_a-L10xgu5O3YJTzK5qcoBqJIKt1g",
    years: "1869 – 1948",
    citations: "412 Citations",
    badge: "Satyagraha & Independence",
    badgeColor: "bg-brand-saffron",
    quote: '"Be the change that you wish to see in the world."',
    description:
      "Pioneered the philosophy and strategic practice of nonviolent civil disobedience (Satyagraha), leading India's independence movement from British colonial rule.",
    detail1Label: "Milestone",
    detail1Value: "Dandi Salt March (1930)",
    detail2Label: "Primary Archive",
    detail2Value: "Collected Works (100 Vols)",
    link: "#profile-deep-dive",
  },
  {
    name: "Dr. B. R. Ambedkar",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ISJXKMmOMRXHYKnuI-aWf9Zn7Yi_XX9GPV9XFNPbjItQJPHAUSOWB3rnlMf-HbM0U8jMJuK_1IB4guhJRFeb7nDczJIprwSRxuJ8d7VRd19YPc5u9J6Rpcj47e72TIg2yVZgg4eRJc97jNWqlGoh2DP7zPOWVR5GL8hLJu4fIlOxXbjqRSGllg1WawCg8LbfFdI2yPNnWbn8crYxUdj_O0juYWgCS0GOWmdibSupvQ3Y2oCO3rgb",
    years: "1891 – 1956",
    citations: "388 Citations",
    badge: "Constitutional Architect",
    badgeColor: "bg-blue-600",
    quote: '"Educate, Agitate, Organise."',
    description:
      "Chairman of the Constitution Drafting Committee, revolutionary jurist, economist, and founding champion of equality and fundamental civil liberties.",
    detail1Label: "Key Office",
    detail1Value: "1st Law Minister of India",
    detail2Label: "Core Publication",
    detail2Value: "Annihilation of Caste (1936)",
    link: "#profile-deep-dive",
  },
  {
    name: "Dr. A. P. J. Abdul Kalam",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrXBWQp3AUdE4BFy8n7shMVLBhZa8ydsmYwKqKXwYnFz0TBTBIxC7a8gz_DXyyzWiHYDhZO-JJxQHdAzhIqlk3tA2mQTZuMzuMvtr7FoUzeO4L7QDtFqDtQNx938noI7HxyhBXDH5MrBYfLC1_-dZ3tEuas8R69_5xgP7AoR0hYtubjWjIRoDZDO-c9aV7fBA4vFH5qFzoKphe8Z5jkYxeDnI1daYJooNgDEOJyYFJTC21NRdYZldx",
    years: "Featured Entry",
    citations: "184 Citations",
    badge: "Aerospace & 11th President",
    badgeColor: "bg-emerald-600",
    quote: '"Dream, dream, dream. Dreams transform into thoughts."',
    description:
      'The "Missile Man of India" who helmed the SLV-III space launch vehicle project and Pokhran-II tests before serving as the beloved 11th President of the Republic.',
    detail1Label: "Presidency",
    detail1Value: "2002 – 2007 (People's President)",
    detail2Label: "Highest Award",
    detail2Value: "Bharat Ratna (1997)",
    featured: true,
    link: "#profile-deep-dive",
  },
  {
    name: "Sachin Tendulkar",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAa2kW50TLcHhV7Xj37mg-PJiL-kcCTjUuUMOYImk090dAMqnbIgZ-qow8lY91D-CrnI192aRdH69sUSXtirF3TuYxUlzAJqHOoF3C1GffT8XBGotyxfeMWJRtot1tfqMEZVsReNyxaWE22eaMcWk-8bEboigft4n-GaI9UmEpqrZTBlhBWoXZ8oq5onfjMf4tZOkPxbkWgG9kqbz2Dzje8TXUocsFoCzKukvxJKCuwHKp_4TRrANmO",
    years: "b. 1973",
    citations: "162 Citations",
    badge: "Sports & Cricket Legend",
    badgeColor: "bg-amber-600",
    quote: "100 International Centuries Record",
    description:
      "Widely regarded as one of cricket's greatest batsmen in history, serving 24 years on the national team and becoming the youngest recipient of the Bharat Ratna.",
    detail1Label: "Career Runs",
    detail1Value: "34,357 International Runs",
    detail2Label: "State Honour",
    detail2Value: "Bharat Ratna (2014)",
    link: "#explore-categories",
  },
  {
    name: "Amitabh Bachchan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADt30S8T1Xrttld_VXe10_5CqQRX299kh_XNALEPQCx393gP89caa3kIwTE4zuF5nM2AGUXiMtziSkMwnBshSdmSGLyh5cAqXx4UAUbr9gMdqgbAgsiUo4WDuMyVelnT2He7XNqZHHcpFqKhCmDSWn7E8TbjLDkku1AIxhsZ5GirfTuxTqL2WfC7ASMzCdSGUyf9dCi9osbJ1bLy3VknjmxO4V37G0olnifbAKfYGUaFRfO0hdZQ1M",
    years: "b. 1942",
    citations: "148 Citations",
    badge: "Indian Cinema & Arts",
    badgeColor: "bg-purple-700",
    quote: "Shahenshah of Indian Cinema",
    description:
      "A seminal figure across six decades of Indian cinema whose vocal presence, narrative versatility, and cultural influence transformed modern subcontinent storytelling.",
    detail1Label: "Cinematic Career",
    detail1Value: "Over 200 Feature Films",
    detail2Label: "Prestigious Award",
    detail2Value: "Dadasaheb Phalke Award (2018)",
    link: "#explore-categories",
  },
  {
    name: "Ratan Tata",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2MhWrORhAdq2cJhJ-xbZXzcyGVF39lEtQMziCzr3GL5bMeo7GPNtnvPfT7WbgC85HXmqIKPZG7huSXoSIVlxRa0MHBqyqrdijHziG_6PCRodKrySmlabBslp_wBcMPj3zg43BHDMj9YBbwdo6yxGsd5BD1EiY4xnm3fgplNGT-azJpsRpqKouonXbEWe7oqgfU0rStZMYTdhvKP9BlxFNp7atxrdjz3IDPmXSUTj9xgIrbHmov1Nf",
    years: "1937 – 2024",
    citations: "210 Citations",
    badge: "Industry & Philanthropy",
    badgeColor: "bg-teal-700",
    quote: "Chairman Emeritus, Tata Sons",
    description:
      "Industrial visionary and philanthropist who globalized Indian enterprise while structuring corporate equity into healthcare, higher education, and scientific research trusts.",
    detail1Label: "Major Contribution",
    detail1Value: "Tata Medical Center & Trusts",
    detail2Label: "Civic Honours",
    detail2Value: "Padma Vibhushan (2008)",
    link: "#explore-categories",
  },
];

export default function FeaturedPeople() {
  return (
    <section
      className="py-20 lg:py-28 bg-white border-y border-brand-border"
      id="featured-people"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-brand-saffron font-bold text-xs uppercase tracking-widest mb-3">
              <span className="material-symbols-outlined text-[18px]">
                portrait
              </span>
              <span>Curated Biographical Dossiers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-navy tracking-tight leading-tight mb-4">
              Explore People Who Shaped India
            </h2>
            <p className="font-sans text-base sm:text-lg text-brand-slate leading-relaxed">
              Archival photographic dossiers chronicling towering figures across
              constitutional law, scientific discovery, the freedom movement,
              literature, and culture.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-brand-navy uppercase tracking-wider">
                Archival Provenance
              </div>
              <div className="text-xs text-brand-slate">
                National Archives &amp; Constitutional Records
              </div>
            </div>
            <a
              className="px-4 py-2.5 rounded-xl border border-brand-border hover:border-brand-navy bg-brand-cream text-brand-navy text-sm font-semibold flex items-center gap-2 transition-all"
              href="#explore-categories"
            >
              <span>View All 28,400+ People</span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {people.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonCard({ person }: { person: PersonData }) {
  return (
    <article
      className={`group relative bg-brand-cream rounded-3xl overflow-hidden border shadow-card transition-all duration-300 flex flex-col justify-between ${
        person.featured
          ? "border-2 border-brand-saffron shadow-elevation hover:shadow-glow ring-4 ring-orange-500/10"
          : "border-brand-border hover:shadow-elevation"
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
        <img
          alt={`${person.name} - Editorial Portrait`}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          src={person.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {person.featured ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-saffron text-white shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                star
              </span>
              Featured Entry
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-brand-navy shadow-sm">
              {person.years}
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-navy/80 backdrop-blur-md text-amber-300 border border-white/20 flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">
              verified
            </span>
            {person.citations}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span
            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-white mb-1.5 ${person.badgeColor}`}
          >
            {person.badge}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            {person.name}
          </h3>
          <p className="text-xs text-slate-200 mt-1 font-light italic">
            {person.quote}
          </p>
        </div>
      </div>
      <div
        className={`p-6 flex flex-col justify-between flex-1 ${
          person.featured ? "bg-gradient-to-b from-brand-cream to-amber-50/40" : ""
        }`}
      >
        <p className="text-sm text-brand-slate leading-relaxed mb-5">
          {person.description}
        </p>
        <div className="space-y-2 mb-6 pt-4 border-t border-brand-border/80 text-xs">
          <div className="flex justify-between text-brand-slate">
            <span className="font-medium text-slate-400">
              {person.detail1Label}
            </span>
            <span className="font-semibold text-brand-navy">
              {person.detail1Value}
            </span>
          </div>
          <div className="flex justify-between text-brand-slate">
            <span className="font-medium text-slate-400">
              {person.detail2Label}
            </span>
            <span className="font-semibold text-brand-navy">
              {person.detail2Value}
            </span>
          </div>
        </div>
        <a
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
            person.featured
              ? "bg-brand-navy text-white hover:bg-brand-saffron shadow-md"
              : "bg-white hover:bg-brand-navy hover:text-white border border-brand-border text-brand-navy shadow-subtle group-hover:border-brand-navy"
          }`}
          href={person.link}
        >
          <span>
            {person.featured ? "View Full Deep Dossier" : "Examine Dossier"}
          </span>
          <span className="material-symbols-outlined text-[16px]">
            {person.featured ? "arrow_downward" : "arrow_forward"}
          </span>
        </a>
      </div>
    </article>
  );
}
