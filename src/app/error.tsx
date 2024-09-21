"use client";

import Link from "next/link";
import { useEffect } from "react";
interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  console.log(error, "error");
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex justify-center items-center flex-col gap-4">
        <span className="flex justify-center items-center rounded-full w-30 h-30 text-white text-8xl bg-[#E41B22]">!</span>
        <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
        <p className="text-gray-700">{error.message}</p>
        <Link href='/contact'
          className="w-35 sm:w-40 h-10 sm:h-12 text-14 sm:text-base flex justify-center items-center rounded-full bg-primary text-white hover:bg-white border border-primary hover:text-primary transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
