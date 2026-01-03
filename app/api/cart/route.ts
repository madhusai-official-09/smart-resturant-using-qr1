import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/lib/models/Cart";

// ADD TO CART
export async function POST(req: Request) {
  try {
    await connectDB();
    const { items } = await req.json();

    let cart = await Cart.findOne();

    // If no cart → create new
    if (!cart) {
      cart = await Cart.create({ items });
    } 
    else {
      // If cart exists → update
      items.forEach((newItem: any) => {
        const existing = cart.items.find(
          (i: any) => i.name === newItem.name
        );

        if (existing) {
          existing.quantity += 1;
        } else {
          cart.items.push(newItem);
        }
      });

      await cart.save();
    }

    return NextResponse.json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

// GET CART
export async function GET() {
  await connectDB();
  const cart = await Cart.findOne();
  return NextResponse.json({ success: true, cart: cart || { items: [] } });
}

// DELETE (Remove item OR Clear cart)
export async function DELETE(req: Request) {
  await connectDB();
  const { itemName, clear } = await req.json();

  // CLEAR CART
  if (clear) {
    await Cart.deleteMany();
    return NextResponse.json({
      success: true,
      message: "Cart cleared",
    });
  }

  // REMOVE SINGLE ITEM
  const cart = await Cart.findOne();
  if (!cart) {
    return NextResponse.json({ success: false, message: "Cart not found" });
  }

  cart.items = cart.items.filter((item: any) => item.name !== itemName);
  await cart.save();

  return NextResponse.json({
    success: true,
    message: "Item removed",
    cart,
  });
}
