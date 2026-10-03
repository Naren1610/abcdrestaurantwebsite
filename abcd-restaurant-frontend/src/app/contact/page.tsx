import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ABCD Restaurant",
  description: "Get in touch with ABCD Restaurant.",
};

export default function ContactPage() {
  return (
    <section className="flex min-h-[50vh] sm:min-h-[60vh] items-center justify-center bg-background px-6 py-20">
      <h1 className="font-playfair-display text-center text-[18px] sm:text-[20px] md:text-[22px] font-normal text-[#511923] tracking-normal">
        This page is under development
      </h1>
    </section>
  );
}
