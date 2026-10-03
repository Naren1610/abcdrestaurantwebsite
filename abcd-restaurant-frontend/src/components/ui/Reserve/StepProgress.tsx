"use client";

import React from "react";

interface StepProgressProps {
  currentStep: number; // 1, 2, 3
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { step: 1, label: "Choose Date" },
  { step: 2, label: "Party Size" },
  { step: 3, label: "Time & Details" },
];

export default function StepProgress({
  currentStep,
  onStepClick,
}: StepProgressProps) {
  return (
    <div className="w-full flex items-center justify-center pb-6 sm:pb-7 border-b border-[#DFC9A880]">
      <div className="flex items-center justify-between w-full max-w-[540px]">
        {STEPS.map((s, index) => {
          const isActive = currentStep === s.step;
          const isCompleted = currentStep > s.step;

          return (
            <React.Fragment key={s.step}>
              {/* Step Item */}
              <button
                type="button"
                disabled={!isCompleted && !isActive}
                onClick={() => onStepClick && onStepClick(s.step)}
                className={`flex items-center gap-2 sm:gap-2.5 transition-all cursor-pointer disabled:cursor-default ${
                  isActive
                    ? "text-[#511923] font-semibold"
                    : isCompleted
                    ? "text-[#511923] hover:text-[#3D2C2E]"
                    : "text-[#8C7A77]"
                }`}
              >
                {/* Number Circle */}
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[12px] sm:text-[13px] font-inter font-medium transition-colors ${
                    isActive
                      ? "bg-[#511923] text-white"
                      : isCompleted
                      ? "border border-[#511923] text-[#511923] bg-[#FAF8F2]"
                      : "border border-[#DFC9A880] text-[#8C7A77]"
                  }`}
                >
                  {s.step}
                </div>

                {/* Step Label - Wraps on mobile, single line on desktop */}
                <span className="font-inter text-[11px] leading-tight sm:text-[14px] sm:whitespace-nowrap text-left break-words max-w-[65px] sm:max-w-none">
                  {s.label}
                </span>
              </button>

              {/* Connector Line between steps */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 h-[1px] bg-[#DFC9A880] mx-2 sm:mx-4" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}