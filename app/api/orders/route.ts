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

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    // ⏱️ AUTO FINISH AFTER 10 MIN
    await Order.updateMany(
      {
        status: "Preparing",
        expiresAt: { $lte: now },
      },
      { status: "Finished" }
    );

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
