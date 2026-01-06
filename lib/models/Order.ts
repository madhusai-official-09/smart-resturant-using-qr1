import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    table: Number,
    items: Array,
    status: {
      type: String,
      enum: ["Preparing", "Finished", "Cancelled"],
      default: "Preparing",
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

OrderSchema.pre("save", function (next) {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  }
  next();
});

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
