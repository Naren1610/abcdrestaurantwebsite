"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
const emptySubscribe = () => () => {};
import StepProgress from "./StepProgress";
import Step1ChooseDate from "./Step1ChooseDate";
import Step2PartySize from "./Step2PartySize";
import Step3Details from "./Step3Details";
import ReservationSummary from "./ReservationSummary";
import { CheckCircle2, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

export default function ReservationSection() {
  const { data: settings } = useSettings();
  const isReservationsEnabled = settings?.is_table_reservation_enabled ?? true;
  const restaurantPhone = settings?.phone || "+1 (555) 234-5678";
  const [currentStep, setCurrentStep] = useState<number>(1);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // form state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [experience, setExperience] = useState<"Lunch" | "Dinner">("Dinner");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [guests, setGuests] = useState<number | null>(null);
  const [seatingType, setSeatingType] = useState<"Tables" | "Lounge">("Tables");

  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");
  const [specialRequest, setSpecialRequest] = useState<string>("");

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleConfirmReservation = () => {
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setCurrentStep(1);
    setSelectedDate(new Date());
    setSelectedTime("");
    setExperience("Dinner");
    setGuests(null);
    setSeatingType("Tables");
    setFullName("");
    setPhone("");
    setEmail("");
    setOccasion("");
    setSpecialRequest("");
  };

  if (!isMounted) {
    return (
      <section className="relative w-full bg-background pb-16 sm:pb-24 pt-2 min-h-[600px] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
      </section>
    );
  }

  if (!isReservationsEnabled) {
    return (
      <section className="relative w-full bg-background py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[620px] mx-auto bg-[#FAF8F2] rounded-[17.6px] p-8 sm:p-12 border border-[#DFC9A880] text-center shadow-[0_4px_24px_rgba(81,25,35,0.04)] animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#511923]/10 text-[#511923] flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-[#511923]" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-[#511923] mb-3">
            Online Reservations Paused
          </h2>
          <p className="font-outfit text-[#6B5F60] text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            We are currently accepting table reservations exclusively by phone. Please call our host directly to secure your table and discuss any special requests.
          </p>
          <a
            href={`tel:${restaurantPhone.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center justify-center gap-2.5 bg-[#511923] text-white font-outfit font-medium text-base px-8 py-3.5 rounded-[14px] hover:bg-[#40131B] transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            Call {restaurantPhone}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Reservation Form"
      className="relative w-full bg-background pb-16 sm:pb-24 pt-2"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {isConfirmed ? (
          /* Booking Confirmation State */
          <div className="max-w-[680px] mx-auto bg-[#FAF8F2] rounded-[17.6px] border border-[#DFC9A880] p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(81,25,35,0.06)] animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#511923]/10 text-[#511923] flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-[#511923]" />
            </div>

            <h2 className="font-playfair-display font-medium text-[#511923] text-[28px] sm:text-[36px] tracking-tight">
              Table Reserved!
            </h2>
            <p className="mt-2 font-inter text-[15px] sm:text-[16px] text-[#6B5E59]">
              Thank you, <strong className="text-[#3D2C2E]">{fullName}</strong>. We look forward to hosting you at ABCD Restaurant.
            </p>

            {/* Reservation Highlights Card */}
            <div className="my-8 p-6 rounded-[14px] bg-white border border-[#DFC9A880] text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#511923] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8C7E77] font-inter">Date</div>
                  <div className="text-[14px] font-semibold text-[#2C2123] font-inter">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#511923] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8C7E77] font-inter">Time & Exp</div>
                  <div className="text-[14px] font-semibold text-[#2C2123] font-inter">
                    {selectedTime} • {experience}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#511923] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8C7E77] font-inter">Guests & Seating</div>
                  <div className="text-[14px] font-semibold text-[#2C2123] font-inter">
                    {guests} guests • {seatingType}
                  </div>
                </div>
              </div>
            </div>

            <p className="font-inter text-[13.5px] text-[#8C7E77] mb-8">
              A confirmation email has been sent to <span className="font-medium text-[#2C2123]">{email}</span>.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[14px] bg-[#511923] text-white font-inter text-[15px] font-medium hover:bg-[#40131B] transition-colors cursor-pointer shadow-sm"
            >
              <span>Book Another Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Multi-step Layout */
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Form Steps Container */}
            <div className="w-full lg:w-[67%] bg-[#FAF8F2] rounded-[17.6px] border border-[#DFC9A880] p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(81,25,35,0.04)]">
              {/* Step Progress Bar */}
              <StepProgress
                currentStep={currentStep}
                onStepClick={(step) => setCurrentStep(step)}
              />

              {/* Step 1: Choose Date & Time */}
              {currentStep === 1 && (
                <Step1ChooseDate
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                  experience={experience}
                  onSelectExperience={setExperience}
                  onNext={() => setCurrentStep(2)}
                />
              )}

              {/* Step 2: Party Size & Seating Type */}
              {currentStep === 2 && (
                <Step2PartySize
                  guests={guests}
                  onSelectGuests={setGuests}
                  seatingType={seatingType}
                  onSelectSeatingType={setSeatingType}
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              )}

              {/* Step 3: Guest Details Form */}
              {currentStep === 3 && (
                <Step3Details
                  fullName={fullName}
                  onChangeFullName={setFullName}
                  phone={phone}
                  onChangePhone={setPhone}
                  email={email}
                  onChangeEmail={setEmail}
                  occasion={occasion}
                  onChangeOccasion={setOccasion}
                  specialRequest={specialRequest}
                  onChangeSpecialRequest={setSpecialRequest}
                  onBack={() => setCurrentStep(2)}
                  onSubmit={handleConfirmReservation}
                />
              )}
            </div>

            {/* Right Column: "Your reservation" Summary Card */}
            <div className="w-full lg:w-[33%] lg:sticky lg:top-28 self-start">
              <ReservationSummary
                date={selectedDate}
                time={selectedTime}
                guests={guests}
                experience={experience}
                onEditStep={(step) => setCurrentStep(step)}
              />
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
