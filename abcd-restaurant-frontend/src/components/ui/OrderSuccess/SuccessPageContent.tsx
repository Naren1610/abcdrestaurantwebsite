"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import OrderSuccessHeader from "./OrderSuccessHeader";
import OrderQuickInfoCards from "./OrderQuickInfoCards";
import OrderStatusCard from "./OrderStatusCard";
import FormCard from "@/components/ui/Cards/FormCard";
import { verifySession, VerifiedSession } from "@/lib/services/checkout";
import { useCartStore } from "@/store/useCartStore";
import { customerStore } from "@/lib/services/customerStore";
import { AlertTriangle } from "lucide-react";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [session, setSession] = useState<VerifiedSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!sessionId) {
      if (!session) {
        setError("No payment session found. Please place an order first.");
      }
      setLoading(false);
      return;
    }

    if (session) return;

    verifySession(sessionId)
      .then((data) => {
        setSession(data);
        clearCart();
        router.replace("/checkout/success", { scroll: false });
      })
      .catch(() => {
        setError("This payment could not be verified. If you were charged, please contact us.");
      })
      .finally(() => setLoading(false));
  }, [sessionId, clearCart, session, router]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#6B1D2F] border-t-transparent animate-spin" />
        <p className="font-poppins text-[14px] text-[#6B5E55]">Verifying your payment...</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="mx-auto w-full max-w-[600px] px-4 sm:px-6 lg:px-10 py-16">
        <FormCard className="p-8 sm:p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-7 h-7 text-[#D97706]" strokeWidth={2} />
          </div>
          <h1 className="font-playfair-display font-bold text-[28px] text-[#2C1810] mb-3">
            Payment Not Verified
          </h1>
          <p className="font-poppins text-[14px] text-[#6B5E55] mb-6 max-w-sm mx-auto">
            {error}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#6B1D2F] hover:bg-[#561424] text-white font-poppins font-semibold text-[14px] transition-all"
            >
              Back to Menu
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#4B2D23] text-[#4B2D23] hover:bg-[#4B2D23]/5 font-poppins font-medium text-[14px] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </FormCard>
      </div>
    );
  }

  let customerAddress = "";
  let estimatedTime = "20-25 mins";
  const stored = customerStore.get();
  if (stored) {
    if (stored.address) customerAddress = stored.address;
    if (stored.mode === "delivery") {
      estimatedTime = "30-45 mins";
    } else {
      estimatedTime = "15-20 mins";
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <OrderSuccessHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
        <OrderQuickInfoCards
          orderNumber={`#${session.orderId}`}
          estimatedTime={estimatedTime}
          address={customerAddress}
        />

        <div className="lg:col-span-2">
          <FormCard className="w-full p-6 sm:p-8">
            <h2 className="font-playfair-display font-bold text-[24px] sm:text-[26px] text-[#6B1D2F] mb-6 sm:mb-7">
              Your Order ({session.itemCount} {session.itemCount === 1 ? "item" : "items"})
            </h2>

            <div className="flex flex-col">
              {session.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between gap-4 py-1">
                    <div className="flex flex-col min-w-0">
                      <span className="font-poppins font-bold text-[15px] sm:text-[16px] text-[#2C1810] truncate">
                        {item.name}
                      </span>
                      <span className="font-poppins text-[13px] text-[#7A6E65] mt-1">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-poppins font-bold text-[15px] sm:text-[16px] text-[#2C1810] shrink-0">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                  {index < session.items.length - 1 && (
                    <div className="border-t border-[#EAD8BF]/60 my-2.5 sm:my-3" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="border-t border-[#EAD8BF] mt-5 mb-5" />

            <div className="flex items-center justify-between">
              <span className="font-poppins font-bold text-[20px] sm:text-[22px] text-[#6B1D2F]">
                Total Paid
              </span>
              <span className="font-poppins font-bold text-[24px] sm:text-[26px] text-[#6B1D2F]">
                ${session.amount.toFixed(2)}
              </span>
            </div>
          </FormCard>
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-28">
          <OrderStatusCard />
        </div>
      </div>
    </div>
  );
}


