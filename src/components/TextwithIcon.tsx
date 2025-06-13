import React, { ReactNode } from 'react'
interface IIconText {
  Icon?: ReactNode;
  title: string;
  subTitle: string;
  titleCSS?: string
  SubtitleCSS?: string
}

const TextwithIcon = ({ Icon, title, subTitle, titleCSS, SubtitleCSS}: IIconText) => {
  return (
   
<div className='flex flex-col justify-start sm:flex-row sm:items-center px-2 gap-3 py-4 w-full'>
  {Icon && Icon}
  <div className='flex flex-col w-full'>
    <h3 className={`sm:font-semibold font-medium text-13 md:text-[20px] ${titleCSS && titleCSS}`}>{title}</h3>
    <p className={`text-11 sm:text-base ${SubtitleCSS && SubtitleCSS}`} dangerouslySetInnerHTML={{ __html: subTitle}}></p>
  </div>
</div>


  )
}

export default TextwithIcon