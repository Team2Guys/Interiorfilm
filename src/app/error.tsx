'use client'; 

import { useEffect } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
  }
export default function Error({ error, reset }:ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
console.log(error, "error")
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  </div>
  );
}
