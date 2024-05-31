'use client'
import React, { useEffect, useState } from 'react'
import { Pagination} from 'antd'
import PRODUCTS_TYPES from 'types/interfaces'

import { getPaginatedproducts, getPRODUCTS} from 'utils/helperFunctions'


interface Pagintaion {
    setTotalPage: string | undefined,

}

export default function Pagintaion({setTotalPage}:Pagintaion) {



  return (
    <div>   <Pagination
              className="text-center rounded-full mt-10"
              defaultCurrent={1}
              total={setTotalPage ? Number(setTotalPage) : 5}
              pageSize={6}
              onChange={(page, pageSize)=>{console.log(page, pageSize)}}
            /></div>
  )
}
