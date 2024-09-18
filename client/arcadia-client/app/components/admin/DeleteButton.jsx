"use client";
import React, { useState } from "react";
import { deleteAuction } from "@/app/actions/auctionActions";
import { deleteItem } from "@/app/actions/itemActions";
import { deleteUser } from "@/app/actions/userActions";

function DeleteButton({id, entityName, redirectUrl}) {
  const [confirmDelete, setConfirmDelete] = useState(false); 

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (entityName === "Auction") {
        await deleteAuction(id);
      } else if (entityName === "Item") {
        await deleteItem(id);
      }else if (entityName === "User") {
        await deleteUser(id);
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(`Failed to delete ${entityName}`, error);
      alert(`There was an issue deleting the ${entityName}.`);
    }
  };

  return (
    <div>
      {!confirmDelete ? (
        <button
          onClick={handleDeleteClick}
          className="text-red-600 text-hover font-bold py-2 px-4 rounded text-center"
        >
          Delete {entityName}
        </button>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 font-bold">
            Are you sure you want to delete this {entityName}?
          </p>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Yes, I'm sure
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteButton;
