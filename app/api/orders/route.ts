import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { table, items } = await req.json();

    const order = await Order.create({
      table,
      items,
      status: "Preparing",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });
    const now = new Date();

    for (const order of orders) {
      // 🔁 normalize old data
      if (order.status === "Served") {
        order.status = "Finished";
        await order.save();
        continue;
      }

      // ⏱ auto finish after 10 minutes
      if (order.status === "Preparing") {
        const diffMinutes =
          (now.getTime() - order.createdAt.getTime()) / 60000;

        if (diffMinutes >= 10) {
          order.status = "Finished";
          await order.save();
        }
      }
    }

    return NextResponse.json(
      { success: true, orders },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
