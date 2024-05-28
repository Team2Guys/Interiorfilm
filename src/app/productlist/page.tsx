import Overlay from 'components/widgets/Overlay/Overlay'
import ProductData from 'components/widgets/ProductData/ProductData'
import React from 'react'
import img from "../../../public/images/img-14.png"
import img2 from "../../../public/images/img-15.png"
import { productdata } from 'data/Data'



const Productlist = () => {
  return (
    <>
      <Overlay title='Product List'/>
      <ProductData productcard={productdata}/>
    </>
  )
}

export default Productlist