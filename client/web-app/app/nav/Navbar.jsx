import React from "react";

function Navbar() {
  console.log("---->Server component");
  return (
    <header
      className="sticky top-0 z-50 justify-between flex bg-white p-5 items-center text-gray-800 border-b-1 shadow-md"
      style={{ backgroundColor: "#3f3944" }}
    >
      <div className="flex justify-start items-center px-10">
        <img
          src="/img/logo-symbol.png"
          alt="Logo Symbol"
          style={{
            width: "auto",
            height: "100px",
          }}
        />
        <img
          src="/img/name.png"
          alt="Company Name"
          style={{
            width: "auto",
            height: "100px",
          }}
        />
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}

export default Navbar;
