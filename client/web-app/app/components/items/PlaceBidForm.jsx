"use client"
import React, { useState } from "react";
import Input from "../Input";
import { useForm, Controller } from "react-hook-form";
import { placeBid } from "@/app/actions/bidActions";
import Select from "@/app/components/Select";
import BiddingButton from "@/app/components/auctions/Button";


function PlaceBidForm({ item, id }) {
  const { control, handleSubmit } = useForm({
    mode: "onTouched",
  });
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (data) => {
    try {
      data.itemId = id;
      const response = await placeBid(data);
      if (response.error) {
        console.error("Failed to place bid:", response.error.message);
        setShowAlert(false); 
      } else {
        console.log("Bid placed successfully:", response);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setShowAlert(false);
    }
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {showAlert && (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
          <span className="font-medium">Success!</span> Bid placed successfully.
        </div>
      )}
      <Input type="hidden" name="itemId" value={id} control={control} />
      <div className="flex mt-5">
        <div className="flex-[7]">
          <Controller
            name="amount"
            control={control}
            defaultValue={item.reservePrice ?? 150}
            render={({ field }) => (
              <Select bid={item.reservePrice} {...field} />
            )}
          />
        </div>
        <div className="flex-[3]">
          <BiddingButton text={"place bid"} />
        </div>
      </div>
      
    </form>
  );
}

export default PlaceBidForm;
