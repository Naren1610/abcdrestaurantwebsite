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

const mockImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop", alt: "Fine Dining Dish", category: "Food" },
  { id: "2", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", alt: "Restaurant Interior", category: "Interior" },
  { id: "3", src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop", alt: "Gourmet Pasta", category: "Food" },
  { id: "4", src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop", alt: "Cocktail Drinks", category: "Food" },
  { id: "5", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", alt: "Special Event Layout", category: "Events" },
  { id: "6", src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop", alt: "Elegant Seating", category: "Interior" },
  { id: "7", src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop", alt: "Steak Dish", category: "Food" },
  { id: "8", src: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=2036&auto=format&fit=crop", alt: "Private Dining Room", category: "Events" },
  { id: "9", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop", alt: "Plated Dessert", category: "Food" },
];

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
