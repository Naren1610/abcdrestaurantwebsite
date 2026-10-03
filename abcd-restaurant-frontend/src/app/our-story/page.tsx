import type { Metadata } from "next";
import OurStory from "@/components/ui/About/OurStory";
import DineInTable from "@/components/ui/About/DineInTable";
import MeetPeople from "@/components/ui/About/MeetPeople";
import ReservationCTA from "@/components/ui/About/ReservationCTA";

export const metadata: Metadata = {
  title: "Our Story | ABCD Restaurant",
  description:
    "Discover the story behind ABCD Restaurant — where heritage meets heart, and every meal carries a memory.",
};

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Our Story Hero */}
      <OurStory />

      {/* Dine In Table */}
      <DineInTable />

      {/* Meet the Team */}
      <MeetPeople />

      {/* Reservation CTA */}
      <ReservationCTA />
    </div>
  );
}
