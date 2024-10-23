import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loader from "components/Loader/Loader";
import Cookies from 'js-cookie';
import { FaEdit } from "react-icons/fa";

      const superAdmintoken  = Cookies.get('superAdminToken');


function Admins({ setselecteMenu }: any) {
  const [admins, setAdmins] = useState([]);
  const [loading, setloading] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState<string | null>(null);
  const superAdmintoken  = Cookies.get('superAdminToken');


  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        setloading(true);
        const token = Cookies.get('superAdminToken');
        if (!token) {
          return;
        }

        const headers = {
          token: token,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAllAdmins`,
          {
            method: "GET",
            headers: headers,
          }
        );

        const admins = await response.json();
        console.log(admins, "admins")
        setAdmins(admins);
        setloading(false);
      } catch (err) {
        console.log(err, "err");
        setloading(false);
      }
    };

    getAllAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("2guysAdminToken");
      const superAdminToken = Cookies.get("superAdminToken");
      let finalToken = token ? token : superAdminToken;
    
      if (!finalToken) {
        // Handle case where token is not available
        return;
      }
      setDelLoading(id); // Set loading state for the specific admin being deleted
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/deletAdmin/${id}`,
        {
          headers: {
            token: finalToken,
          },
        }
      );
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin: any) => admin._id !== id)
      );
    } catch (error) {
      console.error("Error deleting admin:", error);
    } finally {
      setDelLoading(null); // Reset loading state after delete operation completes
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) =>
        `${record.fullname}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Can Add Product",
      dataIndex: "canAddProduct",
      key: "canAddProduct",
      render: (text: any, record: any) => (
        <span>{record.canAddProduct ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can Delete Product",
      dataIndex: "canDeleteProduct",
      key: "canDeleteProduct",
      render: (text: any, record: any) => (
        <span>{record.canDeleteProduct ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can Add Category",
      dataIndex: "canAddCategory",
      key: "canAddCategory",
      render: (text: any, record: any) => (
        <span>{record.canAddCategory ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can View Product",
      dataIndex: "canDeleteCategory",
      key: "canDeleteCategory",
      render: (text: any, record: any) => (
        <span>{record.canDeleteCategory ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can view Profit",
      dataIndex: "canCheckProfit",
      key: "canCheckProfit",
      render: (text: any, record: any) => (
        <span>{record.canCheckProfit ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can View Total user",
      dataIndex: "canViewUsers",
      key: "canViewUsers",
      render: (text: any, record: any) => (
        <span>{record.canViewUsers ? "Yes" : "No"}</span>
      ),
    },

    // {
    //   title: "Edit",
    //   key: "edit",
    //   render: (text: any, record: any) =>
    //     editLoading === record._id ? ( 
    //       <Loader />
    //     ) : (
    //       <FaEdit
    //         className="cursor-pointer text-red-500"
    //         size={20}
    //         onClick={() => handleEdit(record._id)}
    //       />
    //     ),
        
    // },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) =>
        delLoading === record._id ? ( // Check if loading state matches current admin ID
          <Loader />
        ) : (
          <RiDeleteBin6Line
            className="cursor-pointer text-red-500"
            size={20}
            onClick={() => handleDelete(record._id)}
          />
        ),
        
    },
  ];

  return (
    <div>
      {/* Admins Table */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center text-black dark:text-white ">
            <p>Admins</p>
            <div>
              <Button
                type="primary"
                onClick={() => setselecteMenu("Add Admin")}
                className="cursor-pointer p-2 text-black dark:text-white bg-inherit hover:bg-slate-300 dark:border-strokedark dark:bg-boxdark flex justify-center"
              >
                Add new Admin
              </Button>
            </div>
          </div>
          {admins && admins.length > 0 ? (
            <Table className="overflow-auto dark:border-strokedark dark:bg-boxdark" dataSource={admins} columns={columns} pagination={false} rowKey="_id" />
          ) : (
            <div className="flex justify-center"> No Admin found</div>
          )}
        </>
      )}
    </div>
  );
}

export default Admins;
