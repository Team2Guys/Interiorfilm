'use client'
import React, { useState } from "react";

import Image from 'next/image'
import Button from "components/Common/Button";



import Link from "next/link";
import Loader from "components/Loader/Loader";
import Input from "components/Common/Input";
import { USRPROPS } from 'types/interfaces';

export default function userComponent({ handleSubmit, error, loading, inputFields, title,descrition,InstructionText, routingText }: USRPROPS) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className='flex h-[80vh] w-[90%]'>
          <div className='w-2/5	h-full'>
            <Image src='/images/Register_login.png' className='w-full h-full' alt='RegisterImage' width={500} height={500} />
          </div>
          <div className='w-2/4 flex justify-center items-center flex-col'>

            <div className='w-3/5'>
              <div className='flex flex-col items-center mb-20'><h2 className='text-base text-[#3A393C]'>{title && title}</h2>
                <p className='text-base text-[#9096B2]'>{descrition && descrition}</p>
              </div>

              <div className='inputs_container w-full '>

                <form className="space-y-4" onSubmit={handleSubmit}>

                  {inputFields.map((field: any, index: any) => (
                    <Input
                      key={index}
                      type={field.type}
                      name={field.name}
                      id={field.id}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      Icons={field.Icon}
                      iconClassName={field.iconClassName}
                    />
                  ))}
                  {error ? <div className="flex justify-center text-red-600">
                    {error}
                  </div> : null}
                  <p className="pt-1">
                  
                  { title && title !=='Login' ? null : 
                   
                    <Link className="underline text-[16px] text-[#9096B2] pt-4" href={"/forgot"}>
                      Forgot your password?
                    </Link>
                   } 
                  </p>


                    <Button
                      className="bg-[#c62131] text-white p-3 lg:w-full md:w-28 rounded-none lg:mt-10"
                      title={loading ? <Loader color='#fff' /> : title && title ==='Login' ? "Sign in" : 'Sign up'}
                      type="submit"
                      disable={loading}
                    />
                  <div className="flex justify-end space-y-3  w-full">
                    <p className='text-[#9096B2] tex-base'>
                      {InstructionText && InstructionText} <Link className="underline text-[16px] text-[#c62131]" href={ title && title ==='Login'? "/register" : '/login'}>
                       {routingText && routingText}
                      </Link>
                    </p>

                  </div>
                </form>

              </div>
            </div>
          </div>





        </div>
      </div>




    </>
  )
}
