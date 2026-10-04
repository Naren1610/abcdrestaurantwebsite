"use client";

import { useState, useMemo } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { useClientGallery } from "@/hooks/use-gallery";
import GallerySkeleton from "@/components/ui/Gallery/GallerySkeleton";

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const { data: galleryData, isLoading, error } = useClientGallery();

  const categories = useMemo(() => {
    if (!galleryData) return ["All"];
    return ["All", ...galleryData.categories];
  }, [galleryData]);

  const filteredImages = useMemo(() => {
    if (!galleryData) return [];
    return galleryData.images.filter(
      (img) => activeCategory === "All" || img.category_name === activeCategory
    );
  }, [galleryData, activeCategory]);

  if (isLoading) return <GallerySkeleton />;
  if (error || !galleryData) {
    return (
      <div className="text-center py-20">
        <p className="font-outfit text-lg text-brand/60 text-red-500">Failed to load gallery images.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-24">
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-outfit text-sm sm:text-base tracking-wide transition-all duration-300 ${activeCategory === category ? "bg-brand text-white shadow-lg scale-105" : "bg-transparent text-brand border border-brand/20 hover:border-brand hover:bg-brand/5"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Standard CSS Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div 
            key={img.id} 
            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 break-inside-avoid"
          >
            {/* Image */}
            <div className="relative w-full h-auto aspect-[3/4] bg-[#E6D5B8]/20">
              <SafeImage
                src={img.image_url}
                alt={img.title || "Gallery Image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-brand-tagline font-outfit text-sm uppercase tracking-wider mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {img.category_name}
              </span>
              <h3 className="text-white font-playfair-display text-xl sm:text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {img.title || "Gallery Image"}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-20">
          <p className="font-outfit text-lg text-brand/60">No images found for this category.</p>
        </div>
      )}
    </div>
  );
}
