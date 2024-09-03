import React from "react";
function AuctionButton() {
  return (
    <select id="large" className="block px-4 py-3 border text-base w-60">
      <option className="custom-option" selected disabled>sort by: </option>
      <option className="custom-option" value="title">Title</option>
      <option className="custom-option" value="artistOrMaker">Artist Or Maker</option>
      <option className="custom-option" value="YearOfCreation">Year Of Creation</option>
    </select>
  );
}

export default AuctionButton;
