"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Register() {
    const router = useRouter();

    const handleRegister = () => {
      router.push("http://localhost:5000/Account/Register");
    };

  return (
    <button
    className="px-10 py-5 text-xl text-white hover:bg-zinc-600" style={{ backgroundColor: "rgb(65, 61, 73)" }}
    onClick={handleRegister}
  >
    register to bid
  </button>
  );
}
