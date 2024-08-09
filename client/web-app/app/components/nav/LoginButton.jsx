"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { VscSignIn } from "react-icons/vsc";
export default function LoginButton() {
  return (
    <button
      className="text-violet-100 border-transparent text-lg py-2 px-4 font-syne login-hover flex items-center gap-2 text-hover" 
      onClick={() => signIn("id-server", { callbackUrl: "/"})}
      style={{
        transition: ".2s"
      }}
    >
      Login<VscSignIn className="text-2xl" />
    </button>
  );
}
