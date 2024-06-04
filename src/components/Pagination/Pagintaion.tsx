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

  return (
    <div>   <Pagination
              className="text-center rounded-full mt-10"
              defaultCurrent={1}
              defaultPageSize={6}
              total={totalSize ? Number(totalSize) : 5}
              pageSize={6}
              onChange={(page, pageSize)=>{handlerChange(page)}}
            />
            </div>
  )
}
