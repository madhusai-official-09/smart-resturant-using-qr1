"use client";

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

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [now, setNow] = useState(Date.now());

  /* ⏱ update current time every second */
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    if (data.success) setOrders(data.orders);
  };

  /* ❌ Cancel Order */
  const cancelOrder = async (id: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
    });
    const data = await res.json();
    if (data.success) fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ⏱ helper */
  const getRemainingTime = (createdAt: string) => {
    const diff =
      10 * 60 * 1000 - (now - new Date(createdAt).getTime());

    if (diff <= 0) return "00:00";

    const min = Math.floor(diff / 60000);
    const sec = Math.floor((diff % 60000) / 1000);

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen px-12 md:px-20 text-white bg-[#05051b]">
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      {/* HEADER */}
      <div className="pt-28">
        <h1 className="text-4xl font-bold">
          Your <span className="text-orange-400">Orders</span>
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Live order tracking ⏱
        </p>
      </div>

      {/* ORDERS */}
      <div className="mt-12 pb-24">
        {orders.length === 0 ? (
          <p className="text-gray-400 text-lg">No orders yet 🥺</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order: any, index: number) => {
              const statusColor =
                order.status === "Preparing"
                  ? "bg-yellow-500"
                  : order.status === "Cancelled"
                  ? "bg-red-500"
                  : "bg-green-500";

              const total = order.items?.reduce(
                (sum: number, i: any) =>
                  sum + i.price * (i.quantity || 1),
                0
              );

              return (
                <div
                  key={order._id}
                  className="bg-white/10 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      Table #{order.table}
                    </h2>

                    <span
                      className={`text-sm px-4 py-1 rounded-full ${statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* ⏱ TIMER */}
                  {order.status === "Preparing" && (
                    <div className="flex items-center gap-2 mt-3 text-orange-400 font-semibold">
                      <Timer size={18} />
                      <span>{getRemainingTime(order.createdAt)} min</span>
                    </div>
                  )}

                  <p className="text-gray-300 mt-2 text-sm">
                    Order ID: {order._id}
                  </p>

                  <div className="mt-4 space-y-1">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-orange-400 font-semibold">
                          ₹{item.price} x {item.quantity || 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-orange-400 text-2xl font-bold mt-4">
                    ₹{total}
                  </p>

                  {/* ❌ CANCEL BUTTON */}
                  {order.status === "Preparing" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="mt-4 w-full"
                        >
                          Cancel Order
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-[#0b0b2a] text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Cancel this order?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            Order will be permanently cancelled.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/10">
                            No
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => cancelOrder(order._id)}
                            className="bg-red-600 hover:bg-red-700"
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
        )}
      </div>
    </div>
  );
}
