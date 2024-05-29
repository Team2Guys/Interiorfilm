
'use client'

import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import Toaster from "components/Toaster/Toaster";
import { useAppDispatch} from "components/Others/HelperRedux";
import { loggedInUserAction } from '../../redux/slices/AdminsSlice';
import USRcomponent from 'components/userComponent/userComponent'
import { IoIosLock, IoMdMail } from "react-icons/io";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";







const DashboardLogin= () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
const intialvalue =   {
  email: "",
  password: "",
}

  const [formData, setFormData] = useState(
    intialvalue
);

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
    if(!formData.email || !formData.password) {
      return  setError('All fields are rquired')
    }
   try{
    setloading(true)

    let user:any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/adminLogin`,formData)
    console.log(user.data, "user token")
    const ISSERVER = typeof window === "undefined"
    !ISSERVER ? localStorage.setItem('2guysAdminToken', user.data.token) : null
    setloading(false)
    dispatch(loggedInUserAction(user.data.user))
    setFormData(intialvalue)
    Toaster("success", "You have sucessfully login")
      setTimeout(()=>{
      router.push('/dashboard')
      },1000)
  

   }catch(err:any){
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
    <>
    <div><USRcomponent handleSubmit={handleSubmit} 
     error={error} 
     loading={loading}
      inputFields={inputFields} 
      title="Sign In as Admin" 
       buttonTitle="Sign In"  
       />
       
        
        </div>
    </>
  );
};

export default DashboardLogin;

