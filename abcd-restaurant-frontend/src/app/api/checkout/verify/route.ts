import { NextRequest, NextResponse } from "next/server";
import { retrieveCheckoutSession } from "@/lib/services/stripe";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await retrieveCheckoutSession(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const items = session.line_items?.data.map((item) => ({
      name: item.description || "Item",
      quantity: item.quantity || 1,
      amount: (item.amount_total || 0) / 100,
    })) || [];

    return NextResponse.json({
      paid: true,
      orderId: session.id.slice(-8).toUpperCase(),
      amount: (session.amount_total || 0) / 100,
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      customerEmail: session.customer_details?.email || null,
      items,
    });
  } catch (err) {
    console.error("Session verify error:", err);
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 400 }
    );
  }
}