export default function SubmissionCallout() {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-14 shadow-elevation relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-saffron/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest mb-4">
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
              <span>Civic Participation Charter</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Help Safeguard India&apos;s Knowledge.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Notice a missing citation, outmoded tenure date, or archival
              omission? Submit primary proof or official state gazettes for
              review by our non-partisan editorial committee.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button className="px-6 py-3.5 rounded-xl bg-brand-saffron text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-saffron-glow transition-all shadow-subtle">
                <span className="material-symbols-outlined text-[18px]">
                  add_task
                </span>
                <span>Suggest Citation / Correction</span>
              </button>
              <a
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold flex items-center justify-center gap-2 border border-white/20 transition-colors"
                href="#"
              >
                <span>Review Editorial Verification Policy</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}