import React from "react";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Label } from "flowbite-react";

const DateInput = (props) => {
  return (
    <div className="mb-3 block">
      <Label htmlFor={props.name} className="text-lg mr-5">
        {props.label}
      </Label>

      <Controller
        name={props.name}
        control={props.control}
        defaultValue={null}
        rules={props.rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <DatePicker
              {...field}
              id={props.name}
              selected={field.value}
              onChange={(value) => field.onChange(value)}
              className={`rounded-lg w-full flex flex-col ${
                error
                  ? "bg-red-50 border-red-500 text-red-900"
                  : !error && field.value
                  ? "bg-green-50 border-green-500 text-green-900"
                  : ""
              }`}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default DateInput;
