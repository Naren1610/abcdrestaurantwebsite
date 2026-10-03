import Link from "next/link";
import Logo from "@/components/ui/Logo";
import EmailSubscribe from "@/components/ui/EmailSubscribe";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { RESTAURANT_INFO } from "@/constants/footer";

export default function Footer() {
  return (
    <footer className="w-full bg-background" aria-label="Site footer">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.5fr] lg:gap-16 items-start">
          {/* Column 1 — Logo + Tagline */}
          <div>
            <Logo
              width={118}
              height={47}
              showTagline
            />
          </div>

          {/* Column 2 — Visit Us */}
          <div>
            <h3 className="mb-5 text-[16px] font-bold font-cinzel uppercase text-brand">
              Visit Us
            </h3>
            <address className="not-italic">
              <p className="text-[15px] font-outfit text-footer-muted leading-relaxed">
                {RESTAURANT_INFO.address.line1}
                <br />
                {RESTAURANT_INFO.address.line2}
              </p>
            </address>
            <Link
              href={RESTAURANT_INFO.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold font-outfit text-brand transition-opacity hover:opacity-75"
            >
              Get Directions
              <ArrowRightIcon className="text-brand" size={14} />
            </Link>
          </div>

          {/* Column 3 — Hours */}
          <div>
            <h3 className="mb-5 text-[16px] font-bold font-cinzel uppercase text-brand">
              Hours
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:gap-4">
              {RESTAURANT_INFO.hours.map((slot) => (
                <div key={slot.days}>
                  <p className="text-[15px] font-semibold font-outfit text-brand">
                    {slot.days}
                  </p>
                  {slot.times.map((time) => (
                    <p
                      key={time}
                      className="text-[14px] font-outfit text-footer-muted"
                    >
                      {time}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Column 4 — Stay Connected */}
          <div>
            <h3 className="mb-5 text-[16px] font-bold font-cinzel uppercase text-brand">
              Stay Connected
            </h3>
            <p className="mb-5 text-[15px] font-outfit text-footer-muted leading-relaxed">
              {RESTAURANT_INFO.stayConnected.description}
            </p>
            <EmailSubscribe />
          </div>
        </div>

        <div className="mt-14 h-px bg-footer-divider" />

        <p className="mt-6 text-center text-[13px] font-outfit text-brand">
          {RESTAURANT_INFO.copyright}
        </p>
      </div>
    </footer>
  );
}
