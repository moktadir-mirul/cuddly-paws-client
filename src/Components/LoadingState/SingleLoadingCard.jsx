import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleLoadingCard = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 pb-10 flex items-center justify-center">
      <div className="max-w-md rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {/* Image Skeleton */}
        <div className="h-72 w-72 rounded-full">
          <Skeleton height="100%" />
        </div>

        {/* Content */}
        <div className="p-4 h-[200px] flex flex-col justify-between">
          <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
            <Skeleton width={`60%`} />
          </h3>

          <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-300">
            <Skeleton width={`50%`} height={16} />
            <Skeleton width={`70%`} height={16} />
          </div>

          <Skeleton height={40} borderRadius={8} />
        </div>
      </div>
    </div>
  );
};

export default SingleLoadingCard;

