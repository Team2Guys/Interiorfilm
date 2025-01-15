import { FooterPaymentMethods } from 'data/Data'
import Image from 'next/image'
import React from 'react'
interface PaymentMethodProps{
  class?:string
}

function PaymentMethod() {
  return (
    <div className="flex flex-nowrap md:flex-wrap  gap-2 py-2 text-black dark:text-white w-fit">
                {FooterPaymentMethods.map((item, index) => {
                  return(
             

                    <Image
                      src={item.imageUrl}
                      alt="master"
                      width={40}
                      height={40}
                      className="bg-white  h-6 px-1  object-contain shadow-lg rounded-md"
                      key={index}
                    />
          

    

                  )


})}
              </div>
  )
}

export default PaymentMethod