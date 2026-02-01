// components/MealCardSkeleton.jsx
import React from 'react';

const MealCardSkeleton = () => {
  return (
    <div
      className="
        card bg-gray-500 shadow-sm overflow-hidden
        group transition-all duration-300
        dark:bg-gray-800 dark:text-white
        animate-pulse
      "
      data-aos="zoom-in"
    >
      {/* Image Skeleton */}
      <figure className="overflow-hidden">
        <div className="w-full h-72 bg-gray-400 dark:bg-gray-700 rounded-t-lg" />
      </figure>

      {/* Content Skeleton */}
      <div className="p-4 space-y-5">
        {/* Name + Price Row */}
        <div className="flex justify-between items-center">
          <div className="h-7 w-3/5 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Chef Name */}
        <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Chef ID */}
        <div className="h-5 w-3/5 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Delivery Area */}
        <div className="h-5 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Button Skeleton */}
        <div className="card-actions justify-end">
          <div className="btn btn-primary w-full h-12 rounded-lg bg-gray-200 dark:bg-gray-700 border-none shadow-none" />
        </div>
      </div>
    </div>
  );
};

export default MealCardSkeleton;