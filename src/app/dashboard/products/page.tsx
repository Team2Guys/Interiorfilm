import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";


import { Metadata } from "next";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ViewProduct from "components/Dashboard/Tables/ViewProduct";
import ProtectedRoute from "hooks/AuthHookAdmin";


const Products = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <ViewProduct/>
      </div>
    </DefaultLayout>
  );
};

export default ProtectedRoute(Products)

