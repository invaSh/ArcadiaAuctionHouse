import React from "react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { getSession } from "@/app/actions/authActions";
import UserActions from "./UserActions";

async function Navbar() {
  const session = await getSession();

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between items-center h-20 text-gray-800 border-b shadow-sm transition-all duration-300 ease-in-out 
      }`}
      style={{
        backgroundColor: "#413d49b7",
        transition: "transform 1s ease, opacity 0.5s ease",
        width: "100%",
        borderColor: "transparent",
      }}
    >
      <div
        style={{ backgroundColor: "#413d49", padding: "3rem" }}
        className="absolute top-0 hidden md:block"
      >
        <span className="cursor-pointer text-6xl text-violet-50 z-50">
          <Link href={"/"}>arcadia</Link>
        </span>
      </div>
      <span className="cursor-pointer text-4xl px-5 text-violet-50">
        <Link href={"/"}>arcadia</Link>
      </span>
      <div className="flex gap-8 justify-end w-[80%]">
        <ul className="flex gap-5 text-white my-auto">
          <li className="text-hover cursor-pointer">auctions</li>
          <li className="text-hover cursor-pointer">
            <a>stories</a>
          </li>
        </ul>
        {session?.user ? <UserActions user={session.user} /> : <LoginButton />}
      </div>
      {/* <Search /> */}
    </header>
  );
}

export default Navbar;
