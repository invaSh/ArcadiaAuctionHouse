import React from "react";
function AuctionButton() {
  return (
    <select id="large" class="block px-4 py-3 text-base w-60">
      <option className="custom-option" selected disabled>sort by: </option>
      <option className="custom-option" value="">Title</option>
      <option className="custom-option" value="">Artist Or Maker</option>
      <option className="custom-option" value="">Year Of Creation</option>
    </select>
  );
}

export default AuctionButton;
