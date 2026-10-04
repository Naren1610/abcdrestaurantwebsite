/**
 * Generic Image/Media Service
 * Provider-agnostic abstraction for image processing and metadata.
 */

/**
 * Returns a tiny, low-quality image placeholder (LQIP) URL for blurring.
 * Currently implemented via Cloudinary transformations, but safe to swap later.
 */
export function getImagePlaceholder(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  
  // Currently, we only know how to generate blurs for Cloudinary
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Robust injection: inserts transformation just after /upload/ and before any version string or folder
    // e_blur:1000 = high blur
    // q_1 = lowest quality (saves bytes)
    // w_30 = 30px width (tiny)
        const parts = url.split("/upload/");
    if (parts.length > 1) {
      // e_blur:1000 = high blur, q_1 = lowest quality, w_30 = 30px width
      return parts[0] + "/upload/e_blur:1000,q_1,w_30/" + parts.slice(1).join("/upload/");
    }
  }

  // If not Cloudinary or unrecognized format, return undefined (Next.js will skip blur)
  return undefined;
}
