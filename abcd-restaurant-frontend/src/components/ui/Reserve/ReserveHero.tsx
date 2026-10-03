import Image from "next/image";

export default function ReserveHero() {
  return (
    <section
      aria-label="Table Reservation"
      className="relative w-full overflow-hidden bg-background pt-8 pb-10 sm:pb-12 lg:pt-12 lg:pb-16"
    >
      {/* Full width flex row */}
      <div className="flex flex-col lg:flex-row w-full items-center justify-between">
        
        {/* Left Content Area (Aligned with 1440px grid on desktop, centered container on mobile & medium) */}
        <div className="w-full lg:w-[52%] xl:w-[50%] flex flex-col justify-center px-6 lg:px-0 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] z-10">
          <div className="flex flex-col w-full max-w-[560px] md:max-w-[640px] lg:max-w-[680px] xl:max-w-[760px] mx-auto lg:mx-0 pr-0 lg:pr-4">
            
            {/* Heading */}
            <h1 className="font-playfair-display font-normal text-[#511923] text-[28px] min-[380px]:text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[66px] 2xl:text-[74px] leading-[1.1] tracking-tight">
              <span className="block whitespace-nowrap">The table is set.</span>
              <span className="block whitespace-nowrap font-playfair-display italic text-[#B98F56] mt-1 sm:mt-2">
                All that&apos;s left is you.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 lg:mt-8 font-inter text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.65] text-[#6B5E59] max-w-[500px]">
              From time-honored recipes to heartfelt hospitality. we create moments that linger long after the last bite.
            </p>
          </div>
        </div>

        {/* Right Dining Area Image (Matches text width on mobile/medium, edge-fade full bleed on desktop) */}
        <div className="relative mt-8 w-full flex justify-center lg:justify-end px-6 lg:px-0 lg:mt-0 lg:w-[48%] xl:w-[50%]">
          <div className="relative w-full max-w-[560px] md:max-w-[640px] lg:max-w-[680px] xl:max-w-[760px] flex justify-center lg:justify-end">
            {/* Image Container with elliptical fade mask on desktop */}
            <div
              className="relative w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[460px] overflow-hidden rounded-[20px] lg:rounded-none lg:[mask-image:radial-gradient(ellipse_100%_88%_at_96%_45%,#000_60%,rgba(0,0,0,0.65)_78%,rgba(0,0,0,0.15)_92%,transparent_100%)] lg:[-webkit-mask-image:radial-gradient(ellipse_100%_88%_at_96%_45%,#000_60%,rgba(0,0,0,0.65)_78%,rgba(0,0,0,0.15)_92%,transparent_100%)] shadow-sm lg:shadow-none"
            >
              <Image
                src="/images/about/dining-area.png"
                alt="ABCD Restaurant Dining Room"
                width={840}
                height={600}
                priority
                className="h-full w-full object-cover object-center select-none ml-auto"
              />
            </div>

            {/* Subtle feathering gradient overlays to blend seamlessly (desktop only) */}
            <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/50 to-transparent lg:w-36 z-10" />
            <div className="hidden lg:block pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/60 to-transparent lg:h-20 z-10" />
            <div className="hidden lg:block pointer-events-none absolute inset-x-0 top-0 lg:h-20 xl:h-24 bg-gradient-to-b from-background via-background/50 to-transparent z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
