import React, { useState, useEffect } from "react";
import Search from "./Search";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between items-center h-20 text-gray-800 border-b shadow-sm transition-all duration-300 ease-in-out ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        backgroundColor: "#413d49b7",
        transition: "transform 1s ease, opacity 0.5s ease",
        transform: show ? "translateY(0)" : "translateY(-100%)",
        opacity: show ? 1 : 0,
        width: "100%",
      }}
    >
      <div
        style={{ backgroundColor: "#413d49", padding: "3rem"}}
        className="absolute top-0 hidden md:block"
      >
        <span className="text-6xl text-violet-50 z-50">arcadia</span>
      </div>
      <span className="text-4xl px-5 text-violet-50">arcadia</span>
      <div>List</div>
      <Search />
    </header>
  );
}

export default Navbar;
