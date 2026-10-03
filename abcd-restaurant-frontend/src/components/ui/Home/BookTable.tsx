import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";

export default function BookTable() {
  return (
    <section className="relative w-full py-8 lg:py-14 overflow-hidden bg-background">
      <div className="mx-auto flex flex-col lg:flex-row max-w-[560px] md:max-w-[640px] lg:max-w-[1440px] px-6 lg:px-10 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
        
        {/* Text Content Area */}
        <div className="flex flex-col w-full lg:w-[52%] z-10">
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <span className="font-cinzel font-bold text-[12px] sm:text-[13px] lg:text-[14px] tracking-[0.2em] text-brand-tagline uppercase">
              Warm · Welcoming · Memorable
            </span>
          </div>

          <h2 className="flex flex-col text-[32px] sm:text-[40px] lg:text-[50px] leading-[1.1] lg:leading-[1.15] tracking-tight mb-3 sm:mb-5 lg:mb-8">
            <span className="font-playfair-display font-bold text-brand">
              More than a meal,
            </span>
            <span className="font-playfair-display italic font-medium text-brand-tagline mt-1">
              it&apos;s an experience.
            </span>
          </h2>

          <p className="font-outfit text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-hero-text mb-0 lg:mb-10 max-w-[480px]">
            Intimate spaces, warm hospitality and a setting that stays with you.
          </p>

          {/* Desktop CTA Button (Visible on lg+) */}
          <div className="hidden lg:block">
            <CTAButton label="Book Your Table" href="/reserve" />
          </div>
        </div>

        {/* Image Area (with CTA button overlaid at bottom right corner on sm & md) */}
        <div className="relative w-full lg:w-[48%] shrink-0 lg:order-first">
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-auto lg:aspect-[4/3] rounded-[20px] lg:rounded-[24px] overflow-hidden">
            <Image
              src="/images/home/book-order-home/dining-area.webp"
              alt="Intimate dining area"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay button on top of image at bottom right on small & medium screens */}
            <div className="lg:hidden absolute bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 z-20">
              <CTAButton
                label="Book Your Table"
                href="/reserve"
                className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-brand pl-5 sm:pl-6 pr-1.5 py-1.5 text-[13px] sm:text-[14px] font-semibold font-outfit text-btn-text transition-opacity duration-200 hover:opacity-90 shrink-0"
                circleClassName="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white"
                arrowClassName="text-brand"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
