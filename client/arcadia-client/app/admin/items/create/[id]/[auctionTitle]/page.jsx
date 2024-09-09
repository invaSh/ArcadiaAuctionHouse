"use client";
import React, { useState } from "react";
import { createItems } from "@/app/actions/itemActions";
import { addImage, addItemImages } from "@/app/actions/imageActions"; // Import addImage for thumbnail, addItemImages for gallery
import ItemForm from "@/app/components/admin/ItemForm";
import { useRouter } from "next/navigation";

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
    imageUrl: "", // Will store thumbnail URL after upload
    provenance: "",
    auctionId: params.id,
  });

  const [imageFile, setImageFile] = useState(null); // Store the thumbnail image
  const [galleryFiles, setGalleryFiles] = useState([]); // Store the gallery image files
  const [galleryImages, setGalleryImages] = useState([]); // Store image previews
  const [galleryInputs, setGalleryInputs] = useState([1]); // Track the number of gallery inputs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    { name: "imageUrl", label: "Thumbnail", type: "file", placeholder: "" },
  ];

  // Handle field changes for text inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle thumbnail file input change (This is unchanged)
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the thumbnail file
      console.log("Thumbnail file set:", file);
    }
  };

  // Handle gallery file input changes
  const handleGalleryChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      // Update galleryFiles state by adding new file
      setGalleryFiles((prev) => [...prev, file]);

      // Generate preview for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setGalleryImages((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);

      // Add a new input for the next file
      setGalleryInputs((prev) => [...prev, prev.length + 1]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const itemData = {
      ...item,
    };

    try {
      // Step 1: Create the item
      const response = await createItems(itemData);
      if (response.error) {
        setError(response.error.message);
        return;
      }

      console.log("Item created successfully, ID:", response.id);
      setSuccess("Item created successfully!");

      // Step 2: Upload the thumbnail (This is unchanged)
      if (imageFile) {
        const uploadResponse = await addImage(
          imageFile,
          response.id,
          "item-thumbnail"
        );
        if (uploadResponse.error) {
          setError(uploadResponse.error.message);
        } else {
          console.log("Thumbnail uploaded successfully");
        }
      }

      // Step 3: Upload gallery images (if available)
      if (galleryFiles.length > 0) {
        const galleryResponse = await addItemImages(galleryFiles, response.id);
        if (galleryResponse.error) {
          setError(galleryResponse.error.message);
        } else {
          console.log("Gallery images uploaded successfully");
        }
      }

      // Redirect after successful creation
      router.push(`/admin/items/details/${response.id}`);
    } catch (err) {
      console.error("Error creating item:", err);
      setError("Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <ItemForm
        title={`Add item for auction ${params.id || "Loading..."}`}
        fields={itemFields}
        values={item}
        onChange={handleChange}
        onSubmit={handleSubmit}
        galleryImages={galleryImages} // No gallery to show here
        galleryInputs={galleryInputs} // Pass gallery inputs for file uploads
        handleGalleryChange={handleGalleryChange} // Handle gallery input change
        handleThumbnailChange={handleThumbnailChange} // Handle thumbnail input change
        isEditMode={false} // Create mode
      />
    </div>
  );
}

export default CreateItem;
