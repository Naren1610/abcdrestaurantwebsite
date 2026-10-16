import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, CheckoutLineItem } from "@/lib/services/stripe";
import { PRICING } from "@/constants/pricing";

export async function POST(req: NextRequest) {
  try {
    // 1. Authoritative Server-Side Gate: Verify Online Ordering is Enabled
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      const settingsRes = await fetch(`${backendUrl}/settings/`, { cache: "no-store" });
      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        if (settings.is_online_ordering_enabled === false) {
          return NextResponse.json(
            { error: "Online food ordering is currently paused. Please visit us for dine-in service." },
            { status: 403 }
          );
        }
      }
    } catch (e) {
      console.warn("Could not check settings endpoint before checkout:", e);
    }

    const { items, customer } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    let subtotal = 0;
    const checkoutItems: CheckoutLineItem[] = items.map((item: { name: string; price: number; quantity: number }) => {
      subtotal += item.price * item.quantity;
      
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        type: "menu-item" as const,
      };
    });

    // Add Tax as a line item
    const taxAmount = subtotal * PRICING.taxRate;
    if (taxAmount > 0) {
      checkoutItems.push({
        name: "Estimated Tax",
        price: Number(taxAmount.toFixed(2)),
        quantity: 1,
        type: "tax" as const,
      });
    }

    const session = await createCheckoutSession(
      checkoutItems,
      {
        customerName: customer?.fullName || "",
        customerPhone: customer?.mobileNumber || "",
        orderMode: customer?.mode || "delivery",
      }
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
