"use client";
import React, { useState} from "react";
import Sidebar from "components/Dashboard/Sidebar";
import Header from "components/Dashboard/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden h-[100vh] dark:border-strokedark dark:bg-boxdark">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="dark:border-strokedark dark:bg-boxdark">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 dark:border-strokedark dark:bg-boxdark">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
      </div>
  
    </>
  );
}
