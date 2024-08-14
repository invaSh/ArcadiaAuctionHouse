import React from "react";
import Link from "next/link";

export default function WinnerCard({item}) {
  
  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          item.imageUrl && "h-full"
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        <Link
          href={`/user/items/details/${item.id}`}
          aria-label={`Link to ${item.title}`}
        >
          <img
            alt={item.title}
            src={item.imageUrl}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Link>
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            <Link
              href={`/user/items/details/${item.id}`}
              aria-label={`Link to ${item.title}`}
            >
              {item.title}
            </Link>
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400 truncate">
            {item.description}
          </p>
          <Link
              href={`/user/items/details/${item.id}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${item.title}`}
            >
              View details &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}
