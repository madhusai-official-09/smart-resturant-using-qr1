"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const allMenuItems = [
  // ⭐ VEG
  {
    category: "veg",
    name: "Veg Thali",
    price: 199,
    img: "/images/veg/aromatic-spices-grains-culinary-delight.jpg",
  },
  {
    category: "veg",
    name: "Falafel Bowl",
    price: 249,
    img: "/images/veg/delicious-falafel-bowl-vibrant-healthy-mediterranean-meal.jpg",
  },
  {
    category: "veg",
    name: "Veg Fried Rice",
    price: 179,
    img: "/images/veg/vegetable-fried-rice.jpg",
  },
  {
    category: "veg",
    name: "Fresh Veg Salad",
    price: 149,
    img: "/images/veg/vegetable-salad.jpg",
  },

  // ⭐ NON VEG
  {
    category: "nonveg",
    name: "Chole Bhature",
    price: 229,
    img: "/images/veg/chole-bhature.jpg",
  },
  {
    category: "nonveg",
    name: "Spicy Chana Masala",
    price: 199,
    img: "/images/veg/spicy-chana-masala.jpg",
  },

  // ⭐ STARTERS
  {
    category: "starter",
    name: "Mushroom Soup",
    price: 159,
    img: "/images/veg/png-bowl-cream-mushroom-soup-with-bread.jpg",
  },
  {
    category: "starter",
    name: "Veg Salad Bowl",
    price: 129,
    img: "/images/veg/vegetable-salad-bowl-healthy.jpg",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("veg");
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  const params = useSearchParams();
  const tableFromQR = params.get("table");

  useEffect(() => {
    if (tableFromQR) {
      localStorage.setItem("selectedTable", tableFromQR);
      console.log("Table Saved:", tableFromQR);
    }
  }, [tableFromQR]);

  const handleOrder = async (item: any) => {
    try {
      setLoadingItem(item.name);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: item.name, price: item.price, quantity: 1 }],
        }),
      });

      const data = await res.json();

      if (data.success) alert(`${item.name} added 😊`);
      else alert("Something went wrong!");
    } catch {
      alert("Server error 😢");
    } finally {
      setLoadingItem(null);
    }
  };

  const placeOrder = async () => {
    const table = localStorage.getItem("selectedTable");
    if (!table) return alert("No table found! (Scan QR again)");

    try {
      setPlacing(true);

      const cartRes = await fetch("/api/cart");
      const cartData = await cartRes.json();
      if (!cartData.cart?.items?.length) return alert("Cart is empty!");

      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          table,
          items: cartData.cart.items,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Placed Successfully 🎉");

        await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clear: true }),
        });

        window.location.href = "/orders";
      } else alert("Failed to place order");
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
    <div className="relative min-h-screen px-8 md:px-20 pb-40 text-white bg-[#05051b]">
      {/* HEADER */}
      <div className="pt-28">
        <h1 className="text-4xl font-bold">
          Explore Our <span className="text-orange-400">Delicious Menu</span>
        </h1>

        <p className="mt-3 text-gray-300 text-lg">
          Fresh • Hot • Served with Love ❤️
        </p>

        {tableFromQR && (
          <p className="mt-2 text-green-400 text-lg">
            📌 Ordering for <b>Table {tableFromQR}</b>
          </p>
        )}
      </div>

      {/* ⭐ NAVBAR */}
      <div className="mt-10 flex gap-4 text-lg font-semibold">
        <button
          onClick={() => setActiveCategory("veg")}
          className={`px-6 py-2 rounded-full border ${
            activeCategory === "veg"
              ? "bg-green-500 border-green-400"
              : "border-gray-500"
          }`}
        >
          Veg Items
        </button>

        <button
          onClick={() => setActiveCategory("nonveg")}
          className={`px-6 py-2 rounded-full border ${
            activeCategory === "nonveg"
              ? "bg-red-500 border-red-400"
              : "border-gray-500"
          }`}
        >
          Non-Veg Items
        </button>

        <button
          onClick={() => setActiveCategory("starter")}
          className={`px-6 py-2 rounded-full border ${
            activeCategory === "starter"
              ? "bg-yellow-500 border-yellow-400"
              : "border-gray-500"
          }`}
        >
          Starters
        </button>
      </div>

      {/* MENU GRID */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-28">
        {filteredMenu.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/10 rounded-2xl p-4"
          >
            <Image
              src={item.img}
              width={300}
              height={200}
              alt={item.name}
              className="rounded-xl w-full h-44 object-cover"
            />

            <h3 className="mt-3 text-xl font-semibold">{item.name}</h3>

            <p className="text-orange-400 text-lg font-bold">
              ₹{item.price}
            </p>

            <button
              onClick={() => handleOrder(item)}
              disabled={loadingItem === item.name}
              className="mt-4 px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600"
            >
              {loadingItem === item.name ? "Adding..." : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* CONFIRM ORDER BUTTON */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
        <button
          onClick={placeOrder}
          disabled={placing}
          className="px-10 py-3 rounded-full text-lg font-semibold bg-orange-500 hover:bg-orange-600 transition disabled:opacity-60"
        >
          {placing ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
