'use client'
import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay'


import axios from 'axios';
import Confetti from 'components/confetti/Confetti';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';


interface PaymentQueryParams {
  id: string | null;
  amount_cents: string | null;
  success: boolean | null
  integration_id: string | null,
  currency: string | null,
  is_refund: string | null,
  order_id: string | null,
  pending: string | null,
  is_3d_secure: string | null,
  created_at: string | null

}


const Thankyou = () => {
  const searchParams = useSearchParams()


  
  const id = searchParams.get('id')
  const amount_cents = searchParams.get('amount_cents')
  const success = searchParams.get('success')
  const integration_id = searchParams.get('integration_id')
  const created_at = searchParams.get('created_at')
  const currency = searchParams.get('currency')
  const is_refund = searchParams.get('is_refund')
  const order_id = searchParams.get('order')
  const pending = searchParams.get('pending')
  const is_3d_secure = searchParams.get('is_3d_secure')

  let successFlag :boolean = success ? success.toLowerCase() === "true" : false

  let paymentObject = {
    id,
    success:successFlag ,
    amount_cents,
    integration_id,
    currency,
    is_refund,
    order_id,
    pending,
    is_3d_secure,
    created_at
  }
  const [payementDetails, setpayementDetails] = useState<PaymentQueryParams>(paymentObject)


  const dbFunctionHandler = async () => {


    try {
      if (!id || !success || !amount_cents || !integration_id || !currency || !order_id || !pending || !is_3d_secure || !created_at) {
        throw new Error('Missing required fields in request body')
      }
      if (successFlag) {
        localStorage.removeItem('cart')
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/postPayement`, payementDetails,);
      console.log(response, "response")
    } catch (error) {
      console.log(error, "err")
    }

  }


  useEffect(() => {
    dbFunctionHandler()

  }, [])

  return (
<>

{
        successFlag ? <Confetti /> : null

      }

<Overlay title="show_details"/>

{
  successFlag ? 
     <div className='max-w-full flex flex-col space-y-6 justify-center items-center mb-20 p-4'>
        <div className='mt-6'><Image src={"/images/thankyou/check.png"} 
        alt=""
        height={"100"}
        width={"100"}/>
        </div>
        <div className='text-2xl sm:text-4xl text-center'><h2>Your Order Is Completed!</h2></div>
        <div className='sm:max-w-[90%] max-w-[80%] lg:max-w-[55%] text-center'><p className='text-sm text-lightdark leading-6'>Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.</p></div>
        <div className='bg-black text-white text-sm text-center py-5 px-9'>
        <Link href='/products'>
        Continue Shopping
        </Link>
        </div>
    </div> : 
     
     <div>

     <div className="flex justify-center my-20 '">
       <div className="w-full max-w-md">
         <div className="border-b-4 border-red shadow-lg p-12 text-center flex flex-col items-center">
           <Image className='flex justify-center' src='/images/remove.png' alt='remove image' height={50} width={50} />
           <h2 className="text-4xl font-bold mt-2 mb-3">Payment Unsuccessful</h2>
           <p className="text-lg text-gray-700 font-medium"> Your payment was not completed. Please try again or contact our support team for assistance.</p>
         </div>
       </div>
     </div>





   </div>


}



</>
  )

  
}

export default Thankyou;