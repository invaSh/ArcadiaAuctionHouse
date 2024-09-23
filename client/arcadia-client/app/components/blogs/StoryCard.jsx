import React from "react";
import Link from "next/link";

function StoryCard({ story }) {
  return (
    <div className="col-span-4 gap-10">
      <img src={story.imageUrl} alt="" className="w-[100%] h-64 object-cover" />
      <p className="text-base font-thin text-gray-400">{story.label}</p>
      <h4 className="text-lg font-medium underline underline-offset-4 cursor-pointer text-hover">
        <Link href={`/user/stories/details/${story.id}`}>
        {story.title}
        </Link>
      </h4>
    </div>
  );
}

export default StoryCard;
