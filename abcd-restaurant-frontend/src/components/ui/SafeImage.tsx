"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { FALLBACK_MENU_IMAGE } from "@/lib/services/cloudinary";

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

  if (!src) {
    return <Image src={fallbackSrc} alt={alt} {...props} />;
  }

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}