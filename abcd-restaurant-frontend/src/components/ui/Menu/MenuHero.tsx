import Image from "next/image";

const PILL_ITEMS = [
  {
    letter: "a",
    name: "Appetizers",
    icon: "/images/menu/a-text.webp",
    href: "#the-imperial-tandoor",
  },
  {
    letter: "b",
    name: "Biryani",
    icon: "/images/menu/b-text.webp",
    href: "#biryani-and-bread",
  },
  {
    letter: "c",
    name: "Curries",
    icon: "/images/menu/c-text.webp",
    href: "#curries-that-comfort",
  },
  {
    letter: "d",
    name: "Desserts",
    icon: "/images/menu/d-text.webp",
    href: "#desserts-and-drinks",
  },
];

const CATEGORIES = [
  { name: "Biryani & Bread", image: "biryani-and-bread.png", href: "#biryani-and-bread" },
  { name: "Appetizers", image: "appetizers.png", href: "#the-imperial-tandoor" },
  { name: "Curries", image: "curries.png", href: "#curries-that-comfort" },
  { name: "Indo-Chinese", image: "indo-chinese.png", href: "#indo-chinese-delights" },
  { name: "Dragon & Spice", image: "dragon-and-spice.png", href: "#indo-chinese-delights" },
  { name: "Desserts", image: "desserts.png", href: "#desserts-and-drinks" },
  { name: "Drinks", image: "drinks.png", href: "#desserts-and-drinks" },
];

export default function MenuHero() {
  return (
    <section className="relative w-full pt-12 lg:pt-16 pb-8 bg-background overflow-hidden flex flex-col">
      {/* Top Row: Text and Image (Full width to allow image to touch border edge like old) */}
      <div className="flex flex-col lg:flex-row w-full items-stretch relative z-10">
        {/* Left Side: Text Content (Aligned with Header & Footer 1440px layout) */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 lg:px-0 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          <div className="flex flex-col w-full max-w-[620px] pt-4 pb-8 pr-4 lg:pr-8 justify-center">
            {/* 1. 'Our Menu' at top */}
            <h1 className="font-playfair-display font-medium text-[64px] sm:text-[80px] lg:text-[102px] leading-[1.0] text-brand tracking-tight mb-4">Our Menu</h1>

            {/* 2. Tagline sentence below Our Menu */}
            <span className="font-inter font-bold text-[11px] sm:text-[12px] lg:text-[13px] text-brand-tagline tracking-[0.2em] uppercase mb-6 sm:mb-8 block">
              CHOOSE A LETTER TO BEGIN YOUR CULINARY JOURNEY.
            </span>

            {/* 3. 4 Pills 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[440px] mb-8">
              {PILL_ITEMS.map((pill) => (
                <a
                  key={pill.letter}
                  href={pill.href}
                  className="flex items-center gap-2.5 sm:gap-3.5 bg-[#FFFDF8] border border-[#4B2D232E] rounded-full p-1.5 pr-5 sm:pr-7 shadow-[0_2px_8px_rgba(75,45,35,0.04)] hover:shadow-md hover:border-[#4B2D2355] hover:scale-[1.02] transition-all duration-200 group cursor-pointer"
                >
                  <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] shrink-0 rounded-full bg-[#FBF3E6] border border-[#EDE4D7] overflow-hidden">
                    <Image src={pill.icon} alt={`Letter ${pill.letter.toUpperCase()}`} fill sizes="42px" className="object-contain p-1 sm:p-1.5" priority />
                  </div>
                  <span className="font-outfit font-bold text-[15px] sm:text-[16px] text-brand tracking-normal">{pill.name}</span>
                </a>
              ))}
            </div>

            {/* 4. Sentence comes down */}
            <p className="font-outfit text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.6] text-brand max-w-[480px]">
              Rooted in rich culinary traditions of the <span className="font-playfair-display italic font-medium text-brand-tagline whitespace-nowrap">Sub-Continent</span> and crafted for{" "}
              <span className="font-playfair-display italic font-medium text-brand-tagline whitespace-nowrap">Global audience.</span>
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
            {CATEGORIES.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="group flex flex-col items-center justify-center flex-1 min-w-[105px] sm:min-w-[125px] transition-transform hover:-translate-y-1.5 duration-300 px-2"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] mb-2 sm:mb-3">
                  <Image src={`/images/home/menu-categories/${category.image}`} alt={category.name} fill sizes="72px" className="object-contain drop-shadow-sm" />
                </div>
                <span className="font-outfit font-semibold text-[13px] sm:text-[14px] lg:text-[15px] text-[#2C2627] group-hover:text-brand transition-colors text-center leading-tight">
                  {category.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
