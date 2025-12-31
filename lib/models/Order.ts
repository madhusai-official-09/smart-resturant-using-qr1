import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    table: {
      type: Number,
      required: true,
    },
    items: [
      {
        name: String,
        price: Number,
      },
    ],
    status: {
      type: String,
      default: "Preparing", // Preparing → Cooking → Served
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
