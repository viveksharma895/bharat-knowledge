import { Suspense } from "react";
import PeopleContent from "./people-content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PeoplePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream pt-[104px]">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <span className="material-symbols-outlined text-4xl text-brand-slate/40 animate-spin block mb-4">
                progress_activity
              </span>
              <p className="text-sm text-brand-slate">Loading...</p>
            </div>
          }
        >
          <PeopleContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
