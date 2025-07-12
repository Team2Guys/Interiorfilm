"use client";

import { Table, Modal } from "antd";
import React, { SetStateAction, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RedirectUrls } from "types/interfaces";
import { DateFormatHandler } from "utils/helperFunctions";
import showToast from "components/Toaster/Toaster";
import revalidateTagHanlder from "components/serverAction/ServerAction";

interface IView_RedirectUrls {
  Redirecturls?: RedirectUrls[];
  setselecteMenu: React.Dispatch<SetStateAction<string>>;
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>;
}

export default function ViewRedirecturl({
  Redirecturls = [],
  setselecteMenu,
  setRedirectUrls,
}: IView_RedirectUrls) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const sortedData = [...Redirecturls].sort(
    (a, b) =>
      new Date(b.createdAt ?? "").getTime() -
      new Date(a.createdAt ?? "").getTime()
  );

  const filteredData = sortedData.filter((item) =>
    item.url?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (_id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this redirect URL?",
      content: "Once deleted, the redirect URL cannot be recovered.",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      centered: true,
      onOk: () => handleDelete(_id),
    });
  };

  const handleDelete = async (_id: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/general/deleteredirecturl/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      await revalidateTagHanlder("Redirecturl");
      showToast("success", "Redirect URL deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to delete redirect URL");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: 250,
    },
    {
      title: "Redirect Page",
      dataIndex: "redirectUrl",
      key: "redirectUrl",
      width: 250,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: string, record: RedirectUrls) => (
        <span>{DateFormatHandler(new Date(record?.createdAt ?? ""))}</span>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: string, record: RedirectUrls) => (
        <span>{DateFormatHandler(new Date(record?.updatedAt ?? ""))}</span>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_: string, record: RedirectUrls) => (
        <LiaEdit
          size={20}
          className="cursor-pointer"
          onClick={() => {
            setRedirectUrls(record);
            setselecteMenu("Add RedirectUrls");
          }}
        />
      ),
    },
    {
      title: "Delete",
      key: "action",
      render: (_: string, record: RedirectUrls) => (
        <RiDeleteBin6Line
          size={20}
          className="text-red-600 cursor-pointer"
          onClick={() => confirmDelete(record._id || "")}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 items-center">
        <input
          className="border border-black p-2 w-fit max-w-96 outline-none"
          type="search"
          placeholder="Search by URL"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <p
          className="bg-black text-white p-2 hover:bg-primary cursor-pointer"
          onClick={() => {
            setselecteMenu("Add RedirectUrls");
            setRedirectUrls(undefined);
          }}
        >
          Add Redirect URL
        </p>
      </div>

      <Table
        loading={loading}
        dataSource={filteredData}
        columns={columns}
        rowKey="_id"
        scroll={{ y: 550, x: "max-content" }}
        pagination={false}
      />
    </>
  );
}
