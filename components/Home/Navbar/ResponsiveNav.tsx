"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Nav openNav={() => setShowNav(true)} />
      <MobileNav
        showNav={showNav}
        closeNav={() => setShowNav(false)}
        onStart={() => console.log("QR Started")}
      />
    </>
  );
};

export default ResponsiveNav;
