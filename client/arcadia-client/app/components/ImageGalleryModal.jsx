"use client";

import React, { useState } from "react";

const ImageGalleryModal = ({ imageUrls }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      {imageUrls &&
        imageUrls.map((url, index) => (
          <img
            key={index}
            className="col-span-1 img-hover cursor-pointer"
            src={url}
            alt={`Gallery Image ${index + 1}`}
            onClick={() => openModal(url)}
          />
        ))}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-[650px] h-[650px] object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-300 hover:bg-slate-400 w-10 h-10 flex items-center justify-center rounded-full font-syne"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGalleryModal;
