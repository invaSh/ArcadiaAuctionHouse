import React, { useState, useEffect } from "react";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setShow(false);
      } else { 
        setShow(true);
      }
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between items-center p-3 text-gray-800 border-b shadow-sm transition-all duration-300 ease-in-out ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{ 
        backgroundColor: "#65576dc4",
        transition: 'transform 1s ease, opacity 0.5s ease',
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        opacity: show ? 1 : 0,
        width: '100%',
      }}
    >
      <div className="flex items-center">
        <img
          src="/img/logo-symbol.png"
          alt="Logo Symbol"
          style={{ width: "auto", height: "100px" }}
        />
        <img
          src="/img/name.png"
          alt="Company Name"
          style={{ width: "auto", height: "100px" }}
        />
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}

export default Navbar;
