import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

// ❌ Cancel Order
export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = context.params.id;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

// 🗑️ Delete Order
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = context.params.id;

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
