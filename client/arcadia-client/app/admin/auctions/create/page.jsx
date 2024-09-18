"use client";
import React, { useState } from "react";
import { createAuction } from "@/app/actions/auctionActions";
import { addImage } from "@/app/actions/imageActions";
import Form from "@/app/components/Form";
import { useRouter } from "next/navigation";

function Create() {
  const router = useRouter();
  const [auction, setAuction] = useState({
    title: "",
    auctionStart: "",
    auctionEnd: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
    { name: "imageUrl", label: "Thumbnail", type: "file", placeholder: "" },
    { name: "bannerUrl", label: "Banner", type: "file", placeholder: "" },
    
    {
      name: "shortDesc",
      label: "Short Description",
      type: "textarea",
      placeholder: "Short description of the auction",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Detailed description of the auction",
    },
  ];

  const handleChange = (event) => {
    const { name, type, files, value } = event.target;
    if (type === "file") {
      if (name === "imageUrl") {
        setImageFile(files[0]);
        console.log("Thumbnail file set:", files[0]);
      } else if (name === "bannerUrl") {
        setBannerFile(files[0]);
        console.log("Banner file set:", files[0]);
      }
    } else {
      setAuction((prev) => ({ ...prev, [name]: value }));
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const auctionData = {
      ...auction,
      auctionStart: new Date(auction.auctionStart).toISOString(),
      auctionEnd: new Date(auction.auctionEnd).toISOString(),
    };

    console.log("Submitting auction data:", auctionData);

    try {
      const response = await createAuction(auctionData);
      if (response.error) {
        console.error("Error received from createAuction:", response.error);
        setError(response.error.message);
      } else {
        console.log("Auction created successfully, ID:", response.id);
        setSuccess("Auction created successfully!");

        if (imageFile) {
          const uploadResponse = await addImage(
            imageFile,
            response.id,
            "thumbnail"
          );
          if (uploadResponse.error) {
            console.error("Image upload failed:", uploadResponse.error);
            setError(uploadResponse.error.message);
          } else {
            console.log("Image uploaded successfully");
          }
        } 
        
        if (bannerFile) {
          const bannerUploadResponse = await addImage(
            bannerFile,
            response.id,
            "banner"
          );
          if (bannerUploadResponse.error) {
            console.error("Banner upload failed:", bannerUploadResponse.error);
            setError(bannerUploadResponse.error.message);
          } else {
            console.log("Banner uploaded successfully");
          }
        }

        router.push(`/admin/auctions/details/${response.id}`);
      }
    } catch (err) {
      console.error("Error creating auction:", err);
      setError("Failed to create auction");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-12">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <Form
        title="Create Auction"
        fields={auctionFields}
        values={auction}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditMode={false}
        imageUrl={"noimg"}
        bannerUrl={"noimg"}
      />
    </div>
  );
}

export default Create;
