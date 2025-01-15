"use client";
import React, { useLayoutEffect, useState } from "react";
import ChartOne from "./Charts/ChartOne";
import ChartTwo from "./Charts/ChartTwo";
import CardDataStats from "./CardDataStats";
import Cookies from "js-cookie";
import { useAppSelector } from "components/Others/HelperRedux";
import { IoMdEye } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import { Skeleton } from "antd";
import { RECORDS } from "types/interfaces";

const ECommerce: React.FC = () => {
  const [loading, setloading] = useState(false);
  const [records, setRecords] = useState<RECORDS | undefined>();
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const CanCheckRevnue =loggedInUser &&(loggedInUser.role == "Admin" ? loggedInUser.CanCheckRevnue : true);
  const canViewUsers =
    loggedInUser &&
    (loggedInUser.role == "Admin" ? loggedInUser.canViewUsers : true);
  const canViewSales =
    loggedInUser &&
    (loggedInUser.role == "Admin" ? loggedInUser.canViewSales : true);
  const canVeiwAdmins =
    loggedInUser &&
    (loggedInUser.role == "Admin" ? loggedInUser.canVeiwAdmins : true);
  const canVeiwTotalproducts =
    loggedInUser &&
    (loggedInUser.role == "Admin" ? loggedInUser.canVeiwTotalproducts : true);
  const canVeiwTotalCategories =
    loggedInUser &&
    (loggedInUser.role == "Admin" ? loggedInUser.canVeiwTotalCategories : true);

  const getAllAdmins = async () => {
    try {
      setloading(true);
      const token = Cookies.get("2guysAdminToken");
      const superAdminToken = Cookies.get("superAdminToken");
      let finalToken = token ? token : superAdminToken;

      if (!finalToken) {
        return;
      }

      const headers = {
        token: finalToken,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/geRecords`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const record = await response.json();
      setRecords(record);

      setloading(false);
    } catch (err) {
      console.log(err, "err");
      setloading(false);
    }
  };
  useLayoutEffect(() => {
    getAllAdmins();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {loading ? (
        new Array(5).fill(0).map((item:number, index: number)=> <Skeleton key={index} avatar active  />))
         : (
          <>
        {!canVeiwAdmins ? null : (
          <CardDataStats
            title="Admins"
            total={records?.totalAdmins ? records?.totalAdmins : ""}
          >
            <IoMdEye size={25} className="fill-primary dark:fill-white" />
          </CardDataStats>
        )}
        {!CanCheckRevnue ? null : (
          <CardDataStats
            title="Total Revenue"
            total={records?.totalRevenue ? records?.totalRevenue : ""}
          >
            <FiShoppingCart size={25} className="text-primary dark:text-white" />
          </CardDataStats>
        )}

        {!canViewSales ? null : (
          <CardDataStats
            title="Total Sales"
            total={records?.totalSales ? records?.totalSales : ""}
          >
            <PiUsersThreeFill size={25} className="fill-primary dark:fill-white" />
          </CardDataStats>
        )}

        {!canVeiwTotalproducts ? null : (
          <CardDataStats
            title="Total Product"
            total={records?.totalProducts ? records?.totalProducts : ""}
          >
            <IoBagOutline size={25} className="text-primary dark:text-white" />
          </CardDataStats>
        )}

        {!canVeiwTotalCategories ? null : (
          <CardDataStats
            title="Total Categories"
            total={records?.totalCategories ? records?.totalCategories : ""}
          >
            <IoBagOutline size={25} className="text-primary dark:text-white" />
          </CardDataStats>
        )}

        {!canViewUsers ? null : (
          <CardDataStats
            title="Total Users"
            total={records?.totalUsers ? records?.totalUsers : ""}
          >
            <PiUsersThreeFill size={25} className="fill-primary dark:fill-white" />
          </CardDataStats>
            )}
            </>
          )}
        </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default ECommerce;
