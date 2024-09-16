"use client";
import Button from "components/Common/Button";
import LabelInput from "components/Common/LabelInput/LabelInput";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toaster from "components/Toaster/Toaster";
import Loader from "components/Loader/Loader";

const contact_us_Validation = Yup.object().shape({
    user_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is Required"),
    comment: Yup.string().required("Comment is Required"),
    user_email: Yup.string().email("Invalid email").required("Email is Required"),
    user_phone: Yup.string()    .required("Phone Number is Required"),



  });
  
  const formatPhoneNumber = (value: any) => {
    // Remove all characters except digits and "+"
    const numbers = value.replace(/[^+\d]/g, "");
  
    // Handle UAE-specific formatting when starting with "+971"
    if (numbers.startsWith("+971")) {
      if (numbers.length <= 5) return `${numbers}`; // "+971"
      if (numbers.length <= 7) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`; // "+971-XX"
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 13)}`; // "+971-XX-XXXXXXX"
    } 
    // Handle numbers starting with "0" for UAE (assume "0971")
    else if (numbers.startsWith("0")) {
      if (numbers.length <= 3) return `${numbers}`;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`; // "0971-XX"
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 12)}`; // "0971-XX-XXXXXXX"
    } 
  
    return numbers; // If no valid prefix, return the input as-is.
  };
  
  const handlePhoneNumberChange = (e: any, setFieldValue: any) => {
    let value = e.target.value;
  
    // Allow only digits and '+' at the start
    value = value.replace(/[^+\d]/g, "");
  
    // Limit the input to 14 characters (for full UAE number)
    value = value.slice(0, 14);
  
    // Set the formatted phone number
    setFieldValue("user_phone", formatPhoneNumber(value));
  };
  

const Contact = () => {
  const [loading, setloading] = useState<boolean>(false);
  const initialValues = {
    user_email: "",
    user_name: "",
    user_phone: "",
    comment: "",
  };

  const submitHandler = async (values: any, resetForm: any) => {
    try {
      setloading(true);
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`,
        values
      );
      console.log(response, "response");
      Toaster("success", "Message has been forward!");
      resetForm();
    } catch (err) {
      console.log(err);
      Toaster("error", "internal Server issue!");
    } finally {
      setloading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contact_us_Validation,
    onSubmit: (values, { resetForm }) => {
      submitHandler(values, resetForm);
    },
  });

  return (
    <>
      <Overlay title="Contact" />
      <Container className="lg:my-16 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-md p-4  sm:p-4 md:p-8 text-white space-y-14">
            
            <h1 className="text-2xl lg:text-4xl font-medium pt-10">Contact</h1>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <TfiLocationPin size={20} />
                <p>
                  Yellowzone Trading, Al Nabooda Tower A ,Shop 6, Oud Metha,
                  Dubai, UAE
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <FiPhone size={20} />
                <Link target="_blank" href={"tel:+971 052 1919 327"}>
                  +971 052 1919 327
                </Link>
              </div>

              <div className="flex gap-2 items-center">
                <FiMail size={20} />
                <Link target="_blank" href={"mailto:orders@yzgroup.ae"}>
                  orders@yzgroup.ae
                </Link>
              </div>

              
            </div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-3xl font-medium flex flex-col gap-2">
                Follow Us
              </h1>
              <div className="flex gap-5 ">
                <Link target="_blank" href={"https://www.facebook.com/InteriorFilm.ae"}>
                  <FaFacebookSquare className="text-white" size={25} />
                </Link>
                <Link target="_blank" href={"https://www.instagram.com/interiorfilm.ae/"}>
                  <FaInstagram className="text-white" size={25} />
                </Link>
              </div>
            </div>

<div>

  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.7645284624414!2d55.29684471128044!3d25.244854829675067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d1e8f3abe7%3A0xc724750e36691cb2!2sYellow%20Zone%20Technical%20Services!5e0!3m2!1sen!2s!4v1726464310457!5m2!1sen!2s" className ="w-full max-h-300 min-h-50" loading="lazy"></iframe>

</div>


          </div>
          <div className="border border-gray rounded-md">
            <form className="p-4 pt-10" onSubmit={formik.handleSubmit}>
              <LabelInput
                label="Name"
                placeholder="Enter Name"
                type="text"
                id="user_name"
                name="user_name"
                onChange={formik.handleChange}
                value={formik.values.user_name}
              />
              {formik.errors.user_name && formik.touched.user_name && (
                <div className="text-primary pb-4">
                  {formik.errors.user_name}
                </div>
              )}

          
            <LabelInput
                label="Phone Number"
                placeholder="+971-XX-XXXXXXX"
                type="text"
                id="user_phone"
                name="user_phone"
                onChange={(e) => handlePhoneNumberChange(e, formik.setFieldValue)}
                value={formik.values.user_phone}
                inputMode="numeric"
                maxLength={15}
              />

              {formik.errors.user_phone && formik.touched.user_phone && (
                <div className="text-primary pb-4">
                  {formik.errors.user_phone}
                </div>
              )}


<LabelInput
                label="Email"
                placeholder="Enter Email"
                type="email"
                id="user_email"
                name="user_email"
                onChange={formik.handleChange}
                value={formik.values.user_email}
              />
              {formik.errors.user_email && formik.touched.user_email && (
                <div className="text-primary pb-4">
                  {formik.errors.user_email}
                </div>
              )}

              <div className="w-full px-3 mb-10">
                <label className="block uppercase tracking-wide text-dark text-sm font-bold mb-2">
                  Comment
                </label>
                <textarea
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                  name="comment"
                  className="appearance-none block w-full bg-gray-200 text-dark border border-gray mt-4 border-gray-200 rounded py-5 px-5 leading-tight focus:outline-none focus:bg-white focus:border-dark outline-dark"
                  placeholder={"Enter Comment"}
                />
                {formik.errors.comment && formik.touched.comment && (
                  <div className="text-primary pt-4">
                    {formik.errors.comment}
                  </div>
                )}

                <Button
                  className="text-center w-full bg-primary py-3 text-white mt-5"
                  type="submit"
                  title={loading ? <Loader /> : "Submit Now"}
                  disable={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
