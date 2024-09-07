import { EnvironmentData } from 'data/Data';
import React from 'react';
import Image from 'next/image'; 
const EnvironmentIcons: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {EnvironmentData.map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center ">
            <Image src={item.icon} alt={item.title} width={40} height={40} className="object-contain " />
          <div className='font-light'>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default EnvironmentIcons;
