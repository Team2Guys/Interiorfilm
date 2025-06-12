"use client";
import Button from "components/Common/Button";
import LabelInput from "components/Common/LabelInput/LabelInput";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookSquare, FaInstagram, FaPinterest } from "react-icons/fa";
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
  user_phone: Yup.string().required("Phone Number is Required"),
});

const formatPhoneNumber = (value: any) => {
  const numbers = value.replace(/[^+\d]/g, "");
  if (numbers.startsWith("+971")) {
    if (numbers.length <= 5) return `${numbers}`; // "+971"
    if (numbers.length <= 7)
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`; // "+971-XX"
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(
      6,
      13
    )}`; // "+971-XX-XXXXXXX"
  }
  else if (numbers.startsWith("0")) {
    if (numbers.length <= 3) return `${numbers}`;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`; // "0971-XX"
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
      5,
      12
    )}`; // "0971-XX-XXXXXXX"
  }

  return numbers;
};

const handlePhoneNumberChange = (e: any, setFieldValue: any) => {
  let value = e.target.value;
  value = value.replace(/[^+\d]/g, "");
  value = value.slice(0, 14);
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
      <Overlay title="Contact Us" />
      <Container className="lg:my-16 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-md p-4  sm:p-4 md:p-8 text-white space-y-14">
            <h1 className="text-2xl lg:text-4xl font-medium pt-10">Contact</h1>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <TfiLocationPin size={20} />
                <Link
                  target="_blank"
                  href={
                    "https://www.google.com/maps/place/interiorfilm.ae/@25.2365707,55.307743,21z/data=!4m14!1m7!3m6!1s0x3e5f439cc8bb1d43:0xd3d5fae1dc84d0c0!2sFloors+And+Walls+Dubai!8m2!3d25.2370265!4d55.3080125!16s%2Fg%2F11qrkn8_1q!3m5!1s0x3e5f43e5c67a5595:0xdb1aeea922163a0a!8m2!3d25.2364864!4d55.3079376!16s%2Fg%2F11sz9pys8k?hl=en&entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
                  }
                  className="md:text-12 lg:text-base"
                >
                  ELITE CONCEPTS GENERAL TRADING LLC <br />
                Shop 5 Khalil Al Sayegh Building, Oud Metha, Umm Hurrair Dubai UAE
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <FiPhone size={20} />
                <Link target="_blank" href={"tel:+971 04 589 9888"}>
                  +971 04 589 9888
                </Link>
              </div>

              <div className="flex gap-2 items-center">
                <FiMail size={20} />
                <Link target="_blank" href={"mailto:info@interiorfilm.ae"}>
                  info@interiorfilm.ae
                </Link>
              </div>
            </div>
            <div>
              <p className="text-lg md:text-xl lg:text-3xl font-medium flex flex-col gap-2">
                Follow Us
              </p>
              <div className="flex gap-5 ">
                <Link
                  target="_blank"
                  href={"https://www.facebook.com/InteriorFilm.ae"}
                >
                  <FaFacebookSquare className="text-white" size={25} />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.instagram.com/interiorfilm.ae/"}
                >
                  <FaInstagram className="text-white" size={25} />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.pinterest.com/interiorfilmuae/"}
                >
                  <FaPinterest className="text-white" size={25} />
                </Link>
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d225.56315739176367!2d55.307743!3d25.2365707!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43e5c67a5595%3A0xdb1aeea922163a0a!2sinteriorfilm.ae!5e0!3m2!1sen!2s!4v1730094852579!5m2!1sen!2s"
                className="w-full max-h-300 min-h-50"
                loading="lazy"
              ></iframe>
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
              <div className="mb-10">
                {formik.errors.user_name && formik.touched.user_name && (
                  <div className="text-primary  text-12 px-3">
                    {formik.errors.user_name}
                  </div>
                )}
              </div>

              <LabelInput
                label="Phone Number"
                placeholder="+971-XX-XXXXXXX"
                type="text"
                id="user_phone"
                name="user_phone"
                onChange={(e) =>
                  handlePhoneNumberChange(e, formik.setFieldValue)
                }
                value={formik.values.user_phone}
                inputMode="numeric"
                maxLength={15}
              />
              <div className="mb-10">
                {formik.errors.user_phone && formik.touched.user_phone && (
                  <div className="text-primary  text-12 px-3">
                    {formik.errors.user_phone}
                  </div>
                )}
              </div>

              <LabelInput
                label="Email"
                placeholder="Enter Email"
                type="email"
                id="user_email"
                name="user_email"
                onChange={formik.handleChange}
                value={formik.values.user_email}
              />
              <div className="mb-10">
                {formik.errors.user_email && formik.touched.user_email && (
                  <div className="text-primary  text-12 px-3">
                    {formik.errors.user_email}
                  </div>
                )}
              </div>
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
                <div className="mb-10">
                  {formik.errors.comment && formik.touched.comment && (
                    <div className="text-primary text-12 ">
                      {formik.errors.comment}
                    </div>
                  )}
                </div>
                <Button
                  className="text-center w-full bg-primary py-3 text-white mt-5 px-14 2xsm:px-20"
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
