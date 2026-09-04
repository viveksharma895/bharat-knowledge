import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { sourceLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sources | Bharat Knowledge | Open Knowledge Platform",
  description:
    "Learn about the government sources, research, universities, books, official records, and methodology behind Bharat Knowledge.",
};

export default function SourcesPage() {
  return (
    <ContentPage
      eyebrow="Sources"
      title="Our Sources"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
        Where Our Knowledge Comes From
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {sourceLinks.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="group rounded-2xl border border-brand-border bg-white p-5 hover:border-brand-saffron/40 hover:shadow-card transition-all flex items-center justify-between"
          >
            <span className="font-medium text-brand-navy group-hover:text-brand-saffron transition-colors">
              {s.label}
            </span>
            <span className="material-symbols-outlined text-[20px] text-brand-saffron">
              chevron_right
            </span>
          </a>
        ))}
      </div>
    </ContentPage>
  );
}
