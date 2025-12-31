import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
