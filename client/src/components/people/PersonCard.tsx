import Link from "next/link";
import type { Person } from "@/lib/api";

function PersonImage({ person }: { person: Person }) {
  const hasImage = person.image?.url && person.image.url.trim() !== "";

  if (!hasImage) {
    return (
      <div className="w-full aspect-[3/4] bg-brand-cream-warm flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-brand-border">
          person
        </span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[3/4] overflow-hidden bg-slate-100">
      <img
        src={person.image!.url}
        alt={person.image!.alt || person.name}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export default function PersonCard({ person }: { person: Person }) {
  const primaryOccupation =
    person.occupations && person.occupations.length > 0
      ? person.occupations[0]
      : null;

  const primaryCategory =
    person.categories && person.categories.length > 0
      ? person.categories[0].label || person.categories[0].slug
      : null;

  return (
    <Link
      href={`/people/${person.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-brand-border/70 shadow-subtle hover:shadow-elevation transition-all duration-300"
    >
      <PersonImage person={person} />

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-saffron transition-colors">
            {person.name}
          </h3>
          {(primaryOccupation || primaryCategory) && (
            <p className="text-xs font-semibold text-brand-saffron uppercase tracking-wider mt-1">
              {primaryOccupation || primaryCategory}
            </p>
          )}
        </div>

        {person.shortBio && (
          <p className="text-sm text-brand-slate leading-relaxed line-clamp-3">
            {person.shortBio}
          </p>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-brand-border/50">
          <span className="material-symbols-outlined text-[14px] text-brand-slate/60">
            arrow_forward
          </span>
          <span className="text-xs font-semibold text-brand-navy/60 group-hover:text-brand-saffron transition-colors">
            View Dossier
          </span>
        </div>
      </div>
    </Link>
  );
}
