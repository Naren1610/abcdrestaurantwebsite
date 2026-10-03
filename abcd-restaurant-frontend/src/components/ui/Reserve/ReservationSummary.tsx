"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Users, Clock, UtensilsCrossed, ShieldCheck } from "lucide-react";

interface ReservationSummaryProps {
  date?: Date | null;
  time?: string | null;
  guests?: number | null;
  experience?: "Lunch" | "Dinner" | string | null;
  onEditStep?: (step: number) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ReservationSummary({
  date,
  time,
  guests,
  experience,
  onEditStep,
}: ReservationSummaryProps) {
  const formattedDate = date
    ? `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`
    : "—";

  const formattedGuests =
    guests && guests > 0
      ? `${guests} ${guests === 1 ? "guest" : "guests"}`
      : "—";

  const formattedTime = time || "—";
  const formattedExperience = experience || "—";

  return (
    <aside
      aria-label="Reservation Summary"
      className="w-full bg-[#FAF8F2] rounded-[17.6px] border border-[#DFC9A880] p-6 sm:p-8 shadow-[0_4px_24px_rgba(81,25,35,0.04)] flex flex-col"
    >
      {/* Card Header Title */}
      <div className="flex flex-col items-center text-center">
        <h2 className="font-playfair-display font-medium text-[#511923] text-[24px] sm:text-[28px] tracking-tight">
          Your reservation
        </h2>
        
        {/* Subtle Decorative Flourish */}
        <div className="flex items-center justify-center gap-2 mt-2 w-24">
          <div className="h-[1px] bg-[#DFC9A880] flex-1" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#B98F56]" />
          <div className="h-[1px] bg-[#DFC9A880] flex-1" />
        </div>

        {/* Architectural Illustration with Soft Bottom Fade */}
        <div className="relative w-full h-[100px] sm:h-[110px] mt-3 overflow-hidden select-none">
          <Image
            src="/images/reserve/architectural-illustration.png"
            alt="Architectural monument illustration"
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_65%,transparent_100%)]"
          />
        </div>
      </div>

      {/* Reservation Details List */}
      <div className="flex flex-col gap-4 mt-6 divide-y divide-[#DFC9A880]">
        
        {/* Date Row */}
        <div className="flex items-center justify-between pt-3 first:pt-0">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C7E77] shrink-0">
              <Calendar className="w-4 h-4 text-[#511923]" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-[12px] text-[#8C7E77] leading-none mb-1">
                Date
              </span>
              <span className={`font-inter text-[15px] ${formattedDate !== "—" ? "font-semibold text-[#2C2123]" : "text-[#8C7E77]"}`}>
                {formattedDate}
              </span>
            </div>
          </div>
          {onEditStep && (
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[13px] font-medium text-[#511923] hover:underline cursor-pointer transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {/* Party Size Row */}
        <div className="flex items-center justify-between pt-3.5">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C7E77] shrink-0">
              <Users className="w-4 h-4 text-[#511923]" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-[12px] text-[#8C7E77] leading-none mb-1">
                Party Size
              </span>
              <span className={`font-inter text-[15px] ${formattedGuests !== "—" ? "font-semibold text-[#2C2123]" : "text-[#8C7E77]"}`}>
                {formattedGuests}
              </span>
            </div>
          </div>
          {onEditStep && (
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-[13px] font-medium text-[#511923] hover:underline cursor-pointer transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {/* Time Row */}
        <div className="flex items-center justify-between pt-3.5">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C7E77] shrink-0">
              <Clock className="w-4 h-4 text-[#511923]" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-[12px] text-[#8C7E77] leading-none mb-1">
                Time
              </span>
              <span className={`font-inter text-[15px] ${formattedTime !== "—" ? "font-semibold text-[#2C2123]" : "text-[#8C7E77]"}`}>
                {formattedTime}
              </span>
            </div>
          </div>
          {onEditStep && (
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[13px] font-medium text-[#511923] hover:underline cursor-pointer transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {/* Experience Row */}
        <div className="flex items-center justify-between pt-3.5">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C7E77] shrink-0">
              <UtensilsCrossed className="w-4 h-4 text-[#511923]" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-[12px] text-[#8C7E77] leading-none mb-1">
                Experience
              </span>
              <span className={`font-inter text-[15px] ${formattedExperience !== "—" ? "font-semibold text-[#2C2123]" : "text-[#8C7E77]"}`}>
                {formattedExperience}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Cancellation Policy Banner */}
      <div className="mt-8 rounded-[14px] bg-[#F4EFE6]/70 border border-[#DFC9A880] p-4 flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-[#B98F56]/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B98F56]" />
        </div>
        <p className="font-inter text-[12.5px] leading-[1.4] text-[#5C504A]">
          You can cancel or modify up to{" "}
          <strong className="font-semibold text-[#3A2D2A]">
            2 hours before your booking.
          </strong>
        </p>
      </div>
    </aside>
  );
}
