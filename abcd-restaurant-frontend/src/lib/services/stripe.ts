import Stripe from "stripe";
import { getImageUrl } from "./cloudinary";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export interface CheckoutLineItem {
  name: string;
  price: number;
  quantity: number;
  type?: "menu-item" | "tax";
}

export async function createCheckoutSession(
  items: CheckoutLineItem[],
  metadata: Record<string, string> = {}
) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => {
      let imageUrl: string | undefined;

      if (item.type === "menu-item") {
        imageUrl = getImageUrl("menu-item", item.name);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            ...(imageUrl && { images: [imageUrl] }),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    }
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    metadata,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment?error=cancelled`,
  });

  return session;
}

export async function retrieveCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  return session;
}
