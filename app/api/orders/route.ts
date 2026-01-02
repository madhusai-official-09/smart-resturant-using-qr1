import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { table, items } = await req.json();

    if (!table || !items?.length) {
      return NextResponse.json({
        success: false,
        message: "Table or items missing",
      });
    }

    const order = {
      table,
      items,
      status: "Preparing",
      createdAt: new Date(),
    };

    console.log("NEW ORDER:", order);

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
