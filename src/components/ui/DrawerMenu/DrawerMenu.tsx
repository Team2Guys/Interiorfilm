"use client"
import React, { useState } from 'react'
import { Drawer } from 'antd';
import Button from '../Button/Button';

interface drawerprops {
  title:any;
  content:any;
  className?:string;
  width?:number;
  classDrawer? : string;
}

const DrawerMenu:React.FC<drawerprops> = ({title,content,className,width,classDrawer}) => {
const [open, setOpen] = useState(false);
const showDrawer = () => {
  
  setOpen(true);
};

const onClose = () => {
  setOpen(false);
};

  return (
    <>
      <div className={`${className}`} onClick={showDrawer}>
      {title}
      </div>
      <Drawer className={`${classDrawer}`} 
        onClose={onClose} open={open} width={width}>
        {content}
      </Drawer>
    </>
  )
}

export default DrawerMenu