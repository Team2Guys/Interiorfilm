import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 mt-10 w-full px-4 lg:px-6 xl:px-10 animate-pulse">
      {/* Image Section */}
      <div className="w-full md:w-1/2 bg-gray rounded-lg">
        <div className="h-[400px] w-full bg-gray rounded-lg" />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        {/* Title */}
        <div className="h-8 w-2/3 bg-gray rounded-md" />

        {/* Tags */}
        <div className="flex gap-4">
          <div className="h-6 w-20 bg-gray rounded-full" />
          <div className="h-6 w-20 bg-gray rounded-full" />
          <div className="h-6 w-20 bg-gray rounded-full" />
        </div>

        {/* Price */}
        <div className="h-6 w-40 bg-gray rounded-md" />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-3/4 bg-gray rounded-md" />
          <div className="h-4 w-2/3 bg-gray rounded-md" />
          <div className="h-4 w-1/2 bg-gray rounded-md" />
          <div className="h-4 w-full bg-gray rounded-md" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <div className="h-12 w-1/2 bg-gray rounded-md" />
          <div className="h-12 w-1/2 bg-gray rounded-md" />
        </div>

        <div className="h-12 w-full bg-gray rounded-md" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
