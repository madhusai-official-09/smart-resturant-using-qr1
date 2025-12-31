"use client";

import Image from "next/image";
import ParticlesHero from "./ParticleBackground";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { MdFastfood } from "react-icons/md";

const Hero = () => {
  return (
    <motion.div
      className="relative h-screen flex items-center justify-between px-12 md:px-20 text-white"
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Particles */}
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      {/* LEFT */}
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 font-bold tracking-wide leading-tight">
          Smart Restaurant
          <span className="text-orange-400"> Management </span>
          Using QR Scanner
        </h1>

        {/* ⭐ TYPEWRITER EFFECT */}
        <div className="mt-6 text-gray-300 text-lg min-h-[40px]">
  <Typewriter
    options={{
      strings: [
        "Seamless ordering 🍽️",
        "Instant billing ⚡",
        "Modern dining experience 🚀",
        "Smart Restaurant Powered by QR 🔥"
      ],
      autoStart: true,
      loop: true,
      delay: 40,
      deleteSpeed: 30,
    }}
  />
</div>


        {/* BUTTON */}
        <motion.a
          href="/menu"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="inline-block mt-6 px-8 py-3 rounded-full text-lg font-semibold
          bg-orange-500 hover:bg-orange-600 transition-all duration-300
          shadow-[0_0_25px_rgba(255,140,0,0.6)]
          hover:shadow-[0_0_40px_rgba(255,140,0,0.9)]"
        >
          Order Now
          
        </motion.a>
      </motion.div>

      {/* RIGHT – QR */}
      <motion.div
        className="relative flex flex-col items-center hidden md:flex"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="absolute w-[280px] h-[280px] rounded-2xl bg-orange-500 blur-2xl animate-pulse" />

        <motion.div
          initial={{ rotate: -8, scale: 0.95 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <Image
            src="/images/qr.jpg"
            alt="qr"
            width={430}
            height={430}
            className="rounded-xl border-[8px] border-[#1a1a4d]
            shadow-[0_0_40px_#ff8c00]
            animate-float"
          />
        </motion.div>

        <motion.p
          className="mt-4 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Scan to explore 🚀
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
