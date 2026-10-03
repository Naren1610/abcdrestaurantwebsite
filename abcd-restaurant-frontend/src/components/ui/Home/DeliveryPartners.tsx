import DeliveryPartnerCard from "./DeliveryPartnerCard";

const PARTNERS = [
  {
    name: "Grubhub",
    logoUrl: "/images/home/delivery-partners/grubhub.png",
    logoWidth: 160,
    logoHeight: 45,
  },
  {
    name: "DoorDash",
    logoUrl: "/images/home/delivery-partners/doordash.png",
    logoWidth: 180,
    logoHeight: 40,
  },
  {
    name: "Seamless",
    logoUrl: "/images/home/delivery-partners/seamless.png",
    logoWidth: 140,
    logoHeight: 45,
  },
];

export default function DeliveryPartners() {
  return (
    <section className="relative w-full pt-8 pb-10 lg:pt-12 lg:pb-16 bg-background overflow-hidden flex flex-col items-center">
        
        {/* Header with Decorative Bracket (WIDER) */}
        <div className="w-full max-w-[1200px] px-6 lg:px-10 relative z-0">
          <div className="flex items-center justify-center w-full">
            
            {/* Left Bracket Line - longer downward */}
            <div className="flex-1 border-t-[1.58px] border-l-[1.58px] border-[#BB9D6B] rounded-tl-[16px] h-16 sm:h-24 mt-12 sm:mt-16 hidden sm:block"></div>
            
            <div className="flex flex-col items-center px-4 sm:px-8 text-center bg-background z-10 pt-2 pb-6">
              <h2 className="font-playfair-display font-bold text-[36px] sm:text-[42.04px] text-brand tracking-tight px-4">
                Our Delivery Partners
              </h2>
              <p className="font-inter font-medium text-[12px] sm:text-[13px] text-brand-tagline tracking-normal mt-2 uppercase">
                Order from your favorite delivery platforms
              </p>
            </div>

            {/* Right Bracket Line - longer downward */}
            <div className="flex-1 border-t-[1.58px] border-r-[1.58px] border-[#BB9D6B] rounded-tr-[16px] h-16 sm:h-24 mt-12 sm:mt-16 hidden sm:block"></div>
            
          </div>
        </div>

        {/* Cards Grid (NARROWER, No space) */}
        <div className="w-full max-w-[960px] px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 mt-0">
          {PARTNERS.map((partner, index) => (
            <DeliveryPartnerCard key={index} {...partner} />
          ))}
        </div>

    </section>
  );
}
