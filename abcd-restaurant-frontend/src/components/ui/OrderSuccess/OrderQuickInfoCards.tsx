import React from "react";
import FormCard from "@/components/ui/Cards/FormCard";
import { Hash, Clock, MapPin } from "lucide-react";

interface OrderQuickInfoCardsProps {
  orderNumber?: string;
  estimatedTime?: string;
  address?: string;
}

export default function OrderQuickInfoCards({
  orderNumber = "",
  estimatedTime = "",
  address = "",
}: OrderQuickInfoCardsProps) {
  return (
    <>
      {/* Card 1: Order Number */}
      <FormCard className="py-4 px-5 sm:py-4.5 sm:px-5.5 flex items-center gap-4 lg:col-span-1">
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-[12px] border-[1.5px] border-[#9B8476] bg-transparent flex items-center justify-center text-[#2C1810] shrink-0">
          <Hash className="w-5 h-5 text-[#2C1810]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-poppins text-[12px] sm:text-[12.5px] text-[#7A6E65]">
            Order Number
          </span>
          <span className="font-poppins font-bold text-[15.5px] sm:text-[16.5px] text-[#2C1810] mt-0.5 truncate">
            {orderNumber}
          </span>
        </div>
      </FormCard>

      {/* Card 2: Estimated Preparation */}
      <FormCard className="py-4 px-5 sm:py-4.5 sm:px-5.5 flex items-center gap-4 lg:col-span-1">
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-[12px] border-[1.5px] border-[#9B8476] bg-transparent flex items-center justify-center text-[#2C1810] shrink-0">
          <Clock className="w-5 h-5 text-[#2C1810]" strokeWidth={2} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-poppins text-[12px] sm:text-[12.5px] text-[#7A6E65]">
            Estimated Preparation
          </span>
          <span className="font-poppins font-bold text-[15.5px] sm:text-[16.5px] text-[#2C1810] mt-0.5 truncate">
            {estimatedTime}
          </span>
        </div>
      </FormCard>

      {/* Card 3: Address */}
      <FormCard className="py-4 px-5 sm:py-4.5 sm:px-5.5 flex items-center gap-4 lg:col-span-1">
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-[12px] border-[1.5px] border-[#9B8476] bg-transparent flex items-center justify-center text-[#2C1810] shrink-0">
          <MapPin className="w-5 h-5 text-[#2C1810]" strokeWidth={2} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-poppins text-[12px] sm:text-[12.5px] text-[#7A6E65]">
            Address
          </span>
          <span
            className="font-poppins font-bold text-[15.5px] sm:text-[16.5px] text-[#2C1810] mt-0.5 truncate"
            title={address}
          >
            {address}
          </span>
        </div>
      </FormCard>
    </>
  );
}

