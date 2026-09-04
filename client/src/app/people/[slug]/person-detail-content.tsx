"use client";

import Link from "next/link";
import type { Person } from "@/lib/api";

function formatDate(value?: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  // Use UTC parts to avoid timezone-driven day shifts.
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const day = d.getUTCDate();
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

function ProfileImage({ person }: { person: Person }) {
  const hasImage = person.image?.url && person.image.url.trim() !== "";

  if (!hasImage) {
    return (
      <div className="w-full aspect-[3/4] rounded-2xl bg-brand-cream-warm border border-brand-border/70 flex items-center justify-center">
        <span className="material-symbols-outlined text-7xl text-brand-border">
          person
        </span>
      </div>
    );
  }

  const alt = person.image?.alt || person.name;

  return (
    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-brand-border/70">
      <img
        src={person.image!.url}
        alt={alt}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}

function QuickFacts({ person }: { person: Person }) {
  const facts: { label: string; value: string }[] = [];

  const dob = formatDate(person.dateOfBirth);
  if (dob) facts.push({ label: "Date of Birth", value: dob });

  const dod = formatDate(person.dateOfDeath);
  if (dod) facts.push({ label: "Date of Death", value: dod });

  if (person.placeOfBirth) {
    facts.push({ label: "Place of Birth", value: person.placeOfBirth });
  }

  if (person.nationality && person.nationality.length > 0) {
    facts.push({ label: "Nationality", value: person.nationality.join(", ") });
  }

  if (person.occupations && person.occupations.length > 0) {
    facts.push({ label: "Occupations", value: person.occupations.join(", ") });
  }

  if (person.categories && person.categories.length > 0) {
    const labels = person.categories
      .map((c) => c.label || c.slug)
      .filter(Boolean);
    if (labels.length > 0) {
      facts.push({ label: "Categories", value: labels.join(", ") });
    }
  }

  if (facts.length === 0) return null;

  return (
    <section aria-labelledby="quick-facts-heading">
      <h2
        id="quick-facts-heading"
        className="font-serif text-2xl font-bold text-brand-navy mb-5"
      >
        Quick Facts
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-border/70 rounded-2xl overflow-hidden border border-brand-border/70">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="bg-white p-4 sm:p-5"
          >
            <dt className="text-xs font-semibold uppercase tracking-wider text-brand-slate mb-1">
              {fact.label}
            </dt>
            <dd className="text-sm text-brand-navy font-medium">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ImageAttribution({ person }: { person: Person }) {
  const img = person.image;
  if (!img) return null;
  const hasAttribution = (img.license || img.caption || img.source || "").trim() !== "";
  if (!hasAttribution) return null;

  return (
    <p className="mt-3 text-xs text-brand-slate leading-relaxed">
      {img.caption && <span className="font-medium text-brand-navy">{img.caption}</span>}
      {img.license || img.source
        ? <>{" "}<span className="text-brand-slate">— {[img.license, img.source].filter(Boolean).join(" · ")}</span></>
        : null}
    </p>
  );
}

export default function PersonDetailContent({ person }: { person: Person }) {
  const primaryOccupation =
    person.occupations && person.occupations.length > 0
      ? person.occupations[0]
      : person.categories[0]?.label || person.categories[0]?.slug || null;

  const hasBiography = Boolean(person.biography && person.biography.trim() !== "");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-brand-slate">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand-navy transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="material-symbols-outlined text-[16px] text-brand-border">
              chevron_right
            </span>
          </li>
          <li>
            <Link href="/people" className="hover:text-brand-navy transition-colors">
              People
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="material-symbols-outlined text-[16px] text-brand-border">
              chevron_right
            </span>
          </li>
          <li className="font-semibold text-brand-navy" aria-current="page">
            {person.name}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section
        aria-labelledby="person-name"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-14"
      >
        <div className="lg:col-span-1">
          <ProfileImage person={person} />
          <ImageAttribution person={person} />
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h1
            id="person-name"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-tight"
          >
            {person.name}
          </h1>
          {primaryOccupation && (
            <p className="mt-3 text-sm font-semibold text-brand-saffron uppercase tracking-wider">
              {primaryOccupation}
            </p>
          )}
          {person.shortBio && (
            <p className="mt-5 text-base sm:text-lg text-brand-slate leading-relaxed max-w-2xl">
              {person.shortBio}
            </p>
          )}
        </div>
      </section>

      {/* Quick Facts */}
      <div className="mb-14">
        <QuickFacts person={person} />
      </div>

      {/* Biography */}
      {(hasBiography || person.shortBio) && (
        <section aria-labelledby="biography-heading" className="mb-14">
          <h2
            id="biography-heading"
            className="font-serif text-2xl font-bold text-brand-navy mb-5"
          >
            Overview
          </h2>
          {hasBiography ? (
            <div className="prose prose-slate max-w-none text-brand-slate leading-relaxed space-y-4">
              {person.biography!.split("\n").filter((line) => line.trim() !== "").map((paragraph, i) => (
                <p key={i} className="text-[15px] sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed">
              {person.shortBio}
            </p>
          )}
        </section>
      )}

      {/* Back to People */}
      <div className="pt-6 border-t border-brand-border/60">
        <Link
          href="/people"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-saffron transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Back to People
        </Link>
      </div>
    </div>
  );
}
