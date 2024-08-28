"use client";
import CheckoutData from "components/widgets/checkoutData/CheckOutData";
import React, { useEffect, useState } from "react";
import { Checkbox, Button, Select } from "antd";
import Link from "next/link";
import Product from "app/product/[productname]/page";
import PRODUCTS_TYPES from "types/interfaces";
import { number } from "yup";

const CheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipmentFee, setShipmentFee] = useState<number | string>(0);
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

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);
  useEffect(() => {
    const updatedTotal = shipmentFee === "Free"
      ? subtotal
      : Number(shipmentFee) + subtotal;
  
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

  const addAddressField = () => {
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
      newErrors.address = "Address is requried.";
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

  return (
    <div className="bg-bglight">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white pt-8 pb-14 space-y-5 p-2 md:px-10">
          <p className="text-end text-17 font-light">
            Already have an account?{" "}
            <Link
              href="/login"
              className="inline-block cursor-pointer underline"
            >
              Log in
            </Link>
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="lg:text-20 text-base font-bold text-headingdark mb-4">
                SHIPPING DETAILS
              </h2>
              <p className="text-15 font-medium mb-4">
                <span className="text-red ">*</span> required fields
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col text-lightdark">
                    <label htmlFor="checkoutFullName">
                      Full Name <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="border-gray border shadow-0 outline-0 p-2"
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
                  <div className="flex flex-col">
                    <label htmlFor="checkout" className="text-lightdark">
                      Country <span className="text-red">*</span>
                    </label>
                    <Select
                      showSearch
                      className="w-full h-11 border outline-none shipment text-20 border-gray"
                      placeholder="Select your state"
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
                  <div className="flex flex-col text-lightdark">
                    <label htmlFor="checkoutstreetAddress">
                      Street Address <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="border-gray border shadow-0 outline-0 p-2"
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
                  {billingData.additionalAddressFields.map((field) => (
                    <div key={field.id} className="flex items-center">
                      <input
                        type="text"
                        className="border-gray border shadow-0 outline-0 p-2 flex-grow"
                        placeholder="Additional Address"
                        value={field.address}
                        onChange={(e) =>
                          handleAddressFieldChange(field.id, e.target.value)
                        }
                      />
                      <Button
                        type="link"
                        className="text-red ml-2"
                        onClick={() => handleAddressFieldDelete(field.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  <div className="flex">
                    <button className="text-15" onClick={addAddressField}>
                      + Add another address field (optional)
                    </button>
                  </div>
                  <div className="mt-3">
                    <h2 className="lg:text-20 text-base font-bold text-headingdark mb-3">
                      CONTACT INFORMATION
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="checkoutEmail" className="text-lightdark">
                      Email <span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      className="border-gray border shadow-0 outline-0 p-2"
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
                    <p className="text-11 text-headingdark font-medium mt-1">
                      You will be able to create an account after purchasing
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="checkout" className="text-lightdark">
                      Number <span className="text-red">*</span>{" "}
                      <span className="text-12 ms-2 text-headingdark font-medium">
                        For delivery-related queries
                      </span>
                    </label>
                    <input
                      type="tel"
                      className="border-gray border shadow-0 outline-0 p-2"
                      name="number"
                      id="checkout"
                      value={billingData.phone_number}
                      onChange={(e) =>
                        setBillingData({
                          ...billingData,
                          phone_number: e.target.value,
                        })
                      }
                    />
                    {errors.phone_number && (
                      <p className="text-red text-sm">{errors.phone_number}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="lg:text-20 text-base font-bold text-headingdark mb-4">
                  SHIPPING DETAILS
                </h2>
                <Checkbox
                  className="custom-checkbox text-14 font-normal"
                  checked
                >
                  Same as shipping address
                </Checkbox>
              </div>
              <div>
                <h2 className="lg:text-20 text-base font-bold text-headingdark mb-4">
                  ADDITIONAL OPTIONS
                </h2>
                {showOrderNote ? (
                  <div className="mt-3 flex flex-col">
                    <label htmlFor="orderNote" className="text-lightdark">
                      Order Note
                    </label>
                    <textarea
                      id="orderNote"
                      className="border border-light p-2"
                      placeholder="Add a note to this order"
                      value={billingData.orderNote}
                      
                      onChange={(e) =>handleOrderNoteChange(e)}
                    >{billingData.orderNote}</textarea>
                    <Button
                      type="link"
                      className="text-red mt-2 text-start"
                      onClick={() => setShowOrderNote(false)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : 
                <button
                  className="text-15"
                  onClick={() => setShowOrderNote(!showOrderNote)}
                >
                  + Add a note to this order
                </button>}
              </div>
            </div>
          </div>
        </div>
        <div>
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
  );
};

export default CheckOut;
