import { CustomerDetails } from "./checkout";

const STORAGE_KEY = "abcd_customer_details";

export const customerStore = {
  get: (): CustomerDetails | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore parsing errors
    }
    return null;
  },

  set: (details: CustomerDetails): void => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    } catch {
      // ignore storage errors
    }
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(STORAGE_KEY);
  },
};