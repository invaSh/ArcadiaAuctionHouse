"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDetailedView, editAuction } from "@/app/actions/auctionActions";
import Form from "@/app/components/Form";

function Edit({ params }) {
  const router = useRouter();
  const auctionId = params.id;

  const [auction, setAuction] = useState({
    title: "",
    auctionStart: "",
    auctionEnd: "",
    imageUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const auctionFields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Auction Title",
    },
    {
      name: "auctionStart",
      label: "Auction Start Date",
      type: "datetime-local",
    },
    { name: "auctionEnd", label: "Auction End Date", type: "datetime-local" },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "text",
      placeholder: "http://example.com/image.jpg",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Detailed description of the auction",
    },
  ];

  useEffect(() => {
    async function fetchAuction() {
      try {
        const data = await getDetailedView(auctionId);
        if (data) {
          setAuction({
            title: data.title,
            auctionStart: new Date(data.auctionStart)
              .toISOString()
              .slice(0, 16),
            auctionEnd: new Date(data.auctionEnd).toISOString().slice(0, 16),
            imageUrl: data.imageUrl,
            description: data.description,
          });
        } else {
          setError("Failed to load auction details");
        }
      } catch (err) {
        console.error("Error fetching auction details:", err);
        setError("Failed to load auction details");
      } finally {
        setLoading(false);
      }
    }

    fetchAuction();
  }, [auctionId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuction((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const auctionData = {
      ...auction,
      id: params.id,
      auctionStart: new Date(auction.auctionStart).toISOString(),
      auctionEnd: new Date(auction.auctionEnd).toISOString(),
    };

    try {
      const response = await editAuction(auctionData);

      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("Auction updated successfully");
        setSuccess("Auction updated successfully!");
        router.replace(`/admin/auctions/details/${auctionId}`);
      }
    } catch (err) {
      console.error("Error updating auction:", err);
      setError("Failed to update auction");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-12">
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          <p className="text-center font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
          <p className="text-center font-medium">{success}</p>
        </div>
      )}
      {!loading && (
        <Form
          title="Edit Auction"
          fields={auctionFields}
          values={auction}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Edit;
