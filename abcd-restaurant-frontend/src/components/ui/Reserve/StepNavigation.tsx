"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  backLabel?: string;
  disabled?: boolean;
  isSubmit?: boolean;
  layout?: "split" | "full" | "stacked";
}

export default function StepNavigation({
  onBack,
  onNext,
  nextLabel,
  backLabel = "Back",
  disabled = false,
  isSubmit = false,
  layout = "split",
}: StepNavigationProps) {
  // full-width single button (Step 1 style)
  if (layout === "full") {
    return (
      <div className="mt-8 sm:mt-10">
        <button
          type={isSubmit ? "submit" : "button"}
          onClick={onNext}
          disabled={disabled}
          className="w-full py-4 rounded-[14px] bg-[#511923] text-white font-inter text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-[#40131B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
        >
          <span>{nextLabel}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // stacked on mobile, side-by-side on sm+ (Step 3 style)
  if (layout === "stacked") {
    return (
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-4 rounded-[16px] border border-[#D8CEBF] text-[#511923] font-inter text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>
        )}
        <button
          type={isSubmit ? "submit" : "button"}
          onClick={isSubmit ? undefined : onNext}
          disabled={disabled}
          className="flex-1 w-full py-4 px-8 rounded-[16px] bg-[#511923] text-white font-inter text-[15px] sm:text-[16px] font-medium flex items-center justify-center gap-3 hover:bg-[#40131B] transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <span>{nextLabel}</span>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    );
  }

  // split layout — back left, next right (Step 2 style)
  return (
    <div className="mt-10 pt-6 border-t border-[#EFE9E0] flex items-center justify-between">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 rounded-[14px] border border-[#D8CEBF] text-[#511923] font-inter text-[14px] sm:text-[15px] font-medium flex items-center gap-2 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>
      )}
      <button
        type={isSubmit ? "submit" : "button"}
        onClick={onNext}
        disabled={disabled}
        className="px-8 py-3.5 rounded-[14px] bg-[#511923] text-white font-inter text-[15px] font-medium flex items-center gap-2 hover:bg-[#40131B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
      >
        <span>{nextLabel}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
