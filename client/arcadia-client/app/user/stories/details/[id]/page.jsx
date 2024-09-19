import { getStory } from "@/app/actions/storyActions";
import React from "react";

async function Details({ params }) {
  const story = await getStory(params.id);
  const defaultImage =
    "https://via.placeholder.com/1200x400?text=No+Image+Available";

  return (
    <div className="container mx-auto pt-12 pb-8 px-4 md:px-0 font-playfairdis">
      <div
        className="h-96 bg-cover bg-center mb-8 rounded-md shadow-lg"
        style={{
          backgroundImage: `url(${story.imageUrl || defaultImage})`,
        }}
      ></div>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-semibold font-playfair leading-tight">
          {story.title}
        </h1>
        <p className="text-xl text-gray-600 font-semibold mt-4">
          {story.summary}
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <span className="text-sm px-4 py-2 bg-gray-200 rounded-full">
            {story.label}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {new Date(story.publishedDate).toLocaleDateString()} |{" "}
          <span className="font-semibold text-gray-600">By {story.author}</span>
        </p>
      </div>

      <div className="prose prose-lg prose-gray mx-auto max-w-4xl">
        <div dangerouslySetInnerHTML={{ __html: story.content }} />
      </div>
    </div>
  );
}

export default Details;
