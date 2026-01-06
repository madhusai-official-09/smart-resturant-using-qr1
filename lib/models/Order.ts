import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    table: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      enum: ["Preparing", "Finished", "Cancelled"],
      default: "Preparing",
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ⏱️ Auto set 10 min expiry on create
OrderSchema.pre("save", function (next) {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  }
  next();
});

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
