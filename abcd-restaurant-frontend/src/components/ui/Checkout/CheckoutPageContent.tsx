"use client";

import React from "react";
import Link from "next/link";
import CustomerDetailsForm from "@/components/ui/Checkout/CustomerDetailsForm";
import OrderSummaryCard from "@/components/ui/Checkout/OrderSummaryCard";
import { useSettings } from "@/hooks/use-settings";
import { Utensils, CalendarCheck } from "lucide-react";

export default function CheckoutPageContent() {
  const { data: settings, isLoading } = useSettings();
  const isOnlineOrderingEnabled = settings?.is_online_ordering_enabled ?? false;

  // While settings are loading or if ordering is enabled, show the checkout form
  if (!isLoading && !isOnlineOrderingEnabled) {
    return (
      <div className="py-12 sm:py-20 px-4">
        <div className="max-w-[620px] mx-auto bg-[#FAF8F2] rounded-[17.6px] p-8 sm:p-12 border border-[#DFC9A880] text-center shadow-[0_4px_24px_rgba(81,25,35,0.04)] animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#511923]/10 text-[#511923] flex items-center justify-center mx-auto mb-6">
            <Utensils className="w-8 h-8 text-[#511923]" />
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#511923] mb-3">
            Online Ordering is Currently Paused
          </h1>
          <p className="font-outfit text-[#6B5F60] text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            We are currently welcoming guests for in-person dine-in service. Explore our chef-crafted menu or book your table online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#511923] text-white font-outfit font-medium text-sm sm:text-base px-8 py-3.5 rounded-[14px] hover:bg-[#40131B] transition-colors shadow-sm active:scale-95"
            >
              Explore Menu
            </Link>
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#DFC9A880] bg-white text-[#511923] font-outfit font-medium text-sm sm:text-base px-8 py-3.5 rounded-[14px] hover:bg-[#FAF8F2] transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" /> Book a Table
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 sm:gap-6 lg:gap-7">
      {/* Left Column: Customer Details Form (~62% on desktop) */}
      <div className="w-full lg:w-[62%]">
        <CustomerDetailsForm />
      </div>

      {/* Right Column: Your Order Summary (~38% on desktop) */}
      <div className="w-full lg:w-[38%] lg:sticky lg:top-28">
        <OrderSummaryCard />
      </div>
    </div>
  );
}
