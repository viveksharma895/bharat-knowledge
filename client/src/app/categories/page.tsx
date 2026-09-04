import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { categoryLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categories | Bharat Knowledge | Open Knowledge Platform",
  description:
    "Browse articles and dossiers by topic: Politics, Sports, Cinema, Business, Science & Technology, History, Geography, Culture, and Education.",
};

export default function CategoriesPage() {
  return (
    <ContentPage
      eyebrow="Categories"
      title="Browse by Category"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
        Topic Categories
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryLinks.map((cat) => (
          <a
            key={cat.href}
            href={cat.href}
            className="group rounded-2xl border border-brand-border bg-white p-5 hover:border-brand-saffron/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-brand-navy group-hover:text-brand-saffron transition-colors">
                {cat.label}
              </h3>
              <span className="material-symbols-outlined text-[20px] text-brand-saffron">
                chevron_right
              </span>
            </div>
          </a>
        ))}
      </div>
    </ContentPage>
  );
}
