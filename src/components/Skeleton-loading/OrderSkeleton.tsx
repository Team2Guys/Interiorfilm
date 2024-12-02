import React from 'react'

const OrderSkeleton = () => {
    const skeletonArray = [1, 2, 3]; // Array to repeat the skeleton

    return (
      <div>
        {skeletonArray.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 my-2 gap-4 items-center border border-gray shadow rounded-md p-2 animate-pulse"
          >
            <div className="col-span-12 md:col-span-2 animate-pulse">
              <div className="rounded-lg bg-gray w-[120px] h-[120px] md:w-full md:h-full"></div>
            </div>
            <div className="col-span-12 md:col-span-10 2xl:space-y-2 animate-pulse">
              <div className="h-6 bg-gray rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-gray rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray rounded w-1/2 mb-4"></div>
              <div className="flex gap-2 items-center text-12 sm:text-base animate-pulse">
                <div className="w-4 h-4 rounded-full bg-gray"></div>
                <div className="h-4 bg-gray rounded w-1/6"></div>
                <div className="h-4 bg-gray rounded w-1/5"></div>
              </div>
              <div className="flex gap-4 flex-wrap mt-4 animate-pulse">
                <div className="h-4 bg-gray rounded w-24"></div>
                <div className="h-4 bg-gray rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default OrderSkeleton