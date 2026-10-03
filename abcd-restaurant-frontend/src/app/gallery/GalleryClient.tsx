"use client";

import { useState } from "react";
import Image from "next/image";

type Category = "All" | "Food" | "Interior" | "Events";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
}

const mockImages: GalleryImage[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `gallary-${i + 1}`,
  src: `https://res.cloudinary.com/jvmkdwil/image/upload/abcd-restaurant/gallary/images/demo/gallary-${(i + 1).toString().padStart(2, "0")}.jpg`,
  alt: `Restaurant Interior ${i + 1}`,
  category: "Interior"
}));

const categories: Category[] = ["All", "Food", "Interior", "Events"];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredImages = mockImages.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

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

      {/* Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img) => (
          <div 
            key={img.id} 
            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 break-inside-avoid"
          >
            {/* Image */}
            <div className="relative w-full h-auto aspect-[3/4]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-brand-tagline font-outfit text-sm uppercase tracking-wider mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {img.category}
              </span>
              <h3 className="text-white font-playfair-display text-xl sm:text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {img.alt}
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

