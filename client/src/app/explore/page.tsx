import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { exploreSections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore | Bharat Knowledge | Open Knowledge Platform",
  description:
    "Discover people, places, organizations, history, and culture across the Bharat Knowledge archive.",
};

export default function ExplorePage() {
  return (
    <ContentPage
      eyebrow="Explore"
      title="Explore the Archive"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
        Browse by Category
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exploreSections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="group rounded-2xl border border-brand-border bg-white p-5 hover:border-brand-saffron/40 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-[22px] text-brand-saffron">
                {section.icon}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-navy">
                {section.label}
              </h3>
            </div>
            <p className="text-sm text-brand-slate mb-4">{section.description}</p>
            <ul className="space-y-1">
              {section.children.slice(0, 4).map((child) => (
                <li key={child.href} className="flex items-center gap-2 text-xs text-brand-slate">
                  <span className="w-1 h-1 rounded-full bg-brand-saffron/60" />
                  {child.label}
                </li>
              ))}
              {section.children.length > 4 && (
                <li className="text-xs text-brand-saffron font-medium">
                  +{section.children.length - 4} more
                </li>
              )}
            </ul>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy group-hover:text-brand-saffron transition-colors">
              View {section.label}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </a>
        ))}
      </div>
    </ContentPage>
  );
}
