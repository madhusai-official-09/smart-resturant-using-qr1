"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-transparent backdrop-blur-md border-t border-red-600/30 text-gray-300 px-6 lg:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Logo + Description */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/80 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-red-600/40">
              <Image src="/images/logo.png" alt="Resturant Logo" width={70} height={70} />
            </div>

            <h1 className="text-xl sm:text-2xl text-white font-extrabold tracking-wide">
              SmartRestaurant
            </h1>
          </div>

          <p className="text-gray-300/80 text-sm leading-relaxed mt-3">
            Elevate your dining experience with SmartRestaurant, the ultimate
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/menu" className="hover:text-red-400 transition">Menu</Link></li>
            <li><Link href="/qr" className="hover:text-red-400 transition">QR Codes</Link></li>
            <li><Link href="/tables" className="hover:text-red-400 transition">Tables</Link></li>
            <li><Link href="/orders" className="hover:text-red-400 transition">Orders</Link></li>
            <li><Link href="/about" className="hover:text-red-400 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-red-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:madhusaipitani95@gmail.com" className="hover:text-red-400 transition">
                abcd@gmail.com
              </a>
            </li>

            <li>
              <a href="tel:+918247842565" className="hover:text-red-400 transition">
                +91 1234567890
              </a>
            </li>

            <li>Allavaram</li>
            <li>Andhra Pradesh, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-red-600/30 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
        <p>© {year} SmartRestaurant — All Rights Reserved.</p>
        <p>
          Built with <span className="text-red-400">❤️</span> using Next.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
