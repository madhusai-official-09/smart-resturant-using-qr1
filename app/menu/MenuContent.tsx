"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const allMenuItems = [
  { category: "veg", name: "Veg Thali", price: 199, img: "/images/veg/aromatic-spices-grains-culinary-delight.jpg" },
  { category: "veg", name: "Falafel Bowl", price: 249, img: "/images/veg/delicious-falafel-bowl-vibrant-healthy-mediterranean-meal.jpg" },
  { category: "veg", name: "Veg Fried Rice", price: 179, img: "/images/veg/vegetable-fried-rice.jpg" },
  { category: "veg", name: "Fresh Veg Salad", price: 149, img: "/images/veg/vegetable-salad.jpg" },

  { category: "nonveg", name: "Chole Bhature", price: 229, img: "/images/veg/chole-bhature.jpg" },
  { category: "nonveg", name: "Spicy Chana Masala", price: 199, img: "/images/veg/spicy-chana-masala.jpg" },

  { category: "starter", name: "Mushroom Soup", price: 159, img: "/images/veg/png-bowl-cream-mushroom-soup-with-bread.jpg" },
  { category: "starter", name: "Veg Salad Bowl", price: 129, img: "/images/veg/vegetable-salad-bowl-healthy.jpg" },
];

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("veg");
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  const params = useSearchParams();
  const tableFromQR = params.get("table");

  useEffect(() => {
    if (tableFromQR) {
      localStorage.setItem("selectedTable", tableFromQR);
    }
  }, [tableFromQR]);

  const handleOrder = async (item: any) => {
    try {
      setLoadingItem(item.name);
      const table = localStorage.getItem("selectedTable");
      if (!table) return alert("No table found!");

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table,
          items: [{ name: item.name, price: item.price, quantity: 1 }],
        }),
      });

      const data = await res.json();
      data.success ? alert(`${item.name} added 😊`) : alert("Something went wrong");
    } catch {
      alert("Server error ❌");
    } finally {
      setLoadingItem(null);
    }
  };

  const placeOrder = async () => {
    const table = localStorage.getItem("selectedTable");
    if (!table) return alert("No table found!");

    try {
      setPlacing(true);
      const cartRes = await fetch("/api/cart");
      const cartData = await cartRes.json();

      if (!cartData.cart?.items?.length) return alert("Cart is empty!");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, items: cartData.cart.items }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order placed 🎉");
        await fetch("/api/cart", { method: "DELETE" });
        window.location.href = "/orders";
      }
    } catch {
      alert("Server error ❌");
    } finally {
      setPlacing(false);
    }
  };

  const filteredMenu = allMenuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-8 md:px-20 pb-40 text-white bg-[#05051b]"
    >
      {/* HEADER */}
      <div className="pt-28">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold"
        >
          Explore Our <span className="text-orange-400">Delicious Menu</span>
        </motion.h1>

        {tableFromQR && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-green-400"
          >
            📌 Ordering for <b>Table {tableFromQR}</b>
          </motion.p>
        )}
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="mt-10 flex gap-4">
        {["veg", "nonveg", "starter"].map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border ${
              activeCategory === cat
                ? "bg-orange-500 border-orange-400"
                : "border-gray-500"
            }`}
          >
            {cat.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* MENU GRID */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {filteredMenu.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white/10 rounded-2xl p-4"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={300}
              height={200}
              className="rounded-xl w-full h-44 object-cover"
            />

            <h3 className="mt-3 text-xl font-semibold">{item.name}</h3>
            <p className="text-orange-400 font-bold">₹{item.price}</p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrder(item)}
              disabled={loadingItem === item.name}
              className="mt-4 px-5 py-2 bg-orange-500 rounded-full w-full"
            >
              {loadingItem === item.name ? "Adding..." : "Add To Cart"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* CONFIRM ORDER BUTTON */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-8 left-0 right-0 flex justify-center"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={placeOrder}
          disabled={placing}
          className="px-10 py-3 bg-orange-500 rounded-full"
        >
          {placing ? "Placing Order..." : "Confirm Order"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
