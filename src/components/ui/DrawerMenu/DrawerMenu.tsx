"use client"
import React, { useState } from 'react'
import { Drawer } from 'antd';
import Button from '../Button/Button';

interface drawerprops {
  title:any;
  content:any;
  className?:string;
  width?:number;
}

const DrawerMenu:React.FC<drawerprops> = ({title,content,className,width}) => {
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
      <Drawer onClose={onClose} open={open} width={width}>
        {content}
      </Drawer>
    </>
  )
}

export default DrawerMenu