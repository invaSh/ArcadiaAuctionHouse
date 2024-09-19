import React from "react";
import { getStories } from "@/app/actions/storyActions";
import ListStoryCard from "@/app/components/blogs/ListStoryCard";

export default async function List() {
  const stories = await getStories();

  const sortedStories = stories.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

  return (
    <div style={{ marginTop: "100px" }} className="w-full">
      <div className="text-center my-8">
        <h1 className="text-5xl font-extralight font-playfair my-5">Latest Stories</h1>
        <p>The news, views, and stories behind the art</p>
      </div>
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-3">
        {sortedStories.map((story) => (
          <ListStoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
