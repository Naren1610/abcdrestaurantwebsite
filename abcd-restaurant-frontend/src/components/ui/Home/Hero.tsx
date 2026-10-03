import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { Sparkle } from "lucide-react";

function StarIcon() {
  return <Sparkle className="w-3.5 h-3.5 text-brand fill-brand shrink-0" />;
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[640px] lg:min-h-[600px] flex flex-col lg:flex-row items-center lg:items-stretch pt-6 pb-8 lg:pt-4 lg:pb-8 bg-background">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10 flex flex-col lg:flex-row h-full items-center lg:items-stretch">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center w-full lg:w-[50%] gap-6 sm:gap-8 lg:pr-8 pt-4 pb-3 lg:pt-4 lg:pb-12">
          <h1 className="flex flex-col text-[44px] sm:text-[56px] leading-[1.1] lg:text-[80px] lg:leading-[1.15] tracking-tight">
            <span className="font-playfair-display font-bold text-brand">
              Rooted in
              <br className="hidden lg:block" /> Tradition.
            </span>
            <span className="font-playfair-display italic text-brand-tagline font-medium mt-1 lg:mt-3">
              Redefined
              <br className="hidden lg:block" /> for Today.
            </span>
          </h1>

          <p className="max-w-[480px] text-[15px] sm:text-[17px] leading-[1.6] font-outfit text-hero-text">
            From aromatic biryanis to soulful curries, every dish is a
            celebration of India's rich heritage and global flavours.
          </p>

          <div className="pt-2">
            <CTAButton
              label="Explore Our Menu"
              href="/menu"
              circleClassName="flex h-9 w-9 items-center justify-center rounded-full bg-white"
              arrowClassName="text-brand"
              className="inline-flex items-center gap-4 rounded-full bg-brand pl-6 pr-1.5 py-1.5 text-[15px] font-semibold font-outfit text-btn-text transition-opacity duration-200 hover:opacity-90 shrink-0"
            />
          </div>
        </div>

        {/* Right Column: Layered Graphic Composition & Promise Card */}
        <div className="relative w-full lg:w-[50%] flex flex-col items-center justify-center lg:justify-end lg:pb-16 mt-4 lg:mt-0 min-h-[320px] sm:min-h-[420px] lg:min-h-0">
          
          {/* Layered Graphics Container (Bhongir Fort [Left] | Handi [Center] | Taj Mahal [Right]) */}
          <div className="relative w-full flex items-center justify-center pointer-events-none my-1 lg:my-0 lg:absolute lg:inset-0 lg:left-auto lg:right-0 lg:w-[60vw]">
            {/* 1. Left Background: Bhongir Fort Illusion (Shifted slightly more to the right on lg) */}
            <div className="absolute left-[-15%] sm:left-[-10%] lg:left-[-25%] top-[-25%] sm:top-[-30%] lg:top-[-28%] w-[94%] sm:w-[86%] lg:w-[82%] h-[145%] sm:h-[150%] lg:h-[132%] opacity-85 scale-x-[-1] lg:scale-x-100">
              <Image
                src="/images/home/bhongir-fort-illusion.webp"
                alt="Bhongir Fort Line Art"
                fill
                className="object-contain object-left lg:object-right"
                priority
              />
            </div>

            {/* 2. Right Background: Taj Mahal Illusion (Flush to right screen edge) */}
            <div className="absolute right-[-12%] sm:right-[-8%] lg:right-[-18%] top-[-15%] sm:top-[-20%] lg:top-[-18%] w-[92%] sm:w-[85%] lg:w-[80%] h-[145%] sm:h-[150%] lg:h-[135%] opacity-85">
              <Image
                src="/images/home/tajmahal-illusion.webp"
                alt="Taj Mahal Line Art"
                fill
                className="object-contain object-right"
                priority
              />
            </div>

            {/* 3. Center Focal Point: Biryani Handi (Shifted further to the right on lg) */}
            <div className="relative z-10 w-[270px] sm:w-[380px] lg:w-[480px] xl:w-[540px] aspect-square drop-shadow-[0_25px_40px_rgba(75,45,35,0.22)] lg:translate-x-[160px]">
              <Image
                src="/images/home/biryani-handi.webp"
                alt="Delicious Biryani Handi"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Our Promise Card */}
          <div className="relative z-20 mt-6 lg:mt-0 lg:absolute lg:bottom-0 lg:right-8 xl:bottom-2 xl:right-10 w-[270px] rounded-[16px] border border-[#DFBE88] bg-[#FAECD2] px-8 py-7 shadow-[6px_6px_0_0_#F0DAB5,6px_6px_0_1px_#DFBE88] font-inter">
            <h3 className="mb-6 text-left text-[14px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-[#CFA061] via-[#9C5306] to-[#A56C1A] bg-clip-text text-transparent">
              Our Promise
            </h3>
            <ul className="flex flex-col gap-6 text-[15px] font-semibold text-brand">
              <li className="flex items-center gap-4">
                <StarIcon /> Authentic Recipes
              </li>
              <li className="flex items-center gap-4">
                <StarIcon /> Fresh Ingredients
              </li>
              <li className="flex items-center gap-4">
                <StarIcon /> Made with Love
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
