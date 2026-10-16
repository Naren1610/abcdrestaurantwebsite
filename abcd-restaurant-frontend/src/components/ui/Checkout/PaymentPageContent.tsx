"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PaymentMethodForm from "@/components/ui/Checkout/PaymentMethodForm";
import OrderSummaryCard from "@/components/ui/Checkout/OrderSummaryCard";
import SecurePaymentCard from "@/components/ui/Checkout/SecurePaymentCard";

export default function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorParam = searchParams.get("error");
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  // If there's an error param in the URL, we show the card.
  // We manage this in state so the user can "Try Again" or "Change Payment Method" and dismiss it.
  const [paymentState, setPaymentState] = useState<"loading" | "cancelled" | "error" | null>(
    errorParam === "cancelled" ? "cancelled" : errorParam === "failed" ? "error" : null
  );
  
  // We optionally store an error message if Stripe gave one (e.g., from our own API wrapper)
  const [errorMessage] = useState<string | undefined>(
    errorParam === "failed" ? "Insufficient funds. Please use another payment method." : undefined
  );

  if (isProcessing && paymentState !== "loading") {
    setPaymentState("loading");
  }

  // Fix bfcache issue: if user clicks browser Back button from Stripe, reset the state
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsProcessing(false);
        setPaymentState(null);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleChangeMethod = () => {
    setPaymentState(null);
    setIsProcessing(false);
    // Clear URL params
    router.replace("/checkout/payment", { scroll: false });
  };

  const handleTryAgain = () => {
    // Dismiss error and re-trigger payment by simulating click or just hiding error
    // For now, hiding the error lets them click "Make Payment" again.
    setPaymentState(null);
    setIsProcessing(false);
    router.replace("/checkout/payment", { scroll: false });
  };

  if (paymentState) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 flex items-center justify-center min-h-[60vh]">
        <SecurePaymentCard 
          variant={paymentState}
          errorMessage={errorMessage}
          onChangeMethod={handleChangeMethod}
          onTryAgain={handleTryAgain}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row items-start gap-5 sm:gap-6 lg:gap-7">
        <div className="w-full lg:w-[62%]">
          <PaymentMethodForm onProcessingChange={(processing) => {
            setIsProcessing(processing);
            if (!processing) setPaymentState(null);
          }} />
        </div>

        <div className="w-full lg:w-[38%] lg:sticky lg:top-28">
          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
}
