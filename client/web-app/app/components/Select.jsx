import React from "react";

function Select() {
  return (
      <select
        className="block w-full p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="" disabled>
          $ 3,000
        </option>
        <option value="">$ 4,000</option>
        <option value="">$ 5,000</option>
        <option value="">$ 6,000</option>
        <option value="">$ 7,000</option>
      </select>
  );
}

export default Select;
