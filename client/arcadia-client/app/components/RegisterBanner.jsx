import React from "react";

function RegisterBanner() {
  return (
    <div
      className="w-[100%] text-white grid grid-cols-12 text-center"
      style={{
        backgroundImage:
          "url('https://www.ragoarts.com/files/home/media/534-TOOMEY-Jewelry-HP_534002.001-style_D_1fb8885c961afa7b4b9f453ea27a3a5db326e2e9.jpg?t=1722548164?size=1800')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "500px",
      }}
    >
      <div className="lg:col-span-6"></div>
      <div
        className="lg:col-span-6 flex flex-col justify-center items-center h-[100%]"
        style={{ backgroundColor: "#78747c" }}
      >
        <h1 className="text-4xl col">REGISTER TO BID</h1>
        <i>
          <p className="p-12 text-lg">
            Create your account to start bidding and exploring exclusive
            auctions. Join our community of art enthusiasts and collectors
            today!
          </p>
          <p>
            <u className="text-hover cursor-pointer">Register here</u>
          </p>
        </i>
      </div>
    </div>
  );
}

export default RegisterBanner;
