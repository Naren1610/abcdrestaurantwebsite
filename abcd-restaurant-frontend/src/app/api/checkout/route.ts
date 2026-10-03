import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, CheckoutLineItem } from "@/lib/services/stripe";
import { PRICING } from "@/constants/pricing";

export async function POST(req: NextRequest) {
  try {
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