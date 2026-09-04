import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { fetchPersonBySlug, ApiRequestError, type Person } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonDetailContent from "./person-detail-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  let name: string | undefined;
  let shortBio: string | undefined;
  let imageUrl: string | undefined;
  let imageAlt: string | undefined;

  try {
    const res = await fetchPersonBySlug(slug);
    name = res.data.name;
    shortBio = res.data.shortBio || undefined;
    imageUrl = res.data.image?.url && res.data.image.url.trim() !== "" ? res.data.image.url : undefined;
    imageAlt = res.data.image?.alt || name;
  } catch {
    // Unpublished or missing person: keep default metadata; page renders Not Found.
  }

  const title = name ? `${name} | Bharat Knowledge` : "People | Bharat Knowledge";

  const description =
    shortBio ||
    (name
      ? `A factual profile of ${name}, including biography, background, and key facts.`
      : "Explore notable people and public figures documented by Bharat Knowledge.");

  const previous = await parent;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://bharatknowledge.in/people/${slug}`,
      images: imageUrl
        ? [{ url: imageUrl, alt: imageAlt || name || slug }]
        : previous.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

async function getPersonOr404(slug: string): Promise<Person> {
  try {
    const res = await fetchPersonBySlug(slug);
    return res.data;
  } catch (err) {
    if (err instanceof ApiRequestError && err.statusCode === 404) {
      notFound();
    }
    throw err;
  }
}

export default async function PersonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const person = await getPersonOr404(slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream pt-[104px]">
        <PersonDetailContent person={person} />
      </main>
      <Footer />
    </>
  );
}
