"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Cake,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import StepNavigation from "./StepNavigation";

interface Step3DetailsProps {
  fullName: string;
  onChangeFullName: (val: string) => void;
  phone: string;
  onChangePhone: (val: string) => void;
  email: string;
  onChangeEmail: (val: string) => void;
  occasion: string;
  onChangeOccasion: (val: string) => void;
  specialRequest: string;
  onChangeSpecialRequest: (val: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const OCCASIONS = [
  "Casual Dining",
  "Birthday",
  "Anniversary",
  "Date Night",
  "Business Meal",
  "Family Gathering",
  "Special Celebration",
];

export default function Step3Details({
  fullName,
  onChangeFullName,
  phone,
  onChangePhone,
  email,
  onChangeEmail,
  occasion,
  onChangeOccasion,
  specialRequest,
  onChangeSpecialRequest,
  onBack,
  onSubmit,
}: Step3DetailsProps) {
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col pt-6 sm:pt-8">
      {/* Title */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-playfair-display font-medium text-[#511923] text-[26px] sm:text-[32px] tracking-tight">
          Your details
        </h2>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Full Name */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-[16px] border border-[#E8DFD3] bg-white focus-within:border-[#511923] transition-colors">
          <User className="w-5 h-5 text-[#8C7E77] shrink-0 mt-1" />
          <div className="flex-1 flex flex-col">
            <label className="font-inter text-[11px] font-semibold text-[#8C7E77] tracking-wider uppercase mb-0.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => onChangeFullName(e.target.value)}
              placeholder="Alex Morgan"
              className="font-inter text-[15px] sm:text-[16px] text-[#2C2123] font-medium outline-none bg-transparent placeholder:text-[#A69B95] w-full"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-[16px] border border-[#E8DFD3] bg-white focus-within:border-[#511923] transition-colors">
          <div className="flex-1 flex flex-col">
            <label className="font-inter text-[11px] font-semibold text-[#8C7E77] tracking-wider uppercase mb-0.5">
              Mobile Number
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              {/* US Country Indicator */}
              <div className="flex items-center gap-1.5 select-none shrink-0">
                <span className="text-[17px] leading-none">🇺🇸</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8C7E77]" />
              </div>
              <div className="h-4 w-[1px] bg-[#D8CEBF] mx-1 shrink-0" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => onChangePhone(e.target.value)}
                placeholder="(415) 555-0123"
                className="font-inter text-[15px] sm:text-[16px] text-[#2C2123] font-medium outline-none bg-transparent placeholder:text-[#A69B95] w-full"
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-[16px] border border-[#E8DFD3] bg-white focus-within:border-[#511923] transition-colors">
          <Mail className="w-5 h-5 text-[#8C7E77] shrink-0 mt-1" />
          <div className="flex-1 flex flex-col">
            <label className="font-inter text-[11px] font-semibold text-[#8C7E77] tracking-wider uppercase mb-0.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              placeholder="alex.morgan@gmail.com"
              className="font-inter text-[15px] sm:text-[16px] text-[#2C2123] font-medium outline-none bg-transparent placeholder:text-[#A69B95] w-full"
            />
          </div>
        </div>

        {/* Occasion (Optional Dropdown) */}
        <div className="relative flex items-start gap-3 p-3.5 sm:p-4 rounded-[16px] border border-[#E8DFD3] bg-white transition-colors cursor-pointer">
          <Cake className="w-5 h-5 text-[#8C7E77] shrink-0 mt-1" />
          <div
            className="flex-1 flex flex-col select-none"
            onClick={() => setIsOccasionOpen(!isOccasionOpen)}
          >
            <label className="font-inter text-[11px] font-semibold text-[#8C7E77] tracking-wider uppercase mb-0.5 cursor-pointer">
              Occasion (Optional)
            </label>
            <div className="flex items-center justify-between">
              <span className="font-inter text-[15px] sm:text-[16px] text-[#2C2123] font-medium">
                {occasion || "Select occasion"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#8C7E77] transition-transform ${
                  isOccasionOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOccasionOpen && (
            <div className="absolute top-[102%] left-0 right-0 bg-white rounded-[16px] border border-[#E8DFD3] shadow-lg py-2 z-20 max-h-56 overflow-y-auto">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => {
                    onChangeOccasion(occ);
                    setIsOccasionOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 font-inter text-[14px] transition-colors cursor-pointer ${
                    occasion === occ
                      ? "bg-[#FAF7F2] text-[#511923] font-semibold"
                      : "text-[#3D2C2E] hover:bg-[#FAF7F2] hover:text-[#511923]"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Special Request (Optional) */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-[16px] border border-[#E8DFD3] bg-white focus-within:border-[#511923] transition-colors md:col-span-2">
          <MessageSquare className="w-5 h-5 text-[#8C7E77] shrink-0 mt-1" />
          <div className="flex-1 flex flex-col">
            <label className="font-inter text-[11px] font-semibold text-[#8C7E77] tracking-wider uppercase mb-0.5">
              Special Request (Optional)
            </label>
            <textarea
              rows={3}
              maxLength={120}
              value={specialRequest}
              onChange={(e) => onChangeSpecialRequest(e.target.value)}
              placeholder="e.g. Dietary requirements, allergies..."
              className="font-inter text-[14px] sm:text-[15px] text-[#2C2123] outline-none bg-transparent placeholder:text-[#A69B95] w-full resize-none leading-relaxed"
            />
            <div className="text-right font-inter text-[12px] text-[#A69B95] mt-1">
              {specialRequest.length}/120
            </div>
          </div>
        </div>

      </div>

      {/* Navigation */}
      <StepNavigation
        onBack={onBack}
        nextLabel="Confirm Reservation"
        isSubmit
        layout="stacked"
      />
    </form>
  );
}
