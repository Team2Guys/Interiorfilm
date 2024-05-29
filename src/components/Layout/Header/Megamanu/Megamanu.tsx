import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider'
import Menutabs from 'components/ui/Tabs/Menutabs/Menutabs'
import { menuSlide, productSlide } from 'data/Data'
import React from 'react'

const items=[
    { label:"Cement Gray Series", content:<><ProductSlider Related={menuSlide} /></>},
    { label:"Skin Texture Series", content:"Skin Texture Series"},
    { label:"Wood Grain Series ", content:<><ProductSlider Related={menuSlide} /></>},
    { label:"Fabric Series", content:<><ProductSlider Related={menuSlide} /></>},
    { label:"Marble Serie", content:<><ProductSlider Related={menuSlide} /></>},
    { label:"Plain Series", content:<><ProductSlider Related={menuSlide} /></>},
]

const Megamanu = () => {
  return (
    <>
    <Menutabs tabs={items}/>
    </>
  )
}

export default Megamanu