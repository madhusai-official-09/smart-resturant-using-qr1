"use client";

import { Suspense } from "react";
import MenuContent from "./MenuContent";

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
