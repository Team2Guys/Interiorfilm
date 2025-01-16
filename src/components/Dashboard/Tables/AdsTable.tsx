"use client";

import React, { useState } from "react";
import { Table, notification, Modal } from "antd";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { FaRegEye } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { useAppSelector } from "components/Others/HelperRedux";
import { generateSlug } from "data/Data";
import Cookies from 'js-cookie';

interface Product {
  _id: string;
  name: string;
  category: string;
  posterImageUrl: { imageUrl: string };
  createdAt: string;
}

interface CategoryProps {
  Categories: any;
  setProduct: any;
  setselecteMenu: any;
  loading: boolean;
  setEditProduct: any;
}

const AdsTable: React.FC<CategoryProps> = ({
  Categories,
  setProduct,
  setselecteMenu,
  loading,
  setEditProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  let finalToken = token ? token : superAdminToken;

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canAddProduct=loggedInUser && (loggedInUser.role =='Admin' ?   loggedInUser.canAddProduct : true ) 
  const canDeleteProduct=loggedInUser && (loggedInUser.role =='Admin' ?  loggedInUser.canDeleteProduct : true )
  const canEditproduct = loggedInUser && (loggedInUser.role =='Admin'  ? loggedInUser.canEditproduct : true )  
  console.log(canDeleteProduct, "canAddProduct"
  )

  const filteredProducts: Product[] =
  Categories?.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (product.description &&
    product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (product.salePrice &&
    product.salePrice.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
  (product.purchasePrice &&
    product.purchasePrice
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())) ||
  (product.category &&
    product.category.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
  product.discountPrice
    ?.toString()
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  (product.colors &&
    product.colors.some((color: any) =>
      color.colorName.toLowerCase().includes(searchTerm.toLowerCase())
    )) ||
  product.modelDetails.some(
    (model: any) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.detail.toLowerCase().includes(searchTerm.toLowerCase())
  ) ||
  (product.spacification &&
    product.spacification.some((spec: any) =>
      spec.specsDetails.toLowerCase().includes(searchTerm.toLowerCase())
    )) ||
  product.starRating?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.reviews?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.totalStockQuantity
    ?.toString()
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  (product.sizes &&
    product.sizes.some((size: any) =>
      size.sizesDetails.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ) || [];



  const confirmDelete = (key: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "Once deleted, the product cannot be recovered.",
      onOk: () => handleDelete(key),
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleDelete = async (key: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/deleteProduct/${key}`, {
          headers: { token: finalToken }
        }
      );
      setProduct((prev: Product[]) => prev.filter((item) => item._id !== key));
      notification.success({
        message: "Product Deleted",
        description: "The product has been successfully deleted.",
        placement: "topRight",
      });
    } catch (err) {
      notification.error({
        message: "Deletion Failed",
        description: "There was an error deleting the product.",
        placement: "topRight",
      });
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "posterImageUrl",
      key: "posterImageUrl",
      render: (text: any, record: Product) => (
        <Image
          src={record.posterImageUrl?.imageUrl}
          alt={`Image of ${record.name}`}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock Quantity",
      dataIndex: "totalStockQuantity",
      key: "totalStockQuantity",
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
      title: "Preview",
      key: "Preview",
      render: (text: any, record: Product) => {
        const handleClick = () => {
          const url = `/product/${generateSlug(record.name)}`;
          window.open(url, "_blank");
        };
        return <FaRegEye className="cursor-pointer" onClick={handleClick} />;
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (text: any, record: Product) => (
        <LiaEdit
          className={`${canEditproduct ? "cursor-pointer" : ""} ${
            !canEditproduct ? "cursor-not-allowed text-slate-200" : ""
          }`}
          size={20}
          onClick={() => {
            if (canEditproduct) {
              console.log(record, "canEditproduct")
              setEditProduct(record);
              setselecteMenu("Add Products");
            }
          }}
        />
      ),
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
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center flex-wrap text-black dark:text-white">
            <input
              className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:drop-shadow-none text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none"
              type="search"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div>
              <p
                className={`${
                  canAddProduct && "cursor-pointer"
                } p-2 ${
                  canAddProduct && "bg-black text-white rounded-md border hover:bg-transparent hover:border-black hover:text-black"
                } dark:border-strokedark  flex justify-center dark:bg-slate-500 ${
                  !canAddProduct && "cursor-not-allowed text-slate-300"
                }`}
                onClick={() => {
                  if (canAddProduct) {
                    setselecteMenu("Add Products");
                    setEditProduct(undefined);
                  }
                }}
              >
                Add Products
              </p>
            </div>
          </div>
          {filteredProducts && filteredProducts.length > 0 ? (
            <Table
              className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
              dataSource={filteredProducts}
              columns={columns}
              rowKey="_id"
              pagination={false}
            />
          ) : ( 
            <p className='text-dark dark:text-white' >No products found</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdsTable;
