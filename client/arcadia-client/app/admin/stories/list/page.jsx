import React from "react";
import { getPaginatedStories } from "@/app/actions/storyActions";
import Link from "next/link";
import Pagination from "@/app/components/admin/Pagination";

async function List({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const { paginagtedSts, totalPages, currentPage } = await getPaginatedStories(page);

  return (
    <div className="container mx-auto px-4 py-8 font-syne">
      <div className="px-4 my-12 text-center sm:px-6">
        <h2 className="text-3xl leading-6 font-medium text-gray-900">Stories List</h2>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 text-left px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-3 text-left px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-3 text-left px-4  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Label
                </th>
                <th className="py-3 text-right px-5 text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginagtedSts.map((story) => (
                <tr key={story.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{story.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{story.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{story.label}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/stories/details/${story.id}`} className="text-blue-500 hover:text-blue-700">
                      View More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-12">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default List;
