import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider'
import Menutabs from 'components/ui/Tabs/Menutabs/Menutabs'
import React from 'react'

const items=[
    { label:"Cement Gray Series",  content:<><ProductSlider /></>},
    { label:"Skin Texture Series", content:"Skin Texture Series"},
    { label:"Wood Grain Series ", content:<><ProductSlider /></>},
    { label:"Fabric Series", content:<><ProductSlider/></>},
    { label:"Marble Serie", content:<><ProductSlider /></>},
    { label:"Plain Series", content:<><ProductSlider /></>},
]
const Megamanu = () => {
  return (
    <>
    <Menutabs tabs={items}/>
    </>
  )
}

export default Megamanu