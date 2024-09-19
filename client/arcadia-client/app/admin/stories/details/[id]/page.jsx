import React from "react";
import { getStory } from "@/app/actions/storyActions";
import Link from "next/link";
import DeleteButton from "@/app/components/admin/DeleteButton";

async function Details({ params }) {
  const story = await getStory(params.id);

  if (!story) {
    return <div className="text-center text-red-500">Story not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 font-syne">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-3xl leading-6 font-medium text-gray-900">
            {story.title}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Summary</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {story.summary}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Label</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {story.label}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Content</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div dangerouslySetInnerHTML={{ __html: story.content }} />
              </dd>
            </div>
            {story.imageUrl && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Image</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full sm:max-w-xs rounded-md"
                  />
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <Link
          href={`/admin/stories/edit/${params.id}`}
          className="bg-gray-800 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
        >
          Edit Story
        </Link>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <DeleteButton
          id={params.id}
          entityName="Story"
          redirectUrl="/admin/stories/list"
        />
      </div>
    </div>
  );
}

export default Details;
