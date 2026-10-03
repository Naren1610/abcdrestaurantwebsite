"use client";

import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { ArrowRight } from "lucide-react";

interface CartPillProps {
  onClick: () => void;
}

export default function CartPill({ onClick }: CartPillProps) {
  // wait for client hydration
  const totalItems = useStore(useCartStore, (state) => state.getTotalItems());
  const totalPrice = useStore(useCartStore, (state) => state.getTotalPrice());

  // nothing in cart
  if (totalItems === undefined || totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <button
        onClick={onClick}
        className="group flex items-center gap-4 bg-brand text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none"
      >
        <div className="flex flex-col items-start">
          <span className="font-lato font-bold text-[14px] leading-tight">
            View Cart ({totalItems})
          </span>
          <span className="font-lato text-[12px] text-[#DFBE88] leading-tight">
            ${totalPrice?.toFixed(2)}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <ArrowRight className="w-4.5 h-4.5 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
        </div>
      </button>
    </div>
  );
}
