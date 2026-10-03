import Hero from "@/components/ui/Home/Hero";
import ExploreMenu from "@/components/ui/Home/ExploreMenu";
import SignatureDishes from "@/components/ui/Home/SignatureDishes";
import BookTable from "@/components/ui/Home/BookTable";
import HomeGallery from "@/components/ui/Home/HomeGallery";
import DeliveryPartners from "@/components/ui/Home/DeliveryPartners";
import WhyDineWithUs from "@/components/ui/Home/WhyDineWithUs";
import ExperienceBanner from "@/components/ui/Home/ExperienceBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ExploreMenu />
      <SignatureDishes />
      <BookTable />
      <HomeGallery />
      <DeliveryPartners />
      <WhyDineWithUs />
      <ExperienceBanner />
    </>
  );
}
