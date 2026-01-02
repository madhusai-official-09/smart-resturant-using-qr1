import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        items: [
          { id: 1, name: "Pizza", price: 199 },
          { id: 2, name: "Burger", price: 129 },
        ],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("MENU API ERROR:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
