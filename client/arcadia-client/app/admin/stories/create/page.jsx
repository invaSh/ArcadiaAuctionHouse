"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createStory } from "@/app/actions/storyActions";
import { addImage } from "@/app/actions/imageActions";
import Form from "@/app/components/admin/StoriesForm";

export default function CreateStory() {
  const router = useRouter();
  const [story, setStory] = useState({
    title: "",
    content: "",
    summary: "",
    label: "",  
    imageUrl:""  
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    if (event.target) {
      const { name, type, files, value } = event.target;
      if (type === "file") {
        if (name === "imageUrl") {
          setImageFile(files[0]); 
          console.log("Thumbnail file set:", files[0]);
        }
      } else {
        setStory((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setStory((prevState) => ({
        ...prevState,
        content: event,
      }));
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("-->story", story);
      const response = await createStory(story);
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("Story created successfully");
        setSuccess("Story created successfully!");

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

        router.replace(`/admin/stories/details/${response.id}`);
      }
    } catch (err) {
      console.error("Error creating story:", err);
      setError("Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12">
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-red-500 text-center">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <Form
        title="Create Story"
        values={story}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
