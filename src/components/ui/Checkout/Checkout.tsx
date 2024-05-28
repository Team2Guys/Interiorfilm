import CheckoutData from 'checkoutData/CheckOutData';
import React from 'react';

const CheckOut: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-6 shadow-md">
            <div className="flex justify-between flex-wrap">
              <h2 className="lg:text-lg text-base font-medium text-gray-900 lg:mb-4">Contact Information</h2>
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Email or mobile phone number"
                className="w-full border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
              <div className="flex items-center mt-2">
                <input type="checkbox" id="news" className="mr-2" />
                <label htmlFor="news" className="text-sm text-gray-600">
                  Keep me up to date on news and exclusive offers
                </label>
              </div>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mt-16">Shipping address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name (optional)"
                className="border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc (optional)"
              className="w-full border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <input
                type="text"
                placeholder="Bangladesh"
                className="border border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border-t-0 border-l-0 border-r-0 border-b border-gray-300 shadow-0 outline-0 p-2"
              />
            </div>
          </div>
          <CheckoutData />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
