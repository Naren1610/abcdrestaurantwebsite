"use client";

import GalleryItem from "./GalleryItem";
import { useGalleryTopPicks } from "@/hooks/use-gallery";

const POLAROID_PRESETS = [
  {
    rotationClass: "rotate-[1.5deg] sm:rotate-[2deg]",
    pinClass: "top-[-16px] sm:top-[-22px] right-4 sm:right-8 rotate-[10deg]",
  },
  {
    rotationClass: "-rotate-[2deg] sm:-rotate-[3deg]",
    pinClass: "top-[-15px] sm:top-[-20px] left-1/2 -translate-x-1/2 -rotate-[5deg]",
  },
  {
    rotationClass: "rotate-[1.5deg] sm:rotate-[2deg]",
    pinClass: "top-[-17px] sm:top-[-24px] right-5 sm:right-10 rotate-[12deg]",
  },
  {
    rotationClass: "-rotate-[1.5deg] sm:-rotate-[2deg]",
    pinClass: "top-[-15px] sm:top-[-20px] right-6 sm:right-12 -rotate-[5deg]",
  },
];

export default function HomeGallery() {
  const { data: topPicks, isLoading } = useGalleryTopPicks();

  if (isLoading) {
    return (
      <section className="relative w-full pt-0 pb-8 lg:pt-0 lg:pb-12 bg-background overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-4 xl:gap-6 mt-6 sm:mt-8">
            {POLAROID_PRESETS.map((preset, index) => (
              <div key={index} className={`w-full flex justify-center z-10 ${preset.rotationClass}`}>
                <div className="relative bg-white p-2 sm:p-3 pb-8 sm:pb-12 lg:pb-14 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex-1 min-w-0 max-w-[260px] mx-auto w-full rounded-[2px] animate-pulse">
                  <div className="w-full aspect-[9/10] bg-[#E6D5B8]/30 rounded-sm" />
                  <div className="h-3 w-24 bg-[#DFC9A8]/40 rounded-full mx-auto mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!topPicks || topPicks.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full pt-0 pb-8 lg:pt-0 lg:pb-12 bg-background overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-4 xl:gap-6 mt-6 sm:mt-8">
          {topPicks.slice(0, 4).map((item, index) => {
            const preset = POLAROID_PRESETS[index % POLAROID_PRESETS.length];
            return (
              <div key={item.id} className="w-full flex justify-center z-10">
                <GalleryItem
                  image={item.image_url}
                  rotationClass={preset.rotationClass}
                  pinClass={preset.pinClass}
                  caption={item.caption || item.title || "ABCD Moments"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
