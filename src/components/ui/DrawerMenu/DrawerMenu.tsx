"use client"
import React, { useState } from 'react'
import { Drawer } from 'antd';
import Button from '../Button/Button';

interface drawerprops {
  title:any;
  content:any;
  showDrawer?:any;
  onClose?:any;
  open?:boolean
  className?:string;
  width?:number;
  classDrawer? : string;
}

const DrawerMenu:React.FC<drawerprops> = ({title,content,className,width,classDrawer,showDrawer,onClose,open}) => {

  return (
    <>
      <div className={`${className}`} onClick={showDrawer}>
      {title}
      </div>
      <Drawer className={`${classDrawer}`}  onClose={onClose} open={open} width={width}>
        {content}
      </Drawer>
    </>
  )
}

export default DrawerMenu