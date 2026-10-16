"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import SignatureDishCard from "@/components/ui/Home/SignatureDishCard";
import { useSignatureDishes } from "@/hooks/use-menu";

export default function SignatureDishes() {
  const { data: dishes, isLoading } = useSignatureDishes();

  // If loading, render an elegant layout-matched skeleton
  if (isLoading) {
    return (
      <section className="relative w-full pt-7 pb-4 sm:pt-9 sm:pb-6 lg:pt-12 lg:pb-0 overflow-hidden">
        <div className="mx-auto flex flex-col lg:flex-row max-w-[1440px] px-6 lg:px-10 gap-6 sm:gap-8 lg:gap-10 items-start">
          <div className="flex flex-col w-full lg:w-[400px] shrink-0 z-10 pt-1 lg:pt-4 space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-[#DFC9A8]/40 rounded-full" />
            <div className="h-12 w-64 bg-[#DFC9A8]/50 rounded-lg" />
            <div className="h-16 w-80 bg-[#DFC9A8]/30 rounded-lg" />
            <div className="h-6 w-36 bg-[#DFC9A8]/40 rounded-md" />
          </div>
          <div className="w-full flex-1 min-w-0">
            <div className="flex gap-4 lg:gap-5 overflow-hidden pt-3 sm:pt-5 lg:pt-8 pb-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="min-w-[290px] w-[290px] sm:min-w-[310px] sm:w-[310px] h-[380px] rounded-[20px] bg-[#DFC9A8]/30 animate-pulse border border-[#DFC9A8]/40"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no dishes from backend, render nothing / empty
  if (!dishes || dishes.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full pt-7 pb-4 sm:pt-9 sm:pb-6 lg:pt-12 lg:pb-0 overflow-hidden">
      <div className="mx-auto flex flex-col lg:flex-row max-w-[1440px] px-6 lg:px-10 gap-6 sm:gap-8 lg:gap-10 items-start">
        
        {/* Left Content Area */}
        <div className="flex flex-col w-full lg:w-[400px] shrink-0 z-10 pt-1 lg:pt-4">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
            <Image
              src="/icons/StarSignature.svg"
              alt="Star"
              width={16}
              height={16}
            />
            <span className="font-cinzel font-bold text-[12px] sm:text-[13px] tracking-[0.2em] text-brand-tagline uppercase">
              Signature Dishes
            </span>
          </div>

          <h2 className="flex flex-col text-[36px] sm:text-[46px] leading-[1.1] lg:text-[64px] lg:leading-[1.15] tracking-tight mb-3.5 sm:mb-5 lg:mb-8">
            <span className="font-playfair-display font-bold text-brand">
              Crafted with
            </span>
            <span className="font-playfair-display italic font-medium text-brand-tagline mt-0.5 sm:mt-1">
              Heart & Spice
            </span>
          </h2>

          <p className="font-outfit text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] lg:leading-[1.7] text-hero-text mb-4 sm:mb-6 lg:mb-10 max-w-[400px]">
            A curated selection of our most-loved dishes, bringing together tradition, flavour and passion.
          </p>

          <div>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 font-outfit font-bold text-[14px] sm:text-[16px] text-brand border-b-2 border-brand/20 pb-0.5 sm:pb-1 hover:border-brand transition-colors"
            >
              View All Dishes
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Cards Carousel Area */}
        <div className="w-full flex-1 min-w-0 relative z-20">
          <div className="flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 -mx-4 sm:-mx-6 pt-3 sm:pt-5 lg:pt-8 pb-8 sm:pb-10 lg:pb-16 scrollbar-hide">
            {dishes.map((dish) => (
              <SignatureDishCard
                key={dish.id}
                id={dish.id}
                title={dish.name}
                description={dish.description || ""}
                price={`$${Number(dish.price).toFixed(2)}`}
                image={dish.image || "/images/home/signature-dishes/Dal Makhani.png"}
                isSpecial={dish.isChefPick}
              />
            ))}
            
            {/* Empty spacer for the right edge on scroll */}
            <div className="w-4 shrink-0 lg:hidden"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
