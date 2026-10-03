"use client";

import React from "react";
import Image from "next/image";
import FormCard from "@/components/ui/Cards/FormCard";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { Lock, X, ArrowRight } from "lucide-react";
import { PRICING } from "@/constants/pricing";

interface SecurePaymentCardProps {
  variant: "loading" | "cancelled" | "error";
  errorMessage?: string;
  onTryAgain?: () => void;
  onChangeMethod?: () => void;
}

export default function SecurePaymentCard({
  variant,
  errorMessage,
  onTryAgain,
  onChangeMethod,
}: SecurePaymentCardProps) {
  const items = useStore(useCartStore, (state) => state.items) || [];
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = items.reduce((count, item) => count + item.quantity, 0);
  const tax = subtotal * PRICING.taxRate;
  const finalTotal = subtotal + tax;

  const displayCount = totalCount;
  const displayTotal = finalTotal.toFixed(2);

  return (
    <FormCard className="w-full max-w-[420px] mx-auto p-7 sm:p-9 text-center">
      {/* Top ABCD Logo */}
      <div className="flex justify-center mb-11">
        <Image
          src="/images/logo.png"
          alt="ABCD Restaurant"
          width={108}
          height={44}
          priority
          className="object-contain"
        />
      </div>

      {/* Dynamic Icon */}
      {variant === "loading" && (
        <div className="w-[56px] h-[56px] rounded-full border border-[#6B1D2F] flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-[#6B1D2F]" strokeWidth={2} />
        </div>
      )}
      {variant === "cancelled" && (
        <div className="w-[56px] h-[56px] rounded-full border border-[#D97706] flex items-center justify-center mx-auto mb-6">
          <X className="w-6 h-6 text-[#D97706]" strokeWidth={2.5} />
        </div>
      )}
      {variant === "error" && (
        <div className="w-[56px] h-[56px] rounded-full border border-[#DC2626] flex items-center justify-center mx-auto mb-6">
          <X className="w-6 h-6 text-[#DC2626]" strokeWidth={2.5} />
        </div>
      )}

      {/* Heading */}
      <h1 className="font-playfair-display font-bold text-[34px] text-[#6B1D2F] leading-tight mb-3">
        {variant === "loading" && "Secure Payment"}
        {variant === "cancelled" && "Payment Cancelled"}
        {variant === "error" && "Payment Failed"}
      </h1>

      {/* Explanatory Message */}
      <p className="font-poppins text-[13.5px] sm:text-[14px] text-[#554D46] leading-relaxed max-w-[310px] mx-auto mb-7">
        {variant === "loading" && (
          <>
            You'll be redirected to our secure payment gateway.
            <br />
            Please do not close this window.
          </>
        )}
        {variant === "cancelled" && (
          <>
            You cancelled the payment.
            <br />
            No charges have been made.
          </>
        )}
        {variant === "error" && (
          <>
            We couldn't process your payment.
            <br />
            Please try again.
          </>
        )}
      </p>

      {/* Error Box (only for error variant) */}
      {variant === "error" && errorMessage && (
        <div className="w-full bg-[#FEF2F2] border border-[#FCA5A5] rounded-[10px] py-3.5 px-4 mb-6">
          <p className="font-poppins font-bold text-[13px] text-[#991B1B]">
            {errorMessage.split('.')[0] || "Payment error"}
          </p>
          <p className="font-poppins text-[12.5px] text-[#B91C1C] mt-0.5">
            {errorMessage.split('.').slice(1).join('.').trim() || "Please use another payment method."}
          </p>
        </div>
      )}

      {/* Dynamic Actions */}
      {variant === "loading" && (
        <>
          <div className="w-full max-w-[260px] mx-auto h-1.5 bg-[#E6D7C3] rounded-full overflow-hidden mb-3 relative">
            <div className="h-full bg-[#6B1D2F] rounded-full w-1/2 animate-progress-indeterminate" />
          </div>
          <p className="font-poppins font-medium text-[13.5px] text-[#2C1810] mb-8">
            Redirecting securely...
          </p>
        </>
      )}

      {variant === "cancelled" && (
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={onChangeMethod}
            className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-full bg-[#6B1D2F] hover:bg-[#561424] active:scale-[0.98] text-white font-poppins font-semibold text-[14.5px] transition-all"
          >
            <span>Change Payment Method</span>
            <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </div>
          </button>
        </div>
      )}

      {variant === "error" && (
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={onTryAgain}
            className="w-full py-3 rounded-full bg-[#6B1D2F] hover:bg-[#561424] active:scale-[0.98] text-white font-poppins font-semibold text-[14.5px] transition-all"
          >
            Try Again
          </button>
          <button
            onClick={onChangeMethod}
            className="w-full py-3 rounded-full border-[1.5px] border-[#6B1D2F] text-[#6B1D2F] hover:bg-[#6B1D2F]/5 active:scale-[0.98] font-poppins font-semibold text-[14.5px] transition-all"
          >
            Change Payment Method
          </button>
        </div>
      )}

      {/* Order Info Pill / Box */}
      <div className="w-full bg-[#F5EBDC]/85 border border-[#EAD8BF]/70 rounded-[14px] p-4 sm:p-5 flex items-center justify-between text-left">
        <div className="flex flex-col">
          <span className="font-poppins font-medium text-[13.5px] sm:text-[14px] text-[#2C1810]">
            Your Order
          </span>
          <span className="font-poppins text-[12px] sm:text-[12.5px] text-[#6B5E55] mt-0.5">
            {displayCount} Items
          </span>
        </div>

        <span className="font-poppins font-bold text-[16px] sm:text-[17px] text-[#2C1810]">
          ${displayTotal}
        </span>
      </div>
    </FormCard>
  );
}


