import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | ABCD Restaurant",
  description: "Explore the visual experience of ABCD Restaurant.",
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background pt-8 sm:pt-12">
      {/* Hero Section */}
      <section className="relative px-6 pb-6 md:pb-8 text-center max-w-4xl mx-auto">
        <h2 className="text-brand-tagline font-outfit uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
          Our Visual Journey
        </h2>
        <h1 className="font-playfair-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand mb-6 leading-tight">
          A Feast for the Eyes
        </h1>
        <p className="font-outfit text-base sm:text-lg text-brand/70 max-w-2xl mx-auto leading-relaxed">
          Step into the world of ABCD Restaurant. From our carefully crafted dishes to the 
          elegant ambiance of our dining room, experience the artistry that goes into every detail.
        </p>
      </section>

      {/* Gallery Grid Client Component */}
      <GalleryClient />
    </main>
  );
}
