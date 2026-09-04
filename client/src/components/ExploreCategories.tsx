interface CategoryData {
  title: string;
  icon: string;
  count: string;
  description: string;
  tags: string[];
  href: string;
}

const categories: CategoryData[] = [
  {
    title: "People",
    icon: "group",
    count: "28,400+ Entries",
    description:
      "Visionary reformers, freedom fighters, scientists, jurists, poets, sportspersons, and social pioneers across millennia.",
    tags: ["Freedom Fighters", "Jurists", "Nobel Laureates"],
    href: "#featured-people",
  },
  {
    title: "Polity & Statecraft",
    icon: "account_balance",
    count: "9,200+ Entries",
    description:
      "Constituent Assembly debates, Supreme Court constitutional bench rulings, statutory bodies, and legislative statutes.",
    tags: ["Lok Sabha", "Supreme Court", "Amendments"],
    href: "#",
  },
  {
    title: "Places & Geography",
    icon: "map",
    count: "14,100+ Entries",
    description:
      "States, Union Territories, river basins, ancient capitals, UNESCO World Heritage monuments, and biospheres.",
    tags: ["UNESCO Sites", "States & UTs", "Rivers"],
    href: "#",
  },
  {
    title: "Organizations & Science",
    icon: "corporate_fare",
    count: "8,700+ Entries",
    description:
      "Premier defense laboratories, ISRO launch complexes, IITs, IIMs, atomic research centres, and public trusts.",
    tags: ["ISRO", "DRDO", "CSIR Labs"],
    href: "#",
  },
  {
    title: "History & Milestones",
    icon: "auto_stories",
    count: "16,300+ Entries",
    description:
      "Freedom movement archives, ancient civilizational chronologies, diplomatic treaties, and national events.",
    tags: ["1947 Freedom", "Treaties", "Civilizations"],
    href: "#",
  },
  {
    title: "Culture & Heritage",
    icon: "palette",
    count: "11,900+ Entries",
    description:
      "Classical music gharanas, classical dance traditions, living languages, architectural orders, and arts.",
    tags: ["22 Languages", "Classical Dance", "Architecture"],
    href: "#",
  },
];

export default function ExploreCategories() {
  return (
    <section
      className="py-20 lg:py-28 bg-white border-b border-brand-border"
      id="explore-categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-brand-saffron font-bold text-xs uppercase tracking-widest mb-3">
              <span className="material-symbols-outlined text-[18px]">
                category
              </span>
              <span>Comprehensive Knowledge Taxonomy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-navy tracking-tight leading-tight mb-4">
              Explore India
            </h2>
            <p className="font-sans text-base sm:text-lg text-brand-slate leading-relaxed">
              Granular thematic indices covering geography, scientific
              institutions, parliamentary polity, monuments, and cultural
              traditions.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-saffron hover:text-brand-navy transition-colors"
            href="#"
          >
            <span>Explore Entire Knowledge Index</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: CategoryData }) {
  return (
    <a
      className="group p-8 rounded-3xl bg-brand-cream border border-brand-border hover:border-brand-saffron/80 hover:shadow-elevation transition-all duration-300 flex flex-col justify-between"
      href={category.href}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white border border-brand-border flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors shadow-subtle">
            <span className="material-symbols-outlined text-[28px]">
              {category.icon}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white border border-brand-border text-brand-navy">
            {category.count}
          </span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-navy mb-2 group-hover:text-brand-saffron transition-colors">
          {category.title}
        </h3>
        <p className="text-sm text-brand-slate leading-relaxed mb-6">
          {category.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 text-xs text-slate-500 pt-4 border-t border-brand-border/60">
        {category.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-white rounded-lg border border-brand-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}