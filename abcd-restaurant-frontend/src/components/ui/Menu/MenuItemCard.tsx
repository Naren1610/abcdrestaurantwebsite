"use client";

import Image from "next/image";
import SafeImage from "@/components/ui/SafeImage";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { useSettings } from "@/hooks/use-settings";
import { Star, Plus, Minus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { data: settings } = useSettings();
  const isOnlineOrderingEnabled = settings?.is_online_ordering_enabled ?? false;

  const cartItems = useStore(useCartStore, (state) => state.items) || [];
  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAdd = () => addItem(item);
  const handleIncrement = () => updateQuantity(item.id, quantity + 1);
  const handleDecrement = () => updateQuantity(item.id, quantity - 1);

  return (
    <div className="flex flex-row items-stretch gap-3 sm:gap-4 bg-white rounded-[16px] p-3 sm:p-3.5 lg:p-4 border-2 border-[#C19A6B1A] transition-all duration-300 hover:border-[#C19A6B40] hover:shadow-sm relative h-[155px] sm:h-[160px]">
      
      {/* Chef's Pick Badge */}
      {item.isChefPick && (
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-10 bg-brand text-[#F5E6D3] flex flex-col items-center justify-center rounded-[4px] py-1 px-1.5 sm:py-2 sm:px-3 shadow-md transform -rotate-2 pointer-events-none select-none">
          <Star className="w-3 h-3 fill-current mb-0.5 sm:mb-1" />
          <span className="text-[8px] sm:text-[10px] font-outfit font-bold uppercase tracking-wider leading-tight text-center">
            Chef&apos;s<br/>Pick
          </span>
        </div>
      )}

      {/* Image Section - Fixed square anchored to top */}
      <div className="relative w-[92px] sm:w-[105px] lg:w-[115px] h-[92px] sm:h-[105px] lg:h-[115px] shrink-0 self-start rounded-[12px] overflow-hidden border border-[#C19A6B1A] bg-[#E6D5B8]/20">
        <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between min-w-0 h-full">
        
        {/* Header: Title & Indicators */}
        <div>
          <div className="flex items-start justify-between gap-1.5 mb-1">
            <div className="min-h-[38px] sm:min-h-[42px] max-h-[38px] sm:max-h-[42px] flex items-start flex-1 min-w-0">
              <h3
                title={item.name}
                className="font-playfair-display font-bold text-[14.5px] sm:text-[16px] text-[#111827] leading-[1.25] line-clamp-2 overflow-hidden"
              >
                {item.name}
              </h3>
            </div>
            
            {/* Dietary Tags */}
            <div className="flex items-center gap-1 shrink-0 pt-0.5">
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

          {/* Description - strictly clamped to 2 lines max height */}
          <p
            title={item.description}
            className="font-lato text-[#6B7280] text-[11px] sm:text-[12px] leading-[1.45] line-clamp-2 max-h-[34px] sm:max-h-[36px] overflow-hidden"
          >
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Conditional Add Button */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-lato font-bold text-[15px] sm:text-[17px] text-[#C19A6B]">
            ${item.price.toFixed(2)}
          </span>

          {isOnlineOrderingEnabled && (
            <div className="shrink-0">
              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-brand text-white font-outfit font-medium text-[12px] sm:text-[14px] px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-[8px] flex items-center justify-center gap-1.5 hover:bg-brand/90 transition-colors cursor-pointer select-none active:scale-95 [touch-action:manipulation]"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add
                </button>
              ) : (
                <div className="flex items-center justify-between bg-white border border-[#DFBE88] text-brand rounded-[8px] h-[28px] sm:h-[32px] w-[75px] sm:w-[86px] px-1 overflow-hidden font-outfit font-medium">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-1/3 h-full flex items-center justify-center hover:bg-[#FAECD2] transition-colors cursor-pointer select-none [touch-action:manipulation]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                  <span className="w-1/3 text-center text-[12px] sm:text-[13px]">
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
          )}
        </div>

      </div>
    </div>
  );
}
