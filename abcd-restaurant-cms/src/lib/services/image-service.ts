/**
 * Generic Image/Media Service
 * Provider-agnostic abstraction for image processing and metadata.
 */

/**
 * Returns a tiny, low-quality image placeholder (LQIP) URL for blurring.
 */
export function getImagePlaceholder(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const parts = url.split("/upload/");
    if (parts.length > 1) {
      // e_blur:1000 = high blur, q_1 = lowest quality, w_30 = 30px width
      return parts[0] + "/upload/e_blur:1000,q_1,w_30/" + parts.slice(1).join("/upload/");
    }
  }

  return undefined;
}
