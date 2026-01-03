import mongoose, { Schema, models } from "mongoose";

const CartSchema = new Schema(
  {
    table: String,
    items: Array,
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
