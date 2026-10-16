import Image from "next/image";

export default function DineInTable() {
  return (
    <section
      aria-label="A Table Shaped by Memory"
      className="relative w-full border-y border-[#EDE0CB] py-10 lg:py-14"
      style={{ backgroundColor: "#F6EEDF80" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-start gap-10 lg:gap-14 xl:gap-16">
          {/* Left Column: Desktop Dining Area Image (Visible on lg+) */}
          <div suppressHydrationWarning className="hidden lg:block relative w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] h-[350px] shrink-0 overflow-hidden rounded-[20px] lg:rounded-[24px] shadow-sm">
            <Image
              src="/images/about/dining-area.png"
              alt="ABCD Restaurant Dining Area"
              fill
              className="object-cover object-center select-none"
            />
          </div>

          {/* Right Column: Story Text Content */}
          <div className="flex flex-col justify-center flex-1 max-w-[560px] md:max-w-[640px] lg:max-w-[560px] w-full mx-auto lg:mx-0">
            {/* Tagline + Diamond Arc Icon */}
            <div className="flex items-center gap-3">
              <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.15em] text-[#B98F56]">
                A TABLE SHAPED BY MEMORY
              </span>
              <Image
                src="/images/about/diamond-arc-02.svg"
                alt=""
                width={44}
                height={9}
                className="h-auto w-11 object-contain select-none"
              />
            </div>

            {/* Title (48px) */}
            <h2 className="mt-4 font-playfair-display text-[32px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.18] tracking-tight text-[#511923]">
              It began with{" "}
              <span className="block italic text-[#B98F56]">
                a seat at our table.
              </span>
            </h2>

            {/* Mobile/Tablet Dining Area Image (Between Title and Description on small & medium screens) */}
            <div suppressHydrationWarning className="lg:hidden my-6 relative w-full h-[250px] sm:h-[320px] md:h-[380px] overflow-hidden rounded-[20px] shadow-sm">
              <Image
                src="/images/about/dining-area.png"
                alt="ABCD Restaurant Dining Area"
                fill
                className="object-cover object-center select-none"
              />
            </div>

            {/* Description (16px) */}
            <p className="mt-2 lg:mt-6 font-inter text-[15px] sm:text-[16px] leading-[1.75] text-[#6B5E59]">
              Our founder grew up in a small Indian town where Sundays meant
              slow-cooked meals, bustling kitchens, and stories passed down through
              generations. ABCD was born from that same spirit to share the comfort,
              diversity, and depth of Indian cuisine with our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
