import React, { Suspense } from "react";
import SuccessPageContent from "@/components/ui/OrderSuccess/SuccessPageContent";

export const metadata = {
  title: "Order Received | ABCD Restaurant",
  description: "Thank you! Your order has been placed successfully and sent to our kitchen.",
};

export default function OrderSuccessPage() {
  return (
    <div className="w-full min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#6B1D2F] border-t-transparent animate-spin" />
          </div>
        }
      >
        <SuccessPageContent />
      </Suspense>
    </div>
  );
}