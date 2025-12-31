import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar/Nav";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";

const font= Inter({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Smart Restaurant Management System Using QR Code",
  description: "A Smart Restaurant Management System Using QR Code Technology to Enhance Customer Experience and Streamline Operations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased relative`}>
        
        {/* Background Image */}
        <div className="fixed inset-0 -z-10 bg-[url('/images/background.png')] bg-cover bg-center" />

        {/* Dark Overlay */}
        <div className="fixed inset-0 -z-10 bg-black/70" />

        {/* Content */}
        <div className="relative z-10">
          <ResponsiveNav />
          {children}
          <Footer/>
        </div>

      </body>
    </html>
  );
}
