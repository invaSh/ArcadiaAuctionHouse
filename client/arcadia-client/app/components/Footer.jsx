import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#413d49", marginTop: "200px" }}>
      <div className="text-center py-12 mx-auto p-4">
        <span className="mt-12 text-3xl text-gray-300 font-semibold whitespace-nowrap dark:text-white">
          arcadia
        </span>
        <span className="block text-sm mt-8 text-gray-300 sm:text-center">
          © 2024{" "}
          <a href="/" className="hover:underline">
            arcadia™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
