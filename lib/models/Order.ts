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
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      // 👇 include Served for old data safety
      enum: ["Preparing", "Finished", "Cancelled", "Served"],
      default: "Preparing",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
