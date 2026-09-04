import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream pt-[104px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
          <div className="h-4 bg-brand-cream-warm rounded w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="w-full aspect-[3/4] rounded-2xl bg-brand-cream-warm" />
            <div className="lg:col-span-2 space-y-4">
              <div className="h-9 bg-brand-cream-warm rounded w-2/3" />
              <div className="h-4 bg-brand-cream-warm rounded w-1/3" />
              <div className="h-4 bg-brand-cream-warm rounded w-full" />
              <div className="h-4 bg-brand-cream-warm rounded w-5/6" />
              <div className="h-4 bg-brand-cream-warm rounded w-3/4" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
