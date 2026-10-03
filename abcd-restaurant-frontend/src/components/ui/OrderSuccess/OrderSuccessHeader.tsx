import React from "react";
import { Check } from "lucide-react";

export default function OrderSuccessHeader() {
  return (
    <div className="flex items-start sm:items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
      {/* Green circular checkmark icon badge */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#277848] flex items-center justify-center text-white shrink-0 shadow-sm">
        <Check className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={3} />
      </div>

      {/* Header text */}
      <div className="flex flex-col">
        <h1 className="font-playfair-display font-bold text-[32px] sm:text-[38px] text-[#6B1D2F] leading-tight">
          Order Received!
        </h1>
        <p className="font-poppins text-[14px] sm:text-[15px] text-[#6B5E55] mt-1">
          Thank you! Your order has been sent to our kitchen.
        </p>
      </div>
    </div>
  );
}
