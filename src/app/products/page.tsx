import ProductPage from 'components/product/Product'
import React, { Suspense } from 'react'
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading'


function Products() {
  return (
<Suspense fallback ={<SkeletonLoading/>}>

    <ProductPage/>
</Suspense>
  )
}

export default Products