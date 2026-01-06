import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export const dynamic = "force-dynamic";

/* shared cancel logic */
async function cancelOrder(id: string) {
  const order = await Order.findById(id);

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  if (order.status === "Finished") {
    return NextResponse.json(
      { success: false, message: "Order already finished" },
      { status: 400 }
    );
  }

  order.status = "Cancelled";
  await order.save();

  return NextResponse.json(
    { success: true, order },
    { status: 200 }
  );
}

/* PATCH → cancel order */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    return cancelOrder(id);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* DELETE (kept for backward compatibility) */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    return cancelOrder(id);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
