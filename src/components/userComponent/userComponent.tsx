"use client";
import React, { useState } from "react";

import Image from "next/image";
import Button from "components/Common/Button";
import Link from "next/link";
import Loader from "components/Loader/Loader";
import Input from "components/Common/Input";
import { USRPROPS } from "types/interfaces";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Container from "components/Layout/Container/Container";

export default function UserComponent({
  handleSubmit,
  error,
  loading,
  inputFields,
  title,
  descrition,
  InstructionText,
  routingText,
}: USRPROPS) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <>
    <div className="flex flex-wrap md:flex-nowrap md:gap-4 w-full">
      <div className="w-full md:w-2/4">
      <Image
              src="/images/Register_login.png"
              className="bg-cover object-fill"
              alt="RegisterImage"
              width={1000}
              height={1000}
            />
      </div>
      <div className="w-full md:w-2/4">
        <Container>
        <div className="flex justify-end  mt-10">
              <p
                className="rounded-full text-[#3A393C] text-base cursor-pointer flex gap-2 items-center"
                onClick={() => router.push("/")}
              >
                <span className="rounded-full text-white p-1 bg-[#C72031]">
                  <IoArrowBackSharp className="rounded-full text-white " />
                </span>
                Back to home
              </p>
            </div>
            <div className="full h-full flex justify-center items-center flex-col">
              <div className="w-3/5">
                <div className="flex flex-col items-center mb-20">
                  <h2 className="text-base text-[#3A393C]">{title && title}</h2>
                  <p className="text-base text-[#9096B2]">
                    {descrition && descrition}
                  </p>
                </div>

                <div className="inputs_container w-full ">
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
                      <div className="flex justify-center text-red-600">
                        {error}
                      </div>
                    ) : null}
                    <p className="pt-1">
                      {title && title !== "Login" ? null : (
                        <Link
                          className="underline text-[16px] text-[#9096B2] pt-4"
                          href={"/forgot"}
                        >
                          Forgot your password?
                        </Link>
                      )}
                    </p>

                    <Button
                      className="bg-[#c62131] text-white p-3 lg:w-full md:w-28 rounded-none lg:mt-10"
                      title={
                        loading ? (
                          <Loader color="#fff" />
                        ) : title && title === "Login" ? (
                          "Sign in"
                        ) : (
                          "Sign up"
                        )
                      }
                      type="submit"
                      disable={loading}
                    />
                    <div className="flex justify-end space-y-3  w-full">
                      <p className="text-[#9096B2] tex-base">
                        {InstructionText && InstructionText}{" "}
                        <Link
                          className="underline text-[16px] text-[#c62131]"
                          href={
                            title && title === "Login" ? "/register" : "/login"
                          }
                        >
                          {routingText && routingText}
                        </Link>
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
