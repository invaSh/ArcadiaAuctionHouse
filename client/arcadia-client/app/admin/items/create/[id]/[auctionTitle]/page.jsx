"use client";
import React, { useState, useEffect } from "react";
import { createItems } from "@/app/actions/itemActions";
import Form from "@/app/components/Form";
import { useRouter } from "next/navigation"; // Ensure using next/navigation

function CreateItem({ params }) {
  const router = useRouter();
  
  const [item, setItem] = useState({
    title: "",
    description: "",
    dimensions: "",
    materials: "",
    conditionReport: "",
    artistOrMaker: "",
    yearOfCreation: "",
    imageUrl: "",
    provenance: "",
    auctionId: params.id,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const itemFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Item Title" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Detailed description of the item" },
    { name: "dimensions", label: "Dimensions", type: "text", placeholder: "Item dimensions (e.g., 40 mm diameter)" },
    { name: "materials", label: "Materials", type: "text", placeholder: "Materials (e.g., Stainless steel)" },
    { name: "conditionReport", label: "Condition Report", type: "text", placeholder: "Condition report (e.g., Excellent condition)" },
    { name: "artistOrMaker", label: "Artist or Maker", type: "text", placeholder: "Artist or Maker (e.g., Rolex)" },
    { name: "yearOfCreation", label: "Year of Creation", type: "number", placeholder: "Year of creation (e.g., 2022)" },
    { name: "imageUrl", label: "Image URL", type: "text", placeholder: "http://example.com/image.jpg" },
    { name: "provenance", label: "Provenance", type: "text", placeholder: "Provenance (e.g., Acquired from a private collection)" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createItems(item);
      console.log(response);
      
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("Item created successfully");
        setSuccess("Item created successfully!");
        
        router.push(`/admin/items/details/${response.id}`);
      }
    } catch (err) {
      console.error("Error creating item:", err);
      setError("Failed to create item");
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
      <Form
        title={`Add item for auction ${params.auctionTitle || "Loading..."}`}
        fields={itemFields}
        values={item}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateItem;
