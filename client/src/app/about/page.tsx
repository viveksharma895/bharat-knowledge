import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { aboutLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Bharat Knowledge | Open Knowledge Platform",
  description:
    "About Bharat Knowledge — our mission, editorial principles, verification process, and contact details.",
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="About"
      title="About Bharat Knowledge"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
        A National Open Knowledge Infrastructure
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-6">
        Explore More
      </h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {aboutLinks.filter((l) => l.href !== "/about").map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group rounded-2xl border border-brand-border bg-white p-5 hover:border-brand-saffron/40 hover:shadow-card transition-all flex items-center justify-between"
          >
            <span className="font-medium text-brand-navy group-hover:text-brand-saffron transition-colors">
              {l.label}
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
