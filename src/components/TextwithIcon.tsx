import React, { ReactNode } from 'react'
import { IconType } from 'react-icons/lib';
interface IIconText{
    Icon:ReactNode;
    title:string;
    subTitle:string;
}
const TextwithIcon = ({Icon,title,subTitle}:IIconText) => {
  return (
    <div className='flex items-center gap-3 px-3 py-7'>
      {Icon}
      <div className='flex flex-col'>
        <h1 className='font-semibold  md:text-[20px]'>{title}</h1>
        <h3>{subTitle}</h3>
      </div>
    </div>
  )
}

export default TextwithIcon