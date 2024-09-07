"use client";
import CheckoutData from "components/widgets/checkoutData/CheckOutData";
import React, { useEffect, useState } from "react";
import { Checkbox, Button, Select } from "antd";
import Link from "next/link";
import Product from "app/product/[productname]/page";
import PRODUCTS_TYPES from "types/interfaces";
import { number } from "yup";
import { IoCloseSharp } from "react-icons/io5";
import Container from "components/Layout/Container/Container";
import CheckoutInput from "./checkout-input";
import { CountryCode } from "data/Data";
import { FiTag } from "react-icons/fi";
import Overlay from 'components/widgets/Overlay/Overlay'


const CheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipmentFee, setShipmentFee] = useState<number | string>(0);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone_number: "",
    state: "Dubai",
    city: "",
    country: "United Arab Emirates",
    address: "",
    additionalAddressFields: [] as { id: string; address: string }[],
    orderNote: "",
    productItems: [] as PRODUCTS_TYPES[],
    subtotalAmount: 0,
    totalAmount: 0,
  });
  const [showOrderNote, setShowOrderNote] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const { Option } = Select;

  const selectoption = [
    { title: "Dubai" },
    { title: "Abu Dhabi" },
    { title: "Sharjah" },
    { title: "Ajman" },
    { title: "Ras Al Khaima" },
    { title: "Umm Al Quwain" },
    { title: "Fujairah" },
  ];

  const AddresAAray = [
    { state: "dubai", charges: 15, discountCharges: 150 },
    { state: "sharjah", charges: 20, discountCharges: 200 },
    { state: "abu dhabi", charges: 20, discountCharges: 200 },
  ];

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");
  
    const formattedNumber = `${numbers.slice(0, 1)}-${numbers.slice(1, 4)}-${numbers.slice(4, 8)}`;
  
    return formattedNumber;
  }  


  const handlePhoneNumberChange = (e: any) => {
    let value = e.target.value;
    value = value.slice(0, 9);
    setBillingData((prevData) => ({
      ...prevData,
      phone_number: formatPhoneNumber(value),
    }));
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);

  useEffect(() => {
    const updatedTotal =
      shipmentFee === "Free" ? subtotal : Number(shipmentFee) + subtotal;

    setBillingData({
      ...billingData,
      productItems: cartItems,
      subtotalAmount: subtotal,
      totalAmount: updatedTotal,
    });
  }, [cartItems, shipmentFee, subtotal]);

  useEffect(() => {
    const calculateCharges = () => {
      const matchingItem = AddresAAray.find(
        (item) => item.state.toLowerCase() === billingData.state.toLowerCase()
      );

      const charges = matchingItem
        ? subtotal > matchingItem.discountCharges
          ? "Free"
          : matchingItem.charges
        : subtotal > 250
        ? "Free"
        : 25;
      setShipmentFee(charges);
    };

    calculateCharges();
  }, [billingData.state, subtotal, AddresAAray]);

  const calculateTotals = (items: any) => {
    const sub = items.reduce((acc: any, item: any) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + price * item.count * item.length;
    }, 0);
    setSubtotal(sub);
    const shipping = sub < 100 ? 30 : 0;
    setShippingCharges(shipping);
    setTotal(sub + shipping);
  };

  const handleCartChange = (updatedCart: any) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
  };

  const handleSelectChange = (value: string) => {
    setBillingData({ ...billingData, state: value });
  };

  const addAddressField = (value: any) => {
    setBillingData({
      ...billingData,
      additionalAddressFields: [
        ...billingData.additionalAddressFields,
        { id: Date.now().toString(), address: "" },
      ],
    });
  };

  const handleAddressFieldChange = (id: string, value: string) => {
    setBillingData({
      ...billingData,
      additionalAddressFields: billingData.additionalAddressFields.map(
        (field) => (field.id === id ? { ...field, address: value } : field)
      ),
    });
  };

  const handleAddressFieldDelete = (id: string) => {
    setBillingData({
      ...billingData,
      additionalAddressFields: billingData.additionalAddressFields.filter(
        (field) => field.id !== id
      ),
    });
  };

  const handleOrderNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBillingData({
      ...billingData,
      orderNote: e.target.value,
    });
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phone_number: "", address: "" };

    if (!billingData.name || /\d/.test(billingData.name)) {
      newErrors.name = "Invalid name. No numbers allowed.";
      isValid = false;
    }
    if (!billingData.address) {
      newErrors.address = "Invalid address.";
      isValid = false;
    }
    if (!billingData.email || !/\S+@\S+\.\S+/.test(billingData.email)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }
    if (!billingData.phone_number || !/^\d+$/.test(billingData.phone_number)) {
      newErrors.phone_number =
        "Invalid phone number. Only numbers are allowed.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }
    console.log("Shipping Data:", billingData);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Overlay title="show_details"/>

      <Container className=" mt-10 md:mt-20 py-2 px-4">
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="border border-gray py-2 px-4 w-full md:w-7/12">
            <p className="text-16 md:text-22 font-semibold md:tracking-[2px]">
              Where You Want Us To Deliver?
            </p>
            <div className="grid grid-cols-12 gap-4 mt-5 md:mt-10 ">
              <div className="col-span-12 md:col-span-6">
                <div className="flex flex-col text-lightdark">
                  <CheckoutInput
                    label="Full Name"
                    type="text"
                    placeholder="e.g. John"
                    name="name"
                    id="checkoutFullName"
                    value={billingData.name}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        name: e.target.value,
                      })
                    }
                  />
                  {errors.name && (
                    <p className="text-red text-sm">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="flex flex-col text-lightdark">
                  <CheckoutInput
                    label="Last name"
                    type="text"
                    name="name"
                    id="checkoutFullName"
                    value={billingData.name}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        name: e.target.value,
                      })
                    }
                  />
                  {errors.name && (
                    <p className="text-red text-sm">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col">
                  <CheckoutInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="e.g.mail@example.com"
                    id="checkoutEmail"
                    value={billingData.email}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        email: e.target.value,
                      })
                    }
                  />
                  {errors.email && (
                    <p className="text-red text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="col-span-5 md:col-span-3">
                <div className="flex flex-col">
                  <label htmlFor="checkout" className="text-lightdark">
                    Phone Code <span className="text-red">*</span>
                  </label>

                  <Select
                    showSearch
                    className="w-full h-11 border outline-none shipment text-20 mt-5 border-[#D2D2D2]"
                    placeholder="Select your state"
                    defaultValue={"+971"}
                    onChange={handleChange}
                  >
                    {CountryCode.map((option, index) => (
                      <Option value={option.title} key={index}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-7 md:col-span-9">
                <div className="flex flex-col">
                  <CheckoutInput
                    label="Phone Number*"
                    type="tel"
                    placeholder="e.g.92123456"
                    name="number"
                    id="checkout"
                    value={billingData.phone_number}
                    onChange={handlePhoneNumberChange}
                  />
                  {errors.phone_number && (
                    <p className="text-red text-sm">{errors.phone_number}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col">
                  <label htmlFor="checkout" className="text-lightdark">
                    City <span className="text-red">*</span>
                  </label>
                  <Select
                    showSearch
                    className="w-full h-11 border outline-none shipment text-20 mt-5 border-[#D2D2D2]"
                    defaultValue="Select your state"
                    value={billingData.state}
                    onChange={handleSelectChange}
                  >
                    {selectoption.map((option, index) => (
                      <Option value={option.title} key={index}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col text-lightdark">
                  <label htmlFor="checkoutstreetAddress">
                    Area <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-[#D2D2D2] border shadow-0 mt-5 outline-0 p-2"
                    name="streetAddress"
                    placeholder="e.g. Al Ghubrah Ash-Shamaliyyah"
                    id="checkoutstreetAddress"
                    value={billingData.address}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        address: e.target.value,
                      })
                    }
                  />
                  {errors.address && (
                    <p className="text-red text-sm">{errors.address}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col text-lightdark">
                  <label htmlFor="checkoutstreetAddress">
                    Delivery Address <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-[#D2D2D2] border shadow-0 mt-5 outline-0 p-2"
                    name="streetAddress"
                    placeholder="e.g. 11 Kaiyuan Road"
                    id="checkoutstreetAddress"
                    value={billingData.address}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        address: e.target.value,
                      })
                    }
                  />
                  {errors.address && (
                    <p className="text-red text-sm">{errors.address}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col text-lightdark">
                  <label htmlFor="checkoutstreetAddress">
                    Apartment#/Hotel Room/Villa (optional){" "}
                    <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-[#D2D2D2] border shadow-0 mt-5 outline-0 p-2"
                    name="streetAddress"
                    placeholder="e.g. Apartment 2101"
                    id="checkoutstreetAddress"
                    value={billingData.address}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        address: e.target.value,
                      })
                    }
                  />
                  {errors.address && (
                    <p className="text-red text-sm">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <div className=" w-full  relative">
              <div className="absolute left-0 top-0 py-2 px-4 bg-[#F0F0F0] w-10/12">
                <div className="flex items-center">
                  <FiTag className="text-black/40 mr-2" size={20} />
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="w-full bg-transparent outline-none py-2"
                  />
                </div>
              </div>
              <button className="absolute right-0 top-0 bg-primary text-white px-8 py-4">
                Apply
              </button>
            </div>
            <div className="mt-20 border border-gray ">
              <CheckoutData
                cartdata={cartItems}
                onCartChange={handleCartChange}
                subtotal={subtotal}
                setSubtotal={setSubtotal}
                shipmentFee={shipmentFee}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CheckOut;
