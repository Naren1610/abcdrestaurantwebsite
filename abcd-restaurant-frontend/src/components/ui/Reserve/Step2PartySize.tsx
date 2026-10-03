"use client";

import React from "react";
import { User } from "lucide-react";
import StepNavigation from "./StepNavigation";

interface Step2PartySizeProps {
  guests: number | null;
  onSelectGuests: (guests: number) => void;
  seatingType: "Tables" | "Lounge";
  onSelectSeatingType: (type: "Tables" | "Lounge") => void;
  onBack: () => void;
  onNext: () => void;
}

const GUEST_OPTIONS = [
  { value: 1, label: "1 Guest" },
  { value: 2, label: "2 Guests" },
  { value: 3, label: "3 Guests" },
  { value: 4, label: "4 Guests" },
  { value: 5, label: "5 Guests" },
  { value: 6, label: "6 Guests" },
  { value: 7, label: "7 Guests" },
  { value: 8, label: "8 Guests" },
  { value: 9, label: "9 Guests" },
  { value: 10, label: "10+ Guests" },
];

export default function Step2PartySize({
  guests,
  onSelectGuests,
  seatingType,
  onSelectSeatingType,
  onBack,
  onNext,
}: Step2PartySizeProps) {
  return (
    <div className="w-full flex flex-col pt-6 sm:pt-8">
      {/* Title & Subtitle */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-playfair-display font-medium text-[#511923] text-[26px] sm:text-[32px] tracking-tight">
          How many guests?
        </h2>
        <p className="mt-1 font-inter text-[14px] sm:text-[15px] text-[#7A6B65]">
          For parties bigger than 10 people, we provide Lounge booking.
        </p>
      </div>

      {/* Guest Count Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
        {GUEST_OPTIONS.map((opt) => {
          const isSelected = guests === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onSelectGuests(opt.value);
                if (opt.value >= 10) {
                  onSelectSeatingType("Lounge");
                }
              }}
              className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-[16px] transition-all cursor-pointer select-none ${
                isSelected
                  ? "border-2 border-[#511923] bg-[#FBF6F2] shadow-sm text-[#511923]"
                  : "border border-[#E8DFD3] bg-white text-[#3D2C2E] hover:border-[#511923]/40 hover:bg-[#FAF7F2]"
              }`}
            >
              <User
                className={`w-5 h-5 mb-2.5 transition-colors ${
                  isSelected ? "text-[#511923]" : "text-[#8C7E77]"
                }`}
              />
              <span className="font-inter text-[14px] font-medium">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Seating Type Section */}
      <div className="mt-8 sm:mt-10">
        <h3 className="font-playfair-display font-medium text-[#2C2123] text-[20px] sm:text-[22px] mb-3">
          Seating Type
        </h3>
        <div className="w-full p-1.5 bg-[#F2EDE5] rounded-[16px] border border-[#E8DFD3] flex gap-2">
          <button
            type="button"
            onClick={() => onSelectSeatingType("Tables")}
            className={`flex-1 py-3.5 rounded-[12px] font-inter text-[14px] sm:text-[15px] font-medium transition-all cursor-pointer text-center ${
              seatingType === "Tables"
                ? "bg-white text-[#511923] shadow-sm font-semibold"
                : "text-[#7A6B65] hover:text-[#511923]"
            }`}
          >
            Tables
          </button>
          <button
            type="button"
            onClick={() => onSelectSeatingType("Lounge")}
            className={`flex-1 py-3.5 rounded-[12px] font-inter text-[14px] sm:text-[15px] font-medium transition-all cursor-pointer text-center ${
              seatingType === "Lounge"
                ? "bg-white text-[#511923] shadow-sm font-semibold"
                : "text-[#7A6B65] hover:text-[#511923]"
            }`}
          >
            Lounge
          </button>
        </div>
      </div>

      {/* Navigation */}
      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextLabel="Next: Your details"
        disabled={!guests}
        layout="split"
      />
    </div>
  );
}
