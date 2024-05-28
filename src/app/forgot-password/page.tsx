"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Newpswd from "./Newpswd";
import Loader from "components/Loader/Loader";
import { IoIosLock, IoMdMail } from "react-icons/io";
import USRcomponent from 'components/userComponent/userComponent'




const Forgot = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>();
  const [forgotEmail, setforgotEmail] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean | null | undefined>(false);
  const initialFormData = {
    email: "",
   
  };

  const [formData, setFormData] = useState(initialFormData);

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
    if (!formData.email) return setError("All fields are rquired");
    try {
        setloading(true)
      let user: any = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emailVarify`,
        formData
      );
      console.log(user, 'user')
      setloading(false)
    setFormData(initialFormData)
    setforgotEmail(true)

    } catch (err: any) {
      console.log(err, "err");
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.error) {
        setError(err.error);
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
  ];

  return (
    <>

      {!forgotEmail ? 
            <div><USRcomponent handleSubmit={handleSubmit}
              error={error} loading={loading} inputFields={inputFields} title="Reset your password" buttonTitle= 'Submit'
              navigationLink="/login"
       navigationTxt="Login"
              /></div>
      : 
      <Newpswd email={formData.email}/>
      
      }
    </>
  );
};

export default Forgot;
