'use client'
import React, { useEffect, useState } from 'react'
import { Pagination} from 'antd'
import PRODUCTS_TYPES from 'types/interfaces'

import { getPaginatedproducts, getPRODUCTS} from 'utils/helperFunctions'


interface Pagintaion {
    setTotalPage: string | undefined,
    totalSize: number;
    handlerChange:Function

}

export default function Pagintaion({setTotalPage,totalSize,handlerChange}:Pagintaion) {

console.log(totalSize, "totalSize")

  return (
    <div>   <Pagination
              className="text-center rounded-full mt-10"
              defaultCurrent={1}
              total={setTotalPage ? Number(setTotalPage) : 10}
              pageSize={Number(totalSize)}
              onChange={(page, pageSize)=>{handlerChange(page)}}
            />
            </div>
  )
}
