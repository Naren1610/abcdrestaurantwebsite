"use client";

import { useEffect, useState } from "react";
import { Clock, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionExpiryAlertProps {
  countdown: number | null;
  onLogout: () => void;
  maxTime?: number; // Total seconds of the countdown (e.g. 90) for progress ring
}

export function SessionExpiryAlert({ countdown, onLogout, maxTime = 90 }: SessionExpiryAlertProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  // Auto-expand if countdown just appeared
  const [prevCountdown, setPrevCountdown] = useState(countdown);
  if (countdown !== prevCountdown) {
    setPrevCountdown(countdown);
    if (countdown !== null && countdown === maxTime && isMinimized) {
      setIsMinimized(false);
    }
  }

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  // Calculate progress: 1 = full, 0 = empty. Prevent NaN if countdown is null.
  const currentCountdown = countdown ?? 0;
  const progress = Math.max(0, currentCountdown / maxTime);
  const strokeDashoffset = 2 * Math.PI * (radius - 2) * (1 - progress);

  return (
    <div 
      className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        countdown !== null ? "opacity-100 translate-x-0 visible" : "opacity-0 translate-x-12 invisible pointer-events-none",
        isMinimized ? "w-12 h-12" : "w-[330px] h-[72px]"
      )}
    >
      <div 
        className={cn(
          "relative w-full h-full overflow-hidden bg-white/95 backdrop-blur-md border border-border shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMinimized 
            ? "rounded-full cursor-pointer hover:bg-red-50 group" 
            : "rounded-xl flex items-center pr-3"
        )}
        onClick={() => isMinimized && setIsMinimized(false)}
      >
        {/* Minimized View (Pill with Circular Progress) */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            isMinimized ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
          )}
        >
          <span className="font-bold text-red-500 text-xs absolute z-10">{countdown}</span>
          
          <svg className="w-12 h-12 -rotate-90 absolute inset-0">
            {/* Background ring */}
            <circle
              className="text-red-100"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
              r={radius - 2} // Slightly smaller radius for 48px width container
              cx="24"
              cy="24"
            />
            {/* Progress ring */}
            <circle
              className="text-red-500 transition-all duration-1000 ease-linear"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * (radius - 2)}
              strokeDashoffset={2 * Math.PI * (radius - 2) * (1 - progress)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius - 2}
              cx="24"
              cy="24"
            />
          </svg>
        </div>

        {/* Expanded View (Card) */}
        <div 
          className={cn(
            "w-full h-full flex items-center transition-all duration-500 delay-75",
            !isMinimized ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
          )}
        >
          {/* Collapse Arrow - Left edge */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
            className="h-full px-1.5 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            title="Minimize"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex-1 flex flex-col justify-center pl-1">
            <div className="flex items-center gap-1.5 text-red-500 mb-0.5">
              <Clock className="w-4 h-4 stroke-[2.5]" />
              <h3 className="font-outfit font-bold text-sm leading-none tracking-tight">Session Expiring</h3>
            </div>
            
            <p className="font-outfit text-xs text-gray-500 ml-6 whitespace-nowrap">
              Will expire in <span className="font-bold text-red-500">{countdown}</span> seconds. 
            </p>
          </div>

          <button 
            onClick={onLogout} 
            className="flex items-center gap-1.5 bg-red-100/80 text-red-600 hover:bg-red-200 transition-colors font-semibold text-xs h-8 px-4 rounded-full ml-3 shrink-0 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
