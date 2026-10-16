import Link from "next/link";
import Logo from "@/components/ui/Logo";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { RESTAURANT_INFO } from "@/constants/footer";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

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

          {/* Column 4 — Follow Us (Replaced Stay Connected & Email Subscribe) */}
          <div>
            <h3 className="mb-5 text-[16px] font-bold font-cinzel uppercase text-brand">
              Follow Us
            </h3>
            <p className="mb-5 text-[15px] font-outfit text-footer-muted leading-relaxed">
              {RESTAURANT_INFO.followUs.description}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ABCD Restaurant on Facebook"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-brand/25 text-brand bg-brand/[0.04] transition-all duration-300 hover:bg-brand hover:text-white hover:-translate-y-0.5"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ABCD Restaurant on Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-brand/25 text-brand bg-brand/[0.04] transition-all duration-300 hover:bg-brand hover:text-white hover:-translate-y-0.5"
              >
                <InstagramIcon className="w-4 h-4 fill-current" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ABCD Restaurant on YouTube"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-brand/25 text-brand bg-brand/[0.04] transition-all duration-300 hover:bg-brand hover:text-white hover:-translate-y-0.5"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
              </Link>
            </div>
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
