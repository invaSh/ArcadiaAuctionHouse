"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
function ToasterProvider() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ToasterProvider;
