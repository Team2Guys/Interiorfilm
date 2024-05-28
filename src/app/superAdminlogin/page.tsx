'use client'

import React, { useState } from "react";
import Button from "components/Common/Button";
import { HeadingH3 } from "components/Common/Heading";
import Input from "components/Common/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import Toaster from "components/Toaster/Toaster";
import Loader from "components/Loader/Loader";
import USRcomponent from 'components/userComponent/userComponent'
import { IoIosLock, IoMdMail } from "react-icons/io";







const DashboardLogin: React.FC = () => {
  const router = useRouter()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null | undefined>();
  const [loading, setloading] = useState<boolean | null | undefined>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setloading(true)
    if(!formData.email || !formData.password) return  setError('All fields are rquired')
   try{
    let user:any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/superAdminLogin`,formData)
    console.log(user.data.token, "user token")
    const ISSERVER = typeof window === "undefined"
    !ISSERVER ? localStorage.setItem('superAdminToken', user.data.token) : null
    setloading(false)

      Toaster("success", "You have sucessfully login")
      setTimeout(()=>{
      router.push('/superAdmindashboard')
      },1000)
  

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
  };


  const inputFields = [
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
  ];
  return (
    <>
        <div><USRcomponent handleSubmit={handleSubmit}  error={error} loading={loading} inputFields={inputFields} title="Login as SuperAdmin" buttonTitle="Sign in" /></div>
   

    </>
  );
};

export default DashboardLogin;

