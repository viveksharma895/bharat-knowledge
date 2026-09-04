import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { exploreSections } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string[] }> };

const sectionSlugs = exploreSections.map((s) => s.href.split("/").filter(Boolean));

export function generateStaticParams() {
  const params: { slug: string[] }[] = [{ slug: ["people"] }, { slug: ["places"] }, { slug: ["organizations"] }, { slug: ["history"] }, { slug: ["culture"] }];
  for (const [i, section] of exploreSections.entries()) {
    for (const child of section.children) {
      params.push({ slug: [sectionSlugs[i][1], child.href.split("/").filter(Boolean)[2]] });
    }
  }
  return params;
}

type Resolved = {
  title: string;
  description: string;
  eyebrow: string;
};

function resolve(slug: string[]): Resolved | null {
  if (slug.length === 0 || slug.length > 2) return null;
  const section = exploreSections.find((s) => s.href.endsWith("/" + slug[0]));
  if (!section) return null;

  if (slug.length === 1) {
    return {
      title: section.label,
      description: section.description,
      eyebrow: "Explore",
    };
  }

  const child = section.children.find((c) => c.href.endsWith("/" + slug[1]));
  if (!child) return null;

  return {
    title: child.label,
    description: `${section.label} — ${child.label}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    eyebrow: `${section.label} / ${child.label}`,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return { title: "Not Found" };
  return {
    title: `${r.title} | Bharat Knowledge | Open Knowledge Platform`,
    description: r.description,
  };
}

export default async function ExploreSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();
  const section = exploreSections.find((s) => s.href.endsWith("/" + slug[0]))!;
  const child = slug.length === 2 ? section.children.find((c) => c.href.endsWith("/" + slug[1])) : undefined;

  return (
    <ContentPage eyebrow={r.eyebrow} title={r.title} description={r.description}>
      {child ? (
        <>
          <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
            {child.label} Overview
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h2 className="font-serif text-2xl font-bold text-brand-navy pt-6">
            Explore {child.label}
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <h2 className="font-serif text-2xl font-bold text-brand-navy pt-6">
            Source-Backed Entries
          </h2>
          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur.
          </p>
          <p>
            Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero
            eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas
            molestias excepturi sint occaecati cupiditate non provident.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
            A Breadth of Knowledge
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h2 className="font-serif text-2xl font-bold text-brand-navy pt-6">
            Structured &amp; Verifiable
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {section.children.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-brand-border bg-white hover:border-brand-saffron/40 hover:shadow-card transition-all text-sm font-medium text-brand-navy"
              >
                {c.label}
                <span className="material-symbols-outlined text-[18px] text-brand-saffron">
                  chevron_right
                </span>
              </a>
            ))}
          </div>
        </>
      )}
    </ContentPage>
  );
}
