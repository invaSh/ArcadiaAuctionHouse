"use client";
import React, { useState } from 'react';
import { createAuction } from "@/app/actions/auctionActions";
import Form from '@/app/components/Form';
import { useRouter } from 'next/navigation'

function Create() {
  const router = useRouter(); 
  const [auction, setAuction] = useState({
    title: '',
    auctionStart: '',
    auctionEnd: '',
    imageUrl: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);  // State for success message

  const auctionFields = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Auction Title' },
    { name: 'auctionStart', label: 'Auction Start Date', type: 'datetime-local' },
    { name: 'auctionEnd', label: 'Auction End Date', type: 'datetime-local' },
    { name: 'imageUrl', label: 'Image URL', type: 'text', placeholder: 'http://example.com/image.jpg' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed description of the auction' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuction(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);  

    const auctionData = {
      ...auction,
      auctionStart: new Date(auction.auctionStart).toISOString(),
      auctionEnd: new Date(auction.auctionEnd).toISOString() 
    };

    try {
      const response = await createAuction(auctionData);     
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("Auction created successfully");
        setSuccess("Auction created successfully!");  
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
      />
    </div>
  );
}

export default Create;