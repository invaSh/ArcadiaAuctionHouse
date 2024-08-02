"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "@/context/SearchContext";

export default function Search() {
  const [input, setInput] = useState("");
  const { setSearchData, openSearch } = useSearch();
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:6001/search/?searchTerm=${encodeURIComponent(input)}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Couldn't fetch data");

      const data = await res.json();
      console.log("--->data from the search input: ", data)
      setSearchData(data);
      openSearch();
    } catch (e) {
      console.error("Error fetching search results:", e);
    }
  };

  return (
    <>
      <div
        className="flex w-[30%] h-[100%]  items-center shadow-sm"
        style={{ backgroundColor: "#413d49e0" }}
      >
        <input
          type="text"
          className="
                flex-grow 
                pl-5 
                bg-transparent 
                focus:outline-none 
                border-transparent 
                focus:ring-0 
                text-sm 
                text-gray-100 
                font-syne
                h-full"
          placeholder="Search...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <FaSearch
            size={34}
            className="text-violet-100 rounded-full p-2 cursor-pointer mx-2"
          />
        </button>
      </div>
    </>
  );
}
