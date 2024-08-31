"use client";
import React from "react";
import { Button } from "flowbite-react";
import Input from "../Input";
import { useForm, Controller } from "react-hook-form";
import DateInput from "../DateInput";
import { createAuction } from "@/app/actions/auctionActions";
import { useRouter } from "next/navigation";

export default function AuctionForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function onSubmit(data) {
    try {
      const res = await createAuction(data);

      if (res.error) {
        throw res.error;
      }

      router.push(`/admin/auction/details/${res.id}`);
    } catch (e) {
      toast.error(error.status + " " + error.message);
    }
  }

  return (
    <>
      <form
        action=""
        className="flex flex-col mt-3 font-syne"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Title"
          name="title"
          control={control}
          type="text"
          rules={{ required: "Title is required " }}
        />

        <div className="flex gap-3">
          <DateInput
            label="Auction End Date"
            name="auctionEnd"
            control={control}
            dateFormat={"dd MMMM yyyy h:mm a"}
            showTimeSelect
            rules={{ required: "Auction end date is required " }}
          />
          <DateInput
            label="Auction Start Date"
            name="auctionStart"
            control={control}
            dateFormat={"dd MMMM yyyy h:mm a"}
            showTimeSelect
            rules={{ required: "Auction start date is required " }}
          />
        </div>
        <Input
          label="Thumbnail"
          name="imageUrl"
          control={control}
          type="text"
          rules={{ required: "Thumbnail is required" }}
        />

        <div className="flex justify-between mt-4">
          <Button
            isProcessing={isSubmitting}
            type="submit"
            disabled={!isValid}
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
