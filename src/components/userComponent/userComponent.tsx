"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "components/Common/Button";
import Link from "next/link";
import Loader from "components/Loader/Loader";
import Input from "components/Common/Input";
import { USRPROPS } from "types/interfaces";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Container from "components/Layout/Container/Container";
import { Select } from "antd";

const { Option } = Select;

export default function UserComponent({
  handleSubmit,
  error,
  loading,
  inputFields,
  title,
  descrition,
  InstructionText,
  routingText,
  buttonTitle,
  navigationLink,
  navigationTxt,
  SelectComonent,
  setadminType,
  adminType
}: USRPROPS) {



  const router = useRouter();
  const pathname = usePathname()

  let adminFlag = pathname === "/dashboard/Admin-login";

  const selecthandleChange = (value: string) => {
    setadminType && setadminType(value)
  };

  return (
    <>
      {SelectComonent ? <SelectComonent /> : null}
      <div className="lg:flex flex-wrap md:flex-nowrap md:gap-4 lg:px-0 px-5 w-full gap-0">
        <div style={{ backgroundImage: "url('/images/Register_login.jpg')" }}
          className="lg:w-[60%] bg-cover bg-center h-screen lg:block hidden"
        ></div>
        <div className="lg:w-[40%] ">
          <Container>
            <div className="flex justify-end mt-10 absolute ">
              <p
                className="rounded-full text-[#3A393C] text-sm cursor-pointer flex gap-2 items-center"
                onClick={() => router.push("/")}
              >
                <span className="rounded-full text-white p-1 bg-[#C72031]">
                  <IoArrowBackSharp className="rounded-full text-white" />
                </span>
                Back to home
              </p>
            </div>
            <div className="h-screen flex justify-center items-center flex-col ">
              <div className="lg:w-3/5">
                <div className="flex flex-col items-center lg:mb-20 mb-10">
                  <h2 className="text-xl text-[#3A393C] lg:text-4xl">{adminFlag ? `Sign in as ${adminType}` : title && title}</h2>
                  <p className="text-sm text-[#9096B2] mt-3 text-center">
                    {descrition && descrition}
                  </p>
                </div>
                {
                  adminFlag ?
                    <div className=" mb-4 flex gap-3 items-center">
                      <p className="w-full">Sign in As </p>
                      <Select className="w-full"
                        defaultValue='Admin'
                        onChange={selecthandleChange}
                        options={[
                          { value: 'Admin', label: 'Admin' },
                          { value: 'Super-Admin', label: 'Super-Admin' },

                        ]}
                      />

                    </div>

                    : null
                }



                <div className="inputs_container w-full">
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
                    {error ? (
                      <div className="flex justify-center text-red">
                        {error}
                      </div>
                    ) : null}
                    <p className="pt-1 ">
                      {!navigationLink ? null : (
                        <Link
                          className="underline text-[#9096B2] pt-4 text-sm"
                          href={navigationLink}
                        >
                          {navigationTxt}
                        </Link>
                      )}
                    </p>

                    <Button
                      className="bg-[#c62131] text-white lg:p-3 p-2 lg:w-full lg:md:w-28 w-full rounded-none lg:mt-10"
                      title={loading ? <Loader color="#fff" /> : buttonTitle}
                      type="submit"
                      disable={loading}
                    />
                    <div className="flex justify-end space-y-3 w-full">
                      <p className="text-[#9096B2] text-sm">
                        {InstructionText && InstructionText}{" "}
                        {
                          routingText &&
                          <Link
                            className="underline text-sm text-[#c62131]"
                            href={
                              title && title === "Sign In" ? "/register" : "/login"
                            }
                          >
                            {routingText}
                          </Link>
                        }
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
