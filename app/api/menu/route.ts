import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI NOT FOUND — check .env.local");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
};

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        message: "Menu API working 😎",
        items: [
          { id: 1, name: "Pizza", price: 199 },
          { id: 2, name: "Burger", price: 129 },
        ],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
