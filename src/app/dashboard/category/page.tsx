import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import TableOne from "components/Dashboard/Tables/TableOne";
import TableThree from "components/Dashboard/Tables/TableThree";
import TableTwo from "components/Dashboard/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";


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

export default category;
