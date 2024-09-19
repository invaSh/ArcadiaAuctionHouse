import React from "react";
import Link from "next/link";

export default function ListStoryCard({ story }) {
  return (
    <div className="bg-white overflow-hidden">
      <img src={story.imageUrl} alt="" className="w-[100%] h-64 object-cover" />
      <div className="">
        <p className="text-base font-thin text-gray-400">{story.label}</p>
        <h4 className="text-lg font-semibold underline underline-offset-4 cursor-pointer font-playfair truncate text-hover">
          <Link href={`/user/stories/details/${story.id}`}>{story.title}</Link>
        </h4>
        <p className="text-sm text-gray-700 mt-3 truncate-container">
          <span className="font-alegreya font-semibold">{story.summary}</span>
        </p>
      </div>
    </div>
  );
}
