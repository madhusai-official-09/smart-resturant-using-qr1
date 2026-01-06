import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params;
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status === "Finished") {
      return NextResponse.json(
        {
          success: false,
          message: "Order already finished",
        },
        { status: 400 }
      );
    }

    order.status = "Cancelled";
    await order.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order cancelled successfully",
        order,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
