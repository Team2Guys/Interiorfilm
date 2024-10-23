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
import axios from "axios";
import { useRouter } from "next/navigation";


const CheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipmentFee, setShipmentFee] = useState<number | string>(0);
  const [isChecked, setIsChecked] = useState(true);
  const router = useRouter()

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  const [billingData, setBillingData] = useState({
    first_name: "",
    last_name: '',
    email: "",
    phone_number: "",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "",
    productItems: [] as PRODUCTS_TYPES[],
    subtotalAmount: 0,
    totalAmount: 0,
    phone_code: "+971"
  });
  const [showOrderNote, setShowOrderNote] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const { Option } = Select;

  const countSelectoption = [
    { title: "United Arab Emirates" },
  ];
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
    { state: "dubai", charges: 15, discountCharges: 250 },
    { state: "sharjah", charges: 20, discountCharges: 250 },
    { state: "abu dhabi", charges: 20, discountCharges: 250 },
  ];



  const formatCode = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 10) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 10)}`;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const lastChar = value[value.length - 1];
    if (lastChar === "-") {
      value = value.slice(0, -1);
    }
    value = value.slice(0, 10);
    setBillingData((prevData) => ({
      ...prevData,
      phone_number: formatCode(value),
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
        (item) => item.state.toLowerCase() === billingData.city.toLowerCase()
      );

      const charges = matchingItem ? subtotal > matchingItem.discountCharges ? "Free" : matchingItem.charges : subtotal > 250 ? "Free" : 25;
      setShipmentFee(charges);
    };

    calculateCharges();
  }, [billingData.city, subtotal, AddresAAray]);

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
    setBillingData({ ...billingData, city: value });
  };

  const handleSelectChangeCountey = (value: string) => {
    setBillingData({ ...billingData, country: value });
  };


  // const addAddressField = (value: any) => {
  //   setBillingData({
  //     ...billingData,additionalAddressFields: [
  //       ...billingData.additionalAddressFields,
  //       { id: Date.now().toString(), address: "" },
  //     ],
  //   });
  // };

  // const handleAddressFieldChange = (id: string, value: string) => {
  //   setBillingData({
  //     ...billingData,
  //     additionalAddressFields: billingData.additionalAddressFields.map(
  //       (field) => (field.id === id ? { ...field, address: value } : field)
  //     ),
  //   });
  // };

  // const handleAddressFieldDelete = (id: string) => {
  //   setBillingData({
  //     ...billingData,
  //     additionalAddressFields: billingData.additionalAddressFields.filter(
  //       (field) => field.id !== id
  //     ),
  //   });
  // };



  const validateFields = () => {
    let isValid = true;
    const newErrors = { first_name: "", email: "", phone_number: "", address: "", last_name: "" };

    if (!billingData.first_name || /\d/.test(billingData.first_name)) {
      newErrors.first_name = "Invalid name. No numbers allowed.";
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

    // console.log(billingData.phone_number)
    // if (!billingData.phone_number || !/^\d{1}-\d{3}-\d{4}$/.test(billingData.phone_number)) {
    //   newErrors.phone_number = "Invalid phone number. Format should be 1-XXX-XXXX.";
    //   isValid = false;
    // }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    const { phone_number: newPhone, phone_code, email, address, productItems, city, ...extractedData } = billingData
    let phone_number = 0 + phone_code.split('+')[1] + newPhone.split('-').join("")

    let date = Date.now();

    const authResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/authenticate`);
    const token = authResponse.data.token;
    console.log(token, "token")


    const orderResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/createOrder`, { token, amount: billingData.totalAmount });
    const orderId = orderResponse.data.orderId;

    console.log(orderId, "orderId")


    const paymentKeyResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/recordSale`, {
      token, orderId: orderId, ...extractedData,
      date, shipmentFee, phone_number: phone_number, email, address, products: productItems, state: city, city: city,
      street: '-',
      floor: '-',
      shipping_method: 'Courier',
      building: "-",
      apartment: "-",
    },
    );

    console.log(paymentKeyResponse, "paymentKeyResponse")

    const paymentKey = paymentKeyResponse.data.paymentKey;

    window.location.href = `${process.env.NEXT_PUBLIC_PAYMOD_BASE_URL}/iframes/${process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;


  };
  const handleChange = (value: string) => {
    setBillingData((prevData) => ({
      ...prevData,
      phone_code: value,
    }));
  };

  return (
    <>
      <Overlay title="show_details" />

      <Container className=" mt-10 md:mt-20 py-2 px-4">
        <button className="flex gap-3 items-center my-2" onClick={() => router.push('/cart')}>

          <svg className={`${"fill-black"}`} width="30" height="30" viewBox="0 0 55 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54.6404 14.3224H4.87739L17.3712 1.82617L15.7027 0.157654L0.360352 15.5024L15.7004 30.8424L17.3689 29.1739L4.87739 16.6824H54.6404V14.3224Z" />
          </svg>
          Back</button>

        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="border border-gray py-2 px-4 w-full md:w-7/12">
            <p className="text-16 md:text-22 font-semibold md:tracking-[2px]">
              Where You Want Us To Deliver?
            </p>
            <div className="grid grid-cols-12 gap-4 mt-5 md:mt-10 ">
              <div className="col-span-12 md:col-span-6">
                <div className="flex flex-col text-lightdark">
                  <CheckoutInput
                    label="First Name"
                    type="text"

                    name="name"
                    id="checkoutFullName"
                    value={billingData.first_name}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        first_name: e.target.value,
                      })
                    }
                  />
                  {errors.first_name && (
                    <p className="text-red text-sm">{errors.first_name}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="flex flex-col text-lightdark">
                  <CheckoutInput
                    label="Last name"
                    type="text"
                    name="last_name"
                    id="checkoutFullName"

                    value={billingData.last_name}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        last_name: e.target.value,
                      })
                    }
                  />
                  {errors.last_name && (
                    <p className="text-red text-sm">{errors.last_name}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col">
                  <CheckoutInput
                    label="Email"
                    type="email"
                    name="email"

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
                    Country Code <span className="text-red">*</span>
                  </label>

                  <Select
                    showSearch
                    className="w-full h-11 border outline-none shipment text-20 mt-5 border-[#D2D2D2]"
                    placeholder="Select your state"
                    defaultValue="+971"
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
                    label="Phone Number"
                    type="tel"

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
                <div className="flex justify-between gap-5 ">

                  <div className="flex flex-col w-1/2">
                    <label htmlFor="checkout" className="text-lightdark">
                      Country <span className="text-red">*</span>
                    </label>
                    <Select
                      showSearch
                      className="w-full h-11 border outline-none shipment text-20 mt-5 border-[#D2D2D2]"
                      defaultValue="Select your state"
                      value={billingData.country}
                      onChange={handleSelectChangeCountey}
                    >
                      {countSelectoption.map((option, index) => (
                        <Option value={option.title} key={index}>
                          {option.title}
                        </Option>
                      ))}
                    </Select>

                  </div>

                  <div className="flex flex-col w-1/2">
                    <label htmlFor="checkout" className="text-lightdark">
                      City <span className="text-red">*</span>
                    </label>
                    <Select
                      showSearch
                      className="w-full h-11 border outline-none shipment text-20 mt-5 border-[#D2D2D2]"
                      defaultValue="Select your state"
                      value={billingData.city}
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
              </div>

              {/* <div className="col-span-12">
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
              </div> */}

              <div className="col-span-12">
                <div className="flex flex-col text-lightdark">
                  <label htmlFor="checkoutstreetAddress">
                    Delivery Address <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-[#D2D2D2] border shadow-0 mt-5 outline-0 p-2"
                    name="streetAddress"

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

              {/* <div className="col-span-12">
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
              </div> */}
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
