"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FormCard from "@/components/ui/Cards/FormCard";
import InputField from "@/components/ui/Forms/InputField";
import TextAreaField from "@/components/ui/Forms/TextAreaField";
import {
  Send,
  CheckCircle2,
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-12 pb-12 lg:pt-16 lg:pb-14 border-b border-[#EDE0CB]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <span className="font-inter text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B98F56]">
              WE&apos;D LOVE TO HEAR FROM YOU
            </span>
            <Image
              src="/images/about/diamond-arc-02.svg"
              alt=""
              width={38}
              height={8}
              className="h-auto w-9 object-contain select-none opacity-80"
            />
          </div>

          {/* Page Title */}
          <h1 className="font-playfair-display text-[38px] sm:text-[50px] lg:text-[58px] font-normal leading-[1.12] tracking-tight text-[#511923]">
            Get in Touch with{" "}
            <span className="italic text-[#B98F56]">ABCD</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 font-inter text-[15px] sm:text-[17px] text-[#6B5E59] max-w-[660px] mx-auto leading-relaxed">
            Have a question about our menu, planning a private dining gathering, or wishing to share your dining experience? Fill out the form below and our hospitality team will gladly assist you.
          </p>
        </div>
      </section>

      {/* Main Content Area: FormCard & Event Showcase (Theme-based UI) */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-[1280px] mx-auto">
          
          {/* Left Column: Reusable FormCard with Theme Input Fields */}
          <div className="lg:col-span-7 flex flex-col">
            <FormCard className="flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h2 className="font-playfair-display text-[26px] sm:text-[30px] font-normal text-[#511923] leading-snug">
                    Send Us a Message
                  </h2>
                  <p className="mt-1.5 font-poppins text-[13px] sm:text-[14px] text-[#6B5E55]">
                    Share your inquiry and our team will get back to you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-playfair-display text-[24px] font-medium text-[#511923]">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="font-poppins text-[14px] text-[#6B5E55] max-w-[420px] leading-relaxed">
                      Your message has been received. A member of our hospitality team will review your inquiry and reach out shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          inquiryType: "General Inquiry",
                          message: "",
                        });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full border border-brand text-brand font-outfit text-sm font-semibold hover:bg-brand hover:text-white transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <InputField
                        label="Your Name"
                        required
                        placeholder="e.g. Arjun Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <InputField
                        label="Email Address"
                        type="email"
                        required
                        placeholder="e.g. arjun@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <InputField
                        label="Phone Number (Optional)"
                        type="tel"
                        placeholder="e.g. +1 (610) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />

                      {/* Inquiry Topic Dropdown styled with theme */}
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="inquiry-type"
                          className="font-poppins font-semibold text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#6B5E55] mb-1.5 block"
                        >
                          Topic
                        </label>
                        <div className="relative flex items-center w-full bg-[#FFFDF8] border border-[#EAD8BF] rounded-[10px] sm:rounded-[12px] transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20">
                          <select
                            id="inquiry-type"
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full h-[50px] sm:h-[52px] bg-transparent px-4 font-poppins text-[14px] sm:text-[15px] text-[#2C1810] focus:outline-none cursor-pointer"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Private Dining & Celebrations">Private Dining & Celebrations</option>
                            <option value="Catering & Group Orders">Catering & Group Orders</option>
                            <option value="Chef Specials & Dietary Requests">Chef Specials & Dietary Requests</option>
                            <option value="Guest Feedback">Guest Experience Feedback</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <TextAreaField
                      label="Message"
                      required
                      rows={4}
                      placeholder="Share your thoughts, dates, number of guests, or how we can assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand text-white font-outfit font-semibold text-[15px] hover:bg-brand/90 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? "Sending..." : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FormCard>
          </div>

          {/* Right Column: Private Celebrations & Dining Atmosphere */}
          <div
            className="lg:col-span-5 rounded-[20px] overflow-hidden border border-[#EAD8BF] flex flex-col justify-between shadow-[0_4px_24px_rgba(78,18,30,0.03)]"
            style={{ backgroundColor: "#FFFDF8DB" }}
          >
            {/* Image Header */}
            <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
              <Image
                src="/images/about/dining-area.png"
                alt="ABCD Restaurant Dining Area"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF8DB] via-transparent to-black/20" />
            </div>

            {/* Content Details */}
            <div className="p-7 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
              <div>
                <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-[#B98F56] block mb-1">
                  CELEBRATE WITH US
                </span>
                <h3 className="font-playfair-display text-[24px] sm:text-[26px] font-normal text-[#511923] leading-snug">
                  Hosting a Special Event?
                </h3>
                <p className="mt-3 font-poppins text-[13.5px] text-[#6B5E55] leading-relaxed">
                  From milestone birthdays and festive family reunions to corporate dinners, ABCD curates authentic Indian feasts in an atmosphere of warmth and hospitality.
                </p>

                {/* Highlights */}
                <div className="mt-6 space-y-3 font-poppins text-[13px] text-[#511923]">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#B98F56] shrink-0" />
                    <span>Curated multi-course tasting menus by our master chefs</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <UtensilsCrossed className="w-4 h-4 text-[#B98F56] shrink-0" />
                    <span>Halal, Jain, Vegan & Gluten-free accommodations</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#B98F56] shrink-0" />
                    <span>Dedicated hospitality coordinator for your gathering</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-outfit text-sm font-semibold hover:bg-brand/90 transition-colors"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/our-story"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand/30 text-brand font-outfit text-sm font-semibold hover:bg-brand/5 transition-colors"
                >
                  Discover Our Story
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
