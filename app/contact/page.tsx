"use client";

import { ContactIcon } from "lucide-react";
import {
  BiEnvelope,
  BiLogoLinkedin,
  BiMap,
  BiPhone,
} from "react-icons/bi";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <motion.div
      className="pt-28 pb-28"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* HEADER */}
      <motion.div
        className="text-center text-3xl md:text-5xl xl:text-6xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100">
          Get In <span className="text-orange-400">Touch</span>
        </h1>
        <p className="text-gray-400 mt-4 text-base sm:text-lg">
          We'd love to hear from you 🚀
        </p>
      </motion.div>

      {/* Content */}
      <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-14">
        
        {/* LEFT INFO CARD */}
        <motion.div
          className="w-full max-w-3xl bg-black/40 border border-orange-500/40 rounded-2xl p-8 shadow-xl backdrop-blur-md"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-orange-400 text-xl">
              <ContactIcon />
            </span>
            <h2 className="text-lg font-semibold text-white">Contact Info</h2>
          </div>

          <ContactItem icon={<BiPhone />} title="Phone" value="+91 8247842565" />
          <ContactItem
            icon={<BiEnvelope />}
            title="Email"
            value="madhusaipitani95@gmail.com"
          />
          <ContactItem
            icon={<BiLogoLinkedin />}
            title="LinkedIn"
            value="linkedin.com/in/pitanimadhusayi"
          />
          <ContactItem
            icon={<BiMap />}
            title="Address"
            value="Allavaram, Andhra Pradesh, India"
          />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          className="md:p-10 p-5 bg-black/40 border border-orange-500/40 rounded-2xl shadow-xl backdrop-blur-md"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            className="px-4 py-3.5 bg-[#0a0a24] text-white rounded-md w-full outline-none placeholder:text-white/60 mb-6"
          />

          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email Address"
            className="px-4 py-3.5 bg-[#0a0a24] text-white rounded-md w-full outline-none placeholder:text-white/60 mb-6"
          />

          <textarea
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            placeholder="Your Message"
            className="px-4 py-3.5 bg-[#0a0a24] text-white rounded-md w-full h-[13rem] outline-none placeholder:text-white/60"
          />

          <button
            disabled={sending}
            className="mt-8 px-12 py-4 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-full shadow-[0_0_25px_rgba(255,140,0,0.7)] hover:shadow-[0_0_40px_rgba(255,140,0,1)]"
          >
            Send Message
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ContactItem = ({ icon, title, value }: any) => (
  <div className="flex items-center gap-4 mb-6">
    <span className="text-orange-400 text-3xl">{icon}</span>
    <div>
      <p className="text-gray-200 font-semibold text-lg">{title}</p>
      <p className="text-gray-400 text-sm">{value}</p>
    </div>
  </div>
);

export default ContactPage;
