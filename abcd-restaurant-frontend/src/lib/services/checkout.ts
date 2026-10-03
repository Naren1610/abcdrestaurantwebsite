export interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  address?: string;
  apartment?: string;
  zipCode?: string;
  instructions?: string;
  mode: "delivery" | "pickup";
}

interface CheckoutResponse {
  url: string;
}

export async function createCheckout(
  items: CheckoutItem[],
  customer: CustomerDetails
): Promise<CheckoutResponse> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customer }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Payment failed" }));
    throw new Error(error.error || "Payment failed");
  }

  return res.json();
}

export interface VerifiedSession {
  paid: boolean;
  orderId: string;
  amount: number;
  itemCount: number;
  customerEmail: string | null;
  items: { name: string; quantity: number; amount: number }[];
}

export async function verifySession(
  sessionId: string
): Promise<VerifiedSession> {
  const res = await fetch(`/api/checkout/verify?session_id=${sessionId}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Verification failed" }));
    throw new Error(error.error || "Verification failed");
  }

  return res.json();
}