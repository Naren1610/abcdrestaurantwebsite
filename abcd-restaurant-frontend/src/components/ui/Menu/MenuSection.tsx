import React from "react";
import { ChevronDown } from "lucide-react";

interface MenuSectionProps {
  id: string;
  subtitle: string;
  title: string;
  children: React.ReactNode;
  // accordion toggle for mobile
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function MenuSection({
  id,
  subtitle,
  title,
  children,
  isOpen = false,
  onToggle,
}: MenuSectionProps) {
  return (
    <section id={id} className="w-full bg-background scroll-mt-20 md:scroll-mt-24">
      {/* Mobile/tablet: compact toggle header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-items`}
        className="lg:hidden w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#C19A6B]/20 bg-background transition-colors cursor-pointer select-none touch-manipulation"
      >
        <div className="flex flex-col items-start text-left min-w-0">
          <span className="font-lato text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#C19A6B] font-bold leading-none mb-0.5">
            {subtitle}
          </span>
          <span className="font-playfair-display font-medium text-[18px] sm:text-[20px] text-brand leading-tight truncate">
            {title}
          </span>
        </div>

        <span
          className={[
            "shrink-0 w-8 h-8 rounded-full border border-[#C19A6B]/30 flex items-center justify-center transition-transform duration-300 pointer-events-none",
            isOpen ? "rotate-180 bg-[#C19A6B]/10" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          <ChevronDown className="w-4 h-4 text-brand pointer-events-none" strokeWidth={2} />
        </span>
      </button>

      {/* Desktop: full centred header, always visible */}
      <div className="hidden lg:block mx-auto w-full max-w-[1440px] px-10 pt-14 pb-8">
        <div className="flex flex-col items-center justify-center w-full mb-8">
          <span className="font-lato text-[12px] uppercase tracking-[0.2em] text-[#C19A6B] font-bold mb-4">
            {subtitle}
          </span>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-[#571621]/30" />
            <h2 className="font-playfair-display font-medium text-[36px] text-brand text-center leading-tight">
              {title}
            </h2>
            <div className="h-[1px] w-20 bg-[#571621]/30" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-[1300px] mx-auto">
          {children}
        </div>
      </div>

      {/* Mobile/tablet: collapsible items panel */}
      <div
        id={`${id}-items`}
        className={[
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 max-w-[900px] mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}

