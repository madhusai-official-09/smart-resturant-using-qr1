import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    table: String,
    items: [
      {
        name: String,
        price: Number,
      },
    ],
    status: {
      type: String,
      default: "Preparing",
    },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);
export default Order;
