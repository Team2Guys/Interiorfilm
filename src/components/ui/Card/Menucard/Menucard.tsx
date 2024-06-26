import React from 'react';
import img from "../../../../../public/images/img-11.png";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MenuData {
  image?: any; // Adjust type based on your actual data type, could be 'StaticImageData' if imported directly
  title?: string;
}

interface MenucardProps {
  menudata?: MenuData[]; // Make it optional
}

const Menucard: React.FC<MenucardProps> = ({ menudata = [] }) => {
  const router = useRouter();
  if (menudata.length === 0) {
    return (
      <p className="text-center text-xl text-white flex items-center">
        No products
      </p>
    );
  }

  const navigationHandler =()=>{
    router.push(`/detail`)
    window.dispatchEvent(new Event("cartChanged"));
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {menudata.map((array, index) => (
        <div onClick={navigationHandler } className="bg-white p-1 rounded-md shadow-xl hover:text-black" key={index}>
          <Image
            width={300}
            height={300}
            className="rounded-md bg-contain"
            src={array.image || img} // Use a default image if image is undefined
            alt="image"
          />
          <div>
            <h1 className="text-sm font-medium text-center pt-1">
              Code: <span>{array.title}</span>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menucard;
