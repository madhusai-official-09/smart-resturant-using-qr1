import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
