"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { MdOutlineDashboard, MdOutlineEmail, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { GrCodeSandbox, GrUserAdmin } from "react-icons/gr";
import { useAppSelector } from "components/Others/HelperRedux";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { TbGardenCartOff } from "react-icons/tb";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: any;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  let superAdmin = loggedInUser && loggedInUser.role !== 'Admin'

  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // console.log(loggedInUser, "loggedInUser");
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-99 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={200}
            height={200}
            src="/images/logowhite.png"
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup activeCondition={pathname === "/dashboard"}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "/dashboard" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdOutlineDashboard size={20} className="text-white" />
                        Dashboard
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/dashboard" && "text-white"
                                }`}
                            >
                              eCommerce
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/category"
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname ===
                          "/dashboard/category" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BiCategoryAlt size={20} className="text-white" />
                        Category
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          {/* <Link
                              href="/dashboard/Add_Category/AddNewCategory"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "dashboard/Add_Category/AddNewCategory" &&
                                "text-white"
                                } `}
                            >
                              Add Categories
                            </Link> */}
                          <li>
                            <Link
                              href="/dashboard/category"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white mt-2.5 ${pathname === "/dashboard/category" &&
                                "text-white"
                                }`}
                            >
                              View Categories
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={pathname === "/dashboard/products"}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "/dashboard/products" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <GrCodeSandbox size={20} className="text-white" />
                        Products
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/products"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "dashboard/products" &&
                                "text-white"
                                } `}
                            >
                              View Products
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/ads-product"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "dashboard/products" &&
                                "text-white"
                                } `}
                            >
                              Ads on Product
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === "/dashboard/orders"}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "/dashboard/orders" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <TfiShoppingCartFull size={20} className="text-white" />
                        Orders
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/orders"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "dashboard/orders" &&
                                "text-white"
                                } `}
                            >
                              View Orders
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === "/dashboard/Abandoned"}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "Abandoned Orders" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <TbGardenCartOff size={20} className="text-white" />
                        Abandoned Orders
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/Abandoned"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "dashboard/abundant" &&
                                "text-white"
                                } `}
                            >
                              View Abandoned Orders
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === "/dashboard/usernewsletter"}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "/dashboard/usernewsletter" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdOutlineEmail size={20} className="text-white" />
                        User Newsletter
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/usernewsletter"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "dashboard/usernewsletter" &&
                                "text-white"
                                } `}
                            >
                              View User Newsletter
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === "/dashboard/General"}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "/dashboard/usernewsletter" &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdOutlineEmail size={20} className="text-white" />
                          General
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && "rotate-180"
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/Redirecturls"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "dashboard/usernewsletter" &&
                                "text-white"
                                } `}
                            >
                              View RedirectUrl
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {superAdmin ? (
                <li>
                  <Link
                    href="/dashboard/super-admin"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("super-admin") &&
                      "bg-graydark dark:bg-meta-4"
                      }`}
                  >
                    <GrUserAdmin size={20} />
                    Admin
                  </Link>
                </li>
              ) : null}
              {superAdmin ? (
                null
              ) : <li>
                <Link
                  href="/dashboard/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <IoSettingsOutline size={20} />
                  Settings
                </Link>
              </li>}


              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          {/* <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>            
          </div> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
