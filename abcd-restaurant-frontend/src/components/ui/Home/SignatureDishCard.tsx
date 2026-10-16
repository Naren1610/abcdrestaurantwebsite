"use client";

import Image from "next/image";
import SafeImage from "@/components/ui/SafeImage";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { useSettings } from "@/hooks/use-settings";
import { Plus, Minus } from "lucide-react";

interface SignatureDishCardProps {
  id?: string;
  title: string;
  description: string;
  price: string;
  image: string;
  isSpecial?: boolean;
}

export default function SignatureDishCard({
  id,
  title,
  description,
  price,
  image,
  isSpecial,
}: SignatureDishCardProps) {
  const { data: settings } = useSettings();
  const isOnlineOrderingEnabled = settings?.is_online_ordering_enabled ?? false;

  // Cart integration
  const cartItems = useStore(useCartStore, (state) => state.items) || [];
  const cartItem = id ? cartItems.find((i) => i.id === id) : null;
  const quantity = cartItem?.quantity || 0;

  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const rawPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

  const dishMenuItem: MenuItem | null = id
    ? {
        id,
        name: title,
        description: description || "",
        price: rawPrice,
        image,
        tags: [],
        isChefPick: Boolean(isSpecial),
      }
    : null;

  const handleAdd = () => {
    if (dishMenuItem) addItem(dishMenuItem);
  };

  const handleIncrement = () => {
    if (id) updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (id) updateQuantity(id, quantity - 1);
  };

  return (
    <div className="group relative flex flex-col min-w-[280px] w-[280px] shrink-0 rounded-[17px] border-[1.34px] border-[#DFC9A8] bg-[#F6ECDA] snap-start transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl hover:z-30 cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] rounded-t-[16px] overflow-hidden">
        <SafeImage
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {isSpecial && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#B89047] px-3 py-1 shadow-md">
            <Image
              src="/icons/Star.svg"
              alt="Star"
              width={10}
              height={10}
              className="text-white"
            />
            <span className="font-outfit text-[10px] font-bold tracking-[0.1em] text-white uppercase">
              ABCD SPECIAL
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 lg:p-5">
        <h3 className="font-playfair-display text-[20px] font-bold text-brand mb-2">
          {title}
        </h3>
        <p className="font-outfit text-[14px] leading-[1.6] text-[#6B5F60] mb-3.5 flex-1 line-clamp-3">
          {description}
        </p>

        <div className="w-full h-px bg-[#DFC9A8] opacity-60 mb-3"></div>

        <div className="flex items-center justify-between">
          <div className="font-outfit text-[17px] font-bold text-brand">
            {price}
          </div>

          {isOnlineOrderingEnabled && dishMenuItem && (
            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-brand text-white font-outfit font-medium text-[13px] px-3.5 py-1 rounded-[8px] flex items-center justify-center gap-1 hover:bg-brand/90 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add
                </button>
              ) : (
                <div className="flex items-center justify-between bg-white border border-[#DFBE88] text-brand rounded-[8px] h-[28px] w-[78px] px-1 overflow-hidden font-outfit font-semibold shadow-sm">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-5 h-full flex items-center justify-center text-brand hover:bg-[#E6D5B8]/40 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[12px] select-none">{quantity}</span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-5 h-full flex items-center justify-center text-brand hover:bg-[#E6D5B8]/40 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
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
