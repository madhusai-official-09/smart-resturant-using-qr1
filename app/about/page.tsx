"use client";

import { motion } from "framer-motion";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

export default function AboutSmartRestaurant() {
  return (
    <motion.div
      className="relative min-h-screen px-12 md:px-20 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Optional Particles */}
      {/* <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" /> */}

      {/* HEADER */}
      <motion.div
        className="pt-28"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          About{" "}
          <span className="text-orange-400">Smart Restaurant QR System</span>
        </h1>

        <p className="mt-4 text-gray-300 text-lg max-w-3xl">
          Smart Restaurant is a modern dining solution allowing customers to
          scan a QR code, view menu, place orders, and track status — all
          digitally without waiting for a waiter 🚀
        </p>
      </motion.div>

      {/* ABOUT BLOCK */}
      <motion.div
        className="mt-12 bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-orange-400">
          ✨ What is Smart Restaurant?
        </h2>

        <p className="mt-3 text-gray-300 leading-relaxed">
          Smart Restaurant is built to enhance the dining experience using QR
          technology and AI-powered automation. Customers simply scan the QR,
          browse menu items, add to cart, confirm table number, place an order,
          and track real-time progress.
        </p>
      </motion.div>

      {/* FEATURES GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} text={f.text} />
        ))}
      </motion.div>

      {/* TECHNOLOGY */}
      <motion.div
        className="mt-14 bg-white/10 border border-white/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-orange-400">
          🧠 Technologies Used
        </h2>

        <ul className="mt-4 text-gray-300 space-y-2">
          <li>• Next.js 14 App Router</li>
          <li>• TypeScript</li>
          <li>• Tailwind CSS + ShadCN UI</li>
          <li>• MongoDB + Mongoose</li>
          <li>• REST APIs</li>
          <li>• Animated Particle Backgrounds</li>
        </ul>
      </motion.div>

      {/* VISION */}
      <motion.div
        className="mt-14 mb-20 bg-white/10 border border-white/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-orange-400">
          🎯 Our Mission
        </h2>

        <p className="mt-3 text-gray-300 leading-relaxed">
          Our goal is to create a futuristic dining experience where technology
          meets comfort. Smart Restaurant saves time, improves service speed,
          reduces staff workload and offers customers a smooth digital journey.
        </p>

        <p className="mt-4 text-green-400 font-semibold">
          Smart Dining • Smart Experience • Smart Future 🍕🍔🍟
        </p>
      </motion.div>
    </motion.div>
  );
}

const features = [
  { title: "📱 QR Based Ordering", text: "Scan & order instantly without waiters." },
  { title: "🛒 Smart Cart System", text: "Add items one-by-one smoothly." },
  { title: "🍽️ Table Selection", text: "Avoid confusion. Select your table easily." },
  { title: "📦 Live Order Tracking", text: "Status: Preparing → Cooking → Completed." },
  { title: "💾 MongoDB Storage", text: "Secure cloud database storage." },
  { title: "⚡ Fast & Modern UI", text: "Smooth animations & powerful UI." },
];

function FeatureCard({ title, text }: any) {
  return (
    <motion.div
      className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
    >
      <h3 className="text-xl font-semibold text-orange-400">{title}</h3>
      <p className="text-gray-300 mt-2">{text}</p>
    </motion.div>
  );
}
