"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/user/search?searchTerm=${searchTerm}`);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div
      className="flex w-[30%] h-[100%] items-center shadow-sm"
      style={{ backgroundColor: "#413d49e0" }}
    >
      <input
        onKeyDown={handleKeyDown}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:ring-0 text-sm text-gray-100 font-syne h-full"
        placeholder="Search...."
      />
      <button onClick={handleSearch}>
        <FaSearch
          size={34}
          className="text-violet-100 rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
}
