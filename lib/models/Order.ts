import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    table: {
      type: Number,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Preparing", "Finished", "Cancelled", "Served"], // Served kept for old data
      default: "Preparing",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

/**
 * Prevent model overwrite issue in Next.js
 */
const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
