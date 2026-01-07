"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Timer, Trash2 } from "lucide-react";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [now, setNow] = useState(Date.now());

  /* ⏱ live clock */
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  /* fetch orders */
  const fetchOrders = async () => {
    const res = await fetch("/api/orders", { cache: "no-store" });
    const data = await res.json();
    if (data.success) setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
    const i = setInterval(fetchOrders, 4000);
    return () => clearInterval(i);
  }, []);

  /* remaining time */
  const getRemainingTime = (createdAt: string) => {
    const diff =
      10 * 60 * 1000 - (now - new Date(createdAt).getTime());
    if (diff <= 0) return "00:00";
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* cancel */
  const cancelOrder = async (id: string) => {
    await fetch(`/api/orders/${id}`, { method: "PATCH" });
    fetchOrders();
  };

  /* delete */
  const deleteOrder = async (id: string) => {
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  return (
    <div className="relative min-h-screen px-12 md:px-20 text-white bg-[#05051b]">
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      {/* HEADER */}
      <div className="pt-28">
        <h1 className="text-4xl font-bold">
          Your <span className="text-orange-400">Orders</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Live order tracking ⏱
        </p>
      </div>

      {/* ORDERS */}
      <div className="mt-12 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => {
            const statusColor =
              order.status === "Preparing"
                ? "bg-yellow-500"
                : order.status === "Cancelled"
                ? "bg-red-600"
                : "bg-green-600";

            const muted =
              order.status === "Cancelled"
                ? "opacity-60 grayscale"
                : "";

            const total = order.items.reduce(
              (s: number, i: any) =>
                s + i.price * (i.quantity || 1),
              0
            );

            return (
              <div
                key={order._id}
                className={`relative bg-white/10 border border-white/10 p-6 rounded-2xl ${muted}`}
              >
                {/* 🗑 DELETE ICON */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute top-2 right-2 text-red-400 hover:text-red-500 transition">
                      <Trash2 size={18} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Order?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the order.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Table #{order.table}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusColor}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* TIMER */}
                {order.status === "Preparing" && (
                  <div className="flex items-center gap-2 mt-3 text-orange-400">
                    <Timer size={18} />
                    {getRemainingTime(order.createdAt)}
                  </div>
                )}

                {/* ITEMS */}
                <div className="mt-4 space-y-1">
                  {order.items.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm"
                    >
                      <span>{item.name}</span>
                      <span>
                        ₹{item.price} x {item.quantity || 1}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-orange-400 text-xl font-bold mt-4">
                  ₹{total}
                </p>

                {/* CANCEL BUTTON */}
                {order.status === "Preparing" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full mt-4 bg-red-600 hover:bg-red-700"
                      >
                        Cancel Order
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Cancel Order?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will cancel the order.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            cancelOrder(order._id)
                          }
                        >
                          Yes, Cancel
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
