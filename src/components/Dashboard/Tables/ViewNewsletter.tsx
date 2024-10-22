"use client";

import React, { useState } from "react";
import { Table, notification, Modal, Skeleton, Checkbox } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppSelector } from "components/Others/HelperRedux";
import axios from "axios"; // Import axios
import Cookies from 'js-cookie';

interface Product {
  _id: string;
  email: string;
  createdAt: string;
}

interface CategoryProps {
  setProduct: any;
  products: Product[];  // Accept products as prop
  loading: boolean;
}

const ViewNewsletter: React.FC<CategoryProps> = ({
  setProduct,
  products,  // Destructure the products prop
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]); // State to manage selected emails
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false); // State to manage select all checkbox
  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  let finalToken = token ? token : superAdminToken;

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

  // Filter the emails based on the search term
  const filteredEmails = (products || []).filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmailSelection = (email: string) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails((prev) => prev.filter((selectedEmail) => selectedEmail !== email));
    } else {
      setSelectedEmails((prev) => [...prev, email]);
    }
  };

  const handleSelectAllChange = () => {
    if (isSelectAllChecked) {
      setSelectedEmails([]); // Deselect all emails
    } else {
      const allEmails = filteredEmails.map((item) => item.email);
      setSelectedEmails(allEmails); // Select all emails
    }
    setIsSelectAllChecked(!isSelectAllChecked); // Toggle the "Select All" checkbox state
  };

  const handleBroadcastEmails = async () => {
    if (selectedEmails.length === 0) {
      notification.error({
        message: "No Emails Selected",
        description: "Please select at least one email to broadcast.",
        placement: "topRight",
      });
      return;
    }
  
    if (!finalToken) {
      notification.error({
        message: "Token Error",
        description: "No token found. Please login again.",
        placement: "topRight",
      });
      return;
    }
    
    console.log("Selected emails for broadcasting:", selectedEmails);
  
    const content = "<p>This is the promotional content</p><img src='cid:image.png' alt='Promo Image' />";
  
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("emails", JSON.stringify(selectedEmails));
      const imageResponse = await fetch('/images/CA101.png'); 
      const imageBlob = await imageResponse.blob();
      formData.append("image", imageBlob, 'CA101.png'); 
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/send_promotional_email`,
        formData,
        {
          headers: { token: finalToken },
        }
      );
  
      console.log("Network response:", response.data);
  
      if (response.status === 200) {
        notification.success({
          message: "Emails Broadcasted Successfully",
          description: `Successfully sent to: ${selectedEmails.join(", ")}`,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Broadcast Failed",
          description: response.data.message || "There was an error sending the emails.",
          placement: "topRight",
        });
      }
    } catch (err) {
      console.error("Error broadcasting emails:", err);
      notification.error({
        message: "Broadcast Failed",
        description: "There was an error sending the emails.",
        placement: "topRight",
      });
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={isSelectAllChecked}
          onChange={handleSelectAllChange}
        >
          Select All
        </Checkbox>
      ),
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

  return (
    <div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
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
