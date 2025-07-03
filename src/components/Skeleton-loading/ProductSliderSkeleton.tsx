import React from 'react'

const ProductSliderSkeleton = () => {
   return (
      <div className="flex gap-6 px-4 lg:px-6 xl:px-10 mt-10 w-full max-md:overflow-x-scroll">
         {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse max-sm:flex-shrink-0 flex flex-col gap-4 w-full md:w-[45%] lg:w-4/12 bg-gray rounded-lg overflow-hidden ">
               <div className="bg-gray h-48 md:h-[250px] lg:h-[350px] w-full"></div>
            </div>
         ))}
      </div>
   )
}

export default ProductSliderSkeleton