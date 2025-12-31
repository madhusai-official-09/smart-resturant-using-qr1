"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRGeneratorPage() {
  const [qrList, setQrList] = useState<{ table: number; url: string }[]>([]);

  useEffect(() => {
    const generate = async () => {
      let result: any[] = [];

      for (let i = 1; i <= 6; i++) {
        const qr = await QRCode.toDataURL(
          `http://localhost:3000/menu?table=${i}`
        );

        result.push({ table: i, url: qr });
      }

      setQrList(result);
    };

    generate();
  }, []);

  return (
    <div className="min-h-screen text-white px-10 pt-32">
      <h1 className="text-4xl font-bold">
        QR Codes for <span className="text-orange-400">Tables</span>
      </h1>

      <p className="mt-3 text-gray-300">
        Scan any QR to open Menu directly with table auto-selected 😎
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {qrList.map((q) => (
          <div
            key={q.table}
            className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-lg"
          >
            <img src={q.url} className="w-full rounded-xl" />

            <h2 className="text-center mt-3 text-xl font-bold">
              Table #{q.table}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
