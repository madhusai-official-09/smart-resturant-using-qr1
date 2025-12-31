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
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();

    if (data.success) setOrders(data.orders);
  };

  const deleteOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success)
        setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      console.log("delete failed");
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen px-12 md:px-20 text-white bg-[#05051b] pageFade">
      {/* <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" /> */}

      {/* HEADER */}
      <div className="pt-28 slideUp">
        <h1 className="text-4xl font-bold">
          Your <span className="text-orange-400">Orders</span>
        </h1>

        <p className="text-gray-300 mt-2 text-lg">
          Track your order status in real-time 🚀
        </p>
      </div>

      {/* ORDERS */}
      <div className="mt-12 pb-24">
        {orders.length === 0 ? (
          <p className="text-gray-400 text-lg">No active orders yet 🥺</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order: any, index: number) => {
              const statusColor =
                order.status === "Preparing"
                  ? "bg-yellow-500"
                  : order.status === "Cooking"
                  ? "bg-orange-500"
                  : "bg-green-500";

              const total = order.items?.reduce(
                (sum: number, i: any) =>
                  sum + i.price * (i.quantity || 1),
                0
              );

              return (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 0.15}s` }}
                  className="orderCard bg-white/10 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-[1.02] hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      Table #{order.table}
                    </h2>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm px-4 py-1 rounded-full ${statusColor}`}
                      >
                        {order.status}
                      </span>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-[#0b0b2a] text-white border-white/20">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Order?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-300">
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white/10 text-white border-white/10">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => deleteOrder(order._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
