"use client";

import React, { useState } from "react";
import { Table, notification, Modal, Skeleton, Checkbox } from "antd"; // Import Skeleton and Checkbox
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "components/Loader/Loader";
import { useAppSelector } from "components/Others/HelperRedux";

interface Product {
  _id: string;
  email: string;
  createdAt: string;
}

interface CategoryProps {
  Categories: any;
  setProduct: any;
  loading: boolean;
}

const ViewNewsletter: React.FC<CategoryProps> = ({
  Categories,
  setProduct,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]); // State to manage selected emails

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canAddProduct =
    loggedInUser && (loggedInUser.role === "Admin" ? loggedInUser.canAddProduct : true);
  const canDeleteProduct =
    loggedInUser && (loggedInUser.role === "Admin" ? loggedInUser.canDeleteProduct : true);

  const confirmDelete = (key: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Newsletter?",
      content: "Once deleted, the Newsletter cannot be recovered.",
      onOk: () => handleDelete(key),
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleDelete = async (key: string) => {
    try {
      setProduct((prev: Product[]) => prev.filter((item) => item._id !== key));
      notification.success({
        message: "Newsletter Deleted",
        description: "The Newsletter has been successfully deleted.",
        placement: "topRight",
      });
    } catch (err) {
      notification.error({
        message: "Deletion Failed",
        description: "There was an error deleting the Newsletter.",
        placement: "topRight",
      });
    }
  };

  // Dummy emails
  const dummyEmails = [
    {
      _id: "1",
      email: "john.doe@example.com",
      createdAt: "2024-10-07T10:30:00Z",
    },
    {
      _id: "2",
      email: "jane.smith@example.com",
      createdAt: "2024-10-06T14:45:00Z",
    },
    {
      _id: "3",
      email: "david.jones@example.com",
      createdAt: "2024-10-05T08:20:00Z",
    },
  ];

  // Filter the emails based on search term
  const filteredEmails = dummyEmails.filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Select",
      dataIndex: "_id",
      key: "select",
      render: (text: any, record: Product) => (
        <Checkbox
          checked={selectedEmails.includes(record.email)}
          onChange={() => handleEmailSelection(record.email)}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text: any, record: Product) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "time",
      render: (text: any, record: Product) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(2, "0")}:${String(
          createdAt.getMinutes()
        ).padStart(2, "0")}`;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Product) => (
        <RiDeleteBin6Line
          className={`${canDeleteProduct ? "text-red cursor-pointer" : ""} ${
            !canDeleteProduct ? "cursor-not-allowed text-slate-200" : ""
          }`}
          size={20}
          onClick={() => {
            if (canDeleteProduct) {
              confirmDelete(record._id);
            }
          }}
        />
      ),
    },
  ];

  const handleEmailSelection = (email: string) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails((prev) => prev.filter((selectedEmail) => selectedEmail !== email));
    } else {
      setSelectedEmails((prev) => [...prev, email]);
    }
  };

  const handleBroadcastEmails = () => {
    if (selectedEmails.length > 0) {
      alert(`Successfully broadcasted to: ${selectedEmails.join(", ")}`);
    } else {
      alert("No emails selected to broadcast.");
    }
  };

  return (
    <div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} /> // Display Skeleton when loading
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center flex-wrap text-black dark:text-white">
            <input
              className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:drop-shadow-none text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none"
              type="search"
              placeholder="Search Email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div>
              <p
                className={`${
                  canAddProduct && "cursor-pointer"
                } p-2 ${
                  canAddProduct &&
                  "bg-black text-white rounded-md border hover:bg-transparent hover:border-black hover:text-black"
                } dark:border-strokedark  flex justify-center dark:bg-slate-500 ${
                  !canAddProduct && "cursor-not-allowed text-slate-300"
                }`}
                onClick={handleBroadcastEmails}
              >
                Broadcast Email
              </p>
            </div>
          </div>
          {filteredEmails && filteredEmails.length > 0 ? (
            <Table
              className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
              dataSource={filteredEmails}
              columns={columns}
              rowKey="_id"
              pagination={false}
            />
          ) : (
            <p className="text-dark dark:text-white">No Newsletter found</p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewNewsletter;
