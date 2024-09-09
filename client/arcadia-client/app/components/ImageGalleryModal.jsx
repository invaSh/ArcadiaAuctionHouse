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
              className="max-w-full max-h-full"
            />
            <button
              className="absolute top-2 right-2 text-white bg-black p-2 rounded-full"
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
