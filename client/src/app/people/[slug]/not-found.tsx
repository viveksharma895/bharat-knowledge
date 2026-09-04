import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PersonNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream pt-[104px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="material-symbols-outlined text-5xl text-brand-slate/40 mb-4 block">
            person_off
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-navy mb-3">
            Person not found
          </h1>
          <p className="text-brand-slate text-sm mb-6 leading-relaxed">
            The person you&apos;re looking for could not be found or is not
            currently available.
          </p>
          <Link
            href="/people"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-brand-saffron transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Back to People
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
