"use client";

import React, { useState } from "react";
import Link from "next/link";
import FormCard from "@/components/ui/Cards/FormCard";
import PaymentOptionCard from "./PaymentOptionCard";
import { ArrowLeft, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { createCheckout, CustomerDetails } from "@/lib/services/checkout";
import { customerStore } from "@/lib/services/customerStore";


type PaymentMethodType = "online" | "cod" | "pickup" | "wallet";

export default function PaymentMethodForm({ onProcessingChange }: { onProcessingChange?: (processing: boolean) => void }) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = useStore(useCartStore, (state) => state.items) || [];

  const handleMakePayment = async () => {
    if (selectedMethod !== "online" || isProcessing || items.length === 0) return;

    setIsProcessing(true);
    if (onProcessingChange) onProcessingChange(true);
    setError(null);

    try {
      let customer: CustomerDetails = {
        fullName: "",
        mobileNumber: "",
        mode: "delivery",
      };

      try {
        const stored = customerStore.get();
        if (stored) customer = stored;
      } catch {
        // use defaults
      }

      const checkoutItems = items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      // Wait for Stripe session AND a minimum of 2.5 seconds so the card is visible
      const [checkoutResponse] = await Promise.all([
        createCheckout(checkoutItems, customer),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);

      if (checkoutResponse.url) {
        window.location.href = checkoutResponse.url;
      } else {
        throw new Error("No checkout URL received from Stripe");
      }
} catch {
      window.location.replace("/checkout/payment?error=failed");
    }
  };

  const isOnline = selectedMethod === "online";





  return (
    <>
      <FormCard className="w-full sm:p-10 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair-display font-bold text-[32px] sm:text-[36px] text-[#6B1D2F] leading-tight">
            Payment Method
          </h1>
          <p className="font-poppins text-[15px] sm:text-[16px] text-[#2C1810] mt-2">
            Choose how you&apos;d like to pay.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-poppins font-semibold text-red-900 text-sm">Checkout Error</span>
              <span className="font-poppins text-red-700 text-sm mt-0.5">{error}</span>
            </div>
            <button
              type="button"
              onClick={handleMakePayment}
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Recommended Section */}
        <div className="mb-8">
          <h2 className="font-poppins font-bold text-[16px] sm:text-[18px] text-[#2C1810] mb-4">
            Recommended
          </h2>
          <PaymentOptionCard
            id="online"
            title="Pay Securely Online"
            badgesText="VISA MC AMEX DISCOVER"
            description="Cards, NetBanking and more."
            isSelected={selectedMethod === "online"}
            onSelect={() => setSelectedMethod("online")}
            statusBadge={{ label: "Recommended", variant: "recommended" }}
          />
        </div>

        {/* Other Options Section */}
        <div className="mb-10">
          <h2 className="font-poppins font-bold text-[16px] sm:text-[18px] text-[#2C1810] mb-4">
            Other Options
          </h2>
          <div className="flex flex-col gap-4">
            <PaymentOptionCard
              id="cod"
              title="Cash on Delivery"
              description="Pay in cash when your order is delivered."
              isSelected={selectedMethod === "cod"}
              onSelect={() => setSelectedMethod("cod")}
              statusBadge={{ label: "Available", variant: "available" }}
            />

            <PaymentOptionCard
              id="pickup"
              title="Pay at Pickup"
              description="Pay in cash or card when you pick up your order."
              isSelected={selectedMethod === "pickup"}
              onSelect={() => setSelectedMethod("pickup")}
              statusBadge={{ label: "Available", variant: "available" }}
            />

            <PaymentOptionCard
              id="wallet"
              title="Store Wallet"
              description="Pay using your ABCD Wallet balance."
              isSelected={selectedMethod === "wallet"}
              onSelect={() => setSelectedMethod("wallet")}
              isDisabled={true}
              statusBadge={{ label: "Unavailable for delivery", variant: "unavailable" }}
            />
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-6">
          <Link
            href="/menu?cart=open"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border-[1.5px] border-[#6B1D2F] text-[#6B1D2F] hover:bg-[#6B1D2F]/5 font-poppins font-bold text-[14px] sm:text-[15px] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span>Back to Cart</span>
          </Link>

          <button
            type="button"
            onClick={handleMakePayment}
            disabled={!isOnline || items.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-8 pr-2.5 py-2.5 rounded-full bg-[#6B1D2F] hover:bg-[#561424] active:scale-[0.98] text-white font-poppins font-bold text-[14px] sm:text-[15px] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            <span>Make Payment</span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
              <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </FormCard>
    </>
  );
}






