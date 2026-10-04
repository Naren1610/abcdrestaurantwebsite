"use client";

import Image from "next/image";
import SafeImage from "@/components/ui/SafeImage";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { Star, Plus, Minus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const cartItems = useStore(useCartStore, (state) => state.items) || [];
  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAdd = () => addItem(item);
  const handleIncrement = () => updateQuantity(item.id, quantity + 1);
  const handleDecrement = () => updateQuantity(item.id, quantity - 1);

  return (
    <div className="flex flex-row items-stretch gap-3 sm:gap-5 bg-white rounded-[16px] p-3 sm:p-4 border-2 border-[#C19A6B1A] transition-colors relative">
      
      {/* Chef's Pick Badge */}
      {item.isChefPick && (
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-10 bg-brand text-[#F5E6D3] flex flex-col items-center justify-center rounded-[4px] py-1 px-1.5 sm:py-2 sm:px-3 shadow-md transform -rotate-2">
          <Star className="w-3 h-3 fill-current mb-0.5 sm:mb-1" />
          <span className="text-[8px] sm:text-[10px] font-outfit font-bold uppercase tracking-wider leading-tight text-center">
            Chef&apos;s<br/>Pick
          </span>
        </div>
      )}

      {/* Image Section */}
      <div className="relative w-[95px] sm:w-[110px] lg:w-[120px] aspect-square shrink-0 rounded-[12px] overflow-hidden border border-[#C19A6B1A] bg-[#E6D5B8]/20">
        <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between py-0.5 sm:py-1 min-w-0">
        
        {/* Header: Title & Indicators */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
            <h3 className="font-playfair-display font-bold text-[16px] sm:text-[18px] text-[#111827] leading-tight">
              {item.name}
            </h3>
            
            {/* Dietary Tags */}
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              {item.tags.includes("veg") && (
                <Image src="/images/menu/GreenIndicator.svg" alt="Veg" width={12} height={12} className="w-3 h-3" />
              )}
              {item.tags.includes("non-veg") && (
                <Image src="/images/menu/NonVegIndicator.svg" alt="Non-Veg" width={12} height={12} className="w-3 h-3" />
              )}
              {item.tags.includes("spicy") && (
                <Image src="/images/menu/SpicyIndicator.svg" alt="Spicy" width={12} height={12} className="w-3 h-3" />
              )}
            </div>
          </div>

          <p className="font-lato text-[#6B7280] text-[11px] sm:text-[12px] leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2">
          <span className="font-lato font-bold text-[16px] sm:text-[18px] text-[#C19A6B]">
            ${item.price.toFixed(2)}
          </span>

          <div className="shrink-0">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                className="bg-brand text-white font-outfit font-medium text-[13px] sm:text-[15px] px-4 sm:px-6 py-1 sm:py-1.5 rounded-[8px] flex items-center justify-center gap-1.5 hover:bg-brand/90 transition-colors cursor-pointer select-none active:scale-95 [touch-action:manipulation]"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add
              </button>
            ) : (
              <div className="flex items-center justify-between bg-white border border-[#DFBE88] text-brand rounded-[8px] h-[28px] sm:h-[34px] w-[75px] sm:w-[90px] px-1 overflow-hidden font-outfit font-medium">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-1/3 h-full flex items-center justify-center hover:bg-[#FAECD2] transition-colors cursor-pointer select-none [touch-action:manipulation]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" strokeWidth={2.5} />
                </button>
                <span className="w-1/3 text-center text-[13px] sm:text-[14px]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-1/3 h-full flex items-center justify-center hover:bg-[#FAECD2] transition-colors cursor-pointer select-none [touch-action:manipulation]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}


