"use client";

import React from "react";
import SafeImage from "@/components/ui/SafeImage";
import FormCard from "@/components/ui/Cards/FormCard";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { Minus, Plus } from "lucide-react";
import { PRICING } from "@/constants/pricing";

export default function OrderSummaryCard() {
  const items = useStore(useCartStore, (state) => state.items) || [];
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = items.reduce((count, item) => count + item.quantity, 0);
  const tax = subtotal * PRICING.taxRate;
  const finalTotal = subtotal + tax;

  return (
    <FormCard className="w-full">
      <h2 className="font-poppins font-bold text-[22px] text-[#2C1810] mb-6">
        Your Order
      </h2>

      {items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="font-poppins text-[14px] text-[#6B5E55]">
            Your order is currently empty.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Item Rows */}
          <div className="flex flex-col gap-4 sm:gap-5 max-h-[420px] overflow-y-auto pr-1">
            {items.map((item) => {
              const isVeg = item.tags.includes("veg");
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3"
                >
                  {/* Left: Image & Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-[10px] overflow-hidden shrink-0 border border-[#EAD8BF]/80 bg-[#F5EBDC]">
                      <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-poppins font-bold text-[14px] sm:text-[15px] text-[#2C1810] truncate">
                          {item.name}
                        </span>
                        {/* Dietary Dot Indicator */}
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isVeg ? "bg-[#38A169]" : "bg-[#E53E3E]"
                          }`}
                          title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        />
                      </div>
                      <span className="font-poppins font-medium text-[13px] sm:text-[14px] text-[#6B5E55] mt-0.5">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Quantity Counter Pill */}
                  <div className="flex items-center border border-[#EAD8BF] rounded-[8px] bg-white px-2 py-1 gap-2.5 shrink-0 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-[#2C1810] hover:text-[#6B1D2F] px-0.5 cursor-pointer select-none"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                    <span className="font-poppins font-bold text-[13px] sm:text-[14px] text-[#2C1810] min-w-[14px] text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-[#2C1810] hover:text-[#6B1D2F] px-0.5 cursor-pointer select-none"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-[#EAD8BF] my-6"></div>

          {/* Pricing Summary */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between font-poppins text-[14px] sm:text-[15px] text-[#4A3B32]">
              <span>Items ({totalCount})</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between font-poppins text-[14px] sm:text-[15px] text-[#4A3B32]">
              <span>Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EAD8BF]/60">
              <span className="font-poppins font-bold text-[18px] sm:text-[20px] text-[#6B1D2F]">
                Total
              </span>
              <span className="font-poppins font-bold text-[20px] sm:text-[22px] text-[#6B1D2F]">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </FormCard>
  );
}




