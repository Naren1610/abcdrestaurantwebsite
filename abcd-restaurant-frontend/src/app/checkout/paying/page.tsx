import React from "react";
import SecurePaymentCard from "@/components/ui/Checkout/SecurePaymentCard";

export const metadata = {
  title: "Secure Payment | ABCD Restaurant",
  description: "Secure payment gateway for your ABCD Restaurant order.",
};

export default function PayingPage() {
  return (
    <div className="w-full min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center py-10 sm:py-16 px-4">
        <SecurePaymentCard />
      </div>
    </div>
  );
}
