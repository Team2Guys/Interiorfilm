import { EnvironmentData } from 'data/Data';
import React from 'react';
import Image from 'next/image';
const EnvironmentIcons: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 ps-1">
      {EnvironmentData.map((item, i) => (
        <div key={i}  className={`flex ${
          i % 3 === 0 ? "justify-center md:justify-start md:w-fit" : i % 3 === 1 ? "justify-center" : "justify-center md:justify-end"
        }`}>
          <div className={`${
          i % 3 === 0 ? "text-center md:text-start w-full md:w-35 text-wrap md:text-nowrap" : i % 3 === 1 ? "text-center" : "text-center md:text-end text-wrap md:text-nowrap w-full md:w-45"
        }`}>

          <Image src={item.icon} alt={item.title} width={50} height={50} className="object-contain mx-auto" />
          <div className='font-light capitalize'>{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnvironmentIcons;