import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

const CATEGORIES = [
  { name: "Appetizers", image: "appetizers.png" },
  { name: "Biryani & Bread", image: "biryani-and-bread.png" },
  { name: "Curries", image: "curries.png" },
  { name: "Indo-Chinese", image: "indo-chinese.png" },
  { name: "Dragon & Spice", image: "dragon-and-spice.png" },
  { name: "Desserts", image: "desserts.png" },
  { name: "Drinks", image: "drinks.png" },
];

export default function ExploreMenu() {
  return (
    <section className="relative w-full py-8 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Container (Border, background, and shadow only on lg+ desktop screens) */}
        <div className="rounded-none lg:rounded-[17px] border-0 lg:border border-[#DFC9A8] bg-transparent lg:bg-[#F8EFE0] px-0 lg:px-12 py-2 sm:py-4 lg:py-12 flex flex-col items-center shadow-none lg:shadow-sm overflow-hidden">
          {/* Heading - fits on a single line */}
          <div className="flex items-center justify-center w-full max-w-4xl gap-3 sm:gap-6 mb-8 sm:mb-10">
            <div className="h-px bg-[#DFBE88] flex-1 opacity-60 min-w-[20px]"></div>
            <h2 className="font-cinzel text-[15px] min-[380px]:text-[17px] sm:text-[22px] lg:text-[28px] font-bold tracking-[0.1em] sm:tracking-[0.15em] text-brand-tagline uppercase text-center px-1 sm:px-4 whitespace-nowrap">
              Explore Our Menu
            </h2>
            <div className="h-px bg-[#DFBE88] flex-1 opacity-60 min-w-[20px]"></div>
          </div>

          {/* Categories Horizontal Scroll Area */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide w-full gap-2 sm:gap-3.5 lg:gap-0 lg:divide-x lg:divide-[#DFC9A8] mb-8 sm:mb-10 px-1 sm:px-2 lg:px-0 scroll-smooth">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href="/menu"
                className="group flex flex-col items-center justify-center shrink-0 w-[76px] sm:w-[90px] lg:w-auto lg:flex-1 transition-transform hover:-translate-y-1.5 duration-300 px-0.5 sm:px-1"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-2 sm:mb-3">
                  <Image src={`/images/home/menu-categories/${category.image}`} alt={category.name} fill className="object-contain" />
                </div>
                <span className="font-outfit font-semibold text-[12px] sm:text-[13px] lg:text-[15px] text-[#6B5F60] group-hover:text-brand transition-colors text-center leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {/* View Full Menu Link */}
          <Link href="/menu" className="group flex items-center gap-2 font-outfit font-bold text-[14px] sm:text-[15px] lg:text-[16px] text-brand hover:text-brand-tagline transition-colors">
            View Full Menu
            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
