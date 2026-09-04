export default function DossierShowcase() {
  return (
    <section
      className="py-20 lg:py-28 bg-brand-cream-warm border-b border-brand-border relative"
      id="profile-deep-dive"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-brand-saffron font-bold text-xs uppercase tracking-widest mb-3">
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
            <span>Living Entity Dossier Structure</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-4">
            More Than An Article.{" "}
            <br />
            <span className="italic font-serif font-normal text-slate-600">
              A Verifiable Sovereign Record.
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-brand-slate leading-relaxed">
            Every entry on Bharat Knowledge functions as a living, scholarly
            entity dossier with immutable gazette references, relational graphs,
            and multi-layered peer audits.
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-brand-border shadow-elevation overflow-hidden">
          <div className="bg-brand-navy text-white p-6 sm:p-10 border-b border-white/10 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-saffron/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="font-mono text-xs text-amber-300 font-semibold uppercase tracking-wider">
                    Entity #IN-BIO-01104
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    <span className="material-symbols-outlined text-[14px]">
                      verified
                    </span>
                    Peer-Audited Dossier
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-slate-300">
                    National Archive Index
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                  Dr. A. P. J. Abdul Kalam
                </h1>
                <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
                  Avul Pakir Jainulabdeen Abdul Kalam • 15 October 1931 – 27
                  July 2015
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-all">
                  <span className="material-symbols-outlined text-[16px]">
                    format_quote
                  </span>
                  <span>Cite Dossier</span>
                </button>
                <button className="px-4 py-2 rounded-xl bg-brand-saffron text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-saffron-glow transition-all shadow-subtle">
                  <span className="material-symbols-outlined text-[16px]">
                    download
                  </span>
                  <span>Export JSON-LD</span>
                </button>
              </div>
            </div>
          </div>
          <div className="px-6 sm:px-10 border-b border-brand-border bg-brand-cream flex items-center gap-2 overflow-x-auto text-sm font-medium">
            <button className="py-3.5 px-3 border-b-2 border-brand-saffron text-brand-navy font-bold flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-[18px] text-brand-saffron">
                article
              </span>
              <span>Overview &amp; Executive Summary</span>
            </button>
            <button className="py-3.5 px-3 border-b-2 border-transparent text-brand-slate hover:text-brand-navy transition-colors shrink-0">
              Early Life &amp; Education
            </button>
            <button className="py-3.5 px-3 border-b-2 border-transparent text-brand-slate hover:text-brand-navy transition-colors shrink-0">
              Scientific Projects (ISRO/DRDO)
            </button>
            <button className="py-3.5 px-3 border-b-2 border-transparent text-brand-slate hover:text-brand-navy transition-colors shrink-0">
              Presidency (2002–2007)
            </button>
            <button className="py-3.5 px-3 border-b-2 border-transparent text-brand-slate hover:text-brand-navy transition-colors shrink-0">
              Chronological Milestones
            </button>
            <button className="py-3.5 px-3 border-b-2 border-transparent text-brand-saffron font-semibold flex items-center gap-1 shrink-0 ml-auto">
              <span>184 Primary Citations</span>
              <span className="material-symbols-outlined text-[16px]">
                open_in_new
              </span>
            </button>
          </div>
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-navy mb-4">
                  Executive Overview
                </h3>
                <p className="font-sans text-base sm:text-lg text-brand-navy leading-relaxed mb-4">
                  <strong>A. P. J. Abdul Kalam</strong> was an Indian aerospace
                  scientist and statesman who served as the 11th President of
                  India from 2002 to 2007
                  <sup className="text-brand-saffron font-bold ml-0.5 cursor-pointer hover:underline">
                    [1]
                  </sup>
                  . Born and raised in Rameswaram, Tamil Nadu, he studied
                  physics and aerospace engineering, subsequently spending four
                  decades as a scientist and science administrator, primarily at
                  the Defence Research and Development Organisation (DRDO) and
                  Indian Space Research Organisation (ISRO)
                  <sup className="text-brand-saffron font-bold ml-0.5 cursor-pointer hover:underline">
                    [2]
                  </sup>
                  .
                </p>
                <p className="font-sans text-base text-brand-slate leading-relaxed">
                  He was intimately involved in India&apos;s civilian space
                  programme and military missile development efforts
                  <sup className="text-brand-saffron font-bold ml-0.5 cursor-pointer hover:underline">
                    [3]
                  </sup>
                  , earning the moniker{" "}
                  <em>&quot;Missile Man of India&quot;</em> for his foundational
                  work on the development of ballistic missile and satellite
                  launch vehicle technology
                  <sup className="text-brand-saffron font-bold ml-0.5 cursor-pointer hover:underline">
                    [4]
                  </sup>
                  . He also played a pivotal organisational, technical, and
                  political role in India&apos;s Pokhran-II nuclear tests in
                  1998
                  <sup className="text-brand-saffron font-bold ml-0.5 cursor-pointer hover:underline">
                    [5]
                  </sup>
                  .
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-brand-cream border border-brand-border">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy mb-4">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">
                    verified
                  </span>
                  <span>Primary Gazette Verified Attributes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-brand-border">
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                      Constitutional Role
                    </span>
                    <span className="font-semibold text-brand-navy">
                      11th President of the Republic of India
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-border">
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                      Tenure Duration
                    </span>
                    <span className="font-semibold text-brand-navy">
                      25 July 2002 – 25 July 2007
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-border">
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                      Key Space Mission
                    </span>
                    <span className="font-semibold text-brand-navy">
                      Project Director, Satellite Launch Vehicle (SLV-III)
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-border">
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                      Highest Civilian Decoration
                    </span>
                    <span className="font-semibold text-brand-navy">
                      Bharat Ratna (Gazetted 1997)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-navy mb-6">
                  Historical Milestones
                </h3>
                <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border">
                  <div className="relative">
                    <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-brand-saffron text-white flex items-center justify-center ring-4 ring-white shadow-subtle">
                      <span className="material-symbols-outlined text-[14px]">
                        rocket
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-brand-saffron uppercase">
                      1969 — Project Director, ISRO
                    </div>
                    <div className="text-base font-semibold text-brand-navy mt-1">
                      First Indigenous Satellite Launch Vehicle
                    </div>
                    <p className="text-sm text-brand-slate mt-1 leading-relaxed">
                      Spearheaded the development of India&apos;s first satellite
                      launch vehicle (SLV-III), which successfully placed the
                      Rohini satellite in near-earth orbit in July 1980.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white shadow-subtle">
                      <span className="material-symbols-outlined text-[14px]">
                        shield
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-emerald-700 uppercase">
                      1998 — Pokhran-II Strategic Operations
                    </div>
                    <div className="text-base font-semibold text-brand-navy mt-1">
                      Chief Scientific Adviser to the Prime Minister
                    </div>
                    <p className="text-sm text-brand-slate mt-1 leading-relaxed">
                      Coordinated institutional collaboration between DRDO and
                      the Department of Atomic Energy for the five strategic
                      underground nuclear weapon tests.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center ring-4 ring-white shadow-subtle">
                      <span className="material-symbols-outlined text-[14px]">
                        account_balance
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-brand-navy uppercase">
                      2002 — Electoral College Consensus
                    </div>
                    <div className="text-base font-semibold text-brand-navy mt-1">
                      Sworn In as 11th President of India
                    </div>
                    <p className="text-sm text-brand-slate mt-1 leading-relaxed">
                      Secured 922,884 electoral college votes with historic
                      cross-party support, dedicating his five-year presidency
                      to youth empowerment, education, and PURA rural
                      development models.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-brand-cream rounded-2xl border border-brand-border p-4 shadow-subtle">
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-900 shadow-inner">
                  <img
                    alt="Official presidential portrait photograph of Dr. APJ Abdul Kalam"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0k8Yze8bO01Kaj6yllMFvgHTWMYczkYnsOjMcaamEpkfYWRDlfM6gOywuzzlPFeF58g1r0mE4536xmxUPbte5Nm_dHoHOHGldHkii-iPM2EjNK2aCdUrQZx07lWIZJLMw7sJX0b-OkM0Kv2-XdviQgkgYMbdqQME7Ey7c-g5wLvXtgVBkD6PHXj7U8Sudv6YIxB6xuvaO4Gy5CHs7eHJ7s1hJsPuOJJkCR4cpZXjAm0mUaqbDS7DV"
                  />
                </div>
                <div className="text-center pb-3 border-b border-brand-border">
                  <h4 className="font-serif text-lg font-bold text-brand-navy">
                    Dr. A. P. J. Abdul Kalam
                  </h4>
                  <p className="text-xs text-brand-saffron font-semibold mt-0.5">
                    11th President of India
                  </p>
                </div>
                <div className="pt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                    <span className="text-slate-400">Born</span>
                    <span className="font-medium text-brand-navy text-right">
                      15 Oct 1931, Rameswaram, TN
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                    <span className="text-slate-400">Died</span>
                    <span className="font-medium text-brand-navy text-right">
                      27 Jul 2015 (aged 83), Shillong
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                    <span className="text-slate-400">Alma Mater</span>
                    <span className="font-medium text-brand-navy text-right">
                      MIT Chennai (Aerospace)
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                    <span className="text-slate-400">Resting Place</span>
                    <span className="font-medium text-brand-navy text-right">
                      Pei Karumbu, Rameswaram
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Notable Texts</span>
                    <span className="font-medium text-brand-navy text-right">
                      Wings of Fire, Ignited Minds
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-white border border-brand-border text-center">
                  <div className="text-[11px] font-semibold text-emerald-800 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      verified
                    </span>
                    Last Audited: September 2026
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    By Council of National Biographical Standards
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
                  <span className="material-symbols-outlined text-[18px] text-brand-saffron">
                    library_books
                  </span>
                  <span>Primary Sources Cited</span>
                </div>
                <ul className="space-y-2.5 text-xs text-brand-slate">
                  <li className="flex items-start gap-1.5">
                    <span className="font-mono text-brand-saffron font-bold">
                      [1]
                    </span>
                    <span>
                      President&apos;s Secretariat, Rashtrapati Bhavan Official
                      Gazette Archive, 2002.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-mono text-brand-saffron font-bold">
                      [2]
                    </span>
                    <span>
                      ISRO Historical Mission Technical Archive, Tech Report
                      SLV-3/1980.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-mono text-brand-saffron font-bold">
                      [3]
                    </span>
                    <span>
                      Ministry of Defence Government of India, Annual Report
                      1998–1999.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
