import Image from "next/image";

const FEATURES = [
  {
    title: "Fresh Ingredients",
    description: "Sourced daily from local farms & markets.",
    icon: "/images/home/why-dine-with-us/fresh-ingredients.png",
  },
  {
    title: "Authentic Recipes",
    description: "True to tradition, crafted with care.",
    icon: "/images/home/why-dine-with-us/authentic-recipes.png",
  },
  {
    title: "Made with Love",
    description: "Every dish is a labour of passion.",
    icon: "/images/home/why-dine-with-us/made-with-love.png",
  },
  {
    title: "Warm Hospitality",
    description: "Because you're not just a guest, you're family.",
    icon: "/images/home/why-dine-with-us/warm-hospitality.png",
  },
];

export default function WhyDineWithUs() {
  return (
    <section className="relative w-full py-10 lg:py-14 bg-background overflow-hidden">
      {/* Decorative Plant Image: visible on desktop (lg+) where margin space exists, hidden on mobile/tablet to avoid awkward cropping */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[150px] pointer-events-none z-0">
        <Image
          src="/images/home/why-dine-with-us/plant.png"
          alt="Decorative Plant"
          fill
          className="object-contain object-left"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Header Section */}
        <div className="flex items-center justify-center w-full mb-8 sm:mb-14 lg:mb-20">
          <div className="flex-1 h-[1px] bg-[#B89047] opacity-40 max-w-[60px] sm:max-w-[200px] lg:max-w-[300px]"></div>
          <h2 className="px-3 sm:px-8 text-center font-cinzel font-bold text-[16px] sm:text-[20px] lg:text-[22px] text-brand-tagline tracking-[0.12em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
            Why Dine With Us
          </h2>
          <div className="flex-1 h-[1px] bg-[#B89047] opacity-40 max-w-[60px] sm:max-w-[200px] lg:max-w-[300px]"></div>
        </div>

        {/* Features Grid: 2 columns (2 rows) on small/medium screens, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12 lg:gap-y-0">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-transparent shadow-none">
              <div className="relative w-[56px] h-[56px] sm:w-[80px] sm:h-[80px] lg:w-[110px] lg:h-[110px] mb-2 sm:mb-4 bg-transparent">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-playfair-display font-bold text-[17px] sm:text-[22px] lg:text-[26px] text-brand mb-2 sm:mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="font-outfit text-[12px] sm:text-[13px] lg:text-[14px] text-[#6A6A6A] leading-[1.5] max-w-[260px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
