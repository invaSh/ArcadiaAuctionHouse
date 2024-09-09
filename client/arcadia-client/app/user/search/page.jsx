"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchMethod } from "@/app/actions/searchActions";
import AuctionItemCard from "@/app/components/auctions/AuctionItemCard";
import AuctionCard from "@/app/components/auctions/AuctionCard";

function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("searchTerm");
  const [results, setResults] = useState({
    ItemCount: 0,
    AuctionCount: 0,
    Items: [],
    Auctions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setLoading(true);
        try {
          const data = await searchMethod(search);
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(results);

  return (
    <>
      <div className="p-12 mt-12" style={{ marginTop: "100px" }}>
        <h2 className="text-3xl mb-8 border-b-2 pb-5">
          Items ({results.itemCount})
        </h2>
        <div className="flex flex-wrap gap-3">
          {results.items.length > 0 ? (
            results.items.map((item, index) => (
              <AuctionItemCard index={index} item={item} />
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>

      <div className="p-12 mt-12" style={{ marginTop: "100px" }}>
        <h2 className="text-3xl mb-8 border-b-2 pb-5">
          Auctions ({results.auctionCount})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.auctions.length > 0 ? (
            results.auctions.map((auction, index) => (
              <AuctionCard auction={auction} key={index} />
            ))
          ) : (
            <p>No auctions found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
