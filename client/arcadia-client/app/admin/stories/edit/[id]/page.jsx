"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStory, updateStory } from "@/app/actions/storyActions";
import Form from "@/app/components/admin/StoriesForm";

export default function EditStory({ params }) {
  const router = useRouter();
  const [story, setStory] = useState({
    title: "",
    content: "",
    summary: "",
    label: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await getStory(params.id);
        if (response.error) {
          setError(response.error.message);
        } else {
          setStory(response);
        }
      } catch (err) {
        console.error("Error fetching story:", err);
        setError("Failed to fetch story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [params.id]);

  const handleChange = (event) => {
    if (event.target) {
      const { name, type, files, value } = event.target;
      setStory((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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
      console.log("--> Updating story:", story);
      const updateResponse = await updateStory(story);
        console.log("===>", updateResponse);
      setSuccess("Story updated successfully!");
      router.replace(`/admin/stories/details/${updateResponse.id}`);

    } catch (err) {
      console.error("Error updating story:", err);
      setError("Failed to update story");
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
      {!loading && (
        <Form
          title="Edit Story"
          values={story}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
