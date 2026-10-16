"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import CTAButton from "@/components/ui/CTAButton";
import NavLink from "./NavLink";
import { NAV_ITEMS } from "@/constants/navigation";
import { useSettings } from "@/hooks/use-settings";
import { Menu, X } from "lucide-react";

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    <X className="w-[26px] h-[26px] text-brand transition-transform duration-300 pointer-events-none" strokeWidth={2.2} />
  ) : (
    <Menu className="w-[26px] h-[26px] text-brand transition-transform duration-300 pointer-events-none" strokeWidth={2.2} />
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: settings } = useSettings();
  const isReservationsEnabled = settings?.is_table_reservation_enabled ?? true;
  const restaurantPhone = settings?.phone || "+1 (555) 234-5678";

  // Reserve commented out from navigation & disabled as requested
  // { label: "Reserve", href: "/reserve" }
  const navItems = NAV_ITEMS.filter((i) => i.href !== "/reserve");

  const ctaLabel = "Book a Table";
  const ctaHref = undefined;

  // lock scroll while menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="relative w-full bg-background z-50 border-b border-transparent">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10 relative z-50 bg-background">
        <Logo priority />

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <CTAButton label={ctaLabel} />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="relative z-50 p-2.5 -mr-2 flex items-center justify-center lg:hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer select-none touch-manipulation"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background flex flex-col justify-between px-6 pt-24 pb-10 transition-all duration-300 ease-in-out lg:hidden"
          aria-hidden={!isOpen}
        >
          <nav aria-label="Mobile navigation" className="flex-1 flex flex-col justify-center w-full">
            <ul className="flex flex-col items-center justify-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <div onClick={() => setIsOpen(false)}>
                    <NavLink item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile CTA */}
          <div className="w-full mt-auto" onClick={() => setIsOpen(false)}>
            <CTAButton
              label={ctaLabel}
              className="w-full flex justify-center items-center gap-3 rounded-full bg-brand pl-6 pr-1.5 py-2 text-[15px] font-semibold font-outfit text-btn-text transition-opacity duration-200 hover:opacity-90 shadow-md"
              circleClassName="flex h-8 w-8 items-center justify-center rounded-full border border-btn-circle-border"
              arrowClassName="text-btn-text"
            />
          </div>
        </div>
      )}
    </header>
  );
}
