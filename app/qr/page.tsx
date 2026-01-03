"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";

export default function QRGeneratorPage() {
  const [qrList, setQrList] = useState<{ table: number; url: string }[]>([]);

  useEffect(() => {
    const generate = async () => {
      const origin = window.location.origin;
      const result: { table: number; url: string }[] = [];

      for (let i = 1; i <= 6; i++) {
        const qr = await QRCode.toDataURL(
          `${origin}/menu?table=${i}`
        );
        result.push({ table: i, url: qr });
      }

      setQrList(result);
    };

    generate();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white px-10 pt-32"
    >
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold"
      >
        QR Codes for <span className="text-orange-400">Tables</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-gray-300"
      >
        Scan any QR to open Menu directly with table auto-selected 😎
      </motion.p>

      {/* QR GRID */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
      >
        {qrList.map((q) => (
          <motion.div
            key={q.table}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-lg cursor-pointer"
          >
            <img
              src={q.url}
              className="w-full rounded-xl"
              alt={`Table ${q.table} QR`}
            />

            <h2 className="text-center mt-3 text-xl font-bold">
              Table #{q.table}
            </h2>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
