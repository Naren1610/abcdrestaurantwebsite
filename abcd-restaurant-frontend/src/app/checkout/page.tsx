import React from "react";
import CustomerDetailsForm from "@/components/ui/Checkout/CustomerDetailsForm";
import OrderSummaryCard from "@/components/ui/Checkout/OrderSummaryCard";

export const metadata = {
  title: "Checkout - Customer Details | ABCD Restaurant",
  description: "Complete your order with ABCD Restaurant. Fast delivery and pickup available.",
};

export default function CheckoutPage() {
  return (
    <div className="w-full min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* Two Column Grid */}
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

      </div>
    </div>
  );
}
