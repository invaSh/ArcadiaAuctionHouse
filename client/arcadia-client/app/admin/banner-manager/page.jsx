"use client";

import React, { useState, useEffect } from "react";
import { getAllAuctions } from "@/app/actions/auctionActions";
import { updateBanner } from "@/app/actions/auctionActions"; // Assuming this is where updateBanner is defined

function BannerManager() {
  const [auctions, setAuctions] = useState([]);
  const [banner1AuctionId, setBanner1AuctionId] = useState("");
  const [banner2AuctionId, setBanner2AuctionId] = useState("");
  const [banner3AuctionId, setBanner3AuctionId] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState("");     // State for error message
  const [isLoading, setIsLoading] = useState(false);        // State for loading indicator

  useEffect(() => {
    async function fetchAuctions() {
      const result = await getAllAuctions();
      setAuctions(result.auctions);
    }

    fetchAuctions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (banner1AuctionId) {
        await updateBanner(1, banner1AuctionId);
      }

      if (banner2AuctionId) {
        await updateBanner(2, banner2AuctionId);
      }

      if (banner3AuctionId) {
        await updateBanner(3, banner3AuctionId);
      }

      setSuccessMessage("Banners updated successfully!");
      setBanner1AuctionId("");
      setBanner2AuctionId("");
      setBanner3AuctionId("");
    } catch (error) {
      console.error("Error updating banners:", error);
      setErrorMessage("Failed to update banners. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-12 mt-12 bg-white rounded-lg shadow-lg">
      <h3 className="text-center text-4xl font-semibold mb-10 text-gray-800">Banner Manager</h3>

      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-gray-700">Select Auction for Banner 1</label>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            value={banner1AuctionId}
            onChange={(e) => setBanner1AuctionId(e.target.value)}
            disabled={isLoading} // Disable during loading
          >
            <option value="">Select Auction</option>
            {auctions.map((auction) => (
              <option key={auction.id} value={auction.id}>
                {auction.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-gray-700">Select Auction for Banner 2</label>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            value={banner2AuctionId}
            onChange={(e) => setBanner2AuctionId(e.target.value)}
            disabled={isLoading} // Disable during loading
          >
            <option value="">Select Auction</option>
            {auctions.map((auction) => (
              <option key={auction.id} value={auction.id}>
                {auction.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-gray-700">Select Auction for Banner 3</label>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            value={banner3AuctionId}
            onChange={(e) => setBanner3AuctionId(e.target.value)}
            disabled={isLoading} // Disable during loading
          >
            <option value="">Select Auction</option>
            {auctions.map((auction) => (
              <option key={auction.id} value={auction.id}>
                {auction.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className={`bg-black hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading} // Disable during loading
          >
            {isLoading ? "Saving..." : "Save Banner Assignments"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BannerManager;
