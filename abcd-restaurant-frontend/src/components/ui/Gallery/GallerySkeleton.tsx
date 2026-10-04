import React from "react";

export default function GallerySkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-24 animate-pulse">
      {/* Category Filter Skeleton */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 rounded-full bg-[#E6D5B8]/40 border border-[#E6D5B8]/20"></div>
        ))}
      </div>

      {/* Standard CSS Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="w-full aspect-[3/4] rounded-2xl bg-[#E6D5B8]/30"
            
          ></div>
        ))}
      </div>
    </div>
  );
}
