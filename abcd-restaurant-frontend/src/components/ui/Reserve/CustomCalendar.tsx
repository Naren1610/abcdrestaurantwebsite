"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function CustomCalendar({
  selectedDate,
  onSelectDate,
  minDate = new Date(),
  maxDate,
}: CustomCalendarProps) {
  // normalize minDate to start of day
  const normalizedMin = new Date(
    minDate.getFullYear(),
    minDate.getMonth(),
    minDate.getDate()
  );

  // default display month based on selectedDate
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const canGoPrev = () => {
    const prevMonthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );
    return prevMonthEnd >= normalizedMin;
  };

  // calendar math
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDaysCount = new Date(year, month, 0).getDate();

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isPast = (date: Date) => {
    return date < normalizedMin;
  };

  const isFutureExceeded = (date: Date) => {
    if (!maxDate) return false;
    return date > maxDate;
  };

  // build grid cells with overflow days
  interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
  }

  const calendarDays: CalendarDay[] = [];

  // trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month - 1, prevMonthDaysCount - i);
    calendarDays.push({ date: prevDate, isCurrentMonth: false });
  }

  // current days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }

  // leading days
  const totalSlots = calendarDays.length > 35 ? 42 : 35;
  const remaining = totalSlots - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
  }

  return (
    <div className="w-full max-w-[340px] bg-[#FFFFFF] rounded-[12px] p-5 border border-[#E8DFD5] select-none shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      {/* Calendar Header: Month/Year + Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-playfair-display font-medium text-[#2C2123] text-[18px] tracking-tight">
          {MONTH_NAMES[month]} {year}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev()}
            aria-label="Previous Month"
            className="w-8 h-8 rounded-[8px] border border-[#E8DFD5] flex items-center justify-center text-[#8C7A77] hover:bg-[#FAF7F2] disabled:opacity-35 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-[#8C7A77]" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next Month"
            className="w-8 h-8 rounded-[8px] border border-[#E8DFD5] flex items-center justify-center text-[#8C7A77] hover:bg-[#FAF7F2] transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-[#8C7A77]" />
          </button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {WEEKDAY_NAMES.map((name, idx) => (
          <span
            key={idx}
            className="font-inter text-[13px] font-normal text-[#8C7A77] py-1"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center items-center">
        {calendarDays.map(({ date, isCurrentMonth }) => {
          const isSelected = isSameDay(date, selectedDate);
          const disabled = isPast(date) || isFutureExceeded(date);

          if (!isCurrentMonth) {
            return (
              <div
                key={date.toISOString()}
                className="h-9 w-9 mx-auto flex items-center justify-center font-inter text-[13.5px] text-[#C4CAD4] select-none"
              >
                {date.getDate()}
              </div>
            );
          }

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(date)}
              className={`h-9 w-9 mx-auto rounded-[10px] font-inter text-[13.5px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed ${
                isSelected
                  ? "bg-[#511923] text-white font-semibold shadow-sm"
                  : disabled
                  ? "text-[#C4CAD4] opacity-50 cursor-not-allowed"
                  : "text-[#2C2123] hover:bg-[#511923]/10 hover:text-[#511923] font-normal"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
