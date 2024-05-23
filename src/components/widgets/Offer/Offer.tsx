import Container from 'components/Layout/Container/Container'
import React from 'react'
import { SlDiamond } from 'react-icons/sl'

// Define the Offer type
interface Offer {
    title: string;
    detail: string;
    icon?: React.ReactNode; // Changed from 'any' to 'React.ReactNode' for better type safety
  }
  
  // Define the props type for the component
  interface OffersProps {
    Offers?: Offer[];
  }
  
  const Offer: React.FC<OffersProps> = ({ Offers = [] }) => {
  return (
    <Container className='mt-20'>
        <h1 className='font-bold text-lg md:text-[55px] text-center'>What Interior Offer!</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-2 md:gap-4'>
            {
                Offers.map((array,index)=>(
                    <div className='group ' key={index}>
                    <div className='shadow p-1 md:p-2  group-hover:shadow-lg flex flex-col justify-center items-center space-y-3 pt-10 pb-10 px-1 md:px-4 h-72' >
                    <div className='w-16 h-16 rounded-full bg-white group-hover:bg-primary flex justify-center items-center'>
                        {array.icon}
                    </div>
                    <h1 className='font-medium text-center'>{array.title}</h1>
                    <p className='text-center text-sm md:text-base'>{array.detail}</p>
                 </div>
                 </div>
                ))
            }
        </div>
        
    </Container>
  )
}

export default Offer