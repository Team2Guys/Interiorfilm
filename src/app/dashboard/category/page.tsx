'use client'

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import TableTwo from "components/Dashboard/Tables/TableTwo";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";


const category = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default  ProtectedRoute(category);
