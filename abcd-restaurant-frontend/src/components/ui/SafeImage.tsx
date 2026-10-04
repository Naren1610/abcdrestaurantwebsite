"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { FALLBACK_MENU_IMAGE } from "@/lib/services/cloudinary";
import { getImagePlaceholder } from "@/lib/services/image-service";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string;
  fallbackSrc?: string;
}

export default function SafeImage({ 
  src, 
  fallbackSrc = FALLBACK_MENU_IMAGE, 
  alt, 
  ...props 
}: SafeImageProps) {
  const [error, setError] = useState(false);

  const activeSrc = error || !src ? fallbackSrc : src;
  
  // Automatically attempt to get a low-quality placeholder for the active source
  const blurUrl = getImagePlaceholder(activeSrc);

  return (
    <Image
      src={activeSrc}
      alt={alt}
      onError={() => setError(true)}
      {...(blurUrl ? { placeholder: "blur", blurDataURL: blurUrl } : {})}
      {...props}
    />
  );
}
