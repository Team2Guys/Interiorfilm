'use client'
import React, { useState } from "react";
import USRcomponent from 'components/userComponent/userComponent'
import { useRouter } from "next/navigation";
import axios from 'axios';
import Toaster from "components/Toaster/Toaster";
import { IoIosLock, IoMdMail } from "react-icons/io";


export default function Page() {
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
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');

      if (!formData.email || !formData.password) return setError('All fields are rquired')
      try {
        setloading(true)

        let user: any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, formData)
        console.log(user.data, "user token")
        const ISSERVER = typeof window === "undefined"
        !ISSERVER ? localStorage.setItem('2guysToken', user.data.token) : null
        setloading(false)
  
        Toaster("success", "You have sucessfully login")
        setTimeout(() => {
          router.push('/')

        }, 1000)
  
  
      } catch (err: any) {
        console.log(err, "err")
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else if (err.message) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred.');
          }

      } finally{
        setloading(false)

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
    <div><USRcomponent handleSubmit={handleSubmit}  error={error} loading={loading} inputFields={inputFields} title="Sign In" descrition="Please login using account detail bellow." InstructionText="Don't Have an Account?" routingText =' Create account'/></div>
  )
}
