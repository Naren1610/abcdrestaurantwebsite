import ReserveHero from "@/components/ui/Reserve/ReserveHero";
import ReservationSection from "@/components/ui/Reserve/ReservationSection";

export const metadata = {
  title: "Reserve a Table | ABCD Restaurant",
  description:
    "From time-honored recipes to heartfelt hospitality, reserve your table at ABCD Restaurant.",
};

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-background">
      <ReserveHero />
      <ReservationSection />
    </main>
  );
}
