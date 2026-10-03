"use client";

import React from "react";

export type OrderMode = "pickup" | "delivery";

interface PickupDeliveryToggleProps {
  mode: OrderMode;
  onChange: (mode: OrderMode) => void;
}

export default function PickupDeliveryToggle({
  mode,
  onChange,
}: PickupDeliveryToggleProps) {
  return (
    <div className="inline-flex items-center p-1 bg-white border border-[#EAD8BF] rounded-[10px] sm:rounded-[12px] shadow-xs shrink-0">
      <button
        type="button"
        onClick={() => onChange("pickup")}
        className={`px-5 sm:px-6 py-2 rounded-[7px] sm:rounded-[8px] font-poppins font-medium text-[13px] sm:text-[14px] transition-all cursor-pointer ${
          mode === "pickup"
            ? "bg-[#6B1D2F] text-white shadow-xs font-semibold"
            : "bg-transparent text-[#2C1810] hover:text-[#6B1D2F]"
        }`}
      >
        Pickup
      </button>

      <button
        type="button"
        onClick={() => onChange("delivery")}
        className={`px-5 sm:px-6 py-2 rounded-[7px] sm:rounded-[8px] font-poppins font-medium text-[13px] sm:text-[14px] transition-all cursor-pointer ${
          mode === "delivery"
            ? "bg-[#6B1D2F] text-white shadow-xs font-semibold"
            : "bg-transparent text-[#2C1810] hover:text-[#6B1D2F]"
        }`}
      >
        Delivery
      </button>
    </div>
  );
}
