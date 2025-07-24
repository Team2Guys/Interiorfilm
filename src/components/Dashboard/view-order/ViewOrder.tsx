"use client";
import React, { SetStateAction, useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { LuView } from 'react-icons/lu';
import Cookies from 'js-cookie';
import Image from 'next/image';
import * as XLSX from 'xlsx';
import { generateSlug } from 'data/Data';
import { FiDownloadCloud } from 'react-icons/fi';


const ViewOrder = () => {
  const [groupedOrders, setGroupedOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [exportData, setexportData] = useState<any[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>(''); // State for search text

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (text: any, record: any) => <span>{record.order_id}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'name',
      render: (text: any, record: any) => {
        const Name = `${record.first_name} ${record.last_name}`;
        return <span>{Name}</span>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'usermail',
      key: 'usermail',
      render: (text: any, record: any) => <span>{record.usermail}</span>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (text: any, record: any) => <span>{record.phone_number}</span>,
    },
    {
      title: 'Address',
      dataIndex: 'userAddress',
      key: 'userAddress',
      render: (text: any, record: any) => <span>{record.userAddress}</span>,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text: any, record: any) => (
        <span>{record.paymentStatus ? 'Paid' : 'Not Paid'}</span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: any, record: any) => {
        let rawFee = record.products[0]?.shippment_Fee;

        let fee =  (rawFee === 'Free' || rawFee === 'undefine' || rawFee === undefined || rawFee === null)
          ? 0
          : Number(rawFee) || 0;
        const transactionAmount = record.products.reduce((accum: number, curr: any) => { return accum += curr.totalPrice }, 0)
        return <span>{transactionAmount + fee}</span>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: any, record: any) => {
        let formattedDate;
        if (record.date) {
          const createdAt = new Date(record.date);
          formattedDate = createdAt.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        } else {
          formattedDate = 'Transaction Not Available';
        }
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'View Products',
      dataIndex: 'view',
      key: 'view',
      render: (text: any, record: any) => (
        <span className="flex justify-center">
          <LuView
            onClick={() => handleViewProducts(record.products)}
            className="cursor-pointer text-green-500"
            size={30}
          />
        </span>
      ),
    },
  ];

  // Function to handle product view
  const handleViewProducts = (products: any[]) => {
    setSelectedProducts(products);
    setVisible(true);
  };

  // Functions to handle modal visibility
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // Function to group orders by order ID and filter by product success
  const groupOrders = (orders: any[], setexportData?: React.Dispatch<SetStateAction<any>>) => {
    const grouped: { [key: string]: any } = {};

    orders.forEach(order => {
      order.products.forEach((product: any) => {
        // Only process products with success: true
        if (setexportData ? true : product.paymentStatus) {
          const currentOrder = grouped[product.order_id];

          if (currentOrder) {
            currentOrder.products.push(product);
            currentOrder.paymentStatus = currentOrder.paymentStatus || product.paymentStatus;
            currentOrder.totalPrice = currentOrder.totalPrice || product.totalPrice;
            currentOrder.transactionId = currentOrder.transactionId || product.transactionId;
          } else {
                    let rawFee = order.products[0]?.shippment_Fee;

        let fee =  (rawFee === 'Free' || rawFee === 'undefine' || rawFee === undefined || rawFee === null)
          ? 0
          : Number(rawFee) || 0;

                  const transactionAmount = order.products.reduce((accum: number, curr: any) => { return accum += curr.totalPrice }, 0)

            grouped[product.order_id] = {
              order_id: product.order_id,
              usermail: order.usermail,
              first_name: order.first_name,
              last_name: order.last_name,
              userAddress: order.userAddress,
              phone_number: order.phone_number,
              date: order.date,
              paymentStatus: product.paymentStatus, // Initial value
              transactionId: product.transactionId, // Initial value
              totalPrice: transactionAmount + fee, // Initial value
              products: [product],
            };
          }
        }

      });
    });

    const filteredGroupedOrders = Object.values(grouped)
      .filter(order => order.products.length > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (setexportData) {
      setexportData(filteredGroupedOrders)
      return
    }
    setGroupedOrders(filteredGroupedOrders);
    setFilteredOrders(filteredGroupedOrders);
  };

  const getAllOrder = async () => {
    const token = Cookies.get("2guysAdminToken");
    const superAdminToken = Cookies.get("superAdminToken");
    const finalToken = token ? token : superAdminToken;

    try {
      setOrderLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getorders`,
        {
          headers: {
            token: finalToken,
          },
        },
      );
      const sortedOrders = response.data.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      groupOrders(sortedOrders);
      groupOrders(sortedOrders, setexportData);
      console.log(response.data, "ordersordersorders")
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filteredData = groupedOrders.filter((order) => {
      const orderIdMatches = order.order_id.toString().toLowerCase().includes(value);
      const nameMatches = `${order.first_name} ${order.last_name}`.toLowerCase().includes(value);
      const emailMatches = order.usermail.toLowerCase().includes(value);
      const transactionIdMatches = order.transactionId ? order.transactionId.toLowerCase().includes(value) : false;

      return orderIdMatches || nameMatches || emailMatches || transactionIdMatches;
    });

    setFilteredOrders(filteredData);
  };


  let shippingfree = selectedProducts[0]?.shippment_Fee;


  console.log(groupedOrders, "groupedOrders", exportData)

  const handleExport = () => {
    // Flatten the data (convert nested product into single row or join important values)
    const filtered_orders = exportData?.map((order) => ({
      OrderID: order.order_id,
      Email: order.usermail,
      Name: `${order.first_name} ${order.last_name}`,
      Address: order.userAddress,
      Phone: order.phone_number,
      Date: new Date(order.date).toLocaleString(),
      PaymentStatus: order.paymentStatus ? 'Paid' : 'Unpaid',
      TotalPrice: order.totalPrice,
      ProductNames: order.products.map((p: any) => p.name + `(${p.code})`).join(', '),
      Productslength: order.products.map((p: any) => p.length).join(', '),
      ProductsIds: order.products.map((p: any) => p.id).join(', '),
      ProductsUrls: order.products.map((p: any) => `https://interiorfilm.ae/product/${generateSlug(p.name)}` ).join(', '),
      DiscountedPrice :order.products.map((p: any) => p.discountPrice).join(', '),
      SellingPrice : order.products.map((p: any) => p.price).join(', '),
      Delivery_Charges : order?.products[0].shippment_Fee,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filtered_orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders-IF');
    XLSX.writeFile(workbook, 'Orders-IF.xlsx');
  };


  console.log(exportData, "exportData")
  return (
    <div>
      {orderLoading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center flex-wrap">
            <input
              className="lg:p-3 p-2 block outline-none border rounded-md border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              type="search"
              placeholder="Search Orders"
              value={searchText}
              onChange={handleSearch}
            />
            <div>
              <button className='flex items-center gap-2' onClick={handleExport}> Export Orders <FiDownloadCloud  className='text-primary'/></button>
            </div>
          </div>
          <Table
            className="lg:overfow-x-auto overflow-auto border-slate-100"
            dataSource={filteredOrders} // Use filtered orders here
            columns={columns}
            pagination={false}
            rowKey="_id"
          />
          <Modal title="Order Detail" open={visible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            {selectedProducts.map((product) => {

              return (

                <div className='flex gap-2 items-center mt-2' key={product._id}>
                  <Image className='rounded-md h-32 w-32' width={100} height={100} src={product.imageUrl} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>Code: {product.code}</p>
                    <p>Price: {product.price} {product.currency}</p>
                    <p>Quantity: {product.count}</p>
                    <p>Length: {product.length}</p>
                    {shippingfree ? <p>Shipping Fee: {shippingfree}</p> : null}
                  </div>
                </div>
              )
            })}
          </Modal>
        </>
      )}
    </div>
  );
}

export default ViewOrder;
