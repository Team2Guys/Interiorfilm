"use client";
import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { LuView } from 'react-icons/lu';
import Cookies from 'js-cookie';
import Image from 'next/image';

const ViewOrder = () => {
  const [groupedOrders, setGroupedOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
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
        let shipmentFee = record.products[0]?.shippment_Fee;
        let fee = shipmentFee ? (shipmentFee === 'Free' || shipmentFee === 'undefine' ? 0 : Number(shipmentFee)) : 0

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


  const groupOrders = (orders: any[]) => {
    const grouped: { [key: string]: any } = {};

    orders.forEach(order => {
      order.products.forEach((product: any) => {
        if (!product.paymentStatus) {
          const currentOrder = grouped[product.order_id];

          if (currentOrder) {
            currentOrder.products.push(product);
            currentOrder.paymentStatus = currentOrder.paymentStatus || product.paymentStatus;
            currentOrder.amount_cents = currentOrder.amount_cents || product.amount_cents;
            currentOrder.transactionId = currentOrder.transactionId || product.transactionId;
          } else {
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
              amount_cents: product.amount_cents, // Initial value
              products: [product],
            };
          }
        }
      });
    });

    const filteredGroupedOrders = Object.values(grouped)
      .filter(order => order.products.length > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      groupOrders(response.data);

      console.log(response.data, "groupOrdersgroupOrders")
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

  console.log(filteredOrders, "filteredOrders")

  let shippingfree = selectedProducts[0]?.shippment_Fee;
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
              <p>Orders</p>
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
                  <Image className='rounded-md borde h-32 w-32' width={100} height={150} src={product.imageUrl} alt={product.name} />
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
