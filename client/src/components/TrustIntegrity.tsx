interface TrustItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  badgeIcon: string;
  badgeText: string;
  badgeColor: string;
}

const trustItems: TrustItem[] = [
  {
    icon: "verified",
    iconBg: "bg-orange-100",
    iconColor: "text-brand-saffron",
    title: "100% Primary Proof",
    description:
      "Statements link directly to original government gazettes, university publications, or documented treaties.",
    badgeIcon: "check_circle",
    badgeText: "No unvetted claims allowed",
    badgeColor: "text-emerald-700",
  },
  {
    icon: "psychology",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    title: "Multi-Party Audit",
    description:
      "Biographical and historical facts undergo impartial editorial committee scrutiny by academic historians and jurists.",
    badgeIcon: "how_to_reg",
    badgeText: "Multi-editor sign-off",
    badgeColor: "text-brand-saffron",
  },
  {
    icon: "history_edu",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    title: "Public Provenance",
    description:
      "Inspect revision timestamps, contributor metadata, and archival shelf marks with complete transparency.",
    badgeIcon: "receipt_long",
    badgeText: "Public audit ledger",
    badgeColor: "text-brand-navy",
  },
  {
    icon: "lock_open",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-800",
    title: "Universal Open Access",
    description:
      "Built as digital civic public infrastructure. Zero advertisements, zero behavioral tracking, and no paywalls.",
    badgeIcon: "public",
    badgeText: "For every citizen globally",
    badgeColor: "text-emerald-700",
  },
];

export default function TrustIntegrity() {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream-warm border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-brand-saffron font-bold text-xs uppercase tracking-widest mb-3">
            <span className="material-symbols-outlined text-[18px]">
              policy
            </span>
            <span>Audit &amp; Archival Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-navy tracking-tight leading-tight mb-4">
            Built on Sources, Not Rumours.
          </h2>
          <p className="font-sans text-base sm:text-lg text-brand-slate leading-relaxed">
            Every factual assertion must point to an official gazette, court
            judgment, peer-reviewed paper, or primary parliamentary record.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-6`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-slate leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
              <div
                className={`text-xs font-semibold ${item.badgeColor} flex items-center gap-1 pt-4 border-t border-brand-border/60`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {item.badgeIcon}
                </span>
                {item.badgeText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}