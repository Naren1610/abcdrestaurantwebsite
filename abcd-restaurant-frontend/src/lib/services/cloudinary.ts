const MENU_ITEM_TRANSFORM = "f_jpg,w_600";
const GALLERY_TRANSFORM = "f_auto,q_auto"; // Best practices for general images

export type ImageType = "menu-item" | "gallery";

export const FALLBACK_MENU_IMAGE = "/images/fallback-thumbnail.jpg";

interface Config {
  baseUrl: string | undefined;
  transform: string;
  formatName: (name: string) => string;
}

const getBaseUrl = () => process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

const configMap: Record<ImageType, Config> = {
  "menu-item": {
    baseUrl: getBaseUrl(),
    transform: MENU_ITEM_TRANSFORM,
    formatName: (name: string) => encodeURIComponent(name.replace(/ /g, "_").replace(/[()]/g, "")),
  },
  "gallery": {
    baseUrl: getBaseUrl(),
    transform: GALLERY_TRANSFORM,
    formatName: (name: string) => encodeURIComponent(name),
  }
};

export function getImageUrl(type: ImageType, name: string): string | undefined {
  if (!name) return undefined;

  const config = configMap[type];
  const baseUrl = getBaseUrl();
  
  if (!config || !baseUrl) return undefined;

  const formattedName = config.formatName(name);
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  
  return `${cleanBaseUrl}/${config.transform}/${formattedName}`;
}

