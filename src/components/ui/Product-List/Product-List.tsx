import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ProductList = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row md:items-center p-4">
      <div className="md:w-1/2">
        <Image
          src="/path/to/your/image.jpg" // Update this with the actual path to your image
          alt="Content Image"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
        
      </div>
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Lorem ipsum</h2>
        <p className="mb-4">
          Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim.
          Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim.
        </p>
        <Link href="/path/to/your/page">
          <a className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
            View All
          </a>
        </Link>
      </div>
    </div>
  );
};
