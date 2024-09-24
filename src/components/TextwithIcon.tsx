import React, { ReactNode } from 'react'
import { IconType } from 'react-icons/lib';
interface IIconText {
  Icon?: ReactNode;
  title: string;
  subTitle: string;
  titleCSS?: string
  SubtitleCSS?: string
}

const TextwithIcon = ({ Icon, title, subTitle, titleCSS, SubtitleCSS}: IIconText) => {
  return (
   
<div className='flex items-center px-2 gap-3 py-7 w-full'>
  {Icon && Icon}
  <div className='flex flex-col w-full'>
    <h1 className={`font-semibold md:text-[20px] ${titleCSS && titleCSS}`}>{title}</h1>
    <h3 className={`${SubtitleCSS && SubtitleCSS}`}>{subTitle}</h3>
  </div>
</div>


  )
}

export default TextwithIcon