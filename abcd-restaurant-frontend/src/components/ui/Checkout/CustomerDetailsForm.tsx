"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FormCard from "@/components/ui/Cards/FormCard";
import InputField from "@/components/ui/Forms/InputField";
import TextAreaField from "@/components/ui/Forms/TextAreaField";
import PickupDeliveryToggle from "./PickupDeliveryToggle";
import { customerStore } from "@/lib/services/customerStore";

export default function CustomerDetailsForm() {
  const router = useRouter();

  // Default to pickup tab as requested
  const [mode, setMode] = useState<"delivery" | "pickup">("pickup");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [instructions, setInstructions] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load saved details on mount
  React.useEffect(() => {
    try {
      const stored = customerStore.get();
      if (stored) {
        queueMicrotask(() => {
        if (stored.mode) setMode(stored.mode);
        if (stored.fullName) setFullName(stored.fullName);
        if (stored.mobileNumber) setMobileNumber(stored.mobileNumber);
        if (stored.address) setAddress(stored.address);
        if (stored.apartment) setApartment(stored.apartment);
        if (stored.zipCode) setZipCode(stored.zipCode);
        if (stored.instructions) setInstructions(stored.instructions);        });
      }
    } catch {
      // ignore
    }
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePickup = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full Name is required";
    if (!mobileNumber.trim()) errs.mobileNumber = "Mobile Number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateDrop = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full Name is required";
    if (!mobileNumber.trim()) errs.mobileNumber = "Mobile Number is required";
    if (!address.trim()) errs.address = "Delivery Address is required";
    if (!zipCode.trim()) errs.zipCode = "Zip Code is required";
    return Object.keys(errs).length === 0;
  };

  const isDropValid = validateDrop();

  const handleNextOrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "pickup") {
      if (validatePickup()) {
        // Move to Drop (delivery) tab
        setMode("delivery");
      }
      return;
    }

    // If mode is delivery (Drop tab)
    if (!validateDrop()) return;

    setIsSubmitting(true);

    try {
      customerStore.set({
        fullName,
        mobileNumber,
        address,
        apartment,
        zipCode,
        instructions,
        mode,
      });
    } catch {
      // ignore
    }

    router.push("/checkout/payment");
  };

  return (
    <>
      <FormCard className="w-full">
        <form onSubmit={handleNextOrSubmit} noValidate>
          {/* Top Row: Title + Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2 border-b border-[#EAD8BF]/60">
            <div>
              <h1 className="font-playfair-display font-bold text-[32px] text-brand leading-tight">
                Customer Details
              </h1>
              <p className="font-poppins text-[13px] sm:text-[14px] text-[#6B5E55] mt-1">
                {mode === "delivery"
                  ? "Please provide your details for a smooth delivery."
                  : "Please provide your details for a seamless pickup."}
              </p>
            </div>

            <PickupDeliveryToggle mode={mode} onChange={setMode} />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4 sm:gap-5 mt-6 sm:mt-8">
            
            {/* Show Pickup Fields (Name/Phone) in BOTH tabs, because they are required anyway */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                label="Full Name"
                placeholder="Jane Smith"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                error={errors.fullName}
                required
              />

              <InputField
                label="Mobile Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: "" }));
                }}
                error={errors.mobileNumber}
                prefixElement={
                  <div className="flex items-center gap-1 font-poppins text-[13px] text-[#2C1810]">
                    <img src="https://flagcdn.com/w40/us.png" srcSet="https://flagcdn.com/w80/us.png 2x" width="20" alt="United States" className="object-contain" />
                  </div>
                }
                required
              />
            </div>

            {/* Show Drop Fields ONLY if mode === delivery */}
            {mode === "delivery" && (
              <>
                <InputField
                  label="Delivery Address"
                  placeholder="417 Lancaster Ave, Malvern, PA 19355"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
                  }}
                  error={errors.address}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <InputField
                    label="Apartment, Suite, etc. (Optional)"
                    placeholder="Apt 2B"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />

                  <InputField
                    label="Zip / Postal Code"
                    placeholder="19355"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                      if (errors.zipCode) setErrors((prev) => ({ ...prev, zipCode: "" }));
                    }}
                    error={errors.zipCode}
                    required
                  />
                </div>
              </>
            )}

            {/* Row 4: Delivery / Pickup Instructions */}
            <TextAreaField
              label={
                mode === "delivery"
                  ? "Delivery Instructions (Optional)"
                  : "Pickup Notes / Special Requests (Optional)"
              }
              placeholder={
                mode === "delivery"
                  ? "e.g. Leave at front door, ring doorbell, etc."
                  : "e.g. Any special packaging instructions"
              }
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
            />

            {/* Info Box: Estimated Time */}
            <div className="bg-[#F8EFE0] border border-[#DFC9A8] rounded-[12px] p-3.5 sm:p-4 mt-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 shadow-2xs">
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-[13px] sm:text-[14px] text-[#2C1810] leading-snug">
                  {mode === "delivery" ? "Estimated delivery time" : "Estimated pickup time"}
                </span>
                <span className="font-poppins text-[12px] sm:text-[13px] text-[#6B5E55] leading-tight mt-0.5">
                  {mode === "delivery" ? "30-45 mins" : "15-20 mins"}
                </span>
              </div>

              <span className="font-poppins text-[12px] sm:text-[13px] text-[#6B5E55] sm:text-right max-w-xs">
                You will receive order updates on the above number.
              </span>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#EAD8BF]/60">
              <Link
                href="/menu?cart=open"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#4B2D23] text-[#4B2D23] hover:bg-[#4B2D23]/5 font-poppins font-medium text-[14px] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
                <span>Back to Cart</span>
              </Link>

              {mode === "pickup" ? (
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-8 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full bg-[#6B1D2F] hover:bg-[#561424] active:scale-[0.98] text-white font-poppins font-semibold text-[14px] sm:text-[15px] transition-all shadow-md cursor-pointer group"
                >
                  <span>Next</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isDropValid}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-8 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full bg-[#6B1D2F] hover:bg-[#561424] active:scale-[0.98] text-white font-poppins font-semibold text-[14px] sm:text-[15px] transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  <span>{isSubmitting ? "Processing..." : "Place Order"}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </button>
              )}
            </div>
          </div>
        </form>
      </FormCard>
    </>
  );
}




