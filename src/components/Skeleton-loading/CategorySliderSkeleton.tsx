import React from 'react'

const CategorySliderSkeleton = () => {
   return (
      <div className="flex gap-6 px-4 lg:px-6 xl:px-10 mt-10 w-full max-md:overflow-x-scroll">
         {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse max-sm:flex-shrink-0 flex flex-col gap-4 w-full md:w-[45%] lg:w-4/12 bg-gray rounded-lg overflow-hidden">
               <div className="bg-gray h-48 md:h-[300px] xl:h-[460px] w-full"></div>
               <div className="flex flex-col gap-2 px-4 pb-4">
                  <div className="bg-gray h-6 w-3/4 rounded-md"></div>
                  <div className="bg-gray h-6 w-1/2 rounded-md"></div>
                  <div className="bg-gray h-10 w-1/3 rounded-md"></div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default CategorySliderSkeleton