import Image from "next/image";

interface DeliveryPartnerCardProps {
  name: string;
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
}

export default function DeliveryPartnerCard({
  name,
  logoUrl,
  logoWidth,
  logoHeight,
}: DeliveryPartnerCardProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[320px] mx-auto group">
      {/* Logo Area (Top Part) */}
      <div className="w-full h-[110px] sm:h-[120px] border-[1.58px] border-b-0 border-[#BB9D6B] rounded-t-[20px] flex items-center justify-center relative bg-transparent group-hover:shadow-sm transition-shadow pb-[24px]">
        <Image
          src={logoUrl}
          alt={name}
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
        />
      </div>

      {/* Button Area (Bottom Part) */}
      <a
        href="#"
        className="w-full bg-[#4e121e] h-[48px] flex items-center justify-center rounded-[24px] text-white font-inter font-medium text-[13px] sm:text-[14px] hover:bg-[#3d0e17] transition-colors relative z-10 -mt-[24px]"
      >
        Order on {name}
      </a>
    </div>
  );
}
