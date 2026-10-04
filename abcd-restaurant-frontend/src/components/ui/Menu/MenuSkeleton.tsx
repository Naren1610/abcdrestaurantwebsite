import React from "react";
import { ChevronDown } from "lucide-react";

export default function MenuSkeleton() {
  return (
    <div className="flex flex-col w-full animate-pulse">
      {[1, 2, 3].map((sectionIndex) => (
        <section key={sectionIndex} className="w-full bg-background">
          {/* Mobile/tablet: compact toggle header skeleton */}
          <div className="lg:hidden w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#C19A6B]/20 bg-background">
            <div className="flex flex-col items-start min-w-0 w-3/4">
              <div className="h-2 sm:h-2.5 w-16 sm:w-20 bg-[#E6D5B8]/40 rounded mb-1"></div>
              <div className="h-5 sm:h-6 w-32 sm:w-40 bg-[#E6D5B8]/50 rounded"></div>
            </div>
            <div className="shrink-0 w-8 h-8 rounded-full border border-[#C19A6B]/30 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-[#E6D5B8]/30" />
            </div>
          </div>

          {/* Desktop: full centred header skeleton */}
          <div className="hidden lg:block mx-auto w-full max-w-[1440px] px-10 pt-14 pb-8">
            <div className="flex flex-col items-center justify-center w-full mb-8">
              <div className="h-3 w-32 bg-[#E6D5B8]/40 rounded mb-4"></div>
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-20 bg-[#E6D5B8]/30" />
                <div className="h-10 w-64 bg-[#E6D5B8]/50 rounded"></div>
                <div className="h-[1px] w-20 bg-[#E6D5B8]/30" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-[1300px] mx-auto">
              {[1, 2, 3, 4, 5, 6].map((itemIndex) => (
                <SkeletonCard key={`${sectionIndex}-${itemIndex}`} />
              ))}
            </div>
          </div>

          {/* Mobile/tablet: expanded items skeleton (assume first one open) */}
          <div className={`lg:hidden overflow-hidden ${sectionIndex === 1 ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 max-w-[900px] mx-auto">
              {[1, 2, 3, 4].map((itemIndex) => (
                <SkeletonCard key={`${sectionIndex}-${itemIndex}`} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-row items-stretch gap-3 sm:gap-5 bg-white rounded-[16px] p-3 sm:p-4 border-2 border-[#E6D5B8]/30">
      <div className="w-[95px] h-[95px] sm:w-[110px] sm:h-[110px] lg:w-[120px] lg:h-[120px] shrink-0 bg-[#E6D5B8]/30 rounded-xl"></div>
      <div className="flex flex-col flex-1 py-1">
        <div className="flex justify-between items-start mb-2">
          <div className="h-5 sm:h-6 w-3/4 bg-[#E6D5B8]/50 rounded"></div>
          <div className="h-4 w-12 bg-[#E6D5B8]/40 rounded"></div>
        </div>
        <div className="h-2 sm:h-3 w-full bg-[#E6D5B8]/30 rounded mb-2"></div>
        <div className="h-2 sm:h-3 w-4/5 bg-[#E6D5B8]/30 rounded mb-4"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-5 sm:h-6 w-16 bg-[#E6D5B8]/50 rounded"></div>
          <div className="h-6 sm:h-8 w-20 bg-[#E6D5B8]/40 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
