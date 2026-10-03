"use client";

import React from "react";

export interface StatusBadge {
  label: string;
  variant: "recommended" | "available" | "unavailable";
}

interface PaymentOptionCardProps {
  id: string;
  title: string;
  badgesText?: string;
  description: string;
  statusBadge?: StatusBadge;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}

export default function PaymentOptionCard({
  title,
  badgesText,
  description,
  statusBadge,
  isSelected,
  isDisabled = false,
  onSelect,
}: PaymentOptionCardProps) {
  return (
    <div
      onClick={() => {
        if (!isDisabled) onSelect();
      }}
      className={`relative w-full flex items-start justify-between gap-4 p-4 sm:p-5 rounded-[12px] border transition-all ${
        isDisabled
          ? "border-[#EAD8BF]/50 bg-[#FFFDF8]/60 opacity-60 cursor-not-allowed"
          : isSelected
          ? "border-[#571621] bg-[#FFFDF8] shadow-xs cursor-pointer"
          : "border-[#EAD8BF] bg-[#FFFDF8] hover:border-[#571621]/40 cursor-pointer"
      }`}
    >
      {/* Left: Radio + Text Info */}
      <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
        {/* Custom Radio Button */}
        <div className="pt-0.5 shrink-0">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              isDisabled
                ? "border-[#C19A6B]/40"
                : isSelected
                ? "border-[#571621]"
                : "border-[#C19A6B]"
            }`}
          >
            {isSelected && !isDisabled && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#571621]" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`font-poppins font-bold text-[14px] sm:text-[15px] leading-tight ${
                isDisabled ? "text-[#2C1810]/70" : "text-[#2C1810]"
              }`}
            >
              {title}
            </span>
          </div>

          {badgesText && (
            <span className="font-poppins font-bold text-[11px] tracking-wider text-[#1E3A8A] uppercase mt-1">
              {badgesText}
            </span>
          )}

          <p
            className={`font-poppins text-[12px] sm:text-[13px] mt-1.5 leading-relaxed ${
              isDisabled ? "text-[#6B5E55]/70" : "text-[#6B5E55]"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Right: Status Badge */}
      {statusBadge && (
        <div className="shrink-0 pt-0.5">
          <span
            className={`inline-block font-poppins text-[11px] sm:text-[12px] font-medium px-2.5 sm:px-3 py-1 rounded-[6px] text-center whitespace-nowrap ${
              statusBadge.variant === "recommended"
                ? "bg-[#E6F4EA] text-[#137333]"
                : statusBadge.variant === "available"
                ? "bg-[#E6F4EA] text-[#137333]"
                : "bg-[#F1F3F4] text-[#70757A]"
            }`}
          >
            {statusBadge.label}
          </span>
        </div>
      )}
    </div>
  );
}
