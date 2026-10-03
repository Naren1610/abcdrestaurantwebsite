import Logo from "@/components/ui/Logo";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

export default function ExperienceBanner() {
  return (
    <section className="relative w-full py-8 lg:py-10 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="relative w-full rounded-[12px] lg:rounded-[8px] bg-[#571621] overflow-hidden h-[220px] min-[420px]:h-[240px] sm:h-[270px] md:h-[300px] lg:h-[384px] shadow-lg">

          {/* Left Floral Accent */}
          <div className="absolute left-0 sm:left-[1%] lg:left-[21%] bottom-0 h-[80%] sm:h-[84%] lg:h-[83%] w-[24%] sm:w-[18%] lg:w-[14%] max-w-[200px] pointer-events-none z-10 opacity-70 sm:opacity-85 lg:opacity-100">
            <Image
              src="/images/home/ready-to-experience/clean_floral_left.png"
              alt=""
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Logo (Desktop lg+ only) */}
          <div className="hidden lg:flex absolute left-[3%] sm:left-[4%] lg:left-[5%] top-1/2 -translate-y-1/2 w-[28%] sm:w-[22%] lg:w-[17%] max-w-[210px] z-20 flex-col items-center justify-center">
            <Logo 
              showTagline={true}
              logoClassName="[filter:brightness(0)_saturate(100%)_invert(67%)_sepia(19%)_saturate(1376%)_hue-rotate(355deg)_brightness(89%)_contrast(90%)]"
              taglineClassName="text-[6px] sm:text-[8px] lg:text-[10px] text-[#C59B58] tracking-[0.15em] sm:tracking-[0.2em] !mt-2 whitespace-nowrap text-center"
              className="w-full h-auto !items-center"
            />
          </div>

          {/* Right Floral Accent */}
          <div className="absolute right-0 sm:right-[1%] lg:right-[24%] top-0 h-[75%] sm:h-[80%] lg:h-[76%] w-[24%] sm:w-[18%] lg:w-[14%] max-w-[200px] pointer-events-none z-10 opacity-70 sm:opacity-85 lg:opacity-100">
            <Image
              src="/images/home/ready-to-experience/clean_floral_right.png"
              alt=""
              fill
              className="object-contain object-top"
            />
          </div>

          {/* Taj Mahal (Desktop lg+ on right) */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[70%] sm:h-[75%] lg:h-[78%] w-[30%] sm:w-[28%] lg:w-[25%] max-w-[320px] pointer-events-none z-10">
            <Image
              src="/images/home/ready-to-experience/clean_tajmahal.png"
              alt=""
              fill
              className="object-contain object-right"
              priority
            />
          </div>

          {/* Taj Mahal (Mobile & Tablet: Centered from bottom behind content) */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-0 h-[82%] sm:h-[88%] w-[250px] min-[400px]:w-[280px] sm:w-[340px] md:w-[400px] pointer-events-none z-10 opacity-40 sm:opacity-50">
            <Image
              src="/images/home/ready-to-experience/clean_tajmahal.png"
              alt=""
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Diamond Arc Accent */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[6%] sm:top-[7.5%] lg:top-[8.5%] w-[130px] min-[400px]:w-[150px] sm:w-[180px] md:w-[210px] lg:w-[18.8%] max-w-[246px] aspect-[938/127] pointer-events-none z-10">
            <Image
              src="/images/home/ready-to-experience/clean_diamond_arc.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Center Call to Action Content - Vertically & Horizontally Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-8 pt-3 sm:pt-4 lg:pt-0">
            <h2 className="font-playfair-display font-bold text-white text-[20px] min-[390px]:text-[24px] sm:text-[32px] lg:text-[48px] leading-[1.12] sm:leading-[1.08] tracking-tight">
              Ready to Experience
            </h2>
            <p className="font-playfair-display italic font-medium text-[#C59B58] text-[14px] min-[390px]:text-[16px] sm:text-[20px] lg:text-[28px] leading-[1.18] sm:leading-[1.15] tracking-tight mt-1 sm:mt-1.5 lg:mt-3 mb-0">
              An Authentic Taste of India?
            </p>
            <Link
              href="/reserve"
              className="mt-5 sm:mt-7 lg:mt-6 inline-flex items-center justify-between rounded-full bg-white pl-4 sm:pl-5 pr-1.5 py-1.5 h-[36px] sm:h-[42px] lg:h-[50px] w-[140px] sm:w-[158px] shadow-md hover:opacity-95 transition-opacity duration-200"
            >
              <span className="font-outfit font-medium text-[12px] sm:text-[14px] text-[#571621] tracking-normal">
                Book a Table
              </span>
              <span className="flex h-[26px] w-[26px] sm:h-[32px] sm:w-[32px] lg:h-[38px] lg:w-[38px] items-center justify-center rounded-full bg-[#571621] shrink-0">
                <ArrowRightIcon className="text-white" size={11} />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
