import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCard = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 pb-10">
      {/* Page Title Skeleton */}
      <h2 className="text-center font-bold play tracking-tight text-4xl md:text-6xl text-blue-100 dark:text-sky-200 py-5">
        <Skeleton width={300} height={40} baseColor="#c7d2fe" highlightColor="#e0e7ff" />
      </h2>

      {/* Skeleton Grid */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="max-w-md rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            {/* Image Skeleton */}
            <div className="h-48 w-full">
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
        ))}
      </div>
    </div>
  );
};

export default LoadingCard;
