"use client";
import React, { useState, useEffect } from "react";
import { getDetailedView, editItems } from "@/app/actions/itemActions"; // Import both functions
import Form from "@/app/components/admin/ItemForm";
import { useRouter } from "next/navigation";

function EditItem({ params }) {
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
    auctionId: "",
  });

  const [galleryImages, setGalleryImages] = useState([]); // Store the gallery images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch item details on component mount
  useEffect(() => {
    async function fetchItem() {
      try {
        const fetchedItem = await getDetailedView(params.id);
        setItem(fetchedItem); // Prefill the form with existing item data
        if (fetchedItem.gallery && fetchedItem.gallery.length > 0) {
          setGalleryImages(fetchedItem.gallery); // Set gallery images if available
        }
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError("Failed to fetch item details.");
      }
    }

    fetchItem();
  }, [params.id]);

  const itemFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Item Title" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Detailed description of the item",
    },
    {
      name: "dimensions",
      label: "Dimensions",
      type: "text",
      placeholder: "Item dimensions (e.g., 40 mm diameter)",
    },
    {
      name: "materials",
      label: "Materials",
      type: "text",
      placeholder: "Materials (e.g., Stainless steel)",
    },
    {
      name: "conditionReport",
      label: "Condition Report",
      type: "text",
      placeholder: "Condition report (e.g., Excellent condition)",
    },
    {
      name: "artistOrMaker",
      label: "Artist or Maker",
      type: "text",
      placeholder: "Artist or Maker (e.g., Rolex)",
    },
    {
      name: "yearOfCreation",
      label: "Year of Creation",
      type: "number",
      placeholder: "Year of creation (e.g., 2022)",
    },
    {
      name: "provenance",
      label: "Provenance",
      type: "text",
      placeholder: "Provenance (e.g., Acquired from a private collection)",
    },
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
      const response = await editItems(item);
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("Item updated successfully");
        setSuccess("Item updated successfully!");
        // Use replace to navigate to the details page and refresh the data
        router.replace(`/admin/items/details/${params.id}`);
      }
    } catch (err) {
      console.error("Error updating item:", err);
      setError("Failed to update item");
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
        title={`Edit Item: ${item.title}`}
        fields={itemFields}
        values={item}
        onChange={handleChange}
        onSubmit={handleSubmit}
        galleryImages={galleryImages}
        isEditMode={true}
      />
    </div>
  );
}

export default EditItem;
