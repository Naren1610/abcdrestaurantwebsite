import Image from "next/image";

export default function OurStory() {
  return (
    <section
      aria-label="Our Story"
      className="relative w-full overflow-hidden bg-background pt-8 pb-14 lg:pt-12 lg:pb-20"
    >
      {/* Full width flex row */}
      <div className="flex flex-col lg:flex-row w-full items-center justify-between">
        
        {/* Left Content (Aligned with 1440px grid on desktop, centered container on mobile & medium) */}
        <div className="w-full lg:w-[46%] xl:w-[44%] flex flex-col justify-center px-6 lg:px-0 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] z-10">
          <div className="flex flex-col w-full max-w-[560px] md:max-w-[640px] lg:max-w-[560px] mx-auto lg:mx-0 pr-0 lg:pr-6">
            {/* Main Title */}
            <h1 className="font-playfair-display text-[48px] sm:text-[64px] lg:text-[96px] font-normal leading-[1.05] tracking-tight text-[#511923]">
              Our Story
            </h1>

            {/* Subtitle */}
            <p className="mt-4 font-playfair-display text-[22px] italic leading-[1.25] text-[#B98F56] md:text-[26px] lg:mt-6 lg:max-w-[490px] lg:text-[30px]">
              Where heritage meets heart, and every meal carries a memory.
            </p>

            {/* Description */}
            <p className="mt-6 font-inter text-[16px] leading-[1.65] text-[#6B5E59] md:text-[18px] lg:mt-8 lg:max-w-[480px]">
              ABCD is more than a restaurant. It&apos;s a celebration of India&apos;s
              rich culinary heritage and the people who bring it to life. We honor
              tradition while creating experiences that feel like home.
            </p>
          </div>
        </div>

        {/* Right Hero Image (Matches text width on mobile/medium, edge-fade full bleed on desktop) */}
        <div className="relative mt-8 w-full flex justify-center lg:justify-end px-6 lg:px-0 lg:mt-0 lg:w-[54%] xl:w-[56%]">
          <div className="relative w-full max-w-[560px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[840px] flex justify-center lg:justify-end">
            {/* Image Container */}
            <div
              className="relative w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-auto overflow-hidden rounded-[20px] lg:rounded-none lg:[mask-image:radial-gradient(ellipse_100%_88%_at_96%_45%,#000_64%,rgba(0,0,0,0.65)_80%,rgba(0,0,0,0.15)_92%,transparent_100%)] lg:[-webkit-mask-image:radial-gradient(ellipse_100%_88%_at_96%_45%,#000_64%,rgba(0,0,0,0.65)_80%,rgba(0,0,0,0.15)_92%,transparent_100%)] shadow-sm lg:shadow-none"
            >
              <Image
                src="/images/about/abcd-restaurant.png"
                alt="ABCD Restaurant Exterior and Parking View"
                width={840}
                height={648}
                priority
                className="h-full lg:h-auto w-full object-cover object-center select-none ml-auto"
              />
            </div>

            {/* Subtle feathering overlays (only on desktop lg screens) */}
            <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/40 to-transparent lg:w-24" />
            <div className="hidden lg:block pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/60 to-transparent lg:h-20" />
            <div className="hidden lg:block pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background via-background/30 to-transparent lg:h-12" />
          </div>
        </div>

      </div>
    </section>
  );
}
