"use client"
import React from 'react'
import { Drawer } from 'antd';

interface drawerprops {
  title:any;
  content:any;
  showDrawer?:any;
  onClose?:any;
  open?:boolean
  className?:string;
  width?:number;
  classDrawer? : string;
  headtitle?:any;
  onClick?:any;
}

const DrawerMenu:React.FC<drawerprops> = ({title,content,className,width,classDrawer,showDrawer,onClose,open,headtitle,onClick}) => {

  return (
    <>
      <div className={`${className}`} onClick={showDrawer}>
      {title}
      </div>
      <Drawer title={headtitle} className={`${classDrawer}`} onClick={onClick}  onClose={onClose} open={open} width={width}>
        {content}
      </Drawer>
    </>
  )
}

export default DrawerMenu