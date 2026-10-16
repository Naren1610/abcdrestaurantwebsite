import React from "react";
import CheckoutPageContent from "@/components/ui/Checkout/CheckoutPageContent";

export const metadata = {
  title: "Checkout - Customer Details | ABCD Restaurant",
  description: "Complete your order with ABCD Restaurant. Fast delivery and pickup available.",
};

export default function CheckoutPage() {
  return (
    <div className="w-full min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <CheckoutPageContent />
      </div>
    </div>
  );
}
