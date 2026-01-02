import { NextResponse } from "next/server";

let cart: { table?: string; items: any[] } = {
  items: [],
};

export async function POST(req: Request) {
  try {
    const { table, items } = await req.json();

    if (!table || !items?.length) {
      return NextResponse.json({
        success: false,
        message: "Table or items missing",
      });
    }

    cart.table = table;
    cart.items.push(...items);

    return NextResponse.json({
      success: true,
      cart,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    cart,
  });
}

export async function DELETE() {
  cart = { items: [] };
  return NextResponse.json({ success: true });
}
