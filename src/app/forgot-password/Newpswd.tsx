"use client";

import Input from "components/Common/Input";
import Button from "components/Common/Button";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Toaster from "components/Toaster/Toaster";
import Loader from "components/Loader/Loader";
import { IoIosLock } from "react-icons/io";
import USRcomponent from 'components/userComponent/userComponent'







interface NewPasswordProps {
  email: string | any; // Define the type of email parameter
}
function Newpswd({ email }: NewPasswordProps) {
  const router = useRouter();

  const [error, setError] = useState<string | null | undefined>();
  const [loading, setloading] = useState<boolean | null | undefined>(false);


  const [formData, setFormData] = useState({
    newPassword: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!formData.newPassword || !formData.password) return setError("All fields are rquired");
    if (formData.newPassword !== formData.password) return setError("confirm and new password should be same");
    if (!email) return null;
    try {
      console.log("formData", formData);
    setloading(true)

      let user: any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/passwordReset`,
        { password: formData.password, email: email }
      );
      console.log(user.data);
      Toaster("success", "You Password has been sucessfully reseted !")

      setTimeout(()=>{
        router.push("/");
      },1000)
    setloading(false)

    } catch (err: any) {
      console.log(err, "err");
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
      type: "password",
      name: "newPassword",
      id: "newPassword",
      placeholder: "Re-type Password",
      value: formData.newPassword,
      onChange: handleChange,
      Icon: IoIosLock,
      iconClassName: "text-red",
    },
  ];
  return (

         <div><USRcomponent handleSubmit={handleSubmit}  error={error} loading={loading} inputFields={inputFields} title="Reset your password" buttonTitle= 'Submit'/></div>
  );
}

export default Newpswd;
