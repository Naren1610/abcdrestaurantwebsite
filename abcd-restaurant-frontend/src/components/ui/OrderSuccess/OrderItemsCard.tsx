"use client";

import React from "react";
import SafeImage from "@/components/ui/SafeImage";
import FormCard from "@/components/ui/Cards/FormCard";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { getImageUrl } from "@/lib/services/cloudinary";

const DEFAULT_ORDER_ITEMS = [
  {
    id: "tandoori-chicken",
    name: "Tandoori Chicken",
    price: 19.99,
    quantity: 1,
    image: "/images/menu/items/Tandoori Chicken.jpg",
    isVeg: false,
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    price: 22.99,
    quantity: 1,
    image: "/images/menu/items/Butter Chicken.jpg",
    isVeg: false,
  },
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    price: 5.59,
    quantity: 2,
    image: "/images/menu/items/Garlic Naan.jpg",
    isVeg: true,
  },
  {
    id: "lucknowi-murgh-biryani",
    name: "Lucknowi Murgh Biryani",
    price: 22.99,
    quantity: 1,
    image: "/images/menu/items/Lucknowi Murgh Biryani.png",
    isVeg: false,
  },
];

export default function OrderItemsCard() {
  const cartItems = useStore(useCartStore, (state) => state.items) || [];
  
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // fallback to demo data if cart empty
  const hasLiveCart = cartItems.length > 0;
  const items = hasLiveCart
    ? cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price * item.quantity,
        quantity: item.quantity,
        image: getImageUrl("menu-item", item.name),
        isVeg: item.tags.includes("veg"),
      }))
    : DEFAULT_ORDER_ITEMS;

  const totalItemCount = hasLiveCart ? cartCount : 4;
  const subtotal = hasLiveCart ? cartTotal : 71.56;

  return (
    <FormCard className="w-full p-6 sm:p-8">
      {/* Title */}
      <h2 className="font-playfair-display font-bold text-[24px] sm:text-[26px] text-[#6B1D2F] mb-6 sm:mb-7">
        Your Order ({totalItemCount} {totalItemCount === 1 ? "item" : "items"})
      </h2>

      {/* Item List */}
      <div className="flex flex-col">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex items-center justify-between gap-4 py-1">
              {/* Left side: Thumbnail + Details */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[12px] overflow-hidden border border-[#EAD8BF]/80 shrink-0 bg-[#F5EBDC]">
                  <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-poppins font-bold text-[15px] sm:text-[16px] text-[#2C1810] truncate">
                      {item.name}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.isVeg ? "bg-[#38A169]" : "bg-[#E53E3E]"
                      }`}
                      title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    />
                  </div>
                  <span className="font-poppins text-[13px] text-[#7A6E65] mt-1">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>

              {/* Right side: Price */}
              <span className="font-poppins font-bold text-[15px] sm:text-[16px] text-[#2C1810] shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>

            {/* Divider between items */}
            {index < items.length - 1 && (
              <div className="border-t border-[#EAD8BF]/60 my-2.5 sm:my-3" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Divider above Subtotal */}
      <div className="border-t border-[#EAD8BF] mt-5 mb-5" />

      {/* Subtotal Row */}
      <div className="flex items-center justify-between">
        <span className="font-poppins font-bold text-[20px] sm:text-[22px] text-[#6B1D2F]">
          Subtotal
        </span>
        <span className="font-poppins font-bold text-[24px] sm:text-[26px] text-[#6B1D2F]">
          ${subtotal.toFixed(2)}
        </span>
      </div>
    </FormCard>
  );
}






