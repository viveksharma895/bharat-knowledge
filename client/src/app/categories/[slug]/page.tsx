import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { categoryLinks } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categoryLinks.map((c) => ({
    slug: c.href.split("/").filter(Boolean)[1],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryLinks.find((c) => c.href.endsWith("/" + slug));
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.label} | Bharat Knowledge | Open Knowledge Platform`,
    description: `Articles and dossiers in the ${cat.label} category.`,
  };
}

export default async function CategorySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = categoryLinks.find((c) => c.href.endsWith("/" + slug));
  if (!cat) notFound();

  return (
    <ContentPage
      eyebrow="Categories"
      title={cat.label}
      description={`${cat.label}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
    >
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-4">
        {cat.label} Overview
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
        Featured in {cat.label}
      </h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <p>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
        sit amet, consectetur, adipisci velit.
      </p>
      <h2 className="font-serif text-2xl font-bold text-brand-navy pt-6">
        Source-Backed Coverage
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
    </ContentPage>
  );
}
