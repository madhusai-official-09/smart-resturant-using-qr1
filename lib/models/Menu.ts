import mongoose, { Schema, models } from "mongoose";

const MenuSchema = new Schema(
  {
    name: String,
    price: Number,
    image: String,
    category: String,
  },
  { timestamps: true }
);

const Menu = models.Menu || mongoose.model("Menu", MenuSchema);
export default Menu;
