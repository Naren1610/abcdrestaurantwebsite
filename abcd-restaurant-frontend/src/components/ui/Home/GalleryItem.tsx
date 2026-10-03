import Image from "next/image";

interface GalleryItemProps {
  image: string;
  rotationClass: string;
  pinClass: string;
}

export default function GalleryItem({
  image,
  rotationClass,
  pinClass,
}: GalleryItemProps) {
  return (
    <div
      className={`relative bg-white p-2 sm:p-3 pb-8 sm:pb-12 lg:pb-14 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex-1 min-w-0 max-w-[260px] mx-auto w-full transition-transform duration-300 hover:scale-[1.03] hover:z-20 rounded-[2px] ${rotationClass}`}
    >
      {/* Pin Icon */}
      <div className={`absolute z-10 w-6 h-9 sm:w-8 sm:h-12 ${pinClass}`}>
        <Image
          src="/icons/GallaryPin.svg"
          alt="Pin"
          fill
          className="object-contain"
        />
      </div>

      {/* Image Wrapper */}
      <div className="relative w-full aspect-[9/10] overflow-hidden bg-gray-100 border border-gray-100">
        {image ? (
          <Image
            src={image}
            alt="Gallery image"
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Caption Text */}
      <div className="absolute bottom-2 sm:bottom-3.5 lg:bottom-4 left-0 w-full text-center px-1.5 sm:px-3">
        <span className="font-playfair-display italic text-[11px] min-[390px]:text-[13px] sm:text-[15px] lg:text-[16px] text-[#3A3030] leading-tight block truncate">
          Evenings done right.
        </span>
      </div>
    </div>
  );
}

