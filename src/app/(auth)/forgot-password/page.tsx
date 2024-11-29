"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Newpswd from "./Newpswd";
import Loader from "components/Loader/Loader";
import { IoMdMail } from "react-icons/io";
import USRcomponent from 'components/userComponent/userComponent';
import OtpInput from 'react-otp-input';
import Button from "components/Common/Button";
const Forgot: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [forgotEmail, setForgotEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const initialFormData = { email: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [otpMatched, setOtpMatched] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!formData.email) return setError("All fields are required");

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emailVarify`,
        formData
      );
      setLoading(false);
      setForgotEmail(true);
    } catch (err: any) {
      console.log(err, "err");
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verifyOtp`,
        { email: formData.email, otp }
      );
      console.log(response.status == 200)
      if (response.status == 200) {
        setOtpMatched(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      console.log(err, "err");
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
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
      {!forgotEmail ? (
        <div>
          <USRcomponent
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
            inputFields={inputFields}
            title="Reset your password"
            buttonTitle='Submit'
            navigationLink="/login"
            navigationTxt="Login"
          />
        </div>
      ) : (
        <>
          {!otpMatched ? (
            <div className="lg:flex flex-wrap md:flex-nowrap md:gap-4 lg:px-0 px-5 w-full gap-0">
              <div style={{ backgroundImage: "url('/images/login.png')" }}
                className="lg:w-[60%] bg-cover bg-center h-screen lg:block hidden"
              />
              <form
                onSubmit={handleSubmitOTP}
                className="flex flex-col items-center justify-center min-h-screen gap-10 lg:w-[40%]"
              >
                <label htmlFor="otp" className="text-xl text-[#3A393C] lg:text-4xl">Enter OTP</label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="mx-1">-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{ display: 'flex', justifyContent: 'center' }}
                  inputStyle={{
                    width: '40px',
                    height: '40px',
                    margin: '0 5px',
                    fontSize: '24px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                // focusStyle={{
                //   borderColor: '#4CAF50',
                // }}
                />

                <Button
                  className="bg-primary text-white lg:p-3 p-2 lg:w-64 lg:md:w-28 w-34 rounded-none lg:mt-10"
                  title={loading ? <Loader color="#fff" /> : 'Verify OTP'}
                  type="submit"
                  disable={loading}
                />
                {error && <p className="error text-red-300 mt-2">{error}</p>}
              </form>
            </div>

          ) : (
            <Newpswd email={formData.email} />
          )}
        </>
      )}
    </>
  );
};

export default Forgot;