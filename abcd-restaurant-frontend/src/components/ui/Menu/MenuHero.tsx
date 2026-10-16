"use client";

import React from "react";
import Image from "next/image";
import { useClientMenu } from "@/hooks/use-menu";
import { ChevronRight } from "lucide-react";

interface PillItem {
  letter: string;
  name: string;
  icon: string;
  defaultTarget: string;
}

const BEAM_DELAYS = ["0s", "-1.25s", "-2.5s", "-3.75s"];

const PILL_ITEMS: PillItem[] = [
  {
    letter: "a",
    name: "Appetizers",
    icon: "/images/menu/a-text.webp",
    defaultTarget: "desi-chaat-andhra-bajji",
  },
  {
    letter: "b",
    name: "Biryani",
    icon: "/images/menu/b-text.webp",
    defaultTarget: "biryanis-pulavs",
  },
  {
    letter: "c",
    name: "Curries",
    icon: "/images/menu/c-text.webp",
    defaultTarget: "indo-chinese-wok-fire-noodles-fried-rice",
  },
  {
    letter: "d",
    name: "Desserts",
    icon: "/images/menu/d-text.webp",
    defaultTarget: "desserts",
  },
];

interface CategoryBarItem {
  name: string;
  image: string;
  defaultTarget: string;
  match: (title: string, letterGroup?: string | null) => boolean;
}

const CATEGORIES: CategoryBarItem[] = [
  {
    name: "Appetizers",
    image: "appetizers.png",
    defaultTarget: "desi-chaat-andhra-bajji",
    match: (_, group) => group === "A",
  },
  {
    name: "Biryani & Bread",
    image: "biryani-and-bread.png",
    defaultTarget: "biryanis-pulavs",
    match: (_, group) => group === "B",
  },
  {
    name: "Curries",
    image: "curries.png",
    defaultTarget: "curries-entrees",
    match: (title) => /curri|entree/i.test(title),
  },
  {
    name: "Indo-Chinese",
    image: "indo-chinese.png",
    defaultTarget: "indo-chinese-appetizers",
    match: (title) => /indo.*appetizer/i.test(title) || (/indo/i.test(title) && !/wok|fire|noodle/i.test(title)),
  },
  {
    name: "Dragon & Spice",
    image: "dragon-and-spice.png",
    defaultTarget: "indo-chinese-wok-fire-noodles-fried-rice",
    match: (title) => /wok|fire|noodle|dragon/i.test(title),
  },
  {
    name: "Desserts",
    image: "desserts.png",
    defaultTarget: "desserts",
    match: (title) => /dessert/i.test(title),
  },
  {
    name: "Drinks",
    image: "drinks.png",
    defaultTarget: "drinks-refreshments",
    match: (title) => /drink|refreshment|beverage/i.test(title),
  },
];

export default function MenuHero() {
  const { data: menuData } = useClientMenu();

  const getPillTarget = (letter: string, defaultTarget: string): string => {
    if (!menuData || menuData.length === 0) return defaultTarget;
    const cat = menuData.find((c) => c.letter_group?.toUpperCase() === letter.toUpperCase());
    return cat ? cat.id : defaultTarget;
  };

  const getCategoryBarTarget = (item: CategoryBarItem): string => {
    if (!menuData || menuData.length === 0) return item.defaultTarget;
    const cat = menuData.find((c) => item.match(c.title, c.letter_group));
    return cat ? cat.id : item.defaultTarget;
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    if (window.location.hash !== `#${targetId}`) {
      window.history.pushState(null, "", `#${targetId}`);
    }
    // Dispatch hashchange so MenuAccordion expands the accordion section if closed on mobile
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full pt-12 lg:pt-16 pb-8 bg-background overflow-hidden flex flex-col">
      {/* Top Row: Text and Image (Full width to allow image to touch border edge like old) */}
      <div className="flex flex-col lg:flex-row w-full items-stretch relative z-10">
        {/* Left Side: Text Content (Aligned with Header & Footer 1440px layout) */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 lg:px-0 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          <div className="flex flex-col w-full max-w-[620px] pt-4 pb-8 pr-4 lg:pr-8 justify-center">
            {/* 1. 'Our Menu' at top */}
            <h1 className="font-playfair-display font-medium text-[64px] sm:text-[80px] lg:text-[102px] leading-[1.0] text-brand tracking-tight mb-4">
              Our Menu
            </h1>

            {/* 2. Tagline sentence below Our Menu */}
            <span className="font-inter font-bold text-[11px] sm:text-[12px] lg:text-[13px] text-brand-tagline tracking-[0.2em] uppercase mb-6 sm:mb-8 block">
              CHOOSE A LETTER TO BEGIN YOUR CULINARY JOURNEY.
            </span>

            {/* 3. 4 Pills 2x2 Grid with Rotating Border Beams & 3D Tactile Depth */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[440px] mb-8">
              {PILL_ITEMS.map((pill, index) => {
                const targetId = getPillTarget(pill.letter, pill.defaultTarget);
                const delay = BEAM_DELAYS[index % BEAM_DELAYS.length];
                return (
                  <a
                    key={pill.letter}
                    href={`#${targetId}`}
                    onClick={(e) => handleScrollTo(e, targetId)}
                    className="group relative flex items-center rounded-full p-[1.5px] pb-[3px] overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 active:translate-y-[1.5px] active:scale-[0.99] shadow-[0_4px_14px_rgba(78,18,30,0.08),0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(78,18,30,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 cursor-pointer select-none"
                  >
                    {/* Static base 3D beveled track */}
                    <span
                      className="absolute inset-0 rounded-full border border-[#DFBE88]/50 border-b-[2.5px] border-b-[#C4A470] pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Continuous rotating glowing line with staggered position per button */}
                    <span
                      className="absolute inset-[-140%] pointer-events-none animate-border-beam"
                      style={{
                        animationDelay: delay,
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 50deg, rgba(223, 190, 136, 0.35) 65deg, #DFBE88 80deg, #B89047 95deg, #4E121E 115deg, transparent 130deg, transparent 360deg)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Inner 3D pill surface with subtle overhead light gradient & bevel */}
                    <span className="relative z-10 flex items-center justify-between w-full h-full bg-gradient-to-b from-white via-[#FFFDF8] to-[#F7EDE0] rounded-full p-1.5 pl-1.5 pr-3.5 sm:pr-4 border-t border-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] transition-colors duration-200 group-hover:from-white group-hover:to-[#FAF1E4]">
                      {/* Left: 3D Medallion Icon + Category Name */}
                      <span className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] shrink-0 rounded-full bg-gradient-to-b from-[#FDF8EE] to-[#F4E8D3] border border-[#E8DCB8] overflow-hidden flex items-center justify-center shadow-[0_1px_3px_rgba(78,18,30,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-transform duration-200 group-hover:scale-105">
                          <Image
                            src={pill.icon}
                            alt={`Letter ${pill.letter.toUpperCase()}`}
                            fill
                            sizes="42px"
                            className="object-contain p-1 sm:p-1.5"
                            priority
                          />
                        </span>
                        <span className="font-outfit font-bold text-[14px] sm:text-[15px] lg:text-[16px] text-brand tracking-normal truncate drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                          {pill.name}
                        </span>
                      </span>

                      {/* Right: Clean Chevron */}
                      <ChevronRight
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#8C6D46] group-hover:text-brand group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-1.5"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                );
              })}
            </div>

            {/* 4. Sentence comes down */}
            <p className="font-outfit text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.6] text-brand max-w-[480px]">
              Rooted in rich culinary traditions of the{" "}
              <span className="font-playfair-display italic font-medium text-brand-tagline whitespace-nowrap">
                Sub-Continent
              </span>{" "}
              and crafted for{" "}
              <span className="font-playfair-display italic font-medium text-brand-tagline whitespace-nowrap">
                Global audience.
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Background Image (Full bleed touching the border edge like old) */}
        <div className="relative w-full lg:w-[50%] flex items-end lg:min-h-[550px]">
          <Image
            src="/images/menu/biryani-banner.webp"
            alt="Biryani and Indian dishes"
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-auto object-contain lg:absolute lg:inset-0 lg:h-full lg:object-right"
            priority
          />
        </div>
      </div>

      {/* Categories Bar (Sitting below the image) */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10 relative z-20 mt-4 md:mt-0">
        <div className="w-full bg-[#FFFDF8] border border-[#DFBE88]/40 rounded-[20px] shadow-sm flex flex-wrap lg:flex-nowrap items-center justify-center py-5 lg:py-6 px-4 lg:px-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-center w-full gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-[#DFC9A8]/40">
            {CATEGORIES.map((category) => {
              const targetId = getCategoryBarTarget(category);
              return (
                <a
                  key={category.name}
                  href={`#${targetId}`}
                  onClick={(e) => handleScrollTo(e, targetId)}
                  className="group flex flex-col items-center justify-center flex-1 min-w-[105px] sm:min-w-[125px] transition-transform hover:-translate-y-1.5 duration-300 px-2 cursor-pointer"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] mb-2 sm:mb-3">
                    <Image
                      src={`/images/home/menu-categories/${category.image}`}
                      alt={category.name}
                      fill
                      sizes="72px"
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                  <span className="font-outfit font-semibold text-[13px] sm:text-[14px] lg:text-[15px] text-[#2C2627] group-hover:text-brand transition-colors text-center leading-tight">
                    {category.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
