import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedPeople from "@/components/FeaturedPeople";
import DossierShowcase from "@/components/DossierShowcase";
import ExploreCategories from "@/components/ExploreCategories";
import TrustIntegrity from "@/components/TrustIntegrity";
import Multilingual from "@/components/Multilingual";
import SubmissionCallout from "@/components/SubmissionCallout";
import Footer from "@/components/Footer";
import SearchShortcut from "@/components/SearchShortcut";

export default function Home() {
  return (
    <>
      <SearchShortcut />
      <Header />
      <main className="pt-24 pb-16">
        <Hero />
        <FeaturedPeople />
        <DossierShowcase />
        <ExploreCategories />
        <TrustIntegrity />
        <Multilingual />
        <SubmissionCallout />
      </main>
      <Footer />
    </>
  );
}