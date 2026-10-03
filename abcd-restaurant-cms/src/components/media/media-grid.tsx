"use client";

import { useState } from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: string;
  url: string;
  name: string;
}

const initialMedia: MediaItem[] = [
  { id: "1", url: "/mock/images/home/home-gallery/gallary-01.png", name: "Gallery Image 1" },
  { id: "2", url: "/mock/images/home/home-gallery/gallary-02.png", name: "Gallery Image 2" },
  { id: "3", url: "/mock/images/home/home-gallery/gallary-03.png", name: "Gallery Image 3" },
  { id: "4", url: "/mock/images/home/home-gallery/gallary-04.png", name: "Gallery Image 4" },
];

export function MediaGrid() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);

  const handleDelete = (id: string) => {
    setMedia((prev) => prev.filter((item) => item.id !== id));
    toast.success("Image deleted.");
  };

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {media.map((item) => (
          <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted/20 border border-border/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.url} 
              alt={item.name} 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-white font-outfit text-xs truncate" title={item.name}>
                {item.name}
              </p>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
            <p className="font-outfit">No media uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
