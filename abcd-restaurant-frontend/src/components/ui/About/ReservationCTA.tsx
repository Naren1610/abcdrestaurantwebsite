import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";

export default function ReservationCTA() {
  return (
    <section
      aria-label="Booking Call to Action"
      className="relative w-full bg-background py-8 lg:py-12"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Brand Rounded Card Banner */}
        <div className="relative w-full overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[#511923] px-8 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            
            {/* Left Column: Heading Content */}
            <div className="flex flex-col max-w-[540px]">
              {/* Tagline (10px, Semi Bold, Inter) */}
              <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B98F56]">
                WE&apos;D LOVE TO HAVE YOU
              </span>

              {/* Title (Playfair Display) */}
              <h2 className="mt-3 font-playfair-display text-[30px] sm:text-[36px] lg:text-[42px] font-normal leading-[1.15] text-white tracking-tight">
                Let&apos;s create beautiful{" "}
                <span className="block italic text-[#B98F56]">
                  memories together.
                </span>
              </h2>
            </div>

            {/* Right Column: Copy & Actions */}
            <div className="flex flex-col max-w-[420px]">
              {/* Description (14px, Inter Regular, #FFFFFFCC) */}
              <p className="font-inter text-[14px] font-normal leading-[1.65] text-[#FFFFFFCC]">
                Join us for a meal that nourishes the soul and celebrates India.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8">
                {/* Reusable CTA Button */}
                <CTAButton
                  label="Book Your Table"
                  className="inline-flex items-center gap-3 rounded-full bg-[#B98F56] pl-6 pr-1.5 py-1.5 text-[14px] sm:text-[15px] font-semibold font-outfit text-white transition-opacity duration-200 hover:opacity-90 shrink-0 shadow-sm"
                  circleClassName="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/40"
                  arrowClassName="text-white"
                />

                {/* View Our Menu Link */}
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-white transition-opacity duration-200 hover:opacity-80"
                >
                  View Our Menu
                  <span aria-hidden="true" className="text-[16px]">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
