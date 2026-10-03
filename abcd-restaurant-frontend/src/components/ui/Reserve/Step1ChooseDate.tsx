"use client";

import React from "react";
import CustomCalendar from "./CustomCalendar";
import StepNavigation from "./StepNavigation";

interface Step1ChooseDateProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  experience: "Lunch" | "Dinner";
  onSelectExperience: (exp: "Lunch" | "Dinner") => void;
  onNext: () => void;
}

type SlotStatus = "Available" | "Limited" | "Waitlist";

interface TimeSlot {
  time: string;
  status: SlotStatus;
}

const DINNER_SLOTS: TimeSlot[] = [
  { time: "5:30 PM", status: "Available" },
  { time: "6:00 PM", status: "Available" },
  { time: "6:30 PM", status: "Limited" },
  { time: "7:00 PM", status: "Available" },
  { time: "7:30 PM", status: "Limited" },
  { time: "8:00 PM", status: "Available" },
  { time: "8:30 PM", status: "Waitlist" },
  { time: "9:00 PM", status: "Available" },
  { time: "9:30 PM", status: "Available" },
  { time: "10:00 PM", status: "Available" },
];

const LUNCH_SLOTS: TimeSlot[] = [
  { time: "11:30 AM", status: "Available" },
  { time: "12:00 PM", status: "Available" },
  { time: "12:30 PM", status: "Limited" },
  { time: "1:00 PM", status: "Available" },
  { time: "1:30 PM", status: "Available" },
  { time: "2:00 PM", status: "Waitlist" },
  { time: "2:30 PM", status: "Available" },
];

export default function Step1ChooseDate({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  experience,
  onSelectExperience,
  onNext,
}: Step1ChooseDateProps) {
  const currentSlots = experience === "Lunch" ? LUNCH_SLOTS : DINNER_SLOTS;

  return (
    <div className="w-full flex flex-col pt-6 sm:pt-8">
      
      {/* SECTION 1: Select your date */}
      <div>
        <h2 className="font-playfair-display font-medium text-[#2C2123] text-[26px] sm:text-[30px] tracking-tight">
          Select your date
        </h2>
        <p className="mt-1 mb-5 font-inter text-[13.5px] sm:text-[14px] text-[#7A6B65]">
          Reservations can be booked up to 90 days in advance.
        </p>

        {/* Calendar */}
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          minDate={new Date()}
        />
      </div>

      {/* Underline Divider */}
      <div className="w-full h-[1px] bg-[#DFC9A880] my-8 sm:my-10" />

      {/* SECTION 2: Choose your time */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="font-playfair-display font-medium text-[#2C2123] text-[26px] sm:text-[30px] tracking-tight">
            Choose your time
          </h2>

          {/* Status Legend */}
          <div className="flex items-center gap-4 text-[12.5px] font-inter text-[#4A3E39]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#307E50]" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C6943C]" />
              <span>Limited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8C776E]" />
              <span>Waitlist</span>
            </div>
          </div>
        </div>

        {/* Lunch / Dinner Segmented Toggle */}
        <div className="w-full p-1.5 bg-[#F2EDE5] rounded-[12px] border border-[#E8DFD5] flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              onSelectExperience("Lunch");
            }}
            className={`flex-1 py-3 rounded-[10px] font-inter text-[14px] font-medium transition-all cursor-pointer select-none touch-manipulation text-center ${
              experience === "Lunch"
                ? "bg-white text-[#2C2123] shadow-sm font-semibold"
                : "text-[#7A6B65] hover:text-[#2C2123]"
            }`}
          >
            Lunch
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectExperience("Dinner");
            }}
            className={`flex-1 py-3 rounded-[10px] font-inter text-[14px] font-medium transition-all cursor-pointer select-none touch-manipulation text-center ${
              experience === "Dinner"
                ? "bg-white text-[#2C2123] shadow-sm font-semibold"
                : "text-[#7A6B65] hover:text-[#2C2123]"
            }`}
          >
            Dinner
          </button>
        </div>

        {/* Time Slots 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {currentSlots.map(({ time, status }) => {
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className={`py-3 px-2 rounded-[12px] border transition-all cursor-pointer flex flex-col items-center justify-center select-none ${
                  isSelected
                    ? "bg-[#511923] text-white border-[#511923] shadow-sm"
                    : "bg-white border-[#E8DFD5] hover:border-[#511923]/40 hover:bg-[#FAF8F2]"
                }`}
              >
                <span
                  className={`font-inter text-[14px] font-semibold ${
                    isSelected ? "text-white" : "text-[#2C2123]"
                  }`}
                >
                  {time}
                </span>

                <div className="mt-1 flex items-center justify-center gap-1.5">
                  {isSelected ? (
                    <span className="font-inter text-[11px] font-medium text-white/90">
                      Selected
                    </span>
                  ) : (
                    <>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            status === "Available"
                              ? "#307E50"
                              : status === "Limited"
                              ? "#C6943C"
                              : "#8C776E",
                        }}
                      />
                      <span
                        className="font-inter text-[11px] font-medium"
                        style={{
                          color:
                            status === "Available"
                              ? "#307E50"
                              : status === "Limited"
                              ? "#C6943C"
                              : "#8C776E",
                        }}
                      >
                        {status}
                      </span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <StepNavigation
        onNext={onNext}
        nextLabel="Next: Party Size"
        disabled={!selectedTime}
        layout="full"
      />

    </div>
  );
}
