import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

// ❌ Cancel order
export async function PATCH(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const order = await Order.findByIdAndUpdate(
    params.id,
    { status: "Cancelled" },
    { new: true }
  );

  return NextResponse.json({ success: true, order });
}

// 🗑️ Delete order
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Order.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}
