"use client"
import Thumbnail from 'components/Carousel/Thumbnail/Thumbnail'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState } from 'react'
import img from "../../../public/images/img-1.png"
import img2 from "../../../public/images/img-10.png"
import img3 from "../../../public/images/img-12.png"
import img4 from "../../../public/images/img-11.png"
import img5 from "../../../public/images/img-15.png"
import img6 from "../../../public/images/img-16.png"
import img7 from "../../../public/images/img-18.png"
import img8 from "../../../public/images/img-17.png"
import { Rate } from 'antd'
import { HiOutlineMinus } from 'react-icons/hi2'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { GoHeart } from 'react-icons/go'
import Tabs from 'components/ui/Tabs/Tabs'
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider'
import Menutabs from 'components/ui/Tabs/Menutabs/Menutabs'
import Mobiletab from 'components/ui/Tabs/Mobiletab/Mobiletab'

const items=[
    { image: img3, title: "JBL Micoro Headphone", price: 23, oldprice: 38, star: 2 },
    { image: img4, title: "Bose Color Speaker", price: 21, oldprice: 38, star: 2 },
    { image: img5, title: "Bose Color Speaker", price: 30, oldprice: 38, star: 2 },
    { image: img6, title: "Asus Watch Speaker", price: 28, oldprice: 38, star: 2 },
    { image: img7, title: "Asus Watch Speaker", price: 12, oldprice: 38, star: 2 },
    { image: img8, title: "Sony Wireless Bohm", price: 19, oldprice: 38, star: 2 },
];
    

const Detail = () => {
    const [colorName, setColorName] = useState<string>()
    let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

    let colorsARray =[
        { colorName : '000'},
        { colorName : '153'}, 
        { colorName : '343'},
        { colorName : 'e22'},
        { colorName : 'ht3'},
        { colorName : '7f3'},

]
const tabData = [
    { key:"1",tab: 'Description', content: <div className='space-y-3'>
    <div>
        <h1 className='font-semibold'>Viverra a consectetur</h1>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Vivamus bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.Contrary to popular belief, Lorem Ipsum is not simply random text. It lassical Latin literature from 45 BC, making it</p>
    </div>
    <div>
        <h1 className='font-semibold'>Viverra a consectetur</h1>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Vivamus bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.Contrary to popular belief, Lorem Ipsum is not simply random text. It lassical Latin literature from 45 BC, making it</p>
    </div>
    </div> },
    { key:"2",tab: 'Additional Info', content: <>
    <div className='space-y-3'>
    <div>
        <h1 className='font-semibold'>Viverra a consectetur</h1>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Vivamus bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.Contrary to popular belief, Lorem Ipsum is not simply random text. It lassical Latin literature from 45 BC, making it</p>
        <ul className='px-6'>
        <li className='list-disc'>Lorem ipsum dolor sit amet</li>
        <li className='list-disc'>bibendum magna Lorem</li>
        <li className='list-disc'>.Contrary to</li>
        <li className='list-disc'>Lorem ipsum dolor sit amet</li>
        <li className='list-disc'>bibendum magna Lorem</li>
      </ul>
    </div>
    <div>
        <h1 className='font-semibold'>Viverra a consectetur</h1>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Vivamus bibendum magna Lorem ipsum dolor sit amet, consectetur adipiscing elit.Contrary to popular belief, Lorem Ipsum is not simply random text. It lassical Latin literature from 45 BC, making it</p>
    </div>
   
    </div>
    </> },
    { key:"3",tab: 'Review', content: <></> },
    { key:"4",tab: 'Video', content:<></> },
  ];

  return (
    <>
        <Overlay title='Product Detail'/>
        <Container className='mt-10 mb-5'>
        <div className='shadow p- bg-white'>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-2 p-2 gap-4'>
            <div className='w-full'>
                <Thumbnail
                thumbs={[
                    {image:img},
                    {image:img2},
                    {image:img3},
                    {image:img4},
                    {image:img5},
                    {image:img6},
                    {image:img7},
                    {image:img8},
                ]}
                />
                </div>
                <div className='py-5 px-8 space-y-4 md:space-y-8'>
                    <h1 className='text-3xl'>Playwood arm chair</h1>
                    <div className='flex gap-2'>
                    <Rate disabled allowHalf defaultValue={3.5} />
                    <p>(24)</p>
                    </div>
                    <div className='flex gap-2'>
                    <p className='text-primary'>
                        Dhs. <span>120</span>.00
                    </p>
                    <p className='line-through text-light'>
                        Dhs. <span>150</span>.00
                    </p>
                    </div>
                    <div className='flex gap-2'>
                    <p className='font-medium text-lg'>Color: </p>
                    <div  className='flex flex-wrap gap-2'>

                    {colorsARray.map((color, index) =>{
                        return (
                            <div className={`rounded-full p-1 ${color.colorName ===colorName ? " border-2 border-primary": ""}`} key={index}>
                            <div  className={`space-x-2 h-4 w-4 cursor-pointer rounded-full `} style={{backgroundColor: `#${color.colorName}`}} onClick={()=>{setColorName(color.colorName)}}>
                            </div>
                            </div>
                        )
                    })}
                    </div>
                 
                    </div>
                    <div className='flex items-center gap-2'>
                        <button className='border py-2 px-2 rounded-md' onClick={decrementCount}><HiOutlineMinus /></button>
                        <div>{count}</div>
                         <button className='border py-2 px-2 rounded-md' onClick={incrementCount}><HiOutlinePlusSm /></button>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                    <div className='flex gap-2'>
                        <button className='bg-primary rounded-md py-3 px-8 text-white'>Add To Cart</button>
                        <button className='bg-primary rounded-md py-3 px-3 text-white'><GoHeart size={25} /></button>
                    </div>
                    <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg'>Categories: </p>
                    <p className='text-dark'>All, Featured, Shoes</p>
                    </div>
                    <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg'>Tags: </p>
                    <p className='text-dark'>All, Featured, Shoes</p>
                    </div>
                </div>
            </div>
        </div>
        </Container>
        <div className='bg-secondary  mt-20'>
         <Container>
        <Mobiletab className='pt-10 pb-10' tabData={tabData}/>
         </Container>
        </div>
        <Container className='mt-20'>
         <h1 className='text-lg md:text-3xl mb-5=-'>Related Product</h1>
         <ProductSlider
         Related={items}
         />
         </Container>
    </>
  )
}

export default Detail