import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export const dynamic = "force-dynamic";

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
      { success: true, order },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
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
      if (order.status === "Served") {
        order.status = "Finished";
        await order.save();
      }

      if (order.status === "Preparing") {
        const diff =
          (now.getTime() - order.createdAt.getTime()) / 60000;
        if (diff >= 10) {
          order.status = "Finished";
          await order.save();
        }
      }
    }

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
