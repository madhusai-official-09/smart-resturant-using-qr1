import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

// ➕ Create order
export async function POST(req: Request) {
  await connectDB();

  const { table, items } = await req.json();

  const order = await Order.create({
    table,
    items,
    status: "Preparing",
  });

  return NextResponse.json({ success: true, order });
}

// 📥 Get orders + auto finish after 10 min
export async function GET() {
  await connectDB();

  const now = new Date();

  // 🔥 Auto-finish expired orders
  await Order.updateMany(
    {
      status: "Preparing",
      expiresAt: { $lte: now },
    },
    { status: "Finished" }
  );

  const orders = await Order.find().sort({ createdAt: -1 });

  return NextResponse.json({ success: true, orders });
}
