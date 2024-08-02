import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Browse(props) {
  return (
    <div className="col-span-12 lg:col-span-6 bg-black text-white p-10 text-hover cursor-pointer">
      <h4 className="font-syne text-xl p-3">{props.subtitle}</h4>
      <h1 className="text-3xl p-3 font-extralight">
        {props.title} <FaArrowRight className="inline" />
      </h1>
    </div>
  );
}

export default Browse;
