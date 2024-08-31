"use client"
import React, { useState, useEffect } from "react";
import { getDetailedView, editAuction } from "@/app/actions/auctionActions";


function Edit({ params }) {
    const [auction, setAuction] = useState({
        id: '',
        title: '',
        auctionStart: '',
        auctionEnd: '',
        imageUrl: '',
        description: ''
    });

    useEffect(() => {
        async function fetchAuction() {
            const fetchedAuction = await getDetailedView(params.id);
            if (fetchedAuction) {
                setAuction({
                    id: fetchedAuction.id,
                    title: fetchedAuction.title,
                    auctionStart: fetchedAuction.auctionStart.slice(0, 16), 
                    auctionEnd: fetchedAuction.auctionEnd.slice(0, 16),
                    imageUrl: fetchedAuction.imageUrl,
                    description: fetchedAuction.description
                });
            }
        }
        if (params.id) {
            fetchAuction();
        }
    }, [params.id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAuction(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(event) {
        event.preventDefault();        
        await editAuction(auction).catch(console.error); 
    }

    return (
        <div className="container mx-auto px-4 py-12 font-syne">
            <form className="max-w-lg mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h2 className="block text-gray-800 text-xl font-bold mb-6">
                    Edit Auction Details
                </h2>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
                        id="title"
                        name="title"
                        type="text"
                        value={auction.title}
                        onChange={handleChange}
                        placeholder="Auction Title"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="auctionStart">
                        Auction Start Date
                    </label>
                    <input
                        className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
                        id="auctionStart"
                        name="auctionStart"
                        type="datetime-local"
                        value={auction.auctionStart}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="auctionEnd">
                        Auction End Date
                    </label>
                    <input
                        className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
                        id="auctionEnd"
                        name="auctionEnd"
                        type="datetime-local"
                        value={auction.auctionEnd}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="imageUrl">
                        Image URL
                    </label>
                    <input
                        className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        value={auction.imageUrl}
                        onChange={handleChange}
                        placeholder="http://example.com/image.jpg"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow-sm appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
                        id="description"
                        name="description"
                        value={auction.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Detailed description of the auction"
                    ></textarea>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
