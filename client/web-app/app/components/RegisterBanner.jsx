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
        className="lg:col-span-6 h-[100%]"
        style={{ backgroundColor: "rgb(65, 61, 73)" }}
      >
        <h1 className="text-4xl col">REGISTER TO BID</h1>
      </div>
    </div>
  );
}

export default RegisterBanner;
