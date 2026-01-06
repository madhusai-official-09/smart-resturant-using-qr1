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
import { Timer } from "lucide-react";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [now, setNow] = useState(Date.now());

  /* live clock */
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchOrders = async () => {
  const res = await fetch("/api/orders", {
    cache: "no-store",
  });
  const data = await res.json();
  if (data.success) setOrders(data.orders);
};


  useEffect(() => {
    fetchOrders();
    const i = setInterval(fetchOrders, 4000);
    return () => clearInterval(i);
  }, []);

  /* ⏱ time left */
  const getRemainingTime = (createdAt: string) => {
    const diff =
      10 * 60 * 1000 - (now - new Date(createdAt).getTime());
    if (diff <= 0) return "00:00";
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ❌ CANCEL ORDER (PATCH) */
  const cancelOrder = async (id: string) => {
  try {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) {
      console.error("Cancel failed:", res.status);
      return;
    }

    const data = await res.json();
    if (data.success) fetchOrders();
  } catch (err) {
    console.error("Cancel error", err);
  }
};


  return (
    <div className="relative min-h-screen px-12 md:px-20 text-white bg-[#05051b]">
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      <div className="pt-28">
        <h1 className="text-4xl font-bold">
          Your <span className="text-orange-400">Orders</span>
        </h1>
        <p className="text-gray-300 mt-2">
          Live order tracking ⏱
        </p>
      </div>

      <div className="mt-12 pb-24">
        {orders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => {
              const color =
                order.status === "Preparing"
                  ? "bg-yellow-500"
                  : order.status === "Cancelled"
                  ? "bg-red-500"
                  : "bg-green-500";

              const total = order.items.reduce(
                (s: number, i: any) =>
                  s + i.price * (i.quantity || 1),
                0
              );

              return (
                <div
                  key={order._id}
                  className="bg-white/10 border border-white/10 p-6 rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      Table #{order.table}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${color}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.status === "Preparing" && (
                    <div className="flex items-center gap-2 mt-3 text-orange-400">
                      <Timer size={18} />
                      {getRemainingTime(order.createdAt)}
                    </div>
                  )}

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

                  {/* ❌ CANCEL */}
                  {order.status === "Preparing" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full mt-4"
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
                            This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            No
                          </AlertDialogCancel>
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
        )}
      </div>
    </div>
  );
}
