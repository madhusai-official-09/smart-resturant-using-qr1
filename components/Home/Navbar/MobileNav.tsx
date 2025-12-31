"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { MdFastfood } from "react-icons/md";

const navLinks = [
  { id: 1, label: "Home", url: "/" },
              { id: 2, label: "Menu", url: "/menu" },
              { id: 3, label: "QR Codes", url: "/qr" },
              { id: 4, label: "Tables", url: "/tables" },
              { id: 5, label: "Orders", url: "/orders" },
              { id: 6, label: "About", url: "/about" },
              { id: 7, label: "Contact", url: "/contact" },
];

type Props = {
  showNav: boolean;
  closeNav: () => void;
  onStart?: () => void;
};

const NavItem: React.FC<{
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, href, active = false, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative block w-full px-4 py-3 rounded-xl text-[16px] font-medium
        transition-all duration-300 ease-out
        ${
          active
            ? "bg-[#2b1304] text-white border border-orange-400/40"
            : "text-gray-300"
        }
        hover:bg-gradient-to-r hover:from-[#ffb76b33] hover:via-[#ff8c0033] hover:to-[#ff5e0033]
        hover:shadow-[0_0_18px_#ff8c0033] hover:scale-[1.02]
      `}
    >
      <span className="select-none">{label}</span>

      {active && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full" />
      )}
    </Link>
  );
};

const MobileNav: React.FC<Props> = ({ closeNav, showNav, onStart }) => {
  const pathname = usePathname();
  if (!showNav) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeNav} />

      <div className="relative z-10 w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-r from-orange-500/40 via-transparent to-orange-400/20 shadow-2xl">
        <div className="rounded-2xl bg-black/70 backdrop-blur-lg border border-white/6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/images/logo.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white font-bold text-lg">SmartRestaurant</h3>
            </div>

            <button onClick={closeNav} className="p-2 rounded-md text-slate-300 hover:text-red-600">
              <CgClose size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="space-y-3 mt-1">
            {navLinks.map(link => {
              const active = pathname === link.url || pathname.startsWith(link.url);
              return (
                <NavItem
                  key={link.id}
                  label={link.label}
                  href={link.url}
                  active={active}
                  onClick={closeNav}
                />
              );
            })}
          </nav>

          <div className="h-px bg-white/10 my-6" />

          {/* ORDER NOW BUTTON */}
          <Button
            onClick={() => {
              onStart?.();
              closeNav();
            }}
            className="w-full rounded-xl py-3 text-white bg-orange-500 hover:bg-orange-600
            shadow-[0_0_25px_rgba(255,140,0,0.6)]
            hover:shadow-[0_0_40px_rgba(255,140,0,0.9)]
            flex items-center justify-center gap-2 text-[16px]"
          >
            <MdFastfood size={20} />
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
