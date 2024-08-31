import React from "react";

const Select = React.forwardRef(({ onChange, value, bid }, ref) => {
  let currentBid = bid ?? 150;
  const maxBid = 1000000;
  const options = [];

  while (currentBid <= maxBid) {
    options.push(currentBid);
    
    if (currentBid < 1000) {
      currentBid += 50;
    } else if (currentBid < 2000) {
      currentBid += 100;
    }
    else {
      currentBid += 1000;
    }
  }

  return (
    <select
      ref={ref}
      name="amount"
      className="block w-[100%] h-[100%] p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      id="amount"
      value={value}  
      onChange={onChange} 
    >
      {options.map((optionValue) => (
        <option key={optionValue} value={optionValue}>
          ${optionValue.toLocaleString()}
        </option>
      ))}
    </select>
  );
});

export default Select;
