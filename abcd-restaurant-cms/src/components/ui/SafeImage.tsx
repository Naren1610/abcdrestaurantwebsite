"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { getImagePlaceholder } from "@/lib/services/image-service";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "/images/placeholder.jpg";

export default function SafeImage({ 
  src, 
  fallbackSrc = DEFAULT_FALLBACK, 
  alt, 
  ...props 
}: SafeImageProps) {
  const [error, setError] = useState(false);

  const activeSrc = error || !src ? fallbackSrc : src;
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
