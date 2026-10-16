"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { ArrowLeft, ArrowRight, Minus, Plus, X } from "lucide-react";
import { PRICING } from "@/constants/pricing";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const router = useRouter();
  const items = useStore(useCartStore, (state) => state.items) || [];
  const totalPrice = useStore(useCartStore, (state) => state.getTotalPrice()) || 0;
  const totalItems = useStore(useCartStore, (state) => state.getTotalItems()) || 0;
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [isRouting, setIsRouting] = useState(false);
  
  const handleCheckout = () => {
    setIsRouting(true);
    // Don't close immediately, let the user see the loading state
    router.push("/checkout");
  };

  // lock scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tax = totalPrice * PRICING.taxRate;
  const finalTotal = totalPrice + tax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[380px] sm:w-[420px] bg-[#FDF8F2] border-l border-y border-[#EAD8BF] rounded-l-[12px] z-[110] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden">
        
        <div className="flex items-center px-6 pt-5 pb-3">
          {/* Small screens: Go back */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Go back"
            className="sm:hidden flex items-center gap-1.5 text-[#571621] font-outfit font-semibold text-[14px] hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            Go back
          </button>

          {/* Large screens: Close on the right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="hidden sm:flex ml-auto items-center gap-1.5 text-[#8D827A] font-outfit font-medium text-[13px] hover:text-[#571621] transition-colors group"
          >
            Close
            <span className="w-6 h-6 rounded-full border border-[#EAD8BF] flex items-center justify-center group-hover:border-[#C19A6B] transition-colors">
              <X className="w-3 h-3" strokeWidth={2.5} />
            </span>
          </button>
        </div>

        {/* Header */}
        <div className="px-8 pb-3">
          <h2 className="font-playfair-display font-bold text-[22px] text-[#571621] mb-1.5">
            Your Order
          </h2>
          <p className="font-outfit text-[#8D827A] text-[14px]">
            All orders are sent directly to our kitchen.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#8D827A] space-y-4">
              <p className="font-outfit text-lg">Your order is empty.</p>
              <button 
                onClick={onClose}
                className="text-brand font-medium hover:underline font-outfit"
              >
                Continue exploring
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {/* Item Image */}
                  <div className="relative w-[70px] h-[70px] shrink-0 rounded-[12px] overflow-hidden">
                    <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="font-outfit font-bold text-[16px] text-[#2C2424] leading-tight min-w-0 truncate">
                        {item.name}
                      </h3>
                      {/* Dietary Dot */}
                      {item.tags.includes("veg") ? (
                        <div className="w-2 h-2 min-w-[8px] min-h-[8px] aspect-square rounded-full bg-[#2E7D32] shrink-0 self-center" />
                      ) : (
                        <div className="w-2 h-2 min-w-[8px] min-h-[8px] aspect-square rounded-full bg-[#D32F2F] shrink-0 self-center" />
                      )}
                    </div>
                    
                    <span className="font-outfit text-[15px] text-[#6B5F60]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between bg-white border border-[#EAD8BF] rounded-[8px] h-[36px] w-[90px] shrink-0 font-outfit font-bold shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-1/3 h-full flex items-center justify-center text-[#571621] hover:bg-[#FDF8F2] rounded-l-[8px] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                    <span className="w-1/3 text-center text-[15px] text-[#571621]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-1/3 h-full flex items-center justify-center text-[#571621] hover:bg-[#FDF8F2] rounded-r-[8px] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 pb-8 pt-4">
            <div className="border-t border-[#EAD8BF] pt-6 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-outfit text-[15px] text-[#6B5F60]">Items ({totalItems})</span>
                <span className="font-outfit text-[15px] text-[#6B5F60]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-outfit text-[15px] text-[#6B5F60]">Tax (7%)</span>
                <span className="font-outfit text-[15px] text-[#6B5F60]">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-outfit font-bold text-[22px] text-[#571621]">Total</span>
                <span className="font-outfit font-bold text-[22px] text-[#571621]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout} disabled={isRouting}
              className="w-full flex items-center justify-center gap-3 bg-[#571621] hover:bg-[#4A121C] active:scale-[0.99] text-white font-outfit font-bold text-[16px] py-3.5 px-6 rounded-[12px] transition-all group shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{isRouting ? "Processing..." : "Checkout"}</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </button>
          </div>
        )}
        
      </div>
    </>
  );
}








