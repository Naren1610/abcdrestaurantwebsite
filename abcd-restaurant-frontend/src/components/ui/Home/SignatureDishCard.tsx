import Image from "next/image";

interface SignatureDishCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  isSpecial?: boolean;
}

export default function SignatureDishCard({
  title,
  description,
  price,
  image,
  isSpecial,
}: SignatureDishCardProps) {
  return (
    <div className="group relative flex flex-col min-w-[280px] w-[280px] shrink-0 rounded-[17px] border-[1.34px] border-[#DFC9A8] bg-[#F6ECDA] snap-start transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl hover:z-10 cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] rounded-t-[16px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {isSpecial && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#B89047] px-3 py-1 shadow-md">
            <Image
              src="/icons/Star.svg"
              alt="Star"
              width={10}
              height={10}
              className="text-white"
            />
            <span className="font-outfit text-[10px] font-bold tracking-[0.1em] text-white uppercase">
              ABCD SPECIAL
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 lg:p-5">
        <h3 className="font-playfair-display text-[20px] font-bold text-brand mb-2">
          {title}
        </h3>
        <p className="font-outfit text-[14px] leading-[1.6] text-[#6B5F60] mb-3.5 flex-1 line-clamp-3">
          {description}
        </p>

        <div className="w-full h-px bg-[#DFC9A8] opacity-60 mb-3"></div>

        <div className="font-outfit text-[17px] font-bold text-brand">
          {price}
        </div>
      </div>
    </div>
  );
}
