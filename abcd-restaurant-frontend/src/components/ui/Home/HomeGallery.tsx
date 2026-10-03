import GalleryItem from "./GalleryItem";
import { getImageUrl } from "@/lib/services/cloudinary";

const GALLERY_DATA = [
  {
    image: getImageUrl("gallery", "gallary-01.png"),
    rotationClass: "rotate-[1.5deg] sm:rotate-[2deg]",
    pinClass: "top-[-16px] sm:top-[-22px] right-4 sm:right-8 rotate-[10deg]",
  },
  {
    image: getImageUrl("gallery", "gallary-02.png"),
    rotationClass: "-rotate-[2deg] sm:-rotate-[3deg]",
    pinClass: "top-[-15px] sm:top-[-20px] left-1/2 -translate-x-1/2 -rotate-[5deg]",
  },
  {
    image: getImageUrl("gallery", "gallary-03.png"),
    rotationClass: "rotate-[1.5deg] sm:rotate-[2deg]",
    pinClass: "top-[-17px] sm:top-[-24px] right-5 sm:right-10 rotate-[12deg]",
  },
  {
    image: getImageUrl("gallery", "gallary-04.png"),
    rotationClass: "-rotate-[1.5deg] sm:-rotate-[2deg]",
    pinClass: "top-[-15px] sm:top-[-20px] right-6 sm:right-12 -rotate-[5deg]",
  },
];

export default function HomeGallery() {
  return (
    <section className="relative w-full pt-0 pb-8 lg:pt-0 lg:pb-12 bg-background overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-4 xl:gap-6 mt-6 sm:mt-8">
          {GALLERY_DATA.map((item, index) => (
            <div key={index} className="w-full flex justify-center z-10">
              <GalleryItem
                image={item.image!}
                rotationClass={item.rotationClass}
                pinClass={item.pinClass}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}