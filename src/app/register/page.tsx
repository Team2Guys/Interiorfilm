"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Toaster from "components/Toaster/Toaster";
import { IoIosLock, IoMdMail  } from "react-icons/io";
import USRcomponent from 'components/userComponent/userComponent'
import { FaUser } from "react-icons/fa6";
import {validateForm} from 'data/Data'




interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmpassword: string
  }



const Register: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null | undefined>()
  const [loading, setloading] = useState<boolean | null | undefined>(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmpassword:""
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    const error   = validateForm(formData);

    if (error ) {
        setError(error);
        return;
      }


if(formData.password !== formData.confirmpassword) return setError('Confirm password and password are not matched')
    
    if(!formData.fullName || !formData.email || !formData.password) return  setError('All fields are rquired')
    setloading(true)
let {confirmpassword , ...withoutconfirmPassword} = formData
   try{
    let user = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`,withoutconfirmPassword)
    setloading(false)
    Toaster("success", "You have sucessfully Register!")
    setTimeout(()=>{
    router.push('/login')

    },1000)

    console.log(user, "user")

   }catch(err:any){
    console.log(err, "err")
    setloading(false)
    if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }


   } 
   finally {
    setloading(false)

  }

  };

  
  const inputFields = [
    {
        type: 'text',
        name: 'fullName',
        id: 'fullName',
        placeholder: 'Enter Full Name',
        value: formData.fullName,
        onChange: handleChange,
        Icon: FaUser,
        iconClassName: 'text-red',
      },
   
    {
      type: 'email',
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      value: formData.email,
      onChange: handleChange,
      Icon: IoMdMail,
      iconClassName: 'text-red',
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'Enter Password',
      value: formData.password,
      onChange: handleChange,
      Icon: IoIosLock,
      iconClassName: 'text-red',
    },
    {
        type: 'password',
        name: 'confirmpassword',
        id: 'confirmpassword',
        placeholder: 'Re-type Password',
        value: formData.confirmpassword,
        onChange: handleChange,
        Icon: IoIosLock,
        iconClassName: 'text-red',
      },
  
    
  ];
  

  return (
    <>
    <div><USRcomponent handleSubmit={handleSubmit}  error={error} loading={loading} inputFields={inputFields} title="Sign Up"  InstructionText="Already have a Account?" routingText ='login'/></div>


    </>
  );
};

export default Register;
