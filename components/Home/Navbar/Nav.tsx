"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { MdFastfood } from "react-icons/md";
import { label } from "framer-motion/client";

const Nav = ({ openNav }: { openNav: () => void }) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => setNavBg(window.scrollY >= 90);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        navBg ? "bg-[#1b0b03]/90 shadow-md" : "bg-transparent"
      } smooth-nav`}
      style={{ height: "12vh" }}
    >
      <div className="flex items-center h-full justify-between w-[90%] mx-auto">

        {/* Logo */}
        <div className="flex items-center space-x-2 fade-in-up">
          <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          </div>
          <h1 className="text-xl hidden sm:block md:text-1xl text-white font-bold">
            SmartRestaurant
          </h1>
        </div>

        {/* Middle Links */}
        <nav className="hidden lg:flex items-center space-x-10 fade-in">
          {[
            { id: 1, label: "Home", url: "/" },
            { id: 2, label: "Menu", url: "/menu" },
            { id: 3, label: "QR Codes", url: "/qr" },
            { id: 4, label: "Tables", url: "/tables" },
            { id: 5, label: "Orders", url: "/orders" },
            { id: 6, label: "About", url: "/about" },
            { id: 7, label: "Contact", url: "/contact" },
          ].map((L) => (
            <Link
              key={L.id}
              href={L.url}
              className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-orange-400 transition-all duration-200"
            >
              {L.label}
              <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-orange-400 rounded-full transition-all duration-200 transform -translate-x-1/2 group-hover:w-8" />
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center space-x-4 fade-in-up">
          <Link href="/menu">
            <Button className="flex items-center gap-2 px-6 py-2.5 rounded-lg 
              bg-orange-500 hover:bg-orange-600 
              shadow-[0_0_20px_rgba(255,140,0,0.6)]
              hover:shadow-[0_0_30px_rgba(255,140,0,0.9)]
              transition-all text-white">
              <MdFastfood size={18} />
              Order Now
            </Button>
          </Link>

          {/* Mobile */}
          <button
            onClick={openNav}
            className="w-9 h-9 rounded-md flex lg:hidden text-white"
          >
            <HiBars3BottomRight size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
