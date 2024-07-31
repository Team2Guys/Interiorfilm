"use client"
import CheckoutData from 'components/widgets/checkoutData/CheckOutData';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import SelectList from '../Select/Select';
import { options } from 'data/Data';
import { Select } from 'antd';


const onChangeCheck: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const CheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const { Option } = Select;
  const [shipmentFee, setShipmentFee] = useState<number | string>(0);


  const [billingData, setBillingData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    street: '-',
    building: '-',
    floor: '-',
    apartment: '-',
    state: 'Dubai',
    city: '-',
    country: 'United Arab Emirates',
    address: '',
  });

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);

  const calculateTotals = (items:any) => {
    const sub = items.reduce((acc:any, item:any) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + (price * item.count * item.length); // Adjusted to calculate total price considering item count and length
    }, 0);
    setSubtotal(sub);
    const shipping = sub < 100 ? 30 : 0;
    setShippingCharges(shipping);
    setTotal(sub + shipping);
  };

  const handleCartChange = (updatedCart:any) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
  };

  const selectoption = [
    { title: 'Dubai' },
    { title: 'Abu Dhabi' },
    { title: 'Sharjah' },
    { title: 'Ajman' },
    { title: 'Ras Al Khaima' },
    { title: 'Umm Al Quwain' },
    { title: 'Fujairah' },
  ];

  const handleSelectChange = (value: string) => {
    setBillingData({ ...billingData, state: value });
  };


  
  const AddresAAray = [
    {
      state: 'dubai',
      charges: 15,
      discountCharges: 150
    },
    {
      state: 'sharjah',
      charges: 20,
      discountCharges: 200
    },
    {
      state: 'abu dhabi',
      charges: 20,
      discountCharges: 200
    },

  ]

  useEffect(() => {
    const calculateCharges = () => {
      const matchingItem = AddresAAray.find(item => item.state.toLowerCase() === billingData.state.toLowerCase());

      const charges = matchingItem ? (subtotal > matchingItem.discountCharges ? 'Free' : matchingItem.charges) : (subtotal > 250 ? 'Free' : 25);
      setShipmentFee(charges);
    };

    calculateCharges();
  }, [billingData.state, subtotal, AddresAAray]);



  return (
    <div className="lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="md:col-span-2 bg-white p-6 shadow-2 border border-shade rounded-md space-y-10 px-8 ">
            <div className="flex justify-between flex-wrap">
              <h2 className="lg:text-[25px] text-base font-medium text-[#3A393C] lg:mb-4">Contact Information</h2>
            </div>
              <input
                type="text"
                placeholder="Email or mobile phone number"
                className="w-full border border-gray border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
             <Checkbox onChange={onChangeCheck}>Keep me up to date on news and exclusive offers</Checkbox>

            <h2 className="text-[25px] font-medium text-[#3A393C] mb-4 pt-5 lg:pt-20">Shipping address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name (optional)"
                className="border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
              <input
                type="tel"
                placeholder="Number"
                className="border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc (optional)"
              className="w-full border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <SelectList
                className='w-full h-10 border-b outline-none shipment  border-gray text-4xl '
                onChange={onChange}
                options={options}
                  defaultValue={"Enter Country"}
                />

<Select
      showSearch

                     className='w-full h-10 border-b outline-none shipment text-20 border-gray '
                  placeholder="Select you state"
                  value={billingData.state}
                  onChange={handleSelectChange}
                >
                  {selectoption.map((option, index) => (
                    <Option value={option.title} key={index}>
                      {option.title}
                    </Option>
                  ))}
                </Select>

             {/* <SelectList
                className='w-full h-10 border-b outline-none shipment text-20 border-gray '
                onChange={onChange}
                options={options}
                defaultValue={"Enter City"}
                /> */}
        
          </div>
          <div>

          <CheckoutData cartdata={cartItems} onCartChange={handleCartChange}
  
          subtotal={subtotal} 
          setSubtotal= {setSubtotal}
          shipmentFee={shipmentFee}
          />
        </div>
          
        </div>
    </div>
  );
};

export default CheckOut;
