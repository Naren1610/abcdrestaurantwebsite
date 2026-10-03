import React from "react";
import FormCard from "@/components/ui/Cards/FormCard";
import { Check, CookingPot, ThumbsUp, Utensils } from "lucide-react";

export default function OrderStatusCard() {
  return (
    <FormCard className="w-full p-6 sm:p-8">
      <h2 className="font-poppins font-bold text-[20px] text-[#2C1810] mb-8">
        Order Status
      </h2>

      <div className="flex flex-col">
        {/* Step 1: Received */}
        <div className="flex items-start gap-4 relative">
          <div className="w-8 h-8 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center shrink-0 shadow-xs z-10">
            <Check className="w-4 h-4" strokeWidth={3} />
          </div>
          <div className="flex flex-col pt-1 pb-8 min-w-0">
            <span className="font-poppins font-bold text-[14.5px] text-[#2C1810]">
              Received
            </span>
            <span className="font-poppins text-[12.5px] text-[#7A6E65] mt-0.5">
              Just now
            </span>
          </div>

          {/* Vertical dashed line */}
          <div className="absolute left-[15px] top-8 bottom-0 w-0 border-l border-dashed border-[#CBB8A3]" />
        </div>

        {/* Step 2: Preparing */}
        <div className="flex items-start gap-4 relative">
          <div className="w-8 h-8 rounded-full border border-[#D9C8B5] bg-transparent flex items-center justify-center text-[#6B1D2F] shrink-0 z-10 shadow-2xs">
            <CookingPot className="w-4 h-4 text-[#6B1D2F]" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-1 pb-8 min-w-0">
            <span className="font-poppins font-bold text-[14.5px] text-[#2C1810]">
              Preparing
            </span>
            <span className="font-poppins text-[12.5px] text-[#7A6E65] mt-0.5 leading-relaxed max-w-[240px]">
              Our kitchen team is preparing your delicious food.
            </span>
          </div>

          {/* Vertical dashed line */}
          <div className="absolute left-[15px] top-8 bottom-0 w-0 border-l border-dashed border-[#CBB8A3]" />
        </div>

        {/* Step 3: Ready */}
        <div className="flex items-start gap-4 relative">
          <div className="w-8 h-8 rounded-full border border-[#D9C8B5] bg-transparent flex items-center justify-center text-[#6B1D2F] shrink-0 z-10 shadow-2xs">
            <ThumbsUp className="w-4 h-4 text-[#6B1D2F]" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-1 pb-8 min-w-0">
            <span className="font-poppins font-bold text-[14.5px] text-[#2C1810]">
              Ready
            </span>
            <span className="font-poppins text-[12.5px] text-[#7A6E65] mt-0.5">
              Your order will be ready shortly.
            </span>
          </div>

          {/* Vertical dashed line */}
          <div className="absolute left-[15px] top-8 bottom-0 w-0 border-l border-dashed border-[#CBB8A3]" />
        </div>

        {/* Step 4: Served */}
        <div className="flex items-start gap-4 relative">
          <div className="w-8 h-8 rounded-full border border-[#D9C8B5] bg-transparent flex items-center justify-center text-[#6B1D2F] shrink-0 z-10 shadow-2xs">
            <Utensils className="w-4 h-4 text-[#6B1D2F]" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-1 min-w-0">
            <span className="font-poppins font-bold text-[14.5px] text-[#2C1810]">
              Served
            </span>
            <span className="font-poppins text-[12.5px] text-[#7A6E65] mt-0.5">
              Enjoy your meal!
            </span>
          </div>
        </div>
      </div>
    </FormCard>
  );
}
